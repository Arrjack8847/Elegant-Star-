import type { Metadata } from "next";
import "./globals.css";
import { EnquiryProvider } from "@/components/enquiry/EnquiryProvider";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { contactDetails, siteConfig } from "@/data/site";
import { getSiteUrl, hasConfiguredSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const isIndexable = hasConfiguredSiteUrl();
const seoDescription = `${siteConfig.description} Based in Yangon, Myanmar.`;

const structuredData = isIndexable
  ? {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": `${siteUrl}/#business`,
          name: siteConfig.name,
          alternateName: `${siteConfig.name} - ${siteConfig.descriptor}`,
          description: seoDescription,
          url: siteUrl,
          email: contactDetails.email.value,
          telephone: contactDetails.primaryPhone.value,
          hasMap: contactDetails.mapsUrl,
          sameAs: [
            contactDetails.instagram.href,
            contactDetails.facebook.href,
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Yangon",
            addressCountry: "MM",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 16.821225,
            longitude: 96.126225,
          },
          areaServed: [
            {
              "@type": "City",
              name: "Yangon",
            },
            {
              "@type": "Country",
              name: "Myanmar",
            },
          ],
          knowsAbout: [
            "Wedding invitations",
            "Marriage certificate folders",
            "Invitation suites",
            "Presentation boxes",
            "Wedding stationery",
            "Custom stationery",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: contactDetails.primaryPhone.value,
            email: contactDetails.email.value,
            contactType: "customer service",
            areaServed: "MM",
            availableLanguage: ["English", "Burmese"],
          },
        },
        {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          url: siteUrl,
          name: siteConfig.name,
          description: seoDescription,
          publisher: {
            "@id": `${siteUrl}/#business`,
          },
          inLanguage: "en",
        },
      ],
    }
  : null;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | Wedding Invitations & Stationery Yangon`,
    template: `%s | ${siteConfig.name}`,
  },
  description: seoDescription,
  robots: isIndexable
    ? undefined
    : {
        index: false,
        follow: false,
      },
  openGraph: {
    title: `${siteConfig.name} | Wedding Invitations & Stationery Yangon`,
    description: seoDescription,
    type: "website",
    images: [
      {
        url: siteConfig.openGraphImage,
        alt: `${siteConfig.name} brand mark`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Wedding Invitations & Stationery Yangon`,
    description: seoDescription,
    images: [siteConfig.openGraphImage],
  },
  icons: {
    icon: "/brand/brand/elegant-star-mark-white.png",
    shortcut: "/brand/brand/elegant-star-mark-white.png",
    apple: "/brand/brand/elegant-star-mark-white.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {structuredData ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
            }}
          />
        ) : null}
        <EnquiryProvider>
          <FloatingNavbar />
          <main id="main-content">{children}</main>
          <Footer />
        </EnquiryProvider>
      </body>
    </html>
  );
}
