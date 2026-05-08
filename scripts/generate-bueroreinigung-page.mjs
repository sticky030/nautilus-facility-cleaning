import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const baseUrl = "https://nautilus-facility.de";
const slug = "bueroreinigung-berlin";

const title = "Büroreinigung Berlin | Unterhaltsreinigung für Unternehmen";
const description =
  "Büroreinigung in Berlin für Unternehmen, Agenturen, Kanzleien und Gewerbeflächen. Strukturierte Unterhaltsreinigung mit kostenfreier Besichtigung.";

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
      "description": "Büroreinigung und Unterhaltsreinigung in Berlin für Unternehmen, Agenturen, Kanzleien, Verwaltungsflächen und gewerbliche Objekte.",
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
        "Büroreinigung",
        "Unterhaltsreinigung",
        "Gewerbereinigung",
        "Kanzleireinigung",
        "Reinigung von Arbeitsplätzen",
        "Reinigung von Besprechungsräumen",
        "Sanitärreinigung",
        "Teeküchenreinigung"
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Büroreinigung in Berlin"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Unterhaltsreinigung für Unternehmen in Berlin"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Reinigung von Büroflächen und Gewerbeflächen"
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
          <a href="/treppenhausreinigung-berlin/">Treppenhausreinigung</a>
          <a href="/hausverwaltungen-berlin/">Hausverwaltungen</a>
          <a href="https://nautilus-facility.de/?kontakt=1#kontakt" onclick="sessionStorage.setItem('scrollToContact', '1')">Kontakt</a>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <div class="eyebrow">Büroreinigung Berlin</div>
            <h1>Büroreinigung Berlin für Unternehmen, Agenturen und gewerbliche Flächen</h1>
            <p class="lead">
              Nautilus Facility Cleaning bietet hochwertige Büroreinigung und Unterhaltsreinigung für gewerbliche Objekte in Berlin. Der Fokus liegt auf gepflegten Arbeitsbereichen, sauberen Gemeinschaftsflächen, klar abgestimmten Abläufen und einer verlässlichen Umsetzung passend zu Ihren Betriebszeiten.
            </p>
            <div class="hero-actions">
              <a class="button" href="https://nautilus-facility.de/?kontakt=1#kontakt" onclick="sessionStorage.setItem('scrollToContact', '1')">Kostenfreie Besichtigung anfragen</a>
              <a class="button secondary" href="#leistungen">Leistungsumfang ansehen</a>
            </div>
          </div>

          <aside class="hero-card">
            <strong>Strukturierte Reinigung für professionelle Arbeitsumgebungen</strong>
            <p>
              Wir prüfen Fläche, Nutzung, Sanitärbereiche, Kontaktflächen, Turnus und gewünschtes Zeitfenster objektbezogen. So entsteht ein klarer Leistungsumfang, der zu Ihrem Büroalltag passt und nicht auf pauschalen Annahmen basiert.
            </p>
          </aside>
        </div>
      </section>

      <section id="leistungen" class="white">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Leistungsbild</div>
            <h2>Büroreinigung mit klar abgestimmtem Leistungsumfang.</h2>
            <p class="section-text">
              Für Unternehmen, Agenturen, Kanzleien und Verwaltungsflächen zählt ein dauerhaft gepflegter Eindruck. Entscheidend sind saubere Arbeitsplätze, repräsentative Besprechungsbereiche, funktionierende Sanitär- und Küchenbereiche sowie eine Umsetzung, die den laufenden Betrieb nicht stört.
            </p>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Arbeitsbereiche & Oberflächen</h3>
              <p>Regelmäßige Reinigung sichtbarer Arbeitsbereiche und häufig genutzter Oberflächen für einen gepflegten Büroalltag.</p>
              <ul class="clean">
                <li>Schreibtischumfelder und freie Oberflächen</li>
                <li>Kontaktflächen wie Griffe, Schalter und Türen</li>
                <li>Sichtpflege nach abgestimmtem Leistungsplan</li>
              </ul>
            </article>

            <article class="card">
              <h3>Besprechung & Empfang</h3>
              <p>Repräsentative Bereiche benötigen besondere Aufmerksamkeit, weil sie den ersten Eindruck bei Kunden, Mandanten und Besuchern prägen.</p>
              <ul class="clean">
                <li>Empfangsbereiche und Wartezonen</li>
                <li>Besprechungsräume und Konferenzbereiche</li>
                <li>Tische, Oberflächen und sichtbare Bodenbereiche</li>
              </ul>
            </article>

            <article class="card">
              <h3>Sanitär & Teeküchen</h3>
              <p>Sanitärzonen, Küchenbereiche und Aufenthaltsflächen werden nach Turnus, Nutzung und gewünschtem Standard sauber abgestimmt.</p>
              <ul class="clean">
                <li>Sanitärbereiche und Nebenflächen</li>
                <li>Teeküchen und Aufenthaltsbereiche</li>
                <li>Müllentsorgung und Verbrauchsbereiche nach Absprache</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Bürobereiche</div>
            <h2>Welche Bereiche werden in der Büroreinigung abgedeckt?</h2>
            <p class="section-text">
              Der Leistungsumfang wird objektbezogen festgelegt. Entscheidend sind Fläche, Raumstruktur, Mitarbeitendenzahl, Kundenverkehr, Sanitäranteil, Bodenbeläge und das gewünschte Reinigungszeitfenster.
            </p>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Arbeitsplätze</h3>
              <p>Arbeitsplätze und direkt angrenzende Flächen werden nach abgestimmtem Umfang gereinigt, ohne interne Abläufe unnötig zu stören.</p>
              <ul class="clean">
                <li>freie Oberflächen und Schreibtischumfelder</li>
                <li>Kontaktbereiche und Sichtflächen</li>
                <li>Bodenbereiche nach Turnus und Nutzung</li>
              </ul>
            </article>

            <article class="card">
              <h3>Gemeinschaftsflächen</h3>
              <p>Gemeinsam genutzte Bereiche beeinflussen den Gesamteindruck eines Büros besonders stark und benötigen verlässliche Pflege.</p>
              <ul class="clean">
                <li>Flure, Aufenthaltsbereiche und Küchenzonen</li>
                <li>Besprechungs- und Empfangsbereiche</li>
                <li>Müllentsorgung nach Leistungsplan</li>
              </ul>
            </article>

            <article class="card">
              <h3>Sanitärzonen</h3>
              <p>Sanitärbereiche werden regelmäßig und nachvollziehbar gereinigt, passend zu Frequenz, Nutzung und vereinbartem Standard.</p>
              <ul class="clean">
                <li>Waschbecken, Armaturen und Spiegel</li>
                <li>WC-Bereiche und angrenzende Oberflächen</li>
                <li>Verbrauchsmaterial nach Absprache</li>
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
              <h2>Verlässliche Unterhaltsreinigung statt unklarer Standardleistung.</h2>
              <p class="section-text">
                Gute Büroreinigung entsteht nicht durch pauschale Versprechen, sondern durch klare Leistungsbilder, passende Zeitfenster und eine saubere Abstimmung vor Beginn.
              </p>
            </div>

            <div class="premium-panel">
              <div class="eyebrow">Objektbezogen geplant</div>
              <h3>Reinigung passend zu Nutzung, Fläche und Anspruch.</h3>
              <p>
                Wir stimmen den Leistungsumfang nach Objektstruktur, Turnus, Frequenz, Bodenbelägen, Sanitäranteil und betrieblichen Abläufen ab. So entsteht ein Reinigungsplan, der realistisch umsetzbar ist und dauerhaft zum Objekt passt.
              </p>
              <div class="detail-list">
                <div class="detail-item">klare Abstimmung von Turnus, Zeitfenster und Leistungsumfang</div>
                <div class="detail-item">besondere Aufmerksamkeit für Kontaktflächen und repräsentative Bereiche</div>
                <div class="detail-item">Reinigung außerhalb oder passend zu Ihren Betriebszeiten</div>
                <div class="detail-item">objektbezogenes Angebot nach Bedarfsklärung oder Besichtigung</div>
                <div class="detail-item">persönliche Erreichbarkeit und nachvollziehbare Kommunikation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Geeignet für</div>
            <h2>Für Unternehmen, die einen gepflegten Auftritt nicht dem Zufall überlassen.</h2>
            <p class="section-text">
              Jedes Büro hat eine eigene Nutzung, Frequenz und Zeitlogik. Deshalb wird der Leistungsumfang passend zu Objekt, Branche und gewünschtem Standard abgestimmt.
            </p>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Unternehmen & Agenturen</h3>
              <p>Regelmäßige Unterhaltsreinigung für Büroflächen, Kreativagenturen, Verwaltungsflächen und gewerbliche Einheiten.</p>
            </article>
            <article class="card">
              <h3>Kanzleien & Beratung</h3>
              <p>Diskrete Reinigung für repräsentative Geschäftsräume, Mandantenbereiche und Besprechungsflächen.</p>
            </article>
            <article class="card">
              <h3>Kleine & mittlere Büros</h3>
              <p>Objektbezogene Reinigung für Büros mit klarer Abstimmung, festen Zeitfenstern und verlässlicher Umsetzung.</p>
            </article>
          </div>
        </div>
      </section>

      <section class="white">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Ablauf</div>
            <h2>Von der Bedarfsklärung zum objektbezogenen Angebot.</h2>
          </div>

          <div class="steps">
            <div class="step">
              <span>01</span>
              <h3>Bedarf klären</h3>
              <p>Objektart, Fläche, Turnus, Zeitfenster und gewünschter Leistungsumfang.</p>
            </div>
            <div class="step">
              <span>02</span>
              <h3>Kostenfrei besichtigen</h3>
              <p>Bei Bedarf prüfen wir die Bürofläche vor Ort und ordnen den Aufwand realistisch ein.</p>
            </div>
            <div class="step">
              <span>03</span>
              <h3>Angebot erhalten</h3>
              <p>Sie erhalten ein unverbindliches Angebot mit klar abgegrenztem Leistungsumfang.</p>
            </div>
            <div class="step">
              <span>04</span>
              <h3>Start abstimmen</h3>
              <p>Nach Freigabe erfolgt die Umsetzung im vereinbarten Zeitfenster.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Einsatzgebiet</div>
            <h2>Büroreinigung in Berlin — mit Fokus auf kurze Wege und verlässliche Zeitfenster.</h2>
            <p class="section-text">
              Nautilus Facility Cleaning betreut Büroflächen, Kanzleien, Agenturen und gewerbliche Objekte in Berlin. Unser Schwerpunkt liegt auf Objekten, bei denen klare Abläufe, feste Zeitfenster und zuverlässige Abstimmung mit Geschäftsführung, Office Management oder Objektverantwortlichen entscheidend sind.
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
                Besonders geeignet für laufende Büroreinigung, regelmäßige Unterhaltsreinigung und objektbezogene Reinigung nach Nutzung, Umzug oder Übergabe.
              </div>
            </aside>

            <div class="cta">
              <div>
                <div class="eyebrow">Kostenfreie Besichtigung</div>
                <h2>Bürofläche prüfen lassen. Angebot klar und objektbezogen erhalten.</h2>
                <p>
                  Wir ordnen Fläche, Raumstruktur, Sanitärbereiche, Bodenbeläge, Turnus und gewünschtes Zeitfenster sauber ein. Danach erhalten Sie ein unverbindliches Angebot mit klar abgegrenztem Leistungsumfang.
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
            <h2>Häufige Fragen zur Büroreinigung.</h2>
          </div>

          <div class="faq">
            <details>
              <summary>Wie wird der Umfang der Büroreinigung festgelegt?</summary>
              <p>Der Leistungsumfang wird nach Fläche, Raumstruktur, Mitarbeitendenzahl, Sanitärbereichen, Bodenbelägen, Turnus und gewünschtem Zeitfenster abgestimmt.</p>
            </details>

            <details>
              <summary>Reinigen Sie außerhalb der Bürozeiten?</summary>
              <p>Ja. Einsätze außerhalb oder passend zu Ihren Betriebszeiten sind nach Abstimmung möglich. Entscheidend sind Zugang, Schließlogik, gewünschter Turnus und Objektstruktur.</p>
            </details>

            <details>
              <summary>Welche Bürobereiche werden gereinigt?</summary>
              <p>Typische Bereiche sind Arbeitsplätze, Besprechungsräume, Empfang, Flure, Sanitärbereiche, Teeküchen, Aufenthaltsbereiche, Böden und häufig genutzte Kontaktflächen.</p>
            </details>

            <details>
              <summary>Bieten Sie regelmäßige Unterhaltsreinigung an?</summary>
              <p>Ja. Die Büroreinigung kann als regelmäßige Unterhaltsreinigung mit abgestimmtem Turnus umgesetzt werden — zum Beispiel mehrmals pro Woche oder nach individuellem Bedarf.</p>
            </details>

            <details>
              <summary>Ist eine einmalige Büroreinigung möglich?</summary>
              <p>Ja. Neben laufender Büroreinigung übernehmen wir auch einmalige Reinigungen, Grundreinigungen und objektbezogene Sonderreinigungen nach Umzug, Renovierung oder Übergabe.</p>
            </details>

            <details>
              <summary>Wie wird das Angebot erstellt?</summary>
              <p>Nach kurzer Bedarfsklärung oder kostenfreier Besichtigung erstellen wir ein unverbindliches, objektbezogenes Angebot mit klar abgegrenztem Leistungsumfang.</p>
            </details>

            <details>
              <summary>Wer stellt Reinigungsmaterial und Verbrauchsmaterial?</summary>
              <p>Das wird objektbezogen abgestimmt. Je nach Auftrag können Materialstellung, Verbrauchsmaterialien und besondere Anforderungen im Leistungsumfang berücksichtigt werden.</p>
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
              Professionelle Büroreinigung und Unterhaltsreinigung in Berlin für Unternehmen, Agenturen, Kanzleien und gewerbliche Objekte.
            </p>
            <p style="margin:18px 0 0; color:#7E7367; line-height:1.75;">
              Geschäftsbereich der Nautilus Security UG (haftungsbeschränkt)
            </p>
          </div>

          <div>
            <div class="footer-title">Büroreinigung Berlin</div>
            <div class="footer-links">
              <a href="#leistungen">Leistungsumfang</a>
              <a href="#leistungen">Unterhaltsreinigung</a>
              <a href="#leistungen">Arbeitsplätze und Oberflächen</a>
              <a href="#leistungen">Sanitär- und Küchenbereiche</a>
              <a href="#faq">Häufige Fragen</a>
            </div>
          </div>

          <div>
            <div class="footer-title">Weitere Leistungen</div>
            <div class="footer-links">
              <a href="/praxisreinigung-berlin/">Praxisreinigung Berlin</a>
              <a href="/#kanzleireinigung">Kanzleireinigung Berlin</a>
              <a href="/#treppenhausreinigung">Treppenhausreinigung Berlin</a>
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
          <span>Büroreinigung Berlin</span>
          <span>Unterhaltsreinigung</span>
          <span>Agenturen</span>
          <span>Kanzleien</span>
          <span>Lichtenberg</span>
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
