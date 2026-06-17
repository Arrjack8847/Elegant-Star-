"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight, Copy, RotateCcw, Settings2, X } from "lucide-react";

import { EnquiryButton } from "@/components/enquiry/EnquiryButton";
import { ButtonLink } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

import { assetSize, heroAsset, sceneSizes } from "./envelope-assets";
import {
  AUTO_IMAGE_CLASS_NAME,
  CONTAINED_IMAGE_CLASS_NAME,
  DEFAULT_TRANSFORM_ORIGIN,
  EDITOR_AVAILABLE,
  EDITOR_STORAGE_KEY,
  FINE_POINTER_QUERY,
  cardInteractionControl,
  entranceControl,
  parallaxControl,
  shadowControl,
} from "./envelope-controls";
import { LAYER_LABELS } from "./envelope-labels";
import { useDetectedBreakpoint } from "./useDetectedBreakpoint";

type HeroAssetKey = keyof typeof heroAsset;

type CardLayerId = "support-card" | "main-card";

type HeroLayerId = "sprig" | "back" | CardLayerId | "front" | "ribbon";

type NonCardLayerId = Exclude<HeroLayerId, CardLayerId>;

type Breakpoint = "mobile" | "tablet" | "desktop";
type PreviewMode = "auto" | Breakpoint;
type EditorTarget = "scene" | HeroLayerId;

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type CardHitAreaConfig = {
  left: string;
  top: string;
  width: string;
  height: string;
  clipPath?: string;
};

type CardInteractionConfig = {
  label: string;
  activeHitArea: CardHitAreaConfig;
  inactiveHitArea: CardHitAreaConfig;
};

type HeroImageLoading = {
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

type CardHoverConfig = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
};

type HeroLayerBaseDefinition = HeroImageLoading & {
  id: HeroLayerId;
  asset: HeroAssetKey;
  enabled?: boolean;
  shadow?: CSSProperties["filter"];
  imageClassName: string;
};

type CardHeroLayerDefinition = HeroLayerBaseDefinition & {
  id: CardLayerId;
  hover: CardHoverConfig;
  interaction: CardInteractionConfig;
};

type NonCardHeroLayerDefinition = HeroLayerBaseDefinition & {
  id: NonCardLayerId;
  hover?: never;
  interaction?: never;
};

type HeroLayerDefinition = CardHeroLayerDefinition | NonCardHeroLayerDefinition;

type LayerPlacement = {
  left: number;
  top: number;
  width: number;
  height?: number;

  x: number;
  y: number;

  rotate: number;
  scale: number;
  scaleX: number;
  scaleY: number;

  opacity: number;
  zIndex: number;
};

type ScenePlacement = {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  perspective: number;
};

type ResponsiveValue<T> = Record<Breakpoint, T>;

type EnvelopeCompositionLayout = {
  scene: ResponsiveValue<ScenePlacement>;
  layers: Record<HeroLayerId, ResponsiveValue<LayerPlacement>>;
};

type LayerStyles = {
  wrapper: CSSProperties;
  visual: CSSProperties;
};

type QuickToSetter = (value: number) => gsap.core.Tween;

type ParallaxSetters = {
  x: QuickToSetter;
  y: QuickToSetter;
  rotationX: QuickToSetter;
  rotationY: QuickToSetter;
};

type DebugOptions = {
  showBounds: boolean;
  showHitAreas: boolean;
  showLabels: boolean;
};

type DragState = {
  pointerId: number;
  target: EditorTarget;
  breakpoint: Breakpoint;

  startClientX: number;
  startClientY: number;

  startX: number;
  startY: number;
};

/* -------------------------------------------------------------------------- */
/*                           INITIAL ENTRANCE STATE                           */
/* -------------------------------------------------------------------------- */

const entranceInitialClassName = [
  "invisible",
  "opacity-0",
  "motion-reduce:visible",
  "motion-reduce:opacity-100",
].join(" ");

/* -------------------------------------------------------------------------- */
/*                              LAYER DEFINITIONS                             */
/* -------------------------------------------------------------------------- */

const heroLayerDefinitions: readonly HeroLayerDefinition[] = [
  {
    id: "sprig",
    asset: "sprig",
    loading: "lazy",
    imageClassName: AUTO_IMAGE_CLASS_NAME,
  },
  {
    id: "back",
    asset: "back",
    loading: "eager",
    imageClassName: CONTAINED_IMAGE_CLASS_NAME,
  },
  {
    id: "support-card",
    asset: "support",
    loading: "eager",
    shadow: "drop-shadow(0 20px 26px rgba(48, 50, 41, 0.16))",
    imageClassName: AUTO_IMAGE_CLASS_NAME,

    hover: {
      x: 0,
      y: -12,
      rotate: 0,
      scale: 1.006,
    },

    interaction: {
      label: "Support invitation card",

      activeHitArea: {
        left: "23.1%",
        top: "13.1%",
        width: "52.7%",
        height: "46.8%",
        clipPath: "inset(0 round 1.5%)",
      },

      inactiveHitArea: {
        left: "68%",
        top: "13%",
        width: "25%",
        height: "39%",
        clipPath: "polygon(0 0, 100% 5%, 100% 100%, 12% 92%)",
      },
    },
  },
  {
    id: "main-card",
    asset: "card",
    loading: "eager",
    fetchPriority: "high",
    shadow: "drop-shadow(0 24px 30px rgba(48, 50, 41, 0.18))",
    imageClassName: AUTO_IMAGE_CLASS_NAME,

    hover: {
      x: 0,
      y: -12,
      rotate: 0,
      scale: 1.006,
    },

    interaction: {
      label: "Main invitation card",

      activeHitArea: {
        left: "17.6%",
        top: "3.8%",
        width: "64.7%",
        height: "56.2%",
        clipPath: "inset(0 round 1.5%)",
      },

      inactiveHitArea: {
        left: "8%",
        top: "8%",
        width: "25%",
        height: "39%",
        clipPath: "polygon(0 5%, 100% 0, 88% 92%, 0 100%)",
      },
    },
  },
  {
    id: "front",
    asset: "front",
    loading: "eager",
    imageClassName: CONTAINED_IMAGE_CLASS_NAME,
  },
  {
    id: "ribbon",
    asset: "ribbon",
    loading: "lazy",
    imageClassName: AUTO_IMAGE_CLASS_NAME,
  },
];

/* -------------------------------------------------------------------------- */
/*                    EDITABLE COMPOSITION CONTROL PANEL                      */
/* -------------------------------------------------------------------------- */

function createResponsiveValue<T extends object>(
  desktop: T,
  tablet: Partial<T> = {},
  mobile: Partial<T> = {},
): ResponsiveValue<T> {
  return {
    desktop: { ...desktop },
    tablet: { ...desktop, ...tablet },
    mobile: { ...desktop, ...mobile },
  };
}

const DEFAULT_COMPOSITION_LAYOUT: EnvelopeCompositionLayout = {
  scene: createResponsiveValue<ScenePlacement>(
    {
      x: 2,
      y: -2,
      scale: 1.08,
      rotate: 0,
      perspective: 1100,
    },
    {
      x: 0,
      y: -1,
      scale: 1.02,
      perspective: 1000,
    },
    {
      x: 0,
      y: 2,
      scale: 0.96,
      perspective: 900,
    },
  ),

  layers: {
    sprig: createResponsiveValue<LayerPlacement>(
      {
        left: -15,
        top: 4,
        width: 66,

        x: 0,
        y: 0,

        rotate: -3,
        scale: 1,
        scaleX: 1,
        scaleY: 1,

        opacity: 1,
        zIndex: 10,
      },
      {
        left: -17,
        top: 5,
        width: 69,
      },
      {
        left: -20,
        top: 8,
        width: 72,
        rotate: -5,
      },
    ),

    back: createResponsiveValue<LayerPlacement>(
      {
        left: 0,
        top: -10,
        width: 100,
        height: 100,

        x: 0,
        y: 0,

        rotate: 0,
        scale: 1,
        scaleX: 1,
        scaleY: 1,

        opacity: 1,
        zIndex: 20,
      },
      {
        top: -8,
      },
      {
        top: -5,
        scale: 0.98,
      },
    ),

    "support-card": createResponsiveValue<LayerPlacement>(
      {
        left: 23,
        top: 0,
        width: 76,

        x: 0,
        y: 0,

        rotate: 5,
        scale: 1,
        scaleX: 1,
        scaleY: 1,

        opacity: 1,
        zIndex: 30,
      },
      {
        left: 21,
        top: 1,
        width: 79,
      },
      {
        left: 18,
        top: 4,
        width: 84,
        rotate: 3.5,
      },
    ),

    "main-card": createResponsiveValue<LayerPlacement>(
      {
        left: 5,
        top: -8,
        width: 90,

        x: 0,
        y: 0,

        rotate: -1.4,
        scale: 1,
        scaleX: 1,
        scaleY: 1,

        opacity: 1,
        zIndex: 30,
      },
      {
        left: 4,
        top: -6,
        width: 92,
      },
      {
        left: 2,
        top: -1,
        width: 96,
        rotate: -1,
      },
    ),

    front: createResponsiveValue<LayerPlacement>(
      {
        left: 0,
        top: 10,
        width: 100,
        height: 100,

        x: 0,
        y: 0,

        rotate: 0,
        scale: 0.88,
        scaleX: 1,
        scaleY: 1,

        opacity: 1,
        zIndex: 50,
      },
      {
        top: 11,
        scale: 0.89,
      },
      {
        top: 13,
        scale: 0.9,
      },
    ),

    ribbon: createResponsiveValue<LayerPlacement>(
      {
        left: 50,
        top: 45,
        width: 68,

        x: 0,
        y: 0,

        rotate: 90,
        scale: 1,
        scaleX: 1,
        scaleY: 1,

        opacity: 1,
        zIndex: 60,
      },
      {
        left: 49,
        top: 46,
        width: 70,
      },
      {
        left: 47,
        top: 48,
        width: 74,
      },
    ),
  },
};

/* -------------------------------------------------------------------------- */
/*                               TYPE GUARDS                                  */
/* -------------------------------------------------------------------------- */

function isCardLayer(layerId: HeroLayerId): layerId is CardLayerId {
  return layerId === "main-card" || layerId === "support-card";
}

function isCardLayerDefinition(
  layer: HeroLayerDefinition,
): layer is CardHeroLayerDefinition {
  return isCardLayer(layer.id);
}

const visibleHeroLayers = heroLayerDefinitions.filter(
  (layer) => layer.enabled !== false,
);

const interactiveCardLayers = visibleHeroLayers.filter(isCardLayerDefinition);

/* -------------------------------------------------------------------------- */
/*                              SHARED HELPERS                                */
/* -------------------------------------------------------------------------- */

function cloneCompositionLayout(): EnvelopeCompositionLayout {
  return JSON.parse(
    JSON.stringify(DEFAULT_COMPOSITION_LAYOUT),
  ) as EnvelopeCompositionLayout;
}

function updateCardInteractionState(
  currentCard: CardLayerId | null,
  cardId: CardLayerId,
  active: boolean,
): CardLayerId | null {
  if (active) {
    return cardId;
  }

  return currentCard === cardId ? null : currentCard;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function resetParallaxElement(element: HTMLDivElement) {
  gsap.set(element, {
    x: 0,
    y: 0,
    rotationX: 0,
    rotationY: 0,
  });
}

function resetParallaxSetters(setters: ParallaxSetters) {
  setters.x(0);
  setters.y(0);
  setters.rotationX(0);
  setters.rotationY(0);
}

function getLayerTransform(placement: LayerPlacement, hover?: CardHoverConfig) {
  const hoverX = hover?.x ?? 0;
  const hoverY = hover?.y ?? 0;
  const hoverRotate = hover?.rotate ?? 0;
  const hoverScale = hover?.scale ?? 1;

  return [
    `translate3d(calc(${placement.x}% + ${hoverX}px), calc(${placement.y}% + ${hoverY}px), 0)`,
    `rotate(${placement.rotate + hoverRotate}deg)`,
    `scale(${placement.scale * hoverScale})`,
    `scaleX(${placement.scaleX})`,
    `scaleY(${placement.scaleY})`,
  ].join(" ");
}

function getSceneTransform(scene: ScenePlacement) {
  return [
    `translate(${scene.x}%, ${scene.y}%)`,
    `rotate(${scene.rotate}deg)`,
    `scale(${scene.scale})`,
  ].join(" ");
}

function getLayerStyles(
  definition: HeroLayerDefinition,
  placement: LayerPlacement,
  liftedCard: CardLayerId | null,
  activeCard: CardLayerId,
  reducedMotion: boolean,
): LayerStyles {
  const isCard = isCardLayerDefinition(definition);

  const isLifted = isCard && !reducedMotion && liftedCard === definition.id;

  const isActiveCard = isCard && activeCard === definition.id;

  const hover = isCard && isLifted ? definition.hover : undefined;

  const zIndex = isCard
    ? placement.zIndex +
      (isActiveCard ? cardInteractionControl.activeZIndexBoost : 0)
    : placement.zIndex;

  return {
    wrapper: {
      left: `${placement.left}%`,
      top: `${placement.top}%`,

      width: `${placement.width}%`,
      height:
        placement.height !== undefined ? `${placement.height}%` : undefined,

      zIndex,
    },

    visual: {
      width: "100%",
      height: placement.height !== undefined ? "100%" : undefined,

      opacity: placement.opacity,

      transformOrigin: DEFAULT_TRANSFORM_ORIGIN,

      transform: getLayerTransform(placement, hover),

      filter: definition.shadow,

      transitionProperty: isCard && !reducedMotion ? "transform" : undefined,

      transitionDuration:
        isCard && !reducedMotion
          ? `${
              isLifted
                ? cardInteractionControl.hoverEnterDuration
                : cardInteractionControl.hoverLeaveDuration
            }s`
          : undefined,

      transitionTimingFunction:
        isCard && !reducedMotion
          ? isLifted
            ? cardInteractionControl.hoverEnterEase
            : cardInteractionControl.hoverLeaveEase
          : undefined,

      willChange: isCard && !reducedMotion ? "transform" : undefined,

      backfaceVisibility: "hidden",
      WebkitBackfaceVisibility: "hidden",
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                              HERO COMPONENT                                */
/* -------------------------------------------------------------------------- */

export function EnvelopeHero() {
  const instructionId = useId();

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  const parallaxSettersRef = useRef<ParallaxSetters | null>(null);

  const hoverExitTimerRef = useRef<number | null>(null);

  const dragStateRef = useRef<DragState | null>(null);

  const detectedBreakpoint = useDetectedBreakpoint();

  const [compositionLayout, setCompositionLayout] =
    useState<EnvelopeCompositionLayout>(cloneCompositionLayout);

  const [editorHydrated, setEditorHydrated] = useState(!EDITOR_AVAILABLE);

  const [editorOpen, setEditorOpen] = useState(false);

  const [previewMode, setPreviewMode] = useState<PreviewMode>("auto");

  const [selectedTarget, setSelectedTarget] =
    useState<EditorTarget>("main-card");

  const [debugOptions, setDebugOptions] = useState<DebugOptions>({
    showBounds: true,
    showHitAreas: true,
    showLabels: true,
  });

  const [copyStatus, setCopyStatus] = useState("");

  const [isEditorDragging, setIsEditorDragging] = useState(false);

  const [activeCard, setActiveCard] = useState<CardLayerId>("main-card");

  const [hoveredCard, setHoveredCard] = useState<CardLayerId | null>(null);

  const [focusedCard, setFocusedCard] = useState<CardLayerId | null>(null);

  const [canUseParallax, setCanUseParallax] = useState(false);

  const [entranceComplete, setEntranceComplete] = useState(false);

  const reducedMotion = useReducedMotion();

  const activeBreakpoint: Breakpoint =
    previewMode === "auto" ? detectedBreakpoint : previewMode;

  const liftedCard = hoveredCard ?? focusedCard;

  const scenePlacement = compositionLayout.scene[activeBreakpoint];

  const cancelEditorDrag = useCallback(() => {
    dragStateRef.current = null;
    setIsEditorDragging(false);
  }, []);

  const toggleEditorOpen = useCallback(() => {
    cancelEditorDrag();

    setEditorOpen((current) => !current);
  }, [cancelEditorDrag]);

  const handlePreviewModeChange = useCallback(
    (nextMode: PreviewMode) => {
      cancelEditorDrag();
      setPreviewMode(nextMode);
    },
    [cancelEditorDrag],
  );

  /* ------------------------------------------------------------------------ */
  /* EDITOR STORAGE                                                           */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!EDITOR_AVAILABLE) {
      return;
    }

    const hydrationFrame = window.requestAnimationFrame(() => {
      try {
        const savedLayout = window.localStorage.getItem(EDITOR_STORAGE_KEY);

        if (savedLayout) {
          setCompositionLayout(
            JSON.parse(savedLayout) as EnvelopeCompositionLayout,
          );
        }
      } catch {
        window.localStorage.removeItem(EDITOR_STORAGE_KEY);
      } finally {
        setEditorHydrated(true);
      }
    });

    return () => {
      window.cancelAnimationFrame(hydrationFrame);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (hoverExitTimerRef.current) {
        window.clearTimeout(hoverExitTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!EDITOR_AVAILABLE || !editorHydrated) {
      return;
    }

    window.localStorage.setItem(
      EDITOR_STORAGE_KEY,
      JSON.stringify(compositionLayout),
    );
  }, [compositionLayout, editorHydrated]);

  useEffect(() => {
    if (!EDITOR_AVAILABLE) {
      return;
    }

    const handleShortcut = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key.toLowerCase() === "e") {
        event.preventDefault();

        toggleEditorOpen();
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, [toggleEditorOpen]);

  /* ------------------------------------------------------------------------ */
  /* EDITOR UPDATERS                                                          */
  /* ------------------------------------------------------------------------ */

  const updateSceneValue = useCallback(
    (key: keyof ScenePlacement, value: number) => {
      setCompositionLayout((current) => ({
        ...current,

        scene: {
          ...current.scene,

          [activeBreakpoint]: {
            ...current.scene[activeBreakpoint],

            [key]: value,
          },
        },
      }));
    },
    [activeBreakpoint],
  );

  const updateLayerValue = useCallback(
    (layerId: HeroLayerId, key: keyof LayerPlacement, value: number) => {
      setCompositionLayout((current) => ({
        ...current,

        layers: {
          ...current.layers,

          [layerId]: {
            ...current.layers[layerId],

            [activeBreakpoint]: {
              ...current.layers[layerId][activeBreakpoint],

              [key]: value,
            },
          },
        },
      }));
    },
    [activeBreakpoint],
  );

  const resetSelectedTarget = useCallback(() => {
    setCompositionLayout((current) => {
      const defaults = cloneCompositionLayout();

      if (selectedTarget === "scene") {
        return {
          ...current,

          scene: {
            ...current.scene,

            [activeBreakpoint]: defaults.scene[activeBreakpoint],
          },
        };
      }

      return {
        ...current,

        layers: {
          ...current.layers,

          [selectedTarget]: {
            ...current.layers[selectedTarget],

            [activeBreakpoint]:
              defaults.layers[selectedTarget][activeBreakpoint],
          },
        },
      };
    });
  }, [activeBreakpoint, selectedTarget]);

  const resetCurrentBreakpoint = useCallback(() => {
    setCompositionLayout((current) => {
      const defaults = cloneCompositionLayout();

      const nextLayers = {
        ...current.layers,
      };

      (Object.keys(nextLayers) as HeroLayerId[]).forEach((layerId) => {
        nextLayers[layerId] = {
          ...nextLayers[layerId],

          [activeBreakpoint]: defaults.layers[layerId][activeBreakpoint],
        };
      });

      return {
        scene: {
          ...current.scene,

          [activeBreakpoint]: defaults.scene[activeBreakpoint],
        },

        layers: nextLayers,
      };
    });
  }, [activeBreakpoint]);

  const resetAllComposition = useCallback(() => {
    setCompositionLayout(cloneCompositionLayout());

    window.localStorage.removeItem(EDITOR_STORAGE_KEY);
  }, []);

  const copyCompositionConfig = useCallback(async () => {
    const text = [
      "const DEFAULT_COMPOSITION_LAYOUT = ",
      JSON.stringify(compositionLayout, null, 2),
      " as const;",
    ].join("");

    try {
      await navigator.clipboard.writeText(text);

      setCopyStatus("Composition copied");
    } catch {
      setCopyStatus("Unable to copy");
    }

    window.setTimeout(() => {
      setCopyStatus("");
    }, 1800);
  }, [compositionLayout]);

  /* ------------------------------------------------------------------------ */
  /* TIMER HELPERS                                                            */
  /* ------------------------------------------------------------------------ */

  const clearHoverExitTimer = useCallback(() => {
    if (hoverExitTimerRef.current === null) {
      return;
    }

    window.clearTimeout(hoverExitTimerRef.current);

    hoverExitTimerRef.current = null;
  }, []);

  const clearTemporaryCardState = useCallback(() => {
    clearHoverExitTimer();

    setHoveredCard(null);
    setFocusedCard(null);
  }, [clearHoverExitTimer]);

  useEffect(() => {
    return () => {
      clearHoverExitTimer();
    };
  }, [clearHoverExitTimer]);

  /* ------------------------------------------------------------------------ */
  /* HERO ENTRANCE ANIMATION                                                  */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    let cancelled = false;

    const context = gsap.context(() => {
      const entranceElements = gsap.utils.toArray<HTMLElement>(
        "[data-hero-entrance]",
      );

      const copyElements = gsap.utils.toArray<HTMLElement>("[data-hero-copy]");

      const allEntranceElements = [...entranceElements, ...copyElements];

      if (reducedMotion || !entranceControl.enabled) {
        gsap.set(allEntranceElements, {
          autoAlpha: 1,

          clearProps: "transform,willChange",
        });

        if (!cancelled) {
          setEntranceComplete(true);
        }

        return;
      }

      setEntranceComplete(false);
      clearTemporaryCardState();

      gsap.set(allEntranceElements, {
        willChange: "transform,opacity",

        force3D: true,
      });

      const timeline = gsap.timeline({
        delay: entranceControl.delay,

        defaults: {
          ease: entranceControl.ease,
        },

        onComplete: () => {
          gsap.set(allEntranceElements, {
            clearProps: "transform,willChange",
          });

          if (!cancelled) {
            setEntranceComplete(true);
          }
        },
      });

      timeline
        .fromTo(
          '[data-hero-entrance="back"]',
          {
            autoAlpha: 0,
            y: 14,
            scale: 0.99,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,

            duration: entranceControl.envelopeDuration,
          },
          entranceControl.backStart,
        )
        .fromTo(
          '[data-hero-entrance="front"]',
          {
            autoAlpha: 0,
            y: 18,
            scale: 0.99,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,

            duration: entranceControl.envelopeDuration,
          },
          entranceControl.frontStart,
        )
        .fromTo(
          '[data-hero-entrance="support-card"]',
          {
            autoAlpha: 0,

            y: entranceControl.supportCardRise,

            scale: 0.985,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,

            duration: entranceControl.cardDuration,
          },
          entranceControl.supportCardStart,
        )
        .fromTo(
          '[data-hero-entrance="main-card"]',
          {
            autoAlpha: 0,

            y: entranceControl.mainCardRise,

            scale: 0.98,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,

            duration: entranceControl.cardDuration,
          },
          entranceControl.mainCardStart,
        )
        .fromTo(
          '[data-hero-entrance="sprig"]',
          {
            autoAlpha: 0,

            x: -16,
            y: 10,

            scale: 0.97,
          },
          {
            autoAlpha: 1,

            x: 0,
            y: 0,

            scale: 1,

            duration: entranceControl.decorationDuration,
          },
          entranceControl.decorationStart,
        )
        .fromTo(
          '[data-hero-entrance="ribbon"]',
          {
            autoAlpha: 0,

            x: 16,
            y: 10,

            scale: 0.97,
          },
          {
            autoAlpha: 1,

            x: 0,
            y: 0,

            scale: 1,

            duration: entranceControl.decorationDuration,
          },
          entranceControl.decorationStart + 0.08,
        )
        .fromTo(
          copyElements,
          {
            autoAlpha: 0,
            y: 16,
          },
          {
            autoAlpha: 1,
            y: 0,

            duration: entranceControl.copyDuration,

            stagger: entranceControl.copyStagger,
          },
          entranceControl.copyStart,
        );
    }, section);

    return () => {
      cancelled = true;
      context.revert();
    };
  }, [clearTemporaryCardState, reducedMotion]);

  /* ------------------------------------------------------------------------ */
  /* PARALLAX CAPABILITY                                                      */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const mediaQuery = window.matchMedia(FINE_POINTER_QUERY);

    const updateCapability = () => {
      setCanUseParallax(
        parallaxControl.enabled &&
          !reducedMotion &&
          !editorOpen &&
          mediaQuery.matches,
      );
    };

    updateCapability();

    mediaQuery.addEventListener("change", updateCapability);

    return () => {
      mediaQuery.removeEventListener("change", updateCapability);
    };
  }, [editorOpen, reducedMotion]);

  /* ------------------------------------------------------------------------ */
  /* PARALLAX SETTERS AND CLEANUP                                             */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const parallax = parallaxRef.current;

    if (!parallax) {
      return;
    }

    gsap.killTweensOf(parallax);

    parallaxSettersRef.current = null;

    if (!canUseParallax) {
      resetParallaxElement(parallax);

      return;
    }

    const quickToOptions = {
      duration: parallaxControl.duration,

      ease: parallaxControl.ease,

      overwrite: true,
    } as const;

    const setters: ParallaxSetters = {
      x: gsap.quickTo(parallax, "x", quickToOptions),

      y: gsap.quickTo(parallax, "y", quickToOptions),

      rotationX: gsap.quickTo(parallax, "rotationX", quickToOptions),

      rotationY: gsap.quickTo(parallax, "rotationY", quickToOptions),
    };

    parallaxSettersRef.current = setters;

    return () => {
      if (parallaxSettersRef.current === setters) {
        parallaxSettersRef.current = null;
      }

      gsap.killTweensOf(parallax);

      resetParallaxElement(parallax);
    };
  }, [canUseParallax]);

  /* ------------------------------------------------------------------------ */
  /* POINTER PARALLAX                                                         */
  /* ------------------------------------------------------------------------ */

  const handleParallaxPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (editorOpen || !canUseParallax || !entranceComplete) {
        return;
      }

      if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
        return;
      }

      const setters = parallaxSettersRef.current;

      if (!setters) {
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();

      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }

      const normalizedX = clamp(
        (event.clientX - rect.left) / rect.width - 0.5,
        -0.5,
        0.5,
      );

      const normalizedY = clamp(
        (event.clientY - rect.top) / rect.height - 0.5,
        -0.5,
        0.5,
      );

      setters.x(normalizedX * parallaxControl.moveX);

      setters.y(normalizedY * parallaxControl.moveY);

      setters.rotationY(normalizedX * parallaxControl.rotationY);

      setters.rotationX(normalizedY * -parallaxControl.rotationX);
    },
    [canUseParallax, editorOpen, entranceComplete],
  );

  const handleScenePointerLeave = useCallback(() => {
    if (dragStateRef.current) {
      return;
    }

    clearHoverExitTimer();
    setHoveredCard(null);

    const setters = parallaxSettersRef.current;

    if (setters) {
      resetParallaxSetters(setters);

      return;
    }

    const parallax = parallaxRef.current;

    if (parallax) {
      resetParallaxElement(parallax);
    }
  }, [clearHoverExitTimer]);

  /* ------------------------------------------------------------------------ */
  /* DEVELOPMENT DRAG EDITOR                                                  */
  /* ------------------------------------------------------------------------ */

  const handleEditorPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!editorOpen || event.button !== 0) {
        return;
      }

      const currentTarget = event.currentTarget;

      currentTarget.setPointerCapture(event.pointerId);

      if (selectedTarget === "scene") {
        const current = compositionLayout.scene[activeBreakpoint];

        dragStateRef.current = {
          pointerId: event.pointerId,

          target: selectedTarget,

          breakpoint: activeBreakpoint,

          startClientX: event.clientX,

          startClientY: event.clientY,

          startX: current.x,

          startY: current.y,
        };

        setIsEditorDragging(true);

        return;
      }

      const current =
        compositionLayout.layers[selectedTarget][activeBreakpoint];

      dragStateRef.current = {
        pointerId: event.pointerId,

        target: selectedTarget,

        breakpoint: activeBreakpoint,

        startClientX: event.clientX,

        startClientY: event.clientY,

        startX: current.x,

        startY: current.y,
      };

      setIsEditorDragging(true);
    },
    [activeBreakpoint, compositionLayout, editorOpen, selectedTarget],
  );

  const handleEditorPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const dragState = dragStateRef.current;

      if (
        !editorOpen ||
        !dragState ||
        dragState.pointerId !== event.pointerId
      ) {
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();

      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }

      const deltaX =
        ((event.clientX - dragState.startClientX) / rect.width) * 100;

      const deltaY =
        ((event.clientY - dragState.startClientY) / rect.height) * 100;

      const nextX = Number((dragState.startX + deltaX).toFixed(2));

      const nextY = Number((dragState.startY + deltaY).toFixed(2));

      setCompositionLayout((current) => {
        if (dragState.target === "scene") {
          return {
            ...current,

            scene: {
              ...current.scene,

              [dragState.breakpoint]: {
                ...current.scene[dragState.breakpoint],

                x: nextX,
                y: nextY,
              },
            },
          };
        }

        return {
          ...current,

          layers: {
            ...current.layers,

            [dragState.target]: {
              ...current.layers[dragState.target],

              [dragState.breakpoint]: {
                ...current.layers[dragState.target][dragState.breakpoint],

                x: nextX,
                y: nextY,
              },
            },
          },
        };
      });
    },
    [editorOpen],
  );

  const finishEditorDrag = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (dragStateRef.current?.pointerId !== event.pointerId) {
        return;
      }

      dragStateRef.current = null;

      setIsEditorDragging(false);

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [],
  );

  const handleStagePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      handleEditorPointerMove(event);
      handleParallaxPointerMove(event);
    },
    [handleEditorPointerMove, handleParallaxPointerMove],
  );

  /* ------------------------------------------------------------------------ */
  /* CARD INTERACTIONS                                                        */
  /* ------------------------------------------------------------------------ */

  const handleCardHover = useCallback(
    (cardId: CardLayerId, hovering: boolean) => {
      if (!entranceComplete || editorOpen) {
        return;
      }

      clearHoverExitTimer();

      if (hovering) {
        setHoveredCard(cardId);
        return;
      }

      hoverExitTimerRef.current = window.setTimeout(() => {
        setHoveredCard((currentCard) =>
          currentCard === cardId ? null : currentCard,
        );

        hoverExitTimerRef.current = null;
      }, cardInteractionControl.hoverExitDelay);
    },
    [clearHoverExitTimer, editorOpen, entranceComplete],
  );

  const handleCardFocus = useCallback(
    (cardId: CardLayerId, focused: boolean) => {
      if (!entranceComplete || editorOpen) {
        return;
      }

      setFocusedCard((currentCard) =>
        updateCardInteractionState(currentCard, cardId, focused),
      );
    },
    [editorOpen, entranceComplete],
  );

  const handleCardActivate = useCallback(
    (cardId: CardLayerId, pointerActivation: boolean) => {
      if (!entranceComplete || editorOpen) {
        return;
      }

      if (activeCard === cardId) {
        return;
      }

      if (pointerActivation) {
        clearTemporaryCardState();
      }

      setActiveCard(cardId);
    },
    [activeCard, clearTemporaryCardState, editorOpen, entranceComplete],
  );

  return (
    <section
      ref={sectionRef}
      data-envelope-hero
      data-nav-theme="light"
      className="
        relative
        isolate
        min-h-[100svh]
        overflow-hidden
        pb-12
        pt-28
        sm:pt-32
        sm:pb-16
        lg:pb-20
        lg:pt-28
      "
    >
      <noscript>
        <style>
          {`
            [data-envelope-hero] [data-hero-entrance],
            [data-envelope-hero] [data-hero-copy] {
              opacity: 1 !important;
              visibility: visible !important;
              transform: none !important;
            }
          `}
        </style>
      </noscript>

      {/* Background */}
      <div
        className="
          absolute
          inset-0
          -z-20
        "
        style={{
          background:
            "radial-gradient(circle at 77% 46%, rgba(142, 140, 118, 0.18), transparent 31rem), linear-gradient(135deg, rgba(255, 253, 248, 0.98), rgba(246, 243, 234, 0.94) 44%, rgba(231, 225, 213, 0.72))",
        }}
      />

      {/* Grid texture */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          opacity-[0.075]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(48,50,41,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(48,50,41,0.09) 1px, transparent 1px)",

          backgroundSize: "42px 42px",

          maskImage:
            "radial-gradient(circle at 72% 48%, black, transparent 72%)",

          WebkitMaskImage:
            "radial-gradient(circle at 72% 48%, black, transparent 72%)",
        }}
      />

      <div
        className="
          section-inner
          grid
          min-h-[calc(100svh-11.5rem)]
          items-center
          gap-9
          sm:min-h-[calc(100svh-12rem)]
          lg:grid-cols-[0.44fr_0.56fr]
          lg:gap-4
        "
      >
        {/* Hero copy */}
        <div
          className="
            hero-copy
            order-2
            mx-auto
            w-full
            max-w-xl
            text-center
            lg:order-1
            lg:mx-0
            lg:max-w-[34rem]
            lg:text-left
          "
        >
          <p
            data-hero-copy
            className={[
              entranceInitialClassName,
              "small-label mb-5 text-brand-sage",
            ].join(" ")}
          >
            ELEGANT STAR
          </p>

          <h1
            data-hero-copy
            className={[
              entranceInitialClassName,
              [
                "display-heading",
                "text-balance",
                "text-[2.85rem]",
                "text-brand-olive",
                "sm:text-[3.9rem]",
                "lg:text-[3.35rem]",
                "xl:text-[3.8rem]",
              ].join(" "),
            ].join(" ")}
          >
            Beautiful beginnings,{" "}
            <span className="block">thoughtfully created.</span>
          </h1>

          <p
            data-hero-copy
            className={[
              entranceInitialClassName,
              [
                "body-copy",
                "mx-auto",
                "mt-6",
                "max-w-md",
                "text-base",
                "sm:text-lg",
                "lg:mx-0",
              ].join(" "),
            ].join(" ")}
          >
            Elegant invitation design and printing for weddings and meaningful
            celebrations.
          </p>

          <div
            data-hero-copy
            className={[
              entranceInitialClassName,
              [
                "mt-7",
                "flex",
                "flex-col",
                "gap-3",
                "sm:flex-row",
                "sm:justify-center",
                "lg:justify-start",
              ].join(" "),
            ].join(" ")}
          >
            <ButtonLink
              href="/collections"
              className="
                min-h-12
                whitespace-nowrap
                px-6
              "
              variant="primary"
            >
              Explore Invitations
              <ArrowRight size={17} aria-hidden="true" />
            </ButtonLink>

            <EnquiryButton
              className="
                min-h-12
                whitespace-nowrap
                px-6
              "
              variant="secondary"
            />
          </div>
        </div>

        {/* Hero composition */}
        <div
          className="
            order-1
            min-w-0
            lg:order-2
          "
        >
          <div
            ref={stageRef}
            className="
              hero-envelope-stage
              relative
              mx-auto
              aspect-square
              w-full
              max-w-[37rem]
              sm:max-w-[42rem]
              lg:max-w-[48rem]
            "
            style={{
              perspective: `${scenePlacement.perspective}px`,

              cursor: editorOpen
                ? isEditorDragging
                  ? "grabbing"
                  : "grab"
                : undefined,

              touchAction: editorOpen ? "none" : undefined,
            }}
            role="group"
            aria-label="Interactive Elegant Star invitation cards"
            aria-describedby={instructionId}
            onPointerDown={handleEditorPointerDown}
            onPointerMove={handleStagePointerMove}
            onPointerUp={finishEditorDrag}
            onPointerCancel={finishEditorDrag}
            onPointerLeave={handleScenePointerLeave}
          >
            <p id={instructionId} className="sr-only">
              Use Tab to focus a card, then press Enter or Space to bring it to
              the front.
            </p>

            <div
              ref={parallaxRef}
              className="
                relative
                h-full
                w-full
                [transform-style:preserve-3d]
              "
              style={{
                willChange: canUseParallax ? "transform" : undefined,
              }}
            >
              <div
                className="
                  relative
                  h-full
                  w-full
                  [transform-style:preserve-3d]
                "
                style={{
                  transform: getSceneTransform(scenePlacement),

                  transformOrigin: DEFAULT_TRANSFORM_ORIGIN,

                  outline:
                    editorOpen &&
                    debugOptions.showBounds &&
                    selectedTarget === "scene"
                      ? "2px solid rgba(132, 76, 40, 0.92)"
                      : editorOpen && debugOptions.showBounds
                        ? "1px dashed rgba(132, 76, 40, 0.35)"
                        : undefined,

                  outlineOffset:
                    editorOpen && debugOptions.showBounds ? "4px" : undefined,
                }}
              >
                {editorOpen &&
                  debugOptions.showLabels &&
                  selectedTarget === "scene" && (
                    <DebugLabel>Whole scene</DebugLabel>
                  )}

                {/* Composition shadow */}
                {shadowControl.enabled && (
                  <div
                    className="
                      pointer-events-none
                      absolute
                      rounded-full
                      bg-brand-olive
                    "
                    style={{
                      left: shadowControl.left,

                      right: shadowControl.right,

                      bottom: shadowControl.bottom,

                      height: shadowControl.height,

                      opacity: shadowControl.opacity,

                      filter: `blur(${shadowControl.blur}px)`,
                    }}
                  />
                )}

                {/* Visual layers */}
                {visibleHeroLayers.map((definition) => {
                  const placement =
                    compositionLayout.layers[definition.id][activeBreakpoint];

                  const layerStyles = getLayerStyles(
                    definition,
                    placement,
                    liftedCard,
                    activeCard,
                    reducedMotion,
                  );

                  return (
                    <AssetLayer
                      key={definition.id}
                      layer={definition.id}
                      label={LAYER_LABELS[definition.id]}
                      selected={selectedTarget === definition.id}
                      editorOpen={editorOpen}
                      debugOptions={debugOptions}
                      wrapperStyle={layerStyles.wrapper}
                      visualStyle={layerStyles.visual}
                    >
                      <Image
                        src={heroAsset[definition.asset]}
                        alt=""
                        width={assetSize}
                        height={assetSize}
                        sizes={sceneSizes}
                        loading={definition.loading}
                        fetchPriority={definition.fetchPriority}
                        className={definition.imageClassName}
                        draggable={false}
                      />
                    </AssetLayer>
                  );
                })}

                {/* Interaction areas */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-[170]
                  "
                >
                  {interactiveCardLayers.map((definition) => {
                    const placement =
                      compositionLayout.layers[definition.id][activeBreakpoint];

                    return (
                      <CardInteractionArea
                        key={definition.id}
                        definition={definition}
                        placement={placement}
                        selected={activeCard === definition.id}
                        interactive={entranceComplete && !editorOpen}
                        debugVisible={editorOpen && debugOptions.showHitAreas}
                        onHoverChange={(hovering) =>
                          handleCardHover(definition.id, hovering)
                        }
                        onFocusChange={(focused) =>
                          handleCardFocus(definition.id, focused)
                        }
                        onActivate={(pointerActivation) =>
                          handleCardActivate(definition.id, pointerActivation)
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {EDITOR_AVAILABLE && (
        <>
          <button
            type="button"
            className="
              fixed
              bottom-4
              right-4
              z-[260]
              inline-flex
              min-h-11
              items-center
              gap-2
              rounded-full
              border
              border-brand-olive/20
              bg-white/95
              px-4
              text-sm
              font-medium
              text-brand-olive
              shadow-lg
              backdrop-blur
              transition
              hover:bg-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-brand-olive/50
            "
            onClick={() => {
              toggleEditorOpen();

              clearTemporaryCardState();
            }}
          >
            {editorOpen ? (
              <X size={16} aria-hidden="true" />
            ) : (
              <Settings2 size={16} aria-hidden="true" />
            )}

            {editorOpen ? "Close editor" : "Tune envelope"}
          </button>

          {editorOpen && (
            <EnvelopeCompositionEditor
              layout={compositionLayout}
              activeBreakpoint={activeBreakpoint}
              detectedBreakpoint={detectedBreakpoint}
              previewMode={previewMode}
              selectedTarget={selectedTarget}
              debugOptions={debugOptions}
              copyStatus={copyStatus}
              onPreviewModeChange={handlePreviewModeChange}
              onSelectedTargetChange={setSelectedTarget}
              onDebugOptionsChange={setDebugOptions}
              onSceneValueChange={updateSceneValue}
              onLayerValueChange={updateLayerValue}
              onResetTarget={resetSelectedTarget}
              onResetBreakpoint={resetCurrentBreakpoint}
              onResetAll={resetAllComposition}
              onCopy={copyCompositionConfig}
            />
          )}
        </>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               ASSET LAYER                                  */
/* -------------------------------------------------------------------------- */

function AssetLayer({
  children,
  layer,
  label,
  selected,
  editorOpen,
  debugOptions,
  wrapperStyle,
  visualStyle,
}: {
  children: ReactNode;

  layer: HeroLayerId;
  label: string;

  selected: boolean;
  editorOpen: boolean;

  debugOptions: DebugOptions;

  wrapperStyle: CSSProperties;
  visualStyle: CSSProperties;
}) {
  const hasFixedHeight = wrapperStyle.height !== undefined;

  const layerSizeClassName = ["relative w-full", hasFixedHeight ? "h-full" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      data-hero-layer={layer}
      className="
        pointer-events-none
        absolute
      "
      style={{
        ...wrapperStyle,

        outline:
          editorOpen && debugOptions.showBounds
            ? selected
              ? "2px solid rgba(190, 87, 55, 0.95)"
              : "1px dashed rgba(190, 87, 55, 0.35)"
            : undefined,

        outlineOffset:
          editorOpen && debugOptions.showBounds ? "2px" : undefined,

        backgroundColor:
          editorOpen && debugOptions.showBounds && selected
            ? "rgba(190, 87, 55, 0.035)"
            : undefined,
      }}
      aria-hidden="true"
    >
      {editorOpen && debugOptions.showLabels && selected && (
        <DebugLabel>{label}</DebugLabel>
      )}

      <div
        data-hero-entrance={layer}
        className={[entranceInitialClassName, layerSizeClassName].join(" ")}
      >
        <div className={layerSizeClassName} style={visualStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                DEBUG LABEL                                 */
/* -------------------------------------------------------------------------- */

function DebugLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className="
        pointer-events-none
        absolute
        left-0
        top-0
        z-[250]
        -translate-y-full
        whitespace-nowrap
        rounded-t
        bg-[#6f3f2d]
        px-2
        py-1
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.12em]
        text-white
      "
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                         CARD INTERACTION AREA                              */
/* -------------------------------------------------------------------------- */

function CardInteractionArea({
  definition,
  placement,
  selected,
  interactive,
  debugVisible,

  onHoverChange,
  onFocusChange,
  onActivate,
}: {
  definition: CardHeroLayerDefinition;
  placement: LayerPlacement;

  selected: boolean;
  interactive: boolean;
  debugVisible: boolean;

  onHoverChange: (hovering: boolean) => void;

  onFocusChange: (focused: boolean) => void;

  onActivate: (pointerActivation: boolean) => void;
}) {
  const hitArea = selected
    ? definition.interaction.activeHitArea
    : definition.interaction.inactiveHitArea;

  const zIndex = selected
    ? cardInteractionControl.activeHitAreaZIndex
    : cardInteractionControl.inactiveHitAreaZIndex;

  const handlePointerEnter = (event: PointerEvent<HTMLButtonElement>) => {
    if (
      interactive &&
      (event.pointerType === "mouse" || event.pointerType === "pen")
    ) {
      onHoverChange(true);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (!interactive) {
      return;
    }

    if (event.pointerType === "touch") {
      onHoverChange(false);
    }

    onFocusChange(false);
  };

  const handlePointerEnd = () => {
    if (interactive) {
      onHoverChange(false);
    }
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!interactive) {
      return;
    }

    const pointerActivation = event.detail > 0;

    onActivate(pointerActivation);

    if (pointerActivation) {
      event.currentTarget.blur();
    }
  };

  return (
    <div
      className="
        pointer-events-none
        absolute
      "
      style={{
        left: `${placement.left}%`,
        top: `${placement.top}%`,

        width: `${placement.width}%`,
        height:
          placement.height !== undefined ? `${placement.height}%` : undefined,

        aspectRatio: placement.height === undefined ? "1 / 1" : undefined,

        zIndex,
      }}
    >
      <div
        className="
          relative
          h-full
          w-full
        "
        style={{
          transform: getLayerTransform(placement),

          transformOrigin: DEFAULT_TRANSFORM_ORIGIN,
        }}
      >
        <button
          type="button"
          disabled={!interactive}
          data-card-hit-area={definition.id}
          aria-label={
            selected
              ? `${definition.interaction.label} is selected`
              : `Select ${definition.interaction.label}`
          }
          aria-pressed={selected}
          className={[
            "absolute",
            "select-none",
            "touch-manipulation",
            "border-0",
            "p-0",
            "outline-none",

            "focus-visible:ring-2",
            "focus-visible:ring-brand-olive/60",
            "focus-visible:ring-offset-4",
            "focus-visible:ring-offset-transparent",

            interactive
              ? "pointer-events-auto cursor-pointer bg-transparent"
              : "pointer-events-none cursor-default",
          ].join(" ")}
          style={{
            left: hitArea.left,
            top: hitArea.top,

            width: hitArea.width,
            height: hitArea.height,

            clipPath: hitArea.clipPath,

            WebkitClipPath: hitArea.clipPath,

            backgroundColor: debugVisible
              ? selected
                ? "rgba(37, 99, 235, 0.18)"
                : "rgba(234, 88, 12, 0.18)"
              : "transparent",

            outline: debugVisible
              ? selected
                ? "1px solid rgba(37, 99, 235, 0.9)"
                : "1px solid rgba(234, 88, 12, 0.9)"
              : undefined,
          }}
          onPointerDown={handlePointerDown}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onFocus={(event) => {
            if (interactive && event.currentTarget.matches(":focus-visible")) {
              onFocusChange(true);
            }
          }}
          onBlur={() => {
            if (interactive) {
              onFocusChange(false);
            }
          }}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                       DEVELOPMENT COMPOSITION EDITOR                       */
/* -------------------------------------------------------------------------- */

function EnvelopeCompositionEditor({
  layout,
  activeBreakpoint,
  detectedBreakpoint,
  previewMode,
  selectedTarget,
  debugOptions,
  copyStatus,

  onPreviewModeChange,
  onSelectedTargetChange,
  onDebugOptionsChange,

  onSceneValueChange,
  onLayerValueChange,

  onResetTarget,
  onResetBreakpoint,
  onResetAll,
  onCopy,
}: {
  layout: EnvelopeCompositionLayout;

  activeBreakpoint: Breakpoint;
  detectedBreakpoint: Breakpoint;

  previewMode: PreviewMode;
  selectedTarget: EditorTarget;

  debugOptions: DebugOptions;
  copyStatus: string;

  onPreviewModeChange: (mode: PreviewMode) => void;

  onSelectedTargetChange: (target: EditorTarget) => void;

  onDebugOptionsChange: (options: DebugOptions) => void;

  onSceneValueChange: (key: keyof ScenePlacement, value: number) => void;

  onLayerValueChange: (
    layerId: HeroLayerId,
    key: keyof LayerPlacement,
    value: number,
  ) => void;

  onResetTarget: () => void;
  onResetBreakpoint: () => void;
  onResetAll: () => void;

  onCopy: () => void;
}) {
  const scene = layout.scene[activeBreakpoint];

  const selectedLayer =
    selectedTarget === "scene"
      ? null
      : layout.layers[selectedTarget][activeBreakpoint];

  return (
    <aside
      aria-label="Envelope composition editor"
      className="
        fixed
        bottom-16
        right-4
        z-[250]
        max-h-[calc(100vh-5.5rem)]
        w-[min(23rem,calc(100vw-2rem))]
        overflow-y-auto
        rounded-2xl
        border
        border-black/10
        bg-white/95
        p-4
        text-sm
        text-neutral-800
        shadow-2xl
        backdrop-blur-xl
      "
    >
      <div
        className="
          mb-4
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-brand-sage
            "
          >
            Development tool
          </p>

          <h2
            className="
              mt-1
              text-base
              font-semibold
              text-brand-olive
            "
          >
            Envelope composition
          </h2>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-neutral-500
            "
          >
            Drag the stage to move the selected target. Shortcut: Shift + E.
          </p>
        </div>

        <span
          className="
            rounded-full
            bg-brand-olive/10
            px-2
            py-1
            text-[10px]
            font-semibold
            uppercase
            tracking-wide
            text-brand-olive
          "
        >
          {activeBreakpoint}
        </span>
      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-3
        "
      >
        <EditorSelect
          label="Preview"
          value={previewMode}
          onChange={(value) => onPreviewModeChange(value as PreviewMode)}
          options={[
            {
              value: "auto",
              label: `Auto (${detectedBreakpoint})`,
            },
            {
              value: "desktop",
              label: "Desktop",
            },
            {
              value: "tablet",
              label: "Tablet",
            },
            {
              value: "mobile",
              label: "Mobile",
            },
          ]}
        />

        <EditorSelect
          label="Target"
          value={selectedTarget}
          onChange={(value) => onSelectedTargetChange(value as EditorTarget)}
          options={[
            {
              value: "scene",
              label: "Whole scene",
            },
            ...(Object.keys(LAYER_LABELS) as HeroLayerId[]).map((layerId) => ({
              value: layerId,
              label: LAYER_LABELS[layerId],
            })),
          ]}
        />
      </div>

      <div
        className="
          my-4
          h-px
          bg-black/8
        "
      />

      {selectedTarget === "scene" ? (
        <div
          className="
            space-y-3
          "
        >
          <EditorNumberControl
            label="Scene X"
            value={scene.x}
            min={-40}
            max={40}
            step={0.1}
            suffix="%"
            onChange={(value) => onSceneValueChange("x", value)}
          />

          <EditorNumberControl
            label="Scene Y"
            value={scene.y}
            min={-40}
            max={40}
            step={0.1}
            suffix="%"
            onChange={(value) => onSceneValueChange("y", value)}
          />

          <EditorNumberControl
            label="Scene scale"
            value={scene.scale}
            min={0.4}
            max={1.8}
            step={0.01}
            onChange={(value) => onSceneValueChange("scale", value)}
          />

          <EditorNumberControl
            label="Scene rotation"
            value={scene.rotate}
            min={-30}
            max={30}
            step={0.1}
            suffix="°"
            onChange={(value) => onSceneValueChange("rotate", value)}
          />

          <EditorNumberControl
            label="Perspective"
            value={scene.perspective}
            min={300}
            max={2200}
            step={10}
            suffix="px"
            onChange={(value) => onSceneValueChange("perspective", value)}
          />
        </div>
      ) : (
        selectedLayer && (
          <div
            className="
              space-y-3
            "
          >
            <EditorNumberControl
              label="Left"
              value={selectedLayer.left}
              min={-80}
              max={120}
              step={0.1}
              suffix="%"
              onChange={(value) =>
                onLayerValueChange(selectedTarget, "left", value)
              }
            />

            <EditorNumberControl
              label="Top"
              value={selectedLayer.top}
              min={-80}
              max={120}
              step={0.1}
              suffix="%"
              onChange={(value) =>
                onLayerValueChange(selectedTarget, "top", value)
              }
            />

            <EditorNumberControl
              label="Fine X"
              value={selectedLayer.x}
              min={-60}
              max={60}
              step={0.1}
              suffix="%"
              onChange={(value) =>
                onLayerValueChange(selectedTarget, "x", value)
              }
            />

            <EditorNumberControl
              label="Fine Y"
              value={selectedLayer.y}
              min={-60}
              max={60}
              step={0.1}
              suffix="%"
              onChange={(value) =>
                onLayerValueChange(selectedTarget, "y", value)
              }
            />

            <EditorNumberControl
              label="Width"
              value={selectedLayer.width}
              min={5}
              max={180}
              step={0.1}
              suffix="%"
              onChange={(value) =>
                onLayerValueChange(selectedTarget, "width", value)
              }
            />

            {selectedLayer.height !== undefined && (
              <EditorNumberControl
                label="Height"
                value={selectedLayer.height}
                min={5}
                max={180}
                step={0.1}
                suffix="%"
                onChange={(value) =>
                  onLayerValueChange(selectedTarget, "height", value)
                }
              />
            )}

            <EditorNumberControl
              label="Rotation"
              value={selectedLayer.rotate}
              min={-180}
              max={180}
              step={0.1}
              suffix="°"
              onChange={(value) =>
                onLayerValueChange(selectedTarget, "rotate", value)
              }
            />

            <EditorNumberControl
              label="Scale"
              value={selectedLayer.scale}
              min={0.1}
              max={2}
              step={0.01}
              onChange={(value) =>
                onLayerValueChange(selectedTarget, "scale", value)
              }
            />

            <EditorNumberControl
              label="Scale X"
              value={selectedLayer.scaleX}
              min={-2}
              max={2}
              step={0.01}
              onChange={(value) =>
                onLayerValueChange(selectedTarget, "scaleX", value)
              }
            />

            <EditorNumberControl
              label="Scale Y"
              value={selectedLayer.scaleY}
              min={-2}
              max={2}
              step={0.01}
              onChange={(value) =>
                onLayerValueChange(selectedTarget, "scaleY", value)
              }
            />

            <EditorNumberControl
              label="Opacity"
              value={selectedLayer.opacity}
              min={0}
              max={1}
              step={0.01}
              onChange={(value) =>
                onLayerValueChange(selectedTarget, "opacity", value)
              }
            />

            <EditorNumberControl
              label="Z-index"
              value={selectedLayer.zIndex}
              min={0}
              max={150}
              step={1}
              onChange={(value) =>
                onLayerValueChange(selectedTarget, "zIndex", Math.round(value))
              }
            />
          </div>
        )
      )}

      <div
        className="
          my-4
          h-px
          bg-black/8
        "
      />

      <div
        className="
          grid
          grid-cols-3
          gap-2
        "
      >
        <EditorCheckbox
          label="Bounds"
          checked={debugOptions.showBounds}
          onChange={(checked) =>
            onDebugOptionsChange({
              ...debugOptions,
              showBounds: checked,
            })
          }
        />

        <EditorCheckbox
          label="Hit areas"
          checked={debugOptions.showHitAreas}
          onChange={(checked) =>
            onDebugOptionsChange({
              ...debugOptions,
              showHitAreas: checked,
            })
          }
        />

        <EditorCheckbox
          label="Labels"
          checked={debugOptions.showLabels}
          onChange={(checked) =>
            onDebugOptionsChange({
              ...debugOptions,
              showLabels: checked,
            })
          }
        />
      </div>

      <div
        className="
          mt-4
          grid
          grid-cols-2
          gap-2
        "
      >
        <EditorActionButton onClick={onResetTarget}>
          <RotateCcw size={14} aria-hidden="true" />
          Reset target
        </EditorActionButton>

        <EditorActionButton onClick={onResetBreakpoint}>
          Reset {activeBreakpoint}
        </EditorActionButton>

        <EditorActionButton onClick={onResetAll}>Reset all</EditorActionButton>

        <EditorActionButton onClick={onCopy} primary>
          <Copy size={14} aria-hidden="true" />
          Copy config
        </EditorActionButton>
      </div>

      <p
        aria-live="polite"
        className="
          mt-3
          min-h-5
          text-center
          text-xs
          font-medium
          text-brand-sage
        "
      >
        {copyStatus}
      </p>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/*                             EDITOR CONTROLS                                */
/* -------------------------------------------------------------------------- */

function EditorSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;

  options: Array<{
    value: string;
    label: string;
  }>;

  onChange: (value: string) => void;
}) {
  return (
    <label
      className="
        block
        text-xs
        font-medium
        text-neutral-600
      "
    >
      <span
        className="
          mb-1.5
          block
        "
      >
        {label}
      </span>

      <select
        value={value}
        className="
          min-h-10
          w-full
          rounded-lg
          border
          border-black/10
          bg-white
          px-3
          text-sm
          text-neutral-800
          outline-none
          focus:border-brand-sage
          focus:ring-2
          focus:ring-brand-sage/20
        "
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function EditorNumberControl({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;

  min: number;
  max: number;
  step: number;

  suffix?: string;

  onChange: (value: number) => void;
}) {
  return (
    <label
      className="
        block
      "
    >
      <span
        className="
          mb-1.5
          flex
          items-center
          justify-between
          gap-3
          text-xs
          font-medium
          text-neutral-600
        "
      >
        <span>{label}</span>

        <span
          className="
            tabular-nums
            text-neutral-400
          "
        >
          {value}
          {suffix}
        </span>
      </span>

      <div
        className="
          grid
          grid-cols-[1fr_5.25rem]
          items-center
          gap-2
        "
      >
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          className="
            w-full
            accent-brand-olive
          "
          onChange={(event) => onChange(Number(event.target.value))}
        />

        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          className="
            min-h-9
            w-full
            rounded-lg
            border
            border-black/10
            bg-white
            px-2
            text-right
            text-xs
            tabular-nums
            outline-none
            focus:border-brand-sage
            focus:ring-2
            focus:ring-brand-sage/20
          "
          onChange={(event) => {
            const nextValue = Number(event.target.value);

            if (Number.isFinite(nextValue)) {
              onChange(nextValue);
            }
          }}
        />
      </div>
    </label>
  );
}

function EditorCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;

  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      className="
        flex
        min-h-10
        cursor-pointer
        items-center
        justify-center
        gap-2
        rounded-lg
        border
        border-black/10
        bg-white
        px-2
        text-[11px]
        font-medium
        text-neutral-600
      "
    >
      <input
        type="checkbox"
        checked={checked}
        className="
          accent-brand-olive
        "
        onChange={(event) => onChange(event.target.checked)}
      />

      {label}
    </label>
  );
}

function EditorActionButton({
  children,
  primary = false,
  onClick,
}: {
  children: ReactNode;
  primary?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={[
        [
          "inline-flex",
          "min-h-10",
          "items-center",
          "justify-center",
          "gap-2",
          "rounded-lg",
          "border",
          "px-3",
          "text-xs",
          "font-semibold",
          "transition",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-brand-olive/40",
        ].join(" "),

        primary
          ? [
              "border-brand-olive",
              "bg-brand-olive",
              "text-white",
              "hover:opacity-90",
            ].join(" ")
          : [
              "border-black/10",
              "bg-white",
              "text-neutral-700",
              "hover:bg-neutral-50",
            ].join(" "),
      ].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
