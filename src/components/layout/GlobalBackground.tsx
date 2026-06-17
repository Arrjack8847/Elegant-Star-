"use client";

import { useEffect, useRef } from "react";

export function GlobalBackground() {
  const pointerGlowRef = useRef<HTMLDivElement>(null);
  const botanicalLeftRef = useRef<SVGSVGElement>(null);
  const botanicalRightRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const canUseDecorativeMotion = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    ).matches;

    if (!canUseDecorativeMotion) {
      return;
    }

    const pointerGlow = pointerGlowRef.current;
    const botanicalLeft = botanicalLeftRef.current;
    const botanicalRight = botanicalRightRef.current;

    let pointerFrame: number | null = null;
    let scrollFrame: number | null = null;

    let pointerX = window.innerWidth * 0.5;
    let pointerY = window.innerHeight * 0.3;

    const positionPointerGlow = () => {
      pointerFrame = null;

      if (!pointerGlow) {
        return;
      }

      pointerGlow.style.transform = `translate3d(
        ${pointerX - 320}px,
        ${pointerY - 320}px,
        0
      )`;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      pointerX = event.clientX;
      pointerY = event.clientY;

      if (pointerFrame === null) {
        pointerFrame = requestAnimationFrame(positionPointerGlow);
      }
    };

    const updateScrollParallax = () => {
      scrollFrame = null;

      const scrollY = window.scrollY;

      if (botanicalLeft) {
        botanicalLeft.style.transform = `
          translate3d(0, ${scrollY * -0.018}px, 0)
          rotate(-7deg)
        `;
      }

      if (botanicalRight) {
        botanicalRight.style.transform = `
          translate3d(0, ${scrollY * 0.012}px, 0)
          rotate(9deg)
        `;
      }
    };

    const handleScroll = () => {
      if (scrollFrame === null) {
        scrollFrame = requestAnimationFrame(updateScrollParallax);
      }
    };

    positionPointerGlow();
    updateScrollParallax();

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      if (pointerFrame !== null) {
        cancelAnimationFrame(pointerFrame);
      }

      if (scrollFrame !== null) {
        cancelAnimationFrame(scrollFrame);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#f5f0e6]"
    >
      {/* Soft central paper illumination */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.94),rgba(255,255,255,0)_52%)]" />

      {/* Large animated olive glow */}
      <div className="elegant-background-orb elegant-background-orb--olive absolute -left-[18rem] top-[8vh] h-[46rem] w-[46rem] rounded-full" />

      {/* Champagne glow */}
      <div className="elegant-background-orb elegant-background-orb--champagne absolute -right-[20rem] top-[32vh] h-[50rem] w-[50rem] rounded-full" />

      {/* Lower sage atmosphere */}
      <div className="elegant-background-orb elegant-background-orb--sage absolute bottom-[-24rem] left-[18%] h-[48rem] w-[48rem] rounded-full" />

      {/* Desktop interactive glow */}
      <div
        ref={pointerGlowRef}
        className="elegant-pointer-glow absolute left-0 top-0 hidden h-[40rem] w-[40rem] rounded-full lg:block"
      />

      {/* Left botanical drawing */}
      <svg
        ref={botanicalLeftRef}
        viewBox="0 0 360 680"
        fill="none"
        className="absolute -left-20 top-[14vh] h-[36rem] w-auto text-[#707854]/[0.085] will-change-transform sm:-left-12 sm:h-[43rem]"
      >
        <path
          d="M85 646C126 527 138 403 188 287C217 219 258 154 322 98"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <path
          d="M145 460C93 430 62 387 48 333"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        <path
          d="M177 337C230 318 267 282 290 235"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        <path
          d="M121 525C83 500 59 470 43 431"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        <path
          d="M215 232C185 194 174 157 178 115"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        <BotanicalLeaf
          transform="translate(45 326) rotate(-28)"
          width={70}
          height={32}
        />

        <BotanicalLeaf
          transform="translate(60 425) rotate(-15)"
          width={76}
          height={34}
        />

        <BotanicalLeaf
          transform="translate(89 497) rotate(-24)"
          width={62}
          height={29}
        />

        <BotanicalLeaf
          transform="translate(232 278) rotate(142)"
          width={72}
          height={32}
        />

        <BotanicalLeaf
          transform="translate(274 220) rotate(145)"
          width={64}
          height={29}
        />

        <BotanicalLeaf
          transform="translate(176 106) rotate(86)"
          width={75}
          height={33}
        />

        <circle cx="322" cy="98" r="5" stroke="currentColor" />
        <circle cx="48" cy="333" r="3.5" stroke="currentColor" />
      </svg>

      {/* Right botanical drawing */}
      <svg
        ref={botanicalRightRef}
        viewBox="0 0 420 720"
        fill="none"
        className="absolute -right-28 top-[58vh] h-[39rem] w-auto text-[#707854]/[0.075] will-change-transform sm:-right-16 sm:h-[48rem]"
      >
        <path
          d="M348 684C305 571 279 469 240 365C206 275 157 185 73 85"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <path
          d="M274 463C325 431 357 390 374 334"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        <path
          d="M220 315C168 294 130 259 104 211"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        <path
          d="M311 558C348 530 372 495 386 454"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        <path
          d="M165 200C190 158 197 118 188 78"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        <BotanicalLeaf
          transform="translate(307 417) rotate(28)"
          width={75}
          height={34}
        />

        <BotanicalLeaf
          transform="translate(341 323) rotate(21)"
          width={71}
          height={31}
        />

        <BotanicalLeaf
          transform="translate(332 493) rotate(32)"
          width={65}
          height={29}
        />

        <BotanicalLeaf
          transform="translate(114 251) rotate(-38)"
          width={74}
          height={33}
        />

        <BotanicalLeaf
          transform="translate(76 193) rotate(-33)"
          width={62}
          height={28}
        />

        <BotanicalLeaf
          transform="translate(152 79) rotate(95)"
          width={72}
          height={31}
        />

        <circle cx="73" cy="85" r="5" stroke="currentColor" />
        <circle cx="374" cy="334" r="3.5" stroke="currentColor" />
      </svg>

      {/* Delicate curved decorative lines */}
      <div className="absolute left-[7%] top-[28%] h-44 w-44 rounded-full border border-[#78805b]/[0.045]" />

      <div className="absolute bottom-[18%] right-[12%] h-72 w-72 rounded-full border border-[#b7a075]/[0.055]" />

      {/* Paper texture remains above gradient layers */}
      <div className="elegant-paper-grain absolute inset-0" />

      {/* Soft edge vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(83,87,62,0.045)_100%)]" />
    </div>
  );
}

type BotanicalLeafProps = {
  transform: string;
  width: number;
  height: number;
};

function BotanicalLeaf({ transform, width, height }: BotanicalLeafProps) {
  return (
    <g transform={transform}>
      <path
        d={`M0 ${height / 2}C${width * 0.28} 0 ${
          width * 0.75
        } 0 ${width} ${height / 2}C${width * 0.75} ${height} ${
          width * 0.28
        } ${height} 0 ${height / 2}Z`}
        stroke="currentColor"
        strokeWidth="1.1"
      />

      <path
        d={`M4 ${height / 2}H${width - 5}`}
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </g>
  );
}
