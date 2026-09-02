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

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params

  const payload = await getPayload({ config })

  // Hämta plats utifrån slug
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

  // Hämta hero-bilden
  const heroImage =
    typeof location.heroImage === 'object'
      ? location.heroImage
      : null

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-[#f4f0e8]">

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
            className="object-cover"
          />
        )}

        {/* Mycket lätt toning över hela bilden */}
        <div className="absolute inset-0 bg-black/45" />

        {/* 
          Mörk gradient bakom texten.
          Bildens övre del behåller sitt ljus.
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-10 md:pb-24">

          <div className="mb-5 flex items-center gap-4">

            <span className="h-px w-14 bg-[#d7a52b]" />

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#e7b63c] drop-shadow-md">
              Bonnatösen
            </span>

          </div>

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

          <div className="prose prose-invert max-w-3xl text-[#aaa59c]">

            {location.description ? (
              <RichText
                data={location.description}
                enableGutter={false}
              />
            ) : (
              <p className="text-base leading-8 md:text-lg">
                {location.shortDescription}
              </p>
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

      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#69655e]">
        Hitta hit
      </p>

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          location.address,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-4 inline-flex items-center gap-3 text-xl font-bold transition-colors hover:text-[#d7a52b] md:text-2xl"
      >
        {location.address}

        <span
          aria-hidden="true"
          className="text-[#d7a52b] transition-transform duration-200 group-hover:translate-x-1"
        >
          ↗
        </span>
      </a>

      <p className="mt-3 text-sm text-[#69655e]">
        Öppna i Google Maps
      </p>

    </div>
  </section>
)}

      {/* =========================
          GALLERI
      ========================= */}
      {location.gallery && location.gallery.length > 0 && (
        <section className="px-5 py-20 md:px-10 md:py-28">

          <div className="mx-auto max-w-7xl">

            {/* Rubrik */}
            <div className="mb-10 flex items-center gap-4">

              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d7a52b]">
                Bilder
              </span>

              <span className="h-px flex-1 bg-[#242424]" />

            </div>

            {/* Bilder */}
            <div className="grid gap-4 md:grid-cols-2">

              {location.gallery.map((item, index) => {
                const image =
                  typeof item.image === 'object'
                    ? item.image
                    : null

                if (!image?.url) {
                  return null
                }

                return (
                  <div
                    key={item.id || index}
                    className="relative aspect-[4/3] overflow-hidden"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || location.name}
                      fill
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                  </div>
                )
              })}

            </div>

          </div>

        </section>
      )}
      {/* =========================
    LEADER BERGSLAGEN / EU
    Visas endast på Ladan
========================= */}
{slug === 'ladan' && (
  <section className="border-t border-[#242424] bg-[#f5f2eb] px-5 py-20 text-[#1b1b1b] md:px-10 md:py-28">
    <div className="mx-auto max-w-7xl">

      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-20">

        {/* TEXT */}
        <div>
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-12 bg-[#d7a52b]" />

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#8a6819]">
              Med stöd från EU & Leader Bergslagen
            </span>
          </div>

          <h2 className="max-w-2xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] md:text-5xl lg:text-6xl">
            Renovering av
            <br />
            ladans tak
          </h2>

          <div className="mt-8 max-w-2xl space-y-6 text-base leading-8 text-[#57534c] md:text-lg">
            <p>
              Med stöd från EU och Leader Bergslagen har vi renoverat
              den del av ladans tak som var i störst behov av åtgärd.
            </p>

            <p>
              Syftet var att säkra byggnaden och skapa förutsättningar
              för att utveckla ladan till en året-runt-anpassad
              mötesplats för evenemang, marknader och samarbeten.
            </p>

            <p>
              Renoveringen har stärkt konstruktionen och gett ett nytt,
              hållbart tak som gör det möjligt att fortsätta utveckla
              gården som en samlingsplats för både lokala aktörer och
              besökare.
            </p>
          </div>
        </div>

        {/* LEADER / EU LOGGA */}
        <div className="flex items-center justify-center border border-[#ded9cf] bg-white p-6 md:p-10">
          <div className="relative aspect-[2.7/1] w-full max-w-[600px]">
            <Image
              src="/images/lll.png"
              alt="Leader Bergslagen – Medfinansieras av Europeiska unionen"
              fill
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