import { type Locator, type Page } from "@playwright/test";

// click on each menu and sub-menu item and assert the message
export class ContextMenuPage {
  private readonly page: Page;
  
  readonly menuContent: Locator;
  readonly body: Locator;
  readonly msg: Locator;
  readonly shareMenu: Locator;


  constructor(page: Page) {
    this.page = page;
    this.menuContent = this.page.locator(".menu-content");

    this.body = this.page.locator("body");
    this.msg = this.page.locator("#msg");
    this.shareMenu = this.page.locator(".share-menu > li");
  }

  async goto() {
    await this.page.goto("/apps/context-menu");
  }

  async getListItem(name: string) {
    return this.menuContent.getByRole("listitem").filter({
      hasText: name,
    });
  }
}