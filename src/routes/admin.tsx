import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  LogOut, Plus, Search, Pencil, Trash2, Eye, EyeOff, Loader2, Upload, X, Package,
  CheckCircle2, AlertCircle, LayoutGrid, ShieldCheck, ExternalLink, Download,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { categories as staticCategories, type Specification } from "@/lib/products";
import { resolveImage, slugify, staticCatalogRows, type ProductRow } from "@/lib/product-store";
import logo from "@/assets/csi-logo.png";

export const ADMIN_EMAIL = "csifans.official@gmail.com";
const TEN_YEARS = 60 * 60 * 24 * 365 * 10;
const BADGES = ["New Arrival", "Best Seller", "Energy Efficient", "Premium"];

// The managed Google sign-in broker only runs on Lovable-hosted domains, so on
// the production domain we sign in on the Lovable admin URL and hand the
// session back to the production URL. Only this exact URL may receive tokens.
const PROD_ADMIN_URL = "https://csifans.pages.dev/admin";
const LOVABLE_ADMIN_URL = "https://csifans.lovable.app/admin";
const RETURN_TO_KEY = "csi-admin-return-to";
const isLovableHost = () =>
  typeof window !== "undefined" &&
  (window.location.hostname.endsWith("lovable.app") ||
    window.location.hostname === "localhost" ||
    window.location.hostname.endsWith("lovableproject.com"));

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Panel | CSI Fans" },
      { name: "description", content: "Private CSI Fans product administration." },
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { property: "og:title", content: "Admin Panel | CSI Fans" },
      { property: "og:description", content: "Private CSI Fans product administration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

type Toast = { kind: "ok" | "err"; text: string } | null;
const db = supabase as unknown as { from: (t: string) => any; rpc: (f: string) => any };

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [denied, setDenied] = useState<string | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    // Session handoff: sign-in completed on the Lovable host returns here with
    // tokens in the URL hash (never sent to any server).
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const at = hash.get("access_token");
    const rt = hash.get("refresh_token");
    if (at && rt) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      supabase.auth.setSession({ access_token: at, refresh_token: rt }).finally(() => setReady(true));
      return () => sub.subscription.unsubscribe();
    }
    // Remember the allowed production return URL across the Google round trip.
    const returnTo = new URLSearchParams(window.location.search).get("return_to");
    if (returnTo === PROD_ADMIN_URL) sessionStorage.setItem(RETURN_TO_KEY, returnTo);
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // After a verified admin sign-in on the Lovable host, send the session back
  // to the production admin URL it came from.
  useEffect(() => {
    if (isAdmin !== true || !isLovableHost()) return;
    const returnTo = sessionStorage.getItem(RETURN_TO_KEY);
    if (returnTo !== PROD_ADMIN_URL) return;
    sessionStorage.removeItem(RETURN_TO_KEY);
    supabase.auth.getSession().then(({ data }) => {
      const s = data.session;
      if (s) {
        window.location.replace(`${returnTo}#access_token=${s.access_token}&refresh_token=${s.refresh_token}`);
      }
    });
  }, [isAdmin]);

  useEffect(() => {
    if (!session) {
      setIsAdmin(null);
      return;
    }
    let cancelled = false;
    (async () => {
      // Identity is verified by the server (getUser) and by the database (is_csi_admin), never by client-provided data.
      const { data: u } = await supabase.auth.getUser();
      const { data: ok } = await db.rpc("is_csi_admin");
      if (cancelled) return;
      if (u.user && ok === true) {
        setIsAdmin(true);
      } else {
        setDenied(u.user?.email ?? "this account");
        setIsAdmin(false);
        await supabase.auth.signOut();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session]);

  if (!ready || (session && isAdmin === null)) {
    return <Centered><Loader2 className="h-8 w-8 animate-spin text-[#0d6b78]" /></Centered>;
  }
  if (!session || !isAdmin) return <Login denied={denied} />;
  return <Dashboard email={session.user.email ?? ADMIN_EMAIL} />;
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">{children}</div>;
}

function Login({ denied }: { denied: string | null }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const onLovableHost = typeof window !== "undefined" &&
    (window.location.hostname.endsWith("lovable.app") || window.location.hostname === "localhost" || window.location.hostname.endsWith("lovableproject.com"));

  const signIn = async () => {
    setBusy(true);
    setErr(null);
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: new URL("/admin", window.location.origin).toString(),
      extraParams: { prompt: "select_account", login_hint: ADMIN_EMAIL },
    });
    if (res.error) {
      setErr("Google sign-in failed. Please try again.");
      setBusy(false);
    }
  };

  return (
    <Centered>
      <div className="w-full max-w-sm rounded-3xl bg-white/80 backdrop-blur-xl ring-1 ring-white/60 shadow-2xl shadow-[#0d4361]/15 p-7 text-center">
        <img src={logo} alt="CSI Fans" className="mx-auto h-14 w-auto" />
        <h1 className="mt-4 font-[Poppins] text-2xl font-extrabold text-[#0a2f44]">Admin Panel</h1>
        <p className="mt-2 font-[Inter] text-sm text-slate-600">Private area. Only the official CSI Fans Google account can sign in.</p>
        {denied && (
          <div className="mt-4 rounded-xl bg-red-50 text-red-700 text-sm p-3 font-[Inter] flex gap-2 text-left">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            Access denied for {denied}. Please sign in with {ADMIN_EMAIL}.
          </div>
        )}
        {err && <p className="mt-3 text-sm text-red-600 font-[Inter]">{err}</p>}
        <button
          onClick={signIn}
          disabled={busy}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] px-6 py-3.5 font-[Poppins] font-semibold text-white shadow-lg disabled:opacity-70"
        >
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
          Sign in with Google
        </button>
        {!onLovableHost && (
          <p className="mt-3 text-xs text-slate-500 font-[Inter]">You'll be taken to the secure admin sign-in page.</p>
        )}
      </div>
    </Centered>
  );
}

type Draft = {
  id?: string;
  category_slug: string;
  slug: string;
  is_published: boolean;
  sort_order: number;
  name: string;
  modelNo: string;
  price: string;
  originalPrice: string;
  available: boolean;
  description: string;
  fanType: string; sweep: string; rpm: string; airDelivery: string; warranty: string;
  power: string; voltage: string; frequency: string; blades: string; bladeMaterial: string; motor: string;
  colors: string;
  highlights: string;
  features: string;
  specifications: string;
  tags: string[];
  images: string[]; // stored refs
};

const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);

const emptyDraft = (order: number): Draft => ({
  category_slug: staticCategories[0]!.slug, slug: "", is_published: false, sort_order: order,
  name: "", modelNo: "", price: "", originalPrice: "", available: true, description: "",
  fanType: "", sweep: "", rpm: "", airDelivery: "", warranty: "", power: "",
  voltage: "220–240 V AC", frequency: "50 Hz", blades: "", bladeMaterial: "", motor: "",
  colors: "", highlights: "", features: "", specifications: "", tags: [], images: [],
});

const rowToDraft = (r: ProductRow): Draft => {
  const d = r.data as Record<string, any>;
  const imgs: string[] = d.images?.length ? d.images : d.image ? [d.image] : [];
  return {
    id: r.id, category_slug: r.category_slug, slug: r.slug, is_published: r.is_published, sort_order: r.sort_order,
    name: d.name ?? "", modelNo: d.modelNo ?? "", price: d.price ? String(d.price) : "",
    originalPrice: d.originalPrice ? String(d.originalPrice) : "", available: d.available !== false,
    description: d.description ?? "", fanType: d.fanType ?? "", sweep: d.sweep ?? "", rpm: d.rpm ?? "",
    airDelivery: d.airDelivery ?? "", warranty: d.warranty ?? "", power: d.power ?? "", voltage: d.voltage ?? "",
    frequency: d.frequency ?? "", blades: d.blades ?? "", bladeMaterial: d.bladeMaterial ?? "", motor: d.motor ?? "",
    colors: (d.colors ?? []).join(", "), highlights: (d.highlights ?? []).join("\n"),
    features: (d.features ?? []).join("\n"),
    specifications: ((d.specifications ?? []) as Specification[]).map((s) => `${s.label}: ${s.value ?? ""}`).join("\n"),
    tags: d.tags ?? [], images: imgs,
  };
};

const draftToRow = (d: Draft) => {
  const opt = (v: string) => (v.trim() ? v.trim() : undefined);
  return {
    category_slug: d.category_slug,
    slug: d.slug || slugify(d.modelNo || d.name),
    is_published: d.is_published,
    sort_order: d.sort_order,
    data: {
      name: d.name.trim(), modelNo: d.modelNo.trim(),
      price: Number(d.price) || 0,
      originalPrice: Number(d.originalPrice) || undefined,
      available: d.available,
      description: opt(d.description), fanType: opt(d.fanType), sweep: opt(d.sweep), rpm: opt(d.rpm),
      airDelivery: opt(d.airDelivery), warranty: opt(d.warranty), power: opt(d.power), voltage: opt(d.voltage),
      frequency: opt(d.frequency), blades: opt(d.blades), bladeMaterial: opt(d.bladeMaterial), motor: opt(d.motor),
      colors: d.colors.split(",").map((c) => c.trim()).filter(Boolean),
      highlights: lines(d.highlights), features: lines(d.features),
      specifications: lines(d.specifications).map((l) => {
        const i = l.indexOf(":");
        return i > 0 ? { label: l.slice(0, i).trim(), value: l.slice(i + 1).trim() } : { label: l };
      }),
      tags: d.tags, image: d.images[0] ?? "", images: d.images,
    },
  };
};

function Dashboard({ email }: { email: string }) {
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<Toast>(null);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [status, setStatus] = useState("all");
  const [editing, setEditing] = useState<Draft | null>(null);
  const [preview, setPreview] = useState<ProductRow | null>(null);
  const [confirmDel, setConfirmDel] = useState<ProductRow | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  const notify = (t: Toast) => {
    setToast(t);
    setTimeout(() => setToast(null), 4000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await db.from("products").select("*").order("sort_order");
    if (error) notify({ kind: "err", text: "Could not load products." });
    setRows((data ?? []) as ProductRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const importExisting = async () => {
    setImporting(true);
    const { error } = await db.from("products").upsert(staticCatalogRows(), { onConflict: "category_slug,slug", ignoreDuplicates: true });
    setImporting(false);
    if (error) notify({ kind: "err", text: "Import failed: " + error.message });
    else {
      notify({ kind: "ok", text: "Existing website products imported." });
      void load();
    }
  };

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return rows.filter((r) => {
      const d = r.data as Record<string, any>;
      if (cat !== "all" && r.category_slug !== cat) return false;
      if (status === "published" && !r.is_published) return false;
      if (status === "draft" && r.is_published) return false;
      if (!s) return true;
      return `${d.name} ${d.modelNo} ${r.slug}`.toLowerCase().includes(s);
    });
  }, [rows, q, cat, status]);

  const togglePublish = async (r: ProductRow) => {
    setBusyId(r.id);
    const { error } = await db.from("products").update({ is_published: !r.is_published }).eq("id", r.id);
    setBusyId(null);
    if (error) return notify({ kind: "err", text: "Update failed." });
    notify({ kind: "ok", text: r.is_published ? "Product hidden from website." : "Product is now live on the website." });
    void load();
  };

  const doDelete = async (r: ProductRow) => {
    setBusyId(r.id);
    const { error } = await db.from("products").delete().eq("id", r.id);
    setBusyId(null);
    setConfirmDel(null);
    if (error) return notify({ kind: "err", text: "Delete failed." });
    notify({ kind: "ok", text: "Product deleted." });
    void load();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.replace("/admin");
  };

  const catName = (s: string) => staticCategories.find((c) => c.slug === s)?.name ?? s;
  const published = rows.filter((r) => r.is_published).length;
  const usedCats = new Set(rows.map((r) => r.category_slug)).size;

  return (
    <div className="px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-[Poppins] text-2xl sm:text-3xl font-extrabold text-[#0a2f44]">Admin Panel</h1>
            <p className="font-[Inter] text-xs text-slate-500 truncate">{email}</p>
          </div>
          <button onClick={signOut} className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-white/80 ring-1 ring-[#0d6b78]/20 px-4 py-2.5 text-sm font-semibold text-[#0d4361]">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-4">
          <Stat icon={Package} label="Total" value={rows.length} />
          <Stat icon={Eye} label="Live" value={published} />
          <Stat icon={LayoutGrid} label="Categories" value={usedCats} />
        </div>

        {!loading && rows.length === 0 && (
          <div className="mt-5 rounded-2xl bg-[#0d6b78]/10 p-4 font-[Inter] text-sm text-[#0a2f44]">
            <p>Your website is currently showing its built-in products. Import them here once so you can manage them all from this panel.</p>
            <button onClick={importExisting} disabled={importing} className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#0d4361] text-white px-4 py-2.5 font-semibold disabled:opacity-70">
              {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />} Import existing products
            </button>
          </div>
        )}

        <div className="mt-5 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or model no." className="w-full rounded-full bg-white/90 ring-1 ring-[#0d6b78]/20 pl-10 pr-4 py-3 text-sm outline-none focus:ring-[#0d6b78]" />
          </div>
          <div className="flex gap-2">
            <select value={cat} onChange={(e) => setCat(e.target.value)} className="flex-1 rounded-full bg-white/90 ring-1 ring-[#0d6b78]/20 px-3 py-3 text-sm">
              <option value="all">All categories</option>
              {staticCategories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="flex-1 rounded-full bg-white/90 ring-1 ring-[#0d6b78]/20 px-3 py-3 text-sm">
              <option value="all">All</option>
              <option value="published">Live</option>
              <option value="draft">Hidden</option>
            </select>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {loading ? (
            <div className="py-16 flex justify-center"><Loader2 className="h-7 w-7 animate-spin text-[#0d6b78]" /></div>
          ) : filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-slate-500 font-[Inter]">No products found.</p>
          ) : (
            filtered.map((r) => {
              const d = r.data as Record<string, any>;
              return (
                <div key={r.id} className="rounded-2xl bg-white/80 backdrop-blur-xl ring-1 ring-white/60 shadow-sm p-3 flex gap-3">
                  <img src={resolveImage(d.image)} alt="" className="h-20 w-20 rounded-xl object-cover bg-slate-100 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-[Poppins] font-bold text-[#0a2f44] text-sm leading-snug line-clamp-2">{d.name}</p>
                        <p className="text-[11px] text-slate-500 font-[Inter] truncate">{d.modelNo} · {catName(r.category_slug)}</p>
                      </div>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${r.is_published ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                        {r.is_published ? "Live" : "Hidden"}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <IconBtn onClick={() => togglePublish(r)} busy={busyId === r.id} icon={r.is_published ? EyeOff : Eye} label={r.is_published ? "Hide" : "Publish"} />
                      <IconBtn onClick={() => setEditing(rowToDraft(r))} icon={Pencil} label="Edit" />
                      <IconBtn onClick={() => setPreview(r)} icon={ExternalLink} label="Preview" />
                      <IconBtn onClick={() => setConfirmDel(r)} icon={Trash2} label="Delete" danger />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <button
        onClick={() => setEditing(emptyDraft(rows.length))}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] px-5 py-4 font-[Poppins] font-semibold text-white shadow-2xl"
      >
        <Plus className="h-5 w-5" /> Add product
      </button>

      {editing && (
        <Editor
          draft={editing}
          existing={rows}
          onClose={() => setEditing(null)}
          onSaved={(msg) => {
            setEditing(null);
            notify({ kind: "ok", text: msg });
            void load();
          }}
          onError={(text) => notify({ kind: "err", text })}
        />
      )}

      {preview && <Preview row={preview} onClose={() => setPreview(null)} />}

      {confirmDel && (
        <Modal onClose={() => setConfirmDel(null)}>
          <h2 className="font-[Poppins] text-lg font-bold text-[#0a2f44]">Delete this product?</h2>
          <p className="mt-2 text-sm text-slate-600 font-[Inter]">"{(confirmDel.data as any).name}" will be permanently removed from the website. This cannot be undone.</p>
          <div className="mt-5 flex gap-2">
            <button onClick={() => setConfirmDel(null)} className="flex-1 rounded-full ring-1 ring-slate-300 py-3 text-sm font-semibold">Cancel</button>
            <button onClick={() => doDelete(confirmDel)} disabled={busyId === confirmDel.id} className="flex-1 rounded-full bg-red-600 text-white py-3 text-sm font-semibold inline-flex justify-center items-center gap-2">
              {busyId === confirmDel.id && <Loader2 className="h-4 w-4 animate-spin" />} Delete
            </button>
          </div>
        </Modal>
      )}

      {toast && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] max-w-[92vw] rounded-full px-5 py-3 shadow-xl text-sm font-[Inter] font-semibold flex items-center gap-2 ${toast.kind === "ok" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"}`}>
          {toast.kind === "ok" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />} {toast.text}
        </div>
      )}
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Package; label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white/80 backdrop-blur-xl ring-1 ring-white/60 p-3 sm:p-5">
      <Icon className="h-4 w-4 text-[#0d6b78]" />
      <p className="mt-1 font-[Poppins] text-2xl font-extrabold text-[#0a2f44]">{value}</p>
      <p className="text-[11px] uppercase tracking-wider text-slate-500 font-[Inter] font-semibold">{label}</p>
    </div>
  );
}

function IconBtn({ onClick, icon: Icon, label, danger, busy }: { onClick: () => void; icon: typeof Package; label: string; danger?: boolean; busy?: boolean }) {
  return (
    <button onClick={onClick} disabled={busy} className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold ring-1 ${danger ? "ring-red-200 text-red-600" : "ring-[#0d6b78]/20 text-[#0d4361]"} disabled:opacity-60`}>
      {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Icon className="h-3.5 w-3.5" />} {label}
    </button>
  );
}

function Modal({ children, onClose, wide }: { children: React.ReactNode; onClose: () => void; wide?: boolean }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#0a2f44]/50 backdrop-blur-sm flex items-end sm:items-center justify-center" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={`w-full ${wide ? "sm:max-w-2xl" : "sm:max-w-md"} max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white p-5 sm:p-7 shadow-2xl`}>
        {children}
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-xl bg-slate-50 ring-1 ring-slate-200 px-3.5 py-3 text-sm outline-none focus:ring-[#0d6b78]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-[#0d4361] font-[Inter]">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Editor({ draft, existing, onClose, onSaved, onError }: {
  draft: Draft; existing: ProductRow[]; onClose: () => void; onSaved: (msg: string) => void; onError: (t: string) => void;
}) {
  const [d, setD] = useState<Draft>(draft);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((p) => ({ ...p, [k]: v }));
  const isNew = !d.id;

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) throw new Error("Only image files are allowed.");
        if (file.size > 5 * 1024 * 1024) throw new Error("Each image must be under 5 MB.");
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from("product-images").upload(path, file, { contentType: file.type, cacheControl: "31536000" });
        if (error) throw new Error("Upload failed: " + error.message);
        const { data, error: e2 } = await supabase.storage.from("product-images").createSignedUrl(path, TEN_YEARS);
        if (e2 || !data) throw new Error("Could not create image link.");
        setD((p) => ({ ...p, images: [...p.images, data.signedUrl] }));
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
    if (existing.some((r) => r.id !== d.id && r.category_slug === row.category_slug && r.slug === row.slug))
      return setErr("A product with this model number already exists in this category.");
    setSaving(true);
    const res = isNew
      ? await db.from("products").insert(row)
      : await db.from("products").update(row).eq("id", d.id);
    setSaving(false);
    if (res.error) return setErr("Save failed: " + res.error.message);
    onSaved(isNew ? "Product added." : "Product updated.");
  };

  return (
    <Modal onClose={onClose} wide>
      <div className="flex items-center justify-between">
        <h2 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">{isNew ? "Add product" : "Edit product"}</h2>
        <button onClick={onClose} aria-label="Close" className="p-2 rounded-full hover:bg-slate-100"><X className="h-5 w-5" /></button>
      </div>

      <div className="mt-4 space-y-4 font-[Inter]">
        <div>
          <span className="text-xs font-semibold text-[#0d4361]">Product images (first one is the main photo)</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {d.images.map((img, i) => (
              <div key={img + i} className="relative">
                <img src={resolveImage(img)} alt="" className={`h-20 w-20 rounded-xl object-cover ring-2 ${i === 0 ? "ring-[#0d6b78]" : "ring-transparent"}`} />
                <button onClick={() => set("images", d.images.filter((_, j) => j !== i))} className="absolute -top-2 -right-2 rounded-full bg-red-600 text-white p-1" aria-label="Remove image"><X className="h-3 w-3" /></button>
                {i > 0 && (
                  <button onClick={() => set("images", [img, ...d.images.filter((_, j) => j !== i)])} className="absolute bottom-1 left-1 rounded bg-white/90 px-1 text-[9px] font-bold">Main</button>
                )}
              </div>
            ))}
            <label className="h-20 w-20 rounded-xl border-2 border-dashed border-[#0d6b78]/40 flex flex-col items-center justify-center text-[#0d6b78] text-[10px] font-semibold cursor-pointer">
              {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
              {uploading ? "Uploading" : "Add photo"}
              <input type="file" accept="image/*" multiple className="hidden" disabled={uploading} onChange={(e) => { void upload(e.target.files); e.target.value = ""; }} />
            </label>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Product name *"><input className={inputCls} value={d.name} onChange={(e) => set("name", e.target.value)} /></Field>
          <Field label="Model number *"><input className={inputCls} value={d.modelNo} disabled={!isNew} onChange={(e) => set("modelNo", e.target.value)} /></Field>
          <Field label="Category">
            <select className={inputCls} value={d.category_slug} onChange={(e) => set("category_slug", e.target.value)}>
              {staticCategories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Display order"><input type="number" inputMode="numeric" className={inputCls} value={d.sort_order} onChange={(e) => set("sort_order", Number(e.target.value) || 0)} /></Field>
          <Field label="Selling price (₹)"><input type="number" inputMode="decimal" className={inputCls} value={d.price} onChange={(e) => set("price", e.target.value)} /></Field>
          <Field label="Original price (₹, optional)"><input type="number" inputMode="decimal" className={inputCls} value={d.originalPrice} onChange={(e) => set("originalPrice", e.target.value)} /></Field>
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={d.is_published} onChange={(e) => set("is_published", e.target.checked)} className="h-5 w-5 accent-[#0d6b78]" /> Show on website</label>
          <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={d.available} onChange={(e) => set("available", e.target.checked)} className="h-5 w-5 accent-[#0d6b78]" /> In stock</label>
        </div>

        <div>
          <span className="text-xs font-semibold text-[#0d4361]">Badges</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {BADGES.map((b) => {
              const on = d.tags.includes(b);
              return (
                <button key={b} type="button" onClick={() => set("tags", on ? d.tags.filter((t) => t !== b) : [...d.tags, b])}
                  className={`rounded-full px-3 py-2 text-xs font-semibold ring-1 ${on ? "bg-[#0d4361] text-white ring-[#0d4361]" : "ring-slate-300 text-slate-600"}`}>{b}</button>
              );
            })}
          </div>
        </div>

        <Field label="Description"><textarea rows={3} className={inputCls} value={d.description} onChange={(e) => set("description", e.target.value)} /></Field>

        <details className="rounded-xl ring-1 ring-slate-200 p-3" open={isNew}>
          <summary className="text-sm font-semibold text-[#0d4361] cursor-pointer">Quick specs</summary>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {([
              ["fanType", "Type"], ["sweep", "Sweep / size"], ["rpm", "Speed (RPM)"], ["airDelivery", "Air delivery"],
              ["power", "Power"], ["warranty", "Warranty"], ["voltage", "Voltage"], ["frequency", "Frequency"],
              ["blades", "Blades"], ["bladeMaterial", "Blade material"], ["motor", "Motor"], ["colors", "Colours (comma separated)"],
            ] as [keyof Draft, string][]).map(([k, label]) => (
              <Field key={k} label={label}><input className={inputCls} value={d[k] as string} onChange={(e) => set(k, e.target.value as never)} /></Field>
            ))}
          </div>
        </details>

        <Field label="Key highlights (one per line)"><textarea rows={3} className={inputCls} value={d.highlights} onChange={(e) => set("highlights", e.target.value)} /></Field>
        <Field label="Features (one per line)"><textarea rows={4} className={inputCls} value={d.features} onChange={(e) => set("features", e.target.value)} /></Field>
        <Field label="Full specifications (one per line, e.g. Warranty: 2 Years)"><textarea rows={6} className={inputCls} value={d.specifications} onChange={(e) => set("specifications", e.target.value)} /></Field>

        {err && <p className="rounded-xl bg-red-50 text-red-700 text-sm p-3">{err}</p>}

        <div className="sticky bottom-0 -mx-5 sm:-mx-7 px-5 sm:px-7 py-3 bg-white border-t border-slate-100 flex gap-2">
          <button onClick={onClose} className="flex-1 rounded-full ring-1 ring-slate-300 py-3 text-sm font-semibold">Cancel</button>
          <button onClick={save} disabled={saving || uploading} className="flex-[2] rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] text-white py-3 text-sm font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-70">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />} {isNew ? "Add product" : "Save changes"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Preview({ row, onClose }: { row: ProductRow; onClose: () => void }) {
  const d = row.data as Record<string, any>;
  const imgs: string[] = (d.images?.length ? d.images : [d.image]).map(resolveImage);
  return (
    <Modal onClose={onClose} wide>
      <div className="flex items-center justify-between">
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${row.is_published ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>{row.is_published ? "Live" : "Hidden"}</span>
        <button onClick={onClose} aria-label="Close" className="p-2 rounded-full hover:bg-slate-100"><X className="h-5 w-5" /></button>
      </div>
      <img src={imgs[0]} alt="" className="mt-2 w-full aspect-square object-cover rounded-2xl bg-slate-100" />
      <h2 className="mt-4 font-[Poppins] text-xl font-extrabold text-[#0a2f44]">{d.name}</h2>
      <p className="text-sm text-[#0d6b78] font-semibold">Model {d.modelNo}</p>
      {d.description && <p className="mt-3 text-sm text-slate-600 font-[Inter]">{d.description}</p>}
      {row.is_published && (
        <Link to="/products/$category/$model" params={{ category: row.category_slug, model: row.slug }} target="_blank" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0d4361] underline">
          Open on website <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      )}
    </Modal>
  );
}
