"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type RefObject,
  type SVGProps,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { OrderContext } from "@/lib/buildOrderMessage";
import { RequestOrderSummary } from "@/components/enquiry/RequestOrderSummary";
import { contactDetails } from "@/data/site";

function InstagramIcon({
  size = 20,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({
  size = 20,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 8h3V4.5A8 8 0 0 0 14.5 4C11.9 4 10 5.7 10 8.8V11H7v4h3v5h4v-5h3.2l.8-4H14V8.8c0-.6.4-.8 1-.8Z" />
    </svg>
  );
}

function normalizeContext(context: OrderContext | undefined): OrderContext {
  const slug = context?.slug?.trim() || "elegant-star-design";

  return {
    title: context?.title?.trim() || "Elegant Star design",
    slug,
    image: context?.image,
    pagePath: context?.pagePath?.trim() || `/designs/${slug}`,
  };
}

export function RequestOrderDialog({
  context,
  onClose,
  returnFocusRef,
}: {
  context?: OrderContext;
  onClose: () => void;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [portalReady, setPortalReady] = useState(false);
  const orderContext = normalizeContext(context);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!portalReady) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousActiveElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const restoreFocusTarget = returnFocusRef?.current ?? previousActiveElement;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !sheetRef.current) {
        return;
      }

      const focusable = Array.from(
        sheetRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);

      if (restoreFocusTarget?.isConnected) {
        restoreFocusTarget.focus();
      }
    };
  }, [onClose, portalReady, returnFocusRef]);

  if (!portalReady) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-olive/36 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-[calc(0.75rem+env(safe-area-inset-top))] backdrop-blur-[2px] sm:px-4 sm:py-4"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="w-full max-w-[29rem] overflow-hidden rounded-[26px] border border-brand-olive/12 bg-brand-ivory p-4 text-brand-olive shadow-[0_28px_80px_rgba(48,50,41,0.28)] sm:rounded-[28px] sm:p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="small-label text-brand-sage">Request this design</p>
            <h2
              id={titleId}
              className="mt-2 break-words font-display text-[1.75rem] leading-[1.02] text-brand-olive min-[390px]:text-[1.95rem] sm:text-[2.25rem]"
            >
              {orderContext.title}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close request order options"
            onClick={onClose}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-olive/15 bg-brand-white/72 text-brand-olive transition hover:bg-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-champagne motion-reduce:transition-none sm:size-11"
          >
            <X size={17} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        <RequestOrderSummary context={orderContext} />

        <p
          id={descriptionId}
          className="mt-3 text-center text-sm font-bold leading-5 text-brand-olive/64 sm:mt-4 sm:leading-6"
        >
          Choose where you would like to continue.
        </p>

        <div className="mt-3 grid gap-2.5 sm:mt-4 sm:gap-3">
          <a
            href={contactDetails.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open Instagram to enquire about ${orderContext.title}`}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-brand-olive/18 bg-brand-white/82 px-5 py-3 text-sm font-bold leading-snug text-brand-olive shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-champagne motion-reduce:transition-none"
          >
            <InstagramIcon size={18} aria-hidden="true" />
            Continue with Instagram
          </a>

          <a
            href={contactDetails.facebook.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open Facebook to enquire about ${orderContext.title}`}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-brand-olive bg-brand-olive px-5 py-3 text-sm font-bold leading-snug text-brand-ivory shadow-soft transition hover:-translate-y-0.5 hover:bg-[#3f4236] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-champagne motion-reduce:transition-none"
          >
            <FacebookIcon size={18} aria-hidden="true" />
            Continue with Facebook
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
