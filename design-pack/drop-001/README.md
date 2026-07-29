# R/CREATION Drop 001 Production Pack

This folder contains the refined, transparent artwork files for the first R/CREATION collection. Upload files from `production/` to Printify or Printful. The files in `sources/` are build inputs and should not be uploaded as product artwork.

## Product file map

| Product | Placement | Upload file |
| --- | --- | --- |
| Rebuild Yourself Crop Hoodie | Front | `production/print/01-embrace-the-chaos-front-dark-garment.png` |
| Rebuild Yourself Crop Hoodie | Back | `production/print/03-rebuild-yourself-back-dark-garment.png` |
| Face What You Hide Hoodie | Front | `production/print/02-break-the-loop-front-dark-garment.png` |
| Face What You Hide Hoodie | Back | `production/print/04-face-what-you-hide-back-dark-garment.png` |
| Embrace The Chaos Crop Tee | Front | `production/print/01-embrace-the-chaos-front-dark-garment.png` |
| Break The Loop Heavy Tee | Front | `production/print/02-break-the-loop-front-dark-garment.png` |
| Break The Loop Heavy Tee | Back | `production/print/05-nothing-is-permanent-back-dark-garment.png` |
| Unavailable Edition Cap | Front embroidery | `production/embroidery/cap-unavailable-front-embroidery-source.png` |
| Unavailable Edition Cap | Rear embroidery | `production/embroidery/cap-unavailable-rear-embroidery-source.png` |
| Prison Edition Cap | Front embroidery | `production/embroidery/cap-prison-front-embroidery-source.png` |
| Prison Edition Cap | Rear embroidery | `production/embroidery/cap-prison-rear-embroidery-source.png` |
| Architecture Socks - black | All-over tile | `production/patterns/architecture-socks-black-seamless-tile.png` |
| Architecture Socks - bone | All-over tile | `production/patterns/architecture-socks-bone-seamless-tile.png` |
| Emotional Sticker Set | Individual stickers | All four files in `production/stickers/` |

Use the `dark-garment` files on black, charcoal, deep grey, navy, or other dark blanks. Use the matching `light-garment` files on bone, cream, white, pale grey, or other light blanks. Do not upload both color versions to the same product color.

## Printify or Printful workflow

1. Choose the exact product blank and print provider first. Each blank has a different print area.
2. Open that product in Printify Product Creator or Printful Design Maker.
3. Upload the mapped transparent PNG from `production/`.
4. Assign each file to the correct front, back, embroidery, or all-over-print area.
5. Scale the design inside the provider's safe area. Keep all text and faces away from warning lines, seams, pockets, and the hood.
6. Review every color and every size in the mockup generator. Remove any garment color where the artwork loses contrast.
7. Save as a draft, order one sample, and approve the physical result before publishing.

Suggested starting placement only:

- Full back art: about 11.5 to 13 inches wide, centered, with the top below the collar or hood seam.
- Statement front art: about 8 to 10 inches wide, centered on the chest.
- Crop garments: reduce the height until the complete design remains above the hem.

The provider template is authoritative. Reduce the physical size if its quality meter reports low resolution; never enlarge the PNG outside the provider's recommended print area.

## Method notes

- Hoodies and tees: use DTG or the provider's equivalent full-color garment printing. The detailed engraved artwork is not intended for standard embroidery.
- Caps: the PNG and SVG files are clean digitizing sources, not machine-ready DST files. The provider creates the embroidery file. Rear embroidery only works on blanks that expose a supported rear location.
- Socks: fill the exact all-over-print template, including bleed. Keep the phrase and main loop away from heel, toe, cuff, and seam boundaries because placement can shift during production.
- Stickers: upload the four transparent PNGs separately. Let the provider generate the cut line and inspect it around the border before publishing.
- Storefront model photos and mockups are previews only. Never use a mockup JPG as print artwork.

## Technical QA

- 24 production PNG files
- Transparent backgrounds
- 300 DPI metadata
- Print files up to 4500 x 5400 px
- Largest production file: 7.64 MB
- Zero sampled chroma-key pixels in the production export

The complete metadata and checksums are in `qa/asset-manifest.csv`. The visual review is in `qa/visual-review.md`.

## Rebuild the pack

Run from this directory in PowerShell:

```powershell
.\tools\build-assets.ps1
.\tools\build-review-previews.ps1
```

The build is deterministic from the included source illustrations and recreates the production PNGs, previews, and manifest.
