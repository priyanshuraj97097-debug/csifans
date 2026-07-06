import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Zap } from "lucide-react";
import { categories } from "@/lib/products";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/new-launches")({
  head: () => ({
    meta: [
      { title: "New Launches | CSI Fans" },
      { name: "description", content: "Explore the latest fans launched by CSI — premium BLDC, decorative and high-speed models freshly added to our lineup." },
      { property: "og:title", content: "New Launches — CSI Fans" },
      { property: "og:description", content: "The newest CSI Fans models. Premium BLDC, decorative and high-speed fans." },
    ],
    links: [{ rel: "canonical", href: "/new-launches" }],
  }),
  component: NewLaunches,
});

function NewLaunches() {
  // Curate latest launches: pick the premium series + first model of every other category
  const launches = [
    ...categories.find((c) => c.slug === "premium-series")!.models.map((m) => ({ m, cat: categories.find((c) => c.slug === "premium-series")! })),
    ...categories
      .filter((c) => c.slug !== "premium-series")
      .map((c) => ({ m: c.models[0], cat: c })),
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] px-4 py-1.5 font-[Inter] text-xs font-semibold text-white shadow-lg">
            <Sparkles className="h-3.5 w-3.5" /> Just Launched
          </span>
        </div>
        <SectionHeader
          eyebrow="New Launches"
          title="Freshly Engineered for 2026"
          subtitle="Discover the newest CSI Fans — built with the latest BLDC technology, premium finishes and class-leading air delivery."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {launches.map(({ m, cat }, i) => (
            <Link
              key={m.modelNo}
              to="/products/$category"
              params={{ category: cat.slug }}
              className="group relative rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-lg shadow-[#0d4361]/5 hover:shadow-2xl hover:shadow-[#0d4361]/15 hover:-translate-y-1 transition-all overflow-hidden"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-[Poppins] font-bold tracking-wide text-[#0d4361] shadow-md">
                <Zap className="h-3 w-3" /> NEW
              </div>
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-[#0d6b78]/5">
                <img
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <p className="font-[Inter] text-xs text-[#0d6b78] font-semibold uppercase tracking-wider">{cat.name}</p>
                <h3 className="mt-1 font-[Poppins] text-lg font-bold text-[#0a2f44] line-clamp-2">{m.name}</h3>
                <p className="mt-2 font-[Inter] text-xs text-slate-500">Model: {m.modelNo}</p>
                <ul className="mt-3 space-y-1">
                  {m.highlights.slice(0, 2).map((h) => (
                    <li key={h} className="font-[Inter] text-xs text-slate-600 flex items-start gap-1.5">
                      <span className="text-[#0d6b78] mt-0.5">●</span> {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-[Poppins] text-2xl font-extrabold text-[#0d4361]">
                    ₹{m.price.toLocaleString("en-IN")}
                  </span>
                  <span className="inline-flex items-center gap-1 font-[Poppins] text-sm font-semibold text-[#0d6b78] group-hover:gap-2 transition-all">
                    View <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] px-6 py-3.5 font-[Poppins] font-semibold text-white shadow-xl shadow-[#0d6b78]/30 hover:shadow-2xl hover:scale-105 transition-all"
          >
            View All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
