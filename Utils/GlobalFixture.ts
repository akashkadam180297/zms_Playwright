import { chromium, test as base, Browser, BrowserContext, Page } from '@playwright/test';

type MyFixtures = {
  sharedContext: BrowserContext;
  sharedPage: Page;
};

let activeBrowser: Browser | undefined;

const test = base.extend<MyFixtures>({
  sharedContext: async ({ }, use) => {
    activeBrowser = await chromium.launch();
    const context = await activeBrowser.newContext({
      storageState: 'storageState.json',
      recordVideo: {
        dir: 'allure-results/',
        size: { width: 1920, height: 1080 },
      },
    });

    try {
      await use(context);
    } finally {
      await context.close();
      if (activeBrowser) {
        await activeBrowser.close();
        activeBrowser = undefined;
      }
    }
  },

  sharedPage: async ({ sharedContext }, use) => {
    const page = await sharedContext.newPage();

    try {
      await use(page);
    } finally {
      if (!page.isClosed()) {
        await page.close();
      }
    }
  },
});

export { test };
