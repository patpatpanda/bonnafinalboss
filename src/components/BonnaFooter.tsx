import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa'

export default async function BonnaFooter() {
  const payload = await getPayload({ config })

  const footer = await payload.findGlobal({
    slug: 'footer',
  })

  return (
    <footer className="border-t border-[#242424] bg-[#0b0b0b] text-white">

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">

        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">

          {/* =========================
              VÄNSTER
          ========================= */}
          <div>

            {/* LOGGA */}
            <Link
              href="/"
              className="relative block h-[130px] w-[280px] md:h-[160px] md:w-[350px]"
            >
              <Image
                src="/images/bonnatosen-logo.png"
                alt="Bonnatösens Burgare"
                fill
                className="object-contain object-left"
              />
            </Link>

            {/* BESKRIVNING */}
            {footer.description && (
              <p className="mt-7 max-w-lg text-sm leading-7 text-white md:text-base">
                {footer.description}
              </p>
            )}

            {/* LÄNKAR */}
            <div className="mt-8 flex flex-wrap gap-3">

              <Link
                href="/platser/ladan"
                className="
                  border
                  border-[#333333]
                  px-5
                  py-3
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-white
                  transition
                  hover:border-[#FAC800]
                  hover:text-[#FAC800]
                "
              >
                Ladan
              </Link>

              <Link
                href="/platser/saloon"
                className="
                  border
                  border-[#333333]
                  px-5
                  py-3
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-white
                  transition
                  hover:border-[#FAC800]
                  hover:text-[#FAC800]
                "
              >
                Saloonen
              </Link>

              <Link
                href="/menu"
                className="
                  border
                  border-[#333333]
                  px-5
                  py-3
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-white
                  transition
                  hover:border-[#FAC800]
                  hover:text-[#FAC800]
                "
              >
                Meny
              </Link>

              <Link
                href="/#opening-hours"
                className="
                  border
                  border-[#333333]
                  px-5
                  py-3
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-white
                  transition
                  hover:border-[#FAC800]
                  hover:text-[#FAC800]
                "
              >
                Öppettider
              </Link>

              <Link
                href="/shop"
                className="
                  border
                  border-[#333333]
                  px-5
                  py-3
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-white
                  transition
                  hover:border-[#FAC800]
                  hover:text-[#FAC800]
                "
              >
                Shop
              </Link>

            </div>

          </div>

          {/* =========================
              KONTAKT
          ========================= */}
          <div className="lg:border-l lg:border-[#242424] lg:pl-14">

            <div className="mb-5 flex items-center gap-4">

              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white">
                Kontakt
              </span>

              <span className="h-px flex-1 bg-[#FAC800]/30" />

            </div>

            <h2 className="text-3xl font-black uppercase tracking-[-0.04em] text-white md:text-4xl">
              {footer.contactTitle || 'Hör av dig'}
            </h2>

            {footer.contactText && (
              <p className="mt-5 max-w-md text-sm leading-7 text-white">
                {footer.contactText}
              </p>
            )}

            {/* KONTAKTUPPGIFTER */}
            <div className="mt-8 space-y-5">

              {footer.phone && (
                <a
                  href={`tel:${footer.phone.replace(/\s/g, '')}`}
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    text-base
                    font-bold
                    text-white
                    transition
                    hover:text-[#FAC800]
                  "
                >

                  <span className="flex h-10 w-10 items-center justify-center border border-[#FAC800] text-[#FAC800]">
                    <FaPhoneAlt size={14} />
                  </span>

                  {footer.phone}

                </a>
              )}

              {footer.email && (
                <a
                  href={`mailto:${footer.email}`}
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    break-all
                    text-sm
                    font-bold
                    text-white
                    transition
                    hover:text-[#FAC800]
                  "
                >

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#FAC800] text-[#FAC800]">
                    <FaEnvelope size={14} />
                  </span>

                  {footer.email}

                </a>
              )}

            </div>

          </div>

        </div>

        {/* =========================
            SOCIALA MEDIER + BOKA
        ========================= */}
        <div className="mt-16 border-t border-[#242424] pt-10">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white">
                Följ Bonnatösen
              </p>

              <div className="mt-5 flex gap-3">

                {/* INSTAGRAM */}
                {footer.instagram && (
                  <a
                    href={footer.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      border
                      border-[#333333]
                      text-white
                      transition
                      hover:border-[#FAC800]
                      hover:bg-[#FAC800]
                      hover:text-[#111111]
                    "
                  >
                    <FaInstagram size={20} />
                  </a>
                )}

                {/* FACEBOOK */}
                {footer.facebook && (
                  <a
                    href={footer.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      border
                      border-[#333333]
                      text-white
                      transition
                      hover:border-[#FAC800]
                      hover:bg-[#FAC800]
                      hover:text-[#111111]
                    "
                  >
                    <FaFacebook size={20} />
                  </a>
                )}

                {/* YOUTUBE */}
                {footer.youtube && (
                  <a
                    href={footer.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      border
                      border-[#333333]
                      text-white
                      transition
                      hover:border-[#FAC800]
                      hover:bg-[#FAC800]
                      hover:text-[#111111]
                    "
                  >
                    <FaYoutube size={20} />
                  </a>
                )}

              </div>

            </div>

            {/* BOKA BORD */}
            <Link
              href="/book"
              className="
                inline-flex
                items-center
                justify-center
                border
                border-[#FAC800]
                bg-[#FAC800]
                px-7
                py-4
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

          </div>

        </div>

        {/* =========================
            BOTTEN
        ========================= */}
        <div className="mt-10 flex flex-col gap-3 border-t border-[#242424] pt-6 text-xs text-white md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} Bonnatösen. Alla rättigheter förbehållna.
          </p>


        </div>

      </div>

    </footer>
  )
}