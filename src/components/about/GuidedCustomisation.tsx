import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { cn } from "@/lib/utils";

export function GuidedCustomisation({
  copy,
  primaryImage,
  secondaryImage,
}: {
  copy: string;
  primaryImage: string;
  secondaryImage: string;
}) {
  return (
    <section
      className="section-shell !py-16 sm:!py-20 lg:!py-28"
      data-nav-theme="light"
      aria-labelledby="guided-customisation-heading"
    >
      <div className="section-inner">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,0.92fr)_minmax(0,0.72fr)] lg:items-center lg:gap-9 xl:gap-12">
          <RevealGroup
            className="max-w-[34rem] lg:order-2"
            stagger={0.06}
            start="top 84%"
          >
            <p className="small-label text-brand-sage">Our craftsmanship</p>
            <h2
              id="guided-customisation-heading"
              className="mt-4 font-display text-[2.45rem] font-normal leading-[0.97] text-brand-olive sm:text-[3.45rem] lg:text-[3.75rem]"
            >
              Guided customisation
            </h2>
            <p className="body-copy mt-6 text-base leading-8">{copy}</p>

            <Link
              href="/our-craft"
              className={cn(
                "group mt-7 inline-flex min-h-11 items-center gap-2",
                "border-b border-brand-sage/45 text-sm font-bold",
                "text-brand-olive transition hover:border-brand-olive",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-brand-sage",
              )}
            >
              Learn more
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </RevealGroup>

          <ImageReveal className="rounded-[1.45rem] border border-brand-olive/10 bg-brand-paper shadow-[0_22px_58px_rgba(48,50,41,0.1)] lg:order-1">
            <div className="relative aspect-[4/3] sm:aspect-[5/3] lg:aspect-[0.86/1]">
              <Image
                src={primaryImage}
                alt="Elegant Star stationery references arranged in the studio"
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 31vw"
              />
            </div>
          </ImageReveal>

          <ImageReveal className="hidden rounded-[1.45rem] border border-brand-olive/10 bg-brand-paper shadow-[0_18px_48px_rgba(48,50,41,0.09)] md:block lg:order-3">
            <div className="relative aspect-[4/3] lg:aspect-[0.75/1]">
              <Image
                src={secondaryImage}
                alt="Close-up of Elegant Star stationery details"
                fill
                loading="eager"
                unoptimized
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 24vw"
              />
            </div>
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
