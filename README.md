# R/CREATION Shopify Theme

Custom Shopify Online Store 2.0 theme for a premium apparel brand.

Working brand: `R/CREATION`
Working tagline: `You wear what you are.`

## Direction

- Luxury streetwear with a product-led tech-site feel.
- Palette: black, white, warm beige, champagne gold, charcoal, muted brown.
- Built for Shopify products, checkout, payments, orders, and Printify fulfillment.
- Local static preview included at `preview/index.html` for design review before Shopify is connected.

## Shopify Setup Later

1. Create or reopen the Shopify store.
2. Add products and Printify integration.
3. Push this repo to GitHub.
4. In Shopify admin, connect the GitHub branch as a theme.
5. Preview, test cart/checkout, then publish.

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
- `preview/index.html` - browser preview without Shopify
