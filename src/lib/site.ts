/**
 * Canonical public origin of the site.
 *
 * Override at build time with the `VITE_SITE_URL` environment variable
 * (for example `https://csifans.pages.dev` or `https://www.csifans.in`).
 */
const RAW_SITE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) ||
  "https://csifans.pages.dev";

export const SITE_URL = String(RAW_SITE_URL).replace(/\/+$/, "");

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
