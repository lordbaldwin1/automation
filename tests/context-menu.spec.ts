import { test as base, expect } from "@playwright/test";
import { ContextMenuPage } from "../pages/ContextMenuPage";

type Fixture = {
  cm: ContextMenuPage;
};

const test = base.extend<Fixture>({
  cm: async ({ page }, use) => {
    const cm = new ContextMenuPage(page);
    await cm.goto();

    await use(cm);
  },
});

type TestCase = {
  menuItem: string;
  message: string;
};

const CASES: TestCase[] = [
  {
    menuItem: "Preview",
    message: "Menu item Preview clicked",
  },
  {
    menuItem: "Get Link",
    message: "Menu item Get Link clicked",
  },
  {
    menuItem: "Rename",
    message: "Menu item Rename clicked",
  },
  {
    menuItem: "Delete",
    message: "Menu item Delete clicked",
  },
  {
    menuItem: "Settings",
    message: "Menu item Settings clicked",
  }
]

test.describe("Context Menu Page Tests", () => {
  CASES.forEach(({ menuItem, message }) => {
    test(`when ${menuItem} is clicked, message is ${message}`, async ({ cm }) => {
      await expect(cm.msg).toHaveText("Open Right-Click Context Menu");
      await cm.body.click({ button: "right" });
      await expect(cm.menuContent).toBeVisible();

      const item = await cm.getListItem(menuItem);
      await expect(item).toBeVisible();

      await item.click();
      await expect(cm.msg).toHaveText(message);
    });
  });

  test("Share menu test", async ({ cm }) => {
    const expectedItems = ["Twitter", "Instagram", "Dribble", "Telegram"];

    await expect(cm.msg).toHaveText("Open Right-Click Context Menu");
    await cm.body.click({ button: "right" });
    await expect(cm.menuContent).toBeVisible();

    const item = await cm.getListItem("Share");
    await expect(item).toBeVisible();
    await item.hover();

    const subItems = item.getByRole("listitem");

    for (let i = 0; i < (await subItems.count()); i++) {
      const subItem = subItems.filter({ hasText: expectedItems[i] });
      await subItem.click();
      await expect(cm.msg).toHaveText(`Menu item ${expectedItems[i]} clicked`);

      await cm.body.click({ button: "right" });
      const share = await cm.getListItem("Share");
      await share.hover();
    }
  });
});