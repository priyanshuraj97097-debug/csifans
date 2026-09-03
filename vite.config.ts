// @lovable.dev/vite-tanstack-config already includes the standard
// TanStack Start, React, Tailwind, Nitro, path aliases, etc.

import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/tanstack/vite";

const isLovableSandbox =
  process.env.LOVABLE_SANDBOX === "1" ||
  !!process.env.DEV_SERVER__PROJECT_PATH;

const isCloudflarePages = process.env.CF_PAGES === "1";

export default defineConfig({
  // Keep Lovable's normal development environment working.
  ...(isLovableSandbox
    ? {}
    : {
        // Production/CI build: do NOT generate a Cloudflare Worker.
        // We want static files for Cloudflare Pages.
        nitro: false,
      }),

  tanstackStart: {
    // Generate the site as static HTML instead of requiring
    // a server Worker for the production deployment.
    ...(isLovableSandbox
      ? {
          server: { entry: "server" },
        }
      : {
          prerender: {
            enabled: true,
            crawlLinks: true,
          },
        }),
  },

  vite: {
    plugins: [mcpPlugin()],
  },
});
