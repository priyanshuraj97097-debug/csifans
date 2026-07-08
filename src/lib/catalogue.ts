import jsPDF from "jspdf";
import type { Category, Model } from "@/lib/products";

const BRAND = { r: 13, g: 67, b: 97 };
const ACCENT = { r: 13, g: 107, b: 120 };
const TEXT = { r: 10, g: 47, b: 68 };
const MUTED = { r: 100, g: 116, b: 139 };

async function loadImage(src: string): Promise<{ dataUrl: string; w: number; h: number } | null> {
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
    return { dataUrl, ...dims };
  } catch {
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

function drawHeader(doc: jsPDF, title: string, subtitle: string) {
  const w = doc.internal.pageSize.getWidth();
  doc.setFillColor(BRAND.r, BRAND.g, BRAND.b);
  doc.rect(0, 0, w, 26, "F");
  doc.setFillColor(ACCENT.r, ACCENT.g, ACCENT.b);
  doc.rect(0, 26, w, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("CSI FANS", 14, 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(title, 14, 20);
  doc.setFontSize(8);
  doc.text(subtitle, w - 14, 20, { align: "right" });
}

function drawFooter(doc: jsPDF, pageNum: number) {
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  doc.setDrawColor(220, 220, 220);
  doc.line(14, h - 14, w - 14, h - 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  doc.text("CSI Fans · csifans.com", 14, h - 8);
  doc.text(`Page ${pageNum}`, w - 14, h - 8, { align: "right" });
}

async function drawModel(doc: jsPDF, model: Model, cat: Category, yStart: number): Promise<number> {
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  const bottomLimit = h - 20;
  const cardX = 14;
  const cardW = w - 28;

  // Estimate card height
  const specs = collectSpecs(model);
  const imgBoxW = 60;
  const imgBoxH = 60;
  const rowH = 5.2;
  const specsH = specs.length * rowH + 6;
  const highlightsH = model.highlights?.length ? Math.min(model.highlights.length, 6) * 4.5 + 6 : 0;
  const cardH = Math.max(imgBoxH + 10, specsH + highlightsH + 20);

  if (yStart + cardH > bottomLimit) return -1;

  // Card background
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(cardX, yStart, cardW, cardH, 3, 3, "FD");

  // Title
  doc.setTextColor(TEXT.r, TEXT.g, TEXT.b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(model.name, cardX + 6, yStart + 8);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(ACCENT.r, ACCENT.g, ACCENT.b);
  doc.text(`${cat.name} · ${model.modelNo}`, cardX + 6, yStart + 13);

  // Image
  const imgX = cardX + cardW - imgBoxW - 6;
  const imgY = yStart + 6;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(imgX, imgY, imgBoxW, imgBoxH, 2, 2, "FD");
  const img = await loadImage(model.image);
  if (img) {
    const ratio = img.w / img.h;
    let dw = imgBoxW - 6;
    let dh = dw / ratio;
    if (dh > imgBoxH - 6) {
      dh = imgBoxH - 6;
      dw = dh * ratio;
    }
    const dx = imgX + (imgBoxW - dw) / 2;
    const dy = imgY + (imgBoxH - dh) / 2;
    try {
      doc.addImage(img.dataUrl, detectFormat(img.dataUrl), dx, dy, dw, dh);
    } catch {}
  }

  // Specs table
  let sy = yStart + 20;
  const specsX = cardX + 6;
  const specsW = cardW - imgBoxW - 18;
  doc.setFontSize(9);
  for (const [k, v] of specs) {
    if (sy + rowH > yStart + cardH - 4) break;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(TEXT.r, TEXT.g, TEXT.b);
    doc.text(k, specsX, sy);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    const lines = doc.splitTextToSize(v, specsW - 42);
    doc.text(lines, specsX + 40, sy);
    sy += rowH * Math.max(1, lines.length);
  }

  // Highlights below image area
  if (model.highlights?.length) {
    let hy = imgY + imgBoxH + 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(ACCENT.r, ACCENT.g, ACCENT.b);
    doc.text("Highlights", imgX, hy);
    hy += 4;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    for (const hl of model.highlights.slice(0, 4)) {
      if (hy + 4 > yStart + cardH - 2) break;
      const lines = doc.splitTextToSize(`• ${hl}`, imgBoxW);
      doc.text(lines, imgX, hy);
      hy += 4 * lines.length;
    }
  }

  return yStart + cardH + 6;
}

async function drawCoverPage(doc: jsPDF, title: string, subtitle: string, image?: string) {
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  doc.setFillColor(BRAND.r, BRAND.g, BRAND.b);
  doc.rect(0, 0, w, h, "F");
  doc.setFillColor(ACCENT.r, ACCENT.g, ACCENT.b);
  doc.rect(0, h * 0.55, w, 6, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text("CSI FANS", 20, 40);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Product Catalogue", 20, 50);

  if (image) {
    const img = await loadImage(image);
    if (img) {
      const boxW = w - 40;
      const boxH = 90;
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
  doc.text(title, 20, h - 50);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const subLines = doc.splitTextToSize(subtitle, w - 40);
  doc.text(subLines, 20, h - 40);
  doc.setFontSize(9);
  doc.text("csifans.com", 20, h - 20);
}

function safeFilename(s: string) {
  return s.replace(/[^a-z0-9\-]+/gi, "-").replace(/-+/g, "-").toLowerCase();
}

export async function downloadCategoryCatalogue(cat: Category) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  await drawCoverPage(doc, cat.name, cat.description, cat.image);
  let page = 1;

  for (const model of cat.models) {
    doc.addPage();
    page += 1;
    drawHeader(doc, cat.name, `Model ${model.modelNo}`);
    drawFooter(doc, page);
    let y = 34;
    const nextY = await drawModel(doc, model, cat, y);
    if (nextY === -1) {
      // shouldn't happen; ensure content still drawn
      y = 34;
      await drawModel(doc, model, cat, y);
    }
  }
  doc.save(`csi-fans-${safeFilename(cat.slug)}-catalogue.pdf`);
}

export async function downloadProductCatalogue(cat: Category, model: Model) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  await drawCoverPage(doc, model.name, cat.name, model.image);
  doc.addPage();
  drawHeader(doc, cat.name, `Model ${model.modelNo}`);
  drawFooter(doc, 2);
  await drawModel(doc, model, cat, 34);
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
  let page = 1;

  for (const cat of cats) {
    doc.addPage();
    page += 1;
    drawHeader(doc, cat.name, cat.tagline);
    drawFooter(doc, page);
    // section title
    doc.setTextColor(TEXT.r, TEXT.g, TEXT.b);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(cat.name, 14, 42);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
    const desc = doc.splitTextToSize(cat.description, doc.internal.pageSize.getWidth() - 28);
    doc.text(desc, 14, 50);

    let y = 50 + desc.length * 5 + 6;
    for (const model of cat.models) {
      let nextY = await drawModel(doc, model, cat, y);
      if (nextY === -1) {
        doc.addPage();
        page += 1;
        drawHeader(doc, cat.name, cat.tagline);
        drawFooter(doc, page);
        y = 34;
        nextY = await drawModel(doc, model, cat, y);
      }
      y = nextY;
    }
  }
  doc.save("csi-fans-full-catalogue.pdf");
}
