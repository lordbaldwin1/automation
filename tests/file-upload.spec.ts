import { test as base } from "@playwright/test";
import { FileUploadPage } from "../pages/FileUploadPage";

type Fixture = {
  fu: FileUploadPage;
}

const test = base.extend<Fixture>({
  fu: async ({ page }, use) => {
    const fu = new FileUploadPage(page);
    await fu.goto();
    await use(fu);
  },
});

test.describe("File Upload Page tests", () => {
  test("Should show file name after upload", async ({ fu }) => {

  });
}); 