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
    };
  }

  const metadataImages = [
    design.cover1,
    design.cover2,
    ...design.images,
  ].filter(
    (image, index, list): image is string =>
      Boolean(image) && list.indexOf(image) === index,
  );

  return {
    title: `${design.name} ${design.reference}`,
    description: design.shortDescription,
    openGraph: {
      title: `${design.name} ${design.reference}`,
      description: design.shortDescription,
      ...(metadataImages.length > 0
        ? {
            images: metadataImages,
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

  const related = getRelatedCollections(
    design.slug,
    design.categories,
  );

  return (
    <>
      {/* Product introduction */}
      <section
        className="section-shell design-detail-hero"
        data-nav-theme="light"
      >
        <div className="section-inner">
          {/* Back navigation */}
          <Link
            href="/collections"
            scroll
            className="
              mb-5 inline-flex min-h-11 items-center gap-2
              rounded-full text-sm font-bold text-brand-olive/60
              transition-colors duration-200
              hover:text-brand-olive
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-brand-sage
              focus-visible:ring-offset-4
              focus-visible:ring-offset-brand-ivory
              sm:mb-7
            "
          >
            <ArrowLeft
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <span>Back to Collections</span>
          </Link>

          <div
            className="
              grid gap-8
              lg:grid-cols-[1.05fr_.95fr]
              lg:items-start
              lg:gap-12
              xl:gap-16
            "
          >
            <DesignGallery design={design} />

            <RevealGroup
              className="
                min-w-0
                lg:sticky
                lg:top-[var(--nav-offset-desktop)]
              "
              start="top 84%"
            >
              <p className="small-label text-brand-sage">
                {design.reference}
              </p>

              <h1
                className="
                  display-heading mt-4
                  break-words
                  text-[clamp(2.75rem,12vw,4.5rem)]
                  leading-[0.94]
                  sm:text-6xl
                  md:text-7xl
                  lg:text-[4.75rem]
                  xl:text-[5.25rem]
                "
              >
                {design.name}
              </h1>

              <p
                className="
                  mt-4 break-words
                  text-sm font-bold leading-6
                  text-brand-olive/58
                "
              >
                {design.categories.join(" / ")}
              </p>

              <p
                className="
                  body-copy mt-5
                  text-base leading-8
                  sm:mt-6 sm:text-lg
                "
              >
                {design.fullDescription}
              </p>

              <div className="mt-7 sm:mt-8">
                <RequestOrderButton
                  context={designToOrderContext(design)}
                >
                  Request Order
                </RequestOrderButton>
              </div>

              <p
                className="
                  mt-4 max-w-xl
                  text-xs leading-5
                  text-brand-olive/46
                "
              >
                Photographs show available reference views.
                Confirm exact materials, finish availability
                and timing during enquiry.
              </p>
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Collection details */}
      <section
        className="section-shell bg-brand-white/40"
        data-nav-theme="light"
      >
        <div
          className="
            section-inner grid gap-8
            lg:grid-cols-[.8fr_1.2fr]
            lg:gap-12
          "
        >
          <RevealGroup start="top 84%">
            <p className="small-label text-brand-sage">
              Collection details
            </p>

            <h2
              className="
                display-heading mt-4
                text-[2.8rem] leading-[0.96]
                sm:text-5xl
                md:text-7xl
              "
            >
              A direction ready to personalise.
            </h2>
          </RevealGroup>

          <RevealGroup
            className="grid gap-5 md:grid-cols-2"
            stagger={0.06}
            start="top 82%"
          >
            <Detail
              title="Format & composition"
              items={[
                "Photographed views in the gallery",
                "Format confirmed during consultation",
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

      <RelatedDesigns designs={related} />

      {/* Mobile enquiry button */}
      <div
        className="
          mobile-safe-bottom fixed
          bottom-0 left-3 right-3
          z-40 md:hidden
        "
      >
        <RequestOrderButton
          context={designToOrderContext(design)}
          className="w-full"
        >
          Request Order
        </RequestOrderButton>
      </div>
    </>
  );
}

function Detail({
  title,
  items,
  wide = false,
}: {
  title: string;
  items: string[];
  wide?: boolean;
}) {
  return (
    <article
      className={`
        rounded-[20px]
        border border-brand-olive/10
        bg-brand-white/68
        p-5 sm:p-6
        ${wide ? "md:col-span-2" : ""}
      `}
    >
      <h3
        className="
          break-words
          font-display
          text-[1.8rem]
          leading-[1.05]
          sm:text-3xl
        "
      >
        {title}
      </h3>

      <ul
        className="
          mt-4 grid gap-2
          text-sm leading-6
          text-brand-olive/68
        "
      >
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2"
          >
            <span
              className="
                mt-2 size-1.5 shrink-0
                rounded-full bg-brand-sage
              "
              aria-hidden="true"
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
