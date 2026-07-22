"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

import { cn } from "@/lib/utils";

export function StudioVideo({
  src,
  poster,
  caption,
  className,
}: {
  src: string;
  poster: string;
  caption: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const captionId = useId();

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasError, setHasError] = useState(false);

  const playVideo = useCallback(async () => {
    const video = videoRef.current;

    if (!video || hasError) {
      return;
    }

    try {
      await video.play();
    } catch {
      // Autoplay can be denied by the browser. The visible play button remains available.
    }
  }, [hasError]);

  const pauseVideo = useCallback(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.pause();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateReducedMotion = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updateReducedMotion();
    mediaQuery.addEventListener("change", updateReducedMotion);

    return () => {
      mediaQuery.removeEventListener("change", updateReducedMotion);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.55 },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    if (!isVisible || prefersReducedMotion) {
      pauseVideo();
      return;
    }

    if (isMuted) {
      void playVideo();
    }
  }, [isMuted, isVisible, pauseVideo, playVideo, prefersReducedMotion]);

  function togglePlayback() {
    if (isPlaying) {
      pauseVideo();
    } else {
      void playVideo();
    }
  }

  function toggleSound() {
    setIsMuted((current) => !current);
  }

  return (
    <figure
      className={cn(
        "mx-auto w-[min(23.75rem,88vw)]",
        "lg:w-[clamp(20rem,27vw,23.75rem)]",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-[9/16] overflow-hidden rounded-[1.7rem]",
          "border border-brand-olive/12 bg-brand-olive",
          "shadow-[0_28px_72px_rgba(48,50,41,0.18)]",
        )}
      >
        {hasError ? (
          <Image
            src={poster}
            alt="Elegant Star studio video poster"
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 88vw, 380px"
          />
        ) : (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted={isMuted}
            playsInline
            loop
            preload="metadata"
            aria-describedby={captionId}
            aria-label={caption}
            className="h-full w-full bg-brand-olive object-contain"
            onError={() => {
              setHasError(true);
              setIsPlaying(false);
            }}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          />
        )}

        {!isPlaying && !hasError ? (
          <button
            type="button"
            onClick={togglePlayback}
            aria-label="Play studio video"
            className="absolute left-1/2 top-1/2 inline-flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand-white/35 bg-brand-white/86 text-brand-olive shadow-[0_14px_34px_rgba(22,25,18,0.18)] transition hover:bg-brand-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-champagne"
          >
            <Play size={22} aria-hidden="true" fill="currentColor" />
          </button>
        ) : null}

        {!hasError ? (
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={
                isPlaying ? "Pause studio video" : "Play studio video"
              }
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-brand-white/25 bg-brand-olive/60 text-brand-white shadow-[0_10px_24px_rgba(22,25,18,0.18)] backdrop-blur-md transition hover:bg-brand-olive/78 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-champagne"
            >
              {isPlaying ? (
                <Pause size={17} aria-hidden="true" />
              ) : (
                <Play size={17} aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleSound}
              aria-label={isMuted ? "Unmute studio video" : "Mute studio video"}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-white/25 bg-brand-olive/60 px-4 text-xs font-bold uppercase tracking-[0.12em] text-brand-white shadow-[0_10px_24px_rgba(22,25,18,0.18)] backdrop-blur-md transition hover:bg-brand-olive/78 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-champagne"
            >
              {isMuted ? (
                <VolumeX size={16} aria-hidden="true" />
              ) : (
                <Volume2 size={16} aria-hidden="true" />
              )}
              {isMuted ? "Muted" : "Sound"}
            </button>
          </div>
        ) : null}
      </div>

      <figcaption
        id={captionId}
        className="mt-4 text-center text-xs font-bold uppercase leading-5 tracking-[0.14em] text-brand-olive/50"
      >
        {caption}
      </figcaption>
    </figure>
  );
}
