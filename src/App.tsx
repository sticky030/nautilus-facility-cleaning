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

const services = [
  {
    eyebrow: 'Regelmäßige Unterhaltsreinigung',
    title: 'Praxis- & Kanzleireinigung',
    text: 'Branchenspezifische Hygienekonzepte für Arztpraxen, Kanzleien und exklusive Büros. Wir arbeiten mit klinischer Präzision und absoluter Diskretion, um Ihren laufenden Betrieb niemals zu stören.',
    bullets: ['Hygienische Sanitär- & Teeküchenreinigung', 'Pflege von IT- & Arbeitsplatzoberflächen', 'Aufbereitung von Konferenzbereichen', 'Diskretes Abfallmanagement & Leerung'],
  },
  {
    eyebrow: 'Hochwertige Objektpflege',
    title: 'Treppenhaus- & Foyer-Service',
    text: 'Der erste Eindruck zählt. Wir sorgen dafür, dass Foyers und Treppenhäuser die Hochwertigkeit Ihres Objekts widerspiegeln – durch kontinuierliche Detailpflege.',
    bullets: ['Streifenfreie Glas-, Portal- & Spiegelreinigung', 'Pflege von Briefkästen & Schmutzschleusen', 'Reinigung von Fahrstühlen & Handläufen', 'Fachgerechte Naturstein- & Bodenpflege'],
  },
  {
    eyebrow: 'Spezial- & Projektbezogen',
    title: 'Premium Bauendreinigung',
    text: 'Nach Abschluss von Bau- oder Sanierungsprojekten bringen wir Ihre Räumlichkeiten in einen bezugsfertigen Zustand. Termingerecht, staubfrei und perfekt vorbereitet.',
    bullets: ['Baugrob- & Feinreinigung bis Bezugsfertigkeit', 'Intensive Fenster-, Falz- & Rahmenreinigung', 'Schonende Ersteinpflege von Neu-Oberflächen', 'Hygienische Erstreinigung der Sanitäranlagen'],
  },
]

export default function App() {
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

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#6F6559] antialiased selection:bg-[#B79B6C]/20 scroll-smooth">
      
      {/* HEADER */}
      <div className="fixed inset-x-0 top-6 z-50 flex justify-center px-4 pointer-events-none text-left">
        <header className="pointer-events-auto w-full max-w-6xl rounded-full bg-white/85 backdrop-blur-xl border border-white/60 shadow-lg px-4 py-3">
          <div className="flex items-center justify-between gap-6 px-2">
            <a href="#start" className="flex items-center gap-3">
              <img src="/images/reinigung-trans.png" alt="Logo" className="h-14 w-14 shrink-0 object-contain" />
              <div>
                <div className="text-sm font-semibold tracking-[0.28em] text-[#B79B6C]">NAUTILUS</div>
                <div className="text-[11px] uppercase tracking-[0.34em] text-[#9A8C7B]">Facility Cleaning</div>
              </div>
            </a>
            <nav className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-[13px] font-semibold uppercase tracking-wider text-[#8A7E70] transition hover:text-[#B79B6C]">{item.label}</a>
              ))}
            </nav>
            <a href="#kontakt" className="inline-flex shrink-0 items-center rounded-full bg-[#B79B6C] px-7 py-3 text-[13px] font-bold uppercase tracking-wider text-white shadow-md hover:-translate-y-0.5 transition-all">Anfrage stellen</a>
          </div>
        </header>
      </div>

      <main className="overflow-x-hidden">
        {/* HERO */}
        <section id="start" className="relative h-screen flex items-center overflow-hidden bg-[#F3EFE7]">
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#F7F4EE]/85" />
          <div className="relative mx-auto grid w-full max-w-7xl px-6 lg:px-10 text-left">
            <div className="reveal lg:max-w-3xl">
              <div className="inline-flex items-center gap-3 mb-8"><span className="h-px w-8 bg-[#B79B6C]"></span><span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#B79B6C]">Premium Facility Cleaning</span></div>
              <h1 className="text-[38px] font-medium leading-[1.1] text-[#2C2C2C] sm:text-[48px] lg:text-[62px]">Exzellenz in der Reinigung.<br />Für anspruchsvolle Objekte.</h1>
              <p className="mt-8 max-w-[38rem] text-lg text-[#7E7367] font-light">Wir betreuen Arztpraxen, Kanzleien und exklusive Gewerbeflächen in Berlin. Präzise Abstimmung, absolute Diskretion und ein Qualitätsanspruch, der im Hintergrund perfekt funktioniert.</p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="#kontakt" className="inline-flex items-center justify-center rounded-full bg-[#B79B6C] px-9 py-4 text-[14px] font-bold uppercase tracking-wider text-white shadow-xl transition-all hover:-translate-y-1">Besichtigung anfragen</a>
                <a href="#leistungen" className="inline-flex items-center justify-center rounded-full border border-[#D9CCB8] bg-white/50 backdrop-blur-md px-9 py-4 text-[14px] font-bold uppercase tracking-wider text-[#6F6559] transition-all hover:bg-white">Leistungen ansehen</a>
              </div>
            </div>
          </div>
        </section>

        {/* LEISTUNGEN (FIXED NAME) */}
        <section id="leistungen" className="bg-[#F7F4EE] py-32 lg:py-40 text-left">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="reveal max-w-3xl mb-20">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Unsere Leistungen</p>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">Maßgeschneiderte Reinigungskonzepte für Objekte mit höchstem Anspruch.</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
              {services.map((s, idx) => (
                <article key={idx} className="reveal bg-white p-10 rounded-3xl border border-[#E5E1D8] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
                  <div className="flex-grow">
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C] mb-6">{s.eyebrow}</p>
                    <h3 className="text-[26px] font-semibold text-[#2C2C2C] mb-6">{s.title}</h3>
                    <p className="text-[15px] leading-7 text-[#7E7367] mb-10">{s.text}</p>
                  </div>
                  <ul className="space-y-4 border-t border-[#F7F4EE] pt-8 text-sm italic">
                    {s.bullets.map((b, j) => (<li key={j} className="flex items-start gap-3"><span className="h-1.5 w-1.5 rounded-full bg-[#B79B6C] mt-1.5 shrink-0" />{b}</li>))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PHILOSOPHIE */}
        <section id="warum-nautilus" className="bg-white py-32 lg:py-40 text-left border-y border-[#E5E1D8]/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-start">
            <div className="reveal lg:col-span-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Philosophie</p>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.06] text-[#2C2C2C] lg:text-[46px]">Ein Standard, der keine Kompromisse kennt.</h2>
              <p className="mt-8 text-[17px] leading-8 text-[#8A7E70]">Wir arbeiten für Kunden, die Perfektion nicht als Zufall, sondern als systematischen Prozess verstehen.</p>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {[
                { t: 'Diskrete Ausführung', d: 'Lautlose Integration in Ihr Tagesgeschäft. Unsere Teams agieren unsichtbar.' },
                { t: 'Klare Abstimmung', d: 'Ein fester, persönlicher Ansprechpartner. Proaktive Kommunikation.' },
                { t: 'Verlässliche Standards', d: 'Durch internes Qualitätsmanagement sichern wir einen konstanten Standard.' },
                { t: 'Sensible Umfelder', d: 'Speziell geschultes Personal für Bereiche, in denen Vertrauen absolute Priorität hat.' }
              ].map((item, idx) => (
                <div key={idx} className="reveal p-10 rounded-3xl border border-[#E5E1D8] bg-[#FCFBF8] shadow-sm hover:border-[#B79B6C]/30 transition-all"><h4 className="text-[10px] font-bold uppercase text-[#B79B6C] mb-4 tracking-widest">{item.t}</h4><p className="text-[15px] leading-relaxed text-[#7E7367]">{item.d}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* HALTUNG & TEAM */}
        <section className="bg-[#F7F4EE] py-32 lg:py-48 text-left text-[#6F6559]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C] mb-6">Haltung & Personal</p>
              <h2 className="text-4xl font-semibold text-[#2C2C2C] mb-8 leading-tight">Diskret im Auftritt.<br />Kompromisslos in der Qualität.</h2>
              <p className="text-[#8A7E70] leading-8 mb-6 font-light">Wir verstehen uns als unsichtbaren, aber essenziellen Teil Ihres Unternehmenserfolgs. Ein tadellos gepflegtes Erscheinungsbild unserer Mitarbeiter und absolute Verschwiegenheit sind für uns obligatorisch.</p>
              <p className="text-[#8A7E70] leading-8 italic font-light">Gerade in Notariaten, Privatpraxen und Vorstandsetagen zählt nicht die reine Anwesenheit des Personals – sondern die Fähigkeit zur Präzision.</p>
            </div>
            <div className="reveal rounded-3xl overflow-hidden shadow-2xl transition-transform duration-1000"><img src="/images/nautilus-cleaning-team-berlin.jpg" alt="Team" className="w-full object-cover" /></div>
          </div>
        </section>

        {/* ABLAUF - STICKY & BALANCED */}
        <section id="ablauf" className="bg-white py-32 lg:py-40 text-left border-y border-[#E5E1D8]/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-start">
            <div className="reveal lg:col-span-5 lg:sticky lg:top-40">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Ablauf & Prozesse</p>
              <h2 className="mt-6 text-4xl lg:text-5xl font-semibold leading-[1.1] text-[#2C2C2C]">Ein reibungsloser Start. Ein dauerhaftes Ergebnis.</h2>
              <p className="mt-10 text-[18px] leading-8 text-[#8A7E70] font-light">Wir überlassen Perfektion nicht dem Zufall, sondern definieren jeden Schritt für eine lautlose Integration. Ein bewährter Prozess garantiert Ergebnisse auf höchstem Niveau.</p>
            </div>
            <div className="lg:col-span-7 space-y-6">
              {[
                { s: '01 · Fundierte Bedarfsanalyse', t: 'Wir analysieren Ihr Objekt vor Ort, um ein präzises Verständnis für Architektur, Materialien und Diskretionsvorgaben zu entwickeln.' },
                { s: '02 · Strategische Konzeption', t: 'Maßarbeit statt Standard. Wir entwerfen ein hybrides Reinigungskonzept, das operative Effizienz mit Ihrem Anspruch vereint.' },
                { s: '03 · Präzise Implementierung', t: 'Lautlose Integration in Ihren Alltag. Unser festes Stammpersonal wird objektspezifisch instruiert.' },
                { s: '04 · Kontinuierliches Management', t: 'Beständigkeit auf höchstem Niveau durch proaktives Management und regelmäßige Qualitätskontrollen.' }
              ].map((item, idx) => (
                <div key={idx} className="reveal rounded-3xl border border-[#E5E1D8] bg-[#FCFBF8] p-10 shadow-sm transition-all hover:bg-white hover:border-[#B79B6C]/30"><div className="text-[11px] font-bold uppercase text-[#B79B6C]">{item.s}</div><p className="mt-5 text-[16px] leading-8 text-[#7E7367]">{item.t}</p></div>
              ))}
            </div>
          </div>
        </section>

        <FAQSection />

        {/* KONTAKT */}
        <section id="kontakt" className="bg-[#F7F4EE] py-32 lg:py-40 text-left">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-20">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Kontakt & Anfrage</p>
              <h2 className="mt-6 text-3xl font-semibold text-[#2C2C2C] lg:text-[46px]">Wir freuen uns auf Ihr Objekt.</h2>
              <div className="mt-14 space-y-6">
                {[
                  { t: 'Zielgruppen', c: 'Arztpraxen, Kanzleien, Hausverwaltungen und anspruchsvolle Gewerbeimmobilien in Berlin.' },
                  { t: 'Unser Versprechen', c: 'Transparente Angebote, feste Ansprechpartner und absolute Zuverlässigkeit.' },
                  { t: 'Einsatzgebiet', c: 'Mitte · Pankow · Lichtenberg · Marzahn · Friedrichshain-Kreuzberg' }
                ].map((box, idx) => (
                  <div key={idx} className="rounded-3xl border border-[#E5E1D8] bg-white p-8 shadow-sm transition-all hover:border-[#B79B6C]/30"><p className="text-[10px] font-bold uppercase tracking-widest text-[#B79B6C] mb-2">{box.t}</p><p className="text-[#6F6559] text-[16px] leading-8">{box.c}</p></div>
                ))}
              </div>
            </div>
            <div className="reveal rounded-[40px] border border-[#E5E1D8] bg-white p-10 shadow-2xl lg:p-14">
              <form action="https://formspree.io/f/mnjonren" method="POST" className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <input type="text" name="Name" required placeholder="Ihr Name" className="w-full rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 outline-none focus:border-[#B79B6C] transition-all" />
                  <input type="email" name="Email" required placeholder="E-Mail" className="w-full rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 outline-none focus:border-[#B79B6C] transition-all" />
                </div>
                <textarea rows={4} name="Nachricht" required placeholder="Objektbeschreibung..." className="w-full rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 outline-none focus:border-[#B79B6C] transition-all resize-none" />
                <button type="submit" className="w-full rounded-2xl bg-[#B79B6C] px-6 py-5 text-[15px] font-bold uppercase tracking-wider text-white hover:bg-[#A98E60] transition-all transform hover:-translate-y-0.5">Anfrage senden</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-16 border-t border-[#E5E1D8] text-left text-[#6F6559]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-start lg:justify-between lg:px-10">
          <div><div className="text-[11px] font-bold text-[#B79B6C] tracking-[0.35em]">NAUTILUS FACILITY CLEANING</div><p className="mt-5 max-w-md text-[14px] leading-7 text-[#8A7E70]">Ein Geschäftsbereich der Nautilus Security UG (haftungsbeschränkt). Exzellenz in der Reinigung für Berlin.</p></div>
          <div className="flex gap-8 text-[14px] font-bold text-[#8A7E70] uppercase"><a href="impressum/" className="hover:text-[#B79B6C] transition-colors">Impressum</a><a href="datenschutz/" className="hover:text-[#B79B6C] transition-colors">Datenschutz</a></div>
        </div>
      </footer>
    </div>
  )
}
