import type { Metadata } from "next";
import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  Sparkles,
} from "lucide-react";

import { EnquiryButton } from "@/components/enquiry/EnquiryButton";
import { RevealGroup } from "@/components/motion/RevealGroup";
import {
  companyCopy,
  contactChannels,
  contactDetails,
  faqItems,
  type ContactChannelKind,
} from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Elegant Star Invitations & Creation, explore the showroom location and prepare an invitation or stationery enquiry.",
};

/* -------------------------------------------------------------------------- */
/*                               BRAND ICONS                                  */
/* -------------------------------------------------------------------------- */

type BrandIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function InstagramIcon({ size = 24, ...props }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />

      <circle cx="12" cy="12" r="4" />

      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 24, ...props }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M13.55 22v-8.3h2.8l.42-3.25h-3.22V8.38c0-.94.26-1.58 1.61-1.58h1.72V3.9a23.1 23.1 0 0 0-2.5-.13c-2.48 0-4.18 1.51-4.18 4.29v2.39H7.4v3.25h2.8V22h3.35Z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  DATA                                      */
/* -------------------------------------------------------------------------- */

const contactIconByKind = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  email: Mail,
  phone: Phone,
  location: MapPin,
  messenger: MessageCircle,
  viber: MessageCircle,
  whatsapp: MessageCircle,
} satisfies Record<ContactChannelKind, ComponentType<BrandIconProps>>;

const enquiryChecklist = [
  "The occasion or event type",
  "Your preferred invitation or stationery product",
  "An Elegant Star reference or inspiration image",
  "Estimated quantity and required date",
] as const;

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default function ContactPage() {
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
        aria-labelledby="contact-page-heading"
      >
        <div className="section-inner">
          <RevealGroup
            className={cn(
              "grid min-w-0 gap-10",
              "lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,1.1fr)]",
              "lg:items-end lg:gap-14",
              "xl:gap-20",
            )}
            stagger={0.08}
            start="top 84%"
          >
            <div className="min-w-0">
              <p className="small-label text-brand-sage">
                Contact Elegant Star
              </p>

              <h1
                id="contact-page-heading"
                className={cn(
                  "mt-5 max-w-[11ch]",
                  "font-display font-normal text-brand-olive",
                  "text-[2.85rem] leading-[0.94]",
                  "sm:text-[4.1rem]",
                  "lg:text-[4.6rem]",
                  "xl:text-[5.1rem]",
                )}
              >
                Start with a reference, or simply a feeling.
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
                Tell us about the occasion and the stationery direction you have
                in mind.
              </p>

              <p className="body-copy mt-6 max-w-[39rem] text-base leading-8">
                {companyCopy.contactMessage}
              </p>

              <div
                className={cn(
                  "mt-7 flex max-w-[39rem] items-start gap-3",
                  "rounded-[1rem]",
                  "border border-brand-olive/10",
                  "bg-brand-white/55",
                  "px-4 py-4",
                )}
              >
                <Clock3
                  size={18}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-brand-sage"
                />

                <p className="text-sm leading-6 text-brand-olive/65">
                  Include your occasion, estimated quantity, required date and
                  any reference images for clearer guidance.
                </p>
              </div>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* Contact channels */}
      <section
        className={cn(
          "section-shell bg-brand-white/42",
          "!py-20",
          "sm:!py-24",
          "lg:!py-28",
        )}
        data-nav-theme="light"
        aria-labelledby="contact-options-heading"
      >
        <div className="section-inner">
          <RevealGroup
            className={cn(
              "flex flex-col gap-6",
              "md:flex-row md:items-end md:justify-between",
            )}
            stagger={0.08}
            start="top 84%"
          >
            <div className="max-w-[43rem]">
              <p className="small-label text-brand-sage">
                Choose a contact method
              </p>

              <h2
                id="contact-options-heading"
                className={cn(
                  "mt-4 font-display font-normal",
                  "text-[2.55rem] leading-[0.97]",
                  "text-brand-olive",
                  "sm:text-[3.55rem]",
                  "lg:text-[3.9rem]",
                )}
              >
                Reach the studio directly.
              </h2>
            </div>

            <p className="body-copy max-w-md text-sm leading-7 md:text-right">
              Social messaging works well for quick references. Email is better
              for longer details and multiple attachments.
            </p>
          </RevealGroup>

          <RevealGroup
            className={cn(
              "mt-10 grid min-w-0 gap-4",
              "md:grid-cols-2",
              "xl:grid-cols-6",
            )}
            stagger={0.06}
            start="top 82%"
          >
            {contactChannels.map((channel) => {
              const Icon = contactIconByKind[channel.kind];

              return (
                <article
                  key={channel.label}
                  className={cn(
                    "group motion-card-lift relative min-w-0 overflow-hidden",
                    "rounded-[1.5rem]",
                    "border border-brand-olive/10",
                    "bg-brand-white/68",
                    "p-6 sm:p-7",
                    "shadow-[0_16px_44px_rgba(48,50,41,0.07)]",
                    "motion-reduce:transition-none",
                    "hover:border-brand-olive/15",
                    "hover:bg-brand-white/90",
                    "hover:shadow-[0_24px_58px_rgba(48,50,41,0.11)]",
                    channel.layout === "featured"
                      ? "xl:col-span-2"
                      : "xl:col-span-3",
                  )}
                >
                  <div className="flex items-start justify-between gap-5">
                    <span
                      className={cn(
                        "inline-flex h-12 w-12 shrink-0",
                        "items-center justify-center",
                        "rounded-full",
                        "border border-brand-olive/10",
                        "bg-brand-sage/10",
                        "text-brand-sage",
                      )}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </span>

                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                      className={cn(
                        "shrink-0 text-brand-sage/55",
                        "transition-transform duration-300",
                        "group-hover:-translate-y-0.5",
                        "group-hover:translate-x-0.5",
                      )}
                    />
                  </div>

                  <p className="small-label mt-7 text-brand-sage">
                    {channel.label}
                  </p>

                  <h3
                    className={cn(
                      "mt-2 min-w-0 break-words",
                      "font-display font-normal text-brand-olive",
                      channel.label === "Email"
                        ? "text-[1.25rem] leading-[1.12] sm:text-[1.55rem]"
                        : channel.label === "Facebook"
                          ? "text-[1.55rem] leading-[1.05] sm:text-[1.8rem]"
                          : "text-[1.75rem] leading-[1] sm:text-[2rem]",
                    )}
                  >
                    {channel.value}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-brand-olive/64">
                    {channel.description}
                  </p>

                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    className={cn(
                      "mt-7 inline-flex min-h-11",
                      "items-center gap-2",
                      "rounded-full",
                      "border border-brand-olive",
                      "bg-brand-olive px-5",
                      "text-sm font-bold text-brand-white",
                      "transition-[transform,background-color]",
                      "duration-300",
                      "hover:-translate-y-0.5",
                      "hover:bg-brand-olive/92",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-brand-champagne",
                      "focus-visible:ring-offset-4",
                      "focus-visible:ring-offset-brand-white",
                    )}
                  >
                    {channel.action}

                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>

                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute",
                      "-bottom-12 -right-8",
                      "h-36 w-36 rounded-full",
                      "border border-brand-sage/[0.08]",
                    )}
                  />
                </article>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Showroom map */}
      <section
        id="showroom-location"
        className={cn(
          "section-shell scroll-mt-[8.5rem]",
          "!py-20",
          "sm:!py-24",
          "lg:!py-28",
        )}
        data-nav-theme="light"
        aria-labelledby="showroom-location-heading"
      >
        <div className="section-inner">
          <RevealGroup
            className={cn(
              "grid min-w-0 overflow-hidden",
              "rounded-[1.8rem]",
              "border border-brand-olive/10",
              "bg-brand-white/68",
              "shadow-[0_24px_64px_rgba(48,50,41,0.10)]",
              "lg:grid-cols-[minmax(20rem,0.76fr)_minmax(0,1.24fr)]",
            )}
            stagger={0.08}
            start="top 84%"
          >
            <div
              className={cn(
                "flex flex-col justify-center",
                "px-6 py-9",
                "sm:px-9 sm:py-12",
                "lg:px-11 lg:py-14",
              )}
            >
              <span
                className={cn(
                  "inline-flex h-12 w-12",
                  "items-center justify-center",
                  "rounded-full",
                  "border border-brand-olive/10",
                  "bg-brand-sage/10",
                  "text-brand-sage",
                )}
              >
                <MapPin size={20} aria-hidden="true" />
              </span>

              <p className="small-label mt-7 text-brand-sage">
                Visit the showroom
              </p>

              <h2
                id="showroom-location-heading"
                className={cn(
                  "mt-4 max-w-[12ch]",
                  "font-display font-normal",
                  "text-[2.45rem] leading-[0.97]",
                  "text-brand-olive",
                  "sm:text-[3.45rem]",
                  "lg:text-[3.7rem]",
                )}
              >
                Explore the physical collection in person.
              </h2>

              <p className="body-copy mt-6 max-w-lg text-base leading-8">
                Visit Elegant Star Invitations &amp; Creation to explore
                invitation suites, certificate folders, presentation boxes,
                materials and finishing references.
              </p>

              <div
                className={cn(
                  "mt-7 rounded-[1rem]",
                  "border border-brand-olive/10",
                  "bg-brand-ivory/55",
                  "px-4 py-4",
                )}
              >
                <p className="text-sm leading-6 text-brand-olive/68">
                  Contact the studio before visiting to confirm availability and
                  arrange a suitable time.
                </p>
              </div>

              <a
                href={contactDetails.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group mt-8 inline-flex min-h-12 w-fit",
                  "items-center gap-3",
                  "rounded-full",
                  "bg-brand-olive px-6",
                  "text-sm font-bold text-brand-white",
                  "shadow-[0_12px_28px_rgba(48,50,41,0.14)]",
                  "transition-[transform,background-color,box-shadow]",
                  "duration-300",
                  "hover:-translate-y-0.5",
                  "hover:bg-brand-olive/92",
                  "hover:shadow-[0_18px_38px_rgba(48,50,41,0.18)]",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-brand-champagne",
                  "focus-visible:ring-offset-4",
                  "focus-visible:ring-offset-brand-white",
                )}
              >
                Open in Google Maps
                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                  className={cn(
                    "transition-transform duration-300",
                    "group-hover:-translate-y-0.5",
                    "group-hover:translate-x-0.5",
                  )}
                />
              </a>
            </div>

            <div
              className={cn(
                "relative min-h-[20rem]",
                "border-t border-brand-olive/10",
                "sm:min-h-[29rem]",
                "lg:min-h-[36rem]",
                "lg:border-l lg:border-t-0",
              )}
            >
              <iframe
                src={contactDetails.mapsEmbedUrl}
                title="Elegant Star Invitations and Creation showroom location"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-brand-olive/[0.05]"
              />
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* Guided enquiry */}
      <section
        className={cn(
          "section-shell bg-brand-white/42",
          "!py-20",
          "sm:!py-24",
          "lg:!py-28",
        )}
        data-nav-theme="light"
        aria-labelledby="guided-contact-heading"
      >
        <RevealGroup
          className={cn(
            "section-inner overflow-hidden",
            "rounded-[1.8rem]",
            "bg-brand-sage",
            "text-brand-white",
            "shadow-[0_26px_68px_rgba(48,50,41,0.15)]",
          )}
          stagger={0.08}
          start="top 84%"
        >
          <div
            className={cn(
              "grid min-w-0 gap-10",
              "px-6 py-10",
              "sm:px-9 sm:py-12",
              "lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)]",
              "lg:items-center lg:gap-16",
              "lg:px-12 lg:py-14",
            )}
          >
            <div>
              <p className="small-label text-brand-ivory/65">
                Guided preparation
              </p>

              <h2
                id="guided-contact-heading"
                className={cn(
                  "mt-4 max-w-[12ch]",
                  "font-display font-normal",
                  "text-[2.5rem] leading-[0.97]",
                  "sm:text-[3.65rem]",
                  "lg:text-[4rem]",
                )}
              >
                Not sure how to begin your message?
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-brand-white/76">
                Use the guided enquiry to organise the occasion, product type
                and preferred visual direction before contacting the studio.
              </p>

              <Link
                href="/#guided-enquiry"
                className={cn(
                  "group mt-8 inline-flex min-h-12",
                  "items-center gap-3",
                  "rounded-full bg-brand-ivory",
                  "px-6",
                  "text-sm font-bold text-brand-olive",
                  "shadow-[0_12px_30px_rgba(48,50,41,0.12)]",
                  "transition-[transform,box-shadow]",
                  "duration-300",
                  "hover:-translate-y-0.5",
                  "hover:shadow-[0_18px_38px_rgba(48,50,41,0.17)]",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-brand-champagne",
                  "focus-visible:ring-offset-4",
                  "focus-visible:ring-offset-brand-sage",
                )}
              >
                <Sparkles size={17} aria-hidden="true" />
                Open guided enquiry
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className={cn(
                    "transition-transform duration-300",
                    "group-hover:-translate-y-0.5",
                    "group-hover:translate-x-0.5",
                  )}
                />
              </Link>
            </div>

            <div
              className={cn(
                "rounded-[1.35rem]",
                "border border-brand-white/15",
                "bg-brand-white/[0.08]",
                "p-6 backdrop-blur-sm",
                "sm:p-7",
              )}
            >
              <p className="small-label text-brand-champagne">
                Helpful information
              </p>

              <ul className="mt-6 space-y-4">
                {enquiryChecklist.map((item, index) => (
                  <li key={item} className="flex items-start gap-4">
                    <span
                      className={cn(
                        "mt-0.5 inline-flex h-7 w-7",
                        "shrink-0 items-center justify-center",
                        "rounded-full",
                        "border border-brand-white/20",
                        "text-[0.65rem] font-bold",
                        "text-brand-ivory",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-sm leading-7 text-brand-white/78">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealGroup>
      </section>

      {/* FAQs */}
      <section
        className={cn("section-shell", "!py-20", "sm:!py-24", "lg:!py-28")}
        data-nav-theme="light"
        aria-labelledby="contact-faq-heading"
      >
        <div className="section-inner">
          <RevealGroup
            className={cn(
              "grid gap-8",
              "lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]",
              "lg:items-start lg:gap-14",
            )}
            stagger={0.08}
            start="top 84%"
          >
            <div className="lg:sticky lg:top-36">
              <p className="small-label text-brand-sage">
                Frequently asked questions
              </p>

              <h2
                id="contact-faq-heading"
                className={cn(
                  "mt-4 max-w-[10ch]",
                  "font-display font-normal",
                  "text-[2.5rem] leading-[0.97]",
                  "text-brand-olive",
                  "sm:text-[3.55rem]",
                  "lg:text-[3.9rem]",
                )}
              >
                A few things to know before getting in touch.
              </h2>

              <div className="mt-8">
                <EnquiryButton />
              </div>
            </div>

            <div className="grid min-w-0 gap-3">
              {faqItems.map((item, index) => (
                <details
                  key={item.question}
                  className={cn(
                    "group min-w-0",
                    "rounded-[1.25rem]",
                    "border border-brand-olive/10",
                    "bg-brand-white/68",
                    "px-5 py-5",
                    "shadow-[0_12px_34px_rgba(48,50,41,0.06)]",
                    "open:bg-brand-white",
                    "sm:px-6",
                  )}
                >
                  <summary
                    className={cn(
                      "flex cursor-pointer list-none",
                      "items-center justify-between gap-6",
                      "font-display text-[1.45rem]",
                      "leading-[1.08] text-brand-olive sm:text-[1.75rem]",
                      "marker:hidden",
                    )}
                  >
                    <span className="flex min-w-0 items-start gap-4">
                      <span className="small-label mt-1 shrink-0 text-brand-sage">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span>{item.question}</span>
                    </span>

                    <span
                      className={cn(
                        "inline-flex h-9 w-9 shrink-0",
                        "items-center justify-center",
                        "rounded-full",
                        "border border-brand-olive/10",
                        "bg-brand-ivory/60",
                        "text-brand-sage",
                      )}
                    >
                      <Plus
                        size={17}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-open:rotate-45"
                      />
                    </span>
                  </summary>

                  <p className="body-copy mt-5 max-w-3xl text-sm leading-7 sm:ml-10">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className={cn(
          "section-shell",
          "!pb-24 !pt-12",
          "sm:!pb-28",
          "lg:!pb-32",
        )}
        data-nav-theme="light"
        aria-labelledby="contact-final-heading"
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
              "lg:grid",
              "lg:grid-cols-[minmax(0,1fr)_auto]",
              "lg:items-end lg:gap-12",
              "lg:px-12 lg:py-14",
            )}
            stagger={0.08}
            start="top 84%"
          >
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute",
                "-right-24 -top-28",
                "h-72 w-72 rounded-full",
                "border border-brand-white/10",
              )}
            />

            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute",
                "-right-8 -top-10",
                "h-48 w-48 rounded-full",
                "border border-brand-champagne/15",
              )}
            />

            <div className="relative z-10 max-w-[49rem]">
              <p className="small-label text-brand-champagne">
                Begin a conversation
              </p>

              <h2
                id="contact-final-heading"
                className={cn(
                  "mt-4 max-w-[14ch]",
                  "font-display font-normal",
                  "text-[2.5rem] leading-[0.97]",
                  "sm:text-[3.7rem]",
                  "lg:text-[4.1rem]",
                )}
              >
                Share the occasion and let the direction develop from there.
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-brand-ivory/68 sm:text-base">
                Begin with an existing collection, a saved reference, a
                preferred colour or a simple description of the feeling you want
                to create.
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
