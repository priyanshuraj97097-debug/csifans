import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/site/SectionHeader.tsx
function SectionHeader({ eyebrow, title, subtitle, as: Heading = "h2" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-3xl text-center",
		children: [
			eyebrow ? /* @__PURE__ */ jsx("p", {
				className: "text-xs font-semibold uppercase tracking-widest text-primary",
				children: eyebrow
			}) : null,
			/* @__PURE__ */ jsx(Heading, {
				className: "mt-2 text-3xl font-bold tracking-tight sm:text-4xl",
				children: title
			}),
			subtitle ? /* @__PURE__ */ jsx("p", {
				className: "mt-3 text-base text-muted-foreground",
				children: subtitle
			}) : null
		]
	});
}
//#endregion
export { SectionHeader as t };
