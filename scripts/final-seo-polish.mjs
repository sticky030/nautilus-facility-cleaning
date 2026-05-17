import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const contactHref = "https://nautilus-facility.de/?kontakt=1#kontakt";
const contactOnclick = "sessionStorage.setItem('scrollToContact', '1')";
const whatsappHref = "https://wa.me/4917622844636?text=Hallo%2C%20ich%20m%C3%B6chte%20eine%20Reinigungsanfrage%20f%C3%BCr%20Berlin%20stellen.%20Ich%20sende%20Ihnen%20Bezirk%2C%20Fl%C3%A4che%2C%20Termin%20und%20Fotos.";

const pagePolish = {
  "reinigung-nach-auszug-berlin": {
    eyebrow: "Warum Nautilus",
    h2: "Auszugsreinigung mit sauberer Erwartungsklärung statt unklarer Pauschale.",
    text:
      "Bei einer Reinigung nach Auszug ist der entscheidende Punkt nicht nur die Quadratmeterzahl. Wichtig sind Zustand, Übergabetermin, Nutzungsspuren, Küche, Bad, Böden, Fenster, Rahmen und die Frage, ob das Objekt leer oder noch teilweise möbliert ist. Genau deshalb arbeitet Nautilus Facility Cleaning mit einer objektbezogenen Einschätzung: erst Bedarf klären, dann Leistungsumfang festlegen, dann realistisch umsetzen.",
    cards: [
      ["Zeitkritische Übergaben", "Wenn der Rückgabetermin feststeht, muss der Ablauf sitzen. Wir prüfen vorher, welche Bereiche wirklich übergaberelevant sind und ob der gewünschte Termin realistisch umsetzbar ist."],
      ["Klare Leistungsgrenzen", "Fenster, Rahmen, Balkon, Keller, starke Verschmutzungen oder Sonderflächen werden nicht versteckt vorausgesetzt, sondern vorab sauber eingeordnet."],
      ["Bessere Einschätzung durch Fotos", "Fotos von Küche, Bad, Böden, Fenstern und Gesamtzustand helfen, Aufwand und mögliche Rückfragen deutlich schneller zu klären."],
    ],
  },
  "uebergabereinigung-berlin": {
    eyebrow: "Übergabelogik",
    h2: "Übergabereinigung muss zum Termin, zum Objekt und zum Zielzustand passen.",
    text:
      "Eine Übergabe ist häufig der Moment, in dem kleine Details sichtbar werden: Kalk im Sanitärbereich, Rückstände in der Küche, Staub auf Fensterbänken, Spuren an Türen, Rahmen, Griffen oder Böden. Deshalb wird bei Nautilus Facility Cleaning nicht nur eine Reinigungsleistung verkauft, sondern der konkrete Übergabezustand eingeordnet. Das schafft Klarheit für Mieter, Vermieter, Eigentümer, Verwaltungen und Gewerbekunden.",
    cards: [
      ["Für Wohnungsübergaben", "Geeignet vor Rückgabe, Neuvermietung, Einzug oder nach Leerstand, wenn ein Objekt wieder sauber und präsentabel sein soll."],
      ["Für Gewerbeflächen", "Auch kleinere Büros, Praxen, Kanzleien oder Gewerberäume können nach Nutzung oder vor Rückgabe objektbezogen gereinigt werden."],
      ["Für realistische Angebote", "Der Umfang wird vorab festgelegt, damit klar ist, was enthalten ist und welche Zusatzbereiche gesondert abgestimmt werden."],
    ],
  },
  "bauendreinigung-berlin": {
    eyebrow: "Bauabschluss",
    h2: "Bauendreinigung braucht mehr Tiefe als eine normale Unterhaltsreinigung.",
    text:
      "Nach Bau-, Umbau- oder Renovierungsarbeiten verteilt sich feiner Staub häufig über das gesamte Objekt. Er liegt auf Böden, Rahmen, Fensterbänken, Türen, Heizkörpern, Sanitärbereichen, Küchenflächen und Kontaktpunkten. Eine saubere Bauendreinigung muss deshalb strukturiert geplant werden: Welche Arbeiten wurden ausgeführt, welche Rückstände sind vorhanden, welche Bereiche sind zugänglich und welcher Zielzustand wird für Nutzung, Übergabe oder Abnahme erwartet?",
    cards: [
      ["Nach Handwerkerarbeiten", "Malerarbeiten, Bodenarbeiten, Trockenbau oder kleinere Umbauten erzeugen unterschiedliche Rückstände. Diese Unterschiede müssen vorab berücksichtigt werden."],
      ["Vor Abnahme oder Nutzung", "Der Fokus liegt auf einem sauber vorbereiteten Objekt, das nach Abschluss der Arbeiten sichtbar gepflegt und nutzbar wirkt."],
      ["Mit klarer Abgrenzung", "Klebereste, Farbrückstände, hohe Glasflächen, Außenfenster oder schwer zugängliche Bereiche werden separat geprüft und nicht pauschal zugesagt."],
    ],
  },
  "treppenhausreinigung-berlin": {
    eyebrow: "Objektstandard",
    h2: "Treppenhausreinigung ist laufende Objektwirkung – nicht nur Bodenreinigung.",
    text:
      "Ein Treppenhaus wird täglich genutzt und prägt dadurch dauerhaft den Eindruck eines Gebäudes. Für Hausverwaltungen, WEGs und Eigentümer zählt neben der sichtbaren Sauberkeit vor allem Verlässlichkeit: gleicher Turnus, klare Zugangslösung, definierter Leistungsumfang und eine ruhige Kommunikation bei Auffälligkeiten im Objekt.",
    cards: [
      ["Planbarer Turnus", "Wöchentlich, zweiwöchentlich oder monatlich – der passende Rhythmus ergibt sich aus Nutzung, Etagenzahl, Frequenz und gewünschtem Pflegezustand."],
      ["Saubere Objektabgrenzung", "Treppen, Podeste, Eingänge, Aufzug, Briefkastenbereich, Kellerzugänge und Handläufe werden je nach Bedarf klar eingeordnet."],
      ["Für Verwaltungen nutzbar", "Geeignet für einzelne Objekte, neue Liegenschaften, Vertretungssituationen oder kleinere Objektbestände mit klarem Leistungsbild."],
    ],
  },
  "hausverwaltungen-berlin": {
    eyebrow: "Verwaltungslogik",
    h2: "Reinigung für Hausverwaltungen braucht klare Abläufe, nicht nur Ausführung.",
    text:
      "Bei verwalteten Objekten muss Reinigung nachvollziehbar funktionieren: Leistungsumfang, Turnus, Zugang, Ansprechpartner, Sonderbedarf und Rückmeldung bei Auffälligkeiten müssen vor Beginn sauber abgestimmt sein. Genau hier setzt Nautilus Facility Cleaning an – als strukturierter Reinigungspartner für einzelne Objekte, Allgemeinflächen, Treppenhäuser, Grundreinigung und Übergabebedarf.",
    cards: [
      ["Einzelobjekte und Sonderbedarf", "Wir sind besonders geeignet, wenn kurzfristig ein einzelnes Objekt, eine Übergabe, eine Grundreinigung oder eine Ergänzung zu bestehenden Strukturen gebraucht wird."],
      ["Klare Leistungsbeschreibung", "Treppenhaus, Eingangsbereich, Allgemeinflächen, Kellerzugänge, Fenster oder Sonderflächen werden objektbezogen festgelegt."],
      ["Ruhige Kommunikation", "Verwaltungen brauchen keine unnötige Reibung, sondern klare Rückmeldung, verbindliche Abstimmung und eine nachvollziehbare Ausführung."],
    ],
  },
  "praxisreinigung-berlin": {
    eyebrow: "Praxisalltag",
    h2: "Praxisreinigung muss zum Betrieb passen und sauber abgegrenzt sein.",
    text:
      "In Arztpraxen, Zahnarztpraxen, Privatpraxen und MVZs ist Reinigung besonders sensibel, weil Patienten, Team und Räumlichkeiten täglich eng zusammenwirken. Entscheidend sind klare Zeitfenster, getrennte Reinigungsbereiche, strukturierte Abläufe und eine Umsetzung, die den Praxisbetrieb nicht stört. Nautilus Facility Cleaning arbeitet objektbezogen und vermeidet pauschale Hygieneversprechen.",
    cards: [
      ["Empfang und Wartebereich", "Diese Bereiche prägen den ersten Eindruck der Praxis und benötigen eine verlässliche, sichtbare Pflege."],
      ["Behandlungsräume und Kontaktflächen", "Relevante Flächen werden nach vereinbartem Leistungsbild und sauberer Bereichslogik betreut."],
      ["Zeitfenster nach Praxisbetrieb", "Die Umsetzung wird passend zu Öffnungszeiten, Zugang und interner Organisation abgestimmt."],
    ],
  },
  "kanzleireinigung-berlin": {
    eyebrow: "Diskretion",
    h2: "Kanzleireinigung muss repräsentativ sein, ohne den Kanzleibetrieb zu stören.",
    text:
      "Anwaltskanzleien, Steuerkanzleien, Notariate und Beratungsbüros brauchen eine Reinigung, die diskret, zuverlässig und planbar abläuft. Mandantenbereiche, Besprechungsräume, Empfang, Sanitärbereiche und Arbeitsflächen müssen gepflegt wirken, während vertrauliche Arbeitsumgebungen respektiert werden. Deshalb ist eine klare Abstimmung von Zeitfenster und Leistungsumfang zentral.",
    cards: [
      ["Mandantenbereiche", "Empfang, Wartebereich und Besprechungsräume prägen die Außenwirkung einer Kanzlei und sollten sichtbar gepflegt sein."],
      ["Vertrauliche Umgebung", "Reinigung erfolgt mit klarem Ablauf und Respekt für sensible Arbeitsbereiche und Unterlagen."],
      ["Für Anwälte, Steuerberater und Notariate", "Die Seite wird gezielt auf Kanzleien, Notariate, Steuerbüros und beratungsnahe Geschäftsräume ausgerichtet."],
    ],
  },
  "bueroreinigung-berlin": {
    eyebrow: "Büroalltag",
    h2: "Büroreinigung muss zum Betrieb passen – nicht umgekehrt.",
    text:
      "Kleine und mittlere Büros brauchen eine Reinigung, die zuverlässig, diskret und ohne Störung des Arbeitsalltags läuft. Entscheidend ist ein klarer Turnus, ein passendes Zeitfenster und ein Leistungsumfang, der Arbeitsbereiche, Besprechungsräume, Sanitärbereiche, Teeküche, Böden und Kontaktflächen realistisch abdeckt.",
    cards: [
      ["Regelmäßige Büroflächen", "Arbeitsplätze, Besprechungsräume, Empfang und Gemeinschaftsbereiche werden nach abgestimmtem Turnus betreut."],
      ["Sanitär und Teeküche", "Stark genutzte Nebenbereiche sind häufig entscheidend für den Gesamteindruck im Büroalltag."],
      ["Büros, Kanzleien, Beratung", "Geeignet für kleinere und mittlere Geschäftsräume, Beratungsbüros, Steuerbüros und repräsentative Gewerbeflächen."],
    ],
  },
};

function polishBlock(page) {
  return `
      <section class="white" data-final-polish="true">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">${page.eyebrow}</div>
            <h2>${page.h2}</h2>
            <p class="section-text">${page.text}</p>
          </div>
          <div class="grid">
            ${page.cards.map(([title, text]) => `<article class="card"><h3>${title}</h3><p>${text}</p></article>`).join("\n            ")}
          </div>
        </div>
      </section>`;
}

function bottomCtaBlock() {
  return `
      <section class="white" data-final-contact-cta="true">
        <div class="container">
          <div class="cta">
            <div>
              <div class="eyebrow">Anfrage stellen</div>
              <h2>Objekt kurz beschreiben. Kontaktformular nutzen oder Fotos per WhatsApp senden.</h2>
              <p>Für eine erste Einschätzung reichen Bezirk, Fläche, gewünschter Termin und ein paar Informationen zum Objekt. Bei Auszug, Übergabe, Renovierung oder Bauarbeiten helfen Fotos besonders schnell weiter.</p>
            </div>
            <div style="display:flex; gap:14px; flex-wrap:wrap; align-items:center; justify-content:flex-end;">
              <a class="button" href="${whatsappHref}">Fotos per WhatsApp senden</a>
              <a class="button" href="${contactHref}" onclick="${contactOnclick}">Anfrageformular nutzen</a>
            </div>
          </div>
        </div>
      </section>`;
}

function normalizeCtaButtons(html) {
  return html
    .replace(/<a class="button secondary" href="https:\/\/nautilus-facility\.de\/\?kontakt=1#kontakt" onclick="sessionStorage\.setItem\('scrollToContact', '1'\)">Kontaktformular öffnen<\/a>\s*/g, "")
    .replace(/<a class="button secondary" href="https:\/\/nautilus-facility\.de\/\?kontakt=1#kontakt" onclick="sessionStorage\.setItem\('scrollToContact', '1'\)">Anfrageformular nutzen<\/a>/g, `<a class="button" href="${contactHref}" onclick="${contactOnclick}">Anfrageformular nutzen</a>`)
    .replace(/<a class="button secondary" href="([^\"]*)">Fotos per WhatsApp senden<\/a>/g, '<a class="button" href="$1">Fotos per WhatsApp senden</a>')
    .replace(/Kontaktformular öffnen/g, "Anfrageformular nutzen");
}

function addBeforeMainClose(html, block) {
  if (html.includes(block.includes("data-final-polish") ? "data-final-polish" : "data-final-contact-cta")) return html;
  const index = html.lastIndexOf("</main>");
  if (index === -1) return html;
  return `${html.slice(0, index)}\n${block}\n${html.slice(index)}`;
}

const entries = readdirSync(distDir).filter((entry) => {
  const full = join(distDir, entry);
  return statSync(full).isDirectory() && existsSync(join(full, "index.html"));
});

for (const slug of entries) {
  const file = join(distDir, slug, "index.html");
  let html = readFileSync(file, "utf8");
  html = normalizeCtaButtons(html);
  if (pagePolish[slug]) {
    html = addBeforeMainClose(html, polishBlock(pagePolish[slug]));
  }
  html = addBeforeMainClose(html, bottomCtaBlock());
  html = normalizeCtaButtons(html);
  writeFileSync(file, html, "utf8");
}

console.log("Final SEO polish applied: two gold CTA buttons and content depth.");
