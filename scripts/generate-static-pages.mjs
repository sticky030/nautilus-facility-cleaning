import { mkdirSync, writeFileSync } from "node:fs";

const baseUrl = "https://nautilus-facility.de";

const page = {
  slug: "praxisreinigung-berlin",
  title: "Praxisreinigung Berlin | Arztpraxis & Zahnarztpraxis | Nautilus",
  description:
    "Praxisreinigung in Berlin für Arztpraxen, Zahnarztpraxen und Privatpraxen. RKI/KRINKO-orientierte Abläufe, 4-Farben-System und kostenfreie Besichtigung.",
  h1: "Praxisreinigung Berlin für Arztpraxen, Zahnarztpraxen und Privatpraxen",
};

const html = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/images/reinigung-trans.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>${page.title}</title>
    <meta name="description" content="${page.description}" />
    <link rel="canonical" href="${baseUrl}/${page.slug}/" />

    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${baseUrl}/${page.slug}/" />
    <meta property="og:site_name" content="Nautilus Facility Cleaning" />
    <meta property="og:image" content="${baseUrl}/images/reinigung-trans.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${page.title}" />
    <meta name="twitter:description" content="${page.description}" />
    <meta name="twitter:image" content="${baseUrl}/images/reinigung-trans.png" />

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Nautilus Facility Cleaning",
      "legalName": "Nautilus Security UG (haftungsbeschränkt)",
      "image": "${baseUrl}/images/reinigung-trans.png",
      "description": "Praxisreinigung in Berlin für Arztpraxen, Zahnarztpraxen, Privatpraxen und medizinisch genutzte Räume.",
      "url": "${baseUrl}/${page.slug}/",
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
        "Praxisreinigung",
        "Arztpraxis Reinigung",
        "Zahnarztpraxis Reinigung",
        "Unterhaltsreinigung",
        "RKI KRINKO Hygieneempfehlungen",
        "4-Farben-Tuchsystem"
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Praxisreinigung in Berlin"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Reinigung von Arztpraxen in Berlin"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Reinigung von Zahnarztpraxen in Berlin"
          }
        }
      ]
    }
    </script>

    <style>
      :root {
        --bg: #f7f4ee;
        --cream: #f3efe7;
        --white: #ffffff;
        --text: #2c2c2c;
        --muted: #7e7367;
        --line: #e5e1d8;
        --gold: #b79b6c;
      }

      * {
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        margin: 0;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: var(--bg);
        color: var(--text);
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .nav {
        position: sticky;
        top: 0;
        z-index: 50;
        border-bottom: 1px solid rgba(229,225,216,.8);
        background: rgba(247,244,238,.88);
        backdrop-filter: blur(18px);
      }

      .nav-inner {
        max-width: 1180px;
        margin: 0 auto;
        padding: 18px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
      }

      .brand {
        font-size: 13px;
        letter-spacing: .22em;
        text-transform: uppercase;
        font-weight: 700;
      }

      .nav-links {
        display: flex;
        align-items: center;
        gap: 24px;
        font-size: 14px;
        color: var(--muted);
      }

      .nav-links a:hover {
        color: var(--gold);
      }

      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        padding: 14px 22px;
        background: var(--text);
        color: white;
        font-size: 14px;
        font-weight: 700;
        transition: transform .25s ease, box-shadow .25s ease;
      }

      .button:hover {
        transform: translateY(-1px);
        box-shadow: 0 14px 35px rgba(44,44,44,.18);
      }

      .button.secondary {
        background: transparent;
        color: var(--text);
        border: 1px solid var(--line);
      }

      .hero {
        background: var(--cream);
        padding: 110px 24px 96px;
      }

      .container {
        max-width: 1180px;
        margin: 0 auto;
      }

      .hero-grid {
        display: grid;
        grid-template-columns: 1.1fr .9fr;
        gap: 56px;
        align-items: center;
      }

      .eyebrow {
        color: var(--gold);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: .35em;
        text-transform: uppercase;
      }

      h1 {
        margin: 24px 0 0;
        max-width: 850px;
        font-size: clamp(42px, 6vw, 76px);
        line-height: .98;
        letter-spacing: -0.055em;
        font-weight: 650;
      }

      .lead {
        margin-top: 28px;
        max-width: 680px;
        color: var(--muted);
        font-size: 18px;
        line-height: 1.85;
      }

      .hero-actions {
        margin-top: 38px;
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
      }

      .hero-card {
        background: rgba(255,255,255,.68);
        border: 1px solid var(--line);
        border-radius: 28px;
        padding: 34px;
        box-shadow: 0 24px 70px rgba(44,44,44,.06);
      }

      .hero-card strong {
        display: block;
        font-size: 18px;
        margin-bottom: 14px;
      }

      .hero-card p {
        color: var(--muted);
        line-height: 1.75;
        margin: 0;
      }

      section {
        padding: 92px 24px;
      }

      section.white {
        background: var(--white);
      }

      .section-head {
        max-width: 820px;
        margin-bottom: 46px;
      }

      h2 {
        margin: 16px 0 0;
        font-size: clamp(30px, 4vw, 48px);
        line-height: 1.08;
        letter-spacing: -0.04em;
        font-weight: 650;
      }

      .section-text {
        margin-top: 20px;
        max-width: 760px;
        color: var(--muted);
        font-size: 16px;
        line-height: 1.8;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 24px;
      }

      .card {
        background: var(--white);
        border: 1px solid var(--line);
        border-radius: 22px;
        padding: 30px;
        box-shadow: 0 8px 30px rgba(44,44,44,.035);
      }

      .white .card {
        background: var(--bg);
      }

      .card h3 {
        margin: 0;
        font-size: 22px;
        line-height: 1.2;
      }

      .card p {
        margin: 16px 0 0;
        color: var(--muted);
        line-height: 1.75;
      }

      ul.clean {
        list-style: none;
        padding: 0;
        margin: 24px 0 0;
        display: grid;
        gap: 13px;
        color: #6f6559;
        line-height: 1.55;
      }

      ul.clean li {
        display: flex;
        gap: 12px;
        align-items: flex-start;
      }

      ul.clean li::before {
        content: "";
        width: 6px;
        height: 6px;
        border-radius: 99px;
        background: var(--gold);
        box-shadow: 0 0 8px rgba(183,155,108,.6);
        flex: 0 0 auto;
        margin-top: 9px;
      }

      .steps {
        display: grid;
        grid-template-columns: repeat(4, minmax(0,1fr));
        gap: 18px;
      }

      .step {
        border-top: 1px solid var(--line);
        padding-top: 22px;
      }

      .step span {
        color: var(--gold);
        font-weight: 800;
        font-size: 12px;
        letter-spacing: .22em;
      }

      .step h3 {
        margin: 18px 0 0;
        font-size: 20px;
      }

      .step p {
        color: var(--muted);
        line-height: 1.7;
      }

      .faq {
        display: grid;
        gap: 14px;
      }

      details {
        background: var(--white);
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 22px 24px;
      }

      summary {
        cursor: pointer;
        font-weight: 700;
        font-size: 17px;
      }

      details p {
        color: var(--muted);
        line-height: 1.75;
        margin: 16px 0 0;
      }

      .cta {
        background: #2c2c2c;
        color: white;
        border-radius: 32px;
        padding: 46px;
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 28px;
        align-items: center;
      }

      .cta h2 {
        color: white;
        margin-top: 0;
      }

      .cta p {
        color: rgba(255,255,255,.72);
        line-height: 1.75;
        max-width: 720px;
      }

      .cta .button {
        background: white;
        color: #2c2c2c;
      }

      footer {
        padding: 48px 24px;
        border-top: 1px solid var(--line);
        color: var(--muted);
        font-size: 14px;
      }

      @media (max-width: 900px) {
        .hero-grid,
        .grid,
        .steps,
        .cta {
          grid-template-columns: 1fr;
        }

        .nav-links {
          display: none;
        }

        .hero {
          padding-top: 82px;
        }
      }
    </style>
  </head>

  <body>
    <header class="nav">
      <div class="nav-inner">
        <a class="brand" href="/">Nautilus Facility Cleaning</a>
        <nav class="nav-links" aria-label="Navigation">
          <a href="/">Startseite</a>
          <a href="/bueroreinigung-berlin/">Büroreinigung</a>
          <a href="/treppenhausreinigung-berlin/">Treppenhausreinigung</a>
          <a href="/hausverwaltungen-berlin/">Hausverwaltungen</a>
          <a href="/#kontakt">Kontakt</a>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <div class="eyebrow">Praxisreinigung Berlin</div>
            <h1>${page.h1}</h1>
            <p class="lead">
              Nautilus Facility Cleaning bietet strukturierte Praxisreinigung für medizinisch genutzte Räume in Berlin. Im Fokus stehen klar abgestimmte Abläufe, hygienebewusste Reinigung, Kontaktflächen und eine verlässliche Umsetzung passend zum Praxisbetrieb.
            </p>
            <div class="hero-actions">
              <a class="button" href="/#kontakt">Kostenfreie Besichtigung anfragen</a>
              <a class="button secondary" href="#leistungen">Leistungsumfang ansehen</a>
            </div>
          </div>

          <aside class="hero-card">
            <strong>Für sensible Praxisbereiche</strong>
            <p>
              Die Reinigung wird objektbezogen auf Raumstruktur, Sanitärbereiche, Kontaktflächen, Turnus und Zeitfenster abgestimmt. So entsteht ein klares Leistungsbild statt pauschaler Schnellangaben.
            </p>
          </aside>
        </div>
      </section>

      <section id="leistungen" class="white">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Leistungsbild</div>
            <h2>Praxisreinigung mit klar getrennten Reinigungsbereichen.</h2>
            <p class="section-text">
              Für Arztpraxen, Zahnarztpraxen und Privatpraxen zählt nicht nur sichtbare Sauberkeit. Entscheidend sind nachvollziehbare Abläufe, getrennte Reinigungsbereiche und eine Umsetzung, die sich ruhig in den Praxisbetrieb einfügt.
            </p>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Empfang & Wartebereich</h3>
              <p>Gepflegte Eingangs- und Wartezonen für einen professionellen ersten Eindruck bei Patienten und Besuchern.</p>
              <ul class="clean">
                <li>Oberflächen, Tresen und Sitzbereiche</li>
                <li>Patientennahe Kontaktflächen</li>
                <li>Bodenreinigung nach Nutzungsfrequenz</li>
              </ul>
            </article>

            <article class="card">
              <h3>Sanitär & Kontaktflächen</h3>
              <p>Hygieneorientierte Reinigung von Sanitärzonen und häufig berührten Flächen nach abgestimmtem Leistungsplan.</p>
              <ul class="clean">
                <li>Sanitärbereiche und Nebenflächen</li>
                <li>Türgriffe, Lichtschalter und Griffe</li>
                <li>Reinigung nach definiertem Turnus</li>
              </ul>
            </article>

            <article class="card">
              <h3>4-Farben-System</h3>
              <p>Klare Trennung unterschiedlicher Reinigungsbereiche zur Reduzierung von Kreuzkontaminationen.</p>
              <ul class="clean">
                <li>Getrennte Tücher je Reinigungsbereich</li>
                <li>Definierte Abläufe für sensible Zonen</li>
                <li>RKI/KRINKO-orientierte Reinigungslogik</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">Geeignet für</div>
            <h2>Für Praxen mit Anspruch an Struktur, Diskretion und verlässliche Abläufe.</h2>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Arztpraxen</h3>
              <p>Regelmäßige Reinigung von Empfang, Wartebereich, Sanitärzonen, Böden und Kontaktflächen.</p>
            </article>
            <article class="card">
              <h3>Zahnarztpraxen</h3>
              <p>Reinigung abgestimmt auf sensible Praxisbereiche, Zeitfenster und vorhandene Zugangsregelungen.</p>
            </article>
            <article class="card">
              <h3>Privat- & Facharztpraxen</h3>
              <p>Diskrete Durchführung mit gepflegtem Gesamteindruck für Patienten, Personal und Praxisleitung.</p>
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
              <p>Bei Bedarf prüfen wir die Praxis kurz vor Ort und ordnen den Aufwand realistisch ein.</p>
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
            <h2>Praxisreinigung in Berlin.</h2>
            <p class="section-text">
              Unser Einsatzgebiet liegt in Berlin, insbesondere in Lichtenberg, Marzahn-Hellersdorf, Friedrichshain-Kreuzberg, Pankow und Mitte. Weitere Bezirke sind nach Abstimmung möglich.
            </p>
          </div>

          <div class="cta">
            <div>
              <h2>Kostenfreie Besichtigung für Ihre Praxis anfragen.</h2>
              <p>
                Senden Sie uns kurz Objektart, Adresse, gewünschten Turnus und besondere Anforderungen. Wir melden uns kurzfristig zurück und klären den passenden nächsten Schritt.
              </p>
            </div>
            <a class="button" href="/#kontakt">Anfrage stellen</a>
          </div>
        </div>
      </section>

      <section class="white">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">FAQ</div>
            <h2>Häufige Fragen zur Praxisreinigung.</h2>
          </div>

          <div class="faq">
            <details>
              <summary>Orientiert sich die Praxisreinigung an RKI/KRINKO-Empfehlungen?</summary>
              <p>Unsere Abläufe orientieren sich an relevanten Hygieneempfehlungen für sensible Praxisbereiche, unter anderem im Umgang mit Kontaktflächen, Sanitärbereichen und klar getrennten Reinigungszonen.</p>
            </details>

            <details>
              <summary>Arbeiten Sie mit einem 4-Farben-Tuchsystem?</summary>
              <p>Ja. Für getrennte Reinigungsbereiche nutzen wir ein 4-Farben-Tuchsystem, um unterschiedliche Bereiche klar voneinander abzugrenzen und Kreuzkontaminationen zu reduzieren.</p>
            </details>

            <details>
              <summary>Reinigen Sie außerhalb der Praxiszeiten?</summary>
              <p>Ja, passende Zeitfenster außerhalb oder rund um den Praxisbetrieb sind nach Abstimmung möglich. Entscheidend sind Zugang, Schließlogik und gewünschter Turnus.</p>
            </details>

            <details>
              <summary>Erstellen Sie ein Angebot ohne Besichtigung?</summary>
              <p>Eine erste Einschätzung ist möglich. Für ein belastbares Angebot empfehlen wir eine kurze kostenfreie Besichtigung, damit Raumstruktur, Sanitärbereiche und Kontaktflächen sauber eingeordnet werden können.</p>
            </details>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div class="container">
        <strong>Nautilus Facility Cleaning</strong><br />
        Geschäftsbereich der Nautilus Security UG (haftungsbeschränkt)<br />
        Telefon: 0176 22844636 · E-Mail: kontakt@nautilus-facility.de<br />
        <br />
        <a href="/">Startseite</a> · <a href="/impressum/">Impressum</a> · <a href="/datenschutz/">Datenschutz</a>
      </div>
    </footer>
  </body>
</html>`;

mkdirSync(`dist/${page.slug}`, { recursive: true });
writeFileSync(`dist/${page.slug}/index.html`, html, "utf8");

console.log(`Static SEO page generated: dist/${page.slug}/index.html`);
