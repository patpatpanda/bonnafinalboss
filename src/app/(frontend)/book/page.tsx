import { getPayload } from 'payload'
import config from '@payload-config'

import BookingForm from './BookingForm'
import { generateBookingTimes } from '@/utilities/generateBookingTimes'
import Image from 'next/image'
export default async function BookPage() {
  const payload = await getPayload({ config })

  const settings = await payload.findGlobal({
    slug: 'booking-settings',
  })

  const times = generateBookingTimes(
    settings.firstBookingTime,
    settings.lastBookingTime,
    settings.intervalMinutes,
  )

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-[#f4f0e8]">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#242424]">
        {/* Subtil bakgrund */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1b1b1b_0%,#0b0b0b_55%)]" />

       

        <div className="relative mx-auto flex min-h-[65vh] max-w-7xl flex-col items-center justify-center px-5 py-24 text-center md:min-h-[70vh] md:px-10">

          {/* Liten överrubrik */}
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-10 bg-[#d7a52b] md:w-20" />
<Image
  src="/images/bonnatosen-logo.png"
  alt="Bonnatösens Burgare"
  width={320}
  height={190}
  priority
  className="mb-10 h-auto w-[210px] opacity-90 sm:w-[250px] md:w-[290px]"
/>
           

            <span className="h-px w-10 bg-[#d7a52b] md:w-20" />
          </div>

          {/* Huvudrubrik */}
          <h1 className="text-6xl font-black uppercase leading-[0.85] tracking-[-0.05em] text-[#f4f0e8] sm:text-7xl md:text-8xl lg:text-[9rem]">
            Boka
            <br />
            <span className="text-[#d7a52b]">bord</span>
          </h1>

          {/* Intro */}
          <p className="mt-8 max-w-lg text-base leading-7 text-[#9b978f] md:mt-10 md:text-lg">
            Välj dag, antal personer och en ledig tid.
            <br className="hidden sm:block" />
            Din bokning bekräftas direkt.
          </p>

          {/* Öppet */}
          <div className="mt-10 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#68645e]">
            <span className="h-1.5 w-1.5 bg-[#d7a52b]" />
            Bokning torsdag – söndag
          </div>

          {/* Pil */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#55514c]">
            <span className="text-2xl">↓</span>
          </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section className="relative px-4 py-20 sm:px-6 md:py-28 lg:px-10">

        <div className="mx-auto max-w-5xl">

          {/* Rubrik ovanför formuläret */}
          <div className="mb-10 md:mb-14">
            <div className="mb-4 flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d7a52b]">
                Reservation
              </span>

              <span className="h-px flex-1 bg-[#242424]" />
            </div>

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <h2 className="max-w-xl text-3xl font-black uppercase leading-tight tracking-[-0.03em] text-[#f4f0e8] md:text-5xl">
                Säkra ditt bord
              </h2>

              <p className="max-w-sm text-sm leading-6 text-[#77736c]">
                Tillgängliga tider anpassas automatiskt efter datum,
                antal personer och befintliga bokningar.
              </p>
            </div>
          </div>

          {/* Formuläret */}
          <BookingForm
            times={times}
            maxGuestsPerBooking={settings.maxGuestsPerBooking}
          />

        </div>
      </section>

      {/* INFO UNDER FORM */}
      <section className="border-t border-[#242424] bg-[#0e0e0e]">
        <div className="mx-auto grid max-w-5xl md:grid-cols-3">

          <div className="border-b border-[#242424] px-6 py-10 md:border-b-0 md:border-r md:px-8">
            <span className="text-xs font-bold tracking-[0.25em] text-[#d7a52b]">
              01
            </span>

            <h3 className="mt-4 text-lg font-black uppercase text-[#f4f0e8]">
              Välj en tid
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#77736c]">
              Du ser bara tider där det fortfarande finns plats för ert
              sällskap.
            </p>
          </div>

          <div className="border-b border-[#242424] px-6 py-10 md:border-b-0 md:border-r md:px-8">
            <span className="text-xs font-bold tracking-[0.25em] text-[#d7a52b]">
              02
            </span>

            <h3 className="mt-4 text-lg font-black uppercase text-[#f4f0e8]">
              Direkt bekräftelse
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#77736c]">
              När bokningen är genomförd reserveras bordet direkt.
            </p>
          </div>

          <div className="px-6 py-10 md:px-8">
            <span className="text-xs font-bold tracking-[0.25em] text-[#d7a52b]">
              03
            </span>

            <h3 className="mt-4 text-lg font-black uppercase text-[#f4f0e8]">
              Bekräftelse via mejl
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#77736c]">
              Du får information om bokningen skickad till din e-post.
            </p>
          </div>

        </div>
      </section>

     
    </main>
  )
}