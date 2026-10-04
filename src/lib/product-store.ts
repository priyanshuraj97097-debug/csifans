import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { categories as staticCategories, type Category, type Model } from "@/lib/products";

// Bundled product images, referenced from the database as "asset:<file name>".
const assetUrls = import.meta.glob("../assets/*.{png,jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const assetByName: Record<string, string> = {};
const nameByUrl: Record<string, string> = {};
for (const [path, url] of Object.entries(assetUrls)) {
  const name = path.split("/").pop()!;
  assetByName[name] = url;
  nameByUrl[url] = name;
}

export const resolveImage = (ref?: string) => {
  if (!ref) return "";
  if (ref.startsWith("asset:")) return assetByName[ref.slice(6)] ?? "";
  return ref;
};

export const toImageRef = (url: string) => (nameByUrl[url] ? `asset:${nameByUrl[url]}` : url);

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export type ProductRow = {
  id: string;
  category_slug: string;
  slug: string;
  data: Partial<Model> & Record<string, unknown>;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export const rowToModel = (row: ProductRow): Model => {
  const d = row.data ?? {};
  const image = resolveImage(d.image as string);
  const images = ((d.images as string[] | undefined) ?? []).map(resolveImage).filter(Boolean);
  return {
    ...(d as Model),
    modelNo: (d.modelNo as string) || row.slug.toUpperCase(),
    name: (d.name as string) || row.slug,
    price: Number(d.price ?? 0),
    slug: row.slug,
    image,
    images: images.length ? images : image ? [image] : [],
    highlights: (d.highlights as string[]) ?? [],
  };
};

/** Static catalogue converted to database rows (used once to import existing products). */
export const staticCatalogRows = () => {
  let order = 0;
  return staticCategories.flatMap((c) =>
    c.models.map((m) => {
      const { slug, ...rest } = m;
      return {
        category_slug: c.slug,
        slug,
        is_published: true,
        sort_order: order++,
        data: {
          ...rest,
          image: toImageRef(m.image),
          images: (m.images ?? [m.image]).map(toImageRef),
        },
      };
    })
  );
};

const buildCatalog = (rows: ProductRow[]): Category[] =>
  staticCategories.map((c) => ({
    ...c,
    models: rows
      .filter((r) => r.category_slug === c.slug)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(rowToModel),
  }));

let cache: Category[] | null = null;
let inflight: Promise<Category[] | null> | null = null;
const listeners = new Set<(c: Category[]) => void>();

export const fetchLiveCatalog = (): Promise<Category[] | null> => {
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_published", true)
        .order("sort_order");
      if (error || !data || data.length === 0) return null; // keep built-in catalogue
      cache = buildCatalog(data as unknown as ProductRow[]);
      listeners.forEach((l) => l(cache!));
      return cache;
    } catch {
      return null;
    } finally {
      setTimeout(() => (inflight = null), 30_000);
    }
  })();
  return inflight;
};

/** Live product catalogue: renders the built-in list first, then swaps in published database products. */
export function useCatalog(): { categories: Category[]; live: boolean } {
  const [cats, setCats] = useState<Category[] | null>(null);
  useEffect(() => {
    if (cache) setCats(cache);
    const l = (c: Category[]) => setCats(c);
    listeners.add(l);
    void fetchLiveCatalog();
    return () => {
      listeners.delete(l);
    };
  }, []);
  return { categories: cats ?? staticCategories, live: !!cats };
}

export const findLiveCategory = (cats: Category[], slug: string) => cats.find((c) => c.slug === slug);

export const searchCatalog = (cats: Category[], query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return cats
    .flatMap((c) => c.models.map((mm) => ({ ...mm, categorySlug: c.slug, categoryName: c.name })))
    .filter((mm) =>
      [
        mm.name, mm.modelNo, mm.categoryName, mm.fanType ?? "", mm.description ?? "",
        mm.sweep ?? "", mm.power ?? "", mm.rpm ?? "", mm.motor ?? "",
        ...(mm.tags ?? []), ...(mm.highlights ?? []), ...(mm.features ?? []),
        ...(mm.specifications ?? []).map((s) => `${s.label} ${s.value ?? ""}`),
      ].join(" ").toLowerCase().includes(q)
    );
};
