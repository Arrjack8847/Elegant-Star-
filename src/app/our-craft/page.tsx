import type { Metadata } from "next";
import Image from "next/image";

import { EnquiryButton } from "@/components/enquiry/EnquiryButton";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { craftsmanshipItems } from "@/data/home";
import { siteMedia } from "@/data/siteMedia";

export const metadata: Metadata = {
  title: "Our Craft",
  description:
    "Explore paper, texture, metallic details, monograms, accessories, packaging and coordinated stationery.",
};

/* -------------------------------------------------------------------------- */
/*                               GALLERY DATA                                 */
/* -------------------------------------------------------------------------- */

const craftDetailGalleries = [
  siteMedia.craftsmanship.paperAndTexture.details,
  siteMedia.craftsmanship.foilEmbossingAndMonograms.details,
  siteMedia.craftsmanship.sealsRibbonsFansAndAccessories.details,
  siteMedia.craftsmanship.packagingGiftsAndFavours.details,
  siteMedia.craftsmanship.customisationAndCoordinatedPieces.details,
] as const;

type CraftItem = (typeof craftsmanshipItems)[number];
type CraftImage = (typeof craftDetailGalleries)[number][number];

type CraftSectionProps = {
  item: CraftItem;
  images: readonly CraftImage[];
  index: number;
};

/* -------------------------------------------------------------------------- */
/*                              HELPER FUNCTIONS                              */
/* -------------------------------------------------------------------------- */

function getGalleryItemClassName(imageIndex: number) {
  if (imageIndex === 0) {
    return "col-span-2 row-span-2";
  }

  if (imageIndex === 3) {
    return "col-span-2 md:col-span-1";
  }

  return "";
}

function getImageSizes(imageIndex: number) {
  if (imageIndex === 0) {
    return "(max-width: 1024px) 100vw, 48vw";
  }

  return "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw";
}

/* -------------------------------------------------------------------------- */
/*                              CRAFT SECTION                                 */
/* -------------------------------------------------------------------------- */

function CraftSection({ item, images, index }: CraftSectionProps) {
  const sectionNumber = String(index + 1).padStart(2, "0");
  const headingId = `craft-${item.slug}-heading`;

  return (
    <section
      id={item.slug}
      aria-labelledby={headingId}
      className={`section-shell scroll-mt-28 border-t border-brand-olive/10 ${
        index % 2 === 1 ? "bg-brand-white/45" : ""
      }`}
      data-nav-theme="light"
    >
      <div className="section-inner">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16 xl:gap-24">
          {/* Editorial description */}
          <RevealGroup
            className="lg:sticky lg:top-28 lg:self-start"
            start="top 84%"
          >
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="small-label text-brand-sage">
                {sectionNumber}
              </span>

              <span aria-hidden="true" className="h-px w-12 bg-brand-sage/35" />
            </div>

            <h2
              id={headingId}
              className="display-heading mt-5 max-w-[12ch] text-[2.75rem] leading-[0.97] sm:text-6xl md:text-7xl"
            >
              {item.title}
            </h2>

            <p className="body-copy mt-6 max-w-xl text-base leading-8 md:text-lg">
              {item.description}
            </p>
          </RevealGroup>

          {/* Image gallery */}
          {images.length > 0 ? (
            <RevealGroup
              className="grid auto-rows-[130px] grid-cols-2 gap-3 min-[380px]:auto-rows-[150px] sm:auto-rows-[200px] sm:gap-4 md:grid-cols-3 md:auto-rows-[190px] lg:auto-rows-[220px]"
              stagger={0.05}
              start="top 80%"
            >
              {images.map((image, imageIndex) => (
                <figure
                  key={`${item.slug}-${imageIndex}`}
                  className={`group motion-card-lift relative overflow-hidden rounded-[18px] bg-brand-paper shadow-soft ring-1 ring-black/5 sm:rounded-[24px] ${getGalleryItemClassName(
                    imageIndex,
                  )}`}
                >
                  <Image
                    src={image}
                    alt={`${item.title} craftsmanship detail ${imageIndex + 1}`}
                    fill
                    quality={85}
                    sizes={getImageSizes(imageIndex)}
                    className="object-cover transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-[1.035]"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 opacity-70"
                  />
                </figure>
              ))}
            </RevealGroup>
          ) : (
            <div className="flex min-h-[360px] items-center justify-center rounded-[24px] border border-brand-olive/10 bg-brand-paper">
              <p className="small-label text-brand-sage">Gallery coming soon</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  PAGE                                      */
/* -------------------------------------------------------------------------- */

export default function CraftPage() {
  return (
    <main>
      {/* Page introduction */}
      <section
        className="page-top section-shell overflow-hidden"
        data-nav-theme="light"
      >
        <div className="section-inner">
          <RevealGroup
            className="grid gap-10 border-b border-brand-olive/15 pb-16 md:pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20"
            stagger={0.08}
            start="top 84%"
          >
            <div>
              <div className="flex items-center gap-4">
                <p className="small-label text-brand-sage">
                  Materials and finishing
                </p>

                <span
                  aria-hidden="true"
                  className="hidden h-px w-14 bg-brand-sage/35 sm:block"
                />
              </div>

              <h1 className="display-heading mt-5 text-[clamp(3.25rem,18vw,8.5rem)] leading-[0.9] tracking-normal">
                Our Craft
              </h1>
            </div>

            <div className="max-w-2xl lg:justify-self-end">
              <p className="body-copy text-base leading-8 md:text-xl md:leading-9">
                Every collection begins as a visual direction. Paper character,
                format, finishing and coordinated pieces are then discussed
                according to the occasion and practical requirements.
              </p>

              <p className="mt-6 max-w-xl text-sm leading-7 text-brand-charcoal/60">
                Each element can be refined to create a stationery suite that
                feels considered, coordinated and personal to the celebration.
              </p>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* Craft categories */}
      {craftsmanshipItems.map((item, index) => (
        <CraftSection
          key={item.slug}
          item={item}
          index={index}
          images={craftDetailGalleries[index] ?? []}
        />
      ))}

      {/* Final call to action */}
      <section
        className="section-shell overflow-hidden bg-brand-olive text-brand-ivory"
        data-nav-theme="dark"
      >
        <div className="section-inner">
          <RevealGroup
            className="grid gap-10 border-y border-brand-ivory/15 py-4 md:grid-cols-[1fr_auto] md:items-end md:gap-16"
            stagger={0.08}
            start="top 84%"
          >
            <div className="max-w-4xl">
              <p className="small-label text-brand-champagne">
                Discuss the right finish
              </p>

              <h2 className="mt-4 max-w-[18ch] font-display text-[2.35rem] leading-tight sm:text-5xl md:text-6xl">
                Choose a collection, then refine every thoughtful detail.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-brand-ivory/70">
                Share your preferred direction and we will guide you through
                suitable papers, finishes, accessories and coordinated pieces.
              </p>
            </div>

            <div className="md:pb-2">
              <EnquiryButton variant="dark" />
            </div>
          </RevealGroup>
        </div>
      </section>
    </main>
  );
}
