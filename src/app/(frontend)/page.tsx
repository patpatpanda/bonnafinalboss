import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import HeroTitleReveal from '@/components/HeroTitleReveal'
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
<section className="relative min-h-[92svh] overflow-hidden border-b border-[#2d2d2d] md:min-h-[90vh]">

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

  {/* OVERLAYS */}
  <div className="absolute inset-0 bg-black/45" />

  <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-black/10 to-black/20" />

  {/* HERO CONTENT */}
  <div
    className="
      relative
      mx-auto
      flex
      min-h-[92svh]
      max-w-7xl
      -translate-y-16
      flex-col
      items-center
      justify-center
      px-5
      pb-12
      pt-24
      text-center

      sm:-translate-y-12
      sm:px-6
      sm:pt-28

      md:min-h-[90vh]
      md:-translate-y-20
      md:px-10
      md:pb-20
      md:pt-32
    "
  >

    {/* LOGGA */}
    <div
      className="
        relative
        mb-6
        h-[150px]
        w-[320px]

        sm:h-[170px]
        sm:w-[360px]

        md:mb-8
        md:h-[190px]
        md:w-[430px]
      "
    >
      <Image
        src="/images/bonnatosen-logo.png"
        alt="Bonnatösens Burgare"
        fill
        priority
        sizes="(max-width: 640px) 320px, (max-width: 768px) 360px, 430px"
        className="object-contain"
      />
    </div>

    {/* EYEBROW */}
    {homepage.heroEyebrow && (
      <div className="mb-5 flex items-center gap-3 sm:gap-4 md:mb-6">

        <span className="h-px w-8 bg-[#FAC800] sm:w-10 md:w-16" />

        <span className="text-[11px] font-black uppercase tracking-[0.28em] text-[#FAC800] sm:text-xs sm:tracking-[0.35em]">
          {homepage.heroEyebrow}
        </span>

        <span className="h-px w-8 bg-[#FAC800] sm:w-10 md:w-16" />

      </div>
    )}

    {/* TITEL */}
    {homepage.heroTitle && (
      <HeroTitleReveal text={homepage.heroTitle} />
    )}

    {/* TEXT */}
    {homepage.heroText && (
      <p
        className="
          mt-6
          max-w-[340px]
          text-[15px]
          font-medium
          leading-6
          text-white

          sm:max-w-xl
          sm:text-base
          sm:leading-7

          md:mt-8
          md:max-w-2xl
          md:text-lg
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
        w-full
        max-w-[340px]
        flex-col
        gap-3

        sm:w-auto
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
              w-full
              items-center
              justify-center
              border-2
              border-[#FAC800]
              bg-[#FAC800]
              px-7
              py-4
              text-xs
              font-black
              uppercase
              tracking-[0.16em]
              text-black
              transition

              hover:bg-transparent
              hover:text-white

              sm:w-auto
              sm:px-8
              sm:py-5
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
              w-full
              items-center
              justify-center
              border
              border-[#FAC800]
              bg-black/50
              px-7
              py-4
              text-xs
              font-black
              uppercase
              tracking-[0.16em]
              text-white
              backdrop-blur
              transition

              hover:bg-[#FAC800]
              hover:text-black

              sm:w-auto
              sm:px-8
              sm:py-5
            "
          >
            {homepage.secondaryButtonText}
          </Link>
        )}

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

                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FFF]">
                  {homepage.aboutEyebrow}
                </span>

                <span className="h-px flex-1 bg-[#FAC800]/35" />

              </div>
            )}

            {homepage.aboutTitle && (
              <h2
                className="mt-5 text-4xl font-black uppercase leading-[0.93] tracking-[-0.04em] md:text-6xl"
                style={{
                  fontFamily: 'Georgia, Times New Roman, serif',
                }}
              >
                {homepage.aboutTitle}
              </h2>
            )}

            {homepage.aboutText && (
              <div className="mt-8 text-base leading-8 text-[#FFF] md:text-lg">

                <RichText
                  data={homepage.aboutText}
                  enableGutter={false}
                />

              </div>
            )}

          </div>

          {/* YOUTUBE */}
          <a
            href="DIN-YOUTUBE-LÄNK-HÄR"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-h-[420px] overflow-hidden border border-[#FAC800]/35 bg-[#111111] md:min-h-[580px]"
          >

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1b1b1b_0%,#111111_55%,#090909_100%)]" />

            <div className="pointer-events-none absolute inset-4 border border-[#FAC800]/20" />

            <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#FAC800] transition-transform duration-500 group-hover:scale-x-100" />

            <div className="relative z-10 flex w-full flex-col items-center justify-center px-8 py-16 text-center">

              {/* PLAY-KNAPP */}
              <div className="mt-7 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#FAC800] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#FAC800] md:h-28 md:w-28">

                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 h-9 w-9 text-[#FFF] transition-colors duration-500 group-hover:text-black md:h-11 md:w-11"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>

              </div>

              <p className="mt-10 text-[10px] font-black uppercase tracking-[0.35em] text-[#FFF]">
                Bonnatösen på YouTube
              </p>

              <h3
                className="mt-4 text-3xl font-black uppercase leading-[0.95] tracking-[-0.04em] md:text-5xl"
                style={{
                  fontFamily: 'Georgia, Times New Roman, serif',
                }}
              >
                Häng med
                <br />
                bakom kulisserna
              </h3>

              <p className="mt-6 max-w-sm text-sm leading-7 text-[#FFF] md:text-base">
                Följ med till Bonnatösen och se vad som händer bakom
                burgarna, Ladan och Saloonen.
              </p>

              <div className="mt-10 border-b border-[#FAC800] pb-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#FFF]">
                Besök vår kanal
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
        className="border-y border-[#2d2d2d] bg-[#0d0d0d] px-5 py-20 md:px-10 md:py-32"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 text-center md:mb-16">

            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FFF]">
              {homepage.locationsEyebrow}
            </p>

            <h2
              className="mt-5 text-4xl font-black uppercase leading-[0.93] tracking-[-0.04em] md:text-6xl"
              style={{
                fontFamily: 'Georgia, Times New Roman, serif',
              }}
            >
              {homepage.locationsTitle}
            </h2>

            {homepage.locationsText && (
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#FFF]">
                {homepage.locationsText}
              </p>
            )}

            <div className="mx-auto mt-8 h-px max-w-md bg-[#FAC800]/35" />

          </div>

          <div className="grid gap-6 lg:grid-cols-2">

            {locations.map((location, index) => {
              const image =
                typeof location.heroImage === 'object'
                  ? location.heroImage
                  : null

              return (
                <Link
                  key={location.id}
                  href={`/platser/${location.slug}`}
                  className="group relative min-h-[580px] overflow-hidden border border-[#FAC800]/30"
                >

                  {image?.url && (
                    <Image
                      src={image.url}
                      alt={image.alt || location.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="pointer-events-none absolute inset-4 border border-[#FAC800]/25" />

                  <span className="absolute left-7 top-7 text-xs font-black tracking-[0.25em] text-[#FFF]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">

                    <h3
                      className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl"
                      style={{
                        fontFamily: 'Georgia, Times New Roman, serif',
                      }}
                    >
                      {location.name}
                    </h3>

                    {location.shortDescription && (
                      <p className="mt-5 max-w-lg leading-7 text-[#FFF]">
                        {location.shortDescription}
                      </p>
                    )}

                    <div className="mt-7 inline-flex border-b border-[#FAC800] pb-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#FFF]">
                      {location.ctaText || 'Läs mer'}
                    </div>

                  </div>

                </Link>
              )
            })}

          </div>

        </div>

      </section>

      {/* =========================
          MENY
      ========================= */}
      <section className="px-5 py-20 md:px-10 md:py-32">

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">

          <div className="relative min-h-[520px] overflow-hidden border border-[#FAC800]/30">

            {menuImage?.url ? (
              <Image
                src={menuImage.url}
                alt={menuImage.alt || 'Bonnatösens meny'}
                fill
                className="object-cover transition duration-700 hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[#111111] text-sm uppercase tracking-[0.2em] text-[#FFF]">
                Lägg till menybild i Payload
              </div>
            )}

            <div className="pointer-events-none absolute inset-4 border border-[#FAC800]/25" />

          </div>

          <div className="lg:pl-4">

            {homepage.menuEyebrow && (
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FFF]">
                {homepage.menuEyebrow}
              </p>
            )}

            {homepage.menuTitle && (
              <h2
                className="mt-5 text-4xl font-black uppercase leading-[0.93] tracking-[-0.04em] md:text-6xl"
                style={{
                  fontFamily: 'Georgia, Times New Roman, serif',
                }}
              >
                {homepage.menuTitle}
              </h2>
            )}

            {homepage.menuText && (
              <p className="mt-7 max-w-lg text-base leading-8 text-[#FFF]">
                {homepage.menuText}
              </p>
            )}

            <div className="mt-8 h-px max-w-xs bg-[#FAC800]/35" />

            {homepage.menuButtonLink && (
              <Link
                href={homepage.menuButtonLink}
                className="mt-9 inline-flex border-2 border-[#FAC800] bg-[#FAC800] px-7 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-black transition hover:bg-transparent hover:text-[#FFF]"
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
          className="scroll-mt-24 border-y border-[#2d2d2d] bg-[#0d0d0d] px-5 py-20 md:px-10 md:py-32"
        >

          <div className="mx-auto max-w-7xl">

            <div className="mb-12 text-center">

              <span className="block text-[10px] font-black uppercase tracking-[0.35em] text-[#FFF]">
                När ses vi?
              </span>

              <h2
                className="mt-5 text-4xl font-black uppercase leading-[0.93] tracking-[-0.04em] md:text-6xl"
                style={{
                  fontFamily: 'Georgia, Times New Roman, serif',
                }}
              >
                Öppettider
              </h2>

              <div className="mx-auto mt-7 h-px max-w-md bg-[#FAC800]/35" />

            </div>

            <div className="grid gap-6 md:grid-cols-2">

              {openingHours.map((item) => {
                const location =
                  typeof item.location === 'object'
                    ? item.location
                    : null

                return (
                  <article
                    key={item.id}
                    className="relative overflow-hidden border border-[#FAC800]/40 bg-[#111111] p-7 text-white md:p-9"
                  >

                    <div className="pointer-events-none absolute inset-3 border border-[#FAC800]/15" />

                    <div className="relative z-10">

                      {location?.name && (
                        <p className="text-[20px] font-black uppercase tracking-[0.3em] text-[#FFF]">
                          {location.name}
                        </p>
                      )}

                      <h3
                        className="mt-3 text-2xl font-black uppercase tracking-[-0.03em] md:text-3xl"
                        style={{
                          fontFamily: 'Georgia, Times New Roman, serif',
                        }}
                      >
                        {item.title}
                      </h3>

                      {(item.startDate || item.endDate) && (
                        <p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#FFF]">
                          {formatDateRange(
                            item.startDate,
                            item.endDate,
                          )}
                        </p>
                      )}

                      <div className="mt-7 space-y-3">

                        {item.information
                          ?.split('\n')
                          .filter(Boolean)
                          .map((line, index) => (
                            <div
                              key={index}
                              className="border-t border-[#FAC800]/20 pt-3 font-bold text-[#FFF]"
                            >
                              {line}
                            </div>
                          ))}

                      </div>

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

          <div>

            {homepage.shopEyebrow && (
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FFF]">
                {homepage.shopEyebrow}
              </p>
            )}

            {homepage.shopTitle && (
              <h2
                className="mt-5 text-4xl font-black uppercase leading-[0.93] tracking-[-0.04em] md:text-6xl"
                style={{
                  fontFamily: 'Georgia, Times New Roman, serif',
                }}
              >
                {homepage.shopTitle}
              </h2>
            )}

            {homepage.shopText && (
              <p className="mt-7 max-w-lg text-base leading-8 text-[#FFF]">
                {homepage.shopText}
              </p>
            )}

            <div className="mt-8 h-px max-w-xs bg-[#FAC800]/35" />

            {homepage.shopButtonLink && (
              <Link
                href={homepage.shopButtonLink}
                className="mt-9 inline-flex border-2 border-[#FAC800] bg-[#FAC800] px-7 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-black transition hover:bg-transparent hover:text-[#FFF]"
              >
                {homepage.shopButtonText || 'Till shoppen'}
              </Link>
            )}

          </div>

          <div className="relative min-h-[500px] overflow-hidden border border-[#FAC800]/30">

            {shopImage?.url ? (
              <Image
                src={shopImage.url}
                alt={shopImage.alt || 'Bonnatösen shop'}
                fill
                className="object-cover transition duration-700 hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[#111111] text-sm uppercase tracking-[0.2em] text-[#FAC800]">
                Lägg till shopbild i Payload
              </div>
            )}

            <div className="pointer-events-none absolute inset-4 border border-[#FAC800]/25" />

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