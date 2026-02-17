import { type Locator, type Page } from "@playwright/test";

// Create a QR code from some text and visually assert generated image

export class QRCodeGeneratorPage {
  private readonly page: Page;

  readonly input: Locator;
  readonly generateButton: Locator;
  readonly qrCode: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = this.page.getByRole("textbox");
    this.generateButton = this.page.getByRole("button", { name: "Generate QR Code" });
    this.qrCode = this.page.getByAltText("qr-code");
  }

  async goto() {
    await this.page.goto("/apps/qr-code-generator");
  }
}