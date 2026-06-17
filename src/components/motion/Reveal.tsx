"use client";

import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  useRef,
} from "react";

import { cn } from "@/lib/utils";

import {
  ensureScrollTrigger,
  gsap,
  useIsomorphicLayoutEffect,
} from "./gsapScrollTrigger";
import { motionConfig } from "./motionConfig";

type RevealOwnProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  duration?: number;
  once?: boolean;
  start?: string;
};

type RevealProps<T extends ElementType> = RevealOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof RevealOwnProps<T>>;

export function Reveal<T extends ElementType = "div">({
  as,
  children,
  className,
  delay = 0,
  distance,
  duration,
  once = true,
  start,
  ...props
}: RevealProps<T>) {
  const elementRef = useRef<HTMLElement>(null);
  const Component = as ?? "div";

  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;

    if (!element) {
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
            gsap.set(element, {
              opacity: 1,
              clearProps: "transform,opacity,willChange",
            });

            return;
          }

          const settings = isMobile
            ? motionConfig.mobile
            : motionConfig.desktop;

          gsap.fromTo(
            element,
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
              scrollTrigger: {
                trigger: element,
                start: start ?? motionConfig.triggers.content,
                once,
                toggleActions: once
                  ? "play none none none"
                  : "play none none reverse",
              },
              onStart: () => {
                gsap.set(element, { willChange: "transform,opacity" });
              },
              onComplete: () => {
                gsap.set(element, {
                  clearProps: "transform,opacity,willChange",
                });
              },
            },
          );
        },
      );
    }, element);

    return () => {
      mm?.revert();
      context.revert();
    };
  }, [delay, distance, duration, once, start]);

  return (
    <Component
      ref={elementRef as never}
      className={cn("motion-reveal", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
