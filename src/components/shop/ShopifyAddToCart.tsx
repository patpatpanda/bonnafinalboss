'use client'

import Link from 'next/link'
import { useState } from 'react'

type Variant = {
  id: string
  title: string
  availableForSale: boolean

  price: {
    amount: string
    currencyCode: string
  }

  selectedOptions: {
    name: string
    value: string
  }[]
}

type Props = {
  variants: Variant[]
}

export default function ShopifyAddToCart({
  variants,
}: Props) {
  const availableVariants =
    variants.filter(
      (variant) =>
        variant.availableForSale,
    )

  const [selectedVariantId, setSelectedVariantId] =
    useState(
      availableVariants.length === 1
        ? availableVariants[0].id
        : '',
    )

  const [loading, setLoading] =
    useState(false)

  const [added, setAdded] =
    useState(false)

  async function handleAddToCart() {
    if (!selectedVariantId) {
      return
    }

    setLoading(true)
    setAdded(false)

    try {
      const existingCartId =
        localStorage.getItem(
          'shopify-cart-id',
        )

      const response = await fetch(
        '/api/shopify/cart',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            cartId: existingCartId,
            merchandiseId:
              selectedVariantId,
            quantity: 1,
          }),
        },
      )

      const result =
        await response.json()

      if (!response.ok) {
        alert(
          result.error ||
            'Kunde inte lägga till produkten.',
        )

        return
      }

      localStorage.setItem(
        'shopify-cart-id',
        result.cart.id,
      )

      setAdded(true)
    } catch (error) {
      console.error(error)

      alert(
        'Något gick fel med varukorgen.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-8">

      {/* =========================
          VARIANTER / STORLEKAR
      ========================= */}
      {variants.length > 1 && (
        <div>

          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#604629]">
            Välj storlek
          </p>

          <div className="mt-4 flex flex-wrap gap-3">

            {variants.map(
              (variant) => {
                const label =
                  variant.selectedOptions
                    .map(
                      (option) =>
                        option.value,
                    )
                    .filter(
                      (value) =>
                        value !==
                        'Default Title',
                    )
                    .join(' / ') ||
                  variant.title

                const selected =
                  selectedVariantId ===
                  variant.id

                return (
                  <button
                    key={variant.id}
                    type="button"
                    disabled={
                      !variant.availableForSale
                    }
                    onClick={() => {
                      setSelectedVariantId(
                        variant.id,
                      )

                      setAdded(false)
                    }}
                    className={`
                      min-w-[64px]
                      border-2
                      px-5
                      py-3
                      text-sm
                      font-black
                      uppercase
                      tracking-[0.15em]
                      transition-all
                      duration-200

                      ${
                        selected
                          ? `
                            border-[#2f2114]
                            bg-[#2f2114]
                            text-[#f0d79a]
                            shadow-[inset_0_0_0_1px_rgba(240,215,154,0.22)]
                          `
                          : ''
                      }

                      ${
                        !selected &&
                        variant.availableForSale
                          ? `
                            border-[#6b4d2d]
                            bg-[#c4a56b]
                            text-[#352415]
                            hover:border-[#2f2114]
                            hover:bg-[#5a3e24]
                            hover:text-[#f0d79a]
                          `
                          : ''
                      }

                      ${
                        !variant.availableForSale
                          ? `
                            cursor-not-allowed
                            border-[#9a845e]
                            bg-[#bea878]/35
                            text-[#8b7756]
                            line-through
                            opacity-60
                          `
                          : 'cursor-pointer'
                      }
                    `}
                  >
                    {label}
                  </button>
                )
              },
            )}

          </div>

          {!selectedVariantId &&
            availableVariants.length > 1 && (
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#765a35]">
                Välj en storlek för att fortsätta
              </p>
            )}

        </div>
      )}

      {/* =========================
          LÄGG I VARUKORG
      ========================= */}
      <button
        type="button"
        disabled={
          loading ||
          !selectedVariantId ||
          availableVariants.length === 0
        }
        onClick={handleAddToCart}
        className="
          mt-8
          w-full
          border-2
          border-[#2f2114]
          bg-[#2f2114]
          px-7
          py-5
          text-sm
          font-black
          uppercase
          tracking-[0.2em]
          text-[#f0d79a]
          transition-all
          duration-200
          hover:bg-[#654522]
          hover:text-[#fff0be]
          hover:shadow-[0_8px_25px_rgba(47,33,20,0.25)]
          disabled:cursor-not-allowed
          disabled:border-[#927d58]
          disabled:bg-[#b8a174]
          disabled:text-[#756344]
          disabled:shadow-none
        "
      >
        {loading
          ? 'Lägger till...'
          : availableVariants.length ===
              0
            ? 'Slutsåld'
            : !selectedVariantId
              ? 'Välj storlek'
              : added
                ? 'Tillagd ✓'
                : 'Lägg i varukorg'}
      </button>

      {/* =========================
          TILL VARUKORGEN
      ========================= */}
      {added && (
        <div className="mt-5">

          <div className="mb-4 flex items-center gap-3">

            <span className="h-px flex-1 bg-[#75562c]/40" />

            <span className="text-[#75562c]">
              ✦
            </span>

            <span className="h-px flex-1 bg-[#75562c]/40" />

          </div>

          <Link
            href="/cart"
            className="
              block
              border
              border-[#6b4d2d]
              bg-[#c4a56b]
              px-5
              py-4
              text-center
              text-[10px]
              font-black
              uppercase
              tracking-[0.2em]
              text-[#352415]
              transition
              hover:border-[#2f2114]
              hover:bg-[#5a3e24]
              hover:text-[#f0d79a]
            "
          >
            Gå till varukorgen →
          </Link>

        </div>
      )}

    </div>
  )
}