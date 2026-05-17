import { existsSync, readFileSync, writeFileSync } from "node:fs";

const file = "dist/index.html";
if (!existsSync(file)) {
  throw new Error("dist/index.html not found");
}

let html = readFileSync(file, "utf8");

const css = `
      /* ===== Connected Ablauf visible animation hard fix ===== */
      .connected-process .connected-step {
        opacity: 0 !important;
        transform: translate3d(0, 18px, 0) !important;
        animation: none !important;
      }
      .connected-process .connected-dot {
        background: #fff !important;
        color: #B79B6C !important;
        border-color: rgba(183,155,108,.35) !important;
        animation: none !important;
      }
      .connected-process .connected-segment span {
        height: 0 !important;
        animation: none !important;
      }
      .connected-process.run-connected .connected-step {
        animation: nfcConnectedStepIn .48s cubic-bezier(.22,1,.36,1) forwards !important;
        animation-delay: calc(.12s + var(--step-index) * .72s) !important;
      }
      .connected-process.run-connected .connected-dot {
        animation: nfcConnectedDotGold .42s ease forwards, nfcConnectedDotPulse .8s ease 1 !important;
        animation-delay: calc(.18s + var(--step-index) * .72s), calc(.18s + var(--step-index) * .72s) !important;
      }
      .connected-process.run-connected .connected-segment span {
        animation: nfcConnectedLineFill .62s cubic-bezier(.4,0,.2,1) forwards !important;
        animation-delay: calc(.52s + var(--step-index) * .72s) !important;
      }
      @keyframes nfcConnectedStepIn {
        to { opacity: 1; transform: translate3d(0,0,0); }
      }
      @keyframes nfcConnectedLineFill {
        to { height: 100%; }
      }
      @keyframes nfcConnectedDotGold {
        to { background:#B79B6C; color:#fff; border-color:#B79B6C; }
      }
      @keyframes nfcConnectedDotPulse {
        0% { box-shadow:0 0 0 0 rgba(183,155,108,.45), 0 12px 28px rgba(183,155,108,.12); transform:scale(1); }
        45% { box-shadow:0 0 0 12px rgba(183,155,108,.12), 0 18px 36px rgba(183,155,108,.22); transform:scale(1.06); }
        100% { box-shadow:0 0 0 18px rgba(183,155,108,0), 0 12px 28px rgba(183,155,108,.12); transform:scale(1); }
      }
      @media (prefers-reduced-motion: reduce) {
        .connected-process .connected-step { opacity:1 !important; transform:none !important; }
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
    function play(){
      if(played) return;
      played = true;
      box.classList.remove('run-connected');
      void box.offsetWidth;
      box.classList.add('run-connected');
    }
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting && entry.intersectionRatio > 0.35) play();
      });
    }, { threshold: [0.35, 0.55, 0.75], rootMargin: '0px 0px -12% 0px' });
    observer.observe(box);
  });
})();
</script>`;

if (!html.includes("Connected Ablauf visible animation hard fix")) {
  html = html.replace("</style>", css + "\n    </style>");
}
if (!html.includes("nfc-connected-hard-trigger")) {
  html = html.replace("</body>", js + "\n  </body>");
}

writeFileSync(file, html, "utf8");
console.log("Homepage connected Ablauf animation hard fix applied.");
