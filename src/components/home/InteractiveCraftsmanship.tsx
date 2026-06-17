"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { craftsmanshipItems } from "@/data/home";
import { cn } from "@/lib/utils";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { SectionTransition } from "@/components/motion/SectionTransition";

export function InteractiveCraftsmanship() {
  const [active, setActive] = useState(0);

  const item = craftsmanshipItems[active] ?? craftsmanshipItems[0];

  if (!item) {
    return null;
  }

  return (
    <SectionTransition
      variant="rounded-dark"
      className="section-shell bg-brand-olive !pb-16 !pt-24 text-brand-ivory sm:!pb-20 md:!pt-40 lg:!pb-24 lg:!pt-44"
      data-nav-theme="dark"
      aria-labelledby="craftsmanship-heading"
    >
      <div className="section-inner">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center xl:gap-12">
          {/* Selected craftsmanship image */}
          <ImageReveal className="relative h-[22rem] rounded-[24px] bg-brand-olive/50 sm:h-[30rem] sm:rounded-[26px] lg:h-[34rem]">
            <Image
              key={item.image}
              src={item.image}
              alt={`${item.title} craftsmanship detail`}
              fill
              priority={active === 0}
              className="object-cover transition duration-700"
              sizes="(max-width: 1024px) 100vw, 52vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-brand-olive/90 via-brand-olive/10 to-transparent" />

            <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
              <p className="small-label text-brand-champagne">
                Selected detail
              </p>

              <h3 className="mt-2 max-w-[90%] font-display text-3xl leading-[0.95] sm:text-4xl lg:text-[2.7rem]">
                {item.title}
              </h3>
            </div>
          </ImageReveal>

          {/* Craftsmanship content */}
          <RevealGroup className="lg:py-2" stagger={0.07} start="top 80%">
            <p className="small-label text-brand-champagne">Craftsmanship</p>

            <h2
              id="craftsmanship-heading"
              className="mt-4 max-w-2xl text-balance font-display text-[2.75rem] leading-[0.97] sm:text-6xl lg:text-[4rem] xl:text-[4.5rem]"
            >
              Look closer. <span className="block">Every detail matters.</span>
            </h2>

            <div
              className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2"
              role="tablist"
              aria-label="Craftsmanship details"
            >
              {craftsmanshipItems.map((craft, index) => {
                const isActive = active === index;

                const isLastOddItem =
                  craftsmanshipItems.length % 2 !== 0 &&
                  index === craftsmanshipItems.length - 1;

                return (
                  <button
                    key={craft.slug}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="craftsmanship-detail"
                    onClick={() => setActive(index)}
                    className={cn(
                      "min-h-[5.75rem] rounded-2xl border px-4 py-3 text-left transition duration-300 sm:min-h-[7.5rem]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-brand-olive",
                      isLastOddItem && "sm:col-span-2",
                      isActive
                        ? "border-brand-champagne bg-brand-ivory/12"
                        : "border-brand-ivory/15 bg-brand-ivory/[0.035] hover:border-brand-ivory/30 hover:bg-brand-ivory/[0.07]",
                    )}
                  >
                    <span className="small-label text-brand-champagne">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="mt-1.5 block break-words font-display text-[1.35rem] leading-[1.08] sm:text-2xl lg:text-[1.55rem]">
                      {craft.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div id="craftsmanship-detail" role="tabpanel" className="mt-5">
              <p className="max-w-xl text-base leading-7 text-brand-ivory/70">
                {item.description}
              </p>
            </div>

            <Link
              href="/our-craft"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-ivory px-5 py-3 text-sm font-bold text-brand-olive transition duration-300 hover:bg-brand-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-brand-olive"
            >
              Explore our craft
            </Link>
          </RevealGroup>
        </div>
      </div>
    </SectionTransition>
  );
}
