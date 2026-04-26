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
    text: 'Der erste Eindruck zählt. Wir sorgen dafür, dass Foyers und Treppenhäuser die Hochwertigkeit Ihres Objekts widerspiegeln – durch kontinuierliche, werterhaltende Detailpflege.',
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
        <header className="pointer-events-auto w-full max-w-6xl rounded-full bg-white/85 backdrop-blur-xl border border-white/60 shadow-lg px-4 py-3">
          <div className="flex items-center justify-between gap-6 px-2 text-left">
            <a href="#start" className="flex items-center gap-3">
              <img src="/images/reinigung-trans.png" alt="Logo" className="h-14 w-14 shrink-0 object-contain" />
              <div className="text-left">
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
        <section id="start" className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#F3EFE7]">
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(96deg,rgba(247,244,238,0.94)_0%,rgba(247,244,238,0.90)_36%,rgba(247,244,238,0.70)_64%,rgba(247,244,238,0.34)_100%)]" />
          <div className="relative mx-auto grid w-full max-w-7xl px-6 pb-20 pt-36 lg:px-10 lg:pb-28 lg:pt-40 text-left">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 lg:max-w-3xl">
              <div className="inline-flex items-center gap-3 mb-8">
                <span className="h-px w-8 bg-[#B79B6C]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#B79B6C]">Premium Facility Cleaning</span>
              </div>
              <h1 className="text-[38px] font-medium leading-[1.1] text-[#2C2C2C] sm:text-[48px] lg:text-[62px]">Exzellenz in der Reinigung.<br />Für anspruchsvolle Objekte.</h1>
              <p className="mt-8 max-w-[38rem] text-[17px] leading-8 text-[#7E7367] lg:text-[19px] font-light">Wir betreuen Arztpraxen, Kanzleien und exklusive Gewerbeflächen. Präzise Abstimmung, absolute Diskretion und ein Qualitätsanspruch, der im Hintergrund perfekt funktioniert.</p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="#kontakt" className="inline-flex items-center justify-center rounded-full bg-[#B79B6C] px-9 py-4 text-[14px] font-bold uppercase tracking-wider text-white shadow-xl transition-all hover:-translate-y-1">Besichtigung anfragen</a>
                <a href="#leistungen" className="inline-flex items-center justify-center rounded-full border border-[#D9CCB8] bg-white/50 backdrop-blur-md px-9 py-4 text-[14px] font-bold uppercase tracking-wider text-[#6F6559] transition-all hover:bg-white">Expertise ansehen</a>
              </div>
            </div>
          </div>
        </section>

        {/* LEISTUNGEN */}
        <section id="leistungen" className="bg-[#F7F4EE] py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 text-left">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 max-w-3xl mb-20">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Unsere Expertise</p>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">Maßgeschneiderte Reinigungskonzepte für höchste Ansprüche.</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
              {services.map((service, idx) => (
                <article key={service.title} style={{ transitionDelay: `${idx * 150}ms` }} className="reveal opacity-0 translate-y-10 transition-all duration-1000 group flex flex-col h-full overflow-hidden rounded-3xl border border-[#E5E1D8] bg-white p-10 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#B79B6C]/50 hover:shadow-2xl transform-gpu">
                  <div className="flex flex-col flex-grow">
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{service.eyebrow}</p>
                    <h3 className="mt-6 text-[26px] font-semibold leading-[1.2] text-[#2C2C2C]">{service.title}</h3>
                    <p className="mt-5 text-[15px] leading-7 text-[#7E7367]">{service.text}</p>
                  </div>
                  <div className="mt-10 flex flex-col justify-end shrink-0">
                    <div className="h-px w-full bg-gradient-to-r from-[#E5E1D8] via-[#B79B6C]/30 to-transparent" />
                    <ul className="mt-8 flex flex-col justify-start gap-4 h-auto text-[15px] leading-6 text-[#6F6559]">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-4">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B79B6C]" />
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

        {/* REVIEWS */}
        <section className="bg-white py-24 border-y border-[#E5E1D8]/60 overflow-hidden text-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
             <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C] mb-12">Referenzen</p>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { text: "Absolute Professionalität und ein Auge fürs Detail. Nautilus ist für unsere Kanzlei unverzichtbar geworden.", author: "Notariat aus Berlin Mitte" },
                  { text: "Diskretion wird hier wirklich großgeschrieben. Das Team integriert sich lautlos in unsere Praxisabläufe.", author: "Facharztpraxis Berlin" },
                  { text: "Nach der Sanierung war das Objekt in einem tadellosen Zustand. Termintreu, präzise und zuverlässig.", author: "Hausverwaltung Berlin" }
                ].map((rev, i) => (
                  <div key={i} className="reveal opacity-0 translate-y-10 transition-all duration-1000">
                    <div className="flex justify-center gap-1 mb-4 text-[#B79B6C]">★★★★★</div>
                    <blockquote className="text-[16px] leading-8 text-[#2C2C2C] italic">„{rev.text}“</blockquote>
                    <cite className="block mt-4 text-[12px] font-semibold uppercase tracking-widest text-[#8A7E70] not-italic">— {rev.author}</cite>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* PHILOSOPHIE */}
        <section id="warum-nautilus" className="bg-[#F7F4EE] py-32 lg:py-40 text-left">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 gap-16 lg:grid-cols-12 items-start">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 lg:col-span-5 lg:pr-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Philosophie</p>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.06] text-[#2C2C2C] lg:text-[46px]">Ein Standard, der keine Kompromisse kennt.</h2>
              <p className="mt-8 text-[17px] leading-8 text-[#8A7E70]">Wir arbeiten für Kunden, die Perfektion nicht als Zufall, sondern als systematischen Prozess verstehen.</p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                { title: 'Diskretion', desc: 'Lautlose Integration in Ihr Tagesgeschäft. Unsere Teams agieren unsichtbar.' },
                { title: 'Kontinuität', desc: 'Ein fester Ansprechpartner. Proaktive Kommunikation und vorausschauendes Handeln.' },
                { title: 'Standard', desc: 'Durch internes Qualitätsmanagement sichern wir einen konstanten Standard.' },
                { title: 'Vertrauen', desc: 'Speziell geschultes Personal für sensible Umfelder in Berlin.' }
              ].map((item, idx) => (
                <article key={item.title} style={{ transitionDelay: `${idx * 100}ms` }} className="reveal opacity-0 translate-y-10 transition-all duration-1000 rounded-3xl border border-[#E5E1D8] bg-white p-10 hover:shadow-lg transition-all">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{item.title}</h4>
                  <p className="mt-5 text-[15px] leading-relaxed text-[#7E7367]">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HALTUNG & TEAM */}
        <section className="bg-white py-32 lg:py-48 relative overflow-hidden border-y border-[#E5E1D8]/60 text-left">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 lg:col-span-5 lg:pr-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Haltung & Personal</p>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.1] text-[#2C2C2C] lg:text-[46px]">Diskret im Auftritt.<br />Kompromisslos in der Qualität.</h2>
              <p className="mt-8 text-[17px] leading-8 text-[#8A7E70] font-light">Wir verstehen uns als unsichtbaren, aber essenziellen Teil Ihres Unternehmenserfolgs.</p>
              <p className="mt-5 text-[17px] leading-8 text-[#8A7E70] font-light italic">Gerade in Notariaten, Privatpraxen und Vorstandsetagen zählt die Fähigkeit zur Präzision.</p>
            </div>
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 lg:col-span-7">
              <div className="relative overflow-hidden rounded-3xl border border-[#E5E1D8] bg-white shadow-2xl transform-gpu">
                <img src="/images/nautilus-cleaning-team-berlin.jpg" alt="Team" className="mx-auto w-full max-h-[550px] object-cover hover:scale-105 transition-transform duration-1000" />
              </div>
            </div>
          </div>
        </section>

        {/* ABLAUF */}
        <section id="ablauf" className="bg-[#F7F4EE] py-32 lg:py-40 text-left">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 lg:col-span-5 lg:pr-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Ablauf & Prozesse</p>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">Ein reibungsloser Start. Ein dauerhaftes Ergebnis.</h2>
              <p className="mt-8 text-[17px] leading-8 text-[#8A7E70]">Von der fundierten Bedarfsanalyse bis zur kontinuierlichen Qualitätssicherung.</p>
            </div>
            <div className="lg:col-span-7 space-y-6">
              {[
                { step: '01 · Bedarfsanalyse', text: 'Wir analysieren Ihr Objekt vor Ort, um ein präzises Verständnis für Architektur und Diskretionsvorgaben zu entwickeln.' },
                { step: '02 · Konzeption', text: 'Maßarbeit statt Standard. Wir entwerfen ein hybrides Reinigungskonzept für Ihren individuellen Anspruch.' },
                { step: '03 · Implementierung', text: 'Lautlose Integration in Ihren Alltag. Unser Stammpersonal wird objektspezifisch instruiert.' },
                { step: '04 · Monitoring', text: 'Regelmäßige Audits sichern den langfristigen Werterhalt Ihrer Immobilie.' }
              ].map((item, idx) => (
                <article key={item.step} style={{ transitionDelay: `${idx * 100}ms` }} className="reveal opacity-0 translate-y-10 transition-all duration-1000 rounded-3xl border border-[#E5E1D8] bg-white p-10 shadow-sm hover:shadow-md transition-all transform-gpu">
                  <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{item.step}</div>
                  <p className="mt-5 text-[16px] leading-8 text-[#7E7367]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FAQSection />

        {/* KONTAKT */}
        <section id="kontakt" className="bg-[#F7F4EE] py-32 lg:py-40 text-left">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid items-start gap-20 lg:grid-cols-2">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Kontakt</p>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">Wir freuen uns auf Ihr Objekt.</h2>
              <div className="mt-14 space-y-6">
                {[
                  { title: 'Zielgruppen', content: 'Arztpraxen, Kanzleien, Hausverwaltungen und Gewerbeeinheiten.' },
                  { title: 'Qualität', content: 'Feste Teams, geschultes Personal und absolute Zuverlässigkeit.' },
                  { title: 'Einsatzgebiet', content: 'Mitte · Pankow · Lichtenberg · Marzahn · Friedrichshain-Kreuzberg' }
                ].map(box => (
                  <div key={box.title} className="rounded-3xl border border-[#E5E1D8] bg-white p-8 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{box.title}</p>
                    <p className="mt-4 text-[16px] leading-8 text-[#6F6559]">{box.content}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 rounded-[40px] border border-[#E5E1D8] bg-white p-10 shadow-2xl lg:p-14">
              <form action="https://formspree.io/f/mnjonren" method="POST" className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <input type="text" name="Name" required placeholder="Ihr Name" className="w-full rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 outline-none focus:border-[#B79B6C]" />
                  <input type="email" name="Email" required placeholder="E-Mail" className="w-full rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 outline-none focus:border-[#B79B6C]" />
                </div>
                <textarea rows={4} name="Nachricht" required placeholder="Nachricht..." className="w-full rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 outline-none focus:border-[#B79B6C] resize-none" />
                <button type="submit" className="w-full rounded-2xl bg-[#B79B6C] px-6 py-5 text-[15px] font-bold uppercase tracking-wider text-white transition-all hover:bg-[#A98E60]">Anfrage senden</button>
              </form>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-white py-16 border-t border-[#E5E1D8] text-left">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-start lg:justify-between lg:px-10">
          <div>
            <div className="text-[11px] font-bold tracking-[0.35em] text-[#B79B6C]">NAUTILUS FACILITY CLEANING</div>
            <p className="mt-5 max-w-md text-[14px] leading-7 text-[#8A7E70]">Nautilus steht für erstklassige Gebäudeservices in Berlin. Wir betreuen anspruchsvolle Objekte in Mitte, Pankow, Lichtenberg, Marzahn sowie Friedrichshain-Kreuzberg.</p>
          </div>
          <div className="flex gap-8 text-[14px] font-semibold uppercase tracking-wider text-[#8A7E70]">
            <a href="impressum/" className="hover:text-[#B79B6C]">Impressum</a>
            <a href="datenschutz/" className="hover:text-[#B79B6C]">Datenschutz</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
