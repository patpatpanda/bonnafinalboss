import { getPayload } from 'payload'
import config from '@payload-config'

export default async function OpeningHoursPage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'opening-hours',
    limit: 1,
  })

  const hours = result.docs[0]

  if (!hours) {
    return <main>Inga öppettider angivna.</main>
  }

  const days = [
    ['Måndag', hours.monday],
    ['Tisdag', hours.tuesday],
    ['Onsdag', hours.wednesday],
    ['Torsdag', hours.thursday],
    ['Fredag', hours.friday],
    ['Lördag', hours.saturday],
    ['Söndag', hours.sunday],
  ]

  return (
    <main>
      <h1>Öppettider</h1>

      {days.map(([label, day]) => (
        <div key={label as string}>
          <strong>{label as string}</strong>

          {(day as any)?.closed ? (
            <span> – Stängt</span>
          ) : (
            <span>
              {' '}
              – {(day as any)?.open}–{(day as any)?.close}
            </span>
          )}
        </div>
      ))}
    </main>
  )
}