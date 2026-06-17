import type { Metadata } from "next";
import { realStories } from "@/data/stories";
import { StoryCard } from "@/components/stories/StoryCard";
import { RevealGroup } from "@/components/motion/RevealGroup";

export const metadata: Metadata = {
  title: "Real Celebration Stories",
  description:
    "Explore privacy-safe Elegant Star stories connecting stationery with real celebrations.",
};
export default function StoriesPage() {
  return (
    <section className="page-top section-shell" data-nav-theme="light">
      <div className="section-inner">
        <RevealGroup className="max-w-3xl" start="top 84%">
          <p className="small-label text-brand-sage">Real celebrations</p>
          <h1 className="display-heading mt-4 text-[clamp(2.85rem,14vw,4.4rem)] leading-[0.96] sm:text-6xl md:text-8xl">
            From the first piece{" "}
            <span className="block">to the day itself.</span>
          </h1>
          <p className="body-copy mt-5 text-base leading-8 sm:mt-6 sm:text-lg">
            Five curated stories show how Elegant Star stationery becomes part
            of a wider celebration. Public titles intentionally protect client
            identities.
          </p>
        </RevealGroup>
        <RevealGroup
          className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
          start="top 82%"
        >
          {realStories.map((story, index) => (
            <div
              key={story.slug}
              className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}
            >
              <StoryCard story={story} large={index === 0} />
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
