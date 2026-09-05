import { n as categories } from "./products-CR_RBIhI.js";
import { t as SectionHeader } from "./SectionHeader-DnE8YoMs.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
//#region src/routes/new-launches.tsx?tsr-split=component
var LAUNCH_MODEL_NOS = [
	"CSI-ST-BLDC-BROWN-1200",
	"CSI-ST-WALL-400",
	"CSI-ST-COOKTOP-2600",
	"CSI-ST-HEATER-QUARTZ"
];
function NewLaunches() {
	const launches = categories.flatMap((cat) => cat.models.filter((m) => LAUNCH_MODEL_NOS.includes(m.modelNo)).map((m) => ({
		m,
		cat
	})));
	const ordered = LAUNCH_MODEL_NOS.flatMap((no) => {
		const found = launches.find((l) => l.m.modelNo === no);
		return found ? [found] : [];
	});
	return /* @__PURE__ */ jsx("div", {
		className: "py-16 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-center mb-4",
					children: /* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] px-4 py-1.5 font-[Inter] text-xs font-semibold text-white shadow-lg",
						children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }), " Just Launched"]
					})
				}),
				/* @__PURE__ */ jsx(SectionHeader, {
					as: "h1",
					eyebrow: "New Launches",
					title: "Freshly Engineered for 2026",
					subtitle: "Discover the newest CSI Super Toophan products — built with the latest BLDC technology, premium finishes and class-leading performance."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
					children: ordered.map(({ m, cat }, i) => /* @__PURE__ */ jsxs(Link, {
						to: "/products/$category",
						params: { category: cat.slug },
						className: "group relative rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-lg shadow-[#0d4361]/5 hover:shadow-2xl hover:shadow-[#0d4361]/15 hover:-translate-y-1 transition-all overflow-hidden",
						style: { animationDelay: `${i * 80}ms` },
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "absolute top-4 left-4 z-10 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-[Poppins] font-bold tracking-wide text-[#0d4361] shadow-md",
								children: [/* @__PURE__ */ jsx(Zap, { className: "h-3 w-3" }), " NEW"]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-[#0d6b78]/5",
								children: /* @__PURE__ */ jsx("img", {
									src: m.image,
									alt: m.name,
									loading: "lazy",
									className: "h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "p-6",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "font-[Inter] text-xs text-[#0d6b78] font-semibold uppercase tracking-wider",
										children: cat.name
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "mt-1 font-[Poppins] text-lg font-bold text-[#0a2f44] line-clamp-2",
										children: m.name
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "mt-2 font-[Inter] text-xs text-slate-500",
										children: ["Model: ", m.modelNo]
									}),
									/* @__PURE__ */ jsx("ul", {
										className: "mt-3 space-y-1",
										children: m.highlights.slice(0, 2).map((h) => /* @__PURE__ */ jsxs("li", {
											className: "font-[Inter] text-xs text-slate-600 flex items-start gap-1.5",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "text-[#0d6b78] mt-0.5",
													children: "●"
												}),
												" ",
												h
											]
										}, h))
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mt-4 flex items-center justify-end",
										children: /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1 font-[Poppins] text-sm font-semibold text-[#0d6b78] group-hover:gap-2 transition-all",
											children: ["View ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
										})
									})
								]
							})
						]
					}, m.modelNo))
				})
			]
		})
	});
}
//#endregion
export { NewLaunches as component };
