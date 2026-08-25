import type { Metadata } from "next";
import Link from "next/link";

import { getConfiguredSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Invitation Service in Myanmar",
  description:
    "Elegant Star Myanmar is a Yangon-based invitation service creating custom wedding invitation cards, invitation designs, marriage certificate folders and coordinated stationery in Myanmar.",
  alternates: {
    canonical: "/invitation-service-myanmar",
  },
  openGraph: {
    title: "Invitation Service in Myanmar | Elegant Star",
    description:
      "Explore Elegant Star Invitation services from Yangon, including custom wedding invitation cards, invitation design, marriage certificate folders and coordinated stationery in Myanmar.",
    url: "/invitation-service-myanmar",
    type: "website",
  },
};

const invitationServices = [
  {
    title: "Custom invitation cards",
    copy: "Choose an Elegant Star invitation design and personalise wording, colours, format, envelopes and coordinated inserts for the occasion.",
  },
  {
    title: "Invitation design",
    copy: "Discuss the visual direction, typography, format and finishing details with the Yangon studio to shape a more personalised invitation suite.",
  },
  {
    title: "Coordinated stationery",
    copy: "Pair invitations with marriage certificate folders, presentation pieces and matching stationery designed around the same visual direction.",
  },
] as const;

export default function InvitationServiceMyanmarPage() {
  const siteUrl = getConfiguredSiteUrl();

  const structuredData = siteUrl
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${siteUrl}/invitation-service-myanmar#webpage`,
            url: `${siteUrl}/invitation-service-myanmar`,
            name: "Invitation Service in Myanmar | Elegant Star",
            description:
              "Elegant Star Myanmar invitation service for custom wedding invitation cards, invitation design, marriage certificate folders and coordinated stationery.",
            inLanguage: "en",
            isPartOf: {
              "@id": `${siteUrl}/#website`,
            },
            about: {
              "@id": `${siteUrl}/#business`,
            },
          },
          {
            "@type": "Service",
            "@id": `${siteUrl}/invitation-service-myanmar#service`,
            name: "Invitation service in Myanmar",
            serviceType:
              "Custom invitation card design, invitation stationery and coordinated presentation service",
            provider: {
              "@id": `${siteUrl}/#business`,
            },
            areaServed: {
              "@type": "Country",
              name: "Myanmar",
            },
            url: `${siteUrl}/invitation-service-myanmar`,
          },
        ],
      }
    : null;

  return (
    <main className="min-w-0 overflow-x-clip">
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}

      <section
        className="section-shell border-b border-brand-olive/10 bg-brand-paper/55 pb-16 pt-[calc(7rem+env(safe-area-inset-top))] sm:pb-20 sm:pt-[calc(8rem+env(safe-area-inset-top))] lg:pb-24"
        data-nav-theme="light"
      >
        <div className="section-inner">
          <p className="small-label text-brand-sage">
            Elegant Star Invitation · Yangon, Myanmar
          </p>
          <h1 className="display-heading mt-4 max-w-[13ch] text-[clamp(2.8rem,10vw,5.4rem)] leading-[0.98] text-brand-olive">
            Invitation service in Myanmar
          </h1>
          <p className="body-copy mt-7 max-w-3xl text-base leading-8 sm:text-lg">
            Elegant Star Myanmar is a Yangon-based invitation service creating
            custom wedding invitation cards, invitation designs, marriage
            certificate folders and coordinated stationery. Clients can explore
            existing collections first, then discuss wording, colours, format,
            quantity and finishing details with the studio.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-brand-olive">
            <Link
              href="/collections"
              className="underline decoration-brand-sage/50 underline-offset-4 transition-opacity hover:opacity-65"
            >
              Explore invitation collections
            </Link>
            <Link
              href="/wedding-service-myanmar"
              className="underline decoration-brand-sage/50 underline-offset-4 transition-opacity hover:opacity-65"
            >
              Wedding service in Myanmar
            </Link>
            <Link
              href="/contact"
              className="underline decoration-brand-sage/50 underline-offset-4 transition-opacity hover:opacity-65"
            >
              Enquire with Elegant Star Yangon
            </Link>
            <Link
              href="/my"
              hrefLang="my"
              className="underline decoration-brand-sage/50 underline-offset-4 transition-opacity hover:opacity-65"
            >
              မြန်မာလို ဖတ်ရန်
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20 lg:py-24" data-nav-theme="light">
        <div className="section-inner">
          <div className="max-w-3xl">
            <p className="small-label text-brand-sage">Invitation services</p>
            <h2 className="display-heading mt-4 text-[clamp(2.3rem,7vw,4rem)] leading-[1] text-brand-olive">
              From invitation design to coordinated details
            </h2>
            <p className="body-copy mt-5 text-base leading-8 sm:text-lg">
              Elegant Star Invitation services focus on the invitation itself
              and the stationery pieces that can be designed to coordinate with
              it.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {invitationServices.map((service) => (
              <article
                key={service.title}
                className="rounded-[1.5rem] border border-brand-olive/10 bg-brand-white/70 p-6 shadow-soft"
              >
                <h3 className="font-display text-2xl leading-tight text-brand-olive">
                  {service.title}
                </h3>
                <p className="body-copy mt-3 text-sm leading-7">
                  {service.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-shell border-y border-brand-olive/10 bg-brand-paper/55 py-16 sm:py-20 lg:py-24"
        data-nav-theme="light"
      >
        <div className="section-inner grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="small-label text-brand-sage">Elegant Star Yangon</p>
            <h2 className="display-heading mt-4 text-[clamp(2.3rem,7vw,4rem)] leading-[1] text-brand-olive">
              Invitation service from Yangon for clients in Myanmar
            </h2>
          </div>
          <div>
            <p className="body-copy text-base leading-8 sm:text-lg">
              Elegant Star is based in Yangon, and the website lets clients
              across Myanmar review invitation styles before contacting the
              studio about personalisation and ordering details.
            </p>
            <p className="body-copy mt-5 text-base leading-8 sm:text-lg">
              If you searched for Elegant Star Myanmar, Elegant Star Yangon or
              Elegant Star Invitation, this is the official Elegant Star -
              Invitations &amp; Creation website.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
