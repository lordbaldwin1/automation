import { expect, type Locator, type Page } from "@playwright/test";
import type { Entry } from "../tests/budget-tracker.spec";

// Add, modify, and remove income and expense records and assert their appearance, persistence, and the total amount

export class BudgetTrackerPage {
  private readonly page: Page;

  readonly table: Locator;
  readonly tableHeaders: Locator;
  readonly entryRows: Locator;

  readonly newEntryButton: Locator;
  readonly total: Locator;

  constructor(page: Page) {
    this.page = page;
    this.table = this.page.getByRole("table");
    this.tableHeaders = this.table.locator("th");
    this.entryRows = this.table.locator(".entries > tr");

    this.newEntryButton = this.page.getByRole("button", { name: "New Entry" });
    this.total = this.page.locator(".total");
  }

  async goto() {
    await this.page.goto("/apps/budget-tracker");
  }

  async addRecord(entry: Entry) {
    await this.newEntryButton.click();
    const rows = await this.entryRows.count();
    const row = this.entryRows.nth(rows - 1);

    const dateInput = row.locator(".input.input-date");
    const descriptionInput = row.locator(".input.input-description");
    const typeSelect = row.locator(".input.input-type");
    const amountInput = row.locator(".input.input-amount");

    await dateInput.fill(entry.date);
    await descriptionInput.fill(entry.description);
    await typeSelect.selectOption(entry.type);
    await amountInput.fill(entry.amount);
    await amountInput.blur();

    await expect(dateInput).toHaveValue(entry.date);
    await expect(descriptionInput).toHaveValue(entry.description);
    await expect(typeSelect).toHaveValue(entry.type);
    await expect(amountInput).toHaveValue(entry.amount);
  }

  async deleteRecord(entryIdx: number) {
    const row = this.entryRows.nth(entryIdx);
    await expect(row).toBeVisible();
    const delButton = row.getByRole("button", { name: "✕" });
    await delButton.click();
  }

  async validateRecords(entries: Entry[]) {
    await expect(this.entryRows).toHaveCount(entries.length);

    for (let i = 0; i < (await this.entryRows.count()); i++) {
      await expect(this.entryRows.nth(i)).toBeVisible();
      
      const entry = entries[i]!;
      const row = this.entryRows.nth(i);

      const dateInput = row.locator(".input.input-date");
      const descriptionInput = row.locator(".input.input-description");
      const typeSelect = row.locator(".input.input-type");
      const amountInput = row.locator(".input.input-amount");

      await expect(dateInput).toHaveValue(entry.date);
      await expect(descriptionInput).toHaveValue(entry.description);
      await expect(typeSelect).toHaveValue(entry.type);
      await expect(amountInput).toHaveValue(entry.amount);
    }
  }
}