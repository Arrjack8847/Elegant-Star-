"use client";

import { type HTMLAttributes, type ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

import {
  ensureScrollTrigger,
  gsap,
  useIsomorphicLayoutEffect,
} from "./gsapScrollTrigger";

type ParallaxMediaProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  disabled?: boolean;
  distance?: number;
  end?: string;
  mediaClassName?: string;
  start?: string;
  yPercent?: number;
};

export function ParallaxMedia({
  children,
  className,
  disabled = false,
  distance,
  end = "bottom top",
  mediaClassName,
  start = "top bottom",
  yPercent = -6,
  ...props
}: ParallaxMediaProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const frame = frameRef.current;
    const media = mediaRef.current;

    if (!frame || !media || disabled) {
      return;
    }

    ensureScrollTrigger();

    let mm: ReturnType<typeof gsap.matchMedia> | null = null;

    const context = gsap.context(() => {
      mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        ({ conditions }) => {
          if (!conditions?.desktop || conditions?.reduce) {
            gsap.set(media, {
              clearProps: "transform,willChange",
            });

            return;
          }

          const movement = distance
            ? -Math.min(Math.abs(distance), 8)
            : yPercent;

          gsap.fromTo(
            media,
            {
              yPercent: Math.abs(movement) * 0.45,
            },
            {
              yPercent: movement,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                start,
                end,
                scrub: 0.6,
              },
              onStart: () => {
                gsap.set(media, { willChange: "transform" });
              },
              onComplete: () => {
                gsap.set(media, { clearProps: "willChange" });
              },
            },
          );
        },
      );
    }, frame);

    return () => {
      mm?.revert();
      context.revert();
    };
  }, [disabled, distance, end, start, yPercent]);

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
