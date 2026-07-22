"use client";

import Image from "next/image";
import { useState } from "react";
import type { OrderContext } from "@/lib/buildOrderMessage";

function hasValue(value: string | undefined) {
  return Boolean(value?.trim());
}

export function RequestOrderSummary({
  context,
}: {
  context: OrderContext;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = hasValue(context.image) && !imageFailed;

  if (!showImage) {
    return null;
  }

  return (
    <div className="mt-4 flex items-center gap-3">
      <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl border border-brand-olive/10 bg-brand-paper sm:size-16">
        <Image
          src={context.image ?? ""}
          alt={`${context.title} product photo`}
          fill
          loading="lazy"
          className="object-contain"
          sizes="64px"
          onError={() => setImageFailed(true)}
        />
      </div>
    </div>
  );
}
