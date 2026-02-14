import { type Locator, type Page } from "@playwright/test";

// Set browser location to longitude: -122.03118 and latitude: 37.33182 and assert Cupertino

export class GeolocationPage {
  private readonly page: Page;

  readonly locationInfo: Locator;
  readonly getLocationButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locationInfo = this.page.locator("#location-info");
    this.getLocationButton = this.page.getByRole("button", { name: "Get Location" });
  }

  async goto() {
    await this.page.goto("/apps/geolocation");
  }
}