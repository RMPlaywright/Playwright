import { test, expect } from '@playwright/test';

import INV from '../../Pages/INV/invoice_manage';
import Homepage from '../../Pages/homepage';
import utils from '../../Pages/UTILS/utils';
import Invoice_Capture_Browse from '../../Pages/INV/Invoice_Capture_Browse';
import Invoice_Capture_Manage from '../../Pages/INV/Invoice_Capture_Manage';


// let login_page = 'https://envqa.ivalua.app/buyer/demo/functtestauto46/snhfx/page.aspx/en/usr/login';
// let create_invoice_page = 'https://envqa.ivalua.app/buyer/demo/functtestauto46/snhfx/page.aspx/en/ord/invoice_manage?invoiceType=INV'; 

let username = 'testim_buyer_allperim'//'testim_buyer_allperim';
let password = 'T4stim2019!$';


test('INV08_S11_C01', async ({ page }) => 
    {
   
        const inv = new INV(page);
        const app = new Homepage(page);
        const util = new utils(page);
        const invoice_capture_browse_obj = new Invoice_Capture_Browse(page);
        const invoice_capture_manage_obj = new Invoice_Capture_Manage(page);
        
        let rV = util.generateRandom(5);

        
        await app.login(username, password);

        await app.navigateTo("ord/invoice_capture_browse");

        await util.import_document({
            fileName : "IndianInvoiceWithQR_Code (1).pdf",
            locator_whereTo_Upload : invoice_capture_browse_obj.click_or_Drag_to_add_Files_locator
        })


        // await page.waitForSelector(`//*[contains(@id, 'body_x_grid_grd_tr') and contains(@id, '_imgLoading')]/i`, { state: 'visible' });
        await page.waitForSelector(`//*[contains(@id, 'body_x_grid_grd_tr') and contains(@id, '_imgLoading')]/i`, { state: 'hidden' });
        
        let uploadedFile_EditButton = page.locator(`((//a[./*[@class and contains(@class, 'fa-pencil-alt')]] | //button[./*[@class and contains(@class, 'fa-pencil-alt')]])[1])`);
        await uploadedFile_EditButton.click();

        let orga_locator = invoice_capture_manage_obj.organization_ID_Locator
        let curr_locator = invoice_capture_manage_obj.currency_locator
        let total_taxAmt_Locator = invoice_capture_manage_obj.Total_taxes_amount_locator;

        await orga_locator.click();
        await orga_locator.fill("Testim_Orga_Site_1_en");
        await page.keyboard.press("Enter");
        await page.getByRole('option', { name: 'Testim_Orga_Site_1_en' }).click();
        
        await curr_locator.click();
        await curr_locator.fill("EUR");
        await page.keyboard.press("Enter");

        await total_taxAmt_Locator.click();
        await total_taxAmt_Locator.fill("0");

        await invoice_capture_manage_obj.saveButton.click();

        await invoice_capture_manage_obj.otherActions_locator.click();
        await invoice_capture_manage_obj.otherActions_display_QR_info.click();

        let modalLocator = await util.getModalId();

        if(modalLocator)
        {
         
            await expect(modalLocator.getByRole('cell', { name: 'SellerGstin' })).toBeVisible();
            await expect(modalLocator.getByRole('cell', { name: 'BuyerGstin' })).toBeVisible();
            await expect(modalLocator.getByRole('cell', { name: 'DocNo' })).toBeVisible();
            await expect(modalLocator.getByRole('cell', { name: 'DocTyp' })).toBeVisible();
            await expect(modalLocator.getByRole('cell', { name: 'DocDt' })).toBeVisible();
            await expect(modalLocator.getByRole('cell', { name: 'TotInvVal' })).toBeVisible();
            await expect(modalLocator.getByRole('cell', { name: 'ItemCnt' })).toBeVisible();
            await expect(modalLocator.getByRole('cell', { name: 'MainHsnCode' })).toBeVisible();
            await expect(modalLocator.getByRole('cell', { name: 'Irn', exact: true })).toBeVisible();
            await expect(modalLocator.getByRole('cell', { name: 'IrnDt' })).toBeVisible();
        }

        

});