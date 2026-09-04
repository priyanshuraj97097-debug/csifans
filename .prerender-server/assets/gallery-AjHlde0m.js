import { t as allModels } from "./products-CR_RBIhI.js";
import { t as SectionHeader } from "./SectionHeader-DnE8YoMs.js";
import { t as Lightbox } from "./Lightbox-B8utlvBm.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/gallery.tsx?tsr-split=component
function GalleryPage() {
	const items = useMemo(() => {
		const seen = /* @__PURE__ */ new Set();
		const out = [];
		for (const m of allModels) {
			const imgs = m.images && m.images.length ? m.images : [m.image];
			for (const src of imgs) {
				if (seen.has(src)) continue;
				seen.add(src);
				out.push({
					src,
					label: m.name,
					category: m.categoryName
				});
			}
		}
		return out;
	}, []);
	const [open, setOpen] = useState(null);
	return /* @__PURE__ */ jsxs("div", {
		className: "py-16 px-4 sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ jsx(SectionHeader, {
				as: "h1",
				eyebrow: "Gallery",
				title: "The CSI Fans Collection",
				subtitle: `Browse ${items.length}+ premium fan renders. Click any image to view fullscreen.`
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4",
				children: items.map((it, i) => /* @__PURE__ */ jsxs("button", {
					onClick: () => setOpen(i),
					className: "group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-[#0d6b78]/5 ring-1 ring-white/60 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all",
					"aria-label": `Open ${it.label}`,
					children: [/* @__PURE__ */ jsx("img", {
						src: it.src,
						alt: it.label,
						loading: "lazy",
						className: "h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
					}), /* @__PURE__ */ jsxs("div", {
						className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left opacity-0 group-hover:opacity-100 transition-opacity",
						children: [/* @__PURE__ */ jsx("p", {
							className: "font-[Poppins] text-white text-xs font-semibold truncate",
							children: it.label
						}), /* @__PURE__ */ jsx("p", {
							className: "font-[Inter] text-white/80 text-[10px]",
							children: it.category
						})]
					})]
				}, `${it.src}-${i}`))
			})]
		}), open !== null && /* @__PURE__ */ jsx(Lightbox, {
			images: items.map((i) => i.src),
			initial: open,
			onClose: () => setOpen(null)
		})]
	});
}
//#endregion
export { GalleryPage as component };
