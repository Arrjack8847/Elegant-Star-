import { siteMedia } from "@/data/siteMedia";
export const categoryExplorer = [
  {
    slug: "wedding-invitations",
    title: "Wedding Invitations",
    description:
      "Complete invitation suites for intimate ceremonies and grand celebrations.",
    image: siteMedia.homepage.categoryExplorer.weddingInvitations,
    filter: "Wedding Invitations",
  },
  {
    slug: "certificate-folders",
    title: "Certificate Folders",
    description:
      "Personalised folders created to hold and present meaningful ceremony documents.",
    image: siteMedia.homepage.categoryExplorer.certificateFolders,
    filter: "Certificate Folders",
  },
  {
    slug: "traditional-heritage",
    title: "Traditional & Heritage",
    description:
      "Rich ornamental directions inspired by formal traditions and ceremonial presentation.",
    image: siteMedia.homepage.categoryExplorer.traditionalAndHeritage,
    filter: "Traditional & Heritage",
  },
  {
    slug: "modern-minimal",
    title: "Modern & Minimal",
    description:
      "Quiet typography, clean spacing and restrained finishing details.",
    image: siteMedia.homepage.categoryExplorer.modernAndMinimal,
    filter: "Modern & Minimal",
  },
  {
    slug: "botanical-floral",
    title: "Botanical & Floral",
    description:
      "Soft illustrated botanicals, romantic colour and graceful decorative framing.",
    image: siteMedia.homepage.categoryExplorer.botanicalAndFloral,
    filter: "Botanical & Floral",
  },
  {
    slug: "premium-boxed-sets",
    title: "Premium Boxed Sets",
    description:
      "Keepsake presentation with coordinated pieces and elevated packaging.",
    image: siteMedia.homepage.categoryExplorer.premiumBoxedSets,
    filter: "Premium Boxed Sets",
  },
  {
    slug: "corporate-events",
    title: "Corporate & Special Events",
    description:
      "Formal stationery directions for openings, launches and meaningful occasions.",
    image: siteMedia.homepage.categoryExplorer.corporateAndSpecialEvents,
    filter: "Corporate & Events",
  },
] as const;

export const craftsmanshipItems = [
  {
    slug: "paper-and-texture",
    title: "Paper & Texture",
    description:
      "Explore how surface, weight and tactile character change the feeling of a piece.",
    image: siteMedia.homepage.craftsmanship.paperAndTexture,
  },
  {
    slug: "foil-embossing",
    title: "Foil, Embossing & Monograms",
    description:
      "Metallic accents, raised details and personal marks bring focus to names and symbols.",
    image: siteMedia.homepage.craftsmanship.foilEmbossingAndMonograms,
  },
  {
    slug: "seals-ribbons",
    title: "Seals, Ribbons & Accessories",
    description:
      "Finishing pieces are selected to support the design without overwhelming it.",
    image: siteMedia.homepage.craftsmanship.sealsRibbonsFansAndAccessories,
  },
  {
    slug: "packaging",
    title: "Packaging, Gifts & Favours",
    description:
      "Presentation details help the completed stationery feel considered from first sight.",
    image: siteMedia.homepage.craftsmanship.packagingGiftsAndFavours,
  },
  {
    slug: "customisation",
    title: "Customisation & Coordinated Pieces",
    description:
      "Colours, wording, monograms and supporting stationery can be developed as one visual system.",
    image: siteMedia.homepage.craftsmanship.customisationAndCoordinatedPieces,
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Share your vision",
    text: "Tell us about the celebration, timing, quantity and the feeling you want to create.",
    image: siteMedia.homepage.orderingProcess.shareYourVision,
  },
  {
    number: "02",
    title: "Choose a direction",
    text: "Browse collections or begin from a visual reference that feels close to your occasion.",
    image: siteMedia.homepage.orderingProcess.chooseADirection,
  },
  {
    number: "03",
    title: "Personalise the details",
    text: "Refine wording, colours, format, monogram and coordinated pieces with the team.",
    image: siteMedia.homepage.orderingProcess.personaliseTheDetails,
  },
  {
    number: "04",
    title: "Review and confirm",
    text: "Check the prepared direction carefully before production begins.",
    image: siteMedia.homepage.orderingProcess.reviewAndConfirm,
  },
  {
    number: "05",
    title: "Production and presentation",
    text: "The confirmed stationery is prepared, finished and arranged for collection or delivery.",
    image: siteMedia.homepage.orderingProcess.productionAndPresentation,
  },
] as const;

export const galleryPreviewItems = [
  {
    title: "Illustrated Romance",
    type: "Collection",
    filter: "Collections",
    href: "/designs/illustrated-romance-suite",
    image: siteMedia.homepage.galleryPreview.collectionIllustratedRomanceSuite,
  },
  {
    title: "Royal Blue & Gold",
    type: "Collection",
    filter: "Collections",
    href: "/designs/royal-blue-gold-suite",
    image: siteMedia.homepage.galleryPreview.collectionRoyalBlueGoldSuite,
  },
  {
    title: "Black Gold Heritage",
    type: "Collection",
    filter: "Collections",
    href: "/designs/black-gold-bird-heritage-suite",
    image:
      siteMedia.homepage.galleryPreview.collectionBlackGoldBirdHeritageSuite,
  },
  {
    title: "Green Botanical",
    type: "Collection",
    filter: "Collections",
    href: "/designs/green-venue-botanical-suite",
    image: siteMedia.homepage.galleryPreview.collectionGreenVenueBotanicalSuite,
  },
  {
    title: "A Blush Garden Celebration",
    type: "Story",
    filter: "Stories",
    href: "/stories/a-blush-garden-celebration",
    image: siteMedia.homepage.galleryPreview.storyABlushGardenCelebration,
  },
  {
    title: "Modern Garden Vows",
    type: "Story",
    filter: "Stories",
    href: "/stories/modern-garden-vows",
    image: siteMedia.homepage.galleryPreview.storyModernGardenVows,
  },
  {
    title: "An Ivory Ballroom Story",
    type: "Story",
    filter: "Stories",
    href: "/stories/an-ivory-ballroom-story",
    image: siteMedia.homepage.galleryPreview.storyAnIvoryBallroomStory,
  },
  {
    title: "Vows by the Sea",
    type: "Story",
    filter: "Stories",
    href: "/stories/vows-by-the-sea",
    image: siteMedia.homepage.galleryPreview.storyVowsByTheSea,
  },
] as const;

export const enquiryStyles = [
  {
    value: "Botanical",
    image: siteMedia.homepage.enquiry.botanical,
  },
  {
    value: "Modern",
    image: siteMedia.homepage.enquiry.modern,
  },
  {
    value: "Traditional",
    image: siteMedia.homepage.enquiry.traditional,
  },
  {
    value: "Romantic",
    image: siteMedia.homepage.enquiry.romantic,
  },
  {
    value: "Minimal",
    image: siteMedia.homepage.enquiry.minimal,
  },
  {
    value: "Luxury",
    image: siteMedia.homepage.enquiry.luxury,
  },
] as const;
