import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { RevealGroup } from "@/components/motion/RevealGroup";
import { StudioVideo } from "@/components/about/StudioVideo";
import { cn } from "@/lib/utils";

export function StudioStory({
  copy,
  videoSrc,
  poster,
}: {
  copy: string;
  videoSrc: string;
  poster: string;
}) {
  return (
    <section
      id="about-studio-video"
      className="section-shell bg-brand-white/38 !py-16 sm:!py-20 lg:!py-28"
      data-nav-theme="light"
      aria-labelledby="about-studio-heading"
    >
      <div className="section-inner">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,0.78fr)_auto_minmax(0,0.7fr)] lg:items-center lg:gap-10 xl:gap-14">
          <RevealGroup
            className="max-w-[34rem]"
            stagger={0.06}
            start="top 84%"
          >
            <p className="small-label text-brand-sage">Our studio</p>
            <h2
              id="about-studio-heading"
              className="mt-4 font-display text-[2.45rem] font-normal leading-[0.97] text-brand-olive sm:text-[3.45rem] lg:text-[3.8rem]"
            >
              A growing source of ideas
            </h2>
            <p className="body-copy mt-6 text-base leading-8">{copy}</p>

            <Link
              href="#about-studio-video"
              className={cn(
                "group mt-7 inline-flex min-h-11 items-center gap-2",
                "border-b border-brand-sage/45 text-sm font-bold",
                "text-brand-olive transition hover:border-brand-olive",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-brand-sage",
              )}
            >
              Watch our studio
              <ArrowDown
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:translate-y-0.5"
              />
            </Link>

            <blockquote className="mt-9 border-l border-brand-sage/45 pl-5 font-display text-[1.35rem] leading-[1.22] text-brand-olive/82">
              Physical references make decisions calmer, clearer and more
              personal.
            </blockquote>
          </RevealGroup>

          <StudioVideo
            src={videoSrc}
            poster={poster}
            caption="Elegant Star studio references and consultation details"
          />

          <RevealGroup
            className={cn(
              "rounded-[1.45rem] border border-brand-olive/10",
              "bg-brand-ivory/72 p-6",
              "sm:p-8 lg:self-stretch",
              "lg:flex lg:flex-col lg:justify-between",
            )}
            stagger={0.06}
            start="top 84%"
          >
            <p className="small-label text-brand-sage">Studio note</p>
            <p className="mt-5 font-display text-[1.65rem] leading-[1.08] text-brand-olive sm:text-[2rem]">
              Every celebration begins with an idea. We are here to shape it
              beautifully.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm font-bold text-brand-olive">
              <span className="h-px flex-1 bg-brand-olive/14" />
              <Link
                href="/contact#showroom-location"
                className="group inline-flex min-h-11 items-center gap-2"
              >
                Visit the studio
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
