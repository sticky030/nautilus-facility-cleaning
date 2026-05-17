import { readFileSync, writeFileSync } from "node:fs";

const appFile = "src/App.tsx";
let app = readFileSync(appFile, "utf8");

const start = app.indexOf("        {/* ABLAUF */}");
const end = app.indexOf("\n\n        <FAQSection />", start);

if (start === -1 || end === -1) {
  throw new Error("Homepage Ablauf section not found");
}

const newSection = `        {/* ABLAUF */}
        <section id="ablauf" className="bg-white py-32 lg:py-40 border-b border-[#E5E1D8]/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 text-left">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-start">
              <div className="reveal lg:col-span-5 lg:pr-8 sticky top-32 lg:top-40 self-start text-left">
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">Ablauf & Prozesse</p>
                <h2 className="mt-6 text-3xl font-semibold leading-[1.08] text-[#2C2C2C] lg:text-[46px]">Vom ersten Kontakt bis zur unsichtbaren Routine.</h2>
                <p className="mt-8 text-[17px] leading-8 text-[#8A7E70]">
                  Ein Wechsel des Dienstleisters muss geräuschlos funktionieren. Der Ablauf ist deshalb bewusst klar geführt: Anfrage, Einordnung, Angebot und Start greifen sauber ineinander.
                </p>
              </div>

              <div className="reveal lg:col-span-7">
                <div className="connected-process" aria-label="Ablauf von der Anfrage bis zum Start">
                  <div className="connected-process-head">
                    <p>Ablauf</p>
                    <h3>Von der Anfrage zum laufenden Auftrag.</h3>
                  </div>

                  {[
                    { num: '01', title: 'Bedarf klären', text: 'Objektart, Fläche, Turnus und Zeitfenster kurz mitteilen – per Formular, WhatsApp oder Anruf.' },
                    { num: '02', title: 'Kostenfreie Besichtigung', text: 'Bei Bedarf prüfen wir das Objekt vor Ort und ordnen Aufwand und Leistungsumfang realistisch ein.' },
                    { num: '03', title: 'Angebot erhalten', text: 'Sie erhalten ein schriftliches Angebot mit klar abgegrenztem Leistungsumfang und nachvollziehbarer Objektlogik.' },
                    { num: '04', title: 'Reinigung starten', text: 'Nach Freigabe erfolgt die Umsetzung im abgestimmten Zeitfenster – verlässlich, ruhig und klar kommuniziert.' }
                  ].map((item, index) => (
                    <div className="connected-step" style={{ ['--step-index' as string]: index }} key={item.num}>
                      <div className="connected-left">
                        <div className="connected-dot">{item.num}</div>
                        {index < 3 ? <div className="connected-segment"><span /></div> : null}
                      </div>
                      <div className="connected-right">
                        <h4>{item.title}</h4>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>`;

app = app.slice(0, start) + newSection + app.slice(end);
writeFileSync(appFile, app, "utf8");

const cssFile = "src/index.css";
let css = readFileSync(cssFile, "utf8");
const cssBlock = `

/* ===== Homepage connected Ablauf test ===== */
.connected-process {
  position: relative;
  border: 1px solid #E5E1D8;
  border-radius: 28px;
  background: #FCFBF8;
  padding: 40px 34px;
  box-shadow: 0 24px 70px rgba(60,48,35,.07);
  overflow: hidden;
}
.connected-process::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(183,155,108,.11), transparent 46%);
  pointer-events: none;
}
.connected-process-head {
  position: relative;
  margin-bottom: 34px;
}
.connected-process-head p {
  margin: 0 0 8px;
  color: #B79B6C;
  font-size: 11px;
  font-weight: 850;
  letter-spacing: .28em;
  text-transform: uppercase;
}
.connected-process-head h3 {
  margin: 0;
  color: #2C2C2C;
  font-size: 24px;
  line-height: 1.2;
  letter-spacing: -0.035em;
}
.connected-step {
  position: relative;
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 22px;
  opacity: 0;
  transform: translate3d(0, 18px, 0);
  animation: connectedStepIn .48s cubic-bezier(.22,1,.36,1) forwards;
  animation-delay: calc(.18s + var(--step-index) * .52s);
}
.connected-left {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.connected-dot {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid rgba(183,155,108,.35);
  background: #fff;
  color: #B79B6C;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 850;
  letter-spacing: .08em;
  box-shadow: 0 12px 28px rgba(183,155,108,.12);
  animation: connectedDotGold .38s ease forwards;
  animation-delay: calc(.24s + var(--step-index) * .52s);
}
.connected-segment {
  position: relative;
  width: 2px;
  min-height: 58px;
  flex: 1;
  background: #E5E1D8;
  overflow: hidden;
  margin: 0 auto;
}
.connected-segment span {
  position: absolute;
  inset: 0 0 auto 0;
  height: 0;
  background: #B79B6C;
  animation: connectedLineFill .42s cubic-bezier(.4,0,.2,1) forwards;
  animation-delay: calc(.46s + var(--step-index) * .52s);
}
.connected-right {
  padding: 2px 0 30px;
}
.connected-step:last-child .connected-right {
  padding-bottom: 0;
}
.connected-right h4 {
  margin: 0 0 8px;
  color: #2C2C2C;
  font-size: 18px;
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: -0.025em;
}
.connected-right p {
  margin: 0;
  color: #7E7367;
  font-size: 14px;
  line-height: 1.75;
  max-width: 58ch;
}
@keyframes connectedStepIn { to { opacity: 1; transform: translate3d(0,0,0); } }
@keyframes connectedLineFill { to { height: 100%; } }
@keyframes connectedDotGold { to { background: #B79B6C; color: #fff; border-color: #B79B6C; } }
@media (prefers-reduced-motion: reduce) {
  .connected-step, .connected-dot, .connected-segment span { animation: none; opacity: 1; transform: none; height: auto; }
  .connected-segment span { height: 100%; }
}
@media (max-width: 760px) {
  .connected-process { padding: 30px 22px; }
  .connected-step { grid-template-columns: 38px 1fr; gap: 18px; }
  .connected-dot { width: 38px; height: 38px; }
}
`;

if (!css.includes("Homepage connected Ablauf test")) {
  css += cssBlock;
  writeFileSync(cssFile, css, "utf8");
}

console.log("Homepage connected Ablauf test applied.");
`;

if (!css.includes("Homepage connected Ablauf test")) {
  css += cssBlock;
  writeFileSync(cssFile, css, "utf8");
}

console.log("Homepage connected Ablauf test applied.");
