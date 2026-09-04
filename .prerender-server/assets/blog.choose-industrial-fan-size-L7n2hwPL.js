import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/blog.choose-industrial-fan-size.tsx?tsr-split=component
function Article() {
	return /* @__PURE__ */ jsx("article", {
		className: "py-16 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-3xl",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "font-[Inter] text-xs font-semibold uppercase tracking-widest text-[#0d6b78]",
					children: "Buying Guide"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-3 font-[Poppins] text-3xl sm:text-4xl font-extrabold text-[#0a2f44]",
					children: "How to Choose the Right Size Industrial Fan for Your Warehouse"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-4 font-[Inter] text-slate-600",
					children: "Choosing the wrong size fan wastes electricity and leaves hot spots in your facility. Here's a simple framework we use with our own industrial customers."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-10 space-y-6 font-[Inter] text-slate-700 leading-relaxed",
					children: [
						/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", {
							className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
							children: "1. Measure your ceiling height"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2",
							children: "Standard ceiling fans work best up to 10 ft. Between 10–15 ft, use a down-rod. Above 15 ft — typical in warehouses and factory sheds — you need HVLS (High-Volume, Low-Speed) or heavy-duty industrial ceiling fans with larger blade spans."
						})] }),
						/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", {
							className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
							children: "2. Calculate the floor area per fan"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2",
							children: "As a rule of thumb, one 1400mm industrial ceiling fan covers roughly 200–250 sq ft of open floor space. For a 5000 sq ft warehouse, plan for around 20–25 fans, spaced evenly to avoid dead zones near walls and racking."
						})] }),
						/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", {
							className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
							children: "3. Match airflow (CFM) to activity"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2",
							children: "CFM (cubic feet per minute) measures how much air a fan moves. For light storage areas, 5,000–7,000 CFM per fan is fine. For active production floors with people and machines generating heat, aim for 8,000+ CFM per fan."
						})] }),
						/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", {
							className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
							children: "4. Factor in power and mounting"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2",
							children: "Check your existing electrical load and mounting points before ordering. Industrial fans need secure beam or truss mounting and dedicated wiring. Our team runs a free site survey before recommending a layout — this saves rework later."
						})] })
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-10 rounded-3xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white p-8 shadow-lg",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "font-[Poppins] text-xl font-bold",
							children: "Need help sizing your warehouse?"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 font-[Inter] text-sm text-white/85",
							children: "Share your floor plan and ceiling height — we'll suggest the right fan model and quantity."
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/contact",
							className: "mt-5 inline-block rounded-full bg-white text-[#0d4361] font-[Poppins] font-semibold px-5 py-2.5 text-sm hover:bg-white/90",
							children: "Get a Free Site Consultation"
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-8",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/blog",
						className: "font-[Inter] text-sm text-[#0d6b78] hover:underline",
						children: "← Back to all articles"
					})
				})
			]
		})
	});
}
//#endregion
export { Article as component };
