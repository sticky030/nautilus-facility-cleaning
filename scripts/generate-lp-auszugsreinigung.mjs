import { mkdirSync, readFileSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

const src  = resolve(rootDir, "lp-auszugsreinigung.html");
const dest = resolve(rootDir, "dist/lp-auszugsreinigung");

mkdirSync(dest, { recursive: true });
writeFileSync(resolve(dest, "index.html"), readFileSync(src, "utf-8"));

const logo = resolve(rootDir, "nautilus-logo.png");
if (existsSync(logo)) {
  copyFileSync(logo, resolve(dest, "nautilus-logo.png"));
}

console.log("✓ LP Auszugsreinigung → dist/lp-auszugsreinigung/index.html");
