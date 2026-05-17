import { readFileSync, writeFileSync, existsSync } from "node:fs";

const slugs = [
  "reinigungsfirma-lichtenberg-berlin",
  "reinigungsfirma-marzahn-hellersdorf-berlin",
  "reinigungsfirma-pankow-berlin",
  "reinigungsfirma-prenzlauer-berg-berlin",
  "reinigungsfirma-weissensee-berlin",
  "reinigungsfirma-friedrichshain-kreuzberg-berlin",
  "reinigungsfirma-berlin-mitte",
];

const css = `
      .district-grid-2,
      .district-grid-3,
      .district-grid-auto {
        align-items: stretch;
      }
      .district-grid-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      }
      .district-grid-3 {
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      }
      .district-grid-auto {
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      }
      .district-grid-2 .card,
      .district-grid-3 .card,
      .district-grid-auto .card {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .district-grid-2 .card p:last-child,
      .district-grid-3 .card p:last-child,
      .district-grid-auto .card p:last-child {
        margin-top: auto;
      }
      @media (max-width: 980px) {
        .district-grid-3,
        .district-grid-auto {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }
      }
      @media (max-width: 760px) {
        .district-grid-2,
        .district-grid-3,
        .district-grid-auto {
          grid-template-columns: 1fr !important;
        }
      }
`;

const replacements = [
  [
    "Für Auszug, Übergabe, Einzug, Neuvermietung, Leerstand, Renovierung und Grundreinigung.",
    "Für Auszug, Übergabe, Einzug, Neuvermietung, Leerstand, Renovierung und Grundreinigung – besonders dann, wenn ein Objekt kurzfristig sauber vorbereitet, wieder nutzbar gemacht oder professionell übergeben werden soll.",
  ],
  [
    "Für regelmäßige Reinigung sensibler, repräsentativer und gewerblicher Räume nach abgestimmtem Leistungsbild.",
    "Für regelmäßige Reinigung sensibler, repräsentativer und gewerblicher Räume nach abgestimmtem Leistungsbild – inklusive Empfangsbereichen, Arbeitsflächen, Sanitärbereichen, Teeküchen, Kontaktflächen und passenden Zeitfenstern.",
  ],
  [
    "Für Treppenhäuser, Allgemeinflächen, Sonderreinigung, Objektbedarf und einzelne Liegenschaften.",
    "Für Treppenhäuser, Allgemeinflächen, Sonderreinigung, Objektbedarf und einzelne Liegenschaften – mit klarer Leistungsabgrenzung, abgestimmtem Turnus, Zugangslösung und nachvollziehbarer Kommunikation.",
  ],
  [
    "Für Reinigungsbedarf nach Umzug, Entrümpelung, Malerarbeiten, Bodenarbeiten, Trockenbau oder Renovierung.",
    "Für Reinigungsbedarf nach Umzug, Entrümpelung, Malerarbeiten, Bodenarbeiten, Trockenbau oder Renovierung – wenn nach der eigentlichen Arbeit noch eine saubere Übergabe oder Nutzbarkeit hergestellt werden muss.",
  ],
  [
    "Am schnellsten mit Bezirk, Fläche, Termin, Objektart und Fotos vom aktuellen Zustand.",
    "Am schnellsten mit Bezirk, Fläche, gewünschtem Termin, Objektart und Fotos vom aktuellen Zustand. Bei Treppenhäusern oder Gewerbeobjekten helfen zusätzlich Angaben zu Turnus, Zugang und gewünschtem Leistungsumfang.",
  ],
  [
    "Wir prüfen Zustand, Leistungsumfang, Zugänglichkeit, Turnus, Zeitfenster und gewünschtes Ergebnis.",
    "Wir prüfen Zustand, Leistungsumfang, Zugänglichkeit, Turnus, Zeitfenster und gewünschtes Ergebnis. So wird früh klar, ob eine direkte Einschätzung möglich ist oder ob vor Ort Details geklärt werden müssen.",
  ],
  [
    "Je nach Objekt erhalten Sie ein objektbezogenes Angebot oder wir empfehlen eine kurze Besichtigung.",
    "Je nach Objekt erhalten Sie ein objektbezogenes Angebot oder wir empfehlen eine kurze Besichtigung. Das gilt besonders bei größeren Flächen, unklarem Zustand, starkem Reinigungsbedarf oder wiederkehrenden Objekten.",
  ],
  [
    "Nach Freigabe erfolgt die Umsetzung nach klar vereinbartem Leistungsbild, Termin und Umfang.",
    "Nach Freigabe erfolgt die Umsetzung nach klar vereinbartem Leistungsbild, Termin und Umfang. Damit ist vor Beginn nachvollziehbar, welche Bereiche enthalten sind und welche Zusatzleistungen separat abgestimmt wurden.",
  ],
  [
    "Mehr Details zur Leistung und zur objektbezogenen Einschätzung in Berlin.",
    "Mehr Details zur jeweiligen Leistung, zu typischen Einsatzfällen, sinnvoller Abgrenzung und zur objektbezogenen Einschätzung in Berlin.",
  ],
];

function injectCss(html) {
  if (html.includes(".district-grid-2")) return html;
  return html.replace("</style>", `${css}\n    </style>`);
}

function enrichText(html) {
  let next = html;
  for (const [from, to] of replacements) {
    next = next.split(from).join(to);
  }
  return next;
}

function classifyGrids(html) {
  let next = html
    .replace(/ district-two-col/g, "")
    .replace(/ district-grid-2/g, "")
    .replace(/ district-grid-3/g, "")
    .replace(/ district-grid-auto/g, "");

  return next.replace(/<div class="grid">([\s\S]*?)<\/div>/g, (match, inner) => {
    const cardCount = (inner.match(/<article class="card"/g) || []).length;
    if (cardCount === 4) return `<div class="grid district-grid-2">${inner}</div>`;
    if (cardCount === 3) return `<div class="grid district-grid-3">${inner}</div>`;
    if (cardCount > 4) return `<div class="grid district-grid-auto">${inner}</div>`;
    return match;
  });
}

for (const slug of slugs) {
  const file = `dist/${slug}/index.html`;
  if (!existsSync(file)) continue;
  let html = readFileSync(file, "utf8");

  html = injectCss(html);
  html = enrichText(html);
  html = classifyGrids(html);

  writeFileSync(file, html, "utf8");
}

console.log("District cards polished: 4-card sections use 2 columns, 3-card sections use 3 columns, card copy enriched.");
