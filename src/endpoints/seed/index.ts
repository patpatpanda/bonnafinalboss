import type {
  CollectionSlug,
  GlobalSlug,
  Payload,
  PayloadRequest,
  File,
} from 'payload'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
]

const globals: GlobalSlug[] = [
  'header',
  'footer',
]

const categories = [
  'Technology',
  'News',
  'Finance',
  'Design',
  'Software',
  'Engineering',
]

// Next.js revalidation errors are normal when seeding the database
// without a server running.
//
// Exempel:
// yarn seed
//
// Appen kör då inte och revalidate-routes är därför inte
// tillgängliga. Sådana fel kan ignoreras.
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // =========================
  // RENSA GLOBALS
  // =========================

  payload.logger.info(
    '— Clearing collections and globals...',
  )

  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {},
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  // =========================
  // RENSA COLLECTIONS
  // =========================

  await Promise.all(
    collections.map((collection) =>
      payload.db.deleteMany({
        collection,
        req,
        where: {},
      }),
    ),
  )

  // =========================
  // RENSA VERSIONS
  // =========================

  await Promise.all(
    collections
      .filter((collection) =>
        Boolean(
          payload.collections[collection]
            .config.versions,
        ),
      )
      .map((collection) =>
        payload.db.deleteVersions({
          collection,
          req,
          where: {},
        }),
      ),
  )

  // =========================
  // DEMO USER
  // =========================

  payload.logger.info(
    '— Seeding demo author and user...',
  )

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals:
          'demo-author@example.com',
      },
    },
  })

  // =========================
  // MEDIA
  // =========================

  payload.logger.info(
    '— Seeding media...',
  )

  const [
    image1Buffer,
    image2Buffer,
    image3Buffer,
    hero1Buffer,
  ] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post1.webp',
    ),

    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post2.webp',
    ),

    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post3.webp',
    ),

    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const [
    demoAuthor,
    image1Doc,
    image2Doc,
    image3Doc,
    imageHomeDoc,
  ] = await Promise.all([
    // DEMO AUTHOR
    payload.create({
      collection: 'users',

      data: {
        name: 'Demo Author',
        email:
          'demo-author@example.com',
        password: 'password',
      },
    }),

    // IMAGE 1
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),

    // IMAGE 2
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),

    // IMAGE 3
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),

    // HERO IMAGE
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),

    // KATEGORIER
    ...categories.map((category) =>
      payload.create({
        collection: 'categories',

        data: {
          title: category,
          slug: category,
        },
      }),
    ),
  ])

  // =========================
  // POSTS
  // =========================

  payload.logger.info(
    '— Seeding posts...',
  )

  // Vi kör inte Promise.all här eftersom
  // posterna ska skapas i rätt ordning.

  const post1Doc =
    await payload.create({
      collection: 'posts',
      depth: 0,

      context: {
        disableRevalidate: true,
      },

      data: post1({
        heroImage: image1Doc,
        blockImage: image2Doc,
        author: demoAuthor,
      }),
    })

  const post2Doc =
    await payload.create({
      collection: 'posts',
      depth: 0,

      context: {
        disableRevalidate: true,
      },

      data: post2({
        heroImage: image2Doc,
        blockImage: image3Doc,
        author: demoAuthor,
      }),
    })

  const post3Doc =
    await payload.create({
      collection: 'posts',
      depth: 0,

      context: {
        disableRevalidate: true,
      },

      data: post3({
        heroImage: image3Doc,
        blockImage: image1Doc,
        author: demoAuthor,
      }),
    })

  // =========================
  // RELATERADE POSTS
  // =========================

  await payload.update({
    id: post1Doc.id,
    collection: 'posts',

    data: {
      relatedPosts: [
        post2Doc.id,
        post3Doc.id,
      ],
    },
  })

  await payload.update({
    id: post2Doc.id,
    collection: 'posts',

    data: {
      relatedPosts: [
        post1Doc.id,
        post3Doc.id,
      ],
    },
  })

  await payload.update({
    id: post3Doc.id,
    collection: 'posts',

    data: {
      relatedPosts: [
        post1Doc.id,
        post2Doc.id,
      ],
    },
  })

  // =========================
  // CONTACT FORM
  // =========================

  payload.logger.info(
    '— Seeding contact form...',
  )

  const contactForm =
    await payload.create({
      collection: 'forms',
      depth: 0,
      data: contactFormData,
    })

  // =========================
  // PAGES
  // =========================

  payload.logger.info(
    '— Seeding pages...',
  )

  const [, contactPage] =
    await Promise.all([
      payload.create({
        collection: 'pages',
        depth: 0,

        data: home({
          heroImage: imageHomeDoc,
          metaImage: image2Doc,
        }),
      }),

      payload.create({
        collection: 'pages',
        depth: 0,

        data: contactPageData({
          contactForm,
        }),
      }),
    ])

  // =========================
  // GLOBALS
  // =========================

  payload.logger.info(
    '— Seeding globals...',
  )

  // Header har fortfarande navItems,
  // därför kan denna demo-data vara kvar.
  await payload.updateGlobal({
    slug: 'header',

    data: {
      navItems: [
        {
          link: {
            type: 'custom',
            label: 'Posts',
            url: '/posts',
          },
        },

        {
          link: {
            type: 'reference',
            label: 'Contact',

            reference: {
              relationTo: 'pages',
              value: contactPage.id,
            },
          },
        },
      ],
    },
  })

  /*
   * Footer uppdateras INTE här.
   *
   * Den gamla Payload-template-koden använde:
   *
   * footer.navItems
   *
   * men din nuvarande Footer Global har inte längre
   * något navItems-fält.
   *
   * Din riktiga footer använder istället exempelvis:
   * - description
   * - contactTitle
   * - contactText
   * - phone
   * - email
   * - instagram
   * - facebook
   * - youtube
   *
   * Därför lämnar vi footern utan gammal demo-data.
   */

  payload.logger.info(
    'Seeded database successfully!',
  )
}

// =========================
// FETCH FILE
// =========================

async function fetchFileByURL(
  url: string,
): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(
      `Failed to fetch file from ${url}, status: ${res.status}`,
    )
  }

  const data =
    await res.arrayBuffer()

  return {
    name:
      url.split('/').pop() ||
      `file-${Date.now()}`,

    data: Buffer.from(data),

    mimetype: `image/${url
      .split('.')
      .pop()}`,

    size: data.byteLength,
  }
}