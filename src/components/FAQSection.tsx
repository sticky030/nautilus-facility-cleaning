import React, { useState } from 'react'

const faqs = [
  {
    question: "In welchen Gebieten in Berlin sind Sie tätig?",
    answer: "Unser primärer Fokus liegt auf Objekten in Berlin Mitte, Pankow, Lichtenberg, Marzahn sowie Friedrichshain-Kreuzberg. Durch diese regionale Konzentration garantieren wir kurze Reaktionszeiten und eine persönliche Betreuung vor Ort."
  },
  {
    question: "Bieten Sie spezialisierte Praxis- & Kanzleireinigung an?",
    answer: "Ja. Wir verstehen die besonderen Anforderungen an Hygiene, Diskretion und den Schutz sensibler Daten, die in medizinischen Einrichtungen und Notariaten an erster Stelle stehen."
  },
  {
    question: "Wie wird die Qualität der Reinigung sichergestellt?",
    answer: "Durch fest zugewiesenes Stammpersonal, regelmäßige Audits durch unsere Objektleiter und klare Leistungsverzeichnisse sichern wir einen konstant hohen Standard für jedes Objekt."
  },
  {
    question: "Können Reinigungszeiten individuell vereinbart werden?",
    answer: "Selbstverständlich. Wir passen unsere Einsatzzeiten nahtlos an Ihren Praxis- oder Kanzleialltag an – ob vor den Öffnungszeiten, am Abend oder in den frühen Morgenstunden."
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
            <div key={idx} className="reveal opacity-0 translate-y-10 transition-all duration-1000 border-b border-[#E5E1D8] last:border-0 overflow-hidden" style={{ transitionDelay: `${idx * 100}ms` }}>
              <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="flex w-full items-center justify-between py-8 text-left group">
                <span className="text-[17px] font-medium text-[#2C2C2C] group-hover:text-[#B79B6C] transition-colors">{faq.question}</span>
                <span className={`ml-6 flex-shrink-0 text-[#B79B6C] transition-transform duration-300 ${openIndex === idx ? 'rotate-45' : ''}`}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </span>
              </button>
              <div className={`transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-[300px] pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-[16px] leading-8 text-[#7E7367]">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
