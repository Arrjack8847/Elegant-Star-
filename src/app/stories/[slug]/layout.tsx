import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    alternates: {
      canonical: `/stories/${slug}`,
    },
  };
}

export default function StoryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
