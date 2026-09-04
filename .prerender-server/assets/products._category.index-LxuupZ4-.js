import { a as parsePower, n as categories, o as parseSweep } from "./products-CR_RBIhI.js";
import { t as Route } from "./products._category.index-CBl7A5b2.js";
import { t as downloadCategoryCatalogue } from "./catalogue-KWkO4V1f.js";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, ArrowRight, Check, Download, Loader2, SlidersHorizontal, Tag } from "lucide-react";
//#region src/routes/products.$category.index.tsx?tsr-split=component
function CategoryPage() {
	const c = Route.useLoaderData();
	const [sort, setSort] = useState("latest");
	const [maxPrice, setMaxPrice] = useState(0);
	const [maxSweep, setMaxSweep] = useState(0);
	const [maxPower, setMaxPower] = useState(0);
	const [showFilters, setShowFilters] = useState(false);
	const [downloading, setDownloading] = useState(false);
	const priceCap = c.models.length ? Math.max(...c.models.map((m) => m.price)) : 0;
	const sweepCap = c.models.length ? Math.max(...c.models.map((m) => parseSweep(m.sweep))) : 0;
	const powerCap = c.models.length ? Math.max(...c.models.map((m) => parsePower(m.power))) : 0;
	const models = useMemo(() => {
		let list = [...c.models];
		if (maxPrice > 0) list = list.filter((m) => m.price <= maxPrice);
		if (maxSweep > 0) list = list.filter((m) => parseSweep(m.sweep) <= maxSweep);
		if (maxPower > 0) list = list.filter((m) => parsePower(m.power) <= maxPower);
		switch (sort) {
			case "price-asc":
				list.sort((a, b) => a.price - b.price);
				break;
			case "price-desc":
				list.sort((a, b) => b.price - a.price);
				break;
			case "popular":
				list.sort((a, b) => Number(b.tags?.includes("Best Seller")) - Number(a.tags?.includes("Best Seller")));
				break;
			case "latest":
				list.sort((a, b) => Number(b.tags?.includes("New Arrival")) - Number(a.tags?.includes("New Arrival")));
				break;
		}
		return list;
	}, [
		c.models,
		sort,
		maxPrice,
		maxSweep,
		maxPower
	]);
	const resetFilters = () => {
		setMaxPrice(0);
		setMaxSweep(0);
		setMaxPower(0);
		setSort("latest");
	};
	return /* @__PURE__ */ jsx("div", {
		className: "py-16 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ jsxs("nav", {
					className: "flex items-center gap-1 text-xs font-[Inter] text-slate-500",
					children: [
						/* @__PURE__ */ jsx(Link, {
							to: "/",
							className: "hover:text-[#0d4361]",
							children: "Home"
						}),
						/* @__PURE__ */ jsx(ArrowRight, { className: "h-3 w-3" }),
						/* @__PURE__ */ jsx(Link, {
							to: "/products",
							search: {},
							className: "hover:text-[#0d4361]",
							children: "Products"
						}),
						/* @__PURE__ */ jsx(ArrowRight, { className: "h-3 w-3" }),
						/* @__PURE__ */ jsx("span", {
							className: "text-[#0d4361] font-semibold",
							children: c.name
						})
					]
				}),
				/* @__PURE__ */ jsxs(Link, {
					to: "/products",
					search: {},
					className: "mt-6 inline-flex items-center gap-1 text-sm font-[Inter] text-[#0d6b78] hover:underline",
					children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }), " All categories"]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 grid lg:grid-cols-2 gap-10 items-center",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("span", {
							className: "inline-block font-[Inter] text-xs font-bold tracking-[0.2em] uppercase text-[#0d6b78]",
							children: c.tagline
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "mt-3 font-[Poppins] text-4xl sm:text-5xl font-extrabold text-[#0a2f44]",
							children: c.name
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-5 font-[Inter] text-slate-600 leading-relaxed",
							children: c.description
						}),
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: async () => {
								if (downloading) return;
								setDownloading(true);
								try {
									await downloadCategoryCatalogue(c);
								} finally {
									setDownloading(false);
								}
							},
							disabled: downloading,
							className: "mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] px-6 py-3 font-[Poppins] font-semibold text-white shadow-lg shadow-[#0d6b78]/30 hover:scale-105 transition-transform disabled:opacity-70 disabled:cursor-wait",
							children: [downloading ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }), downloading ? "Preparing PDF…" : "Download Catalogue"]
						})
					] }), /* @__PURE__ */ jsx("div", {
						className: "rounded-3xl overflow-hidden ring-1 ring-white/60 shadow-2xl shadow-[#0d4361]/20 bg-white/40 backdrop-blur-xl aspect-[4/3]",
						children: /* @__PURE__ */ jsx("img", {
							src: c.image,
							alt: c.name,
							className: "h-full w-full object-cover"
						})
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-14 flex items-center justify-between flex-wrap gap-3",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "font-[Poppins] text-2xl font-bold text-[#0a2f44]",
						children: ["Available Models ", /* @__PURE__ */ jsxs("span", {
							className: "font-[Inter] text-sm font-medium text-slate-500",
							children: [
								"(",
								models.length,
								")"
							]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsxs("button", {
							onClick: () => setShowFilters((v) => !v),
							className: "inline-flex items-center gap-1.5 rounded-full bg-white/80 ring-1 ring-[#0d6b78]/20 px-4 py-2 font-[Inter] text-sm font-semibold text-[#0d4361] hover:bg-[#0d6b78]/10",
							"aria-expanded": showFilters,
							children: [/* @__PURE__ */ jsx(SlidersHorizontal, { className: "h-4 w-4" }), " Filters"]
						}), /* @__PURE__ */ jsxs("select", {
							value: sort,
							onChange: (e) => setSort(e.target.value),
							className: "rounded-full bg-white/80 ring-1 ring-[#0d6b78]/20 px-4 py-2 font-[Inter] text-sm font-semibold text-[#0d4361] outline-none",
							"aria-label": "Sort",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "latest",
									children: "Latest"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "popular",
									children: "Popular"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "price-asc",
									children: "Price: Low to High"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "price-desc",
									children: "Price: High to Low"
								})
							]
						})]
					})]
				}),
				showFilters && /* @__PURE__ */ jsxs("div", {
					className: "mt-4 rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-5 grid sm:grid-cols-3 gap-5 animate-fade-in",
					children: [
						/* @__PURE__ */ jsx(FilterSlider, {
							label: "Max Price",
							value: maxPrice || priceCap,
							max: priceCap,
							step: 100,
							suffix: "₹",
							onChange: setMaxPrice,
							disabled: priceCap === 0
						}),
						/* @__PURE__ */ jsx(FilterSlider, {
							label: "Max Sweep",
							value: maxSweep || sweepCap,
							max: sweepCap,
							step: 50,
							suffix: " mm",
							onChange: setMaxSweep,
							disabled: sweepCap === 0
						}),
						/* @__PURE__ */ jsx(FilterSlider, {
							label: "Max Power",
							value: maxPower || powerCap,
							max: powerCap,
							step: 5,
							suffix: " W",
							onChange: setMaxPower,
							disabled: powerCap === 0
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: resetFilters,
							className: "sm:col-span-3 justify-self-start text-xs font-[Inter] font-semibold text-[#0d6b78] hover:underline",
							children: "Reset filters"
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6",
					children: models.map((mm) => /* @__PURE__ */ jsxs(Link, {
						to: "/products/$category/$model",
						params: {
							category: c.slug,
							model: mm.slug
						},
						className: "group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-[#0d6b78]/5 relative",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: mm.image,
									alt: mm.name,
									loading: "lazy",
									className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								}),
								mm.tags && mm.tags.length > 0 && /* @__PURE__ */ jsx("div", {
									className: "absolute top-3 left-3 flex flex-col gap-1 items-start",
									children: mm.tags.slice(0, 2).map((t) => /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] text-white px-2 py-0.5 font-[Inter] text-[9px] font-bold uppercase tracking-wider shadow",
										children: [
											/* @__PURE__ */ jsx(Tag, { className: "h-2.5 w-2.5" }),
											" ",
											t
										]
									}, t))
								}),
								/* @__PURE__ */ jsx("span", {
									className: "absolute bottom-3 right-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 font-[Inter] text-[11px] font-semibold text-[#0d4361] shadow",
									children: "View details →"
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "p-5 flex flex-col flex-1",
							children: [
								/* @__PURE__ */ jsxs("p", {
									className: "font-[Inter] text-xs text-[#0d6b78] font-semibold",
									children: ["Model ", mm.modelNo]
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "mt-1 font-[Poppins] font-bold text-[#0a2f44]",
									children: mm.name
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-3 grid grid-cols-2 gap-1.5 font-[Inter] text-xs text-slate-600",
									children: [
										mm.sweep && /* @__PURE__ */ jsxs("span", { children: ["Sweep: ", /* @__PURE__ */ jsx("b", {
											className: "text-[#0a2f44]",
											children: mm.sweep
										})] }),
										mm.rpm && /* @__PURE__ */ jsxs("span", { children: ["Speed: ", /* @__PURE__ */ jsx("b", {
											className: "text-[#0a2f44]",
											children: mm.rpm
										})] }),
										mm.power && /* @__PURE__ */ jsxs("span", { children: ["Power: ", /* @__PURE__ */ jsx("b", {
											className: "text-[#0a2f44]",
											children: mm.power
										})] }),
										mm.warranty && /* @__PURE__ */ jsxs("span", { children: ["Warranty: ", /* @__PURE__ */ jsx("b", {
											className: "text-[#0a2f44]",
											children: mm.warranty
										})] })
									]
								}),
								/* @__PURE__ */ jsx("ul", {
									className: "mt-3 space-y-1",
									children: mm.highlights.slice(0, 3).map((h) => /* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-2 font-[Inter] text-xs text-slate-700",
										children: [
											/* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5 text-[#0d6b78] mt-0.5 shrink-0" }),
											" ",
											h
										]
									}, h))
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-auto pt-4 flex items-center justify-end gap-3",
									children: /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1 font-[Inter] text-xs font-semibold text-[#0d4361] group-hover:gap-2 transition-all",
										children: ["View ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })]
									})
								})
							]
						})]
					}, mm.modelNo))
				}),
				models.length === 0 && /* @__PURE__ */ jsxs("div", {
					className: "mt-10 rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-8 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "font-[Inter] text-slate-600",
						children: "No products match these filters yet."
					}), /* @__PURE__ */ jsx("button", {
						onClick: resetFilters,
						className: "mt-3 text-sm font-[Inter] text-[#0d6b78] underline",
						children: "Reset filters"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-16",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
						children: "Other Categories"
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: categories.filter((cc) => cc.slug !== c.slug).map((cc) => /* @__PURE__ */ jsx(Link, {
							to: "/products/$category",
							params: { category: cc.slug },
							className: "rounded-full bg-white/70 ring-1 ring-[#0d6b78]/20 px-4 py-2 font-[Inter] text-sm text-[#0d4361] hover:bg-[#0d6b78]/10 transition-colors",
							children: cc.name
						}, cc.slug))
					})]
				})
			]
		})
	});
}
function FilterSlider({ label, value, max, step, suffix, onChange, disabled }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between font-[Inter] text-xs font-semibold text-[#0d4361]",
			children: [/* @__PURE__ */ jsx("span", { children: label }), /* @__PURE__ */ jsx("span", {
				className: "text-[#0d6b78]",
				children: disabled ? "Any" : `${suffix === "₹" ? "₹" : ""}${value.toLocaleString("en-IN")}${suffix !== "₹" ? suffix : ""}`
			})]
		}), /* @__PURE__ */ jsx("input", {
			type: "range",
			min: 0,
			max: Math.max(max, 0),
			step,
			value,
			onChange: (e) => onChange(Number(e.target.value)),
			className: "mt-2 w-full accent-[#0d6b78]",
			disabled: disabled || max === 0
		})]
	});
}
//#endregion
export { CategoryPage as component };
