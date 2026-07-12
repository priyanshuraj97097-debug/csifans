import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog & Guides | CSI Super Toophan" },
      {
        name: "description",
        content:
          "Practical guides on choosing, installing, and maintaining industrial and home fans — from the CSI Super Toophan team.",
      },
      { property: "og:title", content: "Blog — CSI Super Toophan" },
      {
        property: "og:description",
        content: "Guides and answers to the most common questions about industrial and home fans.",
      },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

const posts = [
  {
    to: "/blog/choose-industrial-fan-size",
    title: "How to Choose the Right Size Industrial Fan for Your Warehouse",
    excerpt:
      "Ceiling height, square footage, and airflow (CFM) — a simple framework for picking the right industrial fan.",
  },
  {
    to: "/blog/bldc-vs-conventional-fans",
    title: "BLDC vs Conventional Ceiling Fans: Which One Should You Buy?",
    excerpt:
      "Compare power use, cost, noise, and lifespan — and see when a BLDC fan actually pays for itself.",
  },
  {
    to: "/blog/fan-maintenance-checklist",
    title: "The Yearly Fan Maintenance Checklist (Home & Industrial)",
    excerpt:
      "A short, practical checklist to keep your fans quiet, efficient, and running for years.",
  },
] as const;

function BlogIndex() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Guides"
          title="Blog & Buying Guides"
          subtitle="Straight-talking answers to the questions our customers ask most often."
        />

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {posts.map((p) => (
            <Link
              key={p.to}
              to={p.to}
              className="group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-7 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <h3 className="font-[Poppins] text-lg font-bold text-[#0a2f44]">{p.title}</h3>
              <p className="mt-2 font-[Inter] text-sm text-slate-600 leading-relaxed">{p.excerpt}</p>
              <div className="mt-5 inline-flex items-center gap-1 font-[Poppins] text-sm font-semibold text-[#0d4361] group-hover:gap-2 transition-all">
                Read article <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
