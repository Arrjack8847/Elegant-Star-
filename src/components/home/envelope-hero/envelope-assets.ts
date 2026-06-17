import { siteMedia } from "@/data/siteMedia";

export const heroAsset = {
  back: siteMedia.homepage.envelopeHero.back,
  card: siteMedia.homepage.envelopeHero.card,
  front: siteMedia.homepage.envelopeHero.front,
  sprig: siteMedia.homepage.envelopeHero.sprig,
  ribbon: siteMedia.homepage.envelopeHero.ribbon,
  support: siteMedia.homepage.envelopeHero.support,
} as const;

export const assetSize = 1254;

export const sceneSizes = [
  "(min-width: 1280px) 48rem",
  "(min-width: 1024px) 56vw",
  "(min-width: 640px) 42rem",
  "100vw",
].join(", ");
