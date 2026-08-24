import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/collections",
  },
};

export default function CollectionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
