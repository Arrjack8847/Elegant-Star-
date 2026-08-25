import type { Metadata } from "next";
import { invitationCollections } from "@/data/collections";
import { getConfiguredSiteUrl } from "@/lib/site-url";

const collectionSearchImage =
  "/media/collections/special-one/kinnari-kinnara-brown-velvet-marriage-certificate/cover 1.jpg";
const collectionDescription =
  "Browse Elegant Star wedding invitations, certificate folders and coordinated stationery collections in Yangon, Myanmar.";
const collectionTitle = "Wedding Invitation Collections | Elegant Star";

export const metadata: Metadata = {
  title: { absolute: collectionTitle },
  alternates: {
    canonical: "/collections",
  },
  openGraph: {
    title: collectionTitle,
    description: collectionDescription,
    url: "/collections",
    type: "website",
    images: [
      {
        url: collectionSearchImage,
        width: 1366,
        height: 2048,
        alt: "Elegant Star Kinnari and Kinnara brown velvet marriage certificate folders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: collectionTitle,
    description: collectionDescription,
    images: [collectionSearchImage],
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
        description: collectionDescription,
        image: `${siteUrl}${collectionSearchImage}`,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteUrl}${collectionSearchImage}`,
          width: 1366,
          height: 2048,
        },
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
