import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/our-craft",
  },
};

export default function OurCraftLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
