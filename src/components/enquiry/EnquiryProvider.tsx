"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Copy,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { contactDetails, siteConfig } from "@/data/site";
import { createEnquiryMessage, type EnquiryContext } from "@/lib/enquiry";
import { Button } from "@/components/ui/Button";
import {
  gsap,
  useIsomorphicLayoutEffect,
} from "@/components/motion/gsapScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type EnquiryState = {
  isOpen: boolean;
  context?: EnquiryContext;
};

type EnquiryApi = {
  openEnquiry: (context?: EnquiryContext) => void;
  closeEnquiry: () => void;
};

const EnquiryContextValue = createContext<EnquiryApi | null>(null);

export function useEnquiry() {
  const value = useContext(EnquiryContextValue);

  if (!value) {
    throw new Error("useEnquiry must be used inside EnquiryProvider");
  }

  return value;
}

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<EnquiryState>({ isOpen: false });

  const openEnquiry = useCallback((context?: EnquiryContext) => {
    setState({ isOpen: true, context });
  }, []);

  const closeEnquiry = useCallback(() => {
    setState((current) => ({ ...current, isOpen: false }));
  }, []);

  const value = useMemo(
    () => ({ openEnquiry, closeEnquiry }),
    [openEnquiry, closeEnquiry],
  );

  return (
    <EnquiryContextValue.Provider value={value}>
      {children}
      {state.isOpen ? (
        <EnquirySheet context={state.context} onClose={closeEnquiry} />
      ) : null}
    </EnquiryContextValue.Provider>
  );
}

function EnquirySheet({
  context,
  onClose,
}: {
  context?: EnquiryContext;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const closingRef = useRef(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const reducedMotion = useReducedMotion();
  const message = createEnquiryMessage(context);

  const finishClose = useCallback(() => {
    setCopied(false);
    setCopyFailed(false);
    onClose();
  }, [onClose]);

  const handleClose = useCallback(() => {
    if (closingRef.current) {
      return;
    }

    closingRef.current = true;

    const backdrop = backdropRef.current;
    const sheet = sheetRef.current;

    if (reducedMotion || !backdrop || !sheet) {
      finishClose();
      return;
    }

    gsap.killTweensOf([backdrop, sheet]);

    gsap
      .timeline({
        defaults: {
          ease: "power2.in",
        },
        onComplete: finishClose,
      })
      .to(
        sheet,
        {
          autoAlpha: 0,
          y: 12,
          scale: 0.98,
          duration: 0.18,
        },
        0,
      )
      .to(
        backdrop,
        {
          autoAlpha: 0,
          duration: 0.22,
        },
        0,
      );
  }, [finishClose, reducedMotion]);

  useIsomorphicLayoutEffect(() => {
    const backdrop = backdropRef.current;
    const sheet = sheetRef.current;

    if (!backdrop || !sheet || reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        backdrop,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.24,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        sheet,
        {
          autoAlpha: 0,
          y: 14,
          scale: 0.96,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.34,
          ease: "power3.out",
        },
      );
    }, backdrop);

    return () => {
      context.revert();
    };
  }, [reducedMotion]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousActiveElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
        return;
      }

      if (event.key !== "Tab" || !sheetRef.current) {
        return;
      }

      const focusable = Array.from(
        sheetRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, [tabindex]:not([tabindex="-1"])',
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

      if (previousActiveElement?.isConnected) {
        previousActiveElement.focus();
      }
    };
  }, [handleClose]);

  const copyMessage = async () => {
    let didCopy = false;

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(message);
        didCopy = true;
      } catch {
        didCopy = false;
      }
    }

    if (!didCopy) {
      const textarea = messageRef.current;
      textarea?.focus();
      textarea?.select();
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(message);
          didCopy = true;
        } catch {
          didCopy = false;
        }
      }

      if (!didCopy) {
        try {
          didCopy = document.execCommand("copy");
        } catch {
          didCopy = false;
        }
      }
    }

    setCopied(didCopy);
    setCopyFailed(!didCopy);
  };

  const contactActions = [
    {
      label: "Send Email",
      href: contactDetails.email.href,
      icon: Mail,
      external: false,
    },
    {
      label: "Call Elegant Star",
      href: contactDetails.phoneHref,
      icon: Phone,
      external: false,
    },
    {
      label: "Visit the Shop",
      href: contactDetails.mapsUrl,
      icon: MapPin,
      external: true,
    },
    {
      label: "Open Messenger",
      href: contactDetails.messengerUrl,
      icon: MessageCircle,
      external: true,
    },
    {
      label: "Open Viber",
      href: contactDetails.viberUrl,
      icon: MessageCircle,
      external: true,
    },
    {
      label: "Open WhatsApp",
      href: contactDetails.whatsappUrl,
      icon: MessageCircle,
      external: true,
    },
  ].filter((action) => action.href);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-brand-olive/28 px-3 pb-[calc(0.75rem_+_env(safe-area-inset-bottom))] pt-[calc(0.75rem_+_env(safe-area-inset-top))] sm:items-center sm:px-4 sm:py-4"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        className="glass-light max-h-[calc(100dvh_-_1.5rem_-_env(safe-area-inset-top)_-_env(safe-area-inset-bottom))] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-[24px] p-4 sm:rounded-[30px] sm:p-5 md:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="small-label text-brand-sage">{siteConfig.name}</p>
            <h2
              id="enquiry-title"
              className="font-display text-[2rem] leading-[1.02] text-brand-olive sm:text-3xl md:text-4xl"
            >
              Start your invitation enquiry
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close enquiry options"
            onClick={handleClose}
            className="inline-flex size-11 items-center justify-center rounded-full border border-brand-olive/15 bg-brand-white/70 text-brand-olive transition hover:bg-brand-white"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 rounded-3xl border border-brand-olive/10 bg-brand-white/65 p-4">
          <p className="mb-3 text-sm font-bold text-brand-olive">
            Prepared message
          </p>
          <textarea
            ref={messageRef}
            readOnly
            aria-label="Prepared enquiry message"
            value={message}
            className="min-h-28 w-full resize-none border-0 bg-transparent p-0 text-base leading-7 text-brand-olive/75 outline-none sm:text-sm"
          />
          {copyFailed ? (
            <p className="mt-3 text-xs font-bold text-brand-olive/55">
              Automatic copy was unavailable. The message is selected so it can
              be copied manually.
            </p>
          ) : null}
        </div>

        <div className="mt-5 grid gap-3 min-[420px]:grid-cols-2">
          <Button type="button" variant="primary" onClick={copyMessage}>
            <Copy size={17} aria-hidden="true" />
            {copied
              ? "Copied Message"
              : copyFailed
                ? "Message Selected"
                : "Copy Enquiry Message"}
          </Button>
          {contactActions.map((action) => {
            const Icon = action.icon;

            return (
              <a
                key={action.label}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-brand-olive/15 bg-brand-white/72 px-4 py-3 text-center text-sm font-bold leading-snug text-brand-olive transition hover:-translate-y-0.5 hover:bg-brand-white sm:px-5"
              >
                <Icon size={17} aria-hidden="true" />
                {action.label}
                {action.external ? (
                  <ExternalLink size={14} aria-hidden="true" />
                ) : null}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
