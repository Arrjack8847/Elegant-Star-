"use client";

import {
  useCallback,
  useDeferredValue,
  useMemo,
  useState,
} from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Search, X } from "lucide-react";

import {
  collectionFilters,
  invitationCollections,
  type CollectionFilter,
} from "@/data/collections";
import { DesignCard } from "@/components/designs/DesignCard";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { cn } from "@/lib/utils";

function normalizeFilter(value: string | null): CollectionFilter {
  if (
    value &&
    collectionFilters.includes(value as CollectionFilter)
  ) {
    return value as CollectionFilter;
  }

  return "All";
}

function formatCollectionCount(count: number) {
  return `${count} ${count === 1 ? "collection" : "collections"}`;
}

export function CollectionCatalogue({
  totalCount,
}: {
  totalCount: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const filter = normalizeFilter(searchParams.get("filter"));

  const [query, setQuery] = useState("");

  /*
   * Deferring the search value prevents the collection grid from updating
   * too aggressively while the user is typing on a slower mobile phone.
   */
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const updateFilter = useCallback(
    (nextFilter: CollectionFilter) => {
      const nextParams = new URLSearchParams(
        searchParams.toString(),
      );

      if (nextFilter === "All") {
        nextParams.delete("filter");
      } else {
        nextParams.set("filter", nextFilter);
      }

      const nextQueryString = nextParams.toString();

      router.replace(
        nextQueryString
          ? `${pathname}?${nextQueryString}`
          : pathname,
        {
          scroll: false,
        },
      );
    },
    [pathname, router, searchParams],
  );

  const filteredCollections = useMemo(() => {
    return invitationCollections.filter((item) => {
      const matchesCategory =
        filter === "All" ||
        item.categories.includes(
          filter as Exclude<CollectionFilter, "All">,
        );

      if (!matchesCategory) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchableText = [
        item.name,
        item.reference,
        item.shortDescription,
        ...item.categories,
        ...item.materials,
        ...item.finishes,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [filter, normalizedQuery]);

  const hasActiveSearch = normalizedQuery.length > 0;
  const hasActiveFilter = filter !== "All";
  const showFilteredCount =
    hasActiveFilter || hasActiveSearch;

  const resultLabel = formatCollectionCount(
    filteredCollections.length,
  );

  const gridKey = `${filter}-${normalizedQuery || "all"}`;

  const resetResults = useCallback(() => {
    setQuery("");
    updateFilter("All");
  }, [updateFilter]);

  return (
    <div className="min-w-0">
      {/* Search and result count */}
      <div
        className={cn(
          "mb-4 grid min-w-0 gap-3",
          "sm:mb-5",
          "md:grid-cols-[minmax(0,1fr)_auto]",
          "md:items-center",
        )}
      >
        <label className="relative block min-w-0">
          <span className="sr-only">
            Search by collection, category or reference
          </span>

          <Search
            size={18}
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute",
              "left-4 top-1/2",
              "-translate-y-1/2",
              "text-brand-sage",
            )}
          />

          <input
            type="search"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search collections"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="search"
            className={cn(
              "min-h-12 w-full min-w-0",
              "appearance-none rounded-full",
              "border border-brand-olive/12",
              "bg-brand-white/78",
              "pl-12 pr-12",
              "text-base text-brand-olive",
              "outline-none",
              "transition",
              "placeholder:text-brand-olive/48",
              "focus:border-brand-sage",
              "focus:bg-brand-white",
              "focus:ring-2",
              "focus:ring-brand-sage/18",
              "md:min-h-14",
            )}
          />

          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear collection search"
              className={cn(
                "absolute right-2 top-1/2",
                "inline-flex size-9",
                "-translate-y-1/2",
                "touch-manipulation",
                "items-center justify-center",
                "rounded-full",
                "text-brand-olive/58",
                "transition",
                "hover:bg-brand-olive/8",
                "hover:text-brand-olive",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-brand-sage",
              )}
            >
              <X size={16} aria-hidden="true" />
            </button>
          ) : null}
        </label>

        <p
          className={cn(
            "min-h-6 text-sm font-bold",
            "text-brand-olive/52",
            "md:text-right",
            !showFilteredCount &&
              "sr-only md:not-sr-only",
          )}
          aria-live="polite"
          aria-atomic="true"
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

      {/* Mobile-scrollable filters */}
      <div
        className={cn(
          "no-scrollbar",
          "-mx-4 mb-5 flex",
          "snap-x snap-mandatory",
          "gap-2 overflow-x-auto",
          "overscroll-x-contain",
          "px-4 pb-2",
          "touch-pan-x",
          "sm:mx-0 sm:mb-8 sm:px-0",
        )}
        role="group"
        aria-label="Collection filters"
      >
        {collectionFilters.map((item) => {
          const isActive = filter === item;

          return (
            <button
              key={item}
              type="button"
              onClick={(event) => {
                updateFilter(item);

                /*
                 * On narrow mobile screens, centre the selected filter so
                 * the active category stays visible.
                 */
                event.currentTarget.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "center",
                });
              }}
              aria-pressed={isActive}
              className={cn(
                "min-h-10 flex-none",
                "snap-center whitespace-nowrap",
                "touch-manipulation",
                "rounded-full border",
                "px-4 text-sm font-bold",
                "transition",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-brand-sage",
                "sm:min-h-11 sm:px-5",
                isActive
                  ? cn(
                      "border-brand-olive",
                      "bg-brand-olive",
                      "text-brand-white",
                      "shadow-soft",
                    )
                  : cn(
                      "border-brand-olive/15",
                      "bg-brand-white/58",
                      "text-brand-olive/72",
                      "hover:border-brand-olive/25",
                      "hover:bg-brand-white",
                      "hover:text-brand-olive",
                    ),
              )}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Collection results */}
      {filteredCollections.length > 0 ? (
        <RevealGroup
          key={gridKey}
          className={cn(
            "grid min-w-0",
            "grid-cols-1",
            "gap-x-4 gap-y-8",
            "min-[520px]:grid-cols-2",
            "md:grid-cols-3",
            "min-[1120px]:grid-cols-4",
          )}
          stagger={0.04}
          start="top 88%"
        >
          {filteredCollections.map(
            (design, index) => (
              <DesignCard
                key={design.slug}
                design={design}
                compact
                priority={index < 4}
              />
            ),
          )}
        </RevealGroup>
      ) : (
        <RevealGroup
          key="empty-collection-results"
          className={cn(
            "rounded-[24px]",
            "border border-brand-olive/10",
            "bg-brand-white/60",
            "p-6 text-center",
            "sm:p-10",
          )}
        >
          <h2 className="font-display text-4xl">
            No matching collections
          </h2>

          <p className="body-copy mx-auto mt-3 max-w-md">
            Try another search term or return to all
            categories.
          </p>

          <button
            type="button"
            onClick={resetResults}
            className={cn(
              "mt-6 inline-flex min-h-11",
              "touch-manipulation",
              "items-center justify-center",
              "rounded-full",
              "bg-brand-olive px-5",
              "text-sm font-bold text-brand-white",
              "transition",
              "hover:bg-[#3f4236]",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-brand-sage",
            )}
          >
            Reset collections
          </button>
        </RevealGroup>
      )}
    </div>
  );
}