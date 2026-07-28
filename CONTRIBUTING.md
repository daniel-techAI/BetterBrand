# Contributing

Thanks for helping improve the R/CREATION theme. Keep changes focused, reviewable, and safe for an unpublished Shopify preview.

## Before changing code

1. Open or reference an issue for behavior changes.
2. Create a short-lived branch from `main`.
3. Do not add store exports, credentials, customer data, generated ZIPs, or unlicensed media.
4. Treat product art and brand assets as proprietary; do not replace or redistribute them without authorization.

## Validate locally

Install Shopify CLI, then run:

```bash
shopify theme check --path . --fail-level error
shopify theme dev --store your-store.myshopify.com --path .
```

Also serve `/preview/` when a change affects the static design review. Test the relevant routes at desktop and narrow mobile widths. For commerce changes, test native Shopify products and variants, sold-out states, filtering, search, add/update/remove cart behavior, localization, keyboard use, and a no-JavaScript fallback where applicable.

Run `git diff --check` and review the staged diff before committing.

## Pull requests

Describe the problem and the user-visible result, list the routes tested, attach before/after media for visual changes, and call out any required Shopify Admin configuration. A passing Theme Check does not replace storefront testing.

By contributing, you confirm that you have the right to submit the work and license the code contribution under this repository’s MIT license. Do not submit third-party artwork, brand materials, or customer content.
