import type { SVGProps } from "react";

export type BrandIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function InstagramIcon({ size = 24, ...props }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 24, ...props }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M13.55 22v-8.3h2.8l.42-3.25h-3.22V8.38c0-.94.26-1.58 1.61-1.58h1.72V3.9a23.1 23.1 0 0 0-2.5-.13c-2.48 0-4.18 1.51-4.18 4.29v2.39H7.4v3.25h2.8V22h3.35Z" />
    </svg>
  );
}
