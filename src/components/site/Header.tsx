import { Link } from "@tanstack/react-router";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => {
    setOpen(false);
    setProductsOpen(false);
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
            <span className="font-[Inter] hidden sm:inline text-[10px] font-medium text-[#0d6b78] -mt-0.5">
              ISO 9001:2015 Certified
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => {
            if (n.to === "/products") {
              return (
                <div key={n.to} className="relative group">
                  <div className="flex items-center rounded-lg transition-colors group-hover:bg-[#0d6b78]/10 group-focus-within:bg-[#0d6b78]/10">
                    <Link
                      to="/products"
                      className="pl-3 pr-1 py-2 font-[Inter] text-sm font-medium text-slate-700 hover:text-[#0d4361] transition-colors"
                      activeProps={{ className: "pl-3 pr-1 py-2 font-[Inter] text-sm font-medium text-[#0d4361]" }}
                    >
                      Products
                    </Link>
                    <ChevronDown className="mr-3 h-4 w-4 text-slate-500 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                  </div>

                  <div className="pointer-events-none invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
                    <div className="w-[22rem] rounded-2xl bg-white/95 p-3 shadow-2xl ring-1 ring-[#0d6b78]/15 backdrop-blur-xl">
                      <Link
                        to="/products"
                        className="block rounded-xl px-3 py-2.5 font-[Inter] text-sm font-semibold text-[#0d4361] hover:bg-[#0d6b78]/8"
                      >
                        All Products
                      </Link>
                      <div className="mt-2 grid gap-1">
                        {categories.map((category) => (
                          <Link
                            key={category.slug}
                            to="/products/$category"
                            params={{ category: category.slug }}
                            className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-[#0d6b78]/8 transition-colors"
                          >
                            <div>
                              <p className="font-[Inter] text-sm font-semibold text-[#0a2f44]">
                                {category.name}
                              </p>
                              <p className="font-[Inter] text-[11px] text-slate-500">
                                {category.models.length} {category.models.length === 1 ? "product" : "products"}
                              </p>
                            </div>
                            <span className="font-[Inter] text-xs font-semibold text-[#0d6b78]">
                              View
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="px-3 py-2 rounded-lg font-[Inter] text-sm font-medium text-slate-700 hover:text-[#0d4361] hover:bg-[#0d6b78]/10 transition-colors"
                activeProps={{ className: "text-[#0d4361] bg-[#0d6b78]/15" }}
              >
                {n.label}
              </Link>
            );
          })}
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
                        {categories.map((category) => (
                          <Link
                            key={category.slug}
                            to="/products/$category"
                            params={{ category: category.slug }}
                            onClick={closeMobile}
                            className="flex items-center justify-between px-4 py-2 rounded-lg font-[Inter] text-xs text-slate-700 hover:bg-[#0d6b78]/10"
                          >
                            <span>{category.name}</span>
                            <span className="text-[10px] font-semibold text-[#0d6b78]">
                              {category.models.length}
                            </span>
                          </Link>
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
