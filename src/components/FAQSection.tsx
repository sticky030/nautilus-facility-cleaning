import { useState } from 'react'

const faqs = [
  {
    question: 'Welche Reinigungsleistungen bietet Nautilus Facility Cleaning in Berlin an?',
    answer:
      'Wir übernehmen Büroreinigung, Praxisreinigung, Treppenhausreinigung, Unterhaltsreinigung, Bauendreinigung, Grundreinigung und Fensterreinigung für gewerbliche Objekte in Berlin.',
  },
  {
    question: 'In welchen Berliner Bezirken ist Nautilus Facility Cleaning tätig?',
    answer:
      'Unser Einsatzgebiet umfasst Lichtenberg, Marzahn, Friedrichshain, Prenzlauer Berg und Berlin-Mitte. So halten wir Wege kurz und können Einsätze verlässlich organisieren. Weitere Berliner Bezirke sind auf Anfrage ebenfalls möglich.',
  },
  {
    question: 'Reinigen Sie auch Arztpraxen und andere sensible Gewerbeobjekte?',
    answer:
      'Ja. Wir arbeiten für Arztpraxen, Büros und weitere gewerbliche Einheiten, in denen ein gepflegtes Umfeld, Diskretion und saubere Abläufe besonders wichtig sind.',
  },
  {
    question: 'Bieten Sie auch regelmäßige Unterhaltsreinigung an?',
    answer:
      'Ja. Die regelmäßige Unterhaltsreinigung gehört zu unseren Kernleistungen. Umfang, Intervalle und Einsatzzeiten stimmen wir so ab, dass die Reinigung sauber in den laufenden Betrieb passt.',
  },
  {
    question: 'Ist auch eine Treppenhausreinigung für kleinere und mittlere Objekte möglich?',
    answer:
      'Ja. Wir übernehmen die laufende Reinigung von Treppenhäusern, Eingangsbereichen und Gemeinschaftsflächen für kleinere und mittlere Wohn- und Gewerbeobjekte.',
  },
  {
    question: 'Übernehmen Sie auch Bauendreinigung nach Umbau oder Ausbau?',
    answer:
      'Ja. Wir übernehmen Bauendreinigung und Feinreinigung nach Umbau-, Ausbau- und Sanierungsarbeiten, damit Flächen sauber übergeben oder direkt genutzt werden können.',
  },
  {
    question: 'Ist die Besichtigung kostenlos?',
    answer:
      'Ja. Eine kurze Besichtigung vor Ort ist die Grundlage dafür, Leistungsumfang, Turnus und tatsächlichen Aufwand sauber einzuordnen. So kann das Angebot nachvollziehbar und passend auf das Objekt abgestimmt werden.',
  },
  {
    question: 'Sind Anfahrt und Reinigungsmittel bereits im Angebot enthalten?',
    answer:
      'Im Regelfall werden Anfahrt und Reinigungsmittel in die Kalkulation integriert und nicht separat als verdeckte Nebenkosten nachgeschoben. Maßgeblich ist das konkret abgestimmte Leistungsbild des Objekts.',
  },
  {
    question: 'Arbeiten Sie mit festen Ansprechpartnern und klaren Abläufen?',
    answer:
      'Ja. Entscheidend ist für uns nicht nur die Durchführung selbst, sondern auch eine nachvollziehbare Abstimmung, klare Zuständigkeiten und ein Standard, der im laufenden Betrieb verlässlich getragen wird.',
  },
  {
    question: 'Wie läuft eine Anfrage bei Nautilus Facility Cleaning ab?',
    answer:
      'Nach dem Erstkontakt klären wir die wichtigsten Eckdaten zum Objekt, zum gewünschten Leistungsumfang und zum Turnus. Wenn erforderlich, folgt eine kurze Besichtigung vor Ort. Anschließend erstellen wir ein passendes Angebot.',
  },
  {
    question: 'Wie schnell können Sie mit der Reinigung starten?',
    answer:
      'In vielen Fällen können wir kurzfristig starten. Der genaue Zeitpunkt hängt vom Objekt, dem Leistungsumfang und der gewünschten Frequenz ab.',
  },
  {
    question: 'Warum ist eine Besichtigung vor Angebotsabgabe sinnvoll?',
    answer:
      'Eine Besichtigung schafft Klarheit über Flächen, Nutzung und tatsächlichen Reinigungsbedarf. So lässt sich der Leistungsumfang realistisch einordnen und das Angebot sauber auf das Objekt abstimmen.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-[#F7F4EE] py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#B79B6C]">
            FAQ
          </p>
          <h2 className="mx-auto mt-4 max-w-[14ch] text-3xl font-semibold leading-[1.08] text-[#6F6559] lg:text-[48px]">
            Häufige Fragen
          </h2>
          <p className="mx-auto mt-6 max-w-[42rem] text-base leading-8 text-[#8A7E70]">
            Die wichtigsten Punkte zu Leistungen, Einsatzgebiet und Ablauf kompakt zusammengefasst.
          </p>
        </div>

        <div className="mt-14 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-[28px] border bg-white transition-all duration-300 ${
                  isOpen
                    ? 'border-[#D2B582] shadow-[0_18px_42px_rgba(183,155,108,0.10)]'
                    : 'border-[#E6DED1] shadow-[0_10px_24px_rgba(183,155,108,0.04)]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-start justify-between gap-6 px-6 py-6 text-left lg:px-8"
                >
                  <span className="max-w-[42rem] text-[17px] font-medium leading-8 text-[#6F6559] lg:text-[19px]">
                    {faq.question}
                  </span>

                  <span
                    className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-white text-[22px] leading-none transition-all duration-300 ${
                      isOpen
                        ? 'rotate-45 border-[#D2B582] text-[#8F6830]'
                        : 'border-[#E2D6C4] text-[#8C774E]'
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-7 pt-0 lg:px-8">
                    <div className="mb-5 h-px w-full bg-[#E9DFD0]" />
                    <p className="max-w-[42rem] text-[15px] leading-8 text-[#7E7367] lg:text-[16px]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
