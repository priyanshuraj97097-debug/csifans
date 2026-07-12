import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/choose-industrial-fan-size")({
  head: () => ({
    meta: [
      { title: "How to Choose the Right Industrial Fan Size | CSI Super Toophan" },
      {
        name: "description",
        content:
          "A practical guide to picking the right industrial fan size for your warehouse — covering ceiling height, square footage, and CFM airflow.",
      },
      { property: "og:title", content: "How to Choose the Right Industrial Fan Size" },
      { property: "og:type", content: "article" },
      {
        property: "og:description",
        content: "Sizing framework for warehouse and factory fans — ceiling height, area, and airflow.",
      },
    ],
    links: [{ rel: "canonical", href: "/blog/choose-industrial-fan-size" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How to Choose the Right Size Industrial Fan for Your Warehouse",
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
        <p className="font-[Inter] text-xs font-semibold uppercase tracking-widest text-[#0d6b78]">Buying Guide</p>
        <h1 className="mt-3 font-[Poppins] text-3xl sm:text-4xl font-extrabold text-[#0a2f44]">
          How to Choose the Right Size Industrial Fan for Your Warehouse
        </h1>
        <p className="mt-4 font-[Inter] text-slate-600">
          Choosing the wrong size fan wastes electricity and leaves hot spots in your facility. Here's a simple
          framework we use with our own industrial customers.
        </p>

        <div className="mt-10 space-y-6 font-[Inter] text-slate-700 leading-relaxed">
          <section>
            <h2 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">1. Measure your ceiling height</h2>
            <p className="mt-2">
              Standard ceiling fans work best up to 10 ft. Between 10–15 ft, use a down-rod. Above 15 ft — typical
              in warehouses and factory sheds — you need HVLS (High-Volume, Low-Speed) or heavy-duty industrial ceiling
              fans with larger blade spans.
            </p>
          </section>

          <section>
            <h2 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">2. Calculate the floor area per fan</h2>
            <p className="mt-2">
              As a rule of thumb, one 1400mm industrial ceiling fan covers roughly 200–250 sq ft of open floor space.
              For a 5000 sq ft warehouse, plan for around 20–25 fans, spaced evenly to avoid dead zones near walls
              and racking.
            </p>
          </section>

          <section>
            <h2 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">3. Match airflow (CFM) to activity</h2>
            <p className="mt-2">
              CFM (cubic feet per minute) measures how much air a fan moves. For light storage areas, 5,000–7,000
              CFM per fan is fine. For active production floors with people and machines generating heat, aim for
              8,000+ CFM per fan.
            </p>
          </section>

          <section>
            <h2 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">4. Factor in power and mounting</h2>
            <p className="mt-2">
              Check your existing electrical load and mounting points before ordering. Industrial fans need secure
              beam or truss mounting and dedicated wiring. Our team runs a free site survey before recommending a
              layout — this saves rework later.
            </p>
          </section>
        </div>

        <div className="mt-10 rounded-3xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white p-8 shadow-lg">
          <h3 className="font-[Poppins] text-xl font-bold">Need help sizing your warehouse?</h3>
          <p className="mt-2 font-[Inter] text-sm text-white/85">
            Share your floor plan and ceiling height — we'll suggest the right fan model and quantity.
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-block rounded-full bg-white text-[#0d4361] font-[Poppins] font-semibold px-5 py-2.5 text-sm hover:bg-white/90"
          >
            Get a Free Site Consultation
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
