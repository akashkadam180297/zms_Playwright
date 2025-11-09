import { expect, Page } from "@playwright/test";

import WaitActionClass from "../../Actions/WaitActions";
import WebElementActionClass from "../../Actions/WebElementActions";
import LocatorsPage from "../Locators";

export default class VendorPage {
  private readonly waitActionClass: WaitActionClass;
  private readonly webElementActionClass: WebElementActionClass;
  private readonly locatorsPage: LocatorsPage;

  constructor(public readonly page: Page) {
    this.waitActionClass = new WaitActionClass(page);
    this.webElementActionClass = new WebElementActionClass(page);
    this.locatorsPage = new LocatorsPage(page);
  }

  /** Click on the vendor menu. */
  async clickOnVendorMenu(): Promise<void> {
    await this.waitActionClass.loadingWaitForDisplayNone(this.locatorsPage.tab_Vendor);
    await this.webElementActionClass.Force_Click(this.locatorsPage.tab_Vendor);
    console.log("Clicked on Vendor menu");
  }

  /** Verify that the vendor tab fields are visible. */
  async verifyCustomerTabFields(): Promise<void> {
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.label_Vendor);
    await expect(this.locatorsPage.label_Vendor).toBeVisible();
  }

  /** Click on the quick create vendor button. */
  async clickOnQuickCreateVendor(): Promise<void> {
    await this.waitActionClass.loadingWaitForDisplayNone(this.locatorsPage.btn_Quick_Create_Vendor);
    await this.webElementActionClass.Force_Click(this.locatorsPage.btn_Quick_Create_Vendor);
    console.log("Clicked on Quick Create Vendor");
  }

  /** Select the vendor type. */
  async selectVendorType(): Promise<void> {
    await this.page.waitForTimeout(5000);
    await this.locatorsPage.label_Vendor_Type.selectOption({ label: "Individual" });
    console.log("Selected vendor type Individual");
  }

  /** Enter the vendor name. */
  async enterTheVendorName(): Promise<void> {
    const vendorName = "Akash";
    await this.webElementActionClass.Send_Keys(this.locatorsPage.label_FirstName, vendorName);
    console.log("Entered the vendor name successfully");
  }
}
