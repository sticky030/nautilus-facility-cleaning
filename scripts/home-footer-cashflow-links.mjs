import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const asset = readdirSync(join(dist, "assets")).find((name) => name.startsWith("index-") && name.endsWith(".js"));
if (!asset) throw new Error("Index JS asset not found");

const file = join(dist, "assets", asset);
let js = readFileSync(file, "utf8");

const replacements = [
  {
    from: `"Baufein- / Bauendreinigung"`,
    to: `"Baufein- / Bauendreinigung"}),s.jsx("a",{href:"/bauendreinigung-berlin/",className:"hover:text-[#B79B6C] transition-colors",children:"Bauendreinigung Berlin"}),s.jsx("a",{href:"/reinigung-nach-auszug-berlin/",className:"hover:text-[#B79B6C] transition-colors",children:"Reinigung nach Auszug"}),s.jsx("a",{href:"/uebergabereinigung-berlin/",className:"hover:text-[#B79B6C] transition-colors",children:"Übergabereinigung"}),s.jsx("a",{href:"/reinigung-nach-renovierung-berlin/",className:"hover:text-[#B79B6C] transition-colors",children:"Reinigung nach Renovierung"}),s.jsx("a",{href:"/bauendreinigung-berlin/",className:"hover:text-[#B79B6C] transition-colors",children:"Baufein- / Bauendreinigung"`,
  },
];

for (const item of replacements) {
  if (js.includes("Reinigung nach Auszug") && js.includes("/uebergabereinigung-berlin/")) {
    console.log("Home footer cashflow links already present.");
    process.exit(0);
  }
  if (!js.includes(item.from)) throw new Error(`Footer marker not found: ${item.from}`);
  js = js.replace(item.from, item.to);
}

writeFileSync(file, js, "utf8");
console.log("Home footer cashflow links added to JS bundle.");
