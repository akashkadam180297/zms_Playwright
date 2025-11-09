import { Page, Locator } from "@playwright/test";

export default class WaitActions {
  constructor(public page: Page) {}
  /**
   * Waits for the specified element to become visible within a timeout of 30 seconds.
   * Logs an error message if the element does not become visible in time.
   * @param element - Locator of the element to wait for.
   */

  async waitForElementVisible(element: Locator) {
    await element.waitFor({ state: "visible" }); // Wait for 30 seconds
  }

  /**
   * Waits for the specified element to disappear (hidden state).
   * Logs a message when the element disappears, or an error if it fails.
   * @param element - Locator of the element to wait for.
   */

  async WaitUntilElementToDisappear_hidden(element: Locator) {
    await element.waitFor({ state: "hidden" });
    console.log("Element disappeared");
  }

  /**
   * Waits until the specified element disappears (hidden and detached from the DOM).
   * This method has a 30 sec timeout (30000 ms) and logs a message when the element is fully detached.
   * @param element - Locator of the element to wait for.
   */

  async WaitUntilElementToDisappear(element: Locator) {
    // Wait until the element is detached from the DOM, with a maximum wait of 30 sec (30000 ms)
    await element.waitFor({ state: "hidden", timeout: 30000 });
    await element.waitFor({ state: "detached", timeout: 30000 });
    console.log("Element completely disappeared (detached from the DOM)");
  }

  /**
   * Waits for the specified element display to be none
   * @param element - Locator of the element to wait for.
   */

  async loadingWaitForDisplayNone(element: Locator) {
      let visibleCount = 0;
      while (await element.count()==0 && visibleCount<5) {
          try {
              await this.page.waitForTimeout(1000);
              visibleCount++;
          } catch (error) {
          }
      }
      if (await element.count()>0) {
          let invisibleCount = 0;
          while (true) {
            const styleAttribute = await element.nth(0).getAttribute("style");
            if (styleAttribute?.includes("display: none") || invisibleCount==20) {
                if (invisibleCount==20) {
                    console.log("Loader took more then 20 seconds");
                } else {
                    console.log("Loader display became none")
                }
                break;
            } else {
                await this.page.waitForTimeout(1000);
                invisibleCount++;
            }
          }
      }
  }
}
