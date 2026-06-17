import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getStoryBySlug, realStories } from "@/data/stories";
import { EnquiryButton } from "@/components/enquiry/EnquiryButton";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealGroup } from "@/components/motion/RevealGroup";

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
      <section className="relative min-h-[88svh]" data-nav-theme="dark">
        <Image
          src={story.coverImage}
          alt={story.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-olive/90 via-brand-olive/15 to-brand-olive/30" />
        <div className="section-inner relative flex min-h-[88svh] items-end pb-12 pt-32 text-brand-white sm:pb-16 sm:pt-36">
          <RevealGroup className="max-w-4xl" start="top 84%">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-ivory/72"
            >
              <ArrowLeft size={17} /> All stories
            </Link>
            <p className="small-label mt-8 text-brand-champagne">
              {story.eyebrow}
            </p>
            <h1 className="display-heading mt-4 text-[clamp(3rem,15vw,5rem)] leading-[0.92] md:text-9xl">
              {story.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-brand-ivory/76 sm:mt-6 sm:text-lg">
              {story.description}
            </p>
          </RevealGroup>
        </div>
      </section>
      <section className="section-shell" data-nav-theme="light">
        <div className="section-inner">
          <RevealGroup
            className="grid gap-4 md:grid-cols-2 md:gap-5"
            stagger={0.06}
            start="top 82%"
          >
            {story.gallery.map((image, i) => (
              <ImageReveal
                key={image}
                className={`relative overflow-hidden rounded-[24px] bg-brand-paper shadow-soft ${i === 0 || i === 3 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/5]"}`}
              >
                <Image
                  src={image}
                  alt={`${story.title} scene ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes={
                    i === 0 || i === 3
                      ? "(max-width: 1180px) 100vw, 1180px"
                      : "(max-width: 767px) 100vw, 50vw"
                  }
                />
              </ImageReveal>
            ))}
          </RevealGroup>
          <RevealGroup className="mt-12 grid gap-7 rounded-[24px] bg-brand-olive p-5 text-brand-ivory sm:p-7 md:mt-14 md:grid-cols-[1fr_auto] md:items-center md:rounded-[30px] md:p-10">
            <div>
              <p className="small-label text-brand-champagne">
                Inspired by this story?
              </p>
              <h2 className="mt-3 font-display text-[2.5rem] leading-[1.02] sm:text-5xl">
                Begin with your own celebration.
              </h2>
            </div>
            <EnquiryButton
              variant="dark"
              context={{
                message: `Hello Elegant Star, I was inspired by the story “${story.title}”. I would like to discuss a stationery direction for my own celebration.`,
              }}
            >
              Start an enquiry
            </EnquiryButton>
          </RevealGroup>
          <Link
            href={`/stories/${next.slug}`}
            className="mt-10 flex min-h-16 items-center justify-between gap-5 border-t border-brand-olive/12 pt-8"
          >
            <span>
              <span className="small-label text-brand-sage">Next story</span>
              <span className="mt-2 block break-words font-display text-3xl leading-[1.02] sm:text-4xl">
                {next.title}
              </span>
            </span>
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </>
  );
}
