export type ChatChannel = "messenger" | "viber";

export function buildViberShareUrl(message: string) {
  return `viber://forward?text=${encodeURIComponent(message)}`;
}

export function openViberShareUrl(viberUrl: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.location.href = viberUrl;
}
