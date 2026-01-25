import { expect, type Locator, type Page } from "@playwright/test";

// Task: Verify Your Account

// Todo: Enter valid code bvy pressing the key-up button or typing number and assert sucess message.

export class VerifyAccountPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly code: Locator;
  readonly codeInputs: Locator;
  readonly success: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = this.page.getByRole('heading', { name: 'Verify Your Account' });
    this.code = this.page.locator(".info");
    this.codeInputs = this.page.locator(".code-container input");
    this.success = this.page.getByText("Success");
  }

  async goto() {
    await this.page.goto("/apps/verify-account");
  }

  async getConfirmationCode() {
    const textContent = await this.code.textContent();
    if (!textContent) {
      throw new Error("textContent for confirmation code is missing.");
    }
    const split = textContent.split(" ")[5]?.split("-");
    if (!split) {
      throw new Error("Failed to get confirmation code from textContent");
    }
    return split;
  }

  async enterCode(code: string[]) {
    const inputCount = await this.codeInputs.count();
    if (code.length !== inputCount) {
      throw new Error(`Confirmation code length: ${code.length} does not match input count: ${inputCount}`);
    }

    for (let i = 0; i < inputCount; i++) {
      const digit = code[i]!;
      const input = this.codeInputs.nth(i);
      await input.pressSequentially(digit);
      await expect(input).toHaveValue(digit);
    }
  }

  async enterCodeUpDown(code: string[]) {
    const inputCount = await this.codeInputs.count();
    if (code.length !== inputCount) {
      throw new Error(`Confirmation code length: ${code.length} does not match input count: ${inputCount}`);
    }

    for(let i = 0; i < inputCount; i++) {
      const digit = code[i]!;
      const input = this.codeInputs.nth(i);
      while ((await input.inputValue()) !== digit) {
        await input.press("ArrowUp", { delay: 100 });
      }
      await expect(input).toHaveValue(digit);
    }
  }
}