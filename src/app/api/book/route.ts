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

const RESTAURANT_NAME = 'Bonnatösens Saloon'
const RESTAURANT_LOCATION = 'Nora'

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

function formatBookingDate(date: string) {
  const [year, month, day] = date
    .split('-')
    .map(Number)

  const value = new Date(
    year,
    month - 1,
    day,
  )

  const formatted =
    new Intl.DateTimeFormat('sv-SE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(value)

  return (
    formatted.charAt(0).toUpperCase() +
    formatted.slice(1)
  )
}

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
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

  if (
    !date ||
    !guests ||
    !time ||
    !name ||
    !email ||
    !phone
  ) {
    return NextResponse.json(
      {
        error:
          'Alla obligatoriska fält måste fyllas i.',
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

  const selectedDate = new Date(
    `${date}T12:00:00`,
  )

  if (
    Number.isNaN(
      selectedDate.getTime(),
    )
  ) {
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
        error:
          'Det går inte att boka ett datum som redan har passerat.',
      },
      { status: 400 },
    )
  }

  const settings =
    await payload.findGlobal({
      slug: 'booking-settings',
    })

  if (
    guestCount < 1 ||
    guestCount >
      settings.maxGuestsPerBooking
  ) {
    return NextResponse.json(
      {
        error: `Max ${settings.maxGuestsPerBooking} personer per bokning.`,
      },
      { status: 400 },
    )
  }

  const selectedDay =
    dayNames[selectedDate.getDay()]

  const daySettings =
    settings[selectedDay]

  if (
    !daySettings ||
    !daySettings.bookable ||
    !daySettings.firstBookingTime ||
    !daySettings.lastBookingTime
  ) {
    return NextResponse.json(
      {
        error:
          'Restaurangen tar inte emot bokningar den dagen.',
      },
      { status: 400 },
    )
  }

  const exceptions =
    await payload.find({
      collection:
        'booking-exceptions',
      where: {
        date: {
          equals: date,
        },
      },
      limit: 100,
    })

  const fullDayException =
    exceptions.docs.some(
      (exception) =>
        exception.type ===
        'full-day',
    )

  if (fullDayException) {
    return NextResponse.json(
      {
        error:
          'Restaurangen tar inte emot bokningar det valda datumet.',
      },
      { status: 400 },
    )
  }

  const blockedTimes: string[] =
    exceptions.docs
      .filter(
        (exception) =>
          exception.type ===
          'specific-times',
      )
      .flatMap(
        (exception) =>
          exception.blockedTimes || [],
      )

  if (blockedTimes.includes(time)) {
    return NextResponse.json(
      {
        error:
          'Den valda tiden är inte tillgänglig.',
      },
      { status: 400 },
    )
  }

  const validTimes =
    generateBookingTimes(
      daySettings.firstBookingTime,
      daySettings.lastBookingTime,
      settings.intervalMinutes,
    )

  if (!validTimes.includes(time)) {
    return NextResponse.json(
      {
        error:
          'Ogiltig bokningstid.',
      },
      { status: 400 },
    )
  }

  const configuredDuration =
    Number(
      settings.bookingDurationMinutes,
    )

  const durationMinutes =
    Number.isFinite(
      configuredDuration,
    ) &&
    configuredDuration > 0
      ? configuredDuration
      : 90

  const candidateStart =
    timeToMinutes(time)

  const candidateEnd =
    candidateStart +
    durationMinutes

  const existingBookings =
    await payload.find({
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
              not_equals:
                'cancelled',
            },
          },
        ],
      },
    })

  const overlappingBookings =
    existingBookings.docs.filter(
      (booking) => {
        if (!booking.time) {
          return false
        }

        const existingStart =
          timeToMinutes(
            booking.time,
          )

        const existingDuration =
          Number(
            booking.durationMinutes,
          ) || durationMinutes

        const existingEnd =
          existingStart +
          existingDuration

        return bookingsOverlap(
          candidateStart,
          candidateEnd,
          existingStart,
          existingEnd,
        )
      },
    )

  for (
    let slotStart =
      candidateStart;
    slotStart < candidateEnd;
    slotStart +=
      settings.intervalMinutes
  ) {
    const slotEnd =
      slotStart +
      settings.intervalMinutes

    const guestsAtThisTime =
      overlappingBookings
        .filter((booking) => {
          if (!booking.time) {
            return false
          }

          const existingStart =
            timeToMinutes(
              booking.time,
            )

          const existingDuration =
            Number(
              booking.durationMinutes,
            ) || durationMinutes

          const existingEnd =
            existingStart +
            existingDuration

          return bookingsOverlap(
            slotStart,
            slotEnd,
            existingStart,
            existingEnd,
          )
        })
        .reduce(
          (total, booking) =>
            total +
            Number(
              booking.guests || 0,
            ),
          0,
        )

    if (
      guestsAtThisTime +
        guestCount >
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

  const booking =
    await payload.create({
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

  const formattedDate =
    formatBookingDate(date)

  const safeName =
    escapeHtml(name)

  const safeEmail =
    escapeHtml(email)

  const safePhone =
    escapeHtml(phone)

  const safeMessage =
    escapeHtml(message)

  /*
   * =========================
   * KUNDENS BEKRÄFTELSEMAIL
   * =========================
   */
  await payload.sendEmail({
    to: email,
    subject: `Bokning bekräftad – ${RESTAURANT_NAME}`,
    html: `
      <!doctype html>
      <html lang="sv">
        <body
          style="
            margin:0;
            padding:0;
            background:#f2f2f2;
            font-family:Arial,Helvetica,sans-serif;
            color:#111111;
          "
        >
          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="
              width:100%;
              background:#f2f2f2;
              padding:32px 12px;
            "
          >
            <tr>
              <td align="center">

                <table
                  role="presentation"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  style="
                    width:100%;
                    max-width:620px;
                    background:#ffffff;
                  "
                >

                  <!-- HEADER -->
                  <tr>
                    <td
                      style="
                        background:#0b0b0b;
                        padding:38px 36px;
                        text-align:center;
                        border-bottom:5px solid #FAC800;
                      "
                    >
                      <div
                        style="
                          margin-bottom:12px;
                          color:#FAC800;
                          font-size:11px;
                          font-weight:700;
                          letter-spacing:2px;
                          text-transform:uppercase;
                        "
                      >
                        Bokning bekräftad
                      </div>

                      <div
                        style="
                          color:#ffffff;
                          font-size:30px;
                          line-height:1.1;
                          font-weight:800;
                        "
                      >
                        ${RESTAURANT_NAME}
                      </div>

                      <div
                        style="
                          margin-top:8px;
                          color:#aaaaaa;
                          font-size:14px;
                        "
                      >
                        ${RESTAURANT_LOCATION}
                      </div>
                    </td>
                  </tr>

                  <!-- INTRO -->
                  <tr>
                    <td
                      style="
                        padding:
                          38px 36px
                          10px 36px;
                      "
                    >
                      <h1
                        style="
                          margin:0 0 16px;
                          font-size:25px;
                          line-height:1.25;
                          color:#111111;
                        "
                      >
                        Hej ${safeName}!
                      </h1>

                      <p
                        style="
                          margin:0;
                          color:#555555;
                          font-size:16px;
                          line-height:1.7;
                        "
                      >
                        Din bordsbokning är
                        bekräftad. Här hittar
                        du all information om
                        ditt besök.
                      </p>
                    </td>
                  </tr>

                  <!-- PLATS -->
                  <tr>
                    <td
                      style="
                        padding:
                          28px 36px
                          0 36px;
                      "
                    >
                      <table
                        role="presentation"
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        style="
                          background:#FAC800;
                        "
                      >
                        <tr>
                          <td
                            style="
                              padding:22px 24px;
                            "
                          >
                            <div
                              style="
                                margin-bottom:7px;
                                color:#111111;
                                font-size:10px;
                                font-weight:800;
                                letter-spacing:2px;
                                text-transform:uppercase;
                              "
                            >
                              Din bokning gäller
                            </div>

                            <div
                              style="
                                color:#111111;
                                font-size:24px;
                                line-height:1.2;
                                font-weight:800;
                              "
                            >
                              ${RESTAURANT_NAME}
                            </div>

                            <div
                              style="
                                margin-top:6px;
                                color:#111111;
                                font-size:14px;
                              "
                            >
                              ${RESTAURANT_LOCATION}
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- BOKNINGSDETALJER -->
                  <tr>
                    <td
                      style="
                        padding:36px;
                      "
                    >
                      <div
                        style="
                          margin-bottom:20px;
                          color:#777777;
                          font-size:10px;
                          font-weight:800;
                          letter-spacing:2px;
                          text-transform:uppercase;
                        "
                      >
                        Bokningsinformation
                      </div>

                      <table
                        role="presentation"
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        style="
                          width:100%;
                          border-collapse:collapse;
                        "
                      >
                        <tr>
                          <td
                            style="
                              padding:15px 0;
                              border-bottom:
                                1px solid #e5e5e5;
                              color:#777777;
                              font-size:14px;
                            "
                          >
                            Datum
                          </td>

                          <td
                            align="right"
                            style="
                              padding:15px 0;
                              border-bottom:
                                1px solid #e5e5e5;
                              color:#111111;
                              font-size:14px;
                              font-weight:700;
                            "
                          >
                            ${formattedDate}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:15px 0;
                              border-bottom:
                                1px solid #e5e5e5;
                              color:#777777;
                              font-size:14px;
                            "
                          >
                            Tid
                          </td>

                          <td
                            align="right"
                            style="
                              padding:15px 0;
                              border-bottom:
                                1px solid #e5e5e5;
                              color:#111111;
                              font-size:14px;
                              font-weight:700;
                            "
                          >
                            ${escapeHtml(time)}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:15px 0;
                              border-bottom:
                                1px solid #e5e5e5;
                              color:#777777;
                              font-size:14px;
                            "
                          >
                            Antal gäster
                          </td>

                          <td
                            align="right"
                            style="
                              padding:15px 0;
                              border-bottom:
                                1px solid #e5e5e5;
                              color:#111111;
                              font-size:14px;
                              font-weight:700;
                            "
                          >
                            ${guestCount}
                            ${
                              guestCount === 1
                                ? 'person'
                                : 'personer'
                            }
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              padding:15px 0;
                              color:#777777;
                              font-size:14px;
                            "
                          >
                            Bokningen står på
                          </td>

                          <td
                            align="right"
                            style="
                              padding:15px 0;
                              color:#111111;
                              font-size:14px;
                              font-weight:700;
                            "
                          >
                            ${safeName}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td
                      style="
                        background:#0b0b0b;
                        padding:30px 36px;
                        text-align:center;
                      "
                    >
                      <p
                        style="
                          margin:0;
                          color:#ffffff;
                          font-size:16px;
                          font-weight:700;
                        "
                      >
                        Vi ser fram emot att
                        träffa er!
                      </p>

                      <p
                        style="
                          margin:8px 0 0;
                          color:#FAC800;
                          font-size:13px;
                          font-weight:700;
                        "
                      >
                        ${RESTAURANT_NAME}
                      </p>
                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  })

  /*
   * =========================
   * MAIL TILL RESTAURANGEN
   * =========================
   */
  const restaurantEmail =
    process.env.RESTAURANT_EMAIL

  if (restaurantEmail) {
    await payload.sendEmail({
      to: restaurantEmail,
      subject:
        `Ny bokning – ${formattedDate} ${time} – ${guestCount} ${
          guestCount === 1
            ? 'person'
            : 'personer'
        }`,
      html: `
        <!doctype html>
        <html lang="sv">
          <body
            style="
              margin:0;
              padding:0;
              background:#f2f2f2;
              font-family:Arial,Helvetica,sans-serif;
              color:#111111;
            "
          >
            <table
              role="presentation"
              width="100%"
              cellspacing="0"
              cellpadding="0"
              border="0"
              style="
                width:100%;
                background:#f2f2f2;
                padding:32px 12px;
              "
            >
              <tr>
                <td align="center">

                  <table
                    role="presentation"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    style="
                      width:100%;
                      max-width:620px;
                      background:#ffffff;
                    "
                  >

                    <!-- HEADER -->
                    <tr>
                      <td
                        style="
                          background:#0b0b0b;
                          padding:32px 36px;
                          border-bottom:
                            5px solid #FAC800;
                        "
                      >
                        <div
                          style="
                            color:#FAC800;
                            font-size:10px;
                            font-weight:800;
                            letter-spacing:2px;
                            text-transform:uppercase;
                          "
                        >
                          Ny bekräftad bokning
                        </div>

                        <div
                          style="
                            margin-top:10px;
                            color:#ffffff;
                            font-size:27px;
                            font-weight:800;
                          "
                        >
                          ${RESTAURANT_NAME}
                        </div>
                      </td>
                    </tr>

                    <!-- VIKTIG INFO -->
                    <tr>
                      <td
                        style="
                          padding:32px 36px
                            0 36px;
                        "
                      >
                        <table
                          role="presentation"
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                          style="
                            background:#FAC800;
                          "
                        >
                          <tr>
                            <td
                              style="
                                padding:22px;
                              "
                            >
                              <div
                                style="
                                  font-size:22px;
                                  line-height:1.3;
                                  font-weight:800;
                                  color:#111111;
                                "
                              >
                                ${formattedDate}
                                kl. ${escapeHtml(time)}
                              </div>

                              <div
                                style="
                                  margin-top:5px;
                                  color:#111111;
                                  font-size:15px;
                                "
                              >
                                ${guestCount}
                                ${
                                  guestCount === 1
                                    ? 'person'
                                    : 'personer'
                                }
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- GÄST -->
                    <tr>
                      <td
                        style="
                          padding:34px 36px;
                        "
                      >
                        <div
                          style="
                            margin-bottom:16px;
                            color:#777777;
                            font-size:10px;
                            font-weight:800;
                            letter-spacing:2px;
                            text-transform:uppercase;
                          "
                        >
                          Gäst
                        </div>

                        <table
                          role="presentation"
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                          style="
                            border-collapse:
                              collapse;
                          "
                        >
                          <tr>
                            <td
                              style="
                                padding:12px 0;
                                border-bottom:
                                  1px solid #e5e5e5;
                                color:#777777;
                              "
                            >
                              Namn
                            </td>

                            <td
                              align="right"
                              style="
                                padding:12px 0;
                                border-bottom:
                                  1px solid #e5e5e5;
                                font-weight:700;
                              "
                            >
                              ${safeName}
                            </td>
                          </tr>

                          <tr>
                            <td
                              style="
                                padding:12px 0;
                                border-bottom:
                                  1px solid #e5e5e5;
                                color:#777777;
                              "
                            >
                              Telefon
                            </td>

                            <td
                              align="right"
                              style="
                                padding:12px 0;
                                border-bottom:
                                  1px solid #e5e5e5;
                                font-weight:700;
                              "
                            >
                              ${safePhone}
                            </td>
                          </tr>

                          <tr>
                            <td
                              style="
                                padding:12px 0;
                                color:#777777;
                              "
                            >
                              E-post
                            </td>

                            <td
                              align="right"
                              style="
                                padding:12px 0;
                                font-weight:700;
                              "
                            >
                              ${safeEmail}
                            </td>
                          </tr>
                        </table>

                        ${
                          message
                            ? `
                              <div
                                style="
                                  margin-top:30px;
                                  padding:20px;
                                  background:#f5f5f5;
                                "
                              >
                                <div
                                  style="
                                    margin-bottom:8px;
                                    color:#777777;
                                    font-size:10px;
                                    font-weight:800;
                                    letter-spacing:2px;
                                    text-transform:uppercase;
                                  "
                                >
                                  Meddelande
                                </div>

                                <div
                                  style="
                                    color:#111111;
                                    font-size:14px;
                                    line-height:1.6;
                                  "
                                >
                                  ${safeMessage}
                                </div>
                              </div>
                            `
                            : ''
                        }
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          background:#0b0b0b;
                          padding:24px 36px;
                          text-align:center;
                          color:#aaaaaa;
                          font-size:12px;
                        "
                      >
                        Bokningen finns även
                        i administrationspanelen.
                      </td>
                    </tr>

                  </table>

                </td>
              </tr>
            </table>
          </body>
        </html>
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