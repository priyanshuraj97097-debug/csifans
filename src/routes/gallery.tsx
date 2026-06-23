import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { allModels } from "@/lib/products";
import { Lightbox } from "@/components/site/Lightbox";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | CSI Fans" },
      { name: "description", content: "Explore the complete CSI Fans image gallery — ceiling, wall, cabin, exhaust, decorative and premium BLDC fans." },
      { property: "og:title", content: "CSI Fans Gallery" },
      { property: "og:description", content: "Premium fan renders and product photography from CSI Fans." },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  // Build a deduped image list paired with the product name for alt text
  const items = useMemo(() => {
    const seen = new Set<string>();
    const out: { src: string; label: string; category: string }[] = [];
    for (const m of allModels) {
      const imgs = m.images && m.images.length ? m.images : [m.image];
      for (const src of imgs) {
        if (seen.has(src)) continue;
        seen.add(src);
        out.push({ src, label: m.name, category: m.categoryName });
      }
    }
    return out;
  }, []);

  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Gallery" title="The CSI Fans Collection" subtitle={`Browse ${items.length}+ premium fan renders. Click any image to view fullscreen.`} />

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((it, i) => (
            <button
              key={`${it.src}-${i}`}
              onClick={() => setOpen(i)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-[#0d6b78]/5 ring-1 ring-white/60 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"
              aria-label={`Open ${it.label}`}
            >
              <img src={it.src} alt={it.label} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="font-[Poppins] text-white text-xs font-semibold truncate">{it.label}</p>
                <p className="font-[Inter] text-white/80 text-[10px]">{it.category}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <Lightbox images={items.map((i) => i.src)} initial={open} onClose={() => setOpen(null)} />
      )}
    </div>
  );
}
