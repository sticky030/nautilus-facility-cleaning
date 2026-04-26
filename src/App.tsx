import FAQSection from './components/FAQSection'

const navItems = [
  { label: 'Start', href: '#start' },
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Warum Nautilus', href: '#warum-nautilus' },
  { label: 'Ablauf', href: '#ablauf' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontakt', href: '#kontakt' },
]

const services = [
  {
    eyebrow: 'Regelmäßige Unterhaltsreinigung',
    title: 'Praxis- & Kanzleireinigung',
    text: 'Branchenspezifische Hygienekonzepte für Arztpraxen und exklusive Büros. Wir arbeiten mit höchster Präzision und absoluter Diskretion, um Ihren laufenden Betrieb nicht zu stören.',
    bullets: [
      'Flächendesinfektion in sensiblen Zonen',
      'Pflege von Empfangs- & Konferenzbereichen',
      'Diskreter Service nach Ihren Bürozeiten',
      'Nachhaltige, materialschonende Mittel',
    ],
  },
  {
    eyebrow: 'Hochwertige Objektpflege',
    title: 'Treppenhaus- & Foyer-Service',
    text: 'Der erste Eindruck zählt. Wir sorgen dafür, dass Foyers und Treppenhäuser die Hochwertigkeit Ihres Objekts nahtlos widerspiegeln – durch kontinuierliche, werterhaltende Detailpflege.',
    bullets: [
      'Repräsentative Pflege des Eingangsbereichs',
      'Schonende Reinigung von Holz & Naturstein',
      'Aufzug-, Geländer- & Fensterbrettreinigung',
      'Verlässliche Intervalle & feste Teams',
    ],
  },
  {
    eyebrow: 'Spezial- & Projektbezogen',
    title: 'Premium Bauendreinigung',
    text: 'Nach Abschluss anspruchsvoller Bau- oder Ausbauprojekte bringen wir Ihre Räumlichkeiten in einen bezugsfertigen Zustand. Termingerecht, staubfrei und bereit für die finale Abnahme.',
    bullets: [
      'Feinreinigung für Bau- und Objektabnahmen',
      'Rückstandslose Entfernung von Bauschmutz',
      'Fachgerechte Einpflege von Neu-Oberflächen',
      'Absolute Terminsicherheit bei Übergaben',
    ],
  },
]

export default function App() {
  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#6F6559] antialiased selection:bg-[#B79B6C]/20">
      
      {/* --- PREMIUM FLOATING HEADER --- */}
      <div className="fixed inset-x-0 top-6 z-50 flex justify-center px-4 pointer-events-none">
        <header className="pointer-events-auto w-full max-w-6xl rounded-full bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-4 py-3 transition-all duration-500">
          <div className="flex items-center justify-between gap-6 px-2">
            <a href="#start" className="flex min-w-0 items-center gap-3">
              <img
                src="/images/reinigung-trans.png"
                alt="Nautilus Facility Cleaning"
                className="h-14 w-14 shrink-0 object-contain"
              />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold tracking-[0.28em] text-[#B79B6C]">
                  NAUTILUS
                </div>
                <div className="truncate text-[11px] uppercase tracking-[0.34em] text-[#9A8C7B]">
                  Facility Cleaning
                </div>
              </div>
            </a>

            <nav className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[13px] font-semibold uppercase tracking-wider text-[#8A7E70] transition hover:text-[#B79B6C]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="#kontakt"
              className="inline-flex shrink-0 items-center rounded-full bg-[#B79B6C] px-7 py-3 text-[13px] font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(183,155,108,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(183,155,108,0.4)] hover:bg-[#A98E60]"
            >
              Anfrage stellen
            </a>
          </div>
        </header>
      </div>

      <main className="overflow-x-hidden">
        {/* --- HERO SECTION --- */}
        <section id="start" className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#F3EFE7]">
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(96deg,rgba(247,244,238,0.94)_0%,rgba(247,244,238,0.90)_36%,rgba(247,244,238,0.70)_64%,rgba(247,244,238,0.34)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,155,108,0.16),transparent_28%)]" />

          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 pb-20 pt-36 lg:grid-cols-12 lg:px-10 lg:pb-28 lg:pt-40">
            <div className="lg:col-span-8 lg:self-end lg:pb-14">
              <div className="inline-flex items-center gap-3 mb-8">
                <span className="h-px w-8 bg-[#B79B6C]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#B79B6C]">Premium Facility Cleaning</span>
              </div>
              <h1 className="text-[38px] font-medium leading-[1.1] text-[#2C2C2C] sm:text-[48px] lg:text-[62px]">
                Exzellenz in der Reinigung.<br />Für anspruchsvolle Objekte.
              </h1>
              <p className="mt-8 max-w-[38rem] text-[17px] leading-8 text-[#7E7367] lg:text-[19px] font-light">
                Wir betreuen Arztpraxen, Kanzleien und exklusive Gewerbeflächen in Berlin. Präzise Abstimmung, absolute Diskretion und ein Qualitätsanspruch, der im Hintergrund perfekt funktioniert.
              </p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="#kontakt" className="inline-flex items-center justify-center rounded-full bg-[#B79B6C] px-9 py-4 text-[14px] font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(183,155,108,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(183,155,108,0.4)] hover:bg-[#A98E60]">
                  Unverbindliche Anfrage
                </a>
                <a href="#leistungen" className="inline-flex items-center justify-center rounded-full border border-[#D9CCB8] bg-white/50 backdrop-blur-md px-9 py-4 text-[14px] font-bold uppercase tracking-wider text-[#6F6559] transition-all duration-300 hover:bg-white hover:border-[#B79B6C]/50">
                  Expertise ansehen
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* --- LEISTUNGEN --- */}
        <section id="leistungen" className="bg-[#F7F4EE] py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Unsere Expertise</p>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">
                Maßgeschneiderte Reinigungskonzepte für Objekte mit höchstem Anspruch.
              </h2>
            </div>
            
            <div className="mt-20 grid grid-cols-1 gap-8 xl:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} className="group flex flex-col h-full overflow-hidden rounded-3xl border border-[#E5E1D8] bg-white p-10 shadow-[0_8px_20px_rgba(0,0,0,0.02)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#B79B6C]/50 hover:shadow-[0_30px_60px_rgba(183,155,108,0.12)]">
                  
                  {/* flex-grow drückt den unteren Bereich nach ganz unten */}
                  <div className="flex flex-col flex-grow">
                    <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{service.eyebrow}</div>
                    <h3 className="mt-6 text-[26px] font-semibold leading-[1.2] text-[#2C2C2C]">{service.title}</h3>
                    <p className="mt-5 text-[15px] leading-7 text-[#7E7367]">{service.text}</p>
                  </div>

                  {/* Der untere Bereich hat eine exakt festgelegte Höhe (h-[160px] für die ul). Dadurch bleibt die Linie immer perfekt waagerecht auf einer Linie mit den anderen Boxen. */}
                  <div className="mt-10 flex flex-col justify-end">
                    <div className="h-px w-full bg-gradient-to-r from-[#E5E1D8] via-[#B79B6C]/30 to-transparent" />
                    <ul className="mt-8 flex flex-col justify-between h-[160px] text-[15px] leading-6 text-[#6F6559]">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-4">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B79B6C] shadow-[0_0_8px_rgba(183,155,108,0.6)]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* --- WARUM NAUTILUS --- */}
        <section id="warum-nautilus" className="bg-white py-32 lg:py-40 border-y border-[#E5E1D8]/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
              <div className="lg:col-span-5 lg:pr-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Philosophie</p>
                <h2 className="mt-6 max-w-[12ch] text-3xl font-semibold leading-[1.06] text-[#2C2C2C] lg:text-[46px]">
                  Ein Standard, der keine Kompromisse kennt.
                </h2>
                <p className="mt-8 text-[17px] leading-8 text-[#8A7E70]">
                  Wir arbeiten für Kunden, die Perfektion nicht als Zufall, sondern als systematischen Prozess verstehen. Ein makelloses Umfeld fördert die Produktivität und das Vertrauen Ihrer Klienten.
                </p>
                <p className="mt-5 text-[17px] leading-8 text-[#8A7E70]">
                  Wir integrieren unsere Dienstleistung lautlos in Ihre Abläufe – für ein dauerhaftes Premium-Ergebnis, das Sie jeden Tag spüren, ohne es managen zu müssen.
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[
                  { title: 'Diskrete Ausführung', desc: 'Lautlose Integration in Ihr Tagesgeschäft. Unsere Teams agieren unsichtbar – das Ergebnis ist unübersehbar.' },
                  { title: 'Klare Abstimmung', desc: 'Ein fester, persönlicher Ansprechpartner. Proaktive Kommunikation und vorausschauendes Handeln.' },
                  { title: 'Verlässliche Standards', desc: 'Durch internes Qualitätsmanagement sichern wir einen konstanten, kompromisslosen Standard.' },
                  { title: 'Sensible Umfelder', desc: 'Speziell geschultes, verschwiegenes Personal für Bereiche, in denen Vertrauen absolute Priorität hat.' }
                ].map((item) => (
                  <article key={item.title} className="rounded-3xl border border-[#E5E1D8] bg-[#FCFBF8] p-10 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white hover:border-[#B79B6C]/40 hover:shadow-[0_20px_50px_rgba(183,155,108,0.08)]">
                    <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{item.title}</div>
                    <div className="mt-5 h-px w-12 bg-gradient-to-r from-[#B79B6C] to-transparent" />
                    <p className="mt-5 text-[15px] leading-8 text-[#7E7367]">{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- AUFTRETEN & HALTUNG --- */}
        <section className="bg-[#F7F4EE] py-32 lg:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(183,155,108,0.1),transparent_50%)]" />
          <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5 lg:pr-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Haltung & Personal</p>
                <h2 className="mt-6 text-3xl font-semibold leading-[1.1] text-[#2C2C2C] lg:text-[46px]">
                  Diskret im Auftritt.<br />Kompromisslos in der Qualität.
                </h2>
                <p className="mt-8 text-[17px] leading-8 text-[#8A7E70] font-light">
                  Wir verstehen uns als unsichtbaren, aber essenziellen Teil Ihres Unternehmenserfolgs. Ein tadellos gepflegtes Erscheinungsbild unserer Mitarbeiter und absolute Verschwiegenheit sind für uns obligatorisch.
                </p>
                <p className="mt-5 text-[17px] leading-8 text-[#8A7E70] font-light">
                  Gerade in Notariaten, Privatpraxen und Vorstandsetagen zählt nicht die reine Anwesenheit des Personals – sondern die Fähigkeit, einen Raum mit höchster Präzision in seinen besten Zustand zu versetzen, ohne den Betrieb zu stören.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="relative overflow-hidden rounded-3xl border border-[#E5E1D8] bg-white shadow-[0_20px_50px_rgba(183,155,108,0.1)]">
                  <img src="/images/nautilus-cleaning-team-berlin.jpg" alt="Premium Cleaning Team" className="mx-auto w-full max-h-[550px] object-cover hover:scale-105 transition-transform duration-1000" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- ABLAUF --- */}
        <section id="ablauf" className="bg-white py-32 lg:py-40 border-b border-[#E5E1D8]/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
              <div className="lg:col-span-5 lg:pr-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Ablauf & Prozesse</p>
                <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">
                  Ein reibungsloser Start. Ein dauerhaftes Ergebnis.
                </h2>
                <p className="mt-8 text-[17px] leading-8 text-[#8A7E70]">
                  Ein bewährter Prozess garantiert Ihnen Ergebnisse auf höchstem Niveau. Wir überlassen nichts dem Zufall, sondern definieren jeden Schritt – von der ersten Begehung bis zur täglichen Umsetzung.
                </p>
              </div>
              <div className="lg:col-span-7 space-y-6">
                {[
                  { step: '01 · Besichtigung vor Ort', text: 'Wir begehen Ihr Objekt persönlich. Nur so können wir Flächen, Materialien und Ihre spezifischen Anforderungen exakt aufnehmen.' },
                  { step: '02 · Maßgeschneidertes Konzept', text: 'Sie erhalten ein faires, transparentes Angebot. Wir definieren Turnus und Leistungsumfang klar – ohne versteckte Kosten.' },
                  { step: '03 · Geräuschloses Onboarding', text: 'Unser festes Stammpersonal wird detailliert in Ihr Objekt eingewiesen. Der Start verläuft geräuschlos und professionell.' },
                  { step: '04 · Laufende Betreuung', text: 'Wir bleiben im Austausch. Ein fester Ansprechpartner und regelmäßige Qualitätskontrollen sichern unser hohes Niveau dauerhaft.' }
                ].map((item) => (
                  <article key={item.step} className="rounded-3xl border border-[#E5E1D8] bg-[#FCFBF8] p-10 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white hover:border-[#B79B6C]/40 hover:shadow-[0_20px_40px_rgba(183,155,108,0.08)]">
                    <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{item.step}</div>
                    <div className="mt-5 h-px w-12 bg-gradient-to-r from-[#B79B6C] to-transparent" />
                    <p className="mt-5 text-[16px] leading-8 text-[#7E7367]">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <FAQSection />

        {/* --- KONTAKT --- */}
        <section id="kontakt" className="bg-[#F7F4EE] py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid items-start gap-20 lg:grid-cols-2">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Kontakt & Anfrage</p>
                <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">
                  Wir freuen uns auf Ihr Objekt.
                </h2>
                <p className="mt-8 text-[17px] leading-8 text-[#8A7E70]">
                  Geben Sie uns einen ersten, kurzen Überblick über Ihr Vorhaben. Ihr persönlicher Ansprechpartner meldet sich zeitnah, um alles Weitere mit Ihnen abzustimmen.
                </p>
                <div className="mt-14 space-y-6">
                  {[
                    { title: 'Für wen wir arbeiten', content: 'Arztpraxen, Kanzleien, Hausverwaltungen und anspruchsvolle Gewerbeimmobilien in Berlin.' },
                    { title: 'Unser Versprechen', content: 'Transparente Angebote, feste Ansprechpartner und absolute Zuverlässigkeit ab dem ersten Tag.' },
                    { title: 'Der nächste Schritt', content: 'Sie beschreiben kurz Ihr Objekt. Wir melden uns für eine Erstbesichtigung und ein individuelles Konzept.' }
                  ].map((box) => (
                    <div key={box.title} className="rounded-3xl border border-[#E5E1D8] bg-white p-8 shadow-sm">
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{box.title}</p>
                      <p className="mt-4 text-[16px] leading-8 text-[#6F6559] whitespace-pre-line">{box.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- PREMIUM KONTAKTFORMULAR --- */}
              <div className="rounded-[40px] border border-[#E5E1D8] bg-white p-10 shadow-[0_30px_60px_rgba(0,0,0,0.04)] lg:p-14">
                <div className="mb-10">
                  <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Diskrete Anfrage</p>
                  <p className="mt-4 text-[16px] leading-8 text-[#7E7367]">
                    Hinterlassen Sie uns die wichtigsten Eckdaten zu Ihrem Objekt für eine erste, vollkommen unverbindliche Einschätzung.
                  </p>
                </div>
                <form id="contact-form" action="https://formspree.io/f/mnjonren" method="POST" className="space-y-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    
                    {/* Select: Objektart */}
                    <div>
                      <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7E70]">Objektart</label>
                      <div className="relative">
                        <select name="Objektart" className="w-full appearance-none rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 pr-12 text-[15px] text-[#2C2C2C] outline-none transition-all duration-300 focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10 cursor-pointer">
                          <option>Büro & Kanzlei</option>
                          <option>Arztpraxis</option>
                          <option>Treppenhaus & Objekt</option>
                          <option>Gehobene Gewerbeeinheit</option>
                          <option>Bauprojekt</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-[#B79B6C]">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Select: Turnus */}
                    <div>
                      <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7E70]">Turnus</label>
                      <div className="relative">
                        <select name="Turnus" className="w-full appearance-none rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 pr-12 text-[15px] text-[#2C2C2C] outline-none transition-all duration-300 focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10 cursor-pointer">
                          <option>Täglich</option>
                          <option>Mehrmals pro Woche</option>
                          <option>Wöchentlich</option>
                          <option>Nach Bedarf</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-[#B79B6C]">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7E70]">Name</label>
                      <input type="text" name="Name" required placeholder="Ihr Name" className="w-full rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 text-[15px] text-[#2C2C2C] outline-none transition-all duration-300 placeholder:text-[#B0A596] focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10" />
                    </div>
                    <div>
                      <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7E70]">E-Mail</label>
                      <input type="email" name="E-Mail" required placeholder="kontakt@unternehmen.de" className="w-full rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 text-[15px] text-[#2C2C2C] outline-none transition-all duration-300 placeholder:text-[#B0A596] focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7E70]">Objekt kurz beschreiben</label>
                    <textarea rows={4} name="Nachricht" required placeholder="Größe, Besonderheiten, Wünsche..." className="w-full rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 text-[15px] text-[#2C2C2C] outline-none transition-all duration-300 placeholder:text-[#B0A596] focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10 resize-none" />
                  </div>
                  
                  <div className="pt-2">
                    <input type="hidden" name="_subject" value="Neue exklusive Anfrage über nautilus-facility.de" />
                    <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                    <button type="submit" className="w-full rounded-2xl bg-[#B79B6C] px-6 py-5 text-[15px] font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(183,155,108,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(183,155,108,0.4)] hover:bg-[#A98E60]">
                      Anfrage sicher senden
                    </button>
                  </div>
                  <p className="text-center text-[13px] text-[#9A8D7D] mt-6 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Ihre Daten werden SSL-verschlüsselt und absolut vertraulich behandelt.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-white py-16 border-t border-[#E5E1D8]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-start lg:justify-between lg:px-10">
          <div>
            <div className="text-[11px] font-bold tracking-[0.35em] text-[#B79B6C]">
              NAUTILUS FACILITY CLEANING
            </div>
            <p className="mt-5 max-w-md text-[14px] leading-7 text-[#8A7E70]">
              Ein Geschäftsbereich der Nautilus Security UG (haftungsbeschränkt).<br />
              Exzellenz in der Reinigung für Berlin Mitte, Prenzlauer Berg, Friedrichshain, Lichtenberg und Marzahn.
            </p>
            <div className="mt-8 flex flex-col gap-3 text-[15px] text-[#2C2C2C] font-medium">
              <a href="mailto:kontakt@nautilus-facility.de" className="hover:text-[#B79B6C] transition-colors">kontakt@nautilus-facility.de</a>
              <a href="tel:+4917622844636" className="hover:text-[#B79B6C] transition-colors">0176 22844636</a>
            </div>
          </div>
          <div className="flex gap-8 text-[14px] font-semibold uppercase tracking-wider text-[#8A7E70]">
            <a href="impressum/" className="hover:text-[#B79B6C] transition-colors">Impressum</a>
            <a href="datenschutz/" className="hover:text-[#B79B6C] transition-colors">Datenschutz</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
