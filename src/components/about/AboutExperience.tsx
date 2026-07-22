import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { cn } from "@/lib/utils";

export function AboutExperience({
  image,
}: {
  image: string;
}) {
  return (
    <section
      className="section-shell !py-16 sm:!py-20 lg:!py-28"
      data-nav-theme="light"
      aria-labelledby="about-experience-heading"
    >
      <div className="section-inner">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-12 xl:gap-16">
          <RevealGroup
            className="max-w-[35rem]"
            stagger={0.06}
            start="top 84%"
          >
            <p className="small-label text-brand-sage">Experience</p>
            <h2
              id="about-experience-heading"
              className="mt-4 font-display text-[2.4rem] font-normal leading-[0.98] text-brand-olive sm:text-[3.35rem] lg:text-[3.75rem]"
            >
              See, compare and begin with a clearer direction.
            </h2>
            <p className="body-copy mt-6 text-base leading-8">
              Explore physical invitation samples, compare materials and
              presentation formats, and discuss how a collection can be adapted
              for the occasion.
            </p>
            <Link
              href="/contact#showroom-location"
              className={cn(
                "group mt-7 inline-flex min-h-11 items-center gap-2",
                "rounded-full border border-brand-olive/18 bg-brand-white/62",
                "px-5 py-3 text-sm font-bold text-brand-olive",
                "transition hover:-translate-y-0.5 hover:bg-brand-white",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-brand-sage",
              )}
            >
              View location and contact details
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </RevealGroup>

          <ImageReveal className="rounded-[1.55rem] border border-brand-olive/10 bg-brand-paper shadow-[0_24px_64px_rgba(48,50,41,0.11)]">
            <div className="relative aspect-[4/3] sm:aspect-[16/10]">
              <Image
                src={image}
                alt="Elegant Star stationery materials and studio references"
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 58vw"
              />
            </div>
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
