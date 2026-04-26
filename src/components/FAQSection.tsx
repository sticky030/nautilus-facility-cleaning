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
  return (
    <section id="faq" className="bg-[#F7F4EE] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-[#B79B6C] uppercase tracking-widest">FAQ</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-[#2C2C2C] sm:text-5xl">Häufige Fragen</p>
        </div>
        <dl className="mt-20 space-y-8">
          {faqs.map((faq) => (
            <div key={faq.question} className="bg-white p-8 rounded-2xl shadow-sm border border-[#E5E1D8]">
              <dt className="text-lg font-semibold leading-7 text-[#2C2C2C]">{faq.question}</dt>
              <dd className="mt-4 text-base leading-7 text-[#8A7E70]">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
