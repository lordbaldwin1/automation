import type { BrowserContext, Locator, Page } from "@playwright/test";

// Task: New Tab

// TODO: Open new tab by clicking on the button and assert text on the opened new page

export class NewTabPage {
  readonly page: Page;
  private readonly newTabBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTabBtn = this.page.getByRole("link", { name: "Open New Tab" });
  }

  async goto() {
    await this.page.goto("/apps/new-tab");
  }

  async openNewPage(context: BrowserContext) {
    const pagePromise = context.waitForEvent("page");
    await this.newTabBtn.click();
    return await pagePromise;
  }
}