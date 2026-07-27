# R/CREATION launch pricing and Shopify routing

This is the working launch model for Drop 001. Prices are customer-facing EUR prices. They are positioning targets, not final prices. Recalculate every item after approving the physical sample, selecting the fulfillment provider, and confirming the tax treatment.

## Launch prices

| Product | Retail price | Maximum production + print cost* | Position |
| --- | ---: | ---: | --- |
| Rebuild Yourself Crop Hoodie | EUR 84 | EUR 40 | Entry hoodie |
| Face What You Hide Hoodie | EUR 89 | EUR 42 | Hero hoodie |
| Embrace The Chaos Crop Tee | EUR 42 | EUR 18 | Entry apparel |
| Break The Loop Heavy Tee | EUR 46 | EUR 20 | Premium oversized tee |
| Unavailable Edition Cap | EUR 34 | EUR 14 | Embroidered object |
| Prison Edition Cap | EUR 34 | EUR 14 | Embroidered object |
| Architecture Socks | EUR 19 | EUR 7.50 | Add-on / bundle piece |
| Emotional Sticker Set | EUR 9 | EUR 3 | Checkout add-on |

\* These ceilings assume the customer pays delivery. If R/CREATION subsidizes delivery, subtract that subsidy from the ceiling.

## Why EUR 10 profit is not enough

A flat EUR 10 markup is not the same as EUR 10 profit. Production is only one cost. A sale may also need to cover payment fees, Shopify, VAT when applicable, Printify delivery, replacements, returns, discounts, samples, and customer acquisition. A EUR 10 hoodie markup can disappear after one replacement or discounted order.

A EUR 10 markup is too small for the hero garments. Production is only one cost, and one reprint, return, discount, or subsidized delivery can consume it. As a working gate, target at least 35% contribution before paid advertising after production, payment fees, delivery subsidy, and a returns/defect reserve. This is an operating target, not a promise that every sale will reach it.

## Pricing formula

Use the model that matches the accountant's decision. Do not divide every sale by 1.23 unless R/CREATION is registered and 23% Slovak VAT is actually the correct rate for that transaction.

Scenario A, not VAT registered:

```text
contribution = customer product price
             - supplier invoice cost, including non-recoverable VAT
             - payment and Shopify transaction fees
             - shipping subsidy
             - returns / defects reserve
             - per-order software allocation
```

Scenario B, VAT registered and the sale carries 23% VAT:

```text
net product revenue = VAT-inclusive product price / 1.23
contribution = net product revenue
             - production and print cost excluding recoverable input VAT
             - payment fees
             - shipping subsidy
             - returns / defects reserve
             - per-order software allocation
```

For each SKU:

1. Enter the exact selected provider's production price for every size and color.
2. Add any print-area or embroidery surcharge.
3. Keep delivery separate at launch.
4. Use the most expensive normal variant when checking the ceiling.
5. Reject the provider or raise the retail price if the ceiling is exceeded.
6. Reserve 8% of product revenue during validation for returns, defects, and reprints; replace that assumption with actual data later.
7. Order and wash-test a sample before opening sales.
8. Keep paid advertising outside the product contribution calculation until organic conversion is proven.

Slovakia's standard VAT rate is currently 23%, but whether and when the business must register, whether supplier VAT is recoverable, and how EU distance sales apply depends on the actual structure. Confirm this with a Slovak accountant before accepting orders.

## Delivery strategy

- Charge the real delivery rate at launch. Do not hide it inside the garment price before provider rates are known.
- Use one tested EU provider per product family where possible to reduce split shipments and inconsistent delivery times.
- Show production time separately from carrier transit time.
- Test complimentary delivery only at EUR 150 or more, after real order economics are available.
- Never advertise "worldwide delivery" for a SKU until its selected provider and destination list are confirmed.

## Product handles

Create the Shopify and Printify products with these exact handles so the theme's prepared links resolve immediately:

| Product | Shopify handle |
| --- | --- |
| Rebuild Yourself Crop Hoodie | `rebuild-yourself-crop-hoodie` |
| Face What You Hide Hoodie | `face-what-you-hide-hoodie` |
| Embrace The Chaos Crop Tee | `embrace-the-chaos-crop-tee` |
| Break The Loop Heavy Tee | `break-the-loop-heavy-tee` |
| Unavailable Edition Cap | `unavailable-edition-cap` |
| Prison Edition Cap | `prison-edition-cap` |
| Architecture Socks | `architecture-socks` |
| Emotional Sticker Set | `emotional-sticker-set` |

## Collection handles

Create automated Shopify collections with these exact handles:

| Collection | Handle | Suggested rule |
| --- | --- | --- |
| Drop 001 | `drop-001` | Product tag is `drop-001` |
| Women | `women` | Product tag includes `chapter-reconstruction` |
| Men | `men` | Product tag includes `chapter-confrontation` |
| Hoodies | `hoodies` | Product type is `Hoodie` |
| Tees | `tees` | Product type is `T-Shirt` |
| Socks | `socks` | Product type is `Socks` |
| Hats & Caps | `hats-caps` | Product type is `Cap` or `Hat` |
| Objects | `accessories` | Product tag includes `chapter-objects` |

Recommended product tags: `drop-001`, the applicable `chapter-*` tag, fit, weight, season, and color tags defined in `docs/product-catalog-plan.md`.

## Required launch decisions

- Clear or replace any phrase that may belong to another brand before sale, especially recovered cap wording.
- Add final garment composition, care, country of production, measured size chart, production estimate, and provider-specific delivery estimate.
- Treat repository mockups as concept merchandising only and replace them with approved sample photos before paid advertising.
- Insert the legal business name, Slovak address, company ID, VAT ID if applicable, and support email into Shopify policies and the footer.

## Sources checked July 2026

- [Printify provider differences](https://help.printify.com/hc/en-us/articles/4483618188689-What-are-Print-Provider-differences)
- [Printify Shopify shipping](https://help.printify.com/hc/en-us/articles/19421332555665-How-do-I-set-up-shipping-with-Shopify)
- [Printful sample orders](https://help.printful.com/hc/en-us/articles/360014067959-How-do-sample-orders-work)
- [Printful European fulfillment centers](https://help.printful.com/hc/en-us/articles/360014067239-Where-are-the-European-fulfillment-centers-located)
- [Slovak Financial Administration VAT rates](https://www.financnasprava.sk/sk/podnikatelia/dane/dan-z-pridanej-hodnoty/sadzby-dane)
- [Shopify Slovakia pricing](https://www.shopify.com/sk/pricing)
- [Nude Project hoodie reference](https://nude-project.com/en-eu/collections/hoodies/products/nude-tour-hood-fw25-black)
- [Represent hoodie reference](https://eu.representclo.com/es/products/represent-owners-club-hoodie-buttercream)
