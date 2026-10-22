import type { Metadata } from "next";
import { EnvelopeHero } from "@/components/home/EnvelopeHero";
import { SeamlessBrandIntroduction } from "@/components/home/SeamlessBrandIntroduction";
import { InteractiveFeaturedCollections } from "@/components/home/InteractiveFeaturedCollections";
import { ScrollDrivenStory } from "@/components/home/ScrollDrivenStory";
import { VisualCategoryExplorer } from "@/components/home/VisualCategoryExplorer";
import { InteractiveCraftsmanship } from "@/components/home/InteractiveCraftsmanship";
import { SimpleOrderingProcess } from "@/components/home/SimpleOrderingProcess";
import { ClientTestimonial } from "@/components/home/ClientTestimonial";
import { SocialMediaShowcase } from "@/components/home/SocialMediaShowcase";
import { siteMedia } from "@/data/siteMedia";
import { MyanmarInvitationSeo } from "@/components/home/MyanmarInvitationSeo";

const homepageSearchImage = siteMedia.brand.openGraphImage;
const homepageTitle = "Elegant Star Myanmar | Wedding Invitations & Stationery";
const homepageDescription =
  "Elegant Star Myanmar (Elegant Star Yangon) creates wedding invitations, custom invitation cards, marriage certificate folders and stationery in Yangon. မင်္ဂလာဖိတ်စာ၊ ဖိတ်စာဒီဇိုင်းနှင့် ရန်ကုန် ဖိတ်စာဝန်ဆောင်မှုများ။";

export const metadata: Metadata = {
  title: { absolute: homepageTitle },
  description: homepageDescription,
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "x-default": "/",
    },
  },
  keywords: [
    "Elegant Star Myanmar",
    "Elegant Star Yangon",
    "Elegant Star invitation",
    "Elegant Star ဖိတ်စာ",
    "ဖိတ်စာ",
    "မင်္ဂလာဆောင် ဖိတ်စာ",
    "မင်္ဂလာဖိတ်စာ",
    "မင်္ဂလာဖိတ်စာ ဒီဇိုင်း",
    "ရန်ကုန် ဖိတ်စာ",
    "မြန်မာနိုင်ငံ ဖိတ်စာ",
    "ဖိတ်စာ ဝန်ဆောင်မှု",
    "မင်္ဂလာပွဲ ဝန်ဆောင်မှု",
    "wedding invitations Myanmar",
    "wedding invitation cards Yangon",
    "marriage certificate folders Myanmar",
  ],
  openGraph: {
    title: homepageTitle,
    description: homepageDescription,
    url: "/",
    type: "website",
    images: [
      {
        url: homepageSearchImage,
        alt: "Elegant Star wedding invitation and stationery showroom in Yangon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homepageTitle,
    description: homepageDescription,
    images: [homepageSearchImage],
  },
};

export default function HomePage() {
  return (
    <>
      <EnvelopeHero />
      <SeamlessBrandIntroduction />
      <InteractiveFeaturedCollections />
      <ScrollDrivenStory />
      <VisualCategoryExplorer />
      <InteractiveCraftsmanship />
      <SimpleOrderingProcess />
      <ClientTestimonial />
      <SocialMediaShowcase />
      <MyanmarInvitationSeo />
    </>
  );
}
