import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import RichText from '@/components/RichText'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // =========================
  // STARTSIDA
  // =========================
  const homepage = await payload.findGlobal({
    slug: 'homepage',
  })

  // =========================
  // PLATSER
  // =========================
  const locationsResult = await payload.find({
    collection: 'locations',
    where: {
      active: {
        equals: true,
      },
    },
    limit: 10,
    depth: 1,
  })

  const locations = locationsResult.docs

  // =========================
  // ÖPPETTIDER
  // =========================
  const openingHoursResult = await payload.find({
    collection: 'opening-hours',
    limit: 100,
    sort: '-priority',
    where: {
      active: {
        equals: true,
      },
    },
    depth: 1,
  })

  const openingHours = openingHoursResult.docs

  // =========================
  // BILDER
  // =========================
  const heroImage =
    typeof homepage.heroImage === 'object'
      ? homepage.heroImage
      : null

  const heroImageMobile =
    typeof homepage.heroImageMobile === 'object'
      ? homepage.heroImageMobile
      : null

  const menuImage =
    typeof homepage.menuImage === 'object'
      ? homepage.menuImage
      : null

  const shopImage =
    typeof homepage.shopImage === 'object'
      ? homepage.shopImage
      : null

  return (
    <main className="bg-[#090909] text-white">

      {/* =========================
          HERO
      ========================= */}
      <section className="relative min-h-[88svh] overflow-hidden border-b border-[#2d2d2d] md:min-h-[90vh]">

        {/* MOBIL HERO */}
        {heroImageMobile?.url && (
          <Image
            src={heroImageMobile.url}
            alt={heroImageMobile.alt || 'Bonnatösen'}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center md:hidden"
          />
        )}

        {/* DESKTOP HERO */}
        {heroImage?.url && (
          <Image
            src={heroImage.url}
            alt={heroImage.alt || 'Bonnatösen'}
            fill
            priority
            sizes="100vw"
            className={
              heroImageMobile?.url
                ? 'hidden object-cover md:block'
                : 'object-cover'
            }
          />
        )}

        {/* MÖRKNING */}
        <div className="absolute inset-0 bg-black/35" />

        {/* MÖRKARE VÄNSTER */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent" />

        {/* MÖRK NEDERKANT */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-black/20" />

        {/* CONTENT */}
        <div
          className="
            relative
            mx-auto
            flex
            min-h-[88svh]
            max-w-7xl
            items-center
            px-5
            py-16

            md:min-h-[90vh]
            md:px-10
            md:py-24
          "
        >
          <div className="w-full max-w-[760px]">

            {/* YEEHAW */}
            <div className="mb-3 flex items-center">

              <span
                className="
                  -rotate-3
                  border
                  border-[#FAC800]
                  bg-[#FAC800]
                  px-4
                  py-2
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-black

                  md:px-5
                  md:text-sm
                "
              >
                Yeehaw!
              </span>

            </div>

          {homepage.heroTitle && (
  <h1
    className="
      max-w-[780px]
      text-5xl
      font-extrabold
      uppercase
      leading-[0.95]
      tracking-[-0.04em]
      text-white

      sm:text-6xl
      md:text-7xl
      lg:text-[5.5rem]
    "
  >
    {homepage.heroTitle}
  </h1>
)}

            {/* GUL LINJE */}
            <div className="my-7 flex items-center gap-3 md:my-9">

              <span className="h-[3px] w-20 bg-[#FAC800]" />

              <span className="h-[3px] w-3 bg-[#FAC800]" />

            </div>

            {/* TEXT */}
            {homepage.heroText && (
              <p
                className="
                  max-w-[520px]
                  text-[15px]
                  font-medium
                  leading-7
                  text-white/90

                  sm:text-base

                  md:text-lg
                  md:leading-8
                "
              >
                {homepage.heroText}
              </p>
            )}

            {/* KNAPPAR */}
            <div
              className="
                mt-8
                flex
                max-w-[420px]
                flex-col
                gap-3

                sm:max-w-none
                sm:flex-row

                md:mt-10
              "
            >

              {homepage.primaryButtonText &&
                homepage.primaryButtonLink && (
                  <Link
                    href={homepage.primaryButtonLink}
                    className="
                      flex
                      items-center
                      justify-center
                      border-2
                      border-[#FAC800]
                      bg-[#FAC800]
                      px-8
                      py-4
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.17em]
                      text-black
                      transition

                      hover:bg-transparent
                      hover:text-[#FAC800]

                      md:py-5
                    "
                  >
                    {homepage.primaryButtonText}
                  </Link>
                )}

              {homepage.secondaryButtonText &&
                homepage.secondaryButtonLink && (
                  <Link
                    href={homepage.secondaryButtonLink}
                    className="
                      flex
                      items-center
                      justify-center
                      border
                      border-white/50
                      bg-black/30
                      px-8
                      py-4
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.17em]
                      text-white
                      backdrop-blur-sm
                      transition

                      hover:border-[#FAC800]
                      hover:text-[#FAC800]

                      md:py-5
                    "
                  >
                    {homepage.secondaryButtonText}
                  </Link>
                )}

            </div>

          </div>
        </div>

      </section>

      {/* =========================
          OM BONNATÖSEN
      ========================= */}
      <section className="px-5 py-20 md:px-10 md:py-32">

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">

          {/* TEXT */}
          <div className="flex flex-col justify-center">

            {homepage.aboutEyebrow && (
              <div className="flex items-center gap-4">

                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white">
                  {homepage.aboutEyebrow}
                </span>

                <span className="h-px flex-1 bg-[#FAC800]/35" />

              </div>
            )}

            {homepage.aboutTitle && (
              <h2 className="mt-5 text-4xl font-black uppercase leading-[0.93] tracking-[-0.04em] md:text-6xl">
                {homepage.aboutTitle}
              </h2>
            )}

            {homepage.aboutText && (
              <div className="mt-8 text-base leading-8 text-white md:text-lg">

                <RichText
                  data={homepage.aboutText}
                  enableGutter={false}
                />

              </div>
            )}

          </div>

          {/* =========================
              YOUTUBE
          ========================= */}
          <a
            href="https://www.youtube.com/@Bonnalife"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              relative
              flex
              min-h-[420px]
              overflow-hidden
              bg-[#111111]
              shadow-[0_25px_80px_rgba(0,0,0,0.45)]

              md:min-h-[580px]
            "
          >

            {/* BAKGRUND */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#202020_0%,#111111_55%,#090909_100%)]" />

            {/* GUL TOPPLINJE */}
            <div
              className="
                absolute
                left-0
                top-0
                h-[4px]
                w-24
                bg-[#FAC800]
                transition-all
                duration-500
                group-hover:w-full
              "
            />

            {/* CONTENT */}
            <div className="relative z-10 flex w-full flex-col items-center justify-center px-8 py-16 text-center">

              {/* PLAY */}
              <div
                className="
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-white/[0.04]
                  ring-1
                  ring-white/20
                  transition-all
                  duration-500

                  group-hover:scale-110
                  group-hover:bg-[#FAC800]
                  group-hover:ring-[#FAC800]

                  md:h-28
                  md:w-28
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 h-9 w-9 text-white transition-colors duration-500 group-hover:text-black md:h-11 md:w-11"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              <p className="mt-10 text-[10px] font-black uppercase tracking-[0.35em] text-[#FAC800]">
                Bonnatösen på YouTube
              </p>

              <h3 className="mt-4 text-3xl font-black uppercase leading-[0.95] tracking-[-0.04em] md:text-5xl">
                Häng med
                <br />
                bakom kulisserna
              </h3>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/75 md:text-base">
                Följ med till Bonnatösen och se vad som händer bakom
                burgarna, Ladan och Saloonen.
              </p>

              <div className="mt-10 flex items-center gap-4">

                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white">
                  Besök vår kanal
                </span>

                <span className="h-px w-10 bg-[#FAC800] transition-all duration-300 group-hover:w-16" />

              </div>

            </div>

          </a>

        </div>

      </section>

      {/* =========================
          PLATSER
      ========================= */}
      <section
        id="locations"
        className="border-y border-[#242424] bg-[#0d0d0d] px-5 py-20 md:px-10 md:py-32"
      >

        <div className="mx-auto max-w-7xl">

          {/* RUBRIK */}
          <div className="mb-12 md:mb-16">

            <div className="mb-5 flex items-center gap-4">

              {homepage.locationsEyebrow && (
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FAC800]">
                  {homepage.locationsEyebrow}
                </p>
              )}

              <span className="h-px flex-1 bg-white/15" />

            </div>

            <div className="grid gap-6 lg:grid-cols-2 lg:items-end">

              <h2 className="text-4xl font-black uppercase leading-[0.93] tracking-[-0.04em] md:text-6xl lg:text-7xl">
                {homepage.locationsTitle}
              </h2>

              {homepage.locationsText && (
                <p className="max-w-xl text-base leading-7 text-white/70 lg:justify-self-end">
                  {homepage.locationsText}
                </p>
              )}

            </div>

          </div>

          {/* PLATSKORT */}
          <div className="grid gap-6 lg:grid-cols-2">

            {locations.map((location) => (
              <Link
                key={location.id}
                href={`/platser/${location.slug}`}
                className="
                  group
                  relative
                  flex
                  min-h-[380px]
                  flex-col
                  justify-between
                  overflow-hidden
                  bg-[#141414]
                  p-8
                  shadow-[0_24px_70px_rgba(0,0,0,0.3)]
                  transition
                  duration-300

                  hover:bg-[#181818]

                  md:min-h-[450px]
                  md:p-10
                "
              >

                {/* GUL ACCENT */}
                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-[4px]
                    w-20
                    bg-[#FAC800]
                    transition-all
                    duration-500

                    group-hover:w-40
                  "
                />

                {/* ÖVERDEL */}
                <div>

                  <p className="text-[9px] font-black uppercase tracking-[0.35em] text-[#FAC800]">
                    Bonnatösen
                  </p>

                </div>

                {/* NEDERDEL */}
                <div>

                  <h3
                    className="
                      text-5xl
                      font-black
                      uppercase
                      leading-[0.85]
                      tracking-[-0.055em]
                      text-white
                      transition-colors
                      duration-300

                      group-hover:text-[#FAC800]

                      sm:text-6xl
                      md:text-7xl
                      lg:text-8xl
                    "
                  >
                    {location.name}
                  </h3>

                  {location.shortDescription && (
                    <p className="mt-6 max-w-lg text-base leading-7 text-white/65">
                      {location.shortDescription}
                    </p>
                  )}

                  <div className="mt-8 flex items-center gap-4">

                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white">
                      {location.ctaText || 'Läs mer'}
                    </span>

                    <span className="h-px w-10 bg-[#FAC800] transition-all duration-300 group-hover:w-16" />

                  </div>

                </div>

              </Link>
            ))}

          </div>

        </div>

      </section>

      {/* =========================
          MENY
      ========================= */}
      <section className="px-5 py-20 md:px-10 md:py-32">

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">

          {/* BILD */}
          <div
            className="
              group
              relative
              min-h-[520px]
              overflow-hidden
              bg-[#111111]
              shadow-[0_24px_70px_rgba(0,0,0,0.35)]
            "
          >

            {menuImage?.url ? (
              <Image
                src={menuImage.url}
                alt={menuImage.alt || 'Bonnatösens meny'}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[#111111] text-sm uppercase tracking-[0.2em] text-white/40">
                Lägg till menybild i Payload
              </div>
            )}

            <div className="absolute bottom-0 left-0 h-[4px] w-28 bg-[#FAC800] transition-all duration-500 group-hover:w-1/2" />

          </div>

          {/* TEXT */}
          <div className="lg:pl-4">

            {homepage.menuEyebrow && (
              <div className="flex items-center gap-4">

                <span className="h-px w-10 bg-[#FAC800]" />

                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FAC800]">
                  {homepage.menuEyebrow}
                </p>

              </div>
            )}

            {homepage.menuTitle && (
              <h2 className="mt-5 text-4xl font-black uppercase leading-[0.93] tracking-[-0.04em] md:text-6xl">
                {homepage.menuTitle}
              </h2>
            )}

            {homepage.menuText && (
              <p className="mt-7 max-w-lg text-base leading-8 text-white/75">
                {homepage.menuText}
              </p>
            )}

            <div className="mt-8 h-px max-w-xs bg-white/15" />

            {homepage.menuButtonLink && (
              <Link
                href={homepage.menuButtonLink}
                className="mt-9 inline-flex bg-[#FAC800] px-7 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-black transition hover:bg-white"
              >
                {homepage.menuButtonText || 'Se menyn'}
              </Link>
            )}

          </div>

        </div>

      </section>

      {/* =========================
          ÖPPETTIDER
      ========================= */}
      {openingHours.length > 0 && (
        <section
          id="opening-hours"
          className="scroll-mt-24 border-y border-[#242424] bg-[#0d0d0d] px-5 py-20 md:px-10 md:py-32"
        >

          <div className="mx-auto max-w-7xl">

            {/* RUBRIK */}
            <div className="mb-12">

              <div className="mb-5 flex items-center gap-4">

                <span className="h-px w-10 bg-[#FAC800]" />

                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FAC800]">
                  När ses vi?
                </span>

              </div>

              <h2 className="text-4xl font-black uppercase leading-[0.93] tracking-[-0.04em] md:text-6xl">
                Öppettider
              </h2>

            </div>

            {/* ÖPPETTIDSKORT */}
            <div className="grid gap-5 md:grid-cols-2">

              {openingHours.map((item) => {
                const location =
                  typeof item.location === 'object'
                    ? item.location
                    : null

                return (
                  <article
                    key={item.id}
                    className="
                      group
                      relative
                      overflow-hidden
                      bg-[#151515]
                      p-7
                      shadow-[0_18px_50px_rgba(0,0,0,0.25)]
                      transition
                      duration-300

                      hover:bg-[#181818]

                      md:p-9
                    "
                  >

                    {/* VÄNSTER ACCENT */}
                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        top-0
                        w-[3px]
                        bg-[#FAC800]
                        transition-all
                        duration-300

                        group-hover:w-[6px]
                      "
                    />

                    <div className="relative pl-2">

                      {location?.name && (
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#FAC800] md:text-sm">
                          {location.name}
                        </p>
                      )}

                      <h3 className="mt-4 text-2xl font-black uppercase leading-tight tracking-[-0.03em] md:text-3xl">
                        {item.title}
                      </h3>

                      {(item.startDate || item.endDate) && (
                        <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-white/50">
                          {formatDateRange(
                            item.startDate,
                            item.endDate,
                          )}
                        </p>
                      )}

                      {item.information && (
                        <div className="mt-7 space-y-0">

                          {item.information
                            .split('\n')
                            .filter(Boolean)
                            .map((line, index) => (
                              <div
                                key={index}
                                className="
                                  border-t
                                  border-white/10
                                  py-3
                                  text-sm
                                  font-bold
                                  leading-6
                                  text-white/85

                                  first:border-t-0
                                "
                              >
                                {line}
                              </div>
                            ))}

                        </div>
                      )}

                    </div>

                  </article>
                )
              })}

            </div>

          </div>

        </section>
      )}

      {/* =========================
          SHOP
      ========================= */}
      <section className="px-5 py-20 md:px-10 md:py-32">

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">

          {/* TEXT */}
          <div>

            {homepage.shopEyebrow && (
              <div className="flex items-center gap-4">

                <span className="h-px w-10 bg-[#FAC800]" />

                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FAC800]">
                  {homepage.shopEyebrow}
                </p>

              </div>
            )}

            {homepage.shopTitle && (
              <h2 className="mt-5 text-4xl font-black uppercase leading-[0.93] tracking-[-0.04em] md:text-6xl">
                {homepage.shopTitle}
              </h2>
            )}

            {homepage.shopText && (
              <p className="mt-7 max-w-lg text-base leading-8 text-white/75">
                {homepage.shopText}
              </p>
            )}

            <div className="mt-8 h-px max-w-xs bg-white/15" />

            {homepage.shopButtonLink && (
              <Link
                href={homepage.shopButtonLink}
                className="mt-9 inline-flex bg-[#FAC800] px-7 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-black transition hover:bg-white"
              >
                {homepage.shopButtonText || 'Till shoppen'}
              </Link>
            )}

          </div>

          {/* BILD */}
          <div
            className="
              group
              relative
              min-h-[500px]
              overflow-hidden
              bg-[#111111]
              shadow-[0_24px_70px_rgba(0,0,0,0.35)]
            "
          >

            {shopImage?.url ? (
              <Image
                src={shopImage.url}
                alt={shopImage.alt || 'Bonnatösen shop'}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[#111111] text-sm uppercase tracking-[0.2em] text-white/40">
                Lägg till shopbild i Payload
              </div>
            )}

            <div className="absolute bottom-0 right-0 h-[4px] w-28 bg-[#FAC800] transition-all duration-500 group-hover:w-1/2" />

          </div>

        </div>

      </section>

    </main>
  )
}

// =========================
// DATUMFORMATERING
// =========================
function formatDateRange(
  startDate?: string | null,
  endDate?: string | null,
) {
  const format = (value: string) =>
    new Intl.DateTimeFormat('sv-SE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      
    }).format(new Date(value))

  if (startDate && endDate) {
    return `${format(startDate)} – ${format(endDate)}`
  }

  if (startDate) {
    return `Från ${format(startDate)}`
  }

  if (endDate) {
    return `Till ${format(endDate)}`
  }

  return ''
}