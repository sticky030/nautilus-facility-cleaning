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
    text: 'Für Praxen, Büros, Kanzleien und kleinere Gewerbeeinheiten, bei denen ein gepflegter Eindruck, geordnete Abläufe und eine diskrete Durchführung vorausgesetzt werden.',
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
    text: 'Regelmäßige Pflege von Eingangsbereichen, Treppenhäusern und Gemeinschaftsflächen für Wohn- und Gewerbeobjekte mit dauerhaft stimmigem Gesamteindruck.',
    bullets: [
      'Treppenhäuser, Podeste und Eingangsbereiche',
      'Handläufe, Geländer und Gemeinschaftsflächen',
      'Verlässliche Intervalle für kleine bis mittlere Objekte',
      'Klare Abstimmung mit Verwaltung oder Objektverantwortung',
    ],
  },
  {
    eyebrow: 'Projektbezogen',
    title: 'Bauendreinigung',
    text: 'Abschluss- und Übergabereinigung für kleinere bis mittlere Bau-, Ausbau- und Sanierungsprojekte, bei denen auf den letzten Metern Genauigkeit und Terminsicherheit zählen.',
    bullets: [
      'Feinreinigung vor Übergabe oder Inbetriebnahme',
      'Entfernung von Bauschmutz, Staub und Rückständen',
      'Objektbezogene Einordnung nach tatsächlichem Zustand',
      'Realistische Festpreisangebote nach Besichtigung',
    ],
  },
]

export default function App() {
  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#6F6559] antialiased selection:bg-[#B79B6C]/20">
      <div className="fixed inset-x-0 top-0 z-50">
        <header className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="rounded-full border border-white/40 bg-[#F8F4EC]/82 px-5 py-3 shadow-[0_12px_30px_rgba(183,155,108,0.16)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-6">
              <a href="#start" className="flex min-w-0 items-center gap-3">
                <img
                  src="/images/reinigung-trans.png"
                  alt="Nautilus Facility Cleaning"
                  className="h-18 w-18 shrink-0 object-contain"
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
                    className="text-sm font-medium text-[#8A7E70] transition hover:text-[#6F6559]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <a
                href="#kontakt"
                className="inline-flex shrink-0 items-center rounded-full bg-[#B79B6C] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(183,155,108,0.16)] transition hover:-translate-y-0.5 hover:brightness-95"
              >
                Besichtigung anfragen
              </a>
            </div>
          </div>
        </header>
      </div>

      <main className="overflow-x-hidden">
        <section
          id="start"
          className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#F3EFE7]"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-[linear-gradient(96deg,rgba(247,244,238,0.94)_0%,rgba(247,244,238,0.90)_36%,rgba(247,244,238,0.70)_64%,rgba(247,244,238,0.34)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,155,108,0.16),transparent_28%)]" />

          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 pb-20 pt-36 lg:grid-cols-12 lg:px-10 lg:pb-28 lg:pt-40">
            <div className="reveal reveal-slow lg:col-span-5 lg:max-w-[31rem] lg:self-end lg:pb-14">
              <h1 className="max-w-[12ch] text-[30px] font-medium leading-[1.06] text-[#6F6559] sm:text-[38px] lg:text-[46px]">
                Reinigung für Praxen, Büros und ausgewählte Objekte in Berlin
              </h1>

              <p className="mt-6 max-w-[29rem] text-[15px] leading-8 text-[#7E7367] lg:text-[16px] lg:text-[17px]">
                Präzise Abstimmung, diskrete Durchführung und ein Qualitätsanspruch, der im Alltag belastbar getragen wird.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#kontakt"
                  className="inline-flex items-center justify-center rounded-full bg-[#B79B6C] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(183,155,108,0.16)] transition hover:-translate-y-0.5 hover:brightness-95"
                >
                  Besichtigung anfragen
                </a>
                <a
                  href="#leistungen"
                  className="inline-flex items-center justify-center rounded-full border border-[#D9CCB8] bg-white/72 px-5 py-3 text-sm font-semibold text-[#6F6559] transition hover:bg-white/88"
                >
                  Leistungen ansehen
                </a>
              </div>
            </div>
          </div>
        </section>

        



        <section id="leistungen" className="bg-[#F7F4EE] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="reveal max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#B79B6C]">
                Leistungen
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-[1.08] text-[#6F6559] lg:text-[48px]">
                Ausgewählte Leistungen für gewerbliche Flächen und Objekte mit gehobenem Standard
              </h2>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 xl:grid-cols-3">
              {services.map((service, index) => (
                <article
                  key={service.title}
                  className={`reveal group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-[#E6DDCF] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBF9F4_100%)] p-10 shadow-[0_16px_40px_rgba(183,155,108,0.08)] transition duration-300 hover:-translate-y-[5px] hover:shadow-[0_30px_68px_rgba(183,155,108,0.18)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.18),transparent_34%)] before:opacity-0 before:transition before:duration-500 hover:before:opacity-100 ${
                    index === 0 ? 'delay-1' : index === 1 ? 'delay-2' : 'delay-3'
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#B79B6C] via-[#D6BE92] to-[#B79B6C] transition duration-300 group-hover:brightness-110 group-hover:shadow-[0_0_18px_rgba(214,190,146,0.45)]" />
                  <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-1 ring-transparent transition duration-300 group-hover:ring-[#D6BE92]/78" />

                  <div className="relative min-h-[220px]">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B79B6C]">
                      {service.eyebrow}
                    </div>
                    <h3 className="mt-6 min-h-[72px] text-[32px] font-semibold leading-[1.12] text-[#6F6559]">
                      {service.title}
                    </h3>
                    <p className="mt-5 min-h-[132px] text-[15px] leading-8 text-[#7E7367] lg:text-[16px]">
                      {service.text}
                    </p>
                    <div className="mt-7 h-px w-full bg-[#E6DDCF]" />
                  </div>

                  <ul className="relative mt-7 space-y-3 text-[15px] leading-7 text-[#6F6559]/84">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-[#B79B6C]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="warum-nautilus" className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-14">
              <div className="reveal lg:col-span-5 lg:pr-8">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#B79B6C]">
                  Warum Nautilus
                </p>
                <h2 className="mt-4 max-w-[12ch] text-3xl font-semibold leading-[1.06] text-[#6F6559] lg:text-[50px]">
                  Ein Standard, der sich im Alltag bewähren muss
                </h2>
                <p className="mt-8 max-w-[34rem] text-base leading-8 text-[#8A7E70]">
                  Nautilus Facility Cleaning richtet sich an Geschäftskunden, die nicht nur eine Dienstleistung vergeben, sondern eine Durchführung erwarten, die sich zuverlässig in bestehende Abläufe einfügt.
                </p>
                <p className="mt-5 max-w-[34rem] text-base leading-8 text-[#8A7E70]">
                  Maßgeblich sind Diskretion, klare Abstimmung und eine Arbeitsweise, die Ordnung, Kontinuität und Qualität im Tagesgeschäft sichert.
                </p>
              </div>

              <div className="lg:col-span-7 warum-trigger">
                <div className="relative rounded-[42px] bg-[linear-gradient(180deg,#FBF7EF_0%,#FBF7EF_100%)] p-3 lg:p-4">
                  <div className="pointer-events-none absolute inset-0 rounded-[42px] bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.08),transparent_34%)]" />
                  <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <article className="warum-card group relative overflow-hidden rounded-[34px] border border-[#E6D9C7] bg-[linear-gradient(180deg,#FFFEFB_0%,#FBF5EA_100%)] p-7 shadow-[0_18px_40px_rgba(183,155,108,0.08)] transition duration-300 hover:-translate-y-[4px] hover:shadow-[0_26px_56px_rgba(183,155,108,0.15)] lg:min-h-[252px] lg:p-8">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.08),transparent_38%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute inset-0 rounded-[34px] ring-1 ring-transparent transition duration-300 group-hover:ring-[#D6BE92]/56" />
                      <div className="relative">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B79B6C]">
                          Diskrete Ausführung
                        </div>
                        <div className="mt-3 h-px w-12 bg-[#D8C29A]" />
                        <p className="mt-5 max-w-[20rem] text-[14px] leading-7 text-[#8A7E70]">
                          Passend für Umfelder, in denen Ruhe, Sorgfalt und saubere Abläufe erwartet werden.
                        </p>
                      </div>
                    </article>

                    <article className="warum-card group relative overflow-hidden rounded-[34px] border border-[#E6D9C7] bg-[linear-gradient(180deg,#FFFEFB_0%,#FBF5EA_100%)] p-7 shadow-[0_18px_40px_rgba(183,155,108,0.08)] transition duration-300 hover:-translate-y-[4px] hover:shadow-[0_26px_56px_rgba(183,155,108,0.15)] lg:min-h-[252px] lg:p-8">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.08),transparent_38%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute inset-0 rounded-[34px] ring-1 ring-transparent transition duration-300 group-hover:ring-[#D6BE92]/56" />
                      <div className="relative">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B79B6C]">
                          Klare Abstimmung
                        </div>
                        <div className="mt-3 h-px w-12 bg-[#D8C29A]" />
                        <p className="mt-5 max-w-[21rem] text-[14px] leading-7 text-[#8A7E70]">
                          Nachvollziehbare Kommunikation und ruhige operative Abstimmung statt Reibung im Tagesgeschäft.
                        </p>
                      </div>
                    </article>

                    <article className="warum-card group relative overflow-hidden rounded-[34px] border border-[#E6D9C7] bg-[linear-gradient(180deg,#FFFEFB_0%,#FBF5EA_100%)] p-7 shadow-[0_18px_40px_rgba(183,155,108,0.08)] transition duration-300 hover:-translate-y-[4px] hover:shadow-[0_26px_56px_rgba(183,155,108,0.15)] lg:min-h-[252px] lg:p-8">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.08),transparent_38%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute inset-0 rounded-[34px] ring-1 ring-transparent transition duration-300 group-hover:ring-[#D6BE92]/56" />
                      <div className="relative">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B79B6C]">
                          Verlässliche Standards
                        </div>
                        <div className="mt-3 h-px w-12 bg-[#D8C29A]" />
                        <p className="mt-5 max-w-[21rem] text-[14px] leading-7 text-[#8A7E70]">
                          Nicht punktuell überzeugend, sondern im laufenden Betrieb dauerhaft sauber gehalten.
                        </p>
                      </div>
                    </article>

                    <article className="warum-card group relative overflow-hidden rounded-[34px] border border-[#E6D9C7] bg-[linear-gradient(180deg,#FFFEFB_0%,#FBF5EA_100%)] p-7 shadow-[0_18px_40px_rgba(183,155,108,0.08)] transition duration-300 hover:-translate-y-[4px] hover:shadow-[0_26px_56px_rgba(183,155,108,0.15)] lg:min-h-[252px] lg:p-8">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.08),transparent_38%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute inset-0 rounded-[34px] ring-1 ring-transparent transition duration-300 group-hover:ring-[#D6BE92]/56" />
                      <div className="relative">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B79B6C]">
                          Sensible Umfelder
                        </div>
                        <div className="mt-3 h-px w-12 bg-[#D8C29A]" />
                        <p className="mt-5 max-w-[20rem] text-[14px] leading-7 text-[#8A7E70]">
                          Dort, wo ein gepflegtes Umfeld, Ordnung und Verlässlichkeit selbstverständlich sein müssen.
                        </p>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F3EFE7] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="reveal lg:col-span-4">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#B79B6C]">
                  Auftreten & Haltung
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-[1.08] text-[#6F6559] lg:text-[48px]">
                  Diskret im Auftritt. Präzise in der Ausführung. Konsequent im Standard.
                </h2>
                <p className="mt-6 text-base leading-8 text-[#8A7E70]">
                  Nautilus Facility Cleaning steht für ein Arbeitsverständnis, das sich in professionelle Betriebsabläufe einfügt: zurückhaltend im Auftreten, sauber in der Abstimmung und verlässlich in der täglichen Ausführung.
                </p>
                <p className="mt-4 text-base leading-8 text-[#8A7E70]">
                  Gerade in Praxen, Büros und sensiblen Objektstrukturen zählt nicht Präsenz um ihrer selbst willen, sondern ein Team, das Standards sicher trägt und Qualität ohne Reibungsverluste liefert.
                </p>
              </div>

              <div className="reveal delay-1 lg:col-span-8">
                <div className="relative overflow-hidden rounded-[44px] border border-[#E6DDCF] bg-white shadow-[0_18px_48px_rgba(183,155,108,0.16)]">
                  <img
                    src="/images/why-nautilus.jpg"
                    alt="Team von Nautilus Facility Cleaning"
                    className="mx-auto w-full max-w-[920px] max-h-[500px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>



        <section id="ablauf" className="bg-[#F7F4EE] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
              <div className="reveal lg:col-span-5 lg:pr-8">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#B79B6C]">
                  Ablauf
                </p>
                <h2 className="mt-4 max-w-[12ch] text-3xl font-semibold leading-[1.06] text-[#6F6559] lg:text-[50px]">
                  So wird aus Abstimmung verlässliche Ausführung
                </h2>
                <p className="mt-8 max-w-[34rem] text-base leading-8 text-[#8A7E70]">
                  Jeder Auftrag beginnt mit einer präzisen Einordnung vor Ort. Darauf aufbauend definieren wir den Leistungsumfang, stimmen die Durchführung auf das Objekt ab und führen den Ablauf im Alltag nachvollziehbar weiter.
                </p>
                <p className="mt-5 max-w-[32rem] text-base leading-8 text-[#8A7E70]">
                  Entscheidend ist nicht der Start, sondern eine Durchführung, die sich im laufenden Betrieb dauerhaft bewährt.
                </p>
              </div>

              <div className="reveal delay-1 lg:col-span-7">
                <div className="space-y-5">
                  <article className="reveal delay-1 process-card group relative overflow-hidden rounded-[34px] border border-[#E7DCCB] bg-[linear-gradient(180deg,#FFFEFB_0%,#F9F4EC_100%)] px-8 py-8 shadow-[0_16px_34px_rgba(183,155,108,0.07)] transition duration-500 hover:-translate-y-[2px] hover:shadow-[0_24px_44px_rgba(183,155,108,0.12)] lg:px-9 lg:py-9">
                    <div className="process-glow absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.10),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                    <div className="process-ring pointer-events-none absolute inset-0 rounded-[34px] ring-1 ring-transparent transition duration-500 group-hover:ring-[#D6BE92]/40" />
                    <div className="relative">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#B79B6C]">
                        01 · Analyse
                      </div>
                      <div className="mt-4 h-px w-12 bg-[#D8C29A]" />
                      <p className="mt-5 max-w-[34rem] text-[15px] leading-8 text-[#85796C]">
                        Wir erfassen Flächen, Nutzung und Anforderungen so, dass Aufwand und Leistungsumfang belastbar eingeordnet werden können.
                      </p>
                    </div>
                  </article>

                  <article className="reveal delay-2 process-card group relative overflow-hidden rounded-[34px] border border-[#E7DCCB] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBF7F0_100%)] px-8 py-8 shadow-[0_16px_34px_rgba(183,155,108,0.07)] transition duration-500 hover:-translate-y-[2px] hover:shadow-[0_24px_44px_rgba(183,155,108,0.12)] lg:px-9 lg:py-9">
                    <div className="process-glow absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.10),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                    <div className="process-ring pointer-events-none absolute inset-0 rounded-[34px] ring-1 ring-transparent transition duration-500 group-hover:ring-[#D6BE92]/40" />
                    <div className="relative">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#B79B6C]">
                        02 · Abstimmung
                      </div>
                      <div className="mt-4 h-px w-12 bg-[#D8C29A]" />
                      <p className="mt-5 max-w-[34rem] text-[15px] leading-8 text-[#85796C]">
                        Auf Basis der Aufnahme werden Umfang, Turnus und operative Rahmenbedingungen sauber auf das Objekt abgestimmt.
                      </p>
                    </div>
                  </article>

                  <article className="reveal delay-3 process-card group relative overflow-hidden rounded-[34px] border border-[#E7DCCB] bg-[linear-gradient(180deg,#FFFEFB_0%,#F9F4EC_100%)] px-8 py-8 shadow-[0_16px_34px_rgba(183,155,108,0.07)] transition duration-500 hover:-translate-y-[2px] hover:shadow-[0_24px_44px_rgba(183,155,108,0.12)] lg:px-9 lg:py-9">
                    <div className="process-glow absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.10),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                    <div className="process-ring pointer-events-none absolute inset-0 rounded-[34px] ring-1 ring-transparent transition duration-500 group-hover:ring-[#D6BE92]/40" />
                    <div className="relative">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#B79B6C]">
                        03 · Umsetzung
                      </div>
                      <div className="mt-4 h-px w-12 bg-[#D8C29A]" />
                      <p className="mt-5 max-w-[34rem] text-[15px] leading-8 text-[#85796C]">
                        Die Durchführung wird so geführt, dass sie sich ruhig, nachvollziehbar und verlässlich in bestehende Abläufe einfügt.
                      </p>
                    </div>
                  </article>

                  <article className="reveal delay-4 process-card group relative overflow-hidden rounded-[34px] border border-[#E7DCCB] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBF7F0_100%)] px-8 py-8 shadow-[0_16px_34px_rgba(183,155,108,0.07)] transition duration-500 hover:-translate-y-[2px] hover:shadow-[0_24px_44px_rgba(183,155,108,0.12)] lg:px-9 lg:py-9">
                    <div className="process-glow absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.10),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                    <div className="process-ring pointer-events-none absolute inset-0 rounded-[34px] ring-1 ring-transparent transition duration-500 group-hover:ring-[#D6BE92]/40" />
                    <div className="relative">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#B79B6C]">
                        04 · Qualität
                      </div>
                      <div className="mt-4 h-px w-12 bg-[#D8C29A]" />
                      <p className="mt-5 max-w-[34rem] text-[15px] leading-8 text-[#85796C]">
                        Entscheidend ist ein Standard, der nicht punktuell überzeugt, sondern im laufenden Betrieb dauerhaft getragen wird.
                      </p>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>


        <FAQSection />



        
        <section id="kontakt" className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
              <div className="reveal">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#B79B6C]">
                  Kontakt
                </p>

                <h2 className="mt-4 max-w-[12ch] text-3xl font-semibold leading-[1.08] text-[#6F6559] lg:text-[48px]">
                  Objekt kurz beschreiben. Rest klären wir.
                </h2>

                <p className="mt-8 max-w-[34rem] text-[16px] leading-8 text-[#8A7E70]">
                  Für Büros, Arztpraxen, Treppenhäuser und Gewerbeobjekte in Berlin.
                  Kurze Anfrage genügt – wir melden uns zeitnah mit einer ersten Einschätzung.
                </p>

                <div className="mt-12 space-y-5">
                  <div className="rounded-[24px] border border-[#E7DED0] bg-[linear-gradient(180deg,#FFFDF9_0%,#FBF7EF_100%)] px-6 py-5 shadow-[0_12px_28px_rgba(183,155,108,0.05)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B79B6C]">
                      Geeignet für
                    </p>
                    <p className="mt-3 text-[15px] leading-7 text-[#6F6559]">
                      Büros · Arztpraxen · Treppenhäuser · Gewerbeeinheiten
                    </p>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B79B6C]">
                      Auch relevant für
                    </p>
                    <p className="mt-3 text-[15px] leading-7 text-[#6F6559]">
                      Bauendreinigung nach Umbau, Ausbau oder Sanierung
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-[#E7DED0] bg-[linear-gradient(180deg,#FFFDF9_0%,#FBF7EF_100%)] px-6 py-5 shadow-[0_12px_28px_rgba(183,155,108,0.05)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B79B6C]">
                      Ablauf
                    </p>
                    <p className="mt-3 text-[15px] leading-7 text-[#6F6559]">
                      Anfrage · Besichtigung · Angebot · Start der Reinigung
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-[#E7DED0] bg-[linear-gradient(180deg,#FFFDF9_0%,#FBF7EF_100%)] px-6 py-5 shadow-[0_12px_28px_rgba(183,155,108,0.05)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B79B6C]">
                      Einsatzgebiet
                    </p>
                    <p className="mt-3 text-[15px] leading-7 text-[#6F6559]">
                      Lichtenberg · Marzahn · Friedrichshain · Prenzlauer Berg · Berlin-Mitte
                      <br />
                      Weitere Berliner Bezirke auf Anfrage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="reveal-delayed">
                <div className="rounded-[32px] border border-[#E7DED0] bg-[linear-gradient(180deg,#FFFDF9_0%,#FBF7EF_100%)] p-7 shadow-[0_24px_50px_rgba(183,155,108,0.10)] lg:p-10">
                  <div className="mb-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B79B6C]">
                      Anfrage
                    </p>
                    <p className="mt-3 max-w-[32rem] text-[15px] leading-8 text-[#7E7367] lg:text-[16px]">
                      Teilen Sie die wichtigsten Eckdaten zum Objekt mit. So können wir die Anfrage schneller einordnen.
                    </p>
                  </div>

                  
                  <form id="contact-form" action="https://formspree.io/f/mnjonren" method="POST" className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-[12px] font-medium uppercase tracking-[0.16em] text-[#9A8D7D]">
                          Objektart
                        </label>
                        <div className="relative">
                          <select name="Objektart" className="select-clean w-full rounded-[18px] border border-[#E4D9C9] bg-white px-4 py-4 text-[15px] text-[#6F6559] outline-none transition focus:border-[#B79B6C] focus:ring-2 focus:ring-[#B79B6C]/15">
                            <option>Büro</option>
                            <option>Arztpraxis</option>
                            <option>Treppenhaus</option>
                            <option>Gewerbeeinheit</option>
                            <option>Bauprojekt</option>
                          </select>
                          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#A8874F] text-[18px]">
                            ⌄
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-[12px] font-medium uppercase tracking-[0.16em] text-[#9A8D7D]">
                          Gewünschter Turnus
                        </label>
                        <div className="relative">
                          <select name="Turnus" className="select-clean w-full rounded-[18px] border border-[#E4D9C9] bg-white px-4 py-4 text-[15px] text-[#6F6559] outline-none transition focus:border-[#B79B6C] focus:ring-2 focus:ring-[#B79B6C]/15">
                            <option>Täglich</option>
                            <option>Mehrmals pro Woche</option>
                            <option>Wöchentlich</option>
                            <option>Nach Bedarf</option>
                          </select>
                          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#A8874F] text-[18px]">
                            ⌄
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-[12px] font-medium uppercase tracking-[0.16em] text-[#9A8D7D]">
                          Name
                        </label>
                        <input
                          type="text"
                          name="Name"
                          required
                          placeholder="Ihr Name"
                          className="w-full rounded-[18px] border border-[#E4D9C9] bg-white px-4 py-4 text-[15px] text-[#6F6559] outline-none transition placeholder:text-[#B0A596] focus:border-[#B79B6C] focus:ring-2 focus:ring-[#B79B6C]/15"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-[12px] font-medium uppercase tracking-[0.16em] text-[#9A8D7D]">
                          E-Mail
                        </label>
                        <input
                          type="email"
                          name="E-Mail"
                          required
                          placeholder="kontakt@unternehmen.de"
                          className="w-full rounded-[18px] border border-[#E4D9C9] bg-white px-4 py-4 text-[15px] text-[#6F6559] outline-none transition placeholder:text-[#B0A596] focus:border-[#B79B6C] focus:ring-2 focus:ring-[#B79B6C]/15"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-[12px] font-medium uppercase tracking-[0.16em] text-[#9A8D7D]">
                        Objekt kurz beschreiben
                      </label>
                      <textarea
                        rows={6}
                        name="Nachricht"
                        required
                        placeholder="Objektart, ungefähre Größe, gewünschter Turnus oder besondere Anforderungen"
                        className="w-full rounded-[18px] border border-[#E4D9C9] bg-white px-4 py-4 text-[15px] leading-7 text-[#6F6559] outline-none transition placeholder:text-[#B0A596] focus:border-[#B79B6C] focus:ring-2 focus:ring-[#B79B6C]/15"
                      />
                    </div>

                    <div className="pt-2">
                      <input type="hidden" name="_subject" value="Neue Anfrage über nautilus-facility.de" />
                    <input type="hidden" name="_language" value="de" />
                    <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                    <button
                        id="contact-form-button"
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-[18px] bg-[#B79B6C] px-6 py-4 text-[15px] font-medium text-white shadow-[0_14px_28px_rgba(183,155,108,0.22)] transition duration-300 hover:-translate-y-[1px] hover:bg-[#A98E60] hover:shadow-[0_20px_36px_rgba(183,155,108,0.28)]"
                      >
                        Anfrage senden
                      </button>
                    </div>

                    <p id="contact-form-status" className="text-[13px] leading-6 text-[#9A8D7D]">
                      Kurze Anfrage genügt. Wir melden uns zeitnah mit einer ersten Einschätzung.
                    </p>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </section>

        


</main>

      <footer className="bg-[#F3EFE7] py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex items-start gap-4">
            <div>
              <div className="text-sm font-semibold tracking-[0.22em] text-[#B79B6C]">
                NAUTILUS FACILITY CLEANING
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#9C8F7F]">
                Nautilus Facility Cleaning ist ein Geschäftsbereich der Nautilus Security UG (haftungsbeschränkt).
                <br />
                Praxisreinigung, Büroreinigung und laufende Objektpflege für ausgewählte Gewerbeobjekte in Lichtenberg · Marzahn · Friedrichshain · Prenzlauer Berg · Berlin-Mitte
                <br />
                <a href="mailto:kontakt@nautilus-facility.de" className="transition hover:text-[#6F6559]">
                  kontakt@nautilus-facility.de
                </a>
                <br />
                <a href="tel:+493095857615" className="transition hover:text-[#6F6559]">
                  017622844636
                </a>
              </p>
            </div>
          </div>
          <div className="flex gap-6 text-sm text-[#9C8F7F]">
            <a href="impressum/" className="transition hover:text-[#6F6559]">
              Impressum
            </a>
            <a href="datenschutz/" className="transition hover:text-[#6F6559]">
              Datenschutz
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

