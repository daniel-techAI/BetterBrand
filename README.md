# R/CREATION Shopify Theme

Custom Shopify Online Store 2.0 theme for a premium apparel brand.

Working brand: `R/CREATION`
Working tagline: `You wear what you are.`

## Direction

- Luxury streetwear with a product-led tech-site feel.
- Palette: black, white, warm beige, champagne gold, charcoal, muted brown.
- Built for Shopify products, checkout, payments, orders, and Printify fulfillment.
- Editorial product layouts with slower, restrained motion and minimal card framing.
- Local static commerce previews for design and interaction review without Shopify data.

## Commerce Features

- Configurable Shopify navigation with apparel collection fallbacks.
- Collection index, category navigation, sorting, native storefront filters, and active-filter removal.
- Responsive product galleries, color/size variants, variant pricing, availability, and quantity controls.
- Locale-aware Shopify Ajax cart drawer with add, remove, and quantity updates.
- Full cart page with notes, policy acknowledgement, shipping progress, and checkout fallback.
- Product-only storefront search and responsive desktop/mobile layouts.

## Connected Workflow

The Shopify theme is connected to the `main` branch of this repository. Commits pushed to `main` update the connected theme automatically.

1. Add products and collections in Shopify using the handles in `docs/product-catalog-plan.md`.
2. Configure storefront filters through Shopify Search & Discovery.
3. Connect Printify products and fulfillment inside Shopify.
4. Preview and test product, cart, payment, shipping, and policy behavior before publishing.

Launch prep docs:

- `docs/product-catalog-plan.md`
- `docs/store-policies-starter.md`
- `docs/shopify-launch-checklist.md`

## Structure

- `layout/theme.liquid` - main Shopify layout
- `templates/*.json` - Online Store 2.0 templates
- `sections/*.liquid` - editable Shopify sections
- `snippets/*.liquid` - reusable Liquid pieces
- `assets/theme.css` - theme styling
- `assets/theme.js` - interactions
- `preview/index.html` - storefront homepage preview
- `preview/collection.html` - collection and filter preview
- `preview/product.html` - product, variant, and cart-drawer preview
- `preview/cart.html` - full cart preview
