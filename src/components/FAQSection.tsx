import { useState } from 'react'

const faqs = [
  {
    question: "Wie sicher sind meine Objektschlüssel bei Ihnen?",
    answer: "Sicherheit und Diskretion sind unser höchstes Gebot. Alle uns anvertrauten Schlüssel werden in einem protokollierten Schließsystem verwaltet und ausschließlich an das fest für Ihr Objekt eingeteilte Stammpersonal ausgegeben."
  },
  {
    question: "Ist die Besichtigung vor Ort für mich mit Kosten verbunden?",
    answer: "Nein. Die Erstberatung und die detaillierte Objektbegehung in Berlin sind für Sie vollkommen kostenfrei und unverbindlich. Wir erstellen auf dieser Basis ein maßgeschneidertes Konzept für Ihren Bedarf."
  },
  {
    question: "In welchen Berliner Bezirken sind Sie genau tätig?",
    answer: "Wir betreuen Objekte in Mitte, Pankow, Lichtenberg, Marzahn sowie Friedrichshain-Kreuzberg. Diese lokale Fokussierung ermöglicht uns kurze Wege und eine maximale Zuverlässigkeit vor Ort."
  },
  {
    question: "Habe ich immer die gleichen Ansprechpartner vor Ort?",
    answer: "Ja. Wir arbeiten konsequent mit festen Teams. Das schafft Vertrauen, sichert die Diskretion und erspart Ihnen die ständige Neueinweisung von wechselndem Personal."
  },
  {
    question: "Was passiert, wenn bei der Reinigung ein Schaden entsteht?",
    answer: "Trotz höchster Präzision sind wir für den Ernstfall abgesichert. Nautilus Facility Cleaning verfügt über eine umfassende Betriebshaftpflichtversicherung, die eventuelle Schäden an Ihrem Inventar vollständig abdeckt."
  },
  {
    question: "Können für mein Objekt auch ökologische Reinigungsmittel eingesetzt werden?",
    answer: "Selbstverständlich. Auf Wunsch setzen wir ein 'Green Cleaning' Konzept um. Dabei verwenden wir ausschließlich zertifizierte, umweltschonende Produkte, die effektiv und materialschonend zugleich sind."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-white py-32 lg:py-40 border-b border-[#E5E1D8]/60 text-left">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">FAQ</p>
          <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">Häufige Fragen.</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="reveal opacity-0 translate-y-10 transition-all duration-700 border-b border-[#E5E1D8] last:border-0 overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)} 
                className="flex w-full items-center justify-between py-8 text-left group"
              >
                <span className="text-[17px] font-medium text-[#2C2C2C] group-hover:text-[#B79B6C] transition-colors italic">
                  {faq.question}
                </span>
                <span className={`ml-6 flex-shrink-0 text-[#B79B6C] transition-transform duration-500 ${openIndex === idx ? 'rotate-45' : ''}`}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              <div className={`transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-[400px] pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-[16px] leading-8 text-[#7E7367] max-w-2xl">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
