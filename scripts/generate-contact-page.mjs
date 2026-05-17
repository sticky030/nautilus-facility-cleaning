import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const baseUrl = "https://nautilus-facility.de";
const contactHref = "https://nautilus-facility.de/?kontakt=1#kontakt";
const contactOnclick = "sessionStorage.setItem('scrollToContact', '1')";
const whatsappContactHref = "https://wa.me/4917622844636?text=Hallo%2C%20ich%20m%C3%B6chte%20Nautilus%20Facility%20Cleaning%20kontaktieren.%20Bitte%20melden%20Sie%20sich%20bei%20mir.";
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

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Kontakt Nautilus Facility Cleaning",
  url: `${baseUrl}/kontakt/`,
  about: {
    "@type": "LocalBusiness",
    name: "Nautilus Facility Cleaning",
    legalName: "Nautilus Security UG (haftungsbeschränkt)",
    telephone: "+4917622844636",
    email: "kontakt@nautilus-facility.de",
    address: { "@type": "PostalAddress", addressLocality: "Berlin", addressCountry: "DE" },
    areaServed: ["Berlin", "Lichtenberg", "Marzahn-Hellersdorf", "Pankow", "Prenzlauer Berg", "Weißensee", "Friedrichshain-Kreuzberg", "Berlin-Mitte"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: `${baseUrl}/` },
    { "@type": "ListItem", position: 2, name: "Kontakt", item: `${baseUrl}/kontakt/` },
  ],
};

const faq = [
  ["Wie kann ich Nautilus Facility Cleaning am besten kontaktieren?", "Für eine schnelle erste Einordnung nutzen Sie am besten das Anfrageformular oder WhatsApp. Für Rückfragen erreichen Sie uns außerdem telefonisch oder per E-Mail."],
  ["Welche Angaben helfen bei einer Reinigungsanfrage?", "Hilfreich sind Bezirk, Objektart, Fläche, gewünschter Termin, aktueller Zustand, Leistungsumfang und – bei einmaligen Reinigungen – Fotos vom Objekt."],
  ["Kann ich Fotos per WhatsApp senden?", "Ja. Gerade bei Reinigung nach Auszug, Übergabereinigung, Reinigung nach Renovierung, Bauendreinigung und Grundreinigung helfen Fotos, den Aufwand schneller und realistischer einzuschätzen."],
  ["Bietet Nautilus Facility Cleaning auch regelmäßige Reinigung an?", "Ja. Wir prüfen regelmäßige Reinigung für Büros, Praxen, Kanzleien, Treppenhäuser, Allgemeinflächen und verwaltete Objekte nach Turnus, Zeitfenster und Leistungsumfang."],
  ["In welchen Bezirken arbeitet Nautilus Facility Cleaning?", "Wir prüfen Anfragen in Berlin, insbesondere in Lichtenberg, Marzahn-Hellersdorf, Pankow, Prenzlauer Berg, Weißensee, Friedrichshain-Kreuzberg, Mitte und angrenzenden Bezirken."],
];

const html = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/images/reinigung-trans.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kontakt | Nautilus Facility Cleaning Berlin</title>
    <meta name="description" content="Kontakt zu Nautilus Facility Cleaning in Berlin. Anfrageformular, WhatsApp, Telefon und E-Mail für objektbezogene Reinigung von Wohnungen, Gewerbe, Praxen, Kanzleien und Treppenhäusern." />
    <link rel="canonical" href="${baseUrl}/kontakt/" />
    <meta property="og:title" content="Kontakt | Nautilus Facility Cleaning Berlin" />
    <meta property="og:description" content="Reinigungsanfrage in Berlin stellen: Kontakt per Formular, WhatsApp, Telefon oder E-Mail." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${baseUrl}/kontakt/" />
    <meta property="og:site_name" content="Nautilus Facility Cleaning" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${JSON.stringify(contactSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
    ${sharedStyle()}
    <style>
      .contact-panel {
        background: #fff;
        border: 1px solid #E5D9C8;
        border-radius: 28px;
        padding: 34px;
        box-shadow: 0 24px 70px rgba(60, 48, 35, 0.08);
      }
      .contact-method {
        display: flex;
        justify-content: space-between;
        gap: 18px;
        padding: 18px 0;
        border-bottom: 1px solid #EEE8DE;
      }
      .contact-method:last-child { border-bottom: 0; }
      .contact-method span { color: #8A7E70; font-size: 14px; line-height: 1.7; }
      .contact-method a { color: #2C2C2C; font-weight: 760; }
      .contact-checklist {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
      }
      .contact-checklist span {
        border: 1px solid #E5D9C8;
        border-radius: 999px;
        padding: 12px 16px;
        color: #6F6559;
        background: #FCFBF8;
        font-size: 14px;
        font-weight: 650;
      }
      @media (max-width: 760px) {
        .contact-checklist { grid-template-columns: 1fr; }
        .contact-method { flex-direction: column; }
      }
    </style>
  </head>
  <body>
    <header class="nav"><div class="nav-inner"><a class="brand" href="/">Nautilus Facility Cleaning</a><nav class="nav-links" aria-label="Navigation"><a href="/">Startseite</a><a href="/reinigung-nach-auszug-berlin/">Auszug</a><a href="/treppenhausreinigung-berlin/">Treppenhaus</a><a href="/ueber-uns/">Über uns</a></nav></div></header>
    <main>
      <section class="hero"><div class="container hero-grid"><div><div class="eyebrow">Kontakt</div><h1>Reinigungsanfrage in Berlin stellen.</h1><p class="lead">Nautilus Facility Cleaning prüft Reinigungsanfragen objektbezogen – für Auszug, Übergabe, Renovierung, Bauendreinigung, Treppenhaus, Büro, Praxis, Kanzlei und verwaltete Objekte.</p><p>Für eine belastbare Rückmeldung sind nicht nur Quadratmeter entscheidend. Wichtig sind Objektart, Zustand, gewünschter Termin, Zugang, Zeitfenster und das Ergebnis, das erreicht werden soll.</p><div class="hero-actions"><a class="button" href="${contactHref}" onclick="${contactOnclick}">Anfrageformular nutzen</a><a class="button" href="${whatsappContactHref}">Per WhatsApp kontaktieren</a></div></div><aside class="hero-card"><strong>Schnelle Einordnung ohne Umwege.</strong><p>Bei einmaligen Reinigungen helfen Fotos. Bei regelmäßigen Objekten helfen Turnus, Fläche, Zeitfenster und gewünschter Leistungsumfang.</p></aside></div></section>

      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Kontaktwege</div><h2>So erreichen Sie Nautilus Facility Cleaning.</h2><p class="section-text">Nutzen Sie den Kontaktweg, der am besten zu Ihrer Anfrage passt. Für einfache Rückfragen reicht WhatsApp oder E-Mail. Für eine strukturierte Reinigungsanfrage ist das Formular der sauberste Weg.</p></div><div class="hero-grid"><div class="contact-panel">
        <div class="contact-method"><span>Telefon</span><a href="tel:+4917622844636">0176 2284 4636</a></div>
        <div class="contact-method"><span>E-Mail</span><a href="mailto:kontakt@nautilus-facility.de">kontakt@nautilus-facility.de</a></div>
        <div class="contact-method"><span>WhatsApp</span><a href="${whatsappContactHref}">Per WhatsApp kontaktieren</a></div>
        <div class="contact-method"><span>Anfrageformular</span><a href="${contactHref}" onclick="${contactOnclick}">Formular auf der Startseite öffnen</a></div>
      </div><aside class="hero-card"><strong>Wann Fotos sinnvoll sind.</strong><p>Fotos sind besonders hilfreich bei Auszugsreinigung, Übergabereinigung, Reinigung nach Renovierung, Bauendreinigung, Grundreinigung sowie bei sichtbarem Sonderbedarf.</p><p><a class="button" href="${whatsappPhotoHref}" style="margin-top:12px;">Fotos per WhatsApp senden</a></p></aside></div></div></section>

      <section><div class="container"><div class="section-head"><div class="eyebrow">Für eine schnelle Einschätzung</div><h2>Diese Angaben helfen bei Ihrer Anfrage.</h2><p class="section-text">Je klarer die Ausgangslage beschrieben ist, desto schneller können wir einordnen, ob ein direktes Angebot möglich ist oder ob eine kurze Besichtigung sinnvoll wäre.</p></div><div class="contact-checklist">
        <span>Bezirk / Lage des Objekts</span>
        <span>Objektart und Fläche</span>
        <span>Gewünschter Termin</span>
        <span>Aktueller Zustand</span>
        <span>Einmalig oder regelmäßig</span>
        <span>Leistungsumfang</span>
        <span>Zugang und Zeitfenster</span>
        <span>Fotos bei Einzelobjekten</span>
      </div></div></section>

      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Anfragetypen</div><h2>Welche Anfrage passt zu Ihrem Objekt?</h2></div><div class="grid">${[
        card("Einmalige Reinigung", "Für Auszug, Übergabe, Renovierung, Bauendreinigung oder Grundreinigung. Hier sind Fotos, Fläche, Termin und Zustand besonders wichtig, damit der Aufwand realistisch eingeschätzt werden kann.", { href: whatsappPhotoHref, label: "Fotos senden" }),
        card("Regelmäßige Objektbetreuung", "Für Büros, Praxen, Kanzleien, Treppenhäuser, Allgemeinflächen und verwaltete Objekte. Entscheidend sind Turnus, Zeitfenster, Zugang, Flächen und gewünschter Leistungsumfang.", { href: contactHref, onclick: contactOnclick, label: "Formular nutzen" }),
        card("Hausverwaltung & Gewerbe", "Für einzelne Liegenschaften, Treppenhäuser, Übergaben, Sonderreinigungen und wiederkehrenden Bedarf. Eine klare Objektbeschreibung erleichtert eine schnelle Einordnung.", { href: "/hausverwaltungen-berlin/", label: "Mehr erfahren" }),
      ].join("")}</div></div></section>

      <section><div class="container"><div class="section-head"><div class="eyebrow">Leistungen</div><h2>Reinigungsleistungen, für die Sie uns kontaktieren können.</h2><p class="section-text">Nautilus Facility Cleaning übernimmt objektbezogene Reinigungsleistungen in Berlin. Der konkrete Umfang wird je nach Objekt, Zustand, Nutzung und Termin abgestimmt.</p></div><div class="grid">${[
        card("Auszug, Übergabe & Renovierung", "Reinigung nach Auszug, Übergabereinigung, Reinigung nach Renovierung, Bauendreinigung und Grundreinigung für Wohnungen, Häuser und Übergabeobjekte.", { href: "/reinigung-nach-auszug-berlin/", label: "Auszug ansehen" }),
        card("Büro, Praxis & Kanzlei", "Regelmäßige oder objektbezogene Reinigung für gewerbliche Räume, sensible Kontaktflächen, Sanitärbereiche, Empfangszonen und repräsentative Arbeitsumfelder.", { href: "/bueroreinigung-berlin/", label: "Büroreinigung ansehen" }),
        card("Treppenhaus & Verwaltung", "Treppenhausreinigung, Allgemeinflächen, Hausverwaltungsbedarf, Sonderreinigungen und objektbezogene Leistungen für verwaltete Liegenschaften.", { href: "/treppenhausreinigung-berlin/", label: "Treppenhaus ansehen" }),
      ].join("")}</div></div></section>

      <section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Ablauf</div><h2>So läuft eine Kontaktaufnahme ab.</h2></div><div class="grid" style="grid-template-columns:repeat(2, minmax(0, 1fr));">${[
        card("1. Anfrage senden", "Sie senden uns die wichtigsten Angaben zum Objekt: Bezirk, Fläche, Objektart, gewünschter Termin, Zustand und Leistungsumfang."),
        card("2. Bedarf einordnen", "Wir prüfen, ob eine direkte Einschätzung möglich ist, ob Fotos ausreichen oder ob eine kurze Besichtigung sinnvoll wäre."),
        card("3. Rückmeldung erhalten", "Sie erhalten eine realistische Rückmeldung zum weiteren Vorgehen – ohne unklare Standardaussagen und ohne unnötige Umwege."),
        card("4. Angebot abstimmen", "Wenn der Umfang klar ist, erstellen wir ein objektbezogenes Angebot auf Basis von Fläche, Zustand, Termin und gewünschtem Ergebnis."),
      ].join("")}</div></div></section>

      <section><div class="container"><div class="cta"><div><div class="eyebrow">Direkt anfragen</div><h2>Objekt beschreiben und Rückmeldung erhalten.</h2><p>Für eine erste Einordnung reichen Bezirk, Fläche, Objektart, gewünschter Termin und einige Angaben zum Zustand. Bei sichtbarem Reinigungsbedarf können Fotos den Prozess deutlich beschleunigen.</p></div><div style="display:flex; gap:14px; flex-wrap:wrap; justify-content:flex-end;"><a class="button" href="${contactHref}" onclick="${contactOnclick}">Anfrageformular nutzen</a><a class="button" href="${whatsappContactHref}">Per WhatsApp kontaktieren</a></div></div></div></section>

      <section id="faq" class="white"><div class="container"><div class="section-head"><div class="eyebrow">FAQ</div><h2>Häufige Fragen zur Kontaktaufnahme.</h2></div><div class="faq">${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></div></section>
    </main>
    <footer><div class="container"><div class="footer-grid"><div><div class="footer-title">Nautilus Facility Cleaning</div><p style="margin:0; color:#7E7367; line-height:1.75;">Objektbezogene Reinigungsfirma in Berlin für Auszug, Übergabe, Renovierung, Gewerbe, Praxen, Kanzleien, Treppenhäuser und Hausverwaltungen.</p></div><div><div class="footer-title">Leistungen</div><div class="footer-links"><a href="/reinigung-nach-auszug-berlin/">Reinigung nach Auszug</a><a href="/uebergabereinigung-berlin/">Übergabereinigung</a><a href="/treppenhausreinigung-berlin/">Treppenhausreinigung</a><a href="/praxisreinigung-berlin/">Praxisreinigung</a></div></div><div><div class="footer-title">Kontakt</div><div class="footer-links"><a href="tel:+4917622844636">0176 2284 4636</a><a href="mailto:kontakt@nautilus-facility.de">kontakt@nautilus-facility.de</a><a href="/ueber-uns/">Über uns</a><a href="/impressum/">Impressum</a><a href="/datenschutz/">Datenschutz</a></div></div></div></div></footer>
  </body>
</html>`;

mkdirSync("dist/kontakt", { recursive: true });
writeFileSync("dist/kontakt/index.html", html, "utf8");
console.log("Contact page generated: dist/kontakt/index.html");
