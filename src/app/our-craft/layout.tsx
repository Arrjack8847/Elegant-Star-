import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { getConfiguredSiteUrl } from "@/lib/site-url";

const description =
  "Explore Elegant Star's wedding invitation craftsmanship in Yangon, including paper, foil, monograms, ribbons, packaging and coordinated stationery details.";

export const metadata: Metadata = {
  alternates: {
    canonical: "/our-craft",
  },
  openGraph: {
    title: "Wedding Invitation Craftsmanship in Yangon",
    description,
    url: "/our-craft",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Invitation Craftsmanship in Yangon",
    description,
  },
};

export default function OurCraftLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const siteUrl = getConfiguredSiteUrl();

  const structuredData = siteUrl
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${siteUrl}/our-craft#webpage`,
        url: `${siteUrl}/our-craft`,
        name: `Wedding Invitation Craftsmanship | ${siteConfig.name}`,
        description,
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#business`,
        },
        keywords: [
          "wedding invitation craftsmanship",
          "wedding stationery Yangon",
          "foil invitation printing",
          "custom invitation stationery",
          "marriage certificate folders",
        ],
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
