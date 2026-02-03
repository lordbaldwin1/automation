import { test as base } from "@playwright/test";
import { ShadowDOMPage } from "../pages/ShadowDOMPage"


type Fixtures = {
  sd: ShadowDOMPage;
};

const test = base.extend<Fixtures>({
  sd: async ({ page }, use) => {
    const sd = new ShadowDOMPage(page);
    await sd.goto();
    await use(sd);
  },
});

test.describe("Shadow DOM tests", () => {
  test("Should click button and assert progress is 95 percent", async ({ sd }) => {

  });
});

