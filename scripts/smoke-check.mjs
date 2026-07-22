import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceExtensions = new Set([
  ".css",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
]);

const collectionCategoryLabels = [
  "Special One",
  "Wedding Invitations",
  "Certificate Folders",
  "Gifts & Favours",
  "Corporate & Official",
];

const collectionCategoryFolders = [
  "special-one",
  "wedding-invitations",
  "certificate-folders",
  "gifts-and-favours",
  "corporate-official",
];

const activeSources = [
  "src/app",
  "src/components",
  "src/hooks",
  "src/lib",
  "src/data/collections.ts",
  "src/data/designs.ts",
  "src/data/home.ts",
  "src/data/site.ts",
  "src/data/siteMedia.ts",
  "src/data/stories.ts",
  "scripts/smoke-check.mjs",
];

const failures = [];
const imageMediaPattern = /\.(avif|gif|jpe?g|png|webp)$/i;
const videoMediaPattern = /\.(m4v|mov|mp4|webm)$/i;

function fail(message) {
  failures.push(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function walk(directory, callback) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".next" || entry.name === "node_modules") {
      continue;
    }

    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walk(entryPath, callback);
    } else {
      callback(entryPath);
    }
  }
}

function activeFilePaths() {
  const files = [];

  for (const source of activeSources) {
    const sourcePath = path.join(root, source);

    if (!fs.existsSync(sourcePath)) {
      continue;
    }

    if (fs.statSync(sourcePath).isDirectory()) {
      walk(sourcePath, (filePath) => files.push(filePath));
    } else {
      files.push(sourcePath);
    }
  }

  return files.filter((filePath) =>
    sourceExtensions.has(path.extname(filePath)),
  );
}

function duplicateValues(values) {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }

    seen.add(value);
  }

  return [...duplicates];
}

function assertPublicMediaPath(value, context) {
  if (!value.startsWith("/media/collections/")) {
    fail(
      `Collection media must use /media/collections path: ${value} (${context})`,
    );
    return;
  }

  if (
    value.startsWith("/public/") ||
    value.includes("public/media/collections")
  ) {
    fail(`Collection media must not include public/: ${value} (${context})`);
    return;
  }

  const assetPath = path.join(root, "public", value.replace(/^\//, ""));

  if (!fs.existsSync(assetPath)) {
    fail(`Missing collection media file: ${value} (${context})`);
  }
}

function assertImageMediaPath(value, context) {
  assertPublicMediaPath(value, context);

  if (!imageMediaPattern.test(value)) {
    fail(`Expected image media path: ${value} (${context})`);
  }
}

function assertVideoMediaPath(value, context) {
  assertPublicMediaPath(value, context);

  if (!videoMediaPattern.test(value)) {
    fail(`Expected video media path: ${value} (${context})`);
  }
}

function checkDataIntegrity() {
  const generated = JSON.parse(
    read("src/data/elegantStarCollections.fromPosts.json"),
  );
  const stories = read("src/data/stories.ts");
  const collections = generated.collections ?? [];
  const categories = generated.categories ?? [];
  const categoryLabels = categories.map((category) => category.label);
  const categoryFolders = categories.map((category) => category.slug);
  const collectionSlugs = collections.map((collection) => collection.slug);
  const storySlugs = [...stories.matchAll(/slug:\s*"([^"]+)"/g)].map(
    (match) => match[1],
  );

  if (categoryLabels.join("|") !== collectionCategoryLabels.join("|")) {
    fail(`Unexpected collection categories: ${categoryLabels.join(", ")}`);
  }

  if (categoryFolders.join("|") !== collectionCategoryFolders.join("|")) {
    fail(`Unexpected collection folders: ${categoryFolders.join(", ")}`);
  }

  if (collections.length !== generated.totalCollections) {
    fail(
      `Generated totalCollections is ${generated.totalCollections}, but ${collections.length} collections are present.`,
    );
  }

  for (const label of collectionCategoryLabels) {
    const sourceCount =
      categories.find((category) => category.label === label)?.count ?? 0;
    const itemCount = collections.filter(
      (collection) => collection.category === label,
    ).length;

    if (sourceCount === 0 || itemCount === 0) {
      fail(`Category has no rendered collection items: ${label}`);
    }

    if (sourceCount !== itemCount) {
      fail(
        `Category count mismatch for ${label}: ${sourceCount} in categories, ${itemCount} in collections.`,
      );
    }
  }

  if (storySlugs.length !== 5) {
    fail(`Expected 5 story slugs, found ${storySlugs.length}.`);
  }

  for (const [label, values] of [
    ["collection slugs", collectionSlugs],
    ["story slugs", storySlugs],
  ]) {
    const duplicates = duplicateValues(values);

    if (duplicates.length > 0) {
      fail(`Duplicate ${label}: ${duplicates.join(", ")}`);
    }
  }

  for (const collection of collections) {
    const requiredStrings = [
      "title",
      "slug",
      "category",
      "description",
      "coverImage",
    ];

    for (const field of requiredStrings) {
      if (typeof collection[field] !== "string" || !collection[field]) {
        fail(
          `Collection ${collection.slug ?? collection.id} is missing ${field}.`,
        );
      }
    }

    if (!Array.isArray(collection.gallery) || collection.gallery.length === 0) {
      fail(`Collection ${collection.slug} must have a non-empty gallery.`);
    }

    if (Object.hasOwn(collection, "tags")) {
      fail(`Collection ${collection.slug} should not use tags.`);
    }

    if (!collectionCategoryLabels.includes(collection.category)) {
      fail(
        `Collection ${collection.slug} has unexpected category ${collection.category}.`,
      );
    }

    if (/\b(John|Emily|Aung|Bride|Groom|Customer)\b/i.test(collection.title)) {
      fail(
        `Collection title may expose private/customer text: ${collection.title}`,
      );
    }

    if (
      /\b(John|Emily|Aung|Bride|Groom|Customer)\b|\+95|09\d{5,}/i.test(
        collection.description,
      )
    ) {
      fail(
        `Collection description may expose private/customer text: ${collection.slug}`,
      );
    }

    assertImageMediaPath(
      collection.coverImage,
      `${collection.slug} coverImage`,
    );

    for (const coverField of ["cover1", "cover2"]) {
      if (collection[coverField]) {
        assertImageMediaPath(
          collection[coverField],
          `${collection.slug} ${coverField}`,
        );
      }
    }

    for (const image of collection.gallery) {
      assertImageMediaPath(image, `${collection.slug} gallery`);
    }

    for (const image of collection.images ?? []) {
      assertImageMediaPath(image, `${collection.slug} images`);
    }

    for (const video of collection.videos ?? []) {
      assertVideoMediaPath(video, `${collection.slug} video`);
    }
  }
}

function checkPublicAssets() {
  const assetPattern =
    /["'`]((?:\/)(?:media|hero|brand|placeholders)\/[^"'`]+?\.(?:avif|jpg|jpeg|mov|mp4|png|svg|webm|webp))["'`]/gi;
  const missing = [];

  function checkFile(filePath) {
    const text = fs.readFileSync(filePath, "utf8");
    const relativePath = path.relative(root, filePath);

    for (const match of text.matchAll(assetPattern)) {
      const assetPath = path.join(root, "public", match[1].replace(/^\//, ""));

      if (!fs.existsSync(assetPath)) {
        missing.push(`${match[1]} referenced from ${relativePath}`);
      }
    }
  }

  for (const filePath of activeFilePaths()) {
    checkFile(filePath);
  }

  if (missing.length > 0) {
    fail(`Missing public assets:\n${missing.join("\n")}`);
  }
}

function checkStaleActiveReferences() {
  const staleChecks = [
    ["Marriage Certificate Folders", "old category label"],
    ["Special Collections", "old category label"],
    [
      "/media/collections/marriage-certificate-folders/",
      "old collection folder",
    ],
    ["/media/collections/special-collections/", "old collection folder"],
    ["/public/media/collections/", "incorrect public URL prefix"],
    ["Brand Service", "removed collection category label"],
    ["brand-service", "removed collection category folder"],
    ["/gallery", "removed gallery page route"],
  ];

  for (const filePath of activeFilePaths()) {
    const text = fs.readFileSync(filePath, "utf8");
    const relativePath = path.relative(root, filePath);

    if (relativePath === path.join("scripts", "smoke-check.mjs")) {
      continue;
    }

    for (const [needle, label] of staleChecks) {
      if (text.includes(needle)) {
        fail(`Found ${label} in ${relativePath}: ${needle}`);
      }
    }

    if (/\/media\/collections\/[^"'`]*post-\d+/i.test(text)) {
      fail(`Found old post-based collection media path in ${relativePath}`);
    }

    if (/\btags\s*:|\btags\s*=|\.tags\b/.test(text)) {
      fail(`Found tag-based collection logic in ${relativePath}`);
    }
  }
}

function checkSeoPlaceholders() {
  walk(path.join(root, "src"), (filePath) => {
    if (!sourceExtensions.has(path.extname(filePath))) {
      return;
    }

    const text = fs.readFileSync(filePath, "utf8");

    if (text.includes("https://example.com")) {
      fail(`Found placeholder URL in ${path.relative(root, filePath)}`);
    }
  });
}

checkDataIntegrity();
checkPublicAssets();
checkStaleActiveReferences();
checkSeoPlaceholders();

if (failures.length > 0) {
  console.error(failures.join("\n\n"));
  process.exit(1);
}

console.log("Smoke checks passed.");
