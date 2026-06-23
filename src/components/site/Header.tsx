import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/csi-logo.png.asset.json";
import { categories } from "@/lib/products";
import { SearchCombobox } from "./SearchCombobox";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/new-launches", label: "New Launches" },
  { to: "/gallery", label: "Gallery" },
  { to: "/dealers", label: "Dealers" },
  { to: "/downloads", label: "Downloads" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => { setOpen(false); setProductsOpen(false); setOpenCat(null); };

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
            <span className="font-[Inter] hidden sm:inline text-[10px] font-medium text-[#0d6b78] -mt-0.5">
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

        <div className="hidden md:flex flex-1 max-w-xs items-center">
          <SearchCombobox />
        </div>

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

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-3 sm:px-6">
        <SearchCombobox />
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-xl animate-fade-in max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col p-3 gap-1">
            {nav.map((n) => {
              if (n.to === "/products") {
                return (
                  <div key={n.to} className="rounded-lg">
                    <button
                      onClick={() => setProductsOpen((v) => !v)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-[Inter] text-sm font-medium text-slate-700 hover:bg-[#0d6b78]/10"
                      aria-expanded={productsOpen}
                    >
                      <span>Products</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${productsOpen ? "rotate-180" : ""}`} />
                    </button>
                    {productsOpen && (
                      <div className="pl-2">
                        <Link
                          to="/products"
                          onClick={closeMobile}
                          className="block px-4 py-2 rounded-lg font-[Inter] text-xs font-semibold text-[#0d4361] hover:bg-[#0d6b78]/10"
                        >
                          All Products
                        </Link>
                        {categories.map((c) => (
                          <div key={c.slug}>
                            <button
                              onClick={() => setOpenCat(openCat === c.slug ? null : c.slug)}
                              className="w-full flex items-center justify-between px-4 py-2 rounded-lg font-[Inter] text-xs text-slate-700 hover:bg-[#0d6b78]/10"
                              aria-expanded={openCat === c.slug}
                            >
                              <span>{c.name}</span>
                              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openCat === c.slug ? "rotate-180" : ""}`} />
                            </button>
                            {openCat === c.slug && (
                              <div className="pl-3 py-1 border-l-2 border-[#0d6b78]/20 ml-4">
                                <button
                                  onClick={() => { closeMobile(); navigate({ to: "/products/$category", params: { category: c.slug } }); }}
                                  className="block w-full text-left px-3 py-1.5 font-[Inter] text-[11px] font-semibold text-[#0d6b78] hover:underline"
                                >
                                  View category →
                                </button>
                                {c.models.map((md) => (
                                  <Link
                                    key={md.modelNo}
                                    to="/products/$category/$model"
                                    params={{ category: c.slug, model: md.slug }}
                                    onClick={closeMobile}
                                    className="block px-3 py-1.5 rounded font-[Inter] text-[12px] text-slate-700 hover:bg-[#0d6b78]/10"
                                  >
                                    {md.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={closeMobile}
                  activeOptions={{ exact: n.to === "/" }}
                  className="px-4 py-3 rounded-lg font-[Inter] text-sm font-medium text-slate-700 hover:bg-[#0d6b78]/10"
                  activeProps={{ className: "text-[#0d4361] bg-[#0d6b78]/15" }}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
