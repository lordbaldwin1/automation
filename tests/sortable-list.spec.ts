import { test as base } from "@playwright/test";
import { SortableListPage } from "../pages/SortableListPage"


type Fixtures = {
  slPage: SortableListPage;
}

const test = base.extend<Fixtures>({
  slPage: async ({ page }, use) => {
    const slPage = new SortableListPage(page);
    await slPage.goto();

    await use(slPage);
  }
});

test.describe("Sortable List tests", async () => {
  test("Names should be green when checked in correct order", async ({ slPage }) => {
    await slPage.sortList();
    await slPage.checkOrder();
    await slPage.verifyCorrectList();
  });
});