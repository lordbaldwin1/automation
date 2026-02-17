import { test as base, expect } from "@playwright/test";
import { ChangeableIframePage } from "../pages/ChangeableIframePage";

type Fixture = {
  ci: ChangeableIframePage;
};

const test = base.extend<Fixture>({
  ci: async ({ page }, use) => {
    const ci = new ChangeableIframePage(page);
    await ci.goto();
    await expect(page.locator("#frame1")).toBeVisible();
    await use(ci);
  },
});

test.describe("Changeable Iframe Page Tests", () => {
  test("53 seconds remain until the end of countdown and message after is shown", async ({ ci }) => {
    await expect(ci.time).toHaveText("00:53", { timeout: 10000 });
    await expect(ci.msg).toHaveText("This is the end of the journey");
  });
});