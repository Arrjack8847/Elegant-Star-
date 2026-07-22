import type { InvitationCollection } from "@/data/collections";
import { siteConfig } from "@/data/site";
import type { OrderContext } from "@/lib/buildOrderMessage";

export type EnquiryContext = {
  reference?: string;
  name?: string;
  title?: string;
  category?: string;
  slug?: string;
  image?: string;
  pageUrl?: string;
  pagePath?: string;
  message?: string;
};

export function createEnquiryMessage(context?: EnquiryContext) {
  if (context?.message) return context.message;

  const title = context?.title ?? context?.name;

  if (title || context?.reference) {
    return [
      `Hello ${siteConfig.name},`,
      "",
      `I am interested in ${title ?? "a collection"}${
        context?.reference ? ` (${context.reference})` : ""
      }.`,
      "",
      "Could you please share suitable customisation options, quantity guidance and a quotation?",
    ].join("\n");
  }

  return [
    `Hello ${siteConfig.name},`,
    "",
    "I would like to ask about your invitation and stationery collections.",
    "",
    "Could you please help me with the available designs, pricing and customisation options?",
  ].join("\n");
}

export function designToEnquiryContext(
  design: InvitationCollection,
): EnquiryContext {
  return {
    reference: design.reference,
    name: design.name,
    title: design.name,
    category: design.categories.join(" / "),
    slug: design.slug,
    image: design.cover1 ?? design.cardImage ?? design.coverImage,
  };
}

export function designToOrderContext(
  design: InvitationCollection,
): OrderContext {
  return {
    title: design.name,
    slug: design.slug,
    image: design.cover1 ?? design.cardImage ?? design.coverImage,
    pagePath: `/designs/${design.slug}`,
  };
}
