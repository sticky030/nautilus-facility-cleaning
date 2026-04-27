import { useEffect, useState } from 'react'
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
    text: 'Branchenspezifische Hygienekonzepte für Arztpraxen, Kanzleien und exklusive Büros. Wir arbeiten mit klinischer Präzision und absoluter Diskretion, um Ihren laufenden Betrieb niemals zu stören.',
    bullets: [
      'Hygienische Sanitär- & Teeküchenreinigung',
      'Pflege von IT- & Arbeitsplatzoberflächen',
      'Aufbereitung von Konferenzbereichen',
      'Diskretes Abfallmanagement & Leerung'
    ],
  },
  {
    eyebrow: 'Hochwertige Objektpflege',
    title: 'Treppenhaus- & Foyer-Service',
    text: 'Der erste Eindruck zählt. Wir sorgen dafür, dass Foyers und Treppenhäuser die Hochwertigkeit Ihres Objekts widerspiegeln – durch kontinuierliche, werterhaltende Detailpflege für Bewohner und Besucher.',
    bullets: [
      'Streifenfreie Glas-, Portal- & Spiegelreinigung',
      'Pflege von Briefkästen & Schmutzschleusen',
      'Reinigung von Fahrstühlen & Handläufen',
      'Fachgerechte Naturstein- & Bodenpflege'
    ],
  },
  {
    eyebrow: 'Spezial- & Projektbezogen',
    title: 'Präzise Bauendreinigung',
    text: 'Nach Abschluss von Bau- oder Sanierungsprojekten bringen wir Ihre Räumlichkeiten in einen bezugsfertigen Zustand. Termingerecht, staubfrei und perfekt vorbereitet für die finale Objektabnahme.',
    bullets: [
      'Baugrob- & Feinreinigung bis Bezugsfertigkeit',
      'Intensive Fenster-, Falz- & Rahmenreinigung',
      'Schonende Ersteinpflege von Neu-Oberflächen',
      'Hygienische Erstreinigung der Sanitäranlagen'
    ],
  },
]

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/mnjonren", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Fehler beim Senden");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#6F6559] antialiased selection:bg-[#B79B6C]/20 text-left">
      
      {/* HEADER */}
      <div className="fixed inset-x-0 top-6 z-50 flex justify-center px-4 pointer-events-none">
        <header className="pointer-events-auto w-full max-w-6xl rounded-full bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-4 py-3 transition-all duration-500">
          <div className="flex items-center justify-between gap-6 px-2">
            <a href="#start" className="flex min-w-0 items-center gap-3">
              <img src="/images/reinigung-trans.png" alt="Nautilus" className="h-14 w-14 shrink-0 object-contain" />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold tracking-[0.28em] text-[#B79B6C]">NAUTILUS</div>
                <div className="truncate text-[11px] uppercase tracking-[0.34em] text-[#9A8C7B]">Facility Cleaning</div>
              </div>
            </a>
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-[13px] font-semibold uppercase tracking-wider text-[#8A7E70] transition hover:text-[#B79B6C]">{item.label}</a>
              ))}
            </nav>
            <a href="#kontakt" className="inline-flex shrink-0 items-center rounded-full bg-[#B79B6C] px-7 py-3 text-[13px] font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(183,155,108,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(183,155,108,0.4)] hover:bg-[#A98E60]">Anfrage stellen</a>
          </div>
        </header>
      </div>

      <main className="overflow-x-clip text-left">
        {/* HERO */}
        <section id="start" className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#F3EFE7]">
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(96deg,rgba(247,244,238,0.94)_0%,rgba(247,244,238,0.90)_36%,rgba(247,244,238,0.70)_64%,rgba(247,244,238,0.34)_100%)]" />
          <div className="relative mx-auto grid w-full max-w-7xl px-6 pb-20 pt-36 lg:px-10 lg:pb-28 lg:pt-40">
            <div className="reveal lg:max-w-4xl text-left">
              <div className="inline-flex items-center gap-3 mb-8">
                <span className="h-px w-8 bg-[#B79B6C]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#B79B6C]">Gebäudereinigung Berlin</span>
              </div>
              <h1 className="text-[34px] font-medium leading-[1.15] text-[#2C2C2C] sm:text-[44px] lg:text-[56px]">
                Unterhaltsreinigung in Berlin für Praxen, Büros, Kanzleien und Hausverwaltungen.
              </h1>
              <p className="mt-8 max-w-[40rem] text-[17px] leading-8 text-[#7E7367] lg:text-[19px] font-light">
                Wir entlasten Sie von jeglichem Aufwand rund um Ihr Objekt. Unsere eingespielten Abläufe garantieren jeden Morgen einen perfekten Empfang für Ihre Mandanten und Patienten – verschwiegen, autonom und verlässlich. Damit Sie sich voll auf das Wesentliche konzentrieren können.
              </p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="#kontakt" className="inline-flex items-center justify-center rounded-full bg-[#B79B6C] px-9 py-4 text-[14px] font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(183,155,108,0.4)] hover:bg-[#A98E60]">Unverbindliche Anfrage</a>
                <a href="#leistungen" className="inline-flex items-center justify-center rounded-full border border-[#D9CCB8] bg-white/50 backdrop-blur-md px-9 py-4 text-[14px] font-bold uppercase tracking-wider text-[#6F6559] transition-all duration-300 hover:bg-white hover:border-[#B79B6C]/50">Expertise ansehen</a>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERTISE - ABSOLUTE ALIGNMENT FIX */}
        <section id="leistungen" className="bg-[#F7F4EE] py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 text-left">
            <div className="reveal max-w-3xl mb-16">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Unsere Expertise</p>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">
                Maßgeschneiderte Reinigungskonzepte für Objekte mit höchstem Anspruch.
              </h2>
            </div>
            
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} className="reveal group flex flex-col h-full bg-white rounded-xl border border-[#E5E1D8] p-8 lg:p-10 shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#B79B6C]/50 hover:shadow-[0_15px_40px_rgba(183,155,108,0.08)]">
                  {/* Der obere Textbereich ist flex-grow und dehnt sich aus */}
                  <div className="flex flex-col flex-grow text-left">
                    <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{service.eyebrow}</div>
                    <h3 className="mt-5 text-[24px] font-semibold leading-[1.2] text-[#2C2C2C]">{service.title}</h3>
                    <p className="mt-4 text-[15px] leading-7 text-[#7E7367]">{service.text}</p>
                  </div>
                  {/* Die Liste unten hat eine feste Höhe (220px), dadurch liegt der Strich bei allen Boxen exakt gleich */}
                  <div className="mt-8 flex flex-col justify-end shrink-0 text-left">
                    <div className="h-px w-full bg-gradient-to-r from-[#E5E1D8] via-[#B79B6C]/30 to-transparent" />
                    <ul className="mt-6 flex flex-col justify-start gap-4 h-auto md:h-[200px] lg:h-[220px] text-[15px] leading-6 text-[#6F6559]">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-4">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B79B6C] shadow-[0_0_8px_rgba(183,155,108,0.6)]" />
                          <span className="text-left">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* WARUM NAUTILUS - TEXTE RESTAURIERT */}
        <section id="warum-nautilus" className="bg-white py-32 lg:py-40 border-y border-[#E5E1D8]/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 text-left">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 text-left">
              <div className="reveal lg:col-span-5 lg:pr-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Warum Nautilus</p>
                <h2 className="mt-6 max-w-[12ch] text-3xl font-semibold leading-[1.06] text-[#2C2C2C] lg:text-[46px]">Ein Standard, der keine Kompromisse kennt.</h2>
                <p className="mt-8 text-[17px] leading-8 text-[#8A7E70]">
                  Wir arbeiten für Kunden, die Perfektion nicht als Zufall, sondern als systematischen Prozess verstehen. Ein makelloses Umfeld fördert die Produktivität und das Vertrauen Ihrer Klienten.
                </p>
                <p className="mt-5 text-[17px] leading-8 text-[#8A7E70]">
                  Wir integrieren unsere Dienstleistung lautlos in Ihre Abläufe – für ein dauerhaftes Ergebnis, das Sie jeden Tag spüren, ohne es managen zu müssen.
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[
                  { title: 'Diskrete Ausführung', desc: 'Lautlose Integration in Ihr Tagesgeschäft. Unsere Teams agieren unsichtbar – das Ergebnis ist unübersehbar.' },
                  { title: 'Klare Abstimmung', desc: 'Ein fester, persönlicher Ansprechpartner. Proaktive Kommunikation und vorausschauendes Handeln.' },
                  { title: 'Verlässliche Standards', desc: 'Durch internes Qualitätsmanagement sichern wir einen konstanten Standard.' },
                  { title: 'Sensible Umfelder', desc: 'Speziell geschultes Personal für Bereiche, in denen Vertrauen absolute Priorität hat.' }
                ].map((item) => (
                  <article key={item.title} className="reveal bg-[#FCFBF8] rounded-xl border border-[#E5E1D8] p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#B79B6C]/50 hover:shadow-[0_10px_30px_rgba(183,155,108,0.08)]">
                    <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{item.title}</div>
                    <div className="mt-4 h-px w-12 bg-gradient-to-r from-[#B79B6C] to-transparent" />
                    <p className="mt-4 text-[15px] leading-7 text-[#7E7367]">{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PERSONAL */}
        <section className="bg-[#F7F4EE] py-32 lg:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(183,155,108,0.1),transparent_50%)]" />
          <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10 text-left">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
              <div className="reveal lg:col-span-5 lg:pr-6 text-left">
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Haltung & Personal</p>
                <h2 className="mt-6 text-3xl font-semibold leading-[1.1] text-[#2C2C2C] lg:text-[46px]">Diskret im Auftritt. Präzise in der Ausführung.</h2>
                <p className="mt-8 text-[17px] leading-8 text-[#8A7E70] font-light">Wir verstehen uns als unsichtbaren, aber essenziellen Teil Ihres Unternehmenserfolgs. Ein tadellos gepflegtes Erscheinungsbild unserer Mitarbeiter und absolute Verschwiegenheit sind für uns obligatorisch.</p>
                <p className="mt-5 text-[17px] leading-8 text-[#8A7E70] font-light">Gerade in Notariaten, Privatpraxen und Vorstandsetagen zählt nicht die reine Anwesenheit des Personals – sondern die Fähigkeit, einen Raum mit höchster Präzision in seinen besten Zustand zu versetzen, ohne den Betrieb zu stören.</p>
              </div>
              <div className="reveal lg:col-span-7">
                <div className="relative overflow-hidden rounded-xl border border-[#E5E1D8] bg-white shadow-lg">
                  <img src="/images/nautilus-cleaning-team-berlin.jpg" alt="Cleaning Team" className="mx-auto w-full max-h-[550px] object-cover hover:scale-105 transition-transform duration-1000" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABLAUF - TEXT WIEDERHERGESTELLT */}
        <section id="ablauf" className="bg-white py-32 lg:py-40 border-b border-[#E5E1D8]/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 text-left">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-start">
              <div className="reveal lg:col-span-5 lg:pr-8 sticky top-32 lg:top-40 self-start text-left">
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Ablauf & Prozesse</p>
                <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">Vom ersten Kontakt bis zur unsichtbaren Routine.</h2>
                <p className="mt-8 text-[17px] leading-8 text-[#8A7E70]">
                  Ein Wechsel des Dienstleisters muss geräuschlos funktionieren. Wir implementieren unseren Standard, ohne Ihren laufenden Betrieb auch nur eine Minute zu stören.
                </p>
              </div>
              <div className="lg:col-span-7 space-y-8 pb-20 text-left">
                {[
                  { num: '01', title: 'Das Objekt-Audit', text: 'Wir erfassen Ihr Objekt bis ins letzte Detail – von empfindlichen Oberflächen bis zu strengen Sicherheitsvorgaben. Nichts wird dem Zufall überlassen.' },
                  { num: '02', title: 'Das lautlose Konzept', text: 'Wir entwickeln ein Reinigungsprotokoll, das sich unsichtbar in Ihren Berufsalltag einfügt. Maximale Effizienz ohne die geringste Störung Ihres Betriebs.' },
                  { num: '03', title: 'Nahtloses Onboarding', text: 'Keine Einarbeitungszeit für Sie. Ihr festes Stammpersonal wird im Vorfeld objektspezifisch geschult. Der Dienstleisterwechsel erfolgt absolut geräuschlos.' },
                  { num: '04', title: 'Autonomes Management', text: 'Wir kontrollieren uns selbst. Durch proaktives Monitoring garantieren wir ein makelloses Ergebnis, das vom ersten Tag an konstant bleibt – ohne dass Sie jemals eingreifen müssen.' }
                ].map((item, idx) => (
                  <article key={item.num} className="reveal sticky bg-[#FCFBF8] rounded-xl border border-[#E5E1D8] p-8 lg:p-10 shadow-[0_4px_15px_rgba(0,0,0,0.03)] transition-all duration-500 hover:border-[#B79B6C]/50 hover:shadow-[0_15px_40px_rgba(183,155,108,0.08)]" style={{ top: `calc(9rem + ${idx * 2}rem)` }}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[11px] font-bold tracking-[0.2em] text-[#B79B6C] border border-[#E5E1D8] bg-white px-3 py-1 rounded-full uppercase">Schritt {item.num}</span>
                    </div>
                    <h3 className="text-[20px] lg:text-[24px] font-semibold text-[#2C2C2C] mb-3">{item.title}</h3>
                    <p className="text-[15px] leading-7 text-[#7E7367] text-left">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FAQSection />

        {/* KONTAKT */}
        <section id="kontakt" className="bg-[#F7F4EE] py-32 lg:py-40 border-b border-[#E5E1D8]/60 text-left">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid items-start gap-20 lg:grid-cols-2 text-left">
              <div className="reveal text-left">
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Kontakt & Anfrage</p>
                <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">Der erste Schritt zu einem makellosen Ergebnis.</h2>
                <div className="mt-14 space-y-4">
                  {[
                    { title: 'Unsere Mandanten', content: 'Arztpraxen, Kanzleien, Büros, Hausverwaltung, Bauprojekte' },
                    { title: 'Einsatzgebiete', content: 'Mitte · Pankow · Lichtenberg · Marzahn · Friedrichshain-Kreuzberg' },
                    { title: 'Reaktionszeit', content: 'Wir prüfen Ihr Anliegen absolut vertraulich und melden uns innerhalb von 24 Stunden bei Ihnen.' }
                  ].map((box) => (
                    <div key={box.title} className="bg-white rounded-xl border border-[#E5E1D8] p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#B79B6C]/50">
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{box.title}</p>
                      <p className="mt-3 text-[15px] leading-7 text-[#6F6559]">{box.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal bg-white rounded-xl border border-[#E5E1D8] p-8 lg:p-12 shadow-sm relative overflow-hidden text-left">
                {submitted ? (
                  <div className="py-20 text-center animate-in fade-in duration-500">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#B79B6C]/10 text-[#B79B6C]">
                      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-[#2C2C2C]">Anfrage wurde gesendet</h3>
                    <p className="mt-4 text-[15px] text-[#7E7367]">Vielen Dank. Wir melden uns zeitnah bei Ihnen.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-5 sm:grid-cols-2 text-left">
                      <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7E70]">Objektart</label>
                        <div className="relative">
                          <select name="Objektart" className="w-full appearance-none rounded-lg border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-3 pr-12 text-[15px] text-[#2C2C2C] outline-none transition-all duration-300 focus:border-[#B79B6C] cursor-pointer">
                            <option>Büro & Kanzlei</option>
                            <option>Arztpraxis</option>
                            <option>Treppenhaus & Objekt</option>
                            <option>Hausverwaltung</option>
                            <option>Bauprojekt</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#B79B6C]">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7E70]">Turnus</label>
                        <div className="relative text-left">
                          <select name="Turnus" className="w-full appearance-none rounded-lg border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-3 pr-12 text-[15px] text-[#2C2C2C] outline-none transition-all duration-300 focus:border-[#B79B6C] cursor-pointer">
                            <option>Täglich</option>
                            <option>Mehrmals pro Woche</option>
                            <option>Wöchentlich</option>
                            <option>Nach Bedarf</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#B79B6C]">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7E70]">Name</label>
                      <input type="text" name="Name" required placeholder="Ihr Name" className="w-full rounded-lg border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-3 text-[15px] outline-none focus:border-[#B79B6C]" />
                    </div>
                    <div>
                      <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7E70]">E-Mail</label>
                      <input type="email" name="E-Mail" required placeholder="kontakt@unternehmen.de" className="w-full rounded-lg border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-3 text-[15px] outline-none focus:border-[#B79B6C]" />
                    </div>
                    <div>
                      <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7E70]">Objekt kurz beschreiben</label>
                      <textarea rows={4} name="Nachricht" required placeholder="Größe, Besonderheiten, Wünsche..." className="w-full rounded-lg border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-3 text-[15px] outline-none focus:border-[#B79B6C] resize-none" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full rounded-full bg-[#B79B6C] px-6 py-4 text-[14px] font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#A98E60] transition-all disabled:opacity-50">
                      {loading ? 'Wird gesendet...' : 'Anfrage sicher senden'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-20 border-t border-[#E5E1D8] text-left">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-12 lg:gap-16">
            <div>
              <div className="text-[12px] font-bold tracking-[0.35em] text-[#B79B6C] mb-8">NAUTILUS FACILITY CLEANING</div>
              <p className="mt-4 max-w-md text-[14px] text-[#8A7E70]">Ein Geschäftsbereich der Nautilus Security UG (haftungsbeschränkt).<br />Spezialisierte Gebäudereinigung für Berlin.</p>
            </div>
            <div className="flex flex-col gap-6 text-left">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B79B6C] mb-3 text-left">Dienstleistungen</p>
                <div className="flex flex-wrap items-center gap-y-2 text-[14px] font-medium text-[#2C2C2C]">
                  <span>Unterhaltsreinigung</span><span className="mx-4 h-3 w-px bg-[#E5E1D8]"></span>
                  <span>Büroreinigung</span><span className="mx-4 h-3 w-px bg-[#E5E1D8]"></span>
                  <span>Kanzleireinigung</span><span className="mx-4 h-3 w-px bg-[#E5E1D8]"></span>
                  <span>Praxisreinigung</span><span className="mx-4 h-3 w-px bg-[#E5E1D8]"></span>
                  <span>Treppenhausreinigung</span><span className="mx-4 h-3 w-px bg-[#E5E1D8]"></span>
                  <span>Bauendreinigung</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B79B6C] mb-3 text-left">Einsatzgebiete Berlin</p>
                <div className="flex flex-wrap items-center gap-y-2 text-[14px] font-medium text-[#2C2C2C]">
                  <span>Mitte</span><span className="mx-4 text-[#E5E1D8]">·</span>
                  <span>Pankow</span><span className="mx-4 text-[#E5E1D8]">·</span>
                  <span>Friedrichshain</span><span className="mx-4 text-[#E5E1D8]">·</span>
                  <span>Lichtenberg</span><span className="mx-4 text-[#E5E1D8]">·</span>
                  <span>Marzahn</span>
                </div>
              </div>
            </div>
            <div className="pt-12 border-t border-[#E5E1D8] flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between text-left">
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-10 text-[15px] font-medium text-[#2C2C2C]">
                <a href="mailto:kontakt@nautilus-facility.de" className="underline decoration-[#B79B6C]/30 underline-offset-4">kontakt@nautilus-facility.de</a>
                <a href="tel:+4917622844636" className="underline decoration-[#B79B6C]/30 underline-offset-4">0176 22844636</a>
              </div>
              <div className="flex gap-8 text-[13px] font-semibold uppercase tracking-widest text-[#8A7E70]">
                <a href="impressum/">Impressum</a>
                <a href="datenschutz/">Datenschutz</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
