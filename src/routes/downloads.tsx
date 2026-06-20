import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, ShieldCheck, BookOpen } from "lucide-react";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads | CSI Fans" },
      { name: "description", content: "Download CSI Fans catalogues, brochures and warranty documents." },
      { property: "og:title", content: "CSI Fans Downloads" },
      { property: "og:description", content: "Product catalogues, brochures and warranty documents." },
    ],
    links: [{ rel: "canonical", href: "/downloads" }],
  }),
  component: Downloads,
});

const files = [
  { icon: BookOpen, t: "Full Product Catalogue 2026", size: "8.4 MB · PDF" },
  { icon: FileText, t: "Super TOOPHAN Premium Brochure", size: "3.1 MB · PDF" },
  { icon: FileText, t: "Ceiling Fans Brochure", size: "2.7 MB · PDF" },
  { icon: FileText, t: "High-Speed Fans Brochure", size: "2.4 MB · PDF" },
  { icon: FileText, t: "Exhaust Fans Brochure", size: "1.9 MB · PDF" },
  { icon: ShieldCheck, t: "Warranty Terms & Conditions", size: "640 KB · PDF" },
  { icon: ShieldCheck, t: "ISO 9001:2015 Certificate", size: "1.2 MB · PDF" },
];

function Downloads() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Downloads" title="Catalogues & Documents" subtitle="All the resources you need — in one place." />
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {files.map(({ icon: Icon, t, size }) => (
            <a key={t} href="#" className="group flex items-center gap-4 rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="h-12 w-12 grid place-items-center rounded-xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white shrink-0">
                <Icon className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-[Poppins] font-semibold text-[#0a2f44] truncate">{t}</h4>
                <p className="font-[Inter] text-xs text-slate-500">{size}</p>
              </div>
              <Download className="h-5 w-5 text-[#0d6b78] group-hover:translate-y-0.5 transition-transform" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
