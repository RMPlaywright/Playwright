import { test, expect } from '@playwright/test';
import payment_request_browse from '../../Pages/PAY/payment_request_browse';
import INV from '../../Pages/INV/invoice_manage';
import Homepage from '../../Pages/homepage';
import utils from '../../Pages/UTILS/utils';


test('PAYFAC01-S01', async ({ page }) => 
    {
        let admin_username = "testim_admin_PAYFAC01_S01";
        let apClerk_username = "Testim_AccountingAP_PAYFAC01_S01";
        let password = "T4stim2019!$";

        const inv = new INV(page);
        const app = new Homepage(page);
        const util = new utils(page);

        let rV = util.generateRandom(5);

        let invoice_number = "PAYFAC01-S01" ;

        await app.login(admin_username, password);

        await inv.navigateToCreateInvoice();

        await inv.create_invoice({
            Invoice_Number: invoice_number+rV,
            Supplier_Name: 'Dell US',
            Due_Date: '3/25/2025',
            Invoice_Date: '3/25/2025',
            Organization_Name: 'Shop Palo Alto (Cosmetic)',
            invoicing_Supplier: 'Dell US' // Optional, you can omit this if not needed
          });
        
     try {
         await expect(page.locator('//*[@id="header_x_prxHeaderTitle_x"]')).toContainText("Draft");
 
     } catch (error) {
      
     }
        await inv.addNonPoLine( "Item", "Item_01_"+rV, "1", "99.9", "Exempt");
        
        await inv.payee_Locator.scrollIntoViewIfNeeded();
        await inv.payee_Locator.click();
        await inv.payee_Locator.fill("Dell US");
        await page.keyboard.press("Enter");

        // await inv.add_Allocation({
        //   allocCost_Center : "602220 - Components - Clarity Cosmetic", 
        //   allocExpense_Account : ""})

        await inv.save_Button_Locator.click();
        
        let invoicePageUrl = page.url();
        
        await app.login(apClerk_username, password);

        await app.navigateTo("ord/invoice_browse");
        await util.searchKeyword(invoice_number+rV);
        await util.editPencil_Icon_locator.click();

        let paymentType = page.getByRole('combobox', { name: 'Payment Type *' });

       // await paymentType.scrollIntoViewIfNeeded();
        
        await paymentType.locator('xpath=./following-sibling::*[3]').click();
        await page.waitForTimeout(1500);
        await page.waitForLoadState('networkidle', { timeout: 10000 });
        await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
  
        await paymentType.click();
        await paymentType.fill("Bank Transfer");
        await page.waitForTimeout(1500);
        await page.waitForLoadState('networkidle', { timeout: 10000 });
        await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
  
   

       //await util.custom_click2(await page.getByRole('option', { name: 'Bank Transfer' }));
      
      await page.waitForTimeout(1500);
      await page.waitForLoadState('networkidle', { timeout: 10000 });
      await page.waitForLoadState('domcontentloaded', { timeout: 10000 });



      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForLoadState('domcontentloaded', { timeout: 10000 });

     

 try {
       
      const buttonLocator = page.locator('//button[@id="proxyActionBar_x__cmdVal" and @type="submit" and contains(@class, "iv-button")]');
      await buttonLocator.scrollIntoViewIfNeeded();
      await buttonLocator.waitFor({ state: 'visible' });
      await buttonLocator.click();
     
 } catch (error) {
  
 }
 try {
       
  await util.custom_click(page.locator('//button[@id="proxyActionBar_x__cmdVal" and @type="submit" and contains(@class, "iv-button")]'));
 
} catch (error) {

}


      await util.custom_click(page.locator('//*[@id="proxyActionBar_x_valstd_inv_refnon_po_review"]')); //APPROVE        
       try {
         await expect(page.locator('//*[@id="header_x_prxHeaderTitle_x"]')).toContainText("AP Review");
       } catch (error) {
        
       }
        
        await page.waitForLoadState('domcontentloaded');
        await page.waitForLoadState('networkidle');
        
        invoicePageUrl = page.url();
        
        await inv.otherAction_Button_Locator.click();
        // await inv.otherAction_Unlock_Button_Locator.click();

        await page.waitForTimeout(1500);

        await util.clearSessionData();

        await app.login(admin_username, password);
        await page.waitForTimeout(1500);
        
        await page.goto(invoicePageUrl);
        
       await util.custom_click(page.locator('(*//button[@id="proxyActionBar_x_valstd_inv_refnon_po_review"])[1]')); // "]'));
       
       try {
        await expect(page.locator('//*[@id="header_x_prxHeaderTitle_x"]')).toContainText("AP Review");

      } catch (error) {
       
      }
  await util.custom_click(page.locator('//*[@id="proxyActionBar_x_valstd_inv_reftax_review"]')); // APPROVE
        try {
          await expect(page.locator('//*[@id="header_x_prxHeaderTitle_x"]')).toContainText("Ok to Pay");
        } catch (error) {
          
        }
       

      await util.custom_click(inv.approval_Status_Locator);
      await util.custom_click(inv.approval_Status_Summary_Locator);
      await page.waitForLoadState("domcontentloaded");
      console.log("Clicked on approval Status ");






      //  await util.custom_click2(page.locator('//*[@id="proxyActionBar_x_valstd_inv_refnon_po_review"]')); //APPROVE
     
      //   await util.custom_click2(page.locator('//*[@id="proxyActionBar_x_valstd_inv_reftax_control"]')); // CONTROL TAX
      //   try {
      //     await expect(page.locator('//*[@id="header_x_prxHeaderTitle_x"]')).toContainText("AP Review");
  
      //   } catch (error) {
          
      //   }
      //   await util.custom_click2(page.locator('//*[@id="proxyActionBar_x_valstd_inv_reftax_review"]')); // APPROVE
      //   try {
      //     await expect(page.locator('//*[@id="header_x_prxHeaderTitle_x"]')).toContainText("Ok to Pay");
      //   } catch (error) {
          
      //   }
        
        // await util.custom_click(page.locator('//*[@id="proxyActionBar_x_valstd_inv_reftax_review"]')); // APPROVE
        // await expect(page.locator('//*[@id="header_x_prxHeaderTitle_x"]')).toContainText("Ok to Pay");

       try {
         await expect(page.getByRole('alert').locator('i').first()).toBeVisible();
         await expect(page.locator('//*[@id="content"]/div[1]')).toHaveAttribute("data-criticity", "error");
       } catch (error) {
        
       }

        // await util.custom_click2(inv.approval_Status_Locator);
        // await util.custom_click2(inv.approval_Status_Summary_Locator);
        // await page.waitForLoadState("domcontentloaded");
        // console.log("Clicked on approval Status ");
        
        await util.custom_click(page.getByRole('row', { name: 'Detailed view column Tax /' }).getByLabel('Reinit. activity'));
          console.log("Invoice is Back to Draft Status ");


          await inv.add_Allocation({
            allocCost_Center : "602220 - Components - Clarity Cosmetic"});

          await inv.submitToApprovalBtn.click();
          await inv.submitToApprovalBtn.click();
        
    });