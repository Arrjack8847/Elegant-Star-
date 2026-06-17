"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import {
  collectionFilters,
  invitationCollections,
  type CollectionFilter,
} from "@/data/collections";
import { DesignCard } from "@/components/designs/DesignCard";
import { cn } from "@/lib/utils";
import { RevealGroup } from "@/components/motion/RevealGroup";

export function CollectionCatalogue() {
  const params = useSearchParams();
  const initial = params.get("filter") as CollectionFilter | null;
  const [filter, setFilter] = useState<CollectionFilter>(
    initial && collectionFilters.includes(initial) ? initial : "All",
  );
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      invitationCollections.filter(
        (item) =>
          (filter === "All" ||
            item.categories.includes(
              filter as Exclude<CollectionFilter, "All">,
            )) &&
          `${item.name} ${item.reference} ${item.categories.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [filter, query],
  );
  return (
    <div>
      <RevealGroup
        className="mb-7 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center"
        stagger={0.05}
        start="top 84%"
      >
        <label className="relative block">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-sage"
            size={18}
            aria-hidden="true"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search collections"
            placeholder="Search by collection, category or reference"
            className="min-h-12 w-full rounded-full border border-brand-olive/12 bg-brand-white/70 pl-12 pr-5 text-base outline-none focus:border-brand-sage sm:text-sm"
          />
        </label>
        <p className="text-sm font-bold text-brand-olive/52" aria-live="polite">
          {filtered.length} collections
        </p>
      </RevealGroup>
      <RevealGroup
        className="no-scrollbar mb-10 flex snap-x gap-2 overflow-x-auto pb-2"
        aria-label="Collection filters"
        stagger={0.04}
        start="top 84%"
      >
        {collectionFilters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={cn(
              "min-h-11 snap-start whitespace-nowrap rounded-full border px-5 text-sm font-bold transition",
              filter === item
                ? "border-brand-olive bg-brand-olive text-brand-white"
                : "border-brand-olive/15 bg-brand-white/58 text-brand-olive/72 hover:bg-brand-white",
            )}
            aria-pressed={filter === item}
          >
            {item}
          </button>
        ))}
      </RevealGroup>
      {filtered.length ? (
        <RevealGroup
          key={`${filter}-${query}`}
          className="grid grid-cols-1 gap-x-4 gap-y-10 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          stagger={0.05}
          start="top 82%"
        >
          {filtered.map((design) => (
            <DesignCard key={design.slug} design={design} compact />
          ))}
        </RevealGroup>
      ) : (
        <RevealGroup className="rounded-[24px] border border-brand-olive/10 bg-brand-white/60 p-10 text-center">
          <h2 className="font-display text-4xl">No matching collections</h2>
          <p className="body-copy mt-3">Try another search or category.</p>
        </RevealGroup>
      )}
    </div>
  );
}
