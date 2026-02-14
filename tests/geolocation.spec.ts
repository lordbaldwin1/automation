import { test as base, expect } from "@playwright/test";
import { GeolocationPage } from "../pages/GeolocationPage";

type Fixture = {
  g: GeolocationPage;
};

const test = base.extend<Fixture>({
  g: async ({ page }, use) => {
    const g = new GeolocationPage(page);
    await g.goto();
    await use(g);
  },
});

test.describe("Geolocation Page Tests", () => {
  test("browser location longitude: -122.03118 and latitude: 37.33182 shows Cupertino", async ({ g, context }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation({ longitude: -122.03118, latitude: 37.33182 });

    await expect(g.locationInfo).toHaveText("Click on the button to get your current location");
    await expect(g.getLocationButton).toBeVisible();

    await g.getLocationButton.click();
    await expect(g.locationInfo).toHaveText("Cupertino, United States");
  });
});