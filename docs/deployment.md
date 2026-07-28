# Safe Shopify deployment

Theme delivery is separate from publishing the store. The default target is always a new or existing **unpublished** theme.

## 1. Validate

```bash
shopify theme check --path . --fail-level error
git diff --check
```

Review `git status` and confirm that the repository contains no `.env`, token, customer export, Shopify ZIP, or unrelated store file.

## 2. Choose one unpublished delivery route

### Create a new draft with Shopify CLI

```bash
shopify theme push --unpublished --strict --store your-store.myshopify.com --path .
```

Save the returned theme ID, editor URL, preview URL, source commit, date, and operator in a private release record.

### Update an existing draft

First identify the target and verify its role:

```bash
shopify theme list --store your-store.myshopify.com --json
```

Then push by exact ID:

```bash
shopify theme push --theme THEME_ID --strict --store your-store.myshopify.com --path .
```

Stop if the target is reported as live. Routine deployments must not use `--live`, `--allow-live`, or `--publish`.

### Upload a ZIP in Shopify Admin

```bash
shopify theme package --path .
```

In Shopify Admin, go to `Online Store > Themes`, choose `Add theme > Upload zip file`, and upload the generated archive. Shopify CLI packages only recognized theme directories; repository docs and static preview pages are not part of the theme ZIP.

## 3. Verify the draft

- Confirm the theme role remains unpublished.
- Preview home, collection, search, product, cart, policies, contact, account, and withdrawal routes.
- Test real draft products and every launch variant, including unavailable combinations.
- Verify currency, localization, taxes, shipping estimates, consent controls, policy links, and notification copy.
- Test add/update/remove cart behavior and a Shopify test payment without releasing fulfillment.
- Review desktop and physical mobile devices.

## 4. Publish deliberately

Publishing is a separate owner decision inside Shopify Admin. Do it only after every blocker in [shopify-launch-checklist.md](shopify-launch-checklist.md) is complete and a rollback draft exists. Record the published theme ID, source commit, timestamp, reviewer, and previous live theme.

## Rollback

Keep the previous live theme in the theme library. If a launch regression appears, republish that known-good theme in Shopify Admin, document the incident, and fix forward in a new draft. Theme rollback does not restore products, markets, policies, navigation, apps, or other Shopify Admin data; back those up separately.
