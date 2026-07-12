import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Factory, Wrench, LifeBuoy } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services | CSI Super Toophan" },
      {
        name: "description",
        content:
          "Industrial fan manufacturing, professional installation, and after-sales maintenance services from CSI Super Toophan — Bihar.",
      },
      { property: "og:title", content: "Services — CSI Super Toophan" },
      {
        property: "og:description",
        content:
          "Manufacturing, installation, and maintenance services for industrial and commercial fans.",
      },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

const services = [
  {
    to: "/services/manufacturing",
    icon: Factory,
    title: "Industrial Fan Manufacturing",
    desc: "In-house production of ceiling, pedestal, wall, and BLDC fans built to ISO 9001:2015 standards.",
  },
  {
    to: "/services/installation",
    icon: Wrench,
    title: "Fan Installation",
    desc: "Professional installation for factories, warehouses, offices, and homes across Bihar and beyond.",
  },
  {
    to: "/services/maintenance",
    icon: LifeBuoy,
    title: "Maintenance & After-Sales",
    desc: "Preventive maintenance, servicing, and genuine spare parts to keep your fans running for years.",
  },
] as const;

function ServicesIndex() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="What We Do"
          title="Our Services"
          subtitle="From manufacturing to installation and lifelong support — CSI Super Toophan is with you at every step."
        />

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-7 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <div className="h-12 w-12 grid place-items-center rounded-2xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white shadow-lg">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-[Poppins] text-lg font-bold text-[#0a2f44]">{s.title}</h3>
              <p className="mt-2 font-[Inter] text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              <div className="mt-5 inline-flex items-center gap-1 font-[Poppins] text-sm font-semibold text-[#0d4361] group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
