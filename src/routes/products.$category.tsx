import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Check, ArrowLeft, ChevronDown, X } from "lucide-react";
import { findCategory, categories, type Model } from "@/lib/products";

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
  component: CategoryPage,
});

function CategoryPage() {
  const cat = Route.useLoaderData();
  const [openModel, setOpenModel] = useState<string | null>(null);

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
            <a
              href="#"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] px-6 py-3 font-[Poppins] font-semibold text-white shadow-lg shadow-[#0d6b78]/30 hover:scale-105 transition-transform"
            >
              <Download className="h-4 w-4" /> Download Catalogue
            </a>
          </div>
          <div className="rounded-3xl overflow-hidden ring-1 ring-white/60 shadow-2xl shadow-[#0d4361]/20 bg-white/40 backdrop-blur-xl aspect-[4/3]">
            <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
          </div>
        </div>

        <h2 className="mt-16 font-[Poppins] text-2xl font-bold text-[#0a2f44]">Available Models</h2>
        <p className="mt-1 font-[Inter] text-sm text-slate-500">Tap any image or the arrow below to view full specifications.</p>

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cat.models.map((m: Model) => {
            const isOpen = openModel === m.modelNo;
            return (
              <div
                key={m.modelNo}
                className={`group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 transition-all overflow-hidden flex flex-col ${
                  isOpen ? "ring-[#0d6b78]/40 shadow-2xl shadow-[#0d4361]/15" : "ring-white/60 shadow-md hover:shadow-xl"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenModel(isOpen ? null : m.modelNo)}
                  aria-expanded={isOpen}
                  aria-label={`View details for ${m.name}`}
                  className="aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-[#0d6b78]/5 cursor-pointer relative"
                >
                  <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute bottom-3 right-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 font-[Inter] text-[11px] font-semibold text-[#0d4361] shadow">
                    Tap for details
                  </span>
                </button>

                <div className="p-5 flex flex-col flex-1">
                  <p className="font-[Inter] text-xs text-[#0d6b78] font-semibold">Model {m.modelNo}</p>
                  <h3 className="mt-1 font-[Poppins] font-bold text-[#0a2f44]">{m.name}</h3>
                  <div className="mt-3 grid grid-cols-2 gap-1.5 font-[Inter] text-xs text-slate-600">
                    {m.sweep && <span>Sweep: <b className="text-[#0a2f44]">{m.sweep}</b></span>}
                    {m.rpm && <span>Speed: <b className="text-[#0a2f44]">{m.rpm}</b></span>}
                    {m.airDelivery && <span>Air: <b className="text-[#0a2f44]">{m.airDelivery}</b></span>}
                    {m.warranty && <span>Warranty: <b className="text-[#0a2f44]">{m.warranty}</b></span>}
                  </div>
                  <ul className="mt-3 space-y-1">
                    {m.highlights.map((h: string) => (
                      <li key={h} className="flex items-start gap-2 font-[Inter] text-xs text-slate-700">
                        <Check className="h-3.5 w-3.5 text-[#0d6b78] mt-0.5 shrink-0" /> {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-[Poppins] text-2xl font-extrabold text-[#0d4361]">₹{m.price.toLocaleString("en-IN")}</span>
                    <button
                      type="button"
                      onClick={() => setOpenModel(isOpen ? null : m.modelNo)}
                      aria-expanded={isOpen}
                      className="inline-flex items-center gap-1 rounded-full bg-[#0d6b78]/10 hover:bg-[#0d6b78]/20 px-3 py-1.5 font-[Inter] text-xs font-semibold text-[#0d4361] transition-colors"
                    >
                      {isOpen ? "Hide details" : "View details"}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>

                  {isOpen && (
                    <div className="mt-5 -mx-1 rounded-2xl bg-gradient-to-br from-[#0d6b78]/5 to-[#0d4361]/5 ring-1 ring-[#0d6b78]/15 p-4 animate-fade-in">
                      {m.description && (
                        <p className="font-[Inter] text-sm text-slate-700 leading-relaxed">{m.description}</p>
                      )}

                      <div className="mt-4 grid grid-cols-2 gap-2 font-[Inter] text-xs">
                        {[
                          ["Model No.", m.modelNo],
                          ["Sweep", m.sweep],
                          ["Speed", m.rpm],
                          ["Air Delivery", m.airDelivery],
                          ["Power", m.power],
                          ["Motor", m.motor],
                          ["Blades", m.blades],
                          ["Warranty", m.warranty],
                        ]
                          .filter(([, v]) => v)
                          .map(([k, v]) => (
                            <div key={k} className="rounded-lg bg-white/70 p-2.5">
                              <p className="text-[10px] uppercase tracking-wider text-[#0d6b78] font-semibold">{k}</p>
                              <p className="mt-0.5 text-[#0a2f44] font-semibold">{v}</p>
                            </div>
                          ))}
                      </div>

                      {m.colors && m.colors.length > 0 && (
                        <div className="mt-4">
                          <p className="font-[Inter] text-[10px] uppercase tracking-wider text-[#0d6b78] font-semibold">Available Colours</p>
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {m.colors.map((c) => (
                              <span key={c} className="rounded-full bg-white px-2.5 py-1 ring-1 ring-[#0d6b78]/20 text-[11px] font-medium text-[#0a2f44]">{c}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {m.features && m.features.length > 0 && (
                        <div className="mt-4">
                          <p className="font-[Inter] text-[10px] uppercase tracking-wider text-[#0d6b78] font-semibold">Key Features</p>
                          <ul className="mt-1.5 space-y-1">
                            {m.features.map((f) => (
                              <li key={f} className="flex items-start gap-2 font-[Inter] text-xs text-slate-700">
                                <Check className="h-3.5 w-3.5 text-[#0d6b78] mt-0.5 shrink-0" /> {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mt-5 flex items-center justify-between">
                        <Link to="/contact" className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] px-4 py-2 font-[Poppins] text-xs font-semibold text-white shadow">
                          Enquire about this model
                        </Link>
                        <button
                          type="button"
                          onClick={() => setOpenModel(null)}
                          className="inline-flex items-center gap-1 text-xs font-[Inter] text-slate-500 hover:text-[#0d4361]"
                          aria-label="Close details"
                        >
                          <X className="h-3.5 w-3.5" /> Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

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
