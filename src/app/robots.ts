import type { MetadataRoute } from "next";
import { getSiteUrl, hasConfiguredSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const configured = hasConfiguredSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: configured ? "/" : undefined,
      disallow: configured ? undefined : "/",
    },
    sitemap: configured ? `${siteUrl}/sitemap.xml` : undefined,
  };
}
