import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Layers3,
  MessageCircleMore,
  Palette,
} from "lucide-react";

import { EnquiryButton } from "@/components/enquiry/EnquiryButton";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { companyCopy } from "@/data/site";
import { siteMedia } from "@/data/siteMedia";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Elegant Star's invitation, certificate folder and coordinated stationery approach.",
};

const principles = [
  {
    number: "01",
    title: "Begin visually",
    text: "Explore physical invitation suites, materials, shapes and presentation formats before refining the final direction.",
    icon: Palette,
  },
  {
    number: "02",
    title: "Adapt thoughtfully",
    text: "Colours, wording, finishing and supporting pieces can be shaped around the occasion rather than treated as fixed templates.",
    icon: MessageCircleMore,
  },
  {
    number: "03",
    title: "Coordinate completely",
    text: "Invitations, folders, boxes and event stationery are considered together as one connected visual family.",
    icon: Layers3,
  },
] as const;

const storySections = [
  {
    number: "01",
    label: "The approach",
    title: "Guided customisation",
    text: companyCopy.approach,
    image: siteMedia.brand.showroom.showroom03,
    imageAlt:
      "Elegant Star invitation and stationery references displayed in the showroom",
    objectPosition: "center",
  },
  {
    number: "02",
    label: "The collections",
    title: "Starting points with room to adapt",
    text: companyCopy.collaboration,
    image: siteMedia.brand.showroom.showroom07,
    imageAlt:
      "A selection of Elegant Star invitation collections and presentation pieces",
    objectPosition: "center",
  },
  {
    number: "03",
    label: "The physical library",
    title: "A growing source of ideas",
    text: "The showroom reflects the breadth of invitation suites, certificate folders, presentation boxes, fans and coordinated event stationery available as visual and physical references.",
    image: siteMedia.brand.showroom.showroom11,
    imageAlt:
      "Elegant Star showroom with invitation suites, folders and event stationery",
    objectPosition: "center",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className={cn(
          "page-top section-shell overflow-hidden",
          "!pb-14 !pt-32",
          "sm:!pb-20 sm:!pt-40",
          "lg:!pb-24 lg:!pt-36",
        )}
        data-nav-theme="light"
        aria-labelledby="about-page-heading"
      >
        <div className="section-inner">
          <RevealGroup
            className={cn(
              "grid min-w-0 gap-10",
              "lg:grid-cols-[minmax(0,0.92fr)_minmax(22rem,1.08fr)]",
              "lg:items-end lg:gap-14",
              "xl:gap-20",
            )}
            stagger={0.08}
            start="top 84%"
          >
            <div className="min-w-0">
              <p className="small-label text-brand-sage">About Elegant Star</p>

              <h1
                id="about-page-heading"
                className={cn(
                  "mt-5 max-w-[11ch]",
                  "font-display font-normal text-brand-olive",
                  "text-[2.9rem] leading-[0.94]",
                  "sm:text-[4.15rem]",
                  "lg:text-[4.65rem]",
                  "xl:text-[5.15rem]",
                )}
              >
                The celebration begins before the day itself.
              </h1>
            </div>

            <div className="min-w-0 lg:pb-1">
              <p
                className={cn(
                  "max-w-[39rem]",
                  "font-display text-[1.38rem] leading-[1.2]",
                  "text-brand-olive/90",
                  "sm:text-[1.85rem]",
                )}
              >
                {companyCopy.brandStory}
              </p>

              <p className="body-copy mt-6 max-w-[39rem] text-base leading-8">
                {companyCopy.aboutIntro}
              </p>

              <div className="mt-8 flex flex-col items-start gap-4 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center sm:gap-5">
                <Link
                  href="/collections"
                  className={cn(
                    "group inline-flex items-center gap-3",
                    "rounded-full bg-brand-olive",
                    "px-5 py-3.5",
                    "text-sm font-bold text-brand-white",
                    "shadow-[0_14px_32px_rgba(48,50,41,0.16)]",
                    "transition-[transform,background-color,box-shadow]",
                    "duration-300",
                    "hover:-translate-y-0.5",
                    "hover:bg-brand-olive/92",
                    "hover:shadow-[0_20px_42px_rgba(48,50,41,0.2)]",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-brand-champagne",
                    "focus-visible:ring-offset-4",
                    "focus-visible:ring-offset-brand-ivory",
                  )}
                >
                  Explore collections
                  <ArrowUpRight
                    size={17}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>

                <Link
                  href="/contact"
                  className={cn(
                    "group inline-flex items-center gap-2",
                    "border-b border-brand-sage/45 pb-1",
                    "text-sm font-bold text-brand-olive",
                    "transition-colors duration-300",
                    "hover:border-brand-olive",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-brand-sage",
                  )}
                >
                  Visit the showroom
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </RevealGroup>

          {/* Hero showroom image */}
          <ImageReveal
            className={cn(
              "relative mt-12 overflow-hidden",
              "rounded-[1.6rem]",
              "border border-brand-olive/10",
              "bg-brand-paper",
              "shadow-[0_28px_70px_rgba(48,50,41,0.12)]",
              "sm:mt-14 sm:rounded-[2rem]",
              "lg:mt-16",
            )}
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2.2/1]">
              <Image
                src={siteMedia.brand.showroom.cover}
                alt="Elegant Star showroom and physical stationery collection"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 639px) 100vw, (max-width: 1279px) 94vw, 1180px"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-olive/30 via-transparent to-transparent"
              />

              <div
                className={cn(
                  "absolute bottom-5 left-5 right-5",
                  "flex flex-col gap-2",
                  "rounded-[1rem]",
                  "border border-brand-white/20",
                  "bg-brand-olive/45",
                  "px-4 py-4 text-brand-white",
                  "backdrop-blur-md",
                  "sm:bottom-7 sm:left-7 sm:right-auto",
                  "sm:max-w-[25rem] sm:px-5",
                )}
              >
                <p className="small-label text-brand-champagne">
                  Invitation &amp; stationery studio
                </p>

                <p className="text-sm leading-6 text-brand-white/78">
                  A physical library of invitation suites, finishes and
                  coordinated presentation ideas.
                </p>
              </div>
            </div>
          </ImageReveal>
        </div>
      </section>

      {/* Brand belief */}
      <section
        className={cn(
          "section-shell bg-brand-white/42",
          "!py-20 sm:!py-24 lg:!py-28",
        )}
        data-nav-theme="light"
        aria-labelledby="brand-belief-heading"
      >
        <div className="section-inner">
          <RevealGroup
            className={cn(
              "grid gap-9",
              "lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]",
              "lg:items-end lg:gap-16",
            )}
            stagger={0.08}
            start="top 84%"
          >
            <div>
              <p className="small-label text-brand-sage">What we believe</p>

              <h2
                id="brand-belief-heading"
                className={cn(
                  "mt-4 max-w-[10ch]",
                  "font-display font-normal text-brand-olive",
                  "text-[2.7rem] leading-[0.96]",
                  "sm:text-[3.7rem]",
                  "lg:text-[4.05rem]",
                )}
              >
                Stationery is part of the celebration.
              </h2>
            </div>

            <div className="max-w-[43rem] lg:justify-self-end">
              <p
                className={cn(
                  "font-display text-[1.45rem] leading-[1.22]",
                  "text-brand-olive/88",
                  "sm:text-[2rem]",
                )}
              >
                Before guests arrive at the occasion, they experience the
                invitation.
              </p>

              <p className="body-copy mt-5 text-base leading-8">
                Its paper, colour, wording and presentation introduce the mood
                of the celebration and create one of its first physical
                memories.
              </p>
            </div>
          </RevealGroup>

          {/* Principles */}
          <RevealGroup
            className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-14"
            stagger={0.06}
            start="top 82%"
          >
            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className={cn(
                    "group motion-card-lift relative min-w-0 overflow-hidden",
                    "rounded-[1.45rem]",
                    "border border-brand-olive/10",
                    "bg-brand-white/62",
                    "p-6 sm:p-7",
                    "shadow-[0_16px_42px_rgba(48,50,41,0.07)]",
                    "motion-reduce:transition-none",
                    "hover:border-brand-olive/15",
                    "hover:bg-brand-white/90",
                    "hover:shadow-[0_24px_56px_rgba(48,50,41,0.11)]",
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="small-label text-brand-sage">{item.number}</p>

                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center",
                        "rounded-full",
                        "border border-brand-olive/10",
                        "bg-brand-ivory/70",
                        "text-brand-sage",
                      )}
                    >
                      <Icon size={17} aria-hidden="true" />
                    </span>
                  </div>

                  <h3
                    className={cn(
                      "mt-7 font-display font-normal",
                      "text-[2rem] leading-[1]",
                      "text-brand-olive",
                    )}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-brand-olive/66">
                    {item.text}
                  </p>

                  <span
                    aria-hidden="true"
                    className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-brand-sage/55 transition-transform duration-500 group-hover:scale-x-100"
                  />
                </article>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Editorial stories */}
      <section
        className={cn("section-shell", "!py-20 sm:!py-24 lg:!py-28")}
        data-nav-theme="light"
        aria-label="Elegant Star's approach"
      >
        <div className="section-inner space-y-20 sm:space-y-24 lg:space-y-28">
          {storySections.map((section, index) => {
            const imageOnRight = index % 2 === 1;

            return (
              <article
                key={section.number}
                className={cn(
                  "grid min-w-0 gap-8",
                  "lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)]",
                  "lg:items-center lg:gap-12",
                  "xl:gap-16",
                )}
              >
                <ImageReveal
                  className={cn(
                    "relative min-w-0 overflow-hidden",
                    "rounded-[1.55rem]",
                    "border border-brand-olive/10",
                    "bg-brand-paper",
                    "shadow-[0_24px_60px_rgba(48,50,41,0.11)]",
                    imageOnRight && "lg:order-2",
                  )}
                >
                  <div className="relative aspect-[4/3] sm:aspect-[5/3] lg:aspect-[1.16/1]">
                    <Image
                      src={section.image}
                      alt={section.imageAlt}
                      fill
                      className={cn(
                        "object-cover",
                        "transition-transform duration-700",
                        "ease-[cubic-bezier(0.22,1,0.36,1)]",
                        "motion-reduce:transition-none hover:scale-[1.025]",
                      )}
                      style={{
                        objectPosition: section.objectPosition,
                      }}
                      sizes="(max-width: 1023px) 100vw, 56vw"
                    />
                  </div>

                  <div
                    className={cn(
                      "absolute left-5 top-5",
                      "rounded-full",
                      "border border-brand-white/45",
                      "bg-brand-white/78",
                      "px-3.5 py-2",
                      "small-label text-brand-olive",
                      "shadow-[0_8px_24px_rgba(48,50,41,0.12)]",
                      "backdrop-blur-md",
                      "sm:left-6 sm:top-6",
                    )}
                  >
                    {section.number}
                  </div>
                </ImageReveal>

                <RevealGroup
                  className={cn(
                    "min-w-0 max-w-xl",
                    imageOnRight && "lg:order-1",
                  )}
                  stagger={0.07}
                  start="top 84%"
                >
                  <div className="flex items-center gap-4">
                    <p className="small-label shrink-0 text-brand-sage">
                      {section.label}
                    </p>

                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-brand-olive/12"
                    />
                  </div>

                  <h2
                    className={cn(
                      "mt-5 text-balance",
                      "font-display font-normal text-brand-olive",
                      "text-[2.45rem] leading-[0.97]",
                      "sm:text-[3.45rem]",
                      "lg:text-[3.7rem]",
                    )}
                  >
                    {section.title}
                  </h2>

                  <p className="body-copy mt-6 text-base leading-8">
                    {section.text}
                  </p>

                  <div
                    aria-hidden="true"
                    className="mt-8 flex items-center gap-3"
                  >
                    <span className="h-px w-10 bg-brand-sage/55" />

                    <span className="text-[0.63rem] font-bold uppercase tracking-[0.17em] text-brand-sage">
                      Elegant Star
                    </span>
                  </div>
                </RevealGroup>
              </article>
            );
          })}
        </div>
      </section>

      {/* Showroom teaser */}
      <section
        className={cn(
          "section-shell bg-brand-white/42",
          "!py-20 sm:!py-24 lg:!py-28",
        )}
        data-nav-theme="light"
        aria-labelledby="showroom-heading"
      >
        <RevealGroup
          className={cn(
            "section-inner grid overflow-hidden",
            "rounded-[1.75rem]",
            "border border-brand-olive/10",
            "bg-brand-white/65",
            "shadow-[0_24px_64px_rgba(48,50,41,0.1)]",
            "lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)]",
          )}
          stagger={0.08}
          start="top 84%"
        >
          <div className="relative min-h-[21rem] sm:min-h-[27rem] lg:min-h-[31rem]">
            <Image
              src={siteMedia.brand.showroom.showroom11}
              alt="Inside the Elegant Star showroom"
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 58vw"
            />
          </div>

          <div
            className={cn(
              "flex flex-col justify-center",
              "px-6 py-9",
              "sm:px-9 sm:py-12",
              "lg:px-11 lg:py-14",
            )}
          >
            <p className="small-label text-brand-sage">Visit the showroom</p>

            <h2
              id="showroom-heading"
              className={cn(
                "mt-4 font-display font-normal",
                "text-[2.5rem] leading-[0.97]",
                "text-brand-olive",
                "sm:text-[3.5rem]",
              )}
            >
              See, compare and begin with a clearer direction.
            </h2>

            <p className="body-copy mt-6 text-base leading-8">
              Explore physical invitation samples, compare materials and
              presentation formats, and discuss how a collection can be adapted
              for the occasion.
            </p>

            <Link
              href="/contact"
              className={cn(
                "group mt-8 inline-flex w-fit items-center gap-3",
                "border-b border-brand-sage/45 pb-1",
                "text-sm font-bold text-brand-olive",
                "transition-colors duration-300",
                "hover:border-brand-olive",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-brand-sage",
              )}
            >
              View location and contact details
              <ArrowUpRight
                size={17}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </RevealGroup>
      </section>

      {/* Final CTA */}
      <section
        className={cn(
          "section-shell",
          "!pb-24 !pt-12",
          "sm:!pb-28 sm:!pt-14",
          "lg:!pb-32",
        )}
        data-nav-theme="light"
        aria-labelledby="about-enquiry-heading"
      >
        <div className="section-inner">
          <RevealGroup
            className={cn(
              "relative isolate overflow-hidden",
              "rounded-[1.85rem]",
              "bg-brand-olive",
              "px-6 py-10 text-brand-ivory",
              "shadow-[0_28px_72px_rgba(48,50,41,0.2)]",
              "sm:px-9 sm:py-12",
              "lg:grid lg:grid-cols-[minmax(0,1fr)_auto]",
              "lg:items-end lg:gap-12",
              "lg:px-12 lg:py-14",
            )}
            stagger={0.08}
            start="top 84%"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border border-brand-white/10"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-10 h-48 w-48 rounded-full border border-brand-champagne/15"
            />

            <div className="relative z-10 max-w-[50rem]">
              <p className="small-label text-brand-champagne">
                Begin a conversation
              </p>

              <h2
                id="about-enquiry-heading"
                className={cn(
                  "mt-4 max-w-[14ch]",
                  "font-display font-normal",
                  "text-[2.5rem] leading-[0.97]",
                  "sm:text-[3.7rem]",
                  "lg:text-[4.15rem]",
                )}
              >
                Begin with a collection, a colour, or simply a feeling.
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-brand-ivory/68 sm:text-base">
                Share the occasion, preferred direction and any stationery
                pieces you would like to coordinate.
              </p>
            </div>

            <div className="relative z-10 mt-8 lg:mt-0 lg:pb-1">
              <EnquiryButton variant="dark" />
            </div>
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
