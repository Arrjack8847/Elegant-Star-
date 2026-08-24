import type { Metadata } from "next";
import { getStoryBySlug } from "@/data/stories";
import { getConfiguredSiteUrl } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    alternates: {
      canonical: `/stories/${slug}`,
    },
  };
}

export default async function StoryLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  const siteUrl = getConfiguredSiteUrl();

  const breadcrumbData =
    story && siteUrl
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
              name: "Stories",
              item: `${siteUrl}/stories`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: story.title,
              item: `${siteUrl}/stories/${story.slug}`,
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
