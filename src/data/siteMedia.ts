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
    showroom07: "/media/brand/showroom/elegant-star__showroom-07.jpg",
    showroom11: "/media/brand/showroom/elegant-star__showroom-11.jpg",
    showroom13: "/media/brand/showroom/elegant-star__showroom-13.jpg",
    cover: "/media/brand/showroom/elegant-star__showroom-cover.jpg",
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
  featuredCollections: {
    scallopedBlushMonogramSuite:
      "/media/collections/07-scalloped-blush-monogram-suite/cover/scalloped-blush-monogram-suite__cover-desktop.jpg",
  },
  categoryExplorer: {
    weddingInvitations:
      "/media/collections/07-scalloped-blush-monogram-suite/cover/scalloped-blush-monogram-suite__cover-desktop.jpg",
    certificateFolders:
      "/media/collections/54-minimal-blue-certificate-suite/cover/minimal-blue-certificate-suite__cover-desktop.jpg",
    traditionalAndHeritage:
      "/media/collections/42-ivory-gold-bird-heritage-suite/cover/ivory-gold-bird-heritage-suite__cover-desktop.jpg",
    modernAndMinimal:
      "/media/collections/17-minimal-gold-wax-suite/cover/minimal-gold-wax-suite__cover-desktop.jpg",
    botanicalAndFloral:
      "/media/collections/61-green-venue-botanical-suite/cover/green-venue-botanical-suite__cover-desktop.jpg",
    premiumBoxedSets:
      "/media/collections/47-royal-lacquer-gold-box-set/cover/royal-lacquer-gold-box-set__cover-desktop.jpg",
    corporateAndSpecialEvents:
      "/media/collections/63-brown-grand-opening-suite/cover/brown-grand-opening-suite__cover-desktop.jpg",
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
  galleryPreview: {
    collectionIllustratedRomanceSuite:
      "/media/collections/08-illustrated-romance-suite/cover/illustrated-romance-suite__cover-desktop.jpg",
    collectionRoyalBlueGoldSuite:
      "/media/collections/55-royal-blue-gold-suite/cover/royal-blue-gold-suite__cover-desktop.jpg",
    collectionBlackGoldBirdHeritageSuite:
      "/media/collections/36-black-gold-bird-heritage-suite/cover/black-gold-bird-heritage-suite__cover-desktop.jpg",
    collectionGreenVenueBotanicalSuite:
      "/media/collections/61-green-venue-botanical-suite/cover/green-venue-botanical-suite__cover-desktop.jpg",
    storyABlushGardenCelebration:
      "/media/stories/01-a-blush-garden-celebration/cover/01-a-blush-garden-celebration__cover-desktop.jpg",
    storyModernGardenVows:
      "/media/stories/02-modern-garden-vows/cover/02-modern-garden-vows__cover-desktop.jpg",
    storyAnIvoryBallroomStory:
      "/media/stories/04-an-ivory-ballroom-story/cover/04-an-ivory-ballroom-story__cover-desktop.jpg",
    storyVowsByTheSea:
      "/media/stories/05-vows-by-the-sea/cover/05-vows-by-the-sea__cover-mobile.jpg",
  },
  enquiry: {
    botanical:
      "/media/collections/61-green-venue-botanical-suite/cover/green-venue-botanical-suite__cover-desktop.jpg",
    modern:
      "/media/collections/17-minimal-gold-wax-suite/cover/minimal-gold-wax-suite__cover-desktop.jpg",
    traditional:
      "/media/collections/42-ivory-gold-bird-heritage-suite/cover/ivory-gold-bird-heritage-suite__cover-desktop.jpg",
    romantic:
      "/media/collections/07-scalloped-blush-monogram-suite/cover/scalloped-blush-monogram-suite__cover-desktop.jpg",
    minimal:
      "/media/collections/27-modern-grey-luxury-suite/cover/modern-grey-luxury-suite__cover-desktop.jpg",
    luxury:
      "/media/collections/47-royal-lacquer-gold-box-set/cover/royal-lacquer-gold-box-set__cover-desktop.jpg",
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
    productCloseUpAlt:
      "/media/stories/03-golden-traditions/product/03-golden-traditions__product-close-up-alt.jpg",
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
      "/media/stories/02-modern-garden-vows/product/02-modern-garden-vows__product-primary.jpg",
    productSecondary:
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

const collections = {
  blackGoldBirdHeritageSuite: {
    cardDefault:
      "/media/collections/36-black-gold-bird-heritage-suite/cards/black-gold-bird-heritage-suite__card-default.jpg",
    cardHover:
      "/media/collections/36-black-gold-bird-heritage-suite/cards/black-gold-bird-heritage-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/36-black-gold-bird-heritage-suite/cover/black-gold-bird-heritage-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/36-black-gold-bird-heritage-suite/cover/black-gold-bird-heritage-suite__cover-mobile.jpg",
    gallery01:
      "/media/collections/36-black-gold-bird-heritage-suite/gallery/black-gold-bird-heritage-suite__gallery-01.jpg",
  },
  blackGoldFloralWreathSuite: {
    cardDefault:
      "/media/collections/35-black-gold-floral-wreath-suite/cards/black-gold-floral-wreath-suite__card-default.jpg",
    coverDesktop:
      "/media/collections/35-black-gold-floral-wreath-suite/cover/black-gold-floral-wreath-suite__cover-desktop.jpg",
  },
  blackGoldMythicSuite: {
    coverDesktop:
      "/media/collections/37-black-gold-mythic-suite/cover/black-gold-mythic-suite__cover-desktop.jpg",
  },
  blackGoldOrnamentalSuite: {
    cardDefault:
      "/media/collections/38-black-gold-ornamental-suite/cards/black-gold-ornamental-suite__card-default.jpg",
    cardHover:
      "/media/collections/38-black-gold-ornamental-suite/cards/black-gold-ornamental-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/38-black-gold-ornamental-suite/cover/black-gold-ornamental-suite__cover-desktop.jpg",
    gallery01:
      "/media/collections/38-black-gold-ornamental-suite/gallery/black-gold-ornamental-suite__gallery-01.jpg",
    gallery02:
      "/media/collections/38-black-gold-ornamental-suite/gallery/black-gold-ornamental-suite__gallery-02.jpg",
    gallery03:
      "/media/collections/38-black-gold-ornamental-suite/gallery/black-gold-ornamental-suite__gallery-03.jpg",
    gallery04:
      "/media/collections/38-black-gold-ornamental-suite/gallery/black-gold-ornamental-suite__gallery-04.jpg",
    gallery05:
      "/media/collections/38-black-gold-ornamental-suite/gallery/black-gold-ornamental-suite__gallery-05.jpg",
    gallery06:
      "/media/collections/38-black-gold-ornamental-suite/gallery/black-gold-ornamental-suite__gallery-06.jpg",
    gallery07:
      "/media/collections/38-black-gold-ornamental-suite/gallery/black-gold-ornamental-suite__gallery-07.jpg",
    gallery08:
      "/media/collections/38-black-gold-ornamental-suite/gallery/black-gold-ornamental-suite__gallery-08.jpg",
  },
  blackGoldRoyalCoupleSuite: {
    cardDefault:
      "/media/collections/39-black-gold-royal-couple-suite/cards/black-gold-royal-couple-suite__card-default.jpg",
    coverDesktop:
      "/media/collections/39-black-gold-royal-couple-suite/cover/black-gold-royal-couple-suite__cover-desktop.jpg",
  },
  blackIvoryContrastSuite: {
    coverDesktop:
      "/media/collections/40-black-ivory-contrast-suite/cover/black-ivory-contrast-suite__cover-desktop.jpg",
  },
  blackScriptMonogramSuite: {
    cardDefault:
      "/media/collections/18-black-script-monogram-suite/cards/black-script-monogram-suite__card-default.jpg",
    cardHover:
      "/media/collections/18-black-script-monogram-suite/cards/black-script-monogram-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/18-black-script-monogram-suite/cover/black-script-monogram-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/18-black-script-monogram-suite/cover/black-script-monogram-suite__cover-mobile.jpg",
    gallery01:
      "/media/collections/18-black-script-monogram-suite/gallery/black-script-monogram-suite__gallery-01.jpg",
    gallery02:
      "/media/collections/18-black-script-monogram-suite/gallery/black-script-monogram-suite__gallery-02.jpg",
    mockup01:
      "/media/collections/18-black-script-monogram-suite/mockups/black-script-monogram-suite__mockup-01.jpg",
  },
  blueVenueIllustratedSuite: {
    coverDesktop:
      "/media/collections/56-blue-venue-illustrated-suite/cover/blue-venue-illustrated-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/56-blue-venue-illustrated-suite/cover/blue-venue-illustrated-suite__cover-mobile.jpg",
    mockup01:
      "/media/collections/56-blue-venue-illustrated-suite/mockups/blue-venue-illustrated-suite__mockup-01.jpg",
  },
  blueWatercolourMonogramSuite: {
    coverDesktop:
      "/media/collections/14-blue-watercolour-monogram-suite/cover/blue-watercolour-monogram-suite__cover-desktop.jpg",
  },
  blushFanSignatureSuite: {
    coverDesktop:
      "/media/collections/09-blush-fan-signature-suite/cover/blush-fan-signature-suite__cover-desktop.jpg",
  },
  blushFigurineHeritageSuite: {
    coverDesktop:
      "/media/collections/46-blush-figurine-heritage-suite/cover/blush-figurine-heritage-suite__cover-desktop.jpg",
  },
  blushFloralScriptSuite: {
    cardDefault:
      "/media/collections/01-blush-floral-script-suite/cards/blush-floral-script-suite__card-default.jpg",
    cardHover:
      "/media/collections/01-blush-floral-script-suite/cards/blush-floral-script-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/01-blush-floral-script-suite/cover/blush-floral-script-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/01-blush-floral-script-suite/cover/blush-floral-script-suite__cover-mobile.jpg",
    gallery01:
      "/media/collections/01-blush-floral-script-suite/gallery/blush-floral-script-suite__gallery-01.jpg",
    gallery02:
      "/media/collections/01-blush-floral-script-suite/gallery/blush-floral-script-suite__gallery-02.jpg",
    mockup01:
      "/media/collections/01-blush-floral-script-suite/mockups/blush-floral-script-suite__mockup-01.jpg",
  },
  blushGoldFrameSuite: {
    cardDefault:
      "/media/collections/02-blush-gold-frame-suite/cards/blush-gold-frame-suite__card-default.jpg",
    cardHover:
      "/media/collections/02-blush-gold-frame-suite/cards/blush-gold-frame-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/02-blush-gold-frame-suite/cover/blush-gold-frame-suite__cover-desktop.jpg",
    gallery01:
      "/media/collections/02-blush-gold-frame-suite/gallery/blush-gold-frame-suite__gallery-01.jpg",
    gallery02:
      "/media/collections/02-blush-gold-frame-suite/gallery/blush-gold-frame-suite__gallery-02.jpg",
  },
  botanicalCalendarSuite: {
    coverDesktop:
      "/media/collections/16-botanical-calendar-suite/cover/botanical-calendar-suite__cover-desktop.jpg",
    mockup01:
      "/media/collections/16-botanical-calendar-suite/mockups/botanical-calendar-suite__mockup-01.jpg",
  },
  botanicalCornerScriptSuite: {
    coverDesktop:
      "/media/collections/12-botanical-corner-script-suite/cover/botanical-corner-script-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/12-botanical-corner-script-suite/cover/botanical-corner-script-suite__cover-mobile.jpg",
  },
  botanicalInitialsSuite: {
    coverDesktop:
      "/media/collections/03-botanical-initials-suite/cover/botanical-initials-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/03-botanical-initials-suite/cover/botanical-initials-suite__cover-mobile.jpg",
  },
  botanicalJuteFolders: {
    cardDefault:
      "/media/collections/30-botanical-jute-folders/cards/botanical-jute-folders__card-default.jpg",
    cardHover:
      "/media/collections/30-botanical-jute-folders/cards/botanical-jute-folders__card-hover.jpg",
    coverDesktop:
      "/media/collections/30-botanical-jute-folders/cover/botanical-jute-folders__cover-desktop.jpg",
    gallery01:
      "/media/collections/30-botanical-jute-folders/gallery/botanical-jute-folders__gallery-01.jpg",
  },
  botanicalScrollSuite: {
    cardDefault:
      "/media/collections/57-botanical-scroll-suite/cards/botanical-scroll-suite__card-default.jpg",
    cardHover:
      "/media/collections/57-botanical-scroll-suite/cards/botanical-scroll-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/57-botanical-scroll-suite/cover/botanical-scroll-suite__cover-desktop.jpg",
    gallery01:
      "/media/collections/57-botanical-scroll-suite/gallery/botanical-scroll-suite__gallery-01.jpg",
    gallery02:
      "/media/collections/57-botanical-scroll-suite/gallery/botanical-scroll-suite__gallery-02.jpg",
  },
  brownGrandOpeningSuite: {
    cardDefault:
      "/media/collections/63-brown-grand-opening-suite/cards/brown-grand-opening-suite__card-default.jpg",
    coverDesktop:
      "/media/collections/63-brown-grand-opening-suite/cover/brown-grand-opening-suite__cover-desktop.jpg",
  },
  calligraphyMonogramSuite: {
    cardDefault:
      "/media/collections/26-calligraphy-monogram-suite/cards/calligraphy-monogram-suite__card-default.jpg",
    cardHover:
      "/media/collections/26-calligraphy-monogram-suite/cards/calligraphy-monogram-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/26-calligraphy-monogram-suite/cover/calligraphy-monogram-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/26-calligraphy-monogram-suite/cover/calligraphy-monogram-suite__cover-mobile.jpg",
  },
  champagneSculptedBirdSuite: {
    cardDefault:
      "/media/collections/43-champagne-sculpted-bird-suite/cards/champagne-sculpted-bird-suite__card-default.jpg",
    cardHover:
      "/media/collections/43-champagne-sculpted-bird-suite/cards/champagne-sculpted-bird-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/43-champagne-sculpted-bird-suite/cover/champagne-sculpted-bird-suite__cover-desktop.jpg",
    gallery01:
      "/media/collections/43-champagne-sculpted-bird-suite/gallery/champagne-sculpted-bird-suite__gallery-01.jpg",
  },
  doubleHappinessRedSuite: {
    cardDefault:
      "/media/collections/52-double-happiness-red-suite/cards/double-happiness-red-suite__card-default.jpg",
    cardHover:
      "/media/collections/52-double-happiness-red-suite/cards/double-happiness-red-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/52-double-happiness-red-suite/cover/double-happiness-red-suite__cover-desktop.jpg",
  },
  floralSMonogramSuite: {
    coverDesktop:
      "/media/collections/20-floral-s-monogram-suite/cover/floral-s-monogram-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/20-floral-s-monogram-suite/cover/floral-s-monogram-suite__cover-mobile.jpg",
  },
  goldenEmbossedMinimalSuite: {
    coverDesktop:
      "/media/collections/25-golden-embossed-minimal-suite/cover/golden-embossed-minimal-suite__cover-desktop.jpg",
  },
  goldFrameNeutralSuite: {
    coverDesktop:
      "/media/collections/34-gold-frame-neutral-suite/cover/gold-frame-neutral-suite__cover-desktop.jpg",
  },
  goldReliefRoyalCoupleSuite: {
    cardDefault:
      "/media/collections/49-gold-relief-royal-couple-suite/cards/gold-relief-royal-couple-suite__card-default.jpg",
    cardHover:
      "/media/collections/49-gold-relief-royal-couple-suite/cards/gold-relief-royal-couple-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/49-gold-relief-royal-couple-suite/cover/gold-relief-royal-couple-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/49-gold-relief-royal-couple-suite/cover/gold-relief-royal-couple-suite__cover-mobile.jpg",
    gallery01:
      "/media/collections/49-gold-relief-royal-couple-suite/gallery/gold-relief-royal-couple-suite__gallery-01.jpg",
  },
  greenVenueBotanicalSuite: {
    cardDefault:
      "/media/collections/61-green-venue-botanical-suite/cards/green-venue-botanical-suite__card-default.jpg",
    cardHover:
      "/media/collections/61-green-venue-botanical-suite/cards/green-venue-botanical-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/61-green-venue-botanical-suite/cover/green-venue-botanical-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/61-green-venue-botanical-suite/cover/green-venue-botanical-suite__cover-mobile.jpg",
  },
  heritageClientUseStudy: {
    coverDesktop:
      "/media/collections/50-heritage-client-use-study/cover/heritage-client-use-study__cover-desktop.jpg",
  },
  heritageCrestMonogramSuite: {
    coverDesktop:
      "/media/collections/24-heritage-crest-monogram-suite/cover/heritage-crest-monogram-suite__cover-desktop.jpg",
  },
  illustratedRomanceSuite: {
    cardDefault:
      "/media/collections/08-illustrated-romance-suite/cards/illustrated-romance-suite__card-default.jpg",
    cardHover:
      "/media/collections/08-illustrated-romance-suite/cards/illustrated-romance-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/08-illustrated-romance-suite/cover/illustrated-romance-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/08-illustrated-romance-suite/cover/illustrated-romance-suite__cover-mobile.jpg",
  },
  ivoryGoldBirdHeritageSuite: {
    cardDefault:
      "/media/collections/42-ivory-gold-bird-heritage-suite/cards/ivory-gold-bird-heritage-suite__card-default.jpg",
    cardHover:
      "/media/collections/42-ivory-gold-bird-heritage-suite/cards/ivory-gold-bird-heritage-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/42-ivory-gold-bird-heritage-suite/cover/ivory-gold-bird-heritage-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/42-ivory-gold-bird-heritage-suite/cover/ivory-gold-bird-heritage-suite__cover-mobile.jpg",
    gallery01:
      "/media/collections/42-ivory-gold-bird-heritage-suite/gallery/ivory-gold-bird-heritage-suite__gallery-01.jpg",
    gallery02:
      "/media/collections/42-ivory-gold-bird-heritage-suite/gallery/ivory-gold-bird-heritage-suite__gallery-02.jpg",
    gallery03:
      "/media/collections/42-ivory-gold-bird-heritage-suite/gallery/ivory-gold-bird-heritage-suite__gallery-03.jpg",
    gallery04:
      "/media/collections/42-ivory-gold-bird-heritage-suite/gallery/ivory-gold-bird-heritage-suite__gallery-04.jpg",
    gallery05:
      "/media/collections/42-ivory-gold-bird-heritage-suite/gallery/ivory-gold-bird-heritage-suite__gallery-05.jpg",
    gallery06:
      "/media/collections/42-ivory-gold-bird-heritage-suite/gallery/ivory-gold-bird-heritage-suite__gallery-06.jpg",
    gallery07:
      "/media/collections/42-ivory-gold-bird-heritage-suite/gallery/ivory-gold-bird-heritage-suite__gallery-07.jpg",
    gallery08:
      "/media/collections/42-ivory-gold-bird-heritage-suite/gallery/ivory-gold-bird-heritage-suite__gallery-08.jpg",
    gallery09:
      "/media/collections/42-ivory-gold-bird-heritage-suite/gallery/ivory-gold-bird-heritage-suite__gallery-09.jpg",
    gallery10:
      "/media/collections/42-ivory-gold-bird-heritage-suite/gallery/ivory-gold-bird-heritage-suite__gallery-10.jpg",
    gallery11:
      "/media/collections/42-ivory-gold-bird-heritage-suite/gallery/ivory-gold-bird-heritage-suite__gallery-11.jpg",
    gallery12:
      "/media/collections/42-ivory-gold-bird-heritage-suite/gallery/ivory-gold-bird-heritage-suite__gallery-12.jpg",
    gallery13:
      "/media/collections/42-ivory-gold-bird-heritage-suite/gallery/ivory-gold-bird-heritage-suite__gallery-13.jpg",
    gallery14:
      "/media/collections/42-ivory-gold-bird-heritage-suite/gallery/ivory-gold-bird-heritage-suite__gallery-14.jpg",
    gallery15:
      "/media/collections/42-ivory-gold-bird-heritage-suite/gallery/ivory-gold-bird-heritage-suite__gallery-15.jpg",
    gallery16:
      "/media/collections/42-ivory-gold-bird-heritage-suite/gallery/ivory-gold-bird-heritage-suite__gallery-16.jpg",
  },
  ivoryGoldOrnateFrameSuite: {
    cardDefault:
      "/media/collections/41-ivory-gold-ornate-frame-suite/cards/ivory-gold-ornate-frame-suite__card-default.jpg",
    cardHover:
      "/media/collections/41-ivory-gold-ornate-frame-suite/cards/ivory-gold-ornate-frame-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/41-ivory-gold-ornate-frame-suite/cover/ivory-gold-ornate-frame-suite__cover-desktop.jpg",
    detail01:
      "/media/collections/41-ivory-gold-ornate-frame-suite/details/ivory-gold-ornate-frame-suite__detail-01.jpg",
    gallery01:
      "/media/collections/41-ivory-gold-ornate-frame-suite/gallery/ivory-gold-ornate-frame-suite__gallery-01.jpg",
  },
  lacquerBirdHeritageSuite: {
    cardDefault:
      "/media/collections/48-lacquer-bird-heritage-suite/cards/lacquer-bird-heritage-suite__card-default.jpg",
    cardHover:
      "/media/collections/48-lacquer-bird-heritage-suite/cards/lacquer-bird-heritage-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/48-lacquer-bird-heritage-suite/cover/lacquer-bird-heritage-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/48-lacquer-bird-heritage-suite/cover/lacquer-bird-heritage-suite__cover-mobile.jpg",
    gallery01:
      "/media/collections/48-lacquer-bird-heritage-suite/gallery/lacquer-bird-heritage-suite__gallery-01.jpg",
    gallery02:
      "/media/collections/48-lacquer-bird-heritage-suite/gallery/lacquer-bird-heritage-suite__gallery-02.jpg",
  },
  lavenderFloralProgramSuite: {
    mockup01:
      "/media/collections/58-lavender-floral-program-suite/mockups/lavender-floral-program-suite__mockup-01.jpg",
  },
  lavenderPortraitSuite: {
    coverDesktop:
      "/media/collections/13-lavender-portrait-suite/cover/lavender-portrait-suite__cover-desktop.jpg",
  },
  leafSealNaturalFolders: {
    coverDesktop:
      "/media/collections/31-leaf-seal-natural-folders/cover/leaf-seal-natural-folders__cover-desktop.jpg",
  },
  linenGoldWreathFolders: {
    cardDefault:
      "/media/collections/28-linen-gold-wreath-folders/cards/linen-gold-wreath-folders__card-default.jpg",
    coverDesktop:
      "/media/collections/28-linen-gold-wreath-folders/cover/linen-gold-wreath-folders__cover-desktop.jpg",
  },
  minimalBlueCertificateSuite: {
    coverDesktop:
      "/media/collections/54-minimal-blue-certificate-suite/cover/minimal-blue-certificate-suite__cover-desktop.jpg",
  },
  minimalBotanicalSealSuite: {
    cardDefault:
      "/media/collections/22-minimal-botanical-seal-suite/cards/minimal-botanical-seal-suite__card-default.jpg",
    coverDesktop:
      "/media/collections/22-minimal-botanical-seal-suite/cover/minimal-botanical-seal-suite__cover-desktop.jpg",
  },
  minimalGoldWaxSuite: {
    cardDefault:
      "/media/collections/17-minimal-gold-wax-suite/cards/minimal-gold-wax-suite__card-default.jpg",
    cardHover:
      "/media/collections/17-minimal-gold-wax-suite/cards/minimal-gold-wax-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/17-minimal-gold-wax-suite/cover/minimal-gold-wax-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/17-minimal-gold-wax-suite/cover/minimal-gold-wax-suite__cover-mobile.jpg",
    detail01:
      "/media/collections/17-minimal-gold-wax-suite/details/minimal-gold-wax-suite__detail-01.jpg",
    detail02:
      "/media/collections/17-minimal-gold-wax-suite/details/minimal-gold-wax-suite__detail-02.jpg",
    detail03:
      "/media/collections/17-minimal-gold-wax-suite/details/minimal-gold-wax-suite__detail-03.jpg",
  },
  minimalRedProgramSuite: {
    coverDesktop:
      "/media/collections/53-minimal-red-program-suite/cover/minimal-red-program-suite__cover-desktop.jpg",
  },
  modernGreyLuxurySuite: {
    cardDefault:
      "/media/collections/27-modern-grey-luxury-suite/cards/modern-grey-luxury-suite__card-default.jpg",
    coverDesktop:
      "/media/collections/27-modern-grey-luxury-suite/cover/modern-grey-luxury-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/27-modern-grey-luxury-suite/cover/modern-grey-luxury-suite__cover-mobile.jpg",
  },
  ornamentalCornerNeutralFolders: {
    cardDefault:
      "/media/collections/29-ornamental-corner-neutral-folders/cards/ornamental-corner-neutral-folders__card-default.jpg",
    cardHover:
      "/media/collections/29-ornamental-corner-neutral-folders/cards/ornamental-corner-neutral-folders__card-hover.jpg",
    coverDesktop:
      "/media/collections/29-ornamental-corner-neutral-folders/cover/ornamental-corner-neutral-folders__cover-desktop.jpg",
    coverMobile:
      "/media/collections/29-ornamental-corner-neutral-folders/cover/ornamental-corner-neutral-folders__cover-mobile.jpg",
    gallery01:
      "/media/collections/29-ornamental-corner-neutral-folders/gallery/ornamental-corner-neutral-folders__gallery-01.jpg",
    gallery02:
      "/media/collections/29-ornamental-corner-neutral-folders/gallery/ornamental-corner-neutral-folders__gallery-02.jpg",
    gallery03:
      "/media/collections/29-ornamental-corner-neutral-folders/gallery/ornamental-corner-neutral-folders__gallery-03.jpg",
    gallery04:
      "/media/collections/29-ornamental-corner-neutral-folders/gallery/ornamental-corner-neutral-folders__gallery-04.jpg",
    gallery05:
      "/media/collections/29-ornamental-corner-neutral-folders/gallery/ornamental-corner-neutral-folders__gallery-05.jpg",
    gallery06:
      "/media/collections/29-ornamental-corner-neutral-folders/gallery/ornamental-corner-neutral-folders__gallery-06.jpg",
    gallery07:
      "/media/collections/29-ornamental-corner-neutral-folders/gallery/ornamental-corner-neutral-folders__gallery-07.jpg",
    gallery08:
      "/media/collections/29-ornamental-corner-neutral-folders/gallery/ornamental-corner-neutral-folders__gallery-08.jpg",
    gallery09:
      "/media/collections/29-ornamental-corner-neutral-folders/gallery/ornamental-corner-neutral-folders__gallery-09.jpg",
    gallery10:
      "/media/collections/29-ornamental-corner-neutral-folders/gallery/ornamental-corner-neutral-folders__gallery-10.jpg",
    gallery11:
      "/media/collections/29-ornamental-corner-neutral-folders/gallery/ornamental-corner-neutral-folders__gallery-11.jpg",
  },
  outdoorBotanicalInvitation: {
    detail01:
      "/media/collections/59-outdoor-botanical-invitation/details/outdoor-botanical-invitation__detail-01.jpg",
  },
  ovalMonogramBoxSuite: {
    coverDesktop:
      "/media/collections/21-oval-monogram-box-suite/cover/oval-monogram-box-suite__cover-desktop.jpg",
  },
  paintedLandscapeSuite: {
    coverDesktop:
      "/media/collections/10-painted-landscape-suite/cover/painted-landscape-suite__cover-desktop.jpg",
  },
  premiumBoxedSignatureSet: {
    coverDesktop:
      "/media/collections/62-premium-boxed-signature-set/cover/premium-boxed-signature-set__cover-desktop.jpg",
  },
  redBlackSealSuite: {
    cardDefault:
      "/media/collections/51-red-black-seal-suite/cards/red-black-seal-suite__card-default.jpg",
    cardHover:
      "/media/collections/51-red-black-seal-suite/cards/red-black-seal-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/51-red-black-seal-suite/cover/red-black-seal-suite__cover-desktop.jpg",
    gallery01:
      "/media/collections/51-red-black-seal-suite/gallery/red-black-seal-suite__gallery-01.jpg",
    gallery02:
      "/media/collections/51-red-black-seal-suite/gallery/red-black-seal-suite__gallery-02.jpg",
    gallery03:
      "/media/collections/51-red-black-seal-suite/gallery/red-black-seal-suite__gallery-03.jpg",
  },
  roseCornerCertificateSuite: {
    cardDefault:
      "/media/collections/04-rose-corner-certificate-suite/cards/rose-corner-certificate-suite__card-default.jpg",
    cardHover:
      "/media/collections/04-rose-corner-certificate-suite/cards/rose-corner-certificate-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/04-rose-corner-certificate-suite/cover/rose-corner-certificate-suite__cover-desktop.jpg",
  },
  royalBlueGoldSuite: {
    coverDesktop:
      "/media/collections/55-royal-blue-gold-suite/cover/royal-blue-gold-suite__cover-desktop.jpg",
  },
  royalLacquerGoldBoxSet: {
    cardDefault:
      "/media/collections/47-royal-lacquer-gold-box-set/cards/royal-lacquer-gold-box-set__card-default.jpg",
    cardHover:
      "/media/collections/47-royal-lacquer-gold-box-set/cards/royal-lacquer-gold-box-set__card-hover.jpg",
    coverDesktop:
      "/media/collections/47-royal-lacquer-gold-box-set/cover/royal-lacquer-gold-box-set__cover-desktop.jpg",
  },
  scallopedBlushMonogramSuite: {
    cardDefault:
      "/media/collections/07-scalloped-blush-monogram-suite/cards/scalloped-blush-monogram-suite__card-default.jpg",
    cardHover:
      "/media/collections/07-scalloped-blush-monogram-suite/cards/scalloped-blush-monogram-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/07-scalloped-blush-monogram-suite/cover/scalloped-blush-monogram-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/07-scalloped-blush-monogram-suite/cover/scalloped-blush-monogram-suite__cover-mobile.jpg",
    gallery01:
      "/media/collections/07-scalloped-blush-monogram-suite/gallery/scalloped-blush-monogram-suite__gallery-01.jpg",
  },
  scallopedIvoryGoldSuite: {
    cardDefault:
      "/media/collections/44-scalloped-ivory-gold-suite/cards/scalloped-ivory-gold-suite__card-default.jpg",
    cardHover:
      "/media/collections/44-scalloped-ivory-gold-suite/cards/scalloped-ivory-gold-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/44-scalloped-ivory-gold-suite/cover/scalloped-ivory-gold-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/44-scalloped-ivory-gold-suite/cover/scalloped-ivory-gold-suite__cover-mobile.jpg",
    gallery01:
      "/media/collections/44-scalloped-ivory-gold-suite/gallery/scalloped-ivory-gold-suite__gallery-01.jpg",
    mockup01:
      "/media/collections/44-scalloped-ivory-gold-suite/mockups/scalloped-ivory-gold-suite__mockup-01.jpg",
  },
  seatedCoupleGoldSuite: {
    cardDefault:
      "/media/collections/45-seated-couple-gold-suite/cards/seated-couple-gold-suite__card-default.jpg",
    cardHover:
      "/media/collections/45-seated-couple-gold-suite/cards/seated-couple-gold-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/45-seated-couple-gold-suite/cover/seated-couple-gold-suite__cover-desktop.jpg",
    gallery01:
      "/media/collections/45-seated-couple-gold-suite/gallery/seated-couple-gold-suite__gallery-01.jpg",
  },
  silverPinkHeritageSuite: {
    coverDesktop:
      "/media/collections/05-silver-pink-heritage-suite/cover/silver-pink-heritage-suite__cover-desktop.jpg",
  },
  softPinkPersonalisedSuite: {
    coverDesktop:
      "/media/collections/06-soft-pink-personalised-suite/cover/soft-pink-personalised-suite__cover-desktop.jpg",
  },
  textileCertificateFolders: {
    cardDefault:
      "/media/collections/33-textile-certificate-folders/cards/textile-certificate-folders__card-default.jpg",
    cardHover:
      "/media/collections/33-textile-certificate-folders/cards/textile-certificate-folders__card-hover.jpg",
    coverDesktop:
      "/media/collections/33-textile-certificate-folders/cover/textile-certificate-folders__cover-desktop.jpg",
  },
  vsMonogramCertificateSuite: {
    cardDefault:
      "/media/collections/19-vs-monogram-certificate-suite/cards/vs-monogram-certificate-suite__card-default.jpg",
    cardHover:
      "/media/collections/19-vs-monogram-certificate-suite/cards/vs-monogram-certificate-suite__card-hover.jpg",
    coverDesktop:
      "/media/collections/19-vs-monogram-certificate-suite/cover/vs-monogram-certificate-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/19-vs-monogram-certificate-suite/cover/vs-monogram-certificate-suite__cover-mobile.jpg",
    gallery01:
      "/media/collections/19-vs-monogram-certificate-suite/gallery/vs-monogram-certificate-suite__gallery-01.jpg",
    gallery02:
      "/media/collections/19-vs-monogram-certificate-suite/gallery/vs-monogram-certificate-suite__gallery-02.jpg",
  },
  warmBrownScriptFolders: {
    coverDesktop:
      "/media/collections/32-warm-brown-script-folders/cover/warm-brown-script-folders__cover-desktop.jpg",
  },
  warmWatercolourMonogramSuite: {
    coverDesktop:
      "/media/collections/15-warm-watercolour-monogram-suite/cover/warm-watercolour-monogram-suite__cover-desktop.jpg",
  },
  watercolourFloralMonogramSuite: {
    coverDesktop:
      "/media/collections/11-watercolour-floral-monogram-suite/cover/watercolour-floral-monogram-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/11-watercolour-floral-monogram-suite/cover/watercolour-floral-monogram-suite__cover-mobile.jpg",
  },
  watercolourVenueCertificateSuite: {
    coverDesktop:
      "/media/collections/23-watercolour-venue-certificate-suite/cover/watercolour-venue-certificate-suite__cover-desktop.jpg",
  },
  whiteFanMonogramSuite: {
    coverDesktop:
      "/media/collections/60-white-fan-monogram-suite/cover/white-fan-monogram-suite__cover-desktop.jpg",
    coverMobile:
      "/media/collections/60-white-fan-monogram-suite/cover/white-fan-monogram-suite__cover-mobile.jpg",
    detail01:
      "/media/collections/60-white-fan-monogram-suite/details/white-fan-monogram-suite__detail-01.jpg",
    detail02:
      "/media/collections/60-white-fan-monogram-suite/details/white-fan-monogram-suite__detail-02.jpg",
    mockup01:
      "/media/collections/60-white-fan-monogram-suite/mockups/white-fan-monogram-suite__mockup-01.jpg",
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
  collections,
  craftsmanship,
} as const;

export type SiteMedia = typeof siteMedia;
