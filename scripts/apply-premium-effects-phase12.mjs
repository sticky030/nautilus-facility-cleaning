import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";

const premiumCss = `
      /* ===== Premium Effects Phase 1 + 2 ===== */
      .premium-reveal { opacity:0; transform:translate3d(0,22px,0); transition:opacity .58s cubic-bezier(.22,1,.36,1), transform .58s cubic-bezier(.22,1,.36,1); will-change:opacity,transform; }
      .premium-reveal.is-visible { opacity:1; transform:translate3d(0,0,0); }
      .premium-reveal:nth-child(2) { transition-delay:.04s; }
      .premium-reveal:nth-child(3) { transition-delay:.08s; }
      .premium-reveal:nth-child(4) { transition-delay:.12s; }
      .premium-reveal:nth-child(5) { transition-delay:.16s; }
      .process-grid { grid-template-columns:repeat(4,minmax(0,1fr)) !important; gap:18px !important; }
      .process-grid .card { min-height:220px !important; position:relative; overflow:hidden; padding-top:58px !important; }
      .process-grid .card::before { content:attr(data-step); position:absolute; top:22px; left:24px; width:36px; height:36px; border-radius:999px; display:flex; align-items:center; justify-content:center; background:#B79B6C; color:#fff; font-size:12px; font-weight:850; letter-spacing:.08em; box-shadow:0 12px 26px rgba(183,155,108,.25); }
      .process-grid .card h3 { margin-top:0 !important; }
      .process-grid .card:hover { transform:translateY(-4px); box-shadow:0 24px 60px rgba(60,48,35,.09); }
      .premium-marquee { overflow:hidden; border:1px solid #E5D9C8; border-radius:999px; background:#FCFBF8; margin-top:32px; }
      .premium-marquee-track { display:flex; width:max-content; gap:34px; padding:12px 0; animation:premiumMarquee 34s linear infinite; }
      .premium-marquee span { color:#6F6559; font-size:13px; font-weight:700; white-space:nowrap; letter-spacing:.02em; }
      @keyframes premiumMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      .premium-stack-section { background:#fff; padding:92px 0; border-top:1px solid #EEE8DE; border-bottom:1px solid #EEE8DE; }
      .premium-stack { display:grid; gap:22px; margin-top:34px; }
      .premium-stack-card { position:sticky; top:120px; border:1px solid #E5D9C8; border-radius:30px; padding:34px; background:#FCFBF8; box-shadow:0 24px 70px rgba(60,48,35,.07); display:grid; grid-template-columns:.82fr 1.18fr; gap:34px; align-items:start; }
      .premium-stack-card:nth-child(2){top:142px;background:#fff;}
      .premium-stack-card:nth-child(3){top:164px;background:#F7F4EE;}
      .premium-stack-card:nth-child(4){top:186px;background:#fff;}
      .premium-stack-kicker { color:#B79B6C; font-size:11px; text-transform:uppercase; letter-spacing:.28em; font-weight:850; }
      .premium-stack-card h3 { margin:12px 0 0; color:#2C2C2C; font-size:28px; line-height:1.18; letter-spacing:-.04em; }
      .premium-stack-card p { margin:0; color:#7E7367; font-size:16px; line-height:1.85; }
      .home-services-bento > article { transform-style:preserve-3d; }
      .home-services-bento > article:hover { transform:translateY(-7px) perspective(900px) rotateX(1.5deg) rotateY(-1.5deg) !important; }
      .check-progress-wrap { margin:0; padding:22px 26px; border-bottom:1px solid #EEE8DE; background:#FCFBF8; }
      .check-progress-label { display:flex; justify-content:space-between; gap:18px; color:#2C2C2C; font-size:14px; font-weight:750; margin-bottom:10px; }
      .check-progress-bar { height:9px; border-radius:999px; background:#EEE8DE; overflow:hidden; }
      .check-progress-fill { display:block; width:0%; height:100%; background:#B79B6C; border-radius:999px; transition:width .25s ease; }
      .checklist-cta { margin-top:24px; border:1px solid #E5D9C8; border-radius:28px; padding:28px; background:#2C2C2C; color:#fff; display:flex; justify-content:space-between; align-items:center; gap:24px; }
      .checklist-cta h3 { margin:0 0 8px; color:#fff; font-size:24px; }
      .checklist-cta p { margin:0; color:rgba(255,255,255,.76); line-height:1.65; }
      .checklist-cta .button { background:#B79B6C; color:#fff; }
      .rg-bento { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:22px; margin-top:34px; }
      .rg-bento .card { min-height:230px !important; }
      .rg-bento .card:nth-child(1) { grid-row:span 2; }
      @media(max-width:980px){ .process-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important;} .premium-stack-card{grid-template-columns:1fr; position:relative; top:auto !important;} .rg-bento{grid-template-columns:1fr;} .rg-bento .card:nth-child(1){grid-row:auto;} }
      @media(max-width:760px){ .process-grid{grid-template-columns:1fr !important;} .checklist-cta{display:block;} .checklist-cta .button{margin-top:18px;} }
      @media(prefers-reduced-motion:reduce){ .premium-reveal{opacity:1;transform:none;transition:none}.premium-marquee-track{animation:none}.home-services-bento > article:hover{transform:none!important} }
`;

const premiumJs = `<script>
(function(){
  var ready = function(fn){ if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); };
  ready(function(){
    document.querySelectorAll('main h2, main .section-head, main .card, main .hero-card, main .cta, main .editorial-list, main .contact-panel, main .homepage-form-panel').forEach(function(el){ el.classList.add('premium-reveal'); });
    var obs = new IntersectionObserver(function(entries){ entries.forEach(function(entry){ if(entry.isIntersecting) entry.target.classList.add('is-visible'); }); }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.premium-reveal').forEach(function(el){ obs.observe(el); });
    document.querySelectorAll('.process-grid .card').forEach(function(el, i){ if(!el.getAttribute('data-step')) el.setAttribute('data-step', String(i+1).padStart(2,'0')); });
    var checks = Array.prototype.slice.call(document.querySelectorAll('.interactive-checklist input[type="checkbox"]'));
    var fill = document.querySelector('.check-progress-fill');
    var count = document.querySelector('.check-progress-count');
    function update(){ if(!checks.length || !fill || !count) return; var done = checks.filter(function(c){ return c.checked; }).length; var pct = Math.round(done / checks.length * 100); fill.style.width = pct + '%'; count.textContent = pct + '% vorbereitet'; }
    checks.forEach(function(c){ c.addEventListener('change', update); }); update();
  });
})();
</script>`;

function injectAssets(html) {
  if (!html.includes("Premium Effects Phase 1 + 2")) html = html.replace("</style>", `${premiumCss}\n    </style>`);
  if (!html.includes("premium-reveal")) html = html.replace("</body>", `${premiumJs}\n  </body>`);
  return html;
}

function patchProcess(html) {
  html = html.replace(/(<div class="section-head"><div class="eyebrow">Ablauf[\s\S]*?<\/div><div class="grid(?:" style="grid-template-columns:repeat\(2, minmax\(0, 1fr\)\);"|">))/g, function(m){ return m.replace('<div class="grid', '<div class="grid process-grid'); });
  html = html.replace(/<article class="card"([^>]*)><h3>(?:1\.|01|Schritt 01)\s*/g, '<article class="card" data-step="01"$1><h3>');
  html = html.replace(/<article class="card"([^>]*)><h3>(?:2\.|02|Schritt 02)\s*/g, '<article class="card" data-step="02"$1><h3>');
  html = html.replace(/<article class="card"([^>]*)><h3>(?:3\.|03|Schritt 03)\s*/g, '<article class="card" data-step="03"$1><h3>');
  html = html.replace(/<article class="card"([^>]*)><h3>(?:4\.|04|Schritt 04)\s*/g, '<article class="card" data-step="04"$1><h3>');
  return html;
}

function patchDistrictMarquee(html) {
  if (!html.includes('class="area-pills"') || html.includes('premium-marquee-track')) return html;
  return html.replace(/<div class="area-pills">([\s\S]*?)<\/div>/, function(_, inner){
    const items = Array.from(inner.matchAll(/<span class="area-pill">([^<]+)<\/span>/g)).map(m => m[1]);
    if (!items.length) return _;
    const line = items.concat(items).map(item => `<span>${item}</span>`).join('');
    return `<div class="premium-marquee" aria-label="Ortsteile"><div class="premium-marquee-track">${line}</div></div>`;
  });
}

function insertStackedCards(slug, html) {
  if (html.includes('premium-stack-section')) return html;
  let data = null;
  if (slug === 'hausverwaltungen-berlin') {
    data = {
      kicker: 'Objektbedarf strukturiert bündeln',
      title: 'Hausverwaltungen brauchen klare Leistungsbereiche.',
      lead: 'Treppenhäuser, Allgemeinflächen, Sonderreinigungen und Übergaben müssen getrennt gedacht, aber sauber koordiniert werden.',
      cards: [
        ['Treppenhausreinigung', 'Regelmäßige Reinigung von Treppen, Podesten, Handläufen, Eingangsbereichen und Kontaktflächen nach abgestimmtem Turnus.'],
        ['Grund- und Sonderreinigung', 'Gezielte Zusatzleistungen für stärkere Verschmutzung, Renovierungsspuren, Leerstand, Allgemeinflächen oder saisonalen Bedarf.'],
        ['Übergabe und Zusatzbedarf', 'Reinigung vor Neuvermietung, nach Auszug oder bei einzelnen Objektanlässen, wenn ein klarer Übergabezustand gebraucht wird.'],
        ['Fenster und Allgemeinflächen', 'Ergänzende Reinigung von Glasflächen, Rahmen, Eingangsbereichen und Nebenflächen nach Objektstruktur und Zugänglichkeit.'],
      ]
    };
  }
  if (slug === 'praxisreinigung-berlin') {
    data = {
      kicker: 'Praxisarten präzise einordnen',
      title: 'Reinigung für unterschiedliche Praxisumfelder.',
      lead: 'Praxisreinigung braucht klare Bereichstrennung, verlässliche Abläufe und ein Verständnis für sensible Kontaktflächen.',
      cards: [
        ['Arztpraxis', 'Empfang, Wartebereich, Behandlungsnähe, Sanitärzonen und Kontaktflächen werden nach abgestimmtem Leistungsbild gereinigt.'],
        ['Zahnarztpraxis', 'Besonders sensible Bereiche, klare Abläufe und getrennte Reinigungslogik für patientennahe und allgemeine Flächen.'],
        ['Privatpraxis', 'Diskrete Ausführung, repräsentative Räume und ein gepflegtes Umfeld für Patienten mit erhöhtem Anspruch an Erscheinungsbild und Ruhe.'],
        ['Therapie- und Beratungsräume', 'Ruhige Umsetzung außerhalb der Behandlungszeiten mit Fokus auf Kontaktflächen, Böden, Sanitär und Empfangsbereiche.'],
      ]
    };
  }
  if (!data) return html;
  const cards = data.cards.map((card, i) => `<article class="premium-stack-card"><div><div class="premium-stack-kicker">0${i+1}</div><h3>${card[0]}</h3></div><p>${card[1]}</p></article>`).join('');
  const section = `<section class="premium-stack-section"><div class="container"><div class="section-head"><div class="eyebrow">${data.kicker}</div><h2>${data.title}</h2><p class="section-text">${data.lead}</p></div><div class="premium-stack">${cards}</div></div></section>`;
  return html.replace(/<section><div class="container"><div class="cta">/, `${section}\n      <section><div class="container"><div class="cta">`);
}

function patchChecklist(html) {
  if (!html.includes('interactive-checklist')) return html;
  if (!html.includes('check-progress-wrap')) {
    html = html.replace(/(<div class="interactive-checklist"><div class="interactive-checklist-head">[\s\S]*?<\/div>)/, `$1<div class="check-progress-wrap"><div class="check-progress-label"><span>Fortschritt</span><span class="check-progress-count">0% vorbereitet</span></div><div class="check-progress-bar"><span class="check-progress-fill"></span></div></div>`);
  }
  if (!html.includes('checklist-cta')) {
    const cta = `<div class="checklist-cta"><div><h3>Noch nicht alles erledigt?</h3><p>Wenn Küche, Bad, Fenster, Rahmen oder Böden vor der Übergabe noch offen sind, übernehmen wir die Übergabereinigung in Berlin objektbezogen.</p></div><a class="button" href="https://nautilus-facility.de/?kontakt=1#kontakt" onclick="sessionStorage.setItem('scrollToContact', '1')">Anfrage stellen</a></div>`;
    html = html.replace(/(<\/div><script>document\.querySelectorAll\('\[data-check\]'\)[\s\S]*?<\/script>)/, `$1${cta}`);
  }
  return html;
}

function patchRatgeberBento(slug, html) {
  if (slug !== 'reinigung-kosten-berlin') return html;
  if (html.includes('rg-bento')) return html;
  return html.replace(/<div class="grid cluster-grid-3 cluster-compact">/, '<div class="grid cluster-grid-3 cluster-compact rg-bento">');
}

const dirs = readdirSync(dist).filter(name => existsSync(join(dist, name, 'index.html')));
for (const slug of dirs) {
  const file = join(dist, slug, 'index.html');
  let html = readFileSync(file, 'utf8');
  html = injectAssets(html);
  html = patchProcess(html);
  html = patchDistrictMarquee(html);
  html = insertStackedCards(slug, html);
  html = patchChecklist(html);
  html = patchRatgeberBento(slug, html);
  writeFileSync(file, html, 'utf8');
}

const home = join(dist, 'index.html');
if (existsSync(home)) {
  let html = readFileSync(home, 'utf8');
  html = injectAssets(html);
  writeFileSync(home, html, 'utf8');
}

console.log('Premium effects phase 1+2 applied: reveals, process cards, checklist progress, bento, stacked cards and district marquees.');
