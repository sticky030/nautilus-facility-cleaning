import { readFileSync, writeFileSync } from "node:fs";

const file = "src/App.tsx";
let source = readFileSync(file, "utf8");

if (source.includes('href="/reinigung-nach-auszug-berlin/"')) {
  console.log("Home footer source cashflow links already present.");
  process.exit(0);
}

const marker = `                <a href="/grundreinigung-berlin/" className="hover:text-[#B79B6C] transition-colors">Baufein- / Bauendreinigung</a>`;
const insert = `${marker}
                <a href="/reinigung-nach-auszug-berlin/" className="hover:text-[#B79B6C] transition-colors">Reinigung nach Auszug</a>
                <a href="/uebergabereinigung-berlin/" className="hover:text-[#B79B6C] transition-colors">Übergabereinigung</a>
                <a href="/reinigung-nach-renovierung-berlin/" className="hover:text-[#B79B6C] transition-colors">Reinigung nach Renovierung</a>
                <a href="/bauendreinigung-berlin/" className="hover:text-[#B79B6C] transition-colors">Bauendreinigung Berlin</a>`;

if (!source.includes(marker)) {
  throw new Error("Footer source marker not found in src/App.tsx");
}

source = source.replace(marker, insert);
writeFileSync(file, source, "utf8");
console.log("Home footer source cashflow links patched in src/App.tsx.");
