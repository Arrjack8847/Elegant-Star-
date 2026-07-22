import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  AboutHeroCarousel,
  type AboutHeroSlide,
} from "@/components/about/AboutHeroCarousel";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { cn } from "@/lib/utils";

export function AboutHero({
  intro,
  supportingCopy,
  slides,
}: {
  intro: string;
  supportingCopy: string;
  slides: readonly AboutHeroSlide[];
}) {
  return (
    <section
      className="relative overflow-hidden pb-16 pt-[calc(7rem+env(safe-area-inset-top))] sm:pb-20 sm:pt-[calc(8rem+env(safe-area-inset-top))] lg:pb-24 lg:pt-[calc(8.25rem+env(safe-area-inset-top))]"
      data-nav-theme="light"
      aria-labelledby="about-page-heading"
    >
      <div className="section-inner">
        <RevealGroup
          className={cn(
            "grid min-w-0 gap-9",
            "lg:grid-cols-[minmax(0,0.82fr)_minmax(31rem,1.18fr)]",
            "lg:items-center lg:gap-12 xl:gap-16",
          )}
          stagger={0.07}
          start="top 86%"
        >
          <div className="min-w-0">
            <p className="small-label text-brand-sage">Our story</p>

            <h1
              id="about-page-heading"
              className={cn(
                "mt-5 max-w-[10.5ch] font-display font-normal",
                "text-[2.85rem] leading-[0.94] text-brand-olive",
                "min-[390px]:text-[3.15rem]",
                "sm:text-[4.15rem]",
                "lg:text-[4.65rem] xl:text-[5rem]",
              )}
            >
              The celebration begins before the day itself.
            </h1>

            <p className="body-copy mt-6 max-w-[36rem] text-base leading-8">
              {intro}
            </p>

            <p className="mt-5 max-w-[35rem] font-display text-[1.4rem] leading-[1.2] text-brand-olive/88 sm:text-[1.75rem]">
              {supportingCopy}
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center">
              <Link
                href="/collections"
                className={cn(
                  "group inline-flex min-h-11 items-center gap-3 rounded-full",
                  "bg-brand-olive px-5 py-3 text-sm font-bold text-brand-white",
                  "shadow-[0_16px_36px_rgba(48,50,41,0.16)]",
                  "transition hover:-translate-y-0.5 hover:bg-[#3f4236]",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-brand-champagne focus-visible:ring-offset-4",
                  "focus-visible:ring-offset-brand-ivory",
                )}
              >
                Explore collections
                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="/contact#showroom-location"
                className={cn(
                  "group inline-flex min-h-11 items-center gap-2",
                  "border-b border-brand-sage/45 text-sm font-bold",
                  "text-brand-olive transition hover:border-brand-olive",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-brand-sage",
                )}
              >
                Visit our studio
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          <AboutHeroCarousel slides={slides} />
        </RevealGroup>
      </div>
    </section>
  );
}
