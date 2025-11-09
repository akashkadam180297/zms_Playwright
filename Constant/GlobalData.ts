import * as fs from "fs";
import * as path from "path";

type GlobalDataFile = {
  storeName: string;
  url: string;
  username: string;
  password: string;
};

export class GlobalData {
  static storeName: string;
  static url: string;
  static username: string;
  static password: string;

  static loadData(envName?: string): void {
    const resolvedEnv = envName ?? process.env.test_env ?? "ENV_UAT";
    process.env.test_env = resolvedEnv;

    const dataFilePath = path.resolve(`./TestData/Json/globalData_${resolvedEnv}.json`);
    if (!fs.existsSync(dataFilePath)) {
      throw new Error(`Global data file not found at ${dataFilePath}`);
    }

    const rawData = fs.readFileSync(dataFilePath, "utf-8");
    const parsedData = JSON.parse(rawData) as Partial<GlobalDataFile>;

    if (!parsedData.url || !parsedData.username || !parsedData.password || !parsedData.storeName) {
      throw new Error(`Global data file ${dataFilePath} is missing required properties.`);
    }

    this.storeName = parsedData.storeName;
    this.url = parsedData.url;
    this.username = parsedData.username;
    this.password = parsedData.password;
  }
}