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
  type MouseEvent,
  type TouchEvent,
} from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { RevealGroup } from "@/components/motion/RevealGroup";
import { SectionTransition } from "@/components/motion/SectionTransition";
import { categoryExplorer } from "@/data/home";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type CategoryExplorerItem =
  (typeof categoryExplorer)[number];

type TouchPoint = {
  x: number;
  y: number;
};

/**
 * Convert the fixed tuple into a normal readonly array.
 *
 * Without this cast, TypeScript knows that categoryExplorer
 * contains exactly seven entries and types its length as `7`.
 */
const categories =
  categoryExplorer as readonly CategoryExplorerItem[];

const FINE_POINTER_QUERY =
  "(hover: hover) and (pointer: fine)";

const SWIPE_THRESHOLD = 44;
const SWIPE_DIRECTION_RATIO = 1.15;
const VERTICAL_CANCEL_THRESHOLD = 12;
const CLICK_SUPPRESSION_DURATION = 420;

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

export function VisualCategoryExplorer() {
  const [active, setActive] = useState(0);

  const reducedMotion = useReducedMotion();

  const tabIdPrefix = useId();
  const panelId = useId();

  const canHoverRef = useRef(false);
  const touchStartRef = useRef<TouchPoint | null>(null);
  const suppressClickRef = useRef(false);

  const clickSuppressionTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const tabsViewportRef =
    useRef<HTMLDivElement | null>(null);

  const tabButtonRefs = useRef<
    Array<HTMLButtonElement | null>
  >([]);

  /**
   * Explicitly annotate this as number so TypeScript does
   * not preserve the original tuple-length literal.
   */
  const categoryCount: number = categories.length;

  const activeIndex =
    categoryCount > 0
      ? Math.min(active, categoryCount - 1)
      : 0;

  const current = categories[activeIndex];

  const clearClickSuppressionTimer =
    useCallback(() => {
      if (
        clickSuppressionTimerRef.current === null
      ) {
        return;
      }

      clearTimeout(
        clickSuppressionTimerRef.current,
      );

      clickSuppressionTimerRef.current = null;
    }, []);

  const suppressNextClick = useCallback(() => {
    clearClickSuppressionTimer();

    suppressClickRef.current = true;

    clickSuppressionTimerRef.current =
      setTimeout(() => {
        suppressClickRef.current = false;
        clickSuppressionTimerRef.current = null;
      }, CLICK_SUPPRESSION_DURATION);
  }, [clearClickSuppressionTimer]);

  const selectCategory = useCallback(
    (index: number) => {
      if (index < 0 || index >= categoryCount) {
        return;
      }

      setActive(index);
    },
    [categoryCount],
  );

  const showPrevious = useCallback(() => {
    if (categoryCount < 2) {
      return;
    }

    setActive(
      (currentIndex) =>
        (currentIndex - 1 + categoryCount) %
        categoryCount,
    );
  }, [categoryCount]);

  const showNext = useCallback(() => {
    if (categoryCount < 2) {
      return;
    }

    setActive(
      (currentIndex) =>
        (currentIndex + 1) % categoryCount,
    );
  }, [categoryCount]);

  const focusCategory = useCallback(
    (index: number) => {
      if (index < 0 || index >= categoryCount) {
        return;
      }

      selectCategory(index);

      requestAnimationFrame(() => {
        tabButtonRefs.current[index]?.focus();
      });
    },
    [categoryCount, selectCategory],
  );

  /**
   * Only enable hover-driven category selection when the
   * device has a real mouse or trackpad.
   *
   * This avoids synthetic mobile hover events.
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      FINE_POINTER_QUERY,
    );

    const updateHoverCapability = () => {
      canHoverRef.current = mediaQuery.matches;
    };

    updateHoverCapability();

    mediaQuery.addEventListener(
      "change",
      updateHoverCapability,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateHoverCapability,
      );
    };
  }, []);

  /**
   * Keep state valid if categories change during development
   * or hot module replacement.
   */
  useEffect(() => {
    if (active !== activeIndex) {
      setActive(activeIndex);
    }
  }, [active, activeIndex]);

  /**
   * Automatically center the active mobile category tab
   * after a swipe or navigation-button action.
   */
  useEffect(() => {
    const viewport = tabsViewportRef.current;
    const activeButton =
      tabButtonRefs.current[activeIndex];

    if (!viewport || !activeButton) {
      return;
    }

    if (
      viewport.scrollWidth <= viewport.clientWidth
    ) {
      return;
    }

    const targetLeft =
      activeButton.offsetLeft -
      (viewport.clientWidth -
        activeButton.offsetWidth) /
        2;

    viewport.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [activeIndex, reducedMotion]);

  useEffect(() => {
    return () => {
      clearClickSuppressionTimer();
    };
  }, [clearClickSuppressionTimer]);

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (categoryCount < 1) {
      return;
    }

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp": {
        event.preventDefault();

        const previousIndex =
          (index - 1 + categoryCount) %
          categoryCount;

        focusCategory(previousIndex);
        break;
      }

      case "ArrowRight":
      case "ArrowDown": {
        event.preventDefault();

        const nextIndex =
          (index + 1) % categoryCount;

        focusCategory(nextIndex);
        break;
      }

      case "Home":
        event.preventDefault();
        focusCategory(0);
        break;

      case "End":
        event.preventDefault();
        focusCategory(categoryCount - 1);
        break;

      default:
        break;
    }
  };

  const handlePanelKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
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
        selectCategory(0);
        break;

      case "End":
        event.preventDefault();
        selectCategory(categoryCount - 1);
        break;

      default:
        break;
    }
  };

  const handleTouchStart = (
    event: TouchEvent<HTMLDivElement>,
  ) => {
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

  const handleTouchMove = (
    event: TouchEvent<HTMLDivElement>,
  ) => {
    const start = touchStartRef.current;
    const touch = event.touches[0];

    if (!start || !touch) {
      return;
    }

    const horizontalMagnitude = Math.abs(
      start.x - touch.clientX,
    );

    const verticalMagnitude = Math.abs(
      start.y - touch.clientY,
    );

    /**
     * Cancel swipe detection when the user is clearly
     * scrolling the page vertically.
     */
    if (
      verticalMagnitude >=
        VERTICAL_CANCEL_THRESHOLD &&
      verticalMagnitude >
        horizontalMagnitude *
          SWIPE_DIRECTION_RATIO
    ) {
      touchStartRef.current = null;
    }
  };

  const handleTouchEnd = (
    event: TouchEvent<HTMLDivElement>,
  ) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];

    touchStartRef.current = null;

    if (!start || !touch) {
      return;
    }

    const horizontalDistance =
      start.x - touch.clientX;

    const verticalDistance =
      start.y - touch.clientY;

    const horizontalMagnitude = Math.abs(
      horizontalDistance,
    );

    const verticalMagnitude = Math.abs(
      verticalDistance,
    );

    const isHorizontalSwipe =
      horizontalMagnitude >= SWIPE_THRESHOLD &&
      horizontalMagnitude >
        verticalMagnitude *
          SWIPE_DIRECTION_RATIO;

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

  const handleClickCapture = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    /**
     * detail === 0 represents keyboard-generated clicks.
     * Keyboard activation must remain available.
     */
    if (
      !suppressClickRef.current ||
      event.detail === 0
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    suppressClickRef.current = false;
    clearClickSuppressionTimer();
  };

  if (!current) {
    return null;
  }

  const activeTabId = `${tabIdPrefix}-tab-${activeIndex}`;

  const collectionHref = `/collections?filter=${encodeURIComponent(
    current.filter,
  )}`;

  return (
    <SectionTransition
      variant="rounded-light"
      className={cn(
        "section-shell overflow-x-clip",
        "bg-brand-ivory",

        // Mobile
        "!py-14",

        // Larger phones
        "min-[390px]:!py-16",

        // Tablet
        "md:!py-20",

        // Desktop
        "lg:!py-24",
      )}
      data-nav-theme="light"
      aria-labelledby="category-explorer-heading"
    >
      <div className="section-inner">
        {/* Heading */}
        <RevealGroup
          className="max-w-3xl"
          stagger={0.07}
          start="top 84%"
        >
          <p className="small-label text-brand-sage">
            Find your direction
          </p>

          <h2
            id="category-explorer-heading"
            className={cn(
              "mt-4 max-w-full",
              "text-pretty font-display",
              "font-normal text-brand-olive",

              "text-[clamp(2.5rem,12vw,3.3rem)]",
              "leading-[0.98]",

              "sm:text-6xl",
              "lg:text-[4.75rem]",
            )}
          >
            Browse by what{" "}
            <span className="block">you need.</span>
          </h2>
        </RevealGroup>

        <RevealGroup
          className={cn(
            "mt-8 grid min-w-0 gap-5",
            "sm:mt-10 sm:gap-6",

            "lg:grid-cols-[minmax(18rem,0.88fr)_minmax(0,1.12fr)]",
            "lg:items-stretch",

            "xl:gap-7",
          )}
          stagger={0.08}
          start="top 80%"
        >
          {/* Category navigation */}
          <div
            ref={tabsViewportRef}
            className={cn(
              "category-tabs no-scrollbar",
              "min-w-0 max-w-full",
              "overflow-x-auto",
              "overscroll-x-contain",
              "pb-2",

              "lg:overflow-visible",
              "lg:pb-0",
            )}
          >
            <div
              role="tablist"
              aria-label="Browse invitation categories"
              className={cn(
                // Mobile horizontal tabs
                "flex min-w-max",
                "snap-x snap-mandatory",
                "gap-2 p-1",

                // Desktop vertical panel
                "lg:block lg:min-w-0",
                "lg:overflow-hidden",
                "lg:rounded-[1.5rem]",
                "lg:border",
                "lg:border-brand-olive/10",
                "lg:bg-brand-white/55",
                "lg:p-0",
              )}
            >
              {categories.map((item, index) => {
                const isActive =
                  activeIndex === index;

                return (
                  <button
                    ref={(element) => {
                      tabButtonRefs.current[index] =
                        element;
                    }}
                    id={`${tabIdPrefix}-tab-${index}`}
                    key={item.slug}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={panelId}
                    tabIndex={isActive ? 0 : -1}
                    onMouseEnter={() => {
                      if (canHoverRef.current) {
                        selectCategory(index);
                      }
                    }}
                    onFocus={() =>
                      selectCategory(index)
                    }
                    onClick={() =>
                      selectCategory(index)
                    }
                    onKeyDown={(event) =>
                      handleTabKeyDown(event, index)
                    }
                    className={cn(
                      "category-tab group relative",
                      "grid shrink-0 snap-center",
                      "touch-manipulation text-left",

                      // Mobile tab size
                      "w-[13.25rem]",
                      "grid-cols-[1.65rem_minmax(0,1fr)_2rem]",
                      "items-center gap-2.5",
                      "rounded-[1.1rem]",
                      "border px-3.5 py-3.5",

                      "transition-[background-color,border-color,color,box-shadow,transform]",
                      "duration-300",

                      "active:scale-[0.985]",

                      "min-[390px]:w-[14.5rem]",
                      "min-[390px]:px-4",

                      "sm:w-[17rem]",
                      "sm:grid-cols-[1.8rem_minmax(0,1fr)_2.25rem]",
                      "sm:gap-3",
                      "sm:px-5 sm:py-4",

                      // Desktop tab size
                      "lg:min-h-[5.2rem]",
                      "lg:w-full lg:snap-none",
                      "lg:rounded-none",
                      "lg:border-x-0 lg:border-t-0",
                      "lg:px-5 lg:py-4",
                      "lg:last:border-b-0",
                      "lg:active:scale-100",

                      "focus-visible:z-20",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-inset",
                      "focus-visible:ring-brand-sage",

                      "motion-reduce:transform-none",
                      "motion-reduce:transition-none",

                      isActive
                        ? cn(
                            "border-brand-olive/15",
                            "bg-brand-white",
                            "text-brand-olive",
                            "shadow-[0_12px_30px_rgba(47,49,37,0.10)]",
                            "ring-1 ring-inset",
                            "ring-brand-olive/[0.05]",
                          )
                        : cn(
                            "border-brand-olive/10",
                            "bg-brand-white/45",
                            "text-brand-olive/55",

                            "lg:bg-transparent",
                            "lg:hover:bg-brand-white/70",
                            "lg:hover:text-brand-olive",
                          ),
                    )}
                  >
                    {/* Desktop active marker */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-y-3 left-0",
                        "hidden w-[3px]",
                        "rounded-r-full",
                        "bg-brand-sage",
                        "transition-opacity duration-300",
                        "lg:block",
                        isActive
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />

                    <span
                      className={cn(
                        "small-label",
                        "transition-colors duration-300",
                        isActive
                          ? "text-brand-sage"
                          : cn(
                              "text-brand-olive/38",
                              "lg:group-hover:text-brand-sage",
                            ),
                      )}
                    >
                      {formatNumber(index + 1)}
                    </span>

                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block overflow-hidden",
                          "font-display",
                          "text-[1.28rem]",
                          "leading-[1.05]",

                          "sm:text-[1.5rem]",
                          "lg:text-[1.75rem]",

                          "[display:-webkit-box]",
                          "[-webkit-box-orient:vertical]",
                          "[-webkit-line-clamp:2]",
                        )}
                      >
                        {item.title}
                      </span>

                      {/* Description expands on desktop */}
                      <span
                        className={cn(
                          "hidden",
                          "transition-[grid-template-rows,opacity,margin]",
                          "duration-300",
                          "ease-[cubic-bezier(0.22,1,0.36,1)]",

                          "lg:grid",

                          isActive
                            ? cn(
                                "lg:mt-2",
                                "lg:grid-rows-[1fr]",
                                "lg:opacity-70",
                              )
                            : cn(
                                "lg:mt-0",
                                "lg:grid-rows-[0fr]",
                                "lg:opacity-0",
                              ),
                        )}
                      >
                        <span className="overflow-hidden">
                          <span
                            className={cn(
                              "block max-w-md pb-1",
                              "text-sm leading-5",
                            )}
                          >
                            {item.description}
                          </span>
                        </span>
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex h-8 w-8 shrink-0",
                        "items-center justify-center",
                        "rounded-full border",

                        "transition-[background-color,border-color,transform]",
                        "duration-300",

                        "sm:h-9 sm:w-9",

                        isActive
                          ? cn(
                              "-translate-y-0.5",
                              "translate-x-0.5",
                              "border-brand-sage/20",
                              "bg-brand-sage/10",
                            )
                          : cn(
                              "border-brand-olive/10",
                              "bg-brand-white/40",
                              "lg:group-hover:border-brand-sage/20",
                              "lg:group-hover:bg-brand-sage/10",
                            ),

                        "motion-reduce:transform-none",
                        "motion-reduce:transition-none",
                      )}
                    >
                      <ArrowUpRight size={16} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active preview */}
          <div
            id={panelId}
            role="tabpanel"
            aria-labelledby={activeTabId}
            tabIndex={0}
            onKeyDown={handlePanelKeyDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
            onClickCapture={handleClickCapture}
            className={cn(
              "category-preview",
              "relative isolate min-w-0",
              "touch-pan-y overflow-hidden",
              "rounded-[1.25rem]",
              "bg-brand-paper shadow-paper",

              // Mobile preview height
              "h-[clamp(22rem,112vw,26rem)]",

              "sm:h-[29rem]",
              "sm:rounded-[1.625rem]",

              // Desktop fills available grid height
              "lg:h-auto",
              "lg:min-h-[34rem]",

              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-brand-sage",
              "focus-visible:ring-offset-4",
              "focus-visible:ring-offset-brand-ivory",
            )}
          >
            <p className="sr-only" aria-live="polite">
              Selected category: {current.title}.
              Swipe left or right to browse categories.
            </p>

            {/*
             * Render only the selected image.
             * This prevents all category images from loading
             * simultaneously on mobile.
             */}
            <Image
              key={`image-${current.slug}`}
              src={current.image}
              alt={`${current.title} category preview`}
              fill
              priority={activeIndex === 0}
              draggable={false}
              className={cn(
                "category-preview-image",
                "select-none object-cover",
              )}
              sizes={[
                "(max-width: 639px) 100vw",
                "(max-width: 1023px) 100vw",
                "56vw",
              ].join(", ")}
            />

            {/* Readability gradient */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none",
                "absolute inset-0",
                "bg-gradient-to-t",
                "from-brand-olive/95",
                "via-brand-olive/30",
                "via-55%",
                "to-transparent",
                "to-82%",
              )}
            />

            {/* Mobile swipe hint */}
            {categoryCount > 1 && (
              <div
                aria-hidden="true"
                className={cn(
                  "absolute right-4 top-4 z-10",
                  "inline-flex items-center gap-1.5",
                  "rounded-full",
                  "border border-brand-white/20",
                  "bg-brand-olive/25",
                  "px-3 py-2",
                  "text-[0.58rem] font-bold",
                  "uppercase tracking-[0.12em]",
                  "text-brand-white/85",
                  "backdrop-blur-md",
                  "lg:hidden",
                )}
              >
                <ChevronLeft size={13} />
                Swipe
                <ChevronRight size={13} />
              </div>
            )}

            {/* Preview copy */}
            <div
              key={`content-${current.slug}`}
              className={cn(
                "category-preview-content",
                "absolute inset-x-0 bottom-0",
                "z-10 p-4 pt-20",
                "text-brand-white",

                "min-[390px]:p-5",
                "min-[390px]:pt-24",

                "sm:p-7 sm:pt-28",
                "lg:p-8",
              )}
            >
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="small-label text-brand-champagne">
                    Category{" "}
                    {formatNumber(activeIndex + 1)}
                  </p>

                  <h3
                    className={cn(
                      "mt-2 max-w-[95%]",
                      "break-words font-display",
                      "font-normal leading-[0.98]",

                      "text-[clamp(2rem,9vw,2.75rem)]",

                      "sm:text-5xl",
                      "lg:text-[3.35rem]",
                    )}
                  >
                    {current.title}
                  </h3>
                </div>

                <div
                  className={cn(
                    "hidden shrink-0",
                    "items-center gap-2",
                    "sm:flex",
                  )}
                  aria-label={`Category ${
                    activeIndex + 1
                  } of ${categoryCount}`}
                >
                  <span className="font-display text-xl text-brand-champagne">
                    {formatNumber(activeIndex + 1)}
                  </span>

                  <span
                    aria-hidden="true"
                    className="h-px w-6 bg-brand-white/30"
                  />

                  <span className="small-label text-brand-white/55">
                    {formatNumber(categoryCount)}
                  </span>
                </div>
              </div>

              <p
                className={cn(
                  "mt-3 max-w-xl",
                  "text-[0.86rem] leading-6",
                  "text-brand-white/80",

                  "sm:text-base sm:leading-7",
                )}
              >
                {current.description}
              </p>

              <div
                className={cn(
                  "mt-5 flex items-center",
                  "justify-between gap-3",
                )}
              >
                <Link
                  href={collectionHref}
                  className={cn(
                    "group inline-flex",
                    "min-h-11 touch-manipulation",
                    "flex-1 items-center",
                    "justify-center gap-2",
                    "rounded-full",
                    "border border-brand-white/30",
                    "bg-brand-white/12",
                    "px-4 py-3",

                    "text-center text-[0.66rem]",
                    "font-bold uppercase",
                    "tracking-[0.12em]",
                    "text-brand-white",

                    "backdrop-blur-sm",

                    "transition-[background-color,border-color,transform]",
                    "duration-300",

                    "active:scale-[0.98]",

                    "min-[420px]:flex-none",
                    "min-[420px]:px-5",

                    "sm:hover:-translate-y-0.5",
                    "sm:hover:border-brand-white/45",
                    "sm:hover:bg-brand-white/20",

                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-brand-champagne",
                    "focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-brand-olive",

                    "motion-reduce:transform-none",
                    "motion-reduce:transition-none",
                  )}
                >
                  Explore category

                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className={cn(
                      "shrink-0",
                      "transition-transform",
                      "duration-300",

                      "sm:group-hover:-translate-y-0.5",
                      "sm:group-hover:translate-x-0.5",

                      "motion-reduce:transform-none",
                      "motion-reduce:transition-none",
                    )}
                  />
                </Link>

                {/* Mobile previous/next controls */}
                {categoryCount > 1 && (
                  <div className="flex shrink-0 items-center gap-2 lg:hidden">
                    <button
                      type="button"
                      onClick={showPrevious}
                      aria-label="Show previous category"
                      className={cn(
                        "flex h-11 w-11",
                        "touch-manipulation",
                        "items-center justify-center",
                        "rounded-full",
                        "border border-brand-white/25",
                        "bg-brand-olive/25",
                        "text-brand-white",
                        "backdrop-blur-sm",

                        "transition-[background-color,transform]",
                        "duration-300",

                        "active:scale-[0.94]",
                        "hover:bg-brand-white/15",

                        "focus-visible:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-brand-champagne",

                        "motion-reduce:transform-none",
                        "motion-reduce:transition-none",
                      )}
                    >
                      <ChevronLeft
                        size={19}
                        aria-hidden="true"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={showNext}
                      aria-label="Show next category"
                      className={cn(
                        "flex h-11 w-11",
                        "touch-manipulation",
                        "items-center justify-center",
                        "rounded-full",
                        "border border-brand-white/25",
                        "bg-brand-olive/25",
                        "text-brand-white",
                        "backdrop-blur-sm",

                        "transition-[background-color,transform]",
                        "duration-300",

                        "active:scale-[0.94]",
                        "hover:bg-brand-white/15",

                        "focus-visible:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-brand-champagne",

                        "motion-reduce:transform-none",
                        "motion-reduce:transition-none",
                      )}
                    >
                      <ChevronRight
                        size={19}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile progress indicators */}
              {categoryCount > 1 && (
                <div
                  className={cn(
                    "mt-5 flex items-center gap-1.5",
                    "sm:hidden",
                  )}
                  aria-hidden="true"
                >
                  {categories.map((item, index) => (
                    <span
                      key={item.slug}
                      className={cn(
                        "h-1 rounded-full",
                        "transition-[width,background-color]",
                        "duration-300",
                        index === activeIndex
                          ? cn(
                              "w-7",
                              "bg-brand-champagne",
                            )
                          : cn(
                              "w-2",
                              "bg-brand-white/35",
                            ),
                      )}
                    />
                  ))}
                </div>
              )}
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
          </div>
        </RevealGroup>
      </div>

      <style jsx global>{`
        .category-tabs {
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-inline: contain;
        }

        .category-tabs::-webkit-scrollbar {
          display: none;
        }

        .category-tab {
          -webkit-tap-highlight-color: transparent;
        }

        .category-preview {
          contain: layout paint;
          -webkit-tap-highlight-color: transparent;
        }

        .category-preview-image {
          animation: category-preview-image-in 650ms
            cubic-bezier(0.22, 1, 0.36, 1);
        }

        .category-preview-content {
          animation: category-preview-content-in 440ms
            cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes category-preview-image-in {
          from {
            opacity: 0;
            transform: scale(1.035);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes category-preview-content-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .category-preview-image,
          .category-preview-content {
            animation: none !important;
          }
        }
      `}</style>
    </SectionTransition>
  );
}