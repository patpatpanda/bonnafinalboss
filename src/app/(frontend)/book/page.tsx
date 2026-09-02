import { getPayload } from 'payload'
import config from '@payload-config'

import BookingForm from './BookingForm'

export default async function BookPage() {
  const payload = await getPayload({ config })

  const settings = await payload.findGlobal({
    slug: 'booking-settings',
  })

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-[#f4f0e8]">
      <section className="relative overflow-hidden border-b border-[#242424]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1b1b1b_0%,#0b0b0b_55%)]" />

        <div className="relative mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-5 py-24 text-center md:px-10">

          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-10 bg-[#d7a52b] md:w-20" />

            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#d7a52b] md:text-xs">
              Bonnatösen
            </span>

            <span className="h-px w-10 bg-[#d7a52b] md:w-20" />
          </div>

          <h1 className="text-6xl font-black uppercase leading-[0.85] tracking-[-0.05em] text-[#f4f0e8] sm:text-7xl md:text-8xl lg:text-[9rem]">
            Boka
            <br />
            <span className="text-[#d7a52b]">
              bord
            </span>
          </h1>

          <p className="mt-8 max-w-lg text-base leading-7 text-[#9b978f] md:mt-10 md:text-lg">
            Välj datum, antal personer och en ledig tid.
            Din bokning bekräftas direkt.
          </p>

        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-10">
        <div className="mx-auto max-w-5xl">

          <div className="mb-10 md:mb-14">
            <div className="mb-4 flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d7a52b]">
                Reservation
              </span>

              <span className="h-px flex-1 bg-[#242424]" />
            </div>

            <h2 className="text-3xl font-black uppercase leading-tight tracking-[-0.03em] text-[#f4f0e8] md:text-5xl">
              Säkra ditt bord
            </h2>
          </div>

          <BookingForm
            times={[]}
            maxGuestsPerBooking={settings.maxGuestsPerBooking}
          />

        </div>
      </section>
    </main>
  )
}