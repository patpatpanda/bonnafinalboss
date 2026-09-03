import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export default async function MenuPage() {
  const payload = await getPayload({ config })

  const menu = await payload.findGlobal({
    slug: 'menu',
  })
  const heroImage =
    typeof menu.heroImage === 'object'
      ? menu.heroImage
      : null

  const burgerImage =
    typeof menu.burgerImage === 'object'
      ? menu.burgerImage
      : null

  const activeSides =
    menu.sides?.filter(
      (side) => side.active !== false,
    ) || []
const activeDesserts =
  menu.desserts?.filter(
    (dessert) => dessert.active !== false,
  ) || []
  const activeDrinks =
    menu.drinks?.filter(
      (drink) => drink.active !== false,
    ) || []

  const drinkCategories = [
    {
      value: 'beer',
      label: 'Öl',
    },
    {
      value: 'wine',
      label: 'Vin',
    },
    {
      value: 'alcohol-free',
      label: 'Alkoholfritt',
    },
    {
      value: 'soft-drinks',
      label: 'Läsk',
    },
    {
      value: 'other',
      label: 'Övrigt',
    },
  ]

  return (
    <main className="min-h-screen bg-[#090909] text-white">

      {/* =========================
          HERO
      ========================= */}
      <section className="relative min-h-[60vh] overflow-hidden border-b border-[#292929]">

        {heroImage?.url && (
          <Image
            src={heroImage.url}
            alt={heroImage.alt || 'Bonnatösens meny'}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-black/30" />

        <div className="relative mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-10 md:pb-20">

          {menu.eyebrow && (
            <div className="mb-5 flex items-center gap-4">

              <span className="h-px w-12 bg-[#FAC800]" />

              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FAC800] md:text-xs">
                {menu.eyebrow}
              </span>

              <span className="h-px w-12 bg-[#FAC800]" />

            </div>
          )}

          <h1
            className="text-6xl font-black uppercase leading-[0.82] tracking-[-0.05em] sm:text-7xl md:text-8xl lg:text-[9rem]"
            style={{
              fontFamily:
                'Georgia, Times New Roman, serif',
            }}
          >
            {menu.title}
          </h1>

          {menu.intro && (
            <p className="mt-7 max-w-xl text-base leading-7 text-white md:text-lg">
              {menu.intro}
            </p>
          )}

        </div>

      </section>

      {/* =========================
          VECKANS BURGARE
      ========================= */}
      {menu.burgerActive !== false && (
        <section className="px-5 py-20 md:px-10 md:py-28">

          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">

            {/* BILD */}
            <div className="relative min-h-[500px] overflow-hidden border border-[#FAC800]/30 bg-[#111111] md:min-h-[650px]">

              {burgerImage?.url ? (
                <Image
                  src={burgerImage.url}
                  alt={
                    burgerImage.alt ||
                    menu.burgerName ||
                    'Veckans burgare'
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs font-black uppercase tracking-[0.2em] text-[#FAC800]">
                  Lägg till burgarbild i Payload
                </div>
              )}

              <div className="pointer-events-none absolute inset-4 border border-[#FAC800]/20" />

              <div className="absolute left-7 top-7 border border-[#FAC800] bg-black/90 px-5 py-3 text-[10px] font-black uppercase tracking-[0.28em] text-[#FAC800]">
                Veckans burgare
              </div>

            </div>

            {/* TEXT */}
            <div>

              <div className="flex items-center gap-4">

                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FAC800]">
                  {menu.burgerEyebrow ||
                    'Veckans burgare'}
                </span>

                <span className="h-px flex-1 bg-[#FAC800]/25" />

              </div>

              {menu.burgerName && (
                <h2
                  className="mt-8 text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl"
                  style={{
                    fontFamily:
                      'Georgia, Times New Roman, serif',
                  }}
                >
                  {menu.burgerName}
                </h2>
              )}

              {menu.burgerDescription && (
                <p className="mt-8 max-w-xl text-base leading-8 text-white/75 md:text-lg">
                  {menu.burgerDescription}
                </p>
              )}

              {/* Inget separat pris här längre */}

              <div className="mt-10 h-px w-full bg-[#FAC800]/25" />

              <p className="mt-5 text-[10px] font-black uppercase tracking-[0.28em] text-[#FAC800]">
                Ny burgare varje vecka
              </p>

            </div>

          </div>

        </section>
      )}

      {/* =========================
          WESTERN MENYBLAD
      ========================= */}
      {(activeSides.length > 0 ||
        activeDrinks.length > 0 ||
        menu.burgerActive !== false) && (
        <section className="px-4 py-16 md:px-10 md:py-28">

          <div
            className="
              relative
              mx-auto
              max-w-6xl
              overflow-hidden
              bg-[#d7bc84]
              px-6
              py-10
              text-[#4a3820]
              shadow-[0_30px_100px_rgba(0,0,0,0.6)]
              sm:px-10
              md:px-14
              md:py-14
            "
          >

            {/* PAPPERSKÄNSLA */}
            <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_15%_20%,rgba(90,60,24,.18)_0,transparent_24%),radial-gradient(circle_at_85%_75%,rgba(90,60,24,.14)_0,transparent_28%),linear-gradient(rgba(255,255,255,.10),rgba(80,50,20,.08))]" />

            {/* RAMAR */}
            <div className="pointer-events-none absolute inset-3 border border-[#735630]/80" />
            <div className="pointer-events-none absolute inset-5 border border-[#735630]/40" />

            <div className="relative z-10">

              {/* =========================
                  HEADER
              ========================= */}
              <div className="text-center">

                <p className="text-[10px] font-black uppercase tracking-[0.4em]">
                  Bonnatösens Burgare
                </p>

                <h2
                  className="mt-3 text-5xl font-black uppercase leading-none tracking-[-0.05em] sm:text-6xl md:text-8xl"
                  style={{
                    fontFamily:
                      'Georgia, Times New Roman, serif',
                  }}
                >
                  Meny
                </h2>

                <div className="mx-auto mt-6 h-px max-w-2xl bg-[#75562c]" />

              </div>

              {/* =========================
                  BURGARE
              ========================= */}
              {menu.burgerActive !== false && (
                <>
                  <section className="mx-auto mt-12 max-w-2xl">

                    <WesternHeading>
                      Burgare
                    </WesternHeading>

                    {menu.burgerName && (
                      <div className="mb-8 border-l-2 border-[#75562c] pl-4">

                        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#75562c]">
                          Veckans burgare
                        </p>

                        <p
                          className="mt-2 text-xl font-black uppercase tracking-[-0.02em]"
                          style={{
                            fontFamily:
                              'Georgia, Times New Roman, serif',
                          }}
                        >
                          {menu.burgerName}
                        </p>

                        {menu.burgerDescription && (
                          <p className="mt-2 text-[10px] font-semibold uppercase leading-[1.6] tracking-[0.05em] text-[#665033]">
                            {menu.burgerDescription}
                          </p>
                        )}

                      </div>
                    )}

                    <div className="space-y-7">

                      <WesternItem
                        name="Enkel"
                        price={`${menu.singleBurgerPrice ?? 135}:-`}
                      />

                      <WesternItem
                        name="Dubbel"
                        price={`${menu.doubleBurgerPrice ?? 165}:-`}
                      />

                    </div>

                  </section>

                  <div className="mx-auto my-12 h-px max-w-2xl bg-[#75562c]/50" />
                </>
              )}

              {/* =========================
                  TILLBEHÖR + DRYCK
              ========================= */}
              <div className="grid gap-12 md:grid-cols-2 md:gap-0">

                {/* =====================
                    VÄNSTER - TILLBEHÖR
                ===================== */}
                <div className="md:border-r md:border-[#765a35]/50 md:pr-10">

                  {activeSides.length > 0 && (
                    <section>

                      <WesternHeading>
                        {menu.sidesTitle ||
                          'Tillbehör'}
                      </WesternHeading>

                      <div className="space-y-7">

                        {activeSides.map(
                          (side, index) => (
                            <WesternItem
                              key={
                                side.id ||
                                index
                              }
                              name={side.name}
                              description={
                                side.description ||
                                undefined
                              }
                              price={`${side.price}:-`}
                            />
                          ),
                        )}

                      </div>

                    </section>
                  )}

                </div>

                {/* =====================
                    HÖGER - DRYCK
                ===================== */}
                <div className="md:pl-10">

                  {activeDrinks.length > 0 && (
                    <>
                      <WesternHeading>
                        {menu.drinksTitle ||
                          'Dryck'}
                      </WesternHeading>

                      {menu.drinksText && (
                        <p className="mb-8 text-[11px] font-semibold uppercase leading-[1.7] tracking-[0.05em] text-[#665033]">
                          {menu.drinksText}
                        </p>
                      )}

                      <div className="space-y-10">

                        {drinkCategories.map(
                          (category) => {
                            const drinks =
                              activeDrinks.filter(
                                (drink) =>
                                  drink.category ===
                                  category.value,
                              )

                            if (
                              drinks.length === 0
                            ) {
                              return null
                            }

                            return (
                              <section
                                key={
                                  category.value
                                }
                              >

                                <h3
                                  className="mb-5 text-xl font-black uppercase tracking-[-0.02em]"
                                  style={{
                                    fontFamily:
                                      'Georgia, Times New Roman, serif',
                                  }}
                                >
                                  {category.label}
                                </h3>

                                <div className="space-y-6">

                                  {drinks.map(
                                    (
                                      drink,
                                      index,
                                    ) => (
                                      <WesternItem
                                        key={
                                          drink.id ||
                                          index
                                        }
                                        name={
                                          drink.name
                                        }
                                        description={
                                          drink.description ||
                                          undefined
                                        }
                                        price={`${drink.price}:-`}
                                      />
                                    ),
                                  )}

                                </div>

                              </section>
                            )
                          },
                        )}

                      </div>
                    </>
                  )}

                </div>

              </div>

              {/* =========================
                  FOOTER
              ========================= */}
              <div className="mt-16 text-center">

                <div className="h-px w-full bg-[#75562c]/50" />

                <p className="mt-5 text-[9px] font-black uppercase tracking-[0.35em]">
                  Bonnatösens Burgare
                </p>

              </div>

            </div>

          </div>

        </section>
      )}

      {/* =========================
          AVSLUTNING
      ========================= */}
      <section className="border-t border-[#292929] px-5 py-20 text-center md:py-28">

        <div className="relative mx-auto h-[140px] w-[300px] md:h-[180px] md:w-[390px]">

          <Image
            src="/images/bonnatosen-logo.png"
            alt="Bonnatösens Burgare"
            fill
            sizes="390px"
            className="object-contain"
          />

        </div>

        <div className="mx-auto mt-5 h-px max-w-sm bg-[#FAC800]/25" />

        <p className="mx-auto mt-5 max-w-md text-xs font-black uppercase tracking-[0.25em] text-[#FAC800]">
          En burgare i taget. Som det ska vara.
        </p>

      </section>

    </main>
  )
}

/* =========================
   WESTERN ITEM
========================= */

function WesternItem({
  name,
  description,
  price,
}: {
  name: string
  description?: string
  price: string
}) {
  return (
    <div>

      <div className="flex items-baseline gap-3">

        <h4
          className="shrink-0 text-base font-black uppercase tracking-[-0.015em] sm:text-lg"
          style={{
            fontFamily:
              'Georgia, Times New Roman, serif',
          }}
        >
          {name}
        </h4>

        <span className="mb-[3px] flex-1 border-b border-dotted border-[#75562c]/60" />

        <span
          className="shrink-0 text-base font-black"
          style={{
            fontFamily:
              'Georgia, Times New Roman, serif',
          }}
        >
          {price}
        </span>

      </div>

      {description && (
        <p className="mt-2 max-w-md text-[10px] font-semibold uppercase leading-[1.6] tracking-[0.055em] text-[#665033]">
          {description}
        </p>
      )}

    </div>
  )
}

/* =========================
   WESTERN HEADING
========================= */

function WesternHeading({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mb-8">

      <h2
        className="text-3xl font-black uppercase tracking-[-0.04em] md:text-4xl"
        style={{
          fontFamily:
            'Georgia, Times New Roman, serif',
        }}
      >
        {children}
      </h2>

      <div className="mt-3 h-[2px] w-16 bg-[#75562c]" />

    </div>
  )
}