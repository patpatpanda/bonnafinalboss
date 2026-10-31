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
    typeof menu.heroImage === 'object' ? menu.heroImage : null

  const burgerImage =
    typeof menu.burgerImage === 'object' ? menu.burgerImage : null

  const activeSides =
    menu.sides?.filter((side) => side.active !== false) || []

  const activeDesserts =
    menu.desserts?.filter((dessert) => dessert.active !== false) || []

  const activeDrinks =
    menu.drinks?.filter((drink) => drink.active !== false) || []

  const drinkCategories = [
    { value: 'beer', label: 'Öl' },
    { value: 'wine', label: 'Vin' },
    { value: 'alcohol-free', label: 'Alkoholfritt' },
    { value: 'soft-drinks', label: 'Läsk' },
    { value: 'other', label: 'Övrigt' },
  ]

  return (
    <main className="min-h-screen overflow-x-clip bg-[#090909] text-white">
      {/* HERO */}
      <section className="relative isolate min-h-[48svh] overflow-hidden border-b border-[#242424] sm:min-h-[60svh]">
        {heroImage?.url && (
          <Image
            src={heroImage.url}
            alt={heroImage.alt || 'Bonnatösens meny'}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        )}

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-black/15 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[48svh] max-w-7xl flex-col justify-end px-5 pb-9 pt-24 sm:min-h-[60svh] sm:px-8 sm:pb-16 sm:pt-32 md:px-10 md:pb-20">
          {menu.eyebrow && (
            <div className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4">
              <span className="h-px w-7 shrink-0 bg-[#FAC800] sm:w-12" />
              <span className="text-[8px] font-black uppercase tracking-[0.18em] text-[#FAC800] sm:text-[10px] sm:tracking-[0.3em] md:text-[11px]">
                {menu.eyebrow}
              </span>
            </div>
          )}

          <h1 className="max-w-full break-words text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] [overflow-wrap:anywhere] sm:text-5xl md:text-6xl lg:text-7xl">
            {menu.title}
          </h1>

          {menu.intro && (
            <p className="mt-4 max-w-xl text-xs leading-5 text-white/85 sm:mt-6 sm:text-sm sm:leading-6 md:text-base">
              {menu.intro}
            </p>
          )}
        </div>
      </section>
      {/* VECKANS BURGARE */}
      {menu.burgerActive !== false && (
        <section className="px-4 py-10 sm:px-6 sm:py-14 md:px-10 md:py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-7 sm:gap-9 lg:grid-cols-2 lg:gap-14 xl:gap-16">

          {/* BILD */}
<div className="group relative aspect-[4/5] w-full overflow-hidden bg-[#111111] shadow-[0_24px_70px_rgba(0,0,0,0.35)]">

  {burgerImage?.url ? (
    <Image
      src={burgerImage.url}
      alt={
        burgerImage.alt ||
        menu.burgerName ||
        'Veckans burgare'
      }
      fill
      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 90vw, 50vw"
      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-[9px] font-black uppercase tracking-[0.12em] text-white/40 sm:text-xs sm:tracking-[0.2em]">
      Lägg till burgarbild i Payload
    </div>
  )}

  {/* GUL DEKORATION */}
  <div className="absolute left-0 top-0 z-20 h-1 w-14 bg-[#FAC800] transition-all duration-500 group-hover:w-32 sm:w-20" />

  {/* ETIKETT */}
  <div className="absolute left-3 top-3 z-20 max-w-[calc(100%-1.5rem)] bg-black/85 px-3 py-2 text-[8px] font-black uppercase tracking-[0.12em] text-white backdrop-blur sm:left-5 sm:top-5 sm:px-4 sm:py-2.5 sm:text-[9px] sm:tracking-[0.22em]">
    Veckans burgare
  </div>

</div>
            {/* TEXT */}
            <div className="min-w-0 py-1 sm:py-0">

              <div className="flex items-center gap-3 sm:gap-4">
                <span className="h-px w-7 shrink-0 bg-[#FAC800] sm:w-9" />

                <span className="text-[8px] font-black uppercase tracking-[0.14em] text-[#FAC800] sm:text-[9px] sm:tracking-[0.25em] md:text-[10px]">
                  {menu.burgerEyebrow || 'Veckans burgare'}
                </span>
              </div>

              {menu.burgerName && (
                <h2 className="mt-4 max-w-full break-words text-3xl font-black uppercase leading-[0.98] tracking-[-0.045em] [overflow-wrap:anywhere] sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl">
                  {menu.burgerName}
                </h2>
              )}

              {menu.burgerDescription && (
                <p className="mt-4 max-w-xl whitespace-pre-line break-words text-xs leading-6 text-white/70 sm:mt-6 sm:text-sm sm:leading-7 md:text-base">
                  {menu.burgerDescription}
                </p>
              )}

              <div className="mt-6 h-px w-full bg-white/10 sm:mt-8" />

              <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-5 sm:gap-4">
                <span className="text-[8px] font-black uppercase tracking-[0.12em] text-white/60 sm:text-[9px] sm:tracking-[0.22em] md:text-[10px]">
                  Ny burgare varje vecka
                </span>

                <span className="h-px w-7 shrink-0 bg-[#FAC800] sm:w-9" />
              </div>

            </div>
          </div>
        </section>
      )}

      {/* WESTERN MENYBLAD */}
      {(activeSides.length > 0 ||
        activeDesserts.length > 0 ||
        activeDrinks.length > 0 ||
        menu.burgerActive !== false) && (
        <section className="bg-[#0d0d0d] px-3 py-9 sm:px-5 sm:py-14 md:px-10 md:py-20 lg:py-24">
          <div className="relative mx-auto max-w-6xl overflow-hidden bg-[#d7bc84] px-5 py-8 text-[#4a3820] shadow-[0_30px_100px_rgba(0,0,0,0.6)] sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-14">
            {/* PAPPERSKÄNSLA */}
            <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_15%_20%,rgba(90,60,24,.18)_0,transparent_24%),radial-gradient(circle_at_85%_75%,rgba(90,60,24,.14)_0,transparent_28%),linear-gradient(rgba(255,255,255,.10),rgba(80,50,20,.08))]" />

            {/* WESTERN-RAM */}
            <div className="pointer-events-none absolute inset-2 border border-[#735630]/50 sm:inset-3 md:inset-4" />

            <div className="relative z-10 min-w-0">
              {/* HEADER */}
              <div className="text-center">
                <p className="text-[8px] font-black uppercase tracking-[0.16em] sm:text-[9px] sm:tracking-[0.3em]">
                  Bonnatösens Burgare
                </p>

                <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-[-0.05em] sm:text-4xl md:text-6xl lg:text-7xl">
                  Meny
                </h2>

                <div className="mx-auto mt-5 h-[2px] w-14 bg-[#75562c] sm:mt-6 sm:w-20" />
              </div>

              {/* BURGARE */}
              {menu.burgerActive !== false && (
                <>
                  <section className="mx-auto mt-9 max-w-2xl sm:mt-10">
                    <WesternHeading>Burgare</WesternHeading>

                    {menu.burgerName && (
                      <div className="mb-6 sm:mb-7">
                        <div className="mb-3 h-[3px] w-8 bg-[#75562c]" />

                        <p className="text-[8px] font-black uppercase tracking-[0.12em] text-[#75562c] sm:text-[9px] sm:tracking-[0.2em]">
                          Veckans burgare
                        </p>

                        <p className="mt-2 break-words text-base font-black uppercase tracking-[-0.02em] [overflow-wrap:anywhere] sm:text-lg md:text-xl">
                          {menu.burgerName}
                        </p>

                        {menu.burgerDescription && (
                          <p className="mt-2 whitespace-pre-line break-words text-[8px] font-semibold uppercase leading-[1.7] tracking-[0.025em] text-[#665033] sm:text-[9px] sm:tracking-[0.04em]">
                            {menu.burgerDescription}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="space-y-5 sm:space-y-6">
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

                  <div className="mx-auto my-9 h-px max-w-2xl bg-[#75562c]/40 sm:my-10" />
                </>
              )}

              {/* TILLBEHÖR, DESSERT OCH DRYCK */}
              <div className="grid min-w-0 gap-9 sm:gap-10 md:grid-cols-2 md:gap-0">
                {/* VÄNSTER KOLUMN */}
                <div className="min-w-0 md:border-r md:border-[#765a35]/35 md:pr-6 lg:pr-9">
                  {/* TILLBEHÖR */}
                  {activeSides.length > 0 && (
                    <section>
                      <WesternHeading>
                        {menu.sidesTitle || 'Tillbehör'}
                      </WesternHeading>

                      <div className="space-y-5 sm:space-y-6">
                        {activeSides.map((side, index) => (
                          <WesternItem
                            key={side.id || index}
                            name={side.name}
                            description={side.description || undefined}
                            price={`${side.price}:-`}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                  {/* DESSERT */}
                  {activeDesserts.length > 0 && (
                    <section
                      className={
                        activeSides.length > 0
                          ? 'mt-9 border-t border-[#75562c]/30 pt-8 sm:mt-12 sm:pt-10'
                          : ''
                      }
                    >
                      <WesternHeading>
                        {menu.dessertsTitle || 'Dessert'}
                      </WesternHeading>

                      {menu.dessertsText && (
                        <p className="mb-6 whitespace-pre-line break-words text-[8px] font-semibold uppercase leading-[1.8] tracking-[0.025em] text-[#665033] sm:mb-7 sm:text-[10px] sm:tracking-[0.04em]">
                          {menu.dessertsText}
                        </p>
                      )}

                      <div className="space-y-5 sm:space-y-6">
                        {activeDesserts.map((dessert, index) => (
                          <WesternItem
                            key={dessert.id || index}
                            name={dessert.name}
                            description={dessert.description || undefined}
                            price={`${dessert.price}:-`}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                {/* HÖGER KOLUMN – DRYCK */}
                <div className="min-w-0 md:pl-6 lg:pl-9">
                  {activeDrinks.length > 0 && (
                    <>
                      <WesternHeading>
                        {menu.drinksTitle || 'Dryck'}
                      </WesternHeading>

                      {menu.drinksText && (
                        <p className="mb-6 whitespace-pre-line break-words text-[8px] font-semibold uppercase leading-[1.8] tracking-[0.025em] text-[#665033] sm:mb-7 sm:text-[10px] sm:tracking-[0.04em]">
                          {menu.drinksText}
                        </p>
                      )}

                      <div className="space-y-7 sm:space-y-9">
                        {drinkCategories.map((category) => {
                          const drinks = activeDrinks.filter(
                            (drink) => drink.category === category.value,
                          )

                          if (drinks.length === 0) {
                            return null
                          }

                          return (
                            <section key={category.value}>
                              <h3 className="mb-4 break-words text-base font-black uppercase tracking-[-0.02em] sm:mb-5 sm:text-lg md:text-xl">
                                {category.label}
                              </h3>

                              <div className="space-y-5 sm:space-y-6">
                                {drinks.map((drink, index) => (
                                  <WesternItem
                                    key={drink.id || index}
                                    name={drink.name}
                                    description={drink.description || undefined}
                                    price={`${drink.price}:-`}
                                  />
                                ))}
                              </div>
                            </section>
                          )
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* FOOTER */}
              <div className="mt-10 text-center sm:mt-12">
                <div className="mx-auto h-[2px] w-12 bg-[#75562c] sm:w-14" />

                <p className="mt-4 text-[8px] font-black uppercase tracking-[0.16em] sm:mt-5 sm:text-[9px] sm:tracking-[0.3em]">
                  Bonnatösens Burgare
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

/* WESTERN ITEM */

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
    <div className="min-w-0">
      <div className="flex min-w-0 items-baseline gap-2 sm:gap-3">
        <h4 className="min-w-0 break-words text-xs font-black uppercase leading-snug tracking-[-0.015em] [overflow-wrap:anywhere] sm:text-sm md:text-base">
          {name}
        </h4>

        <span
          aria-hidden="true"
          className="mb-[3px] min-w-[6px] flex-1 border-b border-dotted border-[#75562c]/45"
        />

        <span className="shrink-0 whitespace-nowrap text-xs font-black tabular-nums sm:text-sm md:text-base">
          {price}
        </span>
      </div>

      {description && (
        <p className="mt-1.5 break-words text-[8px] font-semibold uppercase leading-[1.7] tracking-[0.02em] text-[#665033] sm:mt-2 sm:text-[9px] sm:tracking-[0.04em]">
          {description}
        </p>
      )}
    </div>
  )
}

/* WESTERN HEADING */

function WesternHeading({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mb-5 sm:mb-7">
      <h2 className="break-words text-xl font-black uppercase tracking-[-0.04em] sm:text-2xl md:text-3xl">
        {children}
      </h2>

      <div className="mt-2.5 h-[3px] w-9 bg-[#75562c] sm:mt-3 sm:w-11" />
    </div>
  )
}