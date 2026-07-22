import { EnquiryButton } from "@/components/enquiry/EnquiryButton";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { cn } from "@/lib/utils";

export function AboutCTA() {
  return (
    <section
      className="section-shell !pb-24 !pt-10 sm:!pb-28 lg:!pb-32"
      data-nav-theme="light"
      aria-labelledby="about-cta-heading"
    >
      <div className="section-inner">
        <RevealGroup
          className={cn(
            "relative isolate overflow-hidden rounded-[1.75rem]",
            "bg-brand-olive px-6 py-10 text-brand-ivory",
            "shadow-[0_28px_72px_rgba(48,50,41,0.2)]",
            "sm:px-9 sm:py-12 lg:grid lg:grid-cols-[minmax(0,1fr)_auto]",
            "lg:items-end lg:gap-12 lg:px-12 lg:py-14",
          )}
          stagger={0.07}
          start="top 84%"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-brand-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -top-8 h-44 w-44 rounded-full border border-brand-champagne/15"
          />

          <div className="relative z-10 max-w-[48rem]">
            <p className="small-label text-brand-champagne">
              Start your celebration
            </p>
            <h2
              id="about-cta-heading"
              className="mt-4 max-w-[14ch] font-display text-[2.35rem] font-normal leading-[0.98] sm:text-[3.45rem] lg:text-[4rem]"
            >
              Begin with a collection, a colour, or simply a feeling.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-brand-ivory/70 sm:text-base">
              Share the occasion, preferred direction and any stationery pieces
              you would like to coordinate.
            </p>
          </div>

          <div className="relative z-10 mt-8 lg:mt-0 lg:pb-1">
            <EnquiryButton variant="dark" />
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
