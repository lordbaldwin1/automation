import test, { expect } from "@playwright/test";
import { VerifyAccountPage } from "../pages/VerifyAccountPage";


test.describe("Verify Account", () => {
  let vaPage: VerifyAccountPage;

  test.beforeEach(async ({ page }) => {
    vaPage = new VerifyAccountPage(page);
    await vaPage.goto();
  });

  test("Heading should be present", async () => {
    await expect(vaPage.heading).toHaveText("Verify Your Account")
  });

  test("Code should be present", async () => {
    const code = await vaPage.getConfirmationCode();
    expect(code).toHaveLength(6);
  });

  test("Should solve by entering code numbers", async () => {
    const code = await vaPage.getConfirmationCode();
    await vaPage.enterCode(code);
    await expect(vaPage.success).toBeVisible();
  });

  test("Should solve by entering code up/down keys", async () => {
    const code = await vaPage.getConfirmationCode();
    await vaPage.enterCodeUpDown(code);
    await expect(vaPage.success).toBeVisible();
  });

  test("Should not solve with incorrect code", async () => {
    const code = ["1", "2", "3", "4", "5", "6"];
    await vaPage.enterCode(code);
    await expect(vaPage.success).toBeHidden();
  });
});