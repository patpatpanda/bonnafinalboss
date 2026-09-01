import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
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
import { Bookings } from './collections/Bookings'
import { Homepage } from './Homepage/config'
import { OpeningHours } from './collections/OpeningHours'
import { BookingExceptions } from './collections/BookingExceptions'
import { BookingSettings } from './BookingSettings/config'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
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

  editor: defaultLexical,

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

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
  ],

  cors: [getServerSideURL()].filter(Boolean),

  globals: [
    Header,
    Footer,
    BookingSettings,
    Homepage,
    Menu,
  ],

  plugins,

  secret: process.env.PAYLOAD_SECRET,

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true

        const secret = process.env.CRON_SECRET

        if (!secret) return false

        const authHeader = req.headers.get('authorization')

        return authHeader === `Bearer ${secret}`
      },
    },

    tasks: [],
  },
})