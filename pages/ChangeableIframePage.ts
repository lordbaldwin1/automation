import { type FrameLocator, type Locator, type Page } from "@playwright/test";

// Assert that 53 seconds remain until the end of the countdown and a message that the journey is over

export class ChangeableIframePage {
  private readonly page: Page;

  readonly iframe: FrameLocator;
  readonly msg: Locator;
  readonly time: Locator;

  constructor(page: Page) {
    this.page = page;
    this.iframe = this.page.frameLocator("#frame1");
    this.msg = this.iframe.locator("#msg");
    this.time = this.iframe.locator("#time");
  }

  async goto() {
    await this.page.goto("/apps/changing-iframe");
  }
}