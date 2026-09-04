import { i as findModel } from "./products-CR_RBIhI.js";
import { t as SITE_URL } from "./site-BFylcJ2h.js";
import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
//#region src/routes/products.$category.$model.tsx
var $$splitComponentImporter = () => import("./products._category._model-B-27A733.js");
var $$splitErrorComponentImporter = () => import("./products._category._model-CREPzEGG.js");
var $$splitNotFoundComponentImporter = () => import("./products._category._model-DrawftfA.js");
var Route = createFileRoute("/products/$category/$model")({
	loader: ({ params }) => {
		const result = findModel(params.category, params.model);
		if (!result) throw notFound();
		return result;
	},
	head: ({ loaderData }) => ({
		meta: [
			{ title: `${loaderData?.model.name ?? "Product"} | CSI Fans` },
			{
				name: "description",
				content: loaderData?.model.description ?? "CSI Fans product details."
			},
			{
				property: "og:title",
				content: `${loaderData?.model.name ?? "Product"} — CSI Fans`
			},
			{
				property: "og:description",
				content: loaderData?.model.description ?? "Premium fans."
			},
			{
				property: "og:type",
				content: "product"
			},
			{
				property: "og:url",
				content: `${SITE_URL}/products/${loaderData?.category.slug ?? ""}/${loaderData?.model.slug ?? ""}`
			}
		],
		links: [{
			rel: "canonical",
			href: `${SITE_URL}/products/${loaderData?.category.slug ?? ""}/${loaderData?.model.slug ?? ""}`
		}],
		scripts: loaderData ? [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Product",
				name: loaderData.model.name,
				sku: loaderData.model.modelNo,
				description: loaderData.model.description ?? loaderData.category.description,
				category: loaderData.category.name,
				brand: {
					"@type": "Brand",
					name: "CSI Super Toophan"
				},
				url: `${SITE_URL}/products/${loaderData.category.slug}/${loaderData.model.slug}`
			})
		}, {
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "BreadcrumbList",
				itemListElement: [
					{
						"@type": "ListItem",
						position: 1,
						name: "Home",
						item: `${SITE_URL}/`
					},
					{
						"@type": "ListItem",
						position: 2,
						name: "Products",
						item: `${SITE_URL}/products`
					},
					{
						"@type": "ListItem",
						position: 3,
						name: loaderData.category.name,
						item: `${SITE_URL}/products/${loaderData.category.slug}`
					},
					{
						"@type": "ListItem",
						position: 4,
						name: loaderData.model.name,
						item: `${SITE_URL}/products/${loaderData.category.slug}/${loaderData.model.slug}`
					}
				]
			})
		}] : []
	}),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
