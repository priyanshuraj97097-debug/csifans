import { n as categories } from "./products-CR_RBIhI.js";
import { t as SectionHeader } from "./SectionHeader-DnE8YoMs.js";
import { n as downloadFullCatalogue, t as downloadCategoryCatalogue } from "./catalogue-KWkO4V1f.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { BookOpen, Download, FileText, Loader2 } from "lucide-react";
//#region src/routes/downloads.tsx?tsr-split=component
function Downloads() {
	const [busy, setBusy] = useState(null);
	const run = async (key, fn) => {
		if (busy) return;
		setBusy(key);
		try {
			await fn();
		} finally {
			setBusy(null);
		}
	};
	const items = [{
		key: "full",
		icon: BookOpen,
		title: "Full Product Catalogue",
		subtitle: `${categories.reduce((n, c) => n + c.models.length, 0)} models · PDF`,
		onClick: () => run("full", () => downloadFullCatalogue(categories))
	}, ...categories.map((c) => ({
		key: c.slug,
		icon: FileText,
		title: `${c.name} Brochure`,
		subtitle: `${c.models.length} model${c.models.length === 1 ? "" : "s"} · PDF`,
		onClick: () => run(c.slug, () => downloadCategoryCatalogue(c))
	}))];
	return /* @__PURE__ */ jsx("div", {
		className: "py-16 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-5xl",
			children: [/* @__PURE__ */ jsx(SectionHeader, {
				as: "h1",
				eyebrow: "Downloads",
				title: "Catalogues & Documents",
				subtitle: "All the resources you need — in one place."
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-12 grid sm:grid-cols-2 gap-4",
				children: items.map(({ key, icon: Icon, title, subtitle, onClick }) => {
					const isBusy = busy === key;
					return /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick,
						disabled: !!busy,
						className: "group flex items-center gap-4 rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all text-left disabled:opacity-70 disabled:cursor-wait",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "h-12 w-12 grid place-items-center rounded-xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white shrink-0",
								children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "font-[Poppins] font-semibold text-[#0a2f44] truncate",
									children: title
								}), /* @__PURE__ */ jsx("p", {
									className: "font-[Inter] text-xs text-slate-500",
									children: isBusy ? "Preparing PDF…" : subtitle
								})]
							}),
							isBusy ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 text-[#0d6b78] animate-spin" }) : /* @__PURE__ */ jsx(Download, { className: "h-5 w-5 text-[#0d6b78] group-hover:translate-y-0.5 transition-transform" })
						]
					}, key);
				})
			})]
		})
	});
}
//#endregion
export { Downloads as component };
