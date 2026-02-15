import { expect, type Locator, type Page } from "@playwright/test";

// Create a QR code from some text and visually assert generated image

export class QRCodeGeneratorPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/apps/qr-code-generator");
  }
}