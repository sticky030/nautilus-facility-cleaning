import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const baseUrl = "https://nautilus-facility.de";
const contactHref = "https://nautilus-facility.de/?kontakt=1#kontakt";
const contactOnclick = "sessionStorage.setItem('scrollToContact', '1')";
const whatsappPhotoHref = "https://wa.me/4917622844636?text=Hallo%2C%20ich%20m%C3%B6chte%20eine%20Reinigungsanfrage%20f%C3%BCr%20Berlin%20stellen.%20Ich%20sende%20Ihnen%20Bezirk%2C%20Fl%C3%A4che%2C%20Termin%20und%20Fotos.";

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

function renderChecklist(items) {
  return `<div class="cluster-checklist">${items.map((item) => `<article class="cluster-checkitem"><span>${item}</span></article>`).join("")}</div>`;
}

function layoutCss() {
  return `
    <style>
      .cluster-grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; align-items: stretch; }
      .cluster-grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; align-items: stretch; }
      .cluster-grid-2 .card, .cluster-grid-3 .card { height: 100%; display: flex; flex-direction: column; }
      .cluster-grid-2 .card p:last-child, .cluster-grid-3 .card p:last-child { margin-top: auto; }
      .cluster-checklist {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 16px;
        margin-top: 34px;
      }
      .cluster-checkitem {
        min-height: 88px;
        border: 1px solid #E5D9C8;
        border-radius: 22px;
        background: linear-gradient(135deg, #FFFFFF 0%, #FCFBF8 100%);
        display: flex;
        align-items: center;
        padding: 20px 22px;
        box-shadow: 0 18px 48px rgba(60,48,35,.055);
      }
      .cluster-checkitem span {
        color: #2C2C2C;
        font-size: 15px;
        line-height: 1.45;
        font-weight: 760;
      }
      .info-band { border: 1px solid #E5D9C8; background:#fff; border-radius:28px; padding:34px; box-shadow:0 24px 70px rgba(60,48,35,.07); }
      .info-band strong { display:block; color:#2C2C2C; font-size:18px; margin-bottom:10px; }
      .info-band p { color:#7E7367; line-height:1.8; margin:0; }
      @media(max-width:980px){ .cluster-grid-3{grid-template-columns:repeat(2,minmax(0,1fr)) !important;} .cluster-checklist{grid-template-columns:repeat(2,minmax(0,1fr));} }
      @media(max-width:760px){ .cluster-grid-2,.cluster-grid-3{grid-template-columns:1fr !important;} .cluster-checklist{grid-template-columns:1fr;} .cluster-checkitem{min-height:0;} }
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
  lead: "Reinigungskosten in Berlin entstehen nicht aus einer Quadratmeterzahl allein. Entscheidend sind Objektart, Zustand, Reinigungsziel, Leistungsumfang, Zugänglichkeit, Zeitfenster und die Frage, ob eine Fläche nur gepflegt oder wirklich übergabefähig vorbereitet werden soll.",
  intro: "Nautilus Facility Cleaning kalkuliert Reinigungsleistungen objektbezogen und nachvollziehbar. So werden Umfang, Erwartung und Aufwand vor Beginn sauber abgegrenzt – ohne starre Preisversprechen, die bei Zustand, Termin oder Zusatzflächen später nicht tragen.",
  heroCardTitle: "Objektbezogene Kalkulation statt Pauschalversprechen.",
  heroCardText: "Ein belastbares Angebot braucht Kontext: Objektart, Zustand, Flächenstruktur, Termin, Zugang und gewünschtes Ergebnis. Genau diese Punkte strukturieren wir vor der Kalkulation.",
  faq: [
    ["Kann man Reinigungskosten pauschal nennen?", "Nur sehr eingeschränkt. Fläche, Zustand, Reinigungsart, Zugang, Zeitfenster und gewünschtes Ergebnis beeinflussen den Aufwand deutlich."],
    ["Warum nennt Nautilus Facility Cleaning keine starren Pauschalpreise?", "Weil pauschale Preise häufig zu unklaren Erwartungen führen. Wir kalkulieren lieber objektbezogen und nachvollziehbar."],
    ["Welche Angaben brauche ich für eine Preiseinschätzung?", "Bezirk, Objektart, Fläche, Termin, Zustand, Leistungsumfang und Fotos helfen bei einer realistischen Einschätzung."],
    ["Sind Fotos für ein Angebot hilfreich?", "Ja. Besonders bei Auszug, Übergabe, Renovierung, Bauendreinigung und Grundreinigung helfen Fotos, den Aufwand schneller einzuordnen."],
    ["Gibt es auch Angebote für regelmäßige Reinigung?", "Ja. Für Büros, Praxen, Kanzleien, Treppenhäuser und Allgemeinflächen prüfen wir Turnus, Zeitfenster und Leistungsumfang."],
  ],
  body: `
      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Preisfaktoren</div><h2>Was Reinigungskosten in Berlin beeinflusst.</h2><p class="section-text">Ein kleiner Raum mit starkem Reinigungsbedarf kann mehr Aufwand verursachen als eine größere, gut vorbereitete Fläche. Deshalb betrachten wir nicht nur Quadratmeter, sondern den tatsächlichen Zustand, die Nutzung, den Leistungsumfang und das Ziel der Reinigung.</p></div><div class="grid cluster-grid-2">${[
        card("Fläche und Objektart", "Wohnung, Treppenhaus, Büro, Praxis, Kanzlei oder Baustellenbereich haben unterschiedliche Anforderungen. Entscheidend sind Flächenstruktur, Nutzung, Material, Möblierung, Zugänglichkeit und die Frage, ob es um laufende Pflege, Übergabe oder Sonderreinigung geht."),
        card("Zustand und Verschmutzung", "Leichte Unterhaltsreinigung, Übergabezustand, Renovierungsstaub, Bauverschmutzung, Kalk, Fett oder intensive Grundreinigung liegen operativ weit auseinander. Der sichtbare Zustand entscheidet über Zeit, Mittel und Ablauf."),
        card("Leistungsumfang", "Böden, Sanitär, Küche, Kontaktflächen, Fenster, Rahmen, Türen, Heizkörper, Treppen, Aufzug und Allgemeinflächen müssen klar definiert sein. Nur so ist transparent, was enthalten ist und was separat abgestimmt wird."),
        card("Termin, Zugang und Zeitfenster", "Kurzfristige Termine, eingeschränkter Zugang, enge Zeitfenster, Schlüsselorganisation oder Arbeiten außerhalb normaler Zeiten beeinflussen Planung, Einsatzlogik und Aufwand. Diese Punkte gehören in die Einschätzung."),
      ].join("")}</div></div></section>
      <section><div class="container"><div class="section-head"><div class="eyebrow">Reinigungsarten</div><h2>Unterschiedliche Leistungen, unterschiedliche Kalkulation.</h2></div><div class="grid cluster-grid-3">${[
        card("Auszug & Übergabe", "Bei Auszug und Übergabe zählt der aktuelle Zustand. Küche, Bad, Böden, Fenster, Rahmen und schwer erreichbare Bereiche beeinflussen den Aufwand deutlich.", { href: "/reinigung-nach-auszug-berlin/", label: "Auszug ansehen" }),
        card("Renovierung & Bauendreinigung", "Nach Renovierung, Malerarbeiten, Bodenarbeiten oder Bauarbeiten geht es häufig um Staub, Rückstände, Rahmen, Kanten und eine übergabefähige Gesamtwirkung.", { href: "/reinigung-nach-renovierung-berlin/", label: "Renovierung ansehen" }),
        card("Treppenhaus & Gewerbe", "Bei Treppenhäusern, Büros, Praxen und Kanzleien sind Turnus, Zeitfenster, Leistungsbild, Kontaktflächen und Zugänglichkeit die zentralen Kostenfaktoren.", { href: "/treppenhausreinigung-berlin/", label: "Treppenhaus ansehen" }),
      ].join("")}</div></div></section>
      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Einordnung</div><h2>Welche Informationen für eine realistische Einschätzung helfen.</h2><p class="section-text">Je klarer die Ausgangslage beschrieben ist, desto schneller kann der Aufwand eingeordnet werden. Fotos ersetzen nicht immer eine Besichtigung, beschleunigen aber viele Anfragen deutlich.</p></div>${renderChecklist(["Bezirk", "Objektart", "Fläche", "gewünschter Termin", "aktueller Zustand", "Leistungsumfang", "Fotos", "Zugang und Zeitfenster", "einmalig oder regelmäßig", "besondere Bereiche"] )}</div></section>
      <section><div class="container"><div class="info-band"><strong>Ein sauberer Preis entsteht aus einem klaren Leistungsbild.</strong><p>Wenn Leistungsumfang, Zustand und Erwartung vorab sauber geklärt sind, sinkt das Risiko für Missverständnisse deutlich. Auftraggeber erhalten ein nachvollziehbares Angebot, und die Umsetzung kann mit realistischem Zeit- und Leistungsrahmen geplant werden.</p></div></div></section>
  `,
});

pageShell({
  slug: "checkliste-wohnungsuebergabe-berlin",
  title: "Checkliste Wohnungsübergabe Berlin | Reinigung & Vorbereitung",
  description: "Checkliste für die Wohnungsübergabe in Berlin: Reinigung, Fotos, Übergabeprotokoll, Küche, Bad, Fenster, Böden und professionelle Übergabereinigung.",
  heroEyebrow: "Checkliste Wohnungsübergabe Berlin",
  h1: "Checkliste Wohnungsübergabe in Berlin – sauber vorbereitet übergeben.",
  lead: "Eine Wohnungsübergabe steht und fällt mit Vorbereitung, sichtbarem Zustand und sauberer Dokumentation. Reinigung ist dabei kein Nebenthema, sondern oft der Punkt, an dem Übergaben ruhig laufen oder unnötig eskalieren.",
  intro: "Diese Checkliste hilft Mietern, Eigentümern und Vermietern, typische Übergabepunkte strukturiert zu prüfen. Wenn der Zustand nicht eindeutig ist oder wenig Zeit bleibt, ordnet Nautilus Facility Cleaning die Übergabereinigung objektbezogen nach Fläche, Zustand und Termin ein.",
  heroCardTitle: "Übergabe braucht Vorbereitung, nicht Bauchgefühl.",
  heroCardText: "Wer Reinigung, Fotos, Schlüssel, Zählerstände und Protokoll vorbereitet, reduziert Reibung beim Termin und schafft eine nachvollziehbare Ausgangslage.",
  schemaType: "Article",
  faq: [
    ["Was sollte vor einer Wohnungsübergabe gereinigt werden?", "Typische Bereiche sind Böden, Küche, Bad, Fenster, Rahmen, Türen, Heizkörper, Balkon, Abstellflächen und sichtbare Kontaktflächen."],
    ["Was bedeutet übergabebereit?", "Übergabebereit bedeutet, dass die Wohnung in einem Zustand ist, der zur vereinbarten Rückgabe passt. Die konkrete Erwartung hängt vom Mietverhältnis, Zustand und Vereinbarungen ab."],
    ["Wann ist eine professionelle Übergabereinigung sinnvoll?", "Wenn wenig Zeit bleibt, der Zustand unklar ist, Küche oder Bad intensiver gereinigt werden müssen oder eine saubere Gesamtwirkung wichtig ist."],
    ["Sollte ich Fotos vor der Übergabe machen?", "Ja. Fotos helfen bei der Dokumentation und erleichtern auch eine Einschätzung des Reinigungsaufwands."],
    ["Übernimmt Nautilus Facility Cleaning Übergabereinigung in Berlin?", "Ja. Wir prüfen Übergabereinigungen in Berlin objektbezogen nach Fläche, Zustand, Termin und gewünschtem Umfang."],
  ],
  body: `
      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Vorbereitung</div><h2>Die wichtigsten Punkte vor dem Übergabetermin.</h2><p class="section-text">Eine gute Vorbereitung reduziert Stress am Übergabetag. Entscheidend sind nicht nur leere Räume, sondern der sichtbare Gesamteindruck, kritische Detailbereiche, Zugänglichkeit, Dokumentation und ein realistischer Blick auf Stellen, die bei Übergaben häufig beanstandet werden.</p></div><div class="grid cluster-grid-2">${[
        card("Räume und Böden", "Alle Räume sollten frei zugänglich sein. Böden, Sockelleisten, Ecken, Türbereiche, Laufwege und sichtbare Rückstände prägen den ersten Eindruck und sollten vor der Übergabe strukturiert geprüft werden."),
        card("Küche und Sanitär", "Küche und Bad sind besonders sensible Bereiche. Armaturen, Fliesen, Spülbecken, Ablagen, Schränke, Duschbereich, WC sowie sichtbare Kalk-, Seifen- oder Fettrückstände fallen bei Übergaben schnell auf."),
        card("Fenster, Rahmen und Türen", "Fensterflächen, Rahmen, Griffe, Türen, Zargen, Heizkörper und Kanten werden häufig unterschätzt. Gerade nach Auszug oder Renovierung sammeln sich dort Staub, Abrieb und sichtbare Rückstände."),
        card("Fotos und Protokoll", "Dokumentieren Sie den Zustand vor der Übergabe mit Fotos. Zählerstände, Schlüssel, erkennbare Mängel, vorhandene Schäden und besondere Absprachen sollten vor dem Termin geordnet vorliegen."),
      ].join("")}</div></div></section>
      <section><div class="container"><div class="section-head"><div class="eyebrow">Checkliste</div><h2>Bereiche, die vor der Übergabe geprüft werden sollten.</h2></div>${renderChecklist(["Böden", "Sockelleisten", "Küche", "Bad", "Fenster", "Rahmen", "Türen", "Heizkörper", "Balkon", "Keller oder Abstellraum", "Zählerstände", "Schlüssel", "Übergabeprotokoll", "Fotos"] )}</div></section>
      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Einordnung</div><h2>Wann professionelle Reinigung sinnvoll ist.</h2></div><div class="grid cluster-grid-3">${[
        card("Zeitdruck vor Übergabe", "Wenn Auszug, Transport, Renovierung und Übergabetermin eng beieinander liegen, ist professionelle Reinigung oft der sauberere Weg, um den Termin nicht zu gefährden.", { href: "/uebergabereinigung-berlin/", label: "Übergabe ansehen" }),
        card("Sichtbare Rückstände", "Kalk, Fett, Staub, Renovierungsspuren, Rahmenverschmutzung oder stark genutzte Sanitärbereiche lassen sich nicht immer mit kurzer Endreinigung beheben.", { href: "/grundreinigung-berlin/", label: "Grundreinigung ansehen" }),
        card("Objekt soll direkt weitergenutzt werden", "Bei Neuvermietung, Verkauf oder Anschlussnutzung zählt die Gesamtwirkung. Reinigung unterstützt einen geordneten, professionellen Übergabezustand.", { href: "/reinigung-nach-auszug-berlin/", label: "Auszug ansehen" }),
      ].join("")}</div></div></section>
      <section><div class="container"><div class="info-band"><strong>Besenrein ist nicht automatisch übergabefähig.</strong><p>Was im Einzelfall erwartet wird, hängt von Vereinbarungen, Ausgangszustand und Übergabesituation ab. Für eine professionelle Einschätzung prüfen wir deshalb Objekt, Fotos, Flächen und gewünschtes Ergebnis statt pauschal zu urteilen.</p></div></div></section>
  `,
});

pageShell({
  slug: "treppenhausreinigung-kosten-berlin",
  title: "Treppenhausreinigung Kosten Berlin | Objektbezogenes Angebot",
  description: "Was beeinflusst die Kosten der Treppenhausreinigung in Berlin? Faktoren: Etagen, Parteien, Turnus, Allgemeinflächen, Aufzug, Handläufe, Keller und Sonderreinigung.",
  heroEyebrow: "Treppenhausreinigung Kosten Berlin",
  h1: "Treppenhausreinigung Kosten in Berlin – objektbezogen einschätzen.",
  lead: "Die Kosten einer Treppenhausreinigung in Berlin hängen von Objektgröße, Etagen, Parteien, Turnus, Flächenstruktur, Zugänglichkeit, Nutzung und gewünschtem Leistungsumfang ab.",
  intro: "Nautilus Facility Cleaning erstellt Angebote für Treppenhäuser und Allgemeinflächen objektbezogen. So wird vor Beginn klar, welche Bereiche regelmäßig enthalten sind, welcher Turnus sinnvoll ist und welcher Sonderbedarf separat eingeordnet werden sollte.",
  heroCardTitle: "Für Hausverwaltungen, WEGs und Eigentümer mit Objektverantwortung.",
  heroCardText: "Treppenhausreinigung muss zum Objektalltag passen: nachvollziehbarer Leistungsumfang, sauberer Turnus, klare Zugangslösung und realistische Planung statt unklarer Standardleistung.",
  faq: [
    ["Wovon hängen die Kosten einer Treppenhausreinigung ab?", "Von Etagen, Parteien, Flächen, Turnus, Verschmutzungsgrad, Zugang, Aufzug, Kellerbereichen, Handläufen und Sonderleistungen."],
    ["Ist eine Besichtigung sinnvoll?", "Bei verwalteten Objekten ist eine kurze Besichtigung oft sinnvoll, weil Treppenhaus, Eingänge und Allgemeinflächen sehr unterschiedlich aufgebaut sind."],
    ["Welche Bereiche können enthalten sein?", "Typisch sind Treppen, Podeste, Eingangsbereich, Handläufe, Briefkastenbereich, Aufzug, Kellerzugänge und weitere Allgemeinflächen nach Abstimmung."],
    ["Kann der Turnus angepasst werden?", "Ja. Je nach Objekt kann wöchentlich, zweiwöchentlich oder individuell gereinigt werden. Entscheidend sind Nutzung, Bewohnerstruktur und gewünschtes Erscheinungsbild."],
    ["Erstellt Nautilus Facility Cleaning Angebote für Hausverwaltungen?", "Ja. Wir prüfen einzelne Liegenschaften, Treppenhäuser, Allgemeinflächen, Sonderreinigungen und Übergabebedarf objektbezogen."],
  ],
  body: `
      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Kostenfaktoren</div><h2>Was den Aufwand im Treppenhaus bestimmt.</h2><p class="section-text">Treppenhäuser unterscheiden sich deutlich. Ein gepflegtes kleines Objekt mit wenigen Parteien benötigt eine andere Planung als ein stark frequentiertes Mehrparteienhaus mit Aufzug, Kellerzugängen, Eingangsbereich, Briefkastenanlage und erhöhtem Nutzungsdruck.</p></div><div class="grid cluster-grid-2">${[
        card("Etagen und Parteien", "Anzahl der Etagen, Podeste, Wohneinheiten, Laufwege und Zwischenflächen beeinflussen den Zeitaufwand. Auch Bewohnerstruktur, Publikumsverkehr und Frequenz der Nutzung spielen eine Rolle."),
        card("Turnus und Leistungsbild", "Wöchentliche Reinigung, zweiwöchentlicher Turnus oder objektbezogene Intervalle sollten zur Nutzung, Verschmutzung und zum gewünschten Erscheinungsbild passen. Der Turnus ist ein zentraler Kostenhebel."),
        card("Allgemeinflächen", "Eingänge, Briefkästen, Aufzug, Kellerzugänge, Handläufe, Glasflächen und Nebenbereiche müssen klar definiert werden. Nur so bleibt nachvollziehbar, welche Flächen laufend gereinigt werden."),
        card("Sonderbedarf", "Starke Verschmutzung, Grundreinigung, Renovierungsspuren, Müllräume oder zusätzliche Fenster- und Rahmenreinigung sollten separat eingeordnet werden, damit die laufende Reinigung nicht unklar überladen wird."),
      ].join("")}</div></div></section>
      <section><div class="container"><div class="section-head"><div class="eyebrow">Objektprüfung</div><h2>Welche Angaben für ein Angebot wichtig sind.</h2></div>${renderChecklist(["Adresse und Bezirk", "Anzahl Etagen", "Anzahl Parteien", "Eingangsbereich", "Aufzug", "Kellerzugänge", "Handläufe", "Fenster und Glas", "gewünschter Turnus", "aktueller Zustand", "Zugangslösung", "Sonderflächen"] )}</div></section>
      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Für Verwaltungen</div><h2>Warum objektbezogene Angebote bei Treppenhäusern sinnvoll sind.</h2></div><div class="grid cluster-grid-3">${[
        card("Klare Leistungsabgrenzung", "Vor Beginn wird definiert, welche Flächen, Bauteile und Zusatzbereiche enthalten sind. Das reduziert Missverständnisse im laufenden Objektbetrieb.", { href: "/treppenhausreinigung-berlin/", label: "Treppenhaus ansehen" }),
        card("Planbarer Turnus", "Ein sauber abgestimmter Turnus sorgt dafür, dass Eingangsbereiche, Laufwege und Kontaktflächen regelmäßig betreut werden, ohne den Umfang unnötig aufzublähen.", { href: "/hausverwaltungen-berlin/", label: "Hausverwaltung ansehen" }),
        card("Sonderreinigung steuerbar", "Grundreinigung, Renovierungsspuren oder Zusatzflächen können gezielt eingeordnet werden, statt sie unklar in die laufende Reinigung zu mischen.", { href: "/grundreinigung-berlin/", label: "Grundreinigung ansehen" }),
      ].join("")}</div></div></section>
      <section><div class="container"><div class="info-band"><strong>Ein belastbarer Preis entsteht aus einem klaren Leistungsbild.</strong><p>Gerade bei Treppenhäusern ist entscheidend, dass Turnus, Flächen, Zugang und Sonderbedarf sauber definiert sind. So bleibt die Reinigung für Verwaltung, Eigentümer und Nutzer nachvollziehbar und planbar.</p></div></div></section>
  `,
});

console.log("SEO cluster pages generated.");
