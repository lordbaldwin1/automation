import { test as base, expect } from "@playwright/test";
import { FileDownloadPage } from "../pages/FileDownloadPage";
import path from "path";
import fs from "fs";

const EXPECTED_DOWNLOAD_INFO_TEXT = "Click to download PDF file";
const EXPECTED_FILE_NAME = "sample.pdf";
const EXPECTED_FILE_SIZE = 1042157;

type Fixture = {
  fd: FileDownloadPage;
};

const test = base.extend<Fixture>({
  fd: async ({ page }, use) => {
    const fd = new FileDownloadPage(page);
    await fd.goto();

    await expect(fd.downloadLink).toBeVisible();
    await expect(fd.infoText).toHaveText(EXPECTED_DOWNLOAD_INFO_TEXT);
    const fileName = await fd.getFileName();
    expect(fileName).toMatch(EXPECTED_FILE_NAME);

    await use(fd);
  },
});

test.describe("File Download Tests", () => {
  test(`download file: ${EXPECTED_FILE_NAME} with size: ${EXPECTED_FILE_SIZE}kb`, async ({ fd }) => {
    const download = await fd.downloadFile();
    expect(download.suggestedFilename()).toMatch(EXPECTED_FILE_NAME);

    const fp = path.join(process.cwd(), "public", download.suggestedFilename());
    await download.saveAs(fp);
    expect(fs.existsSync(fp)).toBeTruthy();

    
    const fileStats = fs.statSync(fp);
    expect(fileStats.size).toEqual(EXPECTED_FILE_SIZE);

    fs.unlinkSync(fp);
  });
});