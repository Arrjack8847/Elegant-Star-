const fallbackSiteUrl = "https://elegant-star.invalid";

function normalizeSiteUrl(value: string | undefined) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  try {
    const url = new URL(trimmed);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }

    url.hash = "";
    url.search = "";
    url.pathname = url.pathname.replace(/\/+$/, "");

    return url.toString().replace(/\/+$/, "");
  } catch {
    return null;
  }
}

function isProductionHost(value: string) {
  const hostname = new URL(value).hostname;

  return hostname !== "localhost" && hostname !== "127.0.0.1";
}

export function getConfiguredSiteUrl() {
  const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

  return siteUrl && isProductionHost(siteUrl) ? siteUrl : null;
}

export function hasConfiguredSiteUrl() {
  return Boolean(getConfiguredSiteUrl());
}

export function getSiteUrl() {
  return getConfiguredSiteUrl() ?? fallbackSiteUrl;
}
