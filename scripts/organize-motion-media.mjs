import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const toolRoot = path.join(process.env.TEMP || "", "codex-ffmpeg-static");
const ffmpeg =
  process.env.FFMPEG_PATH ||
  path.join(toolRoot, "node_modules", "ffmpeg-static", "ffmpeg.exe");
const ffprobe =
  process.env.FFPROBE_PATH ||
  path.join(
    toolRoot,
    "node_modules",
    "ffprobe-static",
    "bin",
    "win32",
    "x64",
    "ffprobe.exe",
  );

const sourceDir = path.join(root, "public", "media", "video");
const backupDir = path.join(root, "media-source", "videos-original");
const motionDir = path.join(root, "public", "media", "motion");
const inventoryDir = path.join(root, "media-inventory");
const tsManifestPath = path.join(root, "src", "data", "elegantStarVideos.ts");
const videoExtRe = /\.(mp4|mov|webm|m4v|avi|mkv)$/i;

const categoryDirs = {
  brand: "brand/showroom",
  collections: "collections",
  "details-and-finishes": "details-and-finishes",
  "packaging-and-presentation": "packaging-and-presentation",
  accessories: "accessories",
  "process-and-making": "process-and-making",
  stories: "stories",
};

const C = (
  id,
  category,
  title,
  description,
  tags,
  placements,
  relatedCollectionSlugs = [],
  featured = false,
  posterFraction = 0.66,
  visualReviewGroup = "",
) => ({
  id,
  category,
  title,
  description,
  tags,
  placements,
  relatedCollectionSlugs,
  featured,
  autoplayPreview: featured,
  posterFraction,
  visualReviewGroup,
});

const classifications = {
  1: C(
    "blush-photo-invitation-suite-01",
    "collections",
    "Blush Photo Invitation Suite",
    "A blush invitation suite with layered cards, wax-seal detail, and a coordinated photo insert.",
    ["blush", "photo-insert", "wax-seal", "invitation-suite"],
    ["home", "collections", "collection-detail", "gallery"],
    [],
    true,
    0.52,
  ),
  2: C(
    "red-box-black-gold-presentation-01",
    "packaging-and-presentation",
    "Red Box and Black Gold Presentation",
    "A premium red gift-box presentation with black-and-gold stationery and seal accents.",
    ["red", "black-gold", "gift-box", "presentation"],
    ["home", "collection-detail", "gallery"],
    [],
    true,
  ),
  3: C(
    "champagne-gold-relief-detail-01",
    "details-and-finishes",
    "Champagne Gold Relief Detail",
    "Close-up footage of raised metallic relief, ornamental corners, and tactile folder finishing.",
    ["gold-relief", "ornamental", "folder-detail", "metallic-finish"],
    ["home", "our-craft", "gallery"],
    ["champagne-sculpted-bird-suite"],
    true,
    0.66,
    "ornate-relief-folder-details",
  ),
  4: C(
    "floral-illustration-invitation-suite-01",
    "collections",
    "Floral Illustration Invitation Suite",
    "A romantic floral illustration suite shown with layered printed pieces and coordinated artwork.",
    ["floral", "illustration", "romantic", "invitation-suite"],
    ["collections", "collection-detail", "gallery"],
    ["illustrated-romance-suite"],
  ),
  5: C(
    "grey-certificate-folder-suite-01",
    "collections",
    "Grey Certificate Folder Suite",
    "A neutral certificate folder suite with calligraphy styling and metallic corner detail.",
    ["grey", "certificate-folder", "calligraphy", "metallic-detail"],
    ["collections", "collection-detail", "gallery"],
    ["modern-grey-luxury-suite"],
    false,
    0.42,
  ),
  6: C(
    "brown-gold-relief-folder-detail-01",
    "details-and-finishes",
    "Brown Gold Relief Folder Detail",
    "A brown folder detail clip focused on dimensional gold relief, edges, and ornamental accents.",
    ["brown", "gold-relief", "folder-detail", "ornamental"],
    ["our-craft", "gallery"],
    ["warm-brown-script-folders"],
    false,
    0.66,
    "ornate-relief-folder-details",
  ),
  7: C(
    "pink-boxed-invitation-presentation-01",
    "packaging-and-presentation",
    "Pink Boxed Invitation Presentation",
    "A soft pink boxed presentation with a formal invitation card and matching enclosure pieces.",
    ["pink", "boxed", "invitation", "presentation"],
    ["home", "collection-detail", "gallery"],
    [],
    true,
    0.66,
    "boxed-presentation-variants",
  ),
  8: C(
    "green-stationery-preparation-01",
    "process-and-making",
    "Green Stationery Preparation",
    "Hands arranging and preparing deep green stationery pieces with gold printed details.",
    ["green", "preparation", "assembly", "gold-printing"],
    ["our-craft", "gallery"],
    [],
    false,
    0.42,
  ),
  9: C(
    "lace-edge-invitation-suite-01",
    "collections",
    "Lace Edge Invitation Suite",
    "An ivory invitation suite with lace-edged shaping, monogram detail, and coordinated envelope pieces.",
    ["lace-edge", "ivory", "monogram", "invitation-suite"],
    ["collections", "collection-detail", "gallery"],
    ["scalloped-ivory-gold-suite"],
  ),
  10: C(
    "illustrated-pop-up-invitation-suite-01",
    "collections",
    "Illustrated Pop-Up Invitation Suite",
    "A dimensional illustrated suite with venue artwork, layered presentation, and coordinated inserts.",
    ["illustrated", "pop-up", "venue-artwork", "invitation-suite"],
    ["home", "collections", "collection-detail", "gallery"],
    ["illustrated-romance-suite"],
    true,
  ),
  11: C(
    "red-heritage-invitation-suite-01",
    "collections",
    "Red Heritage Invitation Suite",
    "A red heritage-style invitation suite with gold detailing and layered presentation pieces.",
    ["red", "heritage", "gold-detail", "invitation-suite"],
    ["collections", "collection-detail", "gallery"],
    ["double-happiness-red-suite"],
  ),
  12: C(
    "pink-gold-relief-folder-detail-01",
    "details-and-finishes",
    "Pink Gold Relief Folder Detail",
    "A pink folder detail clip highlighting gold relief ornaments and raised decorative finishing.",
    ["pink", "gold-relief", "folder-detail", "ornamental"],
    ["our-craft", "gallery"],
    ["blush-figurine-heritage-suite"],
    false,
    0.42,
    "ornate-relief-folder-details",
  ),
  13: C(
    "neutral-gold-ornate-folder-detail-01",
    "details-and-finishes",
    "Neutral Gold Ornate Folder Detail",
    "Close-up footage of a neutral folder with gold border work and ornamental central detailing.",
    ["neutral", "gold-border", "folder-detail", "ornamental"],
    ["our-craft", "gallery"],
    ["ivory-gold-ornate-frame-suite"],
    false,
    0.66,
    "neutral-gold-ornate-folder-repeat",
  ),
  14: C(
    "green-heritage-certificate-suite-01",
    "collections",
    "Green Heritage Certificate Suite",
    "A green certificate folder suite shown opening to reveal coordinated inner printed pieces.",
    ["green", "heritage", "certificate-folder", "suite"],
    ["collections", "collection-detail", "gallery"],
    ["lacquer-bird-heritage-suite"],
  ),
  15: C(
    "cream-launch-announcement-box-01",
    "packaging-and-presentation",
    "Cream Launch Announcement Box",
    "A cream announcement card presented inside a shallow box with metallic corner styling.",
    ["cream", "announcement", "boxed", "presentation"],
    ["collection-detail", "gallery"],
    [],
    false,
    0.42,
  ),
  16: C(
    "oval-monogram-box-presentation-01",
    "packaging-and-presentation",
    "Oval Monogram Box Presentation",
    "A boxed monogram presentation with framed card detail and coordinated premium packaging.",
    ["oval-monogram", "boxed", "certificate-folder", "presentation"],
    ["collection-detail", "gallery"],
    ["oval-monogram-box-suite"],
    false,
    0.42,
  ),
  17: C(
    "coordinated-gift-accessories-01",
    "accessories",
    "Coordinated Gift Accessories",
    "A coordinated accessory assortment including fan, diffuser, bookmark, mirror, and small favor pieces.",
    ["fan", "diffuser", "bookmark", "mirror", "accessories"],
    ["home", "our-craft", "gallery"],
    [],
    true,
    0.18,
    "accessory-assortment-variants",
  ),
  18: C(
    "brown-certificate-folder-suite-01",
    "collections",
    "Brown Certificate Folder Suite",
    "A brown certificate folder suite presented with matching box and refined metallic detailing.",
    ["brown", "certificate-folder", "boxed", "suite"],
    ["collections", "collection-detail", "gallery"],
    ["textile-certificate-folders"],
    false,
    0.42,
  ),
  19: C(
    "champagne-bird-relief-folder-detail-01",
    "details-and-finishes",
    "Champagne Bird Relief Folder Detail",
    "A champagne folder detail clip focused on sculpted bird relief and metallic ornamentation.",
    ["champagne", "bird-relief", "folder-detail", "metallic-finish"],
    ["our-craft", "gallery"],
    ["champagne-sculpted-bird-suite"],
    false,
    0.88,
    "ornate-relief-folder-details",
  ),
  20: C(
    "minimal-wax-seal-invitation-suite-01",
    "collections",
    "Minimal Wax Seal Invitation Suite",
    "A minimal invitation suite with a gold wax-seal closure, soft envelope detail, and matching inserts.",
    ["minimal", "wax-seal", "monogram", "invitation-suite"],
    ["home", "collections", "collection-detail", "gallery"],
    ["minimal-gold-wax-suite"],
    true,
    0.88,
  ),
  23: C(
    "favor-accessory-display-01",
    "accessories",
    "Favor Accessory Display",
    "A favor and accessory display with small gift pieces, wax sachet, mirror, and shelving presentation.",
    ["favors", "wax-sachet", "mirror", "accessories", "display"],
    ["our-craft", "gallery"],
    [],
    false,
    0.88,
    "accessory-assortment-variants",
  ),
  24: C(
    "dark-lacquer-gold-relief-detail-01",
    "details-and-finishes",
    "Dark Lacquer Gold Relief Detail",
    "A dark lacquer-style folder detail clip with sculpted gold relief and dramatic product lighting.",
    ["dark-lacquer", "gold-relief", "folder-detail", "heritage"],
    ["our-craft", "gallery"],
    ["lacquer-bird-heritage-suite"],
    false,
    0.66,
    "ornate-relief-folder-details",
  ),
  25: C(
    "pink-boxed-certificate-presentation-01",
    "packaging-and-presentation",
    "Pink Boxed Certificate Presentation",
    "A pink certificate presentation shown inside a fitted box with coordinated printed materials.",
    ["pink", "boxed", "certificate", "presentation"],
    ["collection-detail", "gallery"],
    [],
    false,
    0.42,
    "boxed-presentation-variants",
  ),
  26: C(
    "neutral-gold-ornate-folder-detail-02",
    "details-and-finishes",
    "Neutral Gold Ornate Folder Detail 02",
    "A second neutral gold ornate folder detail clip with similar finishing but different timing and file data.",
    ["neutral", "gold-border", "folder-detail", "ornamental"],
    ["our-craft", "gallery"],
    ["ivory-gold-ornate-frame-suite"],
    false,
    0.88,
    "neutral-gold-ornate-folder-repeat",
  ),
  27: C(
    "monogram-boxed-envelope-presentation-01",
    "packaging-and-presentation",
    "Monogram Boxed Envelope Presentation",
    "A boxed monogram envelope presentation with ivory lining and a sculptural metallic initial.",
    ["monogram", "boxed", "envelope", "presentation"],
    ["collection-detail", "gallery"],
    ["premium-boxed-signature-set"],
    false,
    0.88,
    "boxed-presentation-variants",
  ),
  28: C(
    "green-venue-invitation-suite-01",
    "collections",
    "Green Venue Invitation Suite",
    "A green venue artwork suite with wax-seal detail, illustrated landscape, and coordinated cards.",
    ["green", "venue-artwork", "wax-seal", "invitation-suite"],
    ["collections", "collection-detail", "gallery"],
    ["green-venue-botanical-suite"],
  ),
  29: C(
    "burgundy-corporate-folder-suite-01",
    "collections",
    "Burgundy Corporate Folder Suite",
    "A burgundy corporate folder suite with metallic cover printing and event-style presentation.",
    ["burgundy", "corporate", "folder-suite", "event-stationery"],
    ["collections", "collection-detail", "gallery"],
  ),
  30: C(
    "red-program-invitation-suite-01",
    "collections",
    "Red Program Invitation Suite",
    "A red invitation and program suite with seal detail, layered cards, and coordinated envelopes.",
    ["red", "program", "seal", "invitation-suite"],
    ["collections", "collection-detail", "gallery"],
    ["minimal-red-program-suite"],
    false,
    0.42,
  ),
  31: C(
    "white-wax-seal-invitation-suite-01",
    "collections",
    "White Wax Seal Invitation Suite",
    "A white invitation suite with wax-seal closure, layered inserts, and a soft neutral presentation.",
    ["white", "wax-seal", "invitation-suite", "neutral"],
    ["collections", "collection-detail", "gallery"],
    ["minimal-botanical-seal-suite"],
  ),
  32: C(
    "ivory-gold-frame-detail-01",
    "details-and-finishes",
    "Ivory Gold Frame Detail",
    "Close-up footage of ivory stationery with ornate gold frame borders and raised finishing.",
    ["ivory", "gold-frame", "raised-detail", "finish"],
    ["home", "our-craft", "gallery"],
    ["ivory-gold-ornate-frame-suite"],
    true,
    0.66,
    "ornate-relief-folder-details",
  ),
  33: C(
    "blue-venue-certificate-box-01",
    "packaging-and-presentation",
    "Blue Venue Certificate Box",
    "A blue boxed certificate presentation featuring venue artwork and a fitted premium case.",
    ["blue", "venue-artwork", "certificate", "boxed"],
    ["collection-detail", "gallery"],
    ["blue-venue-illustrated-suite"],
    false,
    0.66,
    "boxed-presentation-variants",
  ),
  34: C(
    "luxury-folder-box-presentation-01",
    "packaging-and-presentation",
    "Luxury Folder Box Presentation",
    "A premium box and folder presentation showing layered colors, metallic detail, and product stacking.",
    ["luxury-box", "folder-presentation", "metallic-detail", "product-stack"],
    ["collection-detail", "gallery"],
    ["royal-lacquer-gold-box-set"],
    false,
    0.88,
    "boxed-presentation-variants",
  ),
  35: C(
    "royal-blue-gold-suite-01",
    "collections",
    "Royal Blue Gold Suite",
    "A royal blue stationery suite with gold printing, coordinated pieces, and formal presentation.",
    ["royal-blue", "gold-printing", "suite", "formal"],
    ["home", "collections", "collection-detail", "gallery"],
    ["royal-blue-gold-suite"],
    true,
  ),
  36: C(
    "pink-fan-invitation-suite-01",
    "collections",
    "Pink Fan Invitation Suite",
    "A pink fan-shaped invitation suite with windowed sleeve, monogram seal, and gold accents.",
    ["pink", "fan", "monogram", "invitation-suite"],
    ["collections", "collection-detail", "gallery"],
    ["blush-fan-signature-suite"],
  ),
  37: C(
    "lavender-floral-invitation-suite-01",
    "collections",
    "Lavender Floral Invitation Suite",
    "A lavender floral invitation suite with transparent overlay, ribbon wrap, and coordinated cards.",
    ["lavender", "floral", "transparent-overlay", "invitation-suite"],
    ["collections", "collection-detail", "gallery"],
    ["lavender-floral-program-suite"],
  ),
  38: C(
    "showroom-tour-01",
    "brand",
    "Showroom Tour",
    "A showroom tour showing display shelves, invitation samples, boxed sets, and atelier presentation areas.",
    ["showroom", "brand", "display", "atelier"],
    ["about"],
    [],
    false,
    0.88,
  ),
};

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });
const projectPath = (absolutePath) =>
  path.relative(root, absolutePath).split(path.sep).join("/");
const publicPath = (absolutePath) =>
  `/${path.relative(path.join(root, "public"), absolutePath).split(path.sep).join("/")}`;

function hashFile(filePath) {
  const hash = crypto.createHash("sha256");
  hash.update(fs.readFileSync(filePath));
  return hash.digest("hex");
}

function ffprobeJson(filePath) {
  const result = spawnSync(
    ffprobe,
    [
      "-v",
      "error",
      "-print_format",
      "json",
      "-show_format",
      "-show_streams",
      filePath,
    ],
    { encoding: "utf8" },
  );
  if (result.status !== 0) {
    throw new Error(
      `ffprobe failed for ${filePath}: ${result.stderr || result.stdout}`,
    );
  }
  return JSON.parse(result.stdout);
}

function rateToNumber(rate) {
  if (!rate || rate === "0/0") return 0;
  const [a, b] = rate.split("/").map(Number);
  return Number.isFinite(a) && Number.isFinite(b) ? (b ? a / b : a) : 0;
}

function round(value, digits = 3) {
  return Number(Number(value || 0).toFixed(digits));
}

function compatibilityFor(codec) {
  const normalized = String(codec || "").toLowerCase();
  if (normalized === "h264") return "production-ready";
  if (normalized === "vp9" || normalized === "av1") return "convert-to-h264";
  return "review";
}

function orientationFor(width, height) {
  if (width === height) return "square";
  return width > height ? "landscape" : "portrait";
}

function noCopySuffix(filename) {
  return !/\s\(\d+\)\.[^.]+$/i.test(filename);
}

function canonicalForGroup(group) {
  return [...group].sort((a, b) => {
    const aClean = noCopySuffix(a.filename);
    const bClean = noCopySuffix(b.filename);
    if (aClean !== bClean) return aClean ? -1 : 1;
    return a.filename.localeCompare(b.filename);
  })[0];
}

function csvValue(value) {
  const text = Array.isArray(value) ? value.join("|") : String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function writeCsv(filePath, rows, fields) {
  const lines = [fields.join(",")];
  for (const row of rows) {
    lines.push(fields.map((field) => csvValue(row[field])).join(","));
  }
  fs.writeFileSync(filePath, `${lines.join("\n")}\n`);
}

function collectionSlugs() {
  const filePath = path.join(root, "src", "data", "collections.ts");
  const text = fs.readFileSync(filePath, "utf8");
  return new Set(
    [...text.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]),
  );
}

function initialVideoFiles() {
  const sourceFiles = fs.existsSync(sourceDir)
    ? fs
        .readdirSync(sourceDir)
        .filter((name) => videoExtRe.test(name))
        .map((name) => path.join(sourceDir, name))
    : [];
  const backupFiles = fs.existsSync(backupDir)
    ? fs
        .readdirSync(backupDir)
        .filter((name) => videoExtRe.test(name))
        .map((name) => path.join(backupDir, name))
    : [];
  const filesByName = new Map();
  for (const filePath of [...backupFiles, ...sourceFiles]) {
    filesByName.set(path.basename(filePath), filePath);
  }
  return [...filesByName.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([filename, initialPath], index) => ({
      index: index + 1,
      filename,
      initialPath,
    }));
}

function validateClassificationMap(videoCount) {
  const slugs = collectionSlugs();
  const missing = [];
  for (let index = 1; index <= videoCount; index += 1) {
    if ((index === 21 || index === 22) && !classifications[index]) continue;
    if (!classifications[index]) missing.push(index);
  }
  if (missing.length)
    throw new Error(`Missing classification indexes: ${missing.join(", ")}`);

  const ids = new Set();
  for (const [index, item] of Object.entries(classifications)) {
    if (!categoryDirs[item.category])
      throw new Error(`Invalid category at ${index}: ${item.category}`);
    if (ids.has(item.id)) throw new Error(`Duplicate id: ${item.id}`);
    ids.add(item.id);
    for (const slug of item.relatedCollectionSlugs) {
      if (!slugs.has(slug))
        throw new Error(`Unknown related collection slug: ${slug}`);
    }
  }
}

function sourceRecord(item) {
  const backupPath = path.join(backupDir, item.filename);
  let activePath = item.initialPath;
  let moved = null;

  if (activePath.startsWith(sourceDir)) {
    if (fs.existsSync(backupPath)) {
      if (hashFile(activePath) !== hashFile(backupPath)) {
        throw new Error(`Backup conflict for ${item.filename}`);
      }
      activePath = backupPath;
    } else {
      fs.renameSync(activePath, backupPath);
      moved = { from: item.initialPath, to: backupPath };
      activePath = backupPath;
    }
  }

  const probed = ffprobeJson(activePath);
  const videoStream =
    probed.streams.find((stream) => stream.codec_type === "video") || {};
  const audioStream =
    probed.streams.find((stream) => stream.codec_type === "audio") || {};
  const stats = fs.statSync(activePath);

  return {
    index: item.index,
    filename: item.filename,
    preservedOriginalPath: backupPath,
    previousPublicPath: path.join(sourceDir, item.filename),
    size: stats.size,
    sha256: hashFile(activePath),
    durationSeconds: round(videoStream.duration || probed.format.duration || 0),
    width: Number(videoStream.width || 0),
    height: Number(videoStream.height || 0),
    codec: videoStream.codec_name || "",
    codecProfile: videoStream.profile || "",
    pixelFormat: videoStream.pix_fmt || "",
    frameRate: round(
      rateToNumber(videoStream.avg_frame_rate || videoStream.r_frame_rate),
      3,
    ),
    audioCodec: audioStream.codec_name || "none",
    formatName: probed.format.format_name || "",
    moved,
  };
}

function writeTsManifest(records) {
  const q = JSON.stringify;
  const arr = (items) => `[${items.map((item) => q(item)).join(", ")}]`;
  const lines = [
    "export type ElegantStarVideoCategory =",
    '  | "brand"',
    '  | "collections"',
    '  | "details-and-finishes"',
    '  | "packaging-and-presentation"',
    '  | "accessories"',
    '  | "process-and-making"',
    '  | "stories";',
    "",
    "export type ElegantStarVideoPage =",
    '  | "home"',
    '  | "collections"',
    '  | "collection-detail"',
    '  | "gallery"',
    '  | "our-craft"',
    '  | "about"',
    '  | "stories";',
    "",
    "export type ElegantStarVideo = {",
    "  id: string;",
    "  title: string;",
    "  description: string;",
    "  category: ElegantStarVideoCategory;",
    "  src: string;",
    "  poster: string;",
    '  orientation: "portrait" | "landscape" | "square";',
    "  durationSeconds: number;",
    "  width: number;",
    "  height: number;",
    "  codec: string;",
    "  fileSizeBytes: number;",
    "  tags: string[];",
    "  placements: ElegantStarVideoPage[];",
    "  relatedCollectionSlugs: string[];",
    "  featured: boolean;",
    "  autoplayPreview: boolean;",
    "  compatibilityStatus:",
    '    | "production-ready"',
    '    | "convert-to-h264"',
    '    | "review";',
    "};",
    "",
    "export const elegantStarVideos: readonly ElegantStarVideo[] = [",
  ];

  for (const record of records) {
    lines.push(
      "  {",
      `    id: ${q(record.id)},`,
      `    title: ${q(record.title)},`,
      `    description: ${q(record.description)},`,
      `    category: ${q(record.category)},`,
      `    src: ${q(record.src)},`,
      `    poster: ${q(record.poster)},`,
      `    orientation: ${q(record.orientation)},`,
      `    durationSeconds: ${record.durationSeconds},`,
      `    width: ${record.width},`,
      `    height: ${record.height},`,
      `    codec: ${q(record.codec)},`,
      `    fileSizeBytes: ${record.fileSizeBytes},`,
      `    tags: ${arr(record.tags)},`,
      `    placements: ${arr(record.placements)},`,
      `    relatedCollectionSlugs: ${arr(record.relatedCollectionSlugs)},`,
      `    featured: ${record.featured},`,
      `    autoplayPreview: ${record.autoplayPreview},`,
      `    compatibilityStatus: ${q(record.compatibilityStatus)},`,
      "  },",
    );
  }

  lines.push(
    "];",
    "",
    "export function getVideoById(id: string): ElegantStarVideo | undefined {",
    "  return elegantStarVideos.find((video) => video.id === id);",
    "}",
    "",
    "export function getVideosByCategory(",
    "  category: ElegantStarVideoCategory,",
    "): readonly ElegantStarVideo[] {",
    "  return elegantStarVideos.filter((video) => video.category === category);",
    "}",
    "",
    "export function getVideosForPage(",
    "  page: ElegantStarVideoPage,",
    "): readonly ElegantStarVideo[] {",
    "  return elegantStarVideos.filter((video) => video.placements.includes(page));",
    "}",
    "",
    "export function getVideosForCollection(slug: string): readonly ElegantStarVideo[] {",
    "  return elegantStarVideos.filter((video) =>",
    "    video.relatedCollectionSlugs.includes(slug),",
    "  );",
    "}",
    "",
    "export function getFeaturedVideos(): readonly ElegantStarVideo[] {",
    "  return elegantStarVideos.filter((video) => video.featured);",
    "}",
    "",
  );

  fs.writeFileSync(tsManifestPath, lines.join("\n"));
}

function writeReadme({
  sourceCount,
  uniqueCount,
  exactDuplicateCount,
  conversionRows,
  categoryCounts,
}) {
  const lines = [
    "# Elegant Star Motion Media Inventory",
    "",
    "This inventory was generated from the original motion files and keeps public naming anonymous and editorial. Originals are preserved under `media-source/videos-original/`; website-ready copies live under `public/media/motion/`.",
    "",
    "## Summary",
    "",
    `- Original video files inspected: ${sourceCount}`,
    `- Unique website-ready videos: ${uniqueCount}`,
    `- Exact duplicate files: ${exactDuplicateCount}`,
    `- Videos needing H.264 conversion: ${conversionRows.length}`,
    "",
    "## Category Counts",
    "",
  ];

  for (const category of Object.keys(categoryDirs)) {
    lines.push(`- ${category}: ${categoryCounts[category] || 0}`);
  }

  lines.push(
    "",
    "## Duplicate Handling",
    "",
    "Exact duplicates were identified by SHA-256 hash. Only one website-ready copy was created for each exact duplicate group. All original files, including duplicate copies, remain preserved in `media-source/videos-original/`.",
    "",
    "## Visually Similar Review Notes",
    "",
    "- `neutral-gold-ornate-folder-detail-01.mp4` and `neutral-gold-ornate-folder-detail-02.mp4` show very similar neutral gold folder material, but they have different hashes, durations/codecs, and frame sequences. Both were kept for review.",
    "- Several ornate relief detail clips show related sculpted-folder finishes in different colors or setups. They were grouped with `ornate-relief-folder-details` in the inventory and kept as non-identical assets.",
    "- Accessory assortment clips overlap in subject matter but show different product sequences; both unique versions were kept.",
    "- Boxed presentation clips share packaging themes but differ by product, color, or composition; all non-identical versions were kept.",
    "",
    "## Files",
    "",
    "- `videos.csv`: full original-to-website-ready inventory",
    "- `videos.json`: JSON version of the full inventory",
    "- `duplicates.csv`: exact duplicate group report",
    "- `conversion-needed.csv`: unique videos marked `convert-to-h264` or `review`",
    "",
    "## Conversion Guidance",
    "",
    "Videos marked `convert-to-h264` use VP9 or AV1 and should be converted before production use. Preferred output: MP4 container, H.264 video, yuv420p pixel format, and AAC audio or muted preview audio. No conversions were performed in this pass.",
    "",
  );

  fs.writeFileSync(path.join(inventoryDir, "README.md"), lines.join("\n"));
}

ensureDir(backupDir);
ensureDir(motionDir);
ensureDir(inventoryDir);
for (const dir of Object.values(categoryDirs))
  ensureDir(path.join(motionDir, dir));

const initialFiles = initialVideoFiles();
if (initialFiles.length === 0) throw new Error("No source videos found.");
validateClassificationMap(initialFiles.length);

const sourceRecords = initialFiles.map(sourceRecord);
const movedFiles = sourceRecords.map((record) => record.moved).filter(Boolean);

const hashGroups = new Map();
for (const record of sourceRecords) {
  if (!hashGroups.has(record.sha256)) hashGroups.set(record.sha256, []);
  hashGroups.get(record.sha256).push(record);
}

const canonicalBySha = new Map();
for (const [sha, group] of hashGroups.entries())
  canonicalBySha.set(sha, canonicalForGroup(group));
const uniqueCanonicals = [...canonicalBySha.values()].sort(
  (a, b) => a.index - b.index,
);
const outputFilenameSet = new Set();
const manifestRecords = [];
const copiedFiles = [];
const posterFiles = [];

for (const canonical of uniqueCanonicals) {
  const config = classifications[canonical.index];
  if (!config)
    throw new Error(`Missing canonical classification for ${canonical.index}`);

  const extension = path.extname(canonical.filename).toLowerCase();
  const newFilename = `${config.id}${extension}`;
  const outputDir = path.join(motionDir, categoryDirs[config.category]);
  const outputPath = path.join(outputDir, newFilename);
  const posterPath = path.join(outputDir, `${config.id}-poster.jpg`);

  if (outputFilenameSet.has(newFilename))
    throw new Error(`Duplicate output filename: ${newFilename}`);
  outputFilenameSet.add(newFilename);
  if (fs.existsSync(outputPath))
    throw new Error(`Output already exists: ${outputPath}`);
  if (fs.existsSync(posterPath))
    throw new Error(`Poster already exists: ${posterPath}`);

  fs.copyFileSync(canonical.preservedOriginalPath, outputPath);
  copiedFiles.push({ from: canonical.preservedOriginalPath, to: outputPath });

  const posterTime = Math.max(
    0.1,
    Math.min(
      Math.max(canonical.durationSeconds - 0.1, 0.1),
      canonical.durationSeconds * config.posterFraction,
    ),
  );
  const posterResult = spawnSync(
    ffmpeg,
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-ss",
      String(posterTime),
      "-i",
      outputPath,
      "-frames:v",
      "1",
      "-q:v",
      "2",
      "-y",
      posterPath,
    ],
    { encoding: "utf8" },
  );
  if (posterResult.status !== 0) {
    throw new Error(
      `Poster generation failed for ${newFilename}: ${posterResult.stderr || posterResult.stdout}`,
    );
  }
  posterFiles.push(posterPath);

  manifestRecords.push({
    id: config.id,
    title: config.title,
    description: config.description,
    category: config.category,
    src: publicPath(outputPath),
    poster: publicPath(posterPath),
    orientation: orientationFor(canonical.width, canonical.height),
    durationSeconds: canonical.durationSeconds,
    width: canonical.width,
    height: canonical.height,
    codec: canonical.codec,
    fileSizeBytes: fs.statSync(outputPath).size,
    tags: config.tags,
    placements: config.placements,
    relatedCollectionSlugs: config.relatedCollectionSlugs,
    featured: config.featured,
    autoplayPreview: config.autoplayPreview,
    compatibilityStatus: compatibilityFor(canonical.codec),
    originalIndex: canonical.index,
    originalFilename: canonical.filename,
    originalSha256: canonical.sha256,
    frameRate: canonical.frameRate,
    codecProfile: canonical.codecProfile,
    pixelFormat: canonical.pixelFormat,
    audioCodec: canonical.audioCodec,
    newFilename,
    newProjectPath: projectPath(outputPath),
    posterProjectPath: projectPath(posterPath),
    visualReviewGroup: config.visualReviewGroup,
  });
}

const manifestBySha = new Map(
  manifestRecords.map((record) => [record.originalSha256, record]),
);
const inventoryRows = sourceRecords.map((record) => {
  const canonical = canonicalBySha.get(record.sha256);
  const manifest = manifestBySha.get(record.sha256);
  const config = classifications[canonical.index];
  const group = hashGroups.get(record.sha256);
  const duplicateStatus =
    group.length === 1
      ? "unique"
      : record.index === canonical.index
        ? "exact-duplicate-kept"
        : "exact-duplicate";

  return {
    original_filename: record.filename,
    new_filename: manifest.newFilename,
    previous_public_path: projectPath(record.previousPublicPath),
    original_path: projectPath(record.preservedOriginalPath),
    new_path: manifest.newProjectPath,
    category: config.category,
    duration_seconds: record.durationSeconds,
    resolution: `${record.width}x${record.height}`,
    width: record.width,
    height: record.height,
    orientation: orientationFor(record.width, record.height),
    codec: record.codec,
    codec_profile: record.codecProfile,
    pixel_format: record.pixelFormat,
    audio_codec: record.audioCodec,
    frame_rate: record.frameRate,
    size_bytes: record.size,
    sha256: record.sha256,
    duplicate_status: duplicateStatus,
    kept_original_filename: canonical.filename,
    poster_path: manifest.posterProjectPath,
    proposed_page_placements: config.placements.join("|"),
    related_collections: config.relatedCollectionSlugs.join("|"),
    conversion_status: compatibilityFor(record.codec),
    visual_review_group: config.visualReviewGroup,
  };
});

const duplicateRows = [];
for (const [sha, group] of hashGroups.entries()) {
  if (group.length < 2) continue;
  const canonical = canonicalBySha.get(sha);
  const manifest = manifestBySha.get(sha);
  for (const record of group) {
    duplicateRows.push({
      sha256: sha,
      duplicate_status:
        record.index === canonical.index ? "kept" : "exact-duplicate",
      original_filename: record.filename,
      original_path: projectPath(record.preservedOriginalPath),
      kept_original_filename: canonical.filename,
      website_ready_path: manifest.newProjectPath,
      size_bytes: record.size,
    });
  }
}

const conversionRows = manifestRecords
  .filter((record) => record.compatibilityStatus !== "production-ready")
  .map((record) => ({
    id: record.id,
    filename: record.newFilename,
    path: record.newProjectPath,
    codec: record.codec,
    codec_profile: record.codecProfile,
    pixel_format: record.pixelFormat,
    audio_codec: record.audioCodec,
    duration_seconds: record.durationSeconds,
    resolution: `${record.width}x${record.height}`,
    compatibility_status: record.compatibilityStatus,
    suggested_format: "mp4/h264/yuv420p/aac-or-muted",
  }));

writeTsManifest(manifestRecords);
fs.writeFileSync(
  path.join(inventoryDir, "videos.json"),
  `${JSON.stringify(
    inventoryRows.map((row) => ({
      originalFilename: row.original_filename,
      newFilename: row.new_filename,
      previousPublicPath: row.previous_public_path,
      originalPath: row.original_path,
      newPath: row.new_path,
      category: row.category,
      durationSeconds: row.duration_seconds,
      resolution: row.resolution,
      width: row.width,
      height: row.height,
      orientation: row.orientation,
      codec: row.codec,
      codecProfile: row.codec_profile,
      pixelFormat: row.pixel_format,
      audioCodec: row.audio_codec,
      frameRate: row.frame_rate,
      sizeBytes: row.size_bytes,
      sha256: row.sha256,
      duplicateStatus: row.duplicate_status,
      keptOriginalFilename: row.kept_original_filename,
      posterPath: row.poster_path,
      proposedPagePlacements: row.proposed_page_placements
        ? row.proposed_page_placements.split("|")
        : [],
      relatedCollections: row.related_collections
        ? row.related_collections.split("|")
        : [],
      conversionStatus: row.conversion_status,
      visualReviewGroup: row.visual_review_group,
    })),
    null,
    2,
  )}\n`,
);
writeCsv(path.join(inventoryDir, "videos.csv"), inventoryRows, [
  "original_filename",
  "new_filename",
  "previous_public_path",
  "original_path",
  "new_path",
  "category",
  "duration_seconds",
  "resolution",
  "width",
  "height",
  "orientation",
  "codec",
  "codec_profile",
  "pixel_format",
  "audio_codec",
  "frame_rate",
  "size_bytes",
  "sha256",
  "duplicate_status",
  "kept_original_filename",
  "poster_path",
  "proposed_page_placements",
  "related_collections",
  "conversion_status",
  "visual_review_group",
]);
writeCsv(path.join(inventoryDir, "duplicates.csv"), duplicateRows, [
  "sha256",
  "duplicate_status",
  "original_filename",
  "original_path",
  "kept_original_filename",
  "website_ready_path",
  "size_bytes",
]);
writeCsv(path.join(inventoryDir, "conversion-needed.csv"), conversionRows, [
  "id",
  "filename",
  "path",
  "codec",
  "codec_profile",
  "pixel_format",
  "audio_codec",
  "duration_seconds",
  "resolution",
  "compatibility_status",
  "suggested_format",
]);

const categoryCounts = manifestRecords.reduce((counts, record) => {
  counts[record.category] = (counts[record.category] || 0) + 1;
  return counts;
}, {});
writeReadme({
  sourceCount: sourceRecords.length,
  uniqueCount: manifestRecords.length,
  exactDuplicateCount: sourceRecords.length - manifestRecords.length,
  conversionRows,
  categoryCounts,
});

console.log(
  JSON.stringify(
    {
      originalVideos: sourceRecords.length,
      uniqueVideos: manifestRecords.length,
      exactDuplicates: sourceRecords.length - manifestRecords.length,
      movedOriginals: movedFiles.length,
      websiteReadyCopies: copiedFiles.length,
      posters: posterFiles.length,
      conversionNeeded: conversionRows.length,
      categoryCounts,
    },
    null,
    2,
  ),
);
