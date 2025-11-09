import { execSync } from "child_process";
import * as fs from 'fs';
let testClassName;

function getTimestamp() {
  const now = new Date();
  const datePart = now
    .toISOString()
    .replace(/T/, "-")
    .replace(/:/g, "-")
    .split(".")[0];
  const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); // Ensure milliseconds are 3 digits
  return `${datePart}-${milliseconds}`;
}
const timestampFolder = getTimestamp();
// Function to generate Allure report
const generateAllureReport = () => {
  if (!fs.existsSync('./allure-results')) {
    console.warn('Allure results directory not found. Skipping report generation.');
    return;
  }

  if (!fs.existsSync('./TestData/TXTFile/data.txt')) {
    console.warn('Test metadata file not found. Skipping Allure report generation.');
    return;
  }

  testClassName = fs.readFileSync('./TestData/TXTFile/data.txt', 'utf-8').trim();
  if (!testClassName) {
    console.warn('Test metadata file was empty. Skipping Allure report generation.');
    return;
  }
  try {
    console.log("All tests completed. Generating Allure report...");
    execSync(
      `allure generate ${"./allure-results"} --clean -o ${
        "./allure-report" + "/"+testClassName+"/"+testClassName +"-"+ timestampFolder
      }`,
      { stdio: "inherit" }
    );
    console.log(
      `Allure report generated in ${
        "./allure-report" + "/"+testClassName+"/"+testClassName +"-"+timestampFolder
      } directory.`
    );
    if (process.env.OPEN_ALLURE_REPORT === "true") {
      execSync(
        `allure open ${
          "./allure-report" + "/"+testClassName+"/"+testClassName +"-"+timestampFolder
        }`,
        { stdio: "inherit" }
      );
    }
  } catch (error) {
    console.log("Error is : " + (error as Error).message);
  }
};

// Global teardown function
export default async function globalTeardown() {
  generateAllureReport(); // Call the report generation function
}
