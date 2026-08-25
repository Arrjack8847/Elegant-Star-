import Link from "next/link";

export function YangonInvitationServices() {
  return (
    <section
      className="section-shell border-y border-brand-olive/10 bg-brand-paper/55 py-16 sm:py-20 lg:py-24"
      data-nav-theme="light"
      aria-labelledby="yangon-invitation-services-heading"
    >
      <div className="section-inner">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
          <div>
            <p className="small-label text-brand-sage">
              Wedding invitation studio · Yangon
            </p>

            <h2
              id="yangon-invitation-services-heading"
              className="display-heading mt-4 max-w-[13ch] text-[clamp(2.5rem,8vw,4.5rem)] leading-[0.98] text-brand-olive"
            >
              Wedding invitation cards &amp; stationery in Yangon
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="body-copy text-base leading-8 sm:text-lg">
              Elegant Star creates custom wedding invitation cards, marriage
              certificate folders and coordinated wedding stationery for
              celebrations in Yangon, Myanmar. Designs can be personalised with
              wording, colour direction, format and finishing details during
              consultation.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div>
                <h3 className="font-display text-2xl text-brand-olive">
                  Invitation cards
                </h3>
                <p className="body-copy mt-2 text-sm leading-6">
                  Customisable wedding invitation designs with coordinated
                  envelope and insert options.
                </p>
              </div>

              <div>
                <h3 className="font-display text-2xl text-brand-olive">
                  Certificate folders
                </h3>
                <p className="body-copy mt-2 text-sm leading-6">
                  Marriage certificate folders and keepsake presentation
                  pieces in a range of finishes.
                </p>
              </div>

              <div>
                <h3 className="font-display text-2xl text-brand-olive">
                  Coordinated stationery
                </h3>
                <p className="body-copy mt-2 text-sm leading-6">
                  Matching celebration pieces, presentation details and
                  stationery shaped around the occasion.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-brand-olive">
              <Link
                href="/collections"
                className="underline decoration-brand-sage/50 underline-offset-4 transition-opacity hover:opacity-65"
              >
                Explore wedding invitation collections
              </Link>
              <Link
                href="/contact"
                className="underline decoration-brand-sage/50 underline-offset-4 transition-opacity hover:opacity-65"
              >
                Enquire with the Yangon studio
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
        </div>
      </div>
    </section>
  );
}
