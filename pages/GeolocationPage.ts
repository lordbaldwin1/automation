import { expect, type BrowserContext, type Locator, type Page } from "@playwright/test";

// Set browser location to longitude: -122.03118 and latitude: 37.33182 and assert Cupertino

export class GeolocationPage {
  private readonly page: Page;
  private readonly getLocationButton: Locator;
  
  readonly locationInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locationInfo = this.page.locator("#location-info");
    this.getLocationButton = this.page.getByRole("button", { name: "Get Location" });
  }

  async goto() {
    await this.page.goto("/apps/geolocation");
  }

  async setLocation(context: BrowserContext, longitude: number, latitude: number) {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation({ longitude, latitude });
  }

  async getLocation() {
    await expect(this.getLocationButton).toBeVisible();
    await this.getLocationButton.click();
  }
}