//#region \0tanstack-start-manifest:v
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/dev-server/src/routes/__root.tsx",
		children: [
			"/",
			"/about",
			"/admin",
			"/blog",
			"/contact",
			"/downloads",
			"/gallery",
			"/mcp",
			"/new-launches",
			"/products",
			"/robots.txt",
			"/services",
			"/sitemap.xml",
			"/.mcp/list-tools",
			"/.well-known/oauth-protected-resource",
			"/api/chat",
			"/.mcp/invoke-tool/$tool"
		],
		preloads: [
			"/assets/index-B70TjCKE.js",
			"/assets/chunk-QTnfLwEv.js",
			"/assets/preload-helper-zJ_50EbN.js",
			"/assets/chunk-4I5QYGJK-CUHSmg-3.js",
			"/assets/matchContext-3Ixwhxdr.js",
			"/assets/src-Cn6kALDM.js",
			"/assets/chunk-NSK5VX7P-B01xpK3q.js",
			"/assets/line-BRKkv-_p.js",
			"/assets/purify.es-C72B04t_.js",
			"/assets/chunk-I66GZJ75-BrwP4KZK.js",
			"/assets/chunk-7BUUIJ7U-Bb538aSH.js",
			"/assets/chunk-QR6OTTB3-Dlb0eTd6.js",
			"/assets/chunk-UBXNYLIW-EXwo2j-0.js",
			"/assets/chunk-W5SLKNZC-anix_wJw.js",
			"/assets/chunk-WRU74C26-D0mqDXP4.js",
			"/assets/chunk-Y2CYZVJY-DsF7k-Jl.js",
			"/assets/jsx-runtime-KLUqzItW.js",
			"/assets/rough.esm-CSKSodPl.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-B70TjCKE.js"
		} }]
	},
	"/": {
		filePath: "/dev-server/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-CXZUXcjf.js",
			"/assets/SectionHeader-CueoQkDZ.js",
			"/assets/arrow-right-DoEIgyOf.js"
		]
	},
	"/about": {
		filePath: "/dev-server/src/routes/about.tsx",
		children: void 0,
		preloads: [
			"/assets/about-BTohOXiX.js",
			"/assets/SectionHeader-CueoQkDZ.js",
			"/assets/shield-check-CJFBCDC8.js",
			"/assets/factory-B4s012PM.js"
		]
	},
	"/admin": {
		filePath: "/dev-server/src/routes/admin.tsx",
		children: void 0,
		preloads: [
			"/assets/admin-8wdvObym.js",
			"/assets/download-ooMEFoxb.js",
			"/assets/external-link-Dk3dUHDk.js",
			"/assets/shield-check-CJFBCDC8.js"
		]
	},
	"/blog": {
		filePath: "/dev-server/src/routes/blog.tsx",
		children: [
			"/blog/bldc-vs-conventional-fans",
			"/blog/choose-industrial-fan-size",
			"/blog/fan-maintenance-checklist",
			"/blog/"
		],
		preloads: ["/assets/blog-CgBeCXSd.js"]
	},
	"/contact": {
		filePath: "/dev-server/src/routes/contact.tsx",
		children: void 0,
		preloads: [
			"/assets/contact-D768_srf.js",
			"/assets/SectionHeader-CueoQkDZ.js",
			"/assets/external-link-Dk3dUHDk.js"
		]
	},
	"/downloads": {
		filePath: "/dev-server/src/routes/downloads.tsx",
		children: void 0,
		preloads: [
			"/assets/downloads-BJdVmbRF.js",
			"/assets/SectionHeader-CueoQkDZ.js",
			"/assets/catalogue-qidHvQfv.js",
			"/assets/download-ooMEFoxb.js"
		]
	},
	"/gallery": {
		filePath: "/dev-server/src/routes/gallery.tsx",
		children: void 0,
		preloads: [
			"/assets/gallery-DfDfyJjh.js",
			"/assets/Lightbox-BI5EwGhg.js",
			"/assets/SectionHeader-CueoQkDZ.js"
		]
	},
	"/new-launches": {
		filePath: "/dev-server/src/routes/new-launches.tsx",
		children: void 0,
		preloads: [
			"/assets/new-launches-CDbABerd.js",
			"/assets/SectionHeader-CueoQkDZ.js",
			"/assets/arrow-right-DoEIgyOf.js"
		]
	},
	"/products": {
		filePath: "/dev-server/src/routes/products.tsx",
		children: ["/products/$category", "/products/"],
		preloads: ["/assets/products-Dk4EVmTX.js"]
	},
	"/services": {
		filePath: "/dev-server/src/routes/services.tsx",
		children: [
			"/services/installation",
			"/services/maintenance",
			"/services/manufacturing",
			"/services/"
		],
		preloads: ["/assets/services-CgBeCXSd.js"]
	},
	"/blog/bldc-vs-conventional-fans": {
		filePath: "/dev-server/src/routes/blog.bldc-vs-conventional-fans.tsx",
		children: void 0,
		preloads: ["/assets/blog.bldc-vs-conventional-fans-DaSZojah.js"]
	},
	"/blog/choose-industrial-fan-size": {
		filePath: "/dev-server/src/routes/blog.choose-industrial-fan-size.tsx",
		children: void 0,
		preloads: ["/assets/blog.choose-industrial-fan-size--HCa-qTY.js"]
	},
	"/blog/fan-maintenance-checklist": {
		filePath: "/dev-server/src/routes/blog.fan-maintenance-checklist.tsx",
		children: void 0,
		preloads: ["/assets/blog.fan-maintenance-checklist-wKR8pNcl.js"]
	},
	"/products/$category": {
		filePath: "/dev-server/src/routes/products.$category.tsx",
		children: ["/products/$category/$model", "/products/$category/"],
		preloads: [
			"/assets/products._category-BDQTvOAx.js",
			"/assets/products._category-Be6tWbcy.js",
			"/assets/products._category-CgBeCXSd.js"
		]
	},
	"/services/installation": {
		filePath: "/dev-server/src/routes/services.installation.tsx",
		children: void 0,
		preloads: ["/assets/services.installation-B6WEAyvE.js", "/assets/SectionHeader-CueoQkDZ.js"]
	},
	"/services/maintenance": {
		filePath: "/dev-server/src/routes/services.maintenance.tsx",
		children: void 0,
		preloads: ["/assets/services.maintenance-CFvLoOMK.js", "/assets/SectionHeader-CueoQkDZ.js"]
	},
	"/services/manufacturing": {
		filePath: "/dev-server/src/routes/services.manufacturing.tsx",
		children: void 0,
		preloads: ["/assets/services.manufacturing-2Qtmbb_6.js", "/assets/SectionHeader-CueoQkDZ.js"]
	},
	"/blog/": {
		filePath: "/dev-server/src/routes/blog.index.tsx",
		children: void 0,
		preloads: [
			"/assets/blog.index-CwBQJkpj.js",
			"/assets/SectionHeader-CueoQkDZ.js",
			"/assets/arrow-right-DoEIgyOf.js"
		]
	},
	"/products/": {
		filePath: "/dev-server/src/routes/products.index.tsx",
		children: void 0,
		preloads: [
			"/assets/products.index-BPIgnYQH.js",
			"/assets/SectionHeader-CueoQkDZ.js",
			"/assets/arrow-right-DoEIgyOf.js"
		]
	},
	"/services/": {
		filePath: "/dev-server/src/routes/services.index.tsx",
		children: void 0,
		preloads: [
			"/assets/services.index-DF57Hacd.js",
			"/assets/SectionHeader-CueoQkDZ.js",
			"/assets/arrow-right-DoEIgyOf.js",
			"/assets/factory-B4s012PM.js"
		]
	},
	"/products/$category/$model": {
		filePath: "/dev-server/src/routes/products.$category.$model.tsx",
		children: void 0,
		preloads: [
			"/assets/products._category._model-BDQTvOAx.js",
			"/assets/products._category._model-CuhYffKL.js",
			"/assets/Lightbox-BI5EwGhg.js",
			"/assets/catalogue-qidHvQfv.js",
			"/assets/tag-D49_CEe5.js",
			"/assets/arrow-right-DoEIgyOf.js",
			"/assets/download-ooMEFoxb.js",
			"/assets/products._category._model-DNh6h4b6.js"
		]
	},
	"/products/$category/": {
		filePath: "/dev-server/src/routes/products.$category.index.tsx",
		children: void 0,
		preloads: [
			"/assets/products._category.index-6lYRWyTB.js",
			"/assets/catalogue-qidHvQfv.js",
			"/assets/tag-D49_CEe5.js",
			"/assets/arrow-right-DoEIgyOf.js",
			"/assets/download-ooMEFoxb.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
