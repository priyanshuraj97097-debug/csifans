import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/products";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Our Products | CSI Fans" },
      { name: "description", content: "Explore the full CSI Fans range — ceiling fans, high-speed fans, exhaust fans, decorative fans and the premium Super TOOPHAN series." },
      { property: "og:title", content: "CSI Fans Product Range" },
      { property: "og:description", content: "Ceiling, high-speed, exhaust, decorative and premium series fans." },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: Products,
});

function Products() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Our Range" title="Fans for Every Space" subtitle="From everyday ceiling fans to flagship BLDC models — built to perform." />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/products/$category"
              params={{ category: c.slug }}
              className="group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-50 to-[#0d6b78]/5">
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">{c.name}</h3>
                <p className="mt-1 font-[Inter] text-sm text-[#0d6b78] font-medium">{c.tagline}</p>
                <p className="mt-3 font-[Inter] text-sm text-slate-600 line-clamp-2">{c.description}</p>
                <div className="mt-5 inline-flex items-center gap-1 font-[Poppins] text-sm font-semibold text-[#0d4361] group-hover:gap-2 transition-all">
                  View Range <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
