"use client";

import { type HTMLAttributes, type ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

import {
  ensureScrollTrigger,
  gsap,
  useIsomorphicLayoutEffect,
} from "./gsapScrollTrigger";
import { motionConfig } from "./motionConfig";

type RevealGroupProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  once?: boolean;
  stagger?: number;
  start?: string;
};

function getRevealItems(container: HTMLElement) {
  const markedItems = Array.from(
    container.querySelectorAll<HTMLElement>("[data-reveal-item]"),
  );

  if (markedItems.length > 0) {
    return markedItems;
  }

  return Array.from(container.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );
}

export function RevealGroup({
  children,
  className,
  delay = 0,
  distance,
  duration,
  once = true,
  stagger,
  start,
  ...props
}: RevealGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    ensureScrollTrigger();

    let mm: ReturnType<typeof gsap.matchMedia> | null = null;

    const context = gsap.context(() => {
      const items = getRevealItems(container);
      mm = gsap.matchMedia();

      if (items.length === 0) {
        return;
      }

      mm.add(
        {
          mobile: "(max-width: 767px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        ({ conditions }) => {
          const isMobile = conditions?.mobile;
          const reduce = conditions?.reduce;

          if (reduce) {
            gsap.set(items, {
              opacity: 1,
              clearProps: "transform,opacity,willChange",
            });

            return;
          }

          const settings = isMobile
            ? motionConfig.mobile
            : motionConfig.desktop;

          const itemStagger = stagger ?? settings.stagger;
          const maxStaggerDelay = settings.maxStaggerDelay;

          gsap.fromTo(
            items,
            {
              opacity: 0,
              y: distance ?? settings.revealDistance,
            },
            {
              opacity: 1,
              y: 0,
              delay,
              duration: duration ?? settings.revealDuration,
              ease: motionConfig.ease.reveal,
              force3D: true,
              stagger: (index) =>
                Math.min(index * itemStagger, maxStaggerDelay),
              scrollTrigger: {
                trigger: container,
                start: start ?? motionConfig.triggers.content,
                once,
                toggleActions: once
                  ? "play none none none"
                  : "play none none reverse",
              },
              onStart: () => {
                gsap.set(items, { willChange: "transform,opacity" });
              },
              onComplete: () => {
                gsap.set(items, {
                  clearProps: "transform,opacity,willChange",
                });
              },
            },
          );
        },
      );
    }, container);

    return () => {
      mm?.revert();
      context.revert();
    };
  }, [delay, distance, duration, once, stagger, start]);

  return (
    <div
      ref={containerRef}
      className={cn("motion-reveal-group", className)}
      {...props}
    >
      {children}
    </div>
  );
}
