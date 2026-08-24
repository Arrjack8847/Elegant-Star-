import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/stories",
  },
};

export default function StoriesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
