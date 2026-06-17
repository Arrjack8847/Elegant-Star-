"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { craftsmanshipItems } from "@/data/home";
import { cn } from "@/lib/utils";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { SectionTransition } from "@/components/motion/SectionTransition";

export function InteractiveCraftsmanship() {
  const [active, setActive] = useState(0);

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const componentId = useId();

  const item = craftsmanshipItems[active] ?? craftsmanshipItems[0];

  if (!item) {
    return null;
  }

  const panelId = `${componentId}-panel`;

  function selectTab(index: number) {
    const normalizedIndex =
      (index + craftsmanshipItems.length) % craftsmanshipItems.length;

    setActive(normalizedIndex);
    tabRefs.current[normalizedIndex]?.focus();
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        selectTab(index + 1);
        break;

      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        selectTab(index - 1);
        break;

      case "Home":
        event.preventDefault();
        selectTab(0);
        break;

      case "End":
        event.preventDefault();
        selectTab(craftsmanshipItems.length - 1);
        break;

      default:
        break;
    }
  }

  return (
    <SectionTransition
      variant="rounded-dark"
      className={cn(
        "section-shell overflow-hidden bg-brand-olive text-brand-ivory",
        "!pb-14 !pt-20",
        "min-[390px]:!pb-16 min-[390px]:!pt-24",
        "sm:!pb-20 sm:!pt-28",
        "md:!pt-36",
        "lg:!pb-24 lg:!pt-44",
      )}
      data-nav-theme="dark"
      aria-labelledby="craftsmanship-heading"
    >
      <div className="section-inner min-w-0">
        <div
          className={cn(
            "grid min-w-0 grid-cols-1 gap-9",
            "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)]",
            "lg:items-center lg:gap-10",
            "xl:gap-12",
          )}
        >
          {/* Selected craftsmanship image */}
          <ImageReveal
            className={cn(
              "relative min-w-0 overflow-hidden",
              "h-[clamp(20rem,105vw,28rem)]",
              "rounded-[20px] bg-brand-olive/50",
              "min-[390px]:rounded-[24px]",
              "sm:h-[30rem] sm:rounded-[26px]",
              "lg:h-[34rem]",
            )}
          >
            <Image
              key={item.image}
              src={item.image}
              alt={`${item.title} craftsmanship detail`}
              fill
              priority={active === 0}
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 639px) 94vw, (max-width: 1023px) 92vw, 52vw"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-olive/90 via-brand-olive/10 to-transparent"
            />

            <div
              className={cn(
                "absolute inset-x-4 bottom-4 min-w-0",
                "min-[390px]:inset-x-5 min-[390px]:bottom-5",
                "sm:inset-x-7 sm:bottom-7",
              )}
            >
              <p className="small-label text-brand-champagne">
                Selected detail
              </p>

              <h3
                className={cn(
                  "mt-2 max-w-[95%] break-words font-display",
                  "text-[clamp(1.9rem,9vw,2.75rem)] leading-[0.98]",
                  "sm:max-w-[90%] sm:text-4xl",
                  "lg:text-[2.7rem]",
                )}
              >
                {item.title}
              </h3>
            </div>
          </ImageReveal>

          {/* Craftsmanship content */}
          <RevealGroup
            className="min-w-0 lg:py-2"
            stagger={0.07}
            start="top 82%"
          >
            <p className="small-label text-brand-champagne">
              Craftsmanship
            </p>

            <h2
              id="craftsmanship-heading"
              className={cn(
                "mt-3 max-w-2xl text-balance font-display",
                "text-[clamp(2.4rem,11.5vw,3.5rem)] leading-[0.98]",
                "sm:mt-4 sm:text-6xl",
                "lg:text-[4rem]",
                "xl:text-[4.5rem]",
              )}
            >
              Look closer.
              <span className="block">Every detail matters.</span>
            </h2>

            <div
              className={cn(
                "mt-6 grid min-w-0 grid-cols-1 gap-2.5",
                "min-[430px]:grid-cols-2",
                "sm:gap-3",
              )}
              role="tablist"
              aria-label="Craftsmanship details"
              aria-orientation="horizontal"
            >
              {craftsmanshipItems.map((craft, index) => {
                const isActive = active === index;

                const isLastOddItem =
                  craftsmanshipItems.length % 2 !== 0 &&
                  index === craftsmanshipItems.length - 1;

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
                    onClick={() => setActive(index)}
                    onKeyDown={(event) =>
                      handleTabKeyDown(event, index)
                    }
                    className={cn(
                      "min-h-[5.75rem] min-w-0 touch-manipulation rounded-2xl border",
                      "px-4 py-3.5 text-left",
                      "transition-[border-color,background-color,transform]",
                      "duration-300",
                      "active:scale-[0.985]",
                      "sm:min-h-[7.25rem] sm:px-5 sm:py-4",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-brand-champagne",
                      "focus-visible:ring-offset-2",
                      "focus-visible:ring-offset-brand-olive",
                      isLastOddItem && "min-[430px]:col-span-2",
                      isActive
                        ? "border-brand-champagne bg-brand-ivory/12"
                        : cn(
                            "border-brand-ivory/15",
                            "bg-brand-ivory/[0.035]",
                            "hover:border-brand-ivory/30",
                            "hover:bg-brand-ivory/[0.07]",
                          ),
                    )}
                  >
                    <span className="small-label text-brand-champagne">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={cn(
                        "mt-1.5 block min-w-0 break-words font-display",
                        "text-[1.3rem] leading-[1.08]",
                        "[overflow-wrap:anywhere]",
                        "sm:text-2xl",
                        "lg:text-[1.55rem]",
                      )}
                    >
                      {craft.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              id={panelId}
              role="tabpanel"
              aria-labelledby={`${componentId}-tab-${active}`}
              tabIndex={0}
              className={cn(
                "mt-5 min-w-0 rounded-xl",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-brand-champagne",
              )}
            >
              <p
                key={item.slug}
                className={cn(
                  "max-w-xl break-words text-[0.98rem]",
                  "leading-7 text-brand-ivory/70",
                  "sm:text-base",
                )}
              >
                {item.description}
              </p>
            </div>

            <Link
              href="/our-craft"
              className={cn(
                "mt-6 inline-flex min-h-12 touch-manipulation",
                "w-full items-center justify-center",
                "rounded-full bg-brand-ivory px-5 py-3",
                "text-center text-sm font-bold text-brand-olive",
                "transition-[background-color,transform] duration-300",
                "hover:bg-brand-champagne",
                "active:scale-[0.98]",
                "sm:w-auto",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-brand-champagne",
                "focus-visible:ring-offset-2",
                "focus-visible:ring-offset-brand-olive",
              )}
            >
              Explore our craft
            </Link>
          </RevealGroup>
        </div>
      </div>
    </SectionTransition>
  );
}