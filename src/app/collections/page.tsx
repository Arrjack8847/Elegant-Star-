import type { Metadata } from "next";
import { Suspense } from "react";

import { CollectionCatalogue } from "@/components/collections/CollectionCatalogue";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { invitationCollections } from "@/data/collections";

const collectionCount = invitationCollections.length;

export const metadata: Metadata = {
  title: "Wedding Invitation Collections",
  description: `Explore ${collectionCount} Elegant Star wedding invitation and stationery collections in Yangon, including certificate folders, keepsakes and coordinated celebration pieces.`,
};

function formatCollectionCount(count: number) {
  return `${count} ${count === 1 ? "COLLECTION" : "COLLECTIONS"}`;
}

function CollectionCatalogueFallback() {
  return (
    <div
      className="min-w-0"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading collections"
    >
      <div className="mb-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="h-12 animate-pulse rounded-full bg-brand-white/70 md:h-14" />

        <div className="hidden h-5 w-24 animate-pulse rounded-full bg-brand-white/70 md:block" />
      </div>

      <div className="mb-8 flex gap-2 overflow-hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-11 w-32 shrink-0 animate-pulse rounded-full bg-brand-white/70"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-8 min-[520px]:grid-cols-2 md:grid-cols-3 min-[1120px]:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="min-w-0">
            <div className="aspect-[4/5] animate-pulse rounded-[18px] bg-brand-white/70 shadow-soft" />

            <div className="mt-4 h-7 w-3/4 animate-pulse rounded bg-brand-white/70" />

            <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-brand-white/60" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <main className="min-w-0 overflow-x-clip">
      <section
        className="
          relative min-w-0
          pb-14
          pt-[calc(6.75rem+env(safe-area-inset-top))]
          sm:pb-16
          sm:pt-[calc(7.75rem+env(safe-area-inset-top))]
          lg:pb-20
          lg:pt-[calc(8.25rem+env(safe-area-inset-top))]
        "
        data-nav-theme="light"
        aria-labelledby="collections-page-heading"
      >
        <div className="section-inner min-w-0">
          <RevealGroup
            className="mb-8 min-w-0 sm:mb-10 lg:mb-12"
            start="top 88%"
          >
            <header className="min-w-0">
              <p className="small-label text-brand-sage">
                Collections / {formatCollectionCount(collectionCount)}
              </p>

              <div
                className="
                  mt-4 grid min-w-0 gap-5
                  md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.62fr)]
                  md:items-center
                  lg:grid-cols-[minmax(0,0.66fr)_1px_minmax(19rem,0.34fr)]
                  lg:gap-8
                "
              >
                <h1
                  id="collections-page-heading"
                  className="
                    display-heading
                    min-w-0
                    max-w-[11ch]
                    break-words
                    text-[clamp(2.7rem,13vw,3.35rem)]
                    leading-[0.94]
                    sm:max-w-[12ch]
                    sm:text-[3.8rem]
                    md:text-[4.25rem]
                    lg:max-w-none
                    lg:text-[4rem]
                    xl:text-[4.5rem]
                  "
                >
                  Wedding Invitation &amp; Stationery Collections
                </h1>

                <div
                  aria-hidden="true"
                  className="hidden h-20 w-px bg-brand-olive/14 lg:block"
                />

                <p className="body-copy max-w-[34rem] text-base leading-7 md:leading-8">
                  Explore wedding invitations, certificate folders, keepsakes
                  and coordinated stationery created for celebrations in Yangon
                  and across Myanmar.
                </p>
              </div>
            </header>
          </RevealGroup>

          <div className="min-w-0">
            <Suspense fallback={<CollectionCatalogueFallback />}>
              <CollectionCatalogue totalCount={collectionCount} />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
