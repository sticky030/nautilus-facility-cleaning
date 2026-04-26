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
    <section id="faq" className="bg-[#F7F4EE] py-32 lg:py-40 border-b border-[#E5E1D8]/60">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        
        <div className="reveal mb-16 flex flex-col items-center text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">FAQ</p>
          <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">Häufige Fragen.</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="reveal bg-white border border-[#E5E1D8]/80 rounded-[32px] shadow-[0_8px_24px_rgba(0,0,0,0.03)] transition-all duration-500 hover:border-[#B79B6C]/40 hover:shadow-[0_24px_50px_rgba(183,155,108,0.1)] hover:-translate-y-1.5">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)} 
                className="flex w-full items-center justify-between p-7 sm:p-9 text-left group"
              >
                <span className="text-[17px] font-semibold text-[#2C2C2C] group-hover:text-[#B79B6C] transition-colors pr-6">
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full border border-[#D9CCB8] text-[#B79B6C] transition-all duration-500 ${openIndex === idx ? 'bg-[#B79B6C] text-white rotate-180 border-[#B79B6C]' : 'bg-transparent'}`}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
              </button>
              
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === idx ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-7 sm:px-9 pb-9 text-[16px] leading-8 text-[#7E7367] border-t border-[#E5E1D8]/50 pt-7 text-left whitespace-pre-line">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
