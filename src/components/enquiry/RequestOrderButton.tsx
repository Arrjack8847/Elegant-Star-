"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { RequestOrderDialog } from "@/components/enquiry/RequestOrderDialog";
import { buttonClassName } from "@/components/ui/Button";
import type { OrderContext } from "@/lib/buildOrderMessage";

type Variant = "primary" | "secondary" | "ghost" | "dark";

export function RequestOrderButton({
  context,
  children = "Request Order",
  variant = "primary",
  className,
  onBeforeOpen,
}: {
  context?: OrderContext;
  children?: ReactNode;
  variant?: Variant;
  className?: string;
  onBeforeOpen?: () => void;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openRequestOrder = useCallback(() => {
    onBeforeOpen?.();
    setIsOpen(true);
  }, [onBeforeOpen]);

  const closeRequestOrder = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        data-order-trigger
        onClick={openRequestOrder}
        className={buttonClassName(variant, className)}
      >
        <MessageCircle size={17} aria-hidden="true" />
        {children}
      </button>

      {isOpen ? (
        <RequestOrderDialog
          context={context}
          onClose={closeRequestOrder}
          returnFocusRef={triggerRef}
        />
      ) : null}
    </>
  );
}
