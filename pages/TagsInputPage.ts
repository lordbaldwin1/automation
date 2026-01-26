import { expect, type Locator, type Page } from "@playwright/test";

// Task: Tags Input Box

// Todo: Add and remove tags and assert tag's presence and count

export class TagsInputPage {
  readonly page: Page;
  readonly title: Locator;
  readonly tags: Locator;
  readonly input: Locator;
  readonly remaining: Locator;
  readonly removeAllBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = this.page.getByRole("heading", { name: "Tags", exact: true });
    this.tags = this.page.getByRole("listitem");
    this.input = this.page.getByRole("textbox");
    this.removeAllBtn = this.page.getByRole("button", { name: "Remove All" });
    this.remaining = this.page.locator(".details >> span");
  }

  async goto() {
    await this.page.goto("/apps/tags-input-box")
  }

  async expectTagsMatch(tags: string[]) {
    await expect(this.tags).toHaveCount(tags.length);
    for (let i = 0; i < (await this.tags.count()); i++) {
      await expect(this.tags.nth(i)).toHaveText(tags[i]!);
    }
  }

  async addTags(tags: string[]) {
    const beforeCount = await this.tags.count();
    const joined = tags.join(",");
    await this.input.fill(joined);
    await this.input.press("Enter");
    await expect(this.tags).toHaveCount(beforeCount + tags.length);
  }

  async removeTag(tag: string) {
    const beforeCount = await this.tags.count();
    const tagIdx = (await this.tags.allTextContents()).indexOf(tag + " ");
    if (tagIdx === -1) {
      throw new Error(`Tag: ${tag} is not present in list of tags.`);
    }
    await this.tags.nth(tagIdx).locator("i").click();
    await expect(this.tags).toHaveCount(beforeCount - 1);
  }
}