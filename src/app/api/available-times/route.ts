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

export async function GET(request: Request) {
  const payload = await getPayload({ config })

  const { searchParams } = new URL(request.url)

  const date = searchParams.get('date')
  const guests = Number(searchParams.get('guests'))

  // Kontrollera input
  if (!date || !guests) {
    return NextResponse.json(
      { error: 'Datum och antal personer krävs.' },
      { status: 400 },
    )
  }

  // Hämta bokningsinställningarna
  const settings = await payload.findGlobal({
    slug: 'booking-settings',
  })

  // Kontrollera antal personer
  if (
    guests < 1 ||
    guests > settings.maxGuestsPerBooking
  ) {
    return NextResponse.json(
      { error: 'Ogiltigt antal personer.' },
      { status: 400 },
    )
  }

  // Kontrollera att vald veckodag är bokningsbar
  const selectedDate = new Date(`${date}T12:00:00`)
  const selectedDay = dayNames[selectedDate.getDay()]

  if (!settings.bookableDays?.includes(selectedDay)) {
    return NextResponse.json({
      availableTimes: [],
    })
  }

  // Hämta eventuella undantag för datumet
  const exceptions = await payload.find({
    collection: 'booking-exceptions',
    where: {
      date: {
        equals: date,
      },
    },
  })

  // Om hela dagen är blockerad
  const fullDayException = exceptions.docs.find(
    (exception) => exception.type === 'full-day',
  )

  if (fullDayException) {
    return NextResponse.json({
      availableTimes: [],
    })
  }

  // Samla alla blockerade tider för datumet
 const blockedTimes: string[] = exceptions.docs
  .filter(
    (exception) =>
      exception.type === 'specific-times',
  )
  .flatMap(
    (exception) =>
      exception.blockedTimes || [],
  )

  // Generera alla normala bokningstider
  const allTimes = generateBookingTimes(
    settings.firstBookingTime,
    settings.lastBookingTime,
    settings.intervalMinutes,
  )

  // Hämta befintliga bokningar för datumet
  const bookings = await payload.find({
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

  // Filtrera fram tider som faktiskt är tillgängliga
  const availableTimes = allTimes.filter((time) => {
    // Blockerad manuellt via undantag
    if (blockedTimes.includes(time)) {
      return false
    }

    // Räkna hur många gäster som redan är bokade
    const bookedGuests = bookings.docs
      .filter((booking) => booking.time === time)
      .reduce(
        (total, booking) =>
          total + booking.guests,
        0,
      )

    // Kontrollera att den nya bokningen får plats
    return (
      bookedGuests + guests <=
      settings.maxGuestsPerSlot
    )
  })

  return NextResponse.json({
    availableTimes,
  })
}