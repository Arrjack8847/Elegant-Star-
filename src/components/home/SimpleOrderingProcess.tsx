"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import { processSteps } from "@/data/home";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTransition } from "@/components/motion/SectionTransition";

export function SimpleOrderingProcess() {
  const [active, setActive] = useState(0);
  const componentId = useId();

  const desktopStepRefs = useRef<Array<HTMLDivElement | null>>([]);

  const desktopButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const manualSelectionRef = useRef(false);

  const manualSelectionTimeoutRef = useRef<number | null>(null);

  const step = processSteps[active] ?? processSteps[0];

  const desktopPanelId = `${componentId}-desktop-panel`;

  const progress = (active / Math.max(processSteps.length - 1, 1)) * 100;

  const selectStep = (index: number, scrollToStep = false) => {
    if (index < 0 || index >= processSteps.length) {
      return;
    }

    manualSelectionRef.current = true;
    setActive(index);

    if (manualSelectionTimeoutRef.current !== null) {
      window.clearTimeout(manualSelectionTimeoutRef.current);
    }

    if (scrollToStep) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      window.requestAnimationFrame(() => {
        desktopStepRefs.current[index]?.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "center",
        });
      });
    }

    manualSelectionTimeoutRef.current = window.setTimeout(() => {
      manualSelectionRef.current = false;
      manualSelectionTimeoutRef.current = null;
    }, 1100);
  };

  const handleDesktopKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        nextIndex = (index + 1) % processSteps.length;
        break;

      case "ArrowUp":
      case "ArrowLeft":
        nextIndex = (index - 1 + processSteps.length) % processSteps.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = processSteps.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();

    selectStep(nextIndex, true);

    desktopButtonRefs.current[nextIndex]?.focus();
  };

  /*
   * Continuously updates the active timeline step
   * while scrolling on desktop.
   */
  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    let animationFrameId: number | null = null;

    const updateActiveStep = () => {
      if (!desktopQuery.matches || manualSelectionRef.current) {
        return;
      }

      /*
       * The active step changes when its centre is nearest
       * to this point in the viewport.
       */
      const activationPoint = window.innerHeight * 0.46;

      let closestIndex: number | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;

      desktopStepRefs.current.forEach((element, index) => {
        if (!element) {
          return;
        }

        const rect = element.getBoundingClientRect();

        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

        if (!isVisible) {
          return;
        }

        const elementCenter = rect.top + rect.height / 2;

        const distance = Math.abs(elementCenter - activationPoint);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex === null) {
        return;
      }

      const nextIndex = closestIndex;

      setActive((current) => (current === nextIndex ? current : nextIndex));
    };

    /*
     * Limits measurements to one calculation
     * per animation frame.
     */
    const scheduleUpdate = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = null;
        updateActiveStep();
      });
    };

    const handleDesktopChange = () => {
      scheduleUpdate();
    };

    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });

    window.addEventListener("resize", scheduleUpdate, {
      passive: true,
    });

    desktopQuery.addEventListener("change", handleDesktopChange);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);

      window.removeEventListener("resize", scheduleUpdate);

      desktopQuery.removeEventListener("change", handleDesktopChange);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      if (manualSelectionTimeoutRef.current !== null) {
        window.clearTimeout(manualSelectionTimeoutRef.current);
      }
    };
  }, []);

  if (!step) {
    return null;
  }

  return (
    <SectionTransition
      variant="rounded-light"
      className="section-shell relative isolate w-full bg-brand-paper"
      data-nav-theme="light"
      aria-labelledby={`${componentId}-title`}
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden size-[30rem] translate-x-1/3 -translate-y-1/3 rounded-full bg-brand-sage/5 blur-3xl lg:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 hidden size-[24rem] -translate-x-1/3 translate-y-1/3 rounded-full bg-brand-champagne/10 blur-3xl lg:block"
      />

      <div className="section-inner relative">
        {/* Section heading */}
        <Reveal start="top 84%">
          <header className="mx-auto max-w-5xl text-center">
            <p className="small-label text-brand-sage">Ordering process</p>

            <h2
              id={`${componentId}-title`}
              className="display-heading mx-auto mt-4 max-w-5xl text-[clamp(2.65rem,13vw,6.25rem)] leading-[0.94] tracking-normal"
            >
              Simple steps.{" "}
              <span className="block text-brand-olive/60">
                Thoughtful guidance.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-brand-olive/60 sm:text-base sm:leading-8">
              From your first conversation to the finished stationery, every
              stage is carefully guided and clearly communicated.
            </p>
          </header>
        </Reveal>

        {/* Mobile and tablet layout */}
        <div className="mt-10 lg:hidden">
          <div className="overflow-hidden rounded-[1.5rem] border border-brand-olive/10 bg-brand-white/55 shadow-[0_18px_55px_rgba(57,64,47,0.07)]">
            {processSteps.map((item, index) => {
              const isActive = active === index;

              const mobileContentId = `${componentId}-mobile-content-${index}`;

              const mobileButtonId = `${componentId}-mobile-button-${index}`;

              return (
                <div
                  key={`mobile-${item.number}-${item.title}`}
                  className={cn(
                    index !== processSteps.length - 1 &&
                      "border-b border-brand-olive/10",
                  )}
                >
                  <button
                    id={mobileButtonId}
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={mobileContentId}
                    onClick={() => selectStep(index)}
                    className={cn(
                      "grid w-full min-w-0 grid-cols-[2.75rem_minmax(0,1fr)_1.5rem] items-center gap-3 px-4 py-5 text-left",
                      "transition-colors duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-sage/50",
                      "sm:grid-cols-[3.25rem_minmax(0,1fr)_1.75rem] sm:px-6 sm:py-6",
                      isActive
                        ? "bg-brand-white"
                        : "bg-transparent hover:bg-brand-white/60",
                    )}
                  >
                    {/* Number */}
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-full border text-[0.65rem] font-bold tracking-[0.12em]",
                        "transition-colors duration-300 sm:size-10",
                        isActive
                          ? "border-brand-sage bg-brand-sage text-brand-white"
                          : "border-brand-olive/15 bg-brand-paper text-brand-sage",
                      )}
                    >
                      {item.number}
                    </span>

                    {/* Title */}
                    <span
                      className={cn(
                        "min-w-0 break-words text-base font-semibold leading-6 transition-colors sm:text-lg",
                        isActive ? "text-brand-olive" : "text-brand-olive/70",
                      )}
                    >
                      {item.title}
                    </span>

                    {/* Expand icon */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "relative size-5 shrink-0 transition-transform duration-300",
                        isActive && "rotate-45",
                      )}
                    >
                      <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-brand-olive/55" />

                      <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-brand-olive/55" />
                    </span>
                  </button>

                  {/* Expandable content */}
                  <div
                    id={mobileContentId}
                    role="region"
                    aria-labelledby={mobileButtonId}
                    aria-hidden={!isActive}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none",
                      isActive
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="min-w-0 overflow-hidden">
                      <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                        <p className="mb-5 pl-0 text-sm leading-6 text-brand-olive/60 min-[380px]:pl-[3.5rem] sm:pl-[4.25rem] sm:text-base sm:leading-7">
                          {item.text}
                        </p>

                        <div className="relative h-[18rem] w-full overflow-hidden rounded-[1.25rem] bg-brand-olive sm:h-[27rem]">
                          {isActive && (
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="(max-width: 1023px) 100vw"
                              className="ordering-fade-in object-cover"
                            />
                          )}

                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-olive/80"
                          />

                          <div
                            aria-hidden="true"
                            className="absolute inset-3 rounded-[0.95rem] border border-brand-white/20"
                          />

                          <div className="absolute inset-x-0 bottom-0 min-w-0 p-6 pt-24 text-brand-white">
                            <p className="small-label text-brand-champagne">
                              Step {item.number}
                            </p>

                            <h3 className="mt-2 break-words font-display text-3xl leading-[0.98] sm:text-4xl">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop editorial layout */}
        <div className="mt-16 hidden min-w-0 grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] items-start gap-10 lg:grid xl:gap-16">
          {/* Timeline */}
          <div className="relative min-w-0">
            {/* Timeline background line */}
            <div
              aria-hidden="true"
              className="absolute bottom-[4.25rem] left-5 top-[4.25rem] w-px bg-brand-olive/12"
            >
              <div
                className="absolute left-0 top-0 h-full w-full origin-top bg-brand-sage transition-transform duration-700 ease-out motion-reduce:transition-none"
                style={{
                  transform: `scaleY(${progress / 100})`,
                }}
              />
            </div>

            <div
              role="tablist"
              aria-label="Ordering process steps"
              aria-orientation="vertical"
              className="relative"
            >
              {processSteps.map((item, index) => {
                const isActive = active === index;

                const tabId = `${componentId}-desktop-tab-${index}`;

                return (
                  <div
                    key={`desktop-${item.number}-${item.title}`}
                    ref={(element) => {
                      desktopStepRefs.current[index] = element;
                    }}
                    data-step-index={index}
                    className="relative flex min-h-[clamp(18rem,48vh,30rem)] items-center py-8"
                  >
                    <button
                      ref={(element) => {
                        desktopButtonRefs.current[index] = element;
                      }}
                      id={tabId}
                      role="tab"
                      type="button"
                      tabIndex={isActive ? 0 : -1}
                      aria-selected={isActive}
                      aria-controls={desktopPanelId}
                      onClick={() => selectStep(index, true)}
                      onKeyDown={(event) => handleDesktopKeyDown(event, index)}
                      className={cn(
                        "group grid w-full min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] gap-6 text-left",
                        "focus-visible:outline-none",
                      )}
                    >
                      {/* Timeline number */}
                      <span
                        className={cn(
                          "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border bg-brand-paper",
                          "text-[0.65rem] font-bold tracking-[0.14em]",
                          "transition-[background-color,border-color,color,transform] duration-300",
                          "group-focus-visible:ring-2 group-focus-visible:ring-brand-sage/50 group-focus-visible:ring-offset-4",
                          isActive
                            ? "scale-110 border-brand-sage bg-brand-sage text-brand-white"
                            : "border-brand-olive/15 text-brand-sage group-hover:border-brand-sage/40",
                        )}
                      >
                        {item.number}
                      </span>

                      {/* Timeline content */}
                      <span className="min-w-0">
                        <span className="small-label block text-brand-sage/70">
                          {isActive ? `Step ${item.number}` : item.number}
                        </span>

                        <span
                          className={cn(
                            "mt-2 block break-words font-display leading-none",
                            "transition-[font-size,color] duration-300",
                            isActive
                              ? "text-4xl text-brand-olive xl:text-5xl"
                              : "text-3xl text-brand-olive/45 group-hover:text-brand-olive/65 xl:text-4xl",
                          )}
                        >
                          {item.title}
                        </span>

                        <span
                          className={cn(
                            "grid transition-[grid-template-rows,opacity,margin] duration-500 ease-out motion-reduce:transition-none",
                            isActive
                              ? "mt-4 grid-rows-[1fr] opacity-100"
                              : "mt-0 grid-rows-[0fr] opacity-0",
                          )}
                        >
                          <span className="overflow-hidden">
                            <span className="block max-w-lg text-sm leading-7 text-brand-olive/60 xl:text-base xl:leading-8">
                              {item.text}
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky image panel */}
          <div className="min-w-0 self-start lg:sticky lg:top-24">
            <div
              id={desktopPanelId}
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={`${componentId}-desktop-tab-${active}`}
              className={cn(
                "relative h-[clamp(28rem,68vh,42rem)] w-full max-w-full overflow-hidden rounded-[1.5rem]",
                "border border-brand-white/50 bg-brand-olive",
                "shadow-[0_28px_80px_rgba(57,64,47,0.16)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage/50 focus-visible:ring-offset-4",
              )}
            >
              {/* Directional crossfade images */}
              {processSteps.map((item, index) => {
                const isActive = active === index;
                const isBeforeActive = index < active;

                return (
                  <Image
                    key={`${item.number}-${item.image}`}
                    src={item.image}
                    alt={isActive ? item.title : ""}
                    fill
                    priority={index === 0}
                    aria-hidden={!isActive}
                    className={cn(
                      "object-cover transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
                      isActive && "translate-y-0 scale-100 opacity-100",
                      !isActive &&
                        isBeforeActive &&
                        "pointer-events-none -translate-y-5 scale-[1.025] opacity-0",
                      !isActive &&
                        !isBeforeActive &&
                        "pointer-events-none translate-y-5 scale-[1.025] opacity-0",
                    )}
                    sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 56vw, 58vw"
                  />
                );
              })}

              {/* Image gradient */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-brand-olive/10 via-transparent to-brand-olive/90"
              />

              {/* Inner frame */}
              <div
                aria-hidden="true"
                className="absolute inset-4 rounded-[1.05rem] border border-brand-white/20"
              />

              {/* Top information */}
              <div className="absolute left-7 right-7 top-7 flex min-w-0 items-center justify-between gap-5 text-brand-white">
                <p className="small-label min-w-0 truncate text-brand-champagne">
                  The atelier journey
                </p>

                <p className="shrink-0 text-[0.68rem] font-semibold tracking-[0.16em] text-brand-white/80">
                  {step.number}

                  <span className="mx-2 text-brand-white/35">/</span>

                  {String(processSteps.length).padStart(2, "0")}
                </p>
              </div>

              {/* Editorial caption */}
              <div
                aria-live="polite"
                className="absolute inset-x-0 bottom-0 min-w-0 p-8 pb-10 pt-32 text-brand-white xl:p-10 xl:pb-12"
              >
                <div
                  key={`caption-${step.number}`}
                  className="ordering-fade-in"
                >
                  <p className="small-label text-brand-champagne">
                    Step {step.number}
                  </p>

                  <h3 className="mt-3 max-w-2xl break-words font-display text-[clamp(2.5rem,4vw,4.25rem)] leading-[0.9]">
                    {step.title}
                  </h3>

                  <div
                    aria-hidden="true"
                    className="mt-5 h-px w-16 bg-brand-champagne/70"
                  />

                  <p className="mt-4 max-w-md text-sm leading-7 text-brand-white/72">
                    Carefully guided from the first conversation to the finished
                    stationery.
                  </p>
                </div>
              </div>

              {/* Bottom progress */}
              <div
                aria-hidden="true"
                className="absolute inset-x-8 bottom-6 h-px overflow-hidden bg-brand-white/20 xl:inset-x-10"
              >
                <div
                  className="h-full w-full origin-left bg-brand-champagne transition-transform duration-700 ease-out motion-reduce:transition-none"
                  style={{
                    transform: `scaleX(${(active + 1) / processSteps.length})`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Closing statement */}
        <footer className="mx-auto mt-14 max-w-2xl text-center lg:mt-20">
          <p className="small-label text-brand-sage">
            Personal from beginning to end
          </p>

          <p className="mt-4 font-display text-3xl leading-tight text-brand-olive sm:text-4xl">
            Every detail is considered, refined and made with care.
          </p>
        </footer>
      </div>
    </SectionTransition>
  );
}
