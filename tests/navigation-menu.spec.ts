import { test as base, expect } from "@playwright/test";
import { NavigationMenuPage } from "../pages/NavigationMenuPage";

type Fixture = {
  nm: NavigationMenuPage;
};

const test = base.extend<Fixture>({
  nm: async ({ page }, use) => {
    const nm = new NavigationMenuPage(page);
    await nm.goto();
    await use(nm);
  },
});

test.describe("Navigation Menu Page Tests", () => {
  test("open each link and assert page content", async ({ nm }) => {
    const navItems = ["About", "Blog", "Portfolio", "Contact"];

    for (const item of navItems) {
      await nm.selectNavLink(item);
      await expect(nm.pageTitle).toHaveText(`Welcome to the ${item} Page`);
      await nm.goBack();
    }
  });
});