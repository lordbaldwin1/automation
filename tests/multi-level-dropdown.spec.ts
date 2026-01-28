import test, { expect } from "@playwright/test";
import { MultiLevelDropdownPage } from "../pages/MultiLevelDropdownPage";


test.describe("Multi Level Dropdown Page", () => {
  let pg: MultiLevelDropdownPage;

  test.beforeEach(async ({ page }) => {
    pg = new MultiLevelDropdownPage(page);
    await pg.goto();
  });

  test("Validate first level of dropdown", async () => {
    const expectedHrefs = ["#undefined", "#settings", "#animals"];
    const expectedText = ["My Profile", "Settings", "Animals"];

    await pg.clickDropdown();

    await expect(pg.dropdown).toBeVisible();

    for (let i = 0; i < (await pg.dropdownItems.count()); i++) {
      await expect(pg.dropdownItems.nth(i)).toContainText(expectedText[i]!);
      await expect(pg.dropdownItems.nth(i)).toHaveAttribute("href", expectedHrefs[i]!);
    }
  });

  test("Validate settings sub-menu text and links", async () => {
    const expectedText = ["My Tutorial", "HTML", "CSS", "JavaScript", "Awesome"];
    const expectedHrefs = ["#main", "#!HTML", "#!CSS", "#!JavaScript", "#!Awesome"];
    await pg.clickDropdown();
    await pg.selectMenuOption("Settings");
    await pg.validateTextAndHrefs(expectedText, expectedHrefs);
  });

  test("Validate animals sub-menu text and links", async () => {
    const expectedText = ["Animals", "🦘Kangaroo", "🐸Frog", "🦋Horse", "🦔Hedgehog"];
    const expectedLinks = ["#main", "#!Kangaroo", "#!Frog", "#!Horse", "#!Hedgehog"];
    await pg.clickDropdown();
    await pg.selectMenuOption("Animals");
    await pg.validateTextAndHrefs(expectedText, expectedLinks);
  });
});