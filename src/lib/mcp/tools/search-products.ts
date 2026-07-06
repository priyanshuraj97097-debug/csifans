import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { categories } from "@/lib/products";

export default defineTool({
  name: "search_products",
  title: "Search products",
  description: "Search CSI fan products by keyword across name, model number, features, and specifications.",
  inputSchema: {
    query: z.string().min(1).describe("Keyword(s) to match."),
    limit: z.number().int().min(1).max(50).default(10),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, limit }) => {
    const q = query.toLowerCase();
    const matches: unknown[] = [];
    for (const c of categories) {
      for (const mo of c.models) {
        const hay = [
          mo.name,
          mo.modelNo,
          mo.fanType,
          mo.sweep,
          mo.power,
          ...(mo.features ?? []),
          ...(mo.highlights ?? []),
          ...(mo.specifications ?? []).map((s) => `${s.label} ${s.value ?? ""}`),
          c.name,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (hay.includes(q)) {
          matches.push({
            category: c.slug,
            modelNo: mo.modelNo,
            slug: mo.slug,
            name: mo.name,
            price: mo.price,
            sweep: mo.sweep,
          });
        }
        if (matches.length >= limit) break;
      }
      if (matches.length >= limit) break;
    }
    return {
      content: [{ type: "text", text: JSON.stringify(matches, null, 2) }],
      structuredContent: { results: matches },
    };
  },
});
