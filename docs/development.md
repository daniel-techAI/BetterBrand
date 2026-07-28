# Theme development

## Requirements

- Git 2.28 or newer.
- Node.js 22.12 or newer.
- Shopify CLI installed with `npm install -g @shopify/cli@latest`.
- A Shopify account with theme permission on a development or merchant store.

Use your own store hostname in examples. Never put a Theme Access password or Admin token in a command that will be copied into an issue, log, screenshot, or shell history.

## Static design preview

Serve the repository root with any local static server:

```bash
python -m http.server 8080
```

Open `http://127.0.0.1:8080/preview/`. Static routes use a small preview catalog and simulated interactions. They are useful for layout and interaction review, but they cannot validate Liquid rendering, localization, inventory, checkout, accounts, tax, payment, or fulfillment.

## Shopify development preview

From the repository root:

```bash
shopify theme check --path . --fail-level error
shopify theme dev --store your-store.myshopify.com --path .
```

Complete Shopify’s browser authentication when prompted. Work only against a development theme or an explicitly selected unpublished theme.

## Review matrix

For each affected route, test:

- desktop and narrow mobile layouts without horizontal overflow;
- mouse, touch, keyboard, focus visibility, labels, and reduced motion;
- empty, loading, unavailable, sold-out, long-title, and high-quantity states;
- localized money and routes rather than hard-coded storefront URLs;
- search, sorting, filters, variant changes, cart add/update/remove, and checkout handoff;
- JavaScript-disabled navigation and product-form fallback where possible;
- theme-editor settings and section reorder/remove behavior.

Never run a real payment or release an order to a fulfillment provider during theme development.

## Release preparation

1. Update `theme_version` in `config/settings_schema.json` using semantic versioning.
2. Update `CHANGELOG.md` with user-visible changes.
3. Run Theme Check and `git diff --check`.
4. Exercise the affected static and Shopify routes.
5. Run `shopify theme package --path .` and inspect the generated ZIP name and contents.
6. Keep the ZIP outside Git; `*.zip` is ignored intentionally.
7. Follow [deployment.md](deployment.md) and upload only to an unpublished theme.
