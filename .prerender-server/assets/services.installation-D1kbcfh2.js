import { t as SectionHeader } from "./SectionHeader-DnE8YoMs.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/services.installation.tsx?tsr-split=component
function Installation() {
	return /* @__PURE__ */ jsx("div", {
		className: "py-16 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-4xl",
			children: [/* @__PURE__ */ jsx(SectionHeader, {
				as: "h1",
				eyebrow: "Service",
				title: "Fan Installation",
				subtitle: "Safe, professional installation of industrial and residential fans by trained technicians."
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-12 space-y-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-8 shadow-md",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
							children: "Where We Install"
						}), /* @__PURE__ */ jsxs("ul", {
							className: "mt-3 space-y-2 font-[Inter] text-slate-700 leading-relaxed list-disc list-inside",
							children: [
								/* @__PURE__ */ jsx("li", { children: "Factories, warehouses, and large industrial sheds (HVLS and heavy-duty ceiling fans)" }),
								/* @__PURE__ */ jsx("li", { children: "Offices, showrooms, schools, and community halls" }),
								/* @__PURE__ */ jsx("li", { children: "Residential homes, apartments, and villas" }),
								/* @__PURE__ */ jsx("li", { children: "Kitchens and washrooms" })
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-8 shadow-md",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
							children: "Our Installation Process"
						}), /* @__PURE__ */ jsxs("ol", {
							className: "mt-3 space-y-2 font-[Inter] text-slate-700 leading-relaxed list-decimal list-inside",
							children: [
								/* @__PURE__ */ jsx("li", { children: "Site survey to confirm mounting points, ceiling height, and wiring load" }),
								/* @__PURE__ */ jsx("li", { children: "Secure mechanical mounting with correct anchors and down-rod length" }),
								/* @__PURE__ */ jsx("li", { children: "Electrical wiring, earthing, and regulator/remote setup" }),
								/* @__PURE__ */ jsx("li", { children: "Speed and vibration testing on all speed settings" }),
								/* @__PURE__ */ jsx("li", { children: "Final walkthrough and care instructions for the customer" })
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-3xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white p-8 shadow-lg",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "font-[Poppins] text-xl font-bold",
								children: "Book an installation visit"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 font-[Inter] text-sm text-white/85",
								children: "Share your site details and we'll schedule a technician at a convenient time."
							}),
							/* @__PURE__ */ jsx(Link, {
								to: "/contact",
								className: "mt-5 inline-block rounded-full bg-white text-[#0d4361] font-[Poppins] font-semibold px-5 py-2.5 text-sm hover:bg-white/90",
								children: "Request a Visit"
							})
						]
					})
				]
			})]
		})
	});
}
//#endregion
export { Installation as component };
