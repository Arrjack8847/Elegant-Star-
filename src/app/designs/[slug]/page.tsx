import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import {
  invitationCollections,
  getCollectionBySlug,
  getRelatedCollections,
} from "@/data/collections";

import { DesignGallery } from "@/components/designs/DesignGallery";
import { RelatedDesigns } from "@/components/designs/RelatedDesigns";
import { RequestOrderButton } from "@/components/enquiry/RequestOrderButton";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { designToOrderContext } from "@/lib/enquiry";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return invitationCollections.map((design) => ({
    slug: design.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const design = getCollectionBySlug(slug);

  if (!design) {
    return {
      title: "Collection Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const metadataImages = [
    design.cover1,
    design.cover2,
    design.coverImage,
    ...design.images,
  ].filter(
    (image, index, list): image is string =>
      Boolean(image) && list.indexOf(image) === index,
  );

  const categoryLabel = design.categories.join(" & ");
  const categoryKeyword = categoryLabel.toLowerCase();
  const pageTitle = `${design.name} | ${categoryLabel} Yangon`;
  const socialTitle = `${design.name} | Elegant Star ${categoryLabel}`;
  const pageUrl = `/designs/${design.slug}`;
  const seoDescription = `${design.shortDescription} Explore this customisable ${categoryKeyword} design from Elegant Star in Yangon, Myanmar.`;

  return {
    title: pageTitle,
    description: seoDescription,
    keywords: [
      design.name,
      design.reference,
      categoryLabel,
      `${categoryLabel} Yangon`,
      `${categoryLabel} Myanmar`,
      "Elegant Star",
      "wedding invitations Yangon",
      "wedding stationery Myanmar",
    ],

    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      type: "website",
      title: socialTitle,
      description: seoDescription,
      url: pageUrl,
      ...(metadataImages.length > 0
        ? {
            images: metadataImages.slice(0, 4).map((url, index) => ({
              url,
              alt:
                index === 0
                  ? `${design.name} ${categoryLabel} by Elegant Star`
                  : `${design.name} design detail ${index + 1}`,
            })),
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: seoDescription,
      ...(metadataImages[0]
        ? {
            images: [metadataImages[0]],
          }
        : {}),
    },
  };
}

export default async function DesignPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const design = getCollectionBySlug(slug);

  if (!design) {
    notFound();
  }

  const relatedCollections = getRelatedCollections(
    design.slug,
    design.categories,
  );

  const orderContext = designToOrderContext(design);

  return (
    <div
      className={cn(
        "min-w-0 overflow-x-clip",
        "pb-[calc(8.5rem+env(safe-area-inset-bottom))]",
        "md:pb-0",
      )}
    >
      {/* Collection introduction */}
      <section
        className="section-shell design-detail-hero min-w-0 pt-[calc(7.5rem+env(safe-area-inset-top))]"
        data-nav-theme="light"
        aria-labelledby="collection-title"
      >
        <div className="section-inner min-w-0">
          <Link
            href="/collections"
            scroll
            aria-label="Return to all collections"
            className={cn(
              "mb-5 inline-flex min-h-11",
              "touch-manipulation items-center gap-2",
              "rounded-full",
              "text-sm font-bold text-brand-olive/60",
              "transition-colors duration-200",
              "hover:text-brand-olive",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-brand-sage",
              "focus-visible:ring-offset-4",
              "focus-visible:ring-offset-brand-ivory",
              "sm:mb-7",
            )}
          >
            <ArrowLeft
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <span>Back to Collections</span>
          </Link>

          <div
            className={cn(
              "grid min-w-0 gap-8",
              "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]",
              "lg:items-start",
              "lg:gap-12",
              "xl:gap-16",
            )}
          >
            <div className="min-w-0">
              <DesignGallery design={design} />
            </div>

            <RevealGroup
              className={cn(
                "min-w-0",
                "lg:sticky",
                "lg:top-[var(--nav-offset-desktop)]",
              )}
              start="top 86%"
            >
              <p className="small-label text-brand-sage">
                {design.reference}
              </p>

              <h1
                id="collection-title"
                className={cn(
                  "display-heading mt-4",
                  "min-w-0 break-words",
                  "text-[clamp(2.65rem,12vw,4.5rem)]",
                  "leading-[0.94]",
                  "sm:text-6xl",
                  "md:text-7xl",
                  "lg:text-[4.5rem]",
                  "xl:text-[5rem]",
                )}
              >
                {design.name}
              </h1>

              <p
                className={cn(
                  "mt-4 break-words",
                  "text-sm font-bold leading-6",
                  "text-brand-olive/58",
                )}
              >
                {design.categories.join(" / ")}
              </p>

              <p
                className={cn(
                  "body-copy mt-5",
                  "max-w-2xl",
                  "text-base leading-8",
                  "sm:mt-6 sm:text-lg",
                )}
              >
                {design.fullDescription}
              </p>

              {/* Desktop and tablet order button */}
              <div className="mt-7 hidden sm:mt-8 md:block">
                <RequestOrderButton context={orderContext}>
                  Request Order
                </RequestOrderButton>
              </div>

              <p
                className={cn(
                  "mt-5 max-w-xl",
                  "text-xs leading-5",
                  "text-brand-olive/46",
                  "md:mt-4",
                )}
              >
                Photographs show available reference views. Confirm exact
                materials, finish availability and timing during enquiry.
              </p>
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Collection details */}
      <section
        className="section-shell min-w-0 bg-brand-white/40"
        data-nav-theme="light"
        aria-labelledby="collection-details-heading"
      >
        <div
          className={cn(
            "section-inner grid min-w-0 gap-8",
            "lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]",
            "lg:gap-12",
          )}
        >
          <RevealGroup
            className="min-w-0"
            start="top 86%"
          >
            <p className="small-label text-brand-sage">
              Collection details
            </p>

            <h2
              id="collection-details-heading"
              className={cn(
                "display-heading mt-4",
                "max-w-[12ch] break-words",
                "text-[2.7rem] leading-[0.96]",
                "sm:text-5xl",
                "md:text-7xl",
              )}
            >
              A direction ready to personalise.
            </h2>
          </RevealGroup>

          <RevealGroup
            className="grid min-w-0 gap-5 md:grid-cols-2"
            stagger={0.05}
            start="top 86%"
          >
            <Detail
              title="Format & composition"
              items={[
                "Photographed views shown in the gallery",
                "Final format confirmed during consultation",
              ]}
            />

            <Detail
              title="Materials"
              items={design.materials}
            />

            <Detail
              title="Visible finish directions"
              items={design.finishes}
            />

            <Detail
              title="Personalisation"
              items={design.personalization}
              wide
            />
          </RevealGroup>
        </div>
      </section>

      {relatedCollections.length > 0 ? (
        <RelatedDesigns designs={relatedCollections} />
      ) : null}

      {/* Mobile order button */}
      <div
        className={cn(
          "fixed left-3 right-3 z-40",
          "bottom-[calc(0.75rem+env(safe-area-inset-bottom))]",
          "md:hidden",
        )}
      >
        <div
          className={cn(
            "rounded-full",
            "bg-brand-ivory/88 p-1",
            "shadow-[0_16px_48px_rgba(48,50,41,0.24)]",
            "backdrop-blur-md",
          )}
        >
          <RequestOrderButton
            context={orderContext}
            className="w-full touch-manipulation"
          >
            Request Order
          </RequestOrderButton>
        </div>
      </div>
    </div>
  );
}

function Detail({
  title,
  items,
  wide = false,
}: {
  title: string;
  items: readonly string[];
  wide?: boolean;
}) {
  const visibleItems = items
    .map((item) => item.trim())
    .filter(
      (item, index, list) =>
        Boolean(item) && list.indexOf(item) === index,
    );

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <article
      className={cn(
        "min-w-0 rounded-[20px]",
        "border border-brand-olive/10",
        "bg-brand-white/68",
        "p-5 sm:p-6",
        wide && "md:col-span-2",
      )}
    >
      <h3
        className={cn(
          "min-w-0 break-words",
          "font-display",
          "text-[1.8rem] leading-[1.05]",
          "sm:text-3xl",
        )}
      >
        {title}
      </h3>

      <ul
        className={cn(
          "mt-4 grid gap-2",
          "text-sm leading-6",
          "text-brand-olive/68",
        )}
      >
        {visibleItems.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="flex min-w-0 gap-2"
          >
            <span
              aria-hidden="true"
              className={cn(
                "mt-2 size-1.5 shrink-0",
                "rounded-full bg-brand-sage",
              )}
            />

            <span className="min-w-0 break-words">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}