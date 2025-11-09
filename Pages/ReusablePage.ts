import { Page } from "@playwright/test";
import WaitActionClass from "../Actions/WaitActions";
import WebElementActionClass from "../Actions/WebElementActions";
import LocatorsPage from "../Pages/Locators";

export default class ReusablePage {
  private waitActionClass: WaitActionClass;
  private webElementActionClass: WebElementActionClass;
  private locatorsPage: LocatorsPage;

  constructor(public page: Page) {
    // Initialize class objects
    this.waitActionClass = new WaitActionClass(page);
    this.webElementActionClass = new WebElementActionClass(page);
    this.locatorsPage = new LocatorsPage(page);
  }

  /**
   * Navigate to the url
   * @param url
   */

  async navigateToUrl(url: string) {
    const baseURL = process.env.BASE_URL;
    const isAbsoluteUrl = /^https?:\/\//i.test(url);

    if (!isAbsoluteUrl && !baseURL) {
      throw new Error("BASE_URL is not defined and a relative URL was provided.");
    }

    const targetUrl = isAbsoluteUrl ? url : new URL(url, baseURL).href;
    await this.page.goto(targetUrl, { waitUntil: "load" });
    console.log(`Navigated to ${targetUrl}`);
  }

  /**
   * Change country
   */

  // async changeCountry() {
  //   await this.webElementActionClass.Click(this.locatorsPage.country_dropdown);
  //   await this.webElementActionClass.Click(this.locatorsPage.country_english);
  //   await this.waitActionClass.waitForElementVisible(this.locatorsPage.selected_country);
  //   console.log("Country changed Successfully on login page");
  // }

  /**
   * Send the username to the username field
   * @param userName
   */

  async sendUsername(userName: string) {
    await this.webElementActionClass.Send_Keys(this.locatorsPage.username_text_box,userName);
    console.log("Username sent successfully");
  }

  /**
   * Send the password to the password field
   * @param password
   */

  async sendPassword(password: string) {
    await this.webElementActionClass.Send_Keys(this.locatorsPage.password_text_box,password);
    console.log("password sent successfully");
  }

  /**
   * Click on signIn
   */

  async clickOnSignIn() {
    await this.webElementActionClass.Click(this.locatorsPage.sign_in);
    // await this.waitActionClass.waitForElementVisible(this.locatorsPage.logo_img);
    // expect(this.locatorsPage.logo_img).toBeVisible();
    console.log("Clicked on signIn");
  }

  /**
   * Send the password to the password field
   * @param url
   * @param userName
   * @param password
   */

  async userLogin(url: string, userName: string, password: string) {
    await this.navigateToUrl(url);
    // await this.changeCountry();
    await this.sendUsername(userName);
    await this.sendPassword(password);
    await this.clickOnSignIn();
    console.log("User Logged in Successfully with username : " +userName +" and password : " +password);
  }

  
}
