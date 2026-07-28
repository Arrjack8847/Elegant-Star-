import { siteMedia } from "@/data/siteMedia";

function envValue(value: string | undefined, fallback = "") {
  return value?.trim() || fallback;
}

/*
 * NEXT_PUBLIC variables must be referenced directly so Next.js can include
 * them correctly in client-side bundles.
 */
const publicConfig = {
  siteUrl: envValue(
    process.env.NEXT_PUBLIC_SITE_URL,
    "https://elegant-star-3gk1.vercel.app",
  ),
  messengerUrl: envValue(
    process.env.NEXT_PUBLIC_CONTACT_MESSENGER_URL,
  ),
  messengerUsername: envValue(
    process.env.NEXT_PUBLIC_CONTACT_MESSENGER_USERNAME,
  ),
  viberUrl: envValue(
    process.env.NEXT_PUBLIC_CONTACT_VIBER_URL,
  ),
  whatsappUrl: envValue(
    process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_URL,
  ),
  address: envValue(
    process.env.NEXT_PUBLIC_CONTACT_ADDRESS,
  ),
  openingHours: envValue(
    process.env.NEXT_PUBLIC_OPENING_HOURS,
  ),
} as const;

function phoneHref(phone: string) {
  const dialable = phone.replace(/[^\d+]/g, "");

  return dialable ? `tel:${dialable}` : "";
}

function emailHref(email: string, subject: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

const primaryPhone = {
  label: "Primary phone",
  value: "+95 9 678 884898",
  href: phoneHref("+95 9 678 884898"),
} as const;

const additionalPhone = {
  label: "Additional phone",
  value: "+95 9 42173 6316",
  href: phoneHref("+95 9 42173 6316"),
} as const;

const email = {
  label: "Email",
  value: "starinvitationcards94@gmail.com",
  href: emailHref(
    "starinvitationcards94@gmail.com",
    "Elegant Star Stationery Enquiry",
  ),
} as const;

const instagram = {
  label: "Instagram",
  value: "@elegant_star_invitations_",
  href: "https://www.instagram.com/elegant_star_invitations_/",
} as const;

const facebook = {
  label: "Facebook",
  value: "Elegant Star - Invitations & Creation",
  href: "https://www.facebook.com/share/1CswnjjZyQ/?mibextid=wwXIfr",
} as const;

/*
 * Add NEXT_PUBLIC_CONTACT_MESSENGER_USERNAME when the official Facebook
 * username is known. The numeric Page ID remains as a fallback.
 *
 * A complete Messenger URL can also be supplied through:
 * NEXT_PUBLIC_CONTACT_MESSENGER_URL
 */
const messengerPageId = "61564479194348";

const messengerTarget =
  publicConfig.messengerUsername || messengerPageId;

const messenger = {
  label: "Messenger",
  value: "Elegant Star Messenger",
  pageId: messengerPageId,
  username: publicConfig.messengerUsername,
  href:
    publicConfig.messengerUrl ||
    `https://m.me/${messengerTarget}`,
} as const;

/*
 * Use the HTTPS Viber link as the primary URL.
 * It is more reliable on mobile than a viber:// custom scheme.
 */
const viberNumber = "959678884898";
const viberWebUrl = `https://viber.me/${viberNumber}`;

const viber = {
  label: "Viber",
  displayNumber: "+95 9 678 884898",
  number: viberNumber,
  href: publicConfig.viberUrl || viberWebUrl,
  fallbackUrl: viberWebUrl,
} as const;

const maps = {
  label: "Google Maps",
  value: "Elegant Star Invitations & Creation showroom",
  href: "https://maps.app.goo.gl/pP2yhWbtm7HigZ687",
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.10340647915!2d96.12622507467137!3d16.82122541886916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1edddfcbc48f5%3A0x56e1aa09f79a7a56!2sElegant%20Star%20Invitations%20%26%20Creation!5e0!3m2!1sen!2smy!4v1781530865745!5m2!1sen!2smy",
} as const;

export type ContactChannelKind =
  | "instagram"
  | "facebook"
  | "email"
  | "phone"
  | "location"
  | "messenger"
  | "viber"
  | "whatsapp";

export type ContactChannel = {
  kind: ContactChannelKind;
  label: string;
  value: string;
  description: string;
  action: string;
  href: string;

  /*
   * The contact page currently uses this field to decide whether it should
   * open the link in a new browser tab.
   *
   * App links such as Messenger, Viber and WhatsApp should remain false.
   */
  external: boolean;

  layout: "featured" | "wide";
};

const optionalMessagingChannels = (
  [
    {
      kind: "messenger",
      label: messenger.label,
      value: messenger.value,
      description:
        "Send a direct message with reference images or questions.",
      action: "Open Messenger",
      href: messenger.href,

      /*
       * Do not open Messenger in a new tab on mobile.
       */
      external: false,
      layout: "wide",
    },
    {
      kind: "viber",
      label: viber.label,
      value: viber.displayNumber,
      description:
        "Open a direct Viber conversation with the studio.",
      action: "Open Viber",
      href: viber.href,

      /*
       * Do not create a blank tab before opening Viber.
       */
      external: false,
      layout: "wide",
    },
    {
      kind: "whatsapp",
      label: "WhatsApp",
      value: "WhatsApp",
      description:
        "Open a direct WhatsApp conversation with the studio.",
      action: "Open WhatsApp",
      href: publicConfig.whatsappUrl,
      external: false,
      layout: "wide",
    },
  ] satisfies ContactChannel[]
).filter((channel) => Boolean(channel.href));

export const contactChannels: ContactChannel[] = [
  {
    kind: "instagram",
    label: instagram.label,
    value: instagram.value,
    description:
      "Browse recent work, save references and send a direct message.",
    action: "Open Instagram",
    href: instagram.href,
    external: true,
    layout: "featured",
  },
  {
    kind: "facebook",
    label: facebook.label,
    value: facebook.value,
    description:
      "Visit the official Facebook page for updates and enquiries.",
    action: "Open Facebook",
    href: facebook.href,
    external: true,
    layout: "featured",
  },
  {
    kind: "email",
    label: email.label,
    value: email.value,
    description:
      "Best for detailed enquiries, reference images and written information.",
    action: "Send an email",
    href: email.href,
    external: false,
    layout: "featured",
  },
  {
    kind: "phone",
    label: primaryPhone.label,
    value: primaryPhone.value,
    description:
      "Call directly to discuss availability or an existing enquiry.",
    action: "Call this number",
    href: primaryPhone.href,
    external: false,
    layout: "wide",
  },
  {
    kind: "phone",
    label: additionalPhone.label,
    value: additionalPhone.value,
    description:
      "An additional contact number for direct assistance.",
    action: "Call this number",
    href: additionalPhone.href,
    external: false,
    layout: "wide",
  },
  ...optionalMessagingChannels,
];

export const contactDetails = {
  primaryPhone,
  additionalPhone,
  phones: [primaryPhone, additionalPhone],

  phone: primaryPhone.value,
  phoneHref: primaryPhone.href,

  email,
  instagram,
  facebook,
  messenger,
  viber,
  maps,

  mapsUrl: maps.href,
  mapsEmbedUrl: maps.embedUrl,

  messengerPageId: messenger.pageId,
  messengerUsername: messenger.username,
  messengerUrl: messenger.href,

  viberDisplayNumber: viber.displayNumber,
  viberNumber: viber.number,
  viberUrl: viber.href,
  viberFallbackUrl: viber.fallbackUrl,

  productionSiteUrl: publicConfig.siteUrl,
  whatsappUrl: publicConfig.whatsappUrl,

  address: publicConfig.address || maps.value,
  openingHours: publicConfig.openingHours,

  channels: contactChannels,
};

export const siteConfig = {
  name: "Elegant Star",
  legalName: "ELEGANT STAR",
  descriptor: "Invitations & Creation",
  tagline: "Beautiful beginnings, thoughtfully created.",
  description:
    "Elegant invitation design, certificate folders and coordinated stationery for weddings and meaningful celebrations.",
  logoPath: siteMedia.brand.mainLogo,
  logo: siteMedia.brand.logos,
  openGraphImage: siteMedia.brand.openGraphImage,
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Stories", href: "/stories" },
  { label: "Our Craft", href: "/our-craft" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const companyCopy = {
  homeStatement:
    "Elegant Star brings together invitation design, certificate folders, coordinated pieces and finishing details so every celebration begins with a thoughtful first impression.",

  brandStory:
    "The work starts with the feeling of the occasion, then moves through wording, format, colour, paper character and presentation.",

  aboutIntro:
    "Elegant Star is an invitation and stationery studio creating customisable pieces for weddings, family ceremonies, openings and special events.",

  approach:
    "Customers can begin with an existing direction or share references. The team then helps shape wording, colour, format and coordinated pieces around the occasion.",

  collaboration:
    "Every photographed design is a starting point. Exact materials, finishing methods, quantities and timelines are confirmed during enquiry.",

  studio:
    "The website uses real Elegant Star product, showroom and celebration photography while keeping client identities private in public titles and metadata.",

  contactMessage:
    "Share the collection reference, event type, preferred quantity, date and any colour or wording ideas.",
};

export const faqItems = [
  {
    question: "Can the wording be customised?",
    answer:
      "Yes. Names, event details and invitation wording can be prepared around the occasion before production.",
  },
  {
    question: "Can colours or formats be adjusted?",
    answer:
      "Many directions can be adapted. The suitable options depend on the chosen format, artwork and finishing details.",
  },
  {
    question:
      "Do you create certificate folders and coordinated pieces?",
    answer:
      "Yes. The library includes invitation suites, marriage certificate folders, fans, boxes and coordinated stationery.",
  },
  {
    question: "How do I request a quotation?",
    answer:
      "Send a collection reference, quantity, event date and customisation notes through the available contact method.",
  },
  {
    question:
      "Are all photographed finishes always available?",
    answer:
      "Availability, materials and timelines should be confirmed with the Elegant Star team before ordering.",
  },
];