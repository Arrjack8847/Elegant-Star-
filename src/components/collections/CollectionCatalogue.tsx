"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import {
  collectionFilters,
  invitationCollections,
  type CollectionFilter,
} from "@/data/collections";
import { DesignCard } from "@/components/designs/DesignCard";
import { cn } from "@/lib/utils";
import { RevealGroup } from "@/components/motion/RevealGroup";

function normalizeFilter(value: string | null): CollectionFilter {
  return value && collectionFilters.includes(value as CollectionFilter)
    ? (value as CollectionFilter)
    : "All";
}

function formatCollectionCount(count: number) {
  return `${count} ${count === 1 ? "collection" : "collections"}`;
}

export function CollectionCatalogue({ totalCount }: { totalCount: number }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const filterParam = params.get("filter");
  const filter = normalizeFilter(filterParam);
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const updateFilter = useCallback(
    (nextFilter: CollectionFilter) => {
      const nextParams = new URLSearchParams(params.toString());

      if (nextFilter === "All") {
        nextParams.delete("filter");
      } else {
        nextParams.set("filter", nextFilter);
      }

      const nextQuery = nextParams.toString();

      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    },
    [params, pathname, router],
  );

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
            .includes(normalizedQuery),
      ),
    [filter, normalizedQuery],
  );

  const hasActiveSearch = normalizedQuery.length > 0;
  const hasActiveFilter = filter !== "All";
  const showFilteredCount = hasActiveFilter || hasActiveSearch;
  const resultLabel = formatCollectionCount(filtered.length);

  const resetResults = useCallback(() => {
    setQuery("");
    updateFilter("All");
  }, [updateFilter]);

  return (
    <div>
      <div className="mb-4 grid gap-3 sm:mb-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <label className="relative block">
          <span className="sr-only">
            Search by collection, category or reference
          </span>
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-sage"
            size={18}
            aria-hidden="true"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search collections"
            className="min-h-12 w-full rounded-full border border-brand-olive/12 bg-brand-white/78 pl-12 pr-12 text-base text-brand-olive outline-none transition placeholder:text-brand-olive/48 focus:border-brand-sage focus:bg-brand-white focus:ring-2 focus:ring-brand-sage/18 md:min-h-14"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear collection search"
              className="absolute right-2 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-brand-olive/58 transition hover:bg-brand-olive/8 hover:text-brand-olive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage"
            >
              <X size={16} aria-hidden="true" />
            </button>
          ) : null}
        </label>
        <p
          className={cn(
            "min-h-6 text-sm font-bold text-brand-olive/52 md:text-right",
            !showFilteredCount && "sr-only md:not-sr-only",
          )}
          aria-live="polite"
        >
          {showFilteredCount ? (
            resultLabel
          ) : (
            <>
              All categories
              <span className="sr-only">
                , {formatCollectionCount(totalCount)}
              </span>
            </>
          )}
        </p>
      </div>
      <div
        className="no-scrollbar -mx-4 mb-5 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:-mx-0 sm:mb-8 sm:px-0"
        role="group"
        aria-label="Collection filters"
      >
        {collectionFilters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => updateFilter(item)}
            className={cn(
              "min-h-10 snap-start whitespace-nowrap rounded-full border px-4 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage sm:min-h-11",
              filter === item
                ? "border-brand-olive bg-brand-olive text-brand-white shadow-soft"
                : "border-brand-olive/15 bg-brand-white/58 text-brand-olive/72 hover:border-brand-olive/25 hover:bg-brand-white hover:text-brand-olive",
            )}
            aria-pressed={filter === item}
          >
            {item}
          </button>
        ))}
      </div>
      {filtered.length ? (
        <RevealGroup
          className="grid grid-cols-1 gap-x-4 gap-y-8 min-[520px]:grid-cols-2 md:grid-cols-3 min-[1120px]:grid-cols-4"
          stagger={0.05}
          start="top 82%"
        >
          {filtered.map((design, index) => (
            <DesignCard
              key={design.slug}
              design={design}
              compact
              priority={index < 4}
            />
          ))}
        </RevealGroup>
      ) : (
        <RevealGroup className="rounded-[24px] border border-brand-olive/10 bg-brand-white/60 p-6 text-center sm:p-10">
          <h2 className="font-display text-4xl">No matching collections</h2>
          <p className="body-copy mx-auto mt-3 max-w-md">
            Try another search term or return to all categories.
          </p>
          <button
            type="button"
            onClick={resetResults}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-brand-olive px-5 text-sm font-bold text-brand-white transition hover:bg-[#3f4236] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage"
          >
            Reset collections
          </button>
        </RevealGroup>
      )}
    </div>
  );
}
