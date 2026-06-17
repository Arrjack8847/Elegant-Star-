import { siteConfig } from "@/data/site";
import type { InvitationCollection } from "@/data/collections";

export type EnquiryContext = {
  reference?: string;
  name?: string;
  message?: string;
};

export function createEnquiryMessage(context?: EnquiryContext) {
  if (context?.message) return context.message;
  if (context?.reference) {
    return [
      `Hello ${siteConfig.name}, I am interested in ${context.name ?? "a collection"} (${context.reference}).`,
      "Could you please share suitable customisation options, quantity guidance and a quotation?",
    ].join("\n");
  }
  return [
    `Hello ${siteConfig.name}, I would like to start a stationery enquiry.`,
    "Could you please share suitable customisation options, quantity guidance and a quotation?",
  ].join("\n");
}

export function designToEnquiryContext(
  design: InvitationCollection,
): EnquiryContext {
  return { reference: design.reference, name: design.name };
}
