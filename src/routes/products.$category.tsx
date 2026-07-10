import { createFileRoute, Link, notFound, useRouter, Outlet } from "@tanstack/react-router";
import { findCategory } from "@/lib/products";

export const Route = createFileRoute("/products/$category")({
  loader: ({ params }) => {
    const cat = findCategory(params.category);
    if (!cat) throw notFound();
    return cat;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Products"} | CSI Fans` },
      { name: "description", content: loaderData?.description ?? "CSI Fans product range." },
      { property: "og:title", content: `${loaderData?.name ?? "Products"} — CSI Fans` },
      { property: "og:description", content: loaderData?.tagline ?? "Premium fans." },
      { property: "og:image", content: loaderData?.image ?? "" },
    ],
    links: [{ rel: "canonical", href: `/products/${loaderData?.slug ?? ""}` }],
  }),
  notFoundComponent: () => (
    <div className="py-24 text-center px-4">
      <h1 className="font-[Poppins] text-3xl font-bold text-[#0a2f44]">Category not found</h1>
      <Link to="/products" search={{}} className="mt-6 inline-block text-[#0d6b78] underline">Back to products</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="py-24 text-center px-4">
        <h1 className="font-[Poppins] text-2xl font-bold text-[#0a2f44]">Something went wrong</h1>
        <p className="mt-2 text-slate-600 text-sm">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-[#0d4361] text-white px-5 py-2 text-sm"
        >
          Try again
        </button>
      </div>
    );
  },
  component: () => <Outlet />,
});
