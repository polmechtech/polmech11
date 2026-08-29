export default function AboutCompanyBlock() {
  return (
    <section className="bg-neutral-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-black/40 p-7 md:p-10">
        <p className="text-sm font-bold tracking-[0.2em] text-red-500">PolMech.Tech</p>
        <h2 className="mt-3 text-3xl font-black">O firmie i kontakt</h2>
        <p className="mt-5 max-w-4xl text-lg leading-relaxed text-neutral-300">
          PolMech.Tech jest polskim producentem mechanicznych łuparek reduktorowych i przekładniowych do drewna opałowego. Konstrukcje są rozwijane i kompletowane w Polsce, a gwarancja, serwis oraz części zamienne są obsługiwane w Polsce.
        </p>
        <a
          href="/o-nas"
          className="mt-7 inline-flex rounded-2xl bg-red-600 px-6 py-3 font-black transition hover:bg-red-500"
        >
          O firmie i kontakt →
        </a>
      </div>
    </section>
  );
}
