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

const failures = [];

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

function checkDataIntegrity() {
  const collections = read("src/data/collections.ts");
  const stories = read("src/data/stories.ts");
  const home = read("src/data/home.ts");

  const collectionSlugs = [
    ...collections.matchAll(/(?:"slug"|slug):\s*"([^"]+)"/g),
  ].map((match) => match[1]);
  const collectionIds = [
    ...collections.matchAll(/(?:"id"|id):\s*"([^"]+)"/g),
  ].map((match) => match[1]);
  const collectionRefs = [
    ...collections.matchAll(/(?:"reference"|reference):\s*"([^"]+)"/g),
  ].map((match) => match[1]);
  const storySlugs = [...stories.matchAll(/(?:"slug"|slug):\s*"([^"]+)"/g)].map(
    (match) => match[1],
  );

  if (collectionSlugs.length !== 63) {
    fail(`Expected 63 collection slugs, found ${collectionSlugs.length}.`);
  }

  if (storySlugs.length !== 5) {
    fail(`Expected 5 story slugs, found ${storySlugs.length}.`);
  }

  for (const [label, values] of [
    ["collection slugs", collectionSlugs],
    ["collection ids", collectionIds],
    ["collection references", collectionRefs],
    ["story slugs", storySlugs],
  ]) {
    const duplicates = duplicateValues(values);

    if (duplicates.length > 0) {
      fail(`Duplicate ${label}: ${duplicates.join(", ")}`);
    }
  }

  const collectionSlugSet = new Set(collectionSlugs);
  const storySlugSet = new Set(storySlugs);
  const homeHrefs = [...home.matchAll(/href: "([^"]+)"/g)].map(
    (match) => match[1],
  );

  for (const href of homeHrefs) {
    const designMatch = href.match(/^\/designs\/(.+)$/);
    const storyMatch = href.match(/^\/stories\/(.+)$/);

    if (designMatch && !collectionSlugSet.has(designMatch[1])) {
      fail(`Homepage link points to missing collection: ${href}`);
    }

    if (storyMatch && !storySlugSet.has(storyMatch[1])) {
      fail(`Homepage link points to missing story: ${href}`);
    }
  }
}

function checkPublicAssets() {
  const assetPattern =
    /["'`]((?:\/)(?:media|hero|brand|placeholders)\/[^"'`]+?\.(?:jpg|jpeg|png|svg|webp))["'`]/gi;
  const missing = [];

  walk(root, (filePath) => {
    const extension = path.extname(filePath);

    if (!sourceExtensions.has(extension)) {
      return;
    }

    const text = fs.readFileSync(filePath, "utf8");
    const relativePath = path.relative(root, filePath);

    for (const match of text.matchAll(assetPattern)) {
      const assetPath = path.join(root, "public", match[1].replace(/^\//, ""));

      if (!fs.existsSync(assetPath)) {
        missing.push(`${match[1]} referenced from ${relativePath}`);
      }
    }
  });

  if (missing.length > 0) {
    fail(`Missing public assets:\n${missing.join("\n")}`);
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
checkSeoPlaceholders();

if (failures.length > 0) {
  console.error(failures.join("\n\n"));
  process.exit(1);
}

console.log("Smoke checks passed.");
