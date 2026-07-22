import { contactDetails } from "@/data/site";

function normalizeOrigin(value: string | undefined) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return "";
  }

  try {
    const url = new URL(trimmed);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return "";
    }

    url.hash = "";
    url.search = "";
    url.pathname = url.pathname.replace(/\/+$/, "");

    return url.toString().replace(/\/+$/, "");
  } catch {
    return "";
  }
}

function normalizePagePath(pagePath: string) {
  const trimmed = pagePath.trim();

  if (!trimmed) {
    return "/";
  }

  return `/${trimmed.replace(/^\/+/, "")}`;
}

export function buildProductUrl(pagePath: string) {
  const configuredOrigin = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  const localOrigin =
    typeof window !== "undefined" ? normalizeOrigin(window.location.origin) : "";
  const fallbackOrigin = normalizeOrigin(contactDetails.productionSiteUrl);
  const origin = configuredOrigin || localOrigin || fallbackOrigin;

  return `${origin}${normalizePagePath(pagePath)}`;
}
