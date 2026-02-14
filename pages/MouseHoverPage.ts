import { type Locator, type Page } from "@playwright/test";

// put mouse pointer on an image and assert movie price

export class MouseHoverPage {
  private readonly page: Page;

  readonly posterContainer: Locator;
  readonly titleContainer: Locator;
  readonly image: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleContainer = this.page.locator(".title-container");
    this.posterContainer = this.page.locator(".poster-container");
    this.image = this.page.locator("img[src='spider-man.jpg']");
  }

  async goto() {
    await this.page.goto("/apps/mouse-hover");
  }

  async getPosterImage(src: string) {
    return this.posterContainer.locator(`img[src="${src}"]`);
  }

  async getPosterContent(movieTitle: string) {
    const movie = this.titleContainer.locator(".title-content").filter({
      hasText: movieTitle,
    });
    const title = movie.locator(".movie-title");
    const slogan = movie.locator(".movie-slogan");
    const currentPrice = movie.locator(".current-price");
    const oldPrice = movie.locator(".old-price");
    const buyButton = movie.getByRole("button", { name: "Buy now" });

    return {
      title,
      slogan,
      currentPrice,
      oldPrice,
      buyButton,
    }
  }
}