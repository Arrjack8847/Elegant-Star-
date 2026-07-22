import { siteMedia } from "@/data/siteMedia";

export type StoryImageFocus = {
  mobile?: string;
  tablet?: string;
  desktop?: string;
};

export type StoryGalleryLayout = "wide" | "portrait" | "square";
export type StoryGalleryFit = "cover" | "contain";

export type StoryGalleryItem = {
  src: string;
  layout?: StoryGalleryLayout;
  objectPosition?: string;
  fit?: StoryGalleryFit;
};

export type RealStory = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  coverImage: string;
  heroFocus?: StoryImageFocus;
  cardFocus?: string;
  productImage: string;
  interactionImage: string;
  celebrationImage: string;
  gallery: StoryGalleryItem[];
};

function galleryImage(
  src: string,
  layout: StoryGalleryLayout = "portrait",
  objectPosition = "50% 50%",
  fit: StoryGalleryFit = "cover",
): StoryGalleryItem {
  return {
    src,
    layout,
    objectPosition,
    fit,
  };
}

export const realStories: RealStory[] = [
  {
    slug: "a-blush-garden-celebration",
    title: "A Blush Garden Celebration",
    eyebrow: "Blush and ivory",
    description:
      "A romantic garden story moving from personalised stationery to a flower-filled outdoor ceremony.",
    coverImage: siteMedia.stories.aBlushGardenCelebration.coverDesktop,
    heroFocus: {
      mobile: "50% 52%",
      tablet: "50% 52%",
      desktop: "50% 54%",
    },
    cardFocus: "50% 54%",
    productImage: siteMedia.stories.aBlushGardenCelebration.productPrimary,
    interactionImage:
      siteMedia.stories.aBlushGardenCelebration.interactionSigning,
    celebrationImage: siteMedia.stories.aBlushGardenCelebration.ceremonyMoment,
    gallery: [
      galleryImage(
        siteMedia.stories.aBlushGardenCelebration.interactionSigning,
        "wide",
        "50% 52%",
      ),
      galleryImage(
        siteMedia.stories.aBlushGardenCelebration.ceremonyMoment,
        "portrait",
        "50% 54%",
      ),
      galleryImage(
        siteMedia.stories.aBlushGardenCelebration.supportingCeremony,
        "portrait",
        "50% 54%",
      ),
      galleryImage(
        siteMedia.stories.aBlushGardenCelebration.productPrimary,
        "square",
        "50% 50%",
        "contain",
      ),
      galleryImage(
        siteMedia.stories.aBlushGardenCelebration.supportingFamily,
        "wide",
        "50% 54%",
      ),
    ],
  },
  {
    slug: "modern-garden-vows",
    title: "Modern Garden Vows",
    eyebrow: "Modern black and white",
    description:
      "A contemporary garden celebration with clean certificate folders, formal tailoring and soft white florals.",
    coverImage: siteMedia.stories.modernGardenVows.coverDesktop,
    heroFocus: {
      mobile: "52% 54%",
      tablet: "52% 54%",
      desktop: "52% 54%",
    },
    cardFocus: "52% 54%",
    productImage: siteMedia.stories.modernGardenVows.productPrimary,
    interactionImage: siteMedia.stories.modernGardenVows.interactionSigning,
    celebrationImage: siteMedia.stories.modernGardenVows.ceremonyAtmosphere,
    gallery: [
      galleryImage(
        siteMedia.stories.modernGardenVows.detailSaveTheDate,
        "portrait",
        "50% 50%",
        "contain",
      ),
      galleryImage(
        siteMedia.stories.modernGardenVows.coverDesktop,
        "portrait",
        "52% 54%",
      ),
      galleryImage(
        siteMedia.stories.modernGardenVows.productPrimary,
        "wide",
        "50% 50%",
        "contain",
      ),
      galleryImage(
        siteMedia.stories.modernGardenVows.interactionSigning,
        "portrait",
        "50% 50%",
      ),
      galleryImage(
        siteMedia.stories.modernGardenVows.ceremonyAtmosphere,
        "wide",
        "50% 54%",
      ),
    ],
  },
  {
    slug: "golden-traditions",
    title: "Golden Traditions",
    eyebrow: "Traditional gold",
    description:
      "A heritage-led celebration where ivory and gold stationery complements traditional attire.",
    coverImage: siteMedia.stories.goldenTraditions.coverMobile,
    heroFocus: {
      mobile: "50% 64%",
      tablet: "50% 62%",
      desktop: "50% 60%",
    },
    cardFocus: "50% 60%",
    productImage: siteMedia.stories.goldenTraditions.productCloseUp,
    interactionImage: siteMedia.stories.goldenTraditions.customerWalking,
    celebrationImage: siteMedia.stories.goldenTraditions.coverMobile,
    gallery: [
      galleryImage(
        siteMedia.stories.goldenTraditions.customerWalking,
        "portrait",
        "50% 36%",
      ),
      galleryImage(
        siteMedia.stories.goldenTraditions.customerPortrait,
        "portrait",
        "50% 42%",
      ),
      galleryImage(
        siteMedia.stories.goldenTraditions.productCloseUp,
        "square",
        "50% 50%",
        "contain",
      ),
      galleryImage(
        siteMedia.stories.goldenTraditions.coverMobile,
        "wide",
        "50% 58%",
      ),
    ],
  },
  {
    slug: "an-ivory-ballroom-story",
    title: "An Ivory Ballroom Story",
    eyebrow: "Ivory ballroom",
    description:
      "A warm indoor celebration shaped by draped architecture, floral details and an ivory stationery suite.",
    coverImage: siteMedia.stories.anIvoryBallroomStory.coverDesktop,
    heroFocus: {
      mobile: "50% 66%",
      tablet: "50% 64%",
      desktop: "50% 62%",
    },
    cardFocus: "50% 62%",
    productImage: siteMedia.stories.anIvoryBallroomStory.productPrimary,
    interactionImage: siteMedia.stories.anIvoryBallroomStory.productPrimary,
    celebrationImage: siteMedia.stories.anIvoryBallroomStory.venueVertical,
    gallery: [
      galleryImage(
        siteMedia.stories.anIvoryBallroomStory.coverMobile,
        "portrait",
        "50% 58%",
      ),
      galleryImage(
        siteMedia.stories.anIvoryBallroomStory.venueVertical,
        "portrait",
        "50% 48%",
      ),
      galleryImage(
        siteMedia.stories.anIvoryBallroomStory.productPrimary,
        "wide",
        "50% 50%",
        "contain",
      ),
      galleryImage(
        siteMedia.stories.anIvoryBallroomStory.floralPortrait,
        "portrait",
        "50% 44%",
      ),
      galleryImage(
        siteMedia.stories.anIvoryBallroomStory.coverDesktop,
        "wide",
        "50% 62%",
      ),
    ],
  },
  {
    slug: "vows-by-the-sea",
    title: "Vows by the Sea",
    eyebrow: "Coastal blue",
    description:
      "A seaside signing ceremony with soft blue stationery and a relaxed destination atmosphere.",
    coverImage: siteMedia.stories.vowsByTheSea.coverMobile,
    heroFocus: {
      mobile: "58% 52%",
      tablet: "58% 52%",
      desktop: "58% 52%",
    },
    cardFocus: "58% 52%",
    productImage: siteMedia.stories.vowsByTheSea.mockupFolderPreview,
    interactionImage: siteMedia.stories.vowsByTheSea.interactionReading,
    celebrationImage: siteMedia.stories.vowsByTheSea.ceremonyClosing,
    gallery: [
      galleryImage(
        siteMedia.stories.vowsByTheSea.ceremonyClosing,
        "portrait",
        "50% 44%",
      ),
      galleryImage(
        siteMedia.stories.vowsByTheSea.mockupFolderPreview,
        "square",
        "50% 50%",
        "contain",
      ),
      galleryImage(
        siteMedia.stories.vowsByTheSea.coverMobile,
        "wide",
        "58% 52%",
      ),
      galleryImage(
        siteMedia.stories.vowsByTheSea.interactionReading,
        "portrait",
        "50% 44%",
      ),
    ],
  },
];

export const featuredStory = realStories[0];

export function getStoryBySlug(slug: string) {
  return realStories.find((story) => story.slug === slug);
}
