import { siteMedia } from "@/data/siteMedia";
export type RealStory = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  coverImage: string;
  productImage: string;
  interactionImage: string;
  celebrationImage: string;
  gallery: string[];
};

export const realStories: RealStory[] = [
  {
    slug: "a-blush-garden-celebration",
    title: "A Blush Garden Celebration",
    eyebrow: "Blush and ivory",
    description:
      "A romantic garden story moving from personalised stationery to a flower-filled outdoor ceremony.",
    coverImage: siteMedia.stories.aBlushGardenCelebration.coverDesktop,
    productImage: siteMedia.stories.aBlushGardenCelebration.productPrimary,
    interactionImage:
      siteMedia.stories.aBlushGardenCelebration.interactionSigning,
    celebrationImage: siteMedia.stories.aBlushGardenCelebration.ceremonyMoment,
    gallery: [
      siteMedia.stories.aBlushGardenCelebration.coverDesktop,
      siteMedia.stories.aBlushGardenCelebration.interactionSigning,
      siteMedia.stories.aBlushGardenCelebration.ceremonyMoment,
      siteMedia.stories.aBlushGardenCelebration.supportingCeremony,
      siteMedia.stories.aBlushGardenCelebration.supportingFamily,
      siteMedia.stories.aBlushGardenCelebration.productPrimary,
    ],
  },
  {
    slug: "modern-garden-vows",
    title: "Modern Garden Vows",
    eyebrow: "Modern black and white",
    description:
      "A contemporary garden celebration with clean certificate folders, formal tailoring and soft white florals.",
    coverImage: siteMedia.stories.modernGardenVows.coverDesktop,
    productImage: siteMedia.stories.modernGardenVows.productPrimary,
    interactionImage: siteMedia.stories.modernGardenVows.interactionSigning,
    celebrationImage: siteMedia.stories.modernGardenVows.ceremonyAtmosphere,
    gallery: [
      siteMedia.stories.modernGardenVows.detailSaveTheDate,
      siteMedia.stories.modernGardenVows.coverDesktop,
      siteMedia.stories.modernGardenVows.productPrimary,
      siteMedia.stories.modernGardenVows.productSecondary,
      siteMedia.stories.modernGardenVows.interactionSigning,
      siteMedia.stories.modernGardenVows.ceremonyAtmosphere,
    ],
  },
  {
    slug: "golden-traditions",
    title: "Golden Traditions",
    eyebrow: "Traditional gold",
    description:
      "A heritage-led celebration where ivory and gold stationery complements traditional attire.",
    coverImage: siteMedia.stories.goldenTraditions.coverMobile,
    productImage: siteMedia.stories.goldenTraditions.productCloseUp,
    interactionImage: siteMedia.stories.goldenTraditions.customerWalking,
    celebrationImage: siteMedia.stories.goldenTraditions.coverMobile,
    gallery: [
      siteMedia.stories.goldenTraditions.coverMobile,
      siteMedia.stories.goldenTraditions.productCloseUp,
      siteMedia.stories.goldenTraditions.productCloseUpAlt,
      siteMedia.stories.goldenTraditions.customerWalking,
      siteMedia.stories.goldenTraditions.customerPortrait,
    ],
  },
  {
    slug: "an-ivory-ballroom-story",
    title: "An Ivory Ballroom Story",
    eyebrow: "Ivory ballroom",
    description:
      "A warm indoor celebration shaped by draped architecture, floral details and an ivory stationery suite.",
    coverImage: siteMedia.stories.anIvoryBallroomStory.coverDesktop,
    productImage: siteMedia.stories.anIvoryBallroomStory.productPrimary,
    interactionImage: siteMedia.stories.anIvoryBallroomStory.productPrimary,
    celebrationImage: siteMedia.stories.anIvoryBallroomStory.venueVertical,
    gallery: [
      siteMedia.stories.anIvoryBallroomStory.coverDesktop,
      siteMedia.stories.anIvoryBallroomStory.coverMobile,
      siteMedia.stories.anIvoryBallroomStory.venueVertical,
      siteMedia.stories.anIvoryBallroomStory.floralPortrait,
      siteMedia.stories.anIvoryBallroomStory.productPrimary,
    ],
  },
  {
    slug: "vows-by-the-sea",
    title: "Vows by the Sea",
    eyebrow: "Coastal blue",
    description:
      "A seaside signing ceremony with soft blue stationery and a relaxed destination atmosphere.",
    coverImage: siteMedia.stories.vowsByTheSea.coverMobile,
    productImage: siteMedia.stories.vowsByTheSea.coverMobile,
    interactionImage: siteMedia.stories.vowsByTheSea.interactionReading,
    celebrationImage: siteMedia.stories.vowsByTheSea.ceremonyClosing,
    gallery: [
      siteMedia.stories.vowsByTheSea.ceremonyClosing,
      siteMedia.stories.vowsByTheSea.mockupFolderPreview,
      siteMedia.stories.vowsByTheSea.coverMobile,
      siteMedia.stories.vowsByTheSea.interactionReading,
    ],
  },
];

export const featuredStory = realStories[0];
export function getStoryBySlug(slug: string) {
  return realStories.find((story) => story.slug === slug);
}
