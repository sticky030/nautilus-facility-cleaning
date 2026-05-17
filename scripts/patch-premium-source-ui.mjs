import { readFileSync, writeFileSync } from "node:fs";

const appFile = "src/App.tsx";
let app = readFileSync(appFile, "utf8");

app = app.replace(
  'className="home-services-bento grid grid-cols-1 gap-8 lg:grid-cols-6"',
  'className="grid grid-cols-1 gap-8 lg:grid-cols-3"'
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

console.log("Premium source UI patched: homepage service grid restored to 3 columns and motion CSS ready.");
