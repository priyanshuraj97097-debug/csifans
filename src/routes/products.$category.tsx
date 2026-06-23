import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Check, ArrowLeft, ArrowRight, SlidersHorizontal, Tag } from "lucide-react";
import { findCategory, categories, type Model, parseSweep, parsePower } from "@/lib/products";

export const Route = createFileRoute("/products/$category")({
  loader: ({ params }) => {
    const cat = findCategory(params.category);
    if (!cat) throw notFound();
    return cat;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Products"} | CSI Fans` },
      { name: "description", content: loaderData?.description ?? "CSI Fans product range." },
      { property: "og:title", content: `${loaderData?.name ?? "Products"} — CSI Fans` },
      { property: "og:description", content: loaderData?.tagline ?? "Premium fans." },
      { property: "og:image", content: loaderData?.image ?? "" },
    ],
    links: [{ rel: "canonical", href: `/products/${loaderData?.slug ?? ""}` }],
  }),
  notFoundComponent: () => (
    <div className="py-24 text-center px-4">
      <h1 className="font-[Poppins] text-3xl font-bold text-[#0a2f44]">Category not found</h1>
      <Link to="/products" search={{}} className="mt-6 inline-block text-[#0d6b78] underline">Back to products</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="py-24 text-center px-4">
      <h1 className="font-[Poppins] text-2xl font-bold text-[#0a2f44]">Something went wrong</h1>
      <p className="mt-2 text-slate-600 text-sm">{error.message}</p>
      <button onClick={reset} className="mt-6 rounded-full bg-[#0d4361] text-white px-5 py-2 text-sm">Try again</button>
    </div>
  ),
  component: CategoryPage,
});

type SortKey = "latest" | "popular" | "price-asc" | "price-desc";

function CategoryPage() {
  const cat = Route.useLoaderData();
  const [sort, setSort] = useState<SortKey>("latest");
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [maxSweep, setMaxSweep] = useState<number>(0);
  const [maxPower, setMaxPower] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  const priceCap = Math.max(...cat.models.map((m) => m.price));
  const sweepCap = Math.max(...cat.models.map((m) => parseSweep(m.sweep)));
  const powerCap = Math.max(...cat.models.map((m) => parsePower(m.power)));

  const models = useMemo(() => {
    let list = [...cat.models];
    if (maxPrice > 0) list = list.filter((m) => m.price <= maxPrice);
    if (maxSweep > 0) list = list.filter((m) => parseSweep(m.sweep) <= maxSweep);
    if (maxPower > 0) list = list.filter((m) => parsePower(m.power) <= maxPower);
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "popular": list.sort((a, b) => Number(b.tags?.includes("Best Seller")) - Number(a.tags?.includes("Best Seller"))); break;
      case "latest": list.sort((a, b) => Number(b.tags?.includes("New Arrival")) - Number(a.tags?.includes("New Arrival"))); break;
    }
    return list;
  }, [cat.models, sort, maxPrice, maxSweep, maxPower]);

  const resetFilters = () => { setMaxPrice(0); setMaxSweep(0); setMaxPower(0); setSort("latest"); };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link to="/products" search={{}} className="inline-flex items-center gap-1 text-sm font-[Inter] text-[#0d6b78] hover:underline">
          <ArrowLeft className="h-4 w-4" /> All categories
        </Link>

        <div className="mt-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block font-[Inter] text-xs font-bold tracking-[0.2em] uppercase text-[#0d6b78]">{cat.tagline}</span>
            <h1 className="mt-3 font-[Poppins] text-4xl sm:text-5xl font-extrabold text-[#0a2f44]">{cat.name}</h1>
            <p className="mt-5 font-[Inter] text-slate-600 leading-relaxed">{cat.description}</p>
            <Link
              to="/downloads"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] px-6 py-3 font-[Poppins] font-semibold text-white shadow-lg shadow-[#0d6b78]/30 hover:scale-105 transition-transform"
            >
              <Download className="h-4 w-4" /> Download Catalogue
            </Link>
          </div>
          <div className="rounded-3xl overflow-hidden ring-1 ring-white/60 shadow-2xl shadow-[#0d4361]/20 bg-white/40 backdrop-blur-xl aspect-[4/3]">
            <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Filters */}
        <div className="mt-14 flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-[Poppins] text-2xl font-bold text-[#0a2f44]">Available Models <span className="font-[Inter] text-sm font-medium text-slate-500">({models.length})</span></h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/80 ring-1 ring-[#0d6b78]/20 px-4 py-2 font-[Inter] text-sm font-semibold text-[#0d4361] hover:bg-[#0d6b78]/10"
              aria-expanded={showFilters}
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full bg-white/80 ring-1 ring-[#0d6b78]/20 px-4 py-2 font-[Inter] text-sm font-semibold text-[#0d4361] outline-none"
              aria-label="Sort"
            >
              <option value="latest">Latest</option>
              <option value="popular">Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-5 grid sm:grid-cols-3 gap-5 animate-fade-in">
            <FilterSlider label="Max Price" value={maxPrice || priceCap} max={priceCap} step={100} suffix="₹" onChange={setMaxPrice} disabled={maxPrice === 0} />
            <FilterSlider label="Max Sweep" value={maxSweep || sweepCap} max={sweepCap} step={50} suffix=" mm" onChange={setMaxSweep} disabled={maxSweep === 0} />
            <FilterSlider label="Max Power" value={maxPower || powerCap} max={powerCap} step={5} suffix=" W" onChange={setMaxPower} disabled={maxPower === 0} />
            <button onClick={resetFilters} className="sm:col-span-3 justify-self-start text-xs font-[Inter] font-semibold text-[#0d6b78] hover:underline">Reset filters</button>
          </div>
        )}

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((mm: Model) => (
            <Link
              key={mm.modelNo}
              to="/products/$category/$model"
              params={{ category: cat.slug, model: mm.slug }}
              className="group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col"
            >
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-[#0d6b78]/5 relative">
                <img src={mm.image} alt={mm.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {mm.tags && mm.tags.length > 0 && (
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    {mm.tags.slice(0, 2).map((t) => (
                      <span key={t} className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] text-white px-2 py-0.5 font-[Inter] text-[9px] font-bold uppercase tracking-wider shadow">
                        <Tag className="h-2.5 w-2.5" /> {t}
                      </span>
                    ))}
                  </div>
                )}
                <span className="absolute bottom-3 right-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 font-[Inter] text-[11px] font-semibold text-[#0d4361] shadow">
                  View details →
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <p className="font-[Inter] text-xs text-[#0d6b78] font-semibold">Model {mm.modelNo}</p>
                <h3 className="mt-1 font-[Poppins] font-bold text-[#0a2f44]">{mm.name}</h3>
                <div className="mt-3 grid grid-cols-2 gap-1.5 font-[Inter] text-xs text-slate-600">
                  {mm.sweep && <span>Sweep: <b className="text-[#0a2f44]">{mm.sweep}</b></span>}
                  {mm.rpm && <span>Speed: <b className="text-[#0a2f44]">{mm.rpm}</b></span>}
                  {mm.power && <span>Power: <b className="text-[#0a2f44]">{mm.power}</b></span>}
                  {mm.warranty && <span>Warranty: <b className="text-[#0a2f44]">{mm.warranty}</b></span>}
                </div>
                <ul className="mt-3 space-y-1">
                  {mm.highlights.slice(0, 3).map((h: string) => (
                    <li key={h} className="flex items-start gap-2 font-[Inter] text-xs text-slate-700">
                      <Check className="h-3.5 w-3.5 text-[#0d6b78] mt-0.5 shrink-0" /> {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="font-[Poppins] text-2xl font-extrabold text-[#0d4361]">₹{mm.price.toLocaleString("en-IN")}</span>
                  <span className="inline-flex items-center gap-1 font-[Inter] text-xs font-semibold text-[#0d4361] group-hover:gap-2 transition-all">
                    View <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {models.length === 0 && (
          <div className="mt-10 rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-8 text-center">
            <p className="font-[Inter] text-slate-600">No products match these filters.</p>
            <button onClick={resetFilters} className="mt-3 text-sm font-[Inter] text-[#0d6b78] underline">Reset filters</button>
          </div>
        )}

        <div className="mt-16">
          <h3 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">Other Categories</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.filter((c) => c.slug !== cat.slug).map((c) => (
              <Link key={c.slug} to="/products/$category" params={{ category: c.slug }} className="rounded-full bg-white/70 ring-1 ring-[#0d6b78]/20 px-4 py-2 font-[Inter] text-sm text-[#0d4361] hover:bg-[#0d6b78]/10 transition-colors">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSlider({ label, value, max, step, suffix, onChange, disabled }: { label: string; value: number; max: number; step: number; suffix: string; onChange: (n: number) => void; disabled?: boolean }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between font-[Inter] text-xs font-semibold text-[#0d4361]">
        <span>{label}</span>
        <span className="text-[#0d6b78]">{disabled ? "Any" : `${suffix === "₹" ? "₹" : ""}${value.toLocaleString("en-IN")}${suffix !== "₹" ? suffix : ""}`}</span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[#0d6b78]"
      />
    </label>
  );
}
