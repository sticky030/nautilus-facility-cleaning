import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const contactHref = "https://nautilus-facility.de/?kontakt=1#kontakt";
const contactOnclick = "sessionStorage.setItem('scrollToContact', '1')";

function removeInjectedBottomCta(html) {
  return html.replace(/\n\s*<section class="white" data-final-contact-cta="true">[\s\S]*?<\/section>/g, "");
}

function normalizeHeroButtons(html) {
  return html
    .replace(/<a class="button secondary" href="https:\/\/nautilus-facility\.de\/\?kontakt=1#kontakt" onclick="sessionStorage\.setItem\('scrollToContact', '1'\)">Kontaktformular öffnen<\/a>\s*/g, "")
    .replace(/<a class="button secondary" href="https:\/\/nautilus-facility\.de\/\?kontakt=1#kontakt" onclick="sessionStorage\.setItem\('scrollToContact', '1'\)">Anfrageformular nutzen<\/a>/g, `<a class="button" href="${contactHref}" onclick="${contactOnclick}">Anfrageformular nutzen</a>`)
    .replace(/<a class="button secondary" href="([^\"]*)">Fotos per WhatsApp senden<\/a>/g, '<a class="button" href="$1">Fotos per WhatsApp senden</a>')
    .replace(/Kontaktformular öffnen/g, "Anfrageformular nutzen");
}

function addFormButtonToCtaBeforeFaq(html) {
  const faqIndex = html.indexOf('<section id="faq"');
  if (faqIndex === -1) return html;

  const whatsappLabelIndex = html.lastIndexOf("Fotos per WhatsApp senden</a>", faqIndex);
  if (whatsappLabelIndex === -1) return html;

  const existingFormIndex = html.lastIndexOf("Anfrageformular nutzen</a>", faqIndex);
  const ctaSectionIndex = html.lastIndexOf('<div class="cta">', whatsappLabelIndex);
  if (existingFormIndex > ctaSectionIndex) return html;

  const anchorEnd = whatsappLabelIndex + "Fotos per WhatsApp senden</a>".length;
  const formButton = `\n              <a class="button" href="${contactHref}" onclick="${contactOnclick}">Anfrageformular nutzen</a>`;
  return `${html.slice(0, anchorEnd)}${formButton}${html.slice(anchorEnd)}`;
}

const entries = readdirSync(distDir).filter((entry) => {
  const full = join(distDir, entry);
  return statSync(full).isDirectory() && existsSync(join(full, "index.html"));
});

for (const slug of entries) {
  const file = join(distDir, slug, "index.html");
  let html = readFileSync(file, "utf8");
  html = removeInjectedBottomCta(html);
  html = normalizeHeroButtons(html);
  html = addFormButtonToCtaBeforeFaq(html);
  writeFileSync(file, html, "utf8");
}

console.log("SEO CTA placement fixed: no extra bottom section, form button added before FAQ.");
