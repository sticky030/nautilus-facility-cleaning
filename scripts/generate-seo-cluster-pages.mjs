import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const baseUrl = "https://nautilus-facility.de";
const contactHref = "https://nautilus-facility.de/?kontakt=1#kontakt";
const contactOnclick = "sessionStorage.setItem('scrollToContact', '1')";
const whatsappPhotoHref = "https://wa.me/4917622844636?text=Hallo%2C%20ich%20m%C3%B6chte%20eine%20Reinigungsanfrage%20f%C3%BCr%20Berlin%20stellen.%20Ich%20sende%20Ihnen%20Bezirk%2C%20Fl%C3%A4che%2C%20Termin%20und%20Fotos.";
const whatsappContactHref = "https://wa.me/4917622844636?text=Hallo%2C%20ich%20m%C3%B6chte%20Nautilus%20Facility%20Cleaning%20kontaktieren.%20Bitte%20melden%20Sie%20sich%20bei%20mir.";

function sharedStyle() {
  const html = readFileSync("dist/praxisreinigung-berlin/index.html", "utf8");
  const match = html.match(/<style>[\s\S]*?<\/style>/);
  if (!match) throw new Error("Shared style not found");
  return match[0];
}

function card(title, text, link) {
  return `<article class="card" style="display:flex; flex-direction:column; min-height:250px;"><h3>${title}</h3><p>${text}</p>${link ? `<p style="margin-top:auto;"><a href="${link.href}" ${link.onclick ? `onclick="${link.onclick}"` : ""} style="color:#B79B6C; font-weight:750; letter-spacing:.08em; text-transform:uppercase; font-size:12px;">${link.label}</a></p>` : ""}</article>`;
}

function renderFaq(faq) {
  return faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("");
}

function renderList(items) {
  return `<div class="area-pills">${items.map((item) => `<span class="area-pill">${item}</span>`).join("")}</div>`;
}

function layoutCss() {
  return `
    <style>
      .cluster-grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; align-items: stretch; }
      .cluster-grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; align-items: stretch; }
      .cluster-grid-2 .card, .cluster-grid-3 .card { height: 100%; display: flex; flex-direction: column; }
      .cluster-grid-2 .card p:last-child, .cluster-grid-3 .card p:last-child { margin-top: auto; }
      .info-band { border: 1px solid #E5D9C8; background:#fff; border-radius:28px; padding:34px; box-shadow:0 24px 70px rgba(60,48,35,.07); }
      .info-band strong { display:block; color:#2C2C2C; font-size:18px; margin-bottom:10px; }
      .info-band p { color:#7E7367; line-height:1.8; margin:0; }
      @media(max-width:980px){ .cluster-grid-3{grid-template-columns:repeat(2,minmax(0,1fr)) !important;} }
      @media(max-width:760px){ .cluster-grid-2,.cluster-grid-3{grid-template-columns:1fr !important;} }
    </style>`;
}

function pageShell({ slug, title, description, heroEyebrow, h1, lead, intro, heroCardTitle, heroCardText, body, faq, schemaType = "WebPage" }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: title,
    description,
    url: `${baseUrl}/${slug}/`,
    publisher: { "@type": "Organization", name: "Nautilus Facility Cleaning", url: baseUrl },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: h1, item: `${baseUrl}/${slug}/` },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };

  const html = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/images/reinigung-trans.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${baseUrl}/${slug}/" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${baseUrl}/${slug}/" />
    <meta property="og:site_name" content="Nautilus Facility Cleaning" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
    ${sharedStyle()}
    ${layoutCss()}
  </head>
  <body>
    <header class="nav"><div class="nav-inner"><a class="brand" href="/">Nautilus Facility Cleaning</a><nav class="nav-links" aria-label="Navigation"><a href="/">Startseite</a><a href="/kontakt/">Kontakt</a><a href="/ueber-uns/">Über uns</a><a href="${contactHref}" onclick="${contactOnclick}">Anfrage</a></nav></div></header>
    <main>
      <section class="hero"><div class="container hero-grid"><div><div class="eyebrow">${heroEyebrow}</div><h1>${h1}</h1><p class="lead">${lead}</p><p>${intro}</p><div class="hero-actions"><a class="button" href="${whatsappPhotoHref}">Fotos per WhatsApp senden</a><a class="button" href="${contactHref}" onclick="${contactOnclick}">Anfrageformular nutzen</a></div></div><aside class="hero-card"><strong>${heroCardTitle}</strong><p>${heroCardText}</p></aside></div></section>
      ${body}
      <section><div class="container"><div class="cta"><div><div class="eyebrow">Anfrage</div><h2>Reinigungsbedarf einschätzen lassen.</h2><p>Für eine erste Rückmeldung reichen Bezirk, Objektart, Fläche, Termin und einige Angaben zum Zustand. Bei sichtbarem Reinigungsbedarf beschleunigen Fotos die Einordnung.</p></div><div style="display:flex; gap:14px; flex-wrap:wrap; justify-content:flex-end;"><a class="button" href="${whatsappPhotoHref}">Fotos per WhatsApp senden</a><a class="button" href="${contactHref}" onclick="${contactOnclick}">Anfrageformular nutzen</a></div></div></div></section>
      <section id="faq" class="white"><div class="container"><div class="section-head"><div class="eyebrow">FAQ</div><h2>Häufige Fragen.</h2></div><div class="faq">${renderFaq(faq)}</div></div></section>
    </main>
    <footer><div class="container"><div class="footer-grid"><div><div class="footer-title">Nautilus Facility Cleaning</div><p style="margin:0; color:#7E7367; line-height:1.75;">Objektbezogene Reinigungsfirma in Berlin für Auszug, Übergabe, Renovierung, Gewerbe, Praxen, Kanzleien, Treppenhäuser und Hausverwaltungen.</p></div><div><div class="footer-title">Leistungen</div><div class="footer-links"><a href="/reinigung-nach-auszug-berlin/">Reinigung nach Auszug</a><a href="/uebergabereinigung-berlin/">Übergabereinigung</a><a href="/treppenhausreinigung-berlin/">Treppenhausreinigung</a><a href="/reinigung-kosten-berlin/">Reinigungskosten</a></div></div><div><div class="footer-title">Kontakt</div><div class="footer-links"><a href="/kontakt/">Kontakt</a><a href="tel:+4917622844636">0176 2284 4636</a><a href="mailto:kontakt@nautilus-facility.de">kontakt@nautilus-facility.de</a><a href="/ueber-uns/">Über uns</a></div></div></div></div></footer>
  </body>
</html>`;

  mkdirSync(`dist/${slug}`, { recursive: true });
  writeFileSync(`dist/${slug}/index.html`, html, "utf8");
  console.log(`SEO cluster page generated: dist/${slug}/index.html`);
}

pageShell({
  slug: "reinigung-kosten-berlin",
  title: "Reinigungskosten Berlin | Objektbezogene Kalkulation",
  description: "Was beeinflusst Reinigungskosten in Berlin? Nautilus Facility Cleaning erklärt Preisfaktoren für Auszug, Übergabe, Renovierung, Grundreinigung, Treppenhaus und Gewerbe.",
  heroEyebrow: "Reinigungskosten Berlin",
  h1: "Reinigungskosten in Berlin – objektbezogen kalkuliert.",
  lead: "Reinigungskosten hängen nicht nur von Quadratmetern ab. Entscheidend sind Objektart, Zustand, Leistungsumfang, Zugang, Zeitfenster und das gewünschte Ergebnis.",
  intro: "Nautilus Facility Cleaning kalkuliert Reinigungsleistungen objektbezogen. Das schützt Auftraggeber vor unklaren Pauschalen und sorgt dafür, dass Umfang, Erwartung und Aufwand vor Beginn sauber abgestimmt sind.",
  heroCardTitle: "Keine pauschale Scheinpräzision.",
  heroCardText: "Ein realistisches Angebot entsteht erst, wenn Objekt, Zustand und Leistungsumfang klar sind. Genau dafür strukturieren wir die Anfrage vorab.",
  faq: [
    ["Kann man Reinigungskosten pauschal nennen?", "Nur sehr eingeschränkt. Fläche, Zustand, Reinigungsart, Zugang, Zeitfenster und gewünschtes Ergebnis beeinflussen den Aufwand deutlich."],
    ["Warum nennt Nautilus Facility Cleaning keine starren Pauschalpreise?", "Weil pauschale Preise häufig zu unklaren Erwartungen führen. Wir kalkulieren lieber objektbezogen und nachvollziehbar."],
    ["Welche Angaben brauche ich für eine Preiseinschätzung?", "Bezirk, Objektart, Fläche, Termin, Zustand, Leistungsumfang und Fotos helfen bei einer realistischen Einschätzung."],
    ["Sind Fotos für ein Angebot hilfreich?", "Ja. Besonders bei Auszug, Übergabe, Renovierung, Bauendreinigung und Grundreinigung helfen Fotos, den Aufwand schneller einzuordnen."],
    ["Gibt es auch Angebote für regelmäßige Reinigung?", "Ja. Für Büros, Praxen, Kanzleien, Treppenhäuser und Allgemeinflächen prüfen wir Turnus, Zeitfenster und Leistungsumfang."],
  ],
  body: `
      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Preisfaktoren</div><h2>Was Reinigungskosten in Berlin beeinflusst.</h2><p class="section-text">Der Preis einer Reinigung entsteht aus mehreren Faktoren. Ein kleiner Raum mit starkem Reinigungsbedarf kann aufwendiger sein als eine größere, gut vorbereitete Fläche. Deshalb ist eine saubere Einordnung vorab der professionellere Weg.</p></div><div class="grid cluster-grid-2">${[
        card("Fläche und Objektart", "Wohnung, Treppenhaus, Büro, Praxis, Kanzlei oder Baustellenbereich haben unterschiedliche Anforderungen. Entscheidend ist nicht nur die Größe, sondern auch die Nutzung und Flächenstruktur."),
        card("Zustand und Verschmutzung", "Leichte Unterhaltsreinigung, Übergabezustand, Renovierungsstaub, Bauverschmutzung oder intensive Grundreinigung führen zu sehr unterschiedlichen Aufwänden."),
        card("Leistungsumfang", "Böden, Sanitär, Küche, Kontaktflächen, Fenster, Rahmen, Türen, Heizkörper, Treppen, Aufzug oder Allgemeinflächen müssen klar abgegrenzt werden."),
        card("Termin, Zugang und Zeitfenster", "Kurzfristige Termine, eingeschränkter Zugang, enge Zeitfenster oder Arbeiten außerhalb normaler Zeiten beeinflussen Planung und Aufwand."),
      ].join("")}</div></div></section>
      <section><div class="container"><div class="section-head"><div class="eyebrow">Reinigungsarten</div><h2>Unterschiedliche Leistungen, unterschiedliche Kalkulation.</h2></div><div class="grid cluster-grid-3">${[
        card("Auszug & Übergabe", "Bei Auszug und Übergabe zählt der aktuelle Zustand. Küche, Bad, Böden, Fenster, Rahmen und schwer erreichbare Bereiche beeinflussen den Aufwand deutlich.", { href: "/reinigung-nach-auszug-berlin/", label: "Auszug ansehen" }),
        card("Renovierung & Bauendreinigung", "Nach Renovierung, Malerarbeiten, Bodenarbeiten oder Bauarbeiten geht es häufig um Staub, Rückstände, Rahmen, Kanten und eine übergabefähige Gesamtwirkung.", { href: "/reinigung-nach-renovierung-berlin/", label: "Renovierung ansehen" }),
        card("Treppenhaus & Gewerbe", "Bei Treppenhäusern, Büros, Praxen und Kanzleien sind Turnus, Zeitfenster, Leistungsbild, Kontaktflächen und Zugänglichkeit die zentralen Kostenfaktoren.", { href: "/treppenhausreinigung-berlin/", label: "Treppenhaus ansehen" }),
      ].join("")}</div></div></section>
      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Einordnung</div><h2>Welche Informationen für eine realistische Einschätzung helfen.</h2><p class="section-text">Je klarer die Ausgangslage beschrieben ist, desto schneller kann der Aufwand eingeordnet werden. Fotos ersetzen nicht immer eine Besichtigung, beschleunigen aber viele Anfragen deutlich.</p></div>${renderList(["Bezirk", "Objektart", "Fläche", "gewünschter Termin", "aktueller Zustand", "Leistungsumfang", "Fotos", "Zugang / Zeitfenster", "einmalig oder regelmäßig", "besondere Bereiche"] )}</div></section>
      <section><div class="container"><div class="info-band"><strong>Professionelle Kalkulation ist kein Preistrick, sondern Risikominimierung.</strong><p>Wenn Leistungsumfang und Erwartung vorher sauber geklärt sind, entstehen weniger Missverständnisse. Auftraggeber erhalten ein nachvollziehbares Angebot, und die Umsetzung kann mit realistischem Zeit- und Leistungsrahmen geplant werden.</p></div></div></section>
  `,
});

pageShell({
  slug: "checkliste-wohnungsuebergabe-berlin",
  title: "Checkliste Wohnungsübergabe Berlin | Reinigung & Vorbereitung",
  description: "Checkliste für die Wohnungsübergabe in Berlin: Reinigung, Fotos, Übergabeprotokoll, Küche, Bad, Fenster, Böden und professionelle Übergabereinigung.",
  heroEyebrow: "Checkliste Wohnungsübergabe Berlin",
  h1: "Checkliste Wohnungsübergabe in Berlin – sauber vorbereitet übergeben.",
  lead: "Eine Wohnungsübergabe steht und fällt mit Vorbereitung, Zustand und klarer Dokumentation. Reinigung ist dabei ein zentraler Faktor.",
  intro: "Diese Checkliste hilft Mietern, Eigentümern und Vermietern, typische Übergabepunkte strukturiert zu prüfen. Bei sichtbarem Reinigungsbedarf kann Nautilus Facility Cleaning die Übergabereinigung objektbezogen einordnen.",
  heroCardTitle: "Übergabe ist kein Bauchgefühl.",
  heroCardText: "Wer Zustand, Fotos, Schlüssel, Protokoll und Reinigung vorbereitet, reduziert Reibung beim Termin deutlich.",
  schemaType: "Article",
  faq: [
    ["Was sollte vor einer Wohnungsübergabe gereinigt werden?", "Typische Bereiche sind Böden, Küche, Bad, Fenster, Rahmen, Türen, Heizkörper, Balkon, Abstellflächen und sichtbare Kontaktflächen."],
    ["Was bedeutet übergabebereit?", "Übergabebereit bedeutet, dass die Wohnung in einem Zustand ist, der zur vereinbarten Rückgabe passt. Die konkrete Erwartung hängt vom Mietverhältnis, Zustand und Vereinbarungen ab."],
    ["Wann ist eine professionelle Übergabereinigung sinnvoll?", "Wenn wenig Zeit bleibt, der Zustand unklar ist, Küche oder Bad intensiver gereinigt werden müssen oder eine saubere Gesamtwirkung wichtig ist."],
    ["Sollte ich Fotos vor der Übergabe machen?", "Ja. Fotos helfen bei der Dokumentation und erleichtern auch eine Einschätzung des Reinigungsaufwands."],
    ["Übernimmt Nautilus Facility Cleaning Übergabereinigung in Berlin?", "Ja. Wir prüfen Übergabereinigungen in Berlin objektbezogen nach Fläche, Zustand, Termin und gewünschtem Umfang."],
  ],
  body: `
      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Vorbereitung</div><h2>Die wichtigsten Punkte vor dem Übergabetermin.</h2><p class="section-text">Eine gute Vorbereitung reduziert Stress am Übergabetag. Entscheidend sind nicht nur saubere Räume, sondern auch Zugänglichkeit, Dokumentation und ein realistischer Blick auf Bereiche, die häufig übersehen werden.</p></div><div class="grid cluster-grid-2">${[
        card("Räume und Böden", "Alle Räume sollten frei zugänglich sein. Böden, Sockelleisten, Ecken, Türbereiche und Laufwege prägen den ersten Eindruck und sollten vor der Übergabe sorgfältig geprüft werden."),
        card("Küche und Sanitär", "Küche und Bad sind kritische Bereiche. Armaturen, Fliesen, Spülbecken, Ablagen, Schränke, Duschbereich, WC und sichtbare Kalk- oder Fettrückstände fallen bei Übergaben schnell auf."),
        card("Fenster, Rahmen und Türen", "Fensterflächen, Rahmen, Griffe, Türen, Zargen und Heizkörper werden häufig unterschätzt. Gerade Rahmen und Kanten sammeln bei Auszug und Renovierung sichtbare Rückstände."),
        card("Fotos und Protokoll", "Dokumentieren Sie den Zustand vor der Übergabe mit Fotos. Zählerstände, Schlüssel, erkennbare Mängel und besondere Absprachen sollten für den Termin vorbereitet sein."),
      ].join("")}</div></div></section>
      <section><div class="container"><div class="section-head"><div class="eyebrow">Checkliste</div><h2>Bereiche, die vor der Übergabe geprüft werden sollten.</h2></div>${renderList(["Böden", "Sockelleisten", "Küche", "Bad", "Fenster", "Rahmen", "Türen", "Heizkörper", "Balkon", "Keller / Abstellraum", "Zählerstände", "Schlüssel", "Übergabeprotokoll", "Fotos"] )}</div></section>
      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Einordnung</div><h2>Wann professionelle Reinigung sinnvoll ist.</h2></div><div class="grid cluster-grid-3">${[
        card("Zeitdruck vor Übergabe", "Wenn Auszug, Transport, Renovierung und Übergabetermin eng beieinander liegen, ist professionelle Reinigung oft der sauberere Weg, um den Termin nicht zu gefährden.", { href: "/uebergabereinigung-berlin/", label: "Übergabe ansehen" }),
        card("Sichtbare Rückstände", "Kalk, Fett, Staub, Renovierungsspuren, Rahmenverschmutzung oder stark genutzte Sanitärbereiche lassen sich nicht immer mit kurzer Endreinigung beheben.", { href: "/grundreinigung-berlin/", label: "Grundreinigung ansehen" }),
        card("Objekt soll direkt weitergenutzt werden", "Bei Neuvermietung, Verkauf oder Anschlussnutzung zählt die Gesamtwirkung. Reinigung unterstützt einen geordneten, professionellen Übergabezustand.", { href: "/reinigung-nach-auszug-berlin/", label: "Auszug ansehen" }),
      ].join("")}</div></div></section>
      <section><div class="container"><div class="info-band"><strong>Besenrein ist nicht automatisch übergabebereit.</strong><p>Was im Einzelfall erwartet wird, hängt von Vereinbarungen und Zustand ab. Für eine professionelle Einschätzung prüfen wir deshalb Objekt, Fotos, Flächen und gewünschtes Ergebnis statt pauschal zu urteilen.</p></div></div></section>
  `,
});

pageShell({
  slug: "treppenhausreinigung-kosten-berlin",
  title: "Treppenhausreinigung Kosten Berlin | Objektbezogenes Angebot",
  description: "Was beeinflusst die Kosten der Treppenhausreinigung in Berlin? Faktoren: Etagen, Parteien, Turnus, Allgemeinflächen, Aufzug, Handläufe, Keller und Sonderreinigung.",
  heroEyebrow: "Treppenhausreinigung Kosten Berlin",
  h1: "Treppenhausreinigung Kosten in Berlin – objektbezogen einschätzen.",
  lead: "Die Kosten einer Treppenhausreinigung hängen von Objektgröße, Etagen, Parteien, Turnus, Flächenstruktur, Zugänglichkeit und gewünschtem Leistungsumfang ab.",
  intro: "Nautilus Facility Cleaning erstellt Angebote für Treppenhäuser und Allgemeinflächen objektbezogen. So wird klar, welche Bereiche enthalten sind, welcher Turnus sinnvoll ist und wo Sonderbedarf separat abgestimmt werden sollte.",
  heroCardTitle: "Für Hausverwaltungen, WEGs und Eigentümer.",
  heroCardText: "Treppenhausreinigung muss zum Objektalltag passen: regelmäßig, nachvollziehbar, klar abgestimmt und wirtschaftlich sinnvoll geplant.",
  faq: [
    ["Wovon hängen die Kosten einer Treppenhausreinigung ab?", "Von Etagen, Parteien, Flächen, Turnus, Verschmutzungsgrad, Zugang, Aufzug, Kellerbereichen, Handläufen und Sonderleistungen."],
    ["Ist eine Besichtigung sinnvoll?", "Bei verwalteten Objekten ist eine kurze Besichtigung oft sinnvoll, weil Treppenhaus, Eingänge und Allgemeinflächen sehr unterschiedlich aufgebaut sind."],
    ["Welche Bereiche können enthalten sein?", "Typisch sind Treppen, Podeste, Eingangsbereich, Handläufe, Briefkastenbereich, Aufzug, Kellerzugänge und weitere Allgemeinflächen nach Abstimmung."],
    ["Kann der Turnus angepasst werden?", "Ja. Je nach Objekt kann wöchentlich, zweiwöchentlich oder individuell gereinigt werden. Entscheidend sind Nutzung, Bewohnerstruktur und gewünschtes Erscheinungsbild."],
    ["Erstellt Nautilus Facility Cleaning Angebote für Hausverwaltungen?", "Ja. Wir prüfen einzelne Liegenschaften, Treppenhäuser, Allgemeinflächen, Sonderreinigungen und Übergabebedarf objektbezogen."],
  ],
  body: `
      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Kostenfaktoren</div><h2>Was den Aufwand im Treppenhaus bestimmt.</h2><p class="section-text">Treppenhäuser unterscheiden sich stark. Ein gepflegtes kleines Objekt mit wenigen Parteien benötigt eine andere Planung als ein stark frequentiertes Mehrparteienhaus mit Aufzug, Kellerzugängen und Eingangsbereich.</p></div><div class="grid cluster-grid-2">${[
        card("Etagen und Parteien", "Anzahl der Etagen, Podeste, Wohneinheiten und Laufwege beeinflussen den Zeitaufwand. Auch die Frequenz der Nutzung spielt eine Rolle."),
        card("Turnus und Leistungsbild", "Wöchentliche Reinigung, zweiwöchentlicher Turnus oder objektbezogene Intervalle sollten zur Nutzung und zum gewünschten Erscheinungsbild passen."),
        card("Allgemeinflächen", "Eingänge, Briefkästen, Aufzug, Kellerzugänge, Handläufe, Glasflächen und Nebenbereiche müssen klar definiert werden, damit der Umfang nachvollziehbar bleibt."),
        card("Sonderbedarf", "Starke Verschmutzung, Grundreinigung, Renovierungsspuren, Müllräume oder zusätzliche Fenster- und Rahmenreinigung werden separat eingeordnet."),
      ].join("")}</div></div></section>
      <section><div class="container"><div class="section-head"><div class="eyebrow">Objektprüfung</div><h2>Welche Angaben für ein Angebot wichtig sind.</h2></div>${renderList(["Adresse / Bezirk", "Anzahl Etagen", "Anzahl Parteien", "Eingangsbereich", "Aufzug", "Kellerzugänge", "Handläufe", "Fenster / Glas", "gewünschter Turnus", "aktueller Zustand", "Zugangslösung", "Sonderflächen"] )}</div></section>
      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Für Verwaltungen</div><h2>Warum objektbezogene Angebote bei Treppenhäusern sinnvoll sind.</h2></div><div class="grid cluster-grid-3">${[
        card("Klare Leistungsabgrenzung", "Vor Beginn wird definiert, welche Flächen, Bauteile und Zusatzbereiche enthalten sind. Das reduziert Missverständnisse im laufenden Objektbetrieb.", { href: "/treppenhausreinigung-berlin/", label: "Treppenhaus ansehen" }),
        card("Planbarer Turnus", "Ein sauber abgestimmter Turnus sorgt dafür, dass Eingangsbereiche, Laufwege und Kontaktflächen regelmäßig betreut werden, ohne den Umfang unnötig aufzublähen.", { href: "/hausverwaltungen-berlin/", label: "Hausverwaltung ansehen" }),
        card("Sonderreinigung steuerbar", "Grundreinigung, Renovierungsspuren oder Zusatzflächen können gezielt eingeordnet werden, statt sie unklar in die laufende Reinigung zu mischen.", { href: "/grundreinigung-berlin/", label: "Grundreinigung ansehen" }),
      ].join("")}</div></div></section>
      <section><div class="container"><div class="info-band"><strong>Ein guter Preis entsteht aus einem klaren Leistungsbild.</strong><p>Gerade bei Treppenhäusern ist entscheidend, dass Turnus, Flächen, Zugang und Sonderbedarf sauber definiert sind. So bleibt die Reinigung im Objektalltag nachvollziehbar und planbar.</p></div></div></section>
  `,
});

console.log("SEO cluster pages generated.");
