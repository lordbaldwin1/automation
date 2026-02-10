import type { Locator, Page } from "@playwright/test";

// upload a file image and assert the file's name

export class FileUploadPage {
  private readonly page: Page;

  readonly numFilesText: Locator;
  readonly uploadButton: Locator;
  readonly files: Locator;

  constructor(page: Page) {
    this.page = page;
    this.numFilesText = this.page.locator("#num-of-files");
    this.uploadButton = this.page.locator(".btn-green-outline");
    this.files = this.page.getByRole("figure");
  }

  async goto() {
    await this.page.goto("/apps/upload");
  }

  async uploadFiles(filePaths: string[]) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent("filechooser"),
      await this.uploadButton.click(),
    ]);
    await fileChooser.setFiles(filePaths);
  }

  getFileName(filePath: string) {
    const split = filePath.split("/");
    if (!split[split.length - 1]) {
      throw new Error("File name not present in path");
    }
    return split[split.length - 1]!;
  }
}