"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type Ref,
} from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

import { EnquiryButton } from "@/components/enquiry/EnquiryButton";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { SectionTransition } from "@/components/motion/SectionTransition";
import { enquiryStyles } from "@/data/home";
import { cn } from "@/lib/utils";

const occasions = [
  "Wedding",
  "Engagement",
  "Traditional ceremony",
  "Corporate event",
  "Other celebration",
] as const;

const products = [
  "Invitation suite",
  "Certificate folder",
  "Premium box set",
  "Event stationery",
  "Custom request",
] as const;

const steps = [
  {
    label: "Occasion",
    title: "What are you celebrating?",
  },
  {
    label: "Product",
    title: "What do you need?",
  },
  {
    label: "Style",
    title: "Which direction feels closest?",
  },
  {
    label: "Details",
    title: "Add the practical details.",
  },
] as const;

const LAST_STEP = steps.length - 1;
const STORAGE_KEY = "elegant-star-guided-enquiry";

type EnquiryDraft = {
  step: number;
  occasion: string;
  product: string;
  style: string;
  quantity: string;
  date: string;
};

function getLocalDateValue() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;

  return new Date(now.getTime() - offset).toISOString().split("T")[0];
}

function getHighestAvailableStep({
  occasion,
  product,
  style,
}: Pick<EnquiryDraft, "occasion" | "product" | "style">) {
  if (!occasion) {
    return 0;
  }

  if (!product) {
    return 1;
  }

  if (!style) {
    return 2;
  }

  return 3;
}

function isStepComplete(
  step: number,
  {
    occasion,
    product,
    style,
  }: Pick<EnquiryDraft, "occasion" | "product" | "style">,
) {
  switch (step) {
    case 0:
      return Boolean(occasion);

    case 1:
      return Boolean(product);

    case 2:
      return Boolean(style);

    default:
      return true;
  }
}

export function GuidedEnquiryExperience() {
  const [step, setStep] = useState(0);
  const [occasion, setOccasion] = useState("");
  const [product, setProduct] = useState("");
  const [style, setStyle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [draftReady, setDraftReady] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasMountedRef = useRef(false);

  const today = useMemo(() => getLocalDateValue(), []);

  const enquiryState = useMemo(
    () => ({
      occasion,
      product,
      style,
    }),
    [occasion, product, style],
  );

  const highestAvailableStep = useMemo(
    () => getHighestAvailableStep(enquiryState),
    [enquiryState],
  );

  const canContinue = useMemo(
    () => isStepComplete(step, enquiryState),
    [step, enquiryState],
  );

  const message = useMemo(
    () =>
      [
        "Hello Elegant Star, I would like to begin a guided stationery enquiry.",
        "",
        `Occasion: ${occasion || "Not selected"}`,
        `Product: ${product || "Not selected"}`,
        `Style: ${style || "Not selected"}`,
        `Approximate quantity: ${
          quantity.trim() || "Not provided"
        }`,
        `Event date: ${date || "Not provided"}`,
        "",
        "Please let me know the suitable next steps and quotation details.",
      ].join("\n"),
    [occasion, product, style, quantity, date],
  );

  /*
   * Restore the enquiry after an accidental refresh.
   * sessionStorage keeps the information only in the current browser tab.
   */
  useEffect(() => {
    try {
      const savedDraft = window.sessionStorage.getItem(STORAGE_KEY);

      if (!savedDraft) {
        return;
      }

      const parsed = JSON.parse(savedDraft) as Partial<EnquiryDraft>;

      const restoredOccasion =
        typeof parsed.occasion === "string" ? parsed.occasion : "";
      const restoredProduct =
        typeof parsed.product === "string" ? parsed.product : "";
      const restoredStyle =
        typeof parsed.style === "string" ? parsed.style : "";
      const restoredQuantity =
        typeof parsed.quantity === "string" ? parsed.quantity : "";
      const restoredDate =
        typeof parsed.date === "string" ? parsed.date : "";

      const requestedStep =
        typeof parsed.step === "number" && Number.isFinite(parsed.step)
          ? Math.min(LAST_STEP, Math.max(0, Math.floor(parsed.step)))
          : 0;

      const availableStep = getHighestAvailableStep({
        occasion: restoredOccasion,
        product: restoredProduct,
        style: restoredStyle,
      });

      setOccasion(restoredOccasion);
      setProduct(restoredProduct);
      setStyle(restoredStyle);
      setQuantity(restoredQuantity);
      setDate(restoredDate);
      setStep(Math.min(requestedStep, availableStep));
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } finally {
      setDraftReady(true);
    }
  }, []);

  useEffect(() => {
    if (!draftReady) {
      return;
    }

    const draft: EnquiryDraft = {
      step,
      occasion,
      product,
      style,
      quantity,
      date,
    };

    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // The wizard still works if browser storage is unavailable.
    }
  }, [
    draftReady,
    step,
    occasion,
    product,
    style,
    quantity,
    date,
  ]);

  /*
   * Move keyboard focus to the new step heading without forcing
   * the page to jump on initial load.
   */
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      headingRef.current?.focus({
        preventScroll: true,
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [step]);

  const goToStep = useCallback(
    (nextStep: number) => {
      const safeStep = Math.min(
        LAST_STEP,
        Math.max(0, Math.floor(nextStep)),
      );

      if (safeStep > highestAvailableStep) {
        return;
      }

      setStep(safeStep);
    },
    [highestAvailableStep],
  );

  const handleContinue = useCallback(() => {
    if (!canContinue) {
      return;
    }

    setStep((currentStep) =>
      Math.min(LAST_STEP, currentStep + 1),
    );
  }, [canContinue]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step < LAST_STEP) {
      handleContinue();
    }
  };

  const resetEnquiry = useCallback(() => {
    setStep(0);
    setOccasion("");
    setProduct("");
    setStyle("");
    setQuantity("");
    setDate("");

    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }
  }, []);

  return (
    <SectionTransition
      id="guided-enquiry"
      variant="rounded-dark"
      className="section-shell scroll-mt-24 bg-brand-sage text-brand-white"
      data-nav-theme="dark"
    >
      <div className="section-inner">
        <div className="mx-auto max-w-5xl">
          <RevealGroup
            className="text-center"
            stagger={0.07}
            start="top 84%"
          >
            <p className="small-label text-brand-ivory/62">
              Guided Enquiry
            </p>

            <h2 className="mx-auto mt-4 max-w-4xl font-display text-[clamp(2.65rem,12vw,5.75rem)] leading-[0.92] tracking-[-0.035em]">
              Begin with what
              <span className="block">you already know.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-[0.95rem] leading-7 text-brand-white/70 sm:mt-6 sm:text-lg sm:leading-8">
              A short visual guide prepares the important details before
              you contact the team.
            </p>
          </RevealGroup>

          <Reveal start="top 78%" delay={0.08}>
            <form
              onSubmit={handleSubmit}
              className={cn(
                "relative mt-9 rounded-[24px] border border-brand-white/15",
                "bg-brand-olive/30 shadow-[0_24px_90px_rgba(28,36,26,0.24)]",
                "backdrop-blur-xl sm:mt-12 sm:rounded-[32px]",
              )}
            >
              <div className="p-4 pb-0 sm:p-6 sm:pb-0 md:p-8 md:pb-0">
                <div className="flex items-center justify-between gap-4">
                  <p
                    className="text-xs font-bold uppercase tracking-[0.18em] text-brand-ivory/60"
                    aria-live="polite"
                  >
                    Step {step + 1} of {steps.length}
                  </p>

                  {(occasion || product || style || quantity || date) && (
                    <button
                      type="button"
                      onClick={resetEnquiry}
                      className={cn(
                        "inline-flex min-h-10 items-center gap-2 rounded-full",
                        "px-3 text-xs font-bold text-brand-ivory/65",
                        "transition hover:bg-brand-white/10 hover:text-brand-white",
                        "focus-visible:outline-none focus-visible:ring-2",
                        "focus-visible:ring-brand-ivory focus-visible:ring-offset-2",
                        "focus-visible:ring-offset-brand-olive",
                      )}
                    >
                      <RotateCcw size={14} aria-hidden="true" />
                      Start again
                    </button>
                  )}
                </div>

                <nav
                  className="mt-4"
                  aria-label="Guided enquiry progress"
                >
                  <ol className="grid grid-cols-4 gap-2 sm:gap-3">
                    {steps.map((item, index) => {
                      const isCurrent = index === step;
                      const isComplete =
                        index < step &&
                        isStepComplete(index, enquiryState);
                      const isAvailable =
                        index <= highestAvailableStep;

                      return (
                        <li key={item.label} className="min-w-0">
                          <button
                            type="button"
                            disabled={!isAvailable}
                            onClick={() => goToStep(index)}
                            aria-current={
                              isCurrent ? "step" : undefined
                            }
                            aria-label={`${item.label}${
                              isCurrent ? ", current step" : ""
                            }`}
                            className={cn(
                              "group block w-full text-left",
                              "focus-visible:outline-none",
                              "disabled:cursor-not-allowed",
                            )}
                          >
                            <span
                              className={cn(
                                "block h-1.5 rounded-full transition-colors duration-300",
                                isCurrent || isComplete
                                  ? "bg-brand-ivory"
                                  : isAvailable
                                    ? "bg-brand-ivory/32 group-hover:bg-brand-ivory/45"
                                    : "bg-brand-ivory/13",
                              )}
                            />

                            <span
                              className={cn(
                                "mt-2 hidden truncate text-[0.68rem] font-bold",
                                "uppercase tracking-[0.12em] sm:block",
                                isCurrent
                                  ? "text-brand-white"
                                  : "text-brand-white/45",
                              )}
                            >
                              {item.label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </nav>
              </div>

              <div className="px-4 pb-4 pt-8 sm:px-6 sm:pb-6 sm:pt-9 md:px-8 md:pb-8">
                <div className="min-h-[27rem] sm:min-h-[25rem]">
                  {step === 0 && (
                    <ChoiceStep
                      headingRef={headingRef}
                      title={steps[0].title}
                      options={occasions}
                      value={occasion}
                      onChange={setOccasion}
                    />
                  )}

                  {step === 1 && (
                    <ChoiceStep
                      headingRef={headingRef}
                      title={steps[1].title}
                      options={products}
                      value={product}
                      onChange={setProduct}
                    />
                  )}

                  {step === 2 && (
                    <StyleStep
                      headingRef={headingRef}
                      value={style}
                      onChange={setStyle}
                    />
                  )}

                  {step === 3 && (
                    <DetailsStep
                      headingRef={headingRef}
                      occasion={occasion}
                      product={product}
                      style={style}
                      quantity={quantity}
                      date={date}
                      today={today}
                      onQuantityChange={setQuantity}
                      onDateChange={setDate}
                      onEditStep={goToStep}
                    />
                  )}
                </div>
              </div>

              <div
                className={cn(
                  "sticky bottom-0 z-20 mt-2 border-t border-brand-white/10",
                  "rounded-b-[24px] bg-brand-olive/92 px-4 pt-4",
                  "pb-[calc(1rem+env(safe-area-inset-bottom))]",
                  "backdrop-blur-xl sm:static sm:rounded-b-[32px]",
                  "sm:bg-brand-olive/45 sm:px-6 sm:pb-6 md:px-8 md:pb-8",
                )}
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => goToStep(step - 1)}
                    disabled={step === 0}
                    className={cn(
                      "inline-flex min-h-12 shrink-0 items-center justify-center",
                      "gap-2 rounded-full border border-brand-white/20 px-4",
                      "text-sm font-bold transition sm:px-5",
                      "hover:border-brand-white/35 hover:bg-brand-white/8",
                      "disabled:pointer-events-none disabled:opacity-30",
                      "focus-visible:outline-none focus-visible:ring-2",
                      "focus-visible:ring-brand-ivory focus-visible:ring-offset-2",
                      "focus-visible:ring-offset-brand-olive",
                    )}
                  >
                    <ChevronLeft size={17} aria-hidden="true" />

                    <span className="hidden min-[370px]:inline">
                      Back
                    </span>
                  </button>

                  {step < LAST_STEP ? (
                    <button
                      type="submit"
                      disabled={!canContinue}
                      className={cn(
                        "inline-flex min-h-12 flex-1 items-center justify-center",
                        "gap-2 rounded-full bg-brand-ivory px-5",
                        "text-sm font-bold text-brand-olive transition",
                        "hover:-translate-y-0.5 hover:bg-brand-white",
                        "disabled:pointer-events-none disabled:translate-y-0",
                        "disabled:opacity-35",
                        "focus-visible:outline-none focus-visible:ring-2",
                        "focus-visible:ring-brand-white focus-visible:ring-offset-2",
                        "focus-visible:ring-offset-brand-olive",
                      )}
                    >
                      Continue
                      <ChevronRight size={17} aria-hidden="true" />
                    </button>
                  ) : (
                    <div className="min-w-0 flex-1 [&>*]:w-full">
                      <EnquiryButton
                        variant="dark"
                        context={{ message }}
                      >
                        Prepare My Enquiry
                      </EnquiryButton>
                    </div>
                  )}
                </div>

                {step < LAST_STEP && !canContinue && (
                  <p className="mt-3 text-center text-xs text-brand-white/48">
                    Select one option to continue.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </SectionTransition>
  );
}

function ChoiceStep({
  title,
  options,
  value,
  onChange,
  headingRef,
}: {
  title: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  headingRef: Ref<HTMLHeadingElement>;
}) {
  return (
    <fieldset>
      <legend className="sr-only">{title}</legend>

      <h3
        ref={headingRef}
        tabIndex={-1}
        className={cn(
          "max-w-3xl font-display text-[clamp(2.1rem,9vw,3.5rem)]",
          "leading-[0.98] tracking-[-0.025em] outline-none",
        )}
      >
        {title}
      </h3>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {options.map((item, index) => {
          const selected = value === item;

          return (
            <button
              key={item}
              type="button"
              onClick={() => onChange(item)}
              aria-pressed={selected}
              className={cn(
                "group flex min-h-[4rem] items-center justify-between",
                "gap-4 rounded-2xl border px-4 py-3.5 text-left",
                "font-bold transition duration-200 sm:min-h-[4.5rem] sm:px-5",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-brand-ivory focus-visible:ring-offset-2",
                "focus-visible:ring-offset-brand-olive",
                selected
                  ? "border-brand-ivory bg-brand-ivory text-brand-olive shadow-lg"
                  : cn(
                      "border-brand-white/15 bg-brand-white/[0.055]",
                      "text-brand-white hover:border-brand-white/28",
                      "hover:bg-brand-white/10",
                    ),
              )}
            >
              <span className="flex min-w-0 items-center gap-3">
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center",
                    "rounded-full border text-[0.68rem] font-bold",
                    selected
                      ? "border-brand-olive/20 bg-brand-olive/8"
                      : "border-brand-white/18 text-brand-white/45",
                  )}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span>{item}</span>
              </span>

              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center",
                  "rounded-full border transition",
                  selected
                    ? "border-brand-olive/15 bg-brand-olive text-brand-ivory"
                    : "border-brand-white/15 opacity-55 group-hover:opacity-100",
                )}
                aria-hidden="true"
              >
                {selected ? (
                  <Check size={15} strokeWidth={2.5} />
                ) : (
                  <ChevronRight size={15} />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function StyleStep({
  value,
  onChange,
  headingRef,
}: {
  value: string;
  onChange: (value: string) => void;
  headingRef: Ref<HTMLHeadingElement>;
}) {
  return (
    <fieldset>
      <legend className="sr-only">{steps[2].title}</legend>

      <h3
        ref={headingRef}
        tabIndex={-1}
        className={cn(
          "max-w-3xl font-display text-[clamp(2.1rem,9vw,3.5rem)]",
          "leading-[0.98] tracking-[-0.025em] outline-none",
        )}
      >
        {steps[2].title}
      </h3>

      <p className="mt-3 max-w-xl text-sm leading-6 text-brand-white/58 sm:text-base">
        Choose the visual mood that feels closest. The team can refine
        colours, finishes and details later.
      </p>

      <div
        className={cn(
          "-mx-4 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto",
          "px-4 pb-3 [scrollbar-width:none]",
          "[&::-webkit-scrollbar]:hidden",
          "sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0",
          "md:grid-cols-3",
        )}
      >
        {enquiryStyles.map((item) => {
          const selected = value === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onChange(item.value)}
              aria-pressed={selected}
              aria-label={`Select ${item.value} style`}
              className={cn(
                "group relative aspect-[4/3] w-[78vw] max-w-[20rem]",
                "shrink-0 snap-center overflow-hidden rounded-[20px] border",
                "text-left shadow-sm transition duration-300",
                "sm:w-auto sm:max-w-none",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-brand-ivory focus-visible:ring-offset-2",
                "focus-visible:ring-offset-brand-olive",
                selected
                  ? "border-brand-ivory ring-2 ring-brand-ivory/40"
                  : "border-brand-ivory/15 hover:border-brand-ivory/35",
              )}
            >
              <Image
                src={item.image}
                alt={`${item.value} stationery style`}
                fill
                className={cn(
                  "object-cover transition duration-700",
                  "group-hover:scale-[1.045]",
                  selected && "scale-[1.025]",
                )}
                sizes="(max-width: 639px) 78vw, (max-width: 1023px) 50vw, 33vw"
              />

              <span
                className="absolute inset-0 bg-gradient-to-t from-brand-olive via-brand-olive/15 to-transparent"
                aria-hidden="true"
              />

              <span
                className={cn(
                  "absolute right-3 top-3 flex size-8 items-center",
                  "justify-center rounded-full border backdrop-blur-md",
                  selected
                    ? "border-brand-ivory bg-brand-ivory text-brand-olive"
                    : "border-brand-white/25 bg-brand-olive/25 text-brand-white",
                )}
                aria-hidden="true"
              >
                {selected ? (
                  <Check size={17} strokeWidth={2.5} />
                ) : (
                  <span className="size-2 rounded-full bg-current opacity-65" />
                )}
              </span>

              <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <span className="block font-display text-[1.65rem] leading-none text-brand-white">
                  {item.value}
                </span>

                <span
                  className={cn(
                    "mt-2 block text-xs font-bold uppercase",
                    "tracking-[0.14em] transition",
                    selected
                      ? "text-brand-ivory"
                      : "text-brand-white/55",
                  )}
                >
                  {selected ? "Selected direction" : "View direction"}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-2 text-xs text-brand-white/42 sm:hidden">
        Swipe sideways to explore every direction.
      </p>
    </fieldset>
  );
}

function DetailsStep({
  occasion,
  product,
  style,
  quantity,
  date,
  today,
  onQuantityChange,
  onDateChange,
  onEditStep,
  headingRef,
}: {
  occasion: string;
  product: string;
  style: string;
  quantity: string;
  date: string;
  today: string;
  onQuantityChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onEditStep: (step: number) => void;
  headingRef: Ref<HTMLHeadingElement>;
}) {
  return (
    <div>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className={cn(
          "max-w-3xl font-display text-[clamp(2.1rem,9vw,3.5rem)]",
          "leading-[0.98] tracking-[-0.025em] outline-none",
        )}
      >
        {steps[3].title}
      </h3>

      <p className="mt-3 max-w-xl text-sm leading-6 text-brand-white/58 sm:text-base">
        These details are optional. An approximate quantity and date
        simply help the team prepare a more useful reply.
      </p>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2.5">
          <span className="text-sm font-bold text-brand-white">
            Approximate quantity
          </span>

          <span className="relative">
            <input
              type="number"
              min="1"
              max="10000"
              inputMode="numeric"
              autoComplete="off"
              name="enquiry-quantity"
              value={quantity}
              onChange={(event) =>
                onQuantityChange(event.target.value)
              }
              placeholder="For example: 100"
              className={cn(
                "min-h-14 w-full rounded-2xl border border-brand-white/15",
                "bg-brand-white/[0.075] px-4 pr-16 text-base",
                "text-brand-white outline-none transition",
                "placeholder:text-brand-white/32",
                "hover:border-brand-white/28 focus:border-brand-ivory/65",
                "focus:ring-2 focus:ring-brand-ivory/20",
              )}
            />

            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-bold text-brand-white/38">
              sets
            </span>
          </span>
        </label>

        <label className="grid gap-2.5">
          <span className="text-sm font-bold text-brand-white">
            Event date
          </span>

          <input
            type="date"
            min={today}
            name="enquiry-event-date"
            value={date}
            onChange={(event) => onDateChange(event.target.value)}
            className={cn(
              "min-h-14 w-full rounded-2xl border border-brand-white/15",
              "bg-brand-white/[0.075] px-4 text-base text-brand-white",
              "outline-none transition [color-scheme:dark]",
              "hover:border-brand-white/28 focus:border-brand-ivory/65",
              "focus:ring-2 focus:ring-brand-ivory/20",
            )}
          />
        </label>
      </div>

      <div className="mt-7 rounded-[20px] border border-brand-white/10 bg-brand-white/[0.06] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-ivory/60">
            Your direction
          </p>

          <span className="rounded-full bg-brand-ivory/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-brand-ivory">
            Ready
          </span>
        </div>

        <dl className="mt-4 divide-y divide-brand-white/10">
          <SummaryRow
            label="Occasion"
            value={occasion}
            onEdit={() => onEditStep(0)}
          />

          <SummaryRow
            label="Product"
            value={product}
            onEdit={() => onEditStep(1)}
          />

          <SummaryRow
            label="Style"
            value={style}
            onEdit={() => onEditStep(2)}
          />
        </dl>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <dt className="text-xs text-brand-white/45">{label}</dt>
        <dd className="mt-0.5 truncate text-sm font-bold text-brand-white">
          {value}
        </dd>
      </div>

      <button
        type="button"
        onClick={onEdit}
        className={cn(
          "min-h-10 shrink-0 rounded-full px-3 text-xs font-bold",
          "text-brand-ivory/70 transition",
          "hover:bg-brand-white/10 hover:text-brand-white",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-brand-ivory",
        )}
      >
        Edit
      </button>
    </div>
  );
}