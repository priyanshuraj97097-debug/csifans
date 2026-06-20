import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Zap, Wrench, Settings, HelpCircle } from "lucide-react";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/knowledge-center")({
  head: () => ({
    meta: [
      { title: "Customer Knowledge Center | CSI Fans" },
      { name: "description", content: "Guides on choosing the right fan, energy-saving tips, installation, maintenance and FAQs." },
      { property: "og:title", content: "CSI Fans Knowledge Center" },
      { property: "og:description", content: "Everything you need to know about choosing, installing and maintaining your fan." },
    ],
    links: [{ rel: "canonical", href: "/knowledge-center" }],
  }),
  component: Knowledge,
});

const articles = [
  { icon: BookOpen, t: "How to Choose the Right Fan", d: "Match the room size, ceiling height and air-delivery needs to the perfect CSI Fans model." },
  { icon: Zap, t: "Energy-Saving Tips", d: "Get more cooling for less power — BLDC vs induction, sweep choice and smart usage habits." },
  { icon: Wrench, t: "Installation Guide", d: "Step-by-step instructions for safe and stable ceiling, wall and stand-fan installation." },
  { icon: Settings, t: "Maintenance Guide", d: "Cleaning, lubrication, capacitor checks and seasonal care to extend your fan's life." },
];

const faqs = [
  { q: "What does ISO 9001:2015 mean for CSI Fans?", a: "It certifies that our quality management system meets international standards across design, manufacturing and after-sales service." },
  { q: "Are CSI Fans energy efficient?", a: "Yes — our BLDC Premium Series consumes as little as 28W while delivering up to 280 CMM of air." },
  { q: "What warranty do I get?", a: "1–5 years depending on the model. Premium and decorative series carry an extended warranty." },
  { q: "Where can I buy CSI Fans?", a: "Through our authorised dealer network across India. Visit the Dealers page to locate the nearest one." },
];

function Knowledge() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Knowledge Center" title="Learn, Choose, Maintain" subtitle="Practical guides from CSI Fans experts." />

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {articles.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-7 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="h-12 w-12 grid place-items-center rounded-2xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white shadow-lg">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-[Poppins] text-lg font-bold text-[#0a2f44]">{t}</h3>
              <p className="mt-2 font-[Inter] text-sm text-slate-600 leading-relaxed">{d}</p>
              <a href="#" className="mt-4 inline-block font-[Poppins] text-sm font-semibold text-[#0d6b78] hover:underline">Read article →</a>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="h-6 w-6 text-[#0d6b78]" />
            <h2 className="font-[Poppins] text-2xl font-bold text-[#0a2f44]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-5 shadow-sm">
                <summary className="cursor-pointer font-[Poppins] font-semibold text-[#0a2f44] list-none flex items-center justify-between">
                  {f.q}
                  <span className="text-[#0d6b78] group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 font-[Inter] text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
