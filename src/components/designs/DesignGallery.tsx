"use client";

import Image from "next/image";
import { useState } from "react";
import type { InvitationCollection } from "@/data/collections";
import { cn } from "@/lib/utils";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealGroup } from "@/components/motion/RevealGroup";

export function DesignGallery({ design }: { design: InvitationCollection }) {
  const [active, setActive] = useState(0);
  const images = design.gallery.length ? design.gallery : [design.coverImage];
  return (
    <div className="grid gap-4">
      <ImageReveal className="relative aspect-[4/5] rounded-[20px] bg-brand-paper shadow-paper sm:rounded-[22px]">
        <Image
          src={images[active]}
          alt={`${design.name} gallery view ${active + 1}`}
          fill
          priority
          loading="eager"
          className="object-cover"
          sizes="(max-width: 1023px) calc(100vw - 2rem), 52vw"
        />
      </ImageReveal>
      {images.length > 1 ? (
        <RevealGroup className="grid grid-cols-4 gap-2 sm:gap-3" stagger={0.04}>
          {images.slice(0, 8).map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${design.name} image ${index + 1}`}
              className={cn(
                "relative aspect-[4/5] overflow-hidden rounded-xl border transition motion-reduce:transition-none",
                active === index
                  ? "border-brand-sage ring-2 ring-brand-sage/25"
                  : "border-brand-olive/10 opacity-72 hover:opacity-100",
              )}
            >
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 23vw, 12vw"
              />
            </button>
          ))}
        </RevealGroup>
      ) : null}
    </div>
  );
}
