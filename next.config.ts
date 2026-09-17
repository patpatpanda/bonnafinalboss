import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

import { redirects } from './redirects'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const NEXT_PUBLIC_SERVER_URL =
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.__NEXT_PRIVATE_ORIGIN ||
      'http://localhost:3000'

const nextConfig: NextConfig = {
  // Temporarily required on Windows until Next.js fixes
  // Turbopack Sass resolution.
  sassOptions: {
    loadPaths: [
      './node_modules/@payloadcms/ui/dist/scss/',
    ],
  },

  images: {
    localPatterns: [
      // =========================
      // PAYLOAD MEDIA
      // =========================
      {
        pathname: '/api/media/file/**',
      },

      // =========================
      // LOKALA BILDER
      // =========================
      {
        pathname: '/images/**',
        search: '',
      },
    ],

    qualities: [100],

    remotePatterns: [
      // =========================
      // EGEN SERVER / PAYLOAD
      // =========================
      ...[NEXT_PUBLIC_SERVER_URL].map(
        (item) => {
          const url = new URL(item)

          return {
            hostname: url.hostname,
            protocol: url.protocol.replace(
              ':',
              '',
            ) as 'http' | 'https',
          }
        },
      ),

      // =========================
      // SHOPIFY
      // =========================
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },

      // =========================
      // SUPABASE STORAGE
      // =========================
      {
        protocol: 'https',
        hostname:
          'sqmxevrcieaknkpeythz.supabase.co',
      },

      // =========================
      // YOUTUBE THUMBNAILS
      // =========================
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },

  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],

      '.js': [
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
      ],

      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },

  reactStrictMode: true,

  redirects,

  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
})