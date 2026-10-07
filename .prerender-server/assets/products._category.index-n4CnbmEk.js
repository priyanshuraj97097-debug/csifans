import { c as findCategory } from "./product-store-CuclNA7Y.js";
import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
//#region src/routes/products.$category.index.tsx
var $$splitComponentImporter = () => import("./products._category.index-BANDQOMU.js");
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
