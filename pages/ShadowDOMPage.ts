import type { Locator, Page } from "@playwright/test";

// Task: Shadow DOM

// TODO: Click on the button and assert that progress is on the 95 percent

export class ShadowDOMPage {
  private readonly page: Page;
  readonly boostBtn: Locator;
  readonly progressBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.boostBtn = this.page.getByRole("button", { name: "Boost 🚀"});
    this.progressBar = this.page.locator(".fill");
  }

  async goto() {
    await this.page.goto("/apps/shadow-dom")
  }
}