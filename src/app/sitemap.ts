import type { MetadataRoute } from "next";
import { invitationCollections } from "@/data/collections";
import { realStories } from "@/data/stories";
import { getConfiguredSiteUrl } from "@/lib/site-url";

const routes = [
  "/",
  "/collections",
  "/stories",
  "/gallery",
  "/our-craft",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getConfiguredSiteUrl();

  if (!siteUrl) {
    return [];
  }

  return [
    ...routes.map((route) => ({
      url: `${siteUrl}${route}`,
    })),
    ...invitationCollections.map((item) => ({
      url: `${siteUrl}/designs/${item.slug}`,
    })),
    ...realStories.map((story) => ({
      url: `${siteUrl}/stories/${story.slug}`,
    })),
  ];
}
