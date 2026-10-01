import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, MapPin, ExternalLink, Mail } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | CSI Fans" },
      {
        name: "description",
        content:
          "Contact CSI Fans at csifans.official@gmail.com, connect on LinkedIn, or find our registered address.",
      },
      { property: "og:title", content: "Contact CSI Fans" },
      {
        property: "og:description",
        content:
          "Email csifans.official@gmail.com, connect with CSI Fans on LinkedIn, or find our registered address.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/contact` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader as="h1"
          eyebrow="Get in Touch"
          title="Contact CSI Fans"
          subtitle="Email us, connect professionally, or visit our registered address."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0d6b78]/10 text-[#0d4361]">
                <Mail className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h3 className="font-[Poppins] text-lg font-semibold text-[#0a2f44]">Business Email</h3>
                <a href="mailto:csifans.official@gmail.com" className="mt-2 block break-all font-[Inter] text-sm text-[#0d6b78] hover:underline focus-visible:underline">
                  csifans.official@gmail.com
                </a>
              </div>
            </div>
          </div>
          <a
            href="https://www.linkedin.com/in/csi-super-toophan-ab0791421?trk=contact-info"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0d6b78]/10 text-[#0d4361]">
                <Linkedin className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h3 className="font-[Poppins] text-lg font-semibold text-[#0a2f44]">
                  LinkedIn
                </h3>
                <p className="mt-1 font-[Inter] text-sm text-slate-600">
                  Connect with us on LinkedIn for updates and professional inquiries.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-[Inter] text-sm font-semibold text-[#0d6b78]">
                  Visit Profile
                  <ExternalLink className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </a>

          <div className="group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0d6b78]/10 text-[#0d4361]">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-[Poppins] text-lg font-semibold text-[#0a2f44]">
                  Registered Address
                </h3>
                <address className="mt-2 not-italic font-[Inter] text-sm text-slate-600 leading-relaxed">
                  CSI Super Toophan
                  <br />
                  ISO 9001:2015 Certified Company
                  <br />
                  India
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
