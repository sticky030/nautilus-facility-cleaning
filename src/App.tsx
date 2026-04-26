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
    title: 'Premium Bauendreinigung',
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
  // --- CINEMA SCROLL ANIMATION LOGIC ---
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#6F6559] antialiased selection:bg-[#B79B6C]/20">
      
      {/* --- PREMIUM FLOATING HEADER --- */}
      <div className="fixed inset-x-0 top-6 z-50 flex justify-center px-4 pointer-events-none">
        <header className="pointer-events-auto w-full max-w-6xl rounded-full bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-4 py-3 transition-all duration-500">
          <div className="flex items-center justify-between gap-6 px-2">
            <a href="#start" className="flex min-w-0 items-center gap-3">
              <img src="/images/reinigung-trans.png" alt="Logo" className="h-14 w-14 shrink-0 object-contain" />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold tracking-[0.28em] text-[#B79B6C]">NAUTILUS</div>
                <div className="truncate text-[11px] uppercase tracking-[0.34em] text-[#9A8C7B]">Facility Cleaning</div>
              </div>
            </a>
            <nav className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-[13px] font-semibold uppercase tracking-wider text-[#8A7E70] transition hover:text-[#B79B6C]">{item.label}</a>
              ))}
            </nav>
            <a href="#kontakt" className="inline-flex shrink-0 items-center rounded-full bg-[#B79B6C] px-7 py-3 text-[13px] font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(183,155,108,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(183,155,108,0.4)]">Anfrage stellen</a>
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
          <div className="relative mx-auto grid w-full max-w-7xl px-6 pb-20 pt-36 lg:px-10 lg:pb-28 lg:pt-40">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 lg:max-w-3xl">
              <div className="inline-flex items-center gap-3 mb-8">
                <span className="h-px w-8 bg-[#B79B6C]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#B79B6C]">Premium Facility Cleaning</span>
              </div>
              <h1 className="text-[38px] font-medium leading-[1.1] text-[#2C2C2C] sm:text-[48px] lg:text-[62px]">Exzellenz in der Reinigung.<br />Für anspruchsvolle Objekte.</h1>
              <p className="mt-8 max-w-[38rem] text-[17px] leading-8 text-[#7E7367] lg:text-[19px] font-light">Wir betreuen Arztpraxen, Kanzleien und exklusive Gewerbeflächen in Berlin. Präzise Abstimmung, absolute Diskretion und ein Qualitätsanspruch, der im Hintergrund perfekt funktioniert.</p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="#kontakt" className="inline-flex items-center justify-center rounded-full bg-[#B79B6C] px-9 py-4 text-[14px] font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(183,155,108,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(183,155,108,0.4)]">Unverbindliche Anfrage</a>
                <a href="#leistungen" className="inline-flex items-center justify-center rounded-full border border-[#D9CCB8] bg-white/50 backdrop-blur-md px-9 py-4 text-[14px] font-bold uppercase tracking-wider text-[#6F6559] transition-all duration-300 hover:bg-white hover:border-[#B79B6C]/50">Expertise ansehen</a>
              </div>
            </div>
          </div>
        </section>

        {/* --- 1. TRUST BAR (ELITE ELEMENT) --- */}
        <div className="bg-white border-y border-[#E5E1D8]/50 py-6">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 flex justify-center">
            <p className="text-[12px] md:text-[13px] font-medium uppercase tracking-[0.3em] text-[#8A7E70] text-center italic">
              „Diskreter Partner für Notariate, Privatpraxen und exklusive Hausverwaltungen in Berlin.“
            </p>
          </div>
        </div>

        {/* --- LEISTUNGEN --- */}
        <section id="leistungen" className="bg-[#F7F4EE] py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Unsere Expertise</p>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">Maßgeschneiderte Reinigungskonzepte für Objekte mit höchstem Anspruch.</h2>
            </div>
            <div className="mt-20 grid grid-cols-1 gap-8 xl:grid-cols-3">
              {services.map((service, idx) => (
                <article key={service.title} style={{ transitionDelay: `${idx * 150}ms` }} className="reveal opacity-0 translate-y-10 transition-all duration-1000 group flex flex-col h-full overflow-hidden rounded-3xl border border-[#E5E1D8] bg-white p-10 shadow-[0_8px_20px_rgba(0,0,0,0.02)] hover:-translate-y-2 hover:border-[#B79B6C]/50 hover:shadow-[0_30px_60px_rgba(183,155,108,0.12)]">
                  <div className="flex flex-col flex-grow">
                    <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{service.eyebrow}</div>
                    <h3 className="mt-6 text-[26px] font-semibold leading-[1.2] text-[#2C2C2C]">{service.title}</h3>
                    <p className="mt-5 text-[15px] leading-7 text-[#7E7367]">{service.text}</p>
                  </div>
                  <div className="mt-10 flex flex-col justify-end shrink-0">
                    <div className="h-px w-full bg-gradient-to-r from-[#E5E1D8] via-[#B79B6C]/30 to-transparent" />
                    <ul className="mt-8 flex flex-col justify-start gap-4 h-auto md:h-[200px] lg:h-[240px] xl:h-[220px] text-[15px] leading-6 text-[#6F6559]">
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

        {/* --- PHILOSOPHIE --- */}
        <section id="warum-nautilus" className="bg-white py-32 lg:py-40 border-y border-[#E5E1D8]/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 lg:col-span-5 lg:pr-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Philosophie</p>
              <h2 className="mt-6 max-w-[12ch] text-3xl font-semibold leading-[1.06] text-[#2C2C2C] lg:text-[46px]">Ein Standard, der keine Kompromisse kennt.</h2>
              <p className="mt-8 text-[17px] leading-8 text-[#8A7E70]">Wir arbeiten für Kunden, die Perfektion nicht als Zufall, sondern als systematischen Prozess verstehen. Ein makelloses Umfeld fördert die Produktivität und das Vertrauen Ihrer Klienten.</p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                { title: 'Diskrete Ausführung', desc: 'Lautlose Integration in Ihr Tagesgeschäft. Unsere Teams agieren unsichtbar – das Ergebnis ist unübersehbar.' },
                { title: 'Klare Abstimmung', desc: 'Ein fester, persönlicher Ansprechpartner. Proaktive Kommunikation und vorausschauendes Handeln.' },
                { title: 'Verlässliche Standards', desc: 'Durch internes Qualitätsmanagement sichern wir einen konstanten, kompromisslosen Standard.' },
                { title: 'Sensible Umfelder', desc: 'Speziell geschultes, verschwiegenes Personal für Bereiche, in denen Vertrauen absolute Priorität hat.' }
              ].map((item, idx) => (
                <article key={item.title} style={{ transitionDelay: `${idx * 100}ms` }} className="reveal opacity-0 translate-y-10 transition-all duration-1000 rounded-3xl border border-[#E5E1D8] bg-[#FCFBF8] p-10 hover:-translate-y-2 hover:bg-white hover:border-[#B79B6C]/40 hover:shadow-[0_20px_50px_rgba(183,155,108,0.08)]">
                  <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{item.title}</div>
                  <div className="mt-5 h-px w-12 bg-gradient-to-r from-[#B79B6C] to-transparent" />
                  <p className="mt-5 text-[15px] leading-8 text-[#7E7367]">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* --- 2. FOUNDER'S STATEMENT (ELITE ELEMENT) --- */}
        <section className="bg-[#F7F4EE] py-32 lg:py-48 relative overflow-hidden border-b border-[#E5E1D8]/60">
          <div className="mx-auto max-w-4xl px-6 relative z-10 text-center">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000">
              <svg className="mx-auto h-12 w-12 text-[#B79B6C]/30 mb-10" fill="currentColor" viewBox="0 0 32 32"><path d="M10 8v8h6v8h-8v-8h-6v-8h8zm14 0v8h6v8h-8v-8h-6v-8h8z"/></svg>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#B79B6C] mb-8">Eine Frage der Haltung</h2>
              <blockquote className="text-[22px] md:text-[28px] lg:text-[32px] font-light leading-[1.5] text-[#2C2C2C] italic">
                „Exzellenz drängt sich nicht auf. Sie beweist sich in der täglichen, geräuschlosen Perfektion im Hintergrund. Der wahre Luxus für unsere Klienten ist es, keinen Gedanken mehr an unsere Arbeit verschwenden zu müssen. Wir garantieren Ihnen exakt diesen Freiraum.“
              </blockquote>
              <div className="mt-12">
                <p className="text-[16px] font-semibold text-[#B79B6C] tracking-widest uppercase">Philipp De Boer</p>
                <p className="text-[12px] text-[#8A7E70] uppercase tracking-[0.2em] mt-1">Geschäftsführung Nautilus Facility Cleaning</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- ABLAUF --- */}
        <section id="ablauf" className="bg-white py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 lg:col-span-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Ablauf & Prozesse</p>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">Ein reibungsloser Start. Ein dauerhaftes Ergebnis.</h2>
              <p className="mt-8 text-[17px] leading-8 text-[#8A7E70]">Wir überlassen nichts dem Zufall, sondern definieren jeden Schritt – von der ersten Begehung bis zur täglichen Umsetzung.</p>
            </div>
            <div className="lg:col-span-7 space-y-6">
              {[
                { step: '01 · Fundierte Bedarfsanalyse', text: 'Exzellenz beginnt mit Detailtiefe. Wir analysieren Ihr Objekt vor Ort, um ein präzises Verständnis für Architektur und Diskretionsvorgaben zu entwickeln.' },
                { step: '02 · Strategische Konzeption', text: 'Maßarbeit statt Standard. Wir entwerfen ein hybrides Reinigungskonzept, das operative Effizienz mit Ihrem Anspruch vereint.' },
                { step: '03 · Präzise Implementierung', text: 'Lautlose Integration in Ihren Alltag. Unser festes Stammpersonal wird objektspezifisch instruiert und fügt sich ohne Reibungsverluste ein.' },
                { step: '04 · Kontinuierliches Management', text: 'Beständigkeit auf höchstem Niveau. Durch proaktives Management stellen wir sicher, dass unser Standard dauerhaft erfüllt wird.' }
              ].map((item, idx) => (
                <article key={item.step} style={{ transitionDelay: `${idx * 100}ms` }} className="reveal opacity-0 translate-y-10 transition-all duration-1000 rounded-3xl border border-[#E5E1D8] bg-[#FCFBF8] p-10 hover:-translate-y-2 hover:bg-white hover:shadow-sm">
                  <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{item.step}</div>
                  <div className="mt-5 h-px w-12 bg-gradient-to-r from-[#B79B6C] to-transparent" />
                  <p className="mt-5 text-[16px] leading-8 text-[#7E7367]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FAQSection />

        {/* --- KONTAKT --- */}
        <section id="kontakt" className="bg-[#F7F4EE] py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid items-start gap-20 lg:grid-cols-2">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Kontakt & Anfrage</p>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">Wir freuen uns auf Ihr Objekt.</h2>
              <p className="mt-8 text-[17px] leading-8 text-[#8A7E70]">Geben Sie uns einen ersten Überblick über Ihr Vorhaben. Wir melden uns zeitnah für eine unverbindliche Erstbesichtigung.</p>
              <div className="mt-14 space-y-6">
                {[{ title: 'Zielgruppen', content: 'Arztpraxen, Kanzleien, Hausverwaltungen und exklusive Gewerbeimmobilien.' }, { title: 'Unser Versprechen', content: 'Transparente Angebote, feste Teams und absolute Zuverlässigkeit.' }].map(box => (
                  <div key={box.title} className="rounded-3xl border border-[#E5E1D8] bg-white p-8 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{box.title}</p>
                    <p className="mt-4 text-[16px] leading-8 text-[#6F6559]">{box.content}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 rounded-[40px] border border-[#E5E1D8] bg-white p-10 shadow-[0_30px_60px_rgba(0,0,0,0.04)] lg:p-14">
              <form id="contact-form" action="https://formspree.io/f/mnjonren" method="POST" className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7E70]">Objektart</label>
                    <div className="relative">
                      <select name="Objektart" className="w-full appearance-none rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 pr-12 text-[15px] outline-none focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10 cursor-pointer"><option>Büro & Kanzlei</option><option>Arztpraxis</option><option>Treppenhaus & Objekt</option></select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-5 text-[#B79B6C] pointer-events-none"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
                    </div>
                  </div>
                  <div>
                    <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7E70]">Turnus</label>
                    <div className="relative">
                      <select name="Turnus" className="w-full appearance-none rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 pr-12 text-[15px] outline-none focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10 cursor-pointer"><option>Täglich</option><option>Wöchentlich</option><option>Nach Bedarf</option></select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-5 text-[#B79B6C] pointer-events-none"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <input type="text" name="Name" required placeholder="Ihr Name" className="w-full rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 text-[15px] outline-none focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10" />
                  <input type="email" name="E-Mail" required placeholder="kontakt@unternehmen.de" className="w-full rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 text-[15px] outline-none focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10" />
                </div>
                <textarea rows={4} name="Nachricht" required placeholder="Objektbeschreibung..." className="w-full rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 text-[15px] outline-none focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10 resize-none" />
                <button type="submit" className="w-full rounded-2xl bg-[#B79B6C] px-6 py-5 text-[15px] font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(183,155,108,0.25)] hover:-translate-y-1 transition-all duration-300">Anfrage sicher senden</button>
              </form>
            </div>
          </div>
        </section>

        {/* --- 3. QUALITÄTS-SIEGEL (ELITE ELEMENT) --- */}
        <section className="bg-white py-20 border-t border-[#E5E1D8]/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 text-center flex flex-col items-center">
                <svg className="w-10 h-10 text-[#B79B6C] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2C2C2C]">100% Diskretion</p>
                <p className="text-[11px] text-[#8A7E70] mt-1">Geprüftes Stammpersonal</p>
              </div>
              <div style={{ transitionDelay: '100ms' }} className="reveal opacity-0 translate-y-10 transition-all duration-1000 text-center flex flex-col items-center">
                <svg className="w-10 h-10 text-[#B79B6C] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.8"><path d="M6 3h12l4 6-10 12L2 9l4-6z"/></svg>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2C2C2C]">Werterhalt</p>
                <p className="text-[11px] text-[#8A7E70] mt-1">Schonende Premium-Pflege</p>
              </div>
              <div style={{ transitionDelay: '200ms' }} className="reveal opacity-0 translate-y-10 transition-all duration-1000 text-center flex flex-col items-center">
                <svg className="w-10 h-10 text-[#B79B6C] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.8"><path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" strokeDasharray="1 2"/></svg>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2C2C2C]">Green Cleaning</p>
                <p className="text-[11px] text-[#8A7E70] mt-1">Ökologisch auf Wunsch</p>
              </div>
              <div style={{ transitionDelay: '300ms' }} className="reveal opacity-0 translate-y-10 transition-all duration-1000 text-center flex flex-col items-center">
                <svg className="w-10 h-10 text-[#B79B6C] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.8"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2C2C2C]">Lückenlos</p>
                <p className="text-[11px] text-[#8A7E70] mt-1">Strikte Standardkontrolle</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-white py-16 border-t border-[#E5E1D8]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-start lg:justify-between lg:px-10">
          <div>
            <div className="text-[11px] font-bold tracking-[0.35em] text-[#B79B6C]">NAUTILUS FACILITY CLEANING</div>
            <p className="mt-5 max-w-md text-[14px] leading-7 text-[#8A7E70]">Ein Geschäftsbereich der Nautilus Security UG (haftungsbeschränkt).<br />Exzellenz in der Reinigung für Berlin.</p>
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
