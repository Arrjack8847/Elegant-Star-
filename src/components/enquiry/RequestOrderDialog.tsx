"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  buildViberShareUrl,
  openViberShareUrl,
} from "@/lib/buildChatLinks";
import { buildOrderMessage, type OrderContext } from "@/lib/buildOrderMessage";
import { buildProductUrl } from "@/lib/buildProductUrl";
import { MessengerFallbackLinks } from "@/components/contact/MessengerFallbackLinks";
import { ChatChannelButton } from "@/components/enquiry/ChatChannelButton";
import { RequestOrderSummary } from "@/components/enquiry/RequestOrderSummary";
import { contactDetails } from "@/data/site";

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

  const handleViber = useCallback(() => {
    const productUrl = buildProductUrl(
      orderContext.pagePath ?? `/designs/${orderContext.slug}`,
    );
    const message = buildOrderMessage({
      title: orderContext.title,
      productUrl,
    });

    openViberShareUrl(buildViberShareUrl(message));
    onClose();
  }, [onClose, orderContext.pagePath, orderContext.slug, orderContext.title]);

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
          <ChatChannelButton
            channel="messenger"
            ariaLabel={`Open Messenger to enquire about ${orderContext.title}`}
            href={contactDetails.messengerUrl}
          />
          <ChatChannelButton
            channel="viber"
            ariaLabel={`Share ${orderContext.title} through Viber`}
            onClick={handleViber}
          />
        </div>

        <MessengerFallbackLinks compact className="mt-2.5 sm:mt-3" />
      </div>
    </div>,
    document.body,
  );
}
