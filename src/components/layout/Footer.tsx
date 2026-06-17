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
      className="relative z-10 -mt-5 rounded-t-[2rem] bg-brand-olive px-4 py-10 text-brand-ivory shadow-[0_-24px_70px_rgba(48,50,41,0.12)] sm:px-5 sm:py-12 md:-mt-7 md:rounded-t-[3rem]"
      data-nav-theme="dark"
      distance={16}
      duration={0.65}
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <div className="min-w-0">
          <Image
            src={siteConfig.logo.white}
            alt=""
            width={180}
            height={60}
            className="h-14 w-auto brightness-110 sm:h-16"
          />
          <h2 className="mt-5 font-display text-3xl sm:text-4xl">
            {siteConfig.legalName}
          </h2>
          <p className="mt-2 text-sm tracking-[.14em] text-brand-ivory/62 sm:tracking-[.22em]">
            {siteConfig.descriptor}
          </p>
          <p className="mt-5 max-w-md text-sm leading-7 text-brand-ivory/62">
            Real stationery collections, privacy-safe celebration stories and a
            guided enquiry experience—without a database or CMS.
          </p>
        </div>
        <div>
          <p className="small-label text-brand-ivory/54">Explore</p>
          <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-brand-ivory/76 min-[380px]:grid-cols-2 md:grid-cols-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-10 items-center transition hover:text-brand-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="small-label text-brand-ivory/54">Contact</p>
          <div className="mt-4 grid gap-3 text-sm text-brand-ivory/76">
            {footerContact.map((item) => (
              <p key={item} className="break-words leading-6">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-3 border-t border-brand-ivory/14 pt-6 text-xs text-brand-ivory/50 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} Elegant Star. Invitations & Creation.
        </p>
        <p>Static Next.js build · No database required</p>
      </div>
    </Reveal>
  );
}
