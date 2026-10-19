import { NextResponse } from 'next/server'

// Shopify är tillfälligt inaktiverat.
// Den ursprungliga koden finns sparad i Git.

export async function GET() {
  return NextResponse.json(
    { error: 'Butiken är tillfälligt stängd.' },
    { status: 503 },
  )
}

export async function POST() {
  return GET()
}

export async function PATCH() {
  return GET()
}

export async function DELETE() {
  return GET()
}