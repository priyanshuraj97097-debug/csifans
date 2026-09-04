import { useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/products.$category.$model.tsx?tsr-split=errorComponent
var SplitErrorComponent = ({ error, reset }) => {
	const router = useRouter();
	return /* @__PURE__ */ jsxs("div", {
		className: "py-24 text-center px-4",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "font-[Poppins] text-2xl font-bold text-[#0a2f44]",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 text-slate-600 text-sm",
				children: error.message
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => {
					router.invalidate();
					reset();
				},
				className: "mt-6 rounded-full bg-[#0d4361] text-white px-5 py-2 text-sm",
				children: "Try again"
			})
		]
	});
};
//#endregion
export { SplitErrorComponent as errorComponent };
