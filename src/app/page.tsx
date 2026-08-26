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

const homepageSearchImage = siteMedia.brand.openGraphImage;
const homepageTitle = "Elegant Star Myanmar | Wedding Invitations & Stationery";
const homepageDescription =
  "Discover Elegant Star, a Yangon wedding invitation studio creating custom invitation cards, marriage certificate folders and coordinated stationery for celebrations across Myanmar.";

export const metadata: Metadata = {
  title: { absolute: homepageTitle },
  description: homepageDescription,
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      my: "/my",
      "x-default": "/",
    },
  },
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
    </>
  );
}
