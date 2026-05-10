const whatsappNumber = "+48512077770";
const whatsappLink = "https://wa.me/48512077770";
const allegroStoreLink = "https://allegro.pl/uzytkownik/TRENDECO";
const backgroundImage = "/wood-splitter-bg.jpg";

export default function Page() {
  const advantages = [
    {
      title: "Bezobsługowa konstrukcja",
      text: "Przekładniowy mechanizm bez hydrauliki, bez oleju roboczego, bez pomp, siłowników i przewodów hydraulicznych.",
    },
    {
      title: "Szybka praca",
      text: "Cykliczny ruch klina pozwala szybciej przygotowywać drewno opałowe przy pracy seryjnej.",
    },
    {
      title: "Drewno niestandardowe",
      text: "Do pni, rogatin, krzywych i nierównych polan do około 40 cm średnicy i 50 cm długości.",
    },
    {
      title: "Moc mechaniczna",
      text: "Napęd przekładniowy przenosi energię w prosty i odporny sposób.",
    },
  ];

  const engineeringPoints = [
    "zaawansowane ulepszenie techniczne sprawdzonego, niezawodnego i popularnego na całym świecie rozwiązania, dostosowane do norm UE",
    "adaptacja konstrukcji przez polskich inżynierów",
    "osłony i rozwiązania konstrukcyjne projektowane z uwzględnieniem wymagań rynku UE",
    "montaż i kompletacja w Polsce",
    "polska gwarancja oraz serwis pogwarancyjny producenta",
  ];

  const useCases = [
    "domy jednorodzinne i gospodarstwa",
    "przygotowanie drewna opałowego na sezon",
    "małe firmy usługowe",
    "praca z drewnem nieregularnym, sękatym i trudnym do ustawienia",
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <section
        className="relative min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.45),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_30%)]" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
          <header className="flex items-center justify-between">
            <div className="text-3xl font-black tracking-tight">
              <span>polmech</span>
              <span className="text-red-500">.tech</span>
            </div>

            <a
              href={whatsappLink}
              className="hidden rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold transition hover:bg-white/20 sm:inline-flex"
            >
              WhatsApp {whatsappNumber}
            </a>
          </header>

          <div className="flex flex-1 items-center py-20">
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100">
                Przekładniowe łuparki do drewna • produkcja w Polsce
              </div>

              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                Łuparki przekładniowe do drewna opałowego
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-200 sm:text-xl">
                Mocna, szybka i prosta mechaniczna alternatywa dla klasycznych hydraulicznych   		oraz kinetycznych łuparek. Konstrukcja przeznaczona do zastosowań
                domowych i profesjonalnych, także do trudnego drewna: pni,
                krzywych polan, rogatin i nieregularnych kawałków.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-neutral-200">
                {[
                  "bez hydrauliki",
                  "bez pomp",
                  "bez siłowników",
                  "bez wycieków oleju",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-full bg-white/10 px-4 py-2"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-9">
                <a
                  href={allegroStoreLink}
                  className="inline-flex rounded-2xl bg-red-600 px-7 py-4 text-base font-bold shadow-lg shadow-red-950/40 transition hover:bg-red-500"
                >
                  Zobacz ofertę Allegro
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative bg-cover bg-center bg-fixed px-6 py-20"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.45),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_30%)]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Dlaczego taka konstrukcja
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Mniej obsługi. Więcej pracy. Większa odporność.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-neutral-300">
              Hydraulika bywa wolna, wrażliwa i wymaga obsługi. Łuparka
              przekładniowa stawia na prosty mechanizm, dużą energię roboczą i
              realną szybkość przygotowania drewna.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-black/45 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm"
              >
                <h3 className="mb-3 text-xl font-black">{item.title}</h3>
                <p className="leading-relaxed text-neutral-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative bg-cover bg-center bg-fixed px-6 py-20"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.45),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_30%)]" />

        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Unikalność oferty
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Popularne na całym świecie rozwiązanie jako baza. Polski upgrade jako przewaga.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-neutral-300">
              Bazowe rozwiązanie zostało rozwinięte technicznie w Polsce pod
              kątem trwałości, praktycznej pracy z drewnem nieregularnym oraz
              wymagań rynku europejskiego.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/45 p-7 shadow-2xl shadow-black/30 backdrop-blur-sm">
            <h3 className="mb-6 text-2xl font-black">Co zostało dopracowane</h3>

            <div className="space-y-4 text-neutral-200">
              {engineeringPoints.map((point) => (
                <div key={point} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-red-500" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative bg-cover bg-center bg-fixed px-6 py-20"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.45),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_30%)]" />

        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-3xl bg-red-600/90 p-8 shadow-2xl shadow-red-950/30 backdrop-blur-sm lg:p-10">
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              Do drewna, które nie pasuje do katalogu.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-red-50">
              Pień, rozwidlenie, krzywe polano, nierówny klocek — właśnie przy
              takim materiale jeszcze bardziej widać sens mocnej, mechanicznej łuparki
              przekładniowej.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/15 p-5">
                <div className="text-4xl font-black">40 cm</div>
                <div className="mt-1 text-red-50">średnica drewna</div>
              </div>

              <div className="rounded-2xl bg-white/15 p-5">
                <div className="text-4xl font-black">50 cm</div>
                <div className="mt-1 text-red-50">długość polana</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/45 p-8 shadow-2xl shadow-black/30 backdrop-blur-sm lg:p-10">
            <h3 className="mb-6 text-2xl font-black">Zastosowanie</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {useCases.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/10 p-5 text-neutral-200"
                >
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-8 leading-relaxed text-neutral-400">
              Parametry robocze zależą od wersji maszyny, konfiguracji napędu i
              rodzaju drewna. Przed zakupem warto dobrać wariant do realnego
              zastosowania: domowego, gospodarczego albo usługowego.
            </p>
          </div>
        </div>
      </section>

      <section
        className="relative bg-cover bg-center bg-fixed px-6 py-20"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.45),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_30%)]" />

        <div className="relative z-10 mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-black/45 p-8 shadow-2xl shadow-black/30 backdrop-blur-sm lg:p-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                Serwis i odpowiedzialność
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                Polska gwarancja i serwis producenta.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-neutral-300">
                Maszyna jest montowana i kompletowana w Polsce. Zapewniamy
                wsparcie techniczne, części, serwis gwarancyjny oraz
                pogwarancyjny dla użytkowników domowych i profesjonalnych.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <div className="text-xl font-black">Kontakt bezpośredni</div>
                <div className="mt-1 text-neutral-300">
                  WhatsApp / telefon: {whatsappNumber}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <div className="text-xl font-black">Sprzedaż online</div>
                <div className="mt-1 text-neutral-300">
                  Sprzedaż przez Allegro oraz kontakt bezpośredni z
                  producentem.
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <div className="text-xl font-black">Doradztwo przed zakupem</div>
                <div className="mt-1 text-neutral-300">
                  Dobór wersji do średnicy drewna, długości polan i
                  intensywności pracy.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        className="relative bg-cover bg-center bg-fixed px-6 py-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col justify-between gap-4 text-sm text-neutral-400 sm:flex-row">
          <div>
            <span className="font-black text-white">polmech.tech</span> —
            łuparki przekładniowe do drewna opałowego
          </div>

          <div>Polska gwarancja • serwis • wsparcie techniczne</div>
        </div>
      </footer>

      <a
        href={whatsappLink}
        className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-3xl font-black text-white shadow-2xl shadow-green-950/40 transition hover:bg-green-400"
        aria-label="Kontakt przez WhatsApp"
      >
        ☎
      </a>
    </main>
  );
}
