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
    eyebrow: 'Unterhaltsreinigung',
    title: 'Praxis- & Kanzleireinigung',
    text: 'Spezialisierte Reinigungskonzepte für medizinische Einrichtungen und anspruchsvolle Kanzleien. Wir garantieren klinische Sauberkeit und absolute Diskretion für Ihr Renommee.',
    bullets: [
      'Hygienische Desinfektionsreinigung',
      'Pflege sensibler IT-Infrastruktur',
      'Servicezeiten nach Ihren Kanzleibetrieb',
      'Dokumentierte Qualitätsstandards'
    ],
  },
  {
    eyebrow: 'Objektpflege',
    title: 'Treppenhaus- & Foyer-Service',
    text: 'Professionelle Pflege für Wohn- und Gewerbeobjekte in Berlin. Wir sichern den ersten Eindruck Ihres Objekts durch fachgerechte Instandhaltung hochwertiger Materialien.',
    bullets: [
      'Glas- & Portalreinigung ohne Streifen',
      'Pflege von Naturstein & Holzböden',
      'Reinigung von Aufzügen & Geländern',
      'Verlässliche Reinigungsintervalle'
    ],
  },
  {
    eyebrow: 'Spezialreinigung',
    title: 'Premium Bauendreinigung',
    text: 'Ihre Experten für die Baufeinreinigung nach Sanierung oder Neubau. Wir übergeben Ihr Objekt in Berlin bezugsfertig, staubfrei und bereit für die finale Abnahme.',
    bullets: [
      'Baufeinreinigung bis zur Abnahme',
      'Fenster- & Rahmen-Intensivreinigung',
      'Ersteinpflege neuer Bodenbeläge',
      'Absolute Termintreue bei Übergaben'
    ],
  },
]

export default function App() {
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
            <nav className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-[13px] font-semibold uppercase tracking-wider text-[#8A7E70] transition hover:text-[#B79B6C]">{item.label}</a>
              ))}
            </nav>
            <a href="#kontakt" className="inline-flex shrink-0 items-center rounded-full bg-[#B79B6C] px-7 py-3 text-[13px] font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(183,155,108,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A98E60]">Anfrage stellen</a>
          </div>
        </header>
      </div>

      <main className="overflow-x-hidden">
        <section id="start" className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#F3EFE7]">
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(96deg,rgba(247,244,238,0.94)_0%,rgba(247,244,238,0.90)_36%,rgba(247,244,238,0.70)_64%,rgba(247,244,238,0.34)_100%)]" />
          <div className="relative mx-auto grid w-full max-w-7xl px-6 pb-20 pt-36 lg:px-10 lg:pb-28 lg:pt-40">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 lg:max-w-3xl">
              <h1 className="text-[38px] font-medium leading-[1.1] text-[#2C2C2C] sm:text-[48px] lg:text-[62px]">Exzellenz in der Gebäudereinigung – Für anspruchsvolle Objekte in Berlin.</h1>
              <p className="mt-8 max-w-[38rem] text-[17px] leading-8 text-[#7E7367] lg:text-[19px] font-light">Wir betreuen Arztpraxen, Kanzleien und exklusive Gewerbeflächen. Präzise Abstimmung, absolute Diskretion und ein Qualitätsanspruch, der im Hintergrund perfekt funktioniert.</p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="#kontakt" className="inline-flex items-center justify-center rounded-full bg-[#B79B6C] px-9 py-4 text-[14px] font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(183,155,108,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A98E60]">Besichtigung anfragen</a>
                <a href="#leistungen" className="inline-flex items-center justify-center rounded-full border border-[#D9CCB8] bg-white/50 backdrop-blur-md px-9 py-4 text-[14px] font-bold uppercase tracking-wider text-[#6F6559] transition-all duration-300 hover:bg-white">Expertise ansehen</a>
              </div>
            </div>
          </div>
        </section>

        <section id="leistungen" className="bg-[#F7F4EE] py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="reveal opacity-0 translate-y-10 transition-all duration-1000 text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C] mb-6">Unsere Expertise</h2>
            <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-3">
              {services.map((service, idx) => (
                <article key={service.title} style={{ transitionDelay: `${idx * 150}ms` }} className="reveal opacity-0 translate-y-10 transition-all duration-1000 flex flex-col h-full overflow-hidden rounded-3xl border border-[#E5E1D8] bg-white p-10 shadow-[0_8px_20px_rgba(0,0,0,0.02)] transition-all duration-500 ease-out hover:-translate-y-2 transform-gpu hover:shadow-[0_30px_60px_rgba(183,155,108,0.12)]">
                  <div className="flex flex-col flex-grow">
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{service.eyebrow}</p>
                    <h3 className="mt-6 text-[26px] font-semibold leading-[1.2] text-[#2C2C2C]">{service.title}</h3>
                    <p className="mt-5 text-[15px] leading-7 text-[#7E7367]">{service.text}</p>
                  </div>
                  <div className="mt-10 flex flex-col justify-end shrink-0">
                    <div className="h-px w-full bg-gradient-to-r from-[#E5E1D8] via-[#B79B6C]/30 to-transparent" />
                    <ul className="mt-8 flex flex-col justify-start gap-4 h-auto md:h-[200px] lg:h-[240px] xl:h-[220px] text-[15px] leading-6 text-[#6F6559]">
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

        <section className="bg-white py-24 border-y border-[#E5E1D8]/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
             <p className="text-center text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C] mb-12">Stimmen unserer Klienten</p>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { text: "Absolute Professionalität und ein Auge fürs Detail. Nautilus ist für unsere Kanzlei unverzichtbar geworden.", author: "Notariat aus Berlin Mitte" },
                  { text: "Diskretion wird hier wirklich großgeschrieben. Das Team integriert sich lautlos in unsere Praxisabläufe.", author: "Facharztpraxis in Pankow" },
                  { text: "Nach der Sanierung war das Objekt in einem tadellosen Zustand. Termintreu, präzise und zuverlässig.", author: "Hausverwaltung aus Lichtenberg" }
                ].map((rev, i) => (
                  <div key={i} className="text-center reveal opacity-0 translate-y-10 transition-all duration-1000">
                    <div className="flex justify-center gap-1 mb-4 text-[#B79B6C]">
                      {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                    </div>
                    <blockquote className="text-[16px] leading-8 text-[#2C2C2C] italic">„{rev.text}“</blockquote>
                    <cite className="block mt-4 text-[12px] font-semibold uppercase tracking-widest text-[#8A7E70] not-italic">— {rev.author}</cite>
                  </div>
                ))}
             </div>
          </div>
        </section>

        <section id="warum-nautilus" className="bg-[#F7F4EE] py-32 lg:py-40 border-b border-[#E5E1D8]/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 lg:col-span-5 lg:pr-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Warum Nautilus</p>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.06] text-[#2C2C2C] lg:text-[46px]">Diskretion und Werterhalt als Fundament.</h2>
              <p className="mt-8 text-[17px] leading-8 text-[#8A7E70]">Unsere Haltung ist geprägt von kompromisslosem Qualitätsbewusstsein. Wir arbeiten für Unternehmen, die Perfektion als Fundament ihres Erfolgs verstehen.</p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                { title: 'Höchste Diskretion', desc: 'Wir arbeiten lautlos im Hintergrund Ihrer Kanzlei oder Praxis.' },
                { title: 'Feste Teams', desc: 'Vertrauen durch Kontinuität: Immer dieselben erfahrenen Ansprechpartner.' },
                { title: 'Werterhalt', desc: 'Schonende Pflege hochwertiger Oberflächen durch zertifizierte Mittel.' },
                { title: 'Präsenz vor Ort', desc: 'Souveräne Betreuung Ihrer Objekte im gesamten Berliner Einsatzgebiet.' }
              ].map((item, idx) => (
                <article key={item.title} style={{ transitionDelay: `${idx * 100}ms` }} className="reveal opacity-0 translate-y-10 transition-all duration-1000 rounded-3xl border border-[#E5E1D8] bg-white p-10 transition-all duration-500 ease-out hover:-translate-y-2 transform-gpu shadow-sm">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{item.title}</h4>
                  <p className="mt-5 text-[15px] leading-8 text-[#7E7367]">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ablauf" className="bg-white py-32 lg:py-40 border-b border-[#E5E1D8]/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 lg:col-span-5 lg:pr-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Ablauf & Prozesse</p>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">Strukturierte Prozesse für maximale Entlastung.</h2>
              <p className="mt-8 text-[17px] leading-8 text-[#8A7E70]">Von der fundierten Bedarfsanalyse bis zur kontinuierlichen Qualitätssicherung folgen wir einem bewährten Premium-Prozess.</p>
            </div>
            <div className="lg:col-span-7 space-y-6">
              {[
                { step: '01 · Bedarfsanalyse', text: 'Wir erfassen die spezifischen Anforderungen Ihrer Räumlichkeiten direkt vor Ort.' },
                { step: '02 · Konzeption', text: 'Sie erhalten ein transparentes Angebot für Ihre individuelle Reinigungslösung.' },
                { step: '03 · Implementierung', text: 'Unser Stammpersonal integriert sich geräuschlos in Ihre bestehenden Abläufe.' },
                { step: '04 · Monitoring', text: 'Regelmäßige Audits sichern den langfristigen Werterhalt Ihrer Immobilie.' }
              ].map((item, idx) => (
                <article key={item.step} style={{ transitionDelay: `${idx * 100}ms` }} className="reveal opacity-0 translate-y-10 transition-all duration-1000 rounded-3xl border border-[#E5E1D8] bg-[#FCFBF8] p-10 transition-all duration-500 ease-out transform-gpu hover:shadow-sm">
                  <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{item.step}</div>
                  <p className="mt-5 text-[16px] leading-8 text-[#7E7367]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FAQSection />

        <section id="kontakt" className="bg-[#F7F4EE] py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid items-start gap-20 lg:grid-cols-2">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Kontakt</p>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">Ihre unverbindliche Anfrage.</h2>
              <p className="mt-8 text-[17px] leading-8 text-[#8A7E70]">Lassen Sie uns gemeinsam den Standard für Ihre Flächen definieren. Wir melden uns zeitnah für eine Erstbegehung bei Ihnen zurück.</p>
            </div>
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 rounded-[40px] border border-[#E5E1D8] bg-white p-10 shadow-[0_30px_60px_rgba(0,0,0,0.04)] lg:p-14">
              <form id="contact-form" action="https://formspree.io/f/mnjonren" method="POST" className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="relative">
                    <select name="Objektart" className="w-full appearance-none rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 pr-12 text-[15px] outline-none focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10 cursor-pointer"><option>Büro & Kanzlei</option><option>Arztpraxis</option><option>Treppenhaus & Objekt</option></select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-5 text-[#B79B6C] pointer-events-none"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
                  </div>
                  <div className="relative">
                    <select name="Turnus" className="w-full appearance-none rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 pr-12 text-[15px] outline-none focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10 cursor-pointer"><option>Täglich</option><option>Wöchentlich</option><option>Nach Bedarf</option></select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-5 text-[#B79B6C] pointer-events-none"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <input type="text" name="Name" required placeholder="Ihr Name" className="w-full rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 text-[15px] outline-none focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10" />
                  <input type="email" name="E-Mail" required placeholder="E-Mail" className="w-full rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 text-[15px] outline-none focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10" />
                </div>
                <textarea rows={4} name="Nachricht" required placeholder="Nachricht..." className="w-full rounded-2xl border border-[#E5E1D8] bg-[#FCFBF8] px-6 py-4 text-[15px] outline-none focus:border-[#B79B6C] focus:bg-white focus:ring-4 focus:ring-[#B79B6C]/10 resize-none" />
                <button type="submit" className="w-full rounded-2xl bg-[#B79B6C] px-6 py-5 text-[15px] font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#A98E60]">Anfrage senden</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-16 border-t border-[#E5E1D8]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-start lg:justify-between lg:px-10">
          <div>
            <div className="text-[11px] font-bold tracking-[0.35em] text-[#B79B6C]">NAUTILUS FACILITY CLEANING</div>
            <p className="mt-5 max-w-md text-[14px] leading-7 text-[#8A7E70]">Nautilus Facility Cleaning steht für erstklassige Gebäudeservices in Berlin. Wir betreuen anspruchsvolle Objekte in Mitte, Pankow, Lichtenberg, Marzahn sowie Friedrichshain-Kreuzberg.</p>
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
