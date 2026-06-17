import type { InvitationCollection } from "@/data/collections";
import { DesignCard } from "@/components/designs/DesignCard";
import { RevealGroup } from "@/components/motion/RevealGroup";
export function RelatedDesigns({
  designs,
}: {
  designs: InvitationCollection[];
}) {
  return (
    <section className="section-shell bg-brand-white/42" data-nav-theme="light">
      <div className="section-inner">
        <RevealGroup stagger={0.07} start="top 84%">
          <p className="small-label text-brand-sage">Continue exploring</p>
          <h2 className="display-heading mt-4 text-[2.8rem] leading-[0.96] sm:text-5xl md:text-7xl">
            Related directions
          </h2>
        </RevealGroup>
        <RevealGroup
          className="mt-8 grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 md:mt-10 md:grid-cols-3"
          stagger={0.06}
          start="top 82%"
        >
          {designs.map((design) => (
            <DesignCard key={design.slug} design={design} compact />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
