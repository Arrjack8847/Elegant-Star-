export type CopyTextResult = {
  ok: boolean;
  method?: "clipboard" | "fallback";
};

export async function copyText(text: string): Promise<CopyTextResult> {
  if (!text.trim()) {
    return { ok: false };
  }

  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return { ok: true, method: "clipboard" };
    } catch {
      // Continue to the manual DOM fallback below.
    }
  }

  if (typeof document === "undefined") {
    return { ok: false };
  }

  const textarea = document.createElement("textarea");
  const selection = document.getSelection();
  const selectedRange =
    selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.inset = "0 auto auto 0";
  textarea.style.width = "1px";
  textarea.style.height = "1px";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, text.length);

  let didCopy = false;

  try {
    didCopy = document.execCommand("copy");
  } catch {
    didCopy = false;
  }

  document.body.removeChild(textarea);

  if (selectedRange && selection) {
    selection.removeAllRanges();
    selection.addRange(selectedRange);
  }

  return didCopy ? { ok: true, method: "fallback" } : { ok: false };
}
