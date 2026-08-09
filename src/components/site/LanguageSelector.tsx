import { useEffect, useRef, useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { LANGUAGES, useLanguage } from "@/lib/i18n";

export function LanguageSelector({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("lang.label")}
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 font-[Inter] text-sm font-medium text-slate-700 hover:bg-[#0d6b78]/10 hover:text-[#0d4361] transition-colors"
      >
        <Globe className="h-4 w-4 text-[#0d6b78]" />
        <span className="hidden sm:inline">{current.native}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-2xl bg-white/95 p-1.5 shadow-2xl ring-1 ring-[#0d6b78]/15 backdrop-blur-xl">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left font-[Inter] text-sm text-slate-700 hover:bg-[#0d6b78]/10"
            >
              <span>
                <span className="font-semibold text-[#0a2f44]">{l.native}</span>
                <span className="ml-1.5 text-[11px] text-slate-500">{l.label}</span>
              </span>
              {l.code === lang && <Check className="h-4 w-4 text-[#0d6b78]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
