import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const baseUrl = "https://nautilus-facility.de";
const distDir = "dist";

const servicePages = {
  "praxisreinigung-berlin": "Praxisreinigung Berlin",
  "bueroreinigung-berlin": "Büroreinigung Berlin",
  "treppenhausreinigung-berlin": "Treppenhausreinigung Berlin",
  "hausverwaltungen-berlin": "Reinigung für Hausverwaltungen Berlin",
  "grundreinigung-berlin": "Grundreinigung Berlin",
  "fensterreinigung-berlin": "Fensterreinigung Berlin",
  "kanzleireinigung-berlin": "Kanzleireinigung Berlin",
  "reinigung-nach-renovierung-berlin": "Reinigung nach Renovierung Berlin",
  "reinigung-nach-auszug-berlin": "Reinigung nach Auszug Berlin",
  "uebergabereinigung-berlin": "Übergabereinigung Berlin",
  "bauendreinigung-berlin": "Bauendreinigung Berlin",
};

const districtPages = {
  "reinigungsfirma-lichtenberg-berlin": "Reinigungsfirma Lichtenberg Berlin",
  "reinigungsfirma-marzahn-hellersdorf-berlin": "Reinigungsfirma Marzahn-Hellersdorf Berlin",
  "reinigungsfirma-pankow-berlin": "Reinigungsfirma Pankow Berlin",
  "reinigungsfirma-prenzlauer-berg-berlin": "Reinigungsfirma Prenzlauer Berg Berlin",
  "reinigungsfirma-weissensee-berlin": "Reinigungsfirma Weißensee Berlin",
  "reinigungsfirma-friedrichshain-kreuzberg-berlin": "Reinigungsfirma Friedrichshain-Kreuzberg Berlin",
  "reinigungsfirma-berlin-mitte": "Reinigungsfirma Berlin-Mitte",
};

const howToPages = new Set([
  "treppenhausreinigung-berlin",
  "hausverwaltungen-berlin",
  "reinigung-nach-renovierung-berlin",
  "reinigung-nach-auszug-berlin",
  "uebergabereinigung-berlin",
  "bauendreinigung-berlin",
  ...Object.keys(districtPages),
]);

function getPageSlugs() {
  return readdirSync(distDir).filter((entry) => {
    const file = join(distDir, entry, "index.html");
    return statSync(join(distDir, entry)).isDirectory() && existsSync(file);
  });
}

function breadcrumbSchema(slug, label) {
  const parentName = districtPages[slug] ? "Einsatzgebiete" : "Leistungen";
  const parentUrl = districtPages[slug] ? `${baseUrl}/#einsatzgebiet` : `${baseUrl}/#leistungen`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: `${baseUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: parentName,
        item: parentUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: label,
        item: `${baseUrl}/${slug}/`,
      },
    ],
  };
}

function howToName(slug, label) {
  if (slug === "treppenhausreinigung-berlin") return "Treppenhausreinigung in Berlin beauftragen";
  if (slug === "hausverwaltungen-berlin") return "Reinigung für Hausverwaltungen in Berlin anfragen";
  if (slug === "reinigung-nach-renovierung-berlin") return "Reinigung nach Renovierung in Berlin anfragen";
  if (slug === "reinigung-nach-auszug-berlin") return "Reinigung nach Auszug in Berlin anfragen";
  if (slug === "uebergabereinigung-berlin") return "Übergabereinigung in Berlin anfragen";
  if (slug === "bauendreinigung-berlin") return "Bauendreinigung in Berlin anfragen";
  if (districtPages[slug]) return `${label} anfragen`;
  return `${label} anfragen`;
}

function howToSchema(slug, label) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howToName(slug, label),
    description: "Ablauf für eine objektbezogene Reinigungsanfrage bei Nautilus Facility Cleaning in Berlin.",
    step: [
      {
        "@type": "HowToStep",
        name: "Anfrage senden",
        text: "Bezirk, Fläche, Objektart, gewünschten Termin und Fotos vom aktuellen Zustand senden.",
      },
      {
        "@type": "HowToStep",
        name: "Bedarf einordnen",
        text: "Zustand, Leistungsumfang, Zugänglichkeit, Turnus, Zeitfenster und gewünschtes Ergebnis werden geprüft.",
      },
      {
        "@type": "HowToStep",
        name: "Angebot oder Besichtigung klären",
        text: "Je nach Objekt wird ein objektbezogenes Angebot erstellt oder eine kurze Besichtigung empfohlen.",
      },
      {
        "@type": "HowToStep",
        name: "Reinigung abstimmen und umsetzen",
        text: "Nach Freigabe erfolgt die Reinigung nach klar vereinbartem Leistungsbild, Termin und Umfang.",
      },
    ],
  };
}

function schemaTag(schema, id) {
  return `<script type="application/ld+json" data-schema="${id}">${JSON.stringify(schema)}</script>`;
}

for (const slug of getPageSlugs()) {
  const file = join(distDir, slug, "index.html");
  let html = readFileSync(file, "utf8");
  const label = servicePages[slug] || districtPages[slug];
  if (!label) continue;

  html = html.replace(/\n\s*<script type="application\/ld\+json" data-schema="breadcrumb">[\s\S]*?<\/script>/g, "");
  html = html.replace(/\n\s*<script type="application\/ld\+json" data-schema="howto">[\s\S]*?<\/script>/g, "");

  const schemas = [schemaTag(breadcrumbSchema(slug, label), "breadcrumb")];
  if (howToPages.has(slug)) {
    schemas.push(schemaTag(howToSchema(slug, label), "howto"));
  }

  html = html.replace("</head>", `\n    ${schemas.join("\n    ")}\n  </head>`);
  writeFileSync(file, html, "utf8");
}

console.log("Structured SEO schema added: BreadcrumbList and HowTo where applicable.");
