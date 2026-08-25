import type { Metadata } from "next";
import { EnvelopeHero } from "@/components/home/EnvelopeHero";
import { SeamlessBrandIntroduction } from "@/components/home/SeamlessBrandIntroduction";
import { YangonInvitationServices } from "@/components/home/YangonInvitationServices";
import { InteractiveFeaturedCollections } from "@/components/home/InteractiveFeaturedCollections";
import { ScrollDrivenStory } from "@/components/home/ScrollDrivenStory";
import { VisualCategoryExplorer } from "@/components/home/VisualCategoryExplorer";
import { InteractiveCraftsmanship } from "@/components/home/InteractiveCraftsmanship";
import { SimpleOrderingProcess } from "@/components/home/SimpleOrderingProcess";
import { ClientTestimonial } from "@/components/home/ClientTestimonial";
import { SocialMediaShowcase } from "@/components/home/SocialMediaShowcase";

const homepageSearchImage =
  "/media/brand/showroom/elegant-star__showroom-cover.jpg";

export const metadata: Metadata = {
  title: "Wedding Invitation Cards & Stationery Yangon",
  description:
    "Discover custom wedding invitation cards, marriage certificate folders and coordinated wedding stationery in Yangon, Myanmar. Explore Elegant Star designs and enquire for personalisation.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      my: "/my",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Wedding Invitation Cards & Stationery Yangon | Elegant Star",
    description:
      "Explore custom wedding invitation cards, marriage certificate folders and coordinated wedding stationery from Elegant Star in Yangon, Myanmar.",
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
    title: "Wedding Invitation Cards & Stationery Yangon | Elegant Star",
    description:
      "Explore custom wedding invitation cards, marriage certificate folders and coordinated wedding stationery from Elegant Star in Yangon, Myanmar.",
    images: [homepageSearchImage],
  },
};

export default function HomePage() {
  return (
    <>
      <EnvelopeHero />
      <SeamlessBrandIntroduction />
      <YangonInvitationServices />
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
