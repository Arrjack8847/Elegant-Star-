import { EnvelopeHero } from "@/components/home/EnvelopeHero";
import { SeamlessBrandIntroduction } from "@/components/home/SeamlessBrandIntroduction";
import { InteractiveFeaturedCollections } from "@/components/home/InteractiveFeaturedCollections";
import { ScrollDrivenStory } from "@/components/home/ScrollDrivenStory";
import { VisualCategoryExplorer } from "@/components/home/VisualCategoryExplorer";
import { InteractiveCraftsmanship } from "@/components/home/InteractiveCraftsmanship";
import { SimpleOrderingProcess } from "@/components/home/SimpleOrderingProcess";
import { DynamicGalleryPreview } from "@/components/home/DynamicGalleryPreview";
import { ClientTestimonial } from "@/components/home/ClientTestimonial";
import { GuidedEnquiryExperience } from "@/components/home/GuidedEnquiryExperience";

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
      <DynamicGalleryPreview />
      <ClientTestimonial />
      <GuidedEnquiryExperience />
    </>
  );
}
