import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import ShopifyAddToCart from '@/components/shop/ShopifyAddToCart'
import { getProductByHandle } from '@/lib/shopify'

type PageProps = {
  params: Promise<{
    handle: string
  }>
}

export default async function ProductPage({
  params,
}: PageProps) {
  const { handle } = await params

  const product = await getProductByHandle(handle)

  if (!product) {
    notFound()
  }

  const images = product.images.nodes
  const variants = product.variants.nodes
  const firstVariant = variants[0]

  const available = variants.some(
    (variant) => variant.availableForSale,
  )

  return (
    <main className="min-h-screen bg-[#090909] text-white">

      {/* =========================
          BREADCRUMB
      ========================= */}
      <section className="border-b border-[#242424] px-5 py-6 md:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em]">

            <Link
              href="/shop"
              className="text-[#FAC800] transition hover:text-white"
            >
              Shop
            </Link>

            <span className="text-white/25">
              /
            </span>

            <span className="text-white/50">
              {product.title}
            </span>

          </div>

        </div>

      </section>

      {/* =========================
          PRODUKT
      ========================= */}
      <section className="px-5 py-14 md:px-10 md:py-24">

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">

          {/* =========================
              BILDER
          ========================= */}
          <div>

            {images.length > 0 ? (

              <div className="grid gap-6">

                {images.map((image, index) => (
                  <div
                    key={image.id || image.url}
                    className={`
                      group
                      relative
                      overflow-hidden
                      bg-[#111111]
                      shadow-[0_24px_70px_rgba(0,0,0,0.35)]
                      ${
                        index === 0
                          ? 'aspect-[4/5]'
                          : 'aspect-[4/3]'
                      }
                    `}
                  >

                    <Image
                      src={image.url}
                      alt={
                        image.altText ||
                        product.title
                      }
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-[1.02]
                      "
                    />

                    {/* DISKRET MÖRKNING */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                    {/* GUL ACCENT */}
                    <div
                      className="
                        absolute
                        left-0
                        top-0
                        h-[4px]
                        w-20
                        bg-[#FAC800]
                        transition-all
                        duration-500
                        group-hover:w-36
                      "
                    />

                  </div>
                ))}

              </div>

            ) : (

              <div
                className="
                  relative
                  aspect-[4/5]
                  overflow-hidden
                  bg-[#111111]
                  shadow-[0_24px_70px_rgba(0,0,0,0.35)]
                "
              >

                <div className="absolute left-0 top-0 h-[4px] w-20 bg-[#FAC800]" />

                <div className="absolute inset-0 flex items-center justify-center text-xs font-black uppercase tracking-[0.2em] text-white/40">
                  Ingen produktbild
                </div>

              </div>

            )}

          </div>

          {/* =========================
              PRODUKTINFO
          ========================= */}
          <div className="lg:sticky lg:top-32 lg:self-start">

            {/* EYEBROW */}
            <div className="flex items-center gap-4">

              <span className="h-px w-10 bg-[#FAC800]" />

              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FAC800]">
                Bonnatösen Shop
              </p>

            </div>

            {/* TITEL */}
            <h1
              className="mt-5 text-4xl font-black uppercase leading-[0.88] tracking-[-0.04em] text-white md:text-6xl lg:text-7xl"
              style={{
                fontFamily:
                  'Georgia, Times New Roman, serif',
              }}
            >
              {product.title}
            </h1>

            {/* =========================
                PRIS
            ========================= */}
            {firstVariant && (
              <p
                className="mt-7 text-3xl font-black text-white md:text-4xl"
                style={{
                  fontFamily:
                    'Georgia, Times New Roman, serif',
                }}
              >
                {formatPrice(
                  Number(
                    firstVariant.price.amount,
                  ),
                  firstVariant.price.currencyCode,
                )}
              </p>
            )}

            {/* =========================
                BESKRIVNING
            ========================= */}
            {product.description && (
              <p className="mt-7 max-w-xl whitespace-pre-line text-base leading-8 text-white/70 md:text-lg">
                {product.description}
              </p>
            )}

            {/* =========================
                LAGERSTATUS
            ========================= */}
            <div className="mt-8 flex items-center gap-4">

              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  available
                    ? 'bg-[#FAC800]'
                    : 'bg-[#ff6b5f]'
                }`}
              />

              {available ? (
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white">
                  Finns i lager
                </p>
              ) : (
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6b5f]">
                  Slutsåld
                </p>
              )}

            </div>

            <div className="mt-8 h-px w-full bg-white/10" />

            {/* =========================
                KÖP
            ========================= */}
            <div
              className="
                relative
                mt-10
                overflow-hidden
                bg-[#131313]
                p-6
                text-white
                shadow-[0_24px_70px_rgba(0,0,0,0.35)]
                md:p-8
              "
            >

              {/* GUL ACCENT */}
              <div className="absolute left-0 top-0 h-[4px] w-24 bg-[#FAC800]" />

              <div>

                <div className="mb-7">

                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FAC800]">
                    Välj & beställ
                  </p>

                  <div className="mt-4 h-px w-16 bg-white/15" />

                </div>

                <ShopifyAddToCart
                  variants={variants}
                />

              </div>

            </div>

            {/* =========================
                INFO
            ========================= */}
            <div className="mt-10 grid gap-7 sm:grid-cols-2">

              <div className="border-t border-white/10 pt-6">

                <div className="mb-4 h-[3px] w-8 bg-[#FAC800]" />

                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
                  Säker betalning
                </p>

                <p className="mt-2 text-sm leading-6 text-white/55">
                  Betalningen hanteras via Shopify.
                </p>

              </div>

              <div className="border-t border-white/10 pt-6">

                <div className="mb-4 h-[3px] w-8 bg-[#FAC800]" />

                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
                  Bonnatösen
                </p>

                <p className="mt-2 text-sm leading-6 text-white/55">
                  Merch direkt från Bonnatösen.
                </p>

              </div>

            </div>

            {/* =========================
                TILLBAKA
            ========================= */}
            <div className="mt-10 border-t border-white/10 pt-8">

              <Link
                href="/shop"
                className="group inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.22em] text-white"
              >

                Tillbaka till shoppen

                <span className="h-px w-10 bg-[#FAC800] transition-all duration-300 group-hover:w-16" />

              </Link>

            </div>

          </div>

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