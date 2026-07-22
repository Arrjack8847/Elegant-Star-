// Central source of truth for local public media used by the site.
// Replace or add asset paths here instead of hardcoding /media, /hero, /brand, or /placeholders elsewhere.

const brand = {
  logos: {
    olive: "/media/brand/brand/elegant-star-mark-olive.png",
    white: "/media/brand/brand/elegant-star-mark-white.png",
  },
  mainLogo: "/media/brand/brand/elegant-star-mark-olive.png",
  openGraphImage: "/media/brand/brand/elegant-star-mark-olive.png",
  showroom: {
    showroom03: "/media/brand/showroom/elegant-star__showroom-03.jpg",
    showroom04: "/media/brand/showroom/elegant-star__showroom-04.jpg",
    showroom07: "/media/brand/showroom/elegant-star__showroom-07.jpg",
    showroom10: "/media/brand/showroom/elegant-star__showroom-10.jpg",
    showroom11: "/media/brand/showroom/elegant-star__showroom-11.jpg",
    showroom12: "/media/brand/showroom/elegant-star__showroom-12.jpg",
    showroom13: "/media/brand/showroom/elegant-star__showroom-13.jpg",
    showroom15: "/media/brand/showroom/elegant-star__showroom-15.jpg",
    showroom16: "/media/brand/showroom/elegant-star__showroom-16.jpg",
    cover: "/media/brand/showroom/elegant-star__showroom-cover.jpg",
    studioVideo: "/brand/showroom/vd.mp4",
  },
} as const;

const placeholders = {
  botanical: {
    lineArc: "/placeholders/botanical/line-arc.svg",
  },
} as const;

const homepage = {
  envelopeHero: {
    back: "/hero/back.webp",
    card: "/hero/card.webp",
    front: "/hero/front.webp",
    sprig: "/hero/hero-botanical-sprig.webp",
    ribbon: "/hero/hero-signature-ribbon.webp",
    support: "/hero/support-card.webp",
  },
  brandIntroduction: {
    showroomContext: "/media/brand/showroom/elegant-star__showroom-cover.jpg",
    signatureStationery: "/media/brand/showroom/elegant-star__showroom-13.jpg",
  },
  craftsmanship: {
    paperAndTexture:
      "/media/craftsmanship/01-paper-and-texture/01-paper-and-texture__cover.jpg",
    foilEmbossingAndMonograms:
      "/media/craftsmanship/02-foil-embossing-and-monograms/02-foil-embossing-and-monograms__cover.jpg",
    sealsRibbonsFansAndAccessories:
      "/media/craftsmanship/03-seals-ribbons-fans-and-accessories/03-seals-ribbons-fans-and-accessories__cover.jpg",
    packagingGiftsAndFavours:
      "/media/craftsmanship/04-packaging-gifts-and-favours/04-packaging-gifts-and-favours__cover.jpg",
    customisationAndCoordinatedPieces:
      "/media/craftsmanship/05-customisation-and-coordinated-pieces/05-customisation-and-coordinated-pieces__cover.jpg",
  },
  orderingProcess: {
    shareYourVision:
      "/media/craftsmanship/01-paper-and-texture/01-paper-and-texture__detail-03.jpg",
    chooseADirection:
      "/media/craftsmanship/01-paper-and-texture/01-paper-and-texture__detail-06.jpg",
    personaliseTheDetails:
      "/media/brand/showroom/elegant-star__showroom-15.jpg",
    reviewAndConfirm:
      "/media/craftsmanship/02-foil-embossing-and-monograms/02-foil-embossing-and-monograms__cover.jpg",
    productionAndPresentation:
      "/media/craftsmanship/04-packaging-gifts-and-favours/04-packaging-gifts-and-favours__cover.jpg",
  },
} as const;

const stories = {
  aBlushGardenCelebration: {
    ceremonyMoment:
      "/media/stories/01-a-blush-garden-celebration/celebration/01-a-blush-garden-celebration__ceremony-moment.jpg",
    coverDesktop:
      "/media/stories/01-a-blush-garden-celebration/cover/01-a-blush-garden-celebration__cover-desktop.jpg",
    interactionSigning:
      "/media/stories/01-a-blush-garden-celebration/interaction/01-a-blush-garden-celebration__interaction-signing.jpg",
    productPrimary:
      "/media/stories/01-a-blush-garden-celebration/product/01-a-blush-garden-celebration__product-primary.jpg",
    supportingCeremony:
      "/media/stories/01-a-blush-garden-celebration/supporting/01-a-blush-garden-celebration__supporting-ceremony.jpg",
    supportingFamily:
      "/media/stories/01-a-blush-garden-celebration/supporting/01-a-blush-garden-celebration__supporting-family.jpg",
  },
  anIvoryBallroomStory: {
    floralPortrait:
      "/media/stories/04-an-ivory-ballroom-story/celebration/04-an-ivory-ballroom-story__floral-portrait.jpg",
    venueVertical:
      "/media/stories/04-an-ivory-ballroom-story/celebration/04-an-ivory-ballroom-story__venue-vertical.jpg",
    coverDesktop:
      "/media/stories/04-an-ivory-ballroom-story/cover/04-an-ivory-ballroom-story__cover-desktop.jpg",
    coverMobile:
      "/media/stories/04-an-ivory-ballroom-story/cover/04-an-ivory-ballroom-story__cover-mobile.jpg",
    productPrimary:
      "/media/stories/04-an-ivory-ballroom-story/product/04-an-ivory-ballroom-story__product-primary.jpg",
  },
  goldenTraditions: {
    coverMobile:
      "/media/stories/03-golden-traditions/cover/03-golden-traditions__cover-mobile.jpg",
    customerPortrait:
      "/media/stories/03-golden-traditions/interaction/03-golden-traditions__customer-portrait.jpg",
    customerWalking:
      "/media/stories/03-golden-traditions/interaction/03-golden-traditions__customer-walking.jpg",
    productCloseUp:
      "/media/stories/03-golden-traditions/product/03-golden-traditions__product-close-up.jpg",
  },
  modernGardenVows: {
    ceremonyAtmosphere:
      "/media/stories/02-modern-garden-vows/celebration/02-modern-garden-vows__ceremony-atmosphere.jpg",
    coverDesktop:
      "/media/stories/02-modern-garden-vows/cover/02-modern-garden-vows__cover-desktop.jpg",
    interactionSigning:
      "/media/stories/02-modern-garden-vows/interaction/02-modern-garden-vows__interaction-signing.jpg",
    productPrimary:
      "/media/stories/02-modern-garden-vows/product/02-modern-garden-vows__product-secondary.jpg",
    detailSaveTheDate:
      "/media/stories/02-modern-garden-vows/supporting/02-modern-garden-vows__detail-save-the-date.jpg",
  },
  vowsByTheSea: {
    ceremonyClosing:
      "/media/stories/05-vows-by-the-sea/celebration/05-vows-by-the-sea__ceremony-closing.jpg",
    coverMobile:
      "/media/stories/05-vows-by-the-sea/cover/05-vows-by-the-sea__cover-mobile.jpg",
    interactionReading:
      "/media/stories/05-vows-by-the-sea/interaction/05-vows-by-the-sea__interaction-reading.jpg",
    mockupFolderPreview:
      "/media/stories/05-vows-by-the-sea/mockups/05-vows-by-the-sea__mockup-folder-preview.jpg",
  },
} as const;

const craftsmanshipPaperAndTexture = {
  detail01:
    "/media/craftsmanship/01-paper-and-texture/01-paper-and-texture__detail-01.jpg",
  detail02:
    "/media/craftsmanship/01-paper-and-texture/01-paper-and-texture__detail-02.jpg",
  detail03:
    "/media/craftsmanship/01-paper-and-texture/01-paper-and-texture__detail-03.jpg",
  detail04:
    "/media/craftsmanship/01-paper-and-texture/01-paper-and-texture__detail-04.jpg",
  detail05:
    "/media/craftsmanship/01-paper-and-texture/01-paper-and-texture__detail-05.jpg",
  detail06:
    "/media/craftsmanship/01-paper-and-texture/01-paper-and-texture__detail-06.jpg",
} as const;
const craftsmanshipFoilEmbossingAndMonograms = {
  detail01:
    "/media/craftsmanship/02-foil-embossing-and-monograms/02-foil-embossing-and-monograms__detail-01.jpg",
  detail02:
    "/media/craftsmanship/02-foil-embossing-and-monograms/02-foil-embossing-and-monograms__detail-02.jpg",
  detail03:
    "/media/craftsmanship/02-foil-embossing-and-monograms/02-foil-embossing-and-monograms__detail-03.jpg",
  detail04:
    "/media/craftsmanship/02-foil-embossing-and-monograms/02-foil-embossing-and-monograms__detail-04.jpg",
  detail05:
    "/media/craftsmanship/02-foil-embossing-and-monograms/02-foil-embossing-and-monograms__detail-05.jpg",
  detail06:
    "/media/craftsmanship/02-foil-embossing-and-monograms/02-foil-embossing-and-monograms__detail-06.jpg",
} as const;
const craftsmanshipSealsRibbonsFansAndAccessories = {
  detail01:
    "/media/craftsmanship/03-seals-ribbons-fans-and-accessories/03-seals-ribbons-fans-and-accessories__detail-01.jpg",
  detail02:
    "/media/craftsmanship/03-seals-ribbons-fans-and-accessories/03-seals-ribbons-fans-and-accessories__detail-02.jpg",
  detail03:
    "/media/craftsmanship/03-seals-ribbons-fans-and-accessories/03-seals-ribbons-fans-and-accessories__detail-03.jpg",
  detail04:
    "/media/craftsmanship/03-seals-ribbons-fans-and-accessories/03-seals-ribbons-fans-and-accessories__detail-04.jpg",
  detail05:
    "/media/craftsmanship/03-seals-ribbons-fans-and-accessories/03-seals-ribbons-fans-and-accessories__detail-05.jpg",
  detail06:
    "/media/craftsmanship/03-seals-ribbons-fans-and-accessories/03-seals-ribbons-fans-and-accessories__detail-06.jpg",
} as const;
const craftsmanshipPackagingGiftsAndFavours = {
  detail01:
    "/media/craftsmanship/04-packaging-gifts-and-favours/04-packaging-gifts-and-favours__detail-01.jpg",
  detail02:
    "/media/craftsmanship/04-packaging-gifts-and-favours/04-packaging-gifts-and-favours__detail-02.jpg",
  detail03:
    "/media/craftsmanship/04-packaging-gifts-and-favours/04-packaging-gifts-and-favours__detail-03.jpg",
  detail04:
    "/media/craftsmanship/04-packaging-gifts-and-favours/04-packaging-gifts-and-favours__detail-04.jpg",
  detail05:
    "/media/craftsmanship/04-packaging-gifts-and-favours/04-packaging-gifts-and-favours__detail-05.jpg",
  detail06:
    "/media/craftsmanship/04-packaging-gifts-and-favours/04-packaging-gifts-and-favours__detail-06.jpg",
} as const;
const craftsmanshipCustomisationAndCoordinatedPieces = {
  detail01:
    "/media/craftsmanship/05-customisation-and-coordinated-pieces/05-customisation-and-coordinated-pieces__detail-01.jpg",
  detail02:
    "/media/craftsmanship/05-customisation-and-coordinated-pieces/05-customisation-and-coordinated-pieces__detail-02.jpg",
  detail03:
    "/media/craftsmanship/05-customisation-and-coordinated-pieces/05-customisation-and-coordinated-pieces__detail-03.jpg",
} as const;

const craftsmanship = {
  paperAndTexture: {
    ...craftsmanshipPaperAndTexture,
    details: [
      craftsmanshipPaperAndTexture.detail01,
      craftsmanshipPaperAndTexture.detail02,
      craftsmanshipPaperAndTexture.detail03,
      craftsmanshipPaperAndTexture.detail04,
      craftsmanshipPaperAndTexture.detail05,
      craftsmanshipPaperAndTexture.detail06,
    ],
  },
  foilEmbossingAndMonograms: {
    ...craftsmanshipFoilEmbossingAndMonograms,
    details: [
      craftsmanshipFoilEmbossingAndMonograms.detail01,
      craftsmanshipFoilEmbossingAndMonograms.detail02,
      craftsmanshipFoilEmbossingAndMonograms.detail03,
      craftsmanshipFoilEmbossingAndMonograms.detail04,
      craftsmanshipFoilEmbossingAndMonograms.detail05,
      craftsmanshipFoilEmbossingAndMonograms.detail06,
    ],
  },
  sealsRibbonsFansAndAccessories: {
    ...craftsmanshipSealsRibbonsFansAndAccessories,
    details: [
      craftsmanshipSealsRibbonsFansAndAccessories.detail01,
      craftsmanshipSealsRibbonsFansAndAccessories.detail02,
      craftsmanshipSealsRibbonsFansAndAccessories.detail03,
      craftsmanshipSealsRibbonsFansAndAccessories.detail04,
      craftsmanshipSealsRibbonsFansAndAccessories.detail05,
      craftsmanshipSealsRibbonsFansAndAccessories.detail06,
    ],
  },
  packagingGiftsAndFavours: {
    ...craftsmanshipPackagingGiftsAndFavours,
    details: [
      craftsmanshipPackagingGiftsAndFavours.detail01,
      craftsmanshipPackagingGiftsAndFavours.detail02,
      craftsmanshipPackagingGiftsAndFavours.detail03,
      craftsmanshipPackagingGiftsAndFavours.detail04,
      craftsmanshipPackagingGiftsAndFavours.detail05,
      craftsmanshipPackagingGiftsAndFavours.detail06,
    ],
  },
  customisationAndCoordinatedPieces: {
    ...craftsmanshipCustomisationAndCoordinatedPieces,
    details: [
      craftsmanshipCustomisationAndCoordinatedPieces.detail01,
      craftsmanshipCustomisationAndCoordinatedPieces.detail02,
      craftsmanshipCustomisationAndCoordinatedPieces.detail03,
    ],
  },
} as const;

export const siteMedia = {
  brand,
  placeholders,
  homepage,
  stories,
  craftsmanship,
} as const;

export type SiteMedia = typeof siteMedia;
