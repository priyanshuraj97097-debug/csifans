import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_4px_20px_-8px_rgba(13,67,98,0.15)]"
          : "bg-white/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo.url}
            alt="CSI Fans logo"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-[#0d6b78]/20 group-hover:ring-[#0d6b78]/50 transition-all"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-[Poppins] text-lg font-extrabold tracking-tight text-[#0d4361]">
              CSI Fans
            </span>
            <span className="font-[Inter] text-[10px] font-medium text-[#0d6b78] -mt-0.5">
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

        <Link
          to="/contact"
          className="hidden lg:inline-flex items-center rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] px-5 py-2.5 font-[Poppins] text-sm font-semibold text-white shadow-lg shadow-[#0d6b78]/30 hover:shadow-xl hover:shadow-[#0d6b78]/40 hover:scale-105 transition-all"
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
