'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function BonnaHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-white/10
        bg-black/55
        shadow-[0_8px_32px_rgba(0,0,0,0.18)]
        backdrop-blur-xl
        backdrop-saturate-150
      "
    >
      {/* SUBTIL GLAS-HIGHLIGHT */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">

        {/* LOGGA */}
        <Link
          href="/"
          className="relative block h-[120px] w-[220px] md:h-[130px] md:w-[220px]"
        >
          <Image
            src="/images/bonnatosen-logo.png"
            alt="Bonnatösens Burgare"
            fill
            priority
            sizes="(max-width: 768px) 150px, 250px"
            className="object-contain object-left"
          />
        </Link>

        {/* =========================
            DESKTOP
        ========================= */}
        <nav className="hidden items-center gap-7 md:flex">

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
            href="/platser/ladan"
            className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4f0e8] transition hover:text-[#FAC800]"
          >
            Ladan
          </Link>

          <Link
            href="/platser/saloon"
            className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4f0e8] transition hover:text-[#FAC800]"
          >
            Saloonen
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
              shadow-[0_8px_25px_rgba(250,200,0,0.12)]
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
          onClick={() => setOpen((current) => !current)}
          className="
            flex
            flex-col
            gap-1.5
            rounded-sm
            border
            border-white/10
            bg-white/5
            p-3
            backdrop-blur-md
            transition

            hover:border-[#FAC800]/50
            hover:bg-white/10

            md:hidden
          "
          aria-label={open ? 'Stäng meny' : 'Öppna meny'}
          aria-expanded={open}
        >
          <span
            className={`h-px w-6 bg-[#FAC800] transition ${
              open ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />

          <span
            className={`h-px w-6 bg-[#FAC800] transition ${
              open ? 'opacity-0' : ''
            }`}
          />

          <span
            className={`h-px w-6 bg-[#FAC800] transition ${
              open ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>

      </div>

      {/* =========================
          MOBILMENY
      ========================= */}
      {open && (
        <div
          className="
            border-t
            border-white/10
            bg-black/70
            px-5
            py-6
            shadow-[0_20px_50px_rgba(0,0,0,0.35)]
            backdrop-blur-2xl
            backdrop-saturate-150

            md:hidden
          "
        >
          <nav className="flex flex-col">

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="
                border-b
                border-white/10
                py-4
                text-sm
                font-bold
                uppercase
                tracking-[0.18em]
                text-white
                transition

                hover:border-[#FAC800]/30
                hover:text-[#FAC800]
              "
            >
              Hem
            </Link>

            <Link
              href="/menu"
              onClick={() => setOpen(false)}
              className="
                border-b
                border-white/10
                py-4
                text-sm
                font-bold
                uppercase
                tracking-[0.18em]
                text-white
                transition

                hover:border-[#FAC800]/30
                hover:text-[#FAC800]
              "
            >
              Meny
            </Link>

            <Link
              href="/platser/ladan"
              onClick={() => setOpen(false)}
              className="
                border-b
                border-white/10
                py-4
                text-sm
                font-bold
                uppercase
                tracking-[0.18em]
                text-white
                transition

                hover:border-[#FAC800]/30
                hover:text-[#FAC800]
              "
            >
              Ladan
            </Link>

            <Link
              href="/platser/saloon"
              onClick={() => setOpen(false)}
              className="
                border-b
                border-white/10
                py-4
                text-sm
                font-bold
                uppercase
                tracking-[0.18em]
                text-white
                transition

                hover:border-[#FAC800]/30
                hover:text-[#FAC800]
              "
            >
              Saloonen
            </Link>

            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="
                border-b
                border-white/10
                py-4
                text-sm
                font-bold
                uppercase
                tracking-[0.18em]
                text-white
                transition

                hover:border-[#FAC800]/30
                hover:text-[#FAC800]
              "
            >
              Shop
            </Link>

            <Link
              href="/#opening-hours"
              onClick={() => setOpen(false)}
              className="
                border-b
                border-white/10
                py-4
                text-sm
                font-bold
                uppercase
                tracking-[0.18em]
                text-white
                transition

                hover:border-[#FAC800]/30
                hover:text-[#FAC800]
              "
            >
              Öppettider
            </Link>

            {/* BOKA BORD */}
            <Link
              href="/book"
              onClick={() => setOpen(false)}
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
                shadow-[0_8px_30px_rgba(250,200,0,0.12)]
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