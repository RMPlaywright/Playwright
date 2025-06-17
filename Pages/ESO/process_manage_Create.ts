import { Locator, Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import {utils} from '../../Pages/UTILS/utils';
import path = require('path');

dotenv.config();

export class process_manage_create
{
    private page:Page;
    public ItemTab:Locator;
    public ImportGridFromExcel:Locator;
    public ItemsCount:Locator;
    public SendRfx:Locator;
   

    constructor(page:Page)
    {
        this.page =page;
        this.ItemTab=page.getByText('Item', { exact: true });
        this.ImportGridFromExcel=page.getByRole('button', { name: 'Import Grids from Excel' });
        this.ItemsCount=page.getByText('20 Record(s)');
        this.SendRfx=page.getByRole('button', { name: 'Send RFx' });
        
    }
    
    
    async Create_Sourcin_Project(label:string,type:string,orga:string,commodity:string)
    {
           await this.page.getByRole('textbox', { name: 'Label *' }).click();
           await this.page.getByRole('textbox', { name: 'Label *' }).fill(label);
           await this.page.getByRole('combobox', { name: 'Project Type *' }).click();
           await this.page.getByRole('combobox', { name: 'Project Type *' }).fill(type);
           await this.page.getByRole('option', { name: type }).click();
           await this.page.locator('div').filter({ hasText: /^Main Organization\*Shop Paris \(Cosmetic\)See AllDelete the value\.$/ }).getByRole('button').click();
           await this.page.getByRole('combobox', { name: 'Main Organization *' }).fill(orga);
           await this.page.getByText(orga).click();
           await this.page.locator('div').filter({ hasText: /^Main Commodity\*2 - DirectSee AllDelete the value\.$/ }).getByRole('button').click();
           await this.page.getByRole('combobox', { name: 'Main Commodity *' }).fill(commodity);
           await this.page.getByText(commodity, { exact: true }).click();
           await this.page.getByRole('button', { name: 'Save', exact: true }).click();

    }

    async SelectAllCurrencies()
    {
        let util = new utils(this.page);
           await this.page.getByLabel('Secondary menu').getByText('Currencies').click();
           await this.page.waitForTimeout(1500);
           await this.page.locator('div').filter({ hasText: /^Allowed Bid Currencies\*See all selected values\.See AllDelete all values\.$/ }).locator('i').nth(2).click();
           await this.page.waitForTimeout(1500);
           await this.page.getByRole('button', { name: 'See All: Allowed Bid' }).click();
           const topMostModal1 = await util.getModalId();   
   
            if (topMostModal1) {
                // If the frame is valid (not null), proceed with the actions
               
                await topMostModal1.getByLabel('', { exact: true }).click();
           await topMostModal1.locator('#proxyActionBar_x__cmdClose').click();
               
                } else {
                console.log("No modal found or frame is null.");
            }
           
           await this.page.waitForTimeout(1500);
           await this.page.getByRole('button', { name: 'Save', exact: true }).click();
           await this.page.waitForTimeout(1500);
    }

    async ValidateAllCurrencies()
    { 
        await expect(this.page.getByRole('cell', { name: 'AED' })).toContainText('AED');
        await expect(this.page.getByRole('cell', { name: 'AUD' })).toContainText('AUD');
        await expect(this.page.getByRole('cell', { name: 'CAD' })).toContainText('CAD');
        await expect(this.page.getByRole('cell', { name: 'CNY' })).toContainText('CNY');
        await expect(this.page.getByRole('cell', { name: 'EUR', exact: true })).toContainText('EUR');
        await expect(this.page.getByRole('cell', { name: 'GBP' })).toContainText('GBP');
        await expect(this.page.getByRole('cell', { name: 'INR' })).toContainText('INR');
        await expect(this.page.getByRole('cell', { name: 'kdollars' })).toContainText('kdollars');
        await expect(this.page.getByRole('cell', { name: 'keuro' })).toContainText('keuro');
        await expect(this.page.getByRole('cell', { name: 'SGD' })).toContainText('SGD');
        
    }

    async NavToSuppliersTab()
    {
        await this.page.getByLabel('Secondary menu').getByText('Suppliers').click();
        await this.page.waitForTimeout(1500);
    }

    async SelectSupplierInSourcingProject(Supplier_Name:string)
    {
        let util = new utils(this.page);
        await this.page.locator('#body_x_prxEtap_x_upcSupplier > div > div > div > .dropdown').click();
        await this.page.waitForTimeout(1500);
        await this.page.getByRole('button', { name: 'See All: Select Suppliers' }).click();
        await this.page.waitForTimeout(1500);
        const topMostModal1 = await util.getModalId();   
   
            if (topMostModal1) {
                // If the frame is valid (not null), proceed with the actions
               
           await topMostModal1.getByRole('button', { name: 'Delete Testim_Commodity_level_1 - Testim_Commodity_level_1' }).click();
               
                } else {
                console.log("No modal found or frame is null.");
            }
           
           await this.page.waitForTimeout(1500);
           if (topMostModal1) {
            // If the frame is valid (not null), proceed with the actions
           
                await topMostModal1.getByRole('button', { name: 'Delete Supplier Group' }).click();
                    
                        } else {
                        console.log("No modal found or frame is null.");
                    }
                
                await this.page.waitForTimeout(1500);
                if (topMostModal1) {
                    // If the frame is valid (not null), proceed with the actions
                
            await topMostModal1.getByRole('button', { name: 'Delete Supplier Head-office' }).click();
                
                    } else {
                    console.log("No modal found or frame is null.");
                }
            
            await this.page.waitForTimeout(1500);
                    if (topMostModal1) {
                        // If the frame is valid (not null), proceed with the actions
                    
                    await topMostModal1.getByRole('button', { name: 'Delete Supplier Site' }).click();
                    
                        } else {
                        console.log("No modal found or frame is null.");
                    }

                    await this.page.waitForTimeout(1500);
                    if(topMostModal1)
                    {    
                    await topMostModal1.getByRole('textbox', { name: 'Keywords' }).fill(Supplier_Name);
                    }
                    else {
                        console.log("No modal found or frame is null.");
                    }
                    if (topMostModal1) {
                        // If the frame is valid (not null), proceed with the actions
                    
                await topMostModal1.getByRole('button', { name: 'Search' }).click();
                    
                        } else {
                        console.log("No modal found or frame is null.");
                    }
                
                await this.page.waitForTimeout(1500);
                if (topMostModal1) {
                    // If the frame is valid (not null), proceed with the actions
                
            await topMostModal1.getByRole('checkbox', { name: 'Select '+Supplier_Name }).check();
                
                    } else {
                    console.log("No modal found or frame is null.");
                }
            
            await this.page.waitForTimeout(1500);
            if (topMostModal1) {
                // If the frame is valid (not null), proceed with the actions
            
            await topMostModal1.locator('#proxyActionBar_x__cmdClose').click();
            
                } else {
                console.log("No modal found or frame is null.");
            }

            await this.page.waitForTimeout(1500);
            await this.page.keyboard.press('Escape');

    }

    async NavToDocumentTabs()
    {
        await this.page.getByText('Documents', { exact: true }).click();
       // await this.page.waitForTimeout(1500);
    }

    async CreateDocumentInSourcingProject(docname:string)
    { 
        let util = new utils(this.page);
        await this.page.getByRole('button', { name: 'Create Document' }).click();
        const topMostModal1 = await util.getModalId();   
   
            if (topMostModal1) {
                // If the frame is valid (not null), proceed with the actions
               
           await topMostModal1.getByRole('textbox', { name: 'Title - English' }).fill(docname);
               
                } else {
                console.log("No modal found or frame is null.");
            }
            if (topMostModal1) {
                // If the frame is valid (not null), proceed with the actions
               
           await topMostModal1.locator('div').filter({ hasText: /^Status\*DraftedTo be ApprovedApprovedDraftedBlockedDelete the value\.$/ }).getByRole('button').click();
           await topMostModal1.getByRole('combobox', { name: 'Status *' }).fill('Approved');
           await topMostModal1.getByRole('option', { name: 'Approved', exact: true }).click();
           await topMostModal1.getByRole('button', { name: 'Save & Close' }).click();
           
               
                } else {
                console.log("No modal found or frame is null.");
            }

          
            


    }

    async NavToPrepareRfxTab()
    {
        await this.page.getByLabel('Secondary menu').getByText('Prepare RFx').click();

    }


    async PrepareRfxBasic(Type:string)
    {
        await this.page.getByRole('combobox', { name: 'RFx Type *' }).click();
        await this.page.getByRole('combobox', { name: 'RFx Type *' }).fill(Type);
        await this.page.getByRole('option', { name: 'Request for Proposal' }).click();
        await this.page.getByRole('textbox', { name: 'End (M/d/yyyy) *' }).click();
        await this.page.getByRole('button', { name: '+1M' }).click();

        
    }
    
    async ValidateChecked(chkbox : Locator)
    {
        await chkbox.check();
        await expect(chkbox).toBeChecked();
    }

/*
     async UploadFileItems(p0: string) {
        await this.page.waitForLoadState('domcontentloaded');
       // await this.page.setInputFiles();
        await this.page.locator('iframe[name="f482a2f15-VIEW"]').contentFrame().locator('#body_x_txtImport').click();
        await this.page.locator('iframe[name="f482a2f15-VIEW"]').contentFrame().locator('#body_x_txtImport').setInputFiles('input[type="file"]', './downloads/'+p0);
        await this.page.locator('iframe[name="f482a2f15-VIEW"]').contentFrame().getByRole('button', { name: 'Check import' }).click();
        await this.page.locator('iframe[name="f482a2f15-VIEW"]').contentFrame().getByRole('button', { name: 'Import items' }).click();
        await this.page.locator('iframe[name="f482a2f15-VIEW"]').contentFrame().locator('#proxyActionBar_x__cmdClose').click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(3000);
        console.log('\n File Uploaded...\n ');
    
        
      }
*/

   async import_document(fileName: string)
        {
            let util = new utils(this.page);
            const filePath = path.resolve(__dirname, '../../downloads', fileName);
            const fs = require('fs');
        
            if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
            }
            const topMostModal1 = await util.getModalId();   
   
            if (topMostModal1) {
                // If the frame is valid (not null), proceed with the actions
               
         //  await topMostModal1.getByRole('button', { name: 'Click or Drag to add files' }).click();
           const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            await topMostModal1.locator('//*[@id="body_x_txtImport"]').click()]);
        
            await fileChooser.setFiles([filePath]);
        
           
        
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForLoadState('load');
        
            //await this.page.waitForTimeout(30000);

            await topMostModal1.getByRole('button', { name: 'Check import' }).click();

            await expect(topMostModal1.locator('#body_x')).toContainText('Column(s) changed');

            await topMostModal1.getByRole('button', { name: 'Import items' }).click();
            await this.page.waitForLoadState('load');

            await topMostModal1.locator('#proxyActionBar_x__cmdClose').click();
               
                } else {
                console.log("No modal found or frame is null.");
            }
           
            
        }

        async SendRFx()
        {
            let util = new utils(this.page);
            await this.SendRfx.click();
            const topMostModal1 = await util.getModalId();   
            if(topMostModal1)
            {   
                await topMostModal1.getByRole('checkbox', { name: 'Select all rows ' }).check();
                await topMostModal1.getByRole('button', { name: 'Send and close' }).click();
            }else {
                console.log("No modal found or frame is null.");
            }

        }
    

}

export default process_manage_create;