import { getCollectionBySlug } from "@/data/collections";
import { getConfiguredSiteUrl } from "@/lib/site-url";

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

  const breadcrumbData =
    design && siteUrl
      ? {
          "@context": "https://schema.org",
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
        }
      : null;

  return (
    <>
      {breadcrumbData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
      {children}
    </>
  );
}
