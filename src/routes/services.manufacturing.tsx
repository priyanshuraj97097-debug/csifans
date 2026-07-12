import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/services/manufacturing")({
  head: () => ({
    meta: [
      { title: "Industrial Fan Manufacturing | CSI Super Toophan" },
      {
        name: "description",
        content:
          "ISO 9001:2015 certified industrial fan manufacturing in Bihar Sharif — ceiling, pedestal, wall, exhaust and BLDC fans built for durability.",
      },
      { property: "og:title", content: "Industrial Fan Manufacturing — CSI Super Toophan" },
      {
        property: "og:description",
        content:
          "Modern production lines, in-house testing, and rigorous quality control for every fan we make.",
      },
    ],
    links: [{ rel: "canonical", href: "/services/manufacturing" }],
  }),
  component: Manufacturing,
});

function Manufacturing() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="Service"
          title="Industrial Fan Manufacturing"
          subtitle="Precision-built fans for factories, warehouses, offices, and homes — engineered in Bihar."
        />

        <div className="mt-12 space-y-6">
          <div className="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-8 shadow-md">
            <h3 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">Our Manufacturing Capabilities</h3>
            <p className="mt-3 font-[Inter] text-slate-700 leading-relaxed">
              CSI Super Toophan operates a modern manufacturing facility with dedicated lines for ceiling, pedestal,
              table, wall, exhaust, and BLDC fans. Every unit undergoes multi-stage quality checks — from raw material
              inspection to motor winding, blade balancing, and final performance testing.
            </p>
          </div>

          <div className="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-8 shadow-md">
            <h3 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">What Sets Us Apart</h3>
            <ul className="mt-3 space-y-2 font-[Inter] text-slate-700 leading-relaxed list-disc list-inside">
              <li>ISO 9001:2015 certified Quality Management System</li>
              <li>Copper-wound motors for higher efficiency and longer life</li>
              <li>Precision-balanced blades for silent, vibration-free operation</li>
              <li>Energy-efficient BLDC options that cut electricity use by up to 60%</li>
              <li>Bulk manufacturing for institutional, industrial, and dealer orders</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white p-8 shadow-lg">
            <h3 className="font-[Poppins] text-xl font-bold">Need bulk manufacturing or custom specifications?</h3>
            <p className="mt-2 font-[Inter] text-sm text-white/85">
              Contact our team for OEM, bulk orders, and institutional supply enquiries.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-block rounded-full bg-white text-[#0d4361] font-[Poppins] font-semibold px-5 py-2.5 text-sm hover:bg-white/90"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
