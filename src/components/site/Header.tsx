import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Menu, X, Search } from "lucide-react";
import logo from "@/assets/csi-logo.png.asset.json";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/new-launches", label: "New Launches" },
  { to: "/dealers", label: "Dealers" },
  { to: "/downloads", label: "Downloads" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setOpen(false);
    navigate({ to: "/products", search: q ? { q } : {} });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_4px_20px_-8px_rgba(13,67,98,0.15)]"
          : "bg-white/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img
            src={logo.url}
            alt="CSI Fans logo"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-[#0d6b78]/20 group-hover:ring-[#0d6b78]/50 transition-all"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-[Poppins] text-lg font-extrabold tracking-tight text-[#0d4361]">
              CSI Fans
            </span>
            <span className="font-[Inter] hidden sm:inline font-[Inter] text-[10px] font-medium text-[#0d6b78] -mt-0.5">
              ISO 9001:2015 Certified
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="px-3 py-2 rounded-lg font-[Inter] text-sm font-medium text-slate-700 hover:text-[#0d4361] hover:bg-[#0d6b78]/10 transition-colors"
              activeProps={{ className: "text-[#0d4361] bg-[#0d6b78]/15" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-xs items-center">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0d6b78]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fans, models..."
              aria-label="Search products"
              className="w-full pl-9 pr-3 py-2 rounded-full bg-white/80 ring-1 ring-[#0d6b78]/20 focus:ring-2 focus:ring-[#0d6b78]/40 outline-none font-[Inter] text-sm text-[#0a2f44] placeholder:text-slate-400 transition-all"
            />
          </div>
        </form>

        <Link
          to="/contact"
          className="hidden lg:inline-flex shrink-0 items-center rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] px-5 py-2.5 font-[Poppins] text-sm font-semibold text-white shadow-lg shadow-[#0d6b78]/30 hover:shadow-xl hover:shadow-[#0d6b78]/40 hover:scale-105 transition-all"
        >
          Enquire Now
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-lg text-[#0d4361] hover:bg-[#0d6b78]/10"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile search bar (always visible on small screens) */}
      <div className="md:hidden px-4 pb-3 sm:px-6">
        <form onSubmit={submitSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0d6b78]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fans, models..."
            aria-label="Search products"
            className="w-full pl-9 pr-3 py-2 rounded-full bg-white/80 ring-1 ring-[#0d6b78]/20 focus:ring-2 focus:ring-[#0d6b78]/40 outline-none font-[Inter] text-sm text-[#0a2f44] placeholder:text-slate-400"
          />
        </form>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-xl animate-fade-in">
          <nav className="flex flex-col p-3 gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: n.to === "/" }}
                className="px-4 py-3 rounded-lg font-[Inter] text-sm font-medium text-slate-700 hover:bg-[#0d6b78]/10"
                activeProps={{ className: "text-[#0d4361] bg-[#0d6b78]/15" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
