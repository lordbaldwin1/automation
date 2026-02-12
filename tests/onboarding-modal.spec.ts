import { test as base, expect } from "@playwright/test";
import { OnboardingModalPage } from "../pages/OnboardingModalPage";

const MODAL_TEXT = "Welcome on board!";
const AFTER_MODAL_TEXT = "Welcome Peter Parker! 🕷🎉";
const NO_MODAL_TEXT = "Application successfully launched! 🚀"

type Fixture = {
  om: OnboardingModalPage;
};

const test = base.extend<Fixture>({
  om: async ({ page }, use) => {
    const om = new OnboardingModalPage(page);
    await om.goto();
    
    await expect(om.title).toBeVisible();
    await expect(om.modalText).toHaveText(MODAL_TEXT);

    await use(om);
  },
});

test.describe("Onboarding Modal Popup page tests", () => {
  test("Close modal popup if displayed and assert the message", async ({ om }) => {
    const isChecked = await om.popupButton.isChecked();

    if (isChecked) {
      await expect(om.modalText).toBeInViewport();
      await om.popupButton.setChecked(true);
      await expect(om.title).toHaveText(AFTER_MODAL_TEXT);
    } else {
      await expect(om.title).toHaveText(NO_MODAL_TEXT);
    }
  });
});