import jsPDF from 'jspdf'
import 'jspdf-autotable'

// ─── Design-Token (identisch gen_v8.py) ──────────────────
const CREAM  = [247, 244, 238]   // #F7F4EE
const WHITE  = [255, 255, 255]
const DARK   = [ 44,  44,  44]   // #2C2C2C
const GOLD   = [183, 155, 108]   // #B79B6C
const MUTED  = [126, 115, 103]   // #7E7367
const BORDER = [229, 225, 216]   // #E5E1D8
const GREEN  = [ 21, 128,  61]   // #15803D
const RED    = [185,  28,  28]   // #B91C1C
const TBLHDR = [ 44,  44,  44]   // Tabellenkopf dunkel

const PW = 210
const M  = 18

function fmtDate(d) {
  if (!d) return ''
  const [y, mo, day] = d.split('-')
  return `${day}.${mo}.${y}`
}

async function imgToBase64(url) {
  try {
    const r = await fetch(url)
    const b = await r.blob()
    return await new Promise(res => {
      const fr = new FileReader()
      fr.onloadend = () => res(fr.result)
      fr.readAsDataURL(b)
    })
  } catch { return null }
}

function bgPage(doc) {
  doc.setFillColor(...CREAM)
  doc.rect(0, 0, PW, 297, 'F')
}

// Sektions-Überschrift: dunkler Text + Gold-Unterlinie (wie gen_v8)
function sectionTitle(doc, text, y) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(...DARK)
  doc.text(text, M, y)
  doc.setDrawColor(...GOLD)
  doc.setLineWidth(0.5)
  doc.line(M, y + 2, PW - M, y + 2)
  return y + 9
}

// Linker Goldbalken (für Notiz-/Hinweiskarten)
function leftBar(doc, x, y, h) {
  doc.setFillColor(...GOLD)
  doc.rect(x, y, 2.5, h, 'F')
}

// Info-Spalte: Goldlinie oben + Label + Wert (wie info_col in gen_v8)
function infoCol(doc, x, y, w, label, val1, val2 = '') {
  doc.setDrawColor(...GOLD)
  doc.setLineWidth(0.5)
  doc.line(x, y, x + w - 3, y)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(5.5)
  doc.setTextColor(...GOLD)
  doc.text(label, x, y + 5.5)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...DARK)
  doc.text(val1, x, y + 11.5)
  if (val2) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...MUTED)
    doc.text(val2, x, y + 17.5)
  }
}

// ─────────────────────────────────────────────────────────
// HEADER — identisch mit gen_v8 (kein Logo, kein Hero-Hintergrund)
// ─────────────────────────────────────────────────────────
function drawHeader(doc, _logoData, docTitle, datum, nr) {
  // NAUTILUS — fett, links
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(24)
  doc.setTextColor(...DARK)
  doc.text('NAUTILUS', M, 14)

  // FACILITY CLEANING — gold, klein, direkt darunter
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6)
  doc.setTextColor(...GOLD)
  doc.setCharSpace(2.5)
  doc.text('F A C I L I T Y   C L E A N I N G', M, 19.5)
  doc.setCharSpace(0)

  // Titel rechts
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(...DARK)
  doc.text(docTitle.toUpperCase(), PW - M, 14, { align: 'right' })

  // Datum | NR rechts
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...MUTED)
  doc.text(`${fmtDate(datum)}  |  ${nr}`, PW - M, 19.5, { align: 'right' })

  // Gold-Trennlinie
  doc.setDrawColor(...GOLD)
  doc.setLineWidth(0.7)
  doc.line(M, 23, PW - M, 23)

  // Cream-Hintergrund unterhalb Header
  doc.setFillColor(...CREAM)
  doc.rect(0, 23, PW, 297 - 23, 'F')
}

// ─────────────────────────────────────────────────────────
// FOOTER (auf allen Seiten)
// ─────────────────────────────────────────────────────────
function drawFooter(doc, pageNum, totalPages) {
  doc.setDrawColor(...BORDER)
  doc.setLineWidth(0.3)
  doc.line(M, 282, PW - M, 282)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6)
  doc.setTextColor(...LIGHT)
  doc.text(
    'Nautilus Facility Cleaning  ·  Berlin  ·  kontakt@nautilus-facility.de  ·  nautilus-facility.de',
    M, 287
  )
  doc.setTextColor(...GOLD)
  doc.text(`${pageNum} / ${totalPages}`, PW - M, 287, { align: 'right' })
}


// ─────────────────────────────────────────────────────────
// PROTOKOLL PDF
// ─────────────────────────────────────────────────────────
export async function generateProtocolPDF({
  objekt, datum, zeitVon, zeitBis, mitarbeiter,
  bereiche, gesamtNotizen, maengel,
  signatureDataURL, fotoUrls = []
}) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const nr  = `NFC-${(datum || '').replace(/-/g, '')}-${Math.floor(Math.random() * 9000 + 1000)}`
  const logoData = await imgToBase64('/logo.png')

  // ── Seite 1 ──────────────────────────────────────────
  bgPage(doc)
  drawHeader(doc, logoData, 'Reinigungsprotokoll', datum, nr)

  let y = 30

  // ── 4-spaltige Info-Zeile (wie gen_v8) ───────────────
  const TW = PW - 2 * M
  const cw = TW / 4
  infoCol(doc, M,        y, cw, 'OBJEKT',       objekt?.name || '—',          objekt?.adresse || '')
  infoCol(doc, M+cw,     y, cw, 'EINSATZ',      fmtDate(datum),               zeitVon && zeitBis ? `${zeitVon} – ${zeitBis} Uhr` : '')
  infoCol(doc, M+cw*2,   y, cw, 'MITARBEITER',  mitarbeiter || '—',           '')
  infoCol(doc, M+cw*3,   y, cw, 'PROTOKOLL-NR', nr,                           '')

  y += 25

  // ── Reinigungsbereiche ───────────────────────────────
  y = sectionTitle(doc, 'REINIGUNGSBEREICHE', y)

  const labels = {
    eingang: 'Eingangsbereich / Haustür',
    treppenhaus: 'Treppenhaus',
    aufzug: 'Aufzug / Fahrstuhl',
    keller: 'Keller / Kellergang',
    muellraum: 'Müllraum',
    fahrradraum: 'Fahrradraum',
    aussenanlage: 'Außenanlage / Gehweg',
    tiefgarage: 'Tiefgarage / Stellplätze',
    waschraum: 'Wasch- / Trockenraum',
    dachboden: 'Dachboden / Gemeinschaftsraum',
  }

  const rows = Object.entries(bereiche).map(([key, val]) => [
    labels[key] || key,
    val.erledigt ? 'Gereinigt' : 'Nicht erledigt',
    val.notiz || '—',
  ])

  doc.autoTable({
    startY: y,
    margin: { left: M, right: M },
    head: [['Bereich', 'Status', 'Notiz']],
    body: rows,
    styles: {
      font: 'helvetica',
      fontSize: 8,
      textColor: DARK,
      fillColor: WHITE,
      cellPadding: { top: 3.5, bottom: 3.5, left: 5, right: 5 },
      lineColor: BORDER,
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: TBLHDR,
      textColor: WHITE,
      fontSize: 7,
      fontStyle: 'bold',
      cellPadding: { top: 3, bottom: 3, left: 4, right: 4 },
    },
    columnStyles: {
      0: { cellWidth: 78 },
      1: { cellWidth: 38, halign: 'center' },
      2: { cellWidth: 'auto' },
    },
    alternateRowStyles: { fillColor: [252, 250, 246] },
    tableLineColor: BORDER,
    tableLineWidth: 0.25,
    didParseCell(d) {
      if (d.section === 'body' && d.column.index === 1) {
        d.cell.styles.fontStyle = 'bold'
        d.cell.styles.fontSize  = 7.5
        d.cell.styles.textColor = d.cell.raw === 'Gereinigt' ? GREEN : RED
      }
      if (d.section === 'body' && d.column.index === 2) {
        d.cell.styles.textColor   = GRAY
        d.cell.styles.fontStyle   = 'italic'
        d.cell.styles.fontSize    = 7
      }
    },
    didAddPage() {
      bgPage(doc)
      drawHeader(doc, logoData, 'Reinigungsprotokoll', datum, nr)
    },
  })

  y = doc.lastAutoTable.finalY + 12

  // ── Mängel ───────────────────────────────────────────
  if (maengel?.trim()) {
    if (y > 238) { doc.addPage(); bgPage(doc); y = 20 }
    y = sectionTitle(doc, 'MÄNGEL / BESONDERHEITEN', y)
    const lines = doc.splitTextToSize(maengel, PW - M * 2 - 14)
    const bh = lines.length * 5.5 + 12

    doc.setFillColor(255, 248, 248)
    doc.setDrawColor(220, 195, 195)
    doc.setLineWidth(0.3)
    doc.roundedRect(M, y, PW - M * 2, bh, 2, 2, 'FD')
    doc.setFillColor(...RED)
    doc.roundedRect(M, y, 3, bh, 1, 1, 'F')
    doc.rect(M + 1.5, y, 1.5, bh, 'F')

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(150, 35, 35)
    doc.text(lines, M + 8, y + 7.5)
    y += bh + 12
  }

  // ── Notizen ──────────────────────────────────────────
  if (gesamtNotizen?.trim()) {
    if (y > 238) { doc.addPage(); bgPage(doc); y = 20 }
    y = sectionTitle(doc, 'NOTIZEN', y)
    const lines = doc.splitTextToSize(gesamtNotizen, PW - M * 2 - 14)
    const bh = lines.length * 5.5 + 12

    doc.setFillColor(...WHITE)
    doc.setDrawColor(...BORDER)
    doc.setLineWidth(0.3)
    doc.roundedRect(M, y, PW - M * 2, bh, 2, 2, 'FD')
    leftBar(doc, M, y, bh)

    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8)
    doc.setTextColor(...GRAY)
    doc.text(lines, M + 8, y + 7.5)
    y += bh + 12
  }

  // ── Fotos — immer auf eigener Seite ─────────────────
  if (fotoUrls.length > 0) {
    doc.addPage()
    bgPage(doc)
    drawHeader(doc, logoData, 'Reinigungsprotokoll', datum, nr)
    y = 42

    y = sectionTitle(doc, `DOKUMENTATIONSFOTOS (${fotoUrls.length})`, y)

    const cols = 2
    const fw   = (PW - M * 2 - 6) / cols
    const fh   = 60

    for (let i = 0; i < fotoUrls.length; i++) {
      const col = i % cols
      if (col === 0 && i > 0) y += fh + 16
      if (y + fh + 16 > 272) {
        doc.addPage(); bgPage(doc)
        drawHeader(doc, logoData, 'Reinigungsprotokoll', datum, nr)
        y = 42
        y = sectionTitle(doc, `DOKUMENTATIONSFOTOS (${fotoUrls.length})`, y)
      }
      const fx = M + col * (fw + 6)

      // Foto-Rahmen
      doc.setFillColor(...WHITE)
      doc.setDrawColor(...BORDER)
      doc.setLineWidth(0.3)
      doc.roundedRect(fx, y, fw, fh + 9, 2, 2, 'FD')
      doc.setFillColor(...GOLD)
      doc.roundedRect(fx, y, fw, 2.5, 1, 1, 'F')
      doc.rect(fx, y + 1.5, fw, 1, 'F')

      const data = await imgToBase64(fotoUrls[i])
      if (data) {
        try { doc.addImage(data, 'JPEG', fx + 2, y + 4.5, fw - 4, fh - 1) } catch {}
      }
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(6)
      doc.setTextColor(...LIGHT)
      doc.text(`Foto ${i + 1}  ·  ${fmtDate(datum)}`, fx + 4, y + fh + 7)
    }
    y += fh + 20
  }

  // ── Unterschrift ─────────────────────────────────────
  if (signatureDataURL) {
    if (y > 190) {
      doc.addPage()
      bgPage(doc)
      drawHeader(doc, logoData, 'Reinigungsprotokoll', datum, nr)
      y = 42
    }

    y = sectionTitle(doc, 'UNTERSCHRIFT MITARBEITER', y)

    const sw = PW - M * 2
    const sh = 42

    doc.setFillColor(...WHITE)
    doc.setDrawColor(...BORDER)
    doc.setLineWidth(0.3)
    doc.roundedRect(M, y, sw, sh, 2, 2, 'FD')
    doc.addImage(signatureDataURL, 'PNG', M + 4, y + 3, sw - 8, sh - 6)
    y += sh + 5

    // Linie und Name
    doc.setDrawColor(...GOLD)
    doc.setLineWidth(0.4)
    doc.line(M + 5, y, M + 85, y)
    y += 5
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...DARK)
    doc.text(mitarbeiter || '—', M + 45, y, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6.5)
    doc.setTextColor(...GRAY)
    doc.text('Berlin, ' + fmtDate(datum), M + 5, y + 6)
    y += 14

    // Bestätigungshinweis
    const hw = PW - M * 2
    doc.setFillColor(...CREAM)
    doc.setDrawColor(...BORDER)
    doc.setLineWidth(0.3)
    doc.roundedRect(M, y, hw, 14, 2, 2, 'FD')
    leftBar(doc, M, y, 14)
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(6.5)
    doc.setTextColor(...LIGHT)
    doc.text(
      'Mit seiner Unterschrift bestätigt der Mitarbeiter die ordnungsgemäße Durchführung aller Reinigungsarbeiten.',
      M + 7, y + 5.5, { maxWidth: hw - 10 }
    )
    doc.text('Dieses Protokoll wurde digital erstellt und ist ohne Stempel rechtsgültig.', M + 7, y + 11)
  }

  // ── Footer auf allen Seiten ──────────────────────────
  const total = doc.internal.getNumberOfPages()
  for (let i = 1; i <= total; i++) {
    doc.setPage(i)
    drawFooter(doc, i, total)
  }

  return doc.output('blob')
}


// ─────────────────────────────────────────────────────────
// SCHADENSMELDUNG PDF
// ─────────────────────────────────────────────────────────
export async function generateSchadenPDF({
  objekt, hausverwaltung, titel, beschreibung, datum, fotoUrl
}) {
  const doc      = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const nr       = `SCH-${Date.now().toString().slice(-8)}`
  const d        = datum || new Date().toISOString().split('T')[0]
  const logoData = await imgToBase64('/logo.png')

  bgPage(doc)
  drawHeader(doc, logoData, 'Schadensmeldung', d, nr)

  let y = 30
  const TW = PW - 2 * M
  const cw3 = TW / 3

  // ── 3-spaltige Info-Zeile ────────────────────────────
  infoCol(doc, M,       y, cw3, 'OBJEKT',         objekt?.name || '—',       objekt?.adresse || '')
  infoCol(doc, M+cw3,   y, cw3, 'HAUSVERWALTUNG', hausverwaltung || '—',     '')
  infoCol(doc, M+cw3*2, y, cw3, 'GEMELDET AM',    fmtDate(d),               '')

  y += 25

  // ── Schadenstitel ────────────────────────────────────
  y = sectionTitle(doc, 'SCHADENSTITEL', y)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(...DARK)
  doc.text(titel || '—', M, y - 2)
  y += 10

  // ── Beschreibung ─────────────────────────────────────
  if (beschreibung?.trim()) {
    y = sectionTitle(doc, 'BESCHREIBUNG', y)
    const lines = doc.splitTextToSize(beschreibung, PW - M * 2 - 14)
    const bh    = lines.length * 5.5 + 12

    doc.setFillColor(...WHITE)
    doc.setDrawColor(...BORDER)
    doc.setLineWidth(0.3)
    doc.roundedRect(M, y, PW - M * 2, bh, 2, 2, 'FD')
    leftBar(doc, M, y, bh)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...GRAY)
    doc.text(lines, M + 8, y + 7.5)
    y += bh + 12
  }

  // ── Foto ─────────────────────────────────────────────
  if (fotoUrl) {
    if (y > 180) { doc.addPage(); bgPage(doc); drawHeader(doc, logoData, 'Schadensmeldung', d, nr); y = 42 }

    y = sectionTitle(doc, 'FOTODOKUMENTATION', y)

    const fw = PW - M * 2
    const fh = 95

    doc.setFillColor(...WHITE)
    doc.setDrawColor(...BORDER)
    doc.setLineWidth(0.3)
    doc.roundedRect(M, y, fw, fh + 8, 2, 2, 'FD')
    doc.setFillColor(...GOLD)
    doc.roundedRect(M, y, fw, 2.5, 1, 1, 'F')
    doc.rect(M, y + 1.5, fw, 1, 'F')

    const data = await imgToBase64(fotoUrl)
    if (data) {
      try { doc.addImage(data, 'JPEG', M + 3, y + 5, fw - 6, fh) } catch {}
    }
    y += fh + 18
  }

  // ── Status ───────────────────────────────────────────
  if (y > 255) { doc.addPage(); bgPage(doc); drawHeader(doc, logoData, 'Schadensmeldung', d, nr); y = 42 }

  doc.setFillColor(255, 248, 248)
  doc.setDrawColor(215, 190, 190)
  doc.setLineWidth(0.3)
  doc.roundedRect(M, y, 80, 12, 2, 2, 'FD')
  doc.setFillColor(...RED)
  doc.roundedRect(M, y, 3, 12, 1, 1, 'F')
  doc.rect(M + 1.5, y, 1.5, 12, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...RED)
  doc.text('Status: Offen – nicht behoben', M + 8, y + 7.5)
  y += 18

  // ── Hinweis ──────────────────────────────────────────
  doc.setFillColor(...CREAM)
  doc.setDrawColor(...BORDER)
  doc.setLineWidth(0.3)
  doc.roundedRect(M, y, PW - M * 2, 14, 2, 2, 'FD')
  leftBar(doc, M, y, 14)
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(6.5)
  doc.setTextColor(...LIGHT)
  doc.text(
    'Diese Schadensmeldung wurde automatisch durch das Nautilus Facility Cleaning System erstellt.',
    M + 7, y + 5.5, { maxWidth: PW - M * 2 - 10 }
  )
  doc.text('Bitte umgehend Kontakt mit dem zuständigen Team aufnehmen.', M + 7, y + 11)

  // ── Footer ───────────────────────────────────────────
  const total = doc.internal.getNumberOfPages()
  for (let i = 1; i <= total; i++) {
    doc.setPage(i)
    drawFooter(doc, i, total)
  }

  return doc.output('blob')
}
