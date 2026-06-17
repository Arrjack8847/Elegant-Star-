"use client";

import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-bold leading-snug transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-olive text-brand-white shadow-soft hover:-translate-y-0.5 hover:bg-[#3f4236] focus-visible:outline-brand-champagne",
  secondary:
    "border border-brand-olive/20 bg-brand-white/72 text-brand-olive hover:-translate-y-0.5 hover:border-brand-sage hover:bg-brand-white focus-visible:outline-brand-champagne",
  ghost:
    "text-brand-olive hover:bg-brand-olive/8 focus-visible:outline-brand-champagne",
  dark: "bg-brand-ivory text-brand-olive shadow-soft hover:-translate-y-0.5 hover:bg-brand-white focus-visible:outline-brand-champagne",
};

export function buttonClassName(
  variant: Variant = "primary",
  className?: string,
) {
  return cn(base, variants[variant], className);
}

export function ButtonLink({
  children,
  variant = "primary",
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <Link {...props} className={buttonClassName(variant, className)}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <button
      type="button"
      {...props}
      className={buttonClassName(variant, className)}
    >
      {children}
    </button>
  );
}
