import type { Page } from "@playwright/test";

// Task: Shadow DOM

// TODO: Click on the button and assert that progress is on the 95 percent

export class ShadowDOMPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/apps/shadow-dom")
  }
}