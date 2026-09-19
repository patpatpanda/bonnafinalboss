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
  className="relative overflow-hidden bg-[#0d0d0d] px-4 py-20 md:px-10 md:py-28"
>
  <div className="mx-auto max-w-7xl">

    {/* =========================
        RUBRIK
    ========================= */}
    <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">

      {homepage.locationsEyebrow && (
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FAC800]">
          {homepage.locationsEyebrow}
        </p>
      )}

      <h2
        className="
          mt-4
          text-5xl
          font-black
          uppercase
          leading-[0.9]
          tracking-[-0.05em]
          text-white

          sm:text-6xl
          md:text-7xl
        "
      >
        {homepage.locationsTitle}
      </h2>

      <div className="mx-auto mt-6 h-[3px] w-16 bg-[#FAC800]" />

      {homepage.locationsText && (
        <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
          {homepage.locationsText}
        </p>
      )}

    </div>


    {/* =========================
        WESTERN PLATSKORT
    ========================= */}
    <div className="grid gap-7 lg:grid-cols-2">

      {locations.map((location) => (

        <Link
          key={location.id}
          href={`/platser/${location.slug}`}
          className="
            group
            relative
            min-h-[420px]
            overflow-hidden
            bg-[#d7bc84]
            px-7
            py-8
            text-[#4a3820]

            shadow-[0_30px_80px_rgba(0,0,0,0.45)]

            transition
            duration-500

            hover:-translate-y-1
            hover:shadow-[0_35px_100px_rgba(0,0,0,0.65)]

            sm:px-10
            sm:py-10

            md:min-h-[500px]
            md:px-12
            md:py-12
          "
        >

          {/* =========================
              PAPPERSKÄNSLA
          ========================= */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-50

              [background-image:
              radial-gradient(circle_at_15%_20%,rgba(90,60,24,.18)_0,transparent_24%),
              radial-gradient(circle_at_85%_75%,rgba(90,60,24,.14)_0,transparent_28%),
              linear-gradient(rgba(255,255,255,.10),rgba(80,50,20,.08))]
            "
          />


          {/* =========================
              INRE RAM
          ========================= */}
          <div
            className="
              pointer-events-none
              absolute
              inset-4
              border
              border-[#735630]/50

              transition-all
              duration-500

              group-hover:inset-3
              group-hover:border-[#735630]/80
            "
          />


          {/* =========================
              HÖRNDEKORATIONER
          ========================= */}
          <span className="absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-[#735630]" />

          <span className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-[#735630]" />

          <span className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-[#735630]" />

          <span className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-[#735630]" />


          {/* =========================
              INNEHÅLL
          ========================= */}
          <div
            className="
              relative
              z-10
              flex
              min-h-[350px]
              flex-col
              items-center
              justify-between
              text-center

              md:min-h-[400px]
            "
          >

            {/* TOPP */}
            <div className="w-full">

              <p
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.42em]
                  text-[#75562c]
                "
              >
                Bonnatösen
              </p>

              {/* WESTERN-DEKORATION */}
              <div className="mt-5 flex items-center justify-center gap-3">

                <span className="h-px w-12 bg-[#75562c]/60" />

                <span
                  className="
                    h-2
                    w-2
                    rotate-45
                    border
                    border-[#75562c]
                  "
                />

                <span className="h-px w-12 bg-[#75562c]/60" />

              </div>

            </div>


            {/* MITTEN */}
            <div className="my-12">

              <p
                className="
                  mb-4
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.3em]
                  text-[#75562c]
                "
              >
                Välkommen till
              </p>

              <h3
                className="
                  text-5xl
                  font-black
                  uppercase
                  leading-[0.85]
                  tracking-[-0.055em]

                  transition-transform
                  duration-500

                  group-hover:scale-[1.04]

                  sm:text-6xl
                  md:text-7xl
                  xl:text-[82px]
                "
              >
                {location.name}
              </h3>


              {/* LINJE */}
              <div className="mx-auto mt-7 h-[3px] w-12 bg-[#75562c]" />


              {location.shortDescription && (
                <p
                  className="
                    mx-auto
                    mt-7
                    max-w-md
                    text-[11px]
                    font-semibold
                    uppercase
                    leading-[1.8]
                    tracking-[0.055em]
                    text-[#665033]

                    sm:text-xs
                  "
                >
                  {location.shortDescription}
                </p>
              )}

            </div>


            {/* NEDERDEL */}
            <div className="w-full">

              <div className="mb-5 flex items-center justify-center gap-3">

                <span
                  className="
                    h-px
                    w-10
                    bg-[#75562c]/50

                    transition-all
                    duration-500

                    group-hover:w-16
                  "
                />

                <span className="text-[8px] text-[#75562c]">
                  ◆
                </span>

                <span
                  className="
                    h-px
                    w-10
                    bg-[#75562c]/50

                    transition-all
                    duration-500

                    group-hover:w-16
                  "
                />

              </div>


              {/* CTA */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-3

                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.3em]
                "
              >
                <span>
                  {location.ctaText || 'Besök platsen'}
                </span>

                <span
                  className="
                    text-lg
                    transition-transform
                    duration-300

                    group-hover:translate-x-2
                  "
                >
                  →
                </span>

              </div>

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
      border-[#242424]
      bg-[#0d0d0d]
      px-4
      py-20
      md:px-10
      md:py-28
    "
  >
    <div className="mx-auto max-w-7xl">

      {/* =========================
          RUBRIK
      ========================= */}
     


      {/* =========================
          WESTERN ÖPPETTIDSSKYLT
      ========================= */}
      <div
        className="
          relative
          mx-auto
          max-w-5xl
          overflow-hidden
          bg-[#d7bc84]
          px-7
          py-10
          text-[#4a3820]

          shadow-[0_30px_100px_rgba(0,0,0,0.55)]

          sm:px-10
          sm:py-12

          md:px-16
          md:py-16
        "
      >

        {/* =========================
            PAPPERSKÄNSLA
        ========================= */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-50

            [background-image:
            radial-gradient(circle_at_15%_20%,rgba(90,60,24,.18)_0,transparent_24%),
            radial-gradient(circle_at_85%_75%,rgba(90,60,24,.14)_0,transparent_28%),
            linear-gradient(rgba(255,255,255,.10),rgba(80,50,20,.08))]
          "
        />


        {/* =========================
            INRE RAM
        ========================= */}
        <div
          className="
            pointer-events-none
            absolute
            inset-4
            border
            border-[#735630]/50
          "
        />


        {/* =========================
            HÖRNDEKORATIONER
        ========================= */}
        <span className="absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-[#735630]" />

        <span className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-[#735630]" />

        <span className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-[#735630]" />

        <span className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-[#735630]" />


        {/* =========================
            INNEHÅLL
        ========================= */}
        <div className="relative z-10">

          {/* =========================
              SKYLT HEADER
          ========================= */}
          <div className="text-center">

            <p
              className="
                text-[9px]
                font-black
                uppercase
                tracking-[0.42em]
                text-[#75562c]
              "
            >
              Bonnatösen
            </p>


            {/* DEKORATION */}
            <div className="mt-5 flex items-center justify-center gap-3">

              <span className="h-px w-12 bg-[#75562c]/60" />

              <span
                className="
                  h-2
                  w-2
                  rotate-45
                  border
                  border-[#75562c]
                "
              />

              <span className="h-px w-12 bg-[#75562c]/60" />

            </div>


            <h3
              className="
                mt-6
                text-4xl
                font-black
                uppercase
                leading-none
                tracking-[-0.05em]

                sm:text-5xl
                md:text-6xl
              "
            >
              Välkommen
            </h3>

            <p
              className="
                mt-4
                text-[9px]
                font-black
                uppercase
                tracking-[0.28em]
                text-[#75562c]
              "
            >
              Se våra aktuella öppettider
            </p>

          </div>


          {/* =========================
              ÖPPETTIDER
          ========================= */}
          <div className="mx-auto mt-12 max-w-3xl md:mt-16">

            {openingHours.map((item, index) => {

              const location =
                typeof item.location === 'object'
                  ? item.location
                  : null

              return (
                <div
                  key={item.id}
                  className={`
                    py-10
                    first:pt-0
                    last:pb-0

                    ${
                      index !== 0
                        ? 'border-t border-[#75562c]/35'
                        : ''
                    }
                  `}
                >

                  {/* =========================
                      PLATS
                  ========================= */}
                  {location?.name && (
                    <div className="mb-5 flex items-center gap-4">

                      <span className="h-[3px] w-8 bg-[#75562c]" />

                      <p
                        className="
                          text-[9px]
                          font-black
                          uppercase
                          tracking-[0.3em]
                          text-[#75562c]
                        "
                      >
                        {location.name}
                      </p>

                    </div>
                  )}


                  {/* =========================
                      TITEL + DATUM
                  ========================= */}
                  <div
                    className="
                      gap-5

                      md:flex
                      md:items-end
                      md:justify-between
                    "
                  >

                    <h4
                      className="
                        text-2xl
                        font-black
                        uppercase
                        leading-tight
                        tracking-[-0.035em]

                        sm:text-3xl
                        md:text-4xl
                      "
                    >
                      {item.title}
                    </h4>


                    {(item.startDate || item.endDate) && (
                      <p
                        className="
                          mt-3
                          shrink-0
                          text-[9px]
                          font-black
                          uppercase
                          tracking-[0.2em]
                          text-[#75562c]

                          md:mt-0
                          md:text-right
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
                    <div className="mt-7">

                      {item.information
                        .split('\n')
                        .filter(Boolean)
                        .map((line, lineIndex) => {

                          /*
                           * Om raden exempelvis är:
                           *
                           * "Torsdag 11–16"
                           *
                           * försöker vi separera första ordet
                           * från resten för att få meny-känslan.
                           */
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
                                  firstSpace + 1,
                                )
                              : ''

                          return (
                            <div
                              key={lineIndex}
                              className="
                                flex
                                items-baseline
                                gap-3
                                py-2
                              "
                            >

                              {/* DAG / LABEL */}
                              <span
                                className="
                                  shrink-0
                                  text-sm
                                  font-black
                                  uppercase
                                  tracking-[-0.015em]

                                  sm:text-base
                                  md:text-lg
                                "
                              >
                                {label}
                              </span>


                              {/* PRICKAD LINJE */}
                              {value && (
                                <span
                                  className="
                                    mb-[3px]
                                    flex-1
                                    border-b
                                    border-dotted
                                    border-[#75562c]/45
                                  "
                                />
                              )}


                              {/* TID */}
                              {value && (
                                <span
                                  className="
                                    shrink-0
                                    text-sm
                                    font-black
                                    uppercase

                                    sm:text-base
                                    md:text-lg
                                  "
                                >
                                  {value}
                                </span>
                              )}

                            </div>
                          )
                        })}

                    </div>
                  )}

                </div>
              )
            })}

          </div>


          {/* =========================
              FOOTER DEKORATION
          ========================= */}
          <div className="mt-14 text-center md:mt-16">

            <div className="flex items-center justify-center gap-3">

              <span className="h-px w-10 bg-[#75562c]/50" />

              <span className="text-[8px] text-[#75562c]">
                ◆
              </span>

              <span className="h-px w-10 bg-[#75562c]/50" />

            </div>

            <p
              className="
                mt-5
                text-[9px]
                font-black
                uppercase
                tracking-[0.35em]
                text-[#75562c]
              "
            >
              Bonnatösens Burgare
            </p>

          </div>

        </div>

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