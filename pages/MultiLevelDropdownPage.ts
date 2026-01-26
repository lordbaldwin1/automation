import type { Locator, Page } from "@playwright/test";


export class MultiLevelDropdownPage {
  readonly page: Page;
  readonly dropdownBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dropdownBtn = this.page.getByRole("listitem").last();
  }

  async goto() {
    this.page.goto("/apps/multi-level-dropdown")
  }
}