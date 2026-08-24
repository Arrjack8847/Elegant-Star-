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

export const metadata: Metadata = {
  title: "Wedding Invitations & Stationery in Yangon",
  description:
    "Elegant Star creates wedding invitations, marriage certificate folders and coordinated stationery for celebrations in Yangon, Myanmar.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Wedding Invitations & Stationery in Yangon | Elegant Star",
    description:
      "Explore Elegant Star wedding invitations, marriage certificate folders and coordinated stationery in Yangon, Myanmar.",
    url: "/",
    type: "website",
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
