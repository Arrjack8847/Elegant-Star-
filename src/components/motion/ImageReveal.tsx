"use client";

import { type HTMLAttributes, type ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

import {
  ensureScrollTrigger,
  gsap,
  useIsomorphicLayoutEffect,
} from "./gsapScrollTrigger";
import { motionConfig } from "./motionConfig";

type ImageRevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  delay?: number;
  duration?: number;
  ease?: string;
  mediaClassName?: string;
  once?: boolean;
  scale?: boolean;
  start?: string;
};

export function ImageReveal({
  children,
  className,
  delay = 0,
  duration,
  ease,
  mediaClassName,
  once = true,
  scale = true,
  start,
  ...props
}: ImageRevealProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const frame = frameRef.current;
    const media = mediaRef.current;

    if (!frame || !media) {
      return;
    }

    ensureScrollTrigger();

    let mm: ReturnType<typeof gsap.matchMedia> | null = null;

    const context = gsap.context(() => {
      mm = gsap.matchMedia();

      mm.add(
        {
          mobile: "(max-width: 767px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        ({ conditions }) => {
          const isMobile = conditions?.mobile;
          const reduce = conditions?.reduce;

          if (reduce) {
            gsap.set([frame, media], {
              opacity: 1,
              clearProps: "clipPath,transform,opacity,willChange",
            });

            return;
          }

          const settings = isMobile
            ? motionConfig.mobile
            : motionConfig.desktop;

          const revealDuration = duration ?? settings.imageDuration;
          const revealEase = ease ?? motionConfig.ease.reveal;

          const timeline = gsap.timeline({
            delay,
            scrollTrigger: {
              trigger: frame,
              start: start ?? motionConfig.triggers.image,
              once,
              toggleActions: once
                ? "play none none none"
                : "play none none reverse",
            },
            onStart: () => {
              gsap.set([frame, media], {
                willChange: "clip-path,transform,opacity",
              });
            },
            onComplete: () => {
              gsap.set([frame, media], {
                clearProps: "clipPath,transform,opacity,willChange",
              });
            },
          });

          timeline
            .fromTo(
              frame,
              {
                clipPath: "inset(12% 0% 0% 0% round 1.25rem)",
              },
              {
                clipPath: "inset(0% 0% 0% 0% round 0rem)",
                duration: revealDuration,
                ease: revealEase,
              },
              0,
            )
            .fromTo(
              media,
              {
                opacity: 0.72,
                scale: scale ? 1.04 : 1,
              },
              {
                opacity: 1,
                scale: 1,
                duration: revealDuration,
                ease: revealEase,
              },
              0,
            );
        },
      );
    }, frame);

    return () => {
      mm?.revert();
      context.revert();
    };
  }, [delay, duration, ease, once, scale, start]);

  return (
    <div
      ref={frameRef}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <div
        ref={mediaRef}
        className={cn("relative h-full w-full", mediaClassName)}
      >
        {children}
      </div>
    </div>
  );
}
