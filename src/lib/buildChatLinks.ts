import { contactDetails } from "@/data/site";

export type ChatChannel = "messenger" | "viber";

export function safeProductReferral(slug: string) {
  return (
    slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "elegant-star-design"
  );
}

export function buildMessengerUrl(slug: string) {
  const url = new URL(contactDetails.messengerUrl);
  url.searchParams.set("ref", safeProductReferral(slug));

  return url.toString();
}

export function buildViberShareUrl(message: string) {
  return `viber://forward?text=${encodeURIComponent(message)}`;
}

export function openMessengerUrl(messengerUrl: string) {
  if (typeof window === "undefined") {
    return;
  }

  const openedWindow = window.open(
    messengerUrl,
    "_blank",
    "noopener,noreferrer",
  );

  if (!openedWindow) {
    window.location.assign(messengerUrl);
  }
}

export function openViberShareUrl(viberUrl: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.location.href = viberUrl;
}
