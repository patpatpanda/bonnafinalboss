
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Webshop – Kommer snart | Bonnatösen',
  description:
    'Snart öppnar Bonnatösens webshop. Håll utkik!',
}

export default function ShopPage() {
  return (
    <main className="min-h-[80vh] bg-[#FAF9F6] text-[#111111] flex items-center justify-center px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">

        {/* Etikett */}
        <div className="mb-8 inline-flex items-center gap-3">
          <span className="h-[2px] w-8 bg-[#FAC800]" />
          <span className="text-xs font-bold uppercase tracking-[0.3em]">
            Bonnatösen Webshop
          </span>
          <span className="h-[2px] w-8 bg-[#FAC800]" />
        </div>

        {/* Rubrik */}
        <h1 className="text-5xl font-black uppercase tracking-tight sm:text-7xl md:text-8xl">
          Något nytt
          <span className="block text-[#D5A900]">
            är på gång!
          </span>
        </h1>

        {/* Gul linje */}
        <div className="mx-auto my-10 h-[5px] w-20 bg-[#FAC800]" />

        {/* Beskrivning */}
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-black/65 sm:text-xl">
          Vi jobbar på att öppna vår alldeles egna webshop!
          Snart kommer du kunna handla från Bonnatösen
          direkt här på hemsidan.
        </p>

        <p className="mt-6 text-sm font-semibold uppercase tracking-widest">
          Håll utkik – vi ses snart!
        </p>

        {/* Tillbaka */}
        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#FAC800] px-10 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
          >
            Tillbaka till startsidan
          </Link>
        </div>

      </div>
    </main>
  )
}
