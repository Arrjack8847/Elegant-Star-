import Image from "next/image";
import { ArrowDownRight } from "lucide-react";

import { siteMedia } from "@/data/siteMedia";
import { companyCopy } from "@/data/site";
import { cn } from "@/lib/utils";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { SectionTransition } from "@/components/motion/SectionTransition";

export function SeamlessBrandIntroduction() {
  return (
    <SectionTransition
      variant="quiet"
      className={cn(
        "section-shell relative isolate overflow-hidden overflow-x-clip",
        "!pb-16 !pt-16",
        "min-[380px]:!pb-20 min-[380px]:!pt-20",
        "sm:!pb-24 sm:!pt-24",
        "lg:!pb-32 lg:!pt-32",
        "xl:!pb-36 xl:!pt-36",
      )}
      data-nav-theme="light"
      aria-labelledby="brand-introduction-heading"
      aria-describedby="brand-introduction-copy"
    >
      {/* Soft top transition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-brand-white/55 to-transparent sm:h-28"
      />

      {/* Soft desktop background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 hidden h-[32rem] w-[32rem] rounded-full bg-brand-sage/10 blur-3xl lg:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 bottom-10 hidden h-[28rem] w-[28rem] rounded-full bg-brand-champagne/20 blur-3xl lg:block"
      />

      <div
        className={cn(
          "section-inner relative z-10 grid min-w-0 gap-10",
          "sm:gap-12",
          "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]",
          "lg:items-center lg:gap-16",
          "xl:gap-20",
        )}
      >
        {/* Introduction copy */}
        <RevealGroup
          className="min-w-0 max-w-xl lg:max-w-[34rem]"
          stagger={0.07}
          start="top 86%"
        >
          <p className="small-label max-w-sm text-brand-sage">
            From digital experience to real craft
          </p>

          <h2
            id="brand-introduction-heading"
            className={cn(
              "mt-4 max-w-[11ch] font-display font-normal text-brand-olive",
              "text-[clamp(2.45rem,11.5vw,3rem)] leading-[0.98]",
              "tracking-[-0.025em] [overflow-wrap:anywhere]",
              "sm:mt-5 sm:max-w-[12ch] sm:text-6xl sm:leading-[0.96]",
              "md:text-7xl",
              "lg:max-w-[10.5ch] lg:text-[clamp(4.25rem,5.4vw,6rem)] lg:leading-[0.92]",
            )}
          >
            Designed with meaning.{" "}
            <span className="block">Made to be held.</span>
          </h2>

          <p
            id="brand-introduction-copy"
            className={cn(
              "body-copy mt-5 max-w-[36rem]",
              "text-[0.95rem] leading-7",
              "sm:mt-7 sm:text-lg sm:leading-8",
              "lg:max-w-[32rem]",
            )}
          >
            {companyCopy.homeStatement}
          </p>

          <div className="mt-6 flex max-w-md items-start gap-2.5 text-sm font-bold leading-6 text-brand-olive/70 sm:mt-8 sm:items-center sm:gap-3">
            <ArrowDownRight
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-brand-sage sm:mt-0"
            />

            <span className="min-w-0">
              Explore the real stationery library below
            </span>
          </div>
        </RevealGroup>

        {/* Editorial image composition */}
        <div
          className={cn(
            "relative grid min-w-0 grid-cols-1 gap-4",
            "min-[380px]:gap-5",
            "sm:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] sm:items-start",
            "lg:block lg:min-h-[41rem]",
            "xl:min-h-[44rem]",
          )}
        >
          {/* Desktop canvas glow */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute hidden",
              "lg:-inset-8 lg:block",
              "rounded-[3.5rem]",
              "bg-gradient-to-br from-brand-white/80 via-brand-paper/70 to-brand-sage/10",
              "blur-2xl",
            )}
          />

          {/* Primary image */}
          <ImageReveal
            className={cn(
              "relative isolate w-full overflow-hidden",
              "aspect-[4/5] rounded-[1.35rem]",
              "bg-brand-paper shadow-paper",
              "min-[420px]:aspect-[5/6]",
              "sm:aspect-[5/6] sm:rounded-[1.75rem]",
              "lg:absolute lg:left-0 lg:top-10 lg:z-10",
              "lg:h-[36rem] lg:w-[68%] lg:rounded-[2.25rem]",
              "xl:h-[39rem]",
            )}
          >
            {/* Mobile and tablet static image */}
            <Image
              src={
                siteMedia.homepage.brandIntroduction
                  .signatureStationery
              }
              alt="A signature Elegant Star stationery composition"
              fill
              className="object-cover lg:hidden"
              sizes="
                (max-width: 639px) calc(100vw - 2.5rem),
                (max-width: 1023px) 56vw,
                48vw
              "
            />

            {/* Desktop parallax image */}
            <ParallaxMedia
              className="relative -my-5 hidden h-[calc(100%+2.5rem)] w-full lg:block"
              distance={10}
            >
              <Image
                src={
                  siteMedia.homepage.brandIntroduction
                    .signatureStationery
                }
                alt="A signature Elegant Star stationery composition"
                fill
                className="object-cover"
                sizes="(max-width: 1599px) 48vw, 760px"
              />
            </ParallaxMedia>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-olive/18 via-transparent to-brand-white/8"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.28),transparent_36%)] opacity-75 lg:block"
            />
          </ImageReveal>

          {/* Secondary image */}
          <ImageReveal
            className={cn(
              "relative isolate w-full overflow-hidden",
              "aspect-[16/10] rounded-[1.35rem]",
              "bg-brand-paper shadow-soft",
              "min-[420px]:aspect-[3/2]",
              "sm:mt-16 sm:aspect-[4/5] sm:rounded-[1.75rem]",
              "lg:absolute lg:right-0 lg:top-32 lg:z-20",
              "lg:mt-0 lg:h-[27rem] lg:w-[40%]",
              "lg:rounded-[2rem] lg:shadow-[0_30px_90px_rgba(67,72,54,0.18)]",
              "xl:h-[29rem]",
            )}
            delay={0.08}
          >
            <Image
              src={
                siteMedia.homepage.brandIntroduction.showroomContext
              }
              alt="Elegant Star showroom and stationery context"
              fill
              className="object-cover"
              sizes="
                (max-width: 639px) calc(100vw - 2.5rem),
                (max-width: 1023px) 34vw,
                31vw
              "
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-olive/18 via-transparent to-transparent"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_70%_18%,rgba(255,255,255,0.22),transparent_38%)] opacity-65 lg:block"
            />
          </ImageReveal>
        </div>
      </div>
    </SectionTransition>
  );
}