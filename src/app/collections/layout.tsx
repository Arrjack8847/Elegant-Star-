import type { Metadata } from "next";
import { invitationCollections } from "@/data/collections";
import { getConfiguredSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  alternates: {
    canonical: "/collections",
  },
};

export default function CollectionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const siteUrl = getConfiguredSiteUrl();

  const structuredData = siteUrl
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${siteUrl}/collections#collection-page`,
        url: `${siteUrl}/collections`,
        name: "Wedding Invitation & Stationery Collections",
        description:
          "Browse Elegant Star wedding invitations, certificate folders and coordinated stationery collections in Yangon, Myanmar.",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#business`,
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: invitationCollections.map((design, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: design.name,
            url: `${siteUrl}/designs/${design.slug}`,
          })),
        },
      }
    : null;

  return (
    <>
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
      {children}
    </>
  );
}
