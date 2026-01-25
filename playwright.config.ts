import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true, // will run all tests in a file in parallel
  forbidOnly: !!process.env.CI, // fail build if test.only is left in code
  retries: process.env.CI ? 2 : 0, // retry 2x on CI, 0 times locally
  workers: process.env.CI ? 1 : undefined, // limit workers on CI (what are workers?)

  reporter: [["html", { open: "never" }]],

  use: {
    baseURL: "https://qaplayground.dev",

    trace: "on-first-retry", // records every action
    screenshot: "only-on-failure", // takes photo when test fails
    video: "retain-on-failure", // record video if it fails

    headless: true,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
    /* Mobile testing examples */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
  ]
})