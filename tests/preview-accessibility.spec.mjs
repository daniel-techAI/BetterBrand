import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const previewPages = [
  "index.html",
  "collection.html",
  "product.html",
  "cart.html",
  "account.html",
  "support.html",
  "about.html",
  "lookbook.html",
];

for (const previewPage of previewPages) {
  test(`${previewPage} has no serious accessibility or page-overflow failures`, async ({ page }) => {
    await page.goto(`preview/${previewPage}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("body[data-preview-mode='true']")).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    const blockingViolations = results.violations
      .filter(({ impact }) => impact === "critical" || impact === "serious")
      .map(({ id, impact, nodes }) => ({
        id,
        impact,
        targets: nodes.map(({ target }) => target),
      }));

    expect(blockingViolations).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
      ),
    ).toBe(true);
  });
}
