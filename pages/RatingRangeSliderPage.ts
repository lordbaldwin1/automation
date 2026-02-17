import { type Locator, type Page } from "@playwright/test";

// Set slider value to 50 and submit feedback by clicking on the button

export class RatingRangeSliderPage {
  private readonly page: Page;

  readonly sendButton: Locator;
  readonly sliderEmojis: Locator;
  readonly sliderInput: Locator;
  readonly tyMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sendButton = this.page.getByRole("button", { name: "Send Feedback" });
    this.sliderEmojis = this.page.getByRole("listitem");
    this.sliderInput = this.page.getByRole("slider");
    this.tyMsg = this.page.getByText("Thank you for your feedback!")
  }

  async goto() {
    await this.page.goto("/apps/range-slider");
  }
}