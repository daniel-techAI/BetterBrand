# R/CREATION Shopify theme

Custom Shopify Online Store 2.0 theme for R/CREATION, an independent apparel concept built around the line “Emotions are architecture.”

![R/CREATION storefront concept](assets/brand-hero-v2.png)

> **Project status:** pre-launch. The theme is suitable for development and unpublished Shopify previews. Product imagery, prices, policies, fulfillment details, and seller information are concepts until the launch checklist is complete.

## Highlights

- Editorial home, collection, product, search, cart, lookbook, about, FAQ, contact, and withdrawal experiences.
- Native Shopify products, variants, availability, storefront filters, customer accounts, policy routes, and checkout handoff.
- Responsive product galleries, touch navigation, quick views, and a locale-aware Ajax cart drawer.
- Theme-editor sections and global brand/color settings.
- Static preview pages for reviewing the visual system without Shopify data or checkout access.
- EU/Slovakia launch planning documents with explicit legal, payment, tax, fulfillment, and testing gates.

## Quick start

Requirements: Git 2.28+, Node.js 22.12+, a Shopify store with theme permission, and the latest [Shopify CLI](https://shopify.dev/docs/api/shopify-cli).

```bash
npm install -g @shopify/cli@latest
shopify theme check --path . --fail-level error
shopify theme dev --store your-store.myshopify.com --path .
```

Shopify CLI opens the authenticated development preview. For a design-only local preview, install the pinned validation tools and open `/preview/`:

```bash
npm ci
npm run preview
```

The preview runs at `http://127.0.0.1:4173/preview/`. Run `npm run test:a11y` to check all preview routes in desktop and mobile Chromium for serious WCAG violations and page overflow. The static preview is not Shopify: account, payment, order, tax, inventory, and fulfillment behavior must be tested in a development or unpublished theme.

## Safe Shopify delivery

Validate and package the source:

```bash
shopify theme check --path . --fail-level error
shopify theme package --path .
```

Create a new unpublished theme:

```bash
shopify theme push --unpublished --strict --store your-store.myshopify.com --path .
```

Never use `--publish`, `--live`, or `--allow-live` during routine development. Preview the uploaded draft on desktop and mobile, then complete [the launch checklist](docs/shopify-launch-checklist.md) before deliberately publishing from Shopify Admin. See [deployment](docs/deployment.md) for updating an existing draft, manual ZIP upload, verification, and rollback.

## Repository map

- `layout/`, `templates/`, `sections/`, `snippets/` — Shopify Liquid storefront.
- `assets/` — theme CSS, JavaScript, brand artwork, and concept product media.
- `config/` and `locales/` — theme settings and English translations.
- `preview/` — static design-review routes; not included in Shopify theme packages.
- `docs/` — product, pricing, operational, legal-preparation, and launch material.
- `design-qa.md` — recorded responsive and interaction review.

Products, collections, inventory, customers, orders, payments, markets, navigation, metafield definitions, app configuration, and Shopify Admin policies are store data and are not contained in this repository or a theme ZIP.

## Project policies

- Read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing a change.
- Report vulnerabilities through [SECURITY.md](SECURITY.md), never through a public issue.
- Use [SUPPORT.md](SUPPORT.md) to choose the right support channel.
- Theme source code is MIT-licensed. R/CREATION names, marks, copy, artwork, photographs, and product designs are excluded; see [LICENSE](LICENSE) and [NOTICE.md](NOTICE.md).
