import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './Tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  workers: 1,   
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  timeout: 60 * 1000,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
   //globalSetup: 'myCustomHook',
   reporter: [["allure-playwright", {resultsDir: "allure-results"}]],
   globalSetup: "./Utils/GlobalSetup.ts",
   globalTeardown: './Utils/GlobalTeardown',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 0,
    browserName: 'chromium',
    channel: 'chrome',
    headless: false,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'off',
    baseURL: 'https://plus91hq.plus91online.com/drive_file_version_control/zealver_ms/public/login.php',
    // viewport: null,
    viewport: { width: 1920, height: 1080 },
    launchOptions: {
      //args: ['--start-maximized']
    },
    screenshot: 'on',
    video: {
      mode: 'on',
      size: {
        width: 1366,
        height: 768
      },
    },
  },

  /* Configure projects for major browsers */
   projects: [
     {
       name: 'chromium',
       use: { ...devices['Desktop Chrome'] },
     },
     
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
