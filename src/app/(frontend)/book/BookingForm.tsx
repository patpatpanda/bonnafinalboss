'use client'

import { useEffect, useState } from 'react'

type BookingFormProps = {
  times: string[]
  maxGuestsPerBooking: number
}

export default function BookingForm({
  times,
  maxGuestsPerBooking,
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    date: '',
    guests: '2',
    time: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [availableTimes, setAvailableTimes] = useState<string[]>(times)
  const [loadingTimes, setLoadingTimes] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const today = new Date().toLocaleDateString('sv-SE')

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setErrorMessage('')

    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }))
  }

  function selectTime(time: string) {
    setErrorMessage('')

    setFormData((current) => ({
      ...current,
      time,
    }))
  }

  useEffect(() => {
    async function loadAvailableTimes() {
      if (!formData.date || !formData.guests) {
        setAvailableTimes([])
        return
      }

      setLoadingTimes(true)
      setErrorMessage('')

      try {
        const response = await fetch(
          `/api/available-times?date=${formData.date}&guests=${formData.guests}`,
        )

        const result = await response.json()

        if (!response.ok) {
          setAvailableTimes([])
          setErrorMessage(result.error || 'Kunde inte hämta tillgängliga tider.')
          return
        }

        setAvailableTimes(result.availableTimes)

        setFormData((current) => ({
          ...current,
          time: '',
        }))
      } catch (error) {
        console.error('Kunde inte hämta tillgängliga tider:', error)

        setAvailableTimes([])
        setErrorMessage('Kunde inte hämta tillgängliga tider.')
      } finally {
        setLoadingTimes(false)
      }
    }

    loadAvailableTimes()
  }, [formData.date, formData.guests])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setErrorMessage('')

    if (!formData.time) {
      setErrorMessage('Välj en tid innan du bokar.')
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        setErrorMessage(result.error || 'Något gick fel.')
        return
      }

      setSuccess(true)
    } catch (error) {
      console.error('Kunde inte skapa bokningen:', error)
      setErrorMessage('Något gick fel. Försök igen.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="border border-[#242424] bg-[#111111] px-6 py-14 text-center md:px-12 md:py-20">
        <div className="mx-auto max-w-xl">
          <div className="mb-8 flex items-center justify-center gap-4">
            <span className="h-px w-14 bg-[#d7a52b]" />
            <span className="text-xs font-bold uppercase tracking-[0.32em] text-[#d7a52b]">
              Bekräftad
            </span>
            <span className="h-px w-14 bg-[#d7a52b]" />
          </div>

          <h2 className="text-4xl font-black uppercase tracking-tight text-[#f4f0e8] md:text-6xl">
            Bokat & klart
          </h2>

          <p className="mt-6 text-base leading-7 text-[#b8b3aa]">
            Din bokning är bekräftad och ett bekräftelsemejl har skickats till
            din e-post.
          </p>

          <div className="my-10 border-y border-[#2b2b2b] py-8">
            <p className="text-sm uppercase tracking-[0.22em] text-[#77736c]">
              Din bokning
            </p>

            <p className="mt-3 text-2xl font-bold text-[#f4f0e8]">
              {formData.date}
            </p>

            <p className="mt-2 text-xl text-[#d7a52b]">
              {formData.time}
            </p>

            <p className="mt-2 text-[#b8b3aa]">
              {formData.guests}{' '}
              {formData.guests === '1' ? 'person' : 'personer'}
            </p>
          </div>

          <p className="text-sm uppercase tracking-[0.18em] text-[#77736c]">
            Vi ses på Bonnatösen
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[#242424] bg-[#111111] p-5 md:p-10 lg:p-12"
    >
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-4">
          <span className="text-xs font-bold tracking-[0.25em] text-[#d7a52b]">
            01
          </span>

          <span className="h-px flex-1 bg-[#292929]" />
        </div>

        <h2 className="text-2xl font-black uppercase tracking-tight text-[#f4f0e8] md:text-3xl">
          När kommer ni?
        </h2>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="date"
              className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#8d8982]"
            >
              Datum
            </label>

            <input
              id="date"
              name="date"
              type="date"
              min={today}
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border border-[#333333] bg-[#171717] px-4 py-4 text-[#f4f0e8] outline-none transition focus:border-[#d7a52b]"
            />
          </div>

          <div>
            <label
              htmlFor="guests"
              className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#8d8982]"
            >
              Antal personer
            </label>

            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="w-full border border-[#333333] bg-[#171717] px-4 py-4 text-[#f4f0e8] outline-none transition focus:border-[#d7a52b]"
            >
              {Array.from(
                { length: maxGuestsPerBooking },
                (_, index) => index + 1,
              ).map((number) => (
                <option key={number} value={number}>
                  {number} {number === 1 ? 'person' : 'personer'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="mb-4 flex items-center gap-4">
          <span className="text-xs font-bold tracking-[0.25em] text-[#d7a52b]">
            02
          </span>

          <span className="h-px flex-1 bg-[#292929]" />
        </div>

        <h2 className="text-2xl font-black uppercase tracking-tight text-[#f4f0e8] md:text-3xl">
          Välj tid
        </h2>

        <div className="mt-7">
          {!formData.date && (
            <p className="border border-dashed border-[#333333] px-5 py-5 text-sm text-[#77736c]">
              Välj ett datum först för att se tillgängliga tider.
            </p>
          )}

          {formData.date && loadingTimes && (
            <div className="border border-dashed border-[#333333] px-5 py-5 text-sm uppercase tracking-[0.15em] text-[#8d8982]">
              Hämtar tillgängliga tider...
            </div>
          )}

          {formData.date &&
            !loadingTimes &&
            availableTimes.length === 0 && (
              <div className="border border-[#4a3025] bg-[#1c1512] px-5 py-5 text-sm text-[#d0aaa0]">
                Inga bokningsbara tider finns för det valda datumet och antalet
                personer.
              </div>
            )}

          {!loadingTimes && availableTimes.length > 0 && (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {availableTimes.map((time) => {
                const selected = formData.time === time

                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => selectTime(time)}
                    className={`border px-3 py-4 text-sm font-bold tracking-[0.08em] transition ${
                      selected
                        ? 'border-[#d7a52b] bg-[#d7a52b] text-[#111111]'
                        : 'border-[#333333] bg-[#171717] text-[#f4f0e8] hover:border-[#d7a52b] hover:text-[#d7a52b]'
                    }`}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mb-12">
        <div className="mb-4 flex items-center gap-4">
          <span className="text-xs font-bold tracking-[0.25em] text-[#d7a52b]">
            03
          </span>

          <span className="h-px flex-1 bg-[#292929]" />
        </div>

        <h2 className="text-2xl font-black uppercase tracking-tight text-[#f4f0e8] md:text-3xl">
          Vem bokar?
        </h2>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#8d8982]"
            >
              Namn
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-[#333333] bg-[#171717] px-4 py-4 text-[#f4f0e8] outline-none transition placeholder:text-[#55514c] focus:border-[#d7a52b]"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#8d8982]"
            >
              Telefon
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-[#333333] bg-[#171717] px-4 py-4 text-[#f4f0e8] outline-none transition placeholder:text-[#55514c] focus:border-[#d7a52b]"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#8d8982]"
            >
              E-post
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-[#333333] bg-[#171717] px-4 py-4 text-[#f4f0e8] outline-none transition placeholder:text-[#55514c] focus:border-[#d7a52b]"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="message"
              className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#8d8982]"
            >
              Meddelande
              <span className="ml-2 font-normal text-[#55514c]">
                frivilligt
              </span>
            </label>

            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full resize-none border border-[#333333] bg-[#171717] px-4 py-4 text-[#f4f0e8] outline-none transition placeholder:text-[#55514c] focus:border-[#d7a52b]"
            />
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 border border-[#5a3028] bg-[#1d1311] px-5 py-4 text-sm text-[#e3aaa0]">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || !formData.time}
        className="group flex w-full items-center justify-center gap-4 border border-[#d7a52b] bg-[#d7a52b] px-6 py-5 text-sm font-black uppercase tracking-[0.18em] text-[#111111] transition hover:bg-transparent hover:text-[#d7a52b] disabled:cursor-not-allowed disabled:border-[#393939] disabled:bg-[#262626] disabled:text-[#626262]"
      >
        {submitting ? 'Bekräftar bokning...' : 'Bekräfta bokning'}

        {!submitting && (
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        )}
      </button>

      <p className="mt-5 text-center text-xs leading-5 text-[#5f5b55]">
        Bokningen bekräftas direkt när du klickar på knappen.
      </p>
    </form>
  )
}