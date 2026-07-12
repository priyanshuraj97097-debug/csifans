import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/services/installation")({
  head: () => ({
    meta: [
      { title: "Fan Installation Services | CSI Super Toophan" },
      {
        name: "description",
        content:
          "Professional fan installation for warehouses, factories, offices, and homes. Safe mounting, wiring, and testing by CSI Super Toophan technicians.",
      },
      { property: "og:title", content: "Fan Installation — CSI Super Toophan" },
      {
        property: "og:description",
        content: "Trained technicians, safe mounting, and full commissioning for every fan we install.",
      },
    ],
    links: [{ rel: "canonical", href: "/services/installation" }],
  }),
  component: Installation,
});

function Installation() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="Service"
          title="Fan Installation"
          subtitle="Safe, professional installation of industrial and residential fans by trained technicians."
        />

        <div className="mt-12 space-y-6">
          <div className="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-8 shadow-md">
            <h3 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">Where We Install</h3>
            <ul className="mt-3 space-y-2 font-[Inter] text-slate-700 leading-relaxed list-disc list-inside">
              <li>Factories, warehouses, and large industrial sheds (HVLS and heavy-duty ceiling fans)</li>
              <li>Offices, showrooms, schools, and community halls</li>
              <li>Residential homes, apartments, and villas</li>
              <li>Kitchens and washrooms (exhaust fans)</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-8 shadow-md">
            <h3 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">Our Installation Process</h3>
            <ol className="mt-3 space-y-2 font-[Inter] text-slate-700 leading-relaxed list-decimal list-inside">
              <li>Site survey to confirm mounting points, ceiling height, and wiring load</li>
              <li>Secure mechanical mounting with correct anchors and down-rod length</li>
              <li>Electrical wiring, earthing, and regulator/remote setup</li>
              <li>Speed and vibration testing on all speed settings</li>
              <li>Final walkthrough and care instructions for the customer</li>
            </ol>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white p-8 shadow-lg">
            <h3 className="font-[Poppins] text-xl font-bold">Book an installation visit</h3>
            <p className="mt-2 font-[Inter] text-sm text-white/85">
              Share your site details and we'll schedule a technician at a convenient time.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-block rounded-full bg-white text-[#0d4361] font-[Poppins] font-semibold px-5 py-2.5 text-sm hover:bg-white/90"
            >
              Request a Visit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
