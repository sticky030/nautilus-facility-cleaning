import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const baseUrl = "https://nautilus-facility.de";
const slug = "kanzleireinigung-berlin";

const title = "Kanzleireinigung Berlin | Diskrete Reinigung für Kanzleien";
const description =
  "Kanzleireinigung in Berlin für Anwaltskanzleien, Steuerkanzleien, Beratungsbüros und repräsentative Geschäftsräume. Diskret, strukturiert und objektbezogen.";

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
      "description": "Kanzleireinigung in Berlin für Anwaltskanzleien, Steuerkanzleien, Beratungsbüros und repräsentative Geschäftsräume.",
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
        "Kanzleireinigung",
        "Büroreinigung",
        "Unterhaltsreinigung",
        "Reinigung von Anwaltskanzleien",
        "Reinigung von Steuerkanzleien",
        "Reinigung von Beratungsbüros",
        "Besprechungsraum Reinigung",
        "Empfangsbereich Reinigung",
        "Diskrete Reinigung"
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Kanzleireinigung in Berlin"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Reinigung von Anwaltskanzleien und Steuerkanzleien"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Diskrete Büroreinigung für repräsentative Geschäftsräume"
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
          <a href="/bueroreinigung-berlin/">Büroreinigung</a>
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
            <div class="eyebrow">Kanzleireinigung Berlin</div>
            <h1>Kanzleireinigung Berlin für Kanzleien, Beratungsbüros und repräsentative Geschäftsräume</h1>
            <p class="lead">
              Nautilus Facility Cleaning bietet diskrete und strukturierte Kanzleireinigung für Anwaltskanzleien, Steuerkanzleien, Beratungsbüros und repräsentative Geschäftsräume in Berlin. Der Fokus liegt auf gepflegten Mandantenbereichen, vertraulichen Arbeitsumgebungen und einer ruhigen Umsetzung passend zu Ihren Bürozeiten.
            </p>
            <div class="hero-actions">
              <a class="button" href="https://nautilus-facility.de/?kontakt=1#kontakt" onclick="sessionStorage.setItem('scrollToContact', '1')">Kostenfreie Besichtigung anfragen</a>
              <a class="button secondary" href="#leistungen">Leistungsumfang ansehen</a>
            </div>
          </div>

          <aside class="hero-card">
            <strong>Diskrete Reinigung für Räume mit Mandantenkontakt</strong>
            <p>
              Wir prüfen Raumstruktur, Besprechungsräume, Empfangsbereiche, Sanitärzonen, Kontaktflächen, Turnus und Zeitfenster objektbezogen. So entsteht ein Leistungsumfang, der zu Kanzleiabläufen und Vertraulichkeit passt.
            </p>
          </aside>
        </div>
      </section>

      <section id="leistungen" class="white">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Leistungsbild</div>
            <h2>Kanzleireinigung mit Fokus auf Diskretion, Ordnung und repräsentative Wirkung.</h2>
            <p class="section-text">
              Kanzleien und Beratungsbüros benötigen saubere Räume, ohne dass interne Abläufe, vertrauliche Unterlagen oder Mandantenbereiche gestört werden. Entscheidend sind klare Zeitfenster, ein abgestimmter Leistungsumfang und eine ruhige, verlässliche Durchführung.
            </p>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Empfang & Mandantenbereiche</h3>
              <p>Gepflegte Eingangs- und Wartebereiche für einen professionellen ersten Eindruck bei Mandanten, Besuchern und Geschäftspartnern.</p>
              <ul class="clean">
                <li>Empfangsbereiche und Wartezonen</li>
                <li>Sichtflächen, Oberflächen und Kontaktbereiche</li>
                <li>ruhige Umsetzung passend zum Kanzleibetrieb</li>
              </ul>
            </article>

            <article class="card">
              <h3>Besprechung & Konferenz</h3>
              <p>Besprechungsräume und Konferenzbereiche müssen repräsentativ, geordnet und kurzfristig nutzbar bleiben.</p>
              <ul class="clean">
                <li>Konferenztische und freie Oberflächen</li>
                <li>Besprechungsräume und Mandantenbereiche</li>
                <li>Sichtpflege nach abgestimmtem Leistungsplan</li>
              </ul>
            </article>

            <article class="card">
              <h3>Sanitär & Nebenbereiche</h3>
              <p>Sanitärzonen, Küchenbereiche und Aufenthaltsräume werden nach Turnus, Nutzung und gewünschtem Standard sauber abgestimmt.</p>
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
            <div class="eyebrow">Kanzleibereiche</div>
            <h2>Welche Bereiche werden in der Kanzleireinigung abgedeckt?</h2>
            <p class="section-text">
              Der Leistungsumfang wird objektbezogen festgelegt. Entscheidend sind Raumstruktur, Mandantenverkehr, Besprechungsbereiche, Sanitäranteil, vertrauliche Arbeitszonen, Bodenbeläge und das gewünschte Reinigungszeitfenster.
            </p>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Büros & Arbeitsbereiche</h3>
              <p>Arbeitsbereiche werden nach abgestimmtem Umfang gereinigt — mit besonderer Rücksicht auf Unterlagen, Ordnungssysteme und interne Abläufe.</p>
              <ul class="clean">
                <li>freie Oberflächen und Schreibtischumfelder</li>
                <li>Bodenbereiche nach Turnus und Nutzung</li>
                <li>keine Bewegung vertraulicher Unterlagen ohne Abstimmung</li>
              </ul>
            </article>

            <article class="card">
              <h3>Mandantennahe Räume</h3>
              <p>Mandantenbereiche sind besonders sichtbar und müssen zuverlässig gepflegt wirken — vor Terminen, Gesprächen und Besprechungen.</p>
              <ul class="clean">
                <li>Empfang, Wartebereich und Besprechungsräume</li>
                <li>Kontaktflächen und sichtbare Oberflächen</li>
                <li>repräsentativer Eindruck für Mandanten und Gäste</li>
              </ul>
            </article>

            <article class="card">
              <h3>Gemeinschaftsflächen</h3>
              <p>Gemeinsam genutzte Flächen beeinflussen den Gesamteindruck der Kanzlei und benötigen verlässliche Pflege.</p>
              <ul class="clean">
                <li>Flure, Küchenzonen und Aufenthaltsbereiche</li>
                <li>Sanitärzonen und Nebenflächen</li>
                <li>Müllentsorgung nach Leistungsplan</li>
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
              <h2>Diskrete Reinigung statt unruhiger Standardleistung.</h2>
              <p class="section-text">
                In Kanzleien geht es nicht nur um Sauberkeit, sondern um Vertrauen, Zurückhaltung und verlässliche Abläufe. Deshalb stimmen wir vor Beginn klar ab, welche Bereiche gereinigt werden, welche Zeitfenster passen und welche Arbeitsbereiche besondere Rücksicht erfordern.
              </p>
            </div>

            <div class="premium-panel">
              <div class="eyebrow">Objektbezogen geplant</div>
              <h3>Reinigung passend zu Mandantenverkehr und Bürostruktur.</h3>
              <p>
                Wir planen die Kanzleireinigung nach Raumstruktur, Nutzung, Diskretionsanforderung und gewünschtem Turnus. So entsteht ein Reinigungsplan, der sich in den Kanzleialltag einfügt, ohne interne Abläufe zu stören.
              </p>
              <div class="detail-list">
                <div class="detail-item">diskrete Durchführung in abgestimmten Zeitfenstern</div>
                <div class="detail-item">besondere Rücksicht auf vertrauliche Unterlagen und Arbeitsbereiche</div>
                <div class="detail-item">Fokus auf Empfang, Besprechungsräume und Mandantenbereiche</div>
                <div class="detail-item">Sanitär-, Küchen- und Nebenbereiche nach Leistungsplan</div>
                <div class="detail-item">unverbindliches Angebot nach Bedarfsklärung oder Besichtigung</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Geeignet für</div>
            <h2>Für Kanzleien, die einen gepflegten und diskreten Auftritt erwarten.</h2>
            <p class="section-text">
              Kanzleireinigung eignet sich besonders für Räume mit Mandantenkontakt, vertraulicher Arbeitsumgebung und repräsentativem Anspruch. Der Leistungsumfang wird passend zu Objekt, Nutzung und gewünschtem Standard abgestimmt.
            </p>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Anwaltskanzleien</h3>
              <p>Diskrete Reinigung für Mandantenbereiche, Besprechungsräume, Arbeitsbereiche und repräsentative Kanzleiflächen.</p>
            </article>
            <article class="card">
              <h3>Steuerkanzleien</h3>
              <p>Strukturierte Reinigung für Büros, Beratungsräume, Empfangsbereiche und vertrauliche Arbeitsumgebungen.</p>
            </article>
            <article class="card">
              <h3>Beratungsbüros</h3>
              <p>Gepflegte Geschäftsräume für Beratungen, Agenturen und professionelle Dienstleister mit Kundenkontakt.</p>
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
              <p>Objektart, Räume, Turnus, Zeitfenster und gewünschter Leistungsumfang.</p>
            </div>
            <div class="step">
              <span>02</span>
              <h3>Kostenfrei besichtigen</h3>
              <p>Bei Bedarf prüfen wir die Kanzleifläche vor Ort und ordnen den Aufwand realistisch ein.</p>
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
            <h2>Kanzleireinigung in Berlin — mit Fokus auf kurze Wege und diskrete Umsetzung.</h2>
            <p class="section-text">
              Nautilus Facility Cleaning betreut Kanzleien, Beratungsbüros und repräsentative Geschäftsräume in Berlin. Unser Schwerpunkt liegt auf Objekten, bei denen gepflegte Räume, feste Zeitfenster und zuverlässige Abstimmung mit Geschäftsführung, Assistenz oder Office Management entscheidend sind.
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
                Besonders geeignet für regelmäßige Kanzleireinigung, Unterhaltsreinigung, Grundreinigung und diskrete Objektpflege in repräsentativen Geschäftsräumen.
              </div>
            </aside>

            <div class="cta">
              <div>
                <div class="eyebrow">Kostenfreie Besichtigung</div>
                <h2>Kanzleifläche prüfen lassen. Angebot klar und objektbezogen erhalten.</h2>
                <p>
                  Wir ordnen Raumstruktur, Mandantenbereiche, Sanitärzonen, Kontaktflächen, Turnus und gewünschtes Zeitfenster sauber ein. Danach erhalten Sie ein unverbindliches Angebot mit klar abgegrenztem Leistungsumfang.
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
            <h2>Häufige Fragen zur Kanzleireinigung.</h2>
          </div>

          <div class="faq">
            <details>
              <summary>Für welche Kanzleien bieten Sie Reinigung an?</summary>
              <p>Wir reinigen Anwaltskanzleien, Steuerkanzleien, Beratungsbüros und vergleichbare repräsentative Geschäftsräume in Berlin.</p>
            </details>

            <details>
              <summary>Reinigen Sie außerhalb der Bürozeiten?</summary>
              <p>Ja. Einsätze außerhalb oder passend zu Ihren Bürozeiten sind nach Abstimmung möglich. Entscheidend sind Zugang, Schließlogik, gewünschter Turnus und Objektstruktur.</p>
            </details>

            <details>
              <summary>Wie gehen Sie mit vertraulichen Unterlagen um?</summary>
              <p>Vertrauliche Unterlagen werden nicht bewegt oder geöffnet. Vor Beginn wird klar abgestimmt, welche Bereiche gereinigt werden und welche Arbeitszonen besondere Rücksicht erfordern.</p>
            </details>

            <details>
              <summary>Welche Bereiche werden gereinigt?</summary>
              <p>Typische Bereiche sind Empfang, Wartebereiche, Besprechungsräume, Arbeitsbereiche, Flure, Sanitärbereiche, Teeküchen, Aufenthaltsbereiche und häufig genutzte Kontaktflächen.</p>
            </details>

            <details>
              <summary>Bieten Sie regelmäßige Unterhaltsreinigung an?</summary>
              <p>Ja. Die Kanzleireinigung kann als regelmäßige Unterhaltsreinigung mit abgestimmtem Turnus umgesetzt werden — zum Beispiel mehrmals pro Woche oder nach individuellem Bedarf.</p>
            </details>

            <details>
              <summary>Ist eine einmalige Kanzleireinigung möglich?</summary>
              <p>Ja. Neben laufender Kanzleireinigung übernehmen wir auch einmalige Reinigungen, Grundreinigungen und Sonderreinigungen nach Renovierung, Umzug oder Übergabe.</p>
            </details>

            <details>
              <summary>Wie wird das Angebot erstellt?</summary>
              <p>Nach kurzer Bedarfsklärung oder kostenfreier Besichtigung erstellen wir ein unverbindliches, objektbezogenes Angebot mit klar abgegrenztem Leistungsumfang.</p>
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
              Professionelle Kanzleireinigung in Berlin für Anwaltskanzleien, Steuerkanzleien, Beratungsbüros und repräsentative Geschäftsräume.
            </p>
            <p style="margin:18px 0 0; color:#7E7367; line-height:1.75;">
              Geschäftsbereich der Nautilus Security UG (haftungsbeschränkt)
            </p>
          </div>

          <div>
            <div class="footer-title">Kanzleireinigung Berlin</div>
            <div class="footer-links">
              <a href="#leistungen">Leistungsumfang</a>
              <a href="#leistungen">Empfang und Mandantenbereiche</a>
              <a href="#leistungen">Besprechungsräume</a>
              <a href="#leistungen">Sanitär- und Nebenbereiche</a>
              <a href="#faq">Häufige Fragen</a>
            </div>
          </div>

          <div>
            <div class="footer-title">Weitere Leistungen</div>
            <div class="footer-links">
              <a href="/bueroreinigung-berlin/">Büroreinigung Berlin</a>
              <a href="/praxisreinigung-berlin/">Praxisreinigung Berlin</a>
              <a href="/grundreinigung-berlin/">Grundreinigung Berlin</a>
              <a href="/fensterreinigung-berlin/">Fensterreinigung Berlin</a>
              <a href="/treppenhausreinigung-berlin/">Treppenhausreinigung Berlin</a>
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
          <span>Kanzleireinigung Berlin</span>
          <span>Anwaltskanzleien</span>
          <span>Steuerkanzleien</span>
          <span>Beratungsbüros</span>
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
