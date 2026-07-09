import jsPDF from "jspdf";
import type { Category, Model } from "@/lib/products";
import logoUrl from "@/assets/csi-logo.png";

const BRAND = { r: 13, g: 67, b: 97 };
const ACCENT = { r: 13, g: 107, b: 120 };
const TEXT = { r: 10, g: 47, b: 68 };
const MUTED = { r: 100, g: 116, b: 139 };
const SOFT = { r: 241, g: 245, b: 249 };
const DOMAIN = "csifans.pages.dev";

type LoadedImage = { dataUrl: string; w: number; h: number };
const imageCache = new Map<string, LoadedImage | null>();

async function loadImage(src: string): Promise<LoadedImage | null> {
  if (imageCache.has(src)) return imageCache.get(src)!;
  try {
    const res = await fetch(src);
    const blob = await res.blob();
    const dataUrl: string = await new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.onerror = reject;
      r.readAsDataURL(blob);
    });
    const dims: { w: number; h: number } = await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
      img.onerror = () => resolve({ w: 1, h: 1 });
      img.src = dataUrl;
    });
    const out = { dataUrl, ...dims };
    imageCache.set(src, out);
    return out;
  } catch {
    imageCache.set(src, null);
    return null;
  }
}

function detectFormat(dataUrl: string): "PNG" | "JPEG" {
  if (dataUrl.startsWith("data:image/jpeg") || dataUrl.startsWith("data:image/jpg")) return "JPEG";
  return "PNG";
}

function collectSpecs(model: Model): [string, string][] {
  const rows: [string, string][] = [];
  const push = (k: string, v?: string | string[]) => {
    if (!v) return;
    const val = Array.isArray(v) ? v.join(", ") : v;
    if (val.trim()) rows.push([k, val]);
  };
  push("Model No.", model.modelNo);
  push("Fan Type", model.fanType);
  push("Sweep", model.sweep);
  push("Speed", model.rpm);
  push("Air Delivery", model.airDelivery);
  push("Power Consumption", model.power);
  push("Voltage", model.voltage);
  push("Frequency", model.frequency);
  push("Blades", model.blades);
  push("Blade Material", model.bladeMaterial);
  push("Motor", model.motor);
  push("Colors", model.colors);
  push("Warranty", model.warranty);
  if (model.specifications?.length) {
    for (const s of model.specifications) {
      if (s.value && !rows.find(([k]) => k.toLowerCase() === s.label.toLowerCase())) {
        rows.push([s.label, s.value]);
      }
    }
  }
  return rows;
}

async function drawLogo(doc: jsPDF, x: number, y: number, maxH: number) {
  const img = await loadImage(logoUrl);
  if (!img) return 0;
  const ratio = img.w / img.h;
  const dh = maxH;
  const dw = dh * ratio;
  try {
    doc.addImage(img.dataUrl, detectFormat(img.dataUrl), x, y, dw, dh);
  } catch {}
  return dw;
}

async function drawHeader(doc: jsPDF, title: string, subtitle: string) {
  const w = doc.internal.pageSize.getWidth();
  doc.setFillColor(BRAND.r, BRAND.g, BRAND.b);
  doc.rect(0, 0, w, 22, "F");
  doc.setFillColor(ACCENT.r, ACCENT.g, ACCENT.b);
  doc.rect(0, 22, w, 1.5, "F");

  // Logo on white pill
  const pillX = 10;
  const pillY = 4;
  const pillH = 14;
  const pillW = 34;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(pillX, pillY, pillW, pillH, 2, 2, "F");
  await drawLogo(doc, pillX + 2, pillY + 1.5, pillH - 3);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(title, pillX + pillW + 6, 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(220, 235, 245);
  doc.text(subtitle, pillX + pillW + 6, 17);

  doc.setFontSize(8);
  doc.setTextColor(220, 235, 245);
  doc.text(DOMAIN, w - 12, 14, { align: "right" });
}

function drawFooter(doc: jsPDF, pageNum: number, totalPages?: number) {
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  doc.setDrawColor(226, 232, 240);
  doc.line(12, h - 14, w - 12, h - 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  doc.text(`CSI Fans · ${DOMAIN}`, 12, h - 8);
  const p = totalPages ? `Page ${pageNum} / ${totalPages}` : `Page ${pageNum}`;
  doc.text(p, w - 12, h - 8, { align: "right" });
}

async function drawModelPage(doc: jsPDF, model: Model, cat: Category) {
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  const contentTop = 30;
  const margin = 14;

  // Category chip
  doc.setFillColor(ACCENT.r, ACCENT.g, ACCENT.b);
  doc.roundedRect(margin, contentTop, doc.getTextWidth(cat.name) + 8, 6, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(cat.name.toUpperCase(), margin + 4, contentTop + 4.2);

  // Title
  doc.setTextColor(TEXT.r, TEXT.g, TEXT.b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(model.name, margin, contentTop + 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(ACCENT.r, ACCENT.g, ACCENT.b);
  doc.text(`Model No. ${model.modelNo}`, margin, contentTop + 22);

  // Hero image panel
  const imgY = contentTop + 28;
  const imgW = w - margin * 2;
  const imgH = 90;
  doc.setFillColor(SOFT.r, SOFT.g, SOFT.b);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, imgY, imgW, imgH, 4, 4, "FD");
  const img = await loadImage(model.image);
  if (img) {
    const ratio = img.w / img.h;
    let dw = imgW - 20;
    let dh = dw / ratio;
    if (dh > imgH - 12) {
      dh = imgH - 12;
      dw = dh * ratio;
    }
    const dx = margin + (imgW - dw) / 2;
    const dy = imgY + (imgH - dh) / 2;
    try {
      doc.addImage(img.dataUrl, detectFormat(img.dataUrl), dx, dy, dw, dh);
    } catch {}
  }

  let y = imgY + imgH + 8;

  // Description
  if (model.description) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60, 70, 82);
    const lines = doc.splitTextToSize(model.description, w - margin * 2);
    doc.text(lines, margin, y);
    y += lines.length * 4.6 + 4;
  }

  // Highlights band
  if (model.highlights?.length) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(ACCENT.r, ACCENT.g, ACCENT.b);
    doc.text("KEY HIGHLIGHTS", margin, y);
    y += 4;
    doc.setDrawColor(ACCENT.r, ACCENT.g, ACCENT.b);
    doc.setLineWidth(0.4);
    doc.line(margin, y, margin + 30, y);
    y += 3;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(TEXT.r, TEXT.g, TEXT.b);
    const colW = (w - margin * 2 - 6) / 2;
    let col = 0;
    let rowY = y;
    for (const hl of model.highlights) {
      const cx = margin + col * (colW + 6);
      const lines = doc.splitTextToSize(`•  ${hl}`, colW);
      doc.text(lines, cx, rowY);
      if (col === 1) {
        rowY += Math.max(lines.length, 1) * 4.4 + 1;
      }
      col = col === 0 ? 1 : 0;
    }
    if (col === 1) rowY += 4.4;
    y = rowY + 4;
  }

  // Specifications section header
  if (y > h - 60) {
    doc.addPage();
    await drawHeader(doc, cat.name, `Model ${model.modelNo}`);
    y = 34;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(BRAND.r, BRAND.g, BRAND.b);
  doc.text("SPECIFICATIONS", margin, y);
  y += 2;
  doc.setDrawColor(BRAND.r, BRAND.g, BRAND.b);
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + 34, y);
  y += 5;

  // Two-column spec table
  const specs = collectSpecs(model);
  const tableW = w - margin * 2;
  const colGap = 6;
  const colW = (tableW - colGap) / 2;
  const rowH = 6.4;
  const labelW = 32;
  doc.setFontSize(8.5);

  let leftY = y;
  let rightY = y;
  specs.forEach((row, i) => {
    const isLeft = i % 2 === 0;
    const cx = margin + (isLeft ? 0 : colW + colGap);
    const cy = isLeft ? leftY : rightY;
    if (cy > h - 22) return;
    // zebra
    if (Math.floor(i / 2) % 2 === 0) {
      doc.setFillColor(SOFT.r, SOFT.g, SOFT.b);
      doc.rect(cx, cy - 4.2, colW, rowH, "F");
    }
    doc.setFont("helvetica", "bold");
    doc.setTextColor(TEXT.r, TEXT.g, TEXT.b);
    const [k, v] = row;
    const kLines = doc.splitTextToSize(k, labelW - 2);
    doc.text(kLines, cx + 2, cy);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 70, 82);
    const vLines = doc.splitTextToSize(v, colW - labelW - 4);
    doc.text(vLines, cx + labelW, cy);
    const usedH = Math.max(kLines.length, vLines.length) * 4 + 2.4;
    if (isLeft) leftY = cy + Math.max(rowH, usedH);
    else rightY = cy + Math.max(rowH, usedH);
  });
  y = Math.max(leftY, rightY) + 4;

  // Features
  if (model.features?.length && y < h - 30) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(BRAND.r, BRAND.g, BRAND.b);
    doc.text("FEATURES", margin, y);
    y += 2;
    doc.setDrawColor(BRAND.r, BRAND.g, BRAND.b);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + 22, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(TEXT.r, TEXT.g, TEXT.b);
    for (const f of model.features) {
      if (y > h - 20) break;
      const lines = doc.splitTextToSize(`✓  ${f}`, w - margin * 2);
      doc.text(lines, margin, y);
      y += lines.length * 4.4 + 0.6;
    }
  }
}

async function drawCoverPage(doc: jsPDF, title: string, subtitle: string, image?: string) {
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  doc.setFillColor(BRAND.r, BRAND.g, BRAND.b);
  doc.rect(0, 0, w, h, "F");
  // Accent gradient bars
  doc.setFillColor(ACCENT.r, ACCENT.g, ACCENT.b);
  doc.rect(0, h * 0.55, w, 4, "F");
  doc.setFillColor(255, 255, 255);
  doc.rect(0, h * 0.55 + 4, w, 0.4, "F");

  // Logo pill
  const pillW = 70;
  const pillH = 28;
  const pillX = (w - pillW) / 2;
  const pillY = 26;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(pillX, pillY, pillW, pillH, 4, 4, "F");
  const logo = await loadImage(logoUrl);
  if (logo) {
    const ratio = logo.w / logo.h;
    let dh = pillH - 8;
    let dw = dh * ratio;
    if (dw > pillW - 8) {
      dw = pillW - 8;
      dh = dw / ratio;
    }
    try {
      doc.addImage(
        logo.dataUrl,
        detectFormat(logo.dataUrl),
        pillX + (pillW - dw) / 2,
        pillY + (pillH - dh) / 2,
        dw,
        dh
      );
    } catch {}
  }

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("CSI FANS", w / 2, pillY + pillH + 14, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(200, 220, 235);
  doc.text("Product Catalogue", w / 2, pillY + pillH + 21, { align: "center" });

  if (image) {
    const img = await loadImage(image);
    if (img) {
      const boxW = w - 60;
      const boxH = 80;
      const ratio = img.w / img.h;
      let dw = boxW;
      let dh = dw / ratio;
      if (dh > boxH) {
        dh = boxH;
        dw = dh * ratio;
      }
      try {
        doc.addImage(
          img.dataUrl,
          detectFormat(img.dataUrl),
          (w - dw) / 2,
          h * 0.55 + 15,
          dw,
          dh
        );
      } catch {}
    }
  }

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  const titleLines = doc.splitTextToSize(title, w - 40);
  doc.text(titleLines, w / 2, h - 55, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(210, 228, 240);
  const subLines = doc.splitTextToSize(subtitle, w - 50);
  doc.text(subLines, w / 2, h - 40, { align: "center" });
  doc.setFontSize(9);
  doc.setTextColor(180, 205, 225);
  doc.text(DOMAIN, w / 2, h - 18, { align: "center" });
}

function safeFilename(s: string) {
  return s.replace(/[^a-z0-9\-]+/gi, "-").replace(/-+/g, "-").toLowerCase();
}

function stampPageNumbers(doc: jsPDF) {
  const total = doc.getNumberOfPages();
  for (let i = 2; i <= total; i++) {
    doc.setPage(i);
    drawFooter(doc, i, total);
  }
}

export async function downloadCategoryCatalogue(cat: Category) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  await drawCoverPage(doc, cat.name, cat.description, cat.image);

  for (const model of cat.models) {
    doc.addPage();
    await drawHeader(doc, cat.name, `Model ${model.modelNo}`);
    await drawModelPage(doc, model, cat);
  }
  stampPageNumbers(doc);
  doc.save(`csi-fans-${safeFilename(cat.slug)}-catalogue.pdf`);
}

export async function downloadProductCatalogue(cat: Category, model: Model) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  await drawCoverPage(doc, model.name, `${cat.name} · ${model.modelNo}`, model.image);
  doc.addPage();
  await drawHeader(doc, cat.name, `Model ${model.modelNo}`);
  await drawModelPage(doc, model, cat);
  stampPageNumbers(doc);
  doc.save(`csi-fans-${safeFilename(model.modelNo)}-spec.pdf`);
}

export async function downloadFullCatalogue(cats: Category[]) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  await drawCoverPage(
    doc,
    "Full Product Catalogue",
    "Ceiling, pedestal, table, wall, exhaust and premium fans engineered for Indian homes and offices.",
    cats[0]?.image
  );

  for (const cat of cats) {
    // Category divider page
    doc.addPage();
    await drawHeader(doc, cat.name, cat.tagline);
    const w = doc.internal.pageSize.getWidth();
    doc.setTextColor(TEXT.r, TEXT.g, TEXT.b);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text(cat.name, 14, 46);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(ACCENT.r, ACCENT.g, ACCENT.b);
    doc.text(cat.tagline, 14, 54);
    doc.setFontSize(10);
    doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
    const desc = doc.splitTextToSize(cat.description, w - 28);
    doc.text(desc, 14, 62);

    // Category hero
    const heroImg = await loadImage(cat.image);
    if (heroImg) {
      const boxY = 62 + desc.length * 5 + 6;
      const boxW = w - 28;
      const boxH = 110;
      doc.setFillColor(SOFT.r, SOFT.g, SOFT.b);
      doc.roundedRect(14, boxY, boxW, boxH, 4, 4, "F");
      const ratio = heroImg.w / heroImg.h;
      let dw = boxW - 20;
      let dh = dw / ratio;
      if (dh > boxH - 12) {
        dh = boxH - 12;
        dw = dh * ratio;
      }
      try {
        doc.addImage(
          heroImg.dataUrl,
          detectFormat(heroImg.dataUrl),
          14 + (boxW - dw) / 2,
          boxY + (boxH - dh) / 2,
          dw,
          dh
        );
      } catch {}
    }

    for (const model of cat.models) {
      doc.addPage();
      await drawHeader(doc, cat.name, `Model ${model.modelNo}`);
      await drawModelPage(doc, model, cat);
    }
  }
  stampPageNumbers(doc);
  doc.save("csi-fans-full-catalogue.pdf");
}
