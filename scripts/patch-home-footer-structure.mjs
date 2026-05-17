import { readFileSync, writeFileSync } from "node:fs";

const file = "src/App.tsx";
let source = readFileSync(file, "utf8");

const footerStart = source.indexOf('      <footer className="bg-white py-20 text-left border-t border-[#E5E1D8]">');
const footerEnd = source.indexOf('      </footer>', footerStart);

if (footerStart === -1 || footerEnd === -1) {
  throw new Error("Home footer block not found in src/App.tsx");
}

const newFooter = `      <footer className="bg-white py-20 text-left border-t border-[#E5E1D8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-left">
          <div className="grid gap-10 border-b border-[#E5E1D8] pb-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="text-[12px] font-bold tracking-[0.35em] text-[#B79B6C]">NAUTILUS FACILITY CLEANING</div>
              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#8A7E70]">
                Objektbezogene Reinigung in Berlin für Auszug, Übergabe, Renovierung, Büros, Praxen, Kanzleien, Treppenhäuser und verwaltete Objekte.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a href="#kontakt" className="inline-flex items-center justify-center rounded-full bg-[#B79B6C] px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(183,155,108,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A98E60]">Anfrage stellen</a>
              <a href="https://wa.me/4917622844636" className="inline-flex items-center justify-center rounded-full border border-[#D9CCB8] bg-[#FCFBF8] px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-[#6F6559] transition-all duration-300 hover:border-[#B79B6C]/60 hover:text-[#B79B6C]">WhatsApp</a>
            </div>
          </div>

          <div className="grid gap-12 border-b border-[#E5E1D8] py-14 lg:grid-cols-[1.15fr_1fr_0.85fr]">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B79B6C]">Leistungen</div>
              <div className="mt-6 grid gap-x-8 gap-y-3 text-[14px] font-medium text-[#2C2C2C] sm:grid-cols-2">
                <a href="/reinigung-nach-auszug-berlin/" className="hover:text-[#B79B6C] transition-colors">Reinigung nach Auszug</a>
                <a href="/uebergabereinigung-berlin/" className="hover:text-[#B79B6C] transition-colors">Übergabereinigung</a>
                <a href="/reinigung-nach-renovierung-berlin/" className="hover:text-[#B79B6C] transition-colors">Reinigung nach Renovierung</a>
                <a href="/bauendreinigung-berlin/" className="hover:text-[#B79B6C] transition-colors">Bauendreinigung</a>
                <a href="/treppenhausreinigung-berlin/" className="hover:text-[#B79B6C] transition-colors">Treppenhausreinigung</a>
                <a href="/hausverwaltungen-berlin/" className="hover:text-[#B79B6C] transition-colors">Hausverwaltungen</a>
                <a href="/bueroreinigung-berlin/" className="hover:text-[#B79B6C] transition-colors">Büroreinigung</a>
                <a href="/praxisreinigung-berlin/" className="hover:text-[#B79B6C] transition-colors">Praxisreinigung</a>
                <a href="/kanzleireinigung-berlin/" className="hover:text-[#B79B6C] transition-colors">Kanzleireinigung</a>
                <a href="/grundreinigung-berlin/" className="hover:text-[#B79B6C] transition-colors">Grundreinigung</a>
                <a href="/fensterreinigung-berlin/" className="hover:text-[#B79B6C] transition-colors">Fensterreinigung</a>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B79B6C]">Einsatzgebiete</div>
              <div className="mt-6 grid gap-x-8 gap-y-3 text-[14px] font-medium text-[#2C2C2C] sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <a href="/reinigungsfirma-lichtenberg-berlin/" className="hover:text-[#B79B6C] transition-colors">Lichtenberg</a>
                <a href="/reinigungsfirma-marzahn-hellersdorf-berlin/" className="hover:text-[#B79B6C] transition-colors">Marzahn-Hellersdorf</a>
                <a href="/reinigungsfirma-pankow-berlin/" className="hover:text-[#B79B6C] transition-colors">Pankow</a>
                <a href="/reinigungsfirma-prenzlauer-berg-berlin/" className="hover:text-[#B79B6C] transition-colors">Prenzlauer Berg</a>
                <a href="/reinigungsfirma-weissensee-berlin/" className="hover:text-[#B79B6C] transition-colors">Weißensee</a>
                <a href="/reinigungsfirma-friedrichshain-kreuzberg-berlin/" className="hover:text-[#B79B6C] transition-colors">Friedrichshain-Kreuzberg</a>
                <a href="/reinigungsfirma-berlin-mitte/" className="hover:text-[#B79B6C] transition-colors">Berlin-Mitte</a>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B79B6C]">Kontakt</div>
              <div className="mt-6 flex flex-col gap-3 text-[14px] font-medium text-[#2C2C2C]">
                <a href="tel:+4917622844636" className="hover:text-[#B79B6C] transition-colors">0176 2284 4636</a>
                <a href="mailto:kontakt@nautilus-facility.de" className="hover:text-[#B79B6C] transition-colors">kontakt@nautilus-facility.de</a>
                <a href="#kontakt" className="hover:text-[#B79B6C] transition-colors">Anfrageformular nutzen</a>
                <a href="https://wa.me/4917622844636" className="hover:text-[#B79B6C] transition-colors">Fotos per WhatsApp senden</a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between text-left">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] leading-6 text-[#8A7E70]">
              <a href="/reinigungsfirma-lichtenberg-berlin/" className="hover:text-[#B79B6C] transition-colors">Lichtenberg</a>
              <a href="/reinigungsfirma-marzahn-hellersdorf-berlin/" className="hover:text-[#B79B6C] transition-colors">Marzahn-Hellersdorf</a>
              <a href="/reinigungsfirma-pankow-berlin/" className="hover:text-[#B79B6C] transition-colors">Pankow</a>
              <a href="/reinigungsfirma-friedrichshain-kreuzberg-berlin/" className="hover:text-[#B79B6C] transition-colors">Friedrichshain-Kreuzberg</a>
              <a href="/reinigungsfirma-berlin-mitte/" className="hover:text-[#B79B6C] transition-colors">Berlin-Mitte</a>
            </div>
            <div className="flex gap-8 text-[13px] font-semibold uppercase tracking-widest text-[#8A7E70]">
              <a href="/impressum/" className="hover:text-[#B79B6C] transition-colors">Impressum</a>
              <a href="/datenschutz/" className="hover:text-[#B79B6C] transition-colors">Datenschutz</a>
            </div>
          </div>
        </div>
      </footer>`;

source = `${source.slice(0, footerStart)}${newFooter}${source.slice(footerEnd + '      </footer>'.length)}`;
writeFileSync(file, source, "utf8");
console.log("Home footer structure patched: all district mentions are linked.");
