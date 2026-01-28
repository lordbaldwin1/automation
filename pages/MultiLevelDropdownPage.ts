import { expect, type Locator, type Page } from "@playwright/test";

// Task: Multi Level Dropdown

// Todo: Navigate into the sub-menus and assert menu items text and link

export class MultiLevelDropdownPage {
  private readonly page: Page;
  private readonly dropdownBtn: Locator;
  readonly dropdown: Locator;
  readonly dropdownItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dropdownBtn = this.page.getByRole("listitem").last();
    this.dropdown = this.dropdownBtn.locator(".dropdown");
    this.dropdownItems = this.dropdown.locator(".menu-item").filter({ visible: true });
  }

  async goto() {
    this.page.goto("/apps/multi-level-dropdown")
  }

  async clickDropdown() {
    await this.dropdownBtn.click();
  }

  async clickDropdownItem(item: string) {
    const listItem = this.dropdownItems.filter({ hasText: item });
    await listItem.click();
  }

  async selectMenuOption(name: string) {
    await this.dropdownItems.filter({ hasText: name }).click();
  }

  async validateTextAndHrefs(expectedText: string[], expectedHrefs: string[]) {
    await expect(this.dropdownItems).toContainText(expectedText);

    for (let i = 0; i < (await this.dropdownItems.count()); i++) {
      await expect(this.dropdownItems.nth(i)).toHaveAttribute("href", expectedHrefs[i]!)
    }
  }
}