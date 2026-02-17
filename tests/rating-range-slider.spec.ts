import { test as base, expect } from "@playwright/test";
import { RatingRangeSliderPage } from "../pages/RatingRangeSliderPage";

type Fixture = {
  rr: RatingRangeSliderPage;
};

const test = base.extend<Fixture>({
  rr: async ({ page }, use) => {
    const rr = new RatingRangeSliderPage(page);
    await rr.goto();

    await expect(rr.sliderEmojis.nth(0)).toBeInViewport();
    await expect(rr.sendButton).toBeHidden();
    await expect(rr.tyMsg).toBeHidden();

    await use(rr);
  },
});

type SliderCase = {
  fill: string;
  emojiIdx: number;
}

const SliderCases: SliderCase[] = [
  {
    fill: "0",
    emojiIdx: 0
  },
  {
    fill: "25",
    emojiIdx: 1
  },
  {
    fill: "50",
    emojiIdx: 2
  },
  {
    fill: "75",
    emojiIdx: 3
  },
  {
    fill: "100",
    emojiIdx: 4
  },
];

test.describe("Rating Range Slider Page Tests", () => {
  SliderCases.forEach(({ fill, emojiIdx }) => {
    test(`Only slider value 50 can send feedback. Slide value: ${fill}, emoji: ${emojiIdx}. `, async ({ rr }) => {
      await rr.sliderInput.fill(fill);
      await expect(rr.sliderEmojis.nth(emojiIdx)).toBeInViewport();

      if (await rr.sliderInput.inputValue() !== "50") {
        await expect(rr.sendButton).toBeHidden();
        return;
      }

      await expect(rr.sendButton).toBeVisible();
      await rr.sendButton.click();
      await expect(rr.sendButton).toBeHidden();
      await expect(rr.tyMsg).toBeVisible();
    });
  });
});