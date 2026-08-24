import type { Metadata } from "next";

import { AboutApproach } from "@/components/about/AboutApproach";
import { AboutCTA } from "@/components/about/AboutCTA";
import { AboutExperience } from "@/components/about/AboutExperience";
import { AboutHero } from "@/components/about/AboutHero";
import { GuidedCustomisation } from "@/components/about/GuidedCustomisation";
import { StudioStory } from "@/components/about/StudioStory";
import { companyCopy } from "@/data/site";
import { siteMedia } from "@/data/siteMedia";

export const metadata: Metadata = {
  title: "About Our Invitation Studio in Yangon",
  description:
    "Learn about Elegant Star, a Yangon invitation and stationery studio creating wedding invitations, certificate folders and coordinated celebration pieces.",
};

const heroSlides = [
  {
    src: siteMedia.brand.showroom.showroom11,
    alt: "Elegant Star showroom with invitation suites and stationery references",
    caption: "A physical library of invitation and stationery ideas",
  },
  {
    src: siteMedia.brand.showroom.showroom07,
    alt: "Elegant Star invitation collections and presentation pieces",
    caption: "Collections to compare, adapt and coordinate",
  },
  {
    src: siteMedia.brand.showroom.showroom16,
    alt: "Elegant Star stationery displayed inside the studio",
    caption: "Materials, finishes and presentation details",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <AboutHero
        intro={companyCopy.aboutIntro}
        supportingCopy={companyCopy.brandStory}
        slides={heroSlides}
      />

      <AboutApproach copy={companyCopy.approach} />

      <GuidedCustomisation
        copy={companyCopy.collaboration}
        primaryImage={siteMedia.brand.showroom.showroom03}
        secondaryImage={siteMedia.brand.showroom.showroom15}
      />

      <StudioStory
        copy={companyCopy.studio}
        videoSrc={siteMedia.brand.showroom.studioVideo}
        poster={siteMedia.brand.showroom.showroom13}
      />

      <AboutExperience image={siteMedia.brand.showroom.showroom12} />

      <AboutCTA />
    </>
  );
}
