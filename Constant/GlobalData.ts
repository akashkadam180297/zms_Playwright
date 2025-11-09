import * as fs from 'fs';
import * as path from 'path';

export class GlobalData {
  // Static variables to hold specific global data values
  static storeName;
  static url;
  static username;
  static password;

  // Static method to load data from JSON file
  static loadData(): void {
    const dataFilePath = path.join(`./TestData/Json/globalData_${process.env.test_env}.json`);
    if (!fs.existsSync(dataFilePath)) {
      throw new Error(`Global data file not found at ${dataFilePath}`);
    }
    
    const rawData = fs.readFileSync(dataFilePath, 'utf-8');
    const parsedData = JSON.parse(rawData);
    
    // Store specific values in static variables
    this.storeName = parsedData.storeName
    this.url = parsedData.url;
    this.username = parsedData.username;
    this.password = parsedData.password;
  }
}