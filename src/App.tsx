const navItems = [
  { label: 'Start', href: '#start' },
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Warum Nautilus', href: '#warum-nautilus' },
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

              <p className="mt-6 max-w-[29rem] text-[15px] leading-7 text-[#8A7E70] lg:text-[17px]">
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
                  className={`reveal group relative flex h-full flex-col overflow-hidden rounded-[40px] border border-[#E6DDCF] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBF9F4_100%)] p-10 shadow-[0_16px_40px_rgba(183,155,108,0.08)] transition duration-500 hover:-translate-y-[5px] hover:shadow-[0_30px_68px_rgba(183,155,108,0.18)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.18),transparent_34%)] before:opacity-0 before:transition before:duration-500 hover:before:opacity-100 ${
                    index === 0 ? 'delay-1' : index === 1 ? 'delay-2' : 'delay-3'
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#B79B6C] via-[#D6BE92] to-[#B79B6C] transition duration-500 group-hover:brightness-110 group-hover:shadow-[0_0_18px_rgba(214,190,146,0.45)]" />
                  <div className="pointer-events-none absolute inset-0 rounded-[40px] ring-1 ring-transparent transition duration-300 group-hover:ring-[#D6BE92]/78" />

                  <div className="relative min-h-[220px]">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B79B6C]">
                      {service.eyebrow}
                    </div>
                    <h3 className="mt-6 min-h-[72px] text-[32px] font-semibold leading-[1.12] text-[#6F6559]">
                      {service.title}
                    </h3>
                    <p className="mt-5 min-h-[132px] text-[15px] leading-7 text-[#8A7E70]">
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
                <div className="relative rounded-[42px] bg-[linear-gradient(180deg,#FBF7EF_0%,#F7F2E8_100%)] p-3 lg:p-4">
                  <div className="pointer-events-none absolute inset-0 rounded-[42px] bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.08),transparent_34%)]" />
                  <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <article className="warum-card group relative overflow-hidden rounded-[34px] border border-[#E6D9C7] bg-[linear-gradient(180deg,#FFFEFB_0%,#FBF5EA_100%)] p-7 shadow-[0_18px_40px_rgba(183,155,108,0.08)] transition duration-500 hover:-translate-y-[4px] hover:shadow-[0_26px_56px_rgba(183,155,108,0.15)] lg:min-h-[252px] lg:p-8">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.12),transparent_38%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute inset-0 rounded-[34px] ring-1 ring-transparent transition duration-500 group-hover:ring-[#D6BE92]/56" />
                      <div className="relative">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#A8874F]">
                          Diskrete Ausführung
                        </div>
                        <div className="mt-3 h-px w-12 bg-[#D8C29A]" />
                        <h3 className="mt-5 max-w-[14ch] text-[23px] font-semibold leading-[1.10] text-[#6F6559] lg:text-[27px]">
                          Diskret im Auftritt
                        </h3>
                        <p className="mt-4 max-w-[20rem] text-[14px] leading-7 text-[#8A7E70]">
                          Passend für Umfelder, in denen Ruhe, Sorgfalt und saubere Abläufe erwartet werden.
                        </p>
                      </div>
                    </article>

                    <article className="warum-card group relative overflow-hidden rounded-[34px] border border-[#E6D9C7] bg-[linear-gradient(180deg,#FFFEFB_0%,#FBF5EA_100%)] p-7 shadow-[0_18px_40px_rgba(183,155,108,0.08)] transition duration-500 hover:-translate-y-[4px] hover:shadow-[0_26px_56px_rgba(183,155,108,0.15)] lg:min-h-[252px] lg:p-8">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.12),transparent_38%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute inset-0 rounded-[34px] ring-1 ring-transparent transition duration-500 group-hover:ring-[#D6BE92]/56" />
                      <div className="relative">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#A8874F]">
                          Klare Abstimmung
                        </div>
                        <div className="mt-3 h-px w-12 bg-[#D8C29A]" />
                        <h3 className="mt-5 max-w-[15ch] text-[25px] font-semibold leading-[1.08] text-[#6F6559] lg:text-[30px]">
                          Klare Abstimmung
                        </h3>
                        <p className="mt-4 max-w-[21rem] text-[14px] leading-7 text-[#8A7E70]">
                          Nachvollziehbare Kommunikation und ruhige operative Abstimmung statt Reibung im Tagesgeschäft.
                        </p>
                      </div>
                    </article>

                    <article className="warum-card group relative overflow-hidden rounded-[34px] border border-[#E6D9C7] bg-[linear-gradient(180deg,#FFFEFB_0%,#FBF5EA_100%)] p-7 shadow-[0_18px_40px_rgba(183,155,108,0.08)] transition duration-500 hover:-translate-y-[4px] hover:shadow-[0_26px_56px_rgba(183,155,108,0.15)] lg:min-h-[252px] lg:p-8">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.12),transparent_38%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute inset-0 rounded-[34px] ring-1 ring-transparent transition duration-500 group-hover:ring-[#D6BE92]/56" />
                      <div className="relative">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#A8874F]">
                          Verlässliche Standards
                        </div>
                        <div className="mt-3 h-px w-12 bg-[#D8C29A]" />
                        <h3 className="mt-5 max-w-[15ch] text-[25px] font-semibold leading-[1.08] text-[#6F6559] lg:text-[30px]">
                          Konstante Qualität
                        </h3>
                        <p className="mt-4 max-w-[21rem] text-[14px] leading-7 text-[#8A7E70]">
                          Nicht punktuell überzeugend, sondern im laufenden Betrieb dauerhaft sauber gehalten.
                        </p>
                      </div>
                    </article>

                    <article className="warum-card group relative overflow-hidden rounded-[34px] border border-[#E6D9C7] bg-[linear-gradient(180deg,#FFFEFB_0%,#FBF5EA_100%)] p-7 shadow-[0_18px_40px_rgba(183,155,108,0.08)] transition duration-500 hover:-translate-y-[4px] hover:shadow-[0_26px_56px_rgba(183,155,108,0.15)] lg:min-h-[252px] lg:p-8">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.12),transparent_38%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute inset-0 rounded-[34px] ring-1 ring-transparent transition duration-500 group-hover:ring-[#D6BE92]/56" />
                      <div className="relative">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#A8874F]">
                          Sensible Umfelder
                        </div>
                        <div className="mt-3 h-px w-12 bg-[#D8C29A]" />
                        <h3 className="mt-5 max-w-[14ch] text-[23px] font-semibold leading-[1.10] text-[#6F6559] lg:text-[27px]">
                          Sensible Umfelder
                        </h3>
                        <p className="mt-4 max-w-[20rem] text-[14px] leading-7 text-[#8A7E70]">
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
                    className="h-full min-h-[520px] w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F4EE] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="reveal max-w-[54rem]">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#B79B6C]">
                Ablauf
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-[1.08] text-[#6F6559] lg:text-[48px]">
                So wird aus Abstimmung verlässliche Ausführung
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#8A7E70]">
                Jeder Auftrag beginnt mit einer präzisen Einordnung vor Ort. Darauf aufbauend definieren wir den Leistungsumfang, stimmen die Durchführung auf das Objekt ab und führen den Ablauf im Alltag nachvollziehbar weiter.
              </p>
            </div>

            <div className="reveal process-stage mt-20 relative overflow-hidden rounded-[48px] border border-[#E7DED0] bg-[linear-gradient(180deg,#FFFDF9_0%,#F7F2E8_100%)] p-6 shadow-[0_18px_46px_rgba(183,155,108,0.08)] lg:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,155,108,0.08),transparent_30%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(183,155,108,0.06),transparent_28%)]" />              <div className="process-line line-1 pointer-events-none absolute left-[23%] top-[23%] hidden h-[2px] w-[47%] bg-[linear-gradient(90deg,rgba(214,190,146,0.00)_0%,rgba(214,190,146,0.68)_18%,rgba(214,190,146,0.78)_52%,rgba(214,190,146,0.22)_100%)] blur-[0.4px] lg:block" />
              <div className="process-line line-2 pointer-events-none absolute left-[63%] top-[31%] hidden h-[40%] w-[2px] rotate-[46deg] origin-top-left bg-[linear-gradient(180deg,rgba(214,190,146,0.00)_0%,rgba(214,190,146,0.66)_18%,rgba(214,190,146,0.78)_54%,rgba(214,190,146,0.20)_100%)] blur-[0.4px] lg:block" />
              <div className="process-line line-3 pointer-events-none absolute left-[33%] top-[73%] hidden h-[2px] w-[36%] bg-[linear-gradient(90deg,rgba(214,190,146,0.00)_0%,rgba(214,190,146,0.64)_18%,rgba(214,190,146,0.74)_56%,rgba(214,190,146,0.18)_100%)] blur-[0.4px] lg:block" />

              <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                <article className="reveal delay-1 process-card group relative overflow-hidden rounded-[36px] border border-[#E8DED0] bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(251,247,239,0.95)_100%)] p-7 shadow-[0_14px_34px_rgba(183,155,108,0.08)] transition duration-500 hover:-translate-y-[3px] hover:shadow-[0_24px_52px_rgba(183,155,108,0.16)] lg:col-span-4 lg:min-h-[250px] lg:p-8">
                  <div className="process-glow absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.12),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className="process-ring pointer-events-none absolute inset-0 rounded-[36px] ring-1 ring-transparent transition duration-500 group-hover:ring-[#D6BE92]/55" />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#A8874F]">
                        Analyse
                      </div>
                    </div>
                    <div className="mt-3 h-px w-14 bg-[#D8C29A]" />
                    <h3 className="mt-5 max-w-[16rem] text-[27px] font-semibold leading-[1.08] text-[#6F6559] lg:text-[31px]">
                      Besichtigung und präzise Aufnahme
                    </h3>
                    <p className="mt-5 max-w-[20rem] text-[15px] leading-7 text-[#8A7E70]">
                      Wir erfassen Fläche, Nutzung und Anforderungen so, dass Aufwand und Leistungsumfang belastbar eingeordnet werden können.
                    </p>
                  </div>
                </article>

                <article className="reveal delay-2 process-card group relative overflow-hidden rounded-[40px] border border-[#E8DED0] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(251,247,239,0.98)_100%)] p-8 shadow-[0_18px_40px_rgba(183,155,108,0.10)] transition duration-500 hover:-translate-y-[4px] hover:shadow-[0_28px_60px_rgba(183,155,108,0.18)] lg:col-span-8 lg:min-h-[290px] lg:p-10">
                  <div className="process-glow absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.14),transparent_40%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className="process-ring pointer-events-none absolute inset-0 rounded-[40px] ring-1 ring-transparent transition duration-500 group-hover:ring-[#D6BE92]/60" />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#A8874F]">
                        Angebot
                      </div>
                    </div>
                    <div className="mt-3 h-px w-14 bg-[#D8C29A]" />
                    <h3 className="mt-5 max-w-[22rem] text-[31px] font-semibold leading-[1.06] text-[#6F6559] lg:text-[38px]">
                      Klar gefasste Grundlage
                    </h3>
                    <p className="mt-5 max-w-[28rem] text-[15px] leading-8 text-[#8A7E70]">
                      Auf Basis der Aufnahme entsteht ein klar abgegrenztes Angebot mit nachvollziehbarem Leistungsumfang und realistischen Einsatzparametern.
                    </p>
                  </div>
                </article>

                <article className="reveal delay-3 process-card group relative overflow-hidden rounded-[40px] border border-[#E8DED0] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(251,247,239,0.98)_100%)] p-8 shadow-[0_18px_40px_rgba(183,155,108,0.10)] transition duration-500 hover:-translate-y-[4px] hover:shadow-[0_28px_60px_rgba(183,155,108,0.18)] lg:col-span-7 lg:min-h-[300px] lg:p-10">
                  <div className="process-glow absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.14),transparent_40%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className="process-ring pointer-events-none absolute inset-0 rounded-[40px] ring-1 ring-transparent transition duration-500 group-hover:ring-[#D6BE92]/60" />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#A8874F]">
                        Umsetzung
                      </div>
                    </div>
                    <div className="mt-3 h-px w-14 bg-[#D8C29A]" />
                    <h3 className="mt-5 max-w-[24rem] text-[31px] font-semibold leading-[1.06] text-[#6F6559] lg:text-[38px]">
                      Abgestimmter Start im Objekt
                    </h3>
                    <p className="mt-5 max-w-[28rem] text-[15px] leading-8 text-[#8A7E70]">
                      Durchführung, Zuständigkeiten und operative Schnittstellen werden so geführt, dass sich der Ablauf geordnet in den Betrieb einfügt.
                    </p>
                  </div>
                </article>

                <article className="reveal delay-4 process-card group relative overflow-hidden rounded-[36px] border border-[#E8DED0] bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(251,247,239,0.95)_100%)] p-7 shadow-[0_14px_34px_rgba(183,155,108,0.08)] transition duration-500 hover:-translate-y-[3px] hover:shadow-[0_24px_52px_rgba(183,155,108,0.16)] lg:col-span-5 lg:min-h-[260px] lg:p-8 lg:self-end">
                  <div className="process-glow absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,155,108,0.12),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className="process-ring pointer-events-none absolute inset-0 rounded-[36px] ring-1 ring-transparent transition duration-500 group-hover:ring-[#D6BE92]/55" />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#A8874F]">
                        Betreuung
                      </div>
                    </div>
                    <div className="mt-3 h-px w-14 bg-[#D8C29A]" />
                    <h3 className="mt-5 max-w-[18rem] text-[27px] font-semibold leading-[1.08] text-[#6F6559] lg:text-[31px]">
                      Konstant im Alltag
                    </h3>
                    <p className="mt-5 max-w-[21rem] text-[15px] leading-7 text-[#8A7E70]">
                      Nach dem Start zählen kurze Wege, klare Kommunikation und ein Qualitätsniveau, das im Alltag dauerhaft gehalten wird.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="kontakt" className="bg-white py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:px-10">
            <div className="reveal lg:col-span-5 lg:pr-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#B79B6C]">
                Kontakt
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-[1.08] text-[#6F6559] lg:text-[48px]">
                Besichtigung anfragen
              </h2>
              <p className="mt-6 text-base leading-8 text-[#8A7E70]">
                Sie möchten Praxisräume, Büros oder ein Objekt in Berlin auf hohem Niveau betreuen lassen? Dann ist eine Besichtigung der sinnvollste erste Schritt. Auf dieser Grundlage erstellen wir ein präzise gefasstes Angebot mit nachvollziehbarem Leistungsumfang.
              </p>
              <p className="mt-6 text-base leading-8 text-[#8A7E70]">
                Teilen Sie uns die wichtigsten Eckdaten mit. Wir melden uns zeitnah zur Terminabstimmung.
              </p>
            </div>

            <form className="reveal delay-1 lg:col-span-7 rounded-[42px] border border-[#E6DDCF] bg-[linear-gradient(180deg,#FBF9F4_0%,#F3EFE7_100%)] p-8 shadow-[0_16px_42px_rgba(183,155,108,0.08)] lg:p-11">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field label="Name" type="text" placeholder="Ihr Name" />
                <Field label="Unternehmen" type="text" placeholder="Unternehmen" />
                <Field label="E-Mail" type="email" placeholder="name@unternehmen.de" />
                <Field label="Telefonnummer" type="tel" placeholder="Telefonnummer" />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-[#6F6559]">
                  Leistungsbereich
                </label>
                <select className="w-full rounded-2xl border border-[#E2D6C4] bg-white px-4 py-4 text-sm text-[#6F6559] outline-none transition focus:border-[#B79B6C]">
                  <option>Bitte auswählen</option>
                  <option>Praxis- & Büroreinigung</option>
                  <option>Treppenhaus- & Objektservice</option>
                  <option>Bauendreinigung</option>
                  <option>Sonstiges</option>
                </select>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-[#6F6559]">
                  Nachricht
                </label>
                <textarea
                  rows={6}
                  placeholder="Kurze Angaben zu Fläche, Objektart oder gewünschter Leistung"
                  className="w-full rounded-2xl border border-[#E2D6C4] bg-white px-4 py-4 text-sm text-[#6F6559] outline-none transition focus:border-[#B79B6C]"
                />
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex items-center rounded-full bg-[#B79B6C] px-6 py-4 text-sm font-semibold text-white transition hover:brightness-95"
              >
                Anfrage senden
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#F3EFE7] py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex items-start gap-4">            <div>
              <div className="text-sm font-semibold tracking-[0.22em] text-[#B79B6C]">
                NAUTILUS FACILITY CLEANING
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#9C8F7F]">
                Nautilus Facility Cleaning ist ein Geschäftsbereich der Nautilus Security UG (haftungsbeschränkt).
              </p>
            </div>
          </div>
          <div className="flex gap-6 text-sm text-[#9C8F7F]">
            <a href="#" className="transition hover:text-[#6F6559]">
              Impressum
            </a>
            <a href="#" className="transition hover:text-[#6F6559]">
              Datenschutz
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Field({
  label,
  type,
  placeholder,
}: {
  label: string
  type: string
  placeholder: string
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#6F6559]">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#E2D6C4] bg-white px-4 py-4 text-sm text-[#6F6559] outline-none transition focus:border-[#B79B6C]"
      />
    </div>
  )
}
