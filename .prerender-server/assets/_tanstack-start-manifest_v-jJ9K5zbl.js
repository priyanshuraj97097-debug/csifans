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
			"/assets/index-BX5_QIbG.js",
			"/assets/chunk-QTnfLwEv.js",
			"/assets/preload-helper-zJ_50EbN.js",
			"/assets/chunk-4I5QYGJK-DYkepZdE.js",
			"/assets/matchContext-3Ixwhxdr.js",
			"/assets/src-Cn6kALDM.js",
			"/assets/chunk-NSK5VX7P-CpIIR46X.js",
			"/assets/line-CoE_s_mQ.js",
			"/assets/purify.es-C72B04t_.js",
			"/assets/chunk-I66GZJ75-CYq7f4yz.js",
			"/assets/chunk-7BUUIJ7U-Bb538aSH.js",
			"/assets/chunk-QR6OTTB3-BcOTdxO8.js",
			"/assets/chunk-UBXNYLIW-BlSdR2Z7.js",
			"/assets/chunk-W5SLKNZC-2FN1YXCc.js",
			"/assets/chunk-WRU74C26-CXMCmII8.js",
			"/assets/chunk-Y2CYZVJY-DsF7k-Jl.js",
			"/assets/jsx-runtime-KLUqzItW.js",
			"/assets/rough.esm-CSKSodPl.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-BX5_QIbG.js"
		} }]
	},
	"/": {
		filePath: "/dev-server/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-RWTxZHYU.js",
			"/assets/arrow-right-8M7u2SnW.js",
			"/assets/SectionHeader-CueoQkDZ.js"
		]
	},
	"/about": {
		filePath: "/dev-server/src/routes/about.tsx",
		children: void 0,
		preloads: [
			"/assets/about-Cfgxr9EY.js",
			"/assets/shield-check-CcCApQZ2.js",
			"/assets/factory-CRlxouPT.js",
			"/assets/SectionHeader-CueoQkDZ.js"
		]
	},
	"/admin": {
		filePath: "/dev-server/src/routes/admin.tsx",
		children: void 0,
		preloads: [
			"/assets/admin--B3wX214.js",
			"/assets/download-CwKX4bab.js",
			"/assets/external-link-DaK1mNkq.js",
			"/assets/shield-check-CcCApQZ2.js"
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
		preloads: ["/assets/blog-DSdeMoYh.js"]
	},
	"/contact": {
		filePath: "/dev-server/src/routes/contact.tsx",
		children: void 0,
		preloads: [
			"/assets/contact-BWAmErp4.js",
			"/assets/external-link-DaK1mNkq.js",
			"/assets/SectionHeader-CueoQkDZ.js"
		]
	},
	"/downloads": {
		filePath: "/dev-server/src/routes/downloads.tsx",
		children: void 0,
		preloads: [
			"/assets/downloads-Vi8ZHTfg.js",
			"/assets/catalogue-j792Xs45.js",
			"/assets/download-CwKX4bab.js",
			"/assets/SectionHeader-CueoQkDZ.js"
		]
	},
	"/gallery": {
		filePath: "/dev-server/src/routes/gallery.tsx",
		children: void 0,
		preloads: [
			"/assets/gallery-AGr1XSwP.js",
			"/assets/Lightbox-DCID2Vel.js",
			"/assets/SectionHeader-CueoQkDZ.js"
		]
	},
	"/new-launches": {
		filePath: "/dev-server/src/routes/new-launches.tsx",
		children: void 0,
		preloads: [
			"/assets/new-launches-DcHDj1S6.js",
			"/assets/arrow-right-8M7u2SnW.js",
			"/assets/SectionHeader-CueoQkDZ.js"
		]
	},
	"/products": {
		filePath: "/dev-server/src/routes/products.tsx",
		children: ["/products/$category", "/products/"],
		preloads: ["/assets/products-Vq7d4Db_.js"]
	},
	"/services": {
		filePath: "/dev-server/src/routes/services.tsx",
		children: [
			"/services/installation",
			"/services/maintenance",
			"/services/manufacturing",
			"/services/"
		],
		preloads: ["/assets/services-DSdeMoYh.js"]
	},
	"/blog/bldc-vs-conventional-fans": {
		filePath: "/dev-server/src/routes/blog.bldc-vs-conventional-fans.tsx",
		children: void 0,
		preloads: ["/assets/blog.bldc-vs-conventional-fans-dhynhp3t.js"]
	},
	"/blog/choose-industrial-fan-size": {
		filePath: "/dev-server/src/routes/blog.choose-industrial-fan-size.tsx",
		children: void 0,
		preloads: ["/assets/blog.choose-industrial-fan-size-Bz-xwYMF.js"]
	},
	"/blog/fan-maintenance-checklist": {
		filePath: "/dev-server/src/routes/blog.fan-maintenance-checklist.tsx",
		children: void 0,
		preloads: ["/assets/blog.fan-maintenance-checklist-C4oHjyPs.js"]
	},
	"/products/$category": {
		filePath: "/dev-server/src/routes/products.$category.tsx",
		children: ["/products/$category/$model", "/products/$category/"],
		preloads: [
			"/assets/products._category-CQY_zkwt.js",
			"/assets/products._category-DSdeMoYh.js",
			"/assets/products._category-oUrE_uuE.js"
		]
	},
	"/services/installation": {
		filePath: "/dev-server/src/routes/services.installation.tsx",
		children: void 0,
		preloads: ["/assets/services.installation-tbYW6ph1.js", "/assets/SectionHeader-CueoQkDZ.js"]
	},
	"/services/maintenance": {
		filePath: "/dev-server/src/routes/services.maintenance.tsx",
		children: void 0,
		preloads: ["/assets/services.maintenance-BEWX4tYP.js", "/assets/SectionHeader-CueoQkDZ.js"]
	},
	"/services/manufacturing": {
		filePath: "/dev-server/src/routes/services.manufacturing.tsx",
		children: void 0,
		preloads: ["/assets/services.manufacturing-CXVnStOI.js", "/assets/SectionHeader-CueoQkDZ.js"]
	},
	"/blog/": {
		filePath: "/dev-server/src/routes/blog.index.tsx",
		children: void 0,
		preloads: [
			"/assets/blog.index-NcdZUY8g.js",
			"/assets/arrow-right-8M7u2SnW.js",
			"/assets/SectionHeader-CueoQkDZ.js"
		]
	},
	"/products/": {
		filePath: "/dev-server/src/routes/products.index.tsx",
		children: void 0,
		preloads: [
			"/assets/products.index-1NOq3fSz.js",
			"/assets/arrow-right-8M7u2SnW.js",
			"/assets/SectionHeader-CueoQkDZ.js"
		]
	},
	"/services/": {
		filePath: "/dev-server/src/routes/services.index.tsx",
		children: void 0,
		preloads: [
			"/assets/services.index-CwpRN3_z.js",
			"/assets/arrow-right-8M7u2SnW.js",
			"/assets/factory-CRlxouPT.js",
			"/assets/SectionHeader-CueoQkDZ.js"
		]
	},
	"/products/$category/$model": {
		filePath: "/dev-server/src/routes/products.$category.$model.tsx",
		children: void 0,
		preloads: [
			"/assets/products._category._model-BVXfDdiY.js",
			"/assets/products._category._model-CQY_zkwt.js",
			"/assets/products._category._model-v_IE9RzE.js",
			"/assets/catalogue-j792Xs45.js",
			"/assets/tag-CLj-YLcZ.js",
			"/assets/arrow-right-8M7u2SnW.js",
			"/assets/Lightbox-DCID2Vel.js",
			"/assets/download-CwKX4bab.js"
		]
	},
	"/products/$category/": {
		filePath: "/dev-server/src/routes/products.$category.index.tsx",
		children: void 0,
		preloads: [
			"/assets/products._category.index-B-rdA3EV.js",
			"/assets/catalogue-j792Xs45.js",
			"/assets/tag-CLj-YLcZ.js",
			"/assets/arrow-right-8M7u2SnW.js",
			"/assets/download-CwKX4bab.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
