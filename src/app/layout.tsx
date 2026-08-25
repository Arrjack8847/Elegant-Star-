import type { Metadata } from "next";
import "./globals.css";
import { EnquiryProvider } from "@/components/enquiry/EnquiryProvider";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { contactDetails, siteConfig } from "@/data/site";
import { getSiteUrl, hasConfiguredSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const isIndexable = hasConfiguredSiteUrl();
const seoDescription = `${siteConfig.name} is a wedding invitation and stationery service based in Yangon, Myanmar. ${siteConfig.description}`;
const preferredSiteName = siteConfig.name;
const officialBusinessName = `${siteConfig.name} - ${siteConfig.descriptor}`;
const homepageTitle = "Elegant Star Myanmar | Wedding Invitations & Stationery";

const structuredData = isIndexable
  ? {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": `${siteUrl}/#business`,
          name: officialBusinessName,
          alternateName: [
            siteConfig.name,
            "Elegant Star Myanmar",
            "Elegant Star Yangon",
            "Elegant Star Invitation",
            "Elegant Star Invitations",
          ],
          description: seoDescription,
          url: siteUrl,
          image: `${siteUrl}${siteConfig.openGraphImage}`,
          logo: `${siteUrl}/icon.png`,
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
            "Wedding service in Myanmar",
            "Wedding invitations",
            "Wedding invitation cards",
            "Marriage certificate folders",
            "Invitation suites",
            "Presentation boxes",
            "Wedding stationery",
            "Custom stationery",
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Wedding invitation and stationery services",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Wedding invitation and stationery service in Myanmar",
                  serviceType:
                    "Wedding service focused on invitation design, certificate folders and coordinated stationery",
                  areaServed: {
                    "@type": "Country",
                    name: "Myanmar",
                  },
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Custom wedding invitation cards",
                  serviceType: "Wedding invitation card design and stationery",
                  areaServed: {
                    "@type": "City",
                    name: "Yangon",
                  },
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Marriage certificate folders",
                  serviceType: "Marriage certificate folder design and presentation",
                  areaServed: {
                    "@type": "City",
                    name: "Yangon",
                  },
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Coordinated wedding stationery",
                  serviceType: "Custom wedding stationery and celebration pieces",
                  areaServed: {
                    "@type": "City",
                    name: "Yangon",
                  },
                },
              },
            ],
          },
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
          name: preferredSiteName,
          alternateName: [
            siteConfig.name,
            "Elegant Star Myanmar",
            "Elegant Star Yangon",
            "Elegant Star Invitation",
            "Elegant Star Invitations",
          ],
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
  applicationName: preferredSiteName,
  title: {
    default: homepageTitle,
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
    siteName: preferredSiteName,
    title: homepageTitle,
    description: seoDescription,
    type: "website",
    images: [
      {
        url: siteConfig.openGraphImage,
        alt: `${siteConfig.name} wedding invitation and stationery showroom in Yangon`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homepageTitle,
    description: seoDescription,
    images: [siteConfig.openGraphImage],
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
