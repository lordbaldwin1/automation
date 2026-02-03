import type { FrameLocator, Locator, Page } from "@playwright/test";

// Task: Nested Iframe

// TODO: Click on the button in the iframe that is in another iframe and assert a success message

export class NestedIframePage {
  private readonly page: Page;
  private readonly nestedFrame: FrameLocator;
  readonly btn: Locator;
  readonly msg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nestedFrame = this.page.frameLocator("#frame1").frameLocator("#frame2");
    this.btn = this.nestedFrame.getByRole("link", { name: "Click Me" });
    this.msg = this.nestedFrame.locator("#msg");
    
  }

  async goto() {
    await this.page.goto("/apps/iframe")
  }
}