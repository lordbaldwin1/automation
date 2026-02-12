import { test as base, expect } from "@playwright/test";
import { BudgetTrackerPage } from "../pages/BudgetTrackerPage";
import { TEST_CASES } from "../data/budget-tracker-data";

export type Entry = {
  date: string;
  description: string;
  type: "income" | "expense";
  amount: string;
  toDelete: boolean;
};

export type TestCase = {
  entries: Entry[];
  total: string;
  endCount: number;
};

type Fixture = {
  bt: BudgetTrackerPage;
};

const test = base.extend<Fixture>({
  bt: async ({ page }, use) => {
    const bt = new BudgetTrackerPage(page);
    await bt.goto();

    await use(bt);
  },
});

test.describe("Budget Tracker Page Tests", () => {
  TEST_CASES.forEach(({ entries, total, endCount }) => {
    test(`${entries.length} entries, with total: ${total} and end entry count: ${endCount}`, async ({ bt, page }) => {
      for (const entry of entries) {
        await bt.addRecord(entry);
      }

      for (let i = (await bt.entryRows.count() - 1); i >= 0; i--) {
        if (entries[i]?.toDelete) {
          await bt.deleteRecord(i);
        }
      }

      await expect(bt.entryRows).toHaveCount(endCount);
      await expect(bt.total).toHaveText(total);

      await page.reload();

      await expect(bt.entryRows).toHaveCount(endCount);
      await expect(bt.total).toHaveText(total);
    });
  })
});