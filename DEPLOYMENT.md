# Deploying CSI Super Toophan to Cloudflare

This app is **server-rendered** (TanStack Start SSR + `/api/chat`), so it deploys as a
**Cloudflare Pages project with Pages Functions** (`dist/_worker.js`), using the nitro
`cloudflare-pages` preset. The live URL stays `https://csifans.pages.dev`.

## Cloudflare settings (Workers Builds / Git integration)

| Setting                  | Value                                            |
| ------------------------ | ------------------------------------------------ |
| Framework preset         | None                                             |
| Install command          | `bun install`                                    |
| Build command            | `bun run build`                                  |
| Deploy command           | (leave empty — Pages deploys the output directory) |
| Build output directory   | `dist`                                           |
| Pages Functions entry    | `dist/_worker.js` (generated automatically)      |
| Compatibility flags      | `nodejs_compat` (already in the generated config)|
| Root directory           | `/`                                              |

`bun run build` writes:

- `dist/` — static assets (JS/CSS, images, `/videos/*.mp4`, favicon)
- `dist/_worker.js` — the Pages Functions bundle that server-renders every route

## Environment variables

Add these in **Workers & Pages → your project → Settings → Variables**.

Secrets (encrypted, server-side only — never exposed to the browser):

| Name             | Value                              |
| ---------------- | ---------------------------------- |
| `GEMINI_API_KEY` | Your Google Gemini API key         |

Optional:

| Name                       | Value                                             |
| -------------------------- | ------------------------------------------------- |
| `GEMINI_MODEL`             | Defaults to `gemini-2.5-flash`                     |

Build-time plain variable (public, used for canonical URLs / OG tags / sitemap / robots):

| Name            | Value                                            |
| --------------- | ------------------------------------------------ |
| `VITE_SITE_URL` | e.g. `https://csifans.pages.dev` or your domain  |

`VITE_SITE_URL` must be set on the **build** environment (it is baked in at build time);
`GEMINI_API_KEY` must be set as a **runtime secret**.

## GitHub Actions (optional)

`.github/workflows/deploy.yml` deploys on push to `main` and needs the repo secrets
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, plus the repo variable `VITE_SITE_URL`.
Set `GEMINI_API_KEY` in the Pages project settings (Settings -> Variables and Secrets).

## Notes

- SPA refresh 404s do not occur: every route is handled by the Pages Functions SSR handler.
- The chatbot calls Google's Gemini API only from the server route `/api/chat`; the key is
  read from `process.env` and is never bundled into client code.
- Voice input uses the browser Web Speech API and requires HTTPS (Cloudflare provides it).
- Language selection defaults to English and is stored per visitor in `localStorage`.
