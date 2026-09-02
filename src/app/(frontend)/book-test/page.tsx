// import { getPayload } from 'payload'
// import config from '@payload-config'
// import { generateBookingTimes } from '@/utilities/generateBookingTimes'

// export default async function BookTestPage() {
//   const payload = await getPayload({ config })

//   const settings = await payload.findGlobal({
//     slug: 'booking-settings',
//   })

//   const times = generateBookingTimes(
//     settings.firstBookingTime,
//     settings.lastBookingTime,
//     settings.intervalMinutes,
//   )

//   return (
//     <main>
//       <h1>Bokningstest</h1>

//       <p>
//         Första tid: <strong>{settings.firstBookingTime}</strong>
//       </p>

//       <p>
//         Sista tid: <strong>{settings.lastBookingTime}</strong>
//       </p>

//       <p>
//         Intervall: <strong>{settings.intervalMinutes} minuter</strong>
//       </p>

//       <h2>Tillgängliga bokningstider</h2>

//       <ul>
//         {times.map((time) => (
//           <li key={time}>{time}</li>
//         ))}
//       </ul>
//     </main>
//   )
// }