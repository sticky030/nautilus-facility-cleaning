import { readFileSync, writeFileSync } from "node:fs";

const appFile = "src/App.tsx";
let app = readFileSync(appFile, "utf8");

app = app.replace(
  'className="home-services-bento grid grid-cols-1 gap-8 lg:grid-cols-6"',
  'className="grid grid-cols-1 gap-8 lg:grid-cols-3"'
);

// Premium select styling for homepage form.
const oldSelectClass = 'className="w-full appearance-none rounded-lg border border-[#E5E1D8] bg-[#FCFBF8] px-5 py-3 pr-12 text-[15px] text-[#2C2C2C] outline-none transition-all duration-300 focus:border-[#B79B6C] cursor-pointer"';
const newSelectClass = 'className="w-full appearance-none rounded-xl border border-[#E5E1D8] bg-white px-5 py-4 pr-12 text-[15px] font-medium text-[#2C2C2C] shadow-[inset_0_1px_0_rgba(255,255,255,.9)] outline-none transition-all duration-300 hover:border-[#D6C8B4] focus:border-[#B79B6C] focus:bg-[#FCFBF8] focus:ring-4 focus:ring-[#B79B6C]/10 cursor-pointer"';
app = app.split(oldSelectClass).join(newSelectClass);

// Add private customer option once in the homepage object type select.
app = app.replace(
  '<option>Büro & Kanzlei</option>\n                            <option>Arztpraxis</option>',
  '<option>Privatperson / Wohnung</option>\n                            <option>Büro & Kanzlei</option>\n                            <option>Arztpraxis</option>'
);

writeFileSync(appFile, app, "utf8");

const cssFile = "src/index.css";
let css = readFileSync(cssFile, "utf8");

const block = `

/* ===== Premium Phase 1 + 2: ruhige Bewegung ===== */
.premium-reveal {
  opacity: 0;
  transform: translate3d(0, 22px, 0);
  transition: opacity .58s cubic-bezier(.22,1,.36,1), transform .58s cubic-bezier(.22,1,.36,1);
  will-change: opacity, transform;
}

.premium-reveal.is-visible {
  opacity: 1;
  transform: translate3d(0,0,0);
}

.premium-reveal-delay-1 { transition-delay: .06s; }
.premium-reveal-delay-2 { transition-delay: .12s; }
.premium-reveal-delay-3 { transition-delay: .18s; }

@media (prefers-reduced-motion: reduce) {
  .premium-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
`;

if (!css.includes("Premium Phase 1 + 2")) {
  css += block;
  writeFileSync(cssFile, css, "utf8");
}

console.log("Premium source UI patched: homepage service grid restored, form selects polished and private option added.");
