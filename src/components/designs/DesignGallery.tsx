"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PlayCircle } from "lucide-react";
import type { InvitationCollection } from "@/data/collections";
import { cn } from "@/lib/utils";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealGroup } from "@/components/motion/RevealGroup";

type GalleryMedia = {
  type: "image" | "video";
  src: string;
  label: string;
  poster?: string;
};

function uniqueMedia(paths: string[]) {
  return paths.filter(
    (path, index, list) => path && list.indexOf(path) === index,
  );
}

function imageLabel(
  design: InvitationCollection,
  image: string,
  index: number,
) {
  if (image === design.cover1) {
    return "Cover 1";
  }

  if (image === design.cover2) {
    return "Cover 2";
  }

  return `Image ${index + 1}`;
}

function buildProductMedia(design: InvitationCollection): GalleryMedia[] {
  const media: GalleryMedia[] = [];
  const primaryVideo = design.videos[0];
  const productImages = uniqueMedia(design.images);
  const cover1 =
    (design.cover1 && productImages.includes(design.cover1)
      ? design.cover1
      : undefined) || productImages[0];
  const cover2 =
    design.cover2 &&
    design.cover2 !== cover1 &&
    productImages.includes(design.cover2)
      ? design.cover2
      : undefined;
  const orderedImages = uniqueMedia(
    [
      cover1,
      cover2,
      ...productImages.filter((image) => image !== cover1 && image !== cover2),
    ].filter(Boolean) as string[],
  );

  if (primaryVideo) {
    media.push({
      type: "video",
      src: primaryVideo,
      label: "Video",
      poster: cover1,
    });
  }

  orderedImages.forEach((image, index) => {
    media.push({
      type: "image",
      src: image,
      label: imageLabel(design, image, index),
    });
  });

  return media.length
    ? media
    : [{ type: "image", src: design.coverImage, label: "Cover 1" }];
}

export function DesignGallery({ design }: { design: InvitationCollection }) {
  const [activeMediaState, setActiveMediaState] = useState({
    slug: design.slug,
    index: 0,
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const media = buildProductMedia(design);
  const active =
    activeMediaState.slug === design.slug ? activeMediaState.index : 0;
  const activeIndex = Math.min(active, media.length - 1);
  const activeMedia = media[activeIndex];
  const visibleThumbnails = media;
  const showThumbnails =
    visibleThumbnails.length > 1 || media.some((item) => item.type === "video");

  useEffect(() => {
    if (activeMedia.type !== "video") {
      return;
    }

    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = false;
    video.volume = 1;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {
        // Browsers can still block autoplay; controls remain available.
      });
    });
  }, [activeMedia.src, activeMedia.type]);

  return (
    <div className="grid gap-4">
      <ImageReveal className="relative aspect-[4/5] rounded-[20px] bg-brand-paper shadow-paper sm:rounded-[22px]">
        {activeMedia.type === "video" ? (
          <video
            ref={videoRef}
            key={activeMedia.src}
            src={activeMedia.src}
            aria-label={`${design.name} video`}
            className="h-full w-full object-contain"
            autoPlay
            controls
            loop
            playsInline
            preload="metadata"
            poster={activeMedia.poster}
          />
        ) : (
          <Image
            src={activeMedia.src}
            alt={`${design.name} ${activeMedia.label.toLowerCase()}`}
            fill
            priority={activeIndex === 0}
            loading={activeIndex === 0 ? "eager" : "lazy"}
            className="object-contain"
            sizes="(max-width: 1023px) calc(100vw - 2rem), 52vw"
          />
        )}
      </ImageReveal>
      {showThumbnails ? (
        <RevealGroup className="grid grid-cols-4 gap-2 sm:gap-3" stagger={0.04}>
          {visibleThumbnails.map((item, index) => (
            <button
              key={`${item.type}-${item.src}`}
              type="button"
              onClick={() => setActiveMediaState({ slug: design.slug, index })}
              aria-label={`Show ${design.name} ${item.label.toLowerCase()}`}
              className={cn(
                "relative aspect-[4/5] overflow-hidden rounded-xl border transition motion-reduce:transition-none",
                activeIndex === index
                  ? "border-brand-sage ring-2 ring-brand-sage/25"
                  : "border-brand-olive/10 opacity-72 hover:opacity-100",
              )}
            >
              {item.type === "video" ? (
                <>
                  {item.poster ? (
                    <Image
                      src={item.poster}
                      alt=""
                      fill
                      loading="lazy"
                      className="object-contain"
                      sizes="(max-width: 640px) 23vw, 12vw"
                    />
                  ) : null}
                  <span className="absolute inset-0 flex items-center justify-center bg-brand-olive/24 text-brand-white">
                    <PlayCircle
                      size={30}
                      strokeWidth={1.8}
                      className="drop-shadow"
                      aria-hidden="true"
                    />
                  </span>
                </>
              ) : (
                <Image
                  src={item.src}
                  alt=""
                  fill
                  loading="lazy"
                  className="object-contain"
                  sizes="(max-width: 640px) 23vw, 12vw"
                />
              )}
            </button>
          ))}
        </RevealGroup>
      ) : null}
    </div>
  );
}
