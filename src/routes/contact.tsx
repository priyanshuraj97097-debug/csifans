import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact CSI Fans | Get in Touch" },
      { name: "description", content: "Contact CSI Fans — phone, WhatsApp, email and head office in Nalanda, Bihar." },
      { property: "og:title", content: "Contact CSI Fans" },
      { property: "og:description", content: "Get in touch with our team — Nalanda, Bihar." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Contact" title="Let's Talk" subtitle="We're here to help — reach out via phone, WhatsApp or email." />

        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[
              { icon: Phone, t: "Phone", v: "+91 98765 43210", href: "tel:+919876543210" },
              { icon: MessageCircle, t: "WhatsApp", v: "+91 98765 43210", href: "https://wa.me/919876543210" },
              { icon: Mail, t: "Email", v: "info@csifans.in", href: "mailto:info@csifans.in" },
              { icon: MapPin, t: "Address", v: "CSI Fans, Nalanda, Bihar 803101, India" },
            ].map(({ icon: Icon, t, v, href }) => (
              <a key={t} href={href ?? "#"} className="flex items-start gap-4 rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-11 w-11 grid place-items-center rounded-xl bg-gradient-to-br from-[#0d4361] to-[#0d6b78] text-white"><Icon className="h-5 w-5" /></div>
                <div>
                  <p className="font-[Inter] text-xs text-[#0d6b78] font-semibold uppercase tracking-wide">{t}</p>
                  <p className="font-[Poppins] text-[#0a2f44] font-semibold">{v}</p>
                </div>
              </a>
            ))}

            <div className="rounded-2xl overflow-hidden ring-1 ring-white/60 shadow-md aspect-[16/10]">
              <iframe
                title="CSI Fans location — Nalanda, Bihar"
                src="https://www.google.com/maps?q=Nalanda,+Bihar,+India&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 p-7 shadow-md space-y-4 h-fit"
          >
            <h3 className="font-[Poppins] text-xl font-bold text-[#0a2f44]">Send us a message</h3>
            <Field label="Your Name" name="name" />
            <Field label="Phone" name="phone" type="tel" />
            <Field label="Email" name="email" type="email" />
            <div>
              <label className="font-[Inter] text-sm font-medium text-[#0a2f44]">Message</label>
              <textarea rows={5} className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 font-[Inter] text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b78]" />
            </div>
            <button type="submit" className="w-full rounded-full bg-gradient-to-r from-[#0d4361] to-[#0d6b78] py-3 font-[Poppins] font-semibold text-white shadow-lg shadow-[#0d6b78]/30 hover:scale-[1.02] transition-transform">
              Send Message
            </button>
            {sent && <p className="text-sm text-green-700 font-[Inter] text-center">Thanks — we'll reply within 24 hours.</p>}
          </form>
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
