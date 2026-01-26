import test, { expect } from "@playwright/test";
import { TagsInputPage } from "../pages/TagsInputPage";


test.describe("Tags Input Box Page", () => {
  let pg: TagsInputPage;

  test.beforeEach(async ({ page }) => {
    pg = new TagsInputPage(page);
    await pg.goto();
  });

  test("Title should be 'Tags'", async () => {
    await expect(pg.title).toHaveText("Tags");
  });

  test("Input is present", async () => {
    await expect(pg.input).toBeVisible();
  });

  test("Should start with 2 tags: 'node' and 'javascript'", async () => {
    const tags = ["node", "javascript"];
    await pg.expectTagsMatch(tags);
  });

  test("Should have no tags if 'node' and 'javascript' are removed", async () => {
    const tagCount = await pg.tags.count();

    for (let i = tagCount - 1; i >= 0; i--) {
      const btn = pg.tags.nth(i).locator("i");
      await btn.click();
    }
    await expect(pg.tags).toHaveCount(0);
  });

  test("Should be able to remove from start of tag list", async () => {
    while ((await pg.tags.count()) > 0) {
      await pg.tags.nth(0).locator("i").click();
    }
    await expect(pg.tags).toHaveCount(0);
  });

  test("Should be able to add single tag", async () => {
    const tags = await pg.tags.allTextContents();
    const tagToAdd = ["asd"];
    await pg.addTags(tagToAdd);
    tags.push(...tagToAdd);
    await pg.expectTagsMatch(tags);
  })

  test("Should be able to add multiple tags", async () => {
    const tags = await pg.tags.allTextContents();
    const tagsToAdd = ["asd", "fgh", "sdf", "qwe"];
    await pg.addTags(tagsToAdd);

    tags.push(...tagsToAdd);
    await pg.expectTagsMatch(tags);
  });

  test("Should be able to add and remove tags", async () => {
    const initialTagCount = await pg.tags.count();
    const initialTags = await pg.tags.allTextContents();
    const tagsToAdd = ["asd", "sdf", "dfg"];
    const tagsToRemove = ["sdf", "asd"];

    await pg.addTags(tagsToAdd);
    await expect(pg.tags).toHaveCount(initialTagCount + tagsToAdd.length);

    for (const tag of tagsToRemove) {
      await pg.removeTag(tag);
    }

    await expect(pg.tags).toHaveCount(initialTagCount + tagsToAdd.length - tagsToRemove.length);

    initialTags.push(tagsToAdd[2]!)
    await pg.expectTagsMatch(initialTags);
  });

  test("Should be able to remove all tags via 'Remove All' button", async () => {
    await pg.removeAllBtn.click();
    await expect(pg.tags).toHaveCount(0);
    pg.expectTagsMatch([]);
  });

  test("Should add max number of tags", async () => {
    const remainingCount = await pg.remaining.textContent();
    if (!remainingCount) {
      throw new Error("Remaining count is not present.");
    }

    const tagsToAdd = ["1", "2", "3", "4", "5", "6", "7", "8"];

    await pg.addTags(tagsToAdd);
    await expect(pg.tags).toHaveCount(10);
    await expect(pg.remaining).toHaveText("0");
  });

  test("Should add max number of tags and they should be visible", async () => {
    const tagsToAdd = ["12", "23", "34", "45", "56", "67", "78", "89"];

    const input = pg.page.getByRole("textbox");
    const tags = pg.page.getByRole("listitem");
    const tagCount = await tags.count();
    const currentCount = pg.page.locator(".details >> span")
    let remainingCount = 10 - tagCount;

    for (let i = 0; i < 10 - tagCount; i++) {
      await input.fill(tagsToAdd[i]!);
      await input.press("Enter");
      remainingCount--;
      await expect(tags.getByText(tagsToAdd[i]!)).toBeVisible();
      await expect(currentCount).toHaveText(remainingCount.toString());
    }

    await expect(currentCount).toHaveText("0");
  })
});