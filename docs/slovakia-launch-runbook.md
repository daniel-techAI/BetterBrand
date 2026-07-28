# R/CREATION Slovakia Launch Runbook

Checked against official sources on 2026-07-27. This is an implementation checklist, not a substitute for advice from a Slovak accountant or lawyer. Reconfirm amounts and rules when filing because they can change.

## Launch-gate snapshot

This table records planning assumptions reviewed on 2026-07-27. Recheck the actual Shopify store and supplier state before relying on it.

Do not accept a live payment until every `BLOCKER` item below is complete.

| Area | Status | Launch requirement |
| --- | --- | --- |
| Theme and storefront media | READY FOR CONCEPT PREVIEW | New consistent product galleries, collection images, cart, filters, and product routes are in the theme. Replace concept mockups with approved sample photography before paid promotion. |
| Shopify store identity | PARTIAL | Name, description, colors, units, currency, timezone, Instagram, collections, and product metafields are configured. Brand logo files still need uploading. |
| Legal operator | BLOCKER | Register the business and obtain the final legal name, ICO, DIC, address, and support contact. |
| Products | BLOCKER | Select a POD provider, order samples, approve quality, and sync final variants. There are currently no live Shopify products. |
| Payments | BLOCKER | Select an available third-party payment provider, complete identity checks, and verify payouts. |
| Markets, VAT, and tax | BLOCKER | Remove any unintended market, decide launch countries, confirm VAT treatment, and test tax display. |
| Shipping and returns | BLOCKER | Confirm provider-specific costs, configure profiles, establish a real return address/process, and test a returned order. |
| Policies and withdrawal receipt | BLOCKER | Replace policy placeholders, obtain legal review, publish the withdrawal page, and establish prompt email acknowledgement. |
| Domain and email | BLOCKER | Connect the final domain and authenticate a branded sender/support mailbox. |
| End-to-end test | BLOCKER | Complete test orders on desktop and mobile, refund one, cancel one, and verify fulfillment routing. |

## Phase 1: Establish the Operator

### 1. Choose the legal form

For a low-budget validation launch, a Slovak sole trade (`zivnost`) is normally the simpler starting point. It is not a separate legal person: you trade and carry liability in your own name. If you need limited liability, investors, or a legally separate company, ask an accountant/lawyer about an `s.r.o.` before registering.

For a sole trader, the business name must contain the entrepreneur's first and last name and may include an addition. A working format is `Daniel Laky - R/CREATION`, but clear the name before using it. The Commercial Code rule is in [Act 513/1991](https://static.slov-lex.sk/static/SK/ZZ/1991/513/20240601.print.html).

### 2. Clear the brand before spending

- Search the Slovak Industrial Property Office and EUIPO for `R/CREATION`, close spellings, and similar apparel marks.
- Search the final `.com`, `.sk`, and social handles.
- Search each prominent phrase used on the clothing. Do not assume a phrase is safe because it is common online.
- Save dated evidence of the searches and the original artwork source files.
- File a trade mark only after the name survives a professional clearance review and the samples are approved.

### 3. Register the trade

Prepare:

- Slovak eID, reader, signing certificates, and qualified electronic signature for the online route.
- Permanent residence details.
- Proof of the right to use the business premises if the business address differs from the permitted residence/address record.
- The proposed trade name.
- The free-trade activity covering retail/wholesale sale of goods. The official list includes code `4701`, purchase of goods for resale to consumers or other trade operators, including clothing and textiles.

Submit through the [official electronic trade registration service](https://www.slovensko.sk/sk/zivotne-situacie/zivotna-situacia/_registracia-zivnosti/). Electronic notification of free trades is currently free; craft and regulated trades have fees. The official [free-trade list](https://www.slovensko.sk/_img/CMS4/JKM_SK/Volne_zivnosti.pdf) contains the activity wording.

Save these outputs in a secure business folder:

- Trade authorization.
- ICO.
- Exact registered business name.
- Registered business address.
- Effective date.
- Confirmation of health-insurance notification.

The one-stop contact point normally sends the relevant registration data to the health insurer and tax authority. The tax authority assigns a DIC automatically, generally within 30 days, rather than requiring a separate income-tax registration application; see the [Financial Administration guidance](https://www.financnasprava.sk/_img/pfsedit/Dokumenty_PFS/Podnikatelia/Dan_z_prijmov/fyzicke_osoby/2025/2025.08.26_otazky_zivnost.pdf).

### 4. Set up money and records

- Open a dedicated EUR account used only for the business, even if a separate transaction account is not required for a physical-person entrepreneur under the financial-transaction-tax rules from 2026.
- Give the payment gateway and Shopify the exact registered name, address, ICO, DIC, and account owner details.
- Choose accounting software or an accountant before the first expense.
- Ask the accountant whether actual expenses or flat-rate expenses fit the POD model.
- Store every supplier invoice, Shopify bill, gateway statement, refund, sample cost, and ad receipt.
- Create a monthly VAT/OSS turnover tracker even before VAT registration.

The Financial Administration states that physical-person entrepreneurs are outside the financial transaction tax from 1 January 2026; see its [2026 notice](https://www.financnasprava.sk/_img/pfsedit/Dokumenty_PFS/Pre_media/Tlacove_spravy/Rok_2025/2025.12.15_TS_dan_fin_trans.pdf).

### 5. Budget for 2026 contributions

- Ask the health insurer to confirm the first advance based on your exact status. The 2026 standard SZCO rate is 16% and the minimum monthly advance for a person without disability is EUR 121.92; no minimum is set where the SZCO is concurrently an employee or state-insured person. See the [Vseobecna zdravotna poistovna 2026 table](https://www.vszp.sk/platitelia/platenie-poistneho/samostatne-zarobkovo-cinna-osoba/).
- Under the 2026 social-insurance changes, a genuinely new SZCO generally starts compulsory insurance from the first day of the sixth calendar month following the month it began. The 2026 special-basis contribution is EUR 131.34 until the later income test determines the basis. Confirm the actual date directly with Socialna poistovna because prior self-employment within 60 months changes the result. See the [official 2026 explanation](https://www.socpoist.sk/news/szco-odvody-pre-zivnostnikov-sa-od-1-jula-2026-zmenia-socialna-poistovna-vysvetluje-v-ktorych).

## Phase 2: Decide Where and How to Sell

### 6. Start with one market scope

Recommended validation scope: Slovakia plus a deliberately selected small EU group only after delivery rates and consumer-language requirements are verified. Remove any market that was enabled unintentionally.

Write down:

- Launch countries.
- Store and settlement currency.
- Languages offered in each country.
- Whether duties/taxes are included.
- Provider and fulfillment location for each SKU.
- Return address and who pays the return cost.

In Shopify: `Settings > Markets`. Make Slovakia the correct primary/home market for the Slovak operator, then activate only verified destinations. Review every domain/language/currency assignment before saving.

### 7. Confirm VAT before changing Shopify tax settings

Give an accountant the planned launch countries, supplier invoices, fulfillment countries, projected turnover, and whether Printful/Printify charges VAT.

Key thresholds to monitor:

- Slovak domestic turnover above EUR 50,000 in a calendar year triggers a VAT registration application deadline of five working days and generally registration from the following 1 January.
- Reaching EUR 62,500 in the same calendar year can trigger immediate VAT-payer status on the supply that crosses the threshold.
- The combined EU cross-border B2C distance-sales threshold is EUR 10,000; above it, destination VAT generally applies and the Union OSS can simplify reporting.

Use the [Slovak VAT registration guidance](https://www.financnasprava.sk/sk/podnikatelia/dane/dan-z-pridanej-hodnoty/registracna-povinnost-pre-dph/_1) and [OSS guidance](https://www.financnasprava.sk/sk/podnikatelia/dane/dan-z-pridanej-hodnoty/one-stop-shop). Do not enter a VAT number in Shopify until it is issued. Do not use a blanket 23% pricing calculation unless the accountant confirms that treatment for the actual launch structure.

### 8. Select the POD route with samples

Recommended first comparison within the EUR 200-250 validation budget:

1. Select one hero hoodie and one tee from a Printful EU fulfillment route.
2. Order those as samples; Printful currently describes a 20% sample discount for eligible connected stores, subject to monthly limits and account timing.
3. If Printify offers a materially better blank, print area, or embroidery provider for one hero product, order one comparable Printify EU sample.
4. Compare garment weight, fiber composition, stitching, wash result, print texture, color consistency, packaging, dispatch time, tracking, and invoice/VAT handling.
5. Use one provider per product family where possible. Reject any variant whose provider changes unpredictably.

Official provider references: [Printful samples](https://help.printful.com/hc/en-us/articles/360014067959-How-do-sample-orders-work), [Printful European centers](https://help.printful.com/hc/en-us/articles/360014067239-Where-are-the-European-fulfillment-centers-located), [Printify provider differences](https://help.printify.com/hc/en-us/articles/4483618188689-What-are-Print-Provider-differences), and [Printify samples](https://help.printify.com/hc/en-us/articles/4483617804689-How-does-sample-ordering-work).

Do not launch all eight concepts at once. A credible first release is the strongest hoodie, strongest tee, and one low-risk accessory after samples pass.

### 9. Verify product compliance for every SKU

Create a compliance record per product containing:

- Supplier legal identity and contact details.
- The economic operator/manufacturer role under the EU General Product Safety Regulation (GPSR).
- EU responsible-person details where the manufacturer is outside the EU.
- Product type, supplier SKU, batch or traceability identifier, and product images.
- Fiber composition and the exact garment label used.
- Applicable warnings and safety information in each market language.
- Test/sample photos, order invoice, and complaint history.
- Packaging materials and weights.

The online offer must clearly show the manufacturer name/trade mark and postal/electronic address, any EU responsible person, a product identifier/image, and warnings where applicable. Do not invent these details; obtain them from the chosen provider and determine your own legal role before publishing. See [GPSR Article 19](https://eur-lex.europa.eu/legal-content/DE-EN/TXT/?from=EN&uri=CELEX%3A32023R0988).

Textiles need a firmly attached fiber-composition label using official fiber names and the languages required in each sales country. See the [EU textile label guidance](https://europa.eu/youreurope/business/product-requirements/labels-markings/textile-label/indexamp_en.htm).

Ask a Slovak packaging-compliance adviser whether selling branded POD goods makes the operator a packaging producer in Slovakia and whether destination-country EPR registration is also needed. Even producers under 100 kg/year can retain registration, recordkeeping, and annual reporting duties despite an exemption from an OZV contract. Start with the [official Slovak producer-registration service](https://www.slovensko.sk/sk/detail-sluzby?externalCode=ks_336383).

## Phase 3: Finish Shopify

### 10. Complete identity and communications

In `Settings > General` and `Settings > Brand`, enter only the registered data:

- Legal business name.
- Customer-facing store name `R/CREATION`.
- Registered business address.
- ICO, DIC, and VAT ID only if issued/applicable.
- Support email and business phone where used.
- Default logo: `assets/r-creation-wordmark.svg`.
- Square logo: `assets/r-creation-square.svg`.
- Cover image: `assets/r-creation-cover-v1.jpg`.

Connect the final domain in `Settings > Domains`. Create `support@yourdomain` and a separate sender such as `orders@yourdomain`; configure SPF, DKIM, and DMARC through the mailbox/domain provider. In `Settings > Notifications`, send a test of every customer notification and remove placeholder text.

### 11. Configure payments

Shopify Payments is not currently listed as supported for businesses in Slovakia. In `Settings > Payments`, use Shopify's country-specific provider list, compare settlement currency, card coverage, fees, refunds, chargebacks, payout delay, and business-verification requirements, then activate the selected third-party gateway. Shopify may charge third-party transaction fees in addition to gateway fees.

Official references: [Shopify Payments supported countries](https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries), [third-party providers](https://help.shopify.com/en/manual/payments/third-party-providers), and [gateway availability](https://help.shopify.com/en/manual/payments/third-party-providers/payment-gateway-availability).

Verify:

- A EUR card payment succeeds.
- 3-D Secure works.
- The payment appears in the provider dashboard.
- A full and partial refund both work.
- The payout reaches the dedicated account under the correct legal name.
- PayPal or another wallet is enabled only if its own business account is verified.

### 12. Create only approved products

Follow `docs/product-catalog-plan.md` exactly for handles, product types, tags, variants, and metafields. For each product:

- Sync the approved provider product first.
- Preserve the fulfillment app's variant mapping/SKUs.
- Use the final sample photos as the first gallery images.
- Add front, detail, back, scale/fit, and material close-up images.
- Add measured size chart, fit, fiber composition, fabric weight, care, production window, dispatch window, country/region of fulfillment, and all GPSR fields.
- Set inventory/continue-selling behavior intentionally.
- Verify every color-size combination and the highest production cost.
- Add a single optional `custom.card_hover_image` file-reference metafield only if a curated card detail is needed. Without it, the theme safely zooms the main image instead of showing Shopify's arbitrary second image.

The generated visuals in this repository are concept merchandising images. They are not evidence of the physical product and must not be used to imply a sampled result that has not been verified.

### 13. Configure shipping from actual provider costs

Do not copy the existing draft rates into production without a supplier test. POD apps can create their own shipping profiles after product sync.

For each product and destination:

- Record first-item and additional-item cost.
- Check whether multiple products create split shipments.
- Check currency: Printify warns that published rate numbers are sent to Shopify without automatic currency conversion, which can make USD numbers incorrect in an EUR store.
- Decide whether rates are app-calculated, flat, or included in price.
- Set a free-shipping threshold only after contribution margin remains positive.
- Show production time separately from carrier transit.
- Confirm the return destination is not automatically the fulfillment facility.

References: [Printify Shopify shipping](https://help.printify.com/hc/en-us/articles/19421332555665-How-do-I-set-up-shipping-with-Shopify) and [Printful Shopify shipping](https://help.printful.com/hc/en-us/articles/360014007440-How-do-I-set-up-shipping-for-my-Shopify-store).

In `Settings > Shipping and delivery`, remove duplicate/manual profiles after the fulfillment app creates its profile, then test every launch country with every launch SKU.

### 14. Publish consumer and privacy controls

Replace every bracket in `docs/store-policies-starter.md`, have the result reviewed, and publish it in `Settings > Policies`.

Required storefront work:

- Publish refund/return, shipping, privacy, terms, and legal/contact information.
- Create a Shopify page with handle `withdraw-from-contract` and assign template `page.withdrawal`.
- Keep the footer link visible throughout the 14-day period.
- Route form notifications to a monitored mailbox.
- Send the customer a dated email acknowledgement without undue delay containing the submission content, date, and time. The theme form sends the request to the merchant but does not itself guarantee this durable customer receipt; use a tested Shopify automation/app or a documented manual response SLA.
- Retain the request and acknowledgement with the order record.

EU online consumers normally have 14 days to withdraw, and faulty goods have a minimum two-year legal guarantee. From 19 June 2026, Slovak Act 108/2024 also requires a prominent, continuously accessible online withdrawal function and prompt durable acknowledgement for covered online contracts. See [Act 108/2024](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2024/108) and the [EU distance-selling guidance](https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/ecommerce-distance-selling/index_en.htm).

Add current complaint and privacy-right information without using the discontinued EU ODR platform. Official references: [Slovak Trade Inspection alternative dispute resolution](https://www.soi.sk/alternativne-riesenie-spotrebitelskych-sporov) and [Slovak data-subject rights](https://www.dataprotection.gov.sk/en/rights-data-subjects/rights-data-subjects/).

In `Settings > Customer privacy`:

- Keep the automated privacy policy and cookie banner active only after the final legal operator data is inserted.
- Test consent choices from an EU IP/market.
- Do not load non-essential marketing tags before consent where consent is required.
- Document every app that receives customer data.
- Keep email marketing double opt-in enabled.

### 15. Search, navigation, and storefront checks

- Install Shopify Search & Discovery only after reviewing its permissions.
- Enable Availability, Product type, Price, Color, Size, Fit, Season, and Drop filters.
- Add product/collection/menu routes using the exact prepared handles.
- Verify the header account icon is intentional; hide customer accounts if no account benefit is offered.
- Verify all social links and remove empty networks.
- Check policy and withdrawal links in the footer.
- Replace concept shots with sample photography before paid ads.

## Phase 4: Test Before Selling

### 16. End-to-end test matrix

Use a real device plus desktop for each test:

- Browse every collection and filter.
- Open every product from its image, title, and quick-view entry.
- Swipe galleries; confirm hero, detail, and alternate order.
- Select every option and verify price, availability, SKU, and image.
- Add, update, remove, and restore cart items.
- Complete checkout with Slovakia and each enabled foreign destination.
- Verify tax, shipping, production estimate, consent, and policy links before payment.
- Confirm order, payment, supplier routing, tracking, customer email, and Shopify timeline.
- Cancel before production and document the provider behavior.
- Refund one test order and verify the card/account result.
- Submit the withdrawal form and verify the merchant notification plus customer acknowledgement.
- Simulate one damaged-item request and one returned item.
- Check that no test order enters live production unintentionally.

### 17. Launch approval record

Before removing the storefront password, save a dated launch record containing:

- Legal registration documents and IDs.
- Accountant's VAT/OSS and bookkeeping decisions.
- Payment activation and successful payout proof.
- Market and shipping-rate matrix.
- Supplier contract, product-compliance records, and sample approval photos.
- Packaging/EPR determination.
- Final policies and legal review version.
- Successful test-order/refund/withdrawal evidence.
- Domain, email authentication, backups, and admin two-factor authentication.

Only then publish the selected launch products and remove the password.

## What Was Intentionally Not Changed in Shopify

- Legal name, address, ICO, DIC, and VAT ID: the verified registration details do not yet exist and must never be guessed.
- Payments and payouts: these require the owner's identity verification, banking agreement, and acceptance of provider terms.
- Tax registration/VAT collection: this depends on the legal setup, turnover, markets, and professional tax decision.
- Active markets: confirm the actual store state and change markets only after the final country plan is approved, because this can alter prices, domains, and checkout availability.
- Final shipping rates: the supplier, product weights, fulfillment origins, and app-created profiles are not final.
- Final policies: legal placeholders and the real return address/process are still missing.
- Products: no approved provider products or physical samples exist yet.
- Custom domain and mailbox: these require a domain purchase/DNS access and mailbox ownership.
- Search & Discovery: app installation requires reviewing and accepting app permissions.
- Automatic withdrawal acknowledgement: the basic Shopify contact form notifies the merchant but does not by itself prove a durable customer receipt.
- Customer accounts, store credit, and self-serve returns: these are not required to validate the first drop and should be decided after the return workflow is real.

## Recommended EUR 200-250 Validation Budget

Use actual quotes before spending. A practical cap is:

| Item | Working allocation |
| --- | ---: |
| Hero hoodie and tee samples, including delivery | EUR 80-130 |
| Optional comparison sample from the second provider | EUR 35-60 |
| Domain and first mailbox costs | EUR 15-35 |
| Packaging/compliance/accountant reserve | EUR 30-60 |
| Refund/reprint buffer | Keep every remaining euro |

Do not buy ads before physical samples, payment payout, returns, and delivery are proven.
