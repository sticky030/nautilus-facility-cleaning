import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const baseUrl = "https://nautilus-facility.de";
const slug = "grundreinigung-berlin";

const title = "Grundreinigung Berlin | Büros, Praxen & Treppenhäuser";
const description =
  "Grundreinigung in Berlin für Büros, Praxen, Treppenhäuser und Gewerbeflächen. Intensive Reinigung nach Nutzung, Renovierung, Übergabe oder Sonderbedarf.";

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
      "description": "Grundreinigung in Berlin für Büros, Praxen, Treppenhäuser, Hausverwaltungen und gewerbliche Objekte.",
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
        "Grundreinigung",
        "Sonderreinigung",
        "Baufeinreinigung",
        "Übergabereinigung",
        "Büroreinigung",
        "Praxisreinigung",
        "Treppenhausreinigung",
        "Reinigung nach Renovierung"
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Grundreinigung in Berlin"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sonderreinigung und Übergabereinigung"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Grundreinigung für Büros, Praxen und Treppenhäuser"
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
            <div class="eyebrow">Grundreinigung Berlin</div>
            <h1>Grundreinigung Berlin für Büros, Praxen, Treppenhäuser und Gewerbeflächen</h1>
            <p class="lead">
              Nautilus Facility Cleaning bietet intensive Grundreinigung für gewerbliche Objekte in Berlin. Der Fokus liegt auf gründlicher Objektaufwertung nach Nutzung, Renovierung, Übergabe oder besonderem Reinigungsbedarf — klar abgestimmt, objektbezogen geplant und verlässlich umgesetzt.
            </p>
            <div class="hero-actions">
              <a class="button" href="https://nautilus-facility.de/?kontakt=1#kontakt" onclick="sessionStorage.setItem('scrollToContact', '1')">Kostenfreie Besichtigung anfragen</a>
              <a class="button secondary" href="#leistungen">Leistungsumfang ansehen</a>
            </div>
          </div>

          <aside class="hero-card">
            <strong>Intensive Reinigung für sichtbare Objektqualität</strong>
            <p>
              Wir prüfen Zustand, Flächen, Bodenbeläge, Sanitärbereiche, Nutzungsspuren, Zugänglichkeit und gewünschtes Ergebnis. So entsteht ein realistischer Leistungsumfang statt pauschaler Zusagen aus der Ferne.
            </p>
          </aside>
        </div>
      </section>

      <section id="leistungen" class="white">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Leistungsbild</div>
            <h2>Grundreinigung mit klarer Einschätzung von Zustand, Aufwand und Zielbild.</h2>
            <p class="section-text">
              Eine Grundreinigung ist sinnvoll, wenn laufende Unterhaltsreinigung nicht mehr ausreicht oder ein Objekt sichtbar aufgewertet werden soll. Entscheidend sind eine saubere Vorabklärung, realistische Einschätzung des Aufwands und ein klar abgegrenzter Leistungsumfang.
            </p>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Böden & Oberflächen</h3>
              <p>Intensive Reinigung stark beanspruchter Flächen, sichtbarer Oberflächen und Bereiche mit erhöhtem Reinigungsbedarf.</p>
              <ul class="clean">
                <li>Bodenreinigung nach Material und Zustand</li>
                <li>Oberflächen und Sichtflächen nach Leistungsplan</li>
                <li>Entfernung von Nutzungsspuren im vereinbarten Umfang</li>
              </ul>
            </article>

            <article class="card">
              <h3>Sanitär & Nebenbereiche</h3>
              <p>Gründliche Reinigung von Sanitärzonen, Nebenflächen und häufig genutzten Objektbereichen nach objektbezogener Abstimmung.</p>
              <ul class="clean">
                <li>Sanitärbereiche, Armaturen und Spiegel</li>
                <li>Teeküchen, Aufenthalts- und Nebenbereiche</li>
                <li>Kontaktflächen und stark frequentierte Bereiche</li>
              </ul>
            </article>

            <article class="card">
              <h3>Übergabe & Sonderbedarf</h3>
              <p>Grundreinigung bei Übergabe, nach Renovierung, nach Umbau oder vor Wiederaufnahme des laufenden Betriebs.</p>
              <ul class="clean">
                <li>Reinigung vor Übergabe oder Nutzung</li>
                <li>Reinigung nach Renovierung oder Umbau</li>
                <li>Sonderreinigung nach besonderem Bedarf</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Objektbereiche</div>
            <h2>Für welche Objekte ist eine Grundreinigung sinnvoll?</h2>
            <p class="section-text">
              Der konkrete Leistungsumfang hängt vom Objektzustand ab. Relevant sind Fläche, Bodenbelag, Verschmutzungsgrad, Nutzungsspuren, Sanitäranteil, Möblierung, Zugänglichkeit und das gewünschte Ergebnis.
            </p>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Büros & Gewerbeflächen</h3>
              <p>Für Büroflächen, Agenturen, Kanzleien und Gewerbeeinheiten, die sichtbar aufgefrischt oder für neue Nutzung vorbereitet werden sollen.</p>
              <ul class="clean">
                <li>Arbeitsbereiche, Flure und Nebenflächen</li>
                <li>Böden, Oberflächen und Sanitärbereiche</li>
                <li>Vorbereitung für laufende Unterhaltsreinigung</li>
              </ul>
            </article>

            <article class="card">
              <h3>Praxen & sensible Räume</h3>
              <p>Für Praxen und medizinisch genutzte Räume nach Umbau, Renovierung, Übergabe oder bei erhöhtem Reinigungsbedarf.</p>
              <ul class="clean">
                <li>Empfang, Wartebereiche und Nebenflächen</li>
                <li>Sanitärbereiche und Kontaktflächen</li>
                <li>klare Abgrenzung von Reinigung und medizinischen Bereichen</li>
              </ul>
            </article>

            <article class="card">
              <h3>Treppenhäuser & Allgemeinflächen</h3>
              <p>Für Hausverwaltungen, WEGs und Eigentümer, wenn Allgemeinflächen intensiver gereinigt oder wieder auf ein gepflegtes Niveau gebracht werden sollen.</p>
              <ul class="clean">
                <li>Treppen, Podeste und Eingangsbereiche</li>
                <li>Handläufe, Sichtflächen und Kontaktbereiche</li>
                <li>Grundreinigung vor Turnus- oder Dienstleisterwechsel</li>
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
              <h2>Keine pauschale Zusage. Erst Zustand prüfen, dann sauber planen.</h2>
              <p class="section-text">
                Bei einer Grundreinigung entscheidet der Ist-Zustand über Aufwand, Material, Zeitfenster und Ergebnis. Deshalb wird der Umfang vor Beginn objektbezogen eingeordnet und realistisch abgegrenzt.
              </p>
            </div>

            <div class="premium-panel">
              <div class="eyebrow">Objektbezogen geplant</div>
              <h3>Intensive Reinigung mit realistischem Leistungsbild.</h3>
              <p>
                Wir stimmen vorab ab, welche Flächen gereinigt werden, welcher Zustand erreicht werden soll und welche Bereiche nicht Teil des Auftrags sind. Das sorgt für Klarheit und vermeidet Missverständnisse.
              </p>
              <div class="detail-list">
                <div class="detail-item">Einschätzung von Verschmutzungsgrad, Bodenbelag und Zugänglichkeit</div>
                <div class="detail-item">klare Abgrenzung von Grundreinigung, Sonderreinigung und Baufeinreinigung</div>
                <div class="detail-item">objektbezogene Planung von Aufwand, Material und Zeitfenster</div>
                <div class="detail-item">geeignet für Übergaben, Renovierungen und erhöhte Nutzungsspuren</div>
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
            <h2>Für Objekte, die sichtbar aufgearbeitet oder für die nächste Nutzung vorbereitet werden sollen.</h2>
            <p class="section-text">
              Grundreinigung ist besonders sinnvoll, wenn ein Objekt nach intensiver Nutzung, längerer Vernachlässigung, Renovierung, Umzug oder vor einer Übergabe wieder auf ein gepflegtes Niveau gebracht werden soll.
            </p>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Unternehmen & Büros</h3>
              <p>Grundreinigung für gewerbliche Flächen, Arbeitsbereiche, Sanitärzonen und Nebenflächen vor Start, Übergabe oder laufender Nutzung.</p>
            </article>
            <article class="card">
              <h3>Praxen & Kanzleien</h3>
              <p>Intensive Reinigung für repräsentative und sensible Räume nach Renovierung, Umbau, erhöhter Nutzung oder Objektwechsel.</p>
            </article>
            <article class="card">
              <h3>Hausverwaltungen</h3>
              <p>Grundreinigung für Treppenhäuser, Eingangsbereiche und Allgemeinflächen in verwalteten Wohn- und Geschäftshäusern.</p>
            </article>
          </div>
        </div>
      </section>

      <section class="white">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Ablauf</div>
            <h2>Von der Zustandseinschätzung zum objektbezogenen Angebot.</h2>
          </div>

          <div class="steps">
            <div class="step">
              <span>01</span>
              <h3>Bedarf klären</h3>
              <p>Objektart, Flächen, Zustand, gewünschtes Ergebnis und Zeitfenster.</p>
            </div>
            <div class="step">
              <span>02</span>
              <h3>Kostenfrei besichtigen</h3>
              <p>Bei Bedarf prüfen wir das Objekt vor Ort und ordnen Aufwand und Machbarkeit realistisch ein.</p>
            </div>
            <div class="step">
              <span>03</span>
              <h3>Angebot erhalten</h3>
              <p>Sie erhalten ein unverbindliches Angebot mit klar abgegrenztem Leistungsumfang.</p>
            </div>
            <div class="step">
              <span>04</span>
              <h3>Umsetzung abstimmen</h3>
              <p>Nach Freigabe erfolgt die Reinigung im vereinbarten Zeitfenster.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Einsatzgebiet</div>
            <h2>Grundreinigung in Berlin — mit Fokus auf planbare Umsetzung und klare Objektlogik.</h2>
            <p class="section-text">
              Nautilus Facility Cleaning übernimmt Grundreinigungen in Berlin für Büros, Praxen, Treppenhäuser, Hausverwaltungen und gewerbliche Objekte. Entscheidend sind kurze Abstimmungswege, realistische Einschätzung und verlässliche Durchführung.
            </p>
          </div>

          <div class="area-layout">
            <aside class="area-card">
              <div class="eyebrow">Berlin</div>
              <h3>Schwerpunkt in Ihren relevanten Bezirken.</h3>
              <p>
                Wir sind insbesondere in den Berliner Bezirken Lichtenberg, Marzahn-Hellersdorf, Friedrichshain-Kreuzberg, Pankow und Mitte aktiv. Weitere Bezirke prüfen wir objektbezogen nach Lage, Aufwand und gewünschtem Zeitfenster.
              </p>
              <div class="area-pills" aria-label="Einsatzgebiete Berlin">
                <span class="area-pill">Lichtenberg</span>
                <span class="area-pill">Marzahn-Hellersdorf</span>
                <span class="area-pill">Friedrichshain-Kreuzberg</span>
                <span class="area-pill">Pankow</span>
                <span class="area-pill">Mitte</span>
              </div>
              <div class="area-note">
                Besonders geeignet für Grundreinigung nach Nutzung, Renovierung, Umbau, Übergabe, Mieterwechsel oder erhöhtem Sonderbedarf.
              </div>
            </aside>

            <div class="cta">
              <div>
                <div class="eyebrow">Kostenfreie Besichtigung</div>
                <h2>Objekt prüfen lassen. Aufwand realistisch einordnen.</h2>
                <p>
                  Wir ordnen Zustand, Flächen, Bodenbeläge, Sanitärbereiche, Nutzungsspuren und gewünschtes Ergebnis sauber ein. Danach erhalten Sie ein unverbindliches Angebot mit klar abgegrenztem Leistungsumfang.
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
            <h2>Häufige Fragen zur Grundreinigung.</h2>
          </div>

          <div class="faq">
            <details>
              <summary>Wann ist eine Grundreinigung sinnvoll?</summary>
              <p>Eine Grundreinigung ist sinnvoll, wenn laufende Unterhaltsreinigung nicht ausreicht, ein Objekt sichtbar aufgewertet werden soll oder Reinigung nach Renovierung, Umzug, Übergabe oder intensiver Nutzung erforderlich ist.</p>
            </details>

            <details>
              <summary>Für welche Objekte bieten Sie Grundreinigung an?</summary>
              <p>Wir übernehmen Grundreinigungen für Büros, Praxen, Kanzleien, Treppenhäuser, Allgemeinflächen, Hausverwaltungen und gewerbliche Objekte in Berlin.</p>
            </details>

            <details>
              <summary>Ist eine Besichtigung vorab notwendig?</summary>
              <p>Für ein belastbares Angebot ist eine kurze Besichtigung sinnvoll, weil Zustand, Flächen, Bodenbeläge, Verschmutzungsgrad und gewünschtes Ergebnis realistisch eingeordnet werden müssen.</p>
            </details>

            <details>
              <summary>Was ist der Unterschied zwischen Grundreinigung und Unterhaltsreinigung?</summary>
              <p>Unterhaltsreinigung erfolgt regelmäßig und laufend. Eine Grundreinigung ist intensiver, objektbezogen und wird meist bei erhöhtem Bedarf, vor Übergabe, nach Renovierung oder zur sichtbaren Aufwertung durchgeführt.</p>
            </details>

            <details>
              <summary>Bieten Sie auch Baufeinreinigung oder Sonderreinigung an?</summary>
              <p>Ja. Je nach Objekt und Bedarf übernehmen wir auch Baufeinreinigung, Sonderreinigung, Übergabereinigung und ergänzende Reinigungsleistungen nach klarer Abstimmung.</p>
            </details>

            <details>
              <summary>Wie wird das Angebot erstellt?</summary>
              <p>Nach Bedarfsklärung oder kostenfreier Besichtigung erhalten Sie ein unverbindliches, objektbezogenes Angebot mit klar abgegrenztem Leistungsumfang.</p>
            </details>

            <details>
              <summary>Wie schnell kann eine Grundreinigung umgesetzt werden?</summary>
              <p>Das hängt von Objektlage, Umfang, Zustand, Zugänglichkeit und aktueller Kapazität ab. Nach der Klärung stimmen wir ein realistisches Zeitfenster ab.</p>
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
              Professionelle Grundreinigung in Berlin für Büros, Praxen, Treppenhäuser, Hausverwaltungen und gewerbliche Objekte.
            </p>
            <p style="margin:18px 0 0; color:#7E7367; line-height:1.75;">
              Geschäftsbereich der Nautilus Security UG (haftungsbeschränkt)
            </p>
          </div>

          <div>
            <div class="footer-title">Grundreinigung Berlin</div>
            <div class="footer-links">
              <a href="#leistungen">Leistungsumfang</a>
              <a href="#leistungen">Böden und Oberflächen</a>
              <a href="#leistungen">Sanitär- und Nebenbereiche</a>
              <a href="#leistungen">Übergabe und Sonderbedarf</a>
              <a href="#faq">Häufige Fragen</a>
            </div>
          </div>

          <div>
            <div class="footer-title">Weitere Leistungen</div>
            <div class="footer-links">
              <a href="/bueroreinigung-berlin/">Büroreinigung Berlin</a>
              <a href="/praxisreinigung-berlin/">Praxisreinigung Berlin</a>
              <a href="/treppenhausreinigung-berlin/">Treppenhausreinigung Berlin</a>
              <a href="/hausverwaltungen-berlin/">Reinigung für Hausverwaltungen</a>
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
          <span>Grundreinigung Berlin</span>
          <span>Sonderreinigung</span>
          <span>Übergabereinigung</span>
          <span>Baufeinreinigung</span>
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
