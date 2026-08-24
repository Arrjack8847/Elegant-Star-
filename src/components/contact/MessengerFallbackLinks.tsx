import { ExternalLink, MessageCircle } from "lucide-react";

import { contactDetails } from "@/data/site";
import { cn } from "@/lib/utils";

export function MessengerFallbackLinks({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const dark = variant === "dark";

  return (
    <div
      className={cn(
        "text-xs leading-6",
        dark ? "text-brand-white/66" : "text-brand-olive/62",
        className,
      )}
    >
      <p>Messenger not opening?</p>
      <div className="flex flex-wrap items-center gap-x-2">
        <a
          href={contactDetails.messengerFacebookFallbackUrl}
          aria-label="Visit Elegant Star’s Facebook page"
          className={cn(
            "inline-flex min-h-11 items-center gap-1.5 font-bold underline underline-offset-4",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-champagne focus-visible:ring-offset-2",
            dark
              ? "text-brand-white decoration-brand-white/35 focus-visible:ring-offset-brand-sage"
              : "text-brand-olive decoration-brand-olive/30 focus-visible:ring-offset-brand-ivory",
          )}
        >
          Visit our Facebook page
          <ExternalLink size={12} aria-hidden="true" />
        </a>
        <span>or</span>
        <a
          href={contactDetails.viberUrl}
          aria-label="Contact Elegant Star through Viber"
          className={cn(
            "inline-flex min-h-11 items-center gap-1.5 font-bold underline underline-offset-4",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-champagne focus-visible:ring-offset-2",
            dark
              ? "text-brand-white decoration-brand-white/35 focus-visible:ring-offset-brand-sage"
              : "text-brand-olive decoration-brand-olive/30 focus-visible:ring-offset-brand-ivory",
          )}
        >
          <MessageCircle size={13} aria-hidden="true" />
          contact us through Viber
        </a>
        <span aria-hidden="true">.</span>
      </div>
    </div>
  );
}
