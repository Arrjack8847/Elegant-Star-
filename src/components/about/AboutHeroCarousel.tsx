"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type AboutHeroSlide = {
  src: string;
  alt: string;
  caption: string;
};

export function AboutHeroCarousel({
  slides,
}: {
  slides: readonly AboutHeroSlide[];
}) {
  const [active, setActive] = useState(0);
  const slide = slides[active] ?? slides[0];
  const hasMultipleSlides = slides.length > 1;

  function showPrevious() {
    setActive((current) => (current - 1 + slides.length) % slides.length);
  }

  function showNext() {
    setActive((current) => (current + 1) % slides.length);
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.5rem]",
        "border border-brand-olive/10 bg-brand-paper",
        "shadow-[0_26px_68px_rgba(48,50,41,0.13)]",
        "sm:rounded-[1.9rem]",
      )}
    >
      <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/11]">
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={active === 0}
          className="object-cover transition duration-500 motion-reduce:transition-none"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 56vw, 680px"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-olive/42 via-brand-olive/4 to-transparent"
        />

        <p className="absolute bottom-4 left-4 max-w-[15rem] rounded-full border border-brand-white/20 bg-brand-olive/58 px-4 py-2 text-[0.68rem] font-bold uppercase leading-5 tracking-[0.14em] text-brand-white shadow-[0_12px_30px_rgba(22,25,18,0.18)] backdrop-blur-md sm:bottom-5 sm:left-5">
          {slide.caption}
        </p>
      </div>

      {hasMultipleSlides ? (
        <div className="absolute right-3 top-3 flex gap-2 sm:right-4 sm:top-4">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Show previous showroom image"
            className="inline-flex size-11 items-center justify-center rounded-full border border-brand-white/35 bg-brand-white/78 text-brand-olive shadow-[0_10px_24px_rgba(22,25,18,0.12)] transition hover:bg-brand-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-champagne"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={showNext}
            aria-label="Show next showroom image"
            className="inline-flex size-11 items-center justify-center rounded-full border border-brand-white/35 bg-brand-white/78 text-brand-olive shadow-[0_10px_24px_rgba(22,25,18,0.12)] transition hover:bg-brand-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-champagne"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
