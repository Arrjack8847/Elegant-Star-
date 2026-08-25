import { getCollectionBySlug } from "@/data/collections";
import { getConfiguredSiteUrl } from "@/lib/site-url";

function absoluteUrl(siteUrl: string, value: string) {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${siteUrl}${value.startsWith("/") ? value : `/${value}`}`;
}

export default async function DesignLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const design = getCollectionBySlug(slug);
  const siteUrl = getConfiguredSiteUrl();

  const primaryImage =
    design && siteUrl
      ? [design.cover1, design.cover2, design.coverImage, ...design.images].find(
          Boolean,
        )
      : null;

  const structuredData =
    design && siteUrl
      ? {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: `${siteUrl}/`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Collections",
                  item: `${siteUrl}/collections`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: design.name,
                  item: `${siteUrl}/designs/${design.slug}`,
                },
              ],
            },
            {
              "@type": "WebPage",
              "@id": `${siteUrl}/designs/${design.slug}#webpage`,
              url: `${siteUrl}/designs/${design.slug}`,
              name: design.name,
              description: design.fullDescription,
              isPartOf: {
                "@id": `${siteUrl}/#website`,
              },
              about: {
                "@id": `${siteUrl}/#business`,
              },
              ...(primaryImage
                ? {
                    primaryImageOfPage: {
                      "@type": "ImageObject",
                      url: absoluteUrl(siteUrl, primaryImage),
                    },
                  }
                : {}),
            },
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
