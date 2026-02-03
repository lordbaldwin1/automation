import { test as base, expect } from "@playwright/test";
import { NewTabPage } from "../pages/NewTabPage"


type Fixtures = {
  nt: NewTabPage;
};

const test = base.extend<Fixtures>({
  nt: async ({ page }, use) => {
    const ntPage = new NewTabPage(page);
    await ntPage.goto();
    await use(ntPage);
  },
});

test.describe("New Tab page tests", () => {
  test("Should open new tab", async ({ nt, context }) => {
     const newPage = await nt.openNewPage(context);
     await expect(newPage.getByRole("heading")).toHaveText("Welcome to the new page!");
  })
});
