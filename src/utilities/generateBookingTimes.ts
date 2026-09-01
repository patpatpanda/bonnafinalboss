export function generateBookingTimes(
  startTime: string,
  endTime: string,
  intervalMinutes: number,
) {
  const times: string[] = []

  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)

  let currentMinutes = startHour * 60 + startMinute
  const endMinutes = endHour * 60 + endMinute

  while (currentMinutes <= endMinutes) {
    const hours = Math.floor(currentMinutes / 60)
    const minutes = currentMinutes % 60

    times.push(
      `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`,
    )

    currentMinutes += intervalMinutes
  }

  return times
}