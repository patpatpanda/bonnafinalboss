import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

import { getProducts } from '@/lib/shopify'
import YeehawReveal from '@/components/shop/YeehawReveal'

export const dynamic = 'force-dynamic'

export default async function ShopPage() {
  const payload = await getPayload({
    config,
  })

  const shopPage = await payload.findGlobal({
    slug: 'shop-page',
  })

  const products = await getProducts()

  const heroImage =
    typeof shopPage.heroImage === 'object'
      ? shopPage.heroImage
      : null

  const infoImage =
    typeof shopPage.infoImage === 'object'
      ? shopPage.infoImage
      : null

  return (
    <main className="min-h-screen bg-[#090909] text-white">

      {/* =========================
          HERO
      ========================= */}
      <section className="relative min-h-[52vh] overflow-hidden border-b border-[#292929] md:min-h-[58vh]">

        {heroImage?.url && (
          <Image
            src={heroImage.url}
            alt={heroImage.alt || 'Bonnatösen Shop'}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-black/10 to-black/30" />

        {/* HERO CONTENT */}
        <div className="relative mx-auto flex min-h-[52vh] max-w-7xl flex-col justify-end px-5 pb-12 pt-24 md:min-h-[58vh] md:px-10 md:pb-20 md:pt-28">

          {shopPage.eyebrow && (
            <div className="mb-5 flex items-center gap-4">

              <span className="h-px w-10 bg-[#FAC800] md:w-12" />

              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white md:text-xs">
                {shopPage.eyebrow}
              </span>

              <span className="h-px w-10 bg-[#FAC800] md:w-12" />

            </div>
          )}

          {shopPage.title && (
            <h1
              className="max-w-5xl text-5xl font-black uppercase leading-[0.82] tracking-[-0.055em] sm:text-6xl md:text-8xl lg:text-[8.5rem]"
              style={{
                fontFamily:
                  'Georgia, Times New Roman, serif',
              }}
            >
              {shopPage.title}{' '}
              <YeehawReveal />
            </h1>
          )}

          {shopPage.intro && (
            <p className="mt-6 max-w-2xl text-base leading-7 text-white md:mt-7 md:text-lg md:leading-8">
              {shopPage.intro}
            </p>
          )}

        </div>

      </section>

      {/* =========================
          PRODUKTINTRO
      ========================= */}
      <section className="px-5 pb-10 pt-16 md:px-10 md:pb-14 md:pt-24">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">

            <div>

              {shopPage.productsEyebrow && (
                <div className="flex items-center gap-4">

                  <span className="h-px w-10 bg-[#FAC800]" />

                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FAC800]">
                    {shopPage.productsEyebrow}
                  </p>

                </div>
              )}

              {shopPage.productsTitle && (
                <h2
                  className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] md:text-6xl"
                  style={{
                    fontFamily:
                      'Georgia, Times New Roman, serif',
                  }}
                >
                  {shopPage.productsTitle}
                </h2>
              )}

            </div>

            {shopPage.productsText && (
              <p className="max-w-xl text-sm leading-7 text-white/75 md:text-base lg:justify-self-end">
                {shopPage.productsText}
              </p>
            )}

          </div>

          <div className="mt-10 h-px w-full bg-[#FAC800]/25" />

        </div>

      </section>

      {/* =========================
          PRODUKTER
      ========================= */}
      <section className="px-5 pb-24 md:px-10 md:pb-32">

        <div className="mx-auto max-w-7xl">

          {/* PRODUKTCOUNT */}
          {products.length > 0 && (
            <div className="mb-9 flex items-center justify-between">

              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white md:text-xs">
                Sortiment
              </span>

              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60 md:text-xs">
                {products.length}{' '}
                {products.length === 1
                  ? 'produkt'
                  : 'produkter'}
              </span>

            </div>
          )}

          {/* INGA PRODUKTER */}
          {products.length === 0 ? (
            <div className="relative overflow-hidden border border-[#FAC800]/40 bg-[#111111] px-6 py-20 text-center">

              <div className="pointer-events-none absolute inset-4 border border-[#FAC800]/15" />

              <h2
                className="text-3xl font-black uppercase text-white"
                style={{
                  fontFamily:
                    'Georgia, Times New Roman, serif',
                }}
              >
                Shoppen är tom
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/70">
                Inga produkter finns i shoppen just nu.
                Kom tillbaka snart.
              </p>

            </div>
          ) : (
            <div className="grid gap-x-7 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">

              {products.map((product) => {
                const image =
                  product.featuredImage

                const price = Number(
                  product.priceRange
                    .minVariantPrice.amount,
                )

                return (
                  <Link
                    key={product.id}
                    href={`/shop/${product.handle}`}
                    className="group block"
                  >

                    {/* =========================
                        PRODUKTBILD
                    ========================= */}
                    <div className="relative">

                      {/* YTTRE RAM */}
                      <div className="absolute -inset-[5px] border border-[#FAC800]/25 transition-colors duration-300 group-hover:border-[#FAC800]" />

                      <div className="relative aspect-[4/5] overflow-hidden bg-[#111111]">

                        {image?.url ? (
                          <Image
                            src={image.url}
                            alt={
                              image.altText ||
                              product.title
                            }
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="
                              object-cover
                              transition
                              duration-700
                              ease-out
                              md:group-hover:scale-[1.035]
                            "
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">

                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
                              Ingen bild
                            </span>

                          </div>
                        )}

                        {/* MÖRKNING NEDTILL */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                        {/* HÖRN */}
                        <span className="absolute left-4 top-4 h-5 w-5 border-l border-t border-[#FAC800]/60" />
                        <span className="absolute right-4 top-4 h-5 w-5 border-r border-t border-[#FAC800]/60" />
                        <span className="absolute bottom-4 left-4 h-5 w-5 border-b border-l border-[#FAC800]/60" />
                        <span className="absolute bottom-4 right-4 h-5 w-5 border-b border-r border-[#FAC800]/60" />

                        {/* CTA - SYNLIG MOBIL / HOVER DESKTOP */}
                        <div
                          className="
                            absolute
                            inset-x-5
                            bottom-5
                            translate-y-0
                            border
                            border-[#FAC800]
                            bg-black/95
                            px-5
                            py-4
                            text-center
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.25em]
                            text-white
                            opacity-100
                            backdrop-blur
                            transition-all
                            duration-300

                            md:translate-y-3
                            md:opacity-0
                            md:group-hover:translate-y-0
                            md:group-hover:opacity-100
                          "
                        >
                          Visa produkt
                        </div>

                      </div>

                    </div>

                    {/* =========================
                        PRODUKTINFO
                    ========================= */}
                    <div className="pt-6">

                      <div className="flex items-start justify-between gap-5">

                        <div className="min-w-0">

                          <h3
                            className="
                              text-2xl
                              font-black
                              uppercase
                              leading-none
                              tracking-[-0.035em]
                              text-white
                              transition
                              duration-200
                            "
                            style={{
                              fontFamily:
                                'Georgia, Times New Roman, serif',
                            }}
                          >
                            {product.title}
                          </h3>

                        </div>

                        <span
                          className="shrink-0 text-lg font-black text-[#FAC800]"
                          style={{
                            fontFamily:
                              'Georgia, Times New Roman, serif',
                          }}
                        >
                          {formatPrice(
                            price,
                            product.priceRange
                              .minVariantPrice
                              .currencyCode,
                          )}
                        </span>

                      </div>

                      {product.description && (
                        <p className="mt-4 line-clamp-2 max-w-md text-sm leading-6 text-white/70">
                          {product.description}
                        </p>
                      )}

                      <div className="mt-5 flex items-center gap-3">

                        <span className="h-px w-7 bg-[#FAC800]/40 transition-all duration-300 group-hover:w-12 group-hover:bg-[#FAC800]" />

                        <span className="text-[9px] font-black uppercase tracking-[0.22em] text-white/70 transition group-hover:text-white">
                          Se mer
                        </span>

                      </div>

                    </div>

                  </Link>
                )
              })}

            </div>
          )}

        </div>

      </section>

      {/* =========================
          INFORMATION
      ========================= */}
      {shopPage.infoActive && (
        <section className="border-t border-[#292929] bg-[#0d0d0d] px-5 py-20 md:px-10 md:py-28">

          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">

            {/* BILD */}
            {infoImage?.url && (
              <div className="relative min-h-[420px] overflow-hidden border border-[#FAC800]/30 md:min-h-[520px]">

                <Image
                  src={infoImage.url}
                  alt={
                    infoImage.alt ||
                    shopPage.infoTitle ||
                    'Bonnatösen Shop'
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                <div className="pointer-events-none absolute inset-4 border border-[#FAC800]/20" />

              </div>
            )}

            {/* TEXT */}
            <div>

              {shopPage.infoEyebrow && (
                <div className="flex items-center gap-4">

                  <span className="h-px w-10 bg-[#FAC800]" />

                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white">
                    {shopPage.infoEyebrow}
                  </p>

                </div>
              )}

              {shopPage.infoTitle && (
                <h2
                  className="mt-5 text-4xl font-black uppercase leading-[0.93] tracking-[-0.04em] text-white md:text-6xl"
                  style={{
                    fontFamily:
                      'Georgia, Times New Roman, serif',
                  }}
                >
                  {shopPage.infoTitle}
                </h2>
              )}

              <div className="mt-8 h-px max-w-xs bg-[#FAC800]/35" />

              {/* FALLBACK-TEXT */}
              <p className="mt-8 max-w-xl text-base leading-8 text-white/75 md:text-lg">
                Merch och prylar från Bonnatösen.
                Beställ online och bär med dig en bit
                av gården, burgarna och Saloonen.
              </p>

              <Link
                href="/#locations"
                className="
                  mt-9
                  inline-flex
                  border
                  border-[#FAC800]
                  px-7
                  py-4
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-white
                  transition
                  hover:bg-[#FAC800]
                  hover:text-black
                "
              >
                Besök Bonnatösen
              </Link>

            </div>

          </div>

        </section>
      )}

      {/* =========================
          AVSLUTNING
      ========================= */}
      <section className="border-t border-[#292929] px-5 py-16 md:px-10 md:py-20">

        <div className="mx-auto flex max-w-7xl items-center gap-5">

          <span className="h-px flex-1 bg-[#FAC800]/20" />

          <span className="text-[8px] font-black uppercase tracking-[0.35em] text-[#FAC800]">
            Bonnatösen
          </span>

          <span className="h-px flex-1 bg-[#FAC800]/20" />

        </div>

      </section>

    </main>
  )
}

function formatPrice(
  price: number,
  currencyCode: string,
) {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(price)
}