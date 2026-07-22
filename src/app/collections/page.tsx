import type { Metadata } from "next";
import { Suspense } from "react";
import { CollectionCatalogue } from "@/components/collections/CollectionCatalogue";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { invitationCollections } from "@/data/collections";

const collectionCount = invitationCollections.length;

export const metadata: Metadata = {
  title: "Stationery Collections",
  description: `Explore ${collectionCount} Elegant Star stationery collections across invitations, certificate folders, keepsakes and official stationery.`,
};

function formatDesignCount(count: number) {
  return `${count} ${count === 1 ? "DESIGN" : "DESIGNS"}`;
}

export default function CollectionsPage() {
  return (
    <section
      className="relative pb-14 pt-[calc(6.75rem+env(safe-area-inset-top))] sm:pb-16 sm:pt-[calc(7.75rem+env(safe-area-inset-top))] lg:pb-20 lg:pt-[calc(8.25rem+env(safe-area-inset-top))]"
      data-nav-theme="light"
    >
      <div className="section-inner">
        <RevealGroup className="mb-7 sm:mb-8 lg:mb-9" start="top 86%">
          <p className="small-label text-brand-sage">
            Collections / {formatDesignCount(collectionCount)}
          </p>
          <div className="mt-3 grid gap-4 md:mt-4 md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.62fr)] md:items-center lg:grid-cols-[minmax(0,0.66fr)_1px_minmax(19rem,0.34fr)] lg:gap-7">
            <h1 className="display-heading max-w-[10ch] whitespace-normal break-words text-[2.65rem] leading-[0.94] min-[380px]:text-[2.95rem] sm:max-w-[11ch] sm:text-[3.8rem] md:max-w-[12ch] md:text-[4.25rem] lg:max-w-none lg:text-[4rem] xl:text-[4.5rem]">
              Stationery Collections
            </h1>
            <div
              aria-hidden="true"
              className="hidden h-20 w-px bg-brand-olive/14 lg:block"
            />
            <p className="body-copy max-w-[34rem] text-base leading-7 md:leading-8">
              Explore invitations, certificate folders, keepsakes and official
              stationery crafted for meaningful occasions.
            </p>
          </div>
        </RevealGroup>
        <Suspense
          fallback={<div className="min-h-72 rounded-2xl bg-brand-white/50" />}
        >
          <CollectionCatalogue totalCount={collectionCount} />
        </Suspense>
      </div>
    </section>
  );
}
