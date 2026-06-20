import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Download, Check, ArrowLeft } from "lucide-react";
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
      <Link to="/products" className="mt-6 inline-block text-[#0d6b78] underline">Back to products</Link>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const cat = Route.useLoaderData();
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm font-[Inter] text-[#0d6b78] hover:underline">
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
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cat.models.map((m: Model) => (
            <div key={m.modelNo} className="group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col">
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-[#0d6b78]/5">
                <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
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
                <div className="mt-auto pt-5 flex items-center justify-between">
                  <span className="font-[Poppins] text-2xl font-extrabold text-[#0d4361]">₹{m.price.toLocaleString("en-IN")}</span>
                  <Link to="/contact" className="text-sm font-[Poppins] font-semibold text-[#0d6b78] hover:underline">Enquire →</Link>
                </div>
              </div>
            </div>
          ))}
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
