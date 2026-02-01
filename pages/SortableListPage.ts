import { expect, type Locator, type Page } from "@playwright/test";

// Task: Sortable List

// TODO: Drag and drop list items to make the correct order and then click on the button and assert that all have green text

export const topList = [
  { position: 0, name: "Jeff Bezos" },
  { position: 1, name: "Bill Gates" },
  { position: 2, name: "Warren Buffett" },
  { position: 3, name: "Bernard Arnault" },
  { position: 4, name: "Carlos Slim Helu" },
  { position: 5, name: "Amancio Ortega" },
  { position: 6, name: "Larry Ellison" },
  { position: 7, name: "Mark Zuckerberg" },
  { position: 8, name: "Michael Bloomberg" },
  { position: 9, name: "Larry Page" },
];

export class SortableListPage {
  private readonly page: Page;
  private readonly listItems: Locator;
  private readonly checkBtn: Locator;
  readonly list: Locator;

  constructor(page: Page) {
    this.page = page;
    this.listItems = this.page.getByRole("listitem");
    this.checkBtn = this.page.locator(".check-btn");
    this.list = this.page.getByRole("list");
  }

  async goto() {
    await this.page.goto("/apps/sortable-list/");
  }

  async sortList() {
    await expect(this.listItems).toHaveCount(topList.length);
    for (let i = 0; i < (await this.listItems.count()); i++) {
      const targetItem = topList[i]!

      const currentPosText = await this.listItems.filter({ hasText: targetItem.name }).locator(".number").textContent();
      const currentPosition = Number(currentPosText!) - 1;
      const distance = currentPosition - targetItem.position;

      if (distance === 0) continue;

      for (let pos = currentPosition; pos > targetItem.position; pos--) {
        const targetPos = pos - 1;
        if (pos - targetItem.position !== 0) {
          await this.listItems.nth(targetPos).scrollIntoViewIfNeeded();
        }

        const curRow = this.listItems.filter({ hasText: targetItem.name });
        const tempTarget = this.listItems.nth(targetPos);
        await curRow.dragTo(tempTarget);

        // drag fails sometimes?
        if ((await this.listItems.nth(targetPos).textContent()) !== targetItem.name) {
          await curRow.dragTo(tempTarget);
        }
      }
    }
  }

  async checkOrder() {
    await this.checkBtn.click();
  }

  async verifyCorrectList() {
    for (let i = 0; i < (await this.list.count()); i++) {
      await expect(this.listItems.nth(i).locator(".person-name")).toHaveCSS("color", "rgb(58, 227, 116)");
    }
  }

}