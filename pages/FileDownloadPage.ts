import { expect, type Locator, type Page } from "@playwright/test";
import path from "path";

// download a test file and assert the file's name and size

export class FileDownloadPage {
  private readonly page: Page;

  readonly downloadLink: Locator;
  readonly infoText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.downloadLink = this.page.getByRole("link", { name: "Download ⏬" });
    this.infoText = this.page.locator("#info");
  }

  async goto() {
    await this.page.goto("/apps/download");
  }

  async getFileName() {
    const name = await this.downloadLink.getAttribute("href");
    if (!name) {
      throw new Error("File name is missing from download link");
    }
    return name;
  }

  async downloadFile() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      await this.downloadLink.click(), // do we need await here?
    ]);

    return download;
  }
}