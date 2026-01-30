import { expect, test as base } from "@playwright/test";
import { MultiLevelDropdownPage } from "../pages/MultiLevelDropdownPage";

type Fixtures = {
  mldPage: MultiLevelDropdownPage;
};

const test = base.extend<Fixtures>({
  mldPage: async ({ page }, use) => {
    const mldPage = new MultiLevelDropdownPage(page);
    await mldPage.goto();
    await mldPage.clickDropdown();
    await use(mldPage);
  }
});

test.describe("Multi Level Dropdown Page", () => {
  test("Validate first level of dropdown", async ({ mldPage }) => {
    const expectedHrefs = ["#undefined", "#settings", "#animals"];
    const expectedText = ["My Profile", "Settings", "Animals"];

    await expect(mldPage.dropdown).toBeVisible();
    for (let i = 0; i < (await mldPage.dropdownItems.count()); i++) {
      await expect(mldPage.dropdownItems.nth(i)).toContainText(expectedText[i]!);
      await expect(mldPage.dropdownItems.nth(i)).toHaveAttribute("href", expectedHrefs[i]!);
    }
  });

  test("Validate settings sub-menu text and links", async ({ mldPage }) => {
    const expectedText = ["My Tutorial", "HTML", "CSS", "JavaScript", "Awesome"];
    const expectedHrefs = ["#main", "#!HTML", "#!CSS", "#!JavaScript", "#!Awesome"];

    await mldPage.selectMenuOption("Settings");
    await mldPage.validateTextAndHrefs(expectedText, expectedHrefs);
  });

  test("Validate animals sub-menu text and links", async ({ mldPage }) => {
    const expectedText = ["Animals", "🦘Kangaroo", "🐸Frog", "🦋Horse", "🦔Hedgehog"];
    const expectedLinks = ["#main", "#!Kangaroo", "#!Frog", "#!Horse", "#!Hedgehog"];

    await mldPage.selectMenuOption("Animals");
    await mldPage.validateTextAndHrefs(expectedText, expectedLinks);
  });
});