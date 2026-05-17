import { readFileSync, writeFileSync } from "node:fs";

const appFile = "src/App.tsx";
let app = readFileSync(appFile, "utf8");

// Clean duplicate private options in all homepage form selects.
app = app.replace(/(\s*<option>Privatperson \/ Wohnung<\/option>\n){2,}/g, "                            <option>Privatperson / Wohnung</option>\n");

// Keep the original hero video look: remove extra hero gold/radial overlays from previous polish.
app = app.replace(/\n\s*<div className="pointer-events-none absolute inset-0 bg-\[radial-gradient\(circle_at_18%_42%,rgba\(183,155,108,0\.18\),transparent_34%\),radial-gradient\(circle_at_72%_28%,rgba\(255,255,255,0\.42\),transparent_28%\)\]" \/>/g, "");
app = app.replace(/\n\s*<div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-\[#F7F4EE\] to-transparent" \/>/g, "");

// Keep service cards premium, but remove numeric badges.
app = app.replace('{services.map((service, index) => (', '{services.map((service) => (');
app = app.replace(
  'className="reveal group scroll-mt-40 flex flex-col h-full bg-white rounded-xl border border-[#E5E1D8] p-8 lg:p-10 shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#B79B6C]/50 hover:shadow-[0_15px_40px_rgba(183,155,108,0.08)]"',
  'className="home-service-card reveal group relative scroll-mt-40 flex flex-col h-full overflow-hidden bg-white rounded-[28px] border border-[#E5E1D8] p-8 lg:p-10 shadow-[0_18px_55px_rgba(60,48,35,0.055)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#B79B6C]/60 hover:shadow-[0_30px_85px_rgba(60,48,35,0.10)]"'
);
app = app.replace(
  'className="home-service-card reveal group relative scroll-mt-40 flex flex-col h-full overflow-hidden bg-white rounded-2xl border border-[#E5E1D8] p-8 lg:p-10 shadow-[0_14px_45px_rgba(60,48,35,0.045)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#B79B6C]/55 hover:shadow-[0_24px_65px_rgba(183,155,108,0.13)]"',
  'className="home-service-card reveal group relative scroll-mt-40 flex flex-col h-full overflow-hidden bg-white rounded-[28px] border border-[#E5E1D8] p-8 lg:p-10 shadow-[0_18px_55px_rgba(60,48,35,0.055)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#B79B6C]/60 hover:shadow-[0_30px_85px_rgba(60,48,35,0.10)]"'
);

// Remove badge header that may have been injected earlier and restore simple eyebrow inside the content column.
app = app.replace(
  '<div className="mb-8 flex items-center justify-between gap-4">\n                    <div className="min-h-[28px] text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{service.eyebrow}</div>\n                    <div className="home-service-number">{String(index + 1).padStart(2, \'0\')}</div>\n                  </div>\n                  <div className="flex flex-col text-left">',
  '<div className="flex flex-col text-left">\n                    <div className="min-h-[28px] text-[10px] font-bold uppercase tracking-[0.35em] text-[#B79B6C]">{service.eyebrow}</div>'
);

// Keep Why Nautilus balanced; undo any prior hierarchy experiment.
app = app.replace(
  'className="why-premium-card reveal bg-[#FCFBF8] rounded-2xl border border-[#E5E1D8] p-8 shadow-[0_12px_34px_rgba(60,48,35,0.045)] transition-all duration-500 hover:-translate-y-1 hover:border-[#B79B6C]/50 hover:shadow-[0_18px_44px_rgba(183,155,108,0.10)]"',
  'className="reveal bg-[#FCFBF8] rounded-xl border border-[#E5E1D8] p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#B79B6C]/50 hover:shadow-[0_10px_30px_rgba(183,155,108,0.08)]"'
);

writeFileSync(appFile, app, "utf8");

const cssFile = "src/index.css";
let css = readFileSync(cssFile, "utf8");

const block = `

/* ===== Homepage visual polish: premium service cards only ===== */
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
    radial-gradient(circle at 84% 0%, rgba(183,155,108,.12), transparent 34%);
  pointer-events: none;
  z-index: -1;
}

.home-service-card::after {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 4px;
  background: linear-gradient(90deg, rgba(183,155,108,.72), rgba(183,155,108,.16), transparent 72%);
  opacity: .54;
  transition: opacity .35s ease;
}

.home-service-card:hover::after {
  opacity: .92;
}

.home-service-card h3 {
  letter-spacing: -.045em;
}
`;

css = css.replace(/\n\/\* ===== Homepage visual polish: hero, services, why section ===== \*\/[\s\S]*?(?=\n\/\*|$)/, "");
css = css.replace(/\n\/\* ===== Homepage visual polish: hero and services only ===== \*\/[\s\S]*?(?=\n\/\*|$)/, "");
css = css.replace(/\n\/\* ===== Homepage visual polish: hero and premium service cards ===== \*\/[\s\S]*?(?=\n\/\*|$)/, "");
css = css.replace(/\n\/\* ===== Homepage visual polish: premium service cards only ===== \*\/[\s\S]*?(?=\n\/\*|$)/, "");
css += block;
writeFileSync(cssFile, css, "utf8");

console.log("Homepage visual system polished: service badges removed, hero gold overlay removed, premium service cards kept.");
