import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/bldc-vs-conventional-fans")({
  head: () => ({
    meta: [
      { title: "BLDC vs Conventional Ceiling Fans: Full Comparison | CSI Super Toophan" },
      {
        name: "description",
        content:
          "Compare BLDC and conventional ceiling fans on power use, price, noise, and lifespan — and see when a BLDC fan actually pays for itself.",
      },
      { property: "og:title", content: "BLDC vs Conventional Ceiling Fans" },
      { property: "og:type", content: "article" },
      {
        property: "og:description",
        content: "Power, price, noise, lifespan — a plain-English comparison for buyers.",
      },
    ],
    links: [{ rel: "canonical", href: "/blog/bldc-vs-conventional-fans" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "BLDC vs Conventional Ceiling Fans: Which One Should You Buy?",
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
          BLDC vs Conventional Ceiling Fans: Which One Should You Buy?
        </h1>
        <p className="mt-4 font-[Inter] text-slate-600">
          BLDC fans are the biggest upgrade in ceiling-fan technology in decades — but they aren't the right choice
          for every buyer. Here's how the two compare.
        </p>

        <div className="mt-10 space-y-6 font-[Inter] text-slate-700 leading-relaxed">
          <section>
            <h2 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">Power consumption</h2>
            <p className="mt-2">
              A conventional ceiling fan draws around 70–75 W at full speed. A BLDC fan delivers the same airflow at
              around 28–32 W — roughly 60% less power. Over a hot Indian summer of 12+ hours of daily use, the savings
              add up quickly.
            </p>
          </section>

          <section>
            <h2 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">Upfront cost</h2>
            <p className="mt-2">
              BLDC fans cost roughly 1.5–2x more than a conventional fan of the same size. For a single fan used
              casually, the payback period can be 2–3 years. For homes running 4+ fans through the summer, payback
              is usually well under 18 months.
            </p>
          </section>

          <section>
            <h2 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">Noise and comfort</h2>
            <p className="mt-2">
              BLDC motors run cooler and quieter, and most come with a remote and 5+ speed settings. If you're
              sensitive to fan noise at night, this alone is worth the upgrade.
            </p>
          </section>

          <section>
            <h2 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">Lifespan and reliability</h2>
            <p className="mt-2">
              BLDC motors have fewer moving contact points and generate less heat, so they typically last longer
              than induction motors. As long as the electronic driver board is well protected against voltage
              fluctuations, a BLDC fan should easily outlast a conventional one.
            </p>
          </section>

          <section>
            <h2 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">Which should you buy?</h2>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Heavy daily use, hot climate, multiple fans → BLDC pays for itself.</li>
              <li>Occasional use, lowest upfront cost → a good conventional fan is fine.</li>
              <li>Areas with unstable voltage → pair BLDC with a stabilizer, or stick to conventional.</li>
            </ul>
          </section>
        </div>

        <div className="mt-10 rounded-3xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white p-8 shadow-lg">
          <h3 className="font-[Poppins] text-xl font-bold">See our BLDC range</h3>
          <p className="mt-2 font-[Inter] text-sm text-white/85">
            Explore CSI Super Toophan premium BLDC ceiling fans — energy efficient and remote-ready.
          </p>
          <Link
            to="/products/$category"
            params={{ category: "premium-fans" }}
            className="mt-5 inline-block rounded-full bg-white text-[#0d4361] font-[Poppins] font-semibold px-5 py-2.5 text-sm hover:bg-white/90"
          >
            View Premium Fans
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
