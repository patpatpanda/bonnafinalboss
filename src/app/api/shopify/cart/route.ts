import { NextResponse } from 'next/server'

import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCartLine,
} from '@/lib/shopify'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const cartId = searchParams.get('cartId')

    if (!cartId) {
      return NextResponse.json(
        {
          error: 'Cart ID saknas.',
        },
        {
          status: 400,
        },
      )
    }

    const cart = await getCart(cartId)

    return NextResponse.json({
      cart,
    })
  } catch (error) {
    console.error(
      'Shopify get cart error:',
      error,
    )

    return NextResponse.json(
      {
        error: 'Kunde inte hämta varukorgen.',
      },
      {
        status: 500,
      },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      cartId,
      merchandiseId,
      quantity = 1,
    } = body

    if (!merchandiseId) {
      return NextResponse.json(
        {
          error: 'Variant saknas.',
        },
        {
          status: 400,
        },
      )
    }

    const cart = cartId
      ? await addToCart(
          cartId,
          merchandiseId,
          quantity,
        )
      : await createCart(
          merchandiseId,
          quantity,
        )

    if (!cart) {
      return NextResponse.json(
        {
          error: 'Kunde inte skapa varukorgen.',
        },
        {
          status: 500,
        },
      )
    }

    return NextResponse.json({
      cart,
    })
  } catch (error) {
    console.error(
      'Shopify cart error:',
      error,
    )

    return NextResponse.json(
      {
        error: 'Något gick fel med varukorgen.',
      },
      {
        status: 500,
      },
    )
  }
}
export async function PATCH(request: Request) {
  try {
    const body = await request.json()

    const {
      cartId,
      lineId,
      quantity,
    } = body

    if (
      !cartId ||
      !lineId ||
      typeof quantity !== 'number' ||
      quantity < 1
    ) {
      return NextResponse.json(
        {
          error: 'Ogiltiga uppgifter.',
        },
        {
          status: 400,
        },
      )
    }

    const cart = await updateCartLine(
      cartId,
      lineId,
      quantity,
    )

    return NextResponse.json({
      cart,
    })
  } catch (error) {
    console.error(
      'Shopify update cart line error:',
      error,
    )

    return NextResponse.json(
      {
        error:
          'Kunde inte uppdatera antal.',
      },
      {
        status: 500,
      },
    )
  }
}
export async function DELETE(request: Request) {
  try {
    const body = await request.json()

    const {
      cartId,
      lineId,
    } = body

    if (!cartId || !lineId) {
      return NextResponse.json(
        {
          error:
            'Cart ID eller produkt-ID saknas.',
        },
        {
          status: 400,
        },
      )
    }

    const cart = await removeFromCart(
      cartId,
      lineId,
    )

    if (!cart) {
      return NextResponse.json(
        {
          error:
            'Kunde inte uppdatera varukorgen.',
        },
        {
          status: 500,
        },
      )
    }

    return NextResponse.json({
      cart,
    })
  } catch (error) {
    console.error(
      'Shopify remove cart line error:',
      error,
    )

    return NextResponse.json(
      {
        error:
          'Kunde inte ta bort produkten.',
      },
      {
        status: 500,
      },
    )
  }
}