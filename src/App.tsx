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
    text: 'Branchenspezifische Hygienekonzepte für Arztpraxen, Kanzleien und exklusive Büros. Wir arbeiten mit klinischer Präzision.',
    bullets: ['Sanitär- & Teeküchenreinigung', 'IT- & Arbeitsplatzflächen', 'Konferenzbereiche', 'Abfallmanagement'],
  },
  {
    eyebrow: 'Hochwertige Objektpflege',
    title: 'Treppenhaus-Service',
    text: 'Der erste Eindruck zählt. Wir sorgen dafür, dass Foyers und Treppenhäuser die Hochwertigkeit widerspiegeln.',
    bullets: ['Glas- & Portalreinigung', 'Briefkästen & Schmutzschleusen', 'Fahrstühle & Handläufe', 'Natursteinpflege'],
  },
  {
    eyebrow: 'Spezial- & Projektbezogen',
    title: 'Bauendreinigung',
    text: 'Nach Abschluss von Bauprojekten bringen wir Ihre Räumlichkeiten in einen bezugsfertigen Zustand.',
    bullets: ['Baugrob- & Feinreinigung', 'Fenster- & Rahmenreinigung', 'Ersteinpflege Neu-Flächen', 'Hygienische Erstreinigung'],
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
    <div className="min-h-screen bg-[#F7F4EE] text-[#6F6559] antialiased selection:bg-[#B79B6C]/20">
      
      {/* --- HEADER --- */}
      <div className="fixed inset-x-0 top-4 lg:top-6 z-50 flex justify-center px-4 pointer-events-none">
        <header className="pointer-events-auto w-full max-w-6xl rounded-full bg-white/85 backdrop-blur-xl border border-white/60 shadow-lg px-4 py-2 lg:py-3">
          <div className="flex items-center justify-between gap-4 px-2">
            <a href="#start" className="flex items-center gap-3">
              <img src="/images/reinigung-trans.png" alt="Logo" className="h-10 w-10 lg:h-14 lg:w-14 object-contain" />
              <div className="text-left leading-none">
                <div className="text-[10px] lg:text-sm font-bold tracking-[0.2em] text-[#B79B6C]">NAUTILUS</div>
                <div className="hidden lg:block text-[11px] uppercase tracking-[0.34em] text-[#9A8C7B]">Facility Cleaning</div>
              </div>
            </a>
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-[13px] font-semibold uppercase tracking-wider hover:text-[#B79B6C] transition-colors">{item.label}</a>
              ))}
            </nav>
            <a href="#kontakt" className="inline-flex items-center rounded-full bg-[#B79B6C] px-5 py-2.5 lg:px-7 lg:py-3 text-[11px] lg:text-[13px] font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#A98E60] transition-all">Anfrage</a>
          </div>
        </header>
      </div>

      <main className="overflow-x-clip">
        
        {/* --- HERO --- */}
        <section id="start" className="relative flex min-h-[90vh] lg:min-h-screen items-center bg-[#F3EFE7]">
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-white/70 lg:bg-[linear-gradient(96deg,rgba(247,244,238,0.94)_0%,rgba(247,244,238,0.70)_100%)]" />
          <div className="relative mx-auto w-full max-w-7xl px-6 pt-32 lg:pt-40">
            <div className="reveal lg:max-w-4xl text-left">
              <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.4em] text-[#B79B6C] block mb-4">Gebäudereinigung Berlin</span>
              <h1 className="text-[32px] sm:text-[44px] lg:text-[56px] font-medium leading-[1.2] text-[#2C2C2C]">
                Unterhaltsreinigung für Praxen, Büros, Kanzleien und Hausverwaltungen.
              </h1>
              <p className="mt-6 lg:mt-8 max-w-[40rem] text-[16px] lg:text-[19px] leading-relaxed font-light">
                Wir entlasten Sie von jeglichem Aufwand rund um Ihr Objekt. Unsere eingespielten Abläufe garantieren jeden Morgen einen perfekten Empfang.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href="#kontakt" className="inline-flex items-center justify-center rounded-full bg-[#B79B6C] px-8 py-4 text-[13px] font-bold uppercase text-white shadow-lg">Unverbindliche Anfrage</a>
              </div>
            </div>
          </div>
        </section>

        {/* --- LEISTUNGEN (Mobil: Swipe) --- */}
        <section id="leistungen" className="py-20 lg:py-40 bg-[#F7F4EE]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 text-left">
            <div className="reveal mb-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B79B6C]">Expertise</p>
              <h2 className="mt-4 text-2xl lg:text-[46px] font-semibold text-[#2C2C2C]">Unsere Leistungen.</h2>
            </div>
            <div className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto pb-8 lg:pb-0 snap-x no-scrollbar">
              {services.map((service) => (
                <article key={service.title} className="min-w-[85vw] lg:min-w-0 snap-center bg-white rounded-xl p-8 border border-[#E5E1D8] shadow-sm flex flex-col">
                  <div className="text-[10px] font-bold uppercase text-[#B79B6C] mb-4">{service.eyebrow}</div>
                  <h3 className="text-xl font-semibold text-[#2C2C2C] mb-4">{service.title}</h3>
                  <p className="text-[15px] leading-relaxed mb-6 flex-grow">{service.text}</p>
                  <ul className="space-y-3 pt-6 border-t border-[#F7F4EE]">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-3 text-[14px]">
                        <span className="h-1 w-1 rounded-full bg-[#B79B6C]" /> {b}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* --- WARUM NAUTILUS --- */}
        <section id="warum-nautilus" className="py-20 lg:py-40 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 reveal text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B79B6C]">Warum Nautilus</p>
                <h2 className="mt-4 text-2xl lg:text-[46px] font-semibold text-[#2C2C2C] leading-tight">Ein Standard ohne Kompromisse.</h2>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Diskretion', desc: 'Verschwiegenes Personal für sensible Bereiche.' },
                  { title: 'Feste Teams', desc: 'Immer die gleichen Ansprechpartner vor Ort.' },
                  { title: 'Systematik', desc: 'Klare Protokolle für konstante Qualität.' },
                  { title: 'Verlässlichkeit', desc: 'Pünktlich, gründlich und absolut lautlos.' }
                ].map((item) => (
                  <div key={item.title} className="bg-[#FCFBF8] border border-[#E5E1D8] p-6 rounded-xl text-left">
                    <div className="text-[10px] font-bold uppercase text-[#B79B6C] mb-2">{item.title}</div>
                    <p className="text-[14px]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- HALTUNG & PERSONAL --- */}
        <section className="bg-[#F7F4EE] py-20 lg:py-40 relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="reveal lg:col-span-5 text-left">
                <p className="text-[10px] font-bold uppercase text-[#B79B6C]">Haltung & Personal</p>
                <h2 className="mt-4 text-2xl lg:text-[46px] font-semibold text-[#2C2C2C]">Diskret im Auftritt. Präzise in der Ausführung.</h2>
                <p className="mt-6 text-[16px] lg:text-[18px] leading-relaxed font-light">Wir verstehen uns als unsichtbaren Teil Ihres Erfolgs. Ein tadelloses Erscheinungsbild und absolute Verschwiegenheit sind für uns obligatorisch.</p>
              </div>
              <div className="lg:col-span-7 reveal">
                <img src="/images/nautilus-cleaning-team-berlin.jpg" alt="Team" className="rounded-xl shadow-lg w-full object-cover max-h-[400px]" />
              </div>
            </div>
          </div>
        </section>

        {/* --- ABLAUF --- */}
        <section id="ablauf" className="py-20 lg:py-40 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="reveal lg:col-span-5 text-left">
                <p className="text-[10px] font-bold uppercase text-[#B79B6C]">Ablauf</p>
                <h2 className="mt-4 text-2xl lg:text-[46px] font-semibold text-[#2C2C2C]">Vom Kontakt zur Routine.</h2>
              </div>
              <div className="lg:col-span-7 space-y-4">
                {[
                  { n: '01', t: 'Objekt-Audit', d: 'Wir erfassen alle Details vor Ort.' },
                  { n: '02', t: 'Konzept', d: 'Ein Reinigungsplan, der Sie nicht stört.' },
                  { n: '03', t: 'Onboarding', d: 'Nahtloser Start mit festem Stammpersonal.' },
                  { n: '04', t: 'Management', d: 'Proaktive Kontrolle für konstante Ergebnisse.' }
                ].map((item) => (
                  <div key={item.n} className="flex gap-6 p-6 bg-[#FCFBF8] border border-[#E5E1D8] rounded-xl text-left">
                    <span className="text-[#B79B6C] font-bold">{item.n}</span>
                    <div>
                      <h4 className="font-bold text-[#2C2C2C]">{item.t}</h4>
                      <p className="text-sm">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FAQSection />

        {/* --- KONTAKT --- */}
        <section id="kontakt" className="py-20 lg:py-40 bg-[#F7F4EE]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 lg:p-16 border border-[#E5E1D8] shadow-sm">
              {submitted ? (
                <div className="py-12 text-center animate-in fade-in duration-500 text-left">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#B79B6C]/10 text-[#B79B6C]">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-[#2C2C2C]">Anfrage wurde gesendet</h3>
                  <p className="mt-4 text-[#7E7367]">Vielen Dank. Wir melden uns zeitnah bei Ihnen.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.2em] mb-3 text-[#8A7E70]">Objektart</label>
                      <div className="relative">
                        <select name="Objektart" className="w-full appearance-none rounded-lg border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-3 text-[15px] outline-none focus:border-[#B79B6C] cursor-pointer">
                          <option>Büro & Kanzlei</option>
                          <option>Arztpraxis</option>
                          <option>Treppenhaus & Objekt</option>
                          <option>Hausverwaltung</option>
                          <option>Bauprojekt</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#B79B6C]">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.2em] mb-3 text-[#8A7E70]">Turnus</label>
                      <div className="relative">
                        <select name="Turnus" className="w-full appearance-none rounded-lg border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-3 text-[15px] outline-none focus:border-[#B79B6C] cursor-pointer">
                          <option>Täglich</option>
                          <option>Mehrmals pro Woche</option>
                          <option>Wöchentlich</option>
                          <option>Nach Bedarf</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#B79B6C]">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] font-bold uppercase mb-3 text-[#8A7E70]">Name</label>
                      <input type="text" name="Name" required placeholder="Ihr Name" className="w-full rounded-lg border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-3 text-[15px] outline-none focus:border-[#B79B6C]" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase mb-3 text-[#8A7E70]">E-Mail</label>
                      <input type="email" name="E-Mail" required placeholder="ihre@mail.de" className="w-full rounded-lg border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-3 text-[15px] outline-none focus:border-[#B79B6C]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase mb-3 text-[#8A7E70]">Nachricht</label>
                    <textarea rows={4} name="Nachricht" required placeholder="Wie können wir helfen?" className="w-full rounded-lg border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-3 text-[15px] outline-none focus:border-[#B79B6C] resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full rounded-full bg-[#B79B6C] py-4 text-[14px] font-bold uppercase text-white hover:bg-[#A98E60] transition-all disabled:opacity-50">
                    {loading ? 'Wird gesendet...' : 'Anfrage sicher senden'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white py-20 border-t border-[#E5E1D8]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="text-left">
              <div className="text-[12px] font-bold tracking-[0.35em] text-[#B79B6C]">NAUTILUS FACILITY CLEANING</div>
              <p className="mt-4 max-w-md text-[13px] text-[#8A7E70]">Ein Geschäftsbereich der Nautilus Security UG (haftungsbeschränkt).<br />Spezialisierte Gebäudereinigung für Berlin.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-[12px] uppercase font-semibold text-[#8A7E70]">
              <a href="impressum/" className="hover:text-[#B79B6C]">Impressum</a>
              <a href="datenschutz/" className="hover:text-[#B79B6C]">Datenschutz</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
