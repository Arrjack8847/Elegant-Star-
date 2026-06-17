export const AUTO_IMAGE_CLASS_NAME = "h-auto w-full select-none";

export const CONTAINED_IMAGE_CLASS_NAME =
  "h-full w-full select-none object-contain";

export const DEFAULT_TRANSFORM_ORIGIN = "center center";

export const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

export const EDITOR_AVAILABLE = process.env.NODE_ENV !== "production";

export const EDITOR_STORAGE_KEY = "elegant-star-envelope-composition-v2";

export const entranceControl = {
  enabled: true,

  delay: 0.08,

  envelopeDuration: 0.58,
  cardDuration: 0.82,
  decorationDuration: 0.65,
  copyDuration: 0.68,

  supportCardRise: 36,
  mainCardRise: 50,

  backStart: 0,
  frontStart: 0.08,
  supportCardStart: 0.22,
  mainCardStart: 0.34,
  decorationStart: 0.56,
  copyStart: 0.64,

  copyStagger: 0.08,
  ease: "power3.out",
} as const;

export const parallaxControl = {
  enabled: true,

  moveX: 14,
  moveY: 10,

  rotationX: 2.2,
  rotationY: 2.6,

  duration: 0.42,
  ease: "power2.out",
} as const;

export const cardInteractionControl = {
  activeZIndexBoost: 10,

  activeHitAreaZIndex: 190,
  inactiveHitAreaZIndex: 180,

  hoverEnterDuration: 0.46,
  hoverLeaveDuration: 0.62,

  hoverEnterEase: "cubic-bezier(0.16, 1, 0.3, 1)",
  hoverLeaveEase: "cubic-bezier(0.22, 1, 0.36, 1)",

  hoverExitDelay: 70,
} as const;

export const shadowControl = {
  enabled: true,

  left: "15%",
  right: "10%",
  bottom: "4%",

  height: "10%",
  opacity: 0.1,

  blur: 24,
} as const;
