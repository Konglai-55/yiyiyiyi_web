"use client";

import { useEffect, useState } from "react";

type ActiveImage = { src: string; alt: string };

export default function ImageLightbox() {
  const [active, setActive] = useState<ActiveImage | null>(null);

  useEffect(() => {
    const openFromImage = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const image = target?.closest<HTMLImageElement>("img[data-lightbox]");
      if (!image) return;
      setActive({ src: image.currentSrc || image.src, alt: image.alt });
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };

    document.addEventListener("click", openFromImage);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("click", openFromImage);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="image-lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="图片大图预览"
      onClick={(event) => {
        if (event.currentTarget === event.target) setActive(null);
      }}
    >
      <div className="image-lightbox-dialog">
        <button className="image-lightbox-close" type="button" aria-label="关闭大图" onClick={() => setActive(null)}>×</button>
        <img src={active.src} alt={active.alt} />
      </div>
    </div>
  );
}
