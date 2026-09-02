import { getPayload } from 'payload'
import config from '@payload-config'

export default async function OpeningHoursPage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'opening-hours',
    limit: 100,
    sort: '-priority',
    where: {
      active: {
        equals: true,
      },
    },
    depth: 1,
  })

  const hours = result.docs

  if (!hours.length) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] px-5 py-24 text-[#f4f0e8] md:px-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-5xl font-black uppercase tracking-[-0.04em] md:text-7xl">
            Öppettider
          </h1>

          <p className="mt-6 text-[#88847d]">
            Inga öppettider är angivna just nu.
          </p>
        </div>
      </main>
    )
  }

  const groupedByLocation = hours.reduce<
    Record<
      string,
      {
        name: string
        slug?: string
        items: typeof hours
      }
    >
  >((groups, item) => {
    const location =
      typeof item.location === 'object'
        ? item.location
        : null

    const locationName =
      location?.name || 'Övrigt'

    const locationSlug =
      location?.slug || locationName.toLowerCase()

    if (!groups[locationSlug]) {
      groups[locationSlug] = {
        name: locationName,
        slug: location?.slug,
        items: [],
      }
    }

    groups[locationSlug].items.push(item)

    return groups
  }, {})

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-[#f4f0e8]">

      {/* HERO */}
      <section className="border-b border-[#242424] px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d7a52b]">
            Bonnatösen
          </p>

          <h1 className="mt-5 text-5xl font-black uppercase tracking-[-0.05em] md:text-7xl lg:text-8xl">
            Öppettider
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#88847d] md:text-lg">
            Här hittar du aktuella öppettider och information om eventuella
            avvikande tider.
          </p>

        </div>
      </section>

      {/* PLATSER */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl space-y-20">

          {Object.values(groupedByLocation).map((group) => (
            <div key={group.slug || group.name}>

              <div className="mb-10 flex items-center gap-4">

                <h2 className="text-3xl font-black uppercase tracking-[-0.03em] md:text-5xl">
                  {group.name}
                </h2>

                <span className="h-px flex-1 bg-[#292929]" />

              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {group.items.map((item) => (
                  <article
                    key={item.id}
                    className="border border-[#292929] bg-[#111111] p-6 md:p-8"
                  >

                    <h3 className="text-xl font-black uppercase tracking-[-0.02em] text-[#f4f0e8] md:text-2xl">
                      {item.title}
                    </h3>

                    {item.startDate || item.endDate ? (
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-[#d7a52b]">
                        {formatDateRange(
                          item.startDate,
                          item.endDate,
                        )}
                      </p>
                    ) : null}

                    <p className="mt-5 whitespace-pre-line text-base leading-8 text-[#aaa59c]">
                      {item.information}
                    </p>

                  </article>
                ))}

              </div>

            </div>
          ))}

        </div>
      </section>

    </main>
  )
}

function formatDateRange(
  startDate?: string | null,
  endDate?: string | null,
) {
  const format = (value: string) =>
    new Intl.DateTimeFormat('sv-SE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(value))

  if (startDate && endDate) {
    return `${format(startDate)} – ${format(endDate)}`
  }

  if (startDate) {
    return `Från ${format(startDate)}`
  }

  if (endDate) {
    return `Till ${format(endDate)}`
  }

  return ''
}
