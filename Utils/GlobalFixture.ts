import { test as base, BrowserContext, Page } from '@playwright/test';
import { chromium } from '@playwright/test';


export let context:BrowserContext;
export let page:Page;

type MyFixtures = {
    sharedContext: BrowserContext;
    sharedPage: Page;
};

const test = base.extend<MyFixtures>({
    sharedContext: async ({ }, use) => {
        // Create the browser and load saved state
        const browser = await chromium.launch();
        context = await browser.newContext({
            storageState: 'storageState.json', // Load stored session state
            recordVideo: {
                dir: 'allure-results/', // Directory to save videos
                size: { width: 1920, height: 1080 }, // Video resolution
            }
        });
        await use(context);
        //await context.close();
    },

    sharedPage: async ({ sharedContext }, use) => {
        page = await sharedContext.newPage();
        await use(page);
        //await page.close();
    },
});

export { test };