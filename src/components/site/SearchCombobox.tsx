import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Search, X } from "lucide-react";
import { searchModels } from "@/lib/products";

export function SearchCombobox({ id, autoFocus = false, onSubmitted }: { id?: string; autoFocus?: boolean; onSubmitted?: () => void }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const results = useMemo(() => searchModels(query).slice(0, 8), [query]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDoc);
    return () => window.removeEventListener("mousedown", onDoc);
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setOpen(false);
    onSubmitted?.();
    navigate({ to: "/products", search: q ? { q } : {} });
  };

  return (
    <div ref={wrapRef} className="relative w-full">
      <form onSubmit={submit} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0d6b78]" />
        <input
          id={id}
          autoFocus={autoFocus}
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search ceiling, wall, BLDC, sweep, wattage…"
          aria-label="Search products"
          className="w-full pl-9 pr-9 py-2 rounded-full bg-white/85 ring-1 ring-[#0d6b78]/20 focus:ring-2 focus:ring-[#0d6b78]/40 outline-none font-[Inter] text-sm text-[#0a2f44] placeholder:text-slate-400"
        />
        {query && (
          <button type="button" onClick={() => { setQuery(""); setOpen(false); }} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-full text-slate-400 hover:text-[#0d4361]">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </form>

      {open && query.trim() && (
        <div className="absolute z-50 mt-2 w-full rounded-2xl bg-white/95 backdrop-blur-xl ring-1 ring-[#0d6b78]/15 shadow-2xl overflow-hidden">
          {results.length === 0 ? (
            <p className="p-4 font-[Inter] text-sm text-slate-500">No products match "{query}".</p>
          ) : (
            <ul className="max-h-80 overflow-auto">
              {results.map((r) => (
                <li key={r.modelNo}>
                  <Link
                    to="/products/$category/$model"
                    params={{ category: r.categorySlug, model: r.slug }}
                    onClick={() => { setOpen(false); setQuery(""); onSubmitted?.(); }}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-[#0d6b78]/8 transition-colors"
                  >
                    <img src={r.image} alt="" className="h-10 w-10 rounded-lg object-cover bg-slate-100" />
                    <div className="min-w-0 flex-1">
                      <p className="font-[Inter] text-sm font-semibold text-[#0a2f44] truncate">{r.name}</p>
                      <p className="font-[Inter] text-[11px] text-[#0d6b78]">{r.categoryName} · {r.sweep ?? ""} · {r.power ?? ""}</p>
                    </div>
                    <span className="font-[Poppins] text-sm font-bold text-[#0d4361] shrink-0">₹{r.price.toLocaleString("en-IN")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={submit}
            className="w-full text-left px-4 py-2.5 bg-gradient-to-r from-[#0d4361]/5 to-[#0d6b78]/5 font-[Inter] text-xs font-semibold text-[#0d4361] hover:bg-[#0d6b78]/10"
          >
            View all results for "{query.trim()}" →
          </button>
        </div>
      )}
    </div>
  );
}
