import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { categories } from "@/lib/products";

const BASE_URL = "https://csifans.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "yearly", priority: "0.6" },
          { path: "/products", changefreq: "weekly", priority: "0.9" },
          { path: "/new-launches", changefreq: "weekly", priority: "0.8" },
          { path: "/gallery", changefreq: "monthly", priority: "0.6" },
          { path: "/downloads", changefreq: "monthly", priority: "0.5" },
          { path: "/contact", changefreq: "yearly", priority: "0.5" },
          { path: "/services", changefreq: "monthly", priority: "0.7" },
          { path: "/services/manufacturing", changefreq: "monthly", priority: "0.6" },
          { path: "/services/installation", changefreq: "monthly", priority: "0.6" },
          { path: "/services/maintenance", changefreq: "monthly", priority: "0.6" },
          { path: "/blog", changefreq: "monthly", priority: "0.7" },
          { path: "/blog/choose-industrial-fan-size", changefreq: "yearly", priority: "0.6" },
          { path: "/blog/bldc-vs-conventional-fans", changefreq: "yearly", priority: "0.6" },
          { path: "/blog/fan-maintenance-checklist", changefreq: "yearly", priority: "0.6" },
        ];

        for (const c of categories) {
          entries.push({ path: `/products/${c.slug}`, changefreq: "weekly", priority: "0.8" });
          for (const model of c.models) {
            entries.push({
              path: `/products/${c.slug}/${model.slug}`,
              changefreq: "monthly",
              priority: "0.7",
            });
          }
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
