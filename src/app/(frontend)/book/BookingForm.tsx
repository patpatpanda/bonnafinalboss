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

  const today =
    new Date().toLocaleDateString('sv-SE')

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
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

  /* =========================
     BEKRÄFTELSE
  ========================= */

  if (success) {
    return (
      <div className="relative overflow-hidden bg-[#d7bc84] px-6 py-14 text-center text-[#49371e] md:px-12 md:py-20">

        {/* PAPPERSSTRUKTUR */}
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_20%,rgba(90,60,24,.18)_0,transparent_24%),radial-gradient(circle_at_80%_75%,rgba(90,60,24,.14)_0,transparent_28%),linear-gradient(rgba(255,255,255,.10),rgba(80,50,20,.08))]" />

        {/* RAMAR */}
        <div className="pointer-events-none absolute inset-3 border border-[#735630]/80" />
        <div className="pointer-events-none absolute inset-5 border border-[#735630]/40" />

        <WesternCorner className="left-7 top-7" />
        <WesternCorner className="right-7 top-7 rotate-90" />
        <WesternCorner className="bottom-7 right-7 rotate-180" />
        <WesternCorner className="bottom-7 left-7 -rotate-90" />

        <div className="relative z-10 mx-auto max-w-xl">

          <div className="text-3xl text-[#75562c]">
            ❦
          </div>

          <div className="mt-5 flex items-center justify-center gap-4">

            <span className="h-px w-14 bg-[#75562c]" />

            <span className="text-[10px] font-black uppercase tracking-[0.35em]">
              Bekräftad
            </span>

            <span className="h-px w-14 bg-[#75562c]" />

          </div>

          <h2
            className="mt-7 text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] md:text-6xl"
            style={{
              fontFamily:
                'Georgia, Times New Roman, serif',
            }}
          >
            Bokat
            <br />
            & klart
          </h2>

          <p className="mt-7 text-base leading-7 text-[#665033]">
            Din bokning är bekräftad och ett
            bekräftelsemejl har skickats till
            din e-post.
          </p>

          <div className="my-10 border-y border-[#75562c]/45 py-8">

            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#75562c]">
              Din bokning
            </p>

            <p
              className="mt-4 text-2xl font-black"
              style={{
                fontFamily:
                  'Georgia, Times New Roman, serif',
              }}
            >
              {formData.date}
            </p>

            <p
              className="mt-2 text-3xl font-black text-[#75562c]"
              style={{
                fontFamily:
                  'Georgia, Times New Roman, serif',
              }}
            >
              {formData.time}
            </p>

            <p className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-[#665033]">
              {formData.guests}{' '}
              {formData.guests === '1'
                ? 'person'
                : 'personer'}
            </p>

          </div>

          <div className="flex items-center justify-center gap-4">

            <span className="h-px w-12 bg-[#75562c]" />

            <span>✦</span>

            <span className="h-px w-12 bg-[#75562c]" />

          </div>

          <p className="mt-5 text-[10px] font-black uppercase tracking-[0.28em] text-[#665033]">
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
          01 DATUM + GÄSTER
      ========================= */}
      <section className="mb-14">

        <StepHeading
          number="01"
          title="När kommer ni?"
        />

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
          02 TID
      ========================= */}
      <section className="mb-14">

        <StepHeading
          number="02"
          title="Välj tid"
        />

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
          03 KONTAKT
      ========================= */}
      <section className="mb-12">

        <StepHeading
          number="03"
          title="Vem bokar?"
        />

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

          <div className="md:col-span-2">

            <label
              htmlFor="message"
              className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[#665033]"
            >
              Meddelande

              <span className="ml-2 font-semibold normal-case tracking-normal text-[#806948]">
                frivilligt
              </span>
            </label>

            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
            />

          </div>

        </div>

      </section>

      {/* =========================
          ERROR
      ========================= */}
      {errorMessage && (
        <div className="mb-7 border border-[#8b5543] bg-[#c29a72]/40 px-5 py-4 text-sm font-semibold text-[#6f3f30]">
          {errorMessage}
        </div>
      )}

      {/* ORNAMENT */}
      <div className="mb-7 flex items-center gap-4">

        <span className="h-px flex-1 bg-[#75562c]/60" />

        <span className="text-[#75562c]">
          ❦
        </span>

        <span className="h-px flex-1 bg-[#75562c]/60" />

      </div>

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
  number,
  title,
}: {
  number: string
  title: string
}) {
  return (
    <div>

      <div className="mb-4 flex items-center gap-4">

        <span className="text-[10px] font-black tracking-[0.3em] text-[#75562c]">
          {number}
        </span>

        <span className="h-px flex-1 bg-[#75562c]/50" />

        <span className="text-[#75562c]">
          ✦
        </span>

      </div>

      <h2
        className="text-2xl font-black uppercase leading-none tracking-[-0.03em] text-[#49371e] md:text-3xl"
        style={{
          fontFamily:
            'Georgia, Times New Roman, serif',
        }}
      >
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

function WesternCorner({
  className = '',
}: {
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute h-16 w-16 text-[#75562c]/70 ${className}`}
    >
      <div className="absolute left-0 top-0 h-px w-14 bg-current" />

      <div className="absolute left-0 top-0 h-14 w-px bg-current" />

      <div className="absolute left-2 top-2 text-2xl">
        ❧
      </div>
    </div>
  )
}