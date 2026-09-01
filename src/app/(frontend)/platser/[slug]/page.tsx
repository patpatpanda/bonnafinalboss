import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import RichText from '@/components/RichText'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'locations',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const location = result.docs[0]

  if (!location || !location.active) {
    notFound()
  }

  const heroImage =
    typeof location.heroImage === 'object'
      ? location.heroImage
      : null

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-[#f4f0e8]">

      {/* HERO */}
      <section className="relative min-h-[70vh] overflow-hidden border-b border-[#242424]">
        {heroImage?.url && (
          <Image
            src={heroImage.url}
            alt={heroImage.alt || location.name}
            fill
            priority
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-10 md:pb-24">
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-14 bg-[#d7a52b]" />

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d7a52b]">
              Bonnatösen
            </span>
          </div>

          <h1 className="max-w-4xl text-6xl font-black uppercase leading-[0.9] tracking-[-0.05em] md:text-8xl lg:text-[9rem]">
            {location.name}
          </h1>

          {location.shortDescription && (
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#d0cbc2] md:text-xl">
              {location.shortDescription}
            </p>
          )}
        </div>
      </section>

      {/* INTRO */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
         

         <div className="prose prose-invert max-w-none text-[#aaa59c]">
  {location.description ? (
    <RichText data={location.description} enableGutter={false} />
  ) : (
    <p className="text-base leading-8 md:text-lg">
      {location.shortDescription}
    </p>
  )}
</div>
        </div>
      </section>

      {/* KONTAKTINFO */}
      {(location.address || location.phone || location.email) && (
        <section className="border-y border-[#242424]">
          <div className="mx-auto grid max-w-7xl md:grid-cols-3">
            <div className="border-b border-[#242424] px-6 py-10 md:border-b-0 md:border-r">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#69655e]">
                Adress
              </p>

              <p className="mt-4 text-lg font-bold">
                {location.address || '–'}
              </p>
            </div>

            <div className="border-b border-[#242424] px-6 py-10 md:border-b-0 md:border-r">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#69655e]">
                Telefon
              </p>

              <p className="mt-4 text-lg font-bold">
                {location.phone || '–'}
              </p>
            </div>

            <div className="px-6 py-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#69655e]">
                E-post
              </p>

              <p className="mt-4 text-lg font-bold">
                {location.email || '–'}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* GALLERI */}
      {location.gallery && location.gallery.length > 0 && (
        <section className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d7a52b]">
                Bilder
              </span>

              <span className="h-px flex-1 bg-[#242424]" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {location.gallery.map((item, index) => {
                const image =
                  typeof item.image === 'object'
                    ? item.image
                    : null

                if (!image?.url) {
                  return null
                }

                return (
                  <div
                    key={item.id || index}
                    className="relative aspect-[4/3] overflow-hidden"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || location.name}
                      fill
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* BOKNING CTA */}
      <section className="border-t border-[#242424] px-5 py-20 text-center md:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d7a52b]">
          Kom hungrig
        </p>

        <h2 className="mt-5 text-4xl font-black uppercase tracking-[-0.04em] md:text-6xl">
          Säkra ditt bord
        </h2>

        <a
          href="/book"
          className="mt-8 inline-block border border-[#d7a52b] bg-[#d7a52b] px-8 py-5 text-sm font-black uppercase tracking-[0.18em] text-[#111111] transition hover:bg-transparent hover:text-[#d7a52b]"
        >
          Boka bord
        </a>
      </section>

    </main>
  )
}