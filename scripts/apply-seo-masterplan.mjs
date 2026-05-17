import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";

const baseUrl = "https://nautilus-facility.de";
const phone = "0176 2284 4636";
const phoneHref = "tel:+4917622844636";
const email = "kontakt@nautilus-facility.de";
const whatsappBase = "https://wa.me/4917622844636";

const metaUpdates = [
  {
    file: "dist/hausverwaltungen-berlin/index.html",
    title: "Treppenhausreinigung für Hausverwaltungen Berlin | Allgemeinflächen",
    description:
      "Verlässliche Treppenhausreinigung und Allgemeinflächenreinigung für Hausverwaltungen in Berlin. Klare Abstimmung, fester Turnus und objektbezogenes Angebot.",
  },
  {
    file: "dist/kanzleireinigung-berlin/index.html",
    title: "Kanzleireinigung Berlin – Anwälte, Steuerberater & Notariate",
    description:
      "Diskrete Kanzleireinigung für Anwälte, Steuerberater und Notariate in Berlin. Reinigung passend zu Ihren Bürozeiten – ohne Störung des laufenden Kanzleibetriebs.",
  },
  {
    file: "dist/treppenhausreinigung-berlin/index.html",
    title: "Treppenhausreinigung Berlin | Wöchentlich oder nach Turnus",
    description:
      "Treppenhausreinigung in Berlin für Wohnhäuser, Hausverwaltungen und WEGs. Turnus nach Objekt, klarer Leistungsumfang und kostenfreie Besichtigung.",
  },
  {
    file: "dist/praxisreinigung-berlin/index.html",
    title: "Praxisreinigung Berlin – Arztpraxen, Zahnarztpraxen & MVZ",
    description:
      "Strukturierte Praxisreinigung in Berlin für Arztpraxen, Zahnarztpraxen, Privatpraxen und MVZs. Klare Abläufe, passende Zeitfenster und objektbezogenes Angebot.",
  },
  {
    file: "dist/bueroreinigung-berlin/index.html",
    title: "Büroreinigung Berlin – Kanzleien, Praxen & Beratungsbüros",
    description:
      "Regelmäßige Büroreinigung in Berlin für Kanzleien, Praxen, Beratungsbüros und Büroflächen. Verlässlicher Turnus, klare Abläufe und objektbezogenes Angebot.",
  },
  {
    file: "dist/reinigung-nach-renovierung-berlin/index.html",
    title: "Reinigung nach Renovierung Berlin – Baustaub, Auszug & Übergabe",
    description:
      "Reinigung nach Renovierung, Auszug, Bauarbeiten oder Übergabe in Berlin. Fotos senden, Aufwand einschätzen lassen und konkretes Angebot erhalten.",
  },
];

function read(file) {
  return readFileSync(file, "utf8");
}

function write(file, html) {
  writeFileSync(file, html, "utf8");
}

function updateMeta(html, title, description) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function injectBefore(html, needle, block) {
  if (html.includes(block.trim().slice(0, 80))) return html;
  const index = html.indexOf(needle);
  if (index === -1) return html;
  return `${html.slice(0, index)}\n${block}\n${html.slice(index)}`;
}

function addTreppenhausContent() {
  const file = "dist/treppenhausreinigung-berlin/index.html";
  if (!existsSync(file)) return;
  let html = read(file);
  if (html.includes("Wie oft sollte ein Treppenhaus gereinigt werden?")) {
    write(file, html);
    return;
  }

  const block = `
      <section class="white" id="turnus-kosten">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Turnus & Kostenlogik</div>
            <h2>Treppenhausreinigung nach Objekt: wöchentlich, zweiwöchentlich oder monatlich.</h2>
            <p class="section-text">
              Der passende Reinigungsturnus hängt vom Haus ab – nicht von einer Pauschale. Entscheidend sind Anzahl der Wohneinheiten, Nutzungsfrequenz, Eingangsbereich, Bodenbelag, Aufzug, Kellerzugang und gewünschter Pflegezustand.
            </p>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Wie oft sollte ein Treppenhaus gereinigt werden?</h3>
              <p>Mehrfamilienhäuser mit hoher Nutzung benötigen häufig eine wöchentliche Treppenhausreinigung. Kleinere oder ruhigere Objekte können je nach Zustand auch zweiwöchentlich oder monatlich gereinigt werden.</p>
              <p>Nautilus Facility Cleaning empfiehlt den Turnus objektbezogen – nach Etagenzahl, Nutzungsintensität, Bodenbelag und Objektstruktur.</p>
            </article>

            <article class="card">
              <h3>Was beeinflusst die Kosten?</h3>
              <p>Ein pauschaler Preis ist ohne Objektprüfung nicht belastbar. Relevant sind Etagenzahl, Treppenstufen, Podeste, Bodenbelag, Turnus, Eingangsbereich, Aufzug, Briefkastenanlage, Kellerbereiche und Anfahrt.</p>
              <p>Deshalb erstellen wir ein objektbezogenes Angebot nach kurzer Bedarfsklärung oder kostenfreier Besichtigung.</p>
            </article>

            <article class="card">
              <h3>Für Hausverwaltungen und WEGs</h3>
              <p>Hausverwaltungen benötigen klare Abläufe, planbare Ausführung und saubere Leistungsabgrenzung. Wir übernehmen einzelne Objekte ebenso wie kleinere Objektbestände – mit abgestimmtem Turnus, klarer Zugangslösung und direkter Kommunikation.</p>
            </article>
          </div>
        </div>
      </section>
`;

  html = injectBefore(html, '<section id="faq"', block);

  const faqExtra = `
            <details>
              <summary>Wie oft wird ein Treppenhaus üblicherweise gereinigt?</summary>
              <p>Das hängt vom Objekt ab. Bei größeren Mehrfamilienhäusern ist eine wöchentliche Reinigung üblich. Kleinere Häuser mit weniger Bewohnern werden häufig zweiwöchentlich oder monatlich gepflegt.</p>
            </details>

            <details>
              <summary>Was kostet Treppenhausreinigung in Berlin?</summary>
              <p>Der Preis hängt von Etagen, Fläche, Turnus, Bodenbelag und gewünschtem Leistungsumfang ab. Wir nennen keinen Blindpreis, sondern erstellen ein objektbezogenes Angebot nach kurzer Klärung oder Besichtigung.</p>
            </details>

            <details>
              <summary>Reinigen Sie auch Briefkästen, Klingelanlagen und Aufzüge?</summary>
              <p>Briefkasten- und Klingelbereiche sowie Aufzugsflächen können nach Abstimmung in den Leistungsumfang aufgenommen werden. Das wird vor Beginn klar abgegrenzt.</p>
            </details>
`;
  html = html.replace('          </div>\n        </div>\n      </section>\n    </main>', `            ${faqExtra}\n          </div>\n        </div>\n      </section>\n    </main>`);
  write(file, html);
}

function addCrossLinks() {
  const linkBlocks = [
    {
      file: "dist/index.html",
      block: relatedBlock("Weitere Reinigungsleistungen in Berlin", [
        ["Reinigung nach Renovierung", "/reinigung-nach-renovierung-berlin/"],
        ["Reinigung nach Auszug", "/reinigung-nach-auszug-berlin/"],
        ["Übergabereinigung", "/uebergabereinigung-berlin/"],
        ["Bauendreinigung", "/bauendreinigung-berlin/"],
      ]),
    },
    {
      file: "dist/hausverwaltungen-berlin/index.html",
      block: relatedBlock("Relevante Zusatzleistungen für verwaltete Objekte", [
        ["Treppenhausreinigung für verwaltete Objekte", "/treppenhausreinigung-berlin/"],
        ["Übergabereinigung bei Mieterwechsel", "/uebergabereinigung-berlin/"],
        ["Grundreinigung und Sonderreinigung", "/grundreinigung-berlin/"],
        ["Reinigung nach Renovierung", "/reinigung-nach-renovierung-berlin/"],
      ]),
    },
    {
      file: "dist/grundreinigung-berlin/index.html",
      block: relatedBlock("Passende Reinigungsanlässe", [
        ["Reinigung nach Renovierung, Auszug oder Bauarbeiten", "/reinigung-nach-renovierung-berlin/"],
        ["Reinigung nach Auszug", "/reinigung-nach-auszug-berlin/"],
        ["Übergabereinigung", "/uebergabereinigung-berlin/"],
        ["Bauendreinigung", "/bauendreinigung-berlin/"],
      ]),
    },
    {
      file: "dist/bueroreinigung-berlin/index.html",
      block: relatedBlock("Spezialisierte Reinigung für Geschäftsräume", [
        ["Kanzleireinigung für Anwälte und Steuerberater", "/kanzleireinigung-berlin/"],
        ["Praxisreinigung für medizinische Einrichtungen", "/praxisreinigung-berlin/"],
        ["Grundreinigung für Büros", "/grundreinigung-berlin/"],
      ]),
    },
    {
      file: "dist/reinigung-nach-renovierung-berlin/index.html",
      block: relatedBlock("Spezielle Reinigungsanlässe", [
        ["Reinigung nach Auszug", "/reinigung-nach-auszug-berlin/"],
        ["Übergabereinigung", "/uebergabereinigung-berlin/"],
        ["Bauendreinigung", "/bauendreinigung-berlin/"],
        ["Grundreinigung", "/grundreinigung-berlin/"],
      ]),
    },
  ];

  for (const item of linkBlocks) {
    if (!existsSync(item.file)) continue;
    let html = read(item.file);
    if (html.includes("data-seo-crosslinks")) continue;
    html = injectBefore(html, "</main>", item.block);
    write(item.file, html);
  }
}

function relatedBlock(title, links) {
  return `
      <section class="white" data-seo-crosslinks="true">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Weitere Leistungen</div>
            <h2>${title}</h2>
            <p class="section-text">Je nach Objekt, Zustand und Termin kann eine ergänzende Reinigung sinnvoll sein. Diese Leistungen passen thematisch zu Ihrer aktuellen Anfrage.</p>
          </div>
          <div class="grid">
            ${links
              .map(
                ([label, href]) => `<article class="card"><h3>${label}</h3><p><a href="${href}" style="color:#B79B6C; font-weight:750; letter-spacing:.08em; text-transform:uppercase; font-size:12px;">Mehr Informationen ansehen</a></p></article>`
              )
              .join("\n            ")}
          </div>
        </div>
      </section>`;
}

function getSharedStyle() {
  const praxis = read("dist/praxisreinigung-berlin/index.html");
  const match = praxis.match(/<style>[\s\S]*?<\/style>/);
  if (!match) throw new Error("Shared style not found");
  return match[0];
}

function generateCashflowPage({ slug, title, description, eyebrow, h1, lead, cardTitle, bullets, sections, faq, primaryCta }) {
  const sharedStyle = getSharedStyle();
  const whatsappText = encodeURIComponent(primaryCta);
  const html = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/images/reinigung-trans.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${baseUrl}/${slug}/" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${baseUrl}/${slug}/" />
    <meta property="og:site_name" content="Nautilus Facility Cleaning" />
    <meta property="og:image" content="${baseUrl}/images/reinigung-trans.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${baseUrl}/images/reinigung-trans.png" />
    <script type="application/ld+json">
    ${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: h1,
      serviceType: eyebrow,
      provider: {
        "@type": "LocalBusiness",
        name: "Nautilus Facility Cleaning",
        telephone: "+4917622844636",
        email,
        address: { "@type": "PostalAddress", addressLocality: "Berlin", addressCountry: "DE" },
      },
      areaServed: ["Berlin", "Lichtenberg", "Marzahn-Hellersdorf", "Friedrichshain-Kreuzberg", "Pankow", "Prenzlauer Berg", "Weißensee", "Mitte"],
      url: `${baseUrl}/${slug}/`,
    }, null, 6)}
    </script>
    ${sharedStyle}
  </head>
  <body>
    <header class="nav">
      <div class="nav-inner">
        <a class="brand" href="/">Nautilus Facility Cleaning</a>
        <nav class="nav-links" aria-label="Navigation">
          <a href="/">Startseite</a>
          <a href="/reinigung-nach-renovierung-berlin/">Renovierung</a>
          <a href="/grundreinigung-berlin/">Grundreinigung</a>
          <a href="/treppenhausreinigung-berlin/">Treppenhaus</a>
          <a href="https://nautilus-facility.de/?kontakt=1#kontakt" onclick="sessionStorage.setItem('scrollToContact', '1')">Kontakt</a>
        </nav>
      </div>
    </header>
    <main>
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <div class="eyebrow">${eyebrow}</div>
            <h1>${h1}</h1>
            <p class="lead">${lead}</p>
            <div class="hero-actions">
              <a class="button" href="${whatsappBase}?text=${whatsappText}">Fotos per WhatsApp senden</a>
              <a class="button secondary" href="https://nautilus-facility.de/?kontakt=1#kontakt" onclick="sessionStorage.setItem('scrollToContact', '1')">Anfrageformular nutzen</a>
            </div>
          </div>
          <aside class="hero-card">
            <strong>${cardTitle}</strong>
            <p>Für eine erste Einschätzung reichen meist Bezirk, Fläche, gewünschter Termin und einige Fotos vom aktuellen Zustand. Danach klären wir, ob ein direktes Angebot möglich ist oder eine kurze Besichtigung sinnvoll wäre.</p>
          </aside>
        </div>
      </section>
      <section class="white" id="leistungen">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Leistungsumfang</div>
            <h2>Was wir objektbezogen übernehmen.</h2>
            <p class="section-text">Der Leistungsumfang wird vor Beginn klar abgestimmt. Entscheidend sind Zustand, Zugänglichkeit, Termin, gewünschter Zielzustand und besondere Bereiche wie Küche, Bad, Fenster oder Rahmen.</p>
          </div>
          <div class="grid">
            ${bullets.map((item) => `<article class="card"><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join("\n            ")}
          </div>
        </div>
      </section>
      ${sections.map((section) => `
      <section>
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">${section.eyebrow}</div>
            <h2>${section.h2}</h2>
            <p class="section-text">${section.text}</p>
          </div>
        </div>
      </section>`).join("\n")}
      <section id="faq" class="white">
        <div class="container">
          <div class="section-head"><div class="eyebrow">FAQ</div><h2>Häufige Fragen.</h2></div>
          <div class="faq">
            ${faq.map((item) => `<details><summary>${item[0]}</summary><p>${item[1]}</p></details>`).join("\n            ")}
          </div>
        </div>
      </section>
    </main>
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div><div class="footer-title">Nautilus Facility Cleaning</div><p style="margin:0; color:#7E7367; line-height:1.75;">Objektbezogene Reinigung in Berlin für Auszug, Übergabe, Renovierung, Bauarbeiten, Büros, Praxen, Kanzleien und verwaltete Objekte.</p></div>
          <div><div class="footer-title">Weitere Leistungen</div><div class="footer-links"><a href="/reinigung-nach-renovierung-berlin/">Reinigung nach Renovierung</a><a href="/grundreinigung-berlin/">Grundreinigung Berlin</a><a href="/treppenhausreinigung-berlin/">Treppenhausreinigung Berlin</a><a href="/hausverwaltungen-berlin/">Reinigung für Hausverwaltungen</a></div></div>
          <div><div class="footer-title">Kontakt</div><div class="footer-links"><a href="${phoneHref}">${phone}</a><a href="mailto:${email}">${email}</a><a href="${whatsappBase}?text=${whatsappText}">WhatsApp-Anfrage senden</a><a href="/">Startseite</a></div></div>
        </div>
        <div class="footer-meta"><span>Berlin</span><span>Lichtenberg</span><span>Marzahn-Hellersdorf</span><span>Friedrichshain-Kreuzberg</span><span>Pankow</span><span>Mitte</span><span><a href="/impressum/">Impressum</a></span><span><a href="/datenschutz/">Datenschutz</a></span></div>
      </div>
    </footer>
  </body>
</html>`;
  mkdirSync(`dist/${slug}`, { recursive: true });
  writeFileSync(`dist/${slug}/index.html`, html, "utf8");
  console.log(`SEO cashflow page generated: dist/${slug}/index.html`);
}

for (const item of metaUpdates) {
  if (!existsSync(item.file)) continue;
  write(item.file, updateMeta(read(item.file), item.title, item.description));
}

addTreppenhausContent();

const pages = [
  {
    slug: "reinigung-nach-auszug-berlin",
    title: "Reinigung nach Auszug Berlin – Wohnung besenrein & übergabefähig",
    description: "Auszugsreinigung in Berlin für Wohnungen, Büros und Gewerbeobjekte. Küche, Bad, Böden, Fenster nach Abstimmung. Fotos senden und Angebot erhalten.",
    eyebrow: "Reinigung nach Auszug Berlin",
    h1: "Reinigung nach Auszug in Berlin – sauber übergeben und Aufwand realistisch klären",
    lead: "Vor einer Wohnungsübergabe entscheidet der tatsächliche Zustand über Aufwand und Umfang. Nautilus Facility Cleaning unterstützt bei Reinigung nach Auszug, Einzug und Leerstand – strukturiert, objektbezogen und mit klar abgestimmtem Leistungsbild.",
    cardTitle: "Schnelle Einschätzung über Fotos",
    primaryCta: "Hallo, ich suche eine Reinigung nach Auszug in Berlin. Ich sende Ihnen Fotos und kurze Informationen zum Objekt.",
    bullets: [
      ["Küche, Bad und Sanitär", "Reinigung stark genutzter Bereiche vor Übergabe oder Neuvermietung."],
      ["Böden und Oberflächen", "Reinigung sichtbarer Flächen, Kontaktpunkte und Laufbereiche nach Objektzustand."],
      ["Fenster und Rahmen", "Fenster- und Rahmenreinigung nach Abstimmung, Zugänglichkeit und Verschmutzung."],
    ],
    sections: [
      { eyebrow: "Übergabe", h2: "Was Vermieter bei der Auszugsreinigung häufig prüfen.", text: "Bei Auszug fallen Küche, Sanitärbereiche, Böden, Türen, Rahmen, Fensterbänke und Kontaktflächen besonders auf. Deshalb klären wir vorab, welche Bereiche wirklich übergaberelevant sind." },
      { eyebrow: "Ablauf", h2: "Fotos senden, Aufwand einschätzen, Termin abstimmen.", text: "Für eine erste Einschätzung reichen Bezirk, Fläche, Termin, leer oder möbliert sowie Fotos von Küche, Bad, Böden und Gesamtzustand." },
    ],
    faq: [
      ["Was kostet eine Reinigung nach Auszug?", "Der Aufwand hängt von Fläche, Zustand, Küche, Bad, Fenstern und gewünschtem Termin ab. Wir kalkulieren objektbezogen."],
      ["Kann kurzfristig gereinigt werden?", "Kurzfristige Termine prüfen wir nach Kapazität, Lage und Umfang."],
      ["Reinigen Sie auch Fenster?", "Ja, Fenster und Rahmen können nach Abstimmung aufgenommen werden."],
    ],
  },
  {
    slug: "uebergabereinigung-berlin",
    title: "Übergabereinigung Berlin – Wohnungen, Büros & Gewerbeobjekte",
    description: "Professionelle Übergabereinigung in Berlin für Wohnungen, Büros und Gewerbeobjekte. Fotos senden, Aufwand einschätzen lassen und Angebot erhalten.",
    eyebrow: "Übergabereinigung Berlin",
    h1: "Übergabereinigung Berlin – Wohnungen, Büros und Gewerbeobjekte sauber übergeben",
    lead: "Eine Übergabereinigung ist mehr als kurz durchwischen. Entscheidend ist, dass die relevanten Bereiche vor Termin klar definiert und sauber umgesetzt werden – von Küche und Bad bis zu Böden, Rahmen und Kontaktflächen.",
    cardTitle: "Objektbezogen statt Pauschalversprechen",
    primaryCta: "Hallo, ich suche eine Übergabereinigung in Berlin. Ich sende Ihnen Fotos und kurze Informationen zum Objekt.",
    bullets: [
      ["Wohnungsübergabe", "Reinigung vor Auszug, Einzug, Neuvermietung oder Rückgabe."],
      ["Gewerbeübergabe", "Reinigung von Büro-, Praxis- oder Gewerbeflächen vor Übergabe."],
      ["Grundreinigung nach Bedarf", "Intensivere Reinigung stark genutzter Bereiche nach Zustand."],
    ],
    sections: [
      { eyebrow: "Zielgruppen", h2: "Für Mieter, Vermieter, Eigentümer, Makler und Verwaltungen.", text: "Übergabereinigung ist sinnvoll, wenn ein Objekt sauber freigegeben, weitervermietet oder nach Nutzung wieder in einen gepflegten Zustand gebracht werden soll." },
      { eyebrow: "Abgrenzung", h2: "Was enthalten ist – und was separat abgestimmt wird.", text: "Fenster, Rahmen, starke Verschmutzungen, Möblierung, Keller oder Nebenflächen werden vorab gesondert eingeordnet. So bleibt der Leistungsumfang klar." },
    ],
    faq: [
      ["Wann ist eine Übergabereinigung sinnvoll?", "Vor Wohnungsübergabe, Neuvermietung, Rückgabe von Gewerbeflächen oder nach Renovierung."],
      ["Reicht eine Einschätzung per Foto?", "Bei überschaubaren Objekten häufig ja. Bei größeren oder unklaren Objekten ist eine Besichtigung sinnvoll."],
      ["Erstellen Sie ein Angebot vorab?", "Ja, nach Objektklärung oder Besichtigung erstellen wir ein objektbezogenes Angebot."],
    ],
  },
  {
    slug: "bauendreinigung-berlin",
    title: "Bauendreinigung Berlin – nach Bauarbeiten, Umbau & Abnahme",
    description: "Bauendreinigung und Baufeinreinigung in Berlin nach Bauarbeiten, Umbau und Renovierung. Baustaub, Böden, Oberflächen und Sanitärbereiche.",
    eyebrow: "Bauendreinigung Berlin",
    h1: "Bauendreinigung in Berlin – nach Bauarbeiten, Umbau und Renovierung",
    lead: "Nach Bau-, Umbau- oder Renovierungsarbeiten bleibt häufig feiner Staub, Materialrückstand und sichtbarer Reinigungsbedarf zurück. Nautilus Facility Cleaning unterstützt bei Bauendreinigung und Baufeinreinigung für Wohnungen, Gewerbeflächen und kleinere Objektbereiche.",
    cardTitle: "Sauberer Abschluss vor Nutzung oder Abnahme",
    primaryCta: "Hallo, ich suche eine Bauendreinigung oder Baufeinreinigung in Berlin. Ich sende Ihnen Fotos und kurze Informationen zum Objekt.",
    bullets: [
      ["Baustaub und Feinstaub", "Entfernung sichtbarer Rückstände auf Böden, Rahmen, Fensterbänken und Oberflächen."],
      ["Baufeinreinigung", "Reinigung vor Übergabe, Bezug oder weiterer Nutzung nach Handwerkerarbeiten."],
      ["B2B und Privat", "Für Eigentümer, Handwerker, Bauleitung, kleinere Gewerbeobjekte und Wohnungen."],
    ],
    sections: [
      { eyebrow: "Abgrenzung", h2: "Baufeinreinigung oder Bauendreinigung – was passt?", text: "Die genaue Leistung hängt davon ab, ob noch Bauarbeiten laufen, ob das Objekt übergeben werden soll und welche Rückstände vorhanden sind." },
      { eyebrow: "Kalkulation", h2: "Warum Fotos und Besichtigung wichtig sind.", text: "Baustaub, Rahmen, Glas, Sanitärbereiche und Böden können sehr unterschiedlichen Aufwand verursachen. Deshalb kalkulieren wir nach Zustand und Zieltermin." },
    ],
    faq: [
      ["Was ist der Unterschied zwischen Baufeinreinigung und Bauendreinigung?", "Die Begriffe überschneiden sich. Entscheidend ist der Zustand des Objekts und ob es bezugs- oder übergabefähig vorbereitet werden soll."],
      ["Arbeiten Sie auch für Handwerksbetriebe?", "Ja, nach Abstimmung können wir als Anschlussdienstleister nach Maler-, Boden- oder Ausbauarbeiten unterstützen."],
      ["Müssen Strom und Wasser vorhanden sein?", "Ja, für eine realistische Reinigung müssen Zugänglichkeit, Strom und Wasser vorab geklärt werden."],
    ],
  },
];

for (const page of pages) generateCashflowPage(page);
addCrossLinks();

console.log("SEO masterplan applied.");
