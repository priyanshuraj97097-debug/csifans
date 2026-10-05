<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Products live in the Cloud `products` table (jsonb `data` mirrors the `Model` type); public pages render the bundled catalogue first, then swap in published rows via `useCatalog()` — keeps static Cloudflare Pages prerender working without a server.
- Admin authorization is enforced in the database (`is_csi_admin()` RLS on products and product-images storage), never only in the UI; the `/admin` page is client-only (`ssr: false`).
- Uploaded product images go to the private `product-images` bucket and are stored as long-lived signed URLs (public buckets are blocked in this workspace); bundled images are stored as `asset:<file>` refs.
