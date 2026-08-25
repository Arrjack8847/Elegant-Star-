import type { Metadata } from "next";
import Link from "next/link";

import { getConfiguredSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Wedding Service in Myanmar",
  description:
    "Elegant Star Myanmar is a Yangon-based wedding service focused on wedding invitations, invitation design, marriage certificate folders and coordinated wedding stationery across Myanmar.",
  alternates: {
    canonical: "/wedding-service-myanmar",
  },
  openGraph: {
    title: "Wedding Service in Myanmar | Elegant Star",
    description:
      "Explore Elegant Star Myanmar wedding services including wedding invitations, invitation design, marriage certificate folders and coordinated wedding stationery from Yangon.",
    url: "/wedding-service-myanmar",
    type: "website",
  },
};

const services = [
  {
    title: "Wedding invitations",
    copy: "Custom wedding invitation cards with personalised wording, colour direction, formats, envelopes and coordinated inserts.",
  },
  {
    title: "Marriage certificate folders",
    copy: "Presentation folders and keepsake pieces designed to coordinate with the wider wedding stationery direction.",
  },
  {
    title: "Coordinated wedding stationery",
    copy: "Matching stationery and presentation details created around the visual direction of the wedding celebration.",
  },
] as const;

export default function WeddingServiceMyanmarPage() {
  const siteUrl = getConfiguredSiteUrl();

  const structuredData = siteUrl
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${siteUrl}/wedding-service-myanmar#webpage`,
            url: `${siteUrl}/wedding-service-myanmar`,
            name: "Wedding Service in Myanmar | Elegant Star",
            description:
              "Elegant Star Myanmar wedding service focused on wedding invitations, invitation design, marriage certificate folders and coordinated wedding stationery.",
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
            "@id": `${siteUrl}/wedding-service-myanmar#service`,
            name: "Wedding service in Myanmar",
            serviceType:
              "Wedding invitation, certificate folder and coordinated wedding stationery service",
            provider: {
              "@id": `${siteUrl}/#business`,
            },
            areaServed: {
              "@type": "Country",
              name: "Myanmar",
            },
            url: `${siteUrl}/wedding-service-myanmar`,
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
            Elegant Star Myanmar · Yangon
          </p>
          <h1 className="display-heading mt-4 max-w-[13ch] text-[clamp(2.8rem,10vw,5.4rem)] leading-[0.98] text-brand-olive">
            Wedding service in Myanmar
          </h1>
          <p className="body-copy mt-7 max-w-3xl text-base leading-8 sm:text-lg">
            Elegant Star Myanmar is a Yangon-based wedding service specialising
            in wedding invitations, invitation design, marriage certificate
            folders and coordinated wedding stationery. Couples can begin with
            an existing Elegant Star invitation design or discuss a personalised
            direction for their celebration.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-brand-olive">
            <Link
              href="/collections"
              className="underline decoration-brand-sage/50 underline-offset-4 transition-opacity hover:opacity-65"
            >
              Explore invitation collections
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
            <p className="small-label text-brand-sage">What we create</p>
            <h2 className="display-heading mt-4 text-[clamp(2.3rem,7vw,4rem)] leading-[1] text-brand-olive">
              Wedding invitation &amp; stationery services
            </h2>
            <p className="body-copy mt-5 text-base leading-8 sm:text-lg">
              Elegant Star Invitation services are built around the paper,
              presentation and coordinated details that introduce and support a
              wedding celebration.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {services.map((service) => (
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
            <p className="small-label text-brand-sage">Yangon · Myanmar</p>
            <h2 className="display-heading mt-4 text-[clamp(2.3rem,7vw,4rem)] leading-[1] text-brand-olive">
              Elegant Star Yangon, serving wedding clients in Myanmar
            </h2>
          </div>
          <div>
            <p className="body-copy text-base leading-8 sm:text-lg">
              Elegant Star is based in Yangon and works with clients looking for
              wedding invitation and stationery services in Myanmar. Our online
              collections make it easy to review styles before contacting the
              studio about personalisation, quantities and finishing details.
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
