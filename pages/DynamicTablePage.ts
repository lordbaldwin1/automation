import { expect, type Locator, type Page } from "@playwright/test";

// Task: Dynamic Table

// Find the Spider-Man in a table that changes the order of rows and assert his real name

export class DynamicTablePage {
  readonly page: Page;
  readonly table: Locator;

  readonly headers: Locator;
  readonly rows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.table = page.getByRole("table");
    this.headers = this.table.getByRole("columnheader");
    this.rows = this.table.locator("tbody > tr");
  };

  async goto() {
    await this.page.goto("/apps/dynamic-table");
  }

  getRowByHero(name: string) {
    return this.rows.filter({ hasText: name });
  }

  getCellInRow(row: Locator, columnName: string) {
    return row.getByRole("cell").nth(this.getColumnIndex(columnName));
  }

  private columnNames = ["Superhero", "Status", "Real Name"];

  private getColumnIndex(columnName: string) {
    return this.columnNames.indexOf(columnName);
  }
}