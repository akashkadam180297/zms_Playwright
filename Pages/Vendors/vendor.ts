import { Page, expect } from "@playwright/test";
import WaitActionClass from "../../Actions/WaitActions";
import WebElementActionClass from "../../Actions/WebElementActions";
import LocatorsPage from "../Locators";
import ReusableActionClass from "../../Actions/ReusableActions";


let timeStamp;

export default class VendorPage {
    [x: string]: any;
 private waitActionClass: WaitActionClass;
  private webElementActionClass: WebElementActionClass;
  private reusableActionClass: ReusableActionClass;
  private locatorsPage: LocatorsPage;

    constructor(public page: Page) {
      // Initialize class objects
      this.waitActionClass = new WaitActionClass(page);
      this.webElementActionClass = new WebElementActionClass(page);
      this.reusableActionClass = new ReusableActionClass(page);
      this.locatorsPage = new LocatorsPage(page);
    }

  /**click on vendor */
  async clickOnVendorMenu (){
  await this.waitActionClass.loadingWaitForDisplayNone(this.locatorsPage.tab_Vendor)
  await this.webElementActionClass.Force_Click(this.locatorsPage.tab_Vendor);
  console.log("click on Vendor menu");


  }

   /**
   * Verify customer tab fields
   */
   async verifyCustomerTabFields() {
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.label_Vendor);
    await expect(this.locatorsPage.label_Vendor).toBeVisible();

   }
 
   /**click on quick Create Vendor */

   async clickOnQuickCreateVendor () {
    await this.waitActionClass.loadingWaitForDisplayNone(this.locatorsPage.btn_Quick_Create_Vendor);
    await this.webElementActionClass.Force_Click(this.locatorsPage.btn_Quick_Create_Vendor);
    console.log("click On Quick Create Vendor ");


   }
   /**select vendor type */

   async selectVendorType () {
    await this.page.waitForTimeout(5000);
    await this.locatorsPage.label_Vendor_Type.selectOption({ label: 'Individual' });
    console.log("Select vendor type Individual");


   }
   /**enter the vendor name */
   async enterTheVendorName(): Promise<void>  {
   const vendorName = "Akash";
   await this.webElementActionClass.Send_Keys(this.locatorsPage.label_FirstName,vendorName)
   console.log("enter the name sucessfully");

   }


}



