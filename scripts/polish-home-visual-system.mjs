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
app = app.replace(
  'className="reveal group scroll-mt-40 flex flex-col h-full bg-white rounded-xl border border-[#E5E1D8] p-8 lg:p-10 shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#B79B6C]/50 hover:shadow-[0_15px_40px_rgba(183,155,108,0.08)]"',
  'className="home-service-card reveal group relative scroll-mt-40 flex flex-col h-full overflow-hidden bg-white rounded-2xl border border-[#E5E1D8] p-8 lg:p-10 shadow-[0_14px_45px_rgba(60,48,35,0.045)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#B79B6C]/55 hover:shadow-[0_24px_65px_rgba(183,155,108,0.13)]"'
);

// Give Why Nautilus cards a stronger premium hierarchy without changing the section structure.
app = app.replace(
  'className="reveal bg-[#FCFBF8] rounded-xl border border-[#E5E1D8] p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#B79B6C]/50 hover:shadow-[0_10px_30px_rgba(183,155,108,0.08)]"',
  'className="why-premium-card reveal bg-[#FCFBF8] rounded-2xl border border-[#E5E1D8] p-8 shadow-[0_12px_34px_rgba(60,48,35,0.045)] transition-all duration-500 hover:-translate-y-1 hover:border-[#B79B6C]/50 hover:shadow-[0_18px_44px_rgba(183,155,108,0.10)]"'
);

writeFileSync(appFile, app, "utf8");

const cssFile = "src/index.css";
let css = readFileSync(cssFile, "utf8");

const block = `

/* ===== Homepage visual polish: hero, services, why section ===== */
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

.home-service-card::before {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 4px;
  background: linear-gradient(90deg, #B79B6C, rgba(183,155,108,.18), transparent);
  opacity: .72;
}

.home-service-card::after {
  content: "";
  position: absolute;
  top: -90px;
  right: -90px;
  width: 190px;
  height: 190px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(183,155,108,.12), transparent 68%);
  opacity: 0;
  transition: opacity .45s ease, transform .45s ease;
  pointer-events: none;
}

.home-service-card:hover::after {
  opacity: 1;
  transform: translate3d(-10px, 10px, 0);
}

.why-premium-card:first-child {
  background: #2C2C2C;
  border-color: rgba(44,44,44,.9);
  box-shadow: 0 26px 70px rgba(44,44,44,.14);
}

.why-premium-card:first-child div,
.why-premium-card:first-child p {
  color: rgba(255,255,255,.84) !important;
}

.why-premium-card:first-child div:first-child {
  color: #D8BD8A !important;
}

@media (min-width: 640px) {
  .why-premium-card:first-child {
    grid-column: span 2;
  }
}
`;

css = css.replace(/\n\/\* ===== Homepage visual polish: hero, services, why section ===== \*\/[\s\S]*?(?=\n\/\*|$)/, "");
css += block;
writeFileSync(cssFile, css, "utf8");

console.log("Homepage visual system polished: hero depth, service accents, why section hierarchy and duplicate private option cleaned.");
