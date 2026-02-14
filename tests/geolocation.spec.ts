import { test as base, expect } from "@playwright/test";
import { GeolocationPage } from "../pages/GeolocationPage";

type Fixture = {
  g: GeolocationPage;
};

const test = base.extend<Fixture>({
  g: async ({ page }, use) => {
    const g = new GeolocationPage(page);
    await g.goto();
    await expect(g.locationInfo).toHaveText("Click on the button to get your current location");
    await use(g);
  },
});

type LocationTestCase = {
  city: string;
  longitude: number;
  latitude: number;
};

const usLocations: LocationTestCase[] = [
  { city: "Cupertino, United States", longitude: -122.03118, latitude: 37.33182 },
  { city: "New York, United States", longitude: -74.006, latitude: 40.7128 },
  { city: "Chicago, United States", longitude: -87.6298, latitude: 41.8781 },
  { city: "Seattle, United States", longitude: -122.3321, latitude: 47.6062 },
  { city: "Miami, United States", longitude: -80.1918, latitude: 25.7617 }
];

test.describe("Geolocation Page Tests", () => {
  usLocations.forEach(({ city, longitude, latitude }) => {
    test(`browser location longitude: ${longitude}, latitude: ${latitude} shows ${city}`, async ({ g, context }) => {
      await g.setLocation(context, longitude, latitude);
      await g.getLocation();
      await expect(g.locationInfo).toHaveText(city);
    });
  });
});