# Product Catalog Plan

Use this when recreating products in Shopify and Printify.

## Shopify Setup Status

Configured in Shopify on 2026-07-27:

- Store identity: `R/CREATION`
- Currency and units: `EUR`, metric, kilograms
- Time zone: `Bratislava`
- Customer email marketing: double opt-in enabled
- Product metafields: fit, fabric, fabric weight, season, drop, chapter, production, and care
- Automated collections: Drop 001, Women, Men, Hoodies, First Layers, Socks, Headwear, and Objects
- Theme product media: coordinated hero, detail, and alternate concept galleries for all eight planned products
- Product-card hover behavior: a curated metafield image when supplied, otherwise a controlled zoom of the main product image

Product publishing must use the exact values below so Shopify places products in the correct collections automatically:

| Collection | Storefront handle | Automatic rule |
| --- | --- | --- |
| Drop 001 | `/collections/drop-001` | Tag includes `drop-001` |
| Women | `/collections/women` | Tag includes `chapter-reconstruction` |
| Men | `/collections/men` | Tag includes `chapter-confrontation` |
| Hoodies | `/collections/hoodies` | Product type is `Hoodie` |
| First Layers | `/collections/tees` | Product type is `T-Shirt` |
| Socks | `/collections/socks` | Product type is `Socks` |
| Headwear | `/collections/hats-caps` | Product type is `Cap` or `Hat` |
| Objects | `/collections/accessories` | Tag includes `chapter-objects` |

Shopify also provides the built-in `/collections/all` catalog route.

Still requires owner confirmation before launch:

- Connect a custom domain and branded sender email.
- Choose the active selling markets; the current active market is Netherlands even though the business location is Slovakia.
- Confirm shipping rates against the selected Printify provider and product costs.
- Review and publish the written return, shipping, privacy, and terms policies.
- Upload `assets/r-creation-wordmark.svg`, `assets/r-creation-square.svg`, and `assets/r-creation-cover-v1.jpg` to Shopify Brand settings. Browser upload remains blocked until the ChatGPT Chrome extension is allowed to access file URLs.
- Install or configure Shopify Search & Discovery before enabling storefront filters.

## Collections

These Shopify collections are already created:

- `All` - every live product
- `Drop 001` - the Emotional Collection
- `Women` - reconstruction chapter
- `Men` - confrontation chapter
- `Hoodies`
- `First Layers` - tees and cropped tees
- `Socks`
- `Headwear`
- `Objects` - socks, cases, stickers, and small editions

Create pants, shorts, and broader seasonal collections only after Drop 001 proves demand.

Recommended handles:

- `/collections/drop-001`
- `/collections/women`
- `/collections/men`
- `/collections/hoodies`
- `/collections/tees`
- `/collections/socks`
- `/collections/hats-caps`
- `/collections/accessories`

## Product Naming

Use these names for the first capsule:

- `Face What You Hide Hoodie`
- `Rebuild Yourself Crop Hoodie`
- `Embrace The Chaos Crop Tee`
- `Break The Loop Heavy Tee`
- `Architecture Socks`
- `Unavailable Edition Cap`
- `Prison Edition Cap`
- `Emotional Sticker Set`

The full phrase printed on the recovered Unavailable cap needs trade mark clearance before sale. Do not use it as the product title.

## Product Types

Use consistent Shopify product types:

- `T-Shirt`
- `Hoodie`
- `Pants`
- `Shorts`
- `Socks`
- `Cap`
- `Hat`
- `Phone Case`
- `Sticker`

## Variants

Use exactly these option names so filters stay clean:

- `Color`
- `Size`

Color values:

- `Black`
- `Bone`
- `Charcoal`
- `Deep Heather`
- `Mauve`
- `Washed Black`

Apparel sizes:

- `XS`
- `S`
- `M`
- `L`
- `XL`
- `XXL`

Hat/cap sizes:

- `One Size`
- `S/M`
- `L/XL`

## Tags

Use tags as operational helpers, not messy public labels:

- `drop-001`
- `season-year-round`
- `chapter-reconstruction`
- `chapter-confrontation`
- `chapter-objects`
- `fit-oversized`
- `fit-cropped`
- `fit-regular`
- `weight-light`
- `weight-heavy`
- `color-black`
- `color-bone`
- `color-charcoal`
- `color-mauve`
- `color-washed-black`

## Metafields

These Shopify product metafields are already created:

- `custom.fit` - single line text, example `Oversized`
- `custom.fabric` - single line text, example `Heavy cotton fleece`
- `custom.fabric_weight` - single line text, example `420 GSM`
- `custom.season` - single line text, example `Year-round`
- `custom.drop` - single line text, example `Drop 001`
- `custom.chapter` - single line text, example `Confrontation`
- `custom.production` - multi-line text for made-to-order expectations
- `custom.care` - multi-line text

Optional theme enhancement after products exist:

- `custom.card_hover_image` - file reference. Use only for a deliberately selected detail shot. If empty, the card zooms its main image and will not expose an arbitrary second Shopify gallery image.

## Filters To Enable

In Shopify Search & Discovery, enable:

- Availability
- Product type
- Price
- Color
- Size
- Fit metafield
- Season metafield
- Drop metafield

The theme now renders Shopify native `collection.filters`, so the filters appear automatically after they are enabled.

## Fulfillment Notes

- Keep Shopify product variants synced with the selected Printful or Printify product and provider.
- Do not rename synced variants randomly after publishing; it can make fulfillment confusing.
- Make each product description include fit, material, care, and production/shipping expectations.
- Price products with returns/reprints in mind because print-on-demand returns can become your responsibility.
- Add provider-supplied GPSR operator, traceability, warning, and textile-composition information before publishing.
- Replace all concept mockups with approved physical sample photography before paid advertising.
