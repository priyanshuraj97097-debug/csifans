import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Download, Check, Tag, Loader2 } from "lucide-react";
import { findModel, categories, type Model, type Category, type Specification, type ProductTag } from "@/lib/products";
import { downloadProductCatalogue } from "@/lib/catalogue";
import { Lightbox } from "@/components/site/Lightbox";

export const Route = createFileRoute("/products/$category/$model")({
  loader: ({ params }) => {
    const result = findModel(params.category, params.model);
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.model.name ?? "Product"} | CSI Fans` },
      { name: "description", content: loaderData?.model.description ?? "CSI Fans product details." },
      { property: "og:title", content: `${loaderData?.model.name ?? "Product"} — CSI Fans` },
      { property: "og:description", content: loaderData?.model.description ?? "Premium fans." },
      { property: "og:image", content: loaderData?.model.image ?? "" },
    ],
    links: [{ rel: "canonical", href: `/products/${loaderData?.category.slug ?? ""}/${loaderData?.model.slug ?? ""}` }],
  }),
  notFoundComponent: () => (
    <div className="py-24 text-center px-4">
      <h1 className="font-[Poppins] text-3xl font-bold text-[#0a2f44]">Product not found</h1>
      <Link to="/products" search={{}} className="mt-6 inline-block text-[#0d6b78] underline">Back to products</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="py-24 text-center px-4">
        <h1 className="font-[Poppins] text-2xl font-bold text-[#0a2f44]">Something went wrong</h1>
        <p className="mt-2 text-slate-600 text-sm">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-[#0d4361] text-white px-5 py-2 text-sm"
        >
          Try again
        </button>
      </div>
    );
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { category: cat, model } = Route.useLoaderData();
  const [downloading, setDownloading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const productImages = model.images && model.images.length > 0 ? model.images : [model.image];

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-xs font-[Inter] text-slate-500 flex-wrap">
          <Link to="/" className="hover:text-[#0d4361]">Home</Link>
          <ArrowRight className="h-3 w-3" />
          <Link to="/products" search={{}} className="hover:text-[#0d4361]">Products</Link>
          <ArrowRight className="h-3 w-3" />
          <Link to="/products/$category" params={{ category: cat.slug }} className="hover:text-[#0d4361]">{cat.name}</Link>
          <ArrowRight className="h-3 w-3" />
          <span className="text-[#0d4361] font-semibold truncate">{model.name}</span>
        </nav>

        <Link to="/products/$category" params={{ category: cat.slug }} className="mt-6 inline-flex items-center gap-1 text-sm font-[Inter] text-[#0d6b78] hover:underline">
          <ArrowLeft className="h-4 w-4" /> {cat.name}
        </Link>

        {/* Hero Section */}
        <div className="mt-8 grid lg:grid-cols-2 gap-10 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div
              className="rounded-3xl overflow-hidden ring-1 ring-white/60 shadow-2xl shadow-[#0d4361]/20 bg-white/40 backdrop-blur-xl aspect-square cursor-zoom-in"
              onClick={() => openLightbox(0)}
            >
              <img src={productImages[0]} alt={model.name} className="h-full w-full object-cover" />
            </div>
            {productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productImages.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => openLightbox(idx)}
                    className="shrink-0 rounded-2xl overflow-hidden ring-1 ring-white/60 w-24 h-24 hover:ring-[#0d6b78]/40 transition-all"
                  >
                    <img src={img} alt={`${model.name} ${idx + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {model.tags && model.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {model.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] text-white px-3 py-1 font-[Inter] text-[10px] font-bold uppercase tracking-wider shadow">
                    <Tag className="h-3 w-3" /> {t}
                  </span>
                ))}
              </div>
            )}

            <span className="mt-3 inline-block font-[Inter] text-xs font-bold tracking-[0.2em] uppercase text-[#0d6b78]">{cat.name}</span>
            <h1 className="mt-2 font-[Poppins] text-3xl sm:text-4xl font-extrabold text-[#0a2f44]">{model.name}</h1>
            <p className="mt-2 font-[Inter] text-sm text-[#0d6b78] font-semibold">Model {model.modelNo}</p>

            {model.description && (
              <p className="mt-5 font-[Inter] text-slate-600 leading-relaxed">{model.description}</p>
            )}

            {/* Highlights */}
            {model.highlights && model.highlights.length > 0 && (
              <div className="mt-6 rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-5">
                <h2 className="font-[Poppins] text-sm font-bold text-[#0a2f44] uppercase tracking-wider">Key Highlights</h2>
                <ul className="mt-3 space-y-2">
                  {model.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 font-[Inter] text-sm text-slate-700">
                      <Check className="h-4 w-4 text-[#0d6b78] mt-0.5 shrink-0" /> {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Specs */}
            <div className="mt-6 rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-5">
              <h2 className="font-[Poppins] text-sm font-bold text-[#0a2f44] uppercase tracking-wider">Quick Specs</h2>
              <div className="mt-3 grid grid-cols-2 gap-3 font-[Inter] text-sm text-slate-600">
                {model.sweep && <span>Sweep: <b className="text-[#0a2f44]">{model.sweep}</b></span>}
                {model.rpm && <span>Speed: <b className="text-[#0a2f44]">{model.rpm}</b></span>}
                {model.power && <span>Power: <b className="text-[#0a2f44]">{model.power}</b></span>}
                {model.warranty && <span>Warranty: <b className="text-[#0a2f44]">{model.warranty}</b></span>}
                {model.voltage && <span>Voltage: <b className="text-[#0a2f44]">{model.voltage}</b></span>}
                {model.frequency && <span>Frequency: <b className="text-[#0a2f44]">{model.frequency}</b></span>}
                {model.blades && <span>Blades: <b className="text-[#0a2f44]">{model.blades}</b></span>}
                {model.bladeMaterial && <span>Material: <b className="text-[#0a2f44]">{model.bladeMaterial}</b></span>}
              </div>
            </div>

            {/* Download button */}
            <button
              type="button"
              onClick={async () => {
                if (downloading) return;
                setDownloading(true);
                try {
                  await downloadProductCatalogue(cat, model);
                } finally {
                  setDownloading(false);
                }
              }}
              disabled={downloading}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] px-6 py-3 font-[Poppins] font-semibold text-white shadow-lg shadow-[#0d6b78]/30 hover:scale-105 transition-transform disabled:opacity-70 disabled:cursor-wait"
            >
              {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              {downloading ? "Preparing PDF…" : "Download Spec Sheet"}
            </button>
          </div>
        </div>

        {/* Full Specifications */}
        {model.specifications && model.specifications.length > 0 && (
          <div className="mt-14 rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-6 sm:p-10">
            <h2 className="font-[Poppins] text-2xl font-bold text-[#0a2f44]">Full Specifications</h2>
            <div className="mt-6 grid sm:grid-cols-2 gap-x-10 gap-y-0">
              {model.specifications.map((spec, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-4 py-3.5 border-b border-slate-100 ${idx % 2 === 0 ? "sm:bg-slate-50/50" : ""}`}
                >
                  <span className="shrink-0 w-32 sm:w-40 font-[Inter] text-xs font-semibold text-[#0d4361] uppercase tracking-wide">{spec.label}</span>
                  <span className="font-[Inter] text-sm text-slate-700">{spec.value ?? "—"}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        {model.features && model.features.length > 0 && (
          <div className="mt-10 rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-6 sm:p-10">
            <h2 className="font-[Poppins] text-2xl font-bold text-[#0a2f44]">Features</h2>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {model.features.map((f, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl bg-[#0d6b78]/5 px-4 py-3">
                  <Check className="h-5 w-5 text-[#0d6b78] mt-0.5 shrink-0" />
                  <span className="font-[Inter] text-sm text-slate-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Models in Category */}
        {cat.models.length > 1 && (
          <div className="mt-16">
            <h3 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">Other Models in {cat.name}</h3>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.models.filter((m) => m.modelNo !== model.modelNo).map((mm) => (
                <Link
                  key={mm.modelNo}
                  to="/products/$category/$model"
                  params={{ category: cat.slug, model: mm.slug }}
                  className="group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col"
                >
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-[#0d6b78]/5 relative">
                    <img src={mm.image} alt={mm.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <p className="font-[Inter] text-xs text-[#0d6b78] font-semibold">Model {mm.modelNo}</p>
                    <h3 className="mt-1 font-[Poppins] font-bold text-[#0a2f44]">{mm.name}</h3>
                    <div className="mt-3 flex items-center justify-end">
                      <span className="inline-flex items-center gap-1 font-[Inter] text-xs font-semibold text-[#0d4361] group-hover:gap-2 transition-all">
                        View <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox images={productImages} initial={lightboxIndex} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
}
