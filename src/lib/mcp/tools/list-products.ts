import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { categories } from "@/lib/products";

export default defineTool({
  name: "list_products",
  title: "List fan products",
  description: "List CSI fan products, optionally filtered by category slug.",
  inputSchema: {
    category: z
      .string()
      .optional()
      .describe("Optional category slug (e.g. 'ceiling-fans'). Omit to list all products."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const cats = category ? categories.filter((c) => c.slug === category) : categories;
    const items = cats.flatMap((c) =>
      c.models.map((mo) => ({
        category: c.slug,
        categoryName: c.name,
        modelNo: mo.modelNo,
        slug: mo.slug,
        name: mo.name,
        price: mo.price,
        sweep: mo.sweep,
        power: mo.power,
        warranty: mo.warranty,
        tags: mo.tags ?? [],
      })),
    );
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { products: items },
    };
  },
});
