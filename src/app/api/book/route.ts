import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

import { generateBookingTimes } from '@/utilities/generateBookingTimes'

const dayNames = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number)

  return hours * 60 + minutes
}

function bookingsOverlap(
  startA: number,
  endA: number,
  startB: number,
  endB: number,
) {
  return startA < endB && startB < endA
}

export async function POST(request: Request) {
  const payload = await getPayload({ config })

  const body = await request.json()

  const {
    date,
    guests,
    time,
    name,
    email,
    phone,
    message,
  } = body

  if (!date || !guests || !time || !name || !email || !phone) {
    return NextResponse.json(
      {
        error: 'Alla obligatoriska fält måste fyllas i.',
      },
      { status: 400 },
    )
  }

  const guestCount = Number(guests)

  if (!Number.isFinite(guestCount)) {
    return NextResponse.json(
      {
        error: 'Ogiltigt antal personer.',
      },
      { status: 400 },
    )
  }

  const selectedDate = new Date(`${date}T12:00:00`)

  if (Number.isNaN(selectedDate.getTime())) {
    return NextResponse.json(
      {
        error: 'Ogiltigt datum.',
      },
      { status: 400 },
    )
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (selectedDate < today) {
    return NextResponse.json(
      {
        error: 'Det går inte att boka ett datum som redan har passerat.',
      },
      { status: 400 },
    )
  }

  const settings = await payload.findGlobal({
    slug: 'booking-settings',
  })

  if (
    guestCount < 1 ||
    guestCount > settings.maxGuestsPerBooking
  ) {
    return NextResponse.json(
      {
        error: `Max ${settings.maxGuestsPerBooking} personer per bokning.`,
      },
      { status: 400 },
    )
  }

  const selectedDay = dayNames[selectedDate.getDay()]

  const daySettings = settings[selectedDay]

  if (
    !daySettings ||
    !daySettings.bookable ||
    !daySettings.firstBookingTime ||
    !daySettings.lastBookingTime
  ) {
    return NextResponse.json(
      {
        error: 'Restaurangen tar inte emot bokningar den dagen.',
      },
      { status: 400 },
    )
  }

  const exceptions = await payload.find({
    collection: 'booking-exceptions',
    where: {
      date: {
        equals: date,
      },
    },
    limit: 100,
  })

  const fullDayException = exceptions.docs.some(
    (exception) => exception.type === 'full-day',
  )

  if (fullDayException) {
    return NextResponse.json(
      {
        error: 'Restaurangen tar inte emot bokningar det valda datumet.',
      },
      { status: 400 },
    )
  }

  const blockedTimes: string[] = exceptions.docs
    .filter(
      (exception) =>
        exception.type === 'specific-times',
    )
    .flatMap(
      (exception) =>
        exception.blockedTimes || [],
    )

  if (blockedTimes.includes(time)) {
    return NextResponse.json(
      {
        error: 'Den valda tiden är inte tillgänglig.',
      },
      { status: 400 },
    )
  }

  const validTimes = generateBookingTimes(
    daySettings.firstBookingTime,
    daySettings.lastBookingTime,
    settings.intervalMinutes,
  )

  if (!validTimes.includes(time)) {
    return NextResponse.json(
      {
        error: 'Ogiltig bokningstid.',
      },
      { status: 400 },
    )
  }

  const configuredDuration = Number(
    settings.bookingDurationMinutes,
  )

  const durationMinutes =
    Number.isFinite(configuredDuration) &&
    configuredDuration > 0
      ? configuredDuration
      : 90

  const candidateStart =
    timeToMinutes(time)

  const candidateEnd =
    candidateStart + durationMinutes

  const existingBookings = await payload.find({
    collection: 'bookings',
    limit: 500,
    where: {
      and: [
        {
          date: {
            equals: date,
          },
        },
        {
          status: {
            not_equals: 'cancelled',
          },
        },
      ],
    },
  })

  const overlappingBookings =
    existingBookings.docs.filter((booking) => {
      if (!booking.time) {
        return false
      }

      const existingStart =
        timeToMinutes(booking.time)

      const existingDuration =
        Number(booking.durationMinutes) ||
        durationMinutes

      const existingEnd =
        existingStart + existingDuration

      return bookingsOverlap(
        candidateStart,
        candidateEnd,
        existingStart,
        existingEnd,
      )
    })

  for (
    let slotStart = candidateStart;
    slotStart < candidateEnd;
    slotStart += settings.intervalMinutes
  ) {
    const slotEnd =
      slotStart + settings.intervalMinutes

    const guestsAtThisTime =
      overlappingBookings
        .filter((booking) => {
          if (!booking.time) {
            return false
          }

          const existingStart =
            timeToMinutes(booking.time)

          const existingDuration =
            Number(booking.durationMinutes) ||
            durationMinutes

          const existingEnd =
            existingStart + existingDuration

          return bookingsOverlap(
            slotStart,
            slotEnd,
            existingStart,
            existingEnd,
          )
        })
        .reduce(
          (total, booking) =>
            total + Number(booking.guests || 0),
          0,
        )

    if (
      guestsAtThisTime + guestCount >
      settings.maxGuestsPerSlot
    ) {
      return NextResponse.json(
        {
          error:
            'Det finns inte tillräckligt med plats under hela den valda bokningstiden.',
        },
        { status: 400 },
      )
    }
  }

  const booking = await payload.create({
    collection: 'bookings',
    data: {
      date,
      guests: guestCount,
      time,
      durationMinutes,
      name,
      email,
      phone,
      message,
      status: 'confirmed',
    },
  })

  await payload.sendEmail({
    to: email,
    subject: 'Din bordsbokning är bekräftad',
    html: `
      <h1>Din bokning är bekräftad!</h1>

      <p>Hej ${name},</p>

      <p>Din bordsbokning är nu bekräftad.</p>

      <p>
        <strong>Datum:</strong> ${date}<br />
        <strong>Tid:</strong> ${time}<br />
        <strong>Antal personer:</strong> ${guestCount}<br />
        <strong>Bokningstid:</strong> ${durationMinutes} minuter
      </p>

      <p>Vi ser fram emot att träffa er!</p>
    `,
  })

  const restaurantEmail =
    process.env.RESTAURANT_EMAIL

  if (restaurantEmail) {
    await payload.sendEmail({
      to: restaurantEmail,
      subject: `Ny bekräftad bokning - ${date} ${time}`,
      html: `
        <h1>Ny bekräftad bordsbokning</h1>

        <h2>Bokningsinformation</h2>

        <p>
          <strong>Datum:</strong> ${date}<br />
          <strong>Tid:</strong> ${time}<br />
          <strong>Bokningstid:</strong> ${durationMinutes} minuter<br />
          <strong>Antal personer:</strong> ${guestCount}
        </p>

        <h2>Gäst</h2>

        <p>
          <strong>Namn:</strong> ${name}<br />
          <strong>E-post:</strong> ${email}<br />
          <strong>Telefon:</strong> ${phone}
        </p>

        ${
          message
            ? `
              <h2>Meddelande</h2>
              <p>${message}</p>
            `
            : ''
        }

        <p>
          Bokningen finns även i administrationspanelen.
        </p>
      `,
    })
  }

  return NextResponse.json(
    {
      success: true,
      booking,
    },
    { status: 201 },
  )
}