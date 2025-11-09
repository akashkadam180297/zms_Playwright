import { Page, Locator, expect, Download } from "@playwright/test";
import { test } from "../Utils/GlobalFixture";
import * as path from "path";
import * as fs from "fs";
import LocatorsPage from "../Pages/Locators";
import WebElementPage from "./WebElementActions";
import WaitActionPage from "./WaitActions";



let runningTestClassName: string, result: string;

export default class ReusableActions {
  private locatorsPage: LocatorsPage;
  private webElementPage: WebElementPage;
  private waitActionPage: WaitActionPage;
  constructor(public page: Page) {
    this.locatorsPage = new LocatorsPage(page);
    this.webElementPage = new WebElementPage(page);
    this.waitActionPage = new WaitActionPage(page);
  }

  /**
   * Ge the class name of the running class
   */
  async getTheClassName() {
    // Get the current test file path using test.info()
    try {
      const testInfo = test.info();
      // Extract the file name from the full path
      const fileName = path.basename(testInfo.file);
      // Store the class/file name in a variable
      runningTestClassName = fileName;
      result = runningTestClassName.replace(".spec.ts", "");
      // You can now use this variable in your test
    } catch (error) {
      console.log("Error file getting class name :", error.message);
    }
    return result;
  }

  /**
   * Write the data into the text file
   */

  async writeDataIntoTextFile(data: string, path: string) {
    fs.writeFileSync(path, data, "utf-8");
  }

  /**
   * REad the data from the text file
   */

  async readDataFromTextFile(path: string) {
    return fs.readFileSync(path, "utf-8");
  }

  /**
   * Delete the pdf in created directory
   */

  async deleteFiles(dirPath: string) {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        console.error(`failed to read directory: ${err}`);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`failed to delete file $(filepath): ${err}`);
          } else {
            console.log(`Deleted file: ${filePath}`);
          }
        });
      });
    });
  }
  /**
  * Get timestamp
  */
  async getTimestamp() {
    const now = new Date();
    const datePart = now.toISOString().replace(/T/, "-").replace(/:/g, "-").split(".")[0];
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); // Ensure milliseconds are 3 digits
    return `${datePart}-${milliseconds}`;
  }
  /**
  * Generate random number
  */
  async generateRandomNumber(length: number) {
    const min = Math.pow(10, length - 1); // Minimum value with the specified length
    const max = Math.pow(10, length) - 1; // Maximum value with the specified length
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  /**
  * Get past date
  */
  async getPastDate(daysToSubtract: number) {
    let dateAndTime;
    let currentDate = new Date();

    // Subtract the specified number of days
    currentDate.setDate(currentDate.getDate() - daysToSubtract);

    // Format the date to dd/MM/yyyy
    let day = String(currentDate.getDate()).padStart(2, '0');
    let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    let year = currentDate.getFullYear();

    dateAndTime = `${day}/${month}/${year}`;

  



}
}