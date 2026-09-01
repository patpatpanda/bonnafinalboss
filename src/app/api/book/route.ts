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

  // Kontrollera obligatoriska fält
  if (!date || !guests || !time || !name || !email || !phone) {
    return NextResponse.json(
      {
        error: 'Alla obligatoriska fält måste fyllas i.',
      },
      { status: 400 },
    )
  }

  const guestCount = Number(guests)

  // Kontrollera antal gäster
  if (!Number.isFinite(guestCount)) {
    return NextResponse.json(
      {
        error: 'Ogiltigt antal personer.',
      },
      { status: 400 },
    )
  }

  // Kontrollera datum
  const selectedDate = new Date(`${date}T12:00:00`)

  if (Number.isNaN(selectedDate.getTime())) {
    return NextResponse.json(
      {
        error: 'Ogiltigt datum.',
      },
      { status: 400 },
    )
  }

  // Förhindra bokning bakåt i tiden
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

  // Hämta bokningsinställningar
  const settings = await payload.findGlobal({
    slug: 'booking-settings',
  })

  // Kontrollera max antal personer per bokning
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

  // Kontrollera att vald veckodag är bokningsbar
  const selectedDay = dayNames[selectedDate.getDay()]

  if (!settings.bookableDays?.includes(selectedDay)) {
    return NextResponse.json(
      {
        error: 'Restaurangen tar inte emot bokningar den dagen.',
      },
      { status: 400 },
    )
  }

  // Hämta eventuella bokningsundantag
  const exceptions = await payload.find({
    collection: 'booking-exceptions',
    where: {
      date: {
        equals: date,
      },
    },
  })

  // Kontrollera om hela dagen är blockerad
  const fullDayException = exceptions.docs.find(
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

  // Samla alla specifikt blockerade tider
  const blockedTimes: string[] = exceptions.docs
    .filter(
      (exception) =>
        exception.type === 'specific-times',
    )
    .flatMap(
      (exception) =>
        exception.blockedTimes || [],
    )

  // Kontrollera att vald tid inte är blockerad
  if (blockedTimes.includes(time)) {
    return NextResponse.json(
      {
        error: 'Den valda tiden är inte tillgänglig.',
      },
      { status: 400 },
    )
  }

  // Generera tillåtna bokningstider
  const validTimes = generateBookingTimes(
    settings.firstBookingTime,
    settings.lastBookingTime,
    settings.intervalMinutes,
  )

  // Kontrollera att vald tid är giltig
  if (!validTimes.includes(time)) {
    return NextResponse.json(
      {
        error: 'Ogiltig bokningstid.',
      },
      { status: 400 },
    )
  }

  // Hämta befintliga bokningar på samma datum och tid
  const existingBookings = await payload.find({
    collection: 'bookings',
    limit: 100,
    where: {
      and: [
        {
          date: {
            equals: date,
          },
        },
        {
          time: {
            equals: time,
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

  // Räkna redan bokade gäster
  const alreadyBookedGuests = existingBookings.docs.reduce(
    (total, booking) =>
      total + booking.guests,
    0,
  )

  // Kontrollera kapacitet
  if (
    alreadyBookedGuests + guestCount >
    settings.maxGuestsPerSlot
  ) {
    return NextResponse.json(
      {
        error: 'Det finns inte tillräckligt med plats på den valda tiden.',
      },
      { status: 400 },
    )
  }

  // Skapa bokningen
  const booking = await payload.create({
    collection: 'bookings',
    data: {
      date,
      guests: guestCount,
      time,
      name,
      email,
      phone,
      message,
      status: 'confirmed',
    },
  })

  // Skicka bekräftelse till gästen
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
      <strong>Antal personer:</strong> ${guestCount}
    </p>

    <p>Vi ser fram emot att träffa er!</p>
  `,
})

  // Skicka information till restaurangen
  const restaurantEmail = process.env.RESTAURANT_EMAIL

  if (restaurantEmail) {
    await payload.sendEmail({
      to: restaurantEmail,
      subject: `Ny bekräftad bokning - ${date} ${time}`,
      html: `
        <h1>Ny bordsbokning</h1>

        <p>En ny bokning har kommit in.</p>

        <h2>Bokningsinformation</h2>

        <p>
          <strong>Datum:</strong> ${date}<br />
          <strong>Tid:</strong> ${time}<br />
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