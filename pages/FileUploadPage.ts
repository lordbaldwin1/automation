import type { Page } from "@playwright/test";

// upload a file image and assert the file's name

export class FileUploadPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/apps/upload");
  }
}