import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const baseUrl = "https://nautilus-facility.de";
const slug = "reinigung-nach-renovierung-berlin";
const contactHref = "https://nautilus-facility.de/?kontakt=1#kontakt";
const contactOnclick = "sessionStorage.setItem('scrollToContact', '1')";
const whatsappHref = "https://wa.me/4917622844636?text=Hallo%2C%20ich%20m%C3%B6chte%20Fotos%20f%C3%BCr%20eine%20Reinigung%20nach%20Renovierung%20in%20Berlin%20senden.";

function sharedStyle() {
  const html = readFileSync("dist/praxisreinigung-berlin/index.html", "utf8");
  const match = html.match(/<style>[\s\S]*?<\/style>/);
  if (!match) throw new Error("Shared style not found");
  return match[0];
}

function card(title, text, items = []) {
  return `<article class="card"><h3>${title}</h3><p>${text}</p>${items.length ? `<ul class="clean">${items.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}</article>`;
}

const faq = [
  ["Wann ist eine Reinigung nach Renovierung sinnvoll?", "Sinnvoll ist sie nach Malerarbeiten, Bodenarbeiten, Trockenbau, kleineren Umbauten, Sanierung einzelner Räume oder vor Übergabe, Einzug oder Wiedervermietung."],
  ["Welche Bereiche werden gereinigt?", "Typische Bereiche sind Böden, Sockelleisten, Türen, Rahmen, Heizkörper, Sanitärbereiche, Küchenbereiche, Kontaktflächen sowie sichtbare Staub- und Baureste nach abgestimmtem Umfang."],
  ["Reicht eine normale Unterhaltsreinigung nach Renovierung aus?", "Meist nicht. Renovierungsstaub setzt sich auf Kanten, Rahmen, Oberflächen und in Randbereichen ab. Deshalb muss der Leistungsumfang genauer eingeordnet werden als bei einer laufenden Unterhaltsreinigung."],
  ["Können Fotos für eine erste Einschätzung gesendet werden?", "Ja. Fotos von Böden, Ecken, Fenstern, Rahmen, Sanitärbereichen und besonders verschmutzten Stellen helfen bei der ersten Einschätzung."],
  ["Ist auch eine kurzfristige Reinigung möglich?", "Kurzfristige Termine prüfen wir objektbezogen nach Bezirk, Umfang, Zugänglichkeit und gewünschtem Zeitfenster."],
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Reinigung nach Renovierung Berlin",
  provider: { "@type": "LocalBusiness", name: "Nautilus Facility Cleaning", telephone: "+4917622844636", email: "kontakt@nautilus-facility.de" },
  areaServed: "Berlin",
  serviceType: "Reinigung nach Renovierung, Bauendreinigung, Baufeinreinigung, Grundreinigung",
  url: `${baseUrl}/${slug}/`,
};

const html = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/images/reinigung-trans.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reinigung nach Renovierung Berlin | Nautilus Facility Cleaning</title>
    <meta name="description" content="Reinigung nach Renovierung in Berlin: nach Malerarbeiten, Bodenarbeiten, Trockenbau, Umbau, Übergabe oder Einzug. Objektbezogene Einschätzung mit Fotos oder Besichtigung." />
    <link rel="canonical" href="${baseUrl}/${slug}/" />
    <meta property="og:title" content="Reinigung nach Renovierung Berlin | Nautilus Facility Cleaning" />
    <meta property="og:description" content="Objektbezogene Reinigung nach Renovierung in Berlin – für Wohnungen, Gewerbeflächen, Praxen, Kanzleien und verwaltete Objekte." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${baseUrl}/${slug}/" />
    <meta property="og:site_name" content="Nautilus Facility Cleaning" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
    ${sharedStyle()}
  </head>
  <body>
    <header class="nav"><div class="nav-inner"><a class="brand" href="/">Nautilus Facility Cleaning</a><nav class="nav-links" aria-label="Navigation"><a href="/">Startseite</a><a href="/reinigung-nach-auszug-berlin/">Auszug</a><a href="/bauendreinigung-berlin/">Bauendreinigung</a><a href="/kontakt/">Kontakt</a></nav></div></header>
    <main>
      <section class="hero"><div class="container hero-grid"><div><div class="eyebrow">Reinigung nach Renovierung Berlin</div><h1>Reinigung nach Renovierung in Berlin — wenn Staub, Spuren und Übergabereste sauber raus müssen.</h1><p class="lead">Nach Renovierung, Malerarbeiten, Bodenarbeiten oder Trockenbau reicht eine normale Sichtreinigung oft nicht aus. Nautilus Facility Cleaning ordnet Zustand, Fläche und Leistungsumfang objektbezogen ein und reinigt so, dass Räume wieder nutzbar, vorzeigbar oder übergabebereit werden.</p><div class="hero-actions"><a class="button" href="${whatsappHref}">Fotos per WhatsApp senden</a><a class="button" href="${contactHref}" onclick="${contactOnclick}">Anfrageformular nutzen</a></div></div><aside class="hero-card"><strong>Relevant nach Renovierung, Umbau oder vor Übergabe.</strong><p>Für Wohnungen, Büros, Praxen, Kanzleien, verwaltete Objekte und Gewerbeflächen in Berlin. Entscheidend sind Staubbelastung, Bodenbeläge, Randbereiche, Fenster/Rahmen, Sanitär, Küche und Terminfenster.</p></aside></div></section>

      <section id="leistungen" class="white"><div class="container"><div class="section-head"><div class="eyebrow">Leistungsbild</div><h2>Renovierungsreinigung mit klarer Leistungsabgrenzung.</h2><p class="section-text">Nach Arbeiten im Objekt sitzen Staub und Rückstände häufig dort, wo sie im normalen Alltag nicht auffallen: auf Kanten, Rahmen, Sockelleisten, Heizkörpern, Türen, Sanitärflächen und in Randbereichen. Deshalb wird der Umfang vorab sauber abgestimmt.</p></div><div class="grid">${[
        card("Nach Malerarbeiten", "Feiner Staub, Farbspritzer und Rückstände auf Kanten, Böden und Rahmen werden nach Zustand und Material eingeordnet.", ["Böden und Sockelleisten", "Türen, Rahmen und Kontaktflächen", "sichtbare Rückstände nach Abstimmung"]),
        card("Nach Bodenarbeiten", "Bodenarbeiten hinterlassen Staub, Laufspuren, Randverschmutzungen und Rückstände, die vor Nutzung oder Übergabe entfernt werden sollten.", ["Randbereiche und Laufwege", "Sockelleisten und Übergänge", "Bodenpflege nach Material und Zustand"]),
        card("Nach Trockenbau oder Umbau", "Trockenbau- und Umbauarbeiten erzeugen feinen Staub, der sich im Objekt verteilt und strukturiert entfernt werden muss.", ["Staub auf Oberflächen und Kanten", "Sanitär- und Nebenflächen", "objektbezogene Nachreinigung"]),
      ].join("")}</div></div></section>

      <section><div class="container"><div class="section-head"><div class="eyebrow">Typische Einsatzfälle</div><h2>Für Wohnungen, Gewerbe und verwaltete Objekte.</h2><p class="section-text">Die Reinigung nach Renovierung ist besonders relevant, wenn Räume wieder bezogen, übergeben, vermietet oder professionell genutzt werden sollen. Dabei geht es nicht nur um Sauberkeit, sondern um einen nachvollziehbaren, vorzeigbaren Zustand.</p></div><div class="grid">${[
        card("Wohnung nach Renovierung", "Für Eigentümer, Mieter, Vermieter und Verwaltungen nach Renovierung, Einzug, Auszug oder vor Neuvermietung."),
        card("Büro, Praxis und Kanzlei", "Für gewerbliche Räume nach Umbau, Malerarbeiten, Bodenarbeiten oder Wiederaufnahme des Betriebs."),
        card("Übergabe und Sonderbedarf", "Für Objekte, bei denen ein sauberer Eindruck vor Übergabe, Besichtigung, Abnahme oder Nutzungsbeginn entscheidend ist."),
      ].join("")}</div></div></section>

      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Ablauf</div><h2>So läuft die Reinigung nach Renovierung ab.</h2></div><div class="steps"><div class="step"><span>01</span><h3>Fotos senden</h3><p>Bezirk, Fläche, Termin und Fotos vom aktuellen Zustand übermitteln.</p></div><div class="step"><span>02</span><h3>Zustand einordnen</h3><p>Wir prüfen Staub, Rückstände, Flächen, Zugänglichkeit und gewünschten Umfang.</p></div><div class="step"><span>03</span><h3>Angebot erhalten</h3><p>Sie erhalten eine objektbezogene Einschätzung mit klarer Leistungsabgrenzung.</p></div><div class="step"><span>04</span><h3>Reinigung durchführen</h3><p>Nach Freigabe erfolgt die Umsetzung im abgestimmten Zeitfenster.</p></div></div></div></section>

      <section><div class="container"><div class="cta"><div><div class="eyebrow">Direkt einschätzen lassen</div><h2>Fotos senden. Zustand einordnen. Reinigung planen.</h2><p>Für eine erste Einschätzung reichen Bezirk, Objektart, Fläche, Termin und Fotos der relevanten Bereiche. Bei unklarem Umfang empfehlen wir eine kurze Besichtigung.</p></div><div style="display:flex; gap:14px; flex-wrap:wrap; justify-content:flex-end;"><a class="button" href="${whatsappHref}">Fotos per WhatsApp senden</a><a class="button" href="${contactHref}" onclick="${contactOnclick}">Anfrageformular nutzen</a></div></div></div></section>

      <section id="faq" class="white"><div class="container"><div class="section-head"><div class="eyebrow">FAQ</div><h2>Häufige Fragen zur Reinigung nach Renovierung.</h2></div><div class="faq">${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></div></section>
    </main>
    <footer><div class="container"><div class="footer-grid"><div><div class="footer-title">Nautilus Facility Cleaning</div><p style="margin:0; color:#7E7367; line-height:1.75;">Objektbezogene Reinigung nach Renovierung in Berlin für Wohnungen, Gewerbe, Praxen, Kanzleien und verwaltete Objekte.</p></div><div><div class="footer-title">Leistungen</div><div class="footer-links"><a href="/reinigung-nach-auszug-berlin/">Reinigung nach Auszug</a><a href="/uebergabereinigung-berlin/">Übergabereinigung</a><a href="/bauendreinigung-berlin/">Bauendreinigung</a><a href="/grundreinigung-berlin/">Grundreinigung</a></div></div><div><div class="footer-title">Kontakt</div><div class="footer-links"><a href="tel:+4917622844636">0176 2284 4636</a><a href="mailto:kontakt@nautilus-facility.de">kontakt@nautilus-facility.de</a><a href="/kontakt/">Kontakt</a><a href="/impressum/">Impressum</a><a href="/datenschutz/">Datenschutz</a></div></div></div></div></footer>
  </body>
</html>`;

mkdirSync(`dist/${slug}`, { recursive: true });
writeFileSync(`dist/${slug}/index.html`, html, "utf8");
console.log(`Renovation cleaning page restored: dist/${slug}/index.html`);
