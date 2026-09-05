import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/blog.fan-maintenance-checklist.tsx?tsr-split=component
function Article() {
	return /* @__PURE__ */ jsx("article", {
		className: "py-16 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-3xl",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "font-[Inter] text-xs font-semibold uppercase tracking-widest text-[#0d6b78]",
					children: "Care Guide"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-3 font-[Poppins] text-3xl sm:text-4xl font-extrabold text-[#0a2f44]",
					children: "The Yearly Fan Maintenance Checklist (Home & Industrial)"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-4 font-[Inter] text-slate-600",
					children: "Fifteen minutes of maintenance per fan, once a year, keeps performance high and extends motor life by years."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-10 space-y-6 font-[Inter] text-slate-700 leading-relaxed",
					children: [
						/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", {
							className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
							children: "Before you start"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2",
							children: "Switch off the fan at the wall and the main breaker. Wait a minute for blades to stop fully. For industrial fans, use proper scaffolding — never stand on a chair or racking."
						})] }),
						/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", {
							className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
							children: "The checklist"
						}), /* @__PURE__ */ jsxs("ol", {
							className: "mt-2 space-y-2 list-decimal list-inside",
							children: [
								/* @__PURE__ */ jsx("li", { children: "Wipe blades and motor housing with a slightly damp cloth to remove dust and grease." }),
								/* @__PURE__ */ jsx("li", { children: "Tighten blade screws, canopy screws, and the down-rod locking pin." }),
								/* @__PURE__ */ jsx("li", { children: "Check that all blades are level — a bent blade causes wobble and noise." }),
								/* @__PURE__ */ jsx("li", { children: "Inspect the wiring at the ceiling rose for loose or discoloured connections." }),
								/* @__PURE__ */ jsx("li", { children: "Test all speed settings and listen for grinding or humming sounds." }),
								/* @__PURE__ */ jsx("li", { children: "For BLDC fans, replace the remote battery and clean the receiver sensor." }),
								/* @__PURE__ */ jsx("li", { children: "For industrial fans, log the service date on the unit for the next check." })
							]
						})] }),
						/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", {
							className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
							children: "When to call a technician"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2",
							children: "Wobble that stays after tightening, a burning smell, tripping breakers, or a fan that struggles to start on the lowest speed — these are signs the motor or capacitor needs professional attention."
						})] })
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-10 rounded-3xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white p-8 shadow-lg",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "font-[Poppins] text-xl font-bold",
							children: "Prefer to have us service it?"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 font-[Inter] text-sm text-white/85",
							children: "Book a maintenance visit and we'll handle the checklist, spare parts, and safety checks."
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/services/maintenance",
							className: "mt-5 inline-block rounded-full bg-white text-[#0d4361] font-[Poppins] font-semibold px-5 py-2.5 text-sm hover:bg-white/90",
							children: "See Maintenance Service"
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
