import type { Metadata } from "next";
import { Suspense } from "react";
import { CollectionCatalogue } from "@/components/collections/CollectionCatalogue";
import { RevealGroup } from "@/components/motion/RevealGroup";

export const metadata: Metadata = {
  title: "Stationery Collections",
  description:
    "Explore 63 organised Elegant Star stationery directions across invitations, certificate folders, heritage designs, modern suites and event stationery.",
};
export default function CollectionsPage() {
  return (
    <section className="page-top section-shell" data-nav-theme="light">
      <div className="section-inner">
        <RevealGroup className="mb-10 max-w-4xl sm:mb-12" start="top 84%">
          <p className="small-label text-brand-sage">63 visual directions</p>
          <h1 className="display-heading mt-4 text-[clamp(2.85rem,14vw,4.4rem)] leading-[0.96] sm:text-6xl md:text-8xl">
            Stationery Collections
          </h1>
          <p className="body-copy mt-5 max-w-3xl text-base leading-8 sm:mt-6 sm:text-lg">
            Browse exact design families organised from the Elegant Star media
            archive. Collections with limited photography remain available as
            visual starting points rather than invented product specifications.
          </p>
        </RevealGroup>
        <Suspense
          fallback={<div className="min-h-80 rounded-2xl bg-brand-white/50" />}
        >
          <CollectionCatalogue />
        </Suspense>
      </div>
    </section>
  );
}
