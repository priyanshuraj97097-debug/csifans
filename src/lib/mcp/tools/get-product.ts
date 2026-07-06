import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { categories } from "@/lib/products";

export default defineTool({
  name: "get_product",
  title: "Get product details",
  description: "Return full details and specifications for a single CSI fan product by model number or slug.",
  inputSchema: {
    identifier: z.string().min(1).describe("The product's modelNo or slug."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ identifier }) => {
    const key = identifier.toLowerCase();
    for (const c of categories) {
      const found = c.models.find(
        (mo) => mo.modelNo.toLowerCase() === key || mo.slug.toLowerCase() === key,
      );
      if (found) {
        const { image: _img, images: _imgs, ...rest } = found;
        void _img;
        void _imgs;
        return {
          content: [{ type: "text", text: JSON.stringify({ category: c.slug, ...rest }, null, 2) }],
          structuredContent: { product: { category: c.slug, ...rest } },
        };
      }
    }
    return {
      content: [{ type: "text", text: `No product found for '${identifier}'.` }],
      isError: true,
    };
  },
});
