import { t as SITE_URL } from "./site-BFylcJ2h.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
//#region src/routes/products.index.tsx
var $$splitComponentImporter = () => import("./products.index-i9CO0x-q.js");
var productsSearchSchema = z.object({ q: fallback(z.string(), "").optional() });
var Route = createFileRoute("/products/")({
	validateSearch: zodValidator(productsSearchSchema),
	head: () => ({
		meta: [
			{ title: "Our Products | CSI Fans" },
			{
				name: "description",
				content: "Explore CSI table fans, pedestal fans, ceiling fans, premium BLDC fans, wall, and special fan categories."
			},
			{
				property: "og:title",
				content: "CSI Fans Product Range"
			},
			{
				property: "og:description",
				content: "Browse table, pedestal, ceiling, premium, wall, and special fan categories from CSI Fans."
			},
			{
				property: "og:url",
				content: `${SITE_URL}/products`
			}
		],
		links: [{
			rel: "canonical",
			href: `${SITE_URL}/products`
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
