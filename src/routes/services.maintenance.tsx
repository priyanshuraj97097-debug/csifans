import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/services/maintenance")({
  head: () => ({
    meta: [
      { title: "Fan Maintenance & After-Sales | CSI Super Toophan" },
      {
        name: "description",
        content:
          "Preventive maintenance, servicing, and genuine spare parts for CSI Super Toophan fans. Extend fan life and keep performance high.",
      },
      { property: "og:title", content: "Maintenance & After-Sales — CSI Super Toophan" },
      {
        property: "og:description",
        content: "Servicing, spare parts, and preventive maintenance for industrial and home fans.",
      },
    ],
    links: [{ rel: "canonical", href: "/services/maintenance" }],
  }),
  component: Maintenance,
});

function Maintenance() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="Service"
          title="Maintenance & After-Sales"
          subtitle="Keep your fans running smoothly with scheduled servicing and genuine spares."
        />

        <div className="mt-12 space-y-6">
          <div className="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-8 shadow-md">
            <h3 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">What's Covered</h3>
            <ul className="mt-3 space-y-2 font-[Inter] text-slate-700 leading-relaxed list-disc list-inside">
              <li>Blade cleaning, tightening, and balancing</li>
              <li>Motor inspection, lubrication, and bearing checks</li>
              <li>Capacitor, regulator, and remote replacement</li>
              <li>Wiring and earthing safety checks</li>
              <li>Genuine CSI Super Toophan spare parts</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-8 shadow-md">
            <h3 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">Why Preventive Maintenance Matters</h3>
            <p className="mt-3 font-[Inter] text-slate-700 leading-relaxed">
              A well-maintained fan runs quieter, consumes less power, and lasts significantly longer. For industrial
              installations, a small yearly service prevents costly downtime and protects motor windings from dust,
              heat, and voltage fluctuations.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white p-8 shadow-lg">
            <h3 className="font-[Poppins] text-xl font-bold">Need service or spare parts?</h3>
            <p className="mt-2 font-[Inter] text-sm text-white/85">
              Reach out to our support team and we'll get your fan back to peak performance.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-block rounded-full bg-white text-[#0d4361] font-[Poppins] font-semibold px-5 py-2.5 text-sm hover:bg-white/90"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
