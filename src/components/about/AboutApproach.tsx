import { Layers3, MessageCircleMore, Palette } from "lucide-react";

import { RevealGroup } from "@/components/motion/RevealGroup";
import { cn } from "@/lib/utils";

const approachItems = [
  {
    number: "01",
    title: "Begin visually",
    text: "Explore physical invitation suites, materials, shapes and presentation formats before refining the final direction.",
    icon: Palette,
  },
  {
    number: "02",
    title: "Adapt thoughtfully",
    text: "Colours, wording, finishing and supporting pieces can be shaped around the occasion rather than treated as fixed templates.",
    icon: MessageCircleMore,
  },
  {
    number: "03",
    title: "Coordinate completely",
    text: "Invitations, folders, boxes and event stationery are considered together as one connected visual family.",
    icon: Layers3,
  },
] as const;

export function AboutApproach({
  copy,
}: {
  copy: string;
}) {
  return (
    <section
      className="section-shell bg-brand-white/36 !py-16 sm:!py-20 lg:!py-24"
      data-nav-theme="light"
      aria-labelledby="about-approach-heading"
    >
      <div className="section-inner">
        <RevealGroup
          className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-14"
          stagger={0.07}
          start="top 84%"
        >
          <div>
            <p className="small-label text-brand-sage">Our approach</p>
            <h2
              id="about-approach-heading"
              className="mt-4 max-w-[11ch] font-display text-[2.45rem] font-normal leading-[0.97] text-brand-olive sm:text-[3.4rem] lg:text-[3.85rem]"
            >
              Stationery is part of the celebration.
            </h2>
          </div>

          <div className="max-w-[43rem] lg:justify-self-end">
            <p className="font-display text-[1.35rem] leading-[1.22] text-brand-olive/88 sm:text-[1.8rem]">
              Before guests arrive at the occasion, they experience the
              invitation.
            </p>
            <p className="body-copy mt-5 text-base leading-8">{copy}</p>
          </div>
        </RevealGroup>

        <RevealGroup
          className="mt-10 grid gap-3 md:grid-cols-3 lg:mt-12"
          stagger={0.05}
          start="top 82%"
        >
          {approachItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.number}
                className={cn(
                  "grid min-h-full grid-cols-[auto_minmax(0,1fr)] gap-4",
                  "rounded-[1.35rem] border border-brand-olive/10",
                  "bg-brand-white/62 p-4",
                  "md:flex md:flex-col md:p-6",
                )}
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-brand-olive/10 bg-brand-ivory text-brand-sage md:size-11">
                  <Icon size={18} aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <p className="small-label text-brand-sage">{item.number}</p>
                  <h3 className="mt-2 font-display text-[1.7rem] font-normal leading-none text-brand-olive md:mt-7 md:text-[2rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-brand-olive/66 md:mt-5">
                    {item.text}
                  </p>
                </div>
              </article>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
