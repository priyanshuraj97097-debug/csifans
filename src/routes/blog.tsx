import { createFileRoute } from "@tanstack/react-router";
import { Calendar, ArrowRight } from "lucide-react";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog | CSI Fans" },
      { name: "description", content: "Articles, product launches and company news from CSI Fans." },
      { property: "og:title", content: "CSI Fans Blog" },
      { property: "og:description", content: "Useful articles and company news from CSI Fans." },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

const posts = [
  { t: "Introducing Super TOOPHAN Premium BLDC Series", d: "Our flagship range now ships with 5-year warranty and remote control.", date: "Jun 12, 2026", tag: "Launch" },
  { t: "5 Reasons BLDC Fans Save You Thousands", d: "BLDC motors use up to 65% less power than conventional induction fans.", date: "May 28, 2026", tag: "Energy" },
  { t: "How to Pick the Right Sweep Size for Your Room", d: "A simple guide to matching fan sweep with room dimensions.", date: "May 14, 2026", tag: "Guide" },
  { t: "CSI Fans Expands Dealer Network in Bihar", d: "New authorised dealers across Patna, Nalanda and Gaya districts.", date: "Apr 30, 2026", tag: "News" },
  { t: "The Engineering Behind Silent Operation", d: "How blade pitch and motor balancing kill vibration noise.", date: "Apr 12, 2026", tag: "Tech" },
  { t: "Summer Care: Keep Your Fan Running Like New", d: "A 5-minute maintenance routine that doubles fan life.", date: "Mar 27, 2026", tag: "Maintenance" },
];

function Blog() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Blog" title="Stories & Updates" subtitle="Articles, guides and the latest from CSI Fans." />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <article key={p.t} className="group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-7 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col">
              <div className="flex items-center gap-3 text-xs font-[Inter] text-slate-500">
                <span className="rounded-full bg-[#0d6b78]/10 text-[#0d4361] font-semibold px-3 py-1">{p.tag}</span>
                <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</span>
              </div>
              <h3 className="mt-4 font-[Poppins] text-lg font-bold text-[#0a2f44] leading-snug">{p.t}</h3>
              <p className="mt-2 font-[Inter] text-sm text-slate-600 leading-relaxed">{p.d}</p>
              <a href="#" className="mt-auto pt-5 inline-flex items-center gap-1 font-[Poppins] text-sm font-semibold text-[#0d6b78] group-hover:gap-2 transition-all">
                Read more <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
