import test, { expect } from "@playwright/test";
import { DynamicTablePage } from "../pages/DynamicTablePage";

test.describe("Dynamic Table", () => {
  let dtPage: DynamicTablePage;

  test.beforeEach(async ({ page }) => {
    dtPage = new DynamicTablePage(page);
    await dtPage.goto();
  });

  test("table is present", async () => {
    await expect(dtPage.table).toBeVisible();
  });

  test("table headers are Superhero, Status, Real Name", async () => {
    await expect(dtPage.headers).toContainText(["Superhero", "Status", "Real Name"]);
  });

  test("table contains Spider-Man with real name Peter Parker", async () => {
    const row = dtPage.getRowByHero("Spider-Man");
    const cell = dtPage.getCellInRow(row, "Real Name");
    await expect(cell).toContainText("Peter Parker");
  });
});

test('test', async ({ page }) => {
  await page.goto('https://qaplayground.dev/apps/dynamic-table/');
  await expect(page.locator('#tbody')).toContainText('Peter Parker');
});