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
              "@type": "Product",
              "@id": `${siteUrl}/designs/${design.slug}#product`,
              name: design.name,
              description: design.fullDescription,
              sku: design.reference,
              category: design.categories.join(", "),
              url: `${siteUrl}/designs/${design.slug}`,
              mainEntityOfPage: `${siteUrl}/designs/${design.slug}`,
              brand: {
                "@type": "Brand",
                name: "Elegant Star",
              },
              image: [
                design.cover1,
                design.cover2,
                design.coverImage,
                ...design.images,
              ]
                .filter(
                  (image, index, list): image is string =>
                    Boolean(image) && list.indexOf(image) === index,
                )
                .slice(0, 8)
                .map((image) => absoluteUrl(siteUrl, image)),
              additionalProperty: [
                {
                  "@type": "PropertyValue",
                  name: "Materials",
                  value: design.materials.join(", "),
                },
                {
                  "@type": "PropertyValue",
                  name: "Finishes",
                  value: design.finishes.join(", "),
                },
                {
                  "@type": "PropertyValue",
                  name: "Personalisation",
                  value: design.personalization.join(", "),
                },
              ],
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
