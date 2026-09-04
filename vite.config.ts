import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/tanstack/vite";

const isLovableSandbox =
  process.env.LOVABLE_SANDBOX === "1" ||
  !!process.env.DEV_SERVER__PROJECT_PATH;

const isCloudflarePages = process.env.CF_PAGES === "1";

const useStaticBuild = isCloudflarePages || !isLovableSandbox;

export default defineConfig({
  ...(useStaticBuild
    ? {
        nitro: false,
      }
    : {}),

  tanstackStart: {
    ...(useStaticBuild
      ? {
          prerender: {
            enabled: true,
            crawlLinks: true,
          },
        }
      : {
          server: {
            entry: "server",
          },
        }),
  },

  vite: {
    plugins: [mcpPlugin()],
    ...(useStaticBuild
      ? {
          build: {
            outDir: "dist",
          },
          environments: {
            // Static Cloudflare Pages build: emit the client site directly
            // into dist/ (instead of dist/client) and keep the temporary
            // prerender server bundle outside dist/ so no server code is
            // deployed.
            client: { build: { outDir: "dist" } },
            ssr: { build: { outDir: ".prerender-server" } },
          },
        }
      : {}),
  },
});
  
