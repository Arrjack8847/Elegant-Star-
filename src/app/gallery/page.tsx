import type { Metadata } from "next";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";
import { RevealGroup } from "@/components/motion/RevealGroup";
export const metadata: Metadata = {
  title: "Albums & Gallery",
  description:
    "Explore Elegant Star stationery collections and privacy-safe celebration stories in one visual library.",
};
export default function GalleryPage() {
  return (
    <section className="page-top section-shell" data-nav-theme="light">
      <div className="section-inner">
        <RevealGroup className="mb-10 max-w-4xl sm:mb-12" start="top 84%">
          <p className="small-label text-brand-sage">
            Albums and visual archive
          </p>
          <h1 className="display-heading mt-4 text-[clamp(2.85rem,14vw,4.4rem)] leading-[0.96] sm:text-6xl md:text-8xl">
            The complete gallery
          </h1>
          <p className="body-copy mt-5 max-w-3xl text-base leading-8 sm:mt-6 sm:text-lg">
            Browse stationery directions and celebration stories together, then
            open the related collection or editorial story for more context.
          </p>
        </RevealGroup>
        <GalleryExplorer />
      </div>
    </section>
  );
}
