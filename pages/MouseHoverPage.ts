import { expect, type Locator, type Page } from "@playwright/test";

// put mouse pointer on an image and assert movie price

export class MouseHoverPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/apps/mouse-hover");
  }
}