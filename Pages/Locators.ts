import { Page, Locator } from "@playwright/test";

export default class locatorsPageWebElementPage {

    username_text_box: Locator;
    password_text_box: Locator;
    sign_in: Locator;
    tab_Vendor:Locator;
    label_Vendor:Locator;
    btn_Quick_Create_Vendor:Locator;
    label_FirstName:Locator;
    tab_serviceArea:Locator;
    label_Vendor_Type:Locator;


    constructor(public page: Page) {
        this.username_text_box = this.page.locator("//input[@id='username']");
        this.password_text_box = this.page.locator("//input[@id='password']");
        this.sign_in = this.page.locator("//button[@id='login-button']");
        this.tab_Vendor=this.page.locator("//a[contains(.,'Vendors')]");
        this.label_Vendor=this.page.locator("//h6[text()='Vendor Management']");
        this.btn_Quick_Create_Vendor=this.page.locator("(//button[contains(.,'Create Vendor')])[1]");
        this.label_FirstName=this.page.locator("//input[@id='idVendorName']");
        this.tab_serviceArea=this.page.locator("//a[contains(.,'Service Areas')]");
        this.label_Vendor_Type=this.page.locator("//select[@id='idVendorType']");
        
    }

}