import { existsSync, readFileSync, writeFileSync } from "node:fs";

const file = "dist/index.html";
if (!existsSync(file)) {
  throw new Error("dist/index.html not found");
}

let html = readFileSync(file, "utf8");

const css = `
      /* ===== Connected Ablauf visible animation hard fix ===== */
      .connected-process .connected-step {
        opacity: 1 !important;
        transform: none !important;
        animation: none !important;
      }
      .connected-process .connected-right h4 {
        color: #9A8D7D !important;
        transition: color .35s ease !important;
      }
      .connected-process .connected-right p {
        opacity: .34 !important;
        transform: translate3d(0, 8px, 0) !important;
        transition: opacity .45s ease, transform .45s ease !important;
      }
      .connected-process .connected-dot {
        background: #fff !important;
        color: #B79B6C !important;
        border-color: rgba(183,155,108,.28) !important;
        box-shadow: none !important;
        animation: none !important;
      }
      .connected-process .connected-segment {
        background: #E5E1D8 !important;
      }
      .connected-process .connected-segment span {
        height: 0 !important;
        background: #B79B6C !important;
        animation: none !important;
      }
      .connected-process.run-connected .connected-right h4 {
        animation: nfcConnectedTitleGold .45s ease forwards !important;
        animation-delay: calc(.28s + var(--step-index) * 1.05s) !important;
      }
      .connected-process.run-connected .connected-right p {
        animation: nfcConnectedTextIn .52s ease forwards !important;
        animation-delay: calc(.38s + var(--step-index) * 1.05s) !important;
      }
      .connected-process.run-connected .connected-dot {
        animation: nfcConnectedDotGold .52s ease forwards, nfcConnectedDotPulse 1.05s ease 1 !important;
        animation-delay: calc(.18s + var(--step-index) * 1.05s), calc(.18s + var(--step-index) * 1.05s) !important;
      }
      .connected-process.run-connected .connected-segment span {
        animation: nfcConnectedLineFill .86s cubic-bezier(.4,0,.2,1) forwards !important;
        animation-delay: calc(.62s + var(--step-index) * 1.05s) !important;
      }
      @keyframes nfcConnectedTextIn {
        to { opacity: 1; transform: translate3d(0,0,0); }
      }
      @keyframes nfcConnectedTitleGold {
        to { color:#2C2C2C; }
      }
      @keyframes nfcConnectedLineFill {
        to { height: 100%; }
      }
      @keyframes nfcConnectedDotGold {
        0% { background:#fff; color:#B79B6C; border-color:rgba(183,155,108,.28); }
        100% { background:#B79B6C; color:#fff; border-color:#B79B6C; }
      }
      @keyframes nfcConnectedDotPulse {
        0% { box-shadow:0 0 0 0 rgba(183,155,108,.55), 0 12px 28px rgba(183,155,108,.12); transform:scale(1); }
        38% { box-shadow:0 0 0 16px rgba(183,155,108,.18), 0 18px 38px rgba(183,155,108,.24); transform:scale(1.08); }
        100% { box-shadow:0 0 0 24px rgba(183,155,108,0), 0 12px 28px rgba(183,155,108,.16); transform:scale(1); }
      }
      @media (prefers-reduced-motion: reduce) {
        .connected-process .connected-right h4 { color:#2C2C2C !important; }
        .connected-process .connected-right p { opacity:1 !important; transform:none !important; }
        .connected-process .connected-dot { background:#B79B6C !important; color:#fff !important; border-color:#B79B6C !important; }
        .connected-process .connected-segment span { height:100% !important; }
      }
`;

const js = `<script id="nfc-connected-hard-trigger">
(function(){
  function ready(fn){ document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn(); }
  ready(function(){
    var box = document.querySelector('.connected-process');
    if(!box) return;
    box.classList.remove('run-connected');
    var played = false;
    function visibleEnough(){
      var rect = box.getBoundingClientRect();
      var viewport = window.innerHeight || document.documentElement.clientHeight;
      var visible = Math.min(rect.bottom, viewport) - Math.max(rect.top, 0);
      var ratio = visible / Math.max(rect.height, 1);
      return ratio >= 0.78 && rect.top < viewport * 0.62;
    }
    function play(){
      if(played || !visibleEnough()) return;
      played = true;
      box.classList.remove('run-connected');
      void box.offsetWidth;
      setTimeout(function(){ box.classList.add('run-connected'); }, 180);
    }
    window.addEventListener('scroll', play, { passive: true });
    window.addEventListener('resize', play);
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){ if(entry.isIntersecting) play(); });
    }, { threshold: [0.65, 0.78, 0.9], rootMargin: '0px 0px -4% 0px' });
    observer.observe(box);
    setTimeout(play, 600);
  });
})();
</script>`;

if (html.includes("Connected Ablauf visible animation hard fix")) {
  html = html.replace(/      \/\* ===== Connected Ablauf visible animation hard fix ===== \*\/[\s\S]*?@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\.connected-process \.connected-segment span \{ height:100% !important; \}\n      \}\n/, css.trimStart());
} else {
  html = html.replace("</style>", css + "\n    </style>");
}

if (html.includes('id="nfc-connected-hard-trigger"')) {
  html = html.replace(/<script id="nfc-connected-hard-trigger">[\s\S]*?<\/script>/, js);
} else {
  html = html.replace("</body>", js + "\n  </body>");
}

writeFileSync(file, html, "utf8");
console.log("Homepage connected Ablauf animation adjusted: later trigger and stronger visible sequence.");
