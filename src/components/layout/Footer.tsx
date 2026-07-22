import Link from "next/link";
import Image from "next/image";
import { contactDetails, navigation, siteConfig } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";

export function Footer() {
  const footerContact = [
    contactDetails.email.value,
    ...contactDetails.phones.map((phone) => phone.value),
    contactDetails.address,
  ].filter((item): item is string => Boolean(item));

  return (
    <Reveal
      as="footer"
      id="site-footer"
      className="relative z-10 -mt-5 rounded-t-[2.25rem] bg-brand-olive px-5 pb-[calc(2.75rem+env(safe-area-inset-bottom))] pt-12 text-brand-ivory shadow-[0_-24px_70px_rgba(48,50,41,0.12)] sm:px-6 sm:pb-[calc(3.25rem+env(safe-area-inset-bottom))] sm:pt-14 md:-mt-7 md:rounded-t-[3rem]"
      data-nav-theme="dark"
      distance={16}
      duration={0.65}
    >
      <div className="mx-auto grid max-w-6xl gap-10 sm:gap-12 lg:grid-cols-[1.12fr_.7fr_.9fr] lg:gap-16">
        <div className="min-w-0">
          <Image
            src={siteConfig.logo.white}
            alt=""
            width={180}
            height={60}
            className="h-14 w-auto brightness-110 sm:h-16"
          />

          <h2 className="mt-6 max-w-sm font-display text-3xl leading-none sm:text-4xl">
            {siteConfig.legalName}
          </h2>

          <p className="mt-3 text-xs font-bold uppercase tracking-[.18em] text-brand-ivory/58 sm:tracking-[.22em]">
            {siteConfig.descriptor}
          </p>

          <p className="mt-6 max-w-md text-sm leading-7 text-brand-ivory/64">
            Real stationery collections, privacy-safe celebration stories and a
            guided enquiry experience - without a database or CMS.
          </p>
        </div>

        <div className="min-w-0">
          <p className="small-label text-brand-ivory/54">Explore</p>
          <div className="mt-5 grid grid-cols-1 gap-2 text-sm font-bold text-brand-ivory/76 min-[380px]:grid-cols-2 md:grid-cols-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center border-b border-brand-ivory/10 transition hover:border-brand-ivory/28 hover:text-brand-white md:border-b-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <p className="small-label text-brand-ivory/54">Contact</p>
          <div className="mt-5 grid gap-3 text-sm text-brand-ivory/76">
            {footerContact.map((item) => (
              <p key={item} className="break-words leading-7">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-3 border-t border-brand-ivory/14 pt-6 text-xs leading-6 text-brand-ivory/50 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Copyright {new Date().getFullYear()} Elegant Star. Invitations &
          Creation.
        </p>
        <p>Static Next.js build / No database required</p>
      </div>
    </Reveal>
  );
}
