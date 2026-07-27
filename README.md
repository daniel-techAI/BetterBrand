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
- Responsive product galleries with touch swipe, thumbnails, color/size variants, variant pricing, availability, and quantity controls.
- Catalog drawer with search, account access, Women/Men departments, and product-category routes.
- Locale-aware Shopify Ajax cart drawer with add, remove, and quantity updates.
- Full cart page with notes, policy acknowledgement, shipping progress, and checkout fallback.
- Product-only storefront search and responsive desktop/mobile layouts.

## Deployment Workflow

The `main` branch is the source of truth. Shopify's GitHub integration is currently flagged, so GitHub commits do not automatically update the store. The validated workaround is Shopify CLI.

Current unpublished Shopify theme:

- Theme ID: `193799881037`
- Theme name: `R-Creation Emotional c5b7d8a`
- Store: `betterbrand-rc.myshopify.com`

After each approved theme change:

1. Commit and push the source to `main`.
2. Run `shopify theme check --path .`.
3. Run `shopify theme push --theme 193799881037 --strict --store betterbrand-rc.myshopify.com --path .`.
4. Preview the unpublished theme in Shopify before publishing.
5. Publish only after every item in `docs/shopify-launch-checklist.md` is complete.

Store setup continues separately:

1. Add products and collections in Shopify using the handles in `docs/product-catalog-plan.md`.
2. Configure storefront filters through Shopify Search & Discovery.
3. Connect Printful or Printify products and fulfillment inside Shopify.
4. Test product, cart, payment, shipping, policy, and fulfillment behavior before launch.

Launch prep docs:

- `docs/product-catalog-plan.md`
- `docs/pricing-and-routing-plan.md`
- `docs/store-policies-starter.md`
- `docs/shopify-launch-checklist.md`

## Structure

- `layout/theme.liquid` - main Shopify layout
- `templates/*.json` and `templates/policy.liquid` - Shopify storefront templates
- `sections/*.liquid` - editable Shopify sections
- `snippets/*.liquid` - reusable Liquid pieces
- `assets/theme.css` - theme styling
- `assets/theme.js` - interactions
- `preview/index.html` - storefront homepage preview
- `preview/collection.html` - collection and filter preview
- `preview/product.html` - product, variant, and cart-drawer preview
- `preview/cart.html` - full cart preview
- `preview/account.html` - customer account preview
- `preview/support.html` - support and policy-content preview
