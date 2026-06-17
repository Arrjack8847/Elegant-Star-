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
        "section-shell scroll-mt-[8.5rem] overflow-x-clip",
        "!pb-20 !pt-28",
        "sm:!pb-24 sm:!pt-32",
        "lg:!pb-24 lg:!pt-28",
        "xl:!py-28",
      )}
      data-nav-theme="light"
      aria-labelledby="client-confidence-heading"
    >
      <RevealGroup
        stagger={0.08}
        start="top 82%"
        className={cn(
          "section-inner grid min-w-0 gap-12",
          "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]",
          "lg:items-center lg:gap-12",
          "xl:gap-16",
        )}
      >
        {/* Introduction */}
        <div className="min-w-0 lg:pr-2">
          <p className="small-label text-brand-sage">Client confidence</p>

          <h2
            id="client-confidence-heading"
            className={cn(
              "mt-4 max-w-[9ch] text-balance",
              "font-display font-normal text-brand-olive",
              "text-[2.7rem] leading-[0.96]",
              "sm:text-[3.8rem]",
              "lg:text-[4.15rem]",
              "xl:text-[4.55rem]",
            )}
          >
            Kind words, <span className="block">handled with care.</span>
          </h2>

          <p
            className={cn(
              "body-copy mt-6 max-w-[36rem]",
              "text-[0.98rem] leading-7",
              "sm:text-base sm:leading-8",
            )}
          >
            Direct review screenshots are intentionally kept outside the public
            interface until names and wording are cleared for publication. The
            themes shown here summarise what the service is designed to provide.
          </p>

          <div
            className={cn(
              "mt-7 inline-flex max-w-full items-center gap-2.5",
              "rounded-full border border-brand-olive/10",
              "bg-brand-white/60 px-4 py-2.5",
              "text-xs font-bold leading-5 text-brand-olive/60",
              "shadow-[0_10px_26px_rgba(48,50,41,0.06)]",
            )}
          >
            <ShieldCheck
              size={16}
              aria-hidden="true"
              className="shrink-0 text-brand-sage"
            />

            <span>Privacy-safe presentation</span>
          </div>
        </div>

        {/* Confidence themes */}
        <div
          className={cn(
            "grid min-w-0 gap-4",
            "sm:grid-cols-2",
            "xl:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]",
            "xl:grid-rows-2",
          )}
          aria-label="Client confidence themes"
        >
          {themes.map((item, index) => (
            <article
              key={item.title}
              className={cn(
                "group relative min-w-0 overflow-hidden",
                "rounded-[1.5rem]",
                "border border-brand-olive/10",
                "bg-brand-white/60",
                "p-6 sm:p-7",
                "shadow-[0_18px_44px_rgba(48,50,41,0.08)]",
                "transition-[transform,background-color,box-shadow,border-color]",
                "duration-500",
                "ease-[cubic-bezier(0.22,1,0.36,1)]",
                "hover:-translate-y-1",
                "hover:border-brand-olive/15",
                "hover:bg-brand-white/85",
                "hover:shadow-[0_26px_60px_rgba(48,50,41,0.12)]",
                item.featured
                  ? cn(
                      "min-h-[15rem]",
                      "sm:min-h-[21rem]",
                      "sm:col-span-2",
                      "xl:col-span-1 xl:row-span-2",
                      "xl:min-h-[26rem]",
                    )
                  : cn(
                      "min-h-[13rem]",
                      "sm:min-h-[17rem]",
                      "xl:col-start-2",
                      "xl:min-h-0",
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
                <div className="flex items-center gap-4">
                  <p className="small-label shrink-0 text-brand-sage">
                    {item.number}
                  </p>

                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-brand-olive/10"
                  />
                </div>

                <h3
                  className={cn(
                    "mt-6 max-w-full text-balance break-words",
                    "font-display font-normal text-brand-olive",
                    "leading-[0.98]",
                    item.featured
                      ? cn(
                          "text-[2.2rem]",
                          "sm:max-w-[9ch] sm:text-[3.1rem]",
                          "xl:text-[3.35rem]",
                        )
                      : cn(
                          "text-[1.95rem]",
                          "sm:text-[2.3rem]",
                          "xl:text-[2.15rem]",
                        ),
                  )}
                >
                  {item.title}
                </h3>

                <p
                  className={cn(
                    "mt-5 max-w-[29rem]",
                    "text-[0.94rem] leading-7",
                    "text-brand-olive/66",
                    item.featured && "xl:mt-auto xl:pt-8",
                  )}
                >
                  {item.text}
                </p>

                {item.featured && (
                  <div
                    aria-hidden="true"
                    className={cn(
                      "mt-8 flex items-center gap-3",
                      "text-[0.62rem] font-bold uppercase",
                      "tracking-[0.16em]",
                      "text-brand-sage",
                    )}
                  >
                    <span className="h-px w-8 bg-brand-sage/50" />
                    Guided from start to finish
                  </div>
                )}
              </div>

              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute",
                  "-bottom-8 -right-3",
                  "font-display text-[9rem] leading-none",
                  "text-brand-olive/[0.025]",
                  "transition-transform duration-700",
                  "group-hover:-translate-x-1",
                  "group-hover:-translate-y-1",
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
