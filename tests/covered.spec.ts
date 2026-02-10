import { test as base, expect } from "@playwright/test";
import { CoveredPage } from "../pages/CoveredPage";

type Fixture = {
  covp: CoveredPage;
};

const test = base.extend<Fixture>({
  covp: async ({ page }, use) => {
    const covp = new CoveredPage(page);
    await covp.goto();
    await use(covp);
  }
})

test.describe("Covered Element Page Tests", () => {
  test("asd", async ({ covp }) => {
    await expect(covp.btn).toBeVisible();
    await covp.btn.click();
    await expect(covp.info).toHaveText("Mission accomplished");
  });
});