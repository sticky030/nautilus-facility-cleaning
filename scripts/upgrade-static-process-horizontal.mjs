import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";

const variants = {
  photo: [
    ["01", "Fotos senden", "Bezirk, Objektart, Fläche, Termin und möglichst Fotos vom aktuellen Zustand übermitteln."],
    ["02", "Zustand einordnen", "Wir prüfen Verschmutzung, Zugänglichkeit, Leistungsumfang und gewünschtes Ergebnis."],
    ["03", "Angebot erhalten", "Sie erhalten eine objektbezogene Einschätzung mit klar abgegrenztem Umfang."],
    ["04", "Reinigung durchführen", "Nach Freigabe erfolgt die Umsetzung im vereinbarten Zeitfenster und Umfang."],
  ],
  b2b: [
    ["01", "Bedarf klären", "Objektart, Turnus, Zeitfenster, Zugang und gewünschte Leistungsbereiche kurz einordnen."],
    ["02", "Objekt prüfen", "Bei Bedarf prüfen wir Flächen, Nutzung, Frequenz und Sonderbereiche direkt am Objekt."],
    ["03", "Angebot abstimmen", "Sie erhalten ein klares Angebot mit Leistungsumfang, Turnus und nachvollziehbarer Objektlogik."],
    ["04", "Reinigung starten", "Nach Freigabe erfolgt die Umsetzung strukturiert, ruhig und passend zum Objektalltag."],
  ],
  district: [
    ["01", "Objekt beschreiben", "Bezirk, Objektart, Fläche, Zustand und gewünschten Termin kurz übermitteln."],
    ["02", "Bedarf prüfen", "Wir ordnen ein, welche Leistung zum Objekt passt und welche Bereiche relevant sind."],
    ["03", "Angebot abstimmen", "Der Leistungsumfang wird objektbezogen und nachvollziehbar festgelegt."],
    ["04", "Reinigung umsetzen", "Die Reinigung erfolgt in Berlin nach abgestimmtem Zeitfenster und klarer Leistung."],
  ],
};

const css = `
      .horizontal-process {
        margin-top: 34px;
        border: 1px solid #E5D9C8;
        border-radius: 30px;
        background: linear-gradient(135deg,#FFFFFF 0%,#FCFBF8 100%);
        padding: 34px;
        box-shadow: 0 24px 70px rgba(60,48,35,.07);
        overflow: hidden;
      }
      .horizontal-process-track {
        position: relative;
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        column-gap: 22px;
        row-gap: 26px;
      }
      .horizontal-step {
        position: relative;
        z-index: 1;
        min-height: 220px;
        display: flex;
        flex-direction: column;
        gap: 18px;
      }
      .horizontal-step:not(:last-child)::before,
      .horizontal-step:not(:last-child)::after {
        content:"";
        position:absolute;
        top:22px;
        left:44px;
        height:2px;
        width:calc(100% + 22px - 44px);
        pointer-events:none;
      }
      .horizontal-step:not(:last-child)::before { background:#E5E1D8; }
      .horizontal-step:not(:last-child)::after { background:#B79B6C; transform-origin:left center; transform:scaleX(0); }
      .horizontal-dot {
        width: 44px;
        height: 44px;
        border-radius: 999px;
        border: 1px solid rgba(183,155,108,.32);
        background:#fff;
        color:#B79B6C;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:12px;
        font-weight:850;
        letter-spacing:.08em;
        position:relative;
        z-index:2;
      }
      .horizontal-step h3 { margin: 0; color:#9A8D7D; font-size: 18px; line-height:1.25; }
      .horizontal-step p { margin: 0; color:#7E7367; font-size:14px; line-height:1.75; opacity:.42; transform:translate3d(0,8px,0); }
      .horizontal-process.run-horizontal .horizontal-dot {
        animation: horizontalDot .52s ease forwards, horizontalPulse 1.05s ease 1;
        animation-delay: calc(.18s + var(--h-step) * 1.05s), calc(.18s + var(--h-step) * 1.05s);
      }
      .horizontal-process.run-horizontal .horizontal-step h3 { animation: horizontalTitle .45s ease forwards; animation-delay: calc(.28s + var(--h-step) * 1.05s); }
      .horizontal-process.run-horizontal .horizontal-step p { animation: horizontalText .52s ease forwards; animation-delay: calc(.38s + var(--h-step) * 1.05s); }
      .horizontal-process.run-horizontal .horizontal-step:not(:last-child)::after { animation: horizontalSegment .86s cubic-bezier(.4,0,.2,1) forwards; animation-delay: calc(.62s + var(--h-step) * 1.05s); }
      @keyframes horizontalSegment { to { transform:scaleX(1); } }
      @keyframes horizontalDot { to { background:#B79B6C; color:#fff; border-color:#B79B6C; } }
      @keyframes horizontalTitle { to { color:#2C2C2C; } }
      @keyframes horizontalText { to { opacity:1; transform:translate3d(0,0,0); } }
      @keyframes horizontalPulse { 0%{box-shadow:0 0 0 0 rgba(183,155,108,.55),0 12px 28px rgba(183,155,108,.12);transform:scale(1)} 38%{box-shadow:0 0 0 16px rgba(183,155,108,.18),0 18px 38px rgba(183,155,108,.24);transform:scale(1.08)} 100%{box-shadow:0 0 0 24px rgba(183,155,108,0),0 12px 28px rgba(183,155,108,.16);transform:scale(1)} }
      @media(max-width:980px){
        .horizontal-process-track{grid-template-columns:1fr; gap:0;}
        .horizontal-step{min-height:0; display:grid; grid-template-columns:44px 1fr; gap:10px 18px; padding-bottom:30px;}
        .horizontal-step h3,.horizontal-step p{grid-column:2;}
        .horizontal-dot{grid-row:1 / span 2;}
        .horizontal-step:not(:last-child)::before,.horizontal-step:not(:last-child)::after{top:44px;left:21px;width:2px;height:calc(100% - 20px);transform-origin:top center;}
        .horizontal-step:not(:last-child)::after{transform:scaleY(0);}
        .horizontal-process.run-horizontal .horizontal-step:not(:last-child)::after{animation:horizontalSegmentMobile .86s cubic-bezier(.4,0,.2,1) forwards;animation-delay:calc(.62s + var(--h-step) * 1.05s);}
        @keyframes horizontalSegmentMobile{to{transform:scaleY(1)}}
      }
      @media(prefers-reduced-motion:reduce){
        .horizontal-process .horizontal-dot{background:#B79B6C;color:#fff;border-color:#B79B6C;}
        .horizontal-step h3{color:#2C2C2C;}
        .horizontal-step p{opacity:1;transform:none;}
        .horizontal-step:not(:last-child)::after{transform:scaleX(1);}
      }
`;

const js = `<script id="nfc-horizontal-process-js">
(function(){
  function ready(fn){ document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn(); }
  ready(function(){
    var boxes = Array.prototype.slice.call(document.querySelectorAll('.horizontal-process'));
    if(!boxes.length) return;
    function play(box){ if(box.dataset.played) return; box.dataset.played='1'; box.classList.add('run-horizontal'); }
    function check(){
      var viewport = window.innerHeight || document.documentElement.clientHeight;
      boxes.forEach(function(box){
        if(box.dataset.played) return;
        var rect = box.getBoundingClientRect();
        var center = rect.top + rect.height/2;
        var distance = Math.abs(center - viewport/2);
        var tolerance = Math.min(170, viewport * 0.20);
        var visible = rect.top < viewport * 0.88 && rect.bottom > viewport * 0.12;
        if(visible && distance <= tolerance) play(box);
      });
    }
    window.addEventListener('scroll', check, {passive:true});
    window.addEventListener('resize', check);
    requestAnimationFrame(check);
  });
})();
</script>`;

function variantFor(slug) {
  if (slug.startsWith("reinigungsfirma-")) return "district";
  if (["reinigung-nach-auszug-berlin", "uebergabereinigung-berlin", "reinigung-nach-renovierung-berlin", "bauendreinigung-berlin", "grundreinigung-berlin"].includes(slug)) return "photo";
  return "b2b";
}

function processHtml(items) {
  return `<div class="horizontal-process"><div class="horizontal-process-track">${items.map(([num,title,text], i) => `<article class="horizontal-step" style="--h-step:${i}"><div class="horizontal-dot">${num}</div><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div>`;
}

function inject(html) {
  if (!html.includes(".horizontal-process")) html = html.replace("</style>", css + "\n    </style>");
  if (!html.includes("nfc-horizontal-process-js")) html = html.replace("</body>", js + "\n  </body>");
  return html;
}

function replaceAblaufSection(html, replacement) {
  const sectionRegexes = [
    /<section class="white">\s*<div class="container">\s*<div class="section-head">\s*<div class="eyebrow">Ablauf<\/div>[\s\S]*?<div class="steps">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
    /<section>\s*<div class="container">\s*<div class="section-head">\s*<div class="eyebrow">Ablauf<\/div>[\s\S]*?<div class="steps">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
    /<section class="white">\s*<div class="container">\s*<div class="section-head">\s*<div class="eyebrow">Ablauf<\/div>[\s\S]*?<div class="grid process-grid[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
    /<section>\s*<div class="container">\s*<div class="section-head">\s*<div class="eyebrow">Ablauf<\/div>[\s\S]*?<div class="grid process-grid[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
    /<section class="white">\s*<div class="container">\s*<div class="section-head">\s*<div class="eyebrow">Ablauf<\/div>[\s\S]*?<div class="grid"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
    /<section>\s*<div class="container">\s*<div class="section-head">\s*<div class="eyebrow">Ablauf<\/div>[\s\S]*?<div class="grid"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
  ];

  for (const regex of sectionRegexes) {
    if (regex.test(html)) {
      return { html: html.replace(regex, replacement), changed: true };
    }
  }
  return { html, changed: false };
}

const dirs = readdirSync(dist).filter((name) => name !== "index.html" && existsSync(join(dist, name, "index.html")));
let changed = 0;
for (const slug of dirs) {
  const file = join(dist, slug, "index.html");
  let html = readFileSync(file, "utf8");
  if (!html.includes('<div class="eyebrow">Ablauf</div>')) continue;

  html = inject(html);
  const variant = variants[variantFor(slug)];
  const replacement = `<section class="white"><div class="container"><div class="section-head"><div class="eyebrow">Ablauf</div><h2>So läuft die Zusammenarbeit ab.</h2></div>${processHtml(variant)}</div></section>`;
  const result = replaceAblaufSection(html, replacement);
  html = result.html;

  if (result.changed) changed++;
  writeFileSync(file, html, "utf8");
}

console.log(`Horizontal connected process applied to ${changed} static pages.`);
