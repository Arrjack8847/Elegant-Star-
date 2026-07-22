"use client";

import { MessageCircle, PhoneCall } from "lucide-react";
import type { ChatChannel } from "@/lib/buildChatLinks";
import { cn } from "@/lib/utils";

const labels: Record<ChatChannel, string> = {
  messenger: "Continue with Messenger",
  viber: "Continue with Viber",
};

export function ChatChannelButton({
  channel,
  ariaLabel,
  onClick,
}: {
  channel: ChatChannel;
  ariaLabel: string;
  onClick: () => void;
}) {
  const Icon = channel === "messenger" ? MessageCircle : PhoneCall;

  return (
    <button
      type="button"
      data-order-channel={channel}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold leading-snug shadow-soft transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-champagne motion-reduce:transition-none",
        channel === "messenger"
          ? "border border-brand-olive/18 bg-brand-white/82 text-brand-olive hover:bg-brand-white"
          : "border border-brand-olive bg-brand-olive text-brand-ivory hover:bg-[#3f4236]",
      )}
    >
      <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
      {labels[channel]}
    </button>
  );
}
