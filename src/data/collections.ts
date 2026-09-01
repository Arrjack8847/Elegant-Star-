// Compatibility adapter for the website collection UI.
// Source of truth: public/media/collections via elegantStarCollections.fromPosts.

import { elegantStarCollections } from "./elegantStarCollections.fromPosts";

export const collectionFilters = [
  "All",
  "Special One",
  "Wedding Invitations",
  "Certificate Folders",
  "Gifts & Favours",
  "Corporate & Official",
] as const;

export type CollectionFilter = (typeof collectionFilters)[number];
export type CollectionCategory = Exclude<CollectionFilter, "All">;

export type InvitationCollection = {
  id: string;
  slug: string;
  reference: string;
  name: string;
  categories: CollectionCategory[];
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  cover1?: string;
  cover2?: string;
  mobileImage: string;
  cardImage: string;
  hoverImage: string;
  gallery: string[];
  images: string[];
  videos: string[];
  featured: boolean;
  materials: string[];
  finishes: string[];
  personalization: string[];
};

const categoryOrder: CollectionCategory[] = [
  "Special One",
  "Wedding Invitations",
  "Certificate Folders",
  "Gifts & Favours",
  "Corporate & Official",
];

const fallbackImage =
  elegantStarCollections[0]?.coverImage ??
  "/media/collections/special-one/bonded-in-grace-rose-gold-silver-glitter/cover1.jpg";

type SourceCollection = (typeof elegantStarCollections)[number] & {
  cover1?: string;
  cover2?: string;
  images?: readonly string[];
  videos?: readonly string[];
};

const imagePathPattern = /\.(avif|gif|jpe?g|png|webp)$/i;

const featuredSourceSlugs = new Set(
  categoryOrder
    .map(
      (category) =>
        elegantStarCollections.find((item) => item.category === category)?.slug,
    )
    .filter(Boolean) as string[],
);

function safeGallery(item: SourceCollection): string[] {
  const gallery = Array.isArray(item.gallery)
    ? item.gallery.filter((value) => imagePathPattern.test(value))
    : [];
  return gallery.length > 0 ? gallery : [fallbackImage];
}

function safeImageList(values: readonly string[] | undefined): string[] {
  return Array.isArray(values)
    ? values.filter((value) => imagePathPattern.test(value))
    : [];
}

function safeVideoList(values: readonly string[] | undefined): string[] {
  return Array.isArray(values)
    ? values.filter((value) => /\.(m4v|mov|mp4|webm)$/i.test(value))
    : [];
}

function buildReference(index: number): string {
  return `ES-${String(index + 1).padStart(3, "0")}`;
}

const collectionTitleOverrides: Record<string, string> = {
  "ES-011": "Kanok Pattern Certificate Holder",
  "ES-026": "Graceful Wedding Card",
  "ES-037": "Unique Wedding Card",
  "ES-065": "Rose Gold Certificate Holder",
  "ES-078": "Custom Notebook",
  "ES-080": "Fingerprint Tree",
};

const collectionImageExclusions: Record<string, Set<string>> = {
  "kranok-pattern-certificate-collection": new Set([
    "/media/collections/special-one/kranok-pattern-certificate-collection/kranok-pattern-certificate-collection-image-12.jpg",
    "/media/collections/special-one/kranok-pattern-certificate-collection/kranok-pattern-certificate-collection-image-13.jpg",
    "/media/collections/special-one/kranok-pattern-certificate-collection/kranok-pattern-certificate-collection-image-14.jpg",
    "/media/collections/special-one/kranok-pattern-certificate-collection/kranok-pattern-certificate-collection-image-15.jpg",
    "/media/collections/special-one/kranok-pattern-certificate-collection/kranok-pattern-certificate-collection-image-16.jpg",
    "/media/collections/special-one/kranok-pattern-certificate-collection/kranok-pattern-certificate-collection-image-17.jpg",
  ]),
};

function filterCollectionImages(slug: string, values: string[]): string[] {
  const excluded = collectionImageExclusions[slug];
  return excluded ? values.filter((value) => !excluded.has(value)) : values;
}

function buildMaterials(category: CollectionCategory): string[] {
  switch (category) {
    case "Wedding Invitations":
      return ["Premium invitation stock", "Envelope and insert options"];
    case "Certificate Folders":
    case "Special One":
      return ["Premium cover material", "Certificate insert format"];
    case "Gifts & Favours":
      return ["Gift-ready material selection", "Coordinated packaging option"];
    case "Corporate & Official":
      return ["Formal presentation stock", "Brand-aligned stationery format"];
  }
}

function buildFinishes(category: CollectionCategory): string[] {
  switch (category) {
    case "Wedding Invitations":
      return [
        "Foil, embossing or illustrated finish options",
        "Coordinated suite details",
      ];
    case "Certificate Folders":
      return [
        "Foil, velvet, canvas or textured cover directions",
        "Keepsake presentation details",
      ];
    case "Gifts & Favours":
      return ["Guest-ready presentation", "Personalised finishing options"];
    case "Corporate & Official":
      return ["Formal print finishing", "Logo or event detail customisation"];
    case "Special One":
      return ["Signature finish direction", "Premium keepsake presentation"];
  }
}

export const invitationCollections: InvitationCollection[] =
  elegantStarCollections.map((sourceItem, index) => {
    const item = sourceItem as SourceCollection;
    const category = item.category as CollectionCategory;
    const gallery = filterCollectionImages(item.slug, safeGallery(item));
    const sourceImages = filterCollectionImages(
      item.slug,
      safeImageList(item.images),
    );
    const images = sourceImages;
    const videos = safeVideoList(item.videos);
    const cover1 =
      (item.cover1 && imagePathPattern.test(item.cover1)
        ? item.cover1
        : undefined) ||
      sourceImages[0] ||
      undefined;
    const cover2 =
      item.cover2 && imagePathPattern.test(item.cover2)
        ? item.cover2
        : undefined;
    const coverImage =
      cover1 ||
      (imagePathPattern.test(item.coverImage) ? item.coverImage : undefined) ||
      gallery[0] ||
      fallbackImage;
    const cardImage = cover1 || coverImage;
    const hoverImage = cover2 || cardImage;
    const reference = buildReference(index);

    return {
      id: item.slug,
      slug: item.slug,
      reference,
      name: collectionTitleOverrides[reference] ?? item.title,
      categories: [category],
      shortDescription: item.description,
      fullDescription: `${item.description} This design can be personalised with wording, colour direction, quantity and coordinated presentation details during consultation.`,
      coverImage,
      cover1,
      cover2,
      mobileImage: coverImage,
      cardImage,
      hoverImage,
      gallery,
      images,
      videos,
      featured: featuredSourceSlugs.has(item.slug),
      materials: buildMaterials(category),
      finishes: buildFinishes(category),
      personalization: [
        "Wording and layout",
        "Colour direction",
        "Format and size",
        "Coordinated pieces",
        "Quantity and timeline",
      ],
    };
  });

export const featuredCollections = categoryOrder
  .map((category) =>
    invitationCollections.find((collection) =>
      collection.categories.includes(category),
    ),
  )
  .filter((collection): collection is InvitationCollection =>
    Boolean(collection),
  );

export function getCollectionBySlug(slug: string) {
  return invitationCollections.find((collection) => collection.slug === slug);
}

export function getRelatedCollections(slug: string, categories: string[]) {
  return invitationCollections
    .filter(
      (collection) =>
        collection.slug !== slug &&
        collection.categories.some((category) => categories.includes(category)),
    )
    .slice(0, 4);
}
