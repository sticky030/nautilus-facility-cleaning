import { writeFileSync } from "node:fs";

const base = "https://nautilus-facility.de";

const urls = [
  "/",
  "/ueber-uns/",
  "/kontakt/",
  "/reinigung-kosten-berlin/",
  "/checkliste-wohnungsuebergabe-berlin/",
  "/treppenhausreinigung-kosten-berlin/",
  "/praxisreinigung-berlin/",
  "/bueroreinigung-berlin/",
  "/treppenhausreinigung-berlin/",
  "/hausverwaltungen-berlin/",
  "/grundreinigung-berlin/",
  "/fensterreinigung-berlin/",
  "/kanzleireinigung-berlin/",
  "/reinigung-nach-renovierung-berlin/",
  "/reinigung-nach-auszug-berlin/",
  "/uebergabereinigung-berlin/",
  "/bauendreinigung-berlin/",
  "/reinigungsfirma-lichtenberg-berlin/",
  "/reinigungsfirma-marzahn-hellersdorf-berlin/",
  "/reinigungsfirma-pankow-berlin/",
  "/reinigungsfirma-prenzlauer-berg-berlin/",
  "/reinigungsfirma-weissensee-berlin/",
  "/reinigungsfirma-friedrichshain-kreuzberg-berlin/",
  "/reinigungsfirma-berlin-mitte/",
  "/datenschutz/",
  "/impressum/"
];

const rows = urls.map((path) => `  <url>\n    <loc>${base}${path}</loc>\n  </url>`).join("\n");
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`;

writeFileSync("dist/sitemap.xml", xml, "utf8");
console.log("SEO sitemap generated: dist/sitemap.xml");
