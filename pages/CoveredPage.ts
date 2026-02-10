import type { Locator, Page } from "@playwright/test";


export class CoveredPage {
  private readonly page: Page;
  readonly btn: Locator;
  readonly info: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btn = this.page.getByRole("link", { name: "🐦You found me"});
    this.info = this.page.locator("#info");
  }

  async goto() {
    this.page.goto("/apps/covered");
  }
}