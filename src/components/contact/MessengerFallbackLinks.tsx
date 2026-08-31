import { ExternalLink, MessageCircle } from "lucide-react";

import { contactDetails } from "@/data/site";
import { cn } from "@/lib/utils";

export function MessengerFallbackLinks({
  variant = "light",
  compact = false,
  className,
}: {
  variant?: "light" | "dark";
  compact?: boolean;
  className?: string;
}) {
  const dark = variant === "dark";

  return (
    <div
      className={cn(
        compact ? "text-[11px] leading-4" : "text-xs leading-6",
        dark ? "text-brand-white/66" : "text-brand-olive/62",
        compact && "text-center",
        className,
      )}
    >
      <p className={compact ? "mb-1" : undefined}>Messenger not opening?</p>
      <div
        className={cn(
          "flex items-center",
          compact
            ? "justify-center gap-x-2 whitespace-nowrap"
            : "flex-wrap gap-x-2",
        )}
      >
        <a
          href={contactDetails.messengerFacebookFallbackUrl}
          aria-label="Visit Elegant Star’s Facebook page"
          className={cn(
            "inline-flex items-center gap-1.5 font-bold underline underline-offset-4",
            compact ? "min-h-9" : "min-h-11",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-champagne focus-visible:ring-offset-2",
            dark
              ? "text-brand-white decoration-brand-white/35 focus-visible:ring-offset-brand-sage"
              : "text-brand-olive decoration-brand-olive/30 focus-visible:ring-offset-brand-ivory",
          )}
        >
          {compact ? "Facebook page" : "Visit our Facebook page"}
          <ExternalLink size={compact ? 11 : 12} aria-hidden="true" />
        </a>
        <span aria-hidden="true">{compact ? "•" : "or"}</span>
        <a
          href={contactDetails.viberUrl}
          aria-label="Contact Elegant Star through Viber"
          className={cn(
            "inline-flex items-center gap-1.5 font-bold underline underline-offset-4",
            compact ? "min-h-9" : "min-h-11",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-champagne focus-visible:ring-offset-2",
            dark
              ? "text-brand-white decoration-brand-white/35 focus-visible:ring-offset-brand-sage"
              : "text-brand-olive decoration-brand-olive/30 focus-visible:ring-offset-brand-ivory",
          )}
        >
          <MessageCircle size={compact ? 12 : 13} aria-hidden="true" />
          {compact ? "Viber" : "contact us through Viber"}
        </a>
        {!compact ? <span aria-hidden="true">.</span> : null}
      </div>
    </div>
  );
}
