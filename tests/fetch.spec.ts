import test, { expect } from "@playwright/test";


test.describe("Fetch Page Tests", () => {
  test("wait for posts request and assert post count", async ({ page }) => {
    const responsePromise = page.waitForResponse("https://jsonplaceholder.typicode.com/posts");

    await Promise.all([
      page.goto("/apps/fetch"),
      responsePromise,
    ])
    expect(await page.locator(".icard").count()).toBeGreaterThan(50);
  });
});