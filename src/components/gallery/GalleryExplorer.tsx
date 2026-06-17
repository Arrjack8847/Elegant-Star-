"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { invitationCollections } from "@/data/collections";
import { realStories } from "@/data/stories";
import { cn } from "@/lib/utils";
import { RevealGroup } from "@/components/motion/RevealGroup";

const filters = [
  "All",
  "Collections",
  "Stories",
  "Traditional",
  "Botanical",
  "Modern",
  "Corporate",
] as const;
const items = [
  ...invitationCollections.map((item) => ({
    title: item.name,
    subtitle: item.reference,
    type: "Collections",
    href: `/designs/${item.slug}`,
    image: item.cardImage,
    tags: item.categories,
  })),
  ...realStories.map((story) => ({
    title: story.title,
    subtitle: "Real celebration",
    type: "Stories",
    href: `/stories/${story.slug}`,
    image: story.coverImage,
    tags: ["Stories"],
  })),
];
export function GalleryExplorer() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");
  const visible = useMemo(
    () =>
      items.filter((item) => {
        const matchQuery =
          `${item.title} ${item.subtitle} ${item.tags.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase());
        if (!matchQuery) return false;
        if (filter === "All") return true;
        if (filter === "Collections" || filter === "Stories")
          return item.type === filter;
        if (filter === "Traditional")
          return item.tags.some((tag) => tag.includes("Traditional"));
        if (filter === "Botanical")
          return item.tags.some((tag) => tag.includes("Botanical"));
        if (filter === "Modern")
          return item.tags.some((tag) => tag.includes("Modern"));
        if (filter === "Corporate")
          return item.tags.some((tag) => tag.includes("Corporate"));
        return true;
      }),
    [filter, query],
  );
  return (
    <>
      <RevealGroup
        className="grid gap-4 lg:grid-cols-[1fr_auto]"
        stagger={0.05}
        start="top 84%"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search the visual library"
          placeholder="Search the visual library"
          className="min-h-12 rounded-full border border-brand-olive/12 bg-brand-white/70 px-5 text-base outline-none focus:border-brand-sage sm:text-sm"
        />
        <p
          className="self-center text-sm font-bold text-brand-olive/52"
          aria-live="polite"
        >
          {visible.length} albums and directions
        </p>
      </RevealGroup>
      <RevealGroup
        className="no-scrollbar mt-5 flex snap-x gap-2 overflow-x-auto pb-2"
        aria-label="Gallery filters"
        stagger={0.04}
        start="top 84%"
      >
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            aria-pressed={filter === item}
            className={cn(
              "min-h-11 snap-start whitespace-nowrap rounded-full border px-5 py-3 text-sm font-bold",
              filter === item
                ? "border-brand-olive bg-brand-olive text-brand-white"
                : "border-brand-olive/12 bg-brand-white/60",
            )}
          >
            {item}
          </button>
        ))}
      </RevealGroup>
      <RevealGroup
        key={`${filter}-${query}`}
        className="mt-10 columns-1 gap-4 min-[430px]:columns-2 md:columns-3 lg:columns-4"
        stagger={0.04}
        start="top 82%"
      >
        {visible.map((item, index) => (
          <Link
            key={`${item.type}-${item.title}`}
            href={item.href}
            className="group motion-card-lift mb-4 block break-inside-avoid rounded-[18px]"
          >
            <article className="overflow-hidden rounded-[18px] border border-brand-olive/8 bg-brand-white/65 shadow-soft">
              <div
                className={`relative ${index % 5 === 0 ? "aspect-square" : "aspect-[4/5]"}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 motion-reduce:transition-none group-hover:scale-[1.035]"
                  sizes="(max-width: 429px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                />
              </div>
              <div className="p-4">
                <p className="small-label text-brand-sage">{item.subtitle}</p>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <h2 className="break-words font-display text-2xl leading-[0.98]">
                    {item.title}
                  </h2>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-brand-sage"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </RevealGroup>
    </>
  );
}
