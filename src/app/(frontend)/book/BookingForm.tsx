'use client'

import { useEffect, useRef, useState } from 'react'

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
  })

  const [availableTimes, setAvailableTimes] =
    useState<string[]>(times)

  const [loadingTimes, setLoadingTimes] =
    useState(false)

  const [submitting, setSubmitting] =
    useState(false)

  const [errorMessage, setErrorMessage] =
    useState('')

  const [success, setSuccess] =
    useState(false)

  const successRef = useRef<HTMLDivElement>(null)

  const today =
    new Date().toLocaleDateString('sv-SE')

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
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

  // =========================
  // HÄMTA LEDIGA TIDER
  // =========================
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

          setErrorMessage(
            result.error ||
              'Kunde inte hämta tillgängliga tider.',
          )

          return
        }

        setAvailableTimes(
          result.availableTimes,
        )

        setFormData((current) => ({
          ...current,
          time: '',
        }))
      } catch (error) {
        console.error(
          'Kunde inte hämta tillgängliga tider:',
          error,
        )

        setAvailableTimes([])

        setErrorMessage(
          'Kunde inte hämta tillgängliga tider.',
        )
      } finally {
        setLoadingTimes(false)
      }
    }

    loadAvailableTimes()
  }, [
    formData.date,
    formData.guests,
  ])

  // =========================
  // SCROLLA TILL BEKRÄFTELSE
  // =========================
  useEffect(() => {
    if (!success) {
      return
    }

    requestAnimationFrame(() => {
      successRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    })
  }, [success])

  // =========================
  // SKICKA BOKNING
  // =========================
  async function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault()

    setErrorMessage('')

    if (!formData.time) {
      setErrorMessage(
        'Välj en tid innan du bokar.',
      )

      return
    }

    setSubmitting(true)

    try {
      const response = await fetch(
        '/api/book',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify(formData),
        },
      )

      const result =
        await response.json()

      if (!response.ok) {
        setErrorMessage(
          result.error ||
            'Något gick fel.',
        )

        return
      }

      setSuccess(true)
    } catch (error) {
      console.error(
        'Kunde inte skapa bokningen:',
        error,
      )

      setErrorMessage(
        'Något gick fel. Försök igen.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  // =========================
  // BEKRÄFTELSE
  // =========================
  if (success) {
    return (
      <div
        ref={successRef}
        className="
          relative
          scroll-mt-32
          overflow-hidden
          bg-[#d7bc84]
          px-6
          py-14
          text-center
          text-[#49371e]

          md:px-12
          md:py-20
        "
      >

        {/* PAPPERSSTRUKTUR */}
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_20%,rgba(90,60,24,.18)_0,transparent_24%),radial-gradient(circle_at_80%_75%,rgba(90,60,24,.14)_0,transparent_28%),linear-gradient(rgba(255,255,255,.10),rgba(80,50,20,.08))]" />

        {/* RAMAR */}
        <div className="pointer-events-none absolute inset-3 border border-[#735630]/80" />
        <div className="pointer-events-none absolute inset-5 border border-[#735630]/40" />

        <div className="relative z-10 mx-auto max-w-xl">

          {/* CHECK */}
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-[#49371e]
              text-3xl
              font-black
              text-[#ead5a0]

              md:h-20
              md:w-20
              md:text-4xl
            "
          >
            ✓
          </div>

          {/* STATUS */}
          <div className="mt-7 flex items-center justify-center gap-4">

            <span className="h-px w-10 bg-[#75562c]" />

            <span className="text-[10px] font-black uppercase tracking-[0.35em]">
              Bokningen är bekräftad
            </span>

            <span className="h-px w-10 bg-[#75562c]" />

          </div>

          {/* RUBRIK */}
          <h2
            className="
              mt-7
              text-4xl
              font-black
              uppercase
              leading-[0.9]
              tracking-[-0.04em]

              md:text-6xl
            "
          >
            Bokat
            <br />
            & klart
          </h2>

          {/* TEXT */}
          <p className="mx-auto mt-7 max-w-md text-base leading-7 text-[#665033]">
            Din bokning är bekräftad.
            Ett bekräftelsemejl har skickats till{' '}
            <strong className="font-black text-[#49371e]">
              {formData.email}
            </strong>
            .
          </p>

          {/* BOKNINGSDETALJER */}
          <div className="my-10 border-y border-[#75562c]/45 py-8">

            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#75562c]">
              Din bokning
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-3">

              {/* DATUM */}
              <div>

                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#806948]">
                  Datum
                </p>

                <p className="mt-2 text-lg font-black text-[#49371e]">
                  {formatBookingDate(
                    formData.date,
                  )}
                </p>

              </div>

              {/* TID */}
              <div>

                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#806948]">
                  Tid
                </p>

                <p className="mt-2 text-lg font-black text-[#49371e]">
                  {formData.time}
                </p>

              </div>

              {/* GÄSTER */}
              <div>

                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#806948]">
                  Gäster
                </p>

                <p className="mt-2 text-lg font-black text-[#49371e]">
                  {formData.guests}{' '}
                  {formData.guests === '1'
                    ? 'person'
                    : 'personer'}
                </p>

              </div>

            </div>

          </div>

          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#665033]">
            Vi ses på Bonnatösens Saloon
          </p>

        </div>

      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative"
    >

      {/* =========================
          DATUM + GÄSTER
      ========================= */}
      <section className="mb-14">

        <StepHeading title="När kommer ni?" />

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <FieldWrapper
            label="Datum"
            htmlFor="date"
          >
            <input
              id="date"
              name="date"
              type="date"
              min={today}
              value={formData.date}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Antal personer"
            htmlFor="guests"
          >
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className={inputClass}
            >
              {Array.from(
                {
                  length:
                    maxGuestsPerBooking,
                },
                (_, index) => index + 1,
              ).map((number) => (
                <option
                  key={number}
                  value={number}
                >
                  {number}{' '}
                  {number === 1
                    ? 'person'
                    : 'personer'}
                </option>
              ))}
            </select>
          </FieldWrapper>

        </div>

      </section>

      {/* =========================
          TID
      ========================= */}
      <section className="mb-14">

        <StepHeading title="Välj tid" />

        <div className="mt-8">

          {!formData.date && (
            <div className="border border-dashed border-[#75562c]/55 bg-[#cbb078]/40 px-5 py-5 text-sm font-semibold text-[#665033]">
              Välj ett datum först för att se
              tillgängliga tider.
            </div>
          )}

          {formData.date &&
            loadingTimes && (
              <div className="border border-dashed border-[#75562c]/55 bg-[#cbb078]/40 px-5 py-5 text-xs font-black uppercase tracking-[0.15em] text-[#665033]">
                Hämtar tillgängliga tider...
              </div>
            )}

          {formData.date &&
            !loadingTimes &&
            availableTimes.length === 0 && (
              <div className="border border-[#8a5542] bg-[#c49c72]/35 px-5 py-5 text-sm font-semibold text-[#714331]">
                Inga bokningsbara tider finns
                för det valda datumet och
                antalet personer.
              </div>
            )}

          {!loadingTimes &&
            availableTimes.length > 0 && (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">

                {availableTimes.map(
                  (time) => {
                    const selected =
                      formData.time === time

                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() =>
                          selectTime(time)
                        }
                        className={`
                          border
                          px-3
                          py-4
                          text-sm
                          font-black
                          tracking-[0.08em]
                          transition

                          ${
                            selected
                              ? 'border-[#49371e] bg-[#49371e] text-[#ead5a0]'
                              : 'border-[#75562c]/60 bg-[#ddc58f]/50 text-[#49371e] hover:border-[#49371e] hover:bg-[#49371e] hover:text-[#ead5a0]'
                          }
                        `}
                      >
                        {time}
                      </button>
                    )
                  },
                )}

              </div>
            )}

        </div>

      </section>

      {/* =========================
          KONTAKT
      ========================= */}
      <section className="mb-12">

        <StepHeading title="Vem bokar?" />

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <FieldWrapper
            label="Namn"
            htmlFor="name"
          >
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Telefon"
            htmlFor="phone"
          >
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </FieldWrapper>

          <div className="md:col-span-2">

            <FieldWrapper
              label="E-post"
              htmlFor="email"
            >
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </FieldWrapper>

          </div>

        </div>

      </section>

      {/* =========================
          FELMEDDELANDE
      ========================= */}
      {errorMessage && (
        <div className="mb-7 border border-[#8b5543] bg-[#c29a72]/40 px-5 py-4 text-sm font-semibold text-[#6f3f30]">
          {errorMessage}
        </div>
      )}

      {/* SEPARATOR */}
      <div className="mb-7 h-px w-full bg-[#75562c]/40" />

      {/* =========================
          SUBMIT
      ========================= */}
      <button
        type="submit"
        disabled={
          submitting ||
          !formData.time
        }
        className="
          group
          flex
          w-full
          items-center
          justify-center
          gap-4
          border-2
          border-[#49371e]
          bg-[#49371e]
          px-6
          py-5
          text-sm
          font-black
          uppercase
          tracking-[0.2em]
          text-[#ead5a0]
          transition

          hover:bg-transparent
          hover:text-[#49371e]

          disabled:cursor-not-allowed
          disabled:border-[#8f7955]
          disabled:bg-[#bba26f]
          disabled:text-[#7e6948]
        "
      >
        {submitting
          ? 'Bekräftar bokning...'
          : 'Bekräfta bokning'}

        {!submitting && (
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        )}
      </button>

      <p className="mt-5 text-center text-[10px] font-bold uppercase leading-5 tracking-[0.15em] text-[#806948]">
        Bokningen bekräftas direkt när
        du klickar på knappen.
      </p>

    </form>
  )
}

/* =========================
   HELPERS
========================= */

const inputClass = `
  w-full
  border
  border-[#75562c]/65
  bg-[#e0c78f]/45
  px-4
  py-4
  font-semibold
  text-[#49371e]
  outline-none
  transition
  placeholder:text-[#8b7653]
  focus:border-[#49371e]
  focus:bg-[#e5ce99]/70
`

function StepHeading({
  title,
}: {
  title: string
}) {
  return (
    <div>

      <div className="mb-4 flex items-center gap-4">

        <span className="h-[2px] w-12 bg-[#75562c]" />

        <span className="h-px flex-1 bg-[#75562c]/30" />

      </div>

      <h2 className="text-2xl font-black uppercase leading-none tracking-[-0.03em] text-[#49371e] md:text-3xl">
        {title}
      </h2>

    </div>
  )
}

function FieldWrapper({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div>

      <label
        htmlFor={htmlFor}
        className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[#665033]"
      >
        {label}
      </label>

      {children}

    </div>
  )
}

function formatBookingDate(
  date: string,
) {
  if (!date) {
    return ''
  }

  const [year, month, day] =
    date.split('-').map(Number)

  const value =
    new Date(year, month - 1, day)

  return new Intl.DateTimeFormat(
    'sv-SE',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  ).format(value)
}