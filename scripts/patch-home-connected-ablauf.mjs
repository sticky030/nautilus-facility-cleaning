import { readFileSync, writeFileSync } from "node:fs";

const appFile = "src/App.tsx";
let app = readFileSync(appFile, "utf8");

// Remove accidental duplicate state declarations from prior non-idempotent runs.
app = app.replace(/\n\s*const \[processActive, setProcessActive\] = useState\(false\);/g, "");
app = app.replace(
  "  const [loading, setLoading] = useState(false);",
  "  const [loading, setLoading] = useState(false);\n  const [processActive, setProcessActive] = useState(false);"
);

const effectMarker = "  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {";
const processEffect = `  useEffect(() => {
    let played = false;

    const checkProcessCenter = () => {
      if (played) return;
      const box = document.querySelector('.connected-process');
      if (!box) return;

      const rect = box.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const viewportCenter = viewport / 2;
      const boxCenter = rect.top + rect.height / 2;
      const distance = Math.abs(boxCenter - viewportCenter);
      const tolerance = Math.min(70, viewport * 0.08);
      const readable = rect.top > viewport * 0.08 && rect.bottom < viewport * 0.96;

      if (readable && distance <= tolerance) {
        played = true;
        setProcessActive(true);
      }
    };

    window.addEventListener('scroll', checkProcessCenter, { passive: true });
    window.addEventListener('resize', checkProcessCenter);
    requestAnimationFrame(checkProcessCenter);

    return () => {
      window.removeEventListener('scroll', checkProcessCenter);
      window.removeEventListener('resize', checkProcessCenter);
    };
  }, []);

`;

// Remove any older injected copies, then insert one clean copy.
app = app.replace(/\n\s*useEffect\(\(\) => \{\n\s*let played = false;[\s\S]*?\n\s*\}, \[\]\);\n\n(?=\s*const handleSubmit)/, "\n");
app = app.replace(effectMarker, processEffect + effectMarker);

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
                <div className={\`connected-process \${processActive ? 'run-connected' : ''}\`} aria-label="Ablauf von der Anfrage bis zum Start">
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
.connected-process-head { position: relative; margin-bottom: 34px; }
.connected-process-head p { margin: 0 0 8px; color: #B79B6C; font-size: 11px; font-weight: 850; letter-spacing: .28em; text-transform: uppercase; }
.connected-process-head h3 { margin: 0; color: #2C2C2C; font-size: 24px; line-height: 1.2; letter-spacing: -0.035em; }
.connected-step { position: relative; display: grid; grid-template-columns: 42px 1fr; gap: 22px; opacity: 1; transform: none; }
.connected-right h4 { margin: 0 0 8px; color: #9A8D7D; font-size: 18px; line-height: 1.25; font-weight: 700; letter-spacing: -0.025em; }
.connected-right p { margin: 0; color: #7E7367; font-size: 14px; line-height: 1.75; max-width: 58ch; opacity: .34; transform: translate3d(0, 8px, 0); }
.connected-left { display: flex; flex-direction: column; align-items: center; }
.connected-dot { width: 42px; height: 42px; border-radius: 999px; border: 1px solid rgba(183,155,108,.28); background: #fff; color: #B79B6C; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 850; letter-spacing: .08em; }
.connected-segment { position: relative; width: 2px; min-height: 58px; flex: 1; background: #E5E1D8; overflow: hidden; margin: 0 auto; }
.connected-segment span { position: absolute; inset: 0 0 auto 0; height: 0; background: #B79B6C; }
.connected-right { padding: 2px 0 30px; }
.connected-step:last-child .connected-right { padding-bottom: 0; }
.connected-process.run-connected .connected-right h4 { animation: connectedTitleIn .45s ease forwards; animation-delay: calc(.28s + var(--step-index) * 1.05s); }
.connected-process.run-connected .connected-right p { animation: connectedTextIn .52s ease forwards; animation-delay: calc(.38s + var(--step-index) * 1.05s); }
.connected-process.run-connected .connected-dot { animation: connectedDotGold .52s ease forwards, connectedDotPulse 1.05s ease 1; animation-delay: calc(.18s + var(--step-index) * 1.05s), calc(.18s + var(--step-index) * 1.05s); }
.connected-process.run-connected .connected-segment span { animation: connectedLineFill .86s cubic-bezier(.4,0,.2,1) forwards; animation-delay: calc(.62s + var(--step-index) * 1.05s); }
@keyframes connectedTextIn { to { opacity: 1; transform: translate3d(0,0,0); } }
@keyframes connectedTitleIn { to { color:#2C2C2C; } }
@keyframes connectedLineFill { to { height: 100%; } }
@keyframes connectedDotGold { to { background: #B79B6C; color: #fff; border-color: #B79B6C; } }
@keyframes connectedDotPulse { 0% { box-shadow:0 0 0 0 rgba(183,155,108,.55), 0 12px 28px rgba(183,155,108,.12); transform:scale(1); } 38% { box-shadow:0 0 0 16px rgba(183,155,108,.18), 0 18px 38px rgba(183,155,108,.24); transform:scale(1.08); } 100% { box-shadow:0 0 0 24px rgba(183,155,108,0), 0 12px 28px rgba(183,155,108,.16); transform:scale(1); } }
@media (prefers-reduced-motion: reduce) { .connected-right h4 { color:#2C2C2C; } .connected-right p { opacity:1; transform:none; } .connected-dot { background:#B79B6C; color:#fff; border-color:#B79B6C; } .connected-segment span { height:100%; } }
@media (max-width: 760px) { .connected-process { padding: 30px 22px; } .connected-step { grid-template-columns: 38px 1fr; gap: 18px; } .connected-dot { width: 38px; height: 38px; } }
`;

// Replace older versions of this CSS block instead of appending duplicates.
css = css.replace(/\n\/\* ===== Homepage connected Ablauf test ===== \*\/[\s\S]*?(?=\n\/\*|$)/, "");
css += cssBlock;
writeFileSync(cssFile, css, "utf8");

console.log("Homepage connected Ablauf test applied with idempotent React center trigger.");
