import { readFileSync, mkdirSync, writeFileSync, rmSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import archiver from "archiver";
import { createWriteStream } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const EXT_DIR = join(ROOT, "extension");
const BUILDS_DIR = join(ROOT, "builds");

// --- Read userscript ---
const userscript = readFileSync(join(ROOT, "batch-open-links.user.js"), "utf8");

// --- Parse metadata block ---
const metaMatch = userscript.match(/\/\/ ==UserScript==([\s\S]*?)\/\/ ==\/UserScript==/);
if (!metaMatch) throw new Error("No ==UserScript== block found");
const metaBlock = metaMatch[1];

function parseMeta(block) {
  const entries = [];
  for (const line of block.split("\n")) {
    const m = line.match(/^\/\/\s+@(\S+)\s+(.*?)\s*$/);
    if (m) entries.push([m[1], m[2]]);
  }
  return entries;
}

const meta = parseMeta(metaBlock);
const getMeta = (key) => meta.find(([k]) => k === key)?.[1];
const getMetaAll = (key) => meta.filter(([k]) => k === key).map(([, v]) => v);

const version = getMeta("version");
const matches = getMetaAll("match");

// --- Extract localized names and descriptions ---
// Locale mapping: userscript uses BCP47 (zh-CN), Chrome uses underscore (zh_CN)
function toChromeLoc(loc) {
  return loc.replace("-", "_");
}

const names = {};
const descriptions = {};
for (const [key, val] of meta) {
  if (key === "name") names["en"] = val;
  else if (key.startsWith("name:")) names[toChromeLoc(key.slice(5))] = val;
  else if (key === "description") descriptions["en"] = val;
  else if (key.startsWith("description:")) descriptions[toChromeLoc(key.slice(12))] = val;
}

// --- Clean and create extension dir ---
rmSync(EXT_DIR, { recursive: true, force: true });
mkdirSync(EXT_DIR, { recursive: true });

// --- Generate content-script.js (strip metadata header) ---
const contentScript = userscript.replace(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==\n*/, "");
writeFileSync(join(EXT_DIR, "content-script.js"), contentScript);

// --- Generate _locales ---
const allLocales = new Set([...Object.keys(names), ...Object.keys(descriptions)]);
for (const locale of allLocales) {
  const dir = join(EXT_DIR, "_locales", locale);
  mkdirSync(dir, { recursive: true });
  const messages = {};
  if (names[locale]) {
    messages.extName = { message: names[locale] };
  }
  if (descriptions[locale]) {
    messages.extDescription = { message: descriptions[locale] };
  }
  writeFileSync(join(dir, "messages.json"), JSON.stringify(messages, null, 2) + "\n");
}

// --- Generate manifest.json ---
const manifest = {
  manifest_version: 3,
  name: "__MSG_extName__",
  description: "__MSG_extDescription__",
  version,
  default_locale: "en",
  icons: {
    16: "icons/icon-16.png",
    48: "icons/icon-48.png",
    128: "icons/icon-128.png",
  },
  content_scripts: [
    {
      matches,
      js: ["content-script.js"],
      run_at: "document_idle",
    },
  ],
  commands: {
    "batch-open-links": {
      suggested_key: {
        default: "Alt+Shift+Q",
      },
      description: "Batch open links on this page",
    },
  },
};
writeFileSync(join(EXT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

// --- Generate icons from SVG ---
const svgPath = join(ROOT, "icons", "icon.svg");
const svgBuf = readFileSync(svgPath);
const iconsDir = join(EXT_DIR, "icons");
mkdirSync(iconsDir, { recursive: true });

await Promise.all(
  [16, 48, 128].map((size) =>
    sharp(svgBuf).resize(size, size).png().toFile(join(iconsDir, `icon-${size}.png`))
  )
);

// --- Zip into builds/ ---
mkdirSync(BUILDS_DIR, { recursive: true });
const zipPath = join(BUILDS_DIR, `batch-open-links-${version}.zip`);
await new Promise((resolve, reject) => {
  const output = createWriteStream(zipPath);
  const archive = archiver("zip", { zlib: { level: 9 } });
  output.on("close", resolve);
  archive.on("error", reject);
  archive.pipe(output);
  archive.directory(EXT_DIR, false);
  archive.finalize();
});

console.log(`Built extension v${version}`);
console.log(`  extension/ dir: ${EXT_DIR}`);
console.log(`  zip: ${zipPath}`);
