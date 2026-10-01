//#region \0tanstack-start-manifest:v
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/dev-server/src/routes/__root.tsx",
		children: [
			"/",
			"/about",
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
			"/assets/index-BKf9a0Tg.js",
			"/assets/chunk-QTnfLwEv.js",
			"/assets/preload-helper-zJ_50EbN.js",
			"/assets/chunk-4I5QYGJK-DS-0pAR_.js",
			"/assets/matchContext-3Ixwhxdr.js",
			"/assets/src-Cn6kALDM.js",
			"/assets/chunk-NSK5VX7P-kvZ-uynh.js",
			"/assets/line-BAWYIXWe.js",
			"/assets/purify.es-C72B04t_.js",
			"/assets/chunk-I66GZJ75-BjShG-hE.js",
			"/assets/createLucideIcon-B5XD4t4C.js",
			"/assets/chunk-7BUUIJ7U-Bb538aSH.js",
			"/assets/chunk-QR6OTTB3-C45_AZLs.js",
			"/assets/chunk-UBXNYLIW-DNiDZUYG.js",
			"/assets/chunk-W5SLKNZC-u4ObafHF.js",
			"/assets/chunk-WRU74C26-Bs-23al1.js",
			"/assets/chunk-Y2CYZVJY-DsF7k-Jl.js",
			"/assets/jsx-runtime-KLUqzItW.js",
			"/assets/rough.esm-CSKSodPl.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-BKf9a0Tg.js"
		} }]
	},
	"/": {
		filePath: "/dev-server/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-Du2-qh-k.js",
			"/assets/arrow-right-C0JLWFNz.js",
			"/assets/SectionHeader-CueoQkDZ.js"
		]
	},
	"/about": {
		filePath: "/dev-server/src/routes/about.tsx",
		children: void 0,
		preloads: [
			"/assets/about-DY11yGcX.js",
			"/assets/factory-CdT3JTC3.js",
			"/assets/SectionHeader-CueoQkDZ.js"
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
		preloads: ["/assets/blog-eBBe6O3_.js"]
	},
	"/contact": {
		filePath: "/dev-server/src/routes/contact.tsx",
		children: void 0,
		preloads: ["/assets/contact-XROFIdlm.js", "/assets/SectionHeader-CueoQkDZ.js"]
	},
	"/downloads": {
		filePath: "/dev-server/src/routes/downloads.tsx",
		children: void 0,
		preloads: [
			"/assets/downloads-DQQRVMH3.js",
			"/assets/catalogue-BPX5rn2A.js",
			"/assets/SectionHeader-CueoQkDZ.js"
		]
	},
	"/gallery": {
		filePath: "/dev-server/src/routes/gallery.tsx",
		children: void 0,
		preloads: [
			"/assets/gallery-XEBoac3y.js",
			"/assets/Lightbox-a4xniWhM.js",
			"/assets/SectionHeader-CueoQkDZ.js"
		]
	},
	"/new-launches": {
		filePath: "/dev-server/src/routes/new-launches.tsx",
		children: void 0,
		preloads: [
			"/assets/new-launches-I5nLKdtD.js",
			"/assets/arrow-right-C0JLWFNz.js",
			"/assets/SectionHeader-CueoQkDZ.js"
		]
	},
	"/products": {
		filePath: "/dev-server/src/routes/products.tsx",
		children: ["/products/$category", "/products/"],
		preloads: ["/assets/products-BNhqOgRg.js"]
	},
	"/services": {
		filePath: "/dev-server/src/routes/services.tsx",
		children: [
			"/services/installation",
			"/services/maintenance",
			"/services/manufacturing",
			"/services/"
		],
		preloads: ["/assets/services-eBBe6O3_.js"]
	},
	"/blog/bldc-vs-conventional-fans": {
		filePath: "/dev-server/src/routes/blog.bldc-vs-conventional-fans.tsx",
		children: void 0,
		preloads: ["/assets/blog.bldc-vs-conventional-fans-OVMU0f7C.js"]
	},
	"/blog/choose-industrial-fan-size": {
		filePath: "/dev-server/src/routes/blog.choose-industrial-fan-size.tsx",
		children: void 0,
		preloads: ["/assets/blog.choose-industrial-fan-size-CBQeLjua.js"]
	},
	"/blog/fan-maintenance-checklist": {
		filePath: "/dev-server/src/routes/blog.fan-maintenance-checklist.tsx",
		children: void 0,
		preloads: ["/assets/blog.fan-maintenance-checklist-neKDO-HB.js"]
	},
	"/products/$category": {
		filePath: "/dev-server/src/routes/products.$category.tsx",
		children: ["/products/$category/$model", "/products/$category/"],
		preloads: [
			"/assets/products._category-BzNnxtWM.js",
			"/assets/products._category-a4mNmiMy.js",
			"/assets/products._category-eBBe6O3_.js"
		]
	},
	"/services/installation": {
		filePath: "/dev-server/src/routes/services.installation.tsx",
		children: void 0,
		preloads: ["/assets/services.installation-M-UCyBaM.js", "/assets/SectionHeader-CueoQkDZ.js"]
	},
	"/services/maintenance": {
		filePath: "/dev-server/src/routes/services.maintenance.tsx",
		children: void 0,
		preloads: ["/assets/services.maintenance-ChdV8jpC.js", "/assets/SectionHeader-CueoQkDZ.js"]
	},
	"/services/manufacturing": {
		filePath: "/dev-server/src/routes/services.manufacturing.tsx",
		children: void 0,
		preloads: ["/assets/services.manufacturing-ZVt_mlH_.js", "/assets/SectionHeader-CueoQkDZ.js"]
	},
	"/blog/": {
		filePath: "/dev-server/src/routes/blog.index.tsx",
		children: void 0,
		preloads: [
			"/assets/blog.index-xALtSKPc.js",
			"/assets/arrow-right-C0JLWFNz.js",
			"/assets/SectionHeader-CueoQkDZ.js"
		]
	},
	"/products/": {
		filePath: "/dev-server/src/routes/products.index.tsx",
		children: void 0,
		preloads: [
			"/assets/products.index-D7R6kz37.js",
			"/assets/arrow-right-C0JLWFNz.js",
			"/assets/SectionHeader-CueoQkDZ.js"
		]
	},
	"/services/": {
		filePath: "/dev-server/src/routes/services.index.tsx",
		children: void 0,
		preloads: [
			"/assets/services.index-CTl7mfDg.js",
			"/assets/arrow-right-C0JLWFNz.js",
			"/assets/factory-CdT3JTC3.js",
			"/assets/SectionHeader-CueoQkDZ.js"
		]
	},
	"/products/$category/$model": {
		filePath: "/dev-server/src/routes/products.$category.$model.tsx",
		children: void 0,
		preloads: [
			"/assets/products._category._model-Bo3UeDoa.js",
			"/assets/catalogue-BPX5rn2A.js",
			"/assets/tag-vfXhcBYO.js",
			"/assets/arrow-right-C0JLWFNz.js",
			"/assets/Lightbox-a4xniWhM.js",
			"/assets/products._category._model-BzNnxtWM.js",
			"/assets/products._category._model-SYCXrQtU.js"
		]
	},
	"/products/$category/": {
		filePath: "/dev-server/src/routes/products.$category.index.tsx",
		children: void 0,
		preloads: [
			"/assets/products._category.index-CazhsFcr.js",
			"/assets/catalogue-BPX5rn2A.js",
			"/assets/tag-vfXhcBYO.js",
			"/assets/arrow-right-C0JLWFNz.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
