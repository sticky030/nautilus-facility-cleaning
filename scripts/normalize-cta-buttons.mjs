import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const contactHref = "https://nautilus-facility.de/?kontakt=1#kontakt";
const contactOnclick = "sessionStorage.setItem('scrollToContact', '1')";
const whatsappContactHref = "https://wa.me/4917622844636?text=Hallo%2C%20ich%20m%C3%B6chte%20Nautilus%20Facility%20Cleaning%20kontaktieren.%20Bitte%20melden%20Sie%20sich%20bei%20mir.";
const whatsappPhotoHref = "https://wa.me/4917622844636?text=Hallo%2C%20ich%20m%C3%B6chte%20eine%20Reinigungsanfrage%20f%C3%BCr%20Berlin%20stellen.%20Ich%20sende%20Ihnen%20Bezirk%2C%20Fl%C3%A4che%2C%20Termin%20und%20Fotos.";

const photoPages = new Set([
  "reinigung-nach-auszug-berlin",
  "uebergabereinigung-berlin",
  "reinigung-nach-renovierung-berlin",
  "bauendreinigung-berlin",
  "grundreinigung-berlin",
  "reinigungsfirma-lichtenberg-berlin",
  "reinigungsfirma-marzahn-hellersdorf-berlin",
  "reinigungsfirma-pankow-berlin",
  "reinigungsfirma-prenzlauer-berg-berlin",
  "reinigungsfirma-weissensee-berlin",
  "reinigungsfirma-friedrichshain-kreuzberg-berlin",
  "reinigungsfirma-berlin-mitte",
]);

const contactPages = new Set([
  "bueroreinigung-berlin",
  "praxisreinigung-berlin",
  "kanzleireinigung-berlin",
  "treppenhausreinigung-berlin",
  "hausverwaltungen-berlin",
  "fensterreinigung-berlin",
  "ueber-uns",
]);

function buttonPair(slug) {
  const isPhoto = photoPages.has(slug);
  return `
              <a class="button" href="${isPhoto ? whatsappPhotoHref : whatsappContactHref}">${isPhoto ? "Fotos per WhatsApp senden" : "Per WhatsApp kontaktieren"}</a>
              <a class="button" href="${contactHref}" onclick="${contactOnclick}">Anfrageformular nutzen</a>`;
}

function normalizeHeroActions(html, slug) {
  return html.replace(/<div class="hero-actions">[\s\S]*?<\/div>/, `<div class="hero-actions">${buttonPair(slug)}\n            </div>`);
}

function normalizeCtaBlocks(html, slug) {
  return html.replace(/<div style="display:flex; gap:14px; flex-wrap:wrap; justify-content:flex-end;">[\s\S]*?<\/div>/g, `<div style="display:flex; gap:14px; flex-wrap:wrap; justify-content:flex-end;">${buttonPair(slug)}\n            </div>`);
}

function normalizeLabelsAndClasses(html, slug) {
  const isPhoto = photoPages.has(slug);
  let next = html;
  next = next.replace(/Kontaktformular öffnen/g, "Anfrageformular nutzen");
  next = next.replace(/<a class="button secondary"/g, '<a class="button"');
  if (!isPhoto) {
    next = next.replace(/>Fotos per WhatsApp senden<\/a>/g, ">Per WhatsApp kontaktieren</a>");
  }
  return next;
}

const entries = readdirSync(distDir).filter((entry) => {
  const full = join(distDir, entry);
  return statSync(full).isDirectory() && existsSync(join(full, "index.html"));
});

for (const slug of entries) {
  if (!photoPages.has(slug) && !contactPages.has(slug)) continue;
  const file = join(distDir, slug, "index.html");
  let html = readFileSync(file, "utf8");
  html = normalizeHeroActions(html, slug);
  html = normalizeCtaBlocks(html, slug);
  html = normalizeLabelsAndClasses(html, slug);
  writeFileSync(file, html, "utf8");
}

console.log("CTA buttons normalized: photo pages keep photo WhatsApp, B2B pages use contact WhatsApp, all use gold form button.");
