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
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: siteConfig.name,
          alternateName: `${siteConfig.name} - ${siteConfig.descriptor}`,
          url: siteUrl,
          email: contactDetails.email.value,
          telephone: contactDetails.primaryPhone.value,
          sameAs: [
            contactDetails.instagram.href,
            contactDetails.facebook.href,
          ],
          areaServed: {
            "@type": "City",
            name: "Yangon",
          },
        },
        {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          url: siteUrl,
          name: siteConfig.name,
          description: seoDescription,
          publisher: {
            "@id": `${siteUrl}/#organization`,
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
    icon: siteConfig.logoPath,
    shortcut: siteConfig.logoPath,
    apple: siteConfig.logoPath,
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
