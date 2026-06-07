const whatsappNumber = "+48512077770";
const whatsappLink = "https://wa.me/48512077770";
const allegroStoreLink = "https://allegro.pl/uzytkownik/TRENDECO";
const youtubeLink = "https://www.youtube.com/channel/UC4JFZ5O7apa9umyye9Ixaaw";
const tiktokLink = "https://www.tiktok.com/@polmech.tech";
const backgroundImage = "/wood-splitter-bg.jpg";

export default function Page() {
const advantages = [
{
title: "Bez hydrauliki",
text: "Brak pompy, siłownika, przewodów hydraulicznych i wycieków oleju. Prosty mechanizm przekładniowy zamiast klasycznego układu hydraulicznego.",
},
{
title: "Szybki cykl pracy",
text: "Cykliczny ruch klina pozwala sprawnie przygotowywać drewno opałowe przy pracy seryjnej w gospodarstwie lub warsztacie.",
},
{
title: "Drewno niestandardowe",
text: "Do drewna opałowego, polan sękatych, krzywych kawałków, rozwidleń i pni o średnicy do około 40 cm oraz długości do 50 cm.",
},
{
title: "Przemysłowa przekładnia",
text: "Układ mechaniczny oparty na przekładni i napędzie pasowym. Konstrukcja prosta w obsłudze i łatwa w serwisowaniu.",
},
];

const features = [
"230V lub 400V do wyboru",
"do 40 cm średnicy drewna",
"do 50 cm długości polana",
"bez pompy hydraulicznej",
"bez siłownika hydraulicznego",
"bez wycieków oleju",
"polska gwarancja",
"serwis i części w Polsce",
];

const engineeringPoints = [
"konstrukcja rozwijana i kompletowana w Polsce",
"mechaniczny układ przekładniowy bez klasycznej hydrauliki",
"osłony i rozwiązania konstrukcyjne projektowane z myślą o użytkowaniu w gospodarstwie",
"możliwość wyboru wersji 230V lub 400V",
"polska gwarancja oraz serwis pogwarancyjny producenta",
];

const useCases = [
"domy jednorodzinne i gospodarstwa",
"przygotowanie drewna opałowego na sezon",
"małe firmy usługowe",
"drewno sękate, rozwidlenia i nieregularne polana",
];

const versions = [
{
title: "Wersja 230V",
text: "Do gospodarstw bez zasilania 400V. Wygodne podłączenie do typowej instalacji jednofazowej.",
},
{
title: "Wersja 400V",
text: "Do intensywniejszej pracy, większych ilości drewna i użytkowników posiadających zasilanie siłowe.",
},
{
title: "Bez kosza",
text: "Wersja kompaktowa ze stałą osłoną z siatki stalowej zintegrowaną z ramą maszyny.",
},
{
title: "Z koszem roboczym",
text: "Większa wygoda pracy, łatwiejsze ustawianie krótszych polan i lepsza organizacja stanowiska.",
},
];

return ( <main className="min-h-screen bg-black text-white">
<section
className="relative min-h-screen bg-cover bg-center bg-fixed"
style={{ backgroundImage: `url(${backgroundImage})` }}
> <div className="absolute inset-0 bg-black/60" /> <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.45),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_30%)]" />

```
    <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
      <header className="flex items-center justify-between gap-4">
        <div className="text-3xl font-black tracking-tight">
          <span>polmech</span>
          <span className="text-red-500">.tech</span>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <a
            href={youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-red-600"
          >
            ▶ YouTube
          </a>

          <a
            href={tiktokLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20"
          >
            ♬ TikTok
          </a>

          <a
            href={whatsappLink}
            className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold transition hover:bg-white/20"
          >
            WhatsApp {whatsappNumber}
          </a>
        </div>
      </header>

      <div className="flex flex-1 items-center py-20">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100">
            Przekładniowe łuparki do drewna • bez hydrauliki • produkcja w Polsce
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Łuparki przekładniowe bez hydrauliki
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-200 sm:text-xl">
            Trwała i szybka alternatywa dla klasycznych łuparek
            hydraulicznych. Przeznaczona do drewna opałowego, polan
            sękatych, rozwidleń oraz niestandardowych kawałków drewna do
            około 40 cm średnicy i 50 cm długości.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-neutral-200">
            {features.map((item) => (
              <div
                key={item}
                className="rounded-full bg-white/10 px-4 py-2"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={allegroStoreLink}
              className="inline-flex rounded-2xl bg-red-600 px-7 py-4 text-base font-bold shadow-lg shadow-red-950/40 transition hover:bg-red-500"
            >
              Zobacz ofertę Allegro
            </a>

            <a
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-2xl bg-white/10 px-7 py-4 text-base font-bold transition hover:bg-white/20"
            >
              ▶ Zobacz testy na YouTube
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
    <div className="absolute inset-0 bg-black/60" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.45),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_30%)]" />

    <div className="relative z-10 mx-auto max-w-6xl">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          Dlaczego bez hydrauliki
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
          Mniej obsługi. Więcej pracy. Prostsza konstrukcja.
        </h2>

        <p className="mt-5 text-lg leading-relaxed text-neutral-300">
          Klasyczna hydraulika oznacza pompę, siłownik, olej, przewody i
          uszczelnienia. Łuparka przekładniowa wykorzystuje mechaniczny
          układ napędowy, który ogranicza liczbę elementów wymagających
          obsługi.
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
    <div className="absolute inset-0 bg-black/60" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.45),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_30%)]" />

    <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          Konstrukcja
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
          Przemysłowa konstrukcja rozwijana i kompletowana w Polsce.
        </h2>

        <p className="mt-5 text-lg leading-relaxed text-neutral-300">
          Łuparka została zaprojektowana z myślą o użytkownikach, którzy
          oczekują trwałości, prostoty obsługi oraz niskich kosztów
          eksploatacji bez klasycznej hydrauliki.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/45 p-7 shadow-2xl shadow-black/30 backdrop-blur-sm">
        <h3 className="mb-6 text-2xl font-black">Co wyróżnia konstrukcję</h3>

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
    <div className="absolute inset-0 bg-black/60" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.45),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_30%)]" />

    <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.2fr]">
      <div className="rounded-3xl bg-red-600/90 p-8 shadow-2xl shadow-red-950/30 backdrop-blur-sm lg:p-10">
        <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
          Łupanie drewna sękatego, rozwidleń i nieregularnych polan
        </h2>

        <p className="mt-5 text-lg leading-relaxed text-red-50">
          Pień, rozwidlenie, krzywe polano, nierówny klocek — przy takim
          materiale liczy się nie tylko siła, ale również stabilne
          ustawienie drewna, szybki cykl pracy i prosta mechanika.
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
          Parametry robocze zależą od wersji maszyny, konfiguracji napędu,
          gatunku drewna oraz jego wilgotności. W przypadku bardzo mokrego,
          włóknistego drewna lub rozwidleń zaleca się łupanie etapami, od
          krawędzi polana.
        </p>
      </div>
    </div>
  </section>

  <section
    className="relative bg-cover bg-center bg-fixed px-6 py-20"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    <div className="absolute inset-0 bg-black/60" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.45),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_30%)]" />

    <div className="relative z-10 mx-auto max-w-6xl">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          Dostępne wersje
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
          Wybierz zasilanie i wyposażenie do swojego gospodarstwa.
        </h2>

        <p className="mt-5 text-lg leading-relaxed text-neutral-300">
          Dostępne są warianty zasilania 230V i 400V oraz wersje z koszem
          roboczym lub bez kosza. Dzięki temu można dobrać maszynę do
          warunków pracy i posiadanej instalacji elektrycznej.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {versions.map((item) => (
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
    <div className="absolute inset-0 bg-black/60" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.45),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_30%)]" />

    <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
      <div className="rounded-3xl border border-white/10 bg-black/45 p-8 shadow-2xl shadow-black/30 backdrop-blur-sm lg:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          Filmy i testy
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
          Zobacz pracę łuparki na wideo.
        </h2>

        <p className="mt-5 text-lg leading-relaxed text-neutral-300">
          Na kanałach Polmech Tech publikujemy testy urządzeń, próby na
          różnych gatunkach drewna, rozwój konstrukcji oraz porównania z
          klasycznymi łuparkami hydraulicznymi.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-2xl bg-red-600 px-6 py-4 font-bold transition hover:bg-red-500"
          >
            ▶ YouTube Polmech Tech
          </a>

          <a
            href={tiktokLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-2xl bg-white/10 px-6 py-4 font-bold transition hover:bg-white/20"
          >
            ♬ TikTok @polmech.tech
          </a>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/45 p-8 shadow-2xl shadow-black/30 backdrop-blur-sm lg:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          Zakup
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
          Oferta dostępna online.
        </h2>

        <p className="mt-5 text-lg leading-relaxed text-neutral-300">
          Sprawdź aktualne wersje, ceny i dostępność w sklepie Allegro.
          W razie wątpliwości skontaktuj się przed zakupem, aby dobrać
          wariant do rodzaju drewna i intensywności pracy.
        </p>

        <div className="mt-8">
          <a
            href={allegroStoreLink}
            className="inline-flex rounded-2xl bg-red-600 px-7 py-4 text-base font-bold shadow-lg shadow-red-950/40 transition hover:bg-red-500"
          >
            Zobacz ofertę Allegro
          </a>
        </div>
      </div>
    </div>
  </section>

  <section
    className="relative bg-cover bg-center bg-fixed px-6 py-20"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    <div className="absolute inset-0 bg-black/60" />
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
              Dobór wersji do średnicy drewna, długości polan,
              zasilania 230V lub 400V oraz intensywności pracy.
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
    <div className="absolute inset-0 bg-black/80" />

    <div className="relative z-10 mx-auto flex max-w-6xl flex-col justify-between gap-4 text-sm text-neutral-400 sm:flex-row">
      <div>
        <span className="font-black text-white">polmech.tech</span> —
        łuparki przekładniowe do drewna opałowego bez hydrauliki
      </div>

      <div className="flex flex-wrap gap-4">
        <span>Polska gwarancja</span>
        <span>Serwis</span>
        <span>Wsparcie techniczne</span>
      </div>
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
