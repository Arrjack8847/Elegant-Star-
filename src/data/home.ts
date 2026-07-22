import {
  invitationCollections,
  type CollectionCategory,
} from "@/data/collections";
import { siteMedia } from "@/data/siteMedia";

const homepageCategories = [
  {
    slug: "special-one",
    title: "Special One",
    description:
      "Signature keepsake pieces and highlighted Elegant Star designs with a distinctive presentation character.",
    filter: "Special One",
  },
  {
    slug: "wedding-invitations",
    title: "Wedding Invitations",
    description:
      "Invitation cards and coordinated stationery for elegant wedding celebrations.",
    filter: "Wedding Invitations",
  },
  {
    slug: "certificate-folders",
    title: "Certificate Folders",
    description:
      "Premium folders and keepsake covers for formal marriage documentation.",
    filter: "Certificate Folders",
  },
  {
    slug: "gifts-and-favours",
    title: "Gifts & Favours",
    description:
      "Return gifts, favour packaging and celebration accessories for special occasions.",
    filter: "Gifts & Favours",
  },
  {
    slug: "corporate-official",
    title: "Corporate & Official",
    description:
      "Formal stationery and presentation pieces for corporate and official events.",
    filter: "Corporate & Official",
  },
] satisfies readonly {
  slug: string;
  title: string;
  description: string;
  filter: CollectionCategory;
}[];

function collectionForCategory(category: CollectionCategory) {
  return invitationCollections.find((collection) =>
    collection.categories.includes(category),
  );
}

function categoryImage(category: CollectionCategory, fallbackIndex = 0) {
  return (
    collectionForCategory(category)?.cardImage ??
    invitationCollections[fallbackIndex]?.cardImage ??
    "/media/collections/special-one/bonded-in-grace-rose-gold-silver-glitter/cover1.jpg"
  );
}

export const categoryExplorer = homepageCategories.map((category, index) => ({
  ...category,
  image: categoryImage(category.filter, index),
}));

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

export const enquiryStyles = homepageCategories.map((category, index) => ({
  value: category.title,
  image: categoryImage(category.filter, index),
}));
