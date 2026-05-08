import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const baseUrl = "https://nautilus-facility.de";
const slug = "fensterreinigung-berlin";

const title = "Fensterreinigung Berlin | Glasreinigung & Sonderreinigung";
const description =
  "Fensterreinigung in Berlin für Büros, Praxen, Hausverwaltungen und Gewerbeflächen. Glasflächen, Rahmen nach Absprache und Sonderreinigung.";

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
      "description": "Fensterreinigung, Glasreinigung und Sonderreinigung in Berlin für Büros, Praxen, Hausverwaltungen und gewerbliche Objekte.",
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
        "Fensterreinigung",
        "Glasreinigung",
        "Rahmenreinigung",
        "Sonderreinigung",
        "Reinigung von Sichtflächen",
        "Gewerbereinigung",
        "Büroreinigung",
        "Praxisreinigung",
        "Hausverwaltungen"
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fensterreinigung in Berlin"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Glasreinigung für Gewerbeobjekte"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sonderreinigung für Sichtflächen und Eingangsbereiche"
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
            <div class="eyebrow">Fensterreinigung Berlin</div>
            <h1>Fensterreinigung Berlin für Büros, Praxen und gewerbliche Objekte</h1>
            <p class="lead">
              Nautilus Facility Cleaning bietet Fensterreinigung, Glasreinigung und objektbezogene Sonderreinigung für gewerbliche Objekte in Berlin. Der Fokus liegt auf gepflegten Sichtflächen, sauberen Eingangsbereichen und einer klar abgestimmten Umsetzung nach Objektstruktur und Zugänglichkeit.
            </p>
            <div class="hero-actions">
              <a class="button" href="https://nautilus-facility.de/?kontakt=1#kontakt" onclick="sessionStorage.setItem('scrollToContact', '1')">Kostenfreie Besichtigung anfragen</a>
              <a class="button secondary" href="#leistungen">Leistungsumfang ansehen</a>
            </div>
          </div>

          <aside class="hero-card">
            <strong>Klare Sichtflächen für einen professionellen Objekteindruck</strong>
            <p>
              Wir prüfen Glasflächen, Rahmen, Zugänglichkeit, Verschmutzungsgrad, Sicherheitslage und gewünschtes Ergebnis objektbezogen. So entsteht ein realistischer Leistungsumfang statt pauschaler Zusagen.
            </p>
          </aside>
        </div>
      </section>

      <section id="leistungen" class="white">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Leistungsbild</div>
            <h2>Fensterreinigung mit klarer Abstimmung von Fläche, Zugang und Ergebnis.</h2>
            <p class="section-text">
              Fenster und Glasflächen prägen den ersten Eindruck eines Objekts. Besonders bei Büros, Praxen, Kanzleien, Eingangsbereichen und verwalteten Objekten wirken saubere Sichtflächen unmittelbar auf Kunden, Patienten, Besucher und Mitarbeitende.
            </p>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Fenster & Glasflächen</h3>
              <p>Reinigung von Glasflächen nach Objektstruktur, Verschmutzungsgrad und Zugänglichkeit.</p>
              <ul class="clean">
                <li>Fensterflächen innen und nach Absprache außen</li>
                <li>Glasflächen in Büros, Praxen und Gewerbeobjekten</li>
                <li>sichtbare Flächen für einen gepflegten Eindruck</li>
              </ul>
            </article>

            <article class="card">
              <h3>Rahmen & Sichtbereiche</h3>
              <p>Rahmen, Kanten und angrenzende Sichtbereiche können nach Absprache in den Leistungsumfang aufgenommen werden.</p>
              <ul class="clean">
                <li>Rahmenreinigung nach Zustand und Vereinbarung</li>
                <li>Fensterbänke und angrenzende Sichtflächen</li>
                <li>klare Abgrenzung des Leistungsumfangs vor Beginn</li>
              </ul>
            </article>

            <article class="card">
              <h3>Sonderreinigung</h3>
              <p>Ergänzende Reinigung für Eingangsbereiche, Glasabtrennungen, Sichtflächen und objektbezogene Zusatzbedarfe.</p>
              <ul class="clean">
                <li>Glas- und Sichtflächen nach besonderer Nutzung</li>
                <li>Sonderbedarf vor Terminen oder Übergaben</li>
                <li>Zusatzleistung zur laufenden Unterhaltsreinigung</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Objektbereiche</div>
            <h2>Für welche Objekte ist Fensterreinigung sinnvoll?</h2>
            <p class="section-text">
              Der Leistungsumfang hängt von Glasfläche, Höhe, Zugänglichkeit, Verschmutzungsgrad, Rahmenzustand, Sicherheitslage und gewünschtem Ergebnis ab. Deshalb wird die Fensterreinigung objektbezogen geplant.
            </p>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Büros & Kanzleien</h3>
              <p>Für Unternehmen, Agenturen, Kanzleien und Beratungsbüros, bei denen gepflegte Sichtflächen den professionellen Eindruck unterstützen.</p>
              <ul class="clean">
                <li>Fensterflächen und Glastüren</li>
                <li>Besprechungs- und Empfangsbereiche</li>
                <li>ergänzend zur Büroreinigung</li>
              </ul>
            </article>

            <article class="card">
              <h3>Praxen & Empfangsbereiche</h3>
              <p>Für Arztpraxen, Zahnarztpraxen und Privatpraxen, bei denen Eingangs- und Wartebereiche gepflegt und ruhig wirken sollen.</p>
              <ul class="clean">
                <li>Glasflächen in Empfangsbereichen</li>
                <li>Sichtflächen in Warte- und Nebenbereichen</li>
                <li>Umsetzung passend zum Praxisbetrieb</li>
              </ul>
            </article>

            <article class="card">
              <h3>Hausverwaltungen</h3>
              <p>Für verwaltete Objekte, Eingangsbereiche, Allgemeinflächen und Wohn- oder Geschäftshäuser mit objektbezogenem Zusatzbedarf.</p>
              <ul class="clean">
                <li>Eingangs- und Allgemeinflächen</li>
                <li>Glasflächen nach Zugänglichkeit</li>
                <li>Sonderreinigung nach Abstimmung</li>
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
              <h2>Keine pauschale Glasflächen-Zusage ohne Blick auf Zugänglichkeit.</h2>
              <p class="section-text">
                Bei Fensterreinigung entscheidet die Objektstruktur über Aufwand und Machbarkeit. Relevant sind Flächen, Höhe, Zugang, Rahmenzustand, Verschmutzung, Sicherheitslage und gewünschtes Zeitfenster.
              </p>
            </div>

            <div class="premium-panel">
              <div class="eyebrow">Objektbezogen geplant</div>
              <h3>Fensterreinigung mit realistischer Einschätzung.</h3>
              <p>
                Wir stimmen vorab ab, welche Glasflächen gereinigt werden, ob Rahmen enthalten sind, welche Bereiche zugänglich sind und welches Ergebnis erwartet wird. Das sorgt für klare Leistung und verlässliche Planung.
              </p>
              <div class="detail-list">
                <div class="detail-item">Einschätzung von Glasflächen, Zugänglichkeit und Verschmutzungsgrad</div>
                <div class="detail-item">Rahmenreinigung nach Absprache und Zustand</div>
                <div class="detail-item">geeignet für Büros, Praxen, Hausverwaltungen und Gewerbeflächen</div>
                <div class="detail-item">als Einzelauftrag oder Zusatzleistung zur Unterhaltsreinigung</div>
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
            <h2>Für Objekte, bei denen Sichtflächen den professionellen Eindruck tragen.</h2>
            <p class="section-text">
              Fensterreinigung eignet sich besonders für repräsentative Flächen, Eingangsbereiche, Empfangszonen, Besprechungsräume und gewerblich genutzte Objekte mit regelmäßigem oder einmaligem Reinigungsbedarf.
            </p>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Unternehmen & Büros</h3>
              <p>Fenster- und Glasflächenreinigung für Arbeitsbereiche, Empfang, Besprechungsräume und repräsentative Büroflächen.</p>
            </article>
            <article class="card">
              <h3>Praxen & Kanzleien</h3>
              <p>Gepflegte Sichtflächen für sensible, diskrete und repräsentative Geschäftsräume mit Kunden- oder Patientenverkehr.</p>
            </article>
            <article class="card">
              <h3>Hausverwaltungen</h3>
              <p>Glas- und Sonderreinigung für Eingangsbereiche, Allgemeinflächen und verwaltete Wohn- oder Geschäftshäuser.</p>
            </article>
          </div>
        </div>
      </section>

      <section class="white">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Ablauf</div>
            <h2>Von der Flächenklärung zum objektbezogenen Angebot.</h2>
          </div>

          <div class="steps">
            <div class="step">
              <span>01</span>
              <h3>Flächen klären</h3>
              <p>Objektart, Glasflächen, Zugänglichkeit, Rahmen, Verschmutzung und gewünschtes Ergebnis.</p>
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
            <h2>Fensterreinigung in Berlin — mit Fokus auf klare Abstimmung und saubere Sichtflächen.</h2>
            <p class="section-text">
              Nautilus Facility Cleaning übernimmt Fensterreinigung, Glasreinigung und Sonderreinigung in Berlin für Büros, Praxen, Hausverwaltungen und gewerbliche Objekte. Entscheidend sind Zugänglichkeit, realistischer Aufwand und verlässliche Durchführung.
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
                Besonders geeignet als Einzelauftrag, ergänzende Objektleistung oder Zusatzleistung zur laufenden Unterhaltsreinigung.
              </div>
            </aside>

            <div class="cta">
              <div>
                <div class="eyebrow">Kostenfreie Besichtigung</div>
                <h2>Glasflächen prüfen lassen. Aufwand realistisch einordnen.</h2>
                <p>
                  Wir ordnen Glasflächen, Rahmen, Zugänglichkeit, Verschmutzungsgrad und gewünschtes Ergebnis sauber ein. Danach erhalten Sie ein unverbindliches Angebot mit klar abgegrenztem Leistungsumfang.
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
            <h2>Häufige Fragen zur Fensterreinigung.</h2>
          </div>

          <div class="faq">
            <details>
              <summary>Für welche Objekte bieten Sie Fensterreinigung an?</summary>
              <p>Wir bieten Fensterreinigung für Büros, Praxen, Kanzleien, Hausverwaltungen, Eingangsbereiche und gewerblich genutzte Objekte in Berlin an.</p>
            </details>

            <details>
              <summary>Werden Rahmen ebenfalls gereinigt?</summary>
              <p>Rahmenreinigung ist nach Absprache möglich. Der Umfang hängt von Zustand, Zugänglichkeit und gewünschtem Ergebnis ab und wird vorab klar abgegrenzt.</p>
            </details>

            <details>
              <summary>Ist eine Besichtigung vorab notwendig?</summary>
              <p>Für ein belastbares Angebot ist eine kurze Besichtigung sinnvoll, weil Glasflächen, Zugänglichkeit, Höhe, Rahmenzustand und Verschmutzungsgrad realistisch eingeordnet werden müssen.</p>
            </details>

            <details>
              <summary>Bieten Sie auch Sonderreinigung an?</summary>
              <p>Ja. Neben Fenster- und Glasreinigung übernehmen wir auch objektbezogene Sonderreinigungen für Sichtflächen, Eingangsbereiche und besondere Zusatzbedarfe.</p>
            </details>

            <details>
              <summary>Ist Fensterreinigung als Zusatzleistung zur Unterhaltsreinigung möglich?</summary>
              <p>Ja. Fensterreinigung kann als Einzelauftrag oder als ergänzende Leistung zur laufenden Büro-, Praxis- oder Treppenhausreinigung vereinbart werden.</p>
            </details>

            <details>
              <summary>Wie wird das Angebot erstellt?</summary>
              <p>Nach Bedarfsklärung oder kostenfreier Besichtigung erhalten Sie ein unverbindliches, objektbezogenes Angebot mit klar abgegrenztem Leistungsumfang.</p>
            </details>

            <details>
              <summary>Wie schnell kann eine Fensterreinigung umgesetzt werden?</summary>
              <p>Das hängt von Objektlage, Umfang, Zugänglichkeit, Wetter, Sicherheitslage und aktueller Kapazität ab. Nach der Klärung stimmen wir ein realistisches Zeitfenster ab.</p>
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
              Professionelle Fensterreinigung, Glasreinigung und Sonderreinigung in Berlin für Büros, Praxen, Hausverwaltungen und gewerbliche Objekte.
            </p>
            <p style="margin:18px 0 0; color:#7E7367; line-height:1.75;">
              Geschäftsbereich der Nautilus Security UG (haftungsbeschränkt)
            </p>
          </div>

          <div>
            <div class="footer-title">Fensterreinigung Berlin</div>
            <div class="footer-links">
              <a href="#leistungen">Leistungsumfang</a>
              <a href="#leistungen">Fenster und Glasflächen</a>
              <a href="#leistungen">Rahmen und Sichtbereiche</a>
              <a href="#leistungen">Sonderreinigung</a>
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
              <a href="/grundreinigung-berlin/">Grundreinigung Berlin</a>
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
          <span>Fensterreinigung Berlin</span>
          <span>Glasreinigung</span>
          <span>Sonderreinigung</span>
          <span>Rahmenreinigung</span>
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
