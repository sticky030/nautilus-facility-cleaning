import { useState } from "react"

const faqs = [
  {
    question: "Welche Reinigungsleistungen bietet Nautilus Facility Cleaning in Berlin an?",
    answer:
      "Wir übernehmen Büroreinigung, Praxisreinigung, Treppenhausreinigung, Unterhaltsreinigung, Bauendreinigung, Grundreinigung und Fensterreinigung für gewerbliche Objekte in Berlin.",
  },
  {
    question: "In welchen Berliner Bezirken ist Nautilus Facility Cleaning tätig?",
    answer:
      "Unser Einsatzgebiet umfasst Lichtenberg, Marzahn, Friedrichshain, Prenzlauer Berg und Mitte. Weitere Bereiche übernehmen wir auf Anfrage.",
  },
  {
    question: "Reinigen Sie auch Arztpraxen und andere sensible Gewerbeobjekte?",
    answer:
      "Ja. Wir arbeiten für Arztpraxen, Büros und weitere gewerbliche Einheiten, in denen ein gepflegtes Umfeld, Diskretion und saubere Abläufe besonders wichtig sind.",
  },
  {
    question: "Bieten Sie auch regelmäßige Unterhaltsreinigung an?",
    answer:
      "Ja. Die regelmäßige Unterhaltsreinigung gehört zu unseren Kernleistungen. Umfang, Intervalle und Einsatzzeiten stimmen wir so ab, dass die Reinigung sauber in den laufenden Betrieb passt.",
  },
  {
    question: "Ist auch eine Treppenhausreinigung für kleinere und mittlere Objekte möglich?",
    answer:
      "Ja. Wir übernehmen die laufende Reinigung von Treppenhäusern, Eingangsbereichen und Gemeinschaftsflächen für kleinere und mittlere Wohn- und Gewerbeobjekte.",
  },
  {
    question: "Übernehmen Sie auch Bauendreinigung nach Umbau oder Ausbau?",
    answer:
      "Ja. Wir übernehmen Bauendreinigung und Feinreinigung nach Umbau-, Ausbau- und Sanierungsarbeiten, damit Flächen sauber übergeben oder direkt genutzt werden können.",
  },
  {
    question: "Wie läuft eine Anfrage bei Nautilus Facility Cleaning ab?",
    answer:
      "Nach dem Erstkontakt klären wir die wichtigsten Eckdaten zum Objekt, zum gewünschten Leistungsumfang und zum Turnus. Wenn erforderlich, folgt eine kurze Besichtigung vor Ort. Anschließend erstellen wir ein passendes Angebot.",
  },
  {
    question: "Warum ist eine Besichtigung vor Angebotsabgabe sinnvoll?",
    answer:
      "Eine Besichtigung schafft Klarheit über Flächen, Nutzung und tatsächlichen Reinigungsbedarf. So lässt sich der Leistungsumfang realistisch einordnen und das Angebot sauber auf das Objekt abstimmen.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-[#F7F4EE] py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#B79B6C]">
            FAQ
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.08] text-[#6F6559] lg:text-[48px]">
            Häufige Fragen
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-[28px] border border-[#E6DDCF] bg-white"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-[17px] font-medium text-[#6F6559]">
                    {faq.question}
                  </span>

                  <span
                    className={`text-xl transition ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-[15px] leading-7 text-[#8A7E70]">
                    {faq.answer}
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
