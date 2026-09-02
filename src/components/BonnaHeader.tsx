'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function BonnaHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#242424] bg-[#0b0b0b]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">

        {/* LOGGA */}
        <Link
          href="/"
          className="relative block h-[105px] w-[150px] md:h-[100px] md:w-[250px]"
        >
          <Image
            src="/images/bonlogga.png"
            alt="Bonnatösens Burgare"
            fill
            priority
            className="object-contain object-left"
          />
        </Link>

        {/* =========================
            DESKTOP
        ========================= */}
        <nav className="hidden items-center gap-8 md:flex">

          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4f0e8] transition hover:text-[#FAC800]"
          >
            Hem
          </Link>

          <Link
            href="/menu"
            className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4f0e8] transition hover:text-[#FAC800]"
          >
            Meny
          </Link>

          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4f0e8] transition hover:text-[#FAC800]"
          >
            Shop
          </Link>

          <Link
            href="/#opening-hours"
            className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4f0e8] transition hover:text-[#FAC800]"
          >
            Öppettider
          </Link>

          {/* BOKA BORD */}
          <Link
            href="/book"
            className="
              border
              border-[#FAC800]
              bg-[#FAC800]
              px-5
              py-3
              text-xs
              font-black
              uppercase
              tracking-[0.18em]
              text-[#111111]
              transition
              hover:bg-transparent
              hover:text-[#FAC800]
            "
          >
            Boka bord
          </Link>

        </nav>

        {/* =========================
            HAMBURGER
        ========================= */}
        <button
          type="button"
          onClick={() =>
            setOpen((current) => !current)
          }
          className="flex flex-col gap-1.5 md:hidden"
          aria-label={
            open
              ? 'Stäng meny'
              : 'Öppna meny'
          }
          aria-expanded={open}
        >
          <span
            className={`h-px w-7 bg-[#FAC800] transition ${
              open
                ? 'translate-y-[7px] rotate-45'
                : ''
            }`}
          />

          <span
            className={`h-px w-7 bg-[#FAC800] transition ${
              open ? 'opacity-0' : ''
            }`}
          />

          <span
            className={`h-px w-7 bg-[#FAC800] transition ${
              open
                ? '-translate-y-[7px] -rotate-45'
                : ''
            }`}
          />
        </button>

      </div>

      {/* =========================
          MOBILMENY
      ========================= */}
      {open && (
        <div className="border-t border-[#242424] bg-[#0b0b0b] px-5 py-6 md:hidden">

          <nav className="flex flex-col">

            <Link
              href="/"
              onClick={() =>
                setOpen(false)
              }
              className="border-b border-[#242424] py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:text-[#FAC800]"
            >
              Hem
            </Link>

            <Link
              href="/menu"
              onClick={() =>
                setOpen(false)
              }
              className="border-b border-[#242424] py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:text-[#FAC800]"
            >
              Meny
            </Link>

            <Link
              href="/shop"
              onClick={() =>
                setOpen(false)
              }
              className="border-b border-[#242424] py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:text-[#FAC800]"
            >
              Shop
            </Link>

            <Link
              href="/#opening-hours"
              onClick={() =>
                setOpen(false)
              }
              className="border-b border-[#242424] py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:text-[#FAC800]"
            >
              Öppettider
            </Link>

            {/* BOKA BORD */}
            <Link
              href="/book"
              onClick={() =>
                setOpen(false)
              }
              className="
                mt-6
                border
                border-[#FAC800]
                bg-[#FAC800]
                px-5
                py-4
                text-center
                text-sm
                font-black
                uppercase
                tracking-[0.18em]
                text-[#111111]
                transition
                hover:bg-transparent
                hover:text-[#FAC800]
              "
            >
              Boka bord
            </Link>

          </nav>

        </div>
      )}

    </header>
  )
}