import { ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { SectionTransition } from "@/components/motion/SectionTransition";

const themes = [
  {
    number: "01",
    title: "Patient guidance",
    text: "Clients value having a clear path through wording, visual direction and final confirmation.",
    featured: true,
  },
  {
    number: "02",
    title: "Thoughtful customisation",
    text: "The experience is shaped around the occasion instead of forcing every client into one fixed template.",
    featured: false,
  },
  {
    number: "03",
    title: "Careful presentation",
    text: "Finishing, coordination and handover are treated as part of the complete stationery experience.",
    featured: false,
  },
] as const;

export function ClientTestimonial() {
  return (
    <SectionTransition
      variant="quiet"
      id="client-confidence"
      className={cn(
        "section-shell scroll-mt-24 overflow-x-clip",
        "!pb-16 !pt-20",
        "min-[380px]:!pb-20 min-[380px]:!pt-24",
        "sm:!pb-24 sm:!pt-28",
        "lg:scroll-mt-[8.5rem] lg:!pb-24 lg:!pt-28",
        "xl:!py-28",
      )}
      data-nav-theme="light"
      aria-labelledby="client-confidence-heading"
    >
      <RevealGroup
        stagger={0.08}
        start="top 86%"
        className={cn(
          "section-inner grid min-w-0 gap-10",
          "sm:gap-12",
          "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]",
          "lg:items-center lg:gap-12",
          "xl:gap-16",
        )}
      >
        {/* Introduction */}
        <div className="min-w-0 lg:pr-2">
          <p className="small-label text-brand-sage">
            Client confidence
          </p>

          <h2
            id="client-confidence-heading"
            className={cn(
              "mt-4 max-w-[10ch]",
              "font-display font-normal text-brand-olive",
              "text-[clamp(2.35rem,11vw,2.8rem)]",
              "leading-[0.98] tracking-[-0.02em]",
              "[overflow-wrap:anywhere]",
              "sm:max-w-[9ch] sm:text-[3.8rem] sm:leading-[0.96]",
              "lg:text-[4.15rem]",
              "xl:text-[4.55rem]",
            )}
          >
            Kind words,{" "}
            <span className="block">
              handled with care.
            </span>
          </h2>

          <p
            className={cn(
              "mt-5 max-w-[36rem]",
              "text-[0.95rem] leading-7 text-brand-olive/68",
              "min-[380px]:mt-6",
              "sm:text-base sm:leading-8",
            )}
          >
            Direct review screenshots are intentionally kept outside the
            public interface until names and wording are cleared for
            publication. The themes shown here summarise what the service is
            designed to provide.
          </p>

          <div
            className={cn(
              "mt-6 flex min-h-11 w-fit max-w-full",
              "items-center gap-2.5",
              "rounded-2xl border border-brand-olive/10",
              "bg-brand-white/60 px-3.5 py-2.5",
              "text-xs font-bold leading-5 text-brand-olive/60",
              "shadow-[0_10px_26px_rgba(48,50,41,0.06)]",
              "min-[380px]:rounded-full min-[380px]:px-4",
              "sm:mt-7",
            )}
          >
            <ShieldCheck
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
              className="shrink-0 text-brand-sage"
            />

            <span className="min-w-0">
              Privacy-safe presentation
            </span>
          </div>
        </div>

        {/* Confidence themes */}
        <div
          role="list"
          aria-label="Client confidence themes"
          className={cn(
            "grid min-w-0 grid-cols-1 gap-3.5",
            "sm:grid-cols-2 sm:gap-4",
            "xl:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]",
            "xl:grid-rows-2",
          )}
        >
          {themes.map((item, index) => (
            <article
              key={item.title}
              role="listitem"
              className={cn(
                "group relative isolate min-w-0 overflow-hidden",
                "rounded-[1.35rem] border border-brand-olive/10",
                "bg-brand-white/60",
                "p-5 min-[380px]:p-6 sm:rounded-[1.5rem] sm:p-7",
                "shadow-[0_14px_34px_rgba(48,50,41,0.07)]",
                "transition-[transform,background-color,box-shadow,border-color]",
                "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "motion-reduce:transition-none",
                "lg:hover:-translate-y-1",
                "lg:hover:border-brand-olive/15",
                "lg:hover:bg-brand-white/85",
                "lg:hover:shadow-[0_26px_60px_rgba(48,50,41,0.12)]",
                item.featured
                  ? cn(
                      "sm:col-span-2 sm:min-h-[20rem]",
                      "xl:col-span-1 xl:row-span-2",
                      "xl:min-h-[26rem]",
                    )
                  : cn(
                      "sm:min-h-[16rem]",
                      "xl:col-start-2 xl:min-h-0",
                    ),
                index === 1 && "xl:row-start-1",
                index === 2 && "xl:row-start-2",
              )}
            >
              {/* Decorative paper glow */}
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-0",
                  "bg-[radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.9),transparent_42%)]",
                  "opacity-70",
                )}
              />

              <div className="relative z-10 flex h-full min-w-0 flex-col">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <p className="small-label shrink-0 text-brand-sage">
                    {item.number}
                  </p>

                  <span
                    aria-hidden="true"
                    className="h-px min-w-0 flex-1 bg-brand-olive/10"
                  />
                </div>

                <h3
                  className={cn(
                    "mt-5 max-w-full min-w-0",
                    "font-display font-normal text-brand-olive",
                    "leading-[1] tracking-[-0.015em]",
                    "[overflow-wrap:anywhere]",
                    "sm:mt-6",
                    item.featured
                      ? cn(
                          "text-[clamp(2rem,9vw,2.4rem)]",
                          "sm:max-w-[10ch] sm:text-[3rem]",
                          "xl:max-w-[9ch] xl:text-[3.35rem]",
                        )
                      : cn(
                          "text-[clamp(1.85rem,8vw,2.15rem)]",
                          "sm:text-[2.25rem]",
                          "xl:text-[2.15rem]",
                        ),
                  )}
                >
                  {item.title}
                </h3>

                <p
                  className={cn(
                    "mt-4 max-w-[29rem]",
                    "text-[0.92rem] leading-7 text-brand-olive/66",
                    "min-[380px]:mt-5 min-[380px]:text-[0.94rem]",
                    item.featured && "xl:mt-auto xl:pt-8",
                  )}
                >
                  {item.text}
                </p>

                {item.featured ? (
                  <div
                    aria-hidden="true"
                    className={cn(
                      "mt-7 flex min-w-0 items-center gap-3",
                      "text-[0.6rem] font-bold uppercase",
                      "leading-5 tracking-[0.14em]",
                      "text-brand-sage",
                      "sm:mt-8 sm:text-[0.62rem] sm:tracking-[0.16em]",
                    )}
                  >
                    <span className="h-px w-7 shrink-0 bg-brand-sage/50 sm:w-8" />

                    <span className="min-w-0">
                      Guided from start to finish
                    </span>
                  </div>
                ) : null}
              </div>

              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute",
                  "-bottom-5 -right-1",
                  "font-display text-[6.5rem] leading-none",
                  "text-brand-olive/[0.025]",
                  "transition-transform duration-700",
                  "motion-reduce:transition-none",
                  "sm:-bottom-8 sm:-right-3 sm:text-[9rem]",
                  "lg:group-hover:-translate-x-1",
                  "lg:group-hover:-translate-y-1",
                )}
              >
                {item.number}
              </span>
            </article>
          ))}
        </div>
      </RevealGroup>
    </SectionTransition>
  );
}