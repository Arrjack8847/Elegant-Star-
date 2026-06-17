"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { RevealGroup } from "@/components/motion/RevealGroup";
import { SectionTransition } from "@/components/motion/SectionTransition";
import { featuredCollections } from "@/data/collections";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type CardPosition =
  | "active"
  | "previous"
  | "next"
  | "far-previous"
  | "far-next"
  | "hidden";

type FeaturedCollectionItem =
  (typeof featuredCollections)[number] & {
    objectPosition?: CSSProperties["objectPosition"];
  };

type GestureAxis =
  | "pending"
  | "horizontal"
  | "vertical";

type PointerGesture = {
  pointerId: number;
  startX: number;
  startY: number;
  lastX: number;
  lastTime: number;
  velocityX: number;
  axis: GestureAxis;
};

const collections =
  featuredCollections as readonly FeaturedCollectionItem[];

const HOVER_DELAY = 140;

const DRAG_START_THRESHOLD = 7;
const SWIPE_DISTANCE_THRESHOLD = 44;
const SWIPE_VELOCITY_THRESHOLD = 0.42;
const SWIPE_DIRECTION_RATIO = 1.12;

const CLICK_SUPPRESSION_DURATION = 450;

const FINE_POINTER_QUERY =
  "(hover: hover) and (pointer: fine)";

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

function getCircularOffset(
  index: number,
  activeIndex: number,
  total: number,
) {
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
  const offset = getCircularOffset(
    index,
    activeIndex,
    total,
  );

  if (offset === 0) return "active";
  if (offset === -1) return "previous";
  if (offset === 1) return "next";
  if (offset === -2) return "far-previous";
  if (offset === 2) return "far-next";

  return "hidden";
}

function getImageSizes(position: CardPosition) {
  switch (position) {
    case "active":
      return [
        "(max-width: 379px) 92vw",
        "(max-width: 767px) 88vw",
        "(max-width: 1023px) 88vw",
        "(max-width: 1279px) 43vw",
        "45vw",
      ].join(", ");

    case "previous":
    case "next":
      return [
        "(max-width: 379px) 78vw",
        "(max-width: 767px) 76vw",
        "(max-width: 1023px) 76vw",
        "(max-width: 1279px) 31vw",
        "33vw",
      ].join(", ");

    case "far-previous":
    case "far-next":
      return "(max-width: 1023px) 1px, 24vw";

    default:
      return "1px";
  }
}

export function InteractiveFeaturedCollections() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reducedMotion = useReducedMotion();

  const tabIdPrefix = useId();
  const panelId = useId();

  const hoverTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const clickSuppressionTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const canHoverRef = useRef(false);
  const suppressClickRef = useRef(false);

  const pointerGestureRef =
    useRef<PointerGesture | null>(null);

  const tabsViewportRef =
    useRef<HTMLDivElement | null>(null);

  const deckRef = useRef<HTMLDivElement | null>(
    null,
  );

  const tabButtonRefs = useRef<
    Array<HTMLButtonElement | null>
  >([]);

  /*
   * Explicit number annotation prevents tuple-length
   * comparisons if the source data is declared `as const`.
   */
  const collectionCount: number = collections.length;

  const safeActiveIndex =
    collectionCount > 0
      ? Math.min(activeIndex, collectionCount - 1)
      : 0;

  const currentCollection =
    collections[safeActiveIndex];

  const clearHoverTimer = useCallback(() => {
    if (hoverTimeoutRef.current === null) {
      return;
    }

    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = null;
  }, []);

  const clearClickSuppressionTimer =
    useCallback(() => {
      if (
        clickSuppressionTimeoutRef.current === null
      ) {
        return;
      }

      clearTimeout(
        clickSuppressionTimeoutRef.current,
      );

      clickSuppressionTimeoutRef.current = null;
    }, []);

  const resetDeckDrag = useCallback(
    (animate = true) => {
      const deck = deckRef.current;

      if (!deck) {
        return;
      }

      if (animate && !reducedMotion) {
        deck.dataset.dragResetting = "true";
      } else {
        delete deck.dataset.dragResetting;
      }

      delete deck.dataset.dragging;

      deck.style.setProperty(
        "--collection-drag-x",
        "0px",
      );

      window.setTimeout(() => {
        if (!deckRef.current) {
          return;
        }

        delete deckRef.current.dataset.dragResetting;
      }, reducedMotion ? 0 : 360);
    },
    [reducedMotion],
  );

  const setDeckDrag = useCallback(
    (offset: number) => {
      const deck = deckRef.current;

      if (!deck) {
        return;
      }

      deck.dataset.dragging = "true";
      delete deck.dataset.dragResetting;

      deck.style.setProperty(
        "--collection-drag-x",
        `${offset}px`,
      );
    },
    [],
  );

  const selectCollection = useCallback(
    (index: number) => {
      if (index < 0 || index >= collectionCount) {
        return;
      }

      clearHoverTimer();
      resetDeckDrag(false);
      setActiveIndex(index);
    },
    [
      clearHoverTimer,
      collectionCount,
      resetDeckDrag,
    ],
  );

  const focusCollectionTab = useCallback(
    (index: number) => {
      if (index < 0 || index >= collectionCount) {
        return;
      }

      selectCollection(index);

      requestAnimationFrame(() => {
        tabButtonRefs.current[index]?.focus();
      });
    },
    [collectionCount, selectCollection],
  );

  const scheduleCollection = useCallback(
    (index: number) => {
      if (!canHoverRef.current) {
        return;
      }

      if (index < 0 || index >= collectionCount) {
        return;
      }

      clearHoverTimer();

      hoverTimeoutRef.current = setTimeout(() => {
        resetDeckDrag(false);
        setActiveIndex(index);
        hoverTimeoutRef.current = null;
      }, HOVER_DELAY);
    },
    [
      clearHoverTimer,
      collectionCount,
      resetDeckDrag,
    ],
  );

  const showPrevious = useCallback(() => {
    if (collectionCount < 2) {
      return;
    }

    clearHoverTimer();
    resetDeckDrag(false);

    setActiveIndex(
      (currentIndex) =>
        (currentIndex - 1 + collectionCount) %
        collectionCount,
    );
  }, [
    clearHoverTimer,
    collectionCount,
    resetDeckDrag,
  ]);

  const showNext = useCallback(() => {
    if (collectionCount < 2) {
      return;
    }

    clearHoverTimer();
    resetDeckDrag(false);

    setActiveIndex(
      (currentIndex) =>
        (currentIndex + 1) % collectionCount,
    );
  }, [
    clearHoverTimer,
    collectionCount,
    resetDeckDrag,
  ]);

  const suppressNextClick = useCallback(() => {
    clearClickSuppressionTimer();

    suppressClickRef.current = true;

    clickSuppressionTimeoutRef.current =
      setTimeout(() => {
        suppressClickRef.current = false;
        clickSuppressionTimeoutRef.current = null;
      }, CLICK_SUPPRESSION_DURATION);
  }, [clearClickSuppressionTimer]);

  /*
   * Only run hover selection when a real mouse or trackpad
   * is available. This avoids synthetic hover on mobile.
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

  /*
   * Keep the currently selected tab visible after swipe,
   * keyboard navigation or previous/next controls.
   */
  useEffect(() => {
    const viewport = tabsViewportRef.current;
    const activeButton =
      tabButtonRefs.current[safeActiveIndex];

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
  }, [reducedMotion, safeActiveIndex]);

  /*
   * Keep activeIndex valid when data changes during
   * development or hot module replacement.
   */
  useEffect(() => {
    if (activeIndex !== safeActiveIndex) {
      setActiveIndex(safeActiveIndex);
    }
  }, [activeIndex, safeActiveIndex]);

  useEffect(() => {
    return () => {
      clearHoverTimer();
      clearClickSuppressionTimer();
    };
  }, [
    clearClickSuppressionTimer,
    clearHoverTimer,
  ]);

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (collectionCount < 1) {
      return;
    }

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp": {
        event.preventDefault();

        const previousIndex =
          (index - 1 + collectionCount) %
          collectionCount;

        focusCollectionTab(previousIndex);
        break;
      }

      case "ArrowRight":
      case "ArrowDown": {
        event.preventDefault();

        const nextIndex =
          (index + 1) % collectionCount;

        focusCollectionTab(nextIndex);
        break;
      }

      case "Home":
        event.preventDefault();
        focusCollectionTab(0);
        break;

      case "End":
        event.preventDefault();
        focusCollectionTab(collectionCount - 1);
        break;

      default:
        break;
    }
  };

  const handleDeckKeyDown = (
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

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (collectionCount < 2) {
      return;
    }

    if (
      event.pointerType === "mouse" &&
      event.button !== 0
    ) {
      return;
    }

    clearHoverTimer();

    pointerGestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocityX: 0,
      axis: "pending",
    };
  };

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    const gesture = pointerGestureRef.current;

    if (
      !gesture ||
      gesture.pointerId !== event.pointerId
    ) {
      return;
    }

    const horizontalDistance =
      event.clientX - gesture.startX;

    const verticalDistance =
      event.clientY - gesture.startY;

    const horizontalMagnitude = Math.abs(
      horizontalDistance,
    );

    const verticalMagnitude = Math.abs(
      verticalDistance,
    );

    if (gesture.axis === "pending") {
      const hasMoved =
        Math.max(
          horizontalMagnitude,
          verticalMagnitude,
        ) >= DRAG_START_THRESHOLD;

      if (!hasMoved) {
        return;
      }

      if (
        horizontalMagnitude >
        verticalMagnitude * SWIPE_DIRECTION_RATIO
      ) {
        gesture.axis = "horizontal";

        try {
          event.currentTarget.setPointerCapture(
            event.pointerId,
          );
        } catch {
          // Pointer capture can fail if the pointer ended.
        }
      } else if (
        verticalMagnitude >
        horizontalMagnitude * SWIPE_DIRECTION_RATIO
      ) {
        gesture.axis = "vertical";
        pointerGestureRef.current = null;
        resetDeckDrag();
        return;
      }
    }

    if (gesture.axis !== "horizontal") {
      return;
    }

    event.preventDefault();

    const elapsed = Math.max(
      1,
      event.timeStamp - gesture.lastTime,
    );

    gesture.velocityX =
      (event.clientX - gesture.lastX) / elapsed;

    gesture.lastX = event.clientX;
    gesture.lastTime = event.timeStamp;

    const maximumDrag = Math.min(
      110,
      event.currentTarget.clientWidth * 0.28,
    );

    const dampedDistance =
      horizontalDistance * 0.82;

    const dragDistance = Math.max(
      -maximumDrag,
      Math.min(maximumDrag, dampedDistance),
    );

    setDeckDrag(dragDistance);
  };

  const finishPointerGesture = useCallback(
    (
      event: PointerEvent<HTMLDivElement>,
      cancelled = false,
    ) => {
      const gesture = pointerGestureRef.current;

      pointerGestureRef.current = null;

      if (
        !gesture ||
        gesture.pointerId !== event.pointerId
      ) {
        resetDeckDrag();
        return;
      }

      try {
        if (
          event.currentTarget.hasPointerCapture(
            event.pointerId,
          )
        ) {
          event.currentTarget.releasePointerCapture(
            event.pointerId,
          );
        }
      } catch {
        // Pointer may already have been released.
      }

      if (
        cancelled ||
        gesture.axis !== "horizontal"
      ) {
        resetDeckDrag();
        return;
      }

      const horizontalDistance =
        event.clientX - gesture.startX;

      const distancePassed =
        Math.abs(horizontalDistance) >=
        SWIPE_DISTANCE_THRESHOLD;

      const velocityPassed =
        Math.abs(gesture.velocityX) >=
        SWIPE_VELOCITY_THRESHOLD;

      if (!distancePassed && !velocityPassed) {
        resetDeckDrag();
        return;
      }

      suppressNextClick();
      resetDeckDrag(false);

      const direction =
        Math.abs(gesture.velocityX) >=
        SWIPE_VELOCITY_THRESHOLD
          ? gesture.velocityX
          : horizontalDistance;

      if (direction < 0) {
        showNext();
      } else {
        showPrevious();
      }
    },
    [
      resetDeckDrag,
      showNext,
      showPrevious,
      suppressNextClick,
    ],
  );

  const handlePointerUp = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    finishPointerGesture(event);
  };

  const handlePointerCancel = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    finishPointerGesture(event, true);
  };

  const handleDeckClickCapture = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    /*
     * Keep keyboard-generated clicks available.
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

  if (!currentCollection) {
    return null;
  }

  const activeTabId = `${tabIdPrefix}-tab-${safeActiveIndex}`;

  return (
    <SectionTransition
      variant="quiet"
      id="featured-collections"
      className={cn(
        "section-shell scroll-mt-[7rem]",
        "overflow-x-clip bg-brand-white/45",

        "!pb-14 !pt-24",
        "min-[390px]:!pb-16",
        "min-[390px]:!pt-28",

        "sm:!pb-20 sm:!pt-32",
        "lg:!pb-20 lg:!pt-32",
        "xl:!pb-24",
      )}
      data-nav-theme="light"
      aria-labelledby="featured-collections-heading"
    >
      <div className="section-inner">
        <RevealGroup
          className={cn(
            "flex flex-col gap-6",
            "md:flex-row md:items-end",
            "md:justify-between md:gap-10",
          )}
          stagger={0.08}
          start="top 84%"
        >
          <div className="min-w-0 max-w-[48rem]">
            <p className="small-label text-brand-sage">
              Featured Collections
            </p>

            <h2
              id="featured-collections-heading"
              className={cn(
                "mt-4 max-w-full",
                "text-pretty font-display font-normal",
                "text-brand-olive",

                "text-[clamp(2.4rem,11.5vw,3rem)]",
                "leading-[0.98]",

                "sm:text-[3.05rem]",
                "lg:text-[3.3rem]",
                "xl:text-[3.55rem]",
              )}
            >
              Six directions.{" "}
              <span className="block">
                Many ways to personalise.
              </span>
            </h2>
          </div>

          <Link
            href="/collections"
            className={cn(
              "group inline-flex min-h-11",
              "w-fit shrink-0 touch-manipulation",
              "items-center gap-2 self-start",

              "border-b border-brand-sage/40",
              "py-2 text-sm font-bold",
              "text-brand-olive",

              "transition-[color,border-color,transform]",
              "duration-300",

              "active:scale-[0.98]",
              "md:self-auto",
              "md:hover:border-brand-olive",

              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-brand-sage",
              "focus-visible:ring-offset-4",
              "focus-visible:ring-offset-brand-white",

              "motion-reduce:transform-none",
              "motion-reduce:transition-none",
            )}
          >
            View all collections

            <ArrowUpRight
              size={17}
              aria-hidden="true"
              className={cn(
                "shrink-0",
                "transition-transform duration-300",
                "md:group-hover:-translate-y-0.5",
                "md:group-hover:translate-x-0.5",
                "motion-reduce:transform-none",
                "motion-reduce:transition-none",
              )}
            />
          </Link>
        </RevealGroup>

        <RevealGroup
          stagger={0.08}
          start="top 80%"
          className={cn(
            "mt-8 grid min-w-0 gap-6",
            "sm:mt-10 sm:gap-8",

            "lg:grid-cols-[minmax(17.5rem,0.7fr)_minmax(0,1.3fr)]",
            "lg:items-start lg:gap-8",

            "xl:grid-cols-[minmax(19rem,0.68fr)_minmax(0,1.32fr)]",
            "xl:gap-12",
          )}
        >
          {/* Mobile horizontal tabs / desktop vertical tabs */}
          <div
            ref={tabsViewportRef}
            className={cn(
              "featured-collection-tabs no-scrollbar",
              "min-w-0 max-w-full",
              "overflow-x-auto overscroll-x-contain",
              "pb-2",
              "lg:overflow-hidden lg:pb-0",
            )}
            onMouseLeave={clearHoverTimer}
          >
            <div
              role="tablist"
              aria-label="Featured invitation collections"
              className={cn(
                "flex min-w-max snap-x",
                "snap-mandatory gap-2 p-1",

                "lg:block lg:min-w-0",
                "lg:overflow-hidden",
                "lg:rounded-[1.35rem]",
                "lg:border",
                "lg:border-brand-olive/10",
                "lg:bg-brand-white/20",
                "lg:p-0",
              )}
            >
              {collections.map((item, index) => {
                const isActive =
                  safeActiveIndex === index;

                const category =
                  item.categories[0] ??
                  "Wedding stationery";

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
                    onMouseEnter={() =>
                      scheduleCollection(index)
                    }
                    onFocus={() =>
                      selectCollection(index)
                    }
                    onClick={() =>
                      selectCollection(index)
                    }
                    onKeyDown={(event) =>
                      handleTabKeyDown(event, index)
                    }
                    className={cn(
                      "group relative grid",
                      "w-[13.25rem] shrink-0",
                      "snap-center touch-manipulation",

                      "grid-cols-[1.7rem_minmax(0,1fr)_2rem]",
                      "items-center gap-2.5",
                      "rounded-xl border",
                      "px-3.5 py-3.5 text-left",

                      "transition-[background-color,color,box-shadow,border-color,transform]",
                      "duration-300",

                      "active:scale-[0.985]",

                      "min-[390px]:w-[14.75rem]",
                      "min-[390px]:px-4",

                      "sm:w-[17.5rem]",
                      "sm:grid-cols-[1.8rem_minmax(0,1fr)_2.25rem]",
                      "sm:gap-3 sm:px-5",

                      "lg:min-h-[4.15rem]",
                      "lg:w-full lg:snap-none",
                      "lg:rounded-none",
                      "lg:border-x-0 lg:border-t-0",
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
                            "shadow-[0_14px_34px_rgba(47,49,37,0.10)]",
                            "ring-1 ring-inset",
                            "ring-brand-olive/[0.06]",
                          )
                        : cn(
                            "border-brand-olive/10",
                            "bg-brand-white/35",
                            "text-brand-olive/65",
                            "lg:bg-transparent",
                            "lg:hover:border-brand-olive/15",
                            "lg:hover:bg-brand-white/70",
                            "lg:hover:text-brand-olive",
                          ),
                    )}
                  >
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
                          "text-[1.25rem] leading-[1.04]",
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
                          "text-[0.58rem] font-bold",
                          "uppercase tracking-[0.11em]",
                          "text-brand-olive/45",
                          "sm:text-[0.6rem]",
                          "sm:tracking-[0.12em]",
                        )}
                      >
                        {category}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex h-8 w-8 shrink-0",
                        "items-center justify-center",
                        "rounded-full border",

                        "transition-[background-color,border-color,transform,opacity]",
                        "duration-300",

                        "sm:h-9 sm:w-9",

                        isActive
                          ? cn(
                              "-translate-y-0.5",
                              "translate-x-0.5",
                              "border-brand-sage/20",
                              "bg-brand-sage/10",
                              "text-brand-sage",
                              "opacity-100",
                            )
                          : cn(
                              "border-brand-olive/10",
                              "bg-brand-white/40",
                              "text-brand-sage",
                              "opacity-55",
                              "lg:group-hover:border-brand-sage/20",
                              "lg:group-hover:bg-brand-sage/10",
                              "lg:group-hover:opacity-100",
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

          {/* Collection carousel */}
          <div
            id={panelId}
            role="tabpanel"
            aria-roledescription="carousel"
            aria-labelledby={activeTabId}
            tabIndex={0}
            onKeyDown={handleDeckKeyDown}
            className={cn(
              "min-w-0 rounded-[1.35rem]",
              "outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-brand-sage",
              "focus-visible:ring-offset-4",
              "focus-visible:ring-offset-brand-white",
              "sm:rounded-[1.6rem]",
            )}
          >
            <p
              className="sr-only"
              aria-live="polite"
              aria-atomic="true"
            >
              Selected collection:{" "}
              {currentCollection.name}. Collection{" "}
              {safeActiveIndex + 1} of{" "}
              {collectionCount}.
            </p>

            <div
              ref={deckRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              onClickCapture={handleDeckClickCapture}
              className={cn(
                "featured-collection-deck",
                "relative isolate overflow-hidden",
                "touch-pan-y select-none",

                "h-[20rem]",
                "min-[360px]:h-[21rem]",
                "min-[390px]:h-[23rem]",
                "sm:h-[27rem]",

                "lg:h-[25.5rem]",
                "xl:h-[27rem]",
                "2xl:h-[29rem]",
              )}
            >
              {/* Mobile gesture hint */}
              {collectionCount > 1 && (
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none",
                    "absolute right-3 top-3 z-[70]",
                    "inline-flex items-center gap-1",
                    "rounded-full",
                    "border border-brand-white/25",
                    "bg-brand-olive/25",
                    "px-2.5 py-1.5",
                    "text-[0.55rem] font-bold",
                    "uppercase tracking-[0.1em]",
                    "text-brand-white/90",
                    "backdrop-blur-md",
                    "sm:right-4 sm:top-4",
                    "lg:hidden",
                  )}
                >
                  <ChevronLeft size={12} />
                  Swipe
                  <ChevronRight size={12} />
                </div>
              )}

              {collections.map((item, index) => {
                const position = getCardPosition(
                  index,
                  safeActiveIndex,
                  collectionCount,
                );

                const isActive =
                  position === "active";

                const isSideCard =
                  position === "previous" ||
                  position === "next";

                const shouldRenderImage =
                  position !== "hidden";

                const objectPosition =
                  item.objectPosition ?? "center";

                return (
                  <div
                    key={item.slug}
                    data-position={position}
                    aria-hidden={
                      position === "hidden" ||
                      position === "far-previous" ||
                      position === "far-next"
                        ? true
                        : undefined
                    }
                    className={cn(
                      "featured-collection-card",
                      "group",
                    )}
                  >
                    {shouldRenderImage && (
                      <Image
                        src={item.cardImage}
                        alt={
                          isActive
                            ? `${item.name} wedding stationery collection`
                            : ""
                        }
                        fill
                        priority={
                          index === 0 &&
                          safeActiveIndex === 0
                        }
                        draggable={false}
                        aria-hidden={
                          isActive ? undefined : true
                        }
                        className={cn(
                          "featured-collection-image",
                          "pointer-events-none",
                          "select-none object-cover",
                        )}
                        style={{ objectPosition }}
                        sizes={getImageSizes(position)}
                      />
                    )}

                    {isActive && (
                      <Link
                        href={`/designs/${item.slug}`}
                        aria-label={`Explore ${item.name}`}
                        className={cn(
                          "featured-collection-control",
                          "touch-manipulation",
                          "text-brand-white",

                          "focus-visible:outline-none",
                          "focus-visible:ring-2",
                          "focus-visible:ring-inset",
                          "focus-visible:ring-brand-champagne",
                        )}
                      >
                        <div
                          aria-hidden="true"
                          className={cn(
                            "pointer-events-none",
                            "absolute inset-0",
                            "bg-gradient-to-t",
                            "from-brand-olive/95",
                            "via-brand-olive/18",
                            "via-56%",
                            "to-transparent",
                            "to-84%",
                          )}
                        />

                        <div
                          className={cn(
                            "absolute inset-x-0 bottom-0",
                            "z-10 p-4 pt-20",

                            "min-[390px]:p-5",
                            "min-[390px]:pt-24",

                            "sm:p-7 sm:pt-28",
                          )}
                        >
                          <div
                            key={`copy-${item.slug}`}
                            className="featured-collection-copy"
                          >
                            <p className="small-label text-brand-champagne">
                              {item.reference}
                            </p>

                            <h3
                              className={cn(
                                "mt-2 max-w-[92%]",
                                "break-words",
                                "font-display font-normal",
                                "leading-[0.97]",

                                "text-[clamp(1.8rem,8vw,2.35rem)]",

                                "sm:text-[2.55rem]",
                                "lg:text-[2.4rem]",
                                "xl:text-[2.7rem]",
                              )}
                            >
                              {item.name}
                            </h3>

                            <span
                              className={cn(
                                "featured-collection-explore",
                                "mt-4 inline-flex",
                                "min-h-9 items-center gap-2",

                                "text-[0.62rem]",
                                "font-bold uppercase",
                                "tracking-[0.13em]",
                                "text-brand-ivory",

                                "sm:text-[0.65rem]",
                                "sm:tracking-[0.14em]",
                              )}
                            >
                              Explore collection

                              <ArrowUpRight
                                size={15}
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                        </div>
                      </Link>
                    )}

                    {isSideCard && (
                      <button
                        type="button"
                        onClick={() =>
                          selectCollection(index)
                        }
                        aria-label={`Select ${item.name} collection`}
                        className={cn(
                          "featured-collection-control",
                          "cursor-pointer",
                          "touch-manipulation",

                          "focus-visible:outline-none",
                          "focus-visible:ring-2",
                          "focus-visible:ring-inset",
                          "focus-visible:ring-brand-sage",
                        )}
                      />
                    )}

                    <div
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none",
                        "absolute inset-0",
                        "rounded-[inherit]",
                        "ring-1 ring-inset",
                        isActive
                          ? "ring-brand-white/20"
                          : "ring-brand-white/10",
                      )}
                    />
                  </div>
                );
              })}
            </div>

            {/* Mobile progress */}
            {collectionCount > 1 && (
              <div
                className={cn(
                  "mt-4 flex items-center",
                  "justify-center gap-1.5",
                  "lg:hidden",
                )}
                aria-hidden="true"
              >
                {collections.map((item, index) => (
                  <span
                    key={`progress-${item.slug}`}
                    className={cn(
                      "h-1 rounded-full",
                      "transition-[width,background-color]",
                      "duration-300",

                      index === safeActiveIndex
                        ? cn(
                            "w-8",
                            "bg-brand-sage",
                          )
                        : cn(
                            "w-2",
                            "bg-brand-olive/20",
                          ),
                    )}
                  />
                ))}
              </div>
            )}

            <div
              key={`description-${currentCollection.slug}`}
              className={cn(
                "featured-collection-description",
                "mt-4 sm:mt-5",
              )}
            >
              <p
                className={cn(
                  "max-w-2xl",
                  "text-[0.92rem] leading-6",
                  "text-brand-olive/68",
                  "sm:text-[0.98rem]",
                  "sm:leading-7",
                )}
              >
                {currentCollection.shortDescription}
              </p>
            </div>

            <div
              className={cn(
                "mt-4 flex items-center",
                "justify-between gap-3",
                "border-t border-brand-olive/15",
                "pt-4",

                "sm:mt-5 sm:gap-4 sm:pt-5",
              )}
            >
              <div
                className={cn(
                  "flex shrink-0 items-center",
                  "gap-2.5 sm:gap-3",
                )}
                aria-label={`Collection ${
                  safeActiveIndex + 1
                } of ${collectionCount}`}
              >
                <span className="font-display text-xl text-brand-sage">
                  {formatNumber(
                    safeActiveIndex + 1,
                  )}
                </span>

                <span
                  aria-hidden="true"
                  className="h-px w-5 bg-brand-olive/20 sm:w-7"
                />

                <span className="small-label text-brand-olive/40">
                  {formatNumber(collectionCount)}
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-8">
                <button
                  type="button"
                  onClick={showPrevious}
                  disabled={collectionCount < 2}
                  aria-label="Show previous collection"
                  className={cn(
                    "group inline-flex",
                    "h-11 min-w-11",
                    "touch-manipulation",
                    "items-center justify-center",

                    "rounded-full",
                    "border border-brand-olive/10",
                    "bg-brand-white/45",
                    "px-3",

                    "text-brand-olive/60",

                    "transition-[color,background-color,border-color,transform]",
                    "duration-300",

                    "active:scale-[0.94]",
                    "hover:border-brand-olive/20",
                    "hover:bg-brand-white",
                    "hover:text-brand-olive",

                    "sm:min-w-0 sm:gap-2.5",
                    "sm:border-0 sm:bg-transparent",
                    "sm:px-0",

                    "disabled:cursor-not-allowed",
                    "disabled:opacity-30",

                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-brand-sage",
                    "focus-visible:ring-offset-4",
                    "focus-visible:ring-offset-brand-white",

                    "motion-reduce:transform-none",
                    "motion-reduce:transition-none",
                  )}
                >
                  <ChevronLeft
                    size={18}
                    aria-hidden="true"
                    className="sm:hidden"
                  />

                  <span
                    className={cn(
                      "hidden",
                      "text-[0.65rem] font-bold",
                      "uppercase tracking-[0.14em]",
                      "sm:inline",
                    )}
                  >
                    Previous
                  </span>

                  <span
                    aria-hidden="true"
                    className={cn(
                      "hidden h-px w-6",
                      "bg-brand-olive/20",

                      "transition-[width,background-color]",
                      "duration-300",

                      "sm:block",
                      "sm:group-hover:w-10",
                      "sm:group-hover:bg-brand-sage",
                    )}
                  />
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  disabled={collectionCount < 2}
                  aria-label="Show next collection"
                  className={cn(
                    "group inline-flex",
                    "h-11 min-w-11",
                    "touch-manipulation",
                    "items-center justify-center",

                    "rounded-full",
                    "border border-brand-sage/15",
                    "bg-brand-sage/10",
                    "px-3",

                    "text-brand-sage",

                    "transition-[color,background-color,border-color,transform]",
                    "duration-300",

                    "active:scale-[0.94]",
                    "hover:border-brand-sage/25",
                    "hover:bg-brand-sage/15",
                    "hover:text-brand-olive",

                    "sm:min-w-0 sm:gap-2.5",
                    "sm:border-0 sm:bg-transparent",
                    "sm:px-0",

                    "disabled:cursor-not-allowed",
                    "disabled:opacity-30",

                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-brand-sage",
                    "focus-visible:ring-offset-4",
                    "focus-visible:ring-offset-brand-white",

                    "motion-reduce:transform-none",
                    "motion-reduce:transition-none",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "hidden h-px w-6",
                      "bg-brand-sage/45",

                      "transition-[width,background-color]",
                      "duration-300",

                      "sm:block",
                      "sm:group-hover:w-10",
                      "sm:group-hover:bg-brand-olive",
                    )}
                  />

                  <span
                    className={cn(
                      "hidden",
                      "text-[0.65rem] font-bold",
                      "uppercase tracking-[0.14em]",
                      "sm:inline",
                    )}
                  >
                    Next
                  </span>

                  <ChevronRight
                    size={18}
                    aria-hidden="true"
                    className="sm:hidden"
                  />
                </button>
              </div>
            </div>
          </div>
        </RevealGroup>
      </div>

      <style jsx global>{`
        .featured-collection-tabs {
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-inline: contain;
        }

        .featured-collection-tabs::-webkit-scrollbar {
          display: none;
        }

        .featured-collection-deck {
          --collection-drag-x: 0px;

          contain: layout paint;
          -webkit-tap-highlight-color: transparent;
        }

        .featured-collection-card {
          position: absolute;
          display: block;
          overflow: hidden;

          margin: 0;
          padding: 0;
          border: 0;
          border-radius: 1.45rem;

          background: var(
            --brand-paper,
            #e7e1d5
          );

          box-shadow: none;
          transform-origin: center bottom;

          transition-property:
            transform,
            opacity,
            top,
            bottom,
            left,
            width;

          transition-duration:
            700ms,
            400ms,
            700ms,
            700ms,
            700ms,
            700ms;

          transition-timing-function:
            cubic-bezier(0.22, 1, 0.36, 1),
            ease,
            cubic-bezier(0.22, 1, 0.36, 1),
            cubic-bezier(0.22, 1, 0.36, 1),
            cubic-bezier(0.22, 1, 0.36, 1),
            cubic-bezier(0.22, 1, 0.36, 1);
        }

        .featured-collection-image {
          transition: transform 700ms
            cubic-bezier(0.22, 1, 0.36, 1);
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

          -webkit-tap-highlight-color: transparent;
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

          transform: translate3d(
              var(--collection-drag-x),
              0,
              0
            )
            rotate(0deg) scale(1);

          pointer-events: auto;

          box-shadow: 0 10px 18px -15px
            rgba(35, 36, 28, 0.24);
        }

        .featured-collection-card[data-position="previous"] {
          top: 2rem;
          bottom: 1.15rem;
          left: 1%;

          z-index: 30;
          width: 47%;

          opacity: 1;
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
          transform: scale(0.8);
          pointer-events: none;
        }

        /*
         * While dragging, the active card follows the finger
         * without transition delay.
         */
        .featured-collection-deck[data-dragging="true"]
          .featured-collection-card[data-position="active"] {
          transition: none;
        }

        .featured-collection-deck[data-dragging="true"]
          .featured-collection-card[data-position="active"]
          .featured-collection-image {
          transform: scale(1.015);
        }

        .featured-collection-deck[data-drag-resetting="true"]
          .featured-collection-card[data-position="active"] {
          transition-property: transform;
          transition-duration: 340ms;
          transition-timing-function: cubic-bezier(
            0.22,
            1,
            0.36,
            1
          );
        }

        .featured-collection-copy {
          color: var(--brand-white, #fffdf8);

          text-shadow:
            0 2px 4px rgba(0, 0, 0, 0.34),
            0 5px 16px rgba(0, 0, 0, 0.2);
        }

        .featured-collection-copy,
        .featured-collection-description {
          animation: featured-collection-fade
            420ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .featured-collection-explore {
          opacity: 1;
          transform: translateY(0);

          transition-property: opacity, transform;
          transition-duration: 300ms;
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

        @media (hover: hover) and (pointer: fine) {
          .featured-collection-card[data-position="previous"]:hover {
            transform: rotate(-1.6deg) scale(0.97);
          }

          .featured-collection-card[data-position="next"]:hover {
            transform: rotate(1.6deg) scale(0.97);
          }

          .featured-collection-card:hover
            .featured-collection-image {
            transform: scale(1.02);
          }

          .featured-collection-explore {
            opacity: 0;
            transform: translateY(4px);
          }

          .featured-collection-card:hover
            .featured-collection-explore,
          .featured-collection-card:focus-within
            .featured-collection-explore {
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

            transform: translate3d(
                var(--collection-drag-x),
                0,
                0
              )
              rotate(0deg) scale(1);
          }

          .featured-collection-card[data-position="previous"] {
            top: 1.8rem;
            bottom: 0.5rem;
            left: 0;

            width: 76%;

            opacity: 1;
            transform: rotate(0deg) scale(0.92);
          }

          .featured-collection-card[data-position="next"] {
            top: 1.8rem;
            bottom: 0.5rem;
            left: 24%;

            width: 76%;

            opacity: 1;
            transform: rotate(0deg) scale(0.92);
          }

          .featured-collection-card[data-position="far-previous"],
          .featured-collection-card[data-position="far-next"] {
            top: 2rem;
            bottom: 0.5rem;
            left: 33%;

            width: 34%;

            opacity: 0;
            transform: scale(0.84);
          }

          .featured-collection-card[data-position="hidden"] {
            top: 2rem;
            bottom: 0.5rem;
            left: 33%;

            width: 34%;

            opacity: 0;
            transform: scale(0.82);
          }
        }

        @media (max-width: 379px) {
          .featured-collection-card[data-position="active"] {
            left: 4%;
            width: 92%;
          }

          .featured-collection-card[data-position="previous"] {
            left: 0;
            width: 78%;
          }

          .featured-collection-card[data-position="next"] {
            left: 22%;
            width: 78%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .featured-collection-card,
          .featured-collection-image,
          .featured-collection-explore {
            transition: none !important;
          }

          .featured-collection-copy,
          .featured-collection-description {
            animation: none !important;
          }
        }
      `}</style>
    </SectionTransition>
  );
}