import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import chromeWebstoreUpload from "chrome-webstore-upload";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// Load .env manually (no dotenv dependency)
const envPath = join(ROOT, ".env");
try {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^(\w+)=(.*)$/);
    if (m) process.env[m[1]] ??= m[2];
  }
} catch {
  // .env is optional if env vars are set externally
}

const { CHROME_EXTENSION_ID, CHROME_CLIENT_ID, CHROME_CLIENT_SECRET, CHROME_REFRESH_TOKEN } =
  process.env;

if (!CHROME_EXTENSION_ID || !CHROME_CLIENT_ID || !CHROME_CLIENT_SECRET || !CHROME_REFRESH_TOKEN) {
  console.error("Missing Chrome Web Store credentials. See .env.example");
  process.exit(1);
}

// Read version from userscript to find the zip
const userscript = readFileSync(join(ROOT, "batch-open-links.user.js"), "utf8");
const version = userscript.match(/@version\s+(\S+)/)?.[1];
const zipPath = join(ROOT, "builds", `batch-open-links-${version}.zip`);
const zipBuf = readFileSync(zipPath);

const store = chromeWebstoreUpload({
  extensionId: CHROME_EXTENSION_ID,
  clientId: CHROME_CLIENT_ID,
  clientSecret: CHROME_CLIENT_SECRET,
  refreshToken: CHROME_REFRESH_TOKEN,
});

console.log(`Uploading ${zipPath}...`);
const uploadRes = await store.uploadExisting(zipBuf);
if (uploadRes.uploadState === "FAILURE") {
  console.error("Upload failed:", uploadRes.itemError);
  process.exit(1);
}
console.log("Upload OK. Publishing...");

const publishRes = await store.publish();
console.log("Publish result:", publishRes);
