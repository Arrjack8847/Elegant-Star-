export type OrderContext = {
  title: string;
  slug: string;
  image?: string;
  pagePath?: string;
};

function cleanValue(value: string) {
  const trimmed = value?.trim();

  return trimmed && !/^(undefined|null|n\/a)$/i.test(trimmed)
    ? trimmed
    : "";
}

export function buildOrderMessage({
  title,
  productUrl,
}: {
  title: string;
  productUrl: string;
}) {
  const cleanTitle = cleanValue(title) || "this design";
  const cleanProductUrl = cleanValue(productUrl);

  return [
    "Hello Elegant Star,",
    "",
    `I'm interested in ${cleanTitle}.`,
    "",
    ...(cleanProductUrl ? ["Product link:", cleanProductUrl, ""] : []),
    "Could you please share the price and customisation options?",
  ].join("\n");
}
