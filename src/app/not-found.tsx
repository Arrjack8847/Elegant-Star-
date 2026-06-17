import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section
      className="page-top section-shell min-h-[72vh]"
      data-nav-theme="light"
    >
      <div className="section-inner grid gap-8 text-center">
        <p className="small-label text-brand-sage">Page not found</p>
        <h1 className="display-heading mx-auto max-w-3xl text-[clamp(2.75rem,13vw,4.25rem)] leading-[0.96] md:text-8xl">
          This invitation page is not available.
        </h1>
        <p className="body-copy mx-auto max-w-2xl">
          The page may have moved, or the design reference may not exist in the
          current sample catalogue.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/collections">Browse Collections</ButtonLink>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-bold text-brand-olive transition hover:bg-brand-olive/8"
          >
            Contact Elegant Star
          </Link>
        </div>
      </div>
    </section>
  );
}
