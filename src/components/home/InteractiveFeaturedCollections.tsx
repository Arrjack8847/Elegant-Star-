"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type TouchEvent,
} from "react";
import { ArrowUpRight } from "lucide-react";

import { featuredCollections } from "@/data/collections";
import { cn } from "@/lib/utils";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { SectionTransition } from "@/components/motion/SectionTransition";

type CardPosition =
  | "active"
  | "previous"
  | "next"
  | "far-previous"
  | "far-next"
  | "hidden";

type FeaturedCollectionItem = (typeof featuredCollections)[number] & {
  objectPosition?: CSSProperties["objectPosition"];
};

type TouchPoint = {
  x: number;
  y: number;
};

const collections = featuredCollections as readonly FeaturedCollectionItem[];

const HOVER_DELAY = 140;
const SWIPE_THRESHOLD = 50;
const SWIPE_DIRECTION_RATIO = 1.15;
const CLICK_SUPPRESSION_DURATION = 450;

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

function getCircularOffset(index: number, activeIndex: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  let offset = (index - activeIndex + total) % total;

  if (offset > total / 2) {
    offset -= total;
  }

  return offset;
}

function getCardPosition(
  index: number,
  activeIndex: number,
  total: number,
): CardPosition {
  const offset = getCircularOffset(index, activeIndex, total);

  if (offset === 0) return "active";
  if (offset === -1) return "previous";
  if (offset === 1) return "next";
  if (offset === -2) return "far-previous";
  if (offset === 2) return "far-next";

  return "hidden";
}

function getImageSizes(position: CardPosition) {
  if (position === "active") {
    return "(max-width: 767px) 88vw, (max-width: 1023px) 84vw, (max-width: 1279px) 43vw, 45vw";
  }

  if (position === "previous" || position === "next") {
    return "(max-width: 767px) 76vw, (max-width: 1023px) 74vw, (max-width: 1279px) 31vw, 33vw";
  }

  if (position === "far-previous" || position === "far-next") {
    return "(max-width: 1023px) 1px, 24vw";
  }

  return "1px";
}

export function InteractiveFeaturedCollections() {
  const [activeIndex, setActiveIndex] = useState(0);

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clickSuppressionTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const touchStartRef = useRef<TouchPoint | null>(null);

  const suppressClickRef = useRef(false);

  const collectionCount = collections.length;

  const currentCollection = collections[activeIndex] ?? collections[0];

  const clearHoverTimer = useCallback(() => {
    if (hoverTimeoutRef.current === null) {
      return;
    }

    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = null;
  }, []);

  const clearClickSuppressionTimer = useCallback(() => {
    if (clickSuppressionTimeoutRef.current === null) {
      return;
    }

    clearTimeout(clickSuppressionTimeoutRef.current);

    clickSuppressionTimeoutRef.current = null;
  }, []);

  const selectCollection = useCallback(
    (index: number) => {
      if (index < 0 || index >= collectionCount) {
        return;
      }

      clearHoverTimer();
      setActiveIndex(index);
    },
    [clearHoverTimer, collectionCount],
  );

  const scheduleCollection = useCallback(
    (index: number) => {
      if (index < 0 || index >= collectionCount) {
        return;
      }

      clearHoverTimer();

      hoverTimeoutRef.current = setTimeout(() => {
        setActiveIndex(index);
        hoverTimeoutRef.current = null;
      }, HOVER_DELAY);
    },
    [clearHoverTimer, collectionCount],
  );

  const showPrevious = useCallback(() => {
    if (collectionCount < 2) {
      return;
    }

    clearHoverTimer();

    setActiveIndex(
      (currentIndex) => (currentIndex - 1 + collectionCount) % collectionCount,
    );
  }, [clearHoverTimer, collectionCount]);

  const showNext = useCallback(() => {
    if (collectionCount < 2) {
      return;
    }

    clearHoverTimer();

    setActiveIndex((currentIndex) => (currentIndex + 1) % collectionCount);
  }, [clearHoverTimer, collectionCount]);

  const suppressNextClick = useCallback(() => {
    clearClickSuppressionTimer();

    suppressClickRef.current = true;

    clickSuppressionTimeoutRef.current = setTimeout(() => {
      suppressClickRef.current = false;
      clickSuppressionTimeoutRef.current = null;
    }, CLICK_SUPPRESSION_DURATION);
  }, [clearClickSuppressionTimer]);

  useEffect(() => {
    return () => {
      clearHoverTimer();
      clearClickSuppressionTimer();
    };
  }, [clearClickSuppressionTimer, clearHoverTimer]);

  const handleDeckKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        showPrevious();
        break;

      case "ArrowRight":
        event.preventDefault();
        showNext();
        break;

      case "Home":
        event.preventDefault();
        selectCollection(0);
        break;

      case "End":
        event.preventDefault();
        selectCollection(collectionCount - 1);
        break;

      default:
        break;
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    if (!touch) {
      touchStartRef.current = null;
      return;
    }

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];

    touchStartRef.current = null;

    if (!start || !touch) {
      return;
    }

    const horizontalDistance = start.x - touch.clientX;

    const verticalDistance = start.y - touch.clientY;

    const horizontalMagnitude = Math.abs(horizontalDistance);

    const verticalMagnitude = Math.abs(verticalDistance);

    const isHorizontalSwipe =
      horizontalMagnitude >= SWIPE_THRESHOLD &&
      horizontalMagnitude > verticalMagnitude * SWIPE_DIRECTION_RATIO;

    if (!isHorizontalSwipe) {
      return;
    }

    suppressNextClick();

    if (horizontalDistance > 0) {
      showNext();
    } else {
      showPrevious();
    }
  };

  const handleTouchCancel = () => {
    touchStartRef.current = null;
  };

  const handleDeckClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    suppressClickRef.current = false;
    clearClickSuppressionTimer();
  };

  if (!currentCollection) {
    return null;
  }

  return (
    <SectionTransition
      variant="quiet"
      id="featured-collections"
      className={cn(
        "section-shell scroll-mt-[9rem] overflow-x-clip",
        "bg-brand-white/45",
        "!pb-16 !pt-32",
        "sm:!pb-20 sm:!pt-36",
        "lg:!pb-20 lg:!pt-32",
        "xl:!pb-24 xl:!pt-32",
      )}
      data-nav-theme="light"
      aria-labelledby="featured-collections-heading"
    >
      <div className="section-inner">
        <RevealGroup
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          stagger={0.08}
          start="top 84%"
        >
          <div className="max-w-[48rem]">
            <p className="small-label text-brand-sage">Featured Collections</p>

            <h2
              id="featured-collections-heading"
              className={cn(
                "mt-4 text-balance font-display font-normal",
                "text-[2.55rem] leading-[0.96]",
                "text-brand-olive",
                "sm:text-[3.05rem]",
                "lg:text-[3.3rem]",
                "xl:text-[3.55rem]",
              )}
            >
              Six directions.{" "}
              <span className="block">Many ways to personalise.</span>
            </h2>
          </div>

          <Link
            href="/collections"
            className={cn(
              "group inline-flex w-fit shrink-0 items-center gap-2",
              "border-b border-brand-sage/40 pb-1",
              "text-sm font-bold text-brand-olive",
              "transition-colors duration-300",
              "hover:border-brand-olive",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-brand-sage",
              "focus-visible:ring-offset-4",
              "focus-visible:ring-offset-brand-white",
            )}
          >
            View all collections
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
        </RevealGroup>

        <RevealGroup
          stagger={0.08}
          start="top 78%"
          className={cn(
            "mt-8 grid min-w-0 gap-7",
            "lg:grid-cols-[minmax(17.5rem,0.7fr)_minmax(0,1.3fr)]",
            "lg:items-start lg:gap-8",
            "xl:grid-cols-[minmax(19rem,0.68fr)_minmax(0,1.32fr)]",
            "xl:gap-12",
          )}
        >
          <div
            className={cn(
              "featured-collection-tabs no-scrollbar",
              "min-w-0 overflow-x-auto pb-2",
              "lg:overflow-hidden lg:pb-0",
            )}
            aria-label="Featured invitation collections"
            onMouseLeave={clearHoverTimer}
          >
            <div
              className={cn(
                "flex min-w-max gap-2 p-1",
                "lg:block lg:min-w-0 lg:overflow-hidden",
                "lg:rounded-[1.35rem]",
                "lg:border lg:border-brand-olive/10",
                "lg:bg-brand-white/20 lg:p-0",
              )}
            >
              {collections.map((item, index) => {
                const isActive = activeIndex === index;

                const category = item.categories[0] ?? "Wedding stationery";

                return (
                  <button
                    key={item.slug}
                    type="button"
                    aria-pressed={isActive}
                    onMouseEnter={() => scheduleCollection(index)}
                    onFocus={() => selectCollection(index)}
                    onClick={() => selectCollection(index)}
                    className={cn(
                      "group relative grid shrink-0 text-left",
                      "w-[14rem]",
                      "grid-cols-[1.9rem_minmax(0,1fr)_1.15rem]",
                      "items-center gap-3",
                      "rounded-xl border px-4 py-3.5",
                      "transition-[background-color,color,box-shadow,border-color]",
                      "duration-300",
                      "sm:w-[17.5rem] sm:px-5",
                      "lg:min-h-[4.15rem] lg:w-full",
                      "lg:rounded-none lg:border-x-0 lg:border-t-0",
                      "lg:last:border-b-0",
                      "focus-visible:z-20",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-inset",
                      "focus-visible:ring-brand-sage",
                      isActive
                        ? cn(
                            "border-brand-olive/15",
                            "bg-brand-white",
                            "text-brand-olive",
                            "shadow-[0_14px_34px_rgba(47,49,37,0.10)]",
                            "ring-1 ring-inset ring-brand-olive/[0.06]",
                          )
                        : cn(
                            "border-brand-olive/10",
                            "bg-brand-white/35",
                            "text-brand-olive/65",
                            "hover:border-brand-olive/15",
                            "hover:bg-brand-white/70",
                            "hover:text-brand-olive",
                            "lg:bg-transparent",
                          ),
                    )}
                  >
                    <span
                      className={cn(
                        "small-label transition-colors duration-300",
                        isActive
                          ? "text-brand-sage"
                          : "text-brand-olive/38 group-hover:text-brand-sage",
                      )}
                    >
                      {formatNumber(index + 1)}
                    </span>

                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block overflow-hidden font-display",
                          "text-[1.35rem] leading-[1.03]",
                          "sm:text-[1.5rem]",
                          "lg:text-[1.34rem]",
                          "[display:-webkit-box]",
                          "[-webkit-box-orient:vertical]",
                          "[-webkit-line-clamp:2]",
                        )}
                      >
                        {item.name}
                      </span>

                      <span
                        className={cn(
                          "mt-1.5 block truncate",
                          "text-[0.6rem] font-bold uppercase",
                          "tracking-[0.12em]",
                          "text-brand-olive/45",
                        )}
                      >
                        {category}
                      </span>
                    </span>

                    <ArrowUpRight
                      size={17}
                      aria-hidden="true"
                      className={cn(
                        "shrink-0 text-brand-sage",
                        "transition-[opacity,transform] duration-300",
                        isActive
                          ? "-translate-y-0.5 translate-x-0.5 opacity-100"
                          : cn(
                              "opacity-35",
                              "group-hover:-translate-y-0.5",
                              "group-hover:translate-x-0.5",
                              "group-hover:opacity-100",
                            ),
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div
            role="group"
            tabIndex={0}
            onKeyDown={handleDeckKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
            onClickCapture={handleDeckClickCapture}
            aria-label={`Selected collection: ${currentCollection.name}. Use the left and right arrow keys to browse collections.`}
            className={cn(
              "touch-pan-y min-w-0 rounded-[1.6rem]",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-brand-sage",
              "focus-visible:ring-offset-4",
              "focus-visible:ring-offset-brand-white",
            )}
          >
            <div
              className={cn(
                "featured-collection-deck",
                "relative isolate overflow-hidden",
                "h-[20rem]",
                "min-[380px]:h-[22rem]",
                "sm:h-[26rem]",
                "lg:h-[25.5rem]",
                "xl:h-[27rem]",
                "2xl:h-[29rem]",
              )}
            >
              {collections.map((item, index) => {
                const position = getCardPosition(
                  index,
                  activeIndex,
                  collectionCount,
                );

                const isActive = position === "active";

                const isSideCard =
                  position === "previous" || position === "next";

                const isFarOrHidden =
                  position === "far-previous" ||
                  position === "far-next" ||
                  position === "hidden";

                const objectPosition = item.objectPosition ?? "center";

                return (
                  <div
                    key={item.slug}
                    data-position={position}
                    aria-hidden={isFarOrHidden ? true : undefined}
                    className="featured-collection-card group"
                  >
                    <Image
                      src={item.cardImage}
                      alt={
                        isActive
                          ? `${item.name} wedding stationery collection`
                          : ""
                      }
                      fill
                      priority={index === 0}
                      draggable={false}
                      aria-hidden={isActive ? undefined : true}
                      className={cn(
                        "select-none object-cover",
                        "transition-transform duration-700",
                        "ease-[cubic-bezier(0.22,1,0.36,1)]",
                        "group-hover:scale-[1.02]",
                      )}
                      style={{ objectPosition }}
                      sizes={getImageSizes(position)}
                    />

                    {isActive && (
                      <Link
                        href={`/designs/${item.slug}`}
                        aria-label={`Explore ${item.name}`}
                        className={cn(
                          "featured-collection-control",
                          "text-brand-white",
                          "focus-visible:outline-none",
                          "focus-visible:ring-2",
                          "focus-visible:ring-inset",
                          "focus-visible:ring-brand-champagne",
                        )}
                      >
                        <div
                          className={cn(
                            "absolute inset-x-0 bottom-0",
                            "p-5 pt-24",
                            "sm:p-7 sm:pt-28",
                          )}
                        >
                          <div
                            key={`active-copy-${item.slug}`}
                            className="featured-collection-copy"
                          >
                            <p className="small-label text-brand-champagne">
                              {item.reference}
                            </p>

                            <h3
                              className={cn(
                                "mt-2 max-w-[88%]",
                                "font-display font-normal",
                                "leading-[0.96]",
                                "text-[2rem]",
                                "sm:text-[2.55rem]",
                                "lg:text-[2.4rem]",
                                "xl:text-[2.7rem]",
                              )}
                            >
                              {item.name}
                            </h3>

                            <span
                              className={cn(
                                "mt-4 inline-flex items-center gap-2",
                                "translate-y-1 opacity-0",
                                "text-[0.65rem] font-bold uppercase",
                                "tracking-[0.14em]",
                                "text-brand-ivory",
                                "transition-[opacity,transform]",
                                "duration-300",
                                "group-hover:translate-y-0",
                                "group-hover:opacity-100",
                                "group-focus-within:translate-y-0",
                                "group-focus-within:opacity-100",
                              )}
                            >
                              Explore collection
                              <ArrowUpRight size={15} aria-hidden="true" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    )}

                    {isSideCard && (
                      <button
                        type="button"
                        onClick={() => selectCollection(index)}
                        aria-label={`Select ${item.name} collection`}
                        className={cn(
                          "featured-collection-control",
                          "cursor-pointer",
                          "focus-visible:outline-none",
                          "focus-visible:ring-2",
                          "focus-visible:ring-inset",
                          "focus-visible:ring-brand-sage",
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div
              key={`description-${currentCollection.slug}`}
              className="featured-collection-description mt-5"
            >
              <p className="max-w-2xl text-[0.98rem] leading-7 text-brand-olive/68">
                {currentCollection.shortDescription}
              </p>
            </div>

            <div
              className={cn(
                "mt-5 flex items-center justify-between gap-4",
                "border-t border-brand-olive/15 pt-5",
              )}
            >
              <div
                className="flex shrink-0 items-center gap-3"
                aria-label={`Collection ${activeIndex + 1} of ${collectionCount}`}
              >
                <span className="font-display text-xl text-brand-sage">
                  {formatNumber(activeIndex + 1)}
                </span>

                <span
                  aria-hidden="true"
                  className="h-px w-7 bg-brand-olive/20"
                />

                <span className="small-label text-brand-olive/40">
                  {formatNumber(collectionCount)}
                </span>
              </div>

              <div className="flex items-center gap-4 sm:gap-8">
                <button
                  type="button"
                  onClick={showPrevious}
                  disabled={collectionCount < 2}
                  className={cn(
                    "group inline-flex min-h-11 items-center gap-2.5",
                    "text-[0.65rem] font-bold uppercase",
                    "tracking-[0.14em]",
                    "text-brand-olive/48",
                    "transition-colors duration-300",
                    "hover:text-brand-olive",
                    "disabled:cursor-not-allowed",
                    "disabled:opacity-30",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-brand-sage",
                    "focus-visible:ring-offset-4",
                    "focus-visible:ring-offset-brand-white",
                  )}
                >
                  Previous
                  <span
                    aria-hidden="true"
                    className={cn(
                      "hidden h-px w-6",
                      "bg-brand-olive/20",
                      "transition-[width,background-color]",
                      "duration-300",
                      "group-hover:w-10",
                      "group-hover:bg-brand-sage",
                      "sm:block",
                    )}
                  />
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  disabled={collectionCount < 2}
                  className={cn(
                    "group inline-flex min-h-11 items-center gap-2.5",
                    "text-[0.65rem] font-bold uppercase",
                    "tracking-[0.14em]",
                    "text-brand-sage",
                    "transition-colors duration-300",
                    "hover:text-brand-olive",
                    "disabled:cursor-not-allowed",
                    "disabled:opacity-30",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-brand-sage",
                    "focus-visible:ring-offset-4",
                    "focus-visible:ring-offset-brand-white",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "hidden h-px w-6",
                      "bg-brand-sage/45",
                      "transition-[width,background-color]",
                      "duration-300",
                      "group-hover:w-10",
                      "group-hover:bg-brand-olive",
                      "sm:block",
                    )}
                  />
                  Next
                </button>
              </div>
            </div>
          </div>
        </RevealGroup>
      </div>

      <style jsx global>{`
        .featured-collection-tabs {
          overscroll-behavior-inline: contain;
        }

        .featured-collection-deck {
          contain: layout paint;
        }

        .featured-collection-card {
          position: absolute;
          display: block;
          overflow: hidden;

          margin: 0;
          padding: 0;
          border: 0;
          border-radius: 1.45rem;

          background: var(--brand-paper, #e7e1d5);
          box-shadow: none;

          transform-origin: center bottom;

          transition-property: transform, opacity;

          transition-duration: 700ms, 400ms;

          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1), ease;
        }

        .featured-collection-control {
          position: absolute;
          inset: 0;
          z-index: 20;

          display: block;

          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          border: 0;
          border-radius: inherit;

          text-align: left;
          appearance: none;
          background: transparent;
        }

        a.featured-collection-control {
          color: var(--brand-white, #fffdf8);
        }

        .featured-collection-card[data-position="active"] {
          top: 1.25rem;
          bottom: 0.35rem;
          left: 19%;

          z-index: 50;

          width: 62%;

          opacity: 1;
          filter: none;

          transform: rotate(0deg) scale(1);
          pointer-events: auto;

          box-shadow: 0 10px 18px -15px rgba(35, 36, 28, 0.24);
        }

        .featured-collection-card[data-position="previous"] {
          top: 2rem;
          bottom: 1.15rem;
          left: 1%;

          z-index: 30;

          width: 47%;

          opacity: 1;
          filter: none;

          transform: rotate(-1.6deg) scale(0.95);
          pointer-events: auto;
        }

        .featured-collection-card[data-position="next"] {
          top: 2rem;
          bottom: 1.15rem;
          left: 52%;

          z-index: 30;

          width: 47%;

          opacity: 1;
          filter: none;

          transform: rotate(1.6deg) scale(0.95);
          pointer-events: auto;
        }

        .featured-collection-card[data-position="far-previous"] {
          top: 0.55rem;
          bottom: 2.25rem;
          left: 4%;

          z-index: 10;

          width: 39%;

          opacity: 1;
          filter: none;

          transform: rotate(-2.6deg) scale(0.88);
          pointer-events: none;
        }

        .featured-collection-card[data-position="far-next"] {
          top: 0.55rem;
          bottom: 2.25rem;
          left: 57%;

          z-index: 10;

          width: 39%;

          opacity: 1;
          filter: none;

          transform: rotate(2.6deg) scale(0.88);
          pointer-events: none;
        }

        .featured-collection-card[data-position="hidden"] {
          top: 3rem;
          bottom: 1rem;
          left: 34%;

          z-index: 0;

          width: 32%;

          opacity: 0;
          filter: none;

          transform: scale(0.8);
          pointer-events: none;
        }

        .featured-collection-card[data-position="previous"]:hover {
          transform: rotate(-1.6deg) scale(0.97);
        }

        .featured-collection-card[data-position="next"]:hover {
          transform: rotate(1.6deg) scale(0.97);
        }

        .featured-collection-copy {
          color: var(--brand-white, #fffdf8);

          text-shadow:
            0 2px 4px rgba(0, 0, 0, 0.34),
            0 5px 16px rgba(0, 0, 0, 0.2);
        }

        .featured-collection-copy,
        .featured-collection-description {
          animation: featured-collection-fade 420ms
            cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes featured-collection-fade {
          from {
            opacity: 0;
            transform: translateY(9px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1023px) {
          .featured-collection-card {
            border-radius: 1.25rem;
          }

          .featured-collection-card[data-position="active"] {
            top: 0.9rem;
            bottom: 0;
            left: 6%;

            width: 88%;

            opacity: 1;
            filter: none;

            transform: rotate(0deg) scale(1);
          }

          .featured-collection-card[data-position="previous"] {
            top: 1.8rem;
            bottom: 0.5rem;
            left: 0;

            width: 76%;

            opacity: 1;
            filter: none;

            transform: rotate(0deg) scale(0.92);
          }

          .featured-collection-card[data-position="next"] {
            top: 1.8rem;
            bottom: 0.5rem;
            left: 24%;

            width: 76%;

            opacity: 1;
            filter: none;

            transform: rotate(0deg) scale(0.92);
          }

          .featured-collection-card[data-position="far-previous"],
          .featured-collection-card[data-position="far-next"] {
            top: 2rem;
            bottom: 0.5rem;
            left: 33%;

            width: 34%;

            opacity: 0;
            filter: none;

            transform: scale(0.84);
          }

          .featured-collection-card[data-position="hidden"] {
            top: 2rem;
            bottom: 0.5rem;
            left: 33%;

            width: 34%;

            opacity: 0;
            filter: none;

            transform: scale(0.82);
          }

          .featured-collection-card[data-position="previous"]:hover,
          .featured-collection-card[data-position="next"]:hover {
            transform: rotate(0deg) scale(0.92);
          }
        }
      `}</style>
    </SectionTransition>
  );
}
