import { t as SectionHeader } from "./SectionHeader-DnE8YoMs.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/services.maintenance.tsx?tsr-split=component
function Maintenance() {
	return /* @__PURE__ */ jsx("div", {
		className: "py-16 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-4xl",
			children: [/* @__PURE__ */ jsx(SectionHeader, {
				as: "h1",
				eyebrow: "Service",
				title: "Maintenance & After-Sales",
				subtitle: "Keep your fans running smoothly with scheduled servicing and genuine spares."
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-12 space-y-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-8 shadow-md",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
							children: "What's Covered"
						}), /* @__PURE__ */ jsxs("ul", {
							className: "mt-3 space-y-2 font-[Inter] text-slate-700 leading-relaxed list-disc list-inside",
							children: [
								/* @__PURE__ */ jsx("li", { children: "Blade cleaning, tightening, and balancing" }),
								/* @__PURE__ */ jsx("li", { children: "Motor inspection, lubrication, and bearing checks" }),
								/* @__PURE__ */ jsx("li", { children: "Capacitor, regulator, and remote replacement" }),
								/* @__PURE__ */ jsx("li", { children: "Wiring and earthing safety checks" }),
								/* @__PURE__ */ jsx("li", { children: "Genuine CSI Super Toophan spare parts" })
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-8 shadow-md",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
							children: "Why Preventive Maintenance Matters"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-3 font-[Inter] text-slate-700 leading-relaxed",
							children: "A well-maintained fan runs quieter, consumes less power, and lasts significantly longer. For industrial installations, a small yearly service prevents costly downtime and protects motor windings from dust, heat, and voltage fluctuations."
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-3xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white p-8 shadow-lg",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "font-[Poppins] text-xl font-bold",
								children: "Need service or spare parts?"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 font-[Inter] text-sm text-white/85",
								children: "Reach out to our support team and we'll get your fan back to peak performance."
							}),
							/* @__PURE__ */ jsx(Link, {
								to: "/contact",
								className: "mt-5 inline-block rounded-full bg-white text-[#0d4361] font-[Poppins] font-semibold px-5 py-2.5 text-sm hover:bg-white/90",
								children: "Contact Support"
							})
						]
					})
				]
			})]
		})
	});
}
//#endregion
export { Maintenance as component };
