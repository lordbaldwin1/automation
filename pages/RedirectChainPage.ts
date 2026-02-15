import { expect, type Locator, type Page } from "@playwright/test";

// Click on the button and assert each redirected page

export class RedirectChainPage {
  private readonly page: Page;
  
  readonly redirectButton: Locator;
  readonly infoText: Locator;
  readonly goBackLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.redirectButton = this.page.getByRole("link", { name: "Start Redirection chain" });
    this.infoText = this.page.locator("#info");
    this.goBackLink = this.page.getByRole("link", { name: "Go Back" });
  }

  async goto() {
    await this.page.goto("/apps/redirect");
  }

  async startRedirectionChain() {
    await expect(this.redirectButton).toBeVisible();
    await this.redirectButton.click();
  }

  waitForRedirect(includes: string) {
    return this.page.waitForResponse((response) => {
      return response.url().includes(includes);
    });
  }
}