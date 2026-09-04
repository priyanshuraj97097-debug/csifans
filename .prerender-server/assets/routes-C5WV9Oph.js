import { n as categories, s as searchModels } from "./products-CR_RBIhI.js";
import { t as Route } from "./routes-FoVptUX5.js";
import { t as SectionHeader } from "./SectionHeader-DnE8YoMs.js";
import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, Pause, Play, Search } from "lucide-react";
//#region src/components/site/BrandVideo.tsx
var VIDEO_SRC = "/videos/csi-super-toophan-brand-video.mp4";
var POSTER_SRC = "/videos/csi-super-toophan-brand-video-poster.jpg";
function BrandVideo() {
	const videoRef = useRef(null);
	const [playing, setPlaying] = useState(false);
	const toggle = () => {
		const v = videoRef.current;
		if (!v) return;
		if (v.paused) v.play();
		else v.pause();
	};
	return /* @__PURE__ */ jsxs("section", {
		"aria-labelledby": "brand-video-heading",
		className: "mb-16",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-3xl text-center",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-xs font-semibold uppercase tracking-widest text-[#0d6b78]",
					children: "Brand Film"
				}),
				/* @__PURE__ */ jsx("h2", {
					id: "brand-video-heading",
					className: "mt-2 font-[Poppins] text-3xl font-bold tracking-tight text-[#0a2f44] sm:text-4xl",
					children: "Discover CSI Super Toophan"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-3 font-[Inter] text-base text-slate-600",
					children: "A short look at the craftsmanship, quality and innovation behind every CSI Super Toophan product."
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "mx-auto mt-8 max-w-4xl",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "group relative overflow-hidden rounded-3xl bg-white/70 shadow-md ring-1 ring-white/60 backdrop-blur-xl",
				children: [/* @__PURE__ */ jsx("video", {
					ref: videoRef,
					className: "aspect-video h-full w-full bg-slate-900 object-cover",
					src: VIDEO_SRC,
					poster: POSTER_SRC,
					muted: true,
					playsInline: true,
					loop: true,
					preload: "none",
					controls: playing,
					onPlay: () => setPlaying(true),
					onPause: () => setPlaying(false),
					"aria-label": "CSI Super Toophan brand advertisement video"
				}), !playing ? /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: toggle,
					"aria-label": "Play brand video",
					className: "absolute inset-0 flex items-center justify-center bg-[#0a2f44]/30 transition-colors hover:bg-[#0a2f44]/40",
					children: /* @__PURE__ */ jsx("span", {
						className: "flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110",
						children: /* @__PURE__ */ jsx(Play, { className: "ml-1 h-7 w-7 text-[#0d4361]" })
					})
				}) : /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: toggle,
					"aria-label": "Pause brand video",
					className: "absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 shadow-md transition-transform hover:scale-105",
					children: /* @__PURE__ */ jsx(Pause, { className: "h-4 w-4 text-[#0d4361]" })
				})]
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-3 text-center font-[Inter] text-xs text-slate-500",
				children: "Video plays muted. Use the controls to play, pause or unmute."
			})]
		})]
	});
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
function Products() {
	const { q } = Route.useSearch();
	const results = q ? searchModels(q) : [];
	return /* @__PURE__ */ jsx("div", {
		className: "py-16 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsx("div", {
			className: "mx-auto max-w-7xl",
			children: q ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-center text-center",
				children: [
					/* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-2 rounded-full bg-[#0d6b78]/10 px-4 py-1.5 font-[Inter] text-xs font-semibold text-[#0d4361]",
						children: [/* @__PURE__ */ jsx(Search, { className: "h-3.5 w-3.5" }), " Search results"]
					}),
					/* @__PURE__ */ jsxs("h1", {
						className: "mt-4 font-[Poppins] text-3xl sm:text-4xl font-extrabold text-[#0a2f44]",
						children: [
							"\"",
							q,
							"\""
						]
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "mt-2 font-[Inter] text-slate-600",
						children: [
							results.length,
							" ",
							results.length === 1 ? "product" : "products",
							" found"
						]
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/products",
						search: {},
						className: "mt-3 text-sm font-[Inter] text-[#0d6b78] hover:underline",
						children: "Clear search"
					})
				]
			}), results.length > 0 ? /* @__PURE__ */ jsx("div", {
				className: "mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
				children: results.map((m) => /* @__PURE__ */ jsxs(Link, {
					to: "/products/$category/$model",
					params: {
						category: m.categorySlug,
						model: m.slug
					},
					className: "group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden",
					children: [/* @__PURE__ */ jsx("div", {
						className: "aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-[#0d6b78]/5",
						children: /* @__PURE__ */ jsx("img", {
							src: m.image,
							alt: m.name,
							loading: "lazy",
							className: "h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "font-[Inter] text-xs text-[#0d6b78] font-semibold",
								children: m.categoryName
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-1 font-[Poppins] font-semibold text-[#0a2f44]",
								children: m.name
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-3 flex items-center justify-end",
								children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 text-[#0d6b78] group-hover:translate-x-1 transition-transform" })
							})
						]
					})]
				}, m.modelNo))
			}) : /* @__PURE__ */ jsxs("div", {
				className: "mt-12 rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-10 text-center",
				children: [/* @__PURE__ */ jsx("p", {
					className: "font-[Inter] text-slate-600",
					children: "No products match your search. Browse all categories below."
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: categories.map((c) => /* @__PURE__ */ jsx(Link, {
						to: "/products/$category",
						params: { category: c.slug },
						className: "rounded-full bg-[#0d6b78]/10 hover:bg-[#0d6b78]/20 px-4 py-2 font-[Inter] text-sm text-[#0d4361]",
						children: c.name
					}, c.slug))
				})]
			})] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsx(BrandVideo, {}),
				/* @__PURE__ */ jsx(SectionHeader, {
					eyebrow: "Our Range",
					title: "Fans for Every Space",
					subtitle: "Browse table, pedestal, ceiling, premium BLDC, and upcoming specialty categories from CSI Fans."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
					children: categories.map((c) => /* @__PURE__ */ jsxs(Link, {
						to: "/products/$category",
						params: { category: c.slug },
						className: "group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden",
						children: [/* @__PURE__ */ jsx("div", {
							className: "aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-50 to-[#0d6b78]/5",
							children: /* @__PURE__ */ jsx("img", {
								src: c.image,
								alt: c.name,
								loading: "lazy",
								className: "h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "p-6",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
									children: c.name
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 font-[Inter] text-sm text-[#0d6b78] font-medium",
									children: c.tagline
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-3 font-[Inter] text-sm text-slate-600 line-clamp-2",
									children: c.description
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-5 inline-flex items-center gap-1 font-[Poppins] text-sm font-semibold text-[#0d4361] group-hover:gap-2 transition-all",
									children: ["View Range ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
								})
							]
						})]
					}, c.slug))
				})
			] })
		})
	});
}
//#endregion
export { Products as component };
