import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { SectionTransitionVariant } from "./motionConfig";

type SectionTransitionProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
  variant?: SectionTransitionVariant;
};

const variantClassNames: Record<SectionTransitionVariant, string> = {
  quiet: "relative isolate",
  "rounded-dark":
    "relative isolate z-10 -mt-5 rounded-t-[2rem] shadow-[0_-24px_70px_rgba(48,50,41,0.10)] md:-mt-7 md:rounded-t-[3rem] lg:rounded-t-[3.5rem]",
  "rounded-light":
    "relative isolate z-10 -mt-5 rounded-t-[2rem] shadow-[0_-24px_70px_rgba(48,50,41,0.08)] md:-mt-7 md:rounded-t-[3rem] lg:rounded-t-[3.5rem]",
  overlap:
    "relative isolate z-10 -mt-4 rounded-t-[2rem] shadow-[0_-18px_48px_rgba(48,50,41,0.07)] md:-mt-6 md:rounded-t-[2.75rem]",
  "image-led":
    "relative isolate z-10 -mt-6 rounded-t-[2rem] shadow-[0_-24px_64px_rgba(48,50,41,0.09)] md:-mt-8 md:rounded-t-[3rem]",
  none: "",
};

const boundaryClassNames: Partial<Record<SectionTransitionVariant, string>> = {
  "rounded-dark": "bg-gradient-to-b from-brand-white/12 to-transparent",
  "rounded-light": "bg-gradient-to-b from-brand-white/65 to-transparent",
  overlap: "bg-gradient-to-b from-brand-white/45 to-transparent",
  "image-led": "bg-gradient-to-b from-brand-olive/10 to-transparent",
};

export function SectionTransition({
  children,
  className,
  variant = "quiet",
  ...props
}: SectionTransitionProps) {
  const boundaryClassName = boundaryClassNames[variant];

  return (
    <section className={cn(variantClassNames[variant], className)} {...props}>
      {boundaryClassName ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-16 rounded-t-[inherit]",
            boundaryClassName,
          )}
        />
      ) : null}

      {children}
    </section>
  );
}
