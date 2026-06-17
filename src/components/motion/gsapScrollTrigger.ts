"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let scrollTriggerRegistered = false;

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function ensureScrollTrigger() {
  if (!scrollTriggerRegistered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    scrollTriggerRegistered = true;
  }

  return ScrollTrigger;
}

export { gsap };
