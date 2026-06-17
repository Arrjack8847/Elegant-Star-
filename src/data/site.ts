import { siteMedia } from "@/data/siteMedia";

function publicEnv(name: string, fallback = "") {
  return process.env[name]?.trim() || fallback;
}

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
  external: boolean;
  layout: "featured" | "wide";
};

const optionalMessagingChannels = (
  [
    {
      kind: "messenger",
      label: "Messenger",
      value: "Messenger",
      description: "Send a quick direct message with references or questions.",
      action: "Open Messenger",
      href: publicEnv("NEXT_PUBLIC_CONTACT_MESSENGER_URL"),
      external: true,
      layout: "wide",
    },
    {
      kind: "viber",
      label: "Viber",
      value: "Viber",
      description:
        "Message the studio directly when a Viber link is available.",
      action: "Open Viber",
      href: publicEnv("NEXT_PUBLIC_CONTACT_VIBER_URL"),
      external: true,
      layout: "wide",
    },
    {
      kind: "whatsapp",
      label: "WhatsApp",
      value: "WhatsApp",
      description:
        "Message the studio directly when a WhatsApp link is available.",
      action: "Open WhatsApp",
      href: publicEnv("NEXT_PUBLIC_CONTACT_WHATSAPP_URL"),
      external: true,
      layout: "wide",
    },
  ] satisfies ContactChannel[]
).filter((channel) => channel.href);

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
    description: "Visit the official Facebook page for updates and enquiries.",
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
    description: "An additional contact number for direct assistance.",
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
  maps,
  mapsUrl: maps.href,
  mapsEmbedUrl: maps.embedUrl,
  messengerUrl: publicEnv("NEXT_PUBLIC_CONTACT_MESSENGER_URL"),
  viberUrl: publicEnv("NEXT_PUBLIC_CONTACT_VIBER_URL"),
  whatsappUrl: publicEnv("NEXT_PUBLIC_CONTACT_WHATSAPP_URL"),
  address: publicEnv("NEXT_PUBLIC_CONTACT_ADDRESS", maps.value),
  openingHours: publicEnv("NEXT_PUBLIC_OPENING_HOURS"),
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
  { label: "Gallery", href: "/gallery" },
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
    question: "Do you create certificate folders and coordinated pieces?",
    answer:
      "Yes. The library includes invitation suites, marriage certificate folders, fans, boxes and coordinated stationery.",
  },
  {
    question: "How do I request a quotation?",
    answer:
      "Send a collection reference, quantity, event date and customisation notes through the available contact method.",
  },
  {
    question: "Are all photographed finishes always available?",
    answer:
      "Availability, materials and timelines should be confirmed with the Elegant Star team before ordering.",
  },
];
