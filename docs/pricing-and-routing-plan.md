# R/CREATION launch pricing and Shopify routing

This is the working launch model for Drop 001. Prices are customer-facing EUR prices. Recalculate every item after the physical Printify sample and before publishing it for sale.

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

Printify describes a typical print-on-demand margin of roughly 25-40%, while its listed product cost does not include shipping, taxes, or storefront expenses. Treat that range as an operating reference, not a guarantee.

## Pricing formula

Use the conservative VAT-registered model until an accountant confirms the correct treatment:

```text
net revenue = retail price / 1.23
contribution = net revenue
             - production and print cost
             - payment fees
             - shipping subsidy
             - 8% returns / defect reserve
             - per-order software and marketing allocation
```

For each SKU:

1. Enter the exact Printify production price for every size and color.
2. Add any print-area or embroidery surcharge.
3. Keep delivery separate at launch.
4. Use the most expensive normal variant when checking the ceiling.
5. Reject the provider or raise the retail price if the ceiling is exceeded.
6. Order a sample before opening sales.

Slovakia's standard VAT rate is currently 23%, but whether and when the business must register, and how EU distance sales apply, depends on the actual legal setup and turnover. Confirm this with a Slovak accountant before accepting orders.

## Delivery strategy

- Charge the real delivery rate at launch. Do not hide it inside the garment price before provider rates are known.
- Use one EU provider per product family where possible to reduce split shipments and inconsistent delivery times.
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
| Women | `women` | Product tag is `women` |
| Men | `men` | Product tag is `men` |
| Hoodies | `hoodies` | Product type is `Hoodie` |
| Tees | `tees` | Product type is `T-Shirt` |
| Hats & Caps | `hats-caps` | Product type is `Hat` |
| Objects | `accessories` | Product tag is `object` |

Recommended product tags: `drop-001`, `women` or `men` or `unisex`, `hoodie` / `tee` / `headwear` / `object`, and `reconstruction` / `confrontation` / `symbols`.

## Required launch decisions

- Clear or replace any phrase that may belong to another brand before sale, especially recovered cap wording.
- Add final garment composition, care, country of production, measured size chart, production estimate, and provider-specific delivery estimate.
- Replace mockups with approved sample photos before paid advertising.
- Insert the legal business name, Slovak address, company ID, VAT ID if applicable, and support email into Shopify policies and the footer.

## Sources checked July 2026

- [Printify product-pricing guide](https://printify.com/blog/how-to-price-a-product-for-ultimate-success/)
- [Printify plan and cost exclusions](https://printify.com/pricing/)
- [Printify Europe shipping rates](https://printify.com/shipping-rates/textildruck-europa/)
- [Slovak Financial Administration VAT rates](https://www.financnasprava.sk/sk/podnikatelia/dane/dan-z-pridanej-hodnoty/sadzby-dane)
- [Shopify Slovakia pricing](https://www.shopify.com/sk/pricing)
- [Nude Project hoodie reference](https://nude-project.com/en-eu/collections/hoodies/products/nude-tour-hood-fw25-black)
- [Represent hoodie reference](https://eu.representclo.com/es/products/represent-owners-club-hoodie-buttercream)
