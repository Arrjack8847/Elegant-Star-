
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { craftsmanshipItems } from "@/data/home";
import { cn } from "@/lib/utils";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { SectionTransition } from "@/components/motion/SectionTransition";

const SWIPE_THRESHOLD = 45;
const SWIPE_DIRECTION_RATIO = 1.2;

type SwipePoint = {
  x: number;
  y: number;
};

export function InteractiveCraftsmanship() {
  const [active, setActive] = useState(0);

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const swipeStartRef = useRef<SwipePoint | null>(null);

  const componentId = useId();

  /*
   * Explicitly widening the tuple length to number prevents
   * TypeScript from treating it as the literal type 5.
   */
  const itemCount: number = craftsmanshipItems.length;

  const item =
    itemCount > 0
      ? craftsmanshipItems[active] ?? craftsmanshipItems[0]
      : undefined;

  const panelId = `${componentId}-panel`;

  const selectTab = useCallback(
    (index: number, moveFocus = false) => {
      if (itemCount === 0) {
        return;
      }

      const normalizedIndex =
        (index + itemCount) % itemCount;

      setActive(normalizedIndex);

      if (moveFocus) {
        window.requestAnimationFrame(() => {
          tabRefs.current[normalizedIndex]?.focus();
        });
      }
    },
    [itemCount],
  );

  useEffect(() => {
    const activeTab = tabRefs.current[active];
    const tabList = tabListRef.current;

    if (!activeTab || !tabList) {
      return;
    }

    const hasHorizontalOverflow =
      tabList.scrollWidth > tabList.clientWidth + 2;

    if (!hasHorizontalOverflow) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    activeTab.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [active]);

  if (!item) {
    return null;
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        selectTab(index + 1, true);
        break;

      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        selectTab(index - 1, true);
        break;

      case "Home":
        event.preventDefault();
        selectTab(0, true);
        break;

      case "End":
        event.preventDefault();
        selectTab(itemCount - 1, true);
        break;

      default:
        break;
    }
  }

  function handleMediaPointerDown(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (event.pointerType === "mouse") {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.closest("button, a")) {
      return;
    }

    swipeStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    if (
      event.currentTarget.setPointerCapture &&
      !event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  }

  function handleMediaPointerUp(
    event: PointerEvent<HTMLDivElement>,
  ) {
    const startPoint = swipeStartRef.current;

    swipeStartRef.current = null;

    if (
      event.currentTarget.hasPointerCapture?.(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture?.(
        event.pointerId,
      );
    }

    if (!startPoint || event.pointerType === "mouse") {
      return;
    }

    const deltaX = event.clientX - startPoint.x;
    const deltaY = event.clientY - startPoint.y;

    const horizontalDistance = Math.abs(deltaX);
    const verticalDistance = Math.abs(deltaY);

    const isHorizontalSwipe =
      horizontalDistance >= SWIPE_THRESHOLD &&
      horizontalDistance >
        verticalDistance * SWIPE_DIRECTION_RATIO;

    if (!isHorizontalSwipe) {
      return;
    }

    if (deltaX < 0) {
      selectTab(active + 1);
    } else {
      selectTab(active - 1);
    }
  }

  function handleMediaPointerCancel(
    event: PointerEvent<HTMLDivElement>,
  ) {
    swipeStartRef.current = null;

    if (
      event.currentTarget.hasPointerCapture?.(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture?.(
        event.pointerId,
      );
    }
  }

  const progress =
    itemCount > 0 ? (active + 1) / itemCount : 0;

  return (
    <SectionTransition
      variant="rounded-dark"
      className={cn(
        "section-shell overflow-x-clip",
        "bg-brand-olive text-brand-ivory",
        "!pb-16 !pt-20",
        "min-[390px]:!pb-20 min-[390px]:!pt-24",
        "sm:!pb-24 sm:!pt-28",
        "md:!pt-32",
        "lg:!pb-28 lg:!pt-36",
        "xl:!pt-40",
      )}
      data-nav-theme="dark"
      aria-labelledby="craftsmanship-heading"
    >
      <div className="section-inner min-w-0">
        <div
          className={cn(
            "grid min-w-0 grid-cols-1 gap-10",
            "sm:gap-12",
            "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]",
            "lg:items-center lg:gap-12",
            "xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]",
            "xl:gap-16",
          )}
        >
          {/* Selected craftsmanship image */}
          <ImageReveal
            className={cn(
              "relative isolate min-w-0 overflow-hidden",
              "aspect-[4/5] rounded-[1.35rem]",
              "bg-brand-olive/50",
              "min-[420px]:aspect-[5/6]",
              "min-[420px]:rounded-[1.5rem]",
              "sm:aspect-[16/11]",
              "sm:rounded-[1.75rem]",
              "lg:h-[35rem] lg:aspect-auto",
              "xl:h-[38rem]",
            )}
          >
            <div
              className="relative h-full w-full touch-pan-y select-none"
              onPointerDown={handleMediaPointerDown}
              onPointerUp={handleMediaPointerUp}
              onPointerCancel={handleMediaPointerCancel}
            >
              {/* Images remain mounted for smooth transitions */}
              {craftsmanshipItems.map(
                (craft, index) => {
                  const isActive = active === index;
                  const isPrevious = index < active;

                  return (
                    <Image
                      key={craft.slug}
                      src={craft.image}
                      alt={
                        isActive
                          ? `${craft.title} craftsmanship detail`
                          : ""
                      }
                      fill
                      priority={index === 0}
                      draggable={false}
                      aria-hidden={!isActive}
                      sizes="
                        (max-width: 419px) calc(100vw - 2rem),
                        (max-width: 639px) calc(100vw - 2.5rem),
                        (max-width: 1023px) calc(100vw - 3rem),
                        (max-width: 1535px) 53vw,
                        800px
                      "
                      className={cn(
                        "object-cover",
                        "will-change-[opacity,transform]",
                        "transition-[opacity,transform] duration-700",
                        "ease-[cubic-bezier(0.22,1,0.36,1)]",
                        "motion-reduce:transform-none",
                        "motion-reduce:transition-none",
                        isActive &&
                          "z-10 scale-100 opacity-100",
                        !isActive &&
                          isPrevious &&
                          "z-0 scale-[1.025] opacity-0",
                        !isActive &&
                          !isPrevious &&
                          "z-0 scale-[1.04] opacity-0",
                      )}
                    />
                  );
                },
              )}

              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-0 z-20",
                  "bg-gradient-to-t",
                  "from-brand-olive/95",
                  "via-brand-olive/10",
                  "to-black/10",
                )}
              />

              {/* Item counter */}
              <div
                aria-hidden="true"
                className={cn(
                  "absolute left-4 top-4 z-30",
                  "inline-flex min-h-10 items-center",
                  "rounded-full border border-brand-ivory/15",
                  "bg-brand-olive/55 px-3.5",
                  "text-xs font-bold tabular-nums",
                  "text-brand-ivory/80 backdrop-blur-xl",
                  "sm:left-5 sm:top-5",
                )}
              >
                {String(active + 1).padStart(2, "0")}

                <span className="mx-1.5 text-brand-ivory/35">
                  /
                </span>

                {String(itemCount).padStart(2, "0")}
              </div>

              {/* Previous and next controls */}
              {itemCount > 1 ? (
                <div
                  className={cn(
                    "absolute right-4 top-4 z-30",
                    "flex items-center gap-2",
                    "sm:right-5 sm:top-5",
                  )}
                >
                  <button
                    type="button"
                    onClick={() =>
                      selectTab(active - 1)
                    }
                    aria-label="View previous craftsmanship detail"
                    className={cn(
                      "grid h-11 w-11",
                      "touch-manipulation place-items-center",
                      "rounded-full border",
                      "border-brand-ivory/15",
                      "bg-brand-olive/55",
                      "text-brand-ivory backdrop-blur-xl",
                      "transition-[color,background-color,border-color,transform]",
                      "duration-300",
                      "active:scale-[0.96]",
                      "active:bg-brand-champagne",
                      "active:text-brand-olive",
                      "lg:hover:border-brand-champagne",
                      "lg:hover:bg-brand-champagne",
                      "lg:hover:text-brand-olive",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-brand-champagne",
                      "focus-visible:ring-offset-2",
                      "focus-visible:ring-offset-brand-olive",
                    )}
                  >
                    <ChevronLeft
                      size={18}
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      selectTab(active + 1)
                    }
                    aria-label="View next craftsmanship detail"
                    className={cn(
                      "grid h-11 w-11",
                      "touch-manipulation place-items-center",
                      "rounded-full border",
                      "border-brand-ivory/15",
                      "bg-brand-olive/55",
                      "text-brand-ivory backdrop-blur-xl",
                      "transition-[color,background-color,border-color,transform]",
                      "duration-300",
                      "active:scale-[0.96]",
                      "active:bg-brand-champagne",
                      "active:text-brand-olive",
                      "lg:hover:border-brand-champagne",
                      "lg:hover:bg-brand-champagne",
                      "lg:hover:text-brand-olive",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-brand-champagne",
                      "focus-visible:ring-offset-2",
                      "focus-visible:ring-offset-brand-olive",
                    )}
                  >
                    <ChevronRight
                      size={18}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              ) : null}

              {/* Image title */}
              <div
                className={cn(
                  "absolute inset-x-4 bottom-5 z-30",
                  "min-w-0",
                  "min-[390px]:inset-x-5",
                  "min-[390px]:bottom-6",
                  "sm:inset-x-7 sm:bottom-7",
                  "lg:inset-x-8 lg:bottom-8",
                )}
              >
                <p className="small-label text-brand-champagne">
                  Selected detail
                </p>

                <h3
                  key={item.slug}
                  className={cn(
                    "mt-2 max-w-[90%]",
                    "font-display",
                    "text-[clamp(2rem,9vw,2.8rem)]",
                    "leading-[0.98]",
                    "tracking-[-0.015em]",
                    "[overflow-wrap:anywhere]",
                    "sm:max-w-[80%] sm:text-5xl",
                    "lg:text-[3rem]",
                    "xl:text-[3.35rem]",
                  )}
                >
                  {item.title}
                </h3>

                <div
                  aria-hidden="true"
                  className={cn(
                    "mt-5 h-px w-full",
                    "overflow-hidden bg-brand-ivory/15",
                  )}
                >
                  <span
                    className={cn(
                      "block h-full w-full origin-left",
                      "bg-brand-champagne",
                      "transition-transform duration-500",
                      "motion-reduce:transition-none",
                    )}
                    style={{
                      transform: `scaleX(${progress})`,
                    }}
                  />
                </div>
              </div>
            </div>
          </ImageReveal>

          {/* Craftsmanship content */}
          <RevealGroup
            className="min-w-0 lg:py-2"
            stagger={0.07}
            start="top 84%"
          >
            <p className="small-label text-brand-champagne">
              Craftsmanship
            </p>

            <h2
              id="craftsmanship-heading"
              className={cn(
                "mt-3 max-w-[12ch]",
                "font-display",
                "text-[clamp(2.4rem,11vw,3.4rem)]",
                "leading-[0.98]",
                "tracking-[-0.025em]",
                "[overflow-wrap:anywhere]",
                "sm:mt-4 sm:max-w-[13ch] sm:text-6xl",
                "lg:text-[4rem]",
                "xl:text-[4.5rem]",
              )}
            >
              Look closer.

              <span className="block">
                Every detail matters.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-[0.95rem] leading-7 text-brand-ivory/65 sm:mt-6 sm:text-base sm:leading-8">
              Explore the materials, finishing and thoughtful
              details that shape every Elegant Star piece.
            </p>

            {/* Mobile horizontal tabs and desktop grid */}
            <div
              ref={tabListRef}
              role="tablist"
              aria-label="Craftsmanship details"
              aria-orientation="horizontal"
              className={cn(
                "mt-7 flex min-w-0",
                "snap-x snap-mandatory gap-3",
                "overflow-x-auto overscroll-x-contain",
                "pb-2 pr-4",
                "[scrollbar-width:none]",
                "[&::-webkit-scrollbar]:hidden",
                "sm:grid sm:grid-cols-2",
                "sm:overflow-visible sm:pb-0 sm:pr-0",
                "lg:mt-8",
              )}
            >
              {craftsmanshipItems.map(
                (craft, index) => {
                  const isActive = active === index;

                  const isLastOddItem =
                    itemCount % 2 !== 0 &&
                    index === itemCount - 1;

                  const tabId = `${componentId}-tab-${index}`;

                  return (
                    <button
                      key={craft.slug}
                      ref={(element) => {
                        tabRefs.current[index] =
                          element;
                      }}
                      id={tabId}
                      type="button"
                      role="tab"
                      tabIndex={isActive ? 0 : -1}
                      aria-selected={isActive}
                      aria-controls={panelId}
                      onClick={() =>
                        selectTab(index)
                      }
                      onPointerEnter={(event) => {
                        if (
                          event.pointerType === "mouse"
                        ) {
                          setActive(index);
                        }
                      }}
                      onKeyDown={(event) =>
                        handleTabKeyDown(
                          event,
                          index,
                        )
                      }
                      className={cn(
                        "relative isolate min-h-[6rem]",
                        "w-[min(82vw,19rem)] shrink-0",
                        "snap-start overflow-hidden",
                        "touch-manipulation rounded-2xl",
                        "border px-4 py-4 text-left",
                        "transition-[border-color,background-color,transform,box-shadow]",
                        "duration-300",
                        "active:scale-[0.985]",
                        "sm:min-h-[7rem] sm:w-auto",
                        "sm:px-5 sm:py-4",
                        "focus-visible:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-brand-champagne",
                        "focus-visible:ring-offset-2",
                        "focus-visible:ring-offset-brand-olive",
                        isLastOddItem &&
                          "sm:col-span-2",
                        isActive
                          ? cn(
                              "border-brand-champagne",
                              "bg-brand-ivory/[0.12]",
                              "shadow-[0_14px_30px_rgba(0,0,0,0.10)]",
                            )
                          : cn(
                              "border-brand-ivory/15",
                              "bg-brand-ivory/[0.035]",
                              "lg:hover:border-brand-ivory/30",
                              "lg:hover:bg-brand-ivory/[0.07]",
                            ),
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-y-0 left-0",
                          "w-1 origin-bottom",
                          "bg-brand-champagne",
                          "transition-transform duration-300",
                          "motion-reduce:transition-none",
                          isActive
                            ? "scale-y-100"
                            : "scale-y-0",
                        )}
                      />

                      <span className="small-label text-brand-champagne">
                        {String(index + 1).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <span
                        className={cn(
                          "mt-1.5 block min-w-0",
                          "font-display",
                          "text-[1.35rem] leading-[1.08]",
                          "[overflow-wrap:anywhere]",
                          "sm:text-2xl",
                          "lg:text-[1.5rem]",
                        )}
                      >
                        {craft.title}
                      </span>
                    </button>
                  );
                },
              )}
            </div>

            <div
              id={panelId}
              role="tabpanel"
              aria-labelledby={`${componentId}-tab-${active}`}
              aria-live="polite"
              aria-atomic="true"
              tabIndex={0}
              className={cn(
                "mt-5 min-w-0 rounded-xl",
                "sm:mt-6",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-brand-champagne",
                "focus-visible:ring-offset-2",
                "focus-visible:ring-offset-brand-olive",
              )}
            >
              <p
                key={item.slug}
                className={cn(
                  "max-w-xl",
                  "text-[0.95rem] leading-7",
                  "text-brand-ivory/70",
                  "[overflow-wrap:anywhere]",
                  "sm:text-base sm:leading-8",
                )}
              >
                {item.description}
              </p>
            </div>

            <Link
              href="/our-craft"
              className={cn(
                "mt-7 inline-flex min-h-12",
                "w-full touch-manipulation",
                "items-center justify-center gap-2",
                "rounded-full bg-brand-ivory",
                "px-5 py-3",
                "text-center text-sm font-bold",
                "text-brand-olive",
                "transition-[background-color,transform]",
                "duration-300",
                "active:scale-[0.98]",
                "sm:w-auto",
                "lg:hover:-translate-y-0.5",
                "lg:hover:bg-brand-champagne",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-brand-champagne",
                "focus-visible:ring-offset-2",
                "focus-visible:ring-offset-brand-olive",
              )}
            >
              Explore our craft

              <ArrowUpRight
                size={17}
                aria-hidden="true"
                className="shrink-0"
              />
            </Link>
          </RevealGroup>
        </div>
      </div>
    </SectionTransition>
  );
}
