"use client";

import { useEffect, useState } from "react";

type DetectedBreakpoint = "mobile" | "tablet" | "desktop";

export function useDetectedBreakpoint(): DetectedBreakpoint {
  const [breakpoint, setBreakpoint] = useState<DetectedBreakpoint>("desktop");

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const tabletQuery = window.matchMedia("(min-width: 640px)");

    const updateBreakpoint = () => {
      if (desktopQuery.matches) {
        setBreakpoint("desktop");
        return;
      }

      if (tabletQuery.matches) {
        setBreakpoint("tablet");
        return;
      }

      setBreakpoint("mobile");
    };

    updateBreakpoint();

    desktopQuery.addEventListener("change", updateBreakpoint);
    tabletQuery.addEventListener("change", updateBreakpoint);

    return () => {
      desktopQuery.removeEventListener("change", updateBreakpoint);
      tabletQuery.removeEventListener("change", updateBreakpoint);
    };
  }, []);

  return breakpoint;
}
