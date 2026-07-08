import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, BookOpen, Loader2 } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { categories } from "@/lib/products";
import { downloadCategoryCatalogue, downloadFullCatalogue } from "@/lib/catalogue";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads | CSI Fans" },
      { name: "description", content: "Download CSI Fans catalogues and product brochures." },
      { property: "og:title", content: "CSI Fans Downloads" },
      { property: "og:description", content: "Product catalogues and brochures." },
    ],
    links: [{ rel: "canonical", href: "/downloads" }],
  }),
  component: Downloads,
});

function Downloads() {
  const [busy, setBusy] = useState<string | null>(null);

  const run = async (key: string, fn: () => Promise<void>) => {
    if (busy) return;
    setBusy(key);
    try {
      await fn();
    } finally {
      setBusy(null);
    }
  };

  const items: {
    key: string;
    icon: typeof FileText;
    title: string;
    subtitle: string;
    onClick: () => void;
  }[] = [
    {
      key: "full",
      icon: BookOpen,
      title: "Full Product Catalogue",
      subtitle: `${categories.reduce((n, c) => n + c.models.length, 0)} models · PDF`,
      onClick: () => run("full", () => downloadFullCatalogue(categories)),
    },
    ...categories.map((c) => ({
      key: c.slug,
      icon: FileText,
      title: `${c.name} Brochure`,
      subtitle: `${c.models.length} model${c.models.length === 1 ? "" : "s"} · PDF`,
      onClick: () => run(c.slug, () => downloadCategoryCatalogue(c)),
    })),
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Downloads" title="Catalogues & Documents" subtitle="All the resources you need — in one place." />
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {items.map(({ key, icon: Icon, title, subtitle, onClick }) => {
            const isBusy = busy === key;
            return (
              <button
                key={key}
                type="button"
                onClick={onClick}
                disabled={!!busy}
                className="group flex items-center gap-4 rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all text-left disabled:opacity-70 disabled:cursor-wait"
              >
                <div className="h-12 w-12 grid place-items-center rounded-xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white shrink-0">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-[Poppins] font-semibold text-[#0a2f44] truncate">{title}</h4>
                  <p className="font-[Inter] text-xs text-slate-500">{isBusy ? "Preparing PDF…" : subtitle}</p>
                </div>
                {isBusy ? (
                  <Loader2 className="h-5 w-5 text-[#0d6b78] animate-spin" />
                ) : (
                  <Download className="h-5 w-5 text-[#0d6b78] group-hover:translate-y-0.5 transition-transform" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
