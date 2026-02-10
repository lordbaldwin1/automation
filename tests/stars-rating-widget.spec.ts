import { test as base, expect } from "@playwright/test";
import { StarsRatingWidgetPage } from "../pages/StarsRatingWidgetPage"

type SRWCase = {
  starIdx: number | null;
  expectedImageIdx: number;
  expectedText: string;
  expectedNumText: string;
};

type Fixtures = {
  srw: StarsRatingWidgetPage;
  cases: SRWCase[];
};

const expectedStates: SRWCase[] = [
  { starIdx: null, expectedImageIdx: 0, expectedText: "Rate your experience", expectedNumText: "0 out of 5" },
  { starIdx: 0, expectedImageIdx: 0, expectedText: "I just hate it", expectedNumText: "1 out of 5" },
  { starIdx: 1, expectedImageIdx: 1, expectedText: "I don't like it", expectedNumText: "2 out of 5" },
  { starIdx: 2, expectedImageIdx: 2, expectedText: "This is awesome", expectedNumText: "3 out of 5" },
  { starIdx: 3, expectedImageIdx: 3, expectedText: "I just like it", expectedNumText: "4 out of 5" },
  { starIdx: 4, expectedImageIdx: 4, expectedText: "I just love it", expectedNumText: "5 out of 5" },
];

const test = base.extend<Fixtures>({
  srw: async ({ page }, use) => {
    const srw = new StarsRatingWidgetPage(page);
    await srw.goto();
    await use(srw);
  },
  cases: async ({ }, use) => {
    await use(expectedStates);
  }
});

test.describe("Stars Rating Widget tests", () => {
  const selectedStarColor = "rgb(255, 221, 68)";
  const unselectedStarColor = "rgb(204, 204, 204)";
  expectedStates.forEach(({ starIdx, expectedImageIdx, expectedText, expectedNumText }) => {
    test(`${starIdx !== null ? starIdx + 1 : 0} stars should show image ${expectedImageIdx} with text '${expectedText}' and number text '${expectedNumText}'`, async ({ srw }) => {
      await srw.selectStar(starIdx);

      const text = await srw.getPseudoContent(srw.text);
      const numText = await srw.getPseudoContent(srw.numText);

      await expect(text).toMatch(expectedText);
      await expect(numText).toMatch(expectedNumText);
      await expect(srw.images.nth(expectedImageIdx)).toBeInViewport();
      if (starIdx !== null) {
        await expect(srw.stars.nth(starIdx)).toHaveCSS("color", selectedStarColor);
      } else {
        await expect(srw.stars.first()).toHaveCSS("color", unselectedStarColor);
      }
    });
  })
});