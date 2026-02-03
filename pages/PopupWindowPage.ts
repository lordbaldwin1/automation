import type { BrowserContext, Locator, Page } from "@playwright/test";

// Task: Pop-Up Window

// TODO: Open pop-up and click on the button in it and asset text on the main window

export class PopupWindowPage {
  private readonly page: Page;
  private readonly openBtn: Locator;
  readonly msg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openBtn = this.page.getByRole("link", { name: "Open" });
    this.msg = this.page.locator("#info");
  }

  async goto() {
    await this.page.goto("/apps/popup")
  }

  async openPopup(context: BrowserContext) {
    const popupPromise = context.waitForEvent("page");
    await this.openBtn.click();
    return await popupPromise;
  }
}