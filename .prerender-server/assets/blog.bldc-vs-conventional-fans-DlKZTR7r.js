import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/blog.bldc-vs-conventional-fans.tsx?tsr-split=component
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
					children: "BLDC vs Conventional Ceiling Fans: Which One Should You Buy?"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-4 font-[Inter] text-slate-600",
					children: "BLDC fans are the biggest upgrade in ceiling-fan technology in decades — but they aren't the right choice for every buyer. Here's how the two compare."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-10 space-y-6 font-[Inter] text-slate-700 leading-relaxed",
					children: [
						/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", {
							className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
							children: "Power consumption"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2",
							children: "A conventional ceiling fan draws around 70–75 W at full speed. A BLDC fan delivers the same airflow at around 28–32 W — roughly 60% less power. Over a hot Indian summer of 12+ hours of daily use, the savings add up quickly."
						})] }),
						/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", {
							className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
							children: "Upfront cost"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2",
							children: "BLDC fans cost roughly 1.5–2x more than a conventional fan of the same size. For a single fan used casually, the payback period can be 2–3 years. For homes running 4+ fans through the summer, payback is usually well under 18 months."
						})] }),
						/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", {
							className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
							children: "Noise and comfort"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2",
							children: "BLDC motors run cooler and quieter, and most come with a remote and 5+ speed settings. If you're sensitive to fan noise at night, this alone is worth the upgrade."
						})] }),
						/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", {
							className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
							children: "Lifespan and reliability"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2",
							children: "BLDC motors have fewer moving contact points and generate less heat, so they typically last longer than induction motors. As long as the electronic driver board is well protected against voltage fluctuations, a BLDC fan should easily outlast a conventional one."
						})] }),
						/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", {
							className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
							children: "Which should you buy?"
						}), /* @__PURE__ */ jsxs("ul", {
							className: "mt-2 list-disc list-inside space-y-1",
							children: [
								/* @__PURE__ */ jsx("li", { children: "Heavy daily use, hot climate, multiple fans → BLDC pays for itself." }),
								/* @__PURE__ */ jsx("li", { children: "Occasional use, lowest upfront cost → a good conventional fan is fine." }),
								/* @__PURE__ */ jsx("li", { children: "Areas with unstable voltage → pair BLDC with a stabilizer, or stick to conventional." })
							]
						})] })
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-10 rounded-3xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white p-8 shadow-lg",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "font-[Poppins] text-xl font-bold",
							children: "See our BLDC range"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 font-[Inter] text-sm text-white/85",
							children: "Explore CSI Super Toophan premium BLDC ceiling fans — energy efficient and remote-ready."
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/products/$category",
							params: { category: "premium-fans" },
							className: "mt-5 inline-block rounded-full bg-white text-[#0d4361] font-[Poppins] font-semibold px-5 py-2.5 text-sm hover:bg-white/90",
							children: "View Premium Fans"
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
