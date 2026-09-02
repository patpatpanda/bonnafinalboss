'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function BonnaHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#242424] bg-[#0b0b0b]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
       <Link href="/" className="relative block h-[105px] w-[150px] md:h-[100px] md:w-[250px]">
  <Image
    src="/images/bonlogga.png"
    alt="Bonnatösens Burgare"
    fill
    priority
    className="object-contain object-left"
  />
</Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b978f] transition hover:text-[#d7a52b]"
          >
            Hem
          </Link>

          <Link
            href="/menu"
            className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b978f] transition hover:text-[#d7a52b]"
          >
            Meny
          </Link>

          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b978f] transition hover:text-[#d7a52b]"
          >
            Shop
          </Link>
          <Link href="/#opening-hours">
  Öppettider
</Link>

          <Link
            href="/book"
            className="border border-[#d7a52b] bg-[#d7a52b] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#111111] transition hover:bg-transparent hover:text-[#d7a52b]"
          >
            Boka bord
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Öppna meny"
        >
          <span className="h-px w-7 bg-[#f4f0e8]" />
          <span className="h-px w-7 bg-[#f4f0e8]" />
          <span className="h-px w-7 bg-[#f4f0e8]" />
        </button>
      </div>

      {open && (
        <div className="border-t border-[#242424] bg-[#0b0b0b] px-5 py-6 md:hidden">
          <nav className="flex flex-col">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="border-b border-[#242424] py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#f4f0e8]"
            >
              Hem
            </Link>

            <Link
              href="/menu"
              onClick={() => setOpen(false)}
              className="border-b border-[#242424] py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#f4f0e8]"
            >
              Meny
            </Link>

            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="border-b border-[#242424] py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#f4f0e8]"
            >
              Shop
            </Link>

            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="mt-6 bg-[#d7a52b] px-5 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-[#111111]"
            >
              Boka bord
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}