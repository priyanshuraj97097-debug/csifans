import { t as SectionHeader } from "./SectionHeader-DnE8YoMs.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Eye, Factory, ShieldCheck, Target } from "lucide-react";
//#region src/routes/about.tsx?tsr-split=component
function About() {
	return /* @__PURE__ */ jsx("div", {
		className: "py-16 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-5xl",
			children: [
				/* @__PURE__ */ jsx(SectionHeader, {
					as: "h1",
					eyebrow: "Our Story",
					title: "About CSI Fans",
					subtitle: "A product of an ISO 9001:2015 certified company crafting cooling solutions for India."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-12 rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-8 lg:p-12 shadow-md",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "font-[Poppins] text-2xl font-bold text-[#0a2f44]",
						children: "Company History"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-4 font-[Inter] text-slate-700 leading-relaxed",
						children: "Founded with a vision to deliver superior cooling at honest prices, CSI Fans has grown into a trusted name across India. With more than a decade of manufacturing experience, we combine traditional craftsmanship with modern engineering — producing fans that are reliable, energy-efficient and built to last. Our flagship Super TOOPHAN range is the result of years of R&D in motor design, blade aerodynamics and quiet operation."
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-8 grid md:grid-cols-2 gap-6",
					children: [
						{
							icon: Target,
							t: "Our Mission",
							d: "To make premium-quality, energy-efficient fans accessible to every household and business in India through innovation and integrity."
						},
						{
							icon: Eye,
							t: "Our Vision",
							d: "To be India's most-loved fan brand — recognised for performance, reliability and design that lasts a generation."
						},
						{
							icon: ShieldCheck,
							t: "ISO 9001:2015 Certification",
							d: "Our certified Quality Management System ensures every fan that leaves our factory meets the highest international standards."
						},
						{
							icon: Factory,
							t: "Manufacturing Excellence",
							d: "Modern production lines, in-house testing and rigorous quality checks at every stage — from raw material to final dispatch."
						}
					].map(({ icon: Icon, t, d }) => /* @__PURE__ */ jsxs("div", {
						className: "rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-7 shadow-md hover:shadow-xl transition-shadow",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "h-12 w-12 grid place-items-center rounded-2xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white shadow-lg",
								children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ jsx("h4", {
								className: "mt-4 font-[Poppins] text-lg font-bold text-[#0a2f44]",
								children: t
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 font-[Inter] text-sm text-slate-600 leading-relaxed",
								children: d
							})
						]
					}, t))
				})
			]
		})
	});
}
//#endregion
export { About as component };
