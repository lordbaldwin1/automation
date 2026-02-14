import { test as base } from "@playwright/test";
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

  });
});