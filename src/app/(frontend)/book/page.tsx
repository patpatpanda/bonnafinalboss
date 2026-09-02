import { getPayload } from 'payload'
import config from '@payload-config'

import BookingForm from './BookingForm'

export default async function BookPage() {
  const payload = await getPayload({ config })

  const settings = await payload.findGlobal({
    slug: 'booking-settings',
  })

  return (
    <main className="min-h-screen bg-[#0a0907] text-[#f4f0e8]">

      {/* =========================
          HERO
      ========================= */}
      <section className="relative overflow-hidden border-b border-[#2b2218]">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2b1c10_0%,#0a0907_58%)]" />

        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,rgba(215,180,105,.15)_0,transparent_20%),radial-gradient(circle_at_80%_75%,rgba(150,95,40,.12)_0,transparent_28%)]" />

        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl flex-col items-center justify-center px-5 py-24 text-center md:px-10">

          {/* ORNAMENT */}
          <div className="mb-6 text-3xl text-[#d7b469]">
            ❦
          </div>

          <div className="mb-6 flex items-center gap-4">

            <span className="h-px w-12 bg-[#d7b469] md:w-24" />

            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#d7b469] md:text-xs">
              Bonnatösens Saloon
            </span>

            <span className="h-px w-12 bg-[#d7b469] md:w-24" />

          </div>

          <h1
            className="text-6xl font-black uppercase leading-[0.82] tracking-[-0.05em] sm:text-7xl md:text-8xl lg:text-[8.5rem]"
            style={{
              fontFamily: 'Georgia, Times New Roman, serif',
            }}
          >
            Boka
            <br />

            <span className="text-[#d7b469]">
              bord
            </span>
          </h1>

          <div className="mt-8 flex items-center gap-4">
            <span className="h-px w-16 bg-[#6f5736]" />
            <span className="text-[#d7b469]">✦</span>
            <span className="h-px w-16 bg-[#6f5736]" />
          </div>

          <p className="mt-7 max-w-xl text-base leading-7 text-[#c7b8a2] md:text-lg">
            Här bokar du bord på{' '}
            <strong className="font-bold text-[#f4f0e8]">
              Bonnatösens Saloon
            </strong>{' '}
            inne på bryggeriområdet i Nora.
          </p>

          <div className="mt-7 border border-[#6f5736] bg-[#140f0a]/80 px-6 py-3">

            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#d7b469]">
              Bryggeriområdet · Nora
            </span>

          </div>

        </div>
      </section>

      {/* =========================
          BOKNING
      ========================= */}
      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-10">

        <div className="mx-auto max-w-5xl">

          {/* INTRO */}
          <div className="mb-10 text-center md:mb-14">

            <div className="mb-5 flex items-center justify-center gap-4">

              <span className="h-px w-12 bg-[#6f5736]" />

              <span className="text-xs font-black uppercase tracking-[0.3em] text-[#d7b469]">
                Reservation
              </span>

              <span className="h-px w-12 bg-[#6f5736]" />

            </div>

            <h2
              className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] md:text-6xl"
              style={{
                fontFamily: 'Georgia, Times New Roman, serif',
              }}
            >
              Säkra ditt bord
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#9f927f] md:text-base">
              Välj datum, antal personer och en ledig tid.
              Bokningen gäller Saloonen på bryggeriområdet i Nora.
            </p>

          </div>

          {/* WESTERN-KORT */}
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

            {/* RAMAR */}
            <div className="pointer-events-none absolute inset-3 border border-[#735630]/80" />
            <div className="pointer-events-none absolute inset-5 border border-[#735630]/40" />

            {/* HÖRN */}
            <WesternCorner className="left-7 top-7" />
            <WesternCorner className="right-7 top-7 rotate-90" />
            <WesternCorner className="bottom-7 right-7 rotate-180" />
            <WesternCorner className="bottom-7 left-7 -rotate-90" />

            <div className="relative z-10">

              <div className="mb-8 text-center">

                <div className="text-2xl text-[#75562c]">
                  ❦
                </div>

                <p className="mt-2 text-[10px] font-black uppercase tracking-[0.35em]">
                  Bonnatösens Saloon
                </p>

                <h3
                  className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] md:text-5xl"
                  style={{
                    fontFamily: 'Georgia, Times New Roman, serif',
                  }}
                >
                  Bordsbokning
                </h3>

                <div className="mx-auto mt-5 flex max-w-md items-center gap-4">

                  <span className="h-px flex-1 bg-[#75562c]" />

                  <span>✦</span>

                  <span className="h-px flex-1 bg-[#75562c]" />

                </div>

              </div>

              <BookingForm
                times={[]}
                maxGuestsPerBooking={settings.maxGuestsPerBooking}
              />

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}

function WesternCorner({
  className = '',
}: {
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute h-16 w-16 text-[#75562c]/70 ${className}`}
    >
      <div className="absolute left-0 top-0 h-px w-14 bg-current" />

      <div className="absolute left-0 top-0 h-14 w-px bg-current" />

      <div className="absolute left-2 top-2 text-2xl">
        ❧
      </div>
    </div>
  )
}