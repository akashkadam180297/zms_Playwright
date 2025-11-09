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
  testClassName = fs.readFileSync('./TestData/TXTFile/data.txt', 'utf-8');
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
    execSync(
      `allure open ${
        "./allure-report" + "/"+testClassName+"/"+testClassName +"-"+timestampFolder
      }`,
      { stdio: "inherit" }
    );
  } catch (error) {
    console.log("Error is : " + error.message);
  }
};

// Global teardown function
export default async function globalTeardown() {
  generateAllureReport(); // Call the report generation function
}
