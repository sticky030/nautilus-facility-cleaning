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
    eyebrow: 'Regelservice',
    title: 'Praxis- & Büroreinigung',
    text: 'Für sensible Umfelder, in denen makellose Hygiene, geordnete Abläufe und absolute Diskretion unerlässlich sind.',
    bullets: [
      'Arbeits-, Empfangs- und Behandlungsbereiche',
      'Sanitär- und Küchenbereiche',
      'Einsatzzeiten außerhalb des laufenden Betriebs',
      'Definierte Leistungsumfänge und feste Intervalle',
    ],
  },
  {
    eyebrow: 'Objektpflege',
    title: 'Treppenhaus- & Objektservice',
    text: 'Der erste Eindruck zählt. Repräsentative Pflege von Eingangsbereichen und Gemeinschaftsflächen auf höchstem Niveau.',
    bullets: [
      'Treppenhäuser, Podeste und Eingangsbereiche',
      'Handläufe, Geländer und Gemeinschaftsflächen',
      'Verlässliche Intervalle für repräsentative Objekte',
      'Klare Abstimmung mit Verwaltung oder Objektverantwortung',
    ],
  },
  {
    eyebrow: 'Projektbezogen',
    title: 'Bauendreinigung',
    text: 'Wenn das Detail entscheidet. Termingerechte Feinreinigung für den perfekten Abschluss Ihrer Bau- und Ausbauprojekte.',
    bullets: [
      'Feinreinigung vor Übergabe oder Inbetriebnahme',
      'Rückstandslose Entfernung von Bauschmutz und Staub',
      'Objektbezogene Einordnung nach tatsächlichem Zustand',
      'Realistische Festpreisangebote nach Besichtigung',
    ],
  },
]

export default function App() {
  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#6F6559] antialiased selection:bg-[#B79B6C]/20">
      
      {/* --- PREMIUM FLOATING HEADER --- */}
      <div className="fixed inset-x-0 top-6 z-50 flex justify-center px-4 pointer-events-none">
        <header className="pointer-events-auto w-full max-w-6xl rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-4 py-3 transition-all duration-500">
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
                  className="text-sm font-medium text-[#8A7E70] transition hover:text-[#B79B6C]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="#kontakt"
              className="inline-flex shrink-0 items-center rounded-full bg-[#B79B6C] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(183,155,108,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(183,155,108,0.3)] hover:bg-[#A98E60]"
            >
              Besichtigung anfragen
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
            <div className="lg:col-span-7 lg:self-end lg:pb-14">
              <h1 className="text-[36px] font-medium leading-[1.1] text-[#2C2C2C] sm:text-[46px] lg:text-[56px]">
                Exzellenz in der Reinigung. Für Praxen, Kanzleien und anspruchsvolle Objekte in Berlin.
              </h1>
              <p className="mt-8 max-w-[34rem] text-[17px] leading-8 text-[#7E7367] lg:text-[19px]">
                Präzise Abstimmung. Diskrete Durchführung. Ein Qualitätsanspruch, der im Hintergrund perfekt funktioniert.
              </p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="#kontakt" className="inline-flex items-center justify-center rounded-full bg-[#B79B6C] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(183,155,108,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(183,155,108,0.3)] hover:bg-[#A98E60]">
                  Besichtigung anfragen
                </a>
                <a href="#leistungen" className="inline-flex items-center justify-center rounded-full border border-[#D9CCB8] bg-white/50 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-[#6F6559] transition-all duration-300 hover:bg-white hover:shadow-sm">
                  Leistungen ansehen
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* --- LEISTUNGEN --- */}
        <section id="leistungen" className="bg-[#F7F4EE] py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Leistungen</p>
              <h2 className="mt-5 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[44px]">
                Maßgeschneiderte Reinigungskonzepte für Objekte mit höchstem Anspruch.
              </h2>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 xl:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E1D8] bg-white p-8 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#B79B6C]/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                  <div className="flex-grow">
                    <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{service.eyebrow}</div>
                    <h3 className="mt-4 text-[26px] font-semibold leading-[1.15] text-[#2C2C2C]">{service.title}</h3>
                    <p className="mt-4 text-[15px] leading-7 text-[#7E7367]">{service.text}</p>
                    <div className="mt-6 h-px w-full bg-[#E5E1D8]" />
                  </div>
                  <ul className="mt-6 space-y-3 text-[15px] leading-6 text-[#6F6559]">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B79B6C]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* --- WARUM NAUTILUS --- */}
        <section id="warum-nautilus" className="bg-white py-32 lg:py-40 border-y border-[#E5E1D8]/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
              <div className="lg:col-span-5 lg:pr-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Warum Nautilus</p>
                <h2 className="mt-5 max-w-[12ch] text-3xl font-semibold leading-[1.06] text-[#2C2C2C] lg:text-[44px]">
                  Ein Standard, der keine Kompromisse kennt.
                </h2>
                <p className="mt-6 text-[16px] leading-8 text-[#8A7E70]">
                  Wir arbeiten für Kunden, die Perfektion nicht als Zufall, sondern als Prozess verstehen. Wir integrieren uns lautlos in Ihre Abläufe – für ein dauerhaft makelloses Ergebnis, das Sie jeden Tag spüren.
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {[
                  { title: 'Diskrete Ausführung', desc: 'Lautlose Integration in Ihr Tagesgeschäft. Wir agieren unsichtbar, aber unser Ergebnis ist unübersehbar.' },
                  { title: 'Klare Abstimmung', desc: 'Ein fester Ansprechpartner, klare Kommunikation und vorausschauendes Handeln.' },
                  { title: 'Verlässliche Standards', desc: 'Wir liefern nicht nur am ersten Tag Bestleistungen, sondern garantieren dauerhaften Werterhalt.' },
                  { title: 'Sensible Umfelder', desc: 'Geschultes Personal für Bereiche, in denen Vertrauen und Hygiene absolute Priorität haben.' }
                ].map((item) => (
                  <article key={item.title} className="rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] p-8 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:bg-white hover:border-[#B79B6C]/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                    <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{item.title}</div>
                    <div className="mt-4 h-px w-10 bg-[#E5E1D8]" />
                    <p className="mt-4 text-[14px] leading-7 text-[#7E7367]">{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- AUFTRETEN & HALTUNG (DARK MODE LUXURY) --- */}
        <section className="bg-[#1A1A1A] py-32 lg:py-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(183,155,108,0.1),transparent_40%)]" />
          <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Auftreten & Haltung</p>
                <h2 className="mt-5 text-3xl font-semibold leading-[1.08] text-white lg:text-[44px]">
                  Diskret im Auftritt.<br />Kompromisslos in der Qualität.
                </h2>
                <p className="mt-8 text-[16px] leading-8 text-[#D9CCB8]">
                  Wir verstehen uns als unsichtbaren Teil Ihres Erfolgs. Ein gepflegtes Erscheinungsbild, absolute Verschwiegenheit und tadellose Umgangsformen sind für unser Personal obligatorisch.
                </p>
                <p className="mt-4 text-[16px] leading-8 text-[#D9CCB8]">
                  Gerade in Kanzleien, Praxen und exklusiven Büros zählt nicht die reine Anwesenheit – sondern die Fähigkeit, einen Raum in seinen besten Zustand zu versetzen, ohne die dortigen Abläufe auch nur eine Sekunde zu stören.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#232323] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <img src="/images/nautilus-cleaning-team-berlin.jpg" alt="Team" className="mx-auto w-full max-h-[500px] object-cover opacity-90" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- ABLAUF --- */}
        <section id="ablauf" className="bg-white py-32 lg:py-40 border-b border-[#E5E1D8]/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
              <div className="lg:col-span-5 lg:pr-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Ablauf</p>
                <h2 className="mt-5 text-3xl font-semibold leading-[1.06] text-[#2C2C2C] lg:text-[44px]">
                  Vom ersten Kontakt bis zum makellosen Ergebnis.
                </h2>
                <p className="mt-6 text-[16px] leading-8 text-[#8A7E70]">
                  Ein bewährter Prozess garantiert Ergebnisse auf höchstem Niveau. Wir überlassen nichts dem Zufall, sondern definieren jeden Schritt von der ersten Begehung bis zur täglichen Umsetzung präzise.
                </p>
              </div>
              <div className="lg:col-span-7 space-y-5">
                {[
                  { step: '01 · Analyse', text: 'Präzise Bestandsaufnahme. Wir erfassen Ihre Räumlichkeiten und spezifischen Anforderungen bis ins letzte Detail.' },
                  { step: '02 · Abstimmung', text: 'Sie erhalten ein transparentes, exakt kalkuliertes Reinigungskonzept ohne versteckte Kosten.' },
                  { step: '03 · Umsetzung', text: 'Nahtlose und ruhige Integration unseres Stammpersonals in Ihre Gebäudeabläufe.' },
                  { step: '04 · Qualitätssicherung', text: 'Kontinuierliches Monitoring und proaktive Kommunikation sichern unseren Premium-Standard.' }
                ].map((item) => (
                  <article key={item.step} className="rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] p-8 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white hover:border-[#B79B6C]/40 hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)]">
                    <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{item.step}</div>
                    <div className="mt-4 h-px w-10 bg-[#E5E1D8]" />
                    <p className="mt-4 text-[15px] leading-7 text-[#7E7367]">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION INCLUDED HERE --- */}
        <FAQSection />

        {/* --- KONTAKT --- */}
        <section id="kontakt" className="bg-[#F7F4EE] py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid items-start gap-16 lg:grid-cols-2">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Kontakt</p>
                <h2 className="mt-5 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[44px]">
                  Teilen Sie uns Ihre Wünsche mit. Den Rest übernehmen wir.
                </h2>
                <p className="mt-6 text-[16px] leading-8 text-[#8A7E70]">
                  Für exklusive Büros, Arztpraxen und anspruchsvolle Gewerbeobjekte in Berlin. Kurze Anfrage genügt – wir melden uns zeitnah.
                </p>
                <div className="mt-12 space-y-4">
                  {[
                    { title: 'Fokus', content: 'Repräsentative Büros · Medizinische Einrichtungen · Gehobene Immobilien' },
                    { title: 'Ablauf', content: 'Anfrage · Besichtigung · Angebot · Start der Reinigung' },
                    { title: 'Einsatzgebiet', content: 'Mitte · Prenzlauer Berg · Friedrichshain · Lichtenberg · Marzahn' }
                  ].map((box) => (
                    <div key={box.title} className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{box.title}</p>
                      <p className="mt-3 text-[15px] leading-7 text-[#6F6559] whitespace-pre-line">{box.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- PREMIUM KONTAKTFORMULAR --- */}
              <div className="rounded-3xl border border-[#E5E1D8] bg-white p-8 shadow-xl shadow-black/5 lg:p-12">
                <div className="mb-10">
                  <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Diskrete Anfrage</p>
                  <p className="mt-4 text-[15px] leading-7 text-[#7E7367]">
                    Hinterlassen Sie uns die wichtigsten Eckdaten. Ihr fester Ansprechpartner meldet sich umgehend mit einer ersten Einschätzung.
                  </p>
                </div>
                <form id="contact-form" action="https://formspree.io/f/mnjonren" method="POST" className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7E70]">Objektart</label>
                      <select name="Objektart" className="w-full appearance-none rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-4 text-[15px] text-[#2C2C2C] outline-none transition-all duration-300 focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10 cursor-pointer">
                        <option>Büro & Kanzlei</option>
                        <option>Arztpraxis</option>
                        <option>Treppenhaus & Objekt</option>
                        <option>Gehobene Gewerbeeinheit</option>
                        <option>Bauprojekt</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7E70]">Turnus</label>
                      <select name="Turnus" className="w-full appearance-none rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-4 text-[15px] text-[#2C2C2C] outline-none transition-all duration-300 focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10 cursor-pointer">
                        <option>Täglich</option>
                        <option>Mehrmals pro Woche</option>
                        <option>Wöchentlich</option>
                        <option>Nach Bedarf</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7E70]">Name</label>
                      <input type="text" name="Name" required placeholder="Ihr Name" className="w-full rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-4 text-[15px] text-[#2C2C2C] outline-none transition-all duration-300 placeholder:text-[#B0A596] focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10" />
                    </div>
                    <div>
                      <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7E70]">E-Mail</label>
                      <input type="email" name="E-Mail" required placeholder="kontakt@unternehmen.de" className="w-full rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-4 text-[15px] text-[#2C2C2C] outline-none transition-all duration-300 placeholder:text-[#B0A596] focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7E70]">Objekt kurz beschreiben</label>
                    <textarea rows={4} name="Nachricht" required placeholder="Größe, Besonderheiten, Wünsche..." className="w-full rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-4 text-[15px] text-[#2C2C2C] outline-none transition-all duration-300 placeholder:text-[#B0A596] focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10 resize-none" />
                  </div>
                  
                  <div className="pt-4">
                    <input type="hidden" name="_subject" value="Neue exklusive Anfrage über nautilus-facility.de" />
                    <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                    <button type="submit" className="w-full rounded-2xl bg-[#B79B6C] px-6 py-4 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(183,155,108,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(183,155,108,0.3)] hover:bg-[#A98E60]">
                      Anfrage diskret senden
                    </button>
                  </div>
                  <p className="text-center text-[13px] text-[#9A8D7D] mt-4">Ihre Daten werden verschlüsselt und absolut vertraulich behandelt.</p>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-white py-16 border-t border-[#E5E1D8]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-start lg:justify-between lg:px-10">
          <div>
            <div className="text-[11px] font-bold tracking-[0.3em] text-[#B79B6C]">
              NAUTILUS FACILITY CLEANING
            </div>
            <p className="mt-5 max-w-md text-[14px] leading-7 text-[#8A7E70]">
              Ein Geschäftsbereich der Nautilus Security UG (haftungsbeschränkt).<br />
              Exzellenz in der Reinigung für Berlin Mitte, Prenzlauer Berg, Friedrichshain, Lichtenberg und Marzahn.
            </p>
            <div className="mt-8 flex flex-col gap-2 text-[14px] text-[#6F6559]">
              <a href="mailto:kontakt@nautilus-facility.de" className="hover:text-[#B79B6C] transition-colors">kontakt@nautilus-facility.de</a>
              <a href="tel:+4917622844636" className="hover:text-[#B79B6C] transition-colors">0176 22844636</a>
            </div>
          </div>
          <div className="flex gap-8 text-[14px] text-[#8A7E70]">
            <a href="impressum/" className="hover:text-[#B79B6C] transition-colors">Impressum</a>
            <a href="datenschutz/" className="hover:text-[#B79B6C] transition-colors">Datenschutz</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
