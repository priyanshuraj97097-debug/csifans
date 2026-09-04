import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/products.$category.tsx?tsr-split=notFoundComponent
var SplitNotFoundComponent = () => /* @__PURE__ */ jsxs("div", {
	className: "py-24 text-center px-4",
	children: [/* @__PURE__ */ jsx("h1", {
		className: "font-[Poppins] text-3xl font-bold text-[#0a2f44]",
		children: "Category not found"
	}), /* @__PURE__ */ jsx(Link, {
		to: "/products",
		search: {},
		className: "mt-6 inline-block text-[#0d6b78] underline",
		children: "Back to products"
	})]
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
