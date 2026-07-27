# Shopify Launch Checklist

Use the detailed `docs/slovakia-launch-runbook.md` for instructions and official sources. This page is the short execution board.

## Complete

- [x] Store the theme source on GitHub `main` and validate commit `c5b7d8a`.
- [x] Work around the flagged GitHub integration with authenticated Shopify CLI deployment.
- [x] Upload unpublished theme `R-Creation Emotional c5b7d8a` as Shopify theme ID `193799881037`.
- [x] Verify the uploaded hero, collection cards, realistic product concepts, and accessories section in Shopify's theme editor.
- [x] Configure store name, brand description, colors, Instagram, EUR, metric units, kilograms, and Bratislava timezone.
- [x] Enable email marketing double opt-in and Shopify customer privacy controls.
- [x] Create product metafields for fit, fabric, fabric weight, season, drop, chapter, production, and care.
- [x] Create automated Drop 001, Women, Men, Hoodies, First Layers, Socks, Headwear, and Objects collections.
- [x] Build collection filters, product routing, cart behavior, mobile navigation, concept galleries, and fallback product pages in the theme.
- [x] Replace inconsistent stock/raw-art galleries with coordinated hero, detail, and alternate product imagery.
- [x] Add a permanent online withdrawal route and Shopify page template to the theme.

## Do Next

- [ ] Register the Slovak business and obtain the exact legal name, address, ICO, and DIC.
- [ ] Clear `R/CREATION` and all printed phrases for trade mark risk.
- [ ] Open a dedicated EUR business account and engage an accountant.
- [ ] Decide initial countries, VAT/OSS treatment, and packaging/EPR obligations.
- [ ] Select the hero hoodie and tee blanks; order and approve physical samples.
- [ ] Choose the fulfillment provider for each approved SKU.
- [ ] Connect a custom domain and authenticated support/sender mailbox.
- [ ] Activate and verify a Shopify-supported third-party payment gateway for Slovakia.

## Then Configure Shopify

- [ ] Preview theme ID `193799881037` on desktop and mobile; do not publish it until the launch gate passes.
- [ ] Resolve the Shopify/GitHub account flag only if automatic deployment is still wanted; CLI deployment already works.
- [ ] Upload `r-creation-wordmark.svg`, `r-creation-square.svg`, and `r-creation-cover-v1.jpg` in `Settings > Brand`.
- [ ] Replace the accidental Netherlands market with the intentional launch market setup.
- [ ] Sync only sampled products and preserve provider variant/SKU mappings.
- [ ] Complete product material, size, care, GPSR, warning, production, and delivery data.
- [ ] Replace concept mockups with approved physical sample photography.
- [ ] Verify app-created shipping profiles and destination rates in EUR.
- [ ] Replace every policy placeholder and obtain legal review.
- [ ] Create `/pages/withdraw-from-contract`, assign `page.withdrawal`, and test the acknowledgement workflow.
- [ ] Install Search & Discovery after reviewing permissions, then enable the prepared filters.
- [ ] Review customer accounts, store credit, self-serve returns, and notification templates.

## Launch Gate

- [ ] Card payment, 3-D Secure, refund, and bank payout tested.
- [ ] Slovakia plus every enabled destination tested at checkout.
- [ ] Tax, shipping, currency, and delivery estimates verified for every launch variant.
- [ ] Supplier receives a test order without unintended live production.
- [ ] Tracking and all customer emails verified.
- [ ] Withdrawal request, merchant notification, and durable customer acknowledgement verified.
- [ ] Damaged-item, cancellation, return, and refund workflows documented.
- [ ] Policies, legal identity, domain, support email, privacy consent, and footer links verified.
- [ ] Admin two-factor authentication, backups, and launch records complete.
- [ ] Storefront password removed only after every launch-gate item passes.
