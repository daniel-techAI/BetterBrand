# Security policy

## Supported version

Security fixes are applied to the latest commit on `main`. There is no separately supported release branch while the store remains in pre-launch development.

## Report a vulnerability privately

Do not open a public issue containing exploit details, credentials, customer information, or store identifiers. Use the repository’s **Security** tab and GitHub private vulnerability reporting when it is available.

If private reporting is unavailable, open a minimal issue titled `Private security contact needed` without technical details. A maintainer can then provide a private route. Do not test against a live storefront, customer account, checkout, or Shopify Admin without explicit written authorization.

Include, when safe:

- affected file, route, and commit;
- impact and prerequisites;
- minimal reproduction steps or a proof of concept using non-production data;
- suggested mitigation, if known;
- whether the issue may already be public.

## Secrets and customer data

This repository must never contain Shopify Admin tokens, Theme Access passwords, API keys, `.env` files, recovery codes, customer records, orders, exports, or payment information. Revoke and rotate an exposed credential immediately, then remove it from Git history; deleting only the latest file is insufficient.

Theme code runs in a customer-facing browser. Do not place secrets in Liquid, JavaScript, theme settings, HTML attributes, or storefront requests.
