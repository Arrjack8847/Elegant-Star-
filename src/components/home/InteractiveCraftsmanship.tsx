
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

const SWIPE_THRESHOLD = 42;
const SWIPE_DIRECTION_RATIO = 1.15;
const MOBILE_QUERY = "(max-width: 639px)";

type SwipePoint = {
  x: number;
  y: number;
};

export function InteractiveCraftsmanship() {
  const [active, setActive] = useState(0);

  const componentId = useId();

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const swipeStartRef = useRef<SwipePoint | null>(null);

  /*
   * Explicit number typing prevents TypeScript from treating
   * the fixed tuple length as the literal type 5.
   */
  const itemCount: number = craftsmanshipItems.length;

  const item =
    craftsmanshipItems[active] ?? craftsmanshipItems[0];

  const panelId = `${componentId}-panel`;

  const selectTab = useCallback(
    (index: number, moveFocus = false) => {
      if (itemCount <= 0) {
        return;
      }

      const normalizedIndex =
        ((index % itemCount) + itemCount) % itemCount;

      setActive(normalizedIndex);

      if (moveFocus) {
        window.requestAnimationFrame(() => {
          tabRefs.current[normalizedIndex]?.focus();
        });
      }
    },
    [itemCount],
  );

  /*
   * Keep the selected mobile pill visible.
   * The desktop grid remains stationary.
   */
  useEffect(() => {
    if (!window.matchMedia(MOBILE_QUERY).matches) {
      return;
    }

    const activeTab = tabRefs.current[active];
    const tabList = tabListRef.current;

    if (!activeTab || !tabList) {
      return;
    }

    const hasOverflow =
      tabList.scrollWidth > tabList.clientWidth + 2;

    if (!hasOverflow) {
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

  if (!item || itemCount <= 0) {
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

  function releasePointerCapture(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (
      event.currentTarget.hasPointerCapture?.(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture?.(
        event.pointerId,
      );
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
    releasePointerCapture(event);

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

    selectTab(deltaX < 0 ? active + 1 : active - 1);
  }

  function handleMediaPointerCancel(
    event: PointerEvent<HTMLDivElement>,
  ) {
    swipeStartRef.current = null;
    releasePointerCapture(event);
  }

  const progress = (active + 1) / itemCount;

  return (
    <SectionTransition
      variant="rounded-dark"
      className={cn(
        "section-shell overflow-x-clip",
        "bg-brand-olive text-brand-ivory",

        /*
         * Compact phone spacing.
         * Safe-area padding protects the final button on iOS.
         */
        "!pb-[calc(4rem+env(safe-area-inset-bottom))]",
        "!pt-16",
        "min-[390px]:!pt-20",
        "sm:!pb-24 sm:!pt-28",
        "lg:!pb-28 lg:!pt-36",
        "xl:!pt-40",
      )}
      data-nav-theme="dark"
      aria-labelledby="craftsmanship-heading"
    >
      <div className="section-inner min-w-0">
        <div
          className={cn(
            "grid min-w-0 grid-cols-1 gap-6",
            "min-[390px]:gap-7",
            "sm:gap-12",
            "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]",
            "lg:items-center lg:gap-12",
            "xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]",
            "xl:gap-16",
          )}
        >
          {/* ============================================================ */}
          {/* Selected image                                               */}
          {/* ============================================================ */}

          <ImageReveal
            className={cn(
              "relative isolate min-w-0 overflow-hidden",
              "h-[clamp(17.5rem,78vw,20rem)]",
              "rounded-[1.25rem] bg-brand-olive/50",
              "min-[390px]:h-[20.5rem]",
              "min-[430px]:h-[22rem]",
              "sm:h-[30rem] sm:rounded-[1.75rem]",
              "md:h-[33rem]",
              "lg:h-[35rem]",
              "xl:h-[38rem]",
            )}
          >
            <div
              className="relative h-full w-full touch-pan-y select-none"
              onPointerDown={handleMediaPointerDown}
              onPointerUp={handleMediaPointerUp}
              onPointerCancel={handleMediaPointerCancel}
            >
              {/* Mounted image stack for smooth crossfades */}
              {craftsmanshipItems.map((craft, index) => {
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
                      (max-width: 389px) calc(100vw - 2rem),
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
                        "z-0 scale-[1.02] opacity-0",
                      !isActive &&
                        !isPrevious &&
                        "z-0 scale-[1.035] opacity-0",
                    )}
                  />
                );
              })}

              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-0 z-20",
                  "bg-gradient-to-t",
                  "from-brand-olive/90",
                  "via-brand-olive/5",
                  "to-black/10",
                )}
              />

              {/* Counter */}
              <div
                aria-hidden="true"
                className={cn(
                  "absolute left-3.5 top-3.5 z-30",
                  "inline-flex min-h-9 items-center",
                  "rounded-full border border-brand-ivory/15",
                  "bg-brand-olive/55 px-3",
                  "text-[0.68rem] font-bold tabular-nums",
                  "text-brand-ivory/80 backdrop-blur-xl",
                  "sm:left-5 sm:top-5 sm:min-h-10",
                  "sm:px-3.5 sm:text-xs",
                )}
              >
                {String(active + 1).padStart(2, "0")}

                <span className="mx-1.5 text-brand-ivory/35">
                  /
                </span>

                {String(itemCount).padStart(2, "0")}
              </div>

              {/* Previous and next buttons */}
              {itemCount > 1 ? (
                <div
                  className={cn(
                    "absolute right-3.5 top-3.5 z-30",
                    "flex items-center gap-1.5",
                    "sm:right-5 sm:top-5 sm:gap-2",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => selectTab(active - 1)}
                    aria-label="View previous craftsmanship detail"
                    className={cn(
                      "grid h-11 w-11 place-items-center",
                      "touch-manipulation rounded-full border",
                      "border-brand-ivory/15",
                      "bg-brand-olive/55",
                      "text-brand-ivory backdrop-blur-xl",
                      "transition-[color,background-color,border-color,transform]",
                      "duration-300",
                      "active:scale-[0.95]",
                      "active:bg-brand-champagne",
                      "active:text-brand-olive",
                      "lg:hover:border-brand-champagne",
                      "lg:hover:bg-brand-champagne",
                      "lg:hover:text-brand-olive",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-brand-champagne",
                    )}
                  >
                    <ChevronLeft
                      size={18}
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => selectTab(active + 1)}
                    aria-label="View next craftsmanship detail"
                    className={cn(
                      "grid h-11 w-11 place-items-center",
                      "touch-manipulation rounded-full border",
                      "border-brand-ivory/15",
                      "bg-brand-olive/55",
                      "text-brand-ivory backdrop-blur-xl",
                      "transition-[color,background-color,border-color,transform]",
                      "duration-300",
                      "active:scale-[0.95]",
                      "active:bg-brand-champagne",
                      "active:text-brand-olive",
                      "lg:hover:border-brand-champagne",
                      "lg:hover:bg-brand-champagne",
                      "lg:hover:text-brand-olive",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-brand-champagne",
                    )}
                  >
                    <ChevronRight
                      size={18}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              ) : null}

              {/* Image information */}
              <div
                className={cn(
                  "absolute inset-x-4 bottom-4 z-30 min-w-0",
                  "min-[390px]:inset-x-5",
                  "min-[390px]:bottom-5",
                  "sm:inset-x-7 sm:bottom-7",
                  "lg:inset-x-8 lg:bottom-8",
                )}
              >
                {/* Hidden on phones to reduce visual height */}
                <p className="small-label hidden text-brand-champagne sm:block">
                  Selected detail
                </p>

                <h3
                  key={item.slug}
                  className={cn(
                    "max-w-[94%] font-display",
                    "text-[clamp(1.65rem,7vw,2.15rem)]",
                    "leading-[0.98]",
                    "tracking-[-0.015em]",
                    "[overflow-wrap:anywhere]",
                    "sm:mt-2 sm:max-w-[82%] sm:text-5xl",
                    "lg:text-[3rem]",
                    "xl:text-[3.35rem]",
                  )}
                >
                  {item.title}
                </h3>

                <div
                  aria-hidden="true"
                  className={cn(
                    "mt-3 h-px w-full",
                    "overflow-hidden bg-brand-ivory/15",
                    "sm:mt-5",
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

          {/* ============================================================ */}
          {/* Content                                                      */}
          {/* ============================================================ */}

          <RevealGroup
            className="min-w-0 lg:py-2"
            stagger={0.07}
            start="top 88%"
          >
            <p className="small-label text-brand-champagne">
              Craftsmanship
            </p>

            <h2
              id="craftsmanship-heading"
              className={cn(
                "mt-2 max-w-[11ch] font-display",
                "text-[clamp(2.35rem,10.5vw,3rem)]",
                "leading-[0.94]",
                "tracking-[-0.035em]",
                "[overflow-wrap:anywhere]",
                "sm:mt-4 sm:max-w-[13ch] sm:text-6xl",
                "lg:text-[4rem]",
                "xl:text-[4.5rem]",
              )}
            >
              {/* Short phone heading */}
              <span className="sm:hidden">
                Every detail matters.
              </span>

              {/* Full tablet and desktop heading */}
              <span className="hidden sm:block">
                Look closer.
                <span className="block">
                  Every detail matters.
                </span>
              </span>
            </h2>

            {/* Short mobile description */}
            <p className="mt-3 max-w-sm text-sm leading-6 text-brand-ivory/65 sm:hidden">
              Materials, finishing and thoughtful details.
            </p>

            {/* Full tablet and desktop description */}
            <p
              className={cn(
                "mt-6 hidden max-w-xl",
                "text-base leading-8 text-brand-ivory/65",
                "sm:block",
              )}
            >
              Explore the materials, finishing and thoughtful
              details that shape every Elegant Star piece.
            </p>

            {/* ========================================================== */}
            {/* Mobile pills / desktop cards                               */}
            {/* ========================================================== */}

            <div
              ref={tabListRef}
              role="tablist"
              aria-label="Craftsmanship details"
              aria-orientation="horizontal"
              className={cn(
                "mt-5 flex min-w-0",
                "snap-x snap-mandatory gap-2",
                "overflow-x-auto overscroll-x-contain",
                "pb-1 pr-4",
                "[scrollbar-width:none]",
                "[&::-webkit-scrollbar]:hidden",

                "sm:mt-8 sm:grid sm:grid-cols-2",
                "sm:gap-3 sm:overflow-visible",
                "sm:pb-0 sm:pr-0",
              )}
            >
              {craftsmanshipItems.map((craft, index) => {
                const isActive = active === index;

                const isLastOddItem =
                  itemCount % 2 !== 0 &&
                  index === itemCount - 1;

                const tabId = `${componentId}-tab-${index}`;

                return (
                  <button
                    key={craft.slug}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    id={tabId}
                    type="button"
                    role="tab"
                    tabIndex={isActive ? 0 : -1}
                    aria-selected={isActive}
                    aria-controls={panelId}
                    onClick={() => selectTab(index)}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") {
                        setActive(index);
                      }
                    }}
                    onKeyDown={(event) =>
                      handleTabKeyDown(event, index)
                    }
                    className={cn(
                      /*
                       * Compact pill appearance on phones.
                       */
                      "relative isolate flex min-h-12",
                      "w-auto max-w-[78vw] shrink-0",
                      "snap-start items-center gap-2",
                      "overflow-hidden whitespace-nowrap",
                      "touch-manipulation rounded-full",
                      "border px-4 py-2.5 text-left",
                      "transition-[border-color,background-color,transform,box-shadow]",
                      "duration-300",
                      "active:scale-[0.97]",

                      /*
                       * Editorial card appearance from sm upward.
                       */
                      "sm:block sm:min-h-[7rem]",
                      "sm:w-auto sm:max-w-none",
                      "sm:whitespace-normal sm:rounded-2xl",
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
                            "shadow-[0_10px_24px_rgba(0,0,0,0.10)]",
                          )
                        : cn(
                            "border-brand-ivory/15",
                            "bg-brand-ivory/[0.035]",
                            "lg:hover:border-brand-ivory/30",
                            "lg:hover:bg-brand-ivory/[0.07]",
                          ),
                    )}
                  >
                    {/* Desktop active side line */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-y-0 left-0 hidden",
                        "w-1 origin-bottom",
                        "bg-brand-champagne",
                        "transition-transform duration-300",
                        "motion-reduce:transition-none",
                        "sm:block",
                        isActive
                          ? "scale-y-100"
                          : "scale-y-0",
                      )}
                    />

                    <span
                      className={cn(
                        "shrink-0 text-[0.63rem]",
                        "font-bold tracking-[0.12em]",
                        "text-brand-champagne",
                        "sm:small-label",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={cn(
                        "min-w-0 truncate",
                        "text-sm font-bold leading-5",
                        "sm:mt-1.5 sm:block",
                        "sm:whitespace-normal",
                        "sm:font-display sm:text-2xl",
                        "sm:font-normal sm:leading-[1.08]",
                        "sm:[overflow-wrap:anywhere]",
                        "lg:text-[1.5rem]",
                      )}
                    >
                      {craft.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Full description is shown on tablet and desktop only */}
            <div
              id={panelId}
              role="tabpanel"
              aria-labelledby={`${componentId}-tab-${active}`}
              aria-live="polite"
              aria-atomic="true"
              tabIndex={0}
              className={cn(
                "hidden min-w-0 rounded-xl",
                "sm:mt-6 sm:block",
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
                  "max-w-xl text-base leading-8",
                  "text-brand-ivory/70",
                  "[overflow-wrap:anywhere]",
                )}
              >
                {item.description}
              </p>
            </div>

            <Link
              href="/our-craft"
              className={cn(
                "mt-5 inline-flex min-h-12",
                "w-full touch-manipulation",
                "items-center justify-center gap-2",
                "rounded-full bg-brand-ivory",
                "px-5 py-3",
                "text-center text-sm font-bold",
                "text-brand-olive",
                "transition-[background-color,transform]",
                "duration-300",
                "active:scale-[0.98]",
                "sm:mt-7 sm:w-auto",
                "lg:hover:-translate-y-0.5",
                "lg:hover:bg-brand-champagne",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-brand-champagne",
                "focus-visible:ring-offset-2",
                "focus-visible:ring-offset-brand-olive",
              )}
            >
              <span className="sm:hidden">
                View craft
              </span>

              <span className="hidden sm:inline">
                Explore our craft
              </span>

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

