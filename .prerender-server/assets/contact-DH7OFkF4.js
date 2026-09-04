import { t as SectionHeader } from "./SectionHeader-DnE8YoMs.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { ExternalLink, Linkedin, MapPin } from "lucide-react";
//#region src/routes/contact.tsx?tsr-split=component
function Contact() {
	return /* @__PURE__ */ jsx("div", {
		className: "py-16 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ jsx(SectionHeader, {
				as: "h1",
				eyebrow: "Get in Touch",
				title: "Contact CSI Fans",
				subtitle: "Connect with us professionally or visit our registered address."
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: [/* @__PURE__ */ jsx("a", {
					href: "https://www.linkedin.com/in/csi-super-toophan-ab0791421?trk=contact-info",
					target: "_blank",
					rel: "noopener noreferrer",
					className: "group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all p-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0d6b78]/10 text-[#0d4361]",
							children: /* @__PURE__ */ jsx(Linkedin, { className: "h-6 w-6" })
						}), /* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "font-[Poppins] text-lg font-semibold text-[#0a2f44]",
									children: "LinkedIn"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 font-[Inter] text-sm text-slate-600",
									children: "Connect with us on LinkedIn for updates and professional inquiries."
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "mt-4 inline-flex items-center gap-1 font-[Inter] text-sm font-semibold text-[#0d6b78]",
									children: ["Visit Profile", /* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5" })]
								})
							]
						})]
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "group rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-md p-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0d6b78]/10 text-[#0d4361]",
							children: /* @__PURE__ */ jsx(MapPin, { className: "h-6 w-6" })
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "font-[Poppins] text-lg font-semibold text-[#0a2f44]",
							children: "Registered Address"
						}), /* @__PURE__ */ jsxs("address", {
							className: "mt-2 not-italic font-[Inter] text-sm text-slate-600 leading-relaxed",
							children: [
								"CSI Super Toophan",
								/* @__PURE__ */ jsx("br", {}),
								"ISO 9001:2015 Certified Company",
								/* @__PURE__ */ jsx("br", {}),
								"India"
							]
						})] })]
					})
				})]
			})]
		})
	});
}
//#endregion
export { Contact as component };
