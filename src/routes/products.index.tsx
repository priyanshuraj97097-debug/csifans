import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search as SearchIcon } from "lucide-react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { categories, searchModels } from "@/lib/products";
import { SectionHeader } from "@/components/site/SectionHeader";

const productsSearchSchema = z.object({
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/products/")({
  validateSearch: zodValidator(productsSearchSchema),
  head: () => ({
    meta: [
      { title: "Our Products | CSI Fans" },
      {
        name: "description",
        content:
          "Explore CSI table fans, pedestal fans, ceiling fans, premium BLDC fans, and upcoming wall, exhaust, and special fan categories.",
      },
      { property: "og:title", content: "CSI Fans Product Range" },
      {
        property: "og:description",
        content:
          "Browse table, pedestal, ceiling, premium, wall, exhaust, and special fan categories from CSI Fans.",
      },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: Products,
});

function Products() {
  const { q } = Route.useSearch();
  const results = q ? searchModels(q) : [];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {q ? (
          <>
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#0d6b78]/10 px-4 py-1.5 font-[Inter] text-xs font-semibold text-[#0d4361]">
                <SearchIcon className="h-3.5 w-3.5" /> Search results
              </span>
              <h1 className="mt-4 font-[Poppins] text-3xl sm:text-4xl font-extrabold text-[#0a2f44]">
                &quot;{q}&quot;
              </h1>
              <p className="mt-2 font-[Inter] text-slate-600">
                {results.length} {results.length === 1 ? "product" : "products"} found
              </p>
              <Link to="/products" search={{}} className="mt-3 text-sm font-[Inter] text-[#0d6b78] hover:underline">
                Clear search
              </Link>
            </div>

            {results.length > 0 ? (
              <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((m) => (
                  <Link
                    key={m.modelNo}
                    to="/products/$category/$model"
                    params={{ category: m.categorySlug, model: m.slug }}
                    className="group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden"
                  >
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-[#0d6b78]/5">
                      <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <p className="font-[Inter] text-xs text-[#0d6b78] font-semibold">{m.categoryName}</p>
                      <h3 className="mt-1 font-[Poppins] font-semibold text-[#0a2f44]">{m.name}</h3>
                      <div className="mt-3 flex items-center justify-end">
                        <ArrowRight className="h-4 w-4 text-[#0d6b78] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-10 text-center">
                <p className="font-[Inter] text-slate-600">No products match your search. Browse all categories below.</p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {categories.map((c) => (
                    <Link key={c.slug} to="/products/$category" params={{ category: c.slug }} className="rounded-full bg-[#0d6b78]/10 hover:bg-[#0d6b78]/20 px-4 py-2 font-[Inter] text-sm text-[#0d4361]">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <SectionHeader eyebrow="Our Range" title="Fans for Every Space" subtitle="Browse table, pedestal, ceiling, premium BLDC, and upcoming specialty categories from CSI Fans." />
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
          </>
        )}
      </div>
    </div>
  );
}
