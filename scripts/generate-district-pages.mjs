import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const baseUrl = "https://nautilus-facility.de";
const email = "kontakt@nautilus-facility.de";
const phone = "0176 2284 4636";
const whatsappBase = "https://wa.me/4917622844636";
const contactHref = "https://nautilus-facility.de/?kontakt=1#kontakt";
const contactOnclick = "sessionStorage.setItem('scrollToContact', '1')";

function esc(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function sharedStyle() {
  const html = readFileSync("dist/praxisreinigung-berlin/index.html", "utf8");
  const match = html.match(/<style>[\s\S]*?<\/style>/);
  if (!match) throw new Error("Shared style not found");
  return match[0];
}

function renderCards(cards) {
  return cards.map((card) => `
            <article class="card">
              <h3>${card.title}</h3>
              <p>${card.text}</p>
              ${card.link ? `<p><a href="${card.link.href}" style="color:#B79B6C; font-weight:750; letter-spacing:.08em; text-transform:uppercase; font-size:12px;">${card.link.label}</a></p>` : ""}
            </article>`).join("\n");
}

function renderFaq(faq) {
  return faq.map((item) => `
            <details>
              <summary>${item.q}</summary>
              <p>${item.a}</p>
            </details>`).join("\n");
}

const serviceGroups = [
  {
    title: "Wohnung, Auszug & Übergabe",
    text: "Für Mieter, Eigentümer, Vermieter und Verwaltungen bei Auszug, Einzug, Neuvermietung oder Übergabetermin.",
    links: [
      ["Reinigung nach Auszug", "/reinigung-nach-auszug-berlin/"],
      ["Übergabereinigung", "/uebergabereinigung-berlin/"],
      ["Grundreinigung", "/grundreinigung-berlin/"],
    ],
  },
  {
    title: "Renovierung, Bauarbeiten & Sonderbedarf",
    text: "Für Reinigung nach Renovierung, Malerarbeiten, Bodenarbeiten, Trockenbau, Baufeinreinigung und Bauendreinigung.",
    links: [
      ["Reinigung nach Renovierung", "/reinigung-nach-renovierung-berlin/"],
      ["Bauendreinigung", "/bauendreinigung-berlin/"],
      ["Fenster- und Rahmenreinigung", "/fensterreinigung-berlin/"],
    ],
  },
  {
    title: "Gewerbe, Praxis & Kanzlei",
    text: "Für kleine und mittlere Büros, Arztpraxen, Zahnarztpraxen, Kanzleien, Steuerbüros, Notariate und Beratungsflächen.",
    links: [
      ["Büroreinigung", "/bueroreinigung-berlin/"],
      ["Praxisreinigung", "/praxisreinigung-berlin/"],
      ["Kanzleireinigung", "/kanzleireinigung-berlin/"],
    ],
  },
  {
    title: "Objekte, Treppenhaus & Verwaltung",
    text: "Für Hausverwaltungen, WEGs, Eigentümer und Objektverantwortliche mit Bedarf an Treppenhaus-, Allgemeinflächen- oder Sonderreinigung.",
    links: [
      ["Treppenhausreinigung", "/treppenhausreinigung-berlin/"],
      ["Reinigung für Hausverwaltungen", "/hausverwaltungen-berlin/"],
      ["Grundreinigung", "/grundreinigung-berlin/"],
    ],
  },
];

const districts = [
  {
    slug: "reinigungsfirma-lichtenberg-berlin",
    name: "Lichtenberg",
    title: "Reinigungsfirma Lichtenberg Berlin | Auszug, Büro & Treppenhaus",
    description: "Reinigungsfirma in Berlin-Lichtenberg für Auszug, Renovierung, Büro, Praxis, Treppenhaus, Grundreinigung und Hausverwaltungen. Objektbezogen anfragen.",
    h1: "Reinigungsfirma in Lichtenberg Berlin – objektbezogen, strukturiert und zuverlässig",
    lead: "Nautilus Facility Cleaning unterstützt in Berlin-Lichtenberg bei Reinigung nach Auszug, Renovierung, Übergabe, Treppenhausreinigung, Büroreinigung, Praxisreinigung, Kanzleireinigung und objektbezogener Grundreinigung. Der Leistungsumfang wird nach Objekt, Zustand, Termin und Nutzung abgestimmt.",
    localText: "In Lichtenberg entstehen besonders häufig Anfragen nach Auszugsreinigung, Reinigung nach Renovierung, Treppenhausreinigung, Grundreinigung und Reinigung kleiner Gewerbeflächen. Wir prüfen Anfragen unter anderem für Friedrichsfelde, Karlshorst, Rummelsburg, Fennpfuhl, Alt-Hohenschönhausen, Neu-Hohenschönhausen und Falkenberg.",
    focus: ["Auszug & Übergabe", "Renovierung & Bauarbeiten", "Treppenhäuser & Allgemeinflächen", "Büros, Praxen & Kanzleien"],
    areas: ["Friedrichsfelde", "Karlshorst", "Rummelsburg", "Fennpfuhl", "Alt-Hohenschönhausen", "Neu-Hohenschönhausen", "Falkenberg"],
  },
  {
    slug: "reinigungsfirma-marzahn-hellersdorf-berlin",
    name: "Marzahn-Hellersdorf",
    title: "Reinigungsfirma Marzahn-Hellersdorf Berlin | Auszug & Treppenhaus",
    description: "Reinigungsfirma in Marzahn-Hellersdorf für Auszug, Übergabe, Grundreinigung, Renovierung, Treppenhaus und Allgemeinflächen. Angebot anfragen.",
    h1: "Reinigungsfirma in Marzahn-Hellersdorf – für Wohnungen, Objekte und Gewerbeflächen",
    lead: "Nautilus Facility Cleaning übernimmt in Marzahn-Hellersdorf Reinigungsleistungen für Wohnungswechsel, Übergaben, Renovierungen, Treppenhäuser, Allgemeinflächen, Büros, Praxen und verwaltete Objekte. Jede Anfrage wird objektbezogen geprüft.",
    localText: "Marzahn-Hellersdorf ist geprägt von Wohnanlagen, Mieterwechseln, Eigentumswohnungen, Gewerbeflächen und laufendem Objektbedarf. Besonders relevant sind Auszugsreinigung, Grundreinigung, Treppenhausreinigung und Reinigung nach Renovierung in Marzahn, Hellersdorf, Biesdorf, Kaulsdorf und Mahlsdorf.",
    focus: ["Wohnungsübergabe", "Grundreinigung", "Treppenhausreinigung", "Hausverwaltungen"],
    areas: ["Marzahn", "Hellersdorf", "Biesdorf", "Kaulsdorf", "Mahlsdorf"],
  },
  {
    slug: "reinigungsfirma-pankow-berlin",
    name: "Pankow",
    title: "Reinigungsfirma Pankow Berlin | Praxis, Büro, Auszug & Objekt",
    description: "Reinigungsfirma in Berlin-Pankow für Praxisreinigung, Büroreinigung, Kanzleireinigung, Auszug, Übergabe, Treppenhaus und Hausverwaltungen.",
    h1: "Reinigungsfirma in Pankow Berlin – für Praxen, Büros, Wohnungen und verwaltete Objekte",
    lead: "Nautilus Facility Cleaning unterstützt in Pankow bei regelmäßiger Büro-, Praxis- und Kanzleireinigung sowie bei Reinigung nach Auszug, Übergabe, Renovierung, Grundreinigung, Treppenhausreinigung und Hausverwaltungsbedarf.",
    localText: "In Pankow treffen Wohnobjekte, Praxen, kleinere Büros, Kanzleien und Eigentümerstrukturen aufeinander. Relevante Ortsteile sind unter anderem Pankow, Prenzlauer Berg, Weißensee, Buch, Niederschönhausen, Heinersdorf und Karow. Die Seite dient als lokaler Einstieg, während die einzelnen Leistungsseiten den jeweiligen Reinigungsbedarf vertiefen.",
    focus: ["Praxisreinigung", "Büroreinigung", "Kanzleireinigung", "Auszug & Treppenhaus"],
    areas: ["Pankow", "Prenzlauer Berg", "Weißensee", "Buch", "Niederschönhausen", "Heinersdorf", "Karow"],
  },
  {
    slug: "reinigungsfirma-prenzlauer-berg-berlin",
    name: "Prenzlauer Berg",
    title: "Reinigungsfirma Prenzlauer Berg Berlin | Auszug, Praxis & Büro",
    description: "Reinigungsfirma in Prenzlauer Berg für Auszugsreinigung, Übergabereinigung, Praxisreinigung, Kanzleireinigung, Büroreinigung und Treppenhaus.",
    h1: "Reinigungsfirma in Prenzlauer Berg – für Auszug, Übergabe, Praxis, Büro und Treppenhaus",
    lead: "Nautilus Facility Cleaning unterstützt in Prenzlauer Berg bei Reinigung nach Auszug, Übergabereinigung, Renovierungsreinigung, Büroreinigung, Praxisreinigung, Kanzleireinigung, Treppenhausreinigung und Grundreinigung.",
    localText: "Prenzlauer Berg ist durch Altbauobjekte, Eigentumswohnungen, Praxen, kleine Büros, Kanzleien, Mieterwechsel und hohe Nutzungsfrequenz geprägt. Deshalb stehen hier Auszug, Übergabe, Praxisflächen, Kanzleien, Treppenhäuser und Renovierungsreinigung besonders im Fokus.",
    focus: ["Auszug & Übergabe", "Praxisreinigung", "Kanzlei & Büro", "Treppenhäuser"],
    areas: ["Helmholtzkiez", "Kollwitzkiez", "Winsviertel", "Bötzowviertel", "Gleimviertel", "Prenzlauer Berg"],
  },
  {
    slug: "reinigungsfirma-weissensee-berlin",
    name: "Weißensee",
    title: "Reinigungsfirma Weißensee Berlin | Treppenhaus, Auszug & Renovierung",
    description: "Reinigungsfirma in Berlin-Weißensee für Treppenhausreinigung, Hausverwaltungen, Renovierung, Auszug, Übergabe, Bauendreinigung und Grundreinigung.",
    h1: "Reinigungsfirma in Weißensee Berlin – für Wohnobjekte, Übergaben und Renovierung",
    lead: "Nautilus Facility Cleaning unterstützt in Weißensee bei Treppenhausreinigung, Reinigung für Hausverwaltungen, Auszugsreinigung, Übergabereinigung, Renovierungsreinigung, Bauendreinigung, Büroreinigung und Grundreinigung.",
    localText: "Weißensee verbindet Wohnobjekte, Altbau- und Neubauumfelder, Hausverwaltungen, Eigentümer und Renovierungsbedarf. Besonders relevant sind Treppenhausreinigung, Übergabereinigung, Reinigung nach Renovierung und objektbezogene Grundreinigung.",
    focus: ["Treppenhaus & Allgemeinflächen", "Hausverwaltungen", "Renovierung & Bauendreinigung", "Auszug & Übergabe"],
    areas: ["Weißensee", "Komponistenviertel", "Antonplatz", "Langhansstraße", "Berliner Allee", "Parkviertel"],
  },
  {
    slug: "reinigungsfirma-friedrichshain-kreuzberg-berlin",
    name: "Friedrichshain-Kreuzberg",
    title: "Reinigungsfirma Friedrichshain-Kreuzberg | Büro, Auszug & Übergabe",
    description: "Reinigungsfirma in Friedrichshain-Kreuzberg für Büroreinigung, Kanzlei, Auszug, Übergabe, Renovierung, Apartments, Grundreinigung und Gewerbeflächen.",
    h1: "Reinigungsfirma in Friedrichshain-Kreuzberg – für Gewerbe, Auszug, Übergabe und Objektbedarf",
    lead: "Nautilus Facility Cleaning unterstützt in Friedrichshain-Kreuzberg bei Büroreinigung, Kanzleireinigung, Auszugsreinigung, Übergabereinigung, Reinigung nach Renovierung, Apartmentreinigung, Grundreinigung und Sonderreinigung.",
    localText: "Friedrichshain-Kreuzberg hat hohe Fluktuation, viele Büros, Agenturen, Apartments, Gewerbeflächen und Wohnungswechsel. Deshalb sind schnelle Einschätzung, klare Leistungsabgrenzung und objektbezogene Umsetzung besonders wichtig.",
    focus: ["Büros & Agenturen", "Auszug & Übergabe", "Apartments", "Renovierung & Grundreinigung"],
    areas: ["Friedrichshain", "Kreuzberg", "Wrangelkiez", "Bergmannkiez", "Boxhagener Platz", "Ostkreuz", "Mehringdamm"],
  },
  {
    slug: "reinigungsfirma-berlin-mitte",
    name: "Berlin-Mitte",
    title: "Reinigungsfirma Berlin-Mitte | Kanzlei, Büro, Praxis & Übergabe",
    description: "Reinigungsfirma in Berlin-Mitte für Kanzleireinigung, Büroreinigung, Praxisreinigung, Auszug, Übergabe, Grundreinigung und repräsentative Räume.",
    h1: "Reinigungsfirma in Berlin-Mitte – für Kanzleien, Büros, Praxen und repräsentative Objekte",
    lead: "Nautilus Facility Cleaning unterstützt in Berlin-Mitte bei Kanzleireinigung, Büroreinigung, Praxisreinigung, Reinigung nach Auszug, Übergabereinigung, Grundreinigung, Renovierungsreinigung und Sonderreinigung.",
    localText: "In Berlin-Mitte stehen repräsentative Räume, Kanzleien, Beratungsbüros, Praxen, Gewerbeflächen und zentrale Wohnobjekte im Vordergrund. Reinigung muss hier diskret, strukturiert und passend zum laufenden Betrieb erfolgen.",
    focus: ["Kanzleien & Notariate", "Büros & Beratung", "Praxen", "Übergabe & Grundreinigung"],
    areas: ["Mitte", "Moabit", "Wedding", "Hansaviertel", "Tiergarten", "Alexanderplatz", "Invalidenstraße"],
  },
];

function renderPage(district) {
  const style = sharedStyle();
  const whatsapp = encodeURIComponent(`Hallo, ich suche eine Reinigung in ${district.name}. Ich sende Ihnen Bezirk, Fläche, Termin und Fotos.`);
  const serviceCards = serviceGroups.map((group) => ({
    title: group.title,
    text: `${group.text} Relevant in ${district.name}: ${district.focus.join(", ")}.`,
    link: group.links[0] ? { href: group.links[0][1], label: `${group.links[0][0]} ansehen` } : null,
  }));
  const linkCards = serviceGroups.flatMap((group) => group.links).map(([label, href]) => ({ title: label, text: `Mehr Details zur Leistung und zur objektbezogenen Einschätzung in Berlin.`, link: { href, label: "Leistungsseite öffnen" } }));
  const faq = [
    { q: `Bietet Nautilus Facility Cleaning Reinigung in ${district.name} an?`, a: `Ja. Wir prüfen Anfragen in ${district.name} objektbezogen – unter anderem für ${district.areas.slice(0, 5).join(", ")} und angrenzende Bereiche.` },
    { q: `Welche Reinigungsleistungen bieten Sie in ${district.name} an?`, a: "Wir bieten Reinigung nach Auszug, Übergabereinigung, Reinigung nach Renovierung, Bauendreinigung, Grundreinigung, Treppenhausreinigung, Allgemeinflächenreinigung, Büroreinigung, Praxisreinigung, Kanzleireinigung, Reinigung für Hausverwaltungen sowie Fenster- und Rahmenreinigung nach Abstimmung." },
    { q: `Wie läuft eine Anfrage für ${district.name} ab?`, a: "Für eine erste Einschätzung reichen Bezirk, Fläche, gewünschter Termin, Objektart und einige Fotos. Danach klären wir, ob ein direktes Angebot oder eine kurze Besichtigung sinnvoll ist." },
    { q: `Gibt es pauschale Preise für Reinigung in ${district.name}?`, a: "Nein. Der Aufwand hängt von Fläche, Zustand, Turnus, Leistungsumfang, Zugänglichkeit und Termin ab. Deshalb erstellen wir objektbezogene Angebote." },
    { q: `Übernehmen Sie auch kurzfristige Reinigungen in ${district.name}?`, a: "Kurzfristige Anfragen prüfen wir nach Kapazität, Lage und Umfang. Fotos helfen, schneller eine realistische Rückmeldung zu geben." },
  ];
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Nautilus Facility Cleaning",
    telephone: "+4917622844636",
    email,
    url: `${baseUrl}/${district.slug}/`,
    address: { "@type": "PostalAddress", addressLocality: "Berlin", addressCountry: "DE" },
    areaServed: [district.name, ...district.areas],
  }, null, 6);

  const html = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/images/reinigung-trans.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(district.title)}</title>
    <meta name="description" content="${esc(district.description)}" />
    <link rel="canonical" href="${baseUrl}/${district.slug}/" />
    <meta property="og:title" content="${esc(district.title)}" />
    <meta property="og:description" content="${esc(district.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${baseUrl}/${district.slug}/" />
    <meta property="og:site_name" content="Nautilus Facility Cleaning" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(district.title)}" />
    <meta name="twitter:description" content="${esc(district.description)}" />
    <script type="application/ld+json">${schema}</script>
    ${style}
  </head>
  <body>
    <header class="nav"><div class="nav-inner"><a class="brand" href="/">Nautilus Facility Cleaning</a><nav class="nav-links" aria-label="Navigation"><a href="/">Startseite</a><a href="/reinigung-nach-auszug-berlin/">Auszug</a><a href="/uebergabereinigung-berlin/">Übergabe</a><a href="/treppenhausreinigung-berlin/">Treppenhaus</a><a href="${contactHref}" onclick="${contactOnclick}">Kontakt</a></nav></div></header>
    <main>
      <section class="hero"><div class="container hero-grid"><div><div class="eyebrow">Reinigungsfirma ${district.name}</div><h1>${district.h1}</h1><p class="lead">${district.lead}</p><div class="hero-actions"><a class="button" href="${whatsappBase}?text=${whatsapp}">Fotos per WhatsApp senden</a><a class="button" href="${contactHref}" onclick="${contactOnclick}">Anfrageformular nutzen</a></div></div><aside class="hero-card"><strong>Alle relevanten Leistungen in ${district.name}.</strong><p>Wir nennen alle angebotenen Leistungsbereiche, gewichten sie aber passend zum Bezirk. So bleibt die Seite vollständig, lokal relevant und fachlich sauber.</p></aside></div></section>
      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Leistungen im Bezirk</div><h2>Reinigung in ${district.name}: vollständige Leistungsübersicht mit lokaler Priorisierung.</h2><p class="section-text">Nautilus Facility Cleaning bietet in ${district.name} alle relevanten Reinigungsleistungen an – von Auszug und Übergabe über Renovierung und Bauendreinigung bis zu Büro, Praxis, Kanzlei, Treppenhaus, Allgemeinflächen und Hausverwaltungen.</p></div><div class="grid">${renderCards(serviceCards)}</div></div></section>
      <section><div class="container"><div class="section-head"><div class="eyebrow">Lokaler Bezug</div><h2>${district.name}: Ortsteile, Objektarten und typische Reinigungsanlässe.</h2><p class="section-text">${district.localText}</p></div><div class="area-pills">${district.areas.map((area) => `<span class="area-pill">${area}</span>`).join("")}</div></div></section>
      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Für wen geeignet?</div><h2>Für private, gewerbliche und verwaltete Objekte in ${district.name}.</h2><p class="section-text">Unsere Bezirksseiten sind lokale Hubs. Die Detailtiefe zu jeder Leistung liegt auf den jeweiligen Leistungsseiten, damit Nutzer und Google eine klare Struktur erkennen.</p></div><div class="grid">${renderCards([
        { title: "Mieter, Vermieter und Eigentümer", text: "Für Auszug, Übergabe, Einzug, Neuvermietung, Leerstand, Renovierung und Grundreinigung." },
        { title: "Praxen, Kanzleien und Büros", text: "Für regelmäßige Reinigung sensibler, repräsentativer und gewerblicher Räume nach abgestimmtem Leistungsbild." },
        { title: "Hausverwaltungen und WEGs", text: "Für Treppenhäuser, Allgemeinflächen, Sonderreinigung, Objektbedarf und einzelne Liegenschaften." },
      ])}</div></div></section>
      <section><div class="container"><div class="section-head"><div class="eyebrow">Ablauf</div><h2>So läuft eine Anfrage für Reinigung in ${district.name} ab.</h2><p class="section-text">Senden Sie Bezirk, Fläche, gewünschtes Zeitfenster, Objektart und Fotos. Wir prüfen den Aufwand, stellen gezielte Rückfragen und klären, ob ein objektbezogenes Angebot direkt möglich ist oder eine kurze Besichtigung sinnvoll wäre.</p></div><div class="grid">${renderCards([
        { title: "1. Anfrage senden", text: "Am schnellsten mit Bezirk, Fläche, Termin, Objektart und Fotos vom aktuellen Zustand." },
        { title: "2. Bedarf einordnen", text: "Wir prüfen Zustand, Leistungsumfang, Zugänglichkeit, Turnus, Zeitfenster und gewünschtes Ergebnis." },
        { title: "3. Angebot oder Besichtigung", text: "Je nach Objekt erhalten Sie ein objektbezogenes Angebot oder wir empfehlen eine kurze Besichtigung." },
        { title: "4. Reinigung nach abgestimmtem Leistungsumfang", text: "Nach Freigabe erfolgt die Umsetzung nach klar vereinbartem Leistungsbild, Termin und Umfang." },
      ])}</div></div></section>
      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Leistungsseiten</div><h2>Alle Leistungen mit Details und sauberer Suchintention.</h2><p class="section-text">Diese Bezirksseite zeigt den lokalen Zugang. Die folgenden Leistungsseiten vertiefen den konkreten Bedarf.</p></div><div class="grid">${renderCards(linkCards)}</div></div></section>
      <section><div class="container"><div class="cta"><div><div class="eyebrow">Anfrage ${district.name}</div><h2>Objekt beschreiben und Einschätzung erhalten.</h2><p>Für eine erste Rückmeldung reichen Bezirk, Fläche, Termin und Fotos. Bei B2B-Objekten können zusätzlich Turnus, Zeitfenster und Leistungsumfang genannt werden.</p></div><div style="display:flex; gap:14px; flex-wrap:wrap; justify-content:flex-end;"><a class="button" href="${whatsappBase}?text=${whatsapp}">Fotos per WhatsApp senden</a><a class="button" href="${contactHref}" onclick="${contactOnclick}">Anfrageformular nutzen</a></div></div></div></section>
      <section id="faq" class="white"><div class="container"><div class="section-head"><div class="eyebrow">FAQ</div><h2>Häufige Fragen zur Reinigungsfirma in ${district.name}.</h2></div><div class="faq">${renderFaq(faq)}</div></div></section>
    </main>
    <footer><div class="container"><div class="footer-grid"><div><div class="footer-title">Nautilus Facility Cleaning</div><p style="margin:0; color:#7E7367; line-height:1.75;">Objektbezogene Reinigungsfirma in Berlin für Auszug, Übergabe, Renovierung, Gewerbe, Praxen, Kanzleien, Treppenhäuser und Hausverwaltungen.</p></div><div><div class="footer-title">Leistungen</div><div class="footer-links"><a href="/reinigung-nach-auszug-berlin/">Reinigung nach Auszug</a><a href="/uebergabereinigung-berlin/">Übergabereinigung</a><a href="/reinigung-nach-renovierung-berlin/">Reinigung nach Renovierung</a><a href="/treppenhausreinigung-berlin/">Treppenhausreinigung</a></div></div><div><div class="footer-title">Kontakt</div><div class="footer-links"><a href="tel:+4917622844636">${phone}</a><a href="mailto:${email}">${email}</a><a href="${contactHref}" onclick="${contactOnclick}">Anfrageformular nutzen</a><a href="/">Startseite</a></div></div></div><div class="footer-meta"><span>${district.name}</span><span>Berlin</span><span><a href="/impressum/">Impressum</a></span><span><a href="/datenschutz/">Datenschutz</a></span></div></div></footer>
  </body>
</html>`;
  mkdirSync(`dist/${district.slug}`, { recursive: true });
  writeFileSync(`dist/${district.slug}/index.html`, html, "utf8");
  console.log(`District SEO page generated: dist/${district.slug}/index.html`);
}

for (const district of districts) renderPage(district);
console.log("District SEO pages generated.");
