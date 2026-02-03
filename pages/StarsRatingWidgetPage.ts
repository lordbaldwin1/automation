import type { Locator, Page } from "@playwright/test";

// Task: Starts Rating Widget

// TODO: Set each available rate value and assert by image, text, and number

export class StarsRatingWidgetPage {
  private readonly page: Page;
  readonly stars: Locator;
  readonly images: Locator;
  readonly text: Locator;
  readonly number: Locator;

  constructor(page: Page) {
    this.page = page;
    this.stars = this.page.locator(".stars > label");
    this.images = this.page.getByRole("listitem");
    this.text = this.page.locator(".footer > .text");
    this.number = this.page.locator(".footer > .numb");
  }

  async goto() {
    await this.page.goto("/apps/rating")
  }

  async getPseudoContent(locator: Locator) {
    return await locator.evaluate((el) => {
      // @ts-ignore window giving error but this code always runs in the browser
      const style = window.getComputedStyle(el, "::before");
      return style.getPropertyValue("content").replace(/['"]/g, "");
    });
  }
}