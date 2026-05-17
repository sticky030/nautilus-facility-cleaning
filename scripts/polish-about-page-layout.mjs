import { readFileSync, writeFileSync, existsSync } from "node:fs";

const file = "dist/ueber-uns/index.html";
if (!existsSync(file)) {
  console.log("About page polish skipped: dist/ueber-uns/index.html not found.");
  process.exit(0);
}

let html = readFileSync(file, "utf8");

const css = `
      .about-grid-2,
      .about-grid-3,
      .about-grid-auto {
        align-items: stretch;
      }
      .about-grid-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      }
      .about-grid-3 {
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      }
      .about-grid-auto {
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      }
      .about-grid-2 .card,
      .about-grid-3 .card,
      .about-grid-auto .card {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .about-grid-2 .card p:last-child,
      .about-grid-3 .card p:last-child,
      .about-grid-auto .card p:last-child {
        margin-top: auto;
      }
      .about-process-grid .card {
        min-height: 230px !important;
      }
      .about-dense-grid .card {
        min-height: 270px !important;
      }
      @media (max-width: 980px) {
        .about-grid-3,
        .about-grid-auto {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }
      }
      @media (max-width: 760px) {
        .about-grid-2,
        .about-grid-3,
        .about-grid-auto {
          grid-template-columns: 1fr !important;
        }
        .about-process-grid .card,
        .about-dense-grid .card {
          min-height: 0 !important;
        }
      }
`;

if (!html.includes(".about-grid-2")) {
  html = html.replace("</style>", `${css}\n    </style>`);
}

const replacements = [
  [
    "Zum Beispiel vor Auszug, Einzug, Übergabe, Neuvermietung oder nach Renovierungsarbeiten.",
    "Zum Beispiel vor Auszug, Einzug, Übergabe, Neuvermietung oder nach Renovierungsarbeiten. Wichtig sind dabei Zustand, Termin, Zugänglichkeit und das gewünschte Übergabeniveau – genau diese Punkte klären wir vorab.",
  ],
  [
    "Zum Beispiel für Treppenhäuser, Allgemeinflächen, Übergaben, Grundreinigungen und einzelne Objektbedarfe.",
    "Zum Beispiel für Treppenhäuser, Allgemeinflächen, Übergaben, Grundreinigungen und einzelne Objektbedarfe. Der Leistungsumfang wird nach Objekt, Turnus, Bewohnerstruktur, Zugang und Priorität der Flächen abgestimmt.",
  ],
  [
    "Zum Beispiel für regelmäßige Reinigung außerhalb der Betriebszeiten, sensible Kontaktflächen und repräsentative Räume.",
    "Zum Beispiel für regelmäßige Reinigung außerhalb der Betriebszeiten, sensible Kontaktflächen, Sanitärbereiche, Empfangszonen, Teeküchen und repräsentative Räume mit klar abgestimmtem Zeitfenster.",
  ],
  [
    "Zum Beispiel als Anschlussreinigung nach Räumung, Renovierung, Malerarbeiten oder Bodenarbeiten.",
    "Zum Beispiel als Anschlussreinigung nach Räumung, Renovierung, Malerarbeiten, Bodenarbeiten oder Trockenbau. Ziel ist ein Objekt, das nicht nur fertig bearbeitet, sondern auch sauber übergabebereit ist.",
  ],
  [
    "Der Leistungsumfang wird vor Beginn nachvollziehbar eingeordnet. So ist klar, welche Bereiche enthalten sind und welche Leistungen separat abgestimmt werden müssen.",
    "Der Leistungsumfang wird vor Beginn nachvollziehbar eingeordnet. So ist klar, welche Bereiche enthalten sind, welche Zusatzleistungen separat abgestimmt werden müssen und welches Ergebnis realistisch erwartet werden kann.",
  ],
  [
    "Jedes Objekt ist anders. Deshalb kalkulieren wir nach Fläche, Zustand, Nutzung, Termin, Zugang und gewünschtem Ergebnis.",
    "Jedes Objekt ist anders. Deshalb kalkulieren wir nach Fläche, Zustand, Nutzung, Termin, Zugang und gewünschtem Ergebnis – nicht nach pauschalen Annahmen, die später zu Reibung führen.",
  ],
  [
    "Auftraggeber brauchen keine unnötige Reibung, sondern klare Rückmeldung, realistische Einschätzung und verbindliche Abstimmung.",
    "Auftraggeber brauchen keine unnötige Reibung, sondern klare Rückmeldung, realistische Einschätzung und verbindliche Abstimmung. Besonders bei kurzfristigen Übergaben zählt eine saubere Kommunikation vor dem Einsatz.",
  ],
  [
    "Gerade in Praxen, Kanzleien, Büros und verwalteten Objekten ist eine ruhige, diskrete und strukturierte Arbeitsweise entscheidend.",
    "Gerade in Praxen, Kanzleien, Büros und verwalteten Objekten ist eine ruhige, diskrete und strukturierte Arbeitsweise entscheidend. Reinigung muss zum Betrieb, zum Objektalltag und zu den vereinbarten Zeitfenstern passen.",
  ],
  [
    "Sie senden uns Bezirk, Fläche, Objektart, gewünschten Termin und nach Möglichkeit Fotos vom aktuellen Zustand.",
    "Sie senden uns Bezirk, Fläche, Objektart, gewünschten Termin und nach Möglichkeit Fotos vom aktuellen Zustand. Bei wiederkehrenden Objekten helfen zusätzlich Turnus, Zugang und Zeitfenster.",
  ],
  [
    "Wir prüfen Zustand, Leistungsumfang, Zugänglichkeit, Zeitfenster und gewünschtes Ergebnis.",
    "Wir prüfen Zustand, Leistungsumfang, Zugänglichkeit, Zeitfenster und gewünschtes Ergebnis. So wird früh klar, ob eine direkte Einschätzung möglich ist oder Details vor Ort geklärt werden sollten.",
  ],
  [
    "Je nach Objekt erhalten Sie ein objektbezogenes Angebot oder wir empfehlen eine kurze Besichtigung.",
    "Je nach Objekt erhalten Sie ein objektbezogenes Angebot oder wir empfehlen eine kurze Besichtigung. Das gilt besonders bei größeren Flächen, unklarem Zustand oder laufenden Objektleistungen.",
  ],
  [
    "Nach Freigabe erfolgt die Reinigung nach klar vereinbartem Leistungsbild, Termin und Umfang.",
    "Nach Freigabe erfolgt die Reinigung nach klar vereinbartem Leistungsbild, Termin und Umfang. Damit ist vor Beginn nachvollziehbar, welche Bereiche enthalten sind und wie die Umsetzung geplant wird.",
  ],
];

for (const [from, to] of replacements) {
  html = html.split(from).join(to);
}

html = html
  .replace(/ about-grid-2/g, "")
  .replace(/ about-grid-3/g, "")
  .replace(/ about-grid-auto/g, "")
  .replace(/ about-process-grid/g, "")
  .replace(/ about-dense-grid/g, "")
  .replace(/<div class="grid" style="grid-template-columns:repeat\(3, minmax\(0, 1fr\)\);">/g, '<div class="grid">')
  .replace(/<div class="grid" style="grid-template-columns:repeat\(2, minmax\(0, 1fr\)\);">/g, '<div class="grid">');

html = html.replace(/<div class="grid">([\s\S]*?)<\/div>/g, (match, inner) => {
  const count = (inner.match(/<article class="card"/g) || []).length;
  const isProcess = inner.includes("1. Anfrage senden") && inner.includes("4. Reinigung abstimmen");
  const isFourCardContent = count === 4 && (inner.includes("Klare Abstimmung") || inner.includes("Mieter und Eigentümer"));
  if (count === 4 && isProcess) return `<div class="grid about-grid-2 about-process-grid">${inner}</div>`;
  if (count === 4 && isFourCardContent) return `<div class="grid about-grid-2 about-dense-grid">${inner}</div>`;
  if (count === 4) return `<div class="grid about-grid-2">${inner}</div>`;
  if (count === 3) return `<div class="grid about-grid-3 about-dense-grid">${inner}</div>`;
  if (count > 4) return `<div class="grid about-grid-auto">${inner}</div>`;
  return match;
});

writeFileSync(file, html, "utf8");
console.log("About page polished: four-card sections use 2x2 layout, three-card sections stay aligned, copy density improved.");
