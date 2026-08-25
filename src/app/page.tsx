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

export const metadata: Metadata = {
  title: "Wedding Invitation Cards & Stationery Yangon",
  description:
    "Elegant Star is a wedding invitation and stationery service in Myanmar, creating custom wedding invitation cards, marriage certificate folders and coordinated stationery from Yangon.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Wedding Invitation Cards & Stationery Yangon | Elegant Star",
    description:
      "Elegant Star provides wedding invitation and stationery services in Myanmar, including custom invitation cards, marriage certificate folders and coordinated stationery from Yangon.",
    url: "/",
    type: "website",
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
