import { useEffect } from 'react'
import FAQSection from './components/FAQSection'

const navItems = [
  { label: 'Start', href: '#start' },
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Warum Nautilus', href: '#warum-nautilus' },
  { label: 'Ablauf', href: '#ablauf' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontakt', href: '#kontakt' },
]

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#6F6559] antialiased selection:bg-[#B79B6C]/20 scroll-smooth">
      {/* HEADER */}
      <div className="fixed inset-x-0 top-6 z-50 flex justify-center px-4 pointer-events-none">
        <header className="pointer-events-auto w-full max-w-6xl rounded-full bg-white/90 backdrop-blur-md border border-white/60 shadow-lg px-4 py-3">
          <div className="flex items-center justify-between gap-6 px-2 text-left">
            <a href="#start" className="flex items-center gap-3">
              <img src="/images/reinigung-trans.png" alt="Logo" className="h-14 w-14 object-contain" />
              <div className="hidden sm:block">
                <div className="text-sm font-semibold tracking-[0.28em] text-[#B79B6C]">NAUTILUS</div>
                <div className="text-[10px] uppercase tracking-[0.34em] text-[#9A8C7B]">Facility Cleaning</div>
              </div>
            </a>
            <nav className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-[12px] font-bold uppercase tracking-widest text-[#8A7E70] hover:text-[#B79B6C] transition-colors">{item.label}</a>
              ))}
            </nav>
            <a href="#kontakt" className="rounded-full bg-[#B79B6C] px-6 py-3 text-[12px] font-bold uppercase tracking-widest text-white hover:bg-[#A98E60] transition-all">Anfrage stellen</a>
          </div>
        </header>
      </div>

      <main>
        {/* HERO */}
        <section id="start" className="relative h-screen flex items-center overflow-hidden">
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#F7F4EE]/85" />
          <div className="relative z-10 max-w-7xl px-6 lg:px-10 w-full text-left">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 max-w-3xl">
              <h1 className="text-[40px] md:text-[60px] font-medium leading-[1.1] text-[#2C2C2C]">Exzellenz in der Reinigung.<br />Für anspruchsvolle Objekte.</h1>
              <p className="mt-8 text-lg text-[#7E7367] max-w-xl font-light">Wir betreuen Arztpraxen, Kanzleien und exklusive Gewerbeflächen. Präzise Abstimmung, absolute Diskretion und ein Qualitätsanspruch, der im Hintergrund perfekt funktioniert.</p>
              <div className="mt-12">
                <a href="#kontakt" className="rounded-full bg-[#B79B6C] px-10 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-xl hover:-translate-y-1 transition-all inline-block">Besichtigung anfragen</a>
              </div>
            </div>
          </div>
        </section>

        {/* LEISTUNGEN */}
        <section id="leistungen" className="py-32 bg-[#F7F4EE]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-700 mb-20 text-left">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#B79B6C] mb-4">Expertise</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-[#2C2C2C]">Premium Service.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { e: 'Regelmäßige Unterhaltsreinigung', t: 'Praxis- & Kanzleireinigung', d: 'Branchenspezifische Hygienekonzepte für Arztpraxen, Kanzleien und exklusive Büros. Wir arbeiten mit klinischer Präzision.', b: ['Sanitär- & Teeküchenreinigung', 'Pflege von IT-Oberflächen', 'Konferenzbereiche', 'Diskretes Abfallmanagement'] },
                { e: 'Hochwertige Objektpflege', t: 'Treppenhaus- & Foyer-Service', d: 'Der erste Eindruck zählt. Wir sorgen dafür, dass Foyers und Treppenhäuser die Hochwertigkeit Ihres Objekts widerspiegeln.', b: ['Glas- & Portalreinigung', 'Briefkastenanlagen', 'Fahrstühle & Handläufen', 'Naturstein- & Bodenpflege'] },
                { e: 'Spezial- & Projektbezogen', t: 'Premium Bauendreinigung', d: 'Nach Abschluss von Bau- oder Sanierungsprojekten bringen wir Ihre Räumlichkeiten in einen bezugsfertigen Zustand.', b: ['Baugrob- & Feinreinigung', 'Fenster- & Rahmenreinigung', 'Ersteinpflege Oberflächen', 'Hygienische Sanitärreinigung'] }
              ].map((s, i) => (
                <div key={i} className="reveal opacity-0 translate-y-10 transition-all duration-700 bg-white p-10 rounded-3xl border border-[#E5E1D8] hover:shadow-2xl transition-all transform-gpu hover:-translate-y-2 text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#B79B6C] mb-6">{s.e}</p>
                  <h3 className="text-2xl font-semibold text-[#2C2C2C] mb-6">{s.t}</h3>
                  <p className="text-[#7E7367] mb-10 text-sm leading-relaxed">{s.d}</p>
                  <ul className="space-y-4 border-t border-[#F7F4EE] pt-8">
                    {s.b.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm italic">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#B79B6C] mt-1.5 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HALTUNG & TEAM */}
        <section className="bg-white py-32 border-y border-[#E5E1D8]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-20 items-center text-left">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#B79B6C] mb-6">Haltung & Personal</p>
              <h2 className="text-4xl font-semibold text-[#2C2C2C] mb-8">Diskret im Auftritt.<br />Kompromisslos in der Qualität.</h2>
              <p className="text-[#7E7367] leading-relaxed mb-6 italic">Gerade in Notariaten, Privatpraxen und Vorstandsetagen zählt die Fähigkeit zur Präzision.</p>
              <p className="text-[#7E7367] leading-relaxed">Ein tadellos gepflegtes Erscheinungsbild unserer Mitarbeiter und absolute Verschwiegenheit sind für uns obligatorisch.</p>
            </div>
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 shadow-2xl rounded-3xl overflow-hidden">
              <img src="/images/nautilus-cleaning-team-berlin.jpg" alt="Team" className="w-full object-cover" />
            </div>
          </div>
        </section>

        <FAQSection />

        {/* KONTAKT MIT DEN 3 BOXEN */}
        <section id="kontakt" className="py-32 bg-[#F7F4EE]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-20 text-left">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#B79B6C] mb-6">Kontakt</p>
                <h2 className="text-4xl font-semibold text-[#2C2C2C] mb-8">Wir freuen uns auf Ihr Objekt.</h2>
                <div className="space-y-6">
                  {[
                    { t: 'Zielgruppen', c: 'Arztpraxen, Kanzleien, Hausverwaltungen und Gewerbe.' },
                    { t: 'Qualität', c: 'Feste Teams, geschultes Personal, absolute Zuverlässigkeit.' },
                    { t: 'Einsatzgebiet', c: 'Mitte · Pankow · Lichtenberg · Marzahn · Friedrichshain-Kreuzberg' }
                  ].map((box, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-[#E5E1D8] shadow-sm">
                      <p className="text-[10px] font-bold text-[#B79B6C] uppercase tracking-widest mb-2">{box.t}</p>
                      <p className="text-[#6F6559] text-sm">{box.c}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-10 md:p-14 rounded-[40px] border border-[#E5E1D8] shadow-2xl">
                <form action="https://formspree.io/f/mnjonren" method="POST" className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <input type="text" name="Name" required placeholder="Ihr Name" className="w-full bg-[#FCFBF8] border border-[#E5E1D8] rounded-2xl px-6 py-4 outline-none focus:border-[#B79B6C]" />
                    <input type="email" name="Email" required placeholder="E-Mail" className="w-full bg-[#FCFBF8] border border-[#E5E1D8] rounded-2xl px-6 py-4 outline-none focus:border-[#B79B6C]" />
                  </div>
                  <textarea name="Nachricht" rows={4} placeholder="Objektbeschreibung..." className="w-full bg-[#FCFBF8] border border-[#E5E1D8] rounded-2xl px-6 py-4 outline-none focus:border-[#B79B6C] resize-none"></textarea>
                  <button type="submit" className="w-full bg-[#B79B6C] py-5 rounded-2xl text-white font-bold uppercase tracking-widest hover:bg-[#A98E60] transition-all">Anfrage senden</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-20 border-t border-[#E5E1D8] text-left">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between gap-10">
          <div>
            <div className="font-bold text-[#B79B6C] tracking-widest text-sm">NAUTILUS FACILITY CLEANING</div>
            <p className="mt-4 text-[#8A7E70] text-sm max-w-sm">Professionelle Gebäudereinigung für Berlin. Wir betreuen Objekte in Mitte, Pankow, Lichtenberg, Marzahn sowie Friedrichshain-Kreuzberg.</p>
          </div>
          <div className="flex gap-10 text-sm font-bold text-[#8A7E70] uppercase tracking-widest">
            <a href="impressum/" className="hover:text-[#B79B6C]">Impressum</a>
            <a href="datenschutz/" className="hover:text-[#B79B6C]">Datenschutz</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
