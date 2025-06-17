import { test, expect } from '@playwright/test';

import INV from '../../Pages/INV/invoice_manage';
import Homepage from '../../Pages/homepage';
import utils from '../../Pages/UTILS/utils';
import { log } from 'console';


// let login_page = 'https://envqa.ivalua.app/buyer/demo/functtestauto46/snhfx/page.aspx/en/usr/login';
// let create_invoice_page = 'https://envqa.ivalua.app/buyer/demo/functtestauto46/snhfx/page.aspx/en/ord/invoice_manage?invoiceType=INV'; 

let username = 'testim_buyer_allperim'//'testim_buyer_allperim';
let password = 'T4stim2019!$';


test('INV_TEST', async ({ page }) => 
    {
    // body_x_tabc_prxInvoice_INV_prxprxInvoice_INV_x_selOrga_MenuItem
   
    const inv = new INV(page);
    const app = new Homepage(page);
    const util = new utils(page);
    
    let rV = util.generateRandom(5);
     let invoice_number = "Playwright_INV-Test_"+rV;
    console.log(invoice_number);
    
    await app.login(username, password);

    await inv.navigateToCreateInvoice();

    await inv.create_invoice({
        Invoice_Number : invoice_number,
        Due_Date : "1/30/2025", 
        Invoice_Date : "1/30/2025", 
        Supplier_Name :'Dell US', 
        Organization_Name: 'Abu Dhabi (Technologies)'
    });
    
    await inv.addNonPoLine( "Item", "Item_01_"+rV, "6", "100", "Exempt")
    
    await page.getByRole('button', { name: 'Display allocation line taxes' }).click();
    
    const topMostModal1 = await util.getModalId();   
   
    if (topMostModal1) {
        // If the frame is valid (not null), proceed with the actions
        let dec = await topMostModal1.getByRole('cell', { name: 'Deductible' }).getAttribute('class');
        console.log(dec);
        await expect(dec).toContain("close");
    } else {
        console.log("No modal found or frame is null.");
    }
    if (topMostModal1) {
        // If the frame is valid (not null), proceed with the actions
        let dec1 = await topMostModal1.getByRole('table', { name: 'Tax details' }).locator('div').nth(3).getAttribute('class');
        console.log(dec1);
        await expect(dec1).toContain("readonly");
        await topMostModal1.getByRole('button', { name: 'Close', exact: true }).click();  
    } else {
        console.log("No modal found or frame is null.");
    }
    
    const button = await page.locator(`//button[./*[@class and contains(@class, 'fa-pencil-alt')]][1]`);
    await button.click();

    const topMostModal2 = await util.getModalId();
    if (topMostModal2) {
        await topMostModal2.getByRole('button', { name: 'Display allocation line taxes' }).click();
        await page.waitForLoadState();
    } else {
        console.log("No modal found or frame is null.");
    }

    const topMostModal3 = await util.getModalId();
    if (topMostModal3) {
        // If the frame is valid (not null), proceed with the actions
        let dex = await topMostModal3.getByRole('cell', { name: 'Deductible' }).getAttribute('class');
        await expect(dex).toContain('close');
    } else {
        console.log("No modal found or frame is null.");
    }
    
    if (topMostModal3) {
        // If the frame is valid (not null), proceed with the actions
        let dex2 = await topMostModal3.getByRole('table', { name: 'Tax details' }).locator('div').nth(3).getAttribute('class');
        await expect(dex2).toContain('readonly');
        await topMostModal3.getByRole('button', { name: 'Close', exact: true }).click();  
    } else {
        console.log("No modal found or frame is null.");
    }
    
    if (topMostModal2) {
        // If the frame is valid (not null), proceed with the actions
        await topMostModal2.getByRole('button', { name: 'Close', exact: true }).click();  
    } else {
        console.log("No modal found or frame is null.");
    }
    await page.pause();
});
