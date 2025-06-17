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


test('INV08_S08_C02', async ({ page }) => 
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
        
        const uploadedFile_EditButton = page.locator(`((//a[./*[@class and contains(@class, 'fa-pencil-alt')]] | //button[./*[@class and contains(@class, 'fa-pencil-alt')]])[1])`);
        await uploadedFile_EditButton.click();

        await invoice_capture_manage_obj.generation_IRN_Locator.scrollIntoViewIfNeeded();
        await expect(invoice_capture_manage_obj.invoice_Ref_Number_locator).not.toBeEmpty();
        await expect(invoice_capture_manage_obj.generation_IRN_Locator).not.toBeEmpty();

        await invoice_capture_manage_obj.otherActions_locator.click();
        await invoice_capture_manage_obj.otherActions_display_QR_info.click();

        let modalLocator = await util.getModalId();

        if(modalLocator)
        {
            await modalLocator.getByRole('button', { name: 'Update The Values With The QR' }).click();
            await modalLocator.getByText('Data has been saved').waitFor({state:"visible"});
            await modalLocator.getByRole('button', { name: 'btnClose' }).click();
        }

        await invoice_capture_manage_obj.generation_IRN_Locator.scrollIntoViewIfNeeded();
        await expect(invoice_capture_manage_obj.invoice_Ref_Number_locator).not.toBeEmpty();
        await expect(invoice_capture_manage_obj.generation_IRN_Locator).not.toBeEmpty();

        await expect(invoice_capture_manage_obj.invoice_Ref_Number_locator).not.toBeEditable();
        await expect(invoice_capture_manage_obj.generation_IRN_Locator).not.toBeEditable();

});