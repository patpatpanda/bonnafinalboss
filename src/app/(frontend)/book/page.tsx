import { getPayload } from 'payload'
import config from '@payload-config'

import BookingForm from './BookingForm'

export default async function BookPage() {
  const payload = await getPayload({ config })

  const settings = await payload.findGlobal({
    slug: 'booking-settings',
  })

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">

      {/* =========================
          BOKNING
      ========================= */}
      <section className="px-4 pb-20 pt-28 sm:px-6 md:pb-28 md:pt-36 lg:px-10">

        <div className="mx-auto max-w-5xl">

          {/* =========================
              INTRO
          ========================= */}
          <div className="mb-10 text-center md:mb-14">

            <div className="mb-5 flex items-center justify-center gap-4">

              <span className="h-px w-12 bg-[#FAC800]" />

              <span className="text-xs font-black uppercase tracking-[0.3em] text-white">
                Reservation
              </span>

              <span className="h-px w-12 bg-[#FAC800]" />

            </div>

            <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white md:text-6xl">
              Säkra ditt bord
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/70 md:text-base">
              Välj datum, antal personer och en ledig tid.
              Bokningen gäller Saloonen på bryggeriområdet i Nora.
            </p>

          </div>

          {/* =========================
              BOKNINGSKORT
          ========================= */}
          <div
            className="
              relative
              overflow-hidden
              bg-[#d7bc84]
              px-5
              py-8
              text-[#4a3820]
              shadow-[0_30px_100px_rgba(0,0,0,0.55)]

              sm:px-8

              md:px-12
              md:py-12
            "
          >

            {/* PAPPERSSTRUKTUR */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-45

                [background-image:
                  radial-gradient(circle_at_15%_20%,rgba(90,60,24,.18)_0,transparent_24%),
                  radial-gradient(circle_at_85%_75%,rgba(90,60,24,.14)_0,transparent_28%),
                  linear-gradient(rgba(255,255,255,.10),rgba(80,50,20,.08))
                ]
              "
            />

            {/* YTTRE RAM */}
            <div className="pointer-events-none absolute inset-3 border border-[#735630]/80" />

            {/* INRE RAM */}
            <div className="pointer-events-none absolute inset-5 border border-[#735630]/40" />

            <div className="relative z-10">

              {/* =========================
                  KORT HEADER
              ========================= */}
              <div className="mb-8 text-center">

                <p className="text-[10px] font-black uppercase tracking-[0.35em]">
                  Bonnatösens Saloon
                </p>

                <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] md:text-5xl">
                  Bordsbokning
                </h2>

                {/* LINJE */}
                <div className="mx-auto mt-5 flex max-w-md items-center gap-3">

                  <span className="h-px flex-1 bg-[#75562c]" />

                  <span className="h-[5px] w-[5px] rotate-45 bg-[#75562c]" />

                  <span className="h-px flex-1 bg-[#75562c]" />

                </div>

              </div>

              {/* =========================
                  FORMULÄR
              ========================= */}
              <BookingForm
                times={[]}
                maxGuestsPerBooking={
                  settings.maxGuestsPerBooking
                }
              />

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}