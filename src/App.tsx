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
      if (response.ok) setSubmitted(true);
    } catch (error) {
      console.error("Fehler");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#6F6559] antialiased selection:bg-[#B79B6C]/20 text-left">
      
      <div className="fixed inset-x-0 top-6 z-50 flex justify-center px-4 pointer-events-none">
        <header className="pointer-events-auto w-full max-w-6xl rounded-full bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-4 py-3 transition-all duration-500">
          <div className="flex items-center justify-between gap-6 px-2">
            <a href="#start" className="flex items-center gap-3">
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
            <a href="#kontakt" className="inline-flex shrink-0 items-center rounded-full bg-[#B79B6C] px-7 py-3 text-[13px] font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#A98E60]">Anfrage stellen</a>
          </div>
        </header>
      </div>

      <main className="overflow-x-clip">
        {/* HERO */}
        <section id="start" className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#F3EFE7]">
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(96deg,rgba(247,244,238,0.94)_0%,rgba(247,244,238,0.90)_36%,rgba(247,244,238,0.70)_64%,rgba(247,244,238,0.34)_100%)]" />
          <div className="relative mx-auto grid w-full max-w-7xl px-6 pb-20 pt-36 lg:px-10 lg:pb-28 lg:pt-40 text-left">
            <div className="reveal lg:max-w-4xl">
              <div className="inline-flex items-center gap-3 mb-8">
                <span className="h-px w-8 bg-[#B79B6C]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#B79B6C]">Gebäudereinigung Berlin</span>
              </div>
              <h1 className="text-[34px] font-medium leading-[1.15] text-[#2C2C2C] sm:text-[44px] lg:text-[56px]">
                Unterhaltsreinigung in Berlin für Praxen, Büros, Kanzleien und Hausverwaltungen.
              </h1>
              <p className="mt-8 max-w-[40rem] text-[17px] leading-8 text-[#7E7367] lg:text-[19px] font-light italic_off">
                Wir entlasten Sie von jeglichem Aufwand rund um Ihr Objekt. Unsere eingespielten Abläufe garantieren jeden Morgen einen perfekten Empfang für Ihre Mandanten und Patienten – verschwiegen, autonom und verlässlich. Damit Sie sich voll auf das Wesentliche konzentrieren können.
              </p>
            </div>
          </div>
        </section>

        {/* EXPERTISE - FIX: Absolute Line Alignment */}
        <section id="leistungen" className="bg-[#F7F4EE] py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="reveal max-w-3xl text-left mb-16">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Unsere Expertise</p>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">
                Maßgeschneiderte Reinigungskonzepte für Objekte mit höchstem Anspruch.
              </h2>
            </div>
            
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} className="reveal flex flex-col h-full bg-white rounded-xl border border-[#E5E1D8] p-8 lg:p-10 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#B79B6C]/50 hover:shadow-lg">
                  {/* Der Text-Container erzwingt eine identische Höhe bis zum Strich */}
                  <div className="flex flex-col min-h-[320px] lg:min-h-[340px]">
                    <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{service.eyebrow}</div>
                    <h3 className="mt-5 text-[24px] font-semibold leading-[1.2] text-[#2C2C2C]">{service.title}</h3>
                    <p className="mt-4 text-[15px] leading-7 text-[#7E7367]">{service.text}</p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="h-px w-full bg-gradient-to-r from-[#E5E1D8] via-[#B79B6C]/30 to-transparent mb-8" />
                    <ul className="space-y-4 text-[15px] leading-6 text-[#6F6559]">
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

        {/* WARUM NAUTILUS - FULL TEXT RESTORED */}
        <section id="warum-nautilus" className="bg-white py-32 lg:py-40 border-y border-[#E5E1D8]/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
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
                  <article key={item.title} className="reveal bg-[#FCFBF8] rounded-xl border border-[#E5E1D8] p-8 transition-all duration-500 hover:border-[#B79B6C]/50">
                    <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{item.title}</div>
                    <p className="mt-4 text-[15px] leading-7 text-[#7E7367]">{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PERSONAL */}
        <section className="bg-[#F7F4EE] py-32 lg:py-48 text-left">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-center">
              <div className="reveal lg:col-span-5 lg:pr-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Haltung & Personal</p>
                <h2 className="mt-6 text-3xl font-semibold leading-[1.1] text-[#2C2C2C] lg:text-[46px]">Diskret im Auftritt. Präzise in der Ausführung.</h2>
                <p className="mt-8 text-[17px] leading-8 text-[#8A7E70]">Wir verstehen uns als unsichtbaren Teil Ihres Erfolgs. Absolute Verschwiegenheit ist für uns obligatorisch.</p>
              </div>
              <div className="reveal lg:col-span-7">
                <img src="/images/nautilus-cleaning-team-berlin.jpg" alt="Team" className="rounded-xl shadow-lg w-full object-cover max-h-[500px]" />
              </div>
            </div>
          </div>
        </section>

        {/* ABLAUF - STICKY CARDS */}
        <section id="ablauf" className="bg-white py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 text-left">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-start">
              <div className="reveal lg:col-span-5 lg:pr-8 sticky top-32 lg:top-40 self-start">
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Ablauf</p>
                <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">Vom ersten Kontakt bis zur Routine.</h2>
              </div>
              <div className="lg:col-span-7 space-y-8 pb-20">
                {[
                  { num: '01', title: 'Das Objekt-Audit', text: 'Wir erfassen Ihr Objekt bis ins letzte Detail.' },
                  { num: '02', title: 'Das lautlose Konzept', text: 'Wir entwickeln einen Plan, der sich unsichtbar einfügt.' },
                  { num: '03', title: 'Nahtloses Onboarding', text: 'Ihr festes Stammpersonal wird objektspezifisch geschult.' },
                  { num: '04', title: 'Autonomes Management', text: 'Proaktives Monitoring für ein makelloses Ergebnis.' }
                ].map((item, idx) => (
                  <article key={item.num} className="reveal sticky bg-[#FCFBF8] rounded-xl border border-[#E5E1D8] p-10 shadow-sm" style={{ top: `calc(9rem + ${idx * 2}rem)` }}>
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[#B79B6C] border border-[#E5E1D8] bg-white px-3 py-1 rounded-full">SCHRITT {item.num}</span>
                    <h3 className="mt-4 text-[22px] font-semibold text-[#2C2C2C]">{item.title}</h3>
                    <p className="mt-3 text-[15px] leading-7 text-[#7E7367]">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FAQSection />

        {/* KONTAKT - MANDANTEN CORRECTED */}
        <section id="kontakt" className="bg-[#F7F4EE] py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid items-start gap-20 lg:grid-cols-2 text-left">
              <div className="reveal">
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Kontakt</p>
                <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">Anfrage stellen.</h2>
                <div className="mt-14 space-y-4">
                  {[
                    { title: 'Unsere Mandanten', content: 'Arztpraxen, Kanzleien, Büros, Hausverwaltung, Bauprojekte' },
                    { title: 'Einsatzgebiete', content: 'Mitte · Pankow · Lichtenberg · Marzahn · Friedrichshain-Kreuzberg' }
                  ].map((box) => (
                    <div key={box.title} className="bg-white rounded-xl border border-[#E5E1D8] p-8 shadow-sm">
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{box.title}</p>
                      <p className="mt-3 text-[15px] text-[#6F6559]">{box.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal bg-white rounded-xl border border-[#E5E1D8] p-8 lg:p-12 shadow-sm">
                {submitted ? (
                  <div className="py-20 text-center animate-in fade-in duration-500">
                    <h3 className="text-2xl font-semibold text-[#2C2C2C]">Anfrage wurde gesendet</h3>
                    <p className="mt-4 text-[#7E7367]">Wir melden uns innerhalb von 24 Stunden.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="relative">
                        <select name="Objektart" className="w-full appearance-none rounded-lg border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-3 text-[15px] outline-none focus:border-[#B79B6C]">
                          <option>Büro & Kanzlei</option><option>Arztpraxis</option><option>Treppenhaus</option><option>Hausverwaltung</option><option>Bauprojekt</option>
                        </select>
                      </div>
                      <div className="relative">
                        <select name="Turnus" className="w-full appearance-none rounded-lg border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-3 text-[15px] outline-none focus:border-[#B79B6C]">
                          <option>Täglich</option><option>Mehrmals pro Woche</option><option>Wöchentlich</option><option>Nach Bedarf</option>
                        </select>
                      </div>
                    </div>
                    <input type="text" name="Name" required placeholder="Name" className="w-full rounded-lg border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-3 text-[15px] outline-none focus:border-[#B79B6C]" />
                    <input type="email" name="E-Mail" required placeholder="E-Mail" className="w-full rounded-lg border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-3 text-[15px] outline-none focus:border-[#B79B6C]" />
                    <textarea rows={4} name="Nachricht" required placeholder="Objektbeschreibung..." className="w-full rounded-lg border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-3 text-[15px] outline-none focus:border-[#B79B6C] resize-none" />
                    <button type="submit" disabled={loading} className="w-full rounded-full bg-[#B79B6C] py-4 text-[14px] font-bold uppercase text-white hover:bg-[#A98E60] transition-all">
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
          <div className="text-[12px] font-bold tracking-[0.35em] text-[#B79B6C] mb-8">NAUTILUS FACILITY CLEANING</div>
          <div className="flex flex-col lg:flex-row justify-between gap-12 pt-12 border-t border-[#E5E1D8]">
            <div className="flex flex-col gap-4 text-[15px]">
              <a href="mailto:kontakt@nautilus-facility.de" className="underline decoration-[#B79B6C]/30 underline-offset-4">kontakt@nautilus-facility.de</a>
              <a href="tel:+4917622844636" className="underline decoration-[#B79B6C]/30 underline-offset-4">0176 22844636</a>
            </div>
            <div className="flex gap-8 text-[13px] font-semibold uppercase tracking-widest text-[#8A7E70]">
              <a href="impressum/">Impressum</a>
              <a href="datenschutz/">Datenschutz</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
