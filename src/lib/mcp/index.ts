import { defineMcp } from "@lovable.dev/mcp-js";
import listCategoriesTool from "./tools/list-categories";
import listProductsTool from "./tools/list-products";
import getProductTool from "./tools/get-product";
import searchProductsTool from "./tools/search-products";

export default defineMcp({
  name: "csi-fans-mcp",
  title: "CSI Fans MCP",
  version: "0.1.0",
  instructions:
    "Tools for browsing the CSI Fans product catalog: list categories, list and search products, and fetch full product details.",
  tools: [listCategoriesTool, listProductsTool, getProductTool, searchProductsTool],
});
