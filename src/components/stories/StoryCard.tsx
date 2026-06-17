import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { RealStory } from "@/data/stories";

export function StoryCard({
  story,
  large = false,
}: {
  story: RealStory;
  large?: boolean;
}) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group motion-card-lift block rounded-[22px]"
    >
      <article>
        <div
          className={`relative overflow-hidden rounded-[22px] bg-brand-paper shadow-soft ${large ? "aspect-[16/10]" : "aspect-[4/5]"}`}
        >
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            className="object-cover transition duration-700 motion-reduce:transition-none group-hover:scale-[1.03]"
            sizes={
              large
                ? "(max-width: 1024px) 100vw, 65vw"
                : "(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 30vw"
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-olive/72 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-brand-white">
            <p className="small-label text-brand-ivory/60">{story.eyebrow}</p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <h3 className="break-words font-display text-3xl leading-[0.98] sm:text-4xl">
                {story.title}
              </h3>
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>
        <p className="body-copy mt-4 text-sm">{story.description}</p>
      </article>
    </Link>
  );
}
