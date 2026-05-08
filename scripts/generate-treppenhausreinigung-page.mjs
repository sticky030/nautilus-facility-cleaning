import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const baseUrl = "https://nautilus-facility.de";
const slug = "treppenhausreinigung-berlin";

const title = "Treppenhausreinigung Berlin | Hausverwaltungen & Eigentümer";
const description =
  "Treppenhausreinigung in Berlin für Hausverwaltungen, WEGs, Eigentümer und Wohn- und Geschäftshäuser. Kostenfreie Besichtigung und objektbezogenes Angebot.";

const praxisHtml = readFileSync("dist/praxisreinigung-berlin/index.html", "utf8");
const styleMatch = praxisHtml.match(/<style>[\s\S]*?<\/style>/);

if (!styleMatch) {
  throw new Error("Style-Block der Praxis-Seite wurde nicht gefunden.");
}

const sharedStyle = styleMatch[0];

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
    <meta property="og:image" content="${baseUrl}/images/reinigung-trans.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${baseUrl}/images/reinigung-trans.png" />

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Nautilus Facility Cleaning",
      "legalName": "Nautilus Security UG (haftungsbeschränkt)",
      "image": "${baseUrl}/images/reinigung-trans.png",
      "description": "Treppenhausreinigung in Berlin für Hausverwaltungen, WEGs, Eigentümer, Mehrfamilienhäuser und Wohn- und Geschäftshäuser.",
      "url": "${baseUrl}/${slug}/",
      "telephone": "+4917622844636",
      "email": "kontakt@nautilus-facility.de",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Berlin",
        "addressCountry": "DE"
      },
      "areaServed": [
        "Berlin",
        "Berlin-Mitte",
        "Berlin-Pankow",
        "Berlin-Friedrichshain-Kreuzberg",
        "Berlin-Lichtenberg",
        "Berlin-Marzahn-Hellersdorf"
      ],
      "knowsAbout": [
        "Treppenhausreinigung",
        "Hausverwaltungen",
        "WEG Reinigung",
        "Mehrfamilienhaus Reinigung",
        "Allgemeinflächen Reinigung",
        "Eingangsbereich Reinigung",
        "Unterhaltsreinigung",
        "Grundreinigung"
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Treppenhausreinigung in Berlin"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Reinigung von Allgemeinflächen für Hausverwaltungen"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Objektreinigung für Mehrfamilienhäuser"
          }
        }
      ]
    }
    </script>

    ${sharedStyle}
  </head>

  <body>
    <header class="nav">
      <div class="nav-inner">
        <a class="brand" href="/">Nautilus Facility Cleaning</a>
        <nav class="nav-links" aria-label="Navigation">
          <a href="/">Startseite</a>
          <a href="/praxisreinigung-berlin/">Praxisreinigung</a>
          <a href="/bueroreinigung-berlin/">Büroreinigung</a>
          <a href="/hausverwaltungen-berlin/">Hausverwaltungen</a>
          <a href="https://nautilus-facility.de/?kontakt=1#kontakt" onclick="sessionStorage.setItem('scrollToContact', '1')">Kontakt</a>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <div class="eyebrow">Treppenhausreinigung Berlin</div>
            <h1>Treppenhausreinigung Berlin für Hausverwaltungen, WEGs und Eigentümer</h1>
            <p class="lead">
              Nautilus Facility Cleaning bietet hochwertige Treppenhausreinigung für Mehrfamilienhäuser, Wohn- und Geschäftshäuser sowie verwaltete Objekte in Berlin. Der Fokus liegt auf gepflegten Eingangsbereichen, sauberen Allgemeinflächen, klaren Turnussen und verlässlicher Umsetzung.
            </p>
            <div class="hero-actions">
              <a class="button" href="https://nautilus-facility.de/?kontakt=1#kontakt" onclick="sessionStorage.setItem('scrollToContact', '1')">Kostenfreie Besichtigung anfragen</a>
              <a class="button secondary" href="#leistungen">Leistungsumfang ansehen</a>
            </div>
          </div>

          <aside class="hero-card">
            <strong>Objektpflege für den ersten Eindruck im Haus</strong>
            <p>
              Wir prüfen Eingangsbereiche, Treppen, Podeste, Handläufe, Aufzüge, Briefkastenbereiche und Nutzungsfrequenz objektbezogen. So entsteht ein klarer Leistungsumfang, der zur Immobilie und zur Verwaltung passt.
            </p>
          </aside>
        </div>
      </section>

      <section id="leistungen" class="white">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Leistungsbild</div>
            <h2>Treppenhausreinigung mit klarer Abstimmung für verwaltete Objekte.</h2>
            <p class="section-text">
              In Wohn- und Geschäftshäusern entscheidet das Treppenhaus über den täglichen Objekteindruck. Bewohner, Eigentümer, Besucher und Dienstleister nehmen Eingangsbereiche, Podeste, Handläufe und Allgemeinflächen regelmäßig wahr. Genau hier braucht es verlässliche Reinigung statt unklarer Zuständigkeiten.
            </p>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Treppen & Podeste</h3>
              <p>Regelmäßige Reinigung der zentralen Verkehrsflächen im Haus — abgestimmt auf Nutzung, Verschmutzungsgrad und Turnus.</p>
              <ul class="clean">
                <li>Treppenstufen, Podeste und Flurbereiche</li>
                <li>Bodenreinigung nach Material und Objektstruktur</li>
                <li>Entfernung von Grobschmutz im vereinbarten Umfang</li>
              </ul>
            </article>

            <article class="card">
              <h3>Eingang & Allgemeinflächen</h3>
              <p>Der Eingangsbereich prägt den ersten Eindruck des Objekts. Deshalb wird dieser Bereich besonders sauber und nachvollziehbar eingeplant.</p>
              <ul class="clean">
                <li>Hauseingang, Foyer und Sichtflächen</li>
                <li>Allgemeinflächen nach Leistungsplan</li>
                <li>Reinigung nach Turnus und Objektfrequenz</li>
              </ul>
            </article>

            <article class="card">
              <h3>Handläufe & Kontaktflächen</h3>
              <p>Häufig berührte Bereiche werden nach Absprache in den Leistungsumfang aufgenommen und regelmäßig gepflegt.</p>
              <ul class="clean">
                <li>Handläufe und Geländerbereiche</li>
                <li>Klingel- und Briefkastenbereiche nach Absprache</li>
                <li>Aufzugsbereiche und Kontaktflächen nach Leistungsplan</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Objektbereiche</div>
            <h2>Welche Bereiche werden bei der Treppenhausreinigung abgedeckt?</h2>
            <p class="section-text">
              Der Leistungsumfang wird objektbezogen festgelegt. Entscheidend sind Hausgröße, Etagenzahl, Bodenbeläge, Aufzug, Eingangsbereich, Nutzungsfrequenz, Verschmutzungsgrad und gewünschter Reinigungsturnus.
            </p>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Wohnhäuser</h3>
              <p>Für Mehrfamilienhäuser und kleinere Wohnobjekte mit regelmäßigem Bedarf an gepflegten Gemeinschaftsflächen.</p>
              <ul class="clean">
                <li>Treppenhaus, Flure und Podeste</li>
                <li>Eingangs- und Durchgangsbereiche</li>
                <li>objektbezogener Turnus nach Nutzung</li>
              </ul>
            </article>

            <article class="card">
              <h3>Wohn- & Geschäftshäuser</h3>
              <p>Für gemischt genutzte Objekte, bei denen Bewohner, Gewerbe, Besucher und Kunden dieselben Allgemeinflächen nutzen.</p>
              <ul class="clean">
                <li>höhere Frequenz im Eingangsbereich</li>
                <li>Sichtflächen und Kontaktbereiche</li>
                <li>klare Abstimmung mit Verwaltung oder Eigentümer</li>
              </ul>
            </article>

            <article class="card">
              <h3>WEG & Verwaltungen</h3>
              <p>Für Hausverwaltungen, WEGs und Eigentümer, die eine verlässliche Zusatz- oder Ersatzlösung für einzelne Objekte benötigen.</p>
              <ul class="clean">
                <li>geeignet für kleine und mittlere Objektbestände</li>
                <li>saubere Leistungsabgrenzung vor Beginn</li>
                <li>Rückmeldung bei Auffälligkeiten nach Abstimmung</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section class="white">
        <div class="container">
          <div class="content-split">
            <div class="section-head" style="margin-bottom:0;">
              <div class="eyebrow">Arbeitsweise</div>
              <h2>Objektpflege mit Turnus, Zuständigkeit und klarer Leistungsgrenze.</h2>
              <p class="section-text">
                Gute Treppenhausreinigung entsteht nicht durch pauschale Flächenangaben, sondern durch eine saubere Einordnung des Objekts. Wir prüfen Nutzung, Frequenz, Bodenbeläge, Allgemeinflächen und gewünschte Reinigungsintervalle.
              </p>
            </div>

            <div class="premium-panel">
              <div class="eyebrow">Für Hausverwaltungen</div>
              <h3>Verlässliche Umsetzung für verwaltete Allgemeinflächen.</h3>
              <p>
                Hausverwaltungen brauchen Dienstleister, die sauber kommunizieren, Termine einhalten und den Leistungsumfang nachvollziehbar abgrenzen. Genau darauf ist unsere Objektlogik ausgerichtet.
              </p>
              <div class="detail-list">
                <div class="detail-item">klare Abstimmung von Turnus, Objektzugang und Leistungsumfang</div>
                <div class="detail-item">Fokus auf Eingangsbereiche, Podeste, Handläufe und Allgemeinflächen</div>
                <div class="detail-item">geeignet für Hausverwaltungen, WEGs und Eigentümer</div>
                <div class="detail-item">objektbezogenes Angebot nach Besichtigung oder Bedarfsklärung</div>
                <div class="detail-item">Rückmeldung bei Auffälligkeiten im Objekt nach vorheriger Abstimmung</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Geeignet für</div>
            <h2>Für Objekte, bei denen Allgemeinflächen sichtbar gepflegt sein müssen.</h2>
            <p class="section-text">
              Jedes Haus hat eine eigene Nutzung, Frequenz und Erwartungshaltung. Deshalb wird der Leistungsumfang passend zu Objekt, Bewohnerstruktur, Eigentümeranforderung und Verwaltungsbedarf abgestimmt.
            </p>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Hausverwaltungen</h3>
              <p>Regelmäßige Treppenhausreinigung und objektbezogene Zusatzleistungen für verwaltete Wohn- und Geschäftshäuser.</p>
              <p style="margin-top:18px;">
                <a href="/hausverwaltungen-berlin/" style="color:#B79B6C; font-weight:750; letter-spacing:.08em; text-transform:uppercase; font-size:12px;">
                  Reinigung für Hausverwaltungen ansehen
                </a>
              </p>
            </article>
            <article class="card">
              <h3>WEGs & Eigentümer</h3>
              <p>Saubere Allgemeinflächen für Eigentümergemeinschaften, kleinere Objektbestände und einzelne Wohnhäuser.</p>
            </article>
            <article class="card">
              <h3>Wohn- & Geschäftshäuser</h3>
              <p>Reinigung von Eingängen, Treppenhäusern und gemeinschaftlich genutzten Bereichen mit erhöhtem Publikumsverkehr.</p>
            </article>
          </div>
        </div>
      </section>

      <section class="white">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Ablauf</div>
            <h2>Von der Objektklärung zum sauber abgegrenzten Angebot.</h2>
          </div>

          <div class="steps">
            <div class="step">
              <span>01</span>
              <h3>Objekt klären</h3>
              <p>Adresse, Etagen, Flächen, Zugang, Turnus und gewünschter Leistungsumfang.</p>
            </div>
            <div class="step">
              <span>02</span>
              <h3>Kostenfrei besichtigen</h3>
              <p>Bei Bedarf prüfen wir das Objekt vor Ort und ordnen den Aufwand realistisch ein.</p>
            </div>
            <div class="step">
              <span>03</span>
              <h3>Angebot erhalten</h3>
              <p>Sie erhalten ein unverbindliches Angebot mit klar abgegrenztem Leistungsumfang.</p>
            </div>
            <div class="step">
              <span>04</span>
              <h3>Start abstimmen</h3>
              <p>Nach Freigabe erfolgt die Umsetzung im vereinbarten Turnus und Zeitfenster.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Einsatzgebiet</div>
            <h2>Treppenhausreinigung in Berlin — mit Fokus auf kurze Wege und verlässliche Objektbetreuung.</h2>
            <p class="section-text">
              Nautilus Facility Cleaning betreut Treppenhäuser und Allgemeinflächen in Berlin. Unser Schwerpunkt liegt auf Objekten, bei denen klare Turnusse, feste Zugangslogik und zuverlässige Abstimmung mit Hausverwaltung, Eigentümer oder Objektverantwortlichen entscheidend sind.
            </p>
          </div>

          <div class="area-layout">
            <aside class="area-card">
              <div class="eyebrow">Berlin</div>
              <h3>Schwerpunkt in Ihren relevanten Bezirken.</h3>
              <p>
                Wir sind insbesondere in den Berliner Bezirken Lichtenberg, Marzahn-Hellersdorf, Friedrichshain-Kreuzberg, Pankow und Mitte aktiv. Weitere Bezirke prüfen wir objektbezogen nach Lage, Turnus und gewünschtem Zeitfenster.
              </p>
              <div class="area-pills" aria-label="Einsatzgebiete Berlin">
                <span class="area-pill">Lichtenberg</span>
                <span class="area-pill">Marzahn-Hellersdorf</span>
                <span class="area-pill">Friedrichshain-Kreuzberg</span>
                <span class="area-pill">Pankow</span>
                <span class="area-pill">Mitte</span>
              </div>
              <div class="area-note">
                Besonders geeignet für laufende Treppenhausreinigung, Allgemeinflächenpflege, Grundreinigung, Übergabereinigung und kurzfristige Zusatzbedarfe in verwalteten Objekten.
              </div>
            </aside>

            <div class="cta">
              <div>
                <div class="eyebrow">Kostenfreie Besichtigung</div>
                <h2>Treppenhaus prüfen lassen. Angebot klar und objektbezogen erhalten.</h2>
                <p>
                  Wir ordnen Etagen, Bodenbeläge, Eingangsbereiche, Allgemeinflächen, Kontaktflächen, Turnus und gewünschtes Zeitfenster sauber ein. Danach erhalten Sie ein unverbindliches Angebot mit klar abgegrenztem Leistungsumfang.
                </p>
              </div>
              <a class="button" href="https://nautilus-facility.de/?kontakt=1#kontakt" onclick="sessionStorage.setItem('scrollToContact', '1')">Besichtigung anfragen</a>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" class="white">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">FAQ</div>
            <h2>Häufige Fragen zur Treppenhausreinigung.</h2>
          </div>

          <div class="faq">
            <details>
              <summary>Für welche Objekte bieten Sie Treppenhausreinigung an?</summary>
              <p>Wir reinigen Treppenhäuser und Allgemeinflächen in Mehrfamilienhäusern, Wohn- und Geschäftshäusern, kleineren Objektbeständen, WEG-Objekten und verwalteten Immobilien in Berlin.</p>
            </details>

            <details>
              <summary>Wie wird der Reinigungsturnus festgelegt?</summary>
              <p>Der Turnus wird nach Objektgröße, Etagenzahl, Nutzungsfrequenz, Verschmutzungsgrad, Bodenbelägen und Erwartung der Verwaltung oder Eigentümer abgestimmt.</p>
            </details>

            <details>
              <summary>Welche Bereiche können gereinigt werden?</summary>
              <p>Typische Bereiche sind Treppen, Podeste, Flure, Eingänge, Handläufe, Aufzugsbereiche, Briefkastenbereiche, Klingelanlagen und weitere Allgemeinflächen nach Absprache.</p>
            </details>

            <details>
              <summary>Arbeiten Sie auch für Hausverwaltungen?</summary>
              <p>Ja. Die Treppenhausreinigung ist besonders für Hausverwaltungen, WEG-Verwaltungen und Eigentümer geeignet, die einzelne Objekte oder kleinere Bestände zuverlässig betreuen lassen möchten.</p>
            </details>

            <details>
              <summary>Bieten Sie auch Grundreinigung im Treppenhaus an?</summary>
              <p>Ja. Neben laufender Treppenhausreinigung übernehmen wir auch Grundreinigungen, Sonderreinigungen und objektbezogene Zusatzleistungen nach Besichtigung oder Bedarfsklärung.</p>
            </details>

            <details>
              <summary>Gibt es eine kostenfreie Besichtigung?</summary>
              <p>Ja. Bei Bedarf prüfen wir das Objekt kostenfrei vor Ort und erstellen anschließend ein unverbindliches Angebot mit klar abgegrenztem Leistungsumfang.</p>
            </details>

            <details>
              <summary>Wie schnell kann ein Objekt starten?</summary>
              <p>Das hängt von Objektlage, Turnus, Zugang, Leistungsumfang und Kapazität ab. Nach der Bedarfsklärung stimmen wir den realistischen Starttermin verbindlich ab.</p>
            </details>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-title">Nautilus Facility Cleaning</div>
            <p style="margin:0; color:#7E7367; line-height:1.75;">
              Professionelle Treppenhausreinigung in Berlin für Hausverwaltungen, WEGs, Eigentümer, Mehrfamilienhäuser und Wohn- und Geschäftshäuser.
            </p>
            <p style="margin:18px 0 0; color:#7E7367; line-height:1.75;">
              Geschäftsbereich der Nautilus Security UG (haftungsbeschränkt)
            </p>
          </div>

          <div>
            <div class="footer-title">Treppenhausreinigung Berlin</div>
            <div class="footer-links">
              <a href="#leistungen">Leistungsumfang</a>
              <a href="#leistungen">Treppen und Podeste</a>
              <a href="#leistungen">Eingang und Allgemeinflächen</a>
              <a href="#leistungen">Handläufe und Kontaktflächen</a>
              <a href="#faq">Häufige Fragen</a>
            </div>
          </div>

          <div>
            <div class="footer-title">Weitere Leistungen</div>
            <div class="footer-links">
              <a href="/praxisreinigung-berlin/">Praxisreinigung Berlin</a>
              <a href="/bueroreinigung-berlin/">Büroreinigung Berlin</a>
              <a href="/hausverwaltungen-berlin/">Reinigung für Hausverwaltungen</a>
              <a href="/#grundreinigung">Grundreinigung Berlin</a>
              <a href="/#fensterreinigung">Fensterreinigung & Sonderreinigung</a>
            </div>
          </div>

          <div>
            <div class="footer-title">Kontakt</div>
            <div class="footer-links">
              <a href="tel:+4917622844636">0176 22844636</a>
              <a href="mailto:kontakt@nautilus-facility.de">kontakt@nautilus-facility.de</a>
              <a href="https://nautilus-facility.de/?kontakt=1#kontakt" onclick="sessionStorage.setItem('scrollToContact', '1')">Kostenfreie Besichtigung anfragen</a>
              <a href="/">Startseite</a>
            </div>
          </div>
        </div>

        <div class="footer-meta">
          <span>Treppenhausreinigung Berlin</span>
          <span>Hausverwaltungen</span>
          <span>WEG</span>
          <span>Allgemeinflächen</span>
          <span>Lichtenberg</span>
          <span>Marzahn-Hellersdorf</span>
          <span>Friedrichshain-Kreuzberg</span>
          <span>Pankow</span>
          <span>Mitte</span>
          <span><a href="/impressum/">Impressum</a></span>
          <span><a href="/datenschutz/">Datenschutz</a></span>
        </div>
      </div>
    </footer>
  </body>
</html>`;

mkdirSync(`dist/${slug}`, { recursive: true });
writeFileSync(`dist/${slug}/index.html`, html, "utf8");

console.log(`Static SEO page generated: dist/${slug}/index.html`);
