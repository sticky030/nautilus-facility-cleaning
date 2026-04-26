import { useState } from 'react';

const faqs = [
  {
    question: 'Wie sicher sind meine Objektschlüssel bei Ihnen?',
    answer: 'Sicherheit ist bei uns ein fester Prozess. Ihre Schlüssel werden anonymisiert und in einem gesicherten System verwaltet. Die Übergabe erfolgt ausschließlich an Ihr festes Stammpersonal gegen Protokoll. So behalten Sie jederzeit die volle Kontrolle.'
  },
  {
    question: 'Ist die Besichtigung vor Ort für mich mit Kosten verbunden?',
    answer: 'Nein. Wir verstehen uns als Partner auf Augenhöhe. Eine professionelle Erstbesichtigung ist für uns die Basis für ein faires und exakt kalkuliertes Angebot. Dieser Service ist für Sie vollkommen kostenfrei und unverbindlich.'
  },
  {
    question: 'In welchen Berliner Bezirken sind Sie genau tätig?',
    answer: 'Um unsere hohen Qualitätsstandards und absolute Pünktlichkeit zu garantieren, konzentrieren wir uns auf die Bezirke Mitte, Prenzlauer Berg, Friedrichshain, Lichtenberg und Marzahn. Weitere Bezirke bedienen wir gerne auf individuelle Anfrage.'
  },
  {
    question: 'Habe ich immer die gleichen Ansprechpartner vor Ort?',
    answer: 'Ja. Kontinuität ist der Kern unserer Qualität. Sie erhalten ein festes Team, das Ihre Räumlichkeiten und individuellen Wünsche genau kennt. Das sorgt für konstante Ergebnisse und ein vertrauensvolles Miteinander.'
  },
  {
    question: 'Was passiert, wenn bei der Reinigung ein Schaden entsteht?',
    answer: 'Wo gearbeitet wird, können Fehler passieren – entscheidend ist der Umgang damit. Nautilus ist umfassend betriebshaftpflichtversichert. Wir kommunizieren Vorfälle sofort proaktiv und kümmern uns um die komplette Regulierung, ohne dass Sie Aufwand haben.'
  },
  {
    question: 'Können für mein Objekt auch ökologische Reinigungsmittel eingesetzt werden?',
    answer: 'Nachhaltigkeit ist ein wesentlicher Teil unseres Qualitätsanspruchs. Auf Wunsch setzen wir gezielt zertifizierte, ökologische Reinigungsprodukte ein. Diese sind besonders schadstoffarm und materialschonend, wodurch wir nicht nur die Umwelt entlasten, sondern auch ein gesundes, frisches Raumklima für Ihre Mitarbeiter und Kunden sicherstellen.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[#F7F4EE] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-[#B79B6C] uppercase tracking-widest">FAQ</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-[#2C2C2C] sm:text-5xl">Häufige Fragen</p>
        </div>
        <div className="mx-auto max-w-3xl mt-20 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`bg-white rounded-2xl shadow-sm border transition-colors duration-300 ${
                  isOpen ? 'border-[#B79B6C]' : 'border-[#E5E1D8] hover:border-[#B79B6C]/50'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between px-8 py-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-semibold text-[#2C2C2C] pr-4">{faq.question}</span>
                  <span
                    className={`ml-6 flex items-center justify-center shrink-0 h-8 w-8 rounded-full border transition-all duration-300 ${
                      isOpen
                        ? 'border-[#B79B6C] bg-[#B79B6C] text-white'
                        : 'border-[#B79B6C]/40 text-[#B79B6C]'
                    }`}
                  >
                    <svg
                      className={`h-5 w-5 transition-transform duration-300 ease-in-out ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 px-8 text-base leading-7 text-[#8A7E70]">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
