import { writeFileSync } from "node:fs";

const urls = [
  "/",
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
  "/datenschutz/",
  "/impressum/",
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>\n    <loc>https://nautilus-facility.de${url}</loc>\n  </url>`).join("\n")}
</urlset>
`;

writeFileSync("dist/sitemap.xml", xml, "utf8");
console.log("SEO sitemap generated: dist/sitemap.xml");
