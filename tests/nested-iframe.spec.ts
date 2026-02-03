import { test as base, expect } from "@playwright/test";
import { NestedIframePage } from "../pages/NestedIframePage"


type Fixtures = {
  ni: NestedIframePage;
};

const test = base.extend<Fixtures>({
  ni: async ({ page }, use) => {
    const ni = new NestedIframePage(page);
    await ni.goto();
    await use(ni);
  },
});

test.describe("Nested Iframe tests", () => {
  test("Should click button in nested iframe and asset success message", async ({ ni }) => {
    await expect(ni.btn).toBeVisible();
    await expect(ni.msg).toBeHidden();

    await ni.btn.click();
    
    await expect(ni.msg).toBeVisible();
    await expect(ni.msg).toHaveText("Button Clicked");
  });
});