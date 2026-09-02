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

export async function GET(request: Request) {
  const payload = await getPayload({ config })

  const { searchParams } = new URL(request.url)

  const date = searchParams.get('date')
  const guests = Number(searchParams.get('guests'))

  if (!date || !Number.isFinite(guests)) {
    return NextResponse.json(
      {
        error: 'Datum och antal personer krävs.',
      },
      {
        status: 400,
      },
    )
  }

  const settings = await payload.findGlobal({
    slug: 'booking-settings',
  })

  if (
    guests < 1 ||
    guests > settings.maxGuestsPerBooking
  ) {
    return NextResponse.json(
      {
        error: `Max ${settings.maxGuestsPerBooking} personer per bokning.`,
      },
      {
        status: 400,
      },
    )
  }

  const selectedDate = new Date(`${date}T12:00:00`)

  if (Number.isNaN(selectedDate.getTime())) {
    return NextResponse.json(
      {
        error: 'Ogiltigt datum.',
      },
      {
        status: 400,
      },
    )
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (selectedDate < today) {
    return NextResponse.json({
      availableTimes: [],
    })
  }

  const selectedDay = dayNames[selectedDate.getDay()]

  const daySettings = settings[selectedDay]

  if (
    !daySettings ||
    !daySettings.bookable ||
    !daySettings.firstBookingTime ||
    !daySettings.lastBookingTime
  ) {
    return NextResponse.json({
      availableTimes: [],
    })
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

  const fullDayBlocked = exceptions.docs.some(
    (exception) => exception.type === 'full-day',
  )

  if (fullDayBlocked) {
    return NextResponse.json({
      availableTimes: [],
    })
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

  const allTimes = generateBookingTimes(
    daySettings.firstBookingTime,
    daySettings.lastBookingTime,
    settings.intervalMinutes,
  )

  const configuredDuration = Number(
    settings.bookingDurationMinutes,
  )

  const durationMinutes =
    Number.isFinite(configuredDuration) &&
    configuredDuration > 0
      ? configuredDuration
      : 90

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

  const availableTimes = allTimes.filter(
    (candidateTime) => {
      if (blockedTimes.includes(candidateTime)) {
        return false
      }

      const candidateStart =
        timeToMinutes(candidateTime)

      const candidateEnd =
        candidateStart + durationMinutes

      const overlappingBookings =
        bookings.docs.filter((booking) => {
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

        const bookedGuestsAtThisTime =
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
          bookedGuestsAtThisTime + guests >
          settings.maxGuestsPerSlot
        ) {
          return false
        }
      }

      return true
    },
  )

  return NextResponse.json({
    availableTimes,
  })
}