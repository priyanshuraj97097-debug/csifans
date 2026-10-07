import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/admin.tsx
var $$splitComponentImporter = () => import("./admin-DC1oADcG.js");
var ADMIN_EMAIL = "csifans.official@gmail.com";
var Route = createFileRoute("/admin")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Admin Panel | CSI Fans" },
		{
			name: "description",
			content: "Private CSI Fans product administration."
		},
		{
			name: "robots",
			content: "noindex, nofollow, noarchive"
		},
		{
			property: "og:title",
			content: "Admin Panel | CSI Fans"
		},
		{
			property: "og:description",
			content: "Private CSI Fans product administration."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as n, ADMIN_EMAIL as t };
