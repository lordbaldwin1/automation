import { test as base, expect } from "@playwright/test";
import { PopupWindowPage } from "../pages/PopupWindowPage"


type Fixtures = {
  pw: PopupWindowPage;
};

const test = base.extend<Fixtures>({
  pw: async ({ page }, use) => {
    const pw = new PopupWindowPage(page);
    await pw.goto();
    await use(pw);
  }
});

test.describe("Popup Window tests", () => {
  test("Text should change when popup button is pressed", async ({ pw, context }) => {
    await expect(pw.msg).toHaveText("Click to open pop-up");

    const popup = await pw.openPopup(context);
    const submitBtn = popup.getByRole("button", { name: "Submit" });
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    await expect(pw.msg).toHaveText("Button Clicked");
  });
});

