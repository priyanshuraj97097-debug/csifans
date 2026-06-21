import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/csi-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0a2f44] via-[#0d4361] to-[#0d6b78] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="CSI Fans" className="h-12 w-12 rounded-full ring-2 ring-white/30" />
            <div>
              <div className="font-[Poppins] text-xl font-extrabold">CSI Fans</div>
              <div className="font-[Inter] text-xs text-white/70">Innovation in Every Rotation</div>
            </div>
          </div>
          <p className="mt-4 font-[Inter] text-sm text-white/75 leading-relaxed">
            A product of an ISO 9001:2015 Certified Company delivering premium fans engineered for
            performance, silence and long life.
          </p>
        </div>

        <div>
          <h4 className="font-[Poppins] font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 font-[Inter] text-sm text-white/75">
            {[
              ["/about", "About Us"],
              ["/products", "Products"],
              ["/new-launches", "New Launches"],
              ["/dealers", "Dealers & Distributors"],
              ["/downloads", "Downloads"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-[Poppins] font-semibold text-white mb-4">Products</h4>
          <ul className="space-y-2 font-[Inter] text-sm text-white/75">
            {[
              ["/products/ceiling-fans", "Ceiling Fans"],
              ["/products/high-speed-fans", "High-Speed Fans"],
              ["/products/exhaust-fans", "Exhaust Fans"],
              ["/products/decorative-fans", "Decorative Fans"],
              ["/products/premium-series", "Premium Series"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-[Poppins] font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-3 font-[Inter] text-sm text-white/85">
            <li className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-0.5 shrink-0" /> +91 98765 43210
            </li>
            <li className="flex items-start gap-2">
              <Mail className="h-4 w-4 mt-0.5 shrink-0" /> info@csifans.in
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" /> Nalanda, Bihar, India
            </li>
          </ul>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 font-[Inter] text-xs text-white/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} CSI Fans. All rights reserved.</p>
          <p>A Product of ISO 9001:2015 Certified Company</p>
        </div>
      </div>
    </footer>
  );
}
