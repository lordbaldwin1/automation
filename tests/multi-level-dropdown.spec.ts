import test from "@playwright/test";
import { MultiLevelDropdownPage } from "../pages/MultiLevelDropdownPage";


test.describe("Multi Level Dropdown Page", () => {
  let pg: MultiLevelDropdownPage;

  test.beforeEach(async ({ page }) => {
    pg = new MultiLevelDropdownPage(page);
    pg.goto();
  });
})