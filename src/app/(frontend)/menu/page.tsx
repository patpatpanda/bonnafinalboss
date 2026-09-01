import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'

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
    menu.sides?.filter((side) => side.active !== false) || []

  const activeDrinks =
    menu.drinks?.filter((drink) => drink.active !== false) || []

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-[#f4f0e8]">

      {/* HERO */}
      <section className="relative min-h-[60vh] overflow-hidden border-b border-[#242424]">
        {heroImage?.url && (
          <Image
            src={heroImage.url}
            alt={heroImage.alt || 'Bonnatösens meny'}
            fill
            priority
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-black/30" />

        <div className="relative mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-10 md:pb-20">
          {menu.eyebrow && (
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-14 bg-[#d7a52b]" />

              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d7a52b]">
                {menu.eyebrow}
              </span>
            </div>
          )}

          <h1 className="text-6xl font-black uppercase leading-[0.85] tracking-[-0.06em] sm:text-7xl md:text-8xl lg:text-[9rem]">
            {menu.title}
          </h1>

          {menu.intro && (
            <p className="mt-7 max-w-xl text-base leading-7 text-[#c0bbb2] md:text-lg">
              {menu.intro}
            </p>
          )}
        </div>
      </section>

      {/* VECKANS BURGARE */}
      {menu.burgerActive !== false && (
        <section className="px-5 py-20 md:px-10 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">

            {/* BURGARBILD */}
            <div className="relative min-h-[500px] overflow-hidden md:min-h-[650px]">
              {burgerImage?.url ? (
                <Image
                  src={burgerImage.url}
                  alt={burgerImage.alt || menu.burgerName || 'Veckans burgare'}
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center border border-[#292929] bg-[#111111] text-xs font-bold uppercase tracking-[0.2em] text-[#55514c]">
                  Lägg till burgarbild i Payload
                </div>
              )}

              {/* VECKANS BADGE */}
              <div className="absolute left-0 top-0 bg-[#d7a52b] px-5 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-[#111111]">
                Veckans
              </div>
            </div>

            {/* BURGARINFO */}
            <div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d7a52b]">
                  {menu.burgerEyebrow || 'Veckans burgare'}
                </span>

                <span className="h-px flex-1 bg-[#292929]" />
              </div>

              {menu.burgerName && (
                <h2 className="mt-7 text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl">
                  {menu.burgerName}
                </h2>
              )}

              {menu.burgerDescription && (
                <p className="mt-8 max-w-xl text-base leading-8 text-[#aaa59c] md:text-lg">
                  {menu.burgerDescription}
                </p>
              )}

              {typeof menu.burgerPrice === 'number' && (
                <div className="mt-10 flex items-end gap-3">
                  <span className="text-5xl font-black tracking-[-0.05em] text-[#d7a52b] md:text-6xl">
                    {menu.burgerPrice}
                  </span>

                  <span className="mb-1 text-sm font-bold uppercase tracking-[0.2em] text-[#77736c]">
                    kr
                  </span>
                </div>
              )}

              <div className="mt-10 border-l-2 border-[#d7a52b] pl-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#77736c]">
                  Ny burgare varje vecka
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TILLBEHÖR */}
      {activeSides.length > 0 && (
        <section className="border-y border-[#242424] bg-[#0e0e0e] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-5xl">

            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d7a52b]">
                  Något vid sidan?
                </p>

                <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.04em] md:text-6xl">
                  {menu.sidesTitle || 'Tillbehör'}
                </h2>
              </div>

              <span className="hidden text-7xl font-black text-white/[0.025] md:block">
                +
              </span>
            </div>

            <div className="border-t border-[#292929]">
              {activeSides.map((side, index) => (
                <div
                  key={side.id || index}
                  className="grid grid-cols-[1fr_auto] gap-6 border-b border-[#292929] py-7"
                >
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-[0.02em] md:text-xl">
                      {side.name}
                    </h3>

                    {side.description && (
                      <p className="mt-2 max-w-xl text-sm leading-6 text-[#77736c]">
                        {side.description}
                      </p>
                    )}
                  </div>

                  <div className="text-lg font-black text-[#d7a52b] md:text-xl">
                    {side.price} kr
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DRYCK */}
      {activeDrinks.length > 0 && (
        <section className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-5xl">

            <div className="mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d7a52b]">
                I glaset
              </p>

              <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.04em] md:text-6xl">
                {menu.drinksTitle || 'Dryck'}
              </h2>

              {menu.drinksText && (
                <p className="mt-5 max-w-xl leading-7 text-[#77736c]">
                  {menu.drinksText}
                </p>
              )}
            </div>

            <div className="grid gap-x-16 md:grid-cols-2">
              {activeDrinks.map((drink, index) => (
                <div
                  key={drink.id || index}
                  className="grid grid-cols-[1fr_auto] gap-5 border-t border-[#292929] py-6"
                >
                  <div>
                    <h3 className="font-black uppercase tracking-[0.02em]">
                      {drink.name}
                    </h3>

                    {drink.description && (
                      <p className="mt-2 text-sm leading-6 text-[#77736c]">
                        {drink.description}
                      </p>
                    )}
                  </div>

                  <span className="font-black text-[#d7a52b]">
                    {drink.price} kr
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AVSLUTNING */}
      <section className="border-t border-[#242424] bg-[#0e0e0e] px-5 py-20 text-center md:py-28">
        <div className="relative mx-auto h-[140px] w-[300px] md:h-[180px] md:w-[390px]">
          <Image
            src="/images/bonnatosen-logo.png"
            alt="Bonnatösens Burgare"
            fill
            className="object-contain"
          />
        </div>

        <p className="mx-auto mt-3 max-w-md text-xs font-bold uppercase tracking-[0.25em] text-[#66625c]">
          En burgare i taget. Som det ska vara.
        </p>
      </section>

    </main>
  )
}