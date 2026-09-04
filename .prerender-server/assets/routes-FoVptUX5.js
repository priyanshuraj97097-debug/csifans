import { t as SITE_URL } from "./site-BFylcJ2h.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
//#region src/routes/index.tsx
var $$splitComponentImporter = () => import("./routes-C5WV9Oph.js");
var productsSearchSchema = z.object({ q: fallback(z.string(), "").optional() });
var Route = createFileRoute("/")({
	validateSearch: zodValidator(productsSearchSchema),
	head: () => ({
		meta: [
			{ title: "CSI Fans | Ceiling, BLDC, Table & Pedestal Fans in India" },
			{
				name: "description",
				content: "Explore CSI Super Toophan table, pedestal, ceiling, wall and premium BLDC fans — ISO 9001:2015 certified, made in Bihar."
			},
			{
				property: "og:title",
				content: "CSI Fans | Ceiling, BLDC, Table & Pedestal Fans"
			},
			{
				property: "og:description",
				content: "Browse table, pedestal, ceiling, premium BLDC, wall and special fans from CSI Super Toophan."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: `${SITE_URL}/`
			}
		],
		links: [{
			rel: "canonical",
			href: `${SITE_URL}/`
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "BreadcrumbList",
				itemListElement: [{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: `${SITE_URL}/`
				}]
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
