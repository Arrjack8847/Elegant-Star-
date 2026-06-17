import type { Metadata } from "next";
import "./globals.css";
import { EnquiryProvider } from "@/components/enquiry/EnquiryProvider";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import { getSiteUrl, hasConfiguredSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const isIndexable = hasConfiguredSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | Invitations & Creation`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: isIndexable
    ? {
        canonical: "/",
      }
    : undefined,
  robots: isIndexable
    ? undefined
    : {
        index: false,
        follow: false,
      },
  openGraph: {
    title: `${siteConfig.name} | Invitations & Creation`,
    description: siteConfig.description,
    type: "website",
    url: isIndexable ? siteUrl : undefined,
    images: [
      {
        url: siteConfig.openGraphImage,
        alt: `${siteConfig.name} brand mark`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Invitations & Creation`,
    description: siteConfig.description,
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
        <EnquiryProvider>
          <FloatingNavbar />
          <main id="main-content">{children}</main>
          <Footer />
        </EnquiryProvider>
      </body>
    </html>
  );
}
