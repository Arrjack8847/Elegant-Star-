"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { enquiryStyles } from "@/data/home";
import { EnquiryButton } from "@/components/enquiry/EnquiryButton";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { SectionTransition } from "@/components/motion/SectionTransition";

const occasions = [
  "Wedding",
  "Engagement",
  "Traditional ceremony",
  "Corporate event",
  "Other celebration",
];
const products = [
  "Invitation suite",
  "Certificate folder",
  "Premium box set",
  "Event stationery",
  "Custom request",
];
export function GuidedEnquiryExperience() {
  const [step, setStep] = useState(0);
  const [occasion, setOccasion] = useState("");
  const [product, setProduct] = useState("");
  const [style, setStyle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const message = useMemo(
    () =>
      [
        `Hello Elegant Star, I would like to begin a guided stationery enquiry.`,
        `Occasion: ${occasion || "Not selected"}`,
        `Product: ${product || "Not selected"}`,
        `Style: ${style || "Not selected"}`,
        `Approximate quantity: ${quantity || "Not provided"}`,
        `Event date: ${date || "Not provided"}`,
        "Please let me know the suitable next steps and quotation details.",
      ].join("\n"),
    [occasion, product, style, quantity, date],
  );
  const canNext =
    step === 0
      ? !!occasion
      : step === 1
        ? !!product
        : step === 2
          ? !!style
          : true;
  return (
    <SectionTransition
      variant="rounded-dark"
      className="section-shell bg-brand-sage text-brand-white"
      data-nav-theme="dark"
      id="guided-enquiry"
    >
      <div className="section-inner">
        <div className="mx-auto max-w-5xl">
          <RevealGroup className="text-center" stagger={0.07} start="top 84%">
            <p className="small-label text-brand-ivory/62">Guided Enquiry</p>
            <h2 className="display-heading mt-4 text-[2.75rem] leading-[0.96] sm:text-6xl md:text-8xl">
              Begin with what <span className="block">you already know.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-brand-white/72 sm:mt-6 sm:text-lg">
              A short visual guide prepares the important details before you
              contact the team.
            </p>
          </RevealGroup>
          <Reveal start="top 78%" delay={0.08}>
            <div className="mt-9 overflow-hidden rounded-[24px] border border-brand-white/15 bg-brand-olive/28 p-4 backdrop-blur-xl sm:mt-12 sm:rounded-[30px] sm:p-5 md:p-8">
              <div className="mb-7 flex items-center gap-2" aria-hidden="true">
                {[0, 1, 2, 3].map((item) => (
                  <span
                    key={item}
                    className={cn(
                      "h-1.5 flex-1 rounded-full",
                      item <= step ? "bg-brand-ivory" : "bg-brand-ivory/18",
                    )}
                  />
                ))}
              </div>
              {step === 0 ? (
                <ChoiceStep
                  title="What are you celebrating?"
                  options={occasions}
                  value={occasion}
                  onChange={setOccasion}
                />
              ) : null}
              {step === 1 ? (
                <ChoiceStep
                  title="What do you need?"
                  options={products}
                  value={product}
                  onChange={setProduct}
                />
              ) : null}
              {step === 2 ? (
                <div>
                  <h3 className="font-display text-[2.1rem] leading-[1.04] sm:text-4xl md:text-5xl">
                    Which direction feels closest?
                  </h3>
                  <div className="mt-6 grid grid-cols-1 gap-3 min-[390px]:grid-cols-2 md:mt-7 md:grid-cols-3">
                    {enquiryStyles.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setStyle(item.value)}
                        aria-pressed={style === item.value}
                        className={cn(
                          "group relative aspect-[4/3] min-h-36 overflow-hidden rounded-2xl border",
                          style === item.value
                            ? "border-brand-ivory ring-2 ring-brand-ivory/45"
                            : "border-brand-ivory/15",
                        )}
                      >
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover transition group-hover:scale-[1.03]"
                          sizes="(max-width: 389px) 100vw, (max-width: 767px) 50vw, 33vw"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-brand-olive/85 to-transparent" />
                        <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-left font-bold">
                          <span>{item.value}</span>
                          {style === item.value ? (
                            <Check size={17} aria-hidden="true" />
                          ) : null}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
              {step === 3 ? (
                <div>
                  <h3 className="font-display text-[2.1rem] leading-[1.04] sm:text-4xl md:text-5xl">
                    Add the practical details.
                  </h3>
                  <div className="mt-7 grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2 text-sm font-bold">
                      Approximate quantity
                      <input
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="For example: 100 sets"
                        inputMode="numeric"
                        className="min-h-12 rounded-xl border border-brand-white/15 bg-brand-white/10 px-4 text-base text-brand-white outline-none placeholder:text-brand-white/38"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-bold">
                      Event date
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="min-h-12 rounded-xl border border-brand-white/15 bg-brand-white/10 px-4 text-base text-brand-white outline-none"
                      />
                    </label>
                  </div>
                  <div className="mt-6 rounded-2xl bg-brand-white/8 p-5 text-sm leading-7 text-brand-white/70">
                    <strong className="text-brand-white">
                      Your direction:
                    </strong>{" "}
                    {occasion} · {product} · {style}
                  </div>
                </div>
              ) : null}
              <div className="mt-8 flex flex-col items-stretch justify-between gap-3 min-[420px]:flex-row min-[420px]:items-center">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-brand-white/20 px-5 text-sm font-bold disabled:opacity-35"
                >
                  <ChevronLeft size={17} aria-hidden="true" /> Back
                </button>
                {step < 3 ? (
                  <button
                    type="button"
                    disabled={!canNext}
                    onClick={() => setStep((s) => Math.min(3, s + 1))}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-ivory px-5 text-sm font-bold text-brand-olive disabled:opacity-40"
                  >
                    Continue <ChevronRight size={17} aria-hidden="true" />
                  </button>
                ) : (
                  <EnquiryButton variant="dark" context={{ message }}>
                    Prepare My Enquiry
                  </EnquiryButton>
                )}
              </div>
            </div>
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
}: {
  title: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <h3 className="font-display text-[2.1rem] leading-[1.04] sm:text-4xl md:text-5xl">
        {title}
      </h3>
      <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2">
        {options.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-pressed={value === item}
            className={cn(
              "flex min-h-14 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left font-bold transition sm:min-h-16 sm:px-5",
              value === item
                ? "border-brand-ivory bg-brand-ivory text-brand-olive"
                : "border-brand-white/15 bg-brand-white/[0.055] hover:bg-brand-white/10",
            )}
          >
            <span>{item}</span>
            {value === item ? <Check size={18} aria-hidden="true" /> : null}
          </button>
        ))}
      </div>
    </div>
  );
}
