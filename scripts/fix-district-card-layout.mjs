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
      .district-two-col {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        align-items: stretch;
      }
      .district-two-col .card {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .district-two-col .card p:last-child {
        margin-top: auto;
      }
      @media (max-width: 760px) {
        .district-two-col {
          grid-template-columns: 1fr !important;
        }
      }
`;

for (const slug of slugs) {
  const file = `dist/${slug}/index.html`;
  if (!existsSync(file)) continue;
  let html = readFileSync(file, "utf8");

  if (!html.includes(".district-two-col")) {
    html = html.replace("</style>", `${css}\n    </style>`);
  }

  html = html.replace(/<div class="grid">/g, '<div class="grid district-two-col">');

  writeFileSync(file, html, "utf8");
}

console.log("District card layout fixed: two columns, aligned cards, responsive mobile fallback.");
