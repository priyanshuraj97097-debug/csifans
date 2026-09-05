import { t as SectionHeader } from "./SectionHeader-DnE8YoMs.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, Factory, LifeBuoy, Wrench } from "lucide-react";
//#region src/routes/services.index.tsx?tsr-split=component
var services = [
	{
		to: "/services/manufacturing",
		icon: Factory,
		title: "Industrial Fan Manufacturing",
		desc: "In-house production of ceiling, pedestal, wall, and BLDC fans built to ISO 9001:2015 standards."
	},
	{
		to: "/services/installation",
		icon: Wrench,
		title: "Fan Installation",
		desc: "Professional installation for factories, warehouses, offices, and homes across Bihar and beyond."
	},
	{
		to: "/services/maintenance",
		icon: LifeBuoy,
		title: "Maintenance & After-Sales",
		desc: "Preventive maintenance, servicing, and genuine spare parts to keep your fans running for years."
	}
];
function ServicesIndex() {
	return /* @__PURE__ */ jsx("div", {
		className: "py-16 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-6xl",
			children: [/* @__PURE__ */ jsx(SectionHeader, {
				as: "h1",
				eyebrow: "What We Do",
				title: "Our Services",
				subtitle: "From manufacturing to installation and lifelong support — CSI Super Toophan is with you at every step."
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-12 grid md:grid-cols-3 gap-6",
				children: services.map((s) => /* @__PURE__ */ jsxs(Link, {
					to: s.to,
					className: "group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-7 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "h-12 w-12 grid place-items-center rounded-2xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white shadow-lg",
							children: /* @__PURE__ */ jsx(s.icon, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "mt-4 font-[Poppins] text-lg font-bold text-[#0a2f44]",
							children: s.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 font-[Inter] text-sm text-slate-600 leading-relaxed",
							children: s.desc
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-5 inline-flex items-center gap-1 font-[Poppins] text-sm font-semibold text-[#0d4361] group-hover:gap-2 transition-all",
							children: ["Learn more ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
						})
					]
				}, s.to))
			})]
		})
	});
}
//#endregion
export { ServicesIndex as component };
