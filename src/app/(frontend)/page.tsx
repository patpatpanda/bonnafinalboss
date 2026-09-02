import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

import RichText from '@/components/RichText'

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

  const aboutImage =
    typeof homepage.aboutImage === 'object'
      ? homepage.aboutImage
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
    <main className="bg-[#0b0b0b] text-[#f4f0e8]">

      {/* =========================
          HERO
      ========================= */}
      <section className="relative min-h-[90vh] overflow-hidden border-b border-[#242424]">

        {/* MOBIL HERO */}
        {heroImageMobile?.url && (
          <Image
            src={heroImageMobile.url}
            alt={heroImageMobile.alt || 'Bonnatösen'}
            fill
            priority
            sizes="100vw"
            className="object-cover md:hidden"
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

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/10 to-black/10" />

        {/* HERO CONTENT */}
        <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-5 pb-20 pt-32 text-center md:px-10">

          {/* LOGGA */}
          <div className="relative mb-10 h-[120px] w-[270px] sm:h-[150px] sm:w-[340px] md:h-[190px] md:w-[430px]">
            <Image
              src="/images/bonnatosen-logo.png"
              alt="Bonnatösens Burgare"
              fill
              priority
              className="object-contain"
            />
          </div>

          {homepage.heroEyebrow && (
            <div className="mb-7 flex items-center gap-4">

              <span className="h-px w-10 bg-[#d7a52b] md:w-16" />

              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#d7a52b] md:text-xs">
                {homepage.heroEyebrow}
              </span>

              <span className="h-px w-10 bg-[#d7a52b] md:w-16" />

            </div>
          )}

          {homepage.heroTitle && (
            <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl md:text-8xl lg:text-[7.5rem]">
              {homepage.heroTitle}
            </h1>
          )}

          {homepage.heroText && (
            <p className="mt-8 max-w-2xl text-base leading-7 text-[#c0bbb2] md:text-lg">
              {homepage.heroText}
            </p>
          )}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">

            {homepage.primaryButtonText &&
              homepage.primaryButtonLink && (
                <Link
                  href={homepage.primaryButtonLink}
                  className="border border-[#d7a52b] bg-[#d7a52b] px-8 py-5 text-xs font-black uppercase tracking-[0.18em] text-[#111111] transition hover:bg-transparent hover:text-[#d7a52b]"
                >
                  {homepage.primaryButtonText}
                </Link>
              )}

            {homepage.secondaryButtonText &&
              homepage.secondaryButtonLink && (
                <Link
                  href={homepage.secondaryButtonLink}
                  className="border border-[#4a4a4a] bg-black/20 px-8 py-5 text-xs font-black uppercase tracking-[0.18em] text-[#f4f0e8] backdrop-blur transition hover:border-[#d7a52b] hover:text-[#d7a52b]"
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

          <div className="flex flex-col justify-center">

            {homepage.aboutEyebrow && (
              <div className="mb-5 flex items-center gap-4">

                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d7a52b]">
                  {homepage.aboutEyebrow}
                </span>

                <span className="h-px flex-1 bg-[#292929]" />

              </div>
            )}

            {homepage.aboutTitle && (
              <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] md:text-6xl">
                {homepage.aboutTitle}
              </h2>
            )}

            {homepage.aboutText && (
              <div className="mt-8 text-base leading-8 text-[#aaa59c] md:text-lg">

                <RichText
                  data={homepage.aboutText}
                  enableGutter={false}
                />

              </div>
            )}

          </div>

          <div className="relative min-h-[420px] overflow-hidden md:min-h-[580px]">

            {aboutImage?.url ? (
              <Image
                src={aboutImage.url}
                alt={aboutImage.alt || 'Bonnatösen'}
                fill
                className="object-cover transition duration-700 hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center border border-[#292929] bg-[#111111] text-sm uppercase tracking-[0.2em] text-[#55514c]">
                Lägg till bild i Payload
              </div>
            )}

          </div>

        </div>

      </section>

      {/* =========================
          PLATSER
      ========================= */}
      <section
        id="locations"
        className="border-y border-[#242424] bg-[#0e0e0e] px-5 py-20 md:px-10 md:py-32"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 md:mb-16">

            <div className="mb-5 flex items-center gap-4">

              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d7a52b]">
                {homepage.locationsEyebrow}
              </span>

              <span className="h-px flex-1 bg-[#292929]" />

            </div>

            <div className="grid gap-6 lg:grid-cols-2">

              <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] md:text-6xl">
                {homepage.locationsTitle}
              </h2>

              {homepage.locationsText && (
                <p className="max-w-xl text-base leading-7 text-[#88847d] lg:justify-self-end">
                  {homepage.locationsText}
                </p>
              )}

            </div>

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
                  className="group relative min-h-[580px] overflow-hidden border border-[#242424]"
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

                  <span className="absolute left-6 top-6 text-xs font-black tracking-[0.25em] text-[#d7a52b]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">

                    <h3 className="text-5xl font-black uppercase tracking-[-0.05em] md:text-7xl">
                      {location.name}
                    </h3>

                    {location.shortDescription && (
                      <p className="mt-5 max-w-lg leading-7 text-[#ccc7bd]">
                        {location.shortDescription}
                      </p>
                    )}

                    <div className="mt-7 flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-[#d7a52b]">

                      {location.ctaText || 'Läs mer'}

                      <span className="transition-transform group-hover:translate-x-2">
                        →
                      </span>

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

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

          <div className="relative min-h-[520px] overflow-hidden">

            {menuImage?.url ? (
              <Image
                src={menuImage.url}
                alt={menuImage.alt || 'Bonnatösens meny'}
                fill
                className="object-cover transition duration-700 hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center border border-[#292929] bg-[#111111] text-sm uppercase tracking-[0.2em] text-[#55514c]">
                Lägg till menybild i Payload
              </div>
            )}

          </div>

          <div className="lg:pl-12">

            {homepage.menuEyebrow && (
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d7a52b]">
                {homepage.menuEyebrow}
              </p>
            )}

            {homepage.menuTitle && (
              <h2 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] md:text-6xl">
                {homepage.menuTitle}
              </h2>
            )}

            {homepage.menuText && (
              <p className="mt-7 max-w-lg text-base leading-8 text-[#88847d]">
                {homepage.menuText}
              </p>
            )}

            {homepage.menuButtonLink && (
              <Link
                href={homepage.menuButtonLink}
                className="mt-9 inline-flex items-center gap-4 border-b border-[#d7a52b] pb-2 text-xs font-black uppercase tracking-[0.2em] text-[#d7a52b] transition hover:gap-6"
              >
                {homepage.menuButtonText || 'Se menyn'}

                <span>→</span>
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
          className="scroll-mt-24 border-y border-[#242424] bg-[#0e0e0e] px-5 py-20 md:px-10 md:py-32"
        >

          <div className="mx-auto max-w-7xl">

            <div className="mb-12">

              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d7a52b]">
                När ses vi?
              </span>

              <h2 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-[#f4f0e8] md:text-6xl">
                Öppettider
              </h2>

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
                    className="border border-[#292929] bg-[#111111] p-6 md:p-8"
                  >

                    {location?.name && (
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d7a52b]">
                        {location.name}
                      </p>
                    )}

                    <h3 className="mt-3 text-2xl font-black uppercase tracking-[-0.03em] text-[#f4f0e8]">
                      {item.title}
                    </h3>

                    {(item.startDate || item.endDate) && (
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-[#77736c]">
                        {formatDateRange(
                          item.startDate,
                          item.endDate,
                        )}
                      </p>
                    )}

                    <div className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
                      {item.information
                        ?.split('\n')
                        .filter(Boolean)
                        .map((line, index) => (
                          <div
                            key={index}
                            className="text-base font-medium text-[#d0cbc2]"
                          >
                            {line}
                          </div>
                        ))}
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

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

          <div className="lg:pr-12">

            {homepage.shopEyebrow && (
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d7a52b]">
                {homepage.shopEyebrow}
              </p>
            )}

            {homepage.shopTitle && (
              <h2 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] md:text-6xl">
                {homepage.shopTitle}
              </h2>
            )}

            {homepage.shopText && (
              <p className="mt-7 max-w-lg text-base leading-8 text-[#88847d]">
                {homepage.shopText}
              </p>
            )}

            {homepage.shopButtonLink && (
              <Link
                href={homepage.shopButtonLink}
                className="mt-9 inline-flex items-center gap-4 border-b border-[#d7a52b] pb-2 text-xs font-black uppercase tracking-[0.2em] text-[#d7a52b] transition hover:gap-6"
              >
                {homepage.shopButtonText || 'Till shoppen'}

                <span>→</span>
              </Link>
            )}

          </div>

          <div className="relative min-h-[500px] overflow-hidden">

            {shopImage?.url ? (
              <Image
                src={shopImage.url}
                alt={shopImage.alt || 'Bonnatösen shop'}
                fill
                className="object-cover transition duration-700 hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center border border-[#292929] bg-[#111111] text-sm uppercase tracking-[0.2em] text-[#55514c]">
                Lägg till shopbild i Payload
              </div>
            )}

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