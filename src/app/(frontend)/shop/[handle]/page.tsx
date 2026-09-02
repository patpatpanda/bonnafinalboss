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
      <section className="border-b border-[#292929] px-5 py-6 md:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em]">

            <Link
              href="/shop"
              className="text-[#FAC800] transition hover:text-white"
            >
              Shop
            </Link>

            <span className="text-[#555555]">
              /
            </span>

            <span className="text-white/60">
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
              <div className="grid gap-5">

                {images.map((image, index) => (
                  <div
                    key={image.id || image.url}
                    className={`relative overflow-hidden border border-[#FAC800]/25 bg-[#111111] ${
                      index === 0
                        ? 'aspect-[4/5]'
                        : 'aspect-[4/3]'
                    }`}
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
                      className="object-cover"
                    />

                    {/* INRE RAM */}
                    <div className="pointer-events-none absolute inset-4 border border-[#FAC800]/20" />

                  </div>
                ))}

              </div>
            ) : (
              <div className="relative aspect-[4/5] border border-[#FAC800]/25 bg-[#111111]">

                <div className="absolute inset-0 flex items-center justify-center text-xs font-black uppercase tracking-[0.2em] text-[#FFF]">
                  Ingen produktbild
                </div>

              </div>
            )}

          </div>

          {/* =========================
              PRODUKTINFO
          ========================= */}
          <div className="lg:sticky lg:top-32 lg:self-start">

            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FFF]">
              Bonnatösen Shop
            </p>

            <h1
              className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white md:text-6xl"
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
                className="mt-6 text-3xl font-black text-[#FFF]"
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
              <p className="mt-7 max-w-xl whitespace-pre-line text-base leading-8 text-[#FFF]/75 md:text-lg">
                {product.description}
              </p>
            )}

            {/* =========================
                LAGERSTATUS
            ========================= */}
            <div className="mt-8 border-y border-[#FAC800]/20 py-5">

              {available ? (
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#FFF]">
                  Finns i lager
                </p>
              ) : (
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6b5f]">
                  Slutsåld
                </p>
              )}

            </div>

            {/* =========================
                KÖP
            ========================= */}
            <div className="relative mt-10 overflow-hidden border border-[#FAC800]/40 bg-[#111111] p-6 text-white shadow-[0_25px_80px_rgba(0,0,0,0.45)] md:p-8">

              {/* INRE RAM */}
              <div className="pointer-events-none absolute inset-3 border border-[#FAC800]/15" />

              <div className="relative z-10">

                <div className="mb-5 text-center">

                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FFF]">
                    Välj & beställ
                  </p>

                  <div className="mx-auto mt-4 h-px max-w-xs bg-[#FAC800]/25" />

                </div>

                <ShopifyAddToCart
                  variants={variants}
                />

              </div>

            </div>

            {/* =========================
                INFO
            ========================= */}
            <div className="mt-10 grid gap-6 border-t border-[#FAC800]/20 pt-8 sm:grid-cols-2">

              <div>

                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FFF]">
                  Säker betalning
                </p>

                <p className="mt-2 text-sm leading-6 text-white/60">
                  Betalningen hanteras via Shopify.
                </p>

              </div>

              <div>

                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FFF]">
                  Bonnatösen
                </p>

                <p className="mt-2 text-sm leading-6 text-white/60">
                  Merch direkt från Bonnatösen.
                </p>

              </div>

            </div>

            {/* =========================
                TILLBAKA
            ========================= */}
            <div className="mt-10 border-t border-[#FAC800]/20 pt-8">

              <Link
                href="/shop"
                className="inline-flex border-b border-[#FAC800] pb-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#FFF] transition hover:text-white"
              >
                Tillbaka till shoppen
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