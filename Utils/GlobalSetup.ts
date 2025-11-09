import dotenv from "dotenv";
import {
  chromium,
  Browser,
  BrowserContext,
  FullConfig,
} from "@playwright/test";
import fs from "fs";
import path from "path";
import { GlobalData } from "../Constant/GlobalData";

let browser: Browser;
let context: BrowserContext;
let storeName: string, url: string, username: string, password: string;

async function globalSetup(config: FullConfig) {
  process.env.BASE_URL = config.projects[0].use?.baseURL || "";

  // Launch browser and create context
  browser = await chromium.launch();
  context = await browser.newContext();

  // Save cookies and session state
  await context.storageState({ path: "storageState.json" });

  // Close browser after setup
  await browser.close();

  const test_env = process.env.test_env || "ENV_UAT";

  dotenv.config({
    path: `./Env/.env`,
    override: true,
  });

  const dataFilePath = path.join("./TestData/Json/env.json");
  const loginData = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

  if (!loginData[test_env]) {
    throw new Error(`Unknown environment: ${test_env}`);
  }

  const envData = loginData[test_env];

  // switch (test_env) {
  

  //   case "ENV_UAT":
  //     storeName = envData.STORE_NAME;
  //     url = process.env.UAT_URL || "";
  //     username = envData.USERNAME;
  //     password = envData.PASSWORD;
      // break;

    // default:
    //   throw new Error(`Unknown environment: ${test_env}`);
  // }

  // const globalData = {
  //   storeName,
  //   url,
  //   username,
  //   password,
  // };

//   const outputPath = path.join(
//     `./TestData/Json/globalData_${test_env}.json`
//   );
//   fs.writeFileSync(outputPath, JSON.stringify(globalData, null, 2));

//   console.log(`Global data written to ${outputPath}`);
}

export default globalSetup;
