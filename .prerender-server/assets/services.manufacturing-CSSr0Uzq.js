import { t as SectionHeader } from "./SectionHeader-DnE8YoMs.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/services.manufacturing.tsx?tsr-split=component
function Manufacturing() {
	return /* @__PURE__ */ jsx("div", {
		className: "py-16 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-4xl",
			children: [/* @__PURE__ */ jsx(SectionHeader, {
				as: "h1",
				eyebrow: "Service",
				title: "Industrial Fan Manufacturing",
				subtitle: "Precision-built fans for factories, warehouses, offices, and homes — engineered in Bihar."
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-12 space-y-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-8 shadow-md",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
							children: "Our Manufacturing Capabilities"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-3 font-[Inter] text-slate-700 leading-relaxed",
							children: "CSI Super Toophan operates a modern manufacturing facility with dedicated lines for ceiling, pedestal, table, wall, and BLDC fans. Every unit undergoes multi-stage quality checks — from raw material inspection to motor winding, blade balancing, and final performance testing."
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-8 shadow-md",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
							children: "What Sets Us Apart"
						}), /* @__PURE__ */ jsxs("ul", {
							className: "mt-3 space-y-2 font-[Inter] text-slate-700 leading-relaxed list-disc list-inside",
							children: [
								/* @__PURE__ */ jsx("li", { children: "ISO 9001:2015 certified Quality Management System" }),
								/* @__PURE__ */ jsx("li", { children: "Copper-wound motors for higher efficiency and longer life" }),
								/* @__PURE__ */ jsx("li", { children: "Precision-balanced blades for silent, vibration-free operation" }),
								/* @__PURE__ */ jsx("li", { children: "Energy-efficient BLDC options that cut electricity use by up to 60%" }),
								/* @__PURE__ */ jsx("li", { children: "Bulk manufacturing for institutional, industrial, and dealer orders" })
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-3xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white p-8 shadow-lg",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "font-[Poppins] text-xl font-bold",
								children: "Need bulk manufacturing or custom specifications?"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 font-[Inter] text-sm text-white/85",
								children: "Contact our team for OEM, bulk orders, and institutional supply enquiries."
							}),
							/* @__PURE__ */ jsx(Link, {
								to: "/contact",
								className: "mt-5 inline-block rounded-full bg-white text-[#0d4361] font-[Poppins] font-semibold px-5 py-2.5 text-sm hover:bg-white/90",
								children: "Talk to Us"
							})
						]
					})
				]
			})]
		})
	});
}
//#endregion
export { Manufacturing as component };
