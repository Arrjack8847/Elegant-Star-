import Image from "next/image";
import { ExternalLink, MessageCircle } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { SectionTransition } from "@/components/motion/SectionTransition";
import { MessengerFallbackLinks } from "@/components/contact/MessengerFallbackLinks";
import { FacebookIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { siteMedia } from "@/data/siteMedia";
import { contactDetails } from "@/data/site";
import { cn } from "@/lib/utils";

const instagramUrl = "https://www.instagram.com/elegant_star_invitations_/";

const galleryItems = [
  {
    src: siteMedia.homepage.socialMediaShowcase.featuredInvitation,
    alt: "Ivory floral invitation suite with ribbon and coordinated stationery",
    label: "Invitation details",
    featured: true,
  },
  {
    src: siteMedia.homepage.socialMediaShowcase.paperDetail,
    alt: "Layered floral paper details with pearl and beaded finishes",
    label: "Paper & finishing",
    featured: false,
  },
  {
    src: siteMedia.homepage.socialMediaShowcase.studioDisplay,
    alt: "Elegant Star studio display with invitations and finishing samples",
    label: "From the studio",
    featured: false,
  },
] as const;

const socialActions = [
  {
    label: "Follow on Instagram",
    href: instagramUrl,
    ariaLabel: "Follow Elegant Star on Instagram (opens in a new tab)",
    icon: InstagramIcon,
    primary: true,
  },
  {
    label: "Visit us on Facebook",
    href: "https://www.facebook.com/share/1CswnjjZyQ/?mibextid=wwXIfr",
    ariaLabel: "Visit Elegant Star on Facebook (opens in a new tab)",
    icon: FacebookIcon,
    primary: false,
  },
] as const;

export function SocialMediaShowcase() {
  return (
    <SectionTransition
      variant="rounded-dark"
      id="social"
      className={cn(
        "section-shell scroll-mt-24 overflow-hidden bg-brand-sage text-brand-white",
        "!pb-24 !pt-20",
        "sm:!pb-28 sm:!pt-24",
        "lg:scroll-mt-[8.5rem] lg:!pb-32 lg:!pt-28",
      )}
      data-nav-theme="dark"
      aria-labelledby="social-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-24 h-80 w-80 rounded-full bg-brand-ivory/[0.06] blur-3xl"
      />

      <div
        className={cn(
          "section-inner relative grid min-w-0 gap-12",
          "md:gap-14",
          "lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1fr)]",
          "lg:items-center lg:gap-12",
          "xl:gap-16",
        )}
      >
        <RevealGroup className="min-w-0 lg:pr-2" stagger={0.08} start="top 86%">
          <p className="small-label text-brand-champagne">Stay inspired</p>

          <h2
            id="social-heading"
            className={cn(
              "mt-4 max-w-[12ch] font-display font-normal",
              "text-[clamp(2.45rem,11vw,3.15rem)] leading-[0.97] tracking-[-0.025em]",
              "sm:text-[3.85rem]",
              "lg:text-[4rem]",
              "xl:text-[4.35rem]",
            )}
          >
            See what we’ve been creating lately.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-brand-white/76">
            Follow Elegant Star for new invitation designs, paper details,
            presentation ideas and studio updates.
          </p>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit @elegant_star_invitations_ on Instagram (opens in a new tab)"
            className={cn(
              "group mt-5 inline-flex min-h-11 max-w-full items-center gap-2",
              "text-base font-bold text-brand-ivory",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-brand-champagne focus-visible:ring-offset-4",
              "focus-visible:ring-offset-brand-sage",
            )}
          >
            <InstagramIcon size={18} aria-hidden="true" />
            <span className="break-all">@elegant_star_invitations_</span>
            <ExternalLink
              size={15}
              aria-hidden="true"
              className="shrink-0 transition-transform duration-300 motion-reduce:transition-none lg:group-hover:-translate-y-0.5 lg:group-hover:translate-x-0.5"
            />
          </a>

          <div className="mt-7 rounded-[1.35rem] border border-brand-white/15 bg-brand-olive/14 p-5 sm:p-6">
            <p className="text-base leading-8 text-brand-white/78">
              Planning your celebration? Send us your date, quantity, preferred
              style or a reference photo. You don’t need to have every detail
              ready—we’ll guide you through the next steps.
            </p>
          </div>

          <ul
            className="mt-7 grid min-w-0 gap-3 min-[390px]:grid-cols-2"
            aria-label="Elegant Star social media"
          >
            {socialActions.map((action) => {
              const Icon = action.icon;

              return (
                <li key={action.label} className="min-w-0">
                  <a
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={action.ariaLabel}
                    className={cn(
                      "group inline-flex min-h-12 w-full items-center justify-center gap-2.5",
                      "rounded-full px-4 text-center text-sm font-bold",
                      "transition-[transform,background-color,border-color,color,box-shadow] duration-300",
                      "motion-reduce:transition-none",
                      "focus-visible:outline-none focus-visible:ring-2",
                      "focus-visible:ring-brand-champagne focus-visible:ring-offset-4",
                      "focus-visible:ring-offset-brand-sage",
                      "lg:hover:-translate-y-0.5",
                      action.primary
                        ? "bg-brand-ivory text-brand-olive shadow-[0_14px_34px_rgba(48,50,41,0.14)] lg:hover:bg-brand-white"
                        : "border border-brand-white/28 bg-brand-white/[0.06] text-brand-white lg:hover:border-brand-white/50 lg:hover:bg-brand-white/[0.1]",
                    )}
                  >
                    <Icon size={18} aria-hidden="true" className="shrink-0" />
                    <span>{action.label}</span>
                    <ExternalLink
                      size={14}
                      aria-hidden="true"
                      className="shrink-0 transition-transform duration-300 motion-reduce:transition-none lg:group-hover:-translate-y-0.5 lg:group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href={contactDetails.messengerUrl}
            aria-label="Message Elegant Star on Messenger"
            className={cn(
              "group mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2.5",
              "rounded-full border border-brand-champagne/50 bg-brand-champagne/12 px-5",
              "text-center text-sm font-bold text-brand-white",
              "transition-[transform,background-color,border-color] duration-300",
              "motion-reduce:transition-none lg:hover:-translate-y-0.5",
              "lg:hover:border-brand-champagne/75 lg:hover:bg-brand-champagne/18",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-brand-champagne focus-visible:ring-offset-4",
              "focus-visible:ring-offset-brand-sage",
            )}
          >
            <MessageCircle size={18} aria-hidden="true" />
            Message us on Messenger
            <ExternalLink
              size={14}
              aria-hidden="true"
              className="transition-transform duration-300 motion-reduce:transition-none lg:group-hover:-translate-y-0.5 lg:group-hover:translate-x-0.5"
            />
          </a>

          <MessengerFallbackLinks variant="dark" className="mt-2" />

          <a
            href={contactDetails.viberUrl}
            aria-label="Chat with Elegant Star on Viber"
            className={cn(
              "group mt-3 inline-flex min-h-11 items-center gap-2",
              "text-sm font-bold text-brand-ivory/82 underline decoration-brand-ivory/35",
              "underline-offset-4 transition-colors duration-300",
              "motion-reduce:transition-none lg:hover:text-brand-white",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-brand-champagne focus-visible:ring-offset-4",
              "focus-visible:ring-offset-brand-sage",
            )}
          >
            <MessageCircle size={16} aria-hidden="true" />
            Chat on Viber
            <ExternalLink size={13} aria-hidden="true" />
          </a>
        </RevealGroup>

        <Reveal distance={22} duration={0.75} start="top 84%">
          <ul
            className={cn(
              "grid min-w-0 grid-cols-2 gap-3 sm:gap-4",
              "md:h-[35rem] md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:grid-rows-2",
              "lg:h-[38rem]",
              "xl:h-[40rem]",
            )}
            aria-label="Recent Elegant Star work"
          >
            {galleryItems.map((item) => (
              <li
                key={item.src}
                className={cn(
                  "min-w-0",
                  item.featured
                    ? "col-span-2 aspect-[4/3] md:col-span-1 md:row-span-2 md:aspect-auto"
                    : "aspect-[4/5] md:aspect-auto",
                )}
              >
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${item.label.toLowerCase()} on Instagram (opens in a new tab)`}
                  className={cn(
                    "group relative block h-full min-h-0 overflow-hidden rounded-[1.45rem]",
                    "bg-brand-olive/20 shadow-[0_20px_50px_rgba(48,50,41,0.18)]",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-brand-champagne focus-visible:ring-offset-4",
                    "focus-visible:ring-offset-brand-sage",
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    sizes={
                      item.featured
                        ? "(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 55vw, 34vw"
                        : "(max-width: 767px) calc(50vw - 1.5rem), (max-width: 1023px) 36vw, 22vw"
                    }
                    className={cn(
                      "object-cover transition-transform duration-700 ease-out",
                      "motion-reduce:transition-none lg:group-hover:scale-[1.035]",
                      item.label === "Paper & finishing" && "object-[50%_42%]",
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-brand-olive/72 via-brand-olive/5 to-transparent"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 sm:p-5">
                    <span className="text-sm font-bold text-brand-white">
                      {item.label}
                    </span>
                    <InstagramIcon
                      size={17}
                      aria-hidden="true"
                      className="shrink-0 text-brand-ivory"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </SectionTransition>
  );
}
