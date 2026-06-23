import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Phone, MessageCircle, ChevronRight, Tag } from "lucide-react";
import { findModel, categories } from "@/lib/products";
import { Lightbox } from "@/components/site/Lightbox";

export const Route = createFileRoute("/products/$category/$model")({
  loader: ({ params }) => {
    const found = findModel(params.category, params.model);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => {
    const m = loaderData?.model;
    const c = loaderData?.category;
    return {
      meta: [
        { title: `${m?.name ?? "Product"} | CSI Fans` },
        { name: "description", content: m?.description ?? "CSI premium fan." },
        { property: "og:title", content: `${m?.name ?? ""} — CSI Fans` },
        { property: "og:description", content: m?.description ?? "" },
        { property: "og:image", content: m?.image ?? "" },
      ],
      links: [{ rel: "canonical", href: `/products/${c?.slug}/${m?.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="py-24 text-center px-4">
      <h1 className="font-[Poppins] text-3xl font-bold text-[#0a2f44]">Product not found</h1>
      <Link to="/products" search={{}} className="mt-6 inline-block text-[#0d6b78] underline">Browse all products</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="py-24 text-center px-4">
      <h1 className="font-[Poppins] text-2xl font-bold text-[#0a2f44]">Something went wrong</h1>
      <p className="mt-2 text-slate-600 text-sm">{error.message}</p>
      <button onClick={reset} className="mt-6 rounded-full bg-[#0d4361] text-white px-5 py-2 text-sm">Try again</button>
    </div>
  ),
  component: ModelPage,
});

const WHATSAPP_NUMBER = "919876543210";

function ModelPage() {
  const { category, model } = Route.useLoaderData();
  const images = (model.images && model.images.length ? model.images : [model.image]);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const similar = category.models.filter((m) => m.modelNo !== model.modelNo).slice(0, 4);
  const whatsappMsg = encodeURIComponent(`Hi CSI Fans, I'd like more information about ${model.name} (${model.modelNo}).`);

  const specs: Array<[string, string | undefined]> = [
    ["Sweep", model.sweep],
    ["Voltage", model.voltage],
    ["Frequency", model.frequency],
    ["Power Consumption", model.power],
    ["Speed", model.rpm],
    ["Air Delivery", model.airDelivery],
    ["Blade Material", model.bladeMaterial ?? model.blades],
    ["Motor Type", model.motor],
    ["Warranty", model.warranty],
  ];

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center gap-1 text-xs font-[Inter] text-slate-500">
          <Link to="/products" search={{}} className="hover:text-[#0d4361]">Products</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/products/$category" params={{ category: category.slug }} className="hover:text-[#0d4361]">{category.name}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#0d4361] font-semibold truncate">{model.name}</span>
        </nav>

        <Link to="/products/$category" params={{ category: category.slug }} className="mt-4 inline-flex items-center gap-1 text-sm font-[Inter] text-[#0d6b78] hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to {category.name}
        </Link>

        <div className="mt-6 grid lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="block w-full aspect-square rounded-3xl overflow-hidden ring-1 ring-white/60 shadow-2xl shadow-[#0d4361]/20 bg-gradient-to-br from-slate-50 to-[#0d6b78]/5 cursor-zoom-in"
              aria-label="Open fullscreen gallery"
            >
              <img src={images[active]} alt={`${model.name} view ${active + 1}`} className="h-full w-full object-cover transition-transform hover:scale-105" />
            </button>
            {images.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={`aspect-square rounded-xl overflow-hidden ring-2 transition-all ${i === active ? "ring-[#0d6b78]" : "ring-transparent hover:ring-[#0d6b78]/40"}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {model.tags && model.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {model.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] text-white px-2.5 py-1 font-[Inter] text-[10px] font-semibold uppercase tracking-wider">
                    <Tag className="h-2.5 w-2.5" /> {t}
                  </span>
                ))}
              </div>
            )}
            <p className="mt-3 font-[Inter] text-xs font-semibold tracking-wider uppercase text-[#0d6b78]">Model {model.modelNo}</p>
            <h1 className="mt-1 font-[Poppins] text-3xl sm:text-4xl font-extrabold text-[#0a2f44]">{model.name}</h1>
            <p className="mt-2 font-[Inter] text-sm text-[#0d6b78] font-semibold">{category.name}</p>
            {model.description && <p className="mt-4 font-[Inter] text-slate-700 leading-relaxed">{model.description}</p>}

            <div className="mt-5 flex items-end gap-3">
              <span className="font-[Poppins] text-4xl font-extrabold text-[#0d4361]">₹{model.price.toLocaleString("en-IN")}</span>
              <span className="font-[Inter] text-xs text-slate-500 pb-2">MRP incl. taxes</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] px-5 py-3 font-[Poppins] font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-all"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Enquiry
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] px-5 py-3 font-[Poppins] font-semibold text-white shadow-lg shadow-[#0d6b78]/30"
              >
                <Phone className="h-4 w-4" /> Contact Us
              </Link>
            </div>

            {model.features && model.features.length > 0 && (
              <div className="mt-7">
                <h3 className="font-[Poppins] font-bold text-[#0a2f44]">Key Features</h3>
                <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                  {model.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 font-[Inter] text-sm text-slate-700">
                      <Check className="h-4 w-4 text-[#0d6b78] mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {model.colors && model.colors.length > 0 && (
              <div className="mt-6">
                <h3 className="font-[Poppins] font-bold text-[#0a2f44] text-sm">Available Colours</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {model.colors.map((c) => (
                    <span key={c} className="rounded-full bg-white ring-1 ring-[#0d6b78]/20 px-3 py-1 font-[Inter] text-xs font-medium text-[#0a2f44]">{c}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Specs */}
        <section className="mt-14 rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-6 sm:p-8 shadow-xl shadow-[#0d4361]/10">
          <h2 className="font-[Poppins] text-2xl font-bold text-[#0a2f44]">Technical Specifications</h2>
          <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-[#0d6b78]/15">
            <table className="w-full text-left font-[Inter] text-sm">
              <tbody>
                {specs.filter(([, v]) => v).map(([k, v], i) => (
                  <tr key={k} className={i % 2 === 0 ? "bg-white" : "bg-[#0d6b78]/5"}>
                    <th className="py-3 px-4 font-semibold text-[#0d4361] w-1/2 sm:w-1/3">{k}</th>
                    <td className="py-3 px-4 text-slate-800">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Similar */}
        {similar.length > 0 && (
          <section className="mt-14">
            <h2 className="font-[Poppins] text-2xl font-bold text-[#0a2f44]">Similar Products</h2>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similar.map((s) => (
                <Link
                  key={s.modelNo}
                  to="/products/$category/$model"
                  params={{ category: category.slug, model: s.slug }}
                  className="group rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-[#0d6b78]/5">
                    <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-[Poppins] font-semibold text-[#0a2f44] text-sm truncate">{s.name}</h3>
                    <p className="mt-1 font-[Poppins] font-bold text-[#0d4361]">₹{s.price.toLocaleString("en-IN")}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Other categories */}
        <section className="mt-14">
          <h3 className="font-[Poppins] text-lg font-bold text-[#0a2f44]">Explore Other Categories</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.filter((c) => c.slug !== category.slug).map((c) => (
              <Link key={c.slug} to="/products/$category" params={{ category: c.slug }} className="rounded-full bg-white/70 ring-1 ring-[#0d6b78]/20 px-4 py-2 font-[Inter] text-sm text-[#0d4361] hover:bg-[#0d6b78]/10 transition-colors">
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      </div>

      {lightbox && <Lightbox images={images} initial={active} onClose={() => setLightbox(false)} />}
    </div>
  );
}
