"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { ArrowUpRight } from "lucide-react";

import { RevealGroup } from "@/components/motion/RevealGroup";
import { SectionTransition } from "@/components/motion/SectionTransition";
import { galleryPreviewItems } from "@/data/home";
import { cn } from "@/lib/utils";

const filters = ["All", "Collections", "Stories"] as const;

type GalleryFilter = (typeof filters)[number];

type GalleryPreviewItem = (typeof galleryPreviewItems)[number] & {
  objectPosition?: CSSProperties["objectPosition"];
};

const galleryItems =
  galleryPreviewItems as readonly GalleryPreviewItem[];

/**
 * Responsive gallery card layout.
 *
 * Mobile:
 * - One column
 * - Reduced card height to avoid an excessively long page
 *
 * Tablet:
 * - Two columns
 *
 * Desktop:
 * - Twelve-column editorial grid
 */
function getCardLayout(index: number, total: number) {
  const base = cn(
    "h-[19.5rem] min-w-0",
    "min-[390px]:h-[21rem]",
    "sm:h-[22rem]",
    "lg:h-auto lg:min-h-0 lg:row-span-2",
  );

  if (total === 1) {
    return cn(
      base,
      "h-[22rem] min-[390px]:h-[24rem]",
      "sm:col-span-2 sm:h-[28rem]",
      "lg:col-span-12 lg:h-auto",
    );
  }

  if (total === 2) {
    return cn(
      base,
      "h-[21rem] min-[390px]:h-[22rem]",
      "lg:col-span-6 lg:h-auto",
    );
  }

  if (total === 3) {
    if (index === 0) {
      return cn(
        base,
        "h-[22rem] min-[390px]:h-[23rem]",
        "sm:col-span-2 sm:h-[26rem]",
        "lg:col-span-6 lg:h-auto",
      );
    }

    return cn(base, "lg:col-span-3");
  }

  if (total === 4) {
    return cn(base, "lg:col-span-6");
  }

  if (index === 0) {
    return cn(
      base,
      "h-[22rem] min-[390px]:h-[23rem]",
      "sm:col-span-2 sm:h-[26rem]",
      "lg:col-span-6 lg:h-auto",
    );
  }

  if (index === 1 || index === 2) {
    return cn(base, "lg:col-span-3");
  }

  return cn(base, "lg:col-span-4");
}

/**
 * Responsive Next.js image sizes.
 *
 * The mobile calculation accounts for the section's horizontal padding,
 * preventing unnecessarily large image downloads.
 */
function getImageSizes(index: number, total: number) {
  const mobile = "(max-width: 639px) calc(100vw - 2.5rem)";
  const tabletHalf =
    "(max-width: 1023px) calc(50vw - 2.5rem)";
  const tabletFull =
    "(max-width: 1023px) calc(100vw - 4rem)";

  if (total === 1) {
    return `${mobile}, ${tabletFull}, 100vw`;
  }

  if (total === 2) {
    return `${mobile}, ${tabletHalf}, 50vw`;
  }

  if (total === 3) {
    if (index === 0) {
      return `${mobile}, ${tabletFull}, 50vw`;
    }

    return `${mobile}, ${tabletHalf}, 25vw`;
  }

  if (total === 4) {
    return `${mobile}, ${tabletHalf}, 50vw`;
  }

  if (index === 0) {
    return `${mobile}, ${tabletFull}, 50vw`;
  }

  if (index === 1 || index === 2) {
    return `${mobile}, ${tabletHalf}, 25vw`;
  }

  return `${mobile}, ${tabletHalf}, 33vw`;
}

export function DynamicGalleryPreview() {
  const [filter, setFilter] =
    useState<GalleryFilter>("All");

  const items = useMemo(() => {
    if (filter === "All") {
      return galleryItems;
    }

    return galleryItems.filter(
      (item) => item.filter === filter,
    );
  }, [filter]);

  return (
    <SectionTransition
      variant="quiet"
      id="gallery-preview"
      className={cn(
        "section-shell scroll-mt-[7rem]",
        "overflow-x-clip bg-brand-white/45",

        // Mobile
        "!pb-16 !pt-20",

        // Larger phones
        "min-[390px]:!pb-20 min-[390px]:!pt-24",

        // Tablet
        "sm:!pb-24 sm:!pt-28",

        // Desktop
        "lg:!pb-24 lg:!pt-32",
      )}
      data-nav-theme="light"
      aria-labelledby="gallery-preview-heading"
    >
      <div className="section-inner min-w-0">
        {/* Heading and filters */}
        <RevealGroup
          stagger={0.08}
          start="top 84%"
          className={cn(
            "flex min-w-0 flex-col gap-6",
            "sm:gap-8",
            "lg:flex-row lg:items-end",
            "lg:justify-between lg:gap-12",
          )}
        >
          <div className="min-w-0 max-w-[49rem]">
            <p className="small-label text-brand-sage">
              Albums &amp; Gallery
            </p>

            <h2
              id="gallery-preview-heading"
              className={cn(
                "mt-3 max-w-[18ch]",
                "text-pretty font-display font-normal",
                "text-brand-olive",

                // Mobile typography
                "text-[clamp(2.25rem,11vw,3.2rem)]",
                "leading-[0.98]",

                "sm:mt-4 sm:text-[4rem]",
                "lg:max-w-full lg:text-[4.6rem]",
                "xl:text-[5rem]",
              )}
            >
              Browse the library{" "}
              <span className="block">
                as visual stories.
              </span>
            </h2>
          </div>

          {/* Mobile-friendly filter control */}
          <div
            role="group"
            aria-label="Filter gallery preview"
            className={cn(
              "grid w-full min-w-0 grid-cols-3 gap-1.5",
              "rounded-[1.1rem]",
              "border border-brand-olive/10",
              "bg-brand-white/50 p-1.5",
              "sm:flex sm:w-auto sm:flex-wrap sm:gap-2",
              "sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0",
              "lg:shrink-0 lg:flex-nowrap lg:justify-end",
            )}
          >
            {filters.map((filterItem) => {
              const isActive = filter === filterItem;

              return (
                <button
                  key={filterItem}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls="gallery-preview-grid"
                  onClick={() => setFilter(filterItem)}
                  className={cn(
                    "min-h-11 min-w-0 touch-manipulation",
                    "truncate whitespace-nowrap",
                    "rounded-xl border px-2 py-2.5",
                    "text-[0.7rem] font-bold",
                    "min-[360px]:text-xs",
                    "sm:min-w-[6.5rem]",
                    "sm:rounded-full sm:px-4 sm:text-sm",
                    "lg:px-5 lg:py-3",

                    "transition-[background-color,border-color,color,transform,box-shadow]",
                    "duration-300",

                    "active:scale-[0.97]",

                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-brand-sage",
                    "focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-brand-white",

                    "motion-reduce:transform-none",
                    "motion-reduce:transition-none",

                    isActive
                      ? cn(
                          "border-brand-olive",
                          "bg-brand-olive",
                          "text-brand-white",
                          "shadow-[0_8px_20px_rgba(48,50,41,0.14)]",
                        )
                      : cn(
                          "border-transparent",
                          "bg-transparent",
                          "text-brand-olive/70",
                          "sm:border-brand-olive/10",
                          "sm:bg-brand-white/55",
                          "lg:hover:border-brand-olive/20",
                          "lg:hover:bg-brand-white",
                          "lg:hover:text-brand-olive",
                        ),
                  )}
                >
                  {filterItem}
                </button>
              );
            })}
          </div>
        </RevealGroup>

        {/* Screen-reader filter announcement */}
        <p
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          Showing {items.length}{" "}
          {items.length === 1 ? "item" : "items"} in the{" "}
          {filter.toLowerCase()} gallery category.
        </p>

        {/* Gallery grid */}
        {items.length > 0 ? (
          <RevealGroup
            key={filter}
            id="gallery-preview-grid"
            stagger={0.05}
            start="top 86%"
            className={cn(
              "mt-8 grid min-w-0 grid-cols-1 gap-3",
              "min-[390px]:gap-4",
              "sm:mt-10 sm:grid-cols-2",
              "lg:mt-12 lg:grid-flow-row-dense",
              "lg:grid-cols-12",
              "lg:auto-rows-[11.5rem]",
              "xl:auto-rows-[12.5rem]",
            )}
          >
            {items.map((galleryItem, index) => {
              const objectPosition =
                galleryItem.objectPosition ?? "center";

              const isFeatured =
                index === 0 && items.length >= 3;

              return (
                <Link
                  key={`${filter}-${galleryItem.href}-${galleryItem.title}`}
                  href={galleryItem.href}
                  aria-label={`Open ${galleryItem.title}`}
                  className={cn(
                    "group relative isolate block",
                    "touch-manipulation overflow-hidden",
                    "rounded-[1.1rem]",
                    "bg-brand-paper",
                    "shadow-[0_12px_30px_rgba(48,50,41,0.10)]",

                    "transition-[transform,box-shadow]",
                    "duration-500",
                    "ease-[cubic-bezier(0.22,1,0.36,1)]",

                    // Mobile touch feedback
                    "active:scale-[0.985]",

                    // Desktop hover only
                    "lg:hover:-translate-y-1",
                    "lg:hover:shadow-[0_26px_60px_rgba(48,50,41,0.16)]",

                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-brand-champagne",
                    "focus-visible:ring-offset-3",
                    "focus-visible:ring-offset-brand-white",

                    "motion-reduce:transform-none",
                    "motion-reduce:transition-none",

                    getCardLayout(index, items.length),
                  )}
                >
                  <Image
                    src={galleryItem.image}
                    alt={galleryItem.title}
                    fill
                    priority={
                      filter === "All" && index === 0
                    }
                    className={cn(
                      "object-cover",
                      "transition-transform duration-700",
                      "ease-[cubic-bezier(0.22,1,0.36,1)]",
                      "lg:group-hover:scale-[1.035]",
                      "motion-reduce:transform-none",
                      "motion-reduce:transition-none",
                    )}
                    style={{ objectPosition }}
                    sizes={getImageSizes(
                      index,
                      items.length,
                    )}
                  />

                  {/* Readability gradient */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute inset-0",
                      "bg-gradient-to-t",
                      "from-brand-olive/90",
                      "via-brand-olive/15",
                      "via-55%",
                      "to-transparent",
                      "to-80%",
                    )}
                  />

                  {/* Content */}
                  <div
                    className={cn(
                      "absolute inset-x-0 bottom-0 z-10",
                      "min-w-0 p-4 text-brand-white",
                      "min-[390px]:p-5",
                      "sm:p-6",
                    )}
                  >
                    <p className="small-label text-brand-champagne">
                      {galleryItem.type}
                    </p>

                    <div
                      className={cn(
                        "mt-2 flex min-w-0",
                        "items-end justify-between gap-3",
                        "sm:gap-5",
                      )}
                    >
                      <h3
                        className={cn(
                          "min-w-0 flex-1",
                          "break-words font-display",
                          "[overflow-wrap:anywhere]",
                          "text-[clamp(1.65rem,7.8vw,2.15rem)]",
                          "leading-[0.98]",
                          "sm:text-[2.2rem]",
                          isFeatured
                            ? "lg:text-[3rem]"
                            : "lg:text-[2.35rem]",
                        )}
                      >
                        {galleryItem.title}
                      </h3>

                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex h-10 w-10 shrink-0",
                          "items-center justify-center",
                          "rounded-full",
                          "border border-brand-white/30",
                          "bg-brand-white/10",
                          "opacity-90",
                          "backdrop-blur-sm",

                          "transition-[transform,opacity,background-color]",
                          "duration-300",

                          "lg:group-hover:-translate-y-0.5",
                          "lg:group-hover:translate-x-0.5",
                          "lg:group-hover:bg-brand-white/20",
                          "lg:group-hover:opacity-100",

                          "motion-reduce:transform-none",
                          "motion-reduce:transition-none",
                        )}
                      >
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>

                  {/* Inner border */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none",
                      "absolute inset-0",
                      "rounded-[inherit]",
                      "ring-1 ring-inset",
                      "ring-brand-white/20",
                    )}
                  />
                </Link>
              );
            })}
          </RevealGroup>
        ) : (
          <div
            id="gallery-preview-grid"
            role="status"
            className={cn(
              "mt-8 rounded-[1.25rem]",
              "border border-brand-olive/10",
              "bg-brand-paper/60",
              "px-5 py-12 text-center",
              "sm:mt-10 sm:px-8 sm:py-16",
            )}
          >
            <p className="font-display text-2xl text-brand-olive">
              No gallery items found.
            </p>

            <p className="mt-2 text-sm text-brand-olive/65">
              Choose another gallery category.
            </p>
          </div>
        )}

        {/* Complete gallery CTA */}
        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            href="/gallery"
            className={cn(
              "group inline-flex min-h-12",
              "w-full touch-manipulation",
              "items-center justify-center gap-3",
              "rounded-full",
              "border border-brand-olive",
              "bg-brand-olive",
              "px-5 py-3.5",
              "text-center text-sm font-bold",
              "text-brand-white",

              "shadow-[0_12px_28px_rgba(48,50,41,0.14)]",
              "transition-[transform,background-color,box-shadow]",
              "duration-300",

              "active:scale-[0.98]",
              "sm:w-auto sm:px-6",

              "lg:hover:-translate-y-0.5",
              "lg:hover:bg-brand-olive/92",
              "lg:hover:shadow-[0_18px_38px_rgba(48,50,41,0.18)]",

              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-brand-champagne",
              "focus-visible:ring-offset-4",
              "focus-visible:ring-offset-brand-white",

              "motion-reduce:transform-none",
              "motion-reduce:transition-none",
            )}
          >
            <span>Open the complete gallery</span>

            <ArrowUpRight
              size={17}
              aria-hidden="true"
              className={cn(
                "shrink-0",
                "transition-transform duration-300",
                "lg:group-hover:-translate-y-0.5",
                "lg:group-hover:translate-x-0.5",
                "motion-reduce:transform-none",
                "motion-reduce:transition-none",
              )}
            />
          </Link>
        </div>
      </div>
    </SectionTransition>
  );
}