import * as fs from "fs";
import * as path from "path";
import { Page } from "@playwright/test";

import { test } from "../Utils/GlobalFixture";

type ErrnoException = NodeJS.ErrnoException;

export default class ReusableActions {
  private runningTestClassName?: string;

  constructor(public readonly page: Page) {}

  /**
   * Return the name of the running spec without the .spec.ts suffix.
   */
  async getTheClassName(): Promise<string> {
    try {
      const testInfo = test.info();
      const fileName = path.basename(testInfo.file);
      this.runningTestClassName = fileName.replace(/\.spec\.ts$/i, "");
      return this.runningTestClassName;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Error retrieving class name:", message);
      throw new Error(`Unable to determine the running test name: ${message}`);
    }
  }

  /**
   * Write the provided data into a text file, creating directories if required.
   */
  async writeDataIntoTextFile(data: string, filePath: string): Promise<void> {
    const resolvedPath = path.resolve(filePath);
    await fs.promises.mkdir(path.dirname(resolvedPath), { recursive: true });
    await fs.promises.writeFile(resolvedPath, data, "utf-8");
  }

  /**
   * Read the contents of a text file.
   */
  async readDataFromTextFile(filePath: string): Promise<string> {
    const resolvedPath = path.resolve(filePath);
    return fs.promises.readFile(resolvedPath, "utf-8");
  }

  /**
   * Delete all files within the provided directory.
   */
  async deleteFiles(dirPath: string): Promise<void> {
    const resolvedPath = path.resolve(dirPath);

    try {
      const files = await fs.promises.readdir(resolvedPath);
      await Promise.all(
        files.map(async (file) => {
          const filePath = path.join(resolvedPath, file);
          await fs.promises.unlink(filePath);
        })
      );
    } catch (error) {
      const errnoError = error as ErrnoException;
      if (errnoError?.code === "ENOENT") {
        console.warn(`Directory not found when attempting to delete files: ${resolvedPath}`);
        return;
      }

      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to delete files in ${resolvedPath}: ${message}`);
    }
  }

  /**
   * Get a timestamp string suitable for file or folder names.
   */
  getTimestamp(): string {
    const now = new Date();
    const datePart = now.toISOString().replace(/T/, "-").replace(/:/g, "-").split(".")[0];
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0");
    return `${datePart}-${milliseconds}`;
  }

  /**
   * Generate a random number with the provided length.
   */
  generateRandomNumber(length: number): number {
    if (length <= 0) {
      throw new Error("Length must be a positive integer");
    }

    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Get a past date formatted as dd/MM/yyyy.
   */
  getPastDate(daysToSubtract: number): string {
    if (!Number.isInteger(daysToSubtract)) {
      throw new Error("daysToSubtract must be an integer");
    }

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - daysToSubtract);

    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();

    return `${day}/${month}/${year}`;
  }
}
