import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { categories } from "@/lib/products";

export default defineTool({
  name: "list_categories",
  title: "List fan categories",
  description: "List all CSI fan product categories with their slug, name, tagline, and number of models.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const data = categories.map((c) => ({
      slug: c.slug,
      name: c.name,
      tagline: c.tagline,
      description: c.description,
      modelCount: c.models.length,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { categories: data },
    };
  },
});

// Silence unused import for tree-shaken sub-schema
void z;
