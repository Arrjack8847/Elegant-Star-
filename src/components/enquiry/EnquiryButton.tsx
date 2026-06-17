"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import type { EnquiryContext } from "@/lib/enquiry";

export function EnquiryButton({
  context,
  children = "Start Your Invitation",
  variant = "primary",
  className,
  onBeforeOpen,
}: {
  context?: EnquiryContext;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  className?: string;
  onBeforeOpen?: () => void;
}) {
  const { openEnquiry } = useEnquiry();

  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={() => {
        onBeforeOpen?.();
        openEnquiry(context);
      }}
    >
      <MessageCircle size={17} aria-hidden="true" />
      {children}
    </Button>
  );
}
