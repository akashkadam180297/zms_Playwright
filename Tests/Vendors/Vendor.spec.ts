import ReusableActions from "../../Actions/ReusableActions";
import ReusablePage from "../../Pages/ReusablePage";
import VendorPageClass from "../../Pages/Vendors/vendor";
import { GlobalData } from "../../Constant/GlobalData";
import { test } from "../../Utils/GlobalFixture";

let reusablePageClass: ReusablePage;
let reusableActionsClass: ReusableActions;
let vendorPage: VendorPageClass;
let className = "";

const failTest = (error: unknown, message: string): never => {
  if (error instanceof Error) {
    throw new Error(`${message}: ${error.message}\n${error.stack ?? ""}`.trim());
  }

  throw new Error(`${message}: ${String(error)}`);
};

test.beforeAll(async ({ sharedPage }) => {
  GlobalData.loadData();

  reusablePageClass = new ReusablePage(sharedPage);
  reusableActionsClass = new ReusableActions(sharedPage);
  vendorPage = new VendorPageClass(sharedPage);

  className = await reusableActionsClass.getTheClassName();
  await reusableActionsClass.writeDataIntoTextFile(
    className,
    "./TestData/TXTFile/data.txt"
  );
});

test.describe.serial(`Create customer and verify for env ${process.env.test_env}`, () => {
  test(`Test_001_Login_to_website_for_env_${process.env.test_env}`, async () => {
    try {
      await reusablePageClass.userLogin(
        GlobalData.url,
        GlobalData.username,
        GlobalData.password
      );
    } catch (error) {
      failTest(error, "Login to website test failed");
    }
  });

  test(`Test_002_click_on_Vendor_Menu_env_${process.env.test_env}`, async () => {
    try {
      await vendorPage.clickOnVendorMenu();
      await vendorPage.verifyCustomerTabFields();
    } catch (error) {
      failTest(error, "click_on_Vendor_Menu_env failed");
    }
  });

  test(`Test_003_click_on_Quick_Create_Vendor_env_${process.env.test_env}`, async () => {
    try {
      await vendorPage.clickOnQuickCreateVendor();
      // await vendorPage.selectVendorType();
      // await vendorPage.enterTheVendorName();
    } catch (error) {
      failTest(error, "click_on_Quick_Create_Vendor failed");
    }
  });
});
