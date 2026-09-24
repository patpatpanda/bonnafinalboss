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

/* =========================
    FORMATERA DATUM
========================= */
function formatDate(date?: string | null) {
  if (!date) return ''

  return new Intl.DateTimeFormat('sv-SE', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(date))
}

function formatDateRange(
  startDate?: string | null,
  endDate?: string | null,
) {
  if (!startDate && !endDate) return ''

  if (startDate && endDate) {
    return `${formatDate(startDate)} – ${formatDate(endDate)}`
  }

  return formatDate(startDate || endDate)
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
  // HÄMTA ÖPPETTIDER
  // Samma collection som startsidan
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

  // =========================
  // VISA ENDAST ÖPPETTIDER
  // FÖR DEN AKTUELLA PLATSEN
  // =========================
  const openingHours = openingHoursResult.docs.filter((item) => {
    const itemLocation =
      typeof item.location === 'object'
        ? item.location
        : null

    return itemLocation?.id === location.id
  })

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
      <section className="relative min-h-[70vh] overflow-hidden border-b border-[#242424]">

        {/* HERO-BILD */}
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent" />

        {/* LÄTT VÄNSTER-TONING */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />

        {/* HERO CONTENT */}
        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-5 pb-12 pt-32 md:px-10 md:pb-20">

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

          {/* =========================
              HERO-MEDDELANDE
          ========================= */}
          {location.heroNotice && (
            <div className="mt-7 md:mt-9">

              <div className="flex items-center gap-4">

                <span className="h-[3px] w-10 shrink-0 bg-[#FAC800]" />

                <p
                  className="
                    text-lg
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-white

                    sm:text-xl
                    md:text-2xl
                  "
                >
                  {location.heroNotice}
                </p>

              </div>

            </div>
          )}

          {/* KORT BESKRIVNING */}
          {location.shortDescription && (
            <p
              className="
                mt-7
                max-w-2xl
                text-base
                leading-7
                text-white
                drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]

                md:text-xl
                md:leading-8
              "
            >
              {location.shortDescription}
            </p>
          )}

          {/* =========================
              VÄGBESKRIVNING
          ========================= */}
          {location.address && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">

              {/* KNAPP */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  location.address,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  inline-flex
                  w-fit
                  items-center
                  justify-center
                  gap-4
                  border-2
                  border-[#FAC800]
                  bg-[#FAC800]
                  px-6
                  py-4
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-black
                  transition

                  hover:bg-transparent
                  hover:text-[#FAC800]
                "
              >
                Vägbeskrivning

                <span
                  aria-hidden="true"
                  className="text-base transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  ↗
                </span>

              </a>

              {/* ADRESS */}
              <div className="border-l border-white/25 pl-4">

                <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#FAC800]">
                  Hitta hit
                </p>

                <p className="mt-1 max-w-[320px] text-sm font-semibold leading-5 text-white md:text-base">
                  {location.address}
                </p>

              </div>

            </div>
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
                ÖPPETTIDER
                Samma data som startsidan
            ========================= */}
            {(slug === 'ladan' || slug === 'saloon') &&
              openingHours.length > 0 && (
                <div className="mx-auto w-full max-w-[430px] lg:mx-0 lg:ml-auto">

                  <div
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

                      {/* =========================
                          HEADER
                      ========================= */}
                      <div className="border-b border-white/20 pb-6">

                        <p
                          className="
                            mb-3
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.3em]
                            text-white/50
                          "
                        >
                          När ses vi?
                        </p>

                        <h2
                          className="
                            text-3xl
                            font-black
                            uppercase
                            leading-none
                            tracking-[-0.04em]
                            text-white

                            sm:text-4xl
                          "
                        >
                          Öppettider
                        </h2>

                        <p
                          className="
                            mt-3
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.18em]
                            text-white/50
                          "
                        >
                          {location.name}
                        </p>

                      </div>


                      {/* =========================
                          ÖPPETTIDSPERIODER
                      ========================= */}
                      <div>

                        {openingHours.map((item, index) => (
                          <div
                            key={item.id}
                            className={`
                              py-6

                              ${
                                index !== 0
                                  ? 'border-t border-white/20'
                                  : ''
                              }
                            `}
                          >

                            {/* TITEL + DATUM */}
                            <div
                              className="
                                gap-3

                                sm:flex
                                sm:items-start
                                sm:justify-between
                              "
                            >

                              <h3
                                className="
                                  text-lg
                                  font-black
                                  uppercase
                                  leading-tight
                                  tracking-[-0.02em]
                                  text-white
                                "
                              >
                                {item.title}
                              </h3>


                              {(item.startDate ||
                                item.endDate) && (
                                <p
                                  className="
                                    mt-2
                                    shrink-0
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[0.14em]
                                    text-white/40

                                    sm:mt-1
                                    sm:text-right
                                  "
                                >
                                  {formatDateRange(
                                    item.startDate,
                                    item.endDate,
                                  )}
                                </p>
                              )}

                            </div>


                            {/* =========================
                                TIDER
                            ========================= */}
                            {item.information && (
                              <div className="mt-5">

                                {item.information
                                  .split('\n')
                                  .filter(Boolean)
                                  .map(
                                    (
                                      line,
                                      lineIndex,
                                    ) => {

                                      const firstSpace =
                                        line.indexOf(' ')

                                      const label =
                                        firstSpace > -1
                                          ? line.substring(
                                              0,
                                              firstSpace,
                                            )
                                          : line

                                      const value =
                                        firstSpace > -1
                                          ? line.substring(
                                              firstSpace +
                                                1,
                                            )
                                          : ''

                                      return (
                                        <div
                                          key={
                                            lineIndex
                                          }
                                          className="
                                            flex
                                            min-h-[48px]
                                            items-center
                                            justify-between
                                            gap-5
                                            border-b
                                            border-white/10
                                            py-3

                                            last:border-b-0
                                          "
                                        >

                                          {/* DAG */}
                                          <span
                                            className="
                                              text-sm
                                              font-bold
                                              uppercase
                                              tracking-[0.05em]
                                              text-white/55
                                            "
                                          >
                                            {label}
                                          </span>


                                          {/* TID */}
                                          {value && (
                                            <span
                                              className="
                                                shrink-0
                                                text-base
                                                font-black
                                                text-white
                                              "
                                            >
                                              {value}
                                            </span>
                                          )}

                                        </div>
                                      )
                                    },
                                  )}

                              </div>
                            )}

                          </div>
                        ))}

                      </div>


                      {/* FOOTER */}
                      <div className="border-t border-white/20 pt-5">

                        <p
                          className="
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.22em]
                            text-white/40
                          "
                        >
                          Bonnatösen · {location.name}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              )}

          </div>

        </div>

      </section>


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
              <div className="grid items-start gap-4 md:grid-cols-2">

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
                      className="
                        group
                        relative
                        overflow-hidden
                        border
                        border-[#242424]
                        bg-[#111111]
                        transition

                        hover:border-[#FAC800]
                      "
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || location.name}
                        width={image.width || 1600}
                        height={image.height || 1200}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="
                          h-auto
                          w-full
                          object-contain
                        "
                      />

                      {/* INNER BORDER */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-3
                          border
                          border-transparent
                          transition

                          group-hover:border-[#FAC800]/40
                        "
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