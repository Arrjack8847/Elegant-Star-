export const motionConfig = {
  desktop: {
    revealDistance: 32,
    revealDuration: 0.85,
    imageDuration: 1.05,
    stagger: 0.09,
    maxStaggerDelay: 0.58,
  },
  mobile: {
    revealDistance: 20,
    revealDuration: 0.65,
    imageDuration: 0.8,
    stagger: 0.05,
    maxStaggerDelay: 0.34,
  },
  ease: {
    reveal: "power3.out",
    interaction: "power2.out",
  },
  triggers: {
    heading: "top 84%",
    content: "top 80%",
    image: "top 82%",
  },
} as const;

export type SectionTransitionVariant =
  | "quiet"
  | "rounded-dark"
  | "rounded-light"
  | "overlap"
  | "image-led"
  | "none";
