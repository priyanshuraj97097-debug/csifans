## Scope

Add the requested features on top of the existing CSI Fans site without changing the current theme, layout, colors, sections, or design language. Existing components, routes, and images stay; new behavior is layered on.

## What I will build

### 1. Live search (Header)
- Convert the current header search input into a live combobox.
- As the user types, filter `products.ts` by name, model, category, sweep, wattage, voltage, RPM, tags.
- Show a dropdown of up to 8 matches (image, name, category, price) with "View all results" → `/products?q=...` (existing search page).
- Mobile search uses the same dropdown.

### 2. Hamburger menu — expandable Products
- Keep current mobile menu styling.
- Add a "Products" item that expands to the 6 categories. Each category expands again to list its models (links to the product detail page).
- Pure additive change in `Header.tsx`.

### 3. Product detail page
- New route `/products/$category/$model` showing:
  - Image gallery (3–5 images per product) with thumbnail strip + lightbox.
  - Description, features, full specs table (Sweep / Voltage / Frequency / Power / RPM / Air Delivery / Blade Material / Motor / Warranty).
  - Product tags (New Arrival / Best Seller / Energy Efficient / Premium).
  - WhatsApp inquiry button (prefilled message) + Contact button.
  - "Similar Products" grid (same category, excluding current).
- Existing category page cards link to this new page (keep the inline "View details" expander too).

### 4. Catalog expansion to 20+ products
- Extend `src/lib/products.ts` so the total across categories is ≥ 20, covering Ceiling, High-Speed, Wall, Cabin, Exhaust, Decorative, Premium.
- Every product gets the full 9-field spec block, tags, description, features, and a 3–5 image array (reusing existing renders + a handful of new generated images).

### 5. More images + CSI logo on hub
- Generate ~8 additional fan renders (ceiling, high-speed, wall, cabin, exhaust, decorative variants).
- All new renders are prompted with "circular center hub featuring the embossed CSI logo image — no text 'CSI' typography on blades or body".
- Existing images stay. No re-generation of current ones unless they show stray "CSI" text — in that case I'll edit just those via image-edit to replace the text with the logo on the hub.

### 6. Gallery page
- New route `/gallery` aggregating every product image (≥ 20) in a responsive masonry grid.
- Click → fullscreen lightbox with prev/next.
- Add "Gallery" link to header + footer.

### 7. Filters on Products page
- On `/products` (and category pages) add a filter bar (sticky on desktop, collapsible on mobile):
  - Category, price range, sweep size, power consumption, sort (Latest / Popular / Price ↑ / Price ↓).
- Filters are URL-synced via existing zod search-params setup.

### 8. Downloads section
- Extend `/downloads` with four cards: Product Catalogue, Warranty Card, Installation Guide, Company Brochure.
- Generate lightweight placeholder PDFs (reportlab) uploaded as assets so download links work.

### 9. Product tags
- Add `tags?: string[]` to the Model type and render colored chips on cards and detail page.

## What I will NOT touch
- Theme, colors, fonts, hero, About, Dealers, Contact, New Launches, Footer styling.
- Existing images (kept as-is unless they contain stray "CSI" text).
- Routing for current pages.

## Technical notes
- New files: `src/routes/products.$category.$model.tsx`, `src/routes/gallery.tsx`, `src/components/site/SearchCombobox.tsx`, `src/components/site/Lightbox.tsx`, `src/components/site/ProductFilters.tsx`.
- Edited: `src/lib/products.ts` (catalog + tags + images array + specs), `src/components/site/Header.tsx` (live search + expandable mobile menu + Gallery link), `src/components/site/Footer.tsx` (Gallery link), `src/routes/products.tsx` (filters), `src/routes/products.$category.tsx` (link card to detail page), `src/routes/downloads.tsx` (4 docs).
- New assets: ~8 generated fan images + 4 placeholder PDFs uploaded via `lovable-assets`.

## Out of scope (confirm if you want these too)
- Backend/database for products (everything stays in `products.ts`).
- Real PDFs with full product copy (placeholders only — replace later by uploading real PDFs).
- "Best Seller / Popular" analytics — tags are curated manually in `products.ts`.
