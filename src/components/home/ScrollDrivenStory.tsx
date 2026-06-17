"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { ArrowRight } from "lucide-react";

import { featuredStory } from "@/data/stories";
import { cn } from "@/lib/utils";
import { SectionTransition } from "@/components/motion/SectionTransition";

type StoryScene = {
  id: string;
  number: string;
  label: string;
  title: string;
  text: string;
  image: string;
  imageCaption: string;
  objectPosition: CSSProperties["objectPosition"];
};

const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

const stickyViewportFrameClassName = cn(
  "sticky top-[5.75rem] self-start",
  "h-[calc(100svh-5.75rem)]",
);

const scenes: readonly StoryScene[] = [
  {
    id: "invitation-suite",
    number: "01",
    label: "The invitation suite",
    title: "Designed for the occasion",
    text: "A personalised stationery suite shaped around the celebration’s colours, details and overall mood.",
    image: featuredStory.productImage,
    imageCaption: "Printed stationery",
    objectPosition: "50% 50%",
  },
  {
    id: "human-moment",
    number: "02",
    label: "In their hands",
    title: "Made to be experienced",
    text: "The design becomes real when it is opened, held and shared with the people taking part in the celebration.",
    image: featuredStory.interactionImage,
    imageCaption: "A real interaction",
    objectPosition: "50% 45%",
  },
  {
    id: "celebration-setting",
    number: "03",
    label: "Inside the celebration",
    title: "Connected to the atmosphere",
    text: "Colour, florals and presentation carry the stationery’s visual language into the wider celebration.",
    image: featuredStory.celebrationImage,
    imageCaption: "Celebration styling",
    objectPosition: "50% 50%",
  },
  {
    id: "complete-story",
    number: "04",
    label: "The complete memory",
    title: featuredStory.title,
    text: "From its first printed detail to the day itself, this is one complete Elegant Star story.",
    image: featuredStory.coverImage,
    imageCaption: "The complete story",
    objectPosition: "50% 45%",
  },
];

function getDesktopActivationPoint(viewportHeight: number) {
  return Math.min(
    Math.max(viewportHeight * 0.46, 260),
    460,
  );
}

function getMobileActivationPoint(viewportHeight: number) {
  return Math.min(
    Math.max(viewportHeight * 0.3, 150),
    280,
  );
}

export function ScrollDrivenStory() {
  const [active, setActive] = useState(0);

  const desktopSceneRefs = useRef<
    Array<HTMLDivElement | null>
  >([]);

  const mobileSceneRefs = useRef<
    Array<HTMLElement | null>
  >([]);

  useEffect(() => {
    const desktopQuery = window.matchMedia(
      DESKTOP_MEDIA_QUERY,
    );

    let isDesktop = desktopQuery.matches;
    let animationFrameId: number | null = null;
    let sceneObserver: IntersectionObserver | null = null;

    const getCurrentSceneNodes = () =>
      isDesktop
        ? desktopSceneRefs.current
        : mobileSceneRefs.current;

    const getCurrentActivationPoint = () =>
      isDesktop
        ? getDesktopActivationPoint(window.innerHeight)
        : getMobileActivationPoint(window.innerHeight);

    const updateActiveScene = () => {
      animationFrameId = null;

      const nodes = getCurrentSceneNodes();
      const activationPoint =
        getCurrentActivationPoint();

      let nextActive = 0;

      /*
       * A scene becomes active when its top crosses the
       * activation line. This works consistently for both
       * desktop sticky chapters and mobile editorial cards.
       */
      for (
        let index = 1;
        index < nodes.length;
        index += 1
      ) {
        const node = nodes[index];

        if (!node) {
          continue;
        }

        if (
          node.getBoundingClientRect().top <=
          activationPoint
        ) {
          nextActive = index;
        } else {
          break;
        }
      }

      setActive((currentActive) =>
        currentActive === nextActive
          ? currentActive
          : nextActive,
      );
    };

    const requestActiveSceneUpdate = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId =
        window.requestAnimationFrame(
          updateActiveScene,
        );
    };

    const disconnectSceneObserver = () => {
      sceneObserver?.disconnect();
      sceneObserver = null;
    };

    const syncSceneObserver = () => {
      disconnectSceneObserver();

      if (!("IntersectionObserver" in window)) {
        return;
      }

      const activationPoint =
        getCurrentActivationPoint();

      const bottomMargin = Math.max(
        window.innerHeight - activationPoint - 1,
        0,
      );

      sceneObserver = new IntersectionObserver(
        requestActiveSceneUpdate,
        {
          /*
           * This produces a narrow observation line rather
           * than a large overlapping observation area.
           */
          rootMargin: `-${activationPoint}px 0px -${bottomMargin}px 0px`,
          threshold: 0,
        },
      );

      getCurrentSceneNodes().forEach((node) => {
        if (node) {
          sceneObserver?.observe(node);
        }
      });
    };

    const handleViewportChange = () => {
      syncSceneObserver();
      requestActiveSceneUpdate();
    };

    const handleMediaChange = (
      event: MediaQueryListEvent,
    ) => {
      isDesktop = event.matches;

      syncSceneObserver();
      requestActiveSceneUpdate();
    };

    window.addEventListener(
      "scroll",
      requestActiveSceneUpdate,
      {
        passive: true,
      },
    );

    /*
     * Capturing document-level scroll events also supports
     * layouts where a parent element creates a scroll area.
     */
    document.addEventListener(
      "scroll",
      requestActiveSceneUpdate,
      {
        capture: true,
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      handleViewportChange,
    );

    window.addEventListener(
      "orientationchange",
      handleViewportChange,
    );

    window.visualViewport?.addEventListener(
      "resize",
      handleViewportChange,
    );

    desktopQuery.addEventListener(
      "change",
      handleMediaChange,
    );

    syncSceneObserver();
    requestActiveSceneUpdate();

    return () => {
      window.removeEventListener(
        "scroll",
        requestActiveSceneUpdate,
      );

      document.removeEventListener(
        "scroll",
        requestActiveSceneUpdate,
        true,
      );

      window.removeEventListener(
        "resize",
        handleViewportChange,
      );

      window.removeEventListener(
        "orientationchange",
        handleViewportChange,
      );

      window.visualViewport?.removeEventListener(
        "resize",
        handleViewportChange,
      );

      desktopQuery.removeEventListener(
        "change",
        handleMediaChange,
      );

      disconnectSceneObserver();

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(
          animationFrameId,
        );
      }
    };
  }, []);

  const scrollToScene = (index: number) => {
    const isDesktop = window.matchMedia(
      DESKTOP_MEDIA_QUERY,
    ).matches;

    const node = isDesktop
      ? desktopSceneRefs.current[index]
      : mobileSceneRefs.current[index];

    if (!node) {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    const nodeTop =
      window.scrollY +
      node.getBoundingClientRect().top;

    /*
     * Desktop chapters align with the cinematic activation
     * line. Mobile cards align close to the top of the screen.
     */
    const targetOffset = isDesktop
      ? getDesktopActivationPoint(
          window.innerHeight,
        ) - 1
      : 20;

    const targetScrollTop = Math.max(
      0,
      Math.round(nodeTop - targetOffset),
    );

    window.scrollTo({
      top: targetScrollTop,
      behavior: prefersReducedMotion
        ? "auto"
        : "smooth",
    });
  };

  const progress =
    scenes.length > 1
      ? active / (scenes.length - 1)
      : 0;

  const mobileProgress =
    (active + 1) / scenes.length;

  return (
    <SectionTransition
      variant="rounded-dark"
      id="celebration-story"
      className="w-full max-w-full bg-brand-olive text-brand-ivory"
      data-nav-theme="dark"
    >
      {/* ================================================================ */}
      {/* Desktop cinematic layout                                         */}
      {/* ================================================================ */}

      <div className="mx-auto hidden w-full max-w-[1600px] lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-stretch">
        <div className="relative min-w-0">
          <div
            className={cn(
              stickyViewportFrameClassName,
              "w-full",
            )}
          >
            <div className="relative h-full w-full overflow-hidden lg:rounded-tl-[3.5rem]">
              {scenes.map((scene, index) => {
                const isActive = active === index;
                const isPrevious =
                  index < active;

                return (
                  <Image
                    key={scene.id}
                    src={scene.image}
                    alt={
                      isActive
                        ? `${featuredStory.title}: ${scene.title}`
                        : ""
                    }
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1600px) 864px, 54vw"
                    style={{
                      objectPosition:
                        scene.objectPosition,
                    }}
                    className={cn(
                      "object-cover will-change-[opacity,transform]",
                      "transition-[opacity,transform] duration-[900ms] ease-out",
                      "motion-reduce:transform-none motion-reduce:transition-none",
                      isActive &&
                        "translate-x-0 scale-100 opacity-100",
                      !isActive &&
                        isPrevious &&
                        "-translate-x-2 scale-[1.025] opacity-0",
                      !isActive &&
                        !isPrevious &&
                        "translate-x-2 scale-[1.04] opacity-0",
                    )}
                  />
                );
              })}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-olive/80 via-brand-olive/5 to-brand-olive/15" />

              <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/15 to-transparent" />

              <div className="pointer-events-none absolute left-7 top-7">
                {scenes.map((scene, index) => (
                  <p
                    key={scene.id}
                    aria-hidden={
                      active !== index
                    }
                    className={cn(
                      "small-label absolute left-0 top-0 whitespace-nowrap",
                      "text-brand-ivory/70",
                      "transition-[opacity,transform] duration-500",
                      "motion-reduce:transform-none motion-reduce:transition-none",
                      active === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0",
                    )}
                  >
                    {scene.imageCaption}
                  </p>
                ))}
              </div>

              <div className="absolute bottom-7 left-7 right-7">
                <div className="flex items-center justify-between gap-5 rounded-full border border-brand-ivory/15 bg-brand-olive/[0.52] px-5 py-3.5 backdrop-blur-xl">
                  <span className="small-label min-w-0 truncate text-brand-ivory/65">
                    Real Elegant Star Story
                  </span>

                  <div className="flex shrink-0 items-center gap-4">
                    <div className="relative h-px w-20 overflow-hidden bg-brand-ivory/20 xl:w-24">
                      <span
                        className="absolute inset-y-0 left-0 w-full origin-left bg-brand-champagne transition-transform duration-700 ease-out motion-reduce:transition-none"
                        style={{
                          transform: `scaleX(${
                            (active + 1) /
                            scenes.length
                          })`,
                        }}
                      />
                    </div>

                    <span className="min-w-12 text-right text-xs font-bold tabular-nums">
                      {String(
                        active + 1,
                      ).padStart(2, "0")}{" "}
                      /{" "}
                      {String(
                        scenes.length,
                      ).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 px-8 pb-16 pt-16 xl:px-10 xl:pb-20 xl:pt-20 2xl:px-14 2xl:pb-24 2xl:pt-24">
          <header className="mb-12 max-w-xl xl:mb-16">
            <p className="small-label text-brand-champagne">
              From stationery to celebration
            </p>

            <h2 className="display-heading mt-5 break-words text-[clamp(3.25rem,4.7vw,6rem)]">
              A design that became{" "}
              <span className="block">
                part of the day.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-brand-ivory/70 xl:mt-7 xl:text-lg xl:leading-8">
              Follow one Elegant Star invitation
              from its first printed detail to the
              celebration it was created for.
            </p>
          </header>

          <div className="grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] items-stretch gap-6 xl:grid-cols-[3rem_minmax(0,1fr)] xl:gap-8">
            <nav
              aria-label="Story chapters"
              className={cn(
                stickyViewportFrameClassName,
                "flex min-w-0 items-center justify-center",
              )}
            >
              <div className="relative flex flex-col items-center gap-6 xl:gap-8">
                <div className="absolute bottom-4 left-1/2 top-4 w-px -translate-x-1/2 bg-brand-ivory/15">
                  <span
                    className="absolute left-0 top-0 h-full w-full origin-top bg-brand-champagne transition-transform duration-700 ease-out motion-reduce:transition-none"
                    style={{
                      transform: `scaleY(${progress})`,
                    }}
                  />
                </div>

                {scenes.map(
                  (scene, index) => {
                    const isActive =
                      active === index;

                    const isComplete =
                      index < active;

                    return (
                      <button
                        key={scene.id}
                        type="button"
                        onClick={() =>
                          scrollToScene(index)
                        }
                        aria-label={`Go to chapter ${
                          index + 1
                        }: ${scene.label}`}
                        aria-current={
                          isActive
                            ? "step"
                            : undefined
                        }
                        className={cn(
                          "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                          "border text-[10px] font-bold tabular-nums",
                          "transition-[color,background-color,border-color,transform] duration-300",
                          "motion-reduce:transform-none motion-reduce:transition-none",
                          "focus-visible:outline-none focus-visible:ring-2",
                          "focus-visible:ring-brand-champagne focus-visible:ring-offset-4",
                          "focus-visible:ring-offset-brand-olive",
                          isActive &&
                            "scale-110 border-brand-champagne bg-brand-champagne text-brand-olive",
                          isComplete &&
                            !isActive &&
                            "border-brand-champagne bg-brand-olive text-brand-champagne",
                          !isActive &&
                            !isComplete &&
                            "border-brand-ivory/25 bg-brand-olive text-brand-ivory/55",
                        )}
                      >
                        {scene.number}
                      </button>
                    );
                  },
                )}
              </div>
            </nav>

            <div className="min-w-0">
              {scenes.map(
                (scene, index) => {
                  const isActive =
                    active === index;

                  const isFinalScene =
                    index ===
                    scenes.length - 1;

                  return (
                    <div
                      key={scene.id}
                      ref={(node) => {
                        desktopSceneRefs.current[
                          index
                        ] = node;
                      }}
                      data-scene={index}
                      className={cn(
                        "flex min-w-0 items-center",
                        isFinalScene
                          ? "min-h-[clamp(28rem,64dvh,40rem)]"
                          : "min-h-[clamp(30rem,70dvh,44rem)]",
                      )}
                    >
                      <article
                        className={cn(
                          "min-w-0 max-w-xl",
                          "transition-[opacity,transform] duration-500",
                          "motion-reduce:transform-none motion-reduce:transition-none",
                          isActive
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-65",
                        )}
                      >
                        <p
                          className={cn(
                            "small-label text-brand-champagne",
                            "transition-[opacity,transform] duration-500",
                            "motion-reduce:transform-none motion-reduce:transition-none",
                            isActive
                              ? "translate-y-0 opacity-100"
                              : "translate-y-2 opacity-70",
                          )}
                          style={{
                            transitionDelay:
                              isActive
                                ? "40ms"
                                : "0ms",
                          }}
                        >
                          {scene.label}
                        </p>

                        <h3
                          className={cn(
                            "mt-4 break-words font-display",
                            "text-[clamp(3rem,4vw,4.5rem)] leading-[0.94]",
                            "transition-[opacity,transform] duration-500",
                            "motion-reduce:transform-none motion-reduce:transition-none",
                            isActive
                              ? "translate-y-0 opacity-100"
                              : "translate-y-3 opacity-80",
                          )}
                          style={{
                            transitionDelay:
                              isActive
                                ? "90ms"
                                : "0ms",
                          }}
                        >
                          {scene.title}
                        </h3>

                        <p
                          className={cn(
                            "mt-6 max-w-lg text-base leading-7 text-brand-ivory/70",
                            "transition-[opacity,transform] duration-500",
                            "motion-reduce:transform-none motion-reduce:transition-none",
                            "xl:mt-7 xl:text-lg xl:leading-8",
                            isActive
                              ? "translate-y-0 opacity-100"
                              : "translate-y-3 opacity-75",
                          )}
                          style={{
                            transitionDelay:
                              isActive
                                ? "140ms"
                                : "0ms",
                          }}
                        >
                          {scene.text}
                        </p>

                        {isFinalScene ? (
                          <div
                            className={cn(
                              "mt-8 flex flex-wrap items-center gap-3",
                              "transition-[opacity,transform] duration-500",
                              "motion-reduce:transform-none motion-reduce:transition-none",
                              isActive
                                ? "translate-y-0 opacity-100"
                                : "pointer-events-none translate-y-3 opacity-0",
                            )}
                            style={{
                              transitionDelay:
                                isActive
                                  ? "190ms"
                                  : "0ms",
                            }}
                          >
                            <Link
                              href={`/stories/${featuredStory.slug}`}
                              className={cn(
                                "inline-flex min-h-12 items-center justify-center gap-2 rounded-full",
                                "bg-brand-ivory px-5 py-3 text-sm font-bold",
                                "text-brand-olive transition duration-300",
                                "motion-reduce:transform-none motion-reduce:transition-none",
                                "hover:-translate-y-0.5 hover:bg-brand-champagne",
                                "focus-visible:outline-none focus-visible:ring-2",
                                "focus-visible:ring-brand-champagne",
                                "focus-visible:ring-offset-4",
                                "focus-visible:ring-offset-brand-olive",
                              )}
                            >
                              View the full story
                              <ArrowRight
                                size={17}
                                aria-hidden="true"
                              />
                            </Link>

                            <Link
                              href="/#enquiry"
                              className={cn(
                                "inline-flex min-h-12 items-center justify-center rounded-full",
                                "border border-brand-ivory/25 px-5 py-3",
                                "text-sm font-bold text-brand-ivory",
                                "transition duration-300",
                                "motion-reduce:transform-none motion-reduce:transition-none",
                                "hover:-translate-y-0.5 hover:border-brand-champagne",
                                "hover:text-brand-champagne",
                                "focus-visible:outline-none focus-visible:ring-2",
                                "focus-visible:ring-brand-champagne",
                                "focus-visible:ring-offset-4",
                                "focus-visible:ring-offset-brand-olive",
                              )}
                            >
                              Create something
                              similar
                            </Link>
                          </div>
                        ) : null}
                      </article>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* Mobile and tablet editorial layout                               */}
      {/* ================================================================ */}

      <div className="w-full min-w-0 max-w-full lg:hidden">
        <header className="px-4 pb-9 pt-14 min-[380px]:px-5 sm:px-6 sm:pb-12 sm:pt-20">
          <div className="mx-auto w-full max-w-2xl">
            <p className="small-label text-brand-champagne">
              From stationery to celebration
            </p>

            <h2
              className={cn(
                "mt-4 max-w-xl font-display",
                "text-[clamp(2.55rem,12vw,4rem)]",
                "leading-[0.98] tracking-[-0.025em]",
                "[overflow-wrap:anywhere]",
              )}
            >
              A design that became{" "}
              <span className="block">
                part of the day.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-[0.95rem] leading-7 text-brand-ivory/70 sm:mt-6 sm:text-base">
              Follow one Elegant Star invitation
              from its first printed detail to the
              celebration it was created for.
            </p>
          </div>
        </header>

        {/* Mobile chapter navigation */}

        <nav
          aria-label="Story chapters"
          className="pb-10 sm:pb-12"
        >
          <div className="px-4 min-[380px]:px-5 sm:px-6">
            <div className="mb-4 flex items-center gap-4">
              <span className="small-label shrink-0 text-brand-ivory/55">
                Story chapters
              </span>

              <div
                className="relative h-px min-w-0 flex-1 overflow-hidden bg-brand-ivory/15"
                aria-hidden="true"
              >
                <span
                  className="absolute inset-y-0 left-0 w-full origin-left bg-brand-champagne transition-transform duration-500 ease-out motion-reduce:transition-none"
                  style={{
                    transform: `scaleX(${mobileProgress})`,
                  }}
                />
              </div>

              <span className="shrink-0 text-xs font-bold tabular-nums text-brand-ivory/65">
                {String(active + 1).padStart(
                  2,
                  "0",
                )}{" "}
                /{" "}
                {String(
                  scenes.length,
                ).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div
            className={cn(
              "flex w-full snap-x snap-mandatory gap-2 overflow-x-auto",
              "px-4 pb-2 min-[380px]:px-5 sm:px-6",
              "[scrollbar-width:none]",
              "[&::-webkit-scrollbar]:hidden",
            )}
          >
            {scenes.map((scene, index) => {
              const isActive =
                active === index;

              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() =>
                    scrollToScene(index)
                  }
                  aria-label={`Go to chapter ${
                    index + 1
                  }: ${scene.label}`}
                  aria-current={
                    isActive
                      ? "step"
                      : undefined
                  }
                  className={cn(
                    "inline-flex min-h-12 shrink-0 snap-start",
                    "touch-manipulation items-center gap-2",
                    "whitespace-nowrap rounded-full border",
                    "px-4 py-2.5 text-xs font-bold",
                    "transition-colors duration-300",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-brand-champagne",
                    "focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-brand-olive",
                    isActive
                      ? "border-brand-champagne bg-brand-champagne text-brand-olive"
                      : "border-brand-ivory/15 bg-brand-white/[0.04] text-brand-ivory/65",
                  )}
                >
                  <span className="tabular-nums">
                    {scene.number}
                  </span>

                  <span>{scene.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="w-full min-w-0 max-w-full">
          {scenes.map((scene, index) => {
            const isActive = active === index;

            const isFinalScene =
              index === scenes.length - 1;

            return (
              <article
                key={scene.id}
                ref={(node) => {
                  mobileSceneRefs.current[index] =
                    node;
                }}
                data-mobile-scene={index}
                className={cn(
                  "w-full min-w-0 max-w-full scroll-mt-5",
                  "border-t border-brand-ivory/10",
                  "py-10 first:border-t-0 first:pt-0",
                  "sm:py-14",
                  isFinalScene &&
                    "pb-[max(4rem,env(safe-area-inset-bottom))]",
                )}
              >
                <div className="px-4 min-[380px]:px-5 sm:px-6">
                  <div
                    className={cn(
                      "relative mx-auto w-full max-w-2xl",
                      "aspect-[4/5] overflow-hidden",
                      "rounded-[1.35rem]",
                      "min-[480px]:aspect-[5/6]",
                      "sm:aspect-[16/13] sm:rounded-[1.75rem]",
                    )}
                  >
                    <Image
                      src={scene.image}
                      alt={`${featuredStory.title}: ${scene.title}`}
                      fill
                      priority={index === 0}
                      sizes="
                        (max-width: 379px) calc(100vw - 2rem),
                        (max-width: 639px) calc(100vw - 2.5rem),
                        (max-width: 1023px) min(100vw - 3rem, 672px),
                        50vw
                      "
                      style={{
                        objectPosition:
                          scene.objectPosition,
                      }}
                      className={cn(
                        "object-cover",
                        "transition-[transform,filter] duration-700 ease-out",
                        "motion-reduce:transform-none motion-reduce:transition-none",
                        isActive
                          ? "scale-100"
                          : "scale-[1.015]",
                      )}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-olive/75 via-transparent to-black/10" />

                    <div
                      className={cn(
                        "absolute left-4 top-4",
                        "flex h-11 min-w-11 items-center justify-center",
                        "rounded-full border border-brand-ivory/20",
                        "bg-brand-olive/[0.55] px-3",
                        "text-xs font-bold tabular-nums",
                        "backdrop-blur-xl",
                        "sm:left-5 sm:top-5",
                      )}
                    >
                      {scene.number}
                    </div>

                    <p className="small-label absolute bottom-5 left-5 right-5 text-brand-ivory/75 sm:bottom-6 sm:left-6">
                      {scene.imageCaption}
                    </p>
                  </div>
                </div>

                <div className="px-4 pt-7 min-[380px]:px-5 sm:px-6 sm:pt-9">
                  <div className="mx-auto w-full max-w-2xl">
                    <p className="small-label text-brand-champagne">
                      {scene.label}
                    </p>

                    <h3
                      className={cn(
                        "mt-4 max-w-xl font-display",
                        "text-[clamp(2.35rem,10vw,3.75rem)]",
                        "leading-[0.99] tracking-[-0.02em]",
                        "[overflow-wrap:anywhere]",
                      )}
                    >
                      {scene.title}
                    </h3>

                    <p className="mt-5 max-w-lg text-[0.95rem] leading-7 text-brand-ivory/70 sm:mt-6 sm:text-base">
                      {scene.text}
                    </p>

                    {isFinalScene ? (
                      <div className="mt-8 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
                        <Link
                          href={`/stories/${featuredStory.slug}`}
                          className={cn(
                            "inline-flex min-h-12 w-full",
                            "touch-manipulation items-center justify-center gap-2",
                            "rounded-full bg-brand-ivory",
                            "px-5 py-3 text-center text-sm font-bold",
                            "text-brand-olive transition duration-300",
                            "motion-reduce:transform-none motion-reduce:transition-none",
                            "active:scale-[0.98]",
                            "sm:w-auto",
                            "focus-visible:outline-none focus-visible:ring-2",
                            "focus-visible:ring-brand-champagne",
                            "focus-visible:ring-offset-4",
                            "focus-visible:ring-offset-brand-olive",
                          )}
                        >
                          View the full story

                          <ArrowRight
                            size={17}
                            className="shrink-0"
                            aria-hidden="true"
                          />
                        </Link>

                        <Link
                          href="/#enquiry"
                          className={cn(
                            "inline-flex min-h-12 w-full",
                            "touch-manipulation items-center justify-center",
                            "rounded-full border border-brand-ivory/25",
                            "px-5 py-3 text-center text-sm font-bold",
                            "text-brand-ivory transition duration-300",
                            "motion-reduce:transform-none motion-reduce:transition-none",
                            "active:scale-[0.98]",
                            "sm:w-auto",
                            "focus-visible:outline-none focus-visible:ring-2",
                            "focus-visible:ring-brand-champagne",
                            "focus-visible:ring-offset-4",
                            "focus-visible:ring-offset-brand-olive",
                          )}
                        >
                          Create something similar
                        </Link>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </SectionTransition>
  );
}