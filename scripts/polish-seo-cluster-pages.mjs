import { readFileSync, writeFileSync, existsSync } from "node:fs";

const pages = [
  "reinigung-kosten-berlin",
  "checkliste-wohnungsuebergabe-berlin",
  "treppenhausreinigung-kosten-berlin",
];

const css = `
      .cluster-grid-2,
      .cluster-grid-3 {
        gap: 24px !important;
        align-items: stretch;
      }
      .cluster-grid-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      }
      .cluster-grid-3 {
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      }
      .cluster-grid-2 .card,
      .cluster-grid-3 .card {
        min-height: 280px !important;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .cluster-grid-2 .card h3,
      .cluster-grid-3 .card h3 {
        margin-bottom: 14px;
      }
      .cluster-grid-2 .card p,
      .cluster-grid-3 .card p {
        line-height: 1.78;
      }
      .cluster-grid-2 .card p:last-child,
      .cluster-grid-3 .card p:last-child {
        margin-top: auto;
      }
      .cluster-compact .card {
        min-height: 235px !important;
      }
      .cluster-statement {
        border: 1px solid #E5D9C8;
        background: linear-gradient(135deg, #FFFFFF 0%, #FCFBF8 100%);
        border-radius: 30px;
        padding: 38px;
        box-shadow: 0 24px 70px rgba(60,48,35,.07);
      }
      .cluster-statement strong {
        display:block;
        color:#2C2C2C;
        font-size:20px;
        line-height:1.35;
        margin-bottom:12px;
      }
      .cluster-statement p {
        color:#7E7367;
        line-height:1.85;
        margin:0;
      }
      @media(max-width:980px){
        .cluster-grid-3{grid-template-columns:repeat(2,minmax(0,1fr)) !important;}
      }
      @media(max-width:760px){
        .cluster-grid-2,.cluster-grid-3{grid-template-columns:1fr !important;}
        .cluster-grid-2 .card,.cluster-grid-3 .card,.cluster-compact .card{min-height:0 !important;}
      }
`;

const replacements = {
  "reinigung-kosten-berlin": [
    ["Reinigungskosten hängen nicht nur von Quadratmetern ab. Entscheidend sind Objektart, Zustand, Leistungsumfang, Zugang, Zeitfenster und das gewünschte Ergebnis.", "Reinigungskosten in Berlin entstehen nicht aus einer Quadratmeterzahl allein. Entscheidend sind Objektart, Zustand, Reinigungsziel, Leistungsumfang, Zugänglichkeit, Zeitfenster und die Frage, ob eine Fläche nur gepflegt oder wirklich übergabefähig vorbereitet werden soll."],
    ["Nautilus Facility Cleaning kalkuliert Reinigungsleistungen objektbezogen. Das schützt Auftraggeber vor unklaren Pauschalen und sorgt dafür, dass Umfang, Erwartung und Aufwand vor Beginn sauber abgestimmt sind.", "Nautilus Facility Cleaning kalkuliert Reinigungsleistungen objektbezogen und nachvollziehbar. So werden Umfang, Erwartung und Aufwand vor Beginn sauber abgegrenzt – ohne starre Preisversprechen, die bei Zustand, Termin oder Zusatzflächen später nicht tragen."],
    ["Keine pauschale Scheinpräzision.", "Objektbezogene Kalkulation statt Pauschalversprechen."],
    ["Ein realistisches Angebot entsteht erst, wenn Objekt, Zustand und Leistungsumfang klar sind. Genau dafür strukturieren wir die Anfrage vorab.", "Ein belastbares Angebot braucht Kontext: Objektart, Zustand, Flächenstruktur, Termin, Zugang und gewünschtes Ergebnis. Genau diese Punkte strukturieren wir vor der Kalkulation."],
    ["Der Preis einer Reinigung entsteht aus mehreren Faktoren. Ein kleiner Raum mit starkem Reinigungsbedarf kann aufwendiger sein als eine größere, gut vorbereitete Fläche. Deshalb ist eine saubere Einordnung vorab der professionellere Weg.", "Ein kleiner Raum mit starkem Reinigungsbedarf kann mehr Aufwand verursachen als eine größere, gut vorbereitete Fläche. Deshalb betrachten wir nicht nur Quadratmeter, sondern den tatsächlichen Zustand, die Nutzung, den Leistungsumfang und das Ziel der Reinigung."],
    ["Wohnung, Treppenhaus, Büro, Praxis, Kanzlei oder Baustellenbereich haben unterschiedliche Anforderungen. Entscheidend ist nicht nur die Größe, sondern auch die Nutzung und Flächenstruktur.", "Wohnung, Treppenhaus, Büro, Praxis, Kanzlei oder Baustellenbereich haben unterschiedliche Anforderungen. Entscheidend sind Flächenstruktur, Nutzung, Material, Möblierung, Zugänglichkeit und die Frage, ob es um laufende Pflege, Übergabe oder Sonderreinigung geht."],
    ["Leichte Unterhaltsreinigung, Übergabezustand, Renovierungsstaub, Bauverschmutzung oder intensive Grundreinigung führen zu sehr unterschiedlichen Aufwänden.", "Leichte Unterhaltsreinigung, Übergabezustand, Renovierungsstaub, Bauverschmutzung, Kalk, Fett oder intensive Grundreinigung liegen operativ weit auseinander. Der sichtbare Zustand entscheidet über Zeit, Mittel und Ablauf."],
    ["Böden, Sanitär, Küche, Kontaktflächen, Fenster, Rahmen, Türen, Heizkörper, Treppen, Aufzug oder Allgemeinflächen müssen klar abgegrenzt werden.", "Böden, Sanitär, Küche, Kontaktflächen, Fenster, Rahmen, Türen, Heizkörper, Treppen, Aufzug und Allgemeinflächen müssen klar definiert sein. Nur so ist transparent, was enthalten ist und was separat abgestimmt wird."],
    ["Kurzfristige Termine, eingeschränkter Zugang, enge Zeitfenster oder Arbeiten außerhalb normaler Zeiten beeinflussen Planung und Aufwand.", "Kurzfristige Termine, eingeschränkter Zugang, enge Zeitfenster, Schlüsselorganisation oder Arbeiten außerhalb normaler Zeiten beeinflussen Planung, Einsatzlogik und Aufwand. Diese Punkte gehören in die Einschätzung."],
    ["Professionelle Kalkulation ist kein Preistrick, sondern Risikominimierung.", "Ein sauberer Preis entsteht aus einem klaren Leistungsbild."],
    ["Wenn Leistungsumfang und Erwartung vorher sauber geklärt sind, entstehen weniger Missverständnisse. Auftraggeber erhalten ein nachvollziehbares Angebot, und die Umsetzung kann mit realistischem Zeit- und Leistungsrahmen geplant werden.", "Wenn Leistungsumfang, Zustand und Erwartung vorab sauber geklärt sind, sinkt das Risiko für Missverständnisse deutlich. Auftraggeber erhalten ein nachvollziehbares Angebot, und die Umsetzung kann mit realistischem Zeit- und Leistungsrahmen geplant werden."],
  ],
  "checkliste-wohnungsuebergabe-berlin": [
    ["Eine Wohnungsübergabe steht und fällt mit Vorbereitung, Zustand und klarer Dokumentation. Reinigung ist dabei ein zentraler Faktor.", "Eine Wohnungsübergabe steht und fällt mit Vorbereitung, sichtbarem Zustand und sauberer Dokumentation. Reinigung ist dabei kein Nebenthema, sondern oft der Punkt, an dem Übergaben ruhig laufen oder unnötig eskalieren."],
    ["Diese Checkliste hilft Mietern, Eigentümern und Vermietern, typische Übergabepunkte strukturiert zu prüfen. Bei sichtbarem Reinigungsbedarf kann Nautilus Facility Cleaning die Übergabereinigung objektbezogen einordnen.", "Diese Checkliste hilft Mietern, Eigentümern und Vermietern, typische Übergabepunkte strukturiert zu prüfen. Wenn der Zustand nicht eindeutig ist oder wenig Zeit bleibt, ordnet Nautilus Facility Cleaning die Übergabereinigung objektbezogen nach Fläche, Zustand und Termin ein."],
    ["Übergabe ist kein Bauchgefühl.", "Übergabe braucht Vorbereitung, nicht Bauchgefühl."],
    ["Wer Zustand, Fotos, Schlüssel, Protokoll und Reinigung vorbereitet, reduziert Reibung beim Termin deutlich.", "Wer Reinigung, Fotos, Schlüssel, Zählerstände und Protokoll vorbereitet, reduziert Reibung beim Termin und schafft eine nachvollziehbare Ausgangslage."],
    ["Eine gute Vorbereitung reduziert Stress am Übergabetag. Entscheidend sind nicht nur saubere Räume, sondern auch Zugänglichkeit, Dokumentation und ein realistischer Blick auf Bereiche, die häufig übersehen werden.", "Eine gute Vorbereitung reduziert Stress am Übergabetag. Entscheidend sind nicht nur leere Räume, sondern der sichtbare Gesamteindruck, kritische Detailbereiche, Zugänglichkeit, Dokumentation und ein realistischer Blick auf Stellen, die bei Übergaben häufig beanstandet werden."],
    ["Alle Räume sollten frei zugänglich sein. Böden, Sockelleisten, Ecken, Türbereiche und Laufwege prägen den ersten Eindruck und sollten vor der Übergabe sorgfältig geprüft werden.", "Alle Räume sollten frei zugänglich sein. Böden, Sockelleisten, Ecken, Türbereiche, Laufwege und sichtbare Rückstände prägen den ersten Eindruck und sollten vor der Übergabe strukturiert geprüft werden."],
    ["Küche und Bad sind kritische Bereiche. Armaturen, Fliesen, Spülbecken, Ablagen, Schränke, Duschbereich, WC und sichtbare Kalk- oder Fettrückstände fallen bei Übergaben schnell auf.", "Küche und Bad sind besonders sensible Bereiche. Armaturen, Fliesen, Spülbecken, Ablagen, Schränke, Duschbereich, WC sowie sichtbare Kalk-, Seifen- oder Fettrückstände fallen bei Übergaben schnell auf."],
    ["Fensterflächen, Rahmen, Griffe, Türen, Zargen und Heizkörper werden häufig unterschätzt. Gerade Rahmen und Kanten sammeln bei Auszug und Renovierung sichtbare Rückstände.", "Fensterflächen, Rahmen, Griffe, Türen, Zargen, Heizkörper und Kanten werden häufig unterschätzt. Gerade nach Auszug oder Renovierung sammeln sich dort Staub, Abrieb und sichtbare Rückstände."],
    ["Dokumentieren Sie den Zustand vor der Übergabe mit Fotos. Zählerstände, Schlüssel, erkennbare Mängel und besondere Absprachen sollten für den Termin vorbereitet sein.", "Dokumentieren Sie den Zustand vor der Übergabe mit Fotos. Zählerstände, Schlüssel, erkennbare Mängel, vorhandene Schäden und besondere Absprachen sollten vor dem Termin geordnet vorliegen."],
    ["Besenrein ist nicht automatisch übergabebereit.", "Besenrein ist nicht automatisch übergabefähig."],
    ["Was im Einzelfall erwartet wird, hängt von Vereinbarungen und Zustand ab. Für eine professionelle Einschätzung prüfen wir deshalb Objekt, Fotos, Flächen und gewünschtes Ergebnis statt pauschal zu urteilen.", "Was im Einzelfall erwartet wird, hängt von Vereinbarungen, Ausgangszustand und Übergabesituation ab. Für eine professionelle Einschätzung prüfen wir deshalb Objekt, Fotos, Flächen und gewünschtes Ergebnis statt pauschal zu urteilen."],
  ],
  "treppenhausreinigung-kosten-berlin": [
    ["Die Kosten einer Treppenhausreinigung hängen von Objektgröße, Etagen, Parteien, Turnus, Flächenstruktur, Zugänglichkeit und gewünschtem Leistungsumfang ab.", "Die Kosten einer Treppenhausreinigung in Berlin hängen von Objektgröße, Etagen, Parteien, Turnus, Flächenstruktur, Zugänglichkeit, Nutzung und gewünschtem Leistungsumfang ab."],
    ["Nautilus Facility Cleaning erstellt Angebote für Treppenhäuser und Allgemeinflächen objektbezogen. So wird klar, welche Bereiche enthalten sind, welcher Turnus sinnvoll ist und wo Sonderbedarf separat abgestimmt werden sollte.", "Nautilus Facility Cleaning erstellt Angebote für Treppenhäuser und Allgemeinflächen objektbezogen. So wird vor Beginn klar, welche Bereiche regelmäßig enthalten sind, welcher Turnus sinnvoll ist und welcher Sonderbedarf separat eingeordnet werden sollte."],
    ["Für Hausverwaltungen, WEGs und Eigentümer.", "Für Hausverwaltungen, WEGs und Eigentümer mit Objektverantwortung."],
    ["Treppenhausreinigung muss zum Objektalltag passen: regelmäßig, nachvollziehbar, klar abgestimmt und wirtschaftlich sinnvoll geplant.", "Treppenhausreinigung muss zum Objektalltag passen: nachvollziehbarer Leistungsumfang, sauberer Turnus, klare Zugangslösung und realistische Planung statt unklarer Standardleistung."],
    ["Treppenhäuser unterscheiden sich stark. Ein gepflegtes kleines Objekt mit wenigen Parteien benötigt eine andere Planung als ein stark frequentiertes Mehrparteienhaus mit Aufzug, Kellerzugängen und Eingangsbereich.", "Treppenhäuser unterscheiden sich deutlich. Ein gepflegtes kleines Objekt mit wenigen Parteien benötigt eine andere Planung als ein stark frequentiertes Mehrparteienhaus mit Aufzug, Kellerzugängen, Eingangsbereich, Briefkastenanlage und erhöhtem Nutzungsdruck."],
    ["Anzahl der Etagen, Podeste, Wohneinheiten und Laufwege beeinflussen den Zeitaufwand. Auch die Frequenz der Nutzung spielt eine Rolle.", "Anzahl der Etagen, Podeste, Wohneinheiten, Laufwege und Zwischenflächen beeinflussen den Zeitaufwand. Auch Bewohnerstruktur, Publikumsverkehr und Frequenz der Nutzung spielen eine Rolle."],
    ["Wöchentliche Reinigung, zweiwöchentlicher Turnus oder objektbezogene Intervalle sollten zur Nutzung und zum gewünschten Erscheinungsbild passen.", "Wöchentliche Reinigung, zweiwöchentlicher Turnus oder objektbezogene Intervalle sollten zur Nutzung, Verschmutzung und zum gewünschten Erscheinungsbild passen. Der Turnus ist ein zentraler Kostenhebel."],
    ["Eingänge, Briefkästen, Aufzug, Kellerzugänge, Handläufe, Glasflächen und Nebenbereiche müssen klar definiert werden, damit der Umfang nachvollziehbar bleibt.", "Eingänge, Briefkästen, Aufzug, Kellerzugänge, Handläufe, Glasflächen und Nebenbereiche müssen klar definiert werden. Nur so bleibt nachvollziehbar, welche Flächen laufend gereinigt werden."],
    ["Starke Verschmutzung, Grundreinigung, Renovierungsspuren, Müllräume oder zusätzliche Fenster- und Rahmenreinigung werden separat eingeordnet.", "Starke Verschmutzung, Grundreinigung, Renovierungsspuren, Müllräume oder zusätzliche Fenster- und Rahmenreinigung sollten separat eingeordnet werden, damit die laufende Reinigung nicht unklar überladen wird."],
    ["Ein guter Preis entsteht aus einem klaren Leistungsbild.", "Ein belastbarer Preis entsteht aus einem klaren Leistungsbild."],
    ["Gerade bei Treppenhäusern ist entscheidend, dass Turnus, Flächen, Zugang und Sonderbedarf sauber definiert sind. So bleibt die Reinigung im Objektalltag nachvollziehbar und planbar.", "Gerade bei Treppenhäusern ist entscheidend, dass Turnus, Flächen, Zugang und Sonderbedarf sauber definiert sind. So bleibt die Reinigung für Verwaltung, Eigentümer und Nutzer nachvollziehbar und planbar."],
  ],
};

for (const slug of pages) {
  const file = `dist/${slug}/index.html`;
  if (!existsSync(file)) continue;
  let html = readFileSync(file, "utf8");

  if (!html.includes(".cluster-statement")) {
    html = html.replace("</style>", `${css}\n    </style>`);
  }

  for (const [from, to] of replacements[slug] || []) {
    html = html.split(from).join(to);
  }

  html = html.replace(/<div class="info-band">/g, '<div class="cluster-statement">');
  html = html.replace(/<div class="grid cluster-grid-2">/g, '<div class="grid cluster-grid-2">');
  html = html.replace(/<div class="grid cluster-grid-3">/g, '<div class="grid cluster-grid-3 cluster-compact">');

  writeFileSync(file, html, "utf8");
}

console.log("SEO cluster pages polished: stronger copy, cleaner card layout, premium statement blocks.");
