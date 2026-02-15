import { expect, type BrowserContext, type Locator, type Page } from "@playwright/test";

// Open each link in a new window and assert the page's content

export class NavigationMenuPage {
  private readonly page: Page;

  private readonly navbar: Locator;
  private readonly backButton: Locator;
  
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = this.page.locator("#nav");
    this.backButton = this.page.getByRole("link", { name: "Go Back" });
    this.pageTitle = this.page.locator("#title");
  }

  async goto() {
    await this.page.goto("/apps/links");
  }

  async selectNavLink(name: string) {
    await expect(this.navbar).toBeVisible();
    const link = this.navbar.getByRole("link", { name });
    await link.click();
  }

  async goBack() {
    await expect(this.backButton).toBeVisible();
    await this.backButton.click();
  }
}