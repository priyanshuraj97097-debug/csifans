import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/dealers")({
  head: () => ({
    meta: [
      { title: "Dealers & Distributors | CSI Fans" },
      { name: "description", content: "Become a CSI Fans dealer or distributor — join India's fastest-growing premium fan brand." },
      { property: "og:title", content: "CSI Fans Dealer Network" },
      { property: "og:description", content: "Authorised dealers and distributorship enquiries." },
    ],
    links: [{ rel: "canonical", href: "/dealers" }],
  }),
  component: Dealers,
});

const dealers = [
  { city: "Patna", name: "Toophan Electricals", addr: "Boring Road, Patna - 800001", phone: "+91 98700 11111" },
  { city: "Nalanda", name: "CSI Cooling Hub", addr: "Bihar Sharif, Nalanda - 803101", phone: "+91 98700 22222" },
  { city: "Gaya", name: "Super Fan House", addr: "GB Road, Gaya - 823001", phone: "+91 98700 33333" },
  { city: "Muzaffarpur", name: "Toophan Sales Centre", addr: "Motijheel, Muzaffarpur - 842001", phone: "+91 98700 44444" },
];

function Dealers() {
  const [sent, setSent] = useState(false);
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Network" title="Dealers & Distributors" subtitle="Find an authorised CSI Fans dealer or apply to join our growing network." />

        <div className="mt-12 grid lg:grid-cols-2 gap-10">
          <div>
            <h3 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">Authorised Dealers</h3>
            <div className="mt-5 space-y-4">
              {dealers.map((d) => (
                <div key={d.name} className="rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 grid place-items-center rounded-xl bg-[#0d6b78]/10 text-[#0d4361]"><Building2 className="h-5 w-5" /></div>
                    <div className="min-w-0">
                      <p className="font-[Inter] text-xs text-[#0d6b78] font-semibold">{d.city}</p>
                      <h4 className="font-[Poppins] font-bold text-[#0a2f44]">{d.name}</h4>
                      <p className="mt-1 font-[Inter] text-sm text-slate-600 flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 shrink-0" /> {d.addr}</p>
                      <p className="font-[Inter] text-sm text-slate-600 flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {d.phone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">Distributorship Enquiry</h3>
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="mt-5 rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-7 shadow-md space-y-4"
            >
              <Field label="Full Name" name="name" />
              <Field label="Company Name" name="company" />
              <Field label="City / District" name="city" />
              <Field label="Phone Number" name="phone" type="tel" />
              <Field label="Email Address" name="email" type="email" />
              <div>
                <label className="font-[Inter] text-sm font-medium text-[#0a2f44]">Message</label>
                <textarea rows={4} className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 font-[Inter] text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b78]" />
              </div>
              <button type="submit" className="w-full rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] py-3 font-[Poppins] font-semibold text-white shadow-lg shadow-[#0d6b78]/30 hover:scale-[1.02] transition-transform">
                Submit Enquiry
              </button>
              {sent && <p className="text-sm text-green-700 font-[Inter] text-center">Thanks! We'll get back to you within 24 hours.</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="font-[Inter] text-sm font-medium text-[#0a2f44]">{label}</label>
      <input name={name} type={type} className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 font-[Inter] text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b78]" />
    </div>
  );
}
