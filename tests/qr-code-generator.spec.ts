import { test as base, expect } from "@playwright/test";
import { QRCodeGeneratorPage } from "../pages/QRCodeGeneratorPage";

type Fixture = {
  qr: QRCodeGeneratorPage;
};

const test = base.extend<Fixture>({
  qr: async ({ page }, use) => {
    const qr = new QRCodeGeneratorPage(page);
    await qr.goto();
    await use(qr);
  },
});

test.describe("QR Code Generator Page Tests", () => {
  test("Create QR code from text and assert generated image appearance", async ({ qr }) => {
    const inputText = "epicguy12!";
    await qr.input.fill(inputText);
    await qr.generateButton.click();
    await expect(qr.qrCode).toBeVisible();
    await expect(qr.qrCode).toHaveScreenshot();
  });
});