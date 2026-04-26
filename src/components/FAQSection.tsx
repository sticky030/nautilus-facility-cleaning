import { useState } from 'react'

const faqs = [
  {
    question: "Wie sicher sind meine Objektschlüssel bei Ihnen?",
    answer: "Sicherheit und Vertrauen sind unsere Basis. Alle Schlüssel werden in einem protokollierten System verwaltet, sicher verwahrt und ausschließlich an das fest für Ihr Objekt eingeteilte Stammpersonal ausgegeben."
  },
  {
    question: "Ist die Besichtigung vor Ort für mich mit Kosten verbunden?",
    answer: "Nein. Die Erstberatung und die detaillierte Begehung Ihres Objekts in Berlin sind für Sie absolut kostenfrei und unverbindlich. Erst nach Ihrer Zustimmung zu unserem maßgeschneiderten Konzept entstehen Kosten."
  },
  {
    question: "In welchen Berliner Bezirken sind Sie genau tätig?",
    answer: "Wir konzentrieren uns auf die Bezirke Mitte, Pankow, Lichtenberg, Marzahn sowie Friedrichshain-Kreuzberg. Diese regionale Spezialisierung erlaubt uns maximale Flexibilität und kurze Reaktionszeiten."
  },
  {
    question: "Habe ich immer die gleichen Ansprechpartner vor Ort?",
    answer: "Ja. Wir arbeiten mit festen Teams. Das sorgt nicht nur für Vertrautheit und Diskretion, sondern stellt sicher, dass die spezifischen Anforderungen Ihres Objekts ohne ständige Neueinweisung erfüllt werden."
  },
  {
    question: "Was passiert, wenn bei der Reinigung ein Schaden entsteht?",
    answer: "Trotz höchster Sorgfalt sind wir für den Ernstfall perfekt abgesichert. Nautilus Facility Cleaning verfügt über eine umfassende Betriebshaftpflichtversicherung, die Schäden an Ihrem Inventar oder Gebäude vollständig abdeckt."
  },
  {
    question: "Können für mein Objekt auch ökologische Reinigungsmittel eingesetzt werden?",
    answer: "Selbstverständlich. Wir bieten auf Wunsch ein 'Green Cleaning' Konzept an. Dabei nutzen wir ausschließlich zertifizierte, umweltschonende Mittel, die ebenso effektiv wie materialschonend sind."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-white py-32 lg:py-40 border-b border-[#E5E1D8]/60 text-left text-[#6F6559]">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="reveal opacity-0 translate-y-10 transition-all duration-700 mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Details</p>
          <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">Häufige Fragen.</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="reveal opacity-0 translate-y-10 transition-all duration-700 border-b border-[#E5E1D8] last:border-0 overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="flex w-full items-center justify-between py-8 text-left group">
                <span className="text-[17px] font-medium text-[#2C2C2C] group-hover:text-[#B79B6C] transition-colors">{faq.question}</span>
                <span className={`ml-6 flex-shrink-0 text-[#B79B6C] transition-transform duration-300 ${openIndex === idx ? 'rotate-45' : ''}`}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </span>
              </button>
              <div className={`transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-[400px] pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-[16px] leading-8 text-[#7E7367]">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
