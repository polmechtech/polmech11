"use client";

import { useEffect, useState } from "react";

type HoverZoomImageProps = {
  src: string;
  alt: string;
  imageClassName?: string;
  frameClassName?: string;
  loading?: "lazy" | "eager";
};

export default function HoverZoomImage({
  src,
  alt,
  imageClassName = "max-h-full max-w-full object-contain",
  frameClassName = "",
  loading = "lazy",
}: HoverZoomImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <span className={`relative flex h-full w-full items-center justify-center ${frameClassName}`}>
      <button type="button" onClick={() => setOpen(true)} aria-label={`Powiększ zdjęcie: ${alt}`} className="flex h-full w-full cursor-zoom-in items-center justify-center">
        <img src={src} alt={alt} loading={loading} className={imageClassName} />
      </button>
      {open && (
        <button type="button" onClick={() => setOpen(false)} aria-label="Zamknij powiększenie zdjęcia" className="fixed inset-0 z-[9999] flex cursor-zoom-out items-center justify-center bg-black/95 p-[2vw]">
          <img src={src} alt={alt} className="max-h-[94vh] max-w-[96vw] object-contain" />
          <span className="absolute right-5 top-4 rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white">✕ Zamknij</span>
        </button>
      )}
    </span>
  );
}
