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
        --bg: #F7F4EE;
        --cream: #F3EFE7;
        --white: #FFFFFF;
        --text: #2C2C2C;
        --muted: #7E7367;
        --soft: #A79B8B;
        --line: #E5E1D8;
        --gold: #B79B6C;
        --gold-soft: rgba(183,155,108,.16);
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
        -webkit-font-smoothing: antialiased;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .nav {
        position: sticky;
        top: 0;
        z-index: 50;
        border-bottom: 1px solid rgba(229,225,216,.72);
        background: rgba(247,244,238,.94);
        backdrop-filter: blur(16px);
      }

      .nav-inner {
        max-width: 1240px;
        margin: 0 auto;
        padding: 16px 28px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 28px;
      }

      .brand {
        font-size: 11px;
        letter-spacing: .30em;
        text-transform: uppercase;
        font-weight: 800;
        color: var(--text);
      }

      .nav-links {
        display: flex;
        align-items: center;
        gap: 26px;
        font-size: 13px;
        color: var(--muted);
      }

      .nav-links a {
        transition: color .25s ease;
      }

      .nav-links a:hover {
        color: var(--gold);
      }

      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        padding: 15px 24px;
        background: var(--text);
        color: white;
        font-size: 14px;
        font-weight: 750;
        border: 1px solid var(--text);
        transition: transform .25s ease, box-shadow .25s ease, background .25s ease;
      }

      .button:hover {
        transform: translateY(-1px);
        box-shadow: 0 18px 45px rgba(44,44,44,.16);
      }

      .button.secondary {
        background: transparent;
        color: var(--text);
        border: 1px solid var(--line);
      }

      .button.secondary:hover {
        border-color: rgba(183,155,108,.55);
        box-shadow: 0 16px 38px rgba(183,155,108,.10);
      }

      .hero {
        position: relative;
        overflow: hidden;
        background: #F3EFE7;
        padding: 128px 28px 110px;
      }

      .hero::after {
        content: "";
        position: absolute;
        inset: auto -12% -42% 48%;
        height: 360px;
        background: radial-gradient(circle, rgba(255,255,255,.42), transparent 68%);
        pointer-events: none;
      }

      .container {
        max-width: 1240px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
      }

      .hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.12fr) minmax(320px, .88fr);
        gap: 72px;
        align-items: center;
      }

      .eyebrow {
        color: var(--gold);
        font-size: 11px;
        font-weight: 850;
        letter-spacing: .36em;
        text-transform: uppercase;
      }

      h1 {
        margin: 26px 0 0;
        max-width: 900px;
        font-size: clamp(44px, 6.4vw, 86px);
        line-height: .96;
        letter-spacing: -0.06em;
        font-weight: 650;
      }

      .lead {
        margin-top: 30px;
        max-width: 720px;
        color: var(--muted);
        font-size: 18px;
        line-height: 1.9;
      }

      .hero-actions {
        margin-top: 42px;
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
      }

      .hero-card {
        background: rgba(255,255,255,.68);
        border: 1px solid rgba(229,225,216,.86);
        border-radius: 28px;
        padding: 38px;
        box-shadow: 0 22px 60px rgba(44,44,44,.045);
      }

      .hero-card strong {
        display: block;
        font-size: 20px;
        line-height: 1.25;
        margin-bottom: 18px;
        letter-spacing: -0.02em;
      }

      .hero-card p {
        color: var(--muted);
        line-height: 1.85;
        margin: 0;
        font-size: 15px;
      }

      section {
        padding: 104px 28px;
      }

      section.white {
        background: var(--white);
      }

      .section-head {
        max-width: 860px;
        margin-bottom: 52px;
      }

      h2 {
        margin: 18px 0 0;
        font-size: clamp(32px, 4.2vw, 54px);
        line-height: 1.05;
        letter-spacing: -0.045em;
        font-weight: 650;
      }

      .section-text {
        margin-top: 22px;
        max-width: 780px;
        color: var(--muted);
        font-size: 16px;
        line-height: 1.85;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 26px;
      }

      .card {
        background: var(--white);
        border: 1px solid var(--line);
        border-radius: 22px;
        padding: 32px;
        box-shadow: 0 4px 15px rgba(0,0,0,.02);
        transition: transform .45s ease, border-color .45s ease, box-shadow .45s ease;
      }

      .card:hover {
        transform: translateY(-4px);
        border-color: rgba(183,155,108,.50);
        box-shadow: 0 15px 40px rgba(183,155,108,.08);
      }

      .white .card {
        background: var(--bg);
      }

      .card h3 {
        margin: 0;
        font-size: 23px;
        line-height: 1.18;
        letter-spacing: -0.025em;
      }

      .card p {
        margin: 18px 0 0;
        color: var(--muted);
        line-height: 1.78;
        font-size: 15px;
      }

      ul.clean {
        list-style: none;
        padding: 22px 0 0;
        margin: 24px 0 0;
        display: grid;
        gap: 12px;
        color: #6F6559;
        line-height: 1.55;
        border-top: 1px solid rgba(229,225,216,.95);
      }

      ul.clean li {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        font-size: 14px;
      }

      ul.clean li::before {
        content: "";
        width: 6px;
        height: 6px;
        border-radius: 99px;
        background: var(--gold);
        box-shadow: 0 0 8px rgba(183,155,108,.6);
        flex: 0 0 auto;
        margin-top: 8px;
      }

      .steps {
        display: grid;
        grid-template-columns: repeat(4, minmax(0,1fr));
        gap: 22px;
      }

      .step {
        border-top: 1px solid var(--line);
        padding-top: 24px;
      }

      .step span {
        color: var(--gold);
        font-weight: 850;
        font-size: 12px;
        letter-spacing: .24em;
      }

      .step h3 {
        margin: 18px 0 0;
        font-size: 21px;
        letter-spacing: -0.02em;
      }

      .step p {
        color: var(--muted);
        line-height: 1.75;
      }

      .faq {
        display: grid;
        gap: 14px;
      }

      details {
        background: var(--white);
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 24px 26px;
        box-shadow: 0 8px 28px rgba(44,44,44,.025);
      }

      .white details {
        background: var(--bg);
      }

      summary {
        cursor: pointer;
        font-weight: 750;
        font-size: 17px;
        letter-spacing: -0.01em;
      }

      details p {
        color: var(--muted);
        line-height: 1.78;
        margin: 16px 0 0;
      }

      .cta {
        background: #2C2C2C;
        color: white;
        border-radius: 34px;
        padding: 52px;
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 34px;
        align-items: center;
        box-shadow: 0 24px 70px rgba(44,44,44,.10);
      }

      .cta h2 {
        color: white;
        margin-top: 0;
        max-width: 760px;
      }

      .cta p {
        color: rgba(255,255,255,.72);
        line-height: 1.8;
        max-width: 740px;
      }

      .cta .button {
        background: white;
        color: #2C2C2C;
        border-color: white;
        white-space: nowrap;
      }

      footer {
        padding: 48px 28px;
        border-top: 1px solid var(--line);
        color: var(--muted);
        font-size: 14px;
        background: var(--bg);
      }

      footer strong {
        color: var(--text);
      }

      footer a {
        color: var(--text);
      }

      footer a:hover {
        color: var(--gold);
      }

      @media (max-width: 980px) {
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
          padding-top: 86px;
        }

        section {
          padding: 82px 22px;
        }

        .hero-card,
        .card,
        .cta {
          border-radius: 24px;
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
          <a href="https://nautilus-facility.de/#kontakt">Kontakt</a>
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
              <a class="button" href="https://nautilus-facility.de/#kontakt">Kostenfreie Besichtigung anfragen</a>
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
            <a class="button" href="https://nautilus-facility.de/#kontakt">Anfrage stellen</a>
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
