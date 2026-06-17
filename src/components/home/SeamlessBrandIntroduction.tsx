import { siteMedia } from "@/data/siteMedia";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { companyCopy } from "@/data/site";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { SectionTransition } from "@/components/motion/SectionTransition";

export function SeamlessBrandIntroduction() {
  return (
    <SectionTransition
      variant="quiet"
      className="section-shell overflow-x-clip !pt-20 md:!pt-24 lg:!pt-28"
      data-nav-theme="light"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-brand-white/45 to-transparent"
      />
      <div className="section-inner grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <RevealGroup className="max-w-xl" stagger={0.07} start="top 84%">
          <p className="small-label text-brand-sage">
            From digital experience to real craft
          </p>
          <h2 className="display-heading mt-5 text-[2.75rem] leading-[0.96] sm:text-6xl md:text-8xl">
            Designed with meaning.{" "}
            <span className="block">Made to be held.</span>
          </h2>
          <p className="body-copy mt-6 text-base leading-8 sm:mt-7 sm:text-lg">
            {companyCopy.homeStatement}
          </p>
          <div className="mt-7 inline-flex items-center gap-3 text-sm font-bold leading-6 text-brand-olive/70 sm:mt-8">
            <ArrowDownRight size={18} /> Explore the real stationery library
            below
          </div>
        </RevealGroup>
        <div className="grid gap-4 sm:grid-cols-[1.25fr_.75fr]">
          <ImageReveal className="relative min-h-[22rem] rounded-[24px] bg-brand-paper shadow-paper sm:min-h-[30rem] sm:rounded-[28px] lg:min-h-[32rem]">
            <ParallaxMedia
              className="relative -my-3 h-[calc(100%+1.5rem)] w-full"
              distance={8}
            >
              <Image
                src={siteMedia.homepage.brandIntroduction.signatureStationery}
                alt="A signature Elegant Star stationery composition"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
                priority={false}
              />
            </ParallaxMedia>
          </ImageReveal>
          <ImageReveal
            className="relative min-h-64 rounded-[24px] bg-brand-paper shadow-soft sm:mt-24 sm:min-h-72 sm:rounded-[28px]"
            delay={0.08}
          >
            <Image
              src={siteMedia.homepage.brandIntroduction.showroomContext}
              alt="Elegant Star showroom and stationery context"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 24vw"
            />
          </ImageReveal>
        </div>
      </div>
    </SectionTransition>
  );
}
