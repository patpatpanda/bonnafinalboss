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
        <div />

        {/* MÖRKARE VÄNSTER */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/25 to-transparent" />

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
      max-w-[250px]
      text-4xl
      font-extrabold
      uppercase
      leading-[0.95]
      tracking-[-0.04em]
      text-white

      sm:text-5xl
      md:text-6xl
      lg:text-[3rem]
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
  {/* YOUTUBE THUMBNAIL */}
  <Image
    src="https://img.youtube.com/vi/bRsjPyEP8vo/maxresdefault.jpg"
    alt="Bonnatösen Channel Trailer"
    fill
    sizes="(max-width: 1024px) 100vw, 50vw"
    className="
      object-cover
      grayscale
      transition-all
      duration-700
      ease-out

      group-hover:scale-[1.04]
      group-hover:grayscale-0
    "
  />

  {/* MÖRK OVERLAY */}
  <div className="absolute inset-0 bg-black/50 transition-colors duration-500 group-hover:bg-black/40" />

  {/* TONING */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35" />

  {/* GUL TOPPLINJE */}
  <div
    className="
      absolute
      left-0
      top-0
      z-10
      h-[4px]
      w-24
      bg-[#FAC800]
      transition-all
      duration-500

      group-hover:w-40
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
        bg-black/30
        ring-1
        ring-white/40
        backdrop-blur-sm
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
        className="
          ml-1
          h-9
          w-9
          text-white
          transition-colors
          duration-500

          group-hover:text-black

          md:h-11
          md:w-11
        "
        aria-hidden="true"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>

    {/* EYEBROW */}
    <p className="mt-10 text-[10px] font-black uppercase tracking-[0.35em] text-[#FAC800]">
      Bonnatösen på YouTube
    </p>

    {/* RUBRIK */}
    <h3
      className="
        mt-4
        text-3xl
        font-black
        uppercase
        leading-[0.95]
        tracking-[-0.04em]
        text-white

        md:text-5xl
      "
    >
      Häng med
      <br />
      bakom kulisserna
    </h3>

    {/* TEXT */}
    <p className="mt-6 max-w-sm text-sm leading-7 text-white/85 md:text-base">
      Följ med till Bonnatösen och se vad som händer
      bakom burgarna, Ladan och Saloonen.
    </p>

    {/* CTA */}
    <div className="mt-10 flex items-center gap-4">

      <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white">
        Se videon
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
        className="relative overflow-hidden border-y border-white/10 bg-[#0d0d0d] px-5 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto max-w-7xl">

          {/* RUBRIK */}
          <div className="mb-12 md:mb-16">

            {homepage.locationsEyebrow && (
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-white/45">
                {homepage.locationsEyebrow}
              </p>
            )}

            <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
              {homepage.locationsTitle}
            </h2>

            {homepage.locationsText && (
              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
                {homepage.locationsText}
              </p>
            )}

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
                  min-h-[360px]
                  flex-col
                  justify-between
                  overflow-hidden
                  border
                  border-white/20
                  bg-[#111111]
                  p-7
                  text-white
                  shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                  transition
                  duration-300

                  hover:border-white/40
                  hover:bg-[#151515]

                  sm:p-9
                  md:min-h-[420px]
                  md:p-10
                "
              >
                {/* VIT TOPPLINJE */}
                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-[4px]
                    w-full
                    bg-white
                    transition-all
                    duration-300

                    group-hover:h-[6px]
                  "
                />

                {/* TOPP */}
                <div className="relative pt-2">

                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/45">
                    Bonnatösen
                  </p>

                </div>

                {/* MITTEN */}
                <div className="relative my-12">

                  <p className="mb-4 text-[9px] font-black uppercase tracking-[0.28em] text-white/45">
                    Välkommen till
                  </p>

                  <h3
                    className="
                      text-5xl
                      font-black
                      uppercase
                      leading-[0.88]
                      tracking-[-0.055em]
                      text-white
                      transition-transform
                      duration-300

                      group-hover:translate-x-1

                      sm:text-6xl
                      md:text-7xl
                    "
                  >
                    {location.name}
                  </h3>

                  {location.shortDescription && (
                    <p className="mt-7 max-w-lg text-sm leading-7 text-white/60 md:text-base">
                      {location.shortDescription}
                    </p>
                  )}

                </div>

                {/* CTA */}
                <div className="relative border-t border-white/15 pt-6">

                  <div className="flex items-center justify-between gap-5">

                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white">
                      {location.ctaText || 'Besök platsen'}
                    </span>

                    <span
                      aria-hidden="true"
                      className="text-xl text-white transition-transform duration-300 group-hover:translate-x-2"
                    >
                      →
                    </span>

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
          className="
            scroll-mt-24
            border-y
            border-white/10
            bg-[#0b0b0b]
            px-5
            py-20

            md:px-10
            md:py-28
          "
        >
          <div className="mx-auto max-w-7xl">

            {/* RUBRIK */}
            <div className="mb-12 md:mb-16">

              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/45">
                När ses vi?
              </p>

              <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
                Öppettider
              </h2>

            </div>

            {/* ÖPPETTIDSKORT */}
            <div className="grid items-start gap-6 lg:grid-cols-2">

              {openingHours.map((item) => {
                const location =
                  typeof item.location === 'object'
                    ? item.location
                    : null

                return (
                  <article
                    key={item.id}
                    className="
                      overflow-hidden
                      border
                      border-white/20
                      bg-[#111111]
                      text-white
                      shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                    "
                  >
                    {/* VIT TOPPLINJE */}
                    <div className="h-[4px] w-full bg-white" />

                    <div className="p-6 sm:p-8 md:p-9">

                      {/* HEADER */}
                      <div className="border-b border-white/20 pb-6">

                        <p className="mb-3 text-[9px] font-black uppercase tracking-[0.3em] text-white/45">
                          När ses vi?
                        </p>

                        {location?.name && (
                          <h3 className="text-3xl font-black uppercase leading-none tracking-[-0.04em] text-white sm:text-4xl">
                            {location.name}
                          </h3>
                        )}

                        <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                          {item.title}
                        </p>

                      </div>

                      {/* DATUM */}
                      {(item.startDate || item.endDate) && (
                        <div className="border-b border-white/10 py-5">

                          <div className="flex items-center justify-between gap-5">

                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                              Period
                            </span>

                            <span className="text-right text-[10px] font-black uppercase tracking-[0.12em] text-white">
                              {formatDateRange(
                                item.startDate,
                                item.endDate,
                              )}
                            </span>

                          </div>

                        </div>
                      )}

                      {/* TIDER */}
                      {item.information && (
                        <div>

                          {item.information
                            .split('\n')
                            .filter(Boolean)
                            .map((line, lineIndex) => {
                              const firstSpace = line.indexOf(' ')

                              const label =
                                firstSpace > -1
                                  ? line.substring(0, firstSpace)
                                  : line

                              const value =
                                firstSpace > -1
                                  ? line.substring(firstSpace + 1)
                                  : ''

                              return (
                                <div
                                  key={lineIndex}
                                  className="
                                    flex
                                    min-h-[52px]
                                    items-center
                                    justify-between
                                    gap-5
                                    border-b
                                    border-white/10
                                    py-3

                                    last:border-b-0
                                  "
                                >
                                  <span className="text-sm font-bold uppercase tracking-[0.05em] text-white/55 sm:text-base">
                                    {label}
                                  </span>

                                  {value && (
                                    <span className="shrink-0 text-base font-black text-white sm:text-lg">
                                      {value}
                                    </span>
                                  )}
                                </div>
                              )
                            })}

                        </div>
                      )}

                      {/* FOOTER */}
                      {location?.name && (
                        <div className="border-t border-white/20 pt-5">

                          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/40">
                            Bonnatösen · {location.name}
                          </p>

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
