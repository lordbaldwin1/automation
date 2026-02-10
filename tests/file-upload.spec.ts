import { test as base, expect } from "@playwright/test";
import { FileUploadPage } from "../pages/FileUploadPage";
import path from "path";

type Fixture = {
  fu: FileUploadPage;
  filePaths: string[];
}

const test = base.extend<Fixture>({
  fu: async ({ page }, use) => {
    const fu = new FileUploadPage(page);
    await fu.goto();
    await use(fu);
  },
  filePaths: async ({ }, use) => {
    const filePaths = [
      path.join(process.cwd(), "public", "test-image1.jpg"),
      path.join(process.cwd(), "public", "test-image2.jpg"),
      path.join(process.cwd(), "public", "test-image3.jpg"),
      path.join(process.cwd(), "public", "test-image4.jpg"),
    ];
    await use(filePaths);
  },
});

test.describe("File Upload Page tests", () => {
  test("Should show file name after 1 file uploaded", async ({ fu, filePaths }) => {
    await expect(fu.uploadButton).toBeVisible();
    await expect(fu.numFilesText).toHaveText("No File Selected");

    const filePath = filePaths[0]!;
    await fu.uploadFiles([filePath]);

    await expect(fu.numFilesText).toHaveText("1 File Selected");
    await expect(fu.files).toHaveText(fu.getFileName(filePath));
  });

  test("Should show file names after uploading multiple files", async ({ fu, filePaths }) => {
    await expect(fu.uploadButton).toBeVisible();
    await expect(fu.numFilesText).toHaveText("No File Selected");

    await fu.uploadFiles(filePaths);

    await expect(fu.files).toHaveCount(filePaths.length);
    await expect(fu.numFilesText).toHaveText(`${filePaths.length} Files Selected`);
    for (let i = 0; i < filePaths.length; i++) {
      await expect(fu.files.nth(i)).toHaveText(fu.getFileName(filePaths[i]!))
    }
  });
}); 