"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { categoryExplorer } from "@/data/home";
import { cn } from "@/lib/utils";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { SectionTransition } from "@/components/motion/SectionTransition";

export function VisualCategoryExplorer() {
  const [active, setActive] = useState(0);

  const current = categoryExplorer[active] ?? categoryExplorer[0];

  if (!current) {
    return null;
  }

  return (
    <SectionTransition
      variant="rounded-light"
      className="section-shell bg-brand-ivory !py-16 md:!py-20 lg:!py-24"
      data-nav-theme="light"
      aria-labelledby="category-explorer-heading"
    >
      <div className="section-inner">
        {/* Section heading */}
        <RevealGroup className="max-w-3xl" stagger={0.07} start="top 84%">
          <p className="small-label text-brand-sage">Find your direction</p>

          <h2
            id="category-explorer-heading"
            className="mt-4 text-balance font-display text-[2.75rem] leading-[0.97] text-brand-olive sm:text-6xl lg:text-[4.75rem]"
          >
            Browse by what <span className="block">you need.</span>
          </h2>
        </RevealGroup>

        {/* Category explorer */}
        <RevealGroup
          className="mt-8 grid gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch xl:gap-7"
          stagger={0.08}
          start="top 78%"
        >
          {/* Category navigation */}
          <div className="divide-y divide-brand-olive/10 overflow-hidden rounded-[24px] border border-brand-olive/10 bg-brand-white/55 px-4 sm:px-5">
            {categoryExplorer.map((item, index) => {
              const isActive = active === index;

              return (
                <Link
                  key={item.slug}
                  href={`/collections?filter=${encodeURIComponent(
                    item.filter,
                  )}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group grid min-h-16 grid-cols-[1.75rem_1fr_auto] items-center gap-3 py-4 transition duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-sage",
                    isActive
                      ? "text-brand-olive"
                      : "text-brand-olive/50 hover:text-brand-olive",
                  )}
                >
                  <span className="small-label text-brand-sage">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0">
                    <span className="block break-words font-display text-[1.55rem] leading-[1.08] sm:text-3xl lg:text-[2rem]">
                      {item.title}
                    </span>

                    <span
                      className={cn(
                        "grid transition-all duration-300",
                        isActive
                          ? "mt-2 grid-rows-[1fr] opacity-70"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <span className="overflow-hidden">
                        <span className="block max-w-md pb-1 text-sm leading-5">
                          {item.description}
                        </span>
                      </span>
                    </span>
                  </span>

                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className={cn(
                      "shrink-0 transition duration-300",
                      isActive && "-translate-y-0.5 translate-x-0.5",
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* Active category image */}
          <div className="relative h-[21rem] overflow-hidden rounded-[24px] bg-brand-paper shadow-paper sm:h-[28rem] sm:rounded-[26px] lg:h-auto lg:min-h-[30rem]">
            {categoryExplorer.map((item, index) => {
              const isActive = active === index;

              return (
                <Image
                  key={item.slug}
                  src={item.image}
                  alt={isActive ? `${item.title} category preview` : ""}
                  fill
                  priority={index === 0}
                  aria-hidden={!isActive}
                  className={cn(
                    "object-cover transition duration-700",
                    isActive
                      ? "scale-100 opacity-100"
                      : "pointer-events-none scale-[1.025] opacity-0",
                  )}
                  sizes="(max-width: 1024px) 100vw, 56vw"
                />
              );
            })}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-olive/85 via-brand-olive/5 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 pt-24 text-brand-white sm:p-7 sm:pt-28">
              <p className="small-label text-brand-ivory/65">
                Category {String(active + 1).padStart(2, "0")}
              </p>

              <h3 className="mt-2 max-w-[90%] break-words font-display text-3xl leading-[0.98] sm:text-5xl">
                {current.title}
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-6 text-brand-white/75 sm:text-base">
                {current.description}
              </p>
            </div>
          </div>
        </RevealGroup>
      </div>
    </SectionTransition>
  );
}
