import type { Metadata } from "next";
import { contactDetails, siteConfig } from "@/data/site";
import { getConfiguredSiteUrl } from "@/lib/site-url";

const description =
  "Contact Elegant Star in Yangon for wedding invitations, marriage certificate folders, coordinated stationery and showroom enquiries.";

export const metadata: Metadata = {
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Elegant Star in Yangon",
    description,
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Elegant Star in Yangon",
    description,
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const siteUrl = getConfiguredSiteUrl();

  const structuredData = siteUrl
    ? {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${siteUrl}/contact#contact-page`,
        url: `${siteUrl}/contact`,
        name: `Contact ${siteConfig.name}`,
        description,
        mainEntity: {
          "@id": `${siteUrl}/#business`,
        },
        about: {
          "@id": `${siteUrl}/#business`,
        },
        potentialAction: {
          "@type": "CommunicateAction",
          target: contactDetails.email.href,
          recipient: {
            "@id": `${siteUrl}/#business`,
          },
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
