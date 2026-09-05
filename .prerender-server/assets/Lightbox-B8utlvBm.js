import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
//#region src/components/site/Lightbox.tsx
function Lightbox({ images, initial = 0, onClose }) {
	const [i, setI] = useState(initial);
	useEffect(() => {
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowRight") setI((p) => (p + 1) % images.length);
			if (e.key === "ArrowLeft") setI((p) => (p - 1 + images.length) % images.length);
		};
		window.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, [images.length, onClose]);
	return /* @__PURE__ */ jsxs("div", {
		className: "fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4",
		onClick: onClose,
		children: [
			/* @__PURE__ */ jsx("button", {
				onClick: (e) => {
					e.stopPropagation();
					onClose();
				},
				"aria-label": "Close gallery",
				className: "absolute top-4 right-4 h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white",
				children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
			}),
			images.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("button", {
				onClick: (e) => {
					e.stopPropagation();
					setI((p) => (p - 1 + images.length) % images.length);
				},
				"aria-label": "Previous image",
				className: "absolute left-4 h-12 w-12 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white",
				children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-6 w-6" })
			}), /* @__PURE__ */ jsx("button", {
				onClick: (e) => {
					e.stopPropagation();
					setI((p) => (p + 1) % images.length);
				},
				"aria-label": "Next image",
				className: "absolute right-4 h-12 w-12 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white",
				children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-6 w-6" })
			})] }),
			/* @__PURE__ */ jsx("img", {
				src: images[i],
				alt: `Fan image ${i + 1} of ${images.length}`,
				className: "max-h-[88vh] max-w-[92vw] object-contain rounded-2xl shadow-2xl",
				onClick: (e) => e.stopPropagation()
			}),
			images.length > 1 && /* @__PURE__ */ jsxs("span", {
				className: "absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 text-white px-3 py-1 text-xs font-[Inter]",
				children: [
					i + 1,
					" / ",
					images.length
				]
			})
		]
	});
}
//#endregion
export { Lightbox as t };
