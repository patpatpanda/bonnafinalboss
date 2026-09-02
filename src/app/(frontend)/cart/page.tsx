'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type CartLine = {
  id: string
  quantity: number

  merchandise: {
    id: string
    title: string

    image: {
      url: string
      altText: string | null
    } | null

    product: {
      title: string
      handle: string
    }

    price: {
      amount: string
      currencyCode: string
    }
  }
}

type Cart = {
  id: string
  checkoutUrl: string

  cost: {
    totalAmount: {
      amount: string
      currencyCode: string
    }
  }

  lines: {
    nodes: CartLine[]
  }
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    async function loadCart() {
      const cartId = localStorage.getItem('shopify-cart-id')

      if (!cartId) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(
          `/api/shopify/cart?cartId=${encodeURIComponent(cartId)}`,
        )

        const result = await response.json()

        if (!response.ok) {
          console.error(result)
          return
        }

        setCart(result.cart)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [])

  async function removeItem(lineId: string) {
    if (!cart) return

    setRemovingId(lineId)

    try {
      const response = await fetch('/api/shopify/cart', {
        method: 'DELETE',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          cartId: cart.id,
          lineId,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        alert(
          result.error ||
            'Kunde inte ta bort produkten.',
        )

        return
      }

      setCart(result.cart)

      if (
        !result.cart ||
        result.cart.lines.nodes.length === 0
      ) {
        localStorage.removeItem('shopify-cart-id')
      }
    } catch (error) {
      console.error(error)

      alert('Kunde inte ta bort produkten.')
    } finally {
      setRemovingId(null)
    }
  }

  async function updateQuantity(
    lineId: string,
    quantity: number,
  ) {
    if (!cart || quantity < 1) {
      return
    }

    setUpdatingId(lineId)

    try {
      const response = await fetch('/api/shopify/cart', {
        method: 'PATCH',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          cartId: cart.id,
          lineId,
          quantity,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        alert(
          result.error ||
            'Kunde inte uppdatera antal.',
        )

        return
      }

      setCart(result.cart)
    } catch (error) {
      console.error(error)

      alert('Kunde inte uppdatera antal.')
    } finally {
      setUpdatingId(null)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0907] px-5 py-24 text-[#f4f0e8]">
        <div className="mx-auto max-w-7xl text-center">

          <span className="text-3xl text-[#d7b469]">
            ❦
          </span>

          <p className="mt-5 text-[10px] font-black uppercase tracking-[0.3em] text-[#8f816e]">
            Hämtar varukorgen...
          </p>

        </div>
      </main>
    )
  }

  if (
    !cart ||
    cart.lines.nodes.length === 0
  ) {
    return (
      <main className="min-h-screen bg-[#0a0907] px-5 py-24 text-[#f4f0e8] md:px-10">

        <div className="mx-auto max-w-5xl text-center">

          <div className="text-3xl text-[#d7b469]">
            ❦
          </div>

          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#d7b469]">
            Bonnatösen Shop
          </p>

          <h1
            className="mt-5 text-4xl font-black uppercase tracking-[-0.04em] md:text-6xl"
            style={{
              fontFamily:
                'Georgia, Times New Roman, serif',
            }}
          >
            Varukorgen är tom
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-[#8f816e]">
            Du har inga produkter i varukorgen ännu.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex border-2 border-[#d7b469] bg-[#d7b469] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#251b11] transition hover:bg-transparent hover:text-[#d7b469]"
          >
            Till shoppen
          </Link>

        </div>

      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0a0907] text-[#f4f0e8]">

      {/* =========================
          HEADER
      ========================= */}
      <section className="border-b border-[#2b2218] px-5 py-16 md:px-10 md:py-24">

        <div className="mx-auto max-w-7xl text-center">

          <div className="text-3xl text-[#d7b469]">
            ❦
          </div>

          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#d7b469]">
            Bonnatösen Shop
          </p>

          <h1
            className="mt-4 text-5xl font-black uppercase tracking-[-0.05em] md:text-7xl"
            style={{
              fontFamily:
                'Georgia, Times New Roman, serif',
            }}
          >
            Varukorg
          </h1>

          <div className="mx-auto mt-7 flex max-w-md items-center gap-4">

            <span className="h-px flex-1 bg-[#4d3a26]" />

            <span className="text-[#d7b469]">
              ✦
            </span>

            <span className="h-px flex-1 bg-[#4d3a26]" />

          </div>

        </div>

      </section>

      {/* =========================
          VARUKORG
      ========================= */}
      <section className="px-4 py-16 md:px-10 md:py-24">

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">

          {/* PRODUKTER */}
          <div className="space-y-5">

            {cart.lines.nodes.map((line) => (
              <article
                key={line.id}
                className="relative overflow-hidden bg-[#d7bc84] p-5 text-[#49371e] shadow-[0_20px_60px_rgba(0,0,0,0.3)] md:p-7"
              >

                {/* PAPER TEXTURE */}
                <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_15%_20%,rgba(90,60,24,.18)_0,transparent_24%),linear-gradient(rgba(255,255,255,.08),rgba(80,50,20,.06))]" />

                {/* FRAME */}
                <div className="pointer-events-none absolute inset-3 border border-[#735630]/55" />

                <div className="relative z-10 grid gap-5 sm:grid-cols-[120px_1fr_auto] sm:items-start">

                  {/* PRODUKTBILD */}
                  <Link
                    href={`/shop/${line.merchandise.product.handle}`}
                    className="relative aspect-[4/5] overflow-hidden border border-[#75562c]/50 bg-[#bba06d]"
                  >

                    {line.merchandise.image?.url ? (
                      <Image
                        src={line.merchandise.image.url}
                        alt={
                          line.merchandise.image.altText ||
                          line.merchandise.product.title
                        }
                        fill
                        sizes="120px"
                        className="object-cover transition duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center px-2 text-center text-[9px] font-black uppercase tracking-[0.15em] text-[#75562c]">
                        Ingen bild
                      </div>
                    )}

                  </Link>

                  {/* INFO */}
                  <div className="min-w-0">

                    <Link
                      href={`/shop/${line.merchandise.product.handle}`}
                      className="text-xl font-black uppercase tracking-[-0.02em] transition hover:text-[#75562c] md:text-2xl"
                      style={{
                        fontFamily:
                          'Georgia, Times New Roman, serif',
                      }}
                    >
                      {line.merchandise.product.title}
                    </Link>

                    {line.merchandise.title !==
                      'Default Title' && (
                      <p className="mt-2 text-xs font-bold uppercase tracking-[0.15em] text-[#755f40]">
                        {line.merchandise.title}
                      </p>
                    )}

                    {/* ANTAL */}
                    <div className="mt-6 flex flex-wrap items-center gap-5">

                      <div className="flex border border-[#75562c]/70">

                        <button
                          type="button"
                          disabled={
                            updatingId === line.id ||
                            line.quantity <= 1
                          }
                          onClick={() =>
                            updateQuantity(
                              line.id,
                              line.quantity - 1,
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center text-lg font-black transition hover:bg-[#49371e] hover:text-[#ead5a0] disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label="Minska antal"
                        >
                          −
                        </button>

                        <div className="flex h-10 min-w-10 items-center justify-center border-x border-[#75562c]/70 px-3 text-sm font-black">

                          {updatingId === line.id
                            ? '...'
                            : line.quantity}

                        </div>

                        <button
                          type="button"
                          disabled={
                            updatingId === line.id
                          }
                          onClick={() =>
                            updateQuantity(
                              line.id,
                              line.quantity + 1,
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center text-lg font-black transition hover:bg-[#49371e] hover:text-[#ead5a0] disabled:cursor-wait disabled:opacity-50"
                          aria-label="Öka antal"
                        >
                          +
                        </button>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(line.id)
                        }
                        disabled={
                          removingId === line.id
                        }
                        className="text-[10px] font-black uppercase tracking-[0.18em] text-[#8a4f3d] transition hover:text-[#633628] disabled:opacity-50"
                      >
                        {removingId === line.id
                          ? 'Tar bort...'
                          : 'Ta bort'}
                      </button>

                    </div>

                  </div>

                  {/* PRIS */}
                  <p
                    className="shrink-0 text-xl font-black"
                    style={{
                      fontFamily:
                        'Georgia, Times New Roman, serif',
                    }}
                  >
                    {formatPrice(
                      Number(
                        line.merchandise.price.amount,
                      ) * line.quantity,
                      line.merchandise.price.currencyCode,
                    )}
                  </p>

                </div>

              </article>
            ))}

          </div>

          {/* =========================
              SUMMERING
          ========================= */}
          <aside className="relative h-fit overflow-hidden bg-[#d7bc84] p-7 text-[#49371e] shadow-[0_25px_80px_rgba(0,0,0,0.4)] lg:sticky lg:top-32">

            <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_20%_20%,rgba(90,60,24,.18)_0,transparent_24%),linear-gradient(rgba(255,255,255,.08),rgba(80,50,20,.06))]" />

            <div className="pointer-events-none absolute inset-3 border border-[#735630]/70" />
            <div className="pointer-events-none absolute inset-5 border border-[#735630]/35" />

            <div className="relative z-10">

              <div className="text-center">

                <span className="text-2xl text-[#75562c]">
                  ❦
                </span>

                <p className="mt-3 text-[9px] font-black uppercase tracking-[0.3em]">
                  Din beställning
                </p>

                <h2
                  className="mt-3 text-3xl font-black uppercase tracking-[-0.03em]"
                  style={{
                    fontFamily:
                      'Georgia, Times New Roman, serif',
                  }}
                >
                  Summering
                </h2>

              </div>

              <div className="mt-7 flex items-end justify-between border-t border-[#75562c]/45 pt-6">

                <span className="text-xs font-black uppercase tracking-[0.16em]">
                  Totalt
                </span>

                <span
                  className="text-3xl font-black"
                  style={{
                    fontFamily:
                      'Georgia, Times New Roman, serif',
                  }}
                >
                  {formatPrice(
                    Number(
                      cart.cost.totalAmount.amount,
                    ),
                    cart.cost.totalAmount.currencyCode,
                  )}
                </span>

              </div>

              <a
                href={cart.checkoutUrl}
                className="mt-8 block w-full border-2 border-[#49371e] bg-[#49371e] px-6 py-5 text-center text-xs font-black uppercase tracking-[0.2em] text-[#ead5a0] transition hover:bg-transparent hover:text-[#49371e]"
              >
                Till betalning
              </a>

              <Link
                href="/shop"
                className="mt-5 block text-center text-[10px] font-black uppercase tracking-[0.18em] text-[#75562c] transition hover:text-[#49371e]"
              >
                ← Fortsätt handla
              </Link>

              <div className="mt-6 flex items-center gap-3">

                <span className="h-px flex-1 bg-[#75562c]/40" />

                <span>✦</span>

                <span className="h-px flex-1 bg-[#75562c]/40" />

              </div>

              <p className="mt-5 text-center text-[9px] font-black uppercase leading-5 tracking-[0.18em] text-[#806948]">
                Säker betalning via Shopify
              </p>

            </div>

          </aside>

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