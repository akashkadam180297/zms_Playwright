import { test } from "../../Utils/GlobalFixture";
import { expect } from "@playwright/test";
import ReusablePage from "../../Pages/ReusablePage";
import ReusableActions from "../../Actions/ReusableActions";
import VendorPageClass from "../../Pages/Vendors/vendor";
import { GlobalData } from "../../Constant/GlobalData";
import { TIMEOUT } from "dns/promises";

let reusablePageClass: ReusablePage;
let reusableActionsClass: ReusableActions;
let vendorPage: VendorPageClass;
let className: string, customerName: string;

test.beforeAll(async ({ sharedPage }) => {
  // Load the global data before running the tests
  GlobalData.loadData();
  reusablePageClass = new ReusablePage(sharedPage);
  reusableActionsClass = new ReusableActions(sharedPage);
  vendorPage = new VendorPageClass(sharedPage);
  className = await reusableActionsClass.getTheClassName();
  reusableActionsClass.writeDataIntoTextFile(
    className,
    "./TestData/TXTFile/data.txt"
  );
});
test.describe.serial(`Create customer and verify for env ${process.env.test_env}`, () => {

  test(`Test_001_Login_to_website_for_env_${process.env.test_env}`, async () => {
      try {
        await reusablePageClass.userLogin(GlobalData.url,GlobalData.username,GlobalData.password);
      } catch (error) {
        console.error('Login to website Stack trace:', error.stack);
        expect(false, `Login to website Test failed due to error: ${error.message}`).toBe(true);
      }
    });
  test(`Test_002_click_on_Vendor_Menu_env_${process.env.test_env}`, async () => {
      try {
        await vendorPage.clickOnVendorMenu ();
        await vendorPage.verifyCustomerTabFields();
        
      } catch (error) {
        console.error('click_on_Vendor_Menu_env Stack trace:', error.stack);
        expect(false, `click_on_Vendor_Menu_env failed due to error: ${error.message}`).toBe(true);
        
      }
    });
  test(`Test_003_click_on_Quick_Create_Vendor_env_${process.env.test_env}`, async () => {
      try {
        await vendorPage.clickOnQuickCreateVendor();
        // await vendorPage.selectVendorType ();
        // await vendorPage.enterTheVendorName();  
      } catch (error) {
        console.error('click_on_Quick_Create_Vendor Stack trace:', error.stack);
        expect(false, `click_on_Quick_Create_Vendor failed due to error: ${error.message}`).toBe(true);
      }
    }); 





});