import { readFileSync, writeFileSync } from "node:fs";

const appFile = "src/App.tsx";
let app = readFileSync(appFile, "utf8");

// Clean duplicate private options in all homepage form selects.
app = app.replace(/(\s*<option>Privatperson \/ Wohnung<\/option>\n){2,}/g, "                            <option>Privatperson / Wohnung</option>\n");

// Add premium hero depth without adding trust cards.
app = app.replace(
  '<section id="start" className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#F3EFE7]">',
  '<section id="start" className="home-hero-premium relative isolate flex min-h-screen items-center overflow-hidden bg-[#F3EFE7]">'
);
app = app.replace(
  '<div className="absolute inset-0 bg-[linear-gradient(96deg,rgba(247,244,238,0.94)_0%,rgba(247,244,238,0.90)_36%,rgba(247,244,238,0.70)_64%,rgba(247,244,238,0.34)_100%)]" />',
  '<div className="absolute inset-0 bg-[linear-gradient(96deg,rgba(247,244,238,0.94)_0%,rgba(247,244,238,0.90)_36%,rgba(247,244,238,0.70)_64%,rgba(247,244,238,0.34)_100%)]" />\n          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_42%,rgba(183,155,108,0.18),transparent_34%),radial-gradient(circle_at_72%_28%,rgba(255,255,255,0.42),transparent_28%)]" />\n          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#F7F4EE] to-transparent" />'
);

// Upgrade service cards visually while keeping 3-column layout.
app = app.replace('{services.map((service) => (', '{services.map((service, index) => (');
app = app.replace(
  'className="reveal group scroll-mt-40 flex flex-col h-full bg-white rounded-xl border border-[#E5E1D8] p-8 lg:p-10 shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#B79B6C]/50 hover:shadow-[0_15px_40px_rgba(183,155,108,0.08)]"',
  'className="home-service-card reveal group relative scroll-mt-40 flex flex-col h-full overflow-hidden bg-white rounded-[28px] border border-[#E5E1D8] p-8 lg:p-10 shadow-[0_18px_55px_rgba(60,48,35,0.055)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#B79B6C]/60 hover:shadow-[0_30px_85px_rgba(60,48,35,0.10)]"'
);
app = app.replace(
  'className="home-service-card reveal group relative scroll-mt-40 flex flex-col h-full overflow-hidden bg-white rounded-2xl border border-[#E5E1D8] p-8 lg:p-10 shadow-[0_14px_45px_rgba(60,48,35,0.045)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#B79B6C]/55 hover:shadow-[0_24px_65px_rgba(183,155,108,0.13)]"',
  'className="home-service-card reveal group relative scroll-mt-40 flex flex-col h-full overflow-hidden bg-white rounded-[28px] border border-[#E5E1D8] p-8 lg:p-10 shadow-[0_18px_55px_rgba(60,48,35,0.055)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#B79B6C]/60 hover:shadow-[0_30px_85px_rgba(60,48,35,0.10)]"'
);

if (!app.includes('home-service-number')) {
  app = app.replace(
    '<div className="flex flex-col text-left">\n                    <div className="min-h-[28px] text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{service.eyebrow}</div>',
    '<div className="mb-8 flex items-center justify-between gap-4">\n                    <div className="min-h-[28px] text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{service.eyebrow}</div>\n                    <div className="home-service-number">{String(index + 1).padStart(2, \'0\')}</div>\n                  </div>\n                  <div className="flex flex-col text-left">'
  );
}

// Keep Why Nautilus balanced; undo any prior hierarchy experiment.
app = app.replace(
  'className="why-premium-card reveal bg-[#FCFBF8] rounded-2xl border border-[#E5E1D8] p-8 shadow-[0_12px_34px_rgba(60,48,35,0.045)] transition-all duration-500 hover:-translate-y-1 hover:border-[#B79B6C]/50 hover:shadow-[0_18px_44px_rgba(183,155,108,0.10)]"',
  'className="reveal bg-[#FCFBF8] rounded-xl border border-[#E5E1D8] p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#B79B6C]/50 hover:shadow-[0_10px_30px_rgba(183,155,108,0.08)]"'
);

writeFileSync(appFile, app, "utf8");

const cssFile = "src/index.css";
let css = readFileSync(cssFile, "utf8");

const block = `

/* ===== Homepage visual polish: hero and premium service cards ===== */
.home-hero-premium::after {
  content: "";
  position: absolute;
  left: 8%;
  bottom: 13%;
  width: min(520px, 46vw);
  height: 1px;
  background: linear-gradient(90deg, rgba(183,155,108,.75), rgba(183,155,108,0));
  pointer-events: none;
}

.home-service-card {
  isolation: isolate;
}

.home-service-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background:
    linear-gradient(180deg, rgba(255,255,255,.96), rgba(255,255,255,.78)),
    radial-gradient(circle at 84% 0%, rgba(183,155,108,.16), transparent 34%);
  pointer-events: none;
  z-index: -1;
}

.home-service-card::after {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 5px;
  background: linear-gradient(90deg, rgba(183,155,108,.95), rgba(183,155,108,.22), transparent 72%);
  opacity: .62;
  transition: opacity .35s ease;
}

.home-service-card:hover::after {
  opacity: 1;
}

.home-service-number {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid rgba(183,155,108,.32);
  background: #FCFBF8;
  color: #B79B6C;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 850;
  letter-spacing: .08em;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 12px 28px rgba(60,48,35,.055);
  transition: background .35s ease, color .35s ease, border-color .35s ease, transform .35s ease;
}

.home-service-card:hover .home-service-number {
  background: #B79B6C;
  color: #fff;
  border-color: #B79B6C;
  transform: translateY(-2px);
}

.home-service-card h3 {
  letter-spacing: -.045em;
}
`;

css = css.replace(/\n\/\* ===== Homepage visual polish: hero, services, why section ===== \*\/[\s\S]*?(?=\n\/\*|$)/, "");
css = css.replace(/\n\/\* ===== Homepage visual polish: hero and services only ===== \*\/[\s\S]*?(?=\n\/\*|$)/, "");
css = css.replace(/\n\/\* ===== Homepage visual polish: hero and premium service cards ===== \*\/[\s\S]*?(?=\n\/\*|$)/, "");
css += block;
writeFileSync(cssFile, css, "utf8");

console.log("Homepage visual system polished: premium service cards upgraded, hero depth kept, duplicate private option cleaned.");
