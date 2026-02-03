import { test as base, expect } from "@playwright/test";
import { StarsRatingWidgetPage } from "../pages/StarsRatingWidgetPage"


type Fixtures = {
  srw: StarsRatingWidgetPage;
};

const test = base.extend<Fixtures>({
  srw: async ({ page }, use) => {
    const srw = new StarsRatingWidgetPage(page);
    await srw.goto();
    await use(srw);
  },
});

test.describe("Stars Rating Widget tests", () => {
  test("Should set each rate value and assert image, text, and number", async ({ srw }) => {
    const expectedText = [
      "Rate your experience",
      "I just hate it",
      "I don't like it",
      "This is awesome",
      "I just like it",
      "I just love it",
    ];
    const expectedNumb = [
      "0 out of 5",
      "1 out of 5",
      "2 out of 5",
      "3 out of 5",
      "4 out of 5",
      "5 out of 5",
    ];
    await expect(srw.images).toHaveCount(5);
    await expect(srw.stars).toHaveCount(5);
    await expect(srw.text).toBeVisible();
    await expect(srw.number).toBeVisible();
    // loop through each rating, assert image, text, star:checked, and number
  });
});