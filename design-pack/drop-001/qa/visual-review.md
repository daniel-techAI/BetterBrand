# Drop 001 QA Review

## Pass 1 - Artwork integrity

- Inspected the isolated reconstruction and confrontation illustrations against the generated masters.
- Found that the original fast pixel conversion retained only part of each figure.
- Replaced that conversion with deterministic per-pixel isolation and rebuilt the pack.
- Confirmed that the complete faces, skulls, halos, flowers, snakes, geometry, and lower fragments remain visible.

Result: passed after correction.

## Pass 2 - Composition and product use

- Reviewed every front, back, cap, sock, and sticker composition at output size.
- Corrected the missing visual space in `Emotionally unavailable` and regenerated the cap source.
- Confirmed that front and back files are separate, transparent files rather than cropped storefront mockups.
- Confirmed that each detailed print has a dark-garment and light-garment color treatment.
- Composited the light-garment files onto a cream review surface in `previews/light-garment-output-review.png` to verify contrast.

Result: passed after correction.

## Pass 3 - Export and provider readiness

- Validated 24 production PNGs through `asset-manifest.csv`.
- Confirmed 300 DPI metadata, alpha channels, expected pixel dimensions, and SHA-256 hashes.
- Sampled the transparent production output for chroma-key residue: zero matching green pixels found.
- Confirmed the largest production file is 7.64 MB, below provider and GitHub per-file limits.
- Confirmed the production overview contains the intended five apparel placements plus cap, sock, and sticker directions.

Result: production masters passed.

## Provider-dependent checks still required

These cannot be finalized until a specific blank and print provider are selected:

- Exact front and back print boundaries
- Hood, pocket, collar, hem, and seam interference
- Supported rear cap embroidery area
- Thread digitization and stitch count
- All-over sock template bleed and seam placement
- Physical print density, hand feel, garment fit, and color after a sample order

Do not publish a product until its generated mockups and one physical sample pass those checks.
