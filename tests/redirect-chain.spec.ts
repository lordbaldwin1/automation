import { test as base, expect } from "@playwright/test";
import { RedirectChainPage } from "../pages/RedirectChainPage";

type Fixture = {
  rc: RedirectChainPage;
};

const test = base.extend<Fixture>({
  rc: async ({ page }, use) => {
    const rc = new RedirectChainPage(page);
    await rc.goto();
    await use(rc);
  },
});

test.describe("Redirect Chain Page Tests", () => {
  test("verify each redirection", async ({ rc }) => {
    const firstRedirectPromise = rc.waitForRedirect("second");
    const secondRedirectPromise = rc.waitForRedirect("third");
    const thirdRedirectPromise = rc.waitForRedirect("fourth");
    const fourthRedirectPromise = rc.waitForRedirect("fifth");
    const fifthRedirectPromise = rc.waitForRedirect("sixth");
    const lastRedirectPromise = rc.waitForRedirect("last");

    await rc.startRedirectionChain();

    await firstRedirectPromise;
    await secondRedirectPromise;
    await thirdRedirectPromise;
    await fourthRedirectPromise;
    await fifthRedirectPromise;
    await lastRedirectPromise;

    await expect(rc.infoText).toHaveText("Welcome to the Last Page");
    await expect(rc.goBackLink).toBeVisible();

    await rc.goBackLink.click();
    await expect(rc.redirectButton).toBeVisible();
  });
});