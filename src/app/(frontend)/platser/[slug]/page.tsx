import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import RichText from '@/components/RichText'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function LocationPage({
  params,
}: PageProps) {
  const { slug } = await params

  const payload = await getPayload({ config })

  // =========================
  // HÄMTA PLATS
  // =========================
  const result = await payload.find({
    collection: 'locations',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const location = result.docs[0]

  // Visa 404 om platsen inte finns eller är inaktiv
  if (!location || !location.active) {
    notFound()
  }

  // =========================
  // HERO-BILD
  // =========================
  const heroImage =
    typeof location.heroImage === 'object'
      ? location.heroImage
      : null

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">

      {/* =========================
          HERO
      ========================= */}
      <section className="relative min-h-[60vh] overflow-hidden border-b border-[#242424]">

        {heroImage?.url && (
          <Image
            src={heroImage.url}
            alt={heroImage.alt || location.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        {/* TONING */}
        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* HERO CONTENT */}
        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-10 md:pb-24">

          {/* EYEBROW */}
          <div className="mb-5 flex items-center gap-4">

            <span className="h-px w-14 bg-[#FAC800]" />

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white drop-shadow-md">
              Bonnatösen
            </span>

          </div>

          {/* TITEL */}
          <h1
            className="
              max-w-4xl
              text-6xl
              font-black
              uppercase
              leading-[0.9]
              tracking-[-0.05em]
              text-white
              drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]
              md:text-8xl
              lg:text-[9rem]
            "
          >
            {location.name}
          </h1>

          {/* KORT BESKRIVNING */}
          {location.shortDescription && (
            <p
              className="
                mt-7
                max-w-2xl
                text-lg
                leading-8
                text-white
                drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]
                md:text-xl
              "
            >
              {location.shortDescription}
            </p>
          )}

        </div>

      </section>

      {/* =========================
    OM PLATSEN
========================= */}
<section className="px-5 py-20 md:px-10 md:py-28">
  <div className="mx-auto max-w-7xl">

    <div
      className={`
        grid
        gap-12
        ${
          slug === 'ladan' || slug === 'saloon'
            ? 'lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-20'
            : ''
        }
      `}
    >

      {/* =========================
          TEXT
      ========================= */}
      <div>

        <div
          className="
            prose
            prose-invert
            max-w-none
            text-white

            prose-headings:text-white
            prose-p:text-white
            prose-strong:text-white
            prose-li:text-white
            prose-blockquote:text-white

            prose-a:text-white
            prose-a:decoration-[#FAC800]
            hover:prose-a:text-white
          "
        >
          {location.description ? (
            <RichText
              data={location.description}
              enableGutter={false}
            />
          ) : (
            <p className="text-base leading-8 text-white md:text-lg">
              {location.shortDescription}
            </p>
          )}
        </div>

      </div>

      {/* =========================
          WANTED POSTER
          Endast Ladan & Saloonen
      ========================= */}
      {(slug === 'ladan' || slug === 'saloon') && (
  <div className="mx-auto w-full max-w-[430px] lg:mx-0 lg:ml-auto">

    <div className="relative aspect-[3/4] w-full">

      <Image
        src={
          slug === 'saloon'
            ? '/images/mrwant.png'
            : '/images/mswant.png'
        }
        alt={
          slug === 'saloon'
            ? 'Bonnatösen Wanted Saloon'
            : 'Bonnatösen Wanted Ladan'
        }
        fill
        sizes="(max-width: 1024px) 90vw, 430px"
        className="object-contain"
      />

    </div>

  </div>
      )}

    </div>

  </div>
</section>

      {/* =========================
          ADRESS
      ========================= */}
      {location.address && (
        <section className="border-y border-[#242424]">

          <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14">

            <div className="mb-4 flex items-center gap-4">

              <span className="h-px w-10 bg-[#FAC800]" />

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white">
                Hitta hit
              </p>

            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                location.address,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                mt-4
                inline-flex
                items-center
                gap-3
                text-xl
                font-bold
                text-white
                transition-colors
                hover:text-white
                md:text-2xl
              "
            >
              <span className="border-b border-transparent transition group-hover:border-[#FAC800]">
                {location.address}
              </span>

              <span
                aria-hidden="true"
                className="
                  text-white
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              >
                ↗
              </span>
            </a>

            <p className="mt-3 text-sm text-white">
              Öppna i Google Maps
            </p>

          </div>

        </section>
      )}

      {/* =========================
          GALLERI
      ========================= */}
      {location.gallery &&
        location.gallery.length > 0 && (
          <section className="px-5 py-20 md:px-10 md:py-28">

            <div className="mx-auto max-w-7xl">

              {/* RUBRIK */}
              <div className="mb-10 flex items-center gap-4">

                <span className="text-xs font-bold uppercase tracking-[0.3em] text-white">
                  Bilder
                </span>

                <span className="h-px flex-1 bg-[#FAC800]/40" />

              </div>

              {/* BILDER */}
              <div className="grid gap-4 md:grid-cols-2">

                {location.gallery.map(
                  (item, index) => {
                    const image =
                      typeof item.image ===
                      'object'
                        ? item.image
                        : null

                    if (!image?.url) {
                      return null
                    }

                    return (
                      <div
                        key={item.id || index}
                        className="
                          group
                          relative
                          aspect-[4/3]
                          overflow-hidden
                          border
                          border-[#242424]
                          transition
                          hover:border-[#FAC800]
                        "
                      >
                        <Image
                          src={image.url}
                          alt={
                            image.alt ||
                            location.name
                          }
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />

                        {/* INNER BORDER */}
                        <div className="pointer-events-none absolute inset-3 border border-transparent transition group-hover:border-[#FAC800]/40" />

                      </div>
                    )
                  },
                )}

              </div>

            </div>

          </section>
        )}

      {/* =========================
          LEADER BERGSLAGEN / EU
          ENDAST LADAN
      ========================= */}
      {slug === 'ladan' && (
        <section className="border-t border-[#242424] bg-[#f5f2eb] px-5 py-20 text-[#1b1b1b] md:px-10 md:py-28">

          <div className="mx-auto max-w-7xl">

            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-20">

              {/* TEXT */}
              <div>

                <div className="mb-5 flex items-center gap-4">

                  <span className="h-px w-12 bg-[#FAC800]" />

                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#1b1b1b]">
                    Med stöd från EU & Leader Bergslagen
                  </span>

                </div>

                <h2 className="max-w-2xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] md:text-5xl lg:text-6xl">
                  Renovering av
                  <br />
                  ladans tak
                </h2>

                <div className="mt-8 max-w-2xl space-y-6 text-base leading-8 text-[#1b1b1b] md:text-lg">

                  <p>
                    Med stöd från EU och Leader
                    Bergslagen har vi renoverat den
                    del av ladans tak som var i
                    störst behov av åtgärd.
                  </p>

                  <p>
                    Syftet var att säkra byggnaden
                    och skapa förutsättningar för
                    att utveckla ladan till en
                    året-runt-anpassad mötesplats
                    för evenemang, marknader och
                    samarbeten.
                  </p>

                  <p>
                    Renoveringen har stärkt
                    konstruktionen och gett ett
                    nytt, hållbart tak som gör det
                    möjligt att fortsätta utveckla
                    gården som en samlingsplats
                    för både lokala aktörer och
                    besökare.
                  </p>

                </div>

              </div>

              {/* LEADER / EU LOGGA */}
              <div className="border border-[#FAC800] bg-white p-6 md:p-10">

                <div className="relative aspect-[2.7/1] w-full max-w-[600px]">

                  <Image
                    src="/images/lll.png"
                    alt="Leader Bergslagen – Medfinansieras av Europeiska unionen"
                    fill
                    sizes="600px"
                    className="object-contain"
                  />

                </div>

              </div>

            </div>

          </div>

        </section>
      )}

    </main>
  )
}