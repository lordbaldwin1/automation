import { test as base, expect } from "@playwright/test";
import { MouseHoverPage } from "../pages/MouseHoverPage"

type Fixture = {
  mh: MouseHoverPage;
};

const test = base.extend<Fixture>({
  mh: async ({ page }, use) => {
    const mh = new MouseHoverPage(page);
    await mh.goto();
    await use(mh);
  },
});

test.describe("Mouse Hover Page Tests", () => {
  test("hover image and assert move price", async ({ mh }) => {
    const posterImage = await mh.getPosterImage("spider-man.jpg");
    await expect(posterImage).toBeVisible();
    await posterImage.hover();

    const {
      title,
      slogan,
      currentPrice,
      oldPrice,
      buyButton
    } = await mh.getPosterContent("Spider-Man: No Way Home");

    await expect(title).toHaveText("Spider-Man: No Way Home");
    await expect(slogan).toHaveText("The Multiverse unleashed.");
    await expect(currentPrice).toHaveText("$24.96");
    await expect(oldPrice).toHaveText("$38.99");
    await expect(buyButton).toBeVisible();
  });
});