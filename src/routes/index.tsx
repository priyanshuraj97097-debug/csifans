import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Zap, Wind, Award, Volume2, Wrench, Star, Quote, Fan, AirVent, Sparkles } from "lucide-react";
import { allModels, categories } from "@/lib/products";
import fanCategories from "@/assets/fan-categories.png.asset.json";
const hero = fanCategories.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CSI Fans | Premium Fans for Every Home and Business" },
      { name: "description", content: "CSI Fans — a product of an ISO 9001:2015 certified company. Premium ceiling, high-speed, exhaust and decorative fans with superior performance and energy efficiency." },
      { property: "og:title", content: "CSI Fans | Innovation in Every Rotation" },
      { property: "og:description", content: "Premium fans engineered for performance, silence and long life." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = allModels.slice(0, 8);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/85 to-[#0d6b78]/30" />
        </div>
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#0d6b78]/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#0d4361]/20 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-1.5 ring-1 ring-[#0d6b78]/20 text-xs font-semibold text-[#0d4361] font-[Inter]">
              <ShieldCheck className="h-3.5 w-3.5" /> ISO 9001:2015 Certified Company
            </div>
            <h1 className="mt-5 font-[Poppins] text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0a2f44] leading-[1.05]">
              Innovation in <span className="bg-gradient-to-r from-[#0d4361] to-[#0d6b78] bg-clip-text text-transparent">Every Rotation</span>
            </h1>
            <p className="mt-5 max-w-xl font-[Inter] text-base sm:text-lg text-slate-600 leading-relaxed">
              CSI Fans delivers high-performance, energy-efficient and reliable fans for every home and business.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] px-6 py-3.5 font-[Poppins] font-semibold text-white shadow-xl shadow-[#0d6b78]/30 hover:shadow-2xl hover:scale-105 transition-all">
                Explore Products <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-6 py-3.5 font-[Poppins] font-semibold text-[#0d4361] ring-1 ring-[#0d6b78]/30 hover:bg-white hover:shadow-lg transition-all">
                Contact Us
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
              {[
                { icon: Award, text: "ISO Certified" },
                { icon: Zap, text: "Energy Efficient" },
                { icon: ShieldCheck, text: "Superior Quality" },
                { icon: Wrench, text: "Reliable Support" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="rounded-2xl bg-white/70 backdrop-blur ring-1 ring-white/60 p-3 shadow-sm">
                  <Icon className="h-5 w-5 text-[#0d6b78]" />
                  <p className="mt-1.5 font-[Inter] text-xs font-semibold text-[#0a2f44]">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-md aspect-square">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0d6b78]/30 to-[#0d4361]/20 blur-3xl" />
              <div className="relative h-full w-full rounded-3xl overflow-hidden ring-1 ring-white/60 shadow-2xl shadow-[#0d4361]/30 backdrop-blur-xl bg-white/40 animate-[float_6s_ease-in-out_infinite]">
                <img src={hero} alt="Premium CSI fan" className="h-full w-full object-cover" width={800} height={800} />
              </div>
            </div>
          </div>
        </div>
        <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}`}</style>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Browse by Type" title="Product Categories" subtitle="Find the perfect CSI fan for every space." />
          <div className="mt-12 grid grid-cols-2 gap-5 max-w-3xl mx-auto">
            {categories.filter((c) => ["ceiling-fans","pedestal-fans","table-fans","wall-fans"].includes(c.slug)).map((c) => {
              const Icon = categoryIcon(c.slug);
              return (
                <Link
                  key={c.slug}
                  to="/products/$category"
                  params={{ category: c.slug }}
                  className="group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-6 sm:p-7 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col items-center text-center"
                >
                  <div className="h-20 w-20 grid place-items-center rounded-2xl bg-gradient-to-br from-[#0d6b78]/10 to-[#0d4361]/10 ring-1 ring-[#0d6b78]/15 group-hover:from-[#0d4361] group-hover:to-[#0d6b78] transition-all">
                    <Icon className="h-10 w-10 text-[#0d4361] group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 font-[Poppins] text-lg font-extrabold tracking-wide text-[#0d4361] uppercase">{c.name.replace(/\s*Fans$/i, "")}</h3>
                  <p className="font-[Inter] text-xs font-semibold tracking-[0.2em] uppercase text-slate-500">Fans</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-[Inter] text-xs font-semibold text-[#0d6b78] group-hover:gap-2 transition-all">
                    View Range <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Best Sellers" title="Featured Products" subtitle="Hand-picked premium fans loved by 10,000+ customers." />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((m, i) => (
                <Link
                  key={m.modelNo}
                  to="/products/$category/$model"
                  params={{ category: m.categorySlug, model: m.slug }}
                  className="group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-lg shadow-[#0d4361]/5 hover:shadow-2xl hover:shadow-[#0d4361]/15 hover:-translate-y-1 transition-all overflow-hidden"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-[#0d6b78]/5">
                    <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <p className="font-[Inter] text-xs text-[#0d6b78] font-semibold">{m.categoryName}</p>
                    <h3 className="mt-1 font-[Poppins] font-semibold text-[#0a2f44] line-clamp-2">{m.name}</h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-[Poppins] text-xl font-bold text-[#0d4361]">₹{m.price.toLocaleString("en-IN")}</span>
                      <ArrowRight className="h-4 w-4 text-[#0d6b78] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#0d6b78]/5 to-transparent">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Why CSI Fans" title="Engineered to Outperform" subtitle="Premium materials, precision motors and decades of experience." />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Award, t: "Premium Quality", d: "Built with top-grade copper motors and aerodynamic blades." },
              { icon: Zap, t: "Energy Efficient", d: "Smart BLDC technology that saves up to 65% power." },
              { icon: Volume2, t: "Silent Operation", d: "Whisper-quiet motors for peaceful homes and offices." },
              { icon: Wind, t: "High Air Delivery", d: "Powerful airflow up to 280 CMM for instant comfort." },
              { icon: ShieldCheck, t: "Long Life Performance", d: "Tested for over 50,000 hours of continuous use." },
              { icon: Wrench, t: "Excellent Support", d: "Dedicated service network across India." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="h-12 w-12 grid place-items-center rounded-2xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white shadow-lg shadow-[#0d6b78]/40 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-[Poppins] text-lg font-bold text-[#0a2f44]">{t}</h3>
                <p className="mt-2 font-[Inter] text-sm text-slate-600 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-br from-[#0a2f44] via-[#0d4361] to-[#0d6b78] p-10 lg:p-14 text-white shadow-2xl shadow-[#0d4361]/30 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              ["10+", "Years of Excellence"],
              ["25+", "Fan Models"],
              ["10,000+", "Happy Customers"],
              ["ISO 9001:2015", "Certified Company"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-[Poppins] text-3xl lg:text-5xl font-extrabold">{n}</div>
                <p className="mt-2 font-[Inter] text-sm text-white/75">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Testimonials" title="Loved by Customers" subtitle="What people across India say about CSI Fans." />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { n: "Ramesh Kumar", c: "Patna", q: "Super Toophan stand fan is unbelievably powerful. Best decision for my shop!" },
              { n: "Priya Sharma", c: "Nalanda", q: "Silent, stylish and energy efficient. The BLDC ceiling fan halved my electricity bill." },
              { n: "Anil Verma", c: "Gaya", q: "Excellent build quality and service. CSI Fans are a true premium brand." },
            ].map((t) => (
              <div key={t.n} className="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-7 shadow-md hover:shadow-xl transition-shadow">
                <Quote className="h-7 w-7 text-[#0d6b78]/40" />
                <p className="mt-3 font-[Inter] text-slate-700 leading-relaxed">"{t.q}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#0d4361] to-[#0d6b78] grid place-items-center text-white font-[Poppins] font-bold">
                    {t.n[0]}
                  </div>
                  <div>
                    <p className="font-[Poppins] font-semibold text-[#0a2f44]">{t.n}</p>
                    <p className="font-[Inter] text-xs text-slate-500">{t.c}</p>
                  </div>
                  <div className="ml-auto flex text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <span className="inline-block font-[Inter] text-xs font-bold tracking-[0.2em] uppercase text-[#0d6b78]">{eyebrow}</span>
      <h2 className="mt-3 font-[Poppins] text-3xl sm:text-4xl font-extrabold text-[#0a2f44]">{title}</h2>
      <p className="mt-3 font-[Inter] text-slate-600">{subtitle}</p>
    </div>
  );
}

function categoryIcon(slug: string) {
  switch (slug) {
    case "ceiling-fans": return Fan;
    case "pedestal-fans": return Wind;
    case "table-fans": return Fan;
    case "wall-fans": return AirVent;
    case "exhaust-fans": return AirVent;
    case "special-fans": return Sparkles;
    default: return Fan;
  }
}
