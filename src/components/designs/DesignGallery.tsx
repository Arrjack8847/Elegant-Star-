"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PlayCircle, Volume2 } from "lucide-react";
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
    : [
        {
          type: "image",
          src: design.coverImage,
          label: "Cover 1",
        },
      ];
}

export function DesignGallery({
  design,
}: {
  design: InvitationCollection;
}) {
  const [activeMediaState, setActiveMediaState] = useState({
    slug: design.slug,
    index: 0,
  });

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const media = buildProductMedia(design);

  const active =
    activeMediaState.slug === design.slug ? activeMediaState.index : 0;

  const activeIndex = Math.min(active, media.length - 1);
  const activeMedia = media[activeIndex];
  const visibleThumbnails = media;

  const showThumbnails =
    visibleThumbnails.length > 1 ||
    media.some((item) => item.type === "video");

  /*
   * Mobile browsers allow reliable autoplay only when the video begins muted.
   * Sound can then be enabled after the user taps the button.
   */
  useEffect(() => {
    setSoundEnabled(false);
    setVideoFailed(false);

    if (activeMedia.type !== "video") {
      return;
    }

    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.defaultMuted = true;
    video.muted = true;
    video.volume = 1;

    const startMutedPlayback = async () => {
      try {
        await video.play();
      } catch {
        // Native controls remain available if autoplay is blocked.
      }
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      void startMutedPlayback();
      return;
    }

    video.addEventListener("canplay", startMutedPlayback, {
      once: true,
    });

    return () => {
      video.removeEventListener("canplay", startMutedPlayback);
    };
  }, [activeMedia.src, activeMedia.type]);

  const enableSound = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    try {
      /*
       * This runs directly from a user tap, so mobile browsers can permit
       * audio playback.
       */
      video.muted = false;
      video.volume = 1;

      await video.play();

      setSoundEnabled(true);
    } catch {
      video.muted = true;
      setSoundEnabled(false);
    }
  };

  const selectMedia = (index: number) => {
    videoRef.current?.pause();

    setSoundEnabled(false);
    setVideoFailed(false);

    setActiveMediaState({
      slug: design.slug,
      index,
    });
  };

  return (
    <div className="grid gap-4">
      <ImageReveal className="relative aspect-[4/5] rounded-[20px] bg-brand-paper shadow-paper sm:rounded-[22px]">
        {activeMedia.type === "video" ? (
          <div className="relative h-full w-full">
            {videoFailed && activeMedia.poster ? (
              <div className="relative h-full w-full">
                <Image
                  src={activeMedia.poster}
                  alt={`${design.name} video preview`}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1023px) calc(100vw - 2rem), 52vw"
                />

                <div className="absolute inset-x-4 bottom-4 rounded-xl bg-brand-olive/85 px-4 py-3 text-center text-sm text-brand-white backdrop-blur">
                  This video format is not supported on this device.
                </div>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  key={activeMedia.src}
                  src={activeMedia.src}
                  aria-label={`${design.name} video`}
                  className="h-full w-full object-contain"
                  autoPlay
                  muted={!soundEnabled}
                  controls
                  loop
                  playsInline
                  preload="metadata"
                  poster={activeMedia.poster}
                  onLoadedData={() => setVideoFailed(false)}
                  onError={() => setVideoFailed(true)}
                />

                {!soundEnabled ? (
                  <button
                    type="button"
                    onClick={enableSound}
                    className={cn(
                      "absolute left-1/2 top-1/2 z-20",
                      "inline-flex min-h-12 -translate-x-1/2 -translate-y-1/2",
                      "touch-manipulation items-center gap-2",
                      "rounded-full border border-white/20",
                      "bg-brand-olive/82 px-5 py-3",
                      "text-sm font-bold text-brand-white",
                      "shadow-lg backdrop-blur-md",
                      "transition hover:bg-brand-olive",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-brand-champagne",
                      "focus-visible:ring-offset-2",
                    )}
                    aria-label="Enable video sound"
                  >
                    <Volume2 size={18} aria-hidden="true" />
                    Tap for sound
                  </button>
                ) : null}
              </>
            )}
          </div>
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
        <RevealGroup
          className="grid grid-cols-4 gap-2 sm:gap-3"
          stagger={0.04}
        >
          {visibleThumbnails.map((item, index) => (
            <button
              key={`${item.type}-${item.src}`}
              type="button"
              onClick={() => selectMedia(index)}
              aria-label={`Show ${design.name} ${item.label.toLowerCase()}`}
              aria-pressed={activeIndex === index}
              className={cn(
                "relative aspect-[4/5] touch-manipulation",
                "overflow-hidden rounded-xl border",
                "transition motion-reduce:transition-none",
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

                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-brand-olive/24 text-brand-white">
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