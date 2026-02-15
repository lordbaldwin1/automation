import test, { expect } from "@playwright/test";


test.describe("Fetch Page Tests", () => {
  test("wait for posts request and assert post count", async ({ page }) => {
    await page.goto("/apps/fetch");
    expect(await page.locator(".icard").count()).toBeGreaterThan(50);
  });
});