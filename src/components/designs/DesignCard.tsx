import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { InvitationCollection } from "@/data/collections";

export function DesignCard({
  design,
  compact = false,
}: {
  design: InvitationCollection;
  compact?: boolean;
}) {
  return (
    <article className="group motion-card-lift rounded-[20px]">
      <Link
        href={`/designs/${design.slug}`}
        className="block rounded-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage focus-visible:ring-offset-4 focus-visible:ring-offset-brand-ivory"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-brand-paper shadow-soft">
          <Image
            src={design.cardImage}
            alt={`${design.name} stationery collection`}
            fill
            className="object-cover transition duration-700 motion-reduce:transition-none group-hover:scale-[1.025] group-hover:opacity-0"
            sizes="(max-width: 419px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
          />
          <Image
            src={design.hoverImage}
            alt=""
            fill
            className="object-cover opacity-0 transition duration-700 motion-reduce:transition-none group-hover:scale-[1.025] group-hover:opacity-100"
            sizes="(max-width: 419px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
          />
          <div className="absolute left-3 top-3 rounded-full bg-brand-ivory/82 px-3 py-1 text-[10px] font-bold tracking-[.14em] text-brand-olive backdrop-blur">
            {design.reference}
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3
                className={`${
                  compact
                    ? "text-[1.85rem] sm:text-2xl md:text-3xl"
                    : "text-3xl sm:text-4xl"
                } break-words font-display leading-[0.98]`}
              >
                {design.name}
              </h3>
              <p className="mt-2 break-words text-xs font-bold leading-5 text-brand-olive/52">
                {design.categories.slice(0, 2).join(" · ")}
              </p>
            </div>
            <ArrowUpRight
              size={18}
              className="shrink-0 text-brand-sage transition motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
