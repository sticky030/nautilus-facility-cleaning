import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const baseUrl = "https://nautilus-facility.de";
const contactHref = "https://nautilus-facility.de/?kontakt=1#kontakt";
const contactOnclick = "sessionStorage.setItem('scrollToContact', '1')";
const whatsappHref = "https://wa.me/4917622844636?text=Hallo%2C%20ich%20m%C3%B6chte%20eine%20Reinigungsanfrage%20f%C3%BCr%20Berlin%20stellen.%20Ich%20sende%20Ihnen%20Bezirk%2C%20Fl%C3%A4che%2C%20Termin%20und%20Fotos.";

function sharedStyle() {
  const html = readFileSync("dist/praxisreinigung-berlin/index.html", "utf8");
  const match = html.match(/<style>[\s\S]*?<\/style>/);
  if (!match) throw new Error("Shared style not found");
  return match[0];
}

function card(title, text, link) {
  return `<article class="card" style="display:flex; flex-direction:column; min-height:240px;"><h3>${title}</h3><p>${text}</p>${link ? `<p style="margin-top:auto;"><a href="${link.href}" style="color:#B79B6C; font-weight:750; letter-spacing:.08em; text-transform:uppercase; font-size:12px;">${link.label}</a></p>` : ""}</article>`;
}

const services = [
  ["Reinigung nach Auszug", "/reinigung-nach-auszug-berlin/"],
  ["Übergabereinigung", "/uebergabereinigung-berlin/"],
  ["Reinigung nach Renovierung", "/reinigung-nach-renovierung-berlin/"],
  ["Bauendreinigung", "/bauendreinigung-berlin/"],
  ["Treppenhausreinigung", "/treppenhausreinigung-berlin/"],
  ["Büroreinigung", "/bueroreinigung-berlin/"],
  ["Praxisreinigung", "/praxisreinigung-berlin/"],
  ["Kanzleireinigung", "/kanzleireinigung-berlin/"],
  ["Hausverwaltungen", "/hausverwaltungen-berlin/"],
  ["Grundreinigung", "/grundreinigung-berlin/"],
  ["Fensterreinigung", "/fensterreinigung-berlin/"],
  ["Sonderreinigung", "/grundreinigung-berlin/"],
];

const faq = [
  ["Ist Nautilus Facility Cleaning ein Berliner Unternehmen?", "Ja. Nautilus Facility Cleaning ist ein Berliner Reinigungsdienstleister für objektbezogene Reinigung von Wohn-, Gewerbe-, Praxis-, Kanzlei- und Verwaltungsobjekten."],
  ["Welche Gesellschaft steht hinter Nautilus Facility Cleaning?", "Nautilus Facility Cleaning ist ein Geschäftsbereich der Nautilus Security UG (haftungsbeschränkt). Die Gesellschaft ist im Handelsregister Berlin unter HRB 282199 B eingetragen."],
  ["Welche Reinigungsleistungen bietet Nautilus Facility Cleaning an?", "Wir übernehmen unter anderem Reinigung nach Auszug, Übergabereinigung, Reinigung nach Renovierung, Bauendreinigung, Grundreinigung, Sonderreinigung, Treppenhausreinigung, Büroreinigung, Praxisreinigung, Kanzleireinigung, Reinigung für Hausverwaltungen sowie Fenster- und Rahmenreinigung nach Abstimmung."],
  ["In welchen Berliner Bezirken arbeitet Nautilus Facility Cleaning?", "Wir prüfen Anfragen in ganz Berlin, mit besonderem Fokus auf Lichtenberg, Marzahn-Hellersdorf, Pankow, Prenzlauer Berg, Weißensee, Friedrichshain-Kreuzberg, Mitte und angrenzende Bezirke."],
  ["Wie läuft eine Anfrage ab?", "Für eine erste Einschätzung reichen Bezirk, Fläche, Objektart, gewünschter Termin und einige Fotos. Danach klären wir, ob ein objektbezogenes Angebot direkt möglich ist oder eine kurze Besichtigung sinnvoll wäre."],
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nautilus Facility Cleaning",
  legalName: "Nautilus Security UG (haftungsbeschränkt)",
  url: "https://nautilus-facility.de/ueber-uns/",
  email: "kontakt@nautilus-facility.de",
  telephone: "+4917622844636",
  founder: { "@type": "Person", name: "Philipp De Boer" },
  address: { "@type": "PostalAddress", addressLocality: "Berlin", addressCountry: "DE" },
  areaServed: ["Berlin", "Lichtenberg", "Marzahn-Hellersdorf", "Pankow", "Prenzlauer Berg", "Weißensee", "Friedrichshain-Kreuzberg", "Berlin-Mitte"],
  knowsAbout: ["Reinigung nach Auszug", "Übergabereinigung", "Bauendreinigung", "Treppenhausreinigung", "Büroreinigung", "Praxisreinigung", "Kanzleireinigung", "Hausverwaltungen", "Grundreinigung", "Fensterreinigung", "Sonderreinigung"],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: `${baseUrl}/` },
    { "@type": "ListItem", position: 2, name: "Über uns", item: `${baseUrl}/ueber-uns/` },
  ],
};

const html = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/images/reinigung-trans.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Über Nautilus Facility Cleaning | Reinigungsdienst Berlin</title>
    <meta name="description" content="Nautilus Facility Cleaning steht für strukturierte, objektbezogene Reinigung in Berlin – für Wohnungen, Gewerbe, Praxen, Kanzleien, Treppenhäuser und verwaltete Objekte." />
    <link rel="canonical" href="${baseUrl}/ueber-uns/" />
    <meta property="og:title" content="Über Nautilus Facility Cleaning | Reinigungsdienst Berlin" />
    <meta property="og:description" content="Strukturierte, objektbezogene Reinigung in Berlin für Wohn-, Gewerbe-, Praxis-, Kanzlei- und Verwaltungsobjekte." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${baseUrl}/ueber-uns/" />
    <meta property="og:site_name" content="Nautilus Facility Cleaning" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${JSON.stringify(organizationSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
    ${sharedStyle()}
  </head>
  <body>
    <header class="nav"><div class="nav-inner"><a class="brand" href="/">Nautilus Facility Cleaning</a><nav class="nav-links" aria-label="Navigation"><a href="/">Startseite</a><a href="/reinigung-nach-auszug-berlin/">Auszug</a><a href="/treppenhausreinigung-berlin/">Treppenhaus</a><a href="${contactHref}" onclick="${contactOnclick}">Kontakt</a></nav></div></header>
    <main>
      <section class="hero"><div class="container hero-grid"><div><div class="eyebrow">Über uns</div><h1>Über Nautilus Facility Cleaning</h1><p class="lead">Nautilus Facility Cleaning steht für strukturierte, objektbezogene Reinigung in Berlin – für Wohnungen, Gewerbeflächen, Praxen, Kanzleien, Treppenhäuser und verwaltete Objekte.</p><p>Wir verstehen Reinigung nicht als austauschbare Standardleistung, sondern als abgestimmten Objektprozess. Entscheidend sind Fläche, Zustand, Nutzung, Zugang, Zeitfenster und das Ergebnis, das am Ende erreicht werden soll.</p><div class="hero-actions"><a class="button" href="${contactHref}" onclick="${contactOnclick}">Anfrageformular nutzen</a><a class="button" href="${whatsappHref}">Fotos per WhatsApp senden</a></div></div><aside class="hero-card"><strong>Reinigung mit Struktur.</strong><p>Unser Fokus liegt auf klarer Einordnung, nachvollziehbarer Leistungsabgrenzung und einer Umsetzung, die zum Objektalltag passt.</p></aside></div></section>

      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Unternehmen</div><h2>Wer wir sind.</h2><p class="section-text">Nautilus Facility Cleaning steht für strukturierte, objektbezogene Reinigung in Berlin.</p><p class="section-text">Unser Fokus liegt auf Wohnungsübergaben, Reinigung nach Auszug, Reinigung nach Renovierung, Treppenhausreinigung, Büroreinigung, Praxisreinigung, Kanzleireinigung sowie Reinigungsleistungen für Hausverwaltungen und verwaltete Objekte.</p><p class="section-text">Wir arbeiten nicht mit pauschalen Standardversprechen, sondern mit einer klaren Einordnung des jeweiligen Objekts. Entscheidend sind Fläche, Zustand, Nutzung, gewünschtes Zeitfenster, Zugang und das Ergebnis, das am Ende erreicht werden soll.</p><p class="section-text">Nautilus Facility Cleaning ist ein Geschäftsbereich der Nautilus Security UG (haftungsbeschränkt) mit Sitz in Berlin. Die Gesellschaft ist im Handelsregister Berlin unter HRB 282199 B eingetragen.</p></div><div class="grid">${[
        card("Objektbezogener Ansatz", "Wir betrachten jedes Objekt nach tatsächlichem Bedarf: Fläche, Zustand, Nutzung, Zugang, Zeitfenster und gewünschtes Ergebnis. So entsteht ein Leistungsumfang, der nicht überladen wirkt und trotzdem sauber abgedeckt ist."),
        card("Klare Zielgruppen", "Unsere Leistungen richten sich an Mieter, Eigentümer, Vermieter, Hausverwaltungen, Praxen, Kanzleien, kleinere und mittlere Büros sowie Auftraggeber mit Bedarf nach Auszug, Renovierung, Übergabe oder Bauarbeiten."),
        card("Berliner Einsatzgebiet", "Wir prüfen Anfragen in Berlin mit besonderem Fokus auf Lichtenberg, Marzahn-Hellersdorf, Pankow, Prenzlauer Berg, Weißensee, Friedrichshain-Kreuzberg, Mitte und angrenzende Bezirke."),
      ].join("")}</div></div></section>

      <section><div class="container"><div class="section-head"><div class="eyebrow">Arbeitsweise</div><h2>Wie wir Reinigungsbedarf einordnen.</h2><p class="section-text">Eine gute Reinigung beginnt vor dem eigentlichen Einsatz. Für eine belastbare Einschätzung prüfen wir nicht nur die Quadratmeterzahl, sondern auch Objektart, Verschmutzungsgrad, Nutzungsart, gewünschtes Zeitfenster, Zugang, Sonderbereiche und das Ziel der Reinigung.</p><p class="section-text">Bei Auszugsreinigung, Übergabereinigung, Reinigung nach Renovierung, Bauendreinigung und Grundreinigung ist der aktuelle Zustand besonders wichtig. Fotos helfen, den Aufwand realistisch einzuordnen und unnötige Rückfragen zu vermeiden.</p><p class="section-text">Bei wiederkehrenden Objekten wie Büros, Praxen, Kanzleien, Treppenhäusern oder Allgemeinflächen stimmen wir Turnus, Zeitfenster, Zugangslösung und Leistungsbild vorab klar ab. So bleibt die Reinigung im laufenden Objektbetrieb planbar.</p></div></div></section>

      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Grundsätze</div><h2>Wofür Nautilus Facility Cleaning steht.</h2></div><div class="grid">${[
        card("Klare Abstimmung", "Der Leistungsumfang wird vor Beginn nachvollziehbar eingeordnet. Auftraggeber wissen, welche Bereiche enthalten sind, welche Zusatzleistungen separat abgestimmt werden und welches Ergebnis realistisch erreichbar ist."),
        card("Objektbezogene Angebote", "Jedes Objekt hat eigene Anforderungen. Deshalb kalkulieren wir nach Fläche, Zustand, Nutzung, Termin, Zugang und gewünschtem Ergebnis – nicht nach pauschalen Annahmen, die später zu Reibung führen."),
        card("Verlässliche Kommunikation", "Reinigung funktioniert nur, wenn Erwartungen sauber geklärt sind. Wir setzen auf klare Rückmeldung, realistische Einschätzung und verbindliche Abstimmung vor dem Einsatz."),
        card("Professionelle Ausführung", "Gerade in Praxen, Kanzleien, Büros und verwalteten Objekten muss Reinigung ruhig, diskret und strukturiert erfolgen. Die Umsetzung soll zum Betrieb, zum Objekt und zum Zeitfenster passen."),
      ].join("")}</div></div></section>

      <section><div class="container"><div class="section-head"><div class="eyebrow">Leistungen</div><h2>Reinigungsleistungen in Berlin.</h2><p class="section-text">Nautilus Facility Cleaning übernimmt in Berlin objektbezogene Reinigungsleistungen für private, gewerbliche und verwaltete Objekte. Der Leistungsumfang wird nach Objekt, Zustand, Termin und Nutzung abgestimmt.</p></div><div class="grid" style="grid-template-columns:repeat(3, minmax(0, 1fr));">${services.map(([label, href]) => card(label, "Mehr Informationen zur jeweiligen Reinigungsleistung, zu typischen Einsatzfällen, zur sinnvollen Leistungsabgrenzung und zur objektbezogenen Einschätzung in Berlin.", { href, label: "Leistung ansehen" })).join("")}</div></div></section>

      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Für wen wir arbeiten</div><h2>Private, gewerbliche und verwaltete Objekte.</h2></div><div class="grid">${[
        card("Mieter und Eigentümer", "Für Auszug, Einzug, Übergabe, Neuvermietung oder Reinigung nach Renovierungsarbeiten. Wichtig sind Zustand, Termin, Zugänglichkeit und das gewünschte Übergabeniveau."),
        card("Vermieter und Hausverwaltungen", "Für Treppenhäuser, Allgemeinflächen, Übergaben, Grundreinigungen und einzelne Objektbedarfe. Der Umfang wird nach Objekt, Turnus, Zugang und Priorität der Flächen abgestimmt."),
        card("Praxen, Kanzleien und Büros", "Für regelmäßige Reinigung außerhalb der Betriebszeiten, sensible Kontaktflächen, Sanitärbereiche, Empfangszonen, Teeküchen und repräsentative Räume mit klar abgestimmtem Zeitfenster."),
        card("Handwerks-, Umzugs- und Entrümpelungsumfelder", "Als Anschlussreinigung nach Räumung, Renovierung, Malerarbeiten, Bodenarbeiten oder Trockenbau – wenn ein Objekt nicht nur fertig bearbeitet, sondern sauber übergabebereit sein soll."),
      ].join("")}</div></div></section>

      <section><div class="container"><div class="section-head"><div class="eyebrow">Objektlogik</div><h2>Warum objektbezogene Reinigung wichtig ist.</h2><p class="section-text">Viele Reinigungsanfragen scheitern nicht an der Ausführung, sondern an einer unklaren Erwartung. Eine Wohnung nach Auszug benötigt andere Abläufe als ein Treppenhaus. Eine Praxis hat andere Anforderungen als ein Büro. Eine Bauendreinigung nach Renovierung ist nicht mit einer normalen Unterhaltsreinigung vergleichbar.</p><p class="section-text">Deshalb arbeiten wir mit klarer Einordnung statt pauschaler Aussage. Wir klären vorab, was gebraucht wird, was realistisch ist und welcher Leistungsumfang sinnvoll ist. Das schützt beide Seiten: Auftraggeber erhalten eine belastbare Einschätzung, und die Reinigung kann sauber geplant werden.</p></div></div></section>

      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Ablauf</div><h2>So läuft eine Anfrage bei Nautilus Facility Cleaning ab.</h2></div><div class="grid" style="grid-template-columns:repeat(2, minmax(0, 1fr));">${[
        card("1. Anfrage senden", "Sie senden uns Bezirk, Fläche, Objektart, gewünschten Termin und nach Möglichkeit Fotos vom aktuellen Zustand. Bei wiederkehrenden Objekten helfen zusätzlich Turnus, Zugang und Zeitfenster."),
        card("2. Bedarf einordnen", "Wir prüfen Zustand, Leistungsumfang, Zugänglichkeit, Zeitfenster und gewünschtes Ergebnis. So wird früh klar, ob eine direkte Einschätzung möglich ist oder Details vor Ort geklärt werden sollten."),
        card("3. Angebot oder Besichtigung", "Je nach Objekt erhalten Sie ein objektbezogenes Angebot oder wir empfehlen eine kurze Besichtigung. Das gilt besonders bei größeren Flächen, unklarem Zustand oder laufenden Objektleistungen."),
        card("4. Reinigung abstimmen und umsetzen", "Nach Freigabe erfolgt die Reinigung nach klar vereinbartem Leistungsbild, Termin und Umfang. Damit ist vor Beginn nachvollziehbar, welche Bereiche enthalten sind und wie die Umsetzung geplant wird."),
      ].join("")}</div></div></section>

      <section><div class="container"><div class="cta"><div><div class="eyebrow">Unternehmensdaten</div><h2>Nautilus Facility Cleaning</h2><p>Geschäftsbereich der Nautilus Security UG (haftungsbeschränkt). Geschäftsführer: Philipp De Boer. Handelsregister: HRB 282199 B, Amtsgericht Charlottenburg. Kontakt: kontakt@nautilus-facility.de · 0176 2284 4636.</p></div><div style="display:flex; gap:14px; flex-wrap:wrap; justify-content:flex-end;"><a class="button" href="${contactHref}" onclick="${contactOnclick}">Anfrageformular nutzen</a><a class="button" href="${whatsappHref}">Fotos per WhatsApp senden</a></div></div></div></section>

      <section id="faq" class="white"><div class="container"><div class="section-head"><div class="eyebrow">FAQ</div><h2>Häufige Fragen zu Nautilus Facility Cleaning.</h2></div><div class="faq">${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></div></section>
    </main>
    <footer><div class="container"><div class="footer-grid"><div><div class="footer-title">Nautilus Facility Cleaning</div><p style="margin:0; color:#7E7367; line-height:1.75;">Objektbezogene Reinigungsfirma in Berlin für Auszug, Übergabe, Renovierung, Gewerbe, Praxen, Kanzleien, Treppenhäuser und Hausverwaltungen.</p></div><div><div class="footer-title">Leistungen</div><div class="footer-links"><a href="/reinigung-nach-auszug-berlin/">Reinigung nach Auszug</a><a href="/uebergabereinigung-berlin/">Übergabereinigung</a><a href="/treppenhausreinigung-berlin/">Treppenhausreinigung</a><a href="/praxisreinigung-berlin/">Praxisreinigung</a></div></div><div><div class="footer-title">Kontakt</div><div class="footer-links"><a href="tel:+4917622844636">0176 2284 4636</a><a href="mailto:kontakt@nautilus-facility.de">kontakt@nautilus-facility.de</a><a href="/">Startseite</a><a href="/impressum/">Impressum</a><a href="/datenschutz/">Datenschutz</a></div></div></div></div></footer>
  </body>
</html>`;

mkdirSync("dist/ueber-uns", { recursive: true });
writeFileSync("dist/ueber-uns/index.html", html, "utf8");
console.log("About page generated: dist/ueber-uns/index.html");
