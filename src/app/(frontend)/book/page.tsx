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
          HERO
      ========================= */}
      <section className="relative overflow-hidden border-b border-[#242424]">

        {/* BAKGRUND */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#201b08_0%,#0b0b0b_58%)]" />

        {/* DISKRET STRUKTUR */}
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,rgba(250,200,0,.12)_0,transparent_20%),radial-gradient(circle_at_80%_75%,rgba(250,200,0,.08)_0,transparent_28%)]" />

        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl flex-col items-center justify-center px-5 py-24 text-center md:px-10">

          {/* LITEN RUBRIK */}
          <div className="mb-6 flex items-center gap-4">

            <span className="h-px w-12 bg-[#FAC800] md:w-24" />

            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white md:text-xs">
              Bonnatösens Saloon
            </span>

            <span className="h-px w-12 bg-[#FAC800] md:w-24" />

          </div>

          {/* HUVUDRUBRIK */}
          <h1
            className="text-6xl font-black uppercase leading-[0.82] tracking-[-0.05em] text-white sm:text-7xl md:text-8xl lg:text-[8.5rem]"
            style={{
              fontFamily:
                'Georgia, Times New Roman, serif',
            }}
          >
            Boka
            <br />
            bord
          </h1>

          {/* ACCENT */}
          <div className="mt-8 flex items-center gap-3">

            <span className="h-px w-16 bg-[#FAC800]" />

            <span className="h-[4px] w-[4px] rotate-45 bg-[#FAC800]" />

            <span className="h-px w-16 bg-[#FAC800]" />

          </div>

          {/* BESKRIVNING */}
          <p className="mt-7 max-w-xl text-base leading-7 text-white md:text-lg">
            Här bokar du bord på{' '}
            <strong className="font-bold text-white">
              Bonnatösens Saloon
            </strong>{' '}
            inne på bryggeriområdet i Nora.
          </p>

          {/* PLATS */}
          <div className="mt-7 border border-[#FAC800] bg-black/40 px-6 py-3">

            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
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

            <h2
              className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white md:text-6xl"
              style={{
                fontFamily:
                  'Georgia, Times New Roman, serif',
              }}
            >
              Säkra ditt bord
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white md:text-base">
              Välj datum, antal personer och en ledig tid.
              Bokningen gäller Saloonen på bryggeriområdet i Nora.
            </p>

          </div>

          {/* =========================
              WESTERN-KORT
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

                <h3
                  className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] md:text-5xl"
                  style={{
                    fontFamily:
                      'Georgia, Times New Roman, serif',
                  }}
                >
                  Bordsbokning
                </h3>

                {/* WESTERN-LINJE */}
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