import Image from "next/image";
import { ArrowDownRight } from "lucide-react";

import { siteMedia } from "@/data/siteMedia";
import { companyCopy } from "@/data/site";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { SectionTransition } from "@/components/motion/SectionTransition";

export function SeamlessBrandIntroduction() {
  return (
    <SectionTransition
      variant="quiet"
      className="section-shell overflow-x-clip !pb-16 !pt-16 min-[380px]:!pb-20 min-[380px]:!pt-20 sm:!pb-24 sm:!pt-24 lg:!pb-28 lg:!pt-28"
      data-nav-theme="light"
      aria-labelledby="brand-introduction-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-brand-white/45 to-transparent sm:h-28"
      />

      <div className="section-inner grid min-w-0 gap-10 sm:gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14 xl:gap-16">
        {/* Introduction copy */}
        <RevealGroup
          className="min-w-0 max-w-xl"
          stagger={0.07}
          start="top 86%"
        >
          <p className="small-label max-w-sm text-brand-sage">
            From digital experience to real craft
          </p>

          <h2
            id="brand-introduction-heading"
            className={[
              "mt-4 max-w-[11ch] font-display font-normal text-brand-olive",
              "text-[clamp(2.45rem,11.5vw,3rem)] leading-[0.98]",
              "tracking-[-0.025em] [overflow-wrap:anywhere]",
              "sm:mt-5 sm:max-w-[12ch] sm:text-6xl sm:leading-[0.96]",
              "md:text-7xl",
              "lg:text-[clamp(4rem,5.6vw,5.7rem)]",
            ].join(" ")}
          >
            Designed with meaning.{" "}
            <span className="block">Made to be held.</span>
          </h2>

          <p className="body-copy mt-5 max-w-[36rem] text-[0.95rem] leading-7 sm:mt-7 sm:text-lg sm:leading-8">
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
        <div className="grid min-w-0 grid-cols-1 gap-4 min-[380px]:gap-5 sm:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] sm:items-start">
          <ImageReveal
            className={[
              "relative isolate w-full overflow-hidden",
              "aspect-[4/5] rounded-[1.35rem]",
              "bg-brand-paper shadow-paper",
              "min-[420px]:aspect-[5/6]",
              "sm:aspect-[5/6] sm:rounded-[1.75rem]",
              "lg:aspect-auto lg:min-h-[32rem]",
            ].join(" ")}
          >
            {/* Static image on mobile and tablet for reliable touch scrolling */}
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

            {/* Parallax is limited to desktop */}
            <ParallaxMedia
              className="relative -my-4 hidden h-[calc(100%+2rem)] w-full lg:block"
              distance={8}
            >
              <Image
                src={
                  siteMedia.homepage.brandIntroduction
                    .signatureStationery
                }
                alt="A signature Elegant Star stationery composition"
                fill
                className="object-cover"
                sizes="(max-width: 1599px) 48vw, 720px"
              />
            </ParallaxMedia>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-olive/10 via-transparent to-brand-white/5"
            />
          </ImageReveal>

          <ImageReveal
            className={[
              "relative isolate w-full overflow-hidden",
              "aspect-[16/10] rounded-[1.35rem]",
              "bg-brand-paper shadow-soft",
              "min-[420px]:aspect-[3/2]",
              "sm:mt-16 sm:aspect-[4/5] sm:rounded-[1.75rem]",
              "lg:mt-24 lg:aspect-auto lg:min-h-72",
            ].join(" ")}
            delay={0.08}
          >
            <Image
              src={
                siteMedia.homepage.brandIntroduction
                  .showroomContext
              }
              alt="Elegant Star showroom and stationery context"
              fill
              className="object-cover"
              sizes="
                (max-width: 639px) calc(100vw - 2.5rem),
                (max-width: 1023px) 34vw,
                24vw
              "
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-olive/15 via-transparent to-transparent"
            />
          </ImageReveal>
        </div>
      </div>
    </SectionTransition>
  );
}