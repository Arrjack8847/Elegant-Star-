"use client";

import { type ComponentPropsWithoutRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Reveal } from "./Reveal";

type AnimatedSectionProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
};

export function AnimatedSection({
  children,
  className,
  ...props
}: AnimatedSectionProps) {
  return (
    <Reveal
      as="section"
      className={cn("relative", className)}
      distance={18}
      duration={0.7}
      {...props}
    >
      {children}
    </Reveal>
  );
}
