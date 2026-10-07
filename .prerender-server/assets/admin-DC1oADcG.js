import { t as csi_logo_default } from "./csi-logo-BiAyxoe9.js";
import { a as staticCatalogRows, i as slugify, n as resolveImage, s as categories } from "./product-store-CuclNA7Y.js";
import { t as supabase } from "./client-BCj1j12t.js";
import "./admin-DfDoVzKY.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, CheckCircle2, Download, ExternalLink, Eye, EyeOff, LayoutGrid, Loader2, LogOut, Package, Pencil, Plus, Search, ShieldCheck, Trash2, Upload, X } from "lucide-react";
import { createLovableAuth } from "@lovable.dev/cloud-auth-js";
//#region src/integrations/lovable/index.ts
var lovableAuth = createLovableAuth();
var lovable = { auth: { signInWithOAuth: async (provider, opts) => {
	const result = await lovableAuth.signInWithOAuth(provider, {
		...opts,
		extraParams: { ...opts?.extraParams }
	});
	if (result.redirected) return result;
	if (result.error) return result;
	try {
		await supabase.auth.setSession(result.tokens);
	} catch (e) {
		return { error: e instanceof Error ? e : new Error(String(e)) };
	}
	return result;
} } };
//#endregion
//#region src/routes/admin.tsx?tsr-split=component
var TEN_YEARS = 3600 * 24 * 365 * 10;
var BADGES = [
	"New Arrival",
	"Best Seller",
	"Energy Efficient",
	"Premium"
];
var PROD_ADMIN_URL = "https://csifans.pages.dev/admin";
var LOVABLE_ADMIN_URL = "https://csifans.lovable.app/admin";
var RETURN_TO_KEY = "csi-admin-return-to";
var isLovableHost = () => typeof window !== "undefined" && (window.location.hostname.endsWith("lovable.app") || window.location.hostname === "localhost" || window.location.hostname.endsWith("lovableproject.com"));
var db = supabase;
function AdminPage() {
	const [session, setSession] = useState(null);
	const [ready, setReady] = useState(false);
	const [isAdmin, setIsAdmin] = useState(null);
	const [denied, setDenied] = useState(null);
	useEffect(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
		const hash = new URLSearchParams(window.location.hash.slice(1));
		const at = hash.get("access_token");
		const rt = hash.get("refresh_token");
		if (at && rt) {
			window.history.replaceState(null, "", window.location.pathname + window.location.search);
			supabase.auth.setSession({
				access_token: at,
				refresh_token: rt
			}).finally(() => setReady(true));
			return () => sub.subscription.unsubscribe();
		}
		const returnTo = new URLSearchParams(window.location.search).get("return_to");
		if (returnTo === PROD_ADMIN_URL) sessionStorage.setItem(RETURN_TO_KEY, returnTo);
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setReady(true);
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	useEffect(() => {
		if (isAdmin !== true || !isLovableHost()) return;
		const returnTo = sessionStorage.getItem(RETURN_TO_KEY);
		if (returnTo !== PROD_ADMIN_URL) return;
		sessionStorage.removeItem(RETURN_TO_KEY);
		supabase.auth.getSession().then(({ data }) => {
			const s = data.session;
			if (s) window.location.replace(`${returnTo}#access_token=${s.access_token}&refresh_token=${s.refresh_token}`);
		});
	}, [isAdmin]);
	useEffect(() => {
		if (!session) {
			setIsAdmin(null);
			return;
		}
		let cancelled = false;
		(async () => {
			const { data: u } = await supabase.auth.getUser();
			const { data: ok } = await db.rpc("is_csi_admin");
			if (cancelled) return;
			if (u.user && ok === true) setIsAdmin(true);
			else {
				setDenied(u.user?.email ?? "this account");
				setIsAdmin(false);
				await supabase.auth.signOut();
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [session]);
	if (!ready || session && isAdmin === null) return /* @__PURE__ */ jsx(Centered, { children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-[#0d6b78]" }) });
	if (!session || !isAdmin) return /* @__PURE__ */ jsx(Login, { denied });
	return /* @__PURE__ */ jsx(Dashboard, { email: session.user.email ?? "csifans.official@gmail.com" });
}
function Centered({ children }) {
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-[60vh] flex items-center justify-center px-4 py-16",
		children
	});
}
function Login({ denied }) {
	const [busy, setBusy] = useState(false);
	const [err, setErr] = useState(null);
	const onLovableHost = typeof window !== "undefined" && (window.location.hostname.endsWith("lovable.app") || window.location.hostname === "localhost" || window.location.hostname.endsWith("lovableproject.com"));
	const signIn = async () => {
		setBusy(true);
		setErr(null);
		if (!onLovableHost) {
			window.location.href = `${LOVABLE_ADMIN_URL}?return_to=${encodeURIComponent(window.location.origin + "/admin")}`;
			return;
		}
		if ((await lovable.auth.signInWithOAuth("google", {
			redirect_uri: new URL("/admin", window.location.origin).toString(),
			extraParams: {
				prompt: "select_account",
				login_hint: "csifans.official@gmail.com"
			}
		})).error) {
			setErr("Google sign-in failed. Please try again.");
			setBusy(false);
		}
	};
	return /* @__PURE__ */ jsx(Centered, { children: /* @__PURE__ */ jsxs("div", {
		className: "w-full max-w-sm rounded-3xl bg-white/80 backdrop-blur-xl ring-1 ring-white/60 shadow-2xl shadow-[#0d4361]/15 p-7 text-center",
		children: [
			/* @__PURE__ */ jsx("img", {
				src: csi_logo_default,
				alt: "CSI Fans",
				className: "mx-auto h-14 w-auto"
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "mt-4 font-[Poppins] text-2xl font-extrabold text-[#0a2f44]",
				children: "Admin Panel"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 font-[Inter] text-sm text-slate-600",
				children: "Private area. Only the official CSI Fans Google account can sign in."
			}),
			denied && /* @__PURE__ */ jsxs("div", {
				className: "mt-4 rounded-xl bg-red-50 text-red-700 text-sm p-3 font-[Inter] flex gap-2 text-left",
				children: [
					/* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4 mt-0.5 shrink-0" }),
					"Access denied for ",
					denied,
					". Please sign in with ",
					"csifans.official@gmail.com",
					"."
				]
			}),
			err && /* @__PURE__ */ jsx("p", {
				className: "mt-3 text-sm text-red-600 font-[Inter]",
				children: err
			}),
			/* @__PURE__ */ jsxs("button", {
				onClick: signIn,
				disabled: busy,
				className: "mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] px-6 py-3.5 font-[Poppins] font-semibold text-white shadow-lg disabled:opacity-70",
				children: [busy ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsx(ShieldCheck, { className: "h-5 w-5" }), "Sign in with Google"]
			}),
			!onLovableHost && /* @__PURE__ */ jsx("p", {
				className: "mt-3 text-xs text-slate-500 font-[Inter]",
				children: "You'll be taken to the secure admin sign-in page."
			})
		]
	}) });
}
var lines = (s) => s.split("\n").map((x) => x.trim()).filter(Boolean);
var emptyDraft = (order) => ({
	category_slug: categories[0].slug,
	slug: "",
	is_published: false,
	sort_order: order,
	name: "",
	modelNo: "",
	price: "",
	originalPrice: "",
	available: true,
	description: "",
	fanType: "",
	sweep: "",
	rpm: "",
	airDelivery: "",
	warranty: "",
	power: "",
	voltage: "220–240 V AC",
	frequency: "50 Hz",
	blades: "",
	bladeMaterial: "",
	motor: "",
	colors: "",
	highlights: "",
	features: "",
	specifications: "",
	tags: [],
	images: []
});
var rowToDraft = (r) => {
	const d = r.data;
	const imgs = d.images?.length ? d.images : d.image ? [d.image] : [];
	return {
		id: r.id,
		category_slug: r.category_slug,
		slug: r.slug,
		is_published: r.is_published,
		sort_order: r.sort_order,
		name: d.name ?? "",
		modelNo: d.modelNo ?? "",
		price: d.price ? String(d.price) : "",
		originalPrice: d.originalPrice ? String(d.originalPrice) : "",
		available: d.available !== false,
		description: d.description ?? "",
		fanType: d.fanType ?? "",
		sweep: d.sweep ?? "",
		rpm: d.rpm ?? "",
		airDelivery: d.airDelivery ?? "",
		warranty: d.warranty ?? "",
		power: d.power ?? "",
		voltage: d.voltage ?? "",
		frequency: d.frequency ?? "",
		blades: d.blades ?? "",
		bladeMaterial: d.bladeMaterial ?? "",
		motor: d.motor ?? "",
		colors: (d.colors ?? []).join(", "),
		highlights: (d.highlights ?? []).join("\n"),
		features: (d.features ?? []).join("\n"),
		specifications: (d.specifications ?? []).map((s) => `${s.label}: ${s.value ?? ""}`).join("\n"),
		tags: d.tags ?? [],
		images: imgs
	};
};
var draftToRow = (d) => {
	const opt = (v) => v.trim() ? v.trim() : void 0;
	return {
		category_slug: d.category_slug,
		slug: d.slug || slugify(d.modelNo || d.name),
		is_published: d.is_published,
		sort_order: d.sort_order,
		data: {
			name: d.name.trim(),
			modelNo: d.modelNo.trim(),
			price: Number(d.price) || 0,
			originalPrice: Number(d.originalPrice) || void 0,
			available: d.available,
			description: opt(d.description),
			fanType: opt(d.fanType),
			sweep: opt(d.sweep),
			rpm: opt(d.rpm),
			airDelivery: opt(d.airDelivery),
			warranty: opt(d.warranty),
			power: opt(d.power),
			voltage: opt(d.voltage),
			frequency: opt(d.frequency),
			blades: opt(d.blades),
			bladeMaterial: opt(d.bladeMaterial),
			motor: opt(d.motor),
			colors: d.colors.split(",").map((c) => c.trim()).filter(Boolean),
			highlights: lines(d.highlights),
			features: lines(d.features),
			specifications: lines(d.specifications).map((l) => {
				const i = l.indexOf(":");
				return i > 0 ? {
					label: l.slice(0, i).trim(),
					value: l.slice(i + 1).trim()
				} : { label: l };
			}),
			tags: d.tags,
			image: d.images[0] ?? "",
			images: d.images
		}
	};
};
function Dashboard({ email }) {
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(true);
	const [toast, setToast] = useState(null);
	const [q, setQ] = useState("");
	const [cat, setCat] = useState("all");
	const [status, setStatus] = useState("all");
	const [editing, setEditing] = useState(null);
	const [preview, setPreview] = useState(null);
	const [confirmDel, setConfirmDel] = useState(null);
	const [busyId, setBusyId] = useState(null);
	const [importing, setImporting] = useState(false);
	const notify = (t) => {
		setToast(t);
		setTimeout(() => setToast(null), 4e3);
	};
	const load = useCallback(async () => {
		setLoading(true);
		const { data, error } = await db.from("products").select("*").order("sort_order");
		if (error) notify({
			kind: "err",
			text: "Could not load products."
		});
		setRows(data ?? []);
		setLoading(false);
	}, []);
	useEffect(() => {
		load();
	}, [load]);
	const importExisting = async () => {
		setImporting(true);
		const { error } = await db.from("products").upsert(staticCatalogRows(), {
			onConflict: "category_slug,slug",
			ignoreDuplicates: true
		});
		setImporting(false);
		if (error) notify({
			kind: "err",
			text: "Import failed: " + error.message
		});
		else {
			notify({
				kind: "ok",
				text: "Existing website products imported."
			});
			load();
		}
	};
	const filtered = useMemo(() => {
		const s = q.trim().toLowerCase();
		return rows.filter((r) => {
			const d = r.data;
			if (cat !== "all" && r.category_slug !== cat) return false;
			if (status === "published" && !r.is_published) return false;
			if (status === "draft" && r.is_published) return false;
			if (!s) return true;
			return `${d.name} ${d.modelNo} ${r.slug}`.toLowerCase().includes(s);
		});
	}, [
		rows,
		q,
		cat,
		status
	]);
	const togglePublish = async (r) => {
		setBusyId(r.id);
		const { error } = await db.from("products").update({ is_published: !r.is_published }).eq("id", r.id);
		setBusyId(null);
		if (error) return notify({
			kind: "err",
			text: "Update failed."
		});
		notify({
			kind: "ok",
			text: r.is_published ? "Product hidden from website." : "Product is now live on the website."
		});
		load();
	};
	const doDelete = async (r) => {
		setBusyId(r.id);
		const { error } = await db.from("products").delete().eq("id", r.id);
		setBusyId(null);
		setConfirmDel(null);
		if (error) return notify({
			kind: "err",
			text: "Delete failed."
		});
		notify({
			kind: "ok",
			text: "Product deleted."
		});
		load();
	};
	const signOut = async () => {
		await supabase.auth.signOut();
		window.location.replace("/admin");
	};
	const catName = (s) => categories.find((c) => c.slug === s)?.name ?? s;
	const published = rows.filter((r) => r.is_published).length;
	const usedCats = new Set(rows.map((r) => r.category_slug)).size;
	return /* @__PURE__ */ jsxs("div", {
		className: "px-3 sm:px-6 lg:px-8 py-6 sm:py-10",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-6xl",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ jsx("h1", {
								className: "font-[Poppins] text-2xl sm:text-3xl font-extrabold text-[#0a2f44]",
								children: "Admin Panel"
							}), /* @__PURE__ */ jsx("p", {
								className: "font-[Inter] text-xs text-slate-500 truncate",
								children: email
							})]
						}), /* @__PURE__ */ jsxs("button", {
							onClick: signOut,
							className: "shrink-0 inline-flex items-center gap-1.5 rounded-full bg-white/80 ring-1 ring-[#0d6b78]/20 px-4 py-2.5 text-sm font-semibold text-[#0d4361]",
							children: [/* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }), " Sign out"]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-5 grid grid-cols-3 gap-2 sm:gap-4",
						children: [
							/* @__PURE__ */ jsx(Stat, {
								icon: Package,
								label: "Total",
								value: rows.length
							}),
							/* @__PURE__ */ jsx(Stat, {
								icon: Eye,
								label: "Live",
								value: published
							}),
							/* @__PURE__ */ jsx(Stat, {
								icon: LayoutGrid,
								label: "Categories",
								value: usedCats
							})
						]
					}),
					!loading && rows.length === 0 && /* @__PURE__ */ jsxs("div", {
						className: "mt-5 rounded-2xl bg-[#0d6b78]/10 p-4 font-[Inter] text-sm text-[#0a2f44]",
						children: [/* @__PURE__ */ jsx("p", { children: "Your website is currently showing its built-in products. Import them here once so you can manage them all from this panel." }), /* @__PURE__ */ jsxs("button", {
							onClick: importExisting,
							disabled: importing,
							className: "mt-3 inline-flex items-center gap-2 rounded-full bg-[#0d4361] text-white px-4 py-2.5 font-semibold disabled:opacity-70",
							children: [importing ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }), " Import existing products"]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-5 flex flex-col sm:flex-row gap-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "relative flex-1",
							children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" }), /* @__PURE__ */ jsx("input", {
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: "Search name or model no.",
								className: "w-full rounded-full bg-white/90 ring-1 ring-[#0d6b78]/20 pl-10 pr-4 py-3 text-sm outline-none focus:ring-[#0d6b78]"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsxs("select", {
								value: cat,
								onChange: (e) => setCat(e.target.value),
								className: "flex-1 rounded-full bg-white/90 ring-1 ring-[#0d6b78]/20 px-3 py-3 text-sm",
								children: [/* @__PURE__ */ jsx("option", {
									value: "all",
									children: "All categories"
								}), categories.map((c) => /* @__PURE__ */ jsx("option", {
									value: c.slug,
									children: c.name
								}, c.slug))]
							}), /* @__PURE__ */ jsxs("select", {
								value: status,
								onChange: (e) => setStatus(e.target.value),
								className: "flex-1 rounded-full bg-white/90 ring-1 ring-[#0d6b78]/20 px-3 py-3 text-sm",
								children: [
									/* @__PURE__ */ jsx("option", {
										value: "all",
										children: "All"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "published",
										children: "Live"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "draft",
										children: "Hidden"
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-4 space-y-3",
						children: loading ? /* @__PURE__ */ jsx("div", {
							className: "py-16 flex justify-center",
							children: /* @__PURE__ */ jsx(Loader2, { className: "h-7 w-7 animate-spin text-[#0d6b78]" })
						}) : filtered.length === 0 ? /* @__PURE__ */ jsx("p", {
							className: "py-12 text-center text-sm text-slate-500 font-[Inter]",
							children: "No products found."
						}) : filtered.map((r) => {
							const d = r.data;
							return /* @__PURE__ */ jsxs("div", {
								className: "rounded-2xl bg-white/80 backdrop-blur-xl ring-1 ring-white/60 shadow-sm p-3 flex gap-3",
								children: [/* @__PURE__ */ jsx("img", {
									src: resolveImage(d.image),
									alt: "",
									className: "h-20 w-20 rounded-xl object-cover bg-slate-100 shrink-0"
								}), /* @__PURE__ */ jsxs("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ jsx("p", {
												className: "font-[Poppins] font-bold text-[#0a2f44] text-sm leading-snug line-clamp-2",
												children: d.name
											}), /* @__PURE__ */ jsxs("p", {
												className: "text-[11px] text-slate-500 font-[Inter] truncate",
												children: [
													d.modelNo,
													" · ",
													catName(r.category_slug)
												]
											})]
										}), /* @__PURE__ */ jsx("span", {
											className: `shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${r.is_published ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`,
											children: r.is_published ? "Live" : "Hidden"
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "mt-2 flex flex-wrap gap-1.5",
										children: [
											/* @__PURE__ */ jsx(IconBtn, {
												onClick: () => togglePublish(r),
												busy: busyId === r.id,
												icon: r.is_published ? EyeOff : Eye,
												label: r.is_published ? "Hide" : "Publish"
											}),
											/* @__PURE__ */ jsx(IconBtn, {
												onClick: () => setEditing(rowToDraft(r)),
												icon: Pencil,
												label: "Edit"
											}),
											/* @__PURE__ */ jsx(IconBtn, {
												onClick: () => setPreview(r),
												icon: ExternalLink,
												label: "Preview"
											}),
											/* @__PURE__ */ jsx(IconBtn, {
												onClick: () => setConfirmDel(r),
												icon: Trash2,
												label: "Delete",
												danger: true
											})
										]
									})]
								})]
							}, r.id);
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs("button", {
				onClick: () => setEditing(emptyDraft(rows.length)),
				className: "fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] px-5 py-4 font-[Poppins] font-semibold text-white shadow-2xl",
				children: [/* @__PURE__ */ jsx(Plus, { className: "h-5 w-5" }), " Add product"]
			}),
			editing && /* @__PURE__ */ jsx(Editor, {
				draft: editing,
				existing: rows,
				onClose: () => setEditing(null),
				onSaved: (msg) => {
					setEditing(null);
					notify({
						kind: "ok",
						text: msg
					});
					load();
				},
				onError: (text) => notify({
					kind: "err",
					text
				})
			}),
			preview && /* @__PURE__ */ jsx(Preview, {
				row: preview,
				onClose: () => setPreview(null)
			}),
			confirmDel && /* @__PURE__ */ jsxs(Modal, {
				onClose: () => setConfirmDel(null),
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "font-[Poppins] text-lg font-bold text-[#0a2f44]",
						children: "Delete this product?"
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "mt-2 text-sm text-slate-600 font-[Inter]",
						children: [
							"\"",
							confirmDel.data.name,
							"\" will be permanently removed from the website. This cannot be undone."
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-5 flex gap-2",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => setConfirmDel(null),
							className: "flex-1 rounded-full ring-1 ring-slate-300 py-3 text-sm font-semibold",
							children: "Cancel"
						}), /* @__PURE__ */ jsxs("button", {
							onClick: () => doDelete(confirmDel),
							disabled: busyId === confirmDel.id,
							className: "flex-1 rounded-full bg-red-600 text-white py-3 text-sm font-semibold inline-flex justify-center items-center gap-2",
							children: [busyId === confirmDel.id && /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), " Delete"]
						})]
					})
				]
			}),
			toast && /* @__PURE__ */ jsxs("div", {
				className: `fixed top-4 left-1/2 -translate-x-1/2 z-[60] max-w-[92vw] rounded-full px-5 py-3 shadow-xl text-sm font-[Inter] font-semibold flex items-center gap-2 ${toast.kind === "ok" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"}`,
				children: [
					toast.kind === "ok" ? /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4" }),
					" ",
					toast.text
				]
			})
		]
	});
}
function Stat({ icon: Icon, label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-2xl bg-white/80 backdrop-blur-xl ring-1 ring-white/60 p-3 sm:p-5",
		children: [
			/* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 text-[#0d6b78]" }),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 font-[Poppins] text-2xl font-extrabold text-[#0a2f44]",
				children: value
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-[11px] uppercase tracking-wider text-slate-500 font-[Inter] font-semibold",
				children: label
			})
		]
	});
}
function IconBtn({ onClick, icon: Icon, label, danger, busy }) {
	return /* @__PURE__ */ jsxs("button", {
		onClick,
		disabled: busy,
		className: `inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold ring-1 ${danger ? "ring-red-200 text-red-600" : "ring-[#0d6b78]/20 text-[#0d4361]"} disabled:opacity-60`,
		children: [
			busy ? /* @__PURE__ */ jsx(Loader2, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5" }),
			" ",
			label
		]
	});
}
function Modal({ children, onClose, wide }) {
	return /* @__PURE__ */ jsx("div", {
		className: "fixed inset-0 z-50 bg-[#0a2f44]/50 backdrop-blur-sm flex items-end sm:items-center justify-center",
		onClick: onClose,
		children: /* @__PURE__ */ jsx("div", {
			onClick: (e) => e.stopPropagation(),
			className: `w-full ${wide ? "sm:max-w-2xl" : "sm:max-w-md"} max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white p-5 sm:p-7 shadow-2xl`,
			children
		})
	});
}
var inputCls = "w-full rounded-xl bg-slate-50 ring-1 ring-slate-200 px-3.5 py-3 text-sm outline-none focus:ring-[#0d6b78]";
function Field({ label, children }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-xs font-semibold text-[#0d4361] font-[Inter]",
			children: label
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-1",
			children
		})]
	});
}
function Editor({ draft, existing, onClose, onSaved, onError }) {
	const [d, setD] = useState(draft);
	const [saving, setSaving] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [err, setErr] = useState(null);
	const set = (k, v) => setD((p) => ({
		...p,
		[k]: v
	}));
	const isNew = !d.id;
	const upload = async (files) => {
		if (!files?.length) return;
		setUploading(true);
		try {
			for (const file of Array.from(files)) {
				if (!file.type.startsWith("image/")) throw new Error("Only image files are allowed.");
				if (file.size > 5 * 1024 * 1024) throw new Error("Each image must be under 5 MB.");
				const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
				const path = `${crypto.randomUUID()}.${ext}`;
				const { error } = await supabase.storage.from("product-images").upload(path, file, {
					contentType: file.type,
					cacheControl: "31536000"
				});
				if (error) throw new Error("Upload failed: " + error.message);
				const { data, error: e2 } = await supabase.storage.from("product-images").createSignedUrl(path, TEN_YEARS);
				if (e2 || !data) throw new Error("Could not create image link.");
				setD((p) => ({
					...p,
					images: [...p.images, data.signedUrl]
				}));
			}
		} catch (e) {
			onError(e instanceof Error ? e.message : "Upload failed.");
		} finally {
			setUploading(false);
		}
	};
	const save = async () => {
		setErr(null);
		if (!d.name.trim() || !d.modelNo.trim()) return setErr("Product name and model number are required.");
		if (!d.images.length) return setErr("Please add at least one product image.");
		const row = draftToRow(d);
		if (!row.slug) return setErr("Please enter a valid model number.");
		if (existing.some((r) => r.id !== d.id && r.category_slug === row.category_slug && r.slug === row.slug)) return setErr("A product with this model number already exists in this category.");
		setSaving(true);
		const res = isNew ? await db.from("products").insert(row) : await db.from("products").update(row).eq("id", d.id);
		setSaving(false);
		if (res.error) return setErr("Save failed: " + res.error.message);
		onSaved(isNew ? "Product added." : "Product updated.");
	};
	return /* @__PURE__ */ jsxs(Modal, {
		onClose,
		wide: true,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "font-[Poppins] text-xl font-bold text-[#0a2f44]",
				children: isNew ? "Add product" : "Edit product"
			}), /* @__PURE__ */ jsx("button", {
				onClick: onClose,
				"aria-label": "Close",
				className: "p-2 rounded-full hover:bg-slate-100",
				children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "mt-4 space-y-4 font-[Inter]",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
					className: "text-xs font-semibold text-[#0d4361]",
					children: "Product images (first one is the main photo)"
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: [d.images.map((img, i) => /* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ jsx("img", {
								src: resolveImage(img),
								alt: "",
								className: `h-20 w-20 rounded-xl object-cover ring-2 ${i === 0 ? "ring-[#0d6b78]" : "ring-transparent"}`
							}),
							/* @__PURE__ */ jsx("button", {
								onClick: () => set("images", d.images.filter((_, j) => j !== i)),
								className: "absolute -top-2 -right-2 rounded-full bg-red-600 text-white p-1",
								"aria-label": "Remove image",
								children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
							}),
							i > 0 && /* @__PURE__ */ jsx("button", {
								onClick: () => set("images", [img, ...d.images.filter((_, j) => j !== i)]),
								className: "absolute bottom-1 left-1 rounded bg-white/90 px-1 text-[9px] font-bold",
								children: "Main"
							})
						]
					}, img + i)), /* @__PURE__ */ jsxs("label", {
						className: "h-20 w-20 rounded-xl border-2 border-dashed border-[#0d6b78]/40 flex flex-col items-center justify-center text-[#0d6b78] text-[10px] font-semibold cursor-pointer",
						children: [
							uploading ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsx(Upload, { className: "h-5 w-5" }),
							uploading ? "Uploading" : "Add photo",
							/* @__PURE__ */ jsx("input", {
								type: "file",
								accept: "image/*",
								multiple: true,
								className: "hidden",
								disabled: uploading,
								onChange: (e) => {
									upload(e.target.files);
									e.target.value = "";
								}
							})
						]
					})]
				})] }),
				/* @__PURE__ */ jsxs("div", {
					className: "grid sm:grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ jsx(Field, {
							label: "Product name *",
							children: /* @__PURE__ */ jsx("input", {
								className: inputCls,
								value: d.name,
								onChange: (e) => set("name", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Model number *",
							children: /* @__PURE__ */ jsx("input", {
								className: inputCls,
								value: d.modelNo,
								disabled: !isNew,
								onChange: (e) => set("modelNo", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Category",
							children: /* @__PURE__ */ jsx("select", {
								className: inputCls,
								value: d.category_slug,
								onChange: (e) => set("category_slug", e.target.value),
								children: categories.map((c) => /* @__PURE__ */ jsx("option", {
									value: c.slug,
									children: c.name
								}, c.slug))
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Display order",
							children: /* @__PURE__ */ jsx("input", {
								type: "number",
								inputMode: "numeric",
								className: inputCls,
								value: d.sort_order,
								onChange: (e) => set("sort_order", Number(e.target.value) || 0)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Selling price (₹)",
							children: /* @__PURE__ */ jsx("input", {
								type: "number",
								inputMode: "decimal",
								className: inputCls,
								value: d.price,
								onChange: (e) => set("price", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Original price (₹, optional)",
							children: /* @__PURE__ */ jsx("input", {
								type: "number",
								inputMode: "decimal",
								className: inputCls,
								value: d.originalPrice,
								onChange: (e) => set("originalPrice", e.target.value)
							})
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-4",
					children: [/* @__PURE__ */ jsxs("label", {
						className: "inline-flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							checked: d.is_published,
							onChange: (e) => set("is_published", e.target.checked),
							className: "h-5 w-5 accent-[#0d6b78]"
						}), " Show on website"]
					}), /* @__PURE__ */ jsxs("label", {
						className: "inline-flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							checked: d.available,
							onChange: (e) => set("available", e.target.checked),
							className: "h-5 w-5 accent-[#0d6b78]"
						}), " In stock"]
					})]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
					className: "text-xs font-semibold text-[#0d4361]",
					children: "Badges"
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: BADGES.map((b) => {
						const on = d.tags.includes(b);
						return /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => set("tags", on ? d.tags.filter((t) => t !== b) : [...d.tags, b]),
							className: `rounded-full px-3 py-2 text-xs font-semibold ring-1 ${on ? "bg-[#0d4361] text-white ring-[#0d4361]" : "ring-slate-300 text-slate-600"}`,
							children: b
						}, b);
					})
				})] }),
				/* @__PURE__ */ jsx(Field, {
					label: "Description",
					children: /* @__PURE__ */ jsx("textarea", {
						rows: 3,
						className: inputCls,
						value: d.description,
						onChange: (e) => set("description", e.target.value)
					})
				}),
				/* @__PURE__ */ jsxs("details", {
					className: "rounded-xl ring-1 ring-slate-200 p-3",
					open: isNew,
					children: [/* @__PURE__ */ jsx("summary", {
						className: "text-sm font-semibold text-[#0d4361] cursor-pointer",
						children: "Quick specs"
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-3 grid grid-cols-2 gap-3",
						children: [
							["fanType", "Type"],
							["sweep", "Sweep / size"],
							["rpm", "Speed (RPM)"],
							["airDelivery", "Air delivery"],
							["power", "Power"],
							["warranty", "Warranty"],
							["voltage", "Voltage"],
							["frequency", "Frequency"],
							["blades", "Blades"],
							["bladeMaterial", "Blade material"],
							["motor", "Motor"],
							["colors", "Colours (comma separated)"]
						].map(([k, label]) => /* @__PURE__ */ jsx(Field, {
							label,
							children: /* @__PURE__ */ jsx("input", {
								className: inputCls,
								value: d[k],
								onChange: (e) => set(k, e.target.value)
							})
						}, k))
					})]
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "Key highlights (one per line)",
					children: /* @__PURE__ */ jsx("textarea", {
						rows: 3,
						className: inputCls,
						value: d.highlights,
						onChange: (e) => set("highlights", e.target.value)
					})
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "Features (one per line)",
					children: /* @__PURE__ */ jsx("textarea", {
						rows: 4,
						className: inputCls,
						value: d.features,
						onChange: (e) => set("features", e.target.value)
					})
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "Full specifications (one per line, e.g. Warranty: 2 Years)",
					children: /* @__PURE__ */ jsx("textarea", {
						rows: 6,
						className: inputCls,
						value: d.specifications,
						onChange: (e) => set("specifications", e.target.value)
					})
				}),
				err && /* @__PURE__ */ jsx("p", {
					className: "rounded-xl bg-red-50 text-red-700 text-sm p-3",
					children: err
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "sticky bottom-0 -mx-5 sm:-mx-7 px-5 sm:px-7 py-3 bg-white border-t border-slate-100 flex gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: onClose,
						className: "flex-1 rounded-full ring-1 ring-slate-300 py-3 text-sm font-semibold",
						children: "Cancel"
					}), /* @__PURE__ */ jsxs("button", {
						onClick: save,
						disabled: saving || uploading,
						className: "flex-[2] rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] text-white py-3 text-sm font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-70",
						children: [
							saving && /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
							" ",
							isNew ? "Add product" : "Save changes"
						]
					})]
				})
			]
		})]
	});
}
function Preview({ row, onClose }) {
	const d = row.data;
	const imgs = (d.images?.length ? d.images : [d.image]).map(resolveImage);
	return /* @__PURE__ */ jsxs(Modal, {
		onClose,
		wide: true,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("span", {
					className: `rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${row.is_published ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`,
					children: row.is_published ? "Live" : "Hidden"
				}), /* @__PURE__ */ jsx("button", {
					onClick: onClose,
					"aria-label": "Close",
					className: "p-2 rounded-full hover:bg-slate-100",
					children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
				})]
			}),
			/* @__PURE__ */ jsx("img", {
				src: imgs[0],
				alt: "",
				className: "mt-2 w-full aspect-square object-cover rounded-2xl bg-slate-100"
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "mt-4 font-[Poppins] text-xl font-extrabold text-[#0a2f44]",
				children: d.name
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-sm text-[#0d6b78] font-semibold",
				children: ["Model ", d.modelNo]
			}),
			d.description && /* @__PURE__ */ jsx("p", {
				className: "mt-3 text-sm text-slate-600 font-[Inter]",
				children: d.description
			}),
			row.is_published && /* @__PURE__ */ jsxs(Link, {
				to: "/products/$category/$model",
				params: {
					category: row.category_slug,
					model: row.slug
				},
				target: "_blank",
				className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0d4361] underline",
				children: ["Open on website ", /* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5" })]
			})
		]
	});
}
//#endregion
export { AdminPage as component };
