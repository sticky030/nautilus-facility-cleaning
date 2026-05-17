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
console.log("About page polished: layout only, no duplicated copy.");
