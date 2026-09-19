import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (
  image?: Media | Config['db']['defaultIDType'] | null,
) => {
  const serverUrl = getServerSideURL()

  // Standardbild om sidan inte har någon meta-bild
  let url = `${serverUrl}/website-template-OG.webp`

  if (
    image &&
    typeof image === 'object' &&
    'url' in image &&
    image.url
  ) {
    // Använd large-versionen om den finns,
    // annars originalbilden.
    const imageUrl =
      image.sizes?.large?.url ||
      image.url

    // Payload kan returnera antingen relativ eller absolut URL.
    url = imageUrl.startsWith('http')
      ? imageUrl
      : `${serverUrl}${imageUrl}`
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? `${doc.meta.title} | Bonnatösen`
    : 'Bonnatösen'

  return {
    title,

    description: doc?.meta?.description,

    openGraph: mergeOpenGraph({
      title,
      description: doc?.meta?.description || '',

      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,

      url: Array.isArray(doc?.slug)
        ? doc.slug.join('/')
        : doc?.slug
          ? `/${doc.slug}`
          : '/',
    }),
  }
}