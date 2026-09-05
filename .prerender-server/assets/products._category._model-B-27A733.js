import { t as Route } from "./products._category._model-Cr_yrH1c.js";
import { r as downloadProductCatalogue } from "./catalogue-KWkO4V1f.js";
import { t as Lightbox } from "./Lightbox-B8utlvBm.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, ArrowRight, Check, Download, Loader2, Tag } from "lucide-react";
//#region src/routes/products.$category.$model.tsx?tsr-split=component
function ProductDetailPage() {
	const { category: cat, model } = Route.useLoaderData();
	const [downloading, setDownloading] = useState(false);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [lightboxIndex, setLightboxIndex] = useState(0);
	const productImages = model.images && model.images.length > 0 ? model.images : [model.image];
	const openLightbox = (idx) => {
		setLightboxIndex(idx);
		setLightboxOpen(true);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "py-16 px-4 sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ jsxs("nav", {
					className: "flex items-center gap-1 text-xs font-[Inter] text-slate-500 flex-wrap",
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
						/* @__PURE__ */ jsx(Link, {
							to: "/products/$category",
							params: { category: cat.slug },
							className: "hover:text-[#0d4361]",
							children: cat.name
						}),
						/* @__PURE__ */ jsx(ArrowRight, { className: "h-3 w-3" }),
						/* @__PURE__ */ jsx("span", {
							className: "text-[#0d4361] font-semibold truncate",
							children: model.name
						})
					]
				}),
				/* @__PURE__ */ jsxs(Link, {
					to: "/products/$category",
					params: { category: cat.slug },
					className: "mt-6 inline-flex items-center gap-1 text-sm font-[Inter] text-[#0d6b78] hover:underline",
					children: [
						/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
						" ",
						cat.name
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-8 grid lg:grid-cols-2 gap-10 items-start",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ jsx("div", {
							className: "rounded-3xl overflow-hidden ring-1 ring-white/60 shadow-2xl shadow-[#0d4361]/20 bg-white/40 backdrop-blur-xl aspect-square cursor-zoom-in",
							onClick: () => openLightbox(0),
							children: /* @__PURE__ */ jsx("img", {
								src: productImages[0],
								alt: model.name,
								className: "h-full w-full object-cover"
							})
						}), productImages.length > 1 && /* @__PURE__ */ jsx("div", {
							className: "flex gap-3 overflow-x-auto pb-2",
							children: productImages.map((img, idx) => /* @__PURE__ */ jsx("button", {
								onClick: () => openLightbox(idx),
								className: "shrink-0 rounded-2xl overflow-hidden ring-1 ring-white/60 w-24 h-24 hover:ring-[#0d6b78]/40 transition-all",
								children: /* @__PURE__ */ jsx("img", {
									src: img,
									alt: `${model.name} ${idx + 1}`,
									className: "h-full w-full object-cover"
								})
							}, idx))
						})]
					}), /* @__PURE__ */ jsxs("div", { children: [
						model.tags && model.tags.length > 0 && /* @__PURE__ */ jsx("div", {
							className: "flex flex-wrap gap-2",
							children: model.tags.map((t) => /* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] text-white px-3 py-1 font-[Inter] text-[10px] font-bold uppercase tracking-wider shadow",
								children: [
									/* @__PURE__ */ jsx(Tag, { className: "h-3 w-3" }),
									" ",
									t
								]
							}, t))
						}),
						/* @__PURE__ */ jsx("span", {
							className: "mt-3 inline-block font-[Inter] text-xs font-bold tracking-[0.2em] uppercase text-[#0d6b78]",
							children: cat.name
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "mt-2 font-[Poppins] text-3xl sm:text-4xl font-extrabold text-[#0a2f44]",
							children: model.name
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-2 font-[Inter] text-sm text-[#0d6b78] font-semibold",
							children: ["Model ", model.modelNo]
						}),
						model.description && /* @__PURE__ */ jsx("p", {
							className: "mt-5 font-[Inter] text-slate-600 leading-relaxed",
							children: model.description
						}),
						model.highlights && model.highlights.length > 0 && /* @__PURE__ */ jsxs("div", {
							className: "mt-6 rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-5",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "font-[Poppins] text-sm font-bold text-[#0a2f44] uppercase tracking-wider",
								children: "Key Highlights"
							}), /* @__PURE__ */ jsx("ul", {
								className: "mt-3 space-y-2",
								children: model.highlights.map((h) => /* @__PURE__ */ jsxs("li", {
									className: "flex items-start gap-2 font-[Inter] text-sm text-slate-700",
									children: [
										/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-[#0d6b78] mt-0.5 shrink-0" }),
										" ",
										h
									]
								}, h))
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-5",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "font-[Poppins] text-sm font-bold text-[#0a2f44] uppercase tracking-wider",
								children: "Quick Specs"
							}), /* @__PURE__ */ jsxs("div", {
								className: "mt-3 grid grid-cols-2 gap-3 font-[Inter] text-sm text-slate-600",
								children: [
									model.sweep && /* @__PURE__ */ jsxs("span", { children: ["Sweep: ", /* @__PURE__ */ jsx("b", {
										className: "text-[#0a2f44]",
										children: model.sweep
									})] }),
									model.rpm && /* @__PURE__ */ jsxs("span", { children: ["Speed: ", /* @__PURE__ */ jsx("b", {
										className: "text-[#0a2f44]",
										children: model.rpm
									})] }),
									model.power && /* @__PURE__ */ jsxs("span", { children: ["Power: ", /* @__PURE__ */ jsx("b", {
										className: "text-[#0a2f44]",
										children: model.power
									})] }),
									model.warranty && /* @__PURE__ */ jsxs("span", { children: ["Warranty: ", /* @__PURE__ */ jsx("b", {
										className: "text-[#0a2f44]",
										children: model.warranty
									})] }),
									model.voltage && /* @__PURE__ */ jsxs("span", { children: ["Voltage: ", /* @__PURE__ */ jsx("b", {
										className: "text-[#0a2f44]",
										children: model.voltage
									})] }),
									model.frequency && /* @__PURE__ */ jsxs("span", { children: ["Frequency: ", /* @__PURE__ */ jsx("b", {
										className: "text-[#0a2f44]",
										children: model.frequency
									})] }),
									model.blades && /* @__PURE__ */ jsxs("span", { children: ["Blades: ", /* @__PURE__ */ jsx("b", {
										className: "text-[#0a2f44]",
										children: model.blades
									})] }),
									model.bladeMaterial && /* @__PURE__ */ jsxs("span", { children: ["Material: ", /* @__PURE__ */ jsx("b", {
										className: "text-[#0a2f44]",
										children: model.bladeMaterial
									})] })
								]
							})]
						}),
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: async () => {
								if (downloading) return;
								setDownloading(true);
								try {
									await downloadProductCatalogue(cat, model);
								} finally {
									setDownloading(false);
								}
							},
							disabled: downloading,
							className: "mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] px-6 py-3 font-[Poppins] font-semibold text-white shadow-lg shadow-[#0d6b78]/30 hover:scale-105 transition-transform disabled:opacity-70 disabled:cursor-wait",
							children: [downloading ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }), downloading ? "Preparing PDF…" : "Download Spec Sheet"]
						})
					] })]
				}),
				model.specifications && model.specifications.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "mt-14 rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-6 sm:p-10",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "font-[Poppins] text-2xl font-bold text-[#0a2f44]",
						children: "Full Specifications"
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-6 grid sm:grid-cols-2 gap-x-10 gap-y-0",
						children: model.specifications.map((spec, idx) => /* @__PURE__ */ jsxs("div", {
							className: `flex items-start gap-4 py-3.5 border-b border-slate-100 ${idx % 2 === 0 ? "sm:bg-slate-50/50" : ""}`,
							children: [/* @__PURE__ */ jsx("span", {
								className: "shrink-0 w-32 sm:w-40 font-[Inter] text-xs font-semibold text-[#0d4361] uppercase tracking-wide",
								children: spec.label
							}), /* @__PURE__ */ jsx("span", {
								className: "font-[Inter] text-sm text-slate-700",
								children: spec.value ?? "—"
							})]
						}, idx))
					})]
				}),
				model.features && model.features.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "mt-10 rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-6 sm:p-10",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "font-[Poppins] text-2xl font-bold text-[#0a2f44]",
						children: "Features"
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-6 grid sm:grid-cols-2 gap-3",
						children: model.features.map((f, idx) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-3 rounded-xl bg-[#0d6b78]/5 px-4 py-3",
							children: [/* @__PURE__ */ jsx(Check, { className: "h-5 w-5 text-[#0d6b78] mt-0.5 shrink-0" }), /* @__PURE__ */ jsx("span", {
								className: "font-[Inter] text-sm text-slate-700",
								children: f
							})]
						}, idx))
					})]
				}),
				cat.models.length > 1 && /* @__PURE__ */ jsxs("div", {
					className: "mt-16",
					children: [/* @__PURE__ */ jsxs("h3", {
						className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
						children: ["Other Models in ", cat.name]
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
						children: cat.models.filter((m) => m.modelNo !== model.modelNo).map((mm) => /* @__PURE__ */ jsxs(Link, {
							to: "/products/$category/$model",
							params: {
								category: cat.slug,
								model: mm.slug
							},
							className: "group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col",
							children: [/* @__PURE__ */ jsx("div", {
								className: "aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-[#0d6b78]/5 relative",
								children: /* @__PURE__ */ jsx("img", {
									src: mm.image,
									alt: mm.name,
									loading: "lazy",
									className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-5",
								children: [
									/* @__PURE__ */ jsxs("p", {
										className: "font-[Inter] text-xs text-[#0d6b78] font-semibold",
										children: ["Model ", mm.modelNo]
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "mt-1 font-[Poppins] font-bold text-[#0a2f44]",
										children: mm.name
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mt-3 flex items-center justify-end",
										children: /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1 font-[Inter] text-xs font-semibold text-[#0d4361] group-hover:gap-2 transition-all",
											children: ["View ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })]
										})
									})
								]
							})]
						}, mm.modelNo))
					})]
				})
			]
		}), lightboxOpen && /* @__PURE__ */ jsx(Lightbox, {
			images: productImages,
			initial: lightboxIndex,
			onClose: () => setLightboxOpen(false)
		})]
	});
}
//#endregion
export { ProductDetailPage as component };
