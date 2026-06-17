"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";

import { galleryPreviewItems } from "@/data/home";
import { cn } from "@/lib/utils";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { SectionTransition } from "@/components/motion/SectionTransition";

const filters = ["All", "Collections", "Stories"] as const;

type GalleryFilter = (typeof filters)[number];

type GalleryPreviewItem = (typeof galleryPreviewItems)[number] & {
  objectPosition?: CSSProperties["objectPosition"];
};

const galleryItems = galleryPreviewItems as readonly GalleryPreviewItem[];

function getCardLayout(index: number, total: number) {
  const base =
    "min-h-[18rem] min-[390px]:min-h-[21rem] sm:min-h-[23rem] lg:min-h-0 lg:row-span-2";

  if (total === 1) {
    return cn(base, "sm:col-span-2 lg:col-span-12");
  }

  if (total === 2) {
    return cn(base, "lg:col-span-6");
  }

  if (total === 3) {
    if (index === 0) {
      return cn(base, "sm:col-span-2 lg:col-span-6");
    }

    return cn(base, "lg:col-span-3");
  }

  if (total === 4) {
    return cn(base, "lg:col-span-6");
  }

  if (index === 0) {
    return cn(base, "sm:col-span-2 lg:col-span-6");
  }

  if (index === 1 || index === 2) {
    return cn(base, "lg:col-span-3");
  }

  return cn(base, "lg:col-span-4");
}

function getImageSizes(index: number, total: number) {
  const isWide = total <= 2 || index === 0 || (total === 4 && index <= 3);

  if (isWide) {
    return "(max-width: 639px) 100vw, (max-width: 1023px) 100vw, 50vw";
  }

  return "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 30vw";
}

export function DynamicGalleryPreview() {
  const [filter, setFilter] = useState<GalleryFilter>("All");

  const items = useMemo(() => {
    if (filter === "All") {
      return galleryItems;
    }

    return galleryItems.filter((item) => item.filter === filter);
  }, [filter]);

  return (
    <SectionTransition
      variant="quiet"
      id="gallery-preview"
      className={cn(
        "section-shell scroll-mt-[8.5rem] overflow-x-clip",
        "bg-brand-white/45",
        "!pb-20 !pt-32",
        "sm:!pb-24 sm:!pt-36",
        "lg:!pb-24 lg:!pt-32",
      )}
      data-nav-theme="light"
      aria-labelledby="gallery-preview-heading"
    >
      <div className="section-inner">
        {/* Heading and filters */}
        <RevealGroup
          stagger={0.08}
          start="top 84%"
          className={cn(
            "flex flex-col gap-8",
            "lg:flex-row lg:items-end",
            "lg:justify-between lg:gap-12",
          )}
        >
          <div className="max-w-[49rem]">
            <p className="small-label text-brand-sage">Albums &amp; Gallery</p>

            <h2
              id="gallery-preview-heading"
              className={cn(
                "mt-4 text-balance font-display font-normal",
                "text-[2.75rem] leading-[0.96]",
                "text-brand-olive",
                "sm:text-[4rem]",
                "lg:text-[4.6rem]",
                "xl:text-[5rem]",
              )}
            >
              Browse the library{" "}
              <span className="block">as visual stories.</span>
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter gallery preview"
            className={cn(
              "no-scrollbar flex max-w-full gap-2",
              "overflow-x-auto pb-1",
              "lg:shrink-0 lg:justify-end",
            )}
          >
            {filters.map((item) => {
              const isActive = filter === item;

              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls="gallery-preview-grid"
                  onClick={() => setFilter(item)}
                  className={cn(
                    "shrink-0 rounded-full border",
                    "min-h-11 px-5 py-3",
                    "text-sm font-bold",
                    "transition-[background-color,border-color,color,transform]",
                    "duration-300",
                    "hover:-translate-y-0.5",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-brand-sage",
                    "focus-visible:ring-offset-4",
                    "focus-visible:ring-offset-brand-white",
                    isActive
                      ? cn(
                          "border-brand-olive",
                          "bg-brand-olive",
                          "text-brand-white",
                          "shadow-[0_10px_24px_rgba(48,50,41,0.14)]",
                        )
                      : cn(
                          "border-brand-olive/10",
                          "bg-brand-white/45",
                          "text-brand-olive/72",
                          "hover:border-brand-olive/20",
                          "hover:bg-brand-white",
                          "hover:text-brand-olive",
                        ),
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </RevealGroup>

        <p className="sr-only" aria-live="polite">
          Showing {items.length} {items.length === 1 ? "item" : "items"}.
        </p>

        {/* Editorial gallery grid */}
        <RevealGroup
          key={filter}
          id="gallery-preview-grid"
          stagger={0.06}
          start="top 78%"
          className={cn(
            "mt-10 grid grid-cols-1 gap-4",
            "sm:grid-cols-2",
            "lg:mt-12 lg:grid-flow-row-dense",
            "lg:grid-cols-12",
            "lg:auto-rows-[11.5rem]",
            "xl:auto-rows-[12.5rem]",
          )}
        >
          {items.map((item, index) => {
            const objectPosition = item.objectPosition ?? "center";

            return (
              <Link
                key={`${filter}-${item.href}-${item.title}`}
                href={item.href}
                aria-label={`Open ${item.title}`}
                className={cn(
                  "group relative isolate overflow-hidden",
                  "rounded-[1.35rem]",
                  "bg-brand-paper",
                  "shadow-[0_18px_44px_rgba(48,50,41,0.10)]",
                  "transition-[transform,box-shadow]",
                  "duration-500",
                  "ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "hover:-translate-y-1",
                  "hover:shadow-[0_26px_60px_rgba(48,50,41,0.16)]",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-brand-champagne",
                  "focus-visible:ring-offset-4",
                  "focus-visible:ring-offset-brand-white",
                  getCardLayout(index, items.length),
                )}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={filter === "All" && index === 0}
                  className={cn(
                    "object-cover",
                    "transition-transform duration-700",
                    "ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "group-hover:scale-[1.035]",
                    "motion-reduce:transition-none",
                  )}
                  style={{ objectPosition }}
                  sizes={getImageSizes(index, items.length)}
                />

                {/* Subtle readability treatment */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0",
                    "bg-gradient-to-t",
                    "from-brand-olive/90",
                    "via-brand-olive/[0.08]",
                    "via-55%",
                    "to-transparent",
                    "to-78%",
                  )}
                />

                {/* Card information */}
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0",
                    "z-10 p-5 text-brand-white",
                    "sm:p-6",
                  )}
                >
                  <p className="small-label text-brand-champagne">
                    {item.type}
                  </p>

                  <div className="mt-2 flex items-end justify-between gap-5">
                    <h3
                      className={cn(
                        "max-w-[88%] font-display",
                        "text-[1.8rem] leading-[0.98]",
                        "sm:text-[2.2rem]",
                        index === 0 && items.length >= 3
                          ? "lg:text-[3rem]"
                          : "lg:text-[2.35rem]",
                      )}
                    >
                      {item.title}
                    </h3>

                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0",
                        "items-center justify-center",
                        "rounded-full",
                        "border border-brand-white/30",
                        "bg-brand-white/10",
                        "opacity-70",
                        "backdrop-blur-sm",
                        "transition-[transform,opacity,background-color]",
                        "duration-300",
                        "group-hover:-translate-y-0.5",
                        "group-hover:translate-x-0.5",
                        "group-hover:bg-brand-white/18",
                        "group-hover:opacity-100",
                      )}
                    >
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </span>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0",
                    "rounded-[inherit]",
                    "ring-1 ring-inset",
                    "ring-brand-white/20",
                  )}
                />
              </Link>
            );
          })}
        </RevealGroup>

        {/* Complete gallery CTA */}
        <div className={cn("mt-9 flex justify-center", "sm:mt-10")}>
          <Link
            href="/gallery"
            className={cn(
              "group inline-flex items-center gap-3",
              "rounded-full",
              "border border-brand-olive",
              "bg-brand-olive",
              "px-6 py-3.5",
              "text-sm font-bold text-brand-white",
              "shadow-[0_12px_28px_rgba(48,50,41,0.14)]",
              "transition-[transform,background-color,box-shadow]",
              "duration-300",
              "hover:-translate-y-0.5",
              "hover:bg-brand-olive/92",
              "hover:shadow-[0_18px_38px_rgba(48,50,41,0.18)]",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-brand-champagne",
              "focus-visible:ring-offset-4",
              "focus-visible:ring-offset-brand-white",
            )}
          >
            Open the complete gallery
            <ArrowUpRight
              size={17}
              aria-hidden="true"
              className={cn(
                "transition-transform duration-300",
                "group-hover:-translate-y-0.5",
                "group-hover:translate-x-0.5",
              )}
            />
          </Link>
        </div>
      </div>
    </SectionTransition>
  );
}
