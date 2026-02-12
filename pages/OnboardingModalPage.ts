import { type Locator, type Page } from "@playwright/test";

// download a test file and assert the file's name and size

export class OnboardingModalPage {
  private readonly page: Page;
  
  readonly title: Locator;
  readonly popupButton: Locator;
  readonly modalText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = this.page.locator(".title");
    this.popupButton = this.page.locator("#active");
    this.modalText = this.page.getByRole("link", { name: "Welcome on board!" });
  }

  async goto() {
    await this.page.goto("/apps/onboarding-modal");
  }
}