
import { Mail, ArrowUpRight } from 'lucide-react'

export default function BookPage() {
  // ÄNDRA TILL BONNATÖSENS E-POSTADRESS
  const email = 'bonnatosensburgare@gmail.com'

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      {/* =========================
          BORDSBOKNING
      ========================= */}
      <section className="px-4 pb-20 pt-28 sm:px-6 md:pb-28 md:pt-36 lg:px-10">
        <div className="mx-auto max-w-4xl">
          {/* =========================
              SIDANS RUBRIK
          ========================= */}
          <div className="mb-10 text-center md:mb-14">
            <div className="mb-5 flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-[#FAC800] sm:w-12" />

              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FAC800] sm:text-xs">
                Bonnatösens Saloon
              </span>

              <span className="h-px w-10 bg-[#FAC800] sm:w-12" />
            </div>

            <h1 className="text-3xl font-black uppercase leading-tight tracking-[-0.04em] sm:text-4xl md:text-5xl">
              Bordsbokning på Saloonen
            </h1>
          </div>

          {/* =========================
              INFORMATIONSKORT
          ========================= */}
          <div className="relative overflow-hidden bg-[#d7bc84] px-6 py-10 text-[#4a3820] shadow-[0_30px_100px_rgba(0,0,0,0.5)] sm:px-10 sm:py-12 md:px-14 md:py-16">
            {/* PAPPERSSTRUKTUR */}
            <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_15%_20%,rgba(90,60,24,.18)_0,transparent_24%),radial-gradient(circle_at_85%_75%,rgba(90,60,24,.14)_0,transparent_28%),linear-gradient(rgba(255,255,255,.10),rgba(80,50,20,.08))]" />

            {/* RAMAR */}
            <div className="pointer-events-none absolute inset-3 border border-[#735630]/70" />
            <div className="pointer-events-none absolute inset-5 border border-[#735630]/35" />

            <div className="relative z-10">
              {/* INTRO */}
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#75562c]">
                  Välkommen till Saloonen
                </p>

                <h2 className="mx-auto mt-4 max-w-xl text-2xl font-black uppercase leading-tight tracking-[-0.035em] sm:text-3xl">
                  Kom förbi när det passar!
                </h2>

                <div className="mx-auto mt-6 flex max-w-xs items-center gap-3">
                  <span className="h-px flex-1 bg-[#75562c]" />
                  <span className="h-[6px] w-[6px] rotate-45 bg-[#75562c]" />
                  <span className="h-px flex-1 bg-[#75562c]" />
                </div>
              </div>

              {/* INFORMATION */}
              <div className="mx-auto mt-9 max-w-2xl space-y-6 text-sm leading-8 sm:text-base">
                <p>
                  Just nu tar vi inte emot vanliga bordsbokningar
                  på Saloonen, utan välkomnar er istället att komma
                  förbi när det passar!
                </p>

                <p>
                  Vi har märkt att de allra flesta av våra gäster
                  kommer spontant och att det är bra ruljans på
                  borden. Även om det skulle vara fullt när ni
                  kommer brukar väntan därför inte bli särskilt
                  lång.
                </p>

                {/* BOKNINGSFÖRFRÅGAN */}
                <div className="border-l-4 border-[#75562c] bg-[#4a3820]/[0.07] px-5 py-6 sm:px-7">
                  <h3 className="text-base font-black uppercase tracking-[-0.02em] sm:text-lg">
                    Vill ni ändå boka bord?
                  </h3>

                  <p className="mt-3">
                    Det går självklart bra att mejla oss en
                    förfrågan, så återkommer vi om vi har möjlighet
                    att ordna det. Är ni ett större sällskap
                    brukar vi kunna hitta en lösning!
                  </p>

                  <a
                    href={`mailto:${email}`}
                    className="group mt-6 inline-flex items-center justify-center gap-3 bg-[#4a3820] px-6 py-4 text-[11px] font-black uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[#2e2113]"
                  >
                    <Mail
                      size={18}
                      className="text-[#FAC800]"
                    />

                    Skicka bokningsförfrågan

                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </a>
                </div>

                {/* NYHET 2027 */}
                <div className="border-y border-[#75562c]/35 py-7 text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#75562c]">
                    Något stort är på gång
                  </p>

                  <h3 className="mt-3 text-xl font-black uppercase leading-tight tracking-[-0.03em] sm:text-2xl">
                    1 februari 2027
                  </h3>

                  <p className="mx-auto mt-4 max-w-xl">
                    <strong>
                      Från och med 1 februari 2027 blir
                      Saloonen dubbelt så stor!
                    </strong>{' '}
                    Då kommer vi också att öppna upp för
                    vanliga bordsbokningar igen.
                  </p>
                </div>

                {/* AVSLUTNING */}
                <p className="text-center font-semibold">
                  Fram till dess är det bara att svänga förbi,
                  så gör vi vårt bästa för att hitta en plats
                  åt er! 🤠
                </p>
              </div>
            </div>
          </div>

          {/* SIDFOT */}
          <div className="mt-10 text-center">
            <div className="mx-auto mb-4 h-px w-12 bg-[#FAC800]" />

            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
              Bonnatösens Saloon · Nora
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
