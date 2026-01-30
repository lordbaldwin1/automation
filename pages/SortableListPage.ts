import type { Page } from "@playwright/test";

// Task: Sortable List

// TODO: Drag and drop list items to make the correct order and then click on the button and assert that all have green text

const topList = [
  { position: 1, name: "Jeff Bezos" },
  { position: 2, name: "Bill Gates" },
  { position: 3, name: "Warren Buffett" },
  { position: 4, name: "Bernard Arnault" },
  { position: 5, name: "Carlos Slim Helu" },
  { position: 6, name: "Amancio Ortega" },
  { position: 7, name: "Larry Ellison" },
  { position: 8, name: "Mark Zuckerberg" },
  { position: 9, name: "Michael Bloomberg" },
];

export class SortableListPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/apps/sortable-list/");
  }
}