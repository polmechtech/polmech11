"use client";

import { useEffect, useState } from "react";

type Consent = "accepted" | "rejected";

const STORAGE_KEY = "polmech_cookie_consent";

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Consent | null;
    if (saved === "accepted" || saved === "rejected") setConsent(saved);
  }, []);

  function save(value: Consent) {
    window.localStorage.setItem(STORAGE_KEY, value);
    document.cookie = `polmech_cookie_consent=${value}; Path=/; Max-Age=31536000; SameSite=Lax`;
    setConsent(value);
    setSettingsOpen(false);
  }

  if (consent && !settingsOpen) {
    return (
      <button
        type="button"
        onClick={() => setSettingsOpen(true)}
        className="fixed bottom-4 right-24 z-[80] rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-bold text-neutral-800 shadow-lg transition hover:border-red-500 hover:text-red-600"
      >
        Ustawienia cookies
      </button>
    );
  }

  return (
    <aside
      role="dialog"
      aria-label="Ustawienia plików cookies"
      className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-5 text-neutral-900 shadow-2xl md:inset-x-auto md:left-1/2 md:w-[min(760px,calc(100vw-2rem))] md:-translate-x-1/2 md:p-7"
    >
      <h2 className="text-xl font-black">Pliki cookies</h2>
      <p className="mt-3 text-sm leading-6 text-neutral-700">
        Używamy niezbędnych plików cookies, aby strona, koszyk i zamówienia działały prawidłowo.
        Analityczne pliki cookies włączymy tylko po Twojej zgodzie. Szczegóły znajdziesz w{" "}
        <a className="font-bold underline" href="/o-nas">informacjach o firmie i prywatności</a>.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => save("rejected")}
          className="rounded-2xl border border-neutral-300 px-5 py-3 text-sm font-bold transition hover:border-red-500 hover:text-red-600"
        >
          Odrzuć analityczne
        </button>
        <button
          type="button"
          onClick={() => save("accepted")}
          className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-500"
        >
          Akceptuję analityczne
        </button>
      </div>
    </aside>
  );
}
