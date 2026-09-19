import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Providers } from '@/providers'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { draftMode } from 'next/headers'

import BonnaHeader from '@/components/BonnaHeader'
import BonnaFooter from '@/components/BonnaFooter'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
      )}
      lang="sv"
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <link
          href="/favicon.ico"
          rel="icon"
          sizes="32x32"
        />

        <link
          href="/favicon.svg"
          rel="icon"
          type="image/svg+xml"
        />
      </head>

      <body>
        <Providers>
          <ThemeProvider>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />

            <BonnaHeader />

            {children}

            <BonnaFooter />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(
    getServerSideURL(),
  ),

  title: {
    default: 'Bonnatösen',
    template: '%s | Bonnatösen',
  },

  description:
    'Bonnatösen – burgare, Ladan, Saloonen och en jäkla massa gött.',

  openGraph: {
    title: 'Bonnatösen',
    description:
      'Burgare, Ladan, Saloonen och en jäkla massa gött.',
    siteName: 'Bonnatösen',
    locale: 'sv_SE',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Bonnatösen',
    description:
      'Burgare, Ladan, Saloonen och en jäkla massa gött.',
  },
}