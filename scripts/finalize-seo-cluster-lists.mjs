import { readFileSync, writeFileSync, existsSync } from "node:fs";

const pages = {
  "reinigung-kosten-berlin": [
    ["Bezirk und Lage", "Der Einsatzort beeinflusst Planung, Anfahrt und Terminlogik. Für Berlin sind Bezirk, Lage im Gebäude und Erreichbarkeit des Objekts wichtige Basisdaten."],
    ["Objektart und Fläche", "Wohnung, Büro, Praxis, Kanzlei, Treppenhaus oder Allgemeinfläche werden unterschiedlich kalkuliert. Neben der Fläche zählt vor allem die Struktur der Räume."],
    ["Aktueller Zustand", "Leichte Pflege, Übergabezustand, Renovierungsstaub, Bauverschmutzung, Kalk oder Fett führen zu unterschiedlichen Abläufen und Zeitansätzen."],
    ["Leistungsumfang", "Böden, Küche, Sanitär, Fenster, Rahmen, Türen, Heizkörper, Treppen oder Kontaktflächen sollten klar benannt werden, damit der Umfang belastbar bleibt."],
    ["Termin und Zeitfenster", "Kurzfristige Termine, enge Übergabezeiten oder Reinigung außerhalb üblicher Zeiten beeinflussen die Einsatzplanung und damit die Kalkulation."],
    ["Fotos und Zugang", "Fotos helfen bei der ersten Einschätzung. Zusätzlich wichtig sind Zugang, Schlüsselübergabe, Parkmöglichkeit und besondere Objektbedingungen."],
  ],
  "checkliste-wohnungsuebergabe-berlin": [
    ["Böden und Sockelleisten", "Laufwege, Ecken, Ränder und Sockelleisten prägen den ersten Eindruck. Sichtbare Rückstände sollten vor dem Termin gezielt geprüft werden."],
    ["Küche und Sanitär", "Küche und Bad sind bei Übergaben besonders kritisch. Kalk, Fett, Armaturen, Fliesen, Schränke und Ablagen fallen schnell auf."],
    ["Fenster, Rahmen und Türen", "Fensterflächen, Rahmen, Griffe, Zargen und Kanten werden häufig übersehen, bestimmen aber stark die Gesamtwirkung der Wohnung."],
    ["Heizkörper, Balkon und Nebenflächen", "Heizkörper, Balkon, Keller oder Abstellflächen sollten nicht erst beim Termin auffallen. Diese Bereiche werden oft unterschätzt."],
    ["Zählerstände und Schlüssel", "Zählerstände, Schlüsselanzahl, Zugangschips und besondere Absprachen sollten vor der Übergabe vollständig vorbereitet sein."],
    ["Fotos und Übergabeprotokoll", "Fotos schaffen Nachvollziehbarkeit. Ein vorbereitetes Protokoll reduziert Reibung und hilft, Zustand und Absprachen sauber festzuhalten."],
  ],
  "treppenhausreinigung-kosten-berlin": [
    ["Adresse und Objektgröße", "Bezirk, Anzahl der Etagen, Parteien, Podeste und Laufwege bestimmen den Grundaufwand der Treppenhausreinigung."],
    ["Eingang, Aufzug und Kellerzugänge", "Eingangsbereich, Briefkastenanlage, Aufzug, Kellerzugänge und Nebenflächen müssen klar definiert werden, damit der Leistungsumfang nachvollziehbar bleibt."],
    ["Handläufe, Glas und Kontaktflächen", "Handläufe, Glasflächen, Türen, Griffe und Kontaktpunkte sind sichtbar und nutzungsintensiv. Sie sollten im Leistungsbild sauber eingeordnet werden."],
    ["Turnus und Nutzungsdruck", "Wöchentliche oder zweiwöchentliche Reinigung hängt von Parteienzahl, Bewohnerstruktur, Frequenz und gewünschtem Erscheinungsbild ab."],
    ["Zugangslösung", "Schlüssel, Zugangscode, Ansprechpartner, Hausordnung und mögliche Zeitfenster beeinflussen die praktische Umsetzbarkeit im Objektalltag."],
    ["Sonderflächen und Grundreinigung", "Starke Verschmutzung, Renovierungsspuren, Müllräume, Fenster oder intensive Grundreinigung sollten separat vom laufenden Turnus betrachtet werden."],
  ],
};

const css = `
      .editorial-list {
        margin-top: 34px;
        border: 1px solid #E5D9C8;
        border-radius: 30px;
        background: #FFFFFF;
        overflow: hidden;
        box-shadow: 0 24px 70px rgba(60,48,35,.07);
      }
      .editorial-row {
        display: grid;
        grid-template-columns: 0.85fr 1.65fr;
        gap: 34px;
        padding: 26px 30px;
        border-bottom: 1px solid #EEE8DE;
        align-items: start;
      }
      .editorial-row:last-child { border-bottom: 0; }
      .editorial-row strong {
        color: #2C2C2C;
        font-size: 18px;
        line-height: 1.35;
        letter-spacing: -0.02em;
      }
      .editorial-row p {
        margin: 0;
        color: #7E7367;
        font-size: 15px;
        line-height: 1.8;
      }
      @media(max-width:760px){
        .editorial-row { grid-template-columns: 1fr; gap: 10px; padding: 24px; }
      }
`;

function editorial(items) {
  return `<div class="editorial-list">${items.map(([title, text]) => `<div class="editorial-row"><strong>${title}</strong><p>${text}</p></div>`).join("")}</div>`;
}

for (const [slug, items] of Object.entries(pages)) {
  const file = `dist/${slug}/index.html`;
  if (!existsSync(file)) continue;
  let html = readFileSync(file, "utf8");

  if (!html.includes(".editorial-list")) {
    html = html.replace("</style>", `${css}\n    </style>`);
  }

  html = html.replace(/<div class="cluster-checklist">[\s\S]*?<\/div>/, editorial(items));
  writeFileSync(file, html, "utf8");
}

console.log("SEO cluster editorial lists finalized: checklist cards replaced with premium two-column editorial rows.");
