import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/fan-maintenance-checklist")({
  head: () => ({
    meta: [
      { title: "Yearly Fan Maintenance Checklist | CSI Super Toophan" },
      {
        name: "description",
        content:
          "A practical yearly maintenance checklist for home and industrial fans — cleaning, tightening, motor care, and safety checks.",
      },
      { property: "og:title", content: "Yearly Fan Maintenance Checklist" },
      { property: "og:type", content: "article" },
      {
        property: "og:description",
        content: "Keep fans quiet, efficient, and long-lasting with this simple yearly checklist.",
      },
    ],
    links: [{ rel: "canonical", href: "/blog/fan-maintenance-checklist" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "The Yearly Fan Maintenance Checklist",
          author: { "@type": "Organization", name: "CSI Super Toophan" },
          publisher: { "@type": "Organization", name: "CSI Super Toophan" },
        }),
      },
    ],
  }),
  component: Article,
});

function Article() {
  return (
    <article className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="font-[Inter] text-xs font-semibold uppercase tracking-widest text-[#0d6b78]">Care Guide</p>
        <h1 className="mt-3 font-[Poppins] text-3xl sm:text-4xl font-extrabold text-[#0a2f44]">
          The Yearly Fan Maintenance Checklist (Home &amp; Industrial)
        </h1>
        <p className="mt-4 font-[Inter] text-slate-600">
          Fifteen minutes of maintenance per fan, once a year, keeps performance high and extends motor life by
          years.
        </p>

        <div className="mt-10 space-y-6 font-[Inter] text-slate-700 leading-relaxed">
          <section>
            <h2 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">Before you start</h2>
            <p className="mt-2">
              Switch off the fan at the wall and the main breaker. Wait a minute for blades to stop fully. For
              industrial fans, use proper scaffolding — never stand on a chair or racking.
            </p>
          </section>

          <section>
            <h2 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">The checklist</h2>
            <ol className="mt-2 space-y-2 list-decimal list-inside">
              <li>Wipe blades and motor housing with a slightly damp cloth to remove dust and grease.</li>
              <li>Tighten blade screws, canopy screws, and the down-rod locking pin.</li>
              <li>Check that all blades are level — a bent blade causes wobble and noise.</li>
              <li>Inspect the wiring at the ceiling rose for loose or discoloured connections.</li>
              <li>Test all speed settings and listen for grinding or humming sounds.</li>
              <li>For BLDC fans, replace the remote battery and clean the receiver sensor.</li>
              <li>For industrial fans, log the service date on the unit for the next check.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">When to call a technician</h2>
            <p className="mt-2">
              Wobble that stays after tightening, a burning smell, tripping breakers, or a fan that struggles to
              start on the lowest speed — these are signs the motor or capacitor needs professional attention.
            </p>
          </section>
        </div>

        <div className="mt-10 rounded-3xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white p-8 shadow-lg">
          <h3 className="font-[Poppins] text-xl font-bold">Prefer to have us service it?</h3>
          <p className="mt-2 font-[Inter] text-sm text-white/85">
            Book a maintenance visit and we'll handle the checklist, spare parts, and safety checks.
          </p>
          <Link
            to="/services/maintenance"
            className="mt-5 inline-block rounded-full bg-white text-[#0d4361] font-[Poppins] font-semibold px-5 py-2.5 text-sm hover:bg-white/90"
          >
            See Maintenance Service
          </Link>
        </div>

        <div className="mt-8">
          <Link to="/blog" className="font-[Inter] text-sm text-[#0d6b78] hover:underline">
            ← Back to all articles
          </Link>
        </div>
      </div>
    </article>
  );
}
