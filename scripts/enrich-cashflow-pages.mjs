import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const baseUrl = "https://nautilus-facility.de";
const phone = "0176 2284 4636";
const phoneHref = "tel:+4917622844636";
const email = "kontakt@nautilus-facility.de";
const whatsappBase = "https://wa.me/4917622844636";

function esc(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function sharedStyle() {
  const html = readFileSync("dist/praxisreinigung-berlin/index.html", "utf8");
  const match = html.match(/<style>[\s\S]*?<\/style>/);
  if (!match) throw new Error("Shared style not found");
  return match[0];
}

function renderBullets(items) {
  return items.map((item) => `<li>${item}</li>`).join("\n                ");
}

function renderCards(cards) {
  return cards.map((card) => `
            <article class="card">
              <h3>${card.title}</h3>
              <p>${card.text}</p>
              ${card.bullets ? `<ul class="clean">${renderBullets(card.bullets)}</ul>` : ""}
            </article>`).join("\n");
}

function renderDetails(items) {
  return items.map((item) => `
            <details>
              <summary>${item.q}</summary>
              <p>${item.a}</p>
            </details>`).join("\n");
}

function renderPage(page) {
  const style = sharedStyle();
  const whatsappText = encodeURIComponent(page.whatsapp);
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: page.eyebrow,
    provider: {
      "@type": "LocalBusiness",
      name: "Nautilus Facility Cleaning",
      telephone: "+4917622844636",
      email,
      address: { "@type": "PostalAddress", addressLocality: "Berlin", addressCountry: "DE" },
    },
    areaServed: ["Berlin", "Lichtenberg", "Marzahn-Hellersdorf", "Friedrichshain-Kreuzberg", "Pankow", "Prenzlauer Berg", "Weißensee", "Mitte"],
    url: `${baseUrl}/${page.slug}/`,
  }, null, 6);

  const html = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/images/reinigung-trans.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(page.title)}</title>
    <meta name="description" content="${esc(page.description)}" />
    <link rel="canonical" href="${baseUrl}/${page.slug}/" />
    <meta property="og:title" content="${esc(page.title)}" />
    <meta property="og:description" content="${esc(page.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${baseUrl}/${page.slug}/" />
    <meta property="og:site_name" content="Nautilus Facility Cleaning" />
    <meta property="og:image" content="${baseUrl}/images/reinigung-trans.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(page.title)}" />
    <meta name="twitter:description" content="${esc(page.description)}" />
    <meta name="twitter:image" content="${baseUrl}/images/reinigung-trans.png" />
    <script type="application/ld+json">${schema}</script>
    ${style}
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
            <div class="eyebrow">${page.eyebrow}</div>
            <h1>${page.h1}</h1>
            <p class="lead">${page.lead}</p>
            <div class="hero-actions">
              <a class="button" href="${whatsappBase}?text=${whatsappText}">Fotos per WhatsApp senden</a>
              <a class="button secondary" href="https://nautilus-facility.de/?kontakt=1#kontakt" onclick="sessionStorage.setItem('scrollToContact', '1')">Anfrageformular nutzen</a>
            </div>
          </div>
          <aside class="hero-card">
            <strong>${page.heroCardTitle}</strong>
            <p>${page.heroCardText}</p>
          </aside>
        </div>
      </section>

      <section class="white" id="leistungen">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Leistungsumfang</div>
            <h2>${page.scopeTitle}</h2>
            <p class="section-text">${page.scopeText}</p>
          </div>
          <div class="grid">${renderCards(page.scopeCards)}</div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Wann sinnvoll?</div>
            <h2>${page.useCaseTitle}</h2>
            <p class="section-text">${page.useCaseText}</p>
          </div>
          <div class="grid">${renderCards(page.useCaseCards)}</div>
        </div>
      </section>

      <section class="white">
        <div class="container">
          <div class="content-split">
            <div class="section-head" style="margin-bottom:0;">
              <div class="eyebrow">Ablauf</div>
              <h2>${page.processTitle}</h2>
              <p class="section-text">${page.processText}</p>
            </div>
            <div class="premium-panel">
              <div class="eyebrow">Für eine Einschätzung</div>
              <h3>Diese Informationen beschleunigen die Rückmeldung.</h3>
              <div class="detail-list">
                ${page.infoNeeded.map((item) => `<div class="detail-item">${item}</div>`).join("\n                ")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Abgrenzung</div>
            <h2>${page.boundaryTitle}</h2>
            <p class="section-text">${page.boundaryText}</p>
          </div>
          <div class="grid">${renderCards(page.boundaryCards)}</div>
        </div>
      </section>

      <section class="white">
        <div class="container">
          <div class="area-layout">
            <aside class="area-card">
              <div class="eyebrow">Einsatzgebiet</div>
              <h3>Berlin – mit Schwerpunkt auf kurzen Wegen und planbarer Umsetzung.</h3>
              <p>Nautilus Facility Cleaning prüft Anfragen in ganz Berlin objektbezogen. Priorisiert werden Lichtenberg, Marzahn-Hellersdorf, Friedrichshain-Kreuzberg, Pankow, Prenzlauer Berg, Weißensee, Mitte und angrenzende Bezirke.</p>
              <div class="area-pills" aria-label="Einsatzgebiete Berlin">
                <span class="area-pill">Lichtenberg</span><span class="area-pill">Marzahn-Hellersdorf</span><span class="area-pill">Friedrichshain-Kreuzberg</span><span class="area-pill">Pankow</span><span class="area-pill">Prenzlauer Berg</span><span class="area-pill">Weißensee</span><span class="area-pill">Mitte</span>
              </div>
            </aside>
            <div class="cta">
              <div>
                <div class="eyebrow">Objektbezogene Anfrage</div>
                <h2>${page.ctaTitle}</h2>
                <p>${page.ctaText}</p>
              </div>
              <a class="button" href="${whatsappBase}?text=${whatsappText}">Fotos per WhatsApp senden</a>
            </div>
          </div>
        </div>
      </section>

      <section id="faq">
        <div class="container">
          <div class="section-head"><div class="eyebrow">FAQ</div><h2>Häufige Fragen zu ${page.faqTitle}.</h2></div>
          <div class="faq">${renderDetails(page.faq)}</div>
        </div>
      </section>

      <section class="white" data-seo-crosslinks="true">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Weitere Leistungen</div>
            <h2>Passende Reinigungsleistungen rund um ${page.crosslinkTitle}.</h2>
            <p class="section-text">Je nach Zustand und Zieltermin kann eine ergänzende Leistung sinnvoll sein. Diese Seiten helfen bei der schnellen Einordnung.</p>
          </div>
          <div class="grid">${renderCards(page.crosslinks)}</div>
        </div>
      </section>
    </main>

    <footer>
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-title">Nautilus Facility Cleaning</div>
            <p style="margin:0; color:#7E7367; line-height:1.75;">Objektbezogene Reinigung in Berlin für Auszug, Übergabe, Renovierung, Bauarbeiten, Büros, Praxen, Kanzleien und verwaltete Objekte.</p>
          </div>
          <div>
            <div class="footer-title">Leistungen</div>
            <div class="footer-links"><a href="/reinigung-nach-renovierung-berlin/">Reinigung nach Renovierung</a><a href="/reinigung-nach-auszug-berlin/">Reinigung nach Auszug</a><a href="/uebergabereinigung-berlin/">Übergabereinigung</a><a href="/bauendreinigung-berlin/">Bauendreinigung</a></div>
          </div>
          <div>
            <div class="footer-title">Kontakt</div>
            <div class="footer-links"><a href="${phoneHref}">${phone}</a><a href="mailto:${email}">${email}</a><a href="${whatsappBase}?text=${whatsappText}">WhatsApp-Anfrage senden</a><a href="/">Startseite</a></div>
          </div>
        </div>
        <div class="footer-meta"><span>Berlin</span><span>Lichtenberg</span><span>Marzahn-Hellersdorf</span><span>Friedrichshain-Kreuzberg</span><span>Pankow</span><span>Mitte</span><span><a href="/impressum/">Impressum</a></span><span><a href="/datenschutz/">Datenschutz</a></span></div>
      </div>
    </footer>
  </body>
</html>`;

  mkdirSync(`dist/${page.slug}`, { recursive: true });
  writeFileSync(`dist/${page.slug}/index.html`, html, "utf8");
  console.log(`Enriched SEO page generated: dist/${page.slug}/index.html`);
}

const pages = [
  {
    slug: "reinigung-nach-auszug-berlin",
    title: "Reinigung nach Auszug Berlin – Auszugsreinigung & Übergabe",
    description: "Reinigung nach Auszug in Berlin für Wohnungen, Büros und Gewerbeobjekte. Küche, Bad, Böden, Oberflächen, Fenster nach Abstimmung und objektbezogenes Angebot.",
    eyebrow: "Reinigung nach Auszug Berlin",
    h1: "Reinigung nach Auszug in Berlin – sauber vorbereitet für Übergabe, Einzug oder Neuvermietung",
    lead: "Kurz vor einem Auszug zeigt sich oft erst, wie viel Reinigung wirklich offen ist. Küche, Bad, Böden, Rahmen, Kontaktflächen, Fensterbänke und sichtbare Rückstände entscheiden darüber, ob eine Wohnung oder Gewerbefläche sauber übergeben werden kann. Nautilus Facility Cleaning unterstützt in Berlin mit objektbezogener Auszugsreinigung – strukturiert, realistisch eingeschätzt und klar abgegrenzt.",
    heroCardTitle: "Auszug ist zeitkritisch – deshalb braucht es klare Einschätzung.",
    heroCardText: "Für eine erste Rückmeldung reichen Bezirk, Fläche, gewünschter Termin, leer oder möbliert sowie Fotos von Küche, Bad, Böden und Gesamtzustand. So vermeiden wir pauschale Zusagen und planen den Umfang sauber.",
    whatsapp: "Hallo, ich suche eine Reinigung nach Auszug in Berlin. Ich sende Ihnen Fotos, Fläche, Bezirk und gewünschten Termin.",
    scopeTitle: "Auszugsreinigung mit Fokus auf die Bereiche, die bei Übergaben auffallen.",
    scopeText: "Der konkrete Umfang hängt vom Zustand ab. Wir prüfen nicht nur die Fläche, sondern auch Nutzungsspuren, Leerstand, Küche, Sanitär, Böden, Rahmen und gewünschtes Zeitfenster.",
    scopeCards: [
      { title: "Küche & stark genutzte Flächen", text: "Küchenbereiche sind bei Auszug häufig der größte Aufwandstreiber. Fett, Fronten, Arbeitsflächen, Spüle, Herdumfeld und sichtbare Rückstände werden vorab eingeordnet.", bullets: ["Fronten und Oberflächen", "Herdumfeld und Arbeitsflächen", "Spüle und sichtbare Nutzungsspuren"] },
      { title: "Bad & Sanitärbereiche", text: "Sanitärbereiche prägen den Gesamteindruck einer Übergabe. Kalk, Armaturen, WC, Dusche, Waschbecken, Fliesen und Kontaktflächen werden nach Zustand bewertet.", bullets: ["Armaturen und Waschbecken", "WC und Dusche nach Umfang", "Fliesen, Böden und Kontaktpunkte"] },
      { title: "Böden, Türen & Kontaktflächen", text: "Böden, Sockelleisten, Türen, Griffe, Lichtschalter, Fensterbänke und Rahmen fallen bei Übergaben schnell ins Auge und werden passend zum Leistungsumfang berücksichtigt.", bullets: ["Böden und Laufbereiche", "Türen, Griffe und Schalter", "Fensterbänke und Rahmen nach Abstimmung"] },
    ],
    useCaseTitle: "Für Mieter, Vermieter, Eigentümer und Gewerbemieter mit festem Übergabetermin.",
    useCaseText: "Eine Reinigung nach Auszug ist sinnvoll, wenn ein Objekt fristgerecht übergeben, neu vermietet, nach Leerstand vorbereitet oder nach Nutzung wieder in einen gepflegten Zustand gebracht werden soll.",
    useCaseCards: [
      { title: "Wohnung vor Rückgabe", text: "Für Mieter, die kurz vor Übergabe nicht mehr alles selbst leisten können oder eine strukturierte Unterstützung brauchen." },
      { title: "Objekt vor Neuvermietung", text: "Für Eigentümer und Vermieter, die nach Auszug eine saubere Ausgangsbasis für Besichtigung, Neuvermietung oder Übergabe benötigen." },
      { title: "Gewerbefläche nach Nutzung", text: "Für kleine Büros, Praxen, Kanzleien oder Gewerbeflächen, die nach Auszug sauber zurückgegeben werden sollen." },
    ],
    processTitle: "So läuft die Anfrage für eine Auszugsreinigung ab.",
    processText: "Wir starten mit einer realistischen Ersteinschätzung. Je klarer Zustand, Fläche und Termin beschrieben sind, desto schneller kann ein objektbezogenes Angebot vorbereitet werden.",
    infoNeeded: ["Bezirk und Objektadresse oder grobe Lage", "ungefähre Fläche und Anzahl der Räume", "gewünschter Übergabe- oder Reinigungstermin", "leer, teilgeräumt oder möbliert", "Fotos von Küche, Bad, Böden und Gesamtzustand", "Fenster und Rahmen: ja/nein/nach Abstimmung"],
    boundaryTitle: "Was wir vorab sauber abgrenzen.",
    boundaryText: "Auszugsreinigung kann sehr unterschiedlich ausfallen. Deshalb müssen starke Verschmutzungen, Fenster, Rahmen, Möblierung, Keller, Balkon oder Sonderflächen vorab klar angesprochen werden.",
    boundaryCards: [
      { title: "Fenster & Rahmen", text: "Fenster und Rahmen werden nach Anzahl, Größe, Zugänglichkeit, Stockwerk und Zustand separat eingeordnet." },
      { title: "Starke Verschmutzung", text: "Bei starken Ablagerungen, Geruch, längerem Leerstand oder besonderen Rückständen ist eine Besichtigung sinnvoll." },
      { title: "Keine Entrümpelung", text: "Wir übernehmen Reinigung. Umzug, Entsorgung, Entrümpelung und handwerkliche Arbeiten sind nicht Teil dieser Leistung." },
    ],
    ctaTitle: "Fotos senden. Umfang klären. Objektbezogenes Angebot erhalten.",
    ctaText: "Senden Sie uns Bezirk, Fläche, Termin und Fotos. Wir prüfen, ob eine direkte Einschätzung möglich ist oder eine kurze Besichtigung sinnvoll wäre.",
    faqTitle: "Reinigung nach Auszug in Berlin",
    faq: [
      { q: "Was kostet eine Reinigung nach Auszug in Berlin?", a: "Das hängt von Fläche, Zustand, Küche, Bad, Fenstern, Möblierung und Termin ab. Wir kalkulieren objektbezogen statt pauschal." },
      { q: "Kann kurzfristig gereinigt werden?", a: "Kurzfristige Termine prüfen wir nach Kapazität, Lage und Umfang. Fotos helfen dabei, schnell eine realistische Rückmeldung zu geben." },
      { q: "Reinigen Sie auch Fenster und Rahmen?", a: "Ja, Fenster und Rahmen können nach Abstimmung aufgenommen werden. Aufwand und Preis hängen von Anzahl, Größe, Zugänglichkeit und Verschmutzung ab." },
      { q: "Muss die Wohnung leer sein?", a: "Eine leere Wohnung ist einfacher einzuschätzen und zu reinigen. Teilmöblierte oder möblierte Objekte prüfen wir individuell." },
      { q: "Erstellen Sie ein Angebot vor der Reinigung?", a: "Ja. Nach Bedarfsklärung oder Besichtigung erhalten Sie ein objektbezogenes Angebot mit klar abgegrenztem Leistungsumfang." },
    ],
    crosslinkTitle: "Auszug und Übergabe",
    crosslinks: [
      { title: "Übergabereinigung", text: "Wenn der Fokus auf dem Übergabetermin und dem Zielzustand liegt.", bullets: ["Wohnungsübergabe", "Gewerberückgabe", "NeuÜbergabe"] },
      { title: "Reinigung nach Renovierung", text: "Wenn nach Auszug zusätzlich Malerarbeiten, Bodenarbeiten oder Baustaub entstanden sind.", bullets: ["Baustaub", "Oberflächen", "Rahmen"] },
      { title: "Grundreinigung", text: "Wenn eine intensivere Reinigung nach längerer Nutzung oder Leerstand benötigt wird.", bullets: ["Böden", "Sanitär", "Sonderbereiche"] },
    ],
  },
  {
    slug: "uebergabereinigung-berlin",
    title: "Übergabereinigung Berlin – Wohnung & Gewerbe sauber übergeben",
    description: "Übergabereinigung in Berlin für Wohnungen, Büros und Gewerbeflächen. Objektbezogene Reinigung vor Rückgabe, Neuvermietung oder Nutzung.",
    eyebrow: "Übergabereinigung Berlin",
    h1: "Übergabereinigung in Berlin – klar abgestimmt vor Rückgabe, Neuvermietung oder Nutzung",
    lead: "Eine Übergabereinigung ist der letzte Schritt vor einem wichtigen Termin. Ob Wohnung, Büro, Praxis, Kanzlei oder Gewerbefläche: Entscheidend ist nicht irgendeine Reinigung, sondern ein klar definierter Leistungsumfang passend zum Zustand des Objekts und zum Übergabeziel.",
    heroCardTitle: "Übergabe braucht Planbarkeit.",
    heroCardText: "Wir klären vorab, welche Bereiche relevant sind, ob Fenster und Rahmen dazugehören, ob das Objekt leer ist und welcher Termin eingehalten werden muss.",
    whatsapp: "Hallo, ich suche eine Übergabereinigung in Berlin. Ich sende Ihnen Fotos, Fläche, Bezirk und gewünschten Termin.",
    scopeTitle: "Übergabereinigung für die Bereiche, die beim Termin wirklich zählen.",
    scopeText: "Bei Übergaben stehen sichtbare Flächen, stark genutzte Bereiche und häufig übersehene Details im Fokus. Der Umfang wird vor der Ausführung sauber abgestimmt.",
    scopeCards: [
      { title: "Wohnungsübergabe", text: "Reinigung vor Rückgabe, Neuvermietung oder Einzug. Im Fokus stehen Küche, Bad, Böden, Türen, Rahmen, Fensterbänke und Kontaktflächen.", bullets: ["Auszug und Einzug", "leer oder teilgeräumt", "nach Zustand kalkuliert"] },
      { title: "Gewerbeübergabe", text: "Für kleinere Büros, Praxen, Kanzleien oder Gewerbeflächen, die nach Nutzung sauber zurückgegeben oder neu genutzt werden sollen.", bullets: ["Büro- und Nebenräume", "Sanitär und Teeküche", "Kontaktflächen und Böden"] },
      { title: "Übergabe nach Renovierung", text: "Wenn vor der Übergabe Malerarbeiten, Bodenarbeiten, Trockenbau oder kleinere Umbauten stattgefunden haben, wird der Baustaub separat eingeordnet.", bullets: ["Baustaub", "Oberflächen", "Rahmen und Fenster nach Abstimmung"] },
    ],
    useCaseTitle: "Typische Situationen für eine Übergabereinigung.",
    useCaseText: "Übergabereinigung ist sinnvoll, wenn ein Objekt zeitnah zurückgegeben, neu vermietet, bezogen oder nach Renovierung nutzbar gemacht werden soll.",
    useCaseCards: [
      { title: "Vor Wohnungsrückgabe", text: "Wenn ein Übergabetermin feststeht und eine saubere Vorbereitung erforderlich ist." },
      { title: "Vor Neuvermietung", text: "Wenn Eigentümer, Vermieter oder Makler eine gepflegte Ausgangsbasis für Besichtigung oder Einzug benötigen." },
      { title: "Nach Leerstand", text: "Wenn ein Objekt länger ungenutzt war und vor Nutzung oder Übergabe gründlich gereinigt werden soll." },
    ],
    processTitle: "Von der Ersteinschätzung zum klaren Leistungsumfang.",
    processText: "Wir vermeiden unklare Pauschalzusagen. Stattdessen prüfen wir Zustand, Termin, Objektart und gewünschtes Ergebnis. Danach wird festgelegt, was enthalten ist und was separat abgestimmt wird.",
    infoNeeded: ["Bezirk und Objektart", "Fläche und Anzahl der Räume", "Übergabetermin oder gewünschtes Zeitfenster", "leer, teilgeräumt oder möbliert", "Fotos von kritischen Bereichen", "besondere Anforderungen wie Fenster, Rahmen, Balkon oder Nebenräume"],
    boundaryTitle: "Was bei Übergabereinigung häufig separat geklärt werden muss.",
    boundaryText: "Gerade bei Übergaben entstehen Missverständnisse, wenn Fenster, starke Verschmutzungen, Keller, Balkon oder Handwerkerstaub nicht klar besprochen werden. Diese Punkte werden vorab sauber eingeordnet.",
    boundaryCards: [
      { title: "Fenster/Rahmen", text: "Nach Anzahl, Stockwerk, Zustand und Zugänglichkeit separat bewerten." },
      { title: "Baustaub", text: "Nach Renovierung oder Handwerkerarbeiten ist der Aufwand meist höher als bei normaler Nutzung." },
      { title: "Nebenflächen", text: "Keller, Balkon, Abstellräume oder Außenbereiche nur nach ausdrücklicher Abstimmung." },
    ],
    ctaTitle: "Übergabetermin sichern – Reinigung rechtzeitig einordnen.",
    ctaText: "Schicken Sie Bezirk, Fläche, Termin und Fotos. Wir geben eine realistische Rückmeldung, ob und wie der Auftrag umgesetzt werden kann.",
    faqTitle: "Übergabereinigung in Berlin",
    faq: [
      { q: "Was ist der Unterschied zwischen Auszugsreinigung und Übergabereinigung?", a: "Auszugsreinigung beschreibt den Anlass, Übergabereinigung das Ziel: ein Objekt soll sauber zurückgegeben, neu vermietet oder genutzt werden." },
      { q: "Kann eine Übergabereinigung ohne Besichtigung angeboten werden?", a: "Bei kleineren, gut dokumentierten Objekten oft ja. Bei unklaren oder größeren Flächen ist eine Besichtigung sinnvoll." },
      { q: "Welche Bereiche sind typischerweise enthalten?", a: "Küche, Bad, Böden, Oberflächen, Türen, Rahmen, Kontaktflächen und weitere Bereiche nach Abstimmung." },
      { q: "Übernehmen Sie auch Gewerbeflächen?", a: "Ja, kleinere Büros, Praxen, Kanzleien und Gewerbeflächen können objektbezogen geprüft werden." },
      { q: "Wie schnell bekomme ich eine Einschätzung?", a: "Je vollständiger Bezirk, Fläche, Termin und Fotos vorliegen, desto schneller kann eine belastbare Einordnung erfolgen." },
    ],
    crosslinkTitle: "Übergabe, Auszug und Renovierung",
    crosslinks: [
      { title: "Reinigung nach Auszug", text: "Für Wohnungen oder Gewerbeflächen direkt nach Nutzung und vor Rückgabe.", bullets: ["Küche", "Bad", "Böden"] },
      { title: "Reinigung nach Renovierung", text: "Für Objekte mit Baustaub, Handwerkerspuren oder Rückständen nach Arbeiten.", bullets: ["Baustaub", "Rahmen", "Oberflächen"] },
      { title: "Bauendreinigung", text: "Für stärkere Rückstände nach Bau-, Umbau- oder Ausbauarbeiten.", bullets: ["Bauarbeiten", "Abnahme", "Baufeinreinigung"] },
    ],
  },
  {
    slug: "bauendreinigung-berlin",
    title: "Bauendreinigung Berlin – Baufeinreinigung nach Arbeiten",
    description: "Bauendreinigung und Baufeinreinigung in Berlin nach Renovierung, Umbau, Malerarbeiten, Trockenbau oder Bodenarbeiten. Objektbezogenes Angebot.",
    eyebrow: "Bauendreinigung Berlin",
    h1: "Bauendreinigung in Berlin – sauberer Abschluss nach Bauarbeiten, Umbau und Renovierung",
    lead: "Nach Bauarbeiten sieht ein Objekt oft fertig aus, ist aber noch nicht nutzbar oder übergabefähig. Feiner Staub, Materialrückstände, Spuren auf Rahmen, Fensterbänken, Böden, Sanitärbereichen und Oberflächen benötigen eine strukturierte Bauendreinigung oder Baufeinreinigung.",
    heroCardTitle: "Bauendreinigung braucht realistische Kalkulation.",
    heroCardText: "Der Aufwand hängt stark von Fläche, Bauzustand, Staubbelastung, Zugänglichkeit, Wasser/Strom, Fenstern, Rahmen und gewünschtem Zielzustand ab.",
    whatsapp: "Hallo, ich suche eine Bauendreinigung oder Baufeinreinigung in Berlin. Ich sende Ihnen Fotos, Fläche, Bezirk und gewünschten Termin.",
    scopeTitle: "Bauendreinigung für Objekte, die vor Übergabe oder Nutzung sauber vorbereitet werden müssen.",
    scopeText: "Wir trennen klar zwischen normaler Reinigung nach Renovierung und stärkerer Bauendreinigung. Entscheidend ist, welche Arbeiten stattgefunden haben und welcher Zustand erreicht werden soll.",
    scopeCards: [
      { title: "Baustaub und feine Rückstände", text: "Feiner Staub setzt sich auf Böden, Fensterbänken, Rahmen, Türen, Heizkörpern, Sanitärbereichen und Oberflächen ab.", bullets: ["Oberflächen", "Rahmen", "Böden und Ecken"] },
      { title: "Baufeinreinigung vor Nutzung", text: "Geeignet, wenn ein Objekt nach Handwerkerarbeiten, Umbau oder Sanierung bezogen, übergeben oder weiter genutzt werden soll.", bullets: ["vor Einzug", "vor Übergabe", "nach Renovierung"] },
      { title: "Fenster/Rahmen nach Abstimmung", text: "Glasflächen und Rahmen können je nach Zustand, Größe und Zugänglichkeit gesondert kalkuliert werden.", bullets: ["Innen/Außen nach Möglichkeit", "Rahmenzustand", "Stockwerk und Zugang"] },
    ],
    useCaseTitle: "Für Bau-, Handwerks- und Renovierungsprojekte mit sauberem Abschlussbedarf.",
    useCaseText: "Bauendreinigung ist besonders relevant nach Malerarbeiten, Trockenbau, Bodenarbeiten, Umbauten, Sanierungen, Leerstandsertüchtigung oder vor Objektabnahme.",
    useCaseCards: [
      { title: "Nach Maler- und Bodenarbeiten", text: "Wenn Staub, Spritzer, Schleifspuren oder Rückstände vor Übergabe entfernt werden müssen." },
      { title: "Nach Trockenbau oder Umbau", text: "Wenn feiner Staub im ganzen Objekt verteilt ist und eine normale Reinigung nicht ausreicht." },
      { title: "Vor Abnahme oder Übergabe", text: "Wenn ein Objekt sichtbar sauber und nutzbar vorbereitet werden soll." },
    ],
    processTitle: "Erst Zustand klären, dann Leistung sauber planen.",
    processText: "Bei Bauendreinigung ist eine belastbare Einschätzung ohne Informationen riskant. Wir prüfen Fläche, Rückstände, Wasser/Strom, Zugang, Fenster, Rahmen, Sanitär, Bodenbelag und Termin.",
    infoNeeded: ["Bezirk und Objektart", "Fläche und Anzahl der Räume", "welche Bau- oder Renovierungsarbeiten stattgefunden haben", "Fotos von Böden, Rahmen, Fenstern, Sanitär und Gesamtzustand", "Wasser und Strom vorhanden", "gewünschter Termin und Zielzustand"],
    boundaryTitle: "Was Bauendreinigung nicht automatisch einschließt.",
    boundaryText: "Bauendreinigung kann sehr breit sein. Deshalb werden starke Klebereste, Farbrückstände, Schutzfolien, Außenfenster, Höhenzugang, Entsorgung oder Spezialreinigung separat geprüft.",
    boundaryCards: [
      { title: "Keine Bauleistung", text: "Wir übernehmen Reinigung, keine handwerklichen Nacharbeiten, Reparaturen oder Materialentfernung außerhalb des Reinigungsumfangs." },
      { title: "Sonderrückstände", text: "Kleber, Farbe, Silikon, Zement- oder Mörtelreste müssen vorab anhand von Fotos oder Besichtigung geprüft werden." },
      { title: "Gerüst/Höhe/Zugang", text: "Schwer zugängliche Fenster oder hohe Flächen werden nur nach technischer Klärung eingeordnet." },
    ],
    ctaTitle: "Bauzustand zeigen – realistische Einschätzung erhalten.",
    ctaText: "Senden Sie Fotos vom aktuellen Zustand, Fläche, Bezirk und Termin. Danach klären wir, ob eine direkte Kalkulation oder Besichtigung sinnvoll ist.",
    faqTitle: "Bauendreinigung in Berlin",
    faq: [
      { q: "Was ist Bauendreinigung?", a: "Bauendreinigung ist die Reinigung nach Bau-, Umbau- oder Renovierungsarbeiten, damit ein Objekt nutzbar oder übergabefähig vorbereitet wird." },
      { q: "Was ist der Unterschied zur Baufeinreinigung?", a: "Die Begriffe überschneiden sich. Entscheidend ist der Zustand: Bei Baufeinreinigung geht es meist um den letzten sauberen Abschluss vor Nutzung oder Abnahme." },
      { q: "Können Sie nach Malerarbeiten reinigen?", a: "Ja, Reinigung nach Malerarbeiten, Bodenarbeiten oder Trockenbau ist möglich, wenn Umfang, Zustand und Termin passen." },
      { q: "Werden Fenster und Rahmen mitgereinigt?", a: "Fenster und Rahmen können nach Abstimmung enthalten sein. Aufwand und Zugänglichkeit müssen vorher geprüft werden." },
      { q: "Muss das Objekt fertig gebaut sein?", a: "Für eine saubere Endreinigung sollten die relevanten Arbeiten abgeschlossen sein. Laufende Bauarbeiten können das Ergebnis beeinträchtigen." },
    ],
    crosslinkTitle: "Bauarbeiten und Renovierung",
    crosslinks: [
      { title: "Reinigung nach Renovierung", text: "Für Wohnungen oder Gewerbeflächen nach Maler-, Boden- oder Trockenbauarbeiten.", bullets: ["Baustaub", "Oberflächen", "Küche/Bad"] },
      { title: "Übergabereinigung", text: "Wenn nach Bauarbeiten ein konkreter Übergabetermin vorbereitet werden soll.", bullets: ["Übergabe", "Rückgabe", "Nutzung"] },
      { title: "Grundreinigung", text: "Wenn das Objekt nach Nutzung, Leerstand oder Renovierung intensiver gereinigt werden soll.", bullets: ["Intensiv", "objektbezogen", "Sonderbedarf"] },
    ],
  },
];

for (const page of pages) renderPage(page);
console.log("Cashflow SEO pages enriched.");
