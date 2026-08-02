# Shopify launch checklist

This is the release gate for the R/CREATION store. Keep the storefront password enabled and the theme unpublished until every launch-gate item is complete. Use [slovakia-launch-runbook.md](slovakia-launch-runbook.md) for detailed preparation notes, then reconfirm legal and regulatory requirements with qualified advisers because they change.

## Theme preparation complete

- [x] Online Store 2.0 theme, product routing, cart behavior, responsive navigation, concept galleries, and fallback product states implemented.
- [x] Shopify Theme Check passes and an unpublished-draft upload has been verified.
- [x] Theme settings include brand identity and palette controls.
- [x] Product metafield and collection plans are documented.
- [x] Permanent withdrawal-page template and Shopify policy template are included.
- [x] Theme source and concept assets contain no store credentials or customer exports.

These checks cover theme preparation only. They do not mean the store is legally or commercially ready.

## Business and product blockers

- [ ] Register the business and verify the exact legal name, address, company ID, tax ID, and VAT status.
- [ ] Clear the R/CREATION name, marks, and printed phrases for intellectual-property risk.
- [ ] Confirm bookkeeping, VAT/OSS, packaging/EPR, GPSR, and launch-market obligations with qualified advisers.
- [ ] Open and verify the business bank/payment setup.
- [ ] Select the launch countries deliberately and remove unintended markets.
- [ ] Select final blanks and providers; order, inspect, and approve physical samples.
- [ ] Replace concept imagery with approved sample photography where customers could mistake it for the final product.
- [ ] Complete materials, measured sizing, care, origin/producer, warnings, price, tax, production, and delivery information for every variant.
- [ ] Verify product/variant/SKU mappings and prevent test orders from entering production.

## Shopify configuration

- [ ] Connect the custom domain and authenticated sender/support mailboxes.
- [ ] Upload the final brand assets in `Settings > Brand`.
- [ ] Configure only intended markets, currencies, languages, taxes, duties, and domain routing.
- [ ] Configure provider-specific shipping profiles and verify every destination/rate in EUR.
- [ ] Activate an eligible payment gateway and verify merchant identity and payouts.
- [ ] Sync only sampled products and confirm inventory behavior.
- [ ] Build final navigation, collections, Search & Discovery filters, and footer routes.
- [ ] Decide customer-account, store-credit, and self-serve-return behavior.
- [ ] Configure customer privacy, cookie consent, marketing consent, retention, and every data-receiving app.
- [ ] Replace every bracketed policy placeholder and obtain legal review.
- [ ] Create `/pages/withdraw-from-contract`, assign `page.withdrawal`, and verify prompt durable acknowledgement of submissions.

## End-to-end launch gate

- [ ] Preview the exact unpublished candidate on desktop and physical mobile devices.
- [ ] Browse, search, filter, and open every product and collection.
- [ ] Test every option combination, sold-out state, quantity update, cart removal, and cart restoration.
- [ ] Test card payment, 3-D Secure, cancellation, refund, and payout using Shopify-approved test procedures.
- [ ] Test Slovakia and every enabled destination at checkout.
- [ ] Verify displayed price, VAT, shipping, currency, production time, and delivery estimate for every launch variant.
- [ ] Send a controlled test order through the supplier without unintended live production.
- [ ] Verify tracking and every customer notification.
- [ ] Exercise withdrawal, damaged-item, cancellation, return, and refund workflows.
- [ ] Verify legal identity, policies, privacy choices, domain, support contact, and footer links.
- [ ] Enable administrator two-factor authentication and save store/theme backups plus a dated launch record.
- [ ] Keep the previous known-good theme available for rollback.

## Publish decision

- [ ] A named owner and reviewer approve the candidate, source commit, store configuration, test evidence, and rollback plan.
- [ ] Publish deliberately in Shopify Admin.
- [ ] Remove the storefront password only after the published storefront and checkout pass a final smoke test.
