import { c as findCategory } from "./product-store-DsR1t-6o.js";
import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
//#region src/routes/products.$category.index.tsx
var $$splitComponentImporter = () => import("./products._category.index-gu6kPgoC.js");
var Route = createFileRoute("/products/$category/")({
	loader: ({ params }) => {
		const cat = findCategory(params.category);
		if (!cat) throw notFound();
		return cat;
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
