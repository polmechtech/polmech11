import { BrandName } from "@/components/BrandText";
const whatsappNumber = "+48512077770";
const whatsappLink = "https://wa.me/48512077770";
const allegroStoreLink = "https://allegro.pl/uzytkownik/TRENDECO";
const youtubeLink = "https://www.youtube.com/channel/UC4JFZ5O7apa9umyye9Ixaaw";
const tiktokLink = "https://www.tiktok.com/@polmech.tech";
const backgroundImage = "/wood-splitter-bg.jpg";

export default function Page() {
  const benefits = [
    ["⚙", "Napęd przekładniowy", "bez pompy, siłownika i przewodów hydraulicznych"],
    ["◆", "Silnik PROMOTOR", "polski producent • 3 kW • 400 V"],
    ["◴", "Wysoka wydajność", "≈ 19 kontaktów klina/min • do 5–6 m³/h"],
    ["✓", "Prosta obsługa", "mniej elementów wymagających serwisu"],
    ["◇", "Solidna konstrukcja", "do intensywnej pracy z drewnem opałowym"],
  ];

  return (
    <main className="min-h-screen bg-[#07100d] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[#07100d]">
        <div className="absolute inset-0 bg-cover bg-center opacity-45" style={{ backgroundImage: `url(${backgroundImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06100d] via-[#07100de8] to-[#07100d80]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <header className="flex min-h-20 items-center justify-between gap-6 border-b border-white/10">
            <a href="/" className="text-2xl font-black tracking-tight text-white"><BrandName /><span className="block text-[10px] font-bold tracking-[.22em] text-neutral-400">MASZYNY DLA WYMAGAJĄCYCH</span></a>
            <nav className="hidden gap-7 text-sm font-semibold lg:flex">
              <a className="text-[#76e86f]" href="/">Strona główna</a><a href="#luparki">Łuparki</a><a href="#technologia">Jak to działa</a><a href="#zalety">Zalety</a><a href={youtubeLink} target="_blank" rel="noopener noreferrer" aria-label="YouTube POLMECH.TECH" title="YouTube" className="inline-flex items-center justify-center"><svg viewBox="0 0 28 20" width="29" height="21" role="img" aria-hidden="true"><rect x="0" y="0" width="28" height="20" rx="5" fill="#FF0033" /><path d="M12 5.3 20 10l-8 4.7Z" fill="#fff" /></svg></a><a href="/o-nas">O nas</a>
            </nav>
            <a href={whatsappLink} className="rounded-lg bg-[#65df68] px-5 py-3 text-sm font-black text-[#07100d]">Zapytaj o ofertę</a>
          </header>

          <div className="grid min-h-[620px] items-center gap-10 py-16 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <p className="mb-5 text-sm font-black uppercase tracking-[.16em] text-[#70e66b]">Mechaniczne łuparki do drewna</p>
              <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">Większa wydajność.<br/>Prostsza konstrukcja.<br/><span className="text-[#69e164]">Mechanicznie.</span></h1>
              <p className="mt-7 max-w-2xl text-lg text-neutral-200">Łuparka mechaniczna przekładniowa <BrandName /> do ciężkiej, powtarzalnej pracy. Bez układu hydraulicznego.</p>
              <div className="mt-8 grid max-w-2xl grid-cols-2 gap-5 sm:grid-cols-4">
                <div><b className="text-2xl">3 kW</b><span className="block text-sm text-neutral-300">PROMOTOR</span></div>
                <div><b className="text-2xl">400 V</b><span className="block text-sm text-neutral-300">3-fazowy</span></div>
                <div><b className="text-2xl">≈ 19</b><span className="block text-sm text-neutral-300">kontaktów/min</span></div>
                <div><b className="text-2xl">5–6 m³/h</b><span className="block text-sm text-neutral-300">wg naszych testów</span></div>
              </div>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="/kategoria/luparka-przekladniowa" className="rounded-lg bg-[#68df69] px-7 py-4 font-black text-[#07100d]">Zobacz łuparki →</a>
                <a href={youtubeLink} className="rounded-lg border border-white/40 bg-black/20 px-7 py-4 font-bold">▶ Zobacz jak działa</a>
              </div>
            </div>
            <div id="luparki" className="rounded-[2rem] border border-white/10 bg-black/35 p-7 shadow-2xl backdrop-blur-sm">
              <div className="rounded-2xl bg-white p-5 text-[#101715]">
                <p className="text-xs font-black uppercase tracking-[.18em] text-neutral-500">Napęd 400 V</p>
                <h2 className="mt-2 text-3xl font-black">PROMOTOR MS 100L2-4</h2>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-neutral-100 p-4"><b className="block text-xl">3 kW</b>50 Hz</div>
                  <div className="rounded-xl bg-neutral-100 p-4"><b className="block text-xl">1430 obr/min</b>prędkość znamionowa</div>
                  <div className="rounded-xl bg-neutral-100 p-4"><b className="block text-xl">400 V Y</b>zasilanie trójfazowe</div>
                  <div className="rounded-xl bg-neutral-100 p-4"><b className="block text-xl">IP55</b>klasa ochrony</div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-neutral-600">Po testach wersji jednofazowej skoncentrowaliśmy gotowe łuparki na napędzie trójfazowym 400 V. Silnik PROMOTOR: 3 kW, 230/400 V Δ/Y; w maszynie zasilany z sieci 400 V.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="zalety" className="border-b border-white/10 bg-[#091713]">
        <div className="mx-auto grid max-w-7xl gap-px md:grid-cols-5">
          {benefits.map(([icon,title,text]) => <div key={title} className="p-7"><span className="text-3xl text-[#6ee268]">{icon}</span><h3 className="mt-3 font-black">{title}</h3><p className="mt-2 text-sm leading-relaxed text-neutral-400">{text}</p></div>)}
        </div>
      </section>

      <section id="dobor-mocy" className="border-b border-white/10 bg-[#101d18] px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[.18em] text-[#65df68]">Dobór silnika do reduktora JZQ250</p>
          <h2 className="mt-3 max-w-5xl text-3xl font-black leading-tight sm:text-5xl">Więcej kilowatów nie oznacza lepszej łuparki</h2>
          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 text-lg leading-8 text-neutral-300">
              <p>Dla reduktora JZQ250 tej wielkości rekomendujemy silnik 3–4 kW / 400 V ze względu na gabaryty i obciążalność samej przekładni. Gotowa łuparka <BrandName /> ma silnik 3 kW / 400 V, wybrany po testach. Samo zwiększenie mocy silnika nie zapewni proporcjonalnie większej siły skutecznego rozłupywania drewna: ograniczeniem pozostają geometria klina, przełożenie i wytrzymałość napędu. Mocniejszy silnik zwiększy za to moment dostępny podczas przeciążenia, który muszą przenieść pasy, wały i koła zębate.</p>
              <p>Przy normalnym rozłupywaniu włókna drewna stopniowo ustępują, przez co obciążenie może narastać i opadać w trakcie ruchu klina. Gdy pod klin trafi nieodkształcalny przedmiot — na przykład metalowy łom — nastąpi gwałtowne zablokowanie mechanizmu. Taki udar może wytworzyć chwilowe obciążenia znacznie wyższe od momentu roboczego i uszkodzić zęby przekładni, wały lub inne elementy.</p>
            </div>
            <div className="rounded-3xl border border-amber-300/25 bg-amber-200/10 p-7">
              <h3 className="text-2xl font-black text-amber-200">Dlaczego nie zalecamy przewymiarowania napędu?</h3>
              <p className="mt-4 leading-8 text-neutral-200">Silnik o mocy powyżej 4 kW można technicznie rozważać w indywidualnym projekcie, lecz samo zwiększenie mocy nie poprawia geometrii ani przełożenia reduktora. Może podnieść koszt i pobór energii przy cięższym obciążeniu oraz zwiększyć energię i moment dostępne w sytuacji zakleszczenia. Ryzyko uszkodzenia przekładni rośnie szczególnie wtedy, gdy brakuje właściwie dobranego ograniczenia momentu.</p>
              <p className="mt-4 leading-8 text-neutral-200">Ochronę należy oprzeć na obliczeniu obciążeń, doborze silnika, nastaw zabezpieczeń i — gdy wymaga tego projekt — sprzęgle przeciążeniowym lub innym skutecznym ograniczniku momentu. Sam silnik 3–4 kW ani zwykły przełącznik START/STOP nie zapewniają ochrony przed mechanicznym udarem.</p>
              <p className="mt-5 font-bold text-[#9aee96]">Rekomendacja <BrandName /> dla reduktora JZQ250 tej wielkości: optymalna moc silnika 3–4 kW / 400 V. W gotowej łuparce stosujemy 3 kW; przy własnym projekcie należy dodatkowo zweryfikować obciążenia i zabezpieczenia całego napędu.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="technologia" className="bg-[#f4f6f4] px-6 py-20 text-[#0c1713]">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[.15em] text-green-600">Do drewna opałowego</p>
            <h2 className="mt-4 text-5xl font-black tracking-tight">Mechanicznie znaczy prościej</h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">Zamiast pompy, siłownika, przewodów i układu olejowego — przekładnia mechaniczna i silnik 400 V. Konstrukcja została pomyślana do szybkiej, powtarzalnej pracy.</p>
            <div className="mt-7 space-y-3 font-semibold">
              <p>✓ brak układu hydraulicznego i wycieków oleju</p>
              <p>✓ szybki, powtarzalny cykl pracy</p>
              <p>✓ drewno do ok. Ø 40 cm i długości do 50 cm</p>
              <p>✓ polski silnik PROMOTOR 3 kW / 400 V</p>
              <p>✓ części i wsparcie techniczne w Polsce</p>
            </div>
            <a href={tiktokLink} className="mt-9 inline-flex rounded-lg bg-[#65df68] px-7 py-4 font-black">Zobacz maszynę w pracy →</a>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="min-h-80 rounded-3xl bg-cover bg-center shadow-xl sm:row-span-2" style={{ backgroundImage: `url(${backgroundImage})` }} />
            <div className="rounded-3xl bg-white p-7 shadow-sm"><h3 className="text-2xl font-black">Dlaczego mechaniczna?</h3><div className="mt-5 space-y-4 text-neutral-700"><p>✓ Brak pompy hydraulicznej</p><p>✓ Brak siłownika i przewodów</p><p>✓ Stabilna, powtarzalna praca</p><p>✓ Prostsza obsługa serwisowa</p><p>✓ Napęd 400 V</p></div></div>
            <div className="rounded-3xl bg-[#0a1713] p-7 text-white"><p className="text-sm text-[#6ee268]"><BrandName /></p><h3 className="mt-2 text-2xl font-black">Siła w prostocie.</h3><p className="mt-3 text-neutral-400">Mechaniczna łuparka przekładniowa do drewna opałowego.</p></div>
          </div>
        </div>
      </section>

      <footer className="bg-[#07100d] px-6 py-10"><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 text-sm text-neutral-400"><b className="text-white"><BrandName /></b><span>WhatsApp / tel. {whatsappNumber}</span><span>Polska gwarancja • serwis • części</span></div></footer>
      <a href={whatsappLink} aria-label="WhatsApp" className="fixed bottom-5 right-5 z-50 rounded-full bg-[#61dc69] px-5 py-4 text-xl font-black text-black shadow-xl">☎</a>
    </main>
  );
}
