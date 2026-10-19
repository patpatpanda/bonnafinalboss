
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { s3Storage } from '@payloadcms/storage-s3'
import { sv } from '@payloadcms/translations/languages/sv'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Locations } from './collections/Locations'
import { Users } from './collections/Users'
import { Menu } from './Menu/config'
import { Products } from './collections/Products'
import { Bookings } from './collections/Bookings'
import { Homepage } from './Homepage/config'
import { OpeningHours } from './collections/OpeningHours'
import { BookingExceptions } from './collections/BookingExceptions'
import { BookingSettings } from './BookingSettings/config'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { ShopPage } from './ShopPage/config'

import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // =========================
  // SPRÅK - SVENSKA
  // =========================
  i18n: {
    supportedLanguages: { sv },
    fallbackLanguage: 'sv',
  },

  // =========================
  // ADMIN
  // =========================
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },

    importMap: {
      baseDir: path.resolve(dirname),
    },

    user: Users.slug,

    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },

  // =========================
  // EMAIL
  // =========================
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_USER || '',
    defaultFromName: 'Bordsbokning',

    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,

      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),

  // =========================
  // EDITOR
  // =========================
  editor: defaultLexical,

  // =========================
  // DATABASE
  // =========================
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  // =========================
  // COLLECTIONS
  // =========================
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    OpeningHours,
    Bookings,
    BookingExceptions,
    Locations,
    Products,
  ],

  // =========================
  // CORS
  // =========================
  cors: [getServerSideURL()].filter(Boolean),

  // =========================
  // GLOBALS
  // =========================
  globals: [
    Header,
    Footer,
    BookingSettings,
    Homepage,
    Menu,
    ShopPage,
  ],

  // =========================
  // PLUGINS
  // =========================
  plugins: [
    ...plugins,

    s3Storage({
      collections: {
        media: {
          disablePayloadAccessControl: true,

          generateFileURL: ({ filename }) => {
            const projectUrl = process.env.SUPABASE_PUBLIC_URL
            const bucket = process.env.SUPABASE_S3_BUCKET || 'media'

            if (!projectUrl) {
              throw new Error('SUPABASE_PUBLIC_URL saknas')
            }

            return `${projectUrl}/storage/v1/object/public/${bucket}/${filename}`
          },
        },
      },

      bucket: process.env.SUPABASE_S3_BUCKET || 'media',

      // Viktigt:
      // skickar uppladdningen direkt från browsern till Supabase Storage
      clientUploads: true,

      config: {
        endpoint: process.env.SUPABASE_S3_ENDPOINT,

        region:
          process.env.SUPABASE_S3_REGION || 'eu-west-1',

        forcePathStyle: true,

        credentials: {
          accessKeyId:
            process.env.SUPABASE_S3_ACCESS_KEY || '',

          secretAccessKey:
            process.env.SUPABASE_S3_SECRET_KEY || '',
        },
      },
    }),
  ],

  // =========================
  // PAYLOAD SECRET
  // =========================
  secret: process.env.PAYLOAD_SECRET,

  // =========================
  // SHARP
  // =========================
  sharp,

  // =========================
  // TYPESCRIPT
  // =========================
  typescript: {
    outputFile: path.resolve(
      dirname,
      'payload-types.ts',
    ),
  },

  // =========================
  // JOBS
  // =========================
  jobs: {
    access: {
      run: ({
        req,
      }: {
        req: PayloadRequest
      }): boolean => {
        if (req.user) {
          return true
        }

        const secret = process.env.CRON_SECRET

        if (!secret) {
          return false
        }

        const authHeader =
          req.headers.get('authorization')

        return authHeader === `Bearer ${secret}`
      },
    },

    tasks: [],
  },
})
