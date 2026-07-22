import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getStoryBySlug,
  realStories,
  type RealStory,
  type StoryGalleryItem,
} from "@/data/stories";
import { EnquiryButton } from "@/components/enquiry/EnquiryButton";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { cn } from "@/lib/utils";

type StoryHeroStyle = CSSProperties & {
  "--story-hero-position-mobile": string;
  "--story-hero-position-tablet": string;
  "--story-hero-position-desktop": string;
};

function getHeroStyle(story: RealStory): StoryHeroStyle {
  const desktop = story.heroFocus?.desktop ?? "50% 50%";
  const tablet = story.heroFocus?.tablet ?? desktop;

  return {
    "--story-hero-position-mobile": story.heroFocus?.mobile ?? tablet,
    "--story-hero-position-tablet": tablet,
    "--story-hero-position-desktop": desktop,
  };
}

function isWideGalleryItem(item: StoryGalleryItem, index: number, total: number) {
  return (
    item.layout === "wide" ||
    (index === total - 1 && total % 2 === 1)
  );
}

function getGalleryFrameClassName(
  item: StoryGalleryItem,
  index: number,
  total: number,
) {
  const wide = isWideGalleryItem(item, index, total);

  return cn(
    "relative overflow-hidden rounded-[20px] bg-brand-paper shadow-soft sm:rounded-[24px]",
    wide
      ? "aspect-[4/5] sm:aspect-[16/11] md:col-span-2 lg:aspect-[16/9]"
      : item.layout === "square"
        ? "aspect-square"
        : "aspect-[4/5]",
  );
}

function getGalleryImageSizes(
  item: StoryGalleryItem,
  index: number,
  total: number,
) {
  return isWideGalleryItem(item, index, total)
    ? "(max-width: 1180px) 100vw, 1180px"
    : "(max-width: 767px) 100vw, (max-width: 1180px) 50vw, 570px";
}

export function generateStaticParams() {
  return realStories.map((story) => ({ slug: story.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  return story
    ? {
        title: story.title,
        description: story.description,
        openGraph: {
          title: story.title,
          description: story.description,
          images: [story.coverImage],
        },
      }
    : { title: "Story Not Found" };
}
export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();
  const index = realStories.findIndex((item) => item.slug === slug);
  const next = realStories[(index + 1) % realStories.length];
  return (
    <>
      <section
        className="relative isolate min-h-[clamp(34rem,92svh,52rem)] overflow-hidden"
        data-nav-theme="dark"
      >
        <Image
          src={story.coverImage}
          alt={story.title}
          fill
          priority
          className="object-cover [object-position:var(--story-hero-position-mobile)] sm:[object-position:var(--story-hero-position-tablet)] lg:[object-position:var(--story-hero-position-desktop)]"
          sizes="100vw"
          style={getHeroStyle(story)}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(48,50,41,0.38)_0%,rgba(48,50,41,0.12)_40%,rgba(48,50,41,0.92)_100%)]" />
        <div className="section-inner relative z-10 flex min-h-[clamp(34rem,92svh,52rem)] items-end pb-10 pt-[calc(7rem+env(safe-area-inset-top))] text-brand-white sm:pb-14 sm:pt-[calc(8rem+env(safe-area-inset-top))] lg:pb-16">
          <RevealGroup
            className="max-w-[min(52rem,100%)]"
            start="top 84%"
          >
            <Link
              href="/stories"
              scroll={true}
              className="inline-flex min-h-10 items-center gap-2 rounded-full text-sm font-bold text-brand-ivory/72 transition hover:text-brand-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage"
            >
              <ArrowLeft size={17} /> All stories
            </Link>
            <p className="small-label mt-8 text-brand-champagne">
              {story.eyebrow}
            </p>
            <h1 className="display-heading mt-4 max-w-[11ch] whitespace-normal break-words text-[2.45rem] leading-[0.96] min-[360px]:text-[2.65rem] sm:max-w-[12ch] sm:text-[3.7rem] md:max-w-[13ch] md:text-[5rem] lg:max-w-none lg:text-[6.2rem] xl:text-[7rem]">
              {story.title}
            </h1>
            <p className="mt-5 max-w-[34ch] break-words text-base leading-8 text-brand-ivory/76 sm:mt-6 sm:max-w-2xl sm:text-lg">
              {story.description}
            </p>
          </RevealGroup>
        </div>
      </section>
      <section className="section-shell" data-nav-theme="light">
        <div className="section-inner">
          <RevealGroup
            className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:gap-5 xl:gap-6"
            stagger={0.06}
            start="top 82%"
          >
            {story.gallery.map((image, i) => (
              <ImageReveal
                key={`${image.src}-${i}`}
                className={getGalleryFrameClassName(
                  image,
                  i,
                  story.gallery.length,
                )}
              >
                <Image
                  src={image.src}
                  alt={`${story.title} celebration moment ${i + 1}`}
                  fill
                  className={cn(
                    image.fit === "contain" ? "object-contain" : "object-cover",
                  )}
                  sizes={getGalleryImageSizes(
                    image,
                    i,
                    story.gallery.length,
                  )}
                  style={{ objectPosition: image.objectPosition ?? "50% 50%" }}
                />
              </ImageReveal>
            ))}
          </RevealGroup>
          <RevealGroup className="mt-12 grid gap-7 rounded-[22px] bg-brand-olive p-5 text-brand-ivory sm:p-7 md:mt-14 md:rounded-[30px] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:p-10">
            <div>
              <p className="small-label text-brand-champagne">
                Inspired by this story?
              </p>
              <h2 className="mt-3 max-w-[11ch] whitespace-normal break-words font-display text-[2.2rem] leading-[1.04] min-[380px]:text-[2.35rem] sm:max-w-none sm:text-5xl">
                Begin with your own celebration.
              </h2>
            </div>
            <EnquiryButton
              variant="dark"
              className="w-full sm:w-auto"
              context={{
                message: `Hello Elegant Star, I was inspired by the story "${story.title}". I would like to discuss a stationery direction for my own celebration.`,
              }}
            >
              Start an enquiry
            </EnquiryButton>
          </RevealGroup>
          <Link
            href={`/stories/${next.slug}`}
            scroll={true}
            aria-label={`Next story: ${next.title}`}
            className="group mt-10 flex min-h-20 items-center justify-between gap-4 border-t border-brand-olive/12 py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage sm:gap-6"
          >
            <span className="min-w-0">
              <span className="small-label text-brand-sage">Next story</span>
              <span className="mt-2 block break-words font-display text-3xl leading-[1.02] sm:text-4xl">
                {next.title}
              </span>
            </span>
            <ArrowRight
              size={24}
              aria-hidden="true"
              className="shrink-0 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </>
  );
}
