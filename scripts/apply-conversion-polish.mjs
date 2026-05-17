import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const formspreeAction = "https://formspree.io/f/mnjonren";
const contactFile = "dist/kontakt/index.html";

const polishCss = `
      .direct-form-panel {
        border: 1px solid #E5D9C8;
        border-radius: 30px;
        background: #FFFFFF;
        padding: 34px;
        box-shadow: 0 26px 80px rgba(60,48,35,.08);
      }
      .direct-form-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px; }
      .direct-form-field { display:flex; flex-direction:column; gap:8px; }
      .direct-form-field label { font-size:11px; font-weight:800; letter-spacing:.16em; text-transform:uppercase; color:#8A7E70; }
      .direct-form-field input, .direct-form-field select, .direct-form-field textarea {
        width:100%; border:1px solid #E5D9C8; border-radius:14px; background:#FCFBF8; padding:14px 16px; color:#2C2C2C; font-size:15px; outline:none;
      }
      .direct-form-field input:focus, .direct-form-field select:focus, .direct-form-field textarea:focus { border-color:#B79B6C; background:#fff; }
      .direct-form-field.full { grid-column:1 / -1; }
      .direct-form-note { margin-top:14px; color:#8A7E70; font-size:12px; line-height:1.65; }
      .process-grid { grid-template-columns:repeat(4,minmax(0,1fr)) !important; gap:18px !important; }
      .process-grid .card { min-height:220px !important; position:relative; overflow:hidden; padding-top:54px !important; }
      .process-grid .card::before { content:attr(data-step); position:absolute; top:22px; left:24px; width:34px; height:34px; border-radius:999px; background:#B79B6C; color:#fff; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; letter-spacing:.08em; }
      .process-grid .card h3 { margin-top:0 !important; }
      .about-owner-card { margin-top:34px; border:1px solid #E5D9C8; border-radius:30px; background:linear-gradient(135deg,#fff 0%,#FCFBF8 100%); padding:34px; display:grid; grid-template-columns:auto 1fr; gap:22px; align-items:center; box-shadow:0 24px 70px rgba(60,48,35,.07); }
      .about-owner-avatar { width:68px; height:68px; border-radius:999px; background:#B79B6C; color:#fff; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:800; letter-spacing:.08em; }
      .about-owner-card h3 { margin:0 0 8px; color:#2C2C2C; font-size:20px; }
      .about-owner-card p { margin:0; color:#7E7367; line-height:1.75; }
      .article-meta { margin-top:18px; display:inline-flex; flex-wrap:wrap; gap:10px; align-items:center; color:#8A7E70; font-size:13px; font-weight:650; }
      .article-meta span { border:1px solid #E5D9C8; border-radius:999px; padding:8px 13px; background:#fff; }
      .interactive-checklist { margin-top:34px; border:1px solid #E5D9C8; border-radius:30px; background:#fff; overflow:hidden; box-shadow:0 24px 70px rgba(60,48,35,.07); }
      .interactive-checklist-head { background:#2C2C2C; color:#fff; padding:22px 26px; display:flex; justify-content:space-between; gap:18px; align-items:center; }
      .interactive-checklist-head strong { font-size:17px; }
      .interactive-checklist-head button { border:1px solid rgba(255,255,255,.35); background:transparent; color:#fff; border-radius:999px; padding:9px 14px; font-weight:750; cursor:pointer; }
      .interactive-checklist label { display:flex; gap:14px; align-items:flex-start; padding:18px 24px; border-bottom:1px solid #EEE8DE; color:#2C2C2C; font-size:15px; line-height:1.55; }
      .interactive-checklist label:last-child { border-bottom:0; }
      .interactive-checklist input { margin-top:4px; accent-color:#B79B6C; width:18px; height:18px; flex-shrink:0; }
      @media(max-width:980px){ .process-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important;} }
      @media(max-width:760px){ .direct-form-grid,.process-grid{grid-template-columns:1fr !important;} .about-owner-card{grid-template-columns:1fr;} }
`;

function injectCss(html) {
  if (html.includes(".direct-form-panel")) return html;
  return html.replace("</style>", `${polishCss}\n    </style>`);
}

function contactFormHtml() {
  return `<section id="kontaktformular" class="white"><div class="container"><div class="section-head"><div class="eyebrow">Anfrageformular</div><h2>Reinigungsanfrage direkt auf dieser Seite senden.</h2><p class="section-text">Das Formular bleibt auf der Kontaktseite. So können Sie Objektart, Termin, Zustand und Leistungsumfang strukturiert übermitteln, ohne zur Startseite wechseln zu müssen.</p></div><form class="direct-form-panel" action="${formspreeAction}" method="POST"><div class="direct-form-grid"><div class="direct-form-field"><label>Objektart</label><select name="Objektart"><option>Reinigung nach Auszug / Übergabe</option><option>Reinigung nach Renovierung</option><option>Bauendreinigung / Baufeinreinigung</option><option>Büro / Kanzlei</option><option>Praxis</option><option>Treppenhaus / Hausverwaltung</option><option>Sonstiger Reinigungsbedarf</option></select></div><div class="direct-form-field"><label>Bezirk / Lage</label><input name="Bezirk" placeholder="z. B. Lichtenberg, Pankow, Mitte" /></div><div class="direct-form-field"><label>Name</label><input name="Name" required placeholder="Ihr Name" /></div><div class="direct-form-field"><label>E-Mail</label><input type="email" name="E-Mail" required placeholder="kontakt@unternehmen.de" /></div><div class="direct-form-field"><label>Telefon</label><input name="Telefon" placeholder="Für Rückfragen" /></div><div class="direct-form-field"><label>Wunschtermin</label><input name="Termin" placeholder="z. B. nächste Woche / nach Rücksprache" /></div><div class="direct-form-field full"><label>Objekt kurz beschreiben</label><textarea name="Nachricht" required rows="5" placeholder="Fläche, Zustand, Leistungsumfang, Zugang, Zeitfenster, Besonderheiten..."></textarea></div></div><button class="button" type="submit" style="width:100%; margin-top:22px; border:0; cursor:pointer;">Anfrage senden</button><p class="direct-form-note">Ihre Anfrage wird über Formspree an Nautilus Facility Cleaning übermittelt. Für sichtbaren Reinigungsbedarf können Sie zusätzlich Fotos per WhatsApp senden.</p></form></div></section>`;
}

function patchContactPage() {
  if (!existsSync(contactFile)) return;
  let html = readFileSync(contactFile, "utf8");
  html = injectCss(html);
  html = html.replace(/<a href="https:\/\/nautilus-facility\.de\/\?kontakt=1#kontakt"[^>]*>Formular auf der Startseite öffnen<\/a>/g, '<a href="#kontaktformular">Formular direkt hier nutzen</a>');
  html = html.replace(/href="https:\/\/nautilus-facility\.de\/\?kontakt=1#kontakt" onclick="sessionStorage\.setItem\('scrollToContact', '1'\)">Anfrageformular nutzen/g, 'href="#kontaktformular">Anfrageformular nutzen');
  html = html.replace(/href="https:\/\/nautilus-facility\.de\/\?kontakt=1#kontakt" onclick="sessionStorage\.setItem\('scrollToContact', '1'\)">Formular nutzen/g, 'href="#kontaktformular">Formular nutzen');
  if (!html.includes('id="kontaktformular"')) {
    html = html.replace('<section><div class="container"><div class="cta"><div><div class="eyebrow">Direkt anfragen</div>', `${contactFormHtml()}\n      <section><div class="container"><div class="cta"><div><div class="eyebrow">Direkt anfragen</div>`);
  }
  writeFileSync(contactFile, html, "utf8");
}

function patchDistrictPages() {
  const entries = readdirSync("dist").filter((entry) => entry.startsWith("reinigungsfirma-") && existsSync(join("dist", entry, "index.html")));
  for (const slug of entries) {
    const file = join("dist", slug, "index.html");
    let html = readFileSync(file, "utf8");
    html = html.replace(/ Relevant in [^:]+: [^.]+\./g, "");
    writeFileSync(file, html, "utf8");
  }
}

function patchProcessSections() {
  const entries = readdirSync("dist").filter((entry) => existsSync(join("dist", entry, "index.html")));
  for (const slug of entries) {
    const file = join("dist", slug, "index.html");
    let html = readFileSync(file, "utf8");
    html = injectCss(html);
    html = html.replace(/(<div class="section-head"><div class="eyebrow">Ablauf[\s\S]*?<\/div><div class="grid(?:" style="grid-template-columns:repeat\(2, minmax\(0, 1fr\)\);"|">))/g, (m) => m.replace('<div class="grid', '<div class="grid process-grid'));
    html = html.replace(/<article class="card"([^>]*)><h3>(?:1\.|01|Schritt 01)\s*/g, '<article class="card" data-step="01"$1><h3>');
    html = html.replace(/<article class="card"([^>]*)><h3>(?:2\.|02|Schritt 02)\s*/g, '<article class="card" data-step="02"$1><h3>');
    html = html.replace(/<article class="card"([^>]*)><h3>(?:3\.|03|Schritt 03)\s*/g, '<article class="card" data-step="03"$1><h3>');
    html = html.replace(/<article class="card"([^>]*)><h3>(?:4\.|04|Schritt 04)\s*/g, '<article class="card" data-step="04"$1><h3>');
    writeFileSync(file, html, "utf8");
  }
}

function patchAboutOwner() {
  const file = "dist/ueber-uns/index.html";
  if (!existsSync(file)) return;
  let html = readFileSync(file, "utf8");
  html = injectCss(html);
  if (!html.includes("about-owner-card")) {
    const owner = `<div class="about-owner-card"><div class="about-owner-avatar">PD</div><div><h3>Ansprechpartner: Philipp De Boer</h3><p>Philipp De Boer ist Geschäftsführer der Nautilus Security UG (haftungsbeschränkt) und verantwortlich für Nautilus Facility Cleaning. Der Schwerpunkt liegt auf klarer Abstimmung, objektbezogenen Angeboten und einer professionellen Umsetzung für Berliner Wohn-, Gewerbe- und Verwaltungsobjekte.</p></div></div>`;
    html = html.replace(/(<\/div><div class="grid">)/, `${owner}$1`);
  }
  writeFileSync(file, html, "utf8");
}

function patchRatgeberMetaAndChecklist() {
  const meta = {
    "reinigung-kosten-berlin": "5 min Lesezeit · Nautilus Facility Cleaning",
    "checkliste-wohnungsuebergabe-berlin": "6 min Lesezeit · Nautilus Facility Cleaning",
    "treppenhausreinigung-kosten-berlin": "5 min Lesezeit · Nautilus Facility Cleaning",
  };
  for (const [slug, label] of Object.entries(meta)) {
    const file = `dist/${slug}/index.html`;
    if (!existsSync(file)) continue;
    let html = readFileSync(file, "utf8");
    html = injectCss(html);
    if (!html.includes("article-meta")) {
      html = html.replace(/(<h1>[^<]+<\/h1>)/, `$1<div class="article-meta"><span>${label}</span><span>Ratgeber Berlin</span></div>`);
    }
    if (slug === "checkliste-wohnungsuebergabe-berlin" && !html.includes("interactive-checklist")) {
      const items = ["Böden und Sockelleisten geprüft", "Küche: Armaturen, Spüle, Fronten und Ablagen geprüft", "Bad: WC, Dusche, Spiegel, Fliesen und Kalkstellen geprüft", "Fenster, Rahmen, Türen und Griffe geprüft", "Heizkörper, Balkon, Keller oder Abstellraum geprüft", "Zählerstände, Schlüssel und Übergabeprotokoll vorbereitet"];
      const list = `<div class="interactive-checklist"><div class="interactive-checklist-head"><strong>Interaktive Übergabe-Checkliste</strong><button type="button" onclick="window.print()">Als PDF speichern</button></div>${items.map((item, i) => `<label><input type="checkbox" data-check="uebergabe-${i}"><span>${item}</span></label>`).join("")}</div><script>document.querySelectorAll('[data-check]').forEach(function(el){var k='nautilus-'+el.dataset.check;el.checked=localStorage.getItem(k)==='1';el.addEventListener('change',function(){localStorage.setItem(k,el.checked?'1':'0')})});</script>`;
      html = html.replace(/(<section><div class="container"><div class="section-head"><div class="eyebrow">Checkliste[\s\S]*?<\/div>)/, `$1${list}`);
    }
    writeFileSync(file, html, "utf8");
  }
}

patchContactPage();
patchDistrictPages();
patchProcessSections();
patchAboutOwner();
patchRatgeberMetaAndChecklist();
console.log("Conversion polish applied: contact form embedded, district repetition removed, process cards upgraded, about owner block added, guide meta and interactive checklist added.");
