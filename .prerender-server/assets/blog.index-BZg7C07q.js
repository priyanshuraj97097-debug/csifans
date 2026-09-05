import { t as SectionHeader } from "./SectionHeader-DnE8YoMs.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight } from "lucide-react";
//#region src/routes/blog.index.tsx?tsr-split=component
var posts = [
	{
		to: "/blog/choose-industrial-fan-size",
		title: "How to Choose the Right Size Industrial Fan for Your Warehouse",
		excerpt: "Ceiling height, square footage, and airflow (CFM) — a simple framework for picking the right industrial fan."
	},
	{
		to: "/blog/bldc-vs-conventional-fans",
		title: "BLDC vs Conventional Ceiling Fans: Which One Should You Buy?",
		excerpt: "Compare power use, cost, noise, and lifespan — and see when a BLDC fan actually pays for itself."
	},
	{
		to: "/blog/fan-maintenance-checklist",
		title: "The Yearly Fan Maintenance Checklist (Home & Industrial)",
		excerpt: "A short, practical checklist to keep your fans quiet, efficient, and running for years."
	}
];
function BlogIndex() {
	return /* @__PURE__ */ jsx("div", {
		className: "py-16 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-5xl",
			children: [/* @__PURE__ */ jsx(SectionHeader, {
				as: "h1",
				eyebrow: "Guides",
				title: "Blog & Buying Guides",
				subtitle: "Straight-talking answers to the questions our customers ask most often."
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-12 grid md:grid-cols-2 gap-6",
				children: posts.map((p) => /* @__PURE__ */ jsxs(Link, {
					to: p.to,
					className: "group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-7 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "font-[Poppins] text-lg font-bold text-[#0a2f44]",
							children: p.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 font-[Inter] text-sm text-slate-600 leading-relaxed",
							children: p.excerpt
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-5 inline-flex items-center gap-1 font-[Poppins] text-sm font-semibold text-[#0d4361] group-hover:gap-2 transition-all",
							children: ["Read article ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
						})
					]
				}, p.to))
			})]
		})
	});
}
//#endregion
export { BlogIndex as component };
