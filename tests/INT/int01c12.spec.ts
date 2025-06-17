import {expect, test} from '@playwright/test';
import homepage from '../../Pages/homepage';
import {import_browse} from '../../Pages/INT/import_browse';
import {import_manage} from '../../Pages/INT/import_manage';
import {utils} from '../../Pages/UTILS/utils';
 
test.describe('Integration Test Case',()=>{
    test('ETL import Cancel import (std_commodity)', async({page})=>{

            const app = new homepage(page);
            const username = 'testim_admin_INT04_1';
            const buyer = 'ESO01_Buyer';
            const password = 'T4stim2019!$';

            await app.login(username, password);

            await app.navigateTo('etl/import_browse');
            

            const app1 = new import_browse(page);
            await app1.CreateImportBtn.click();

            const app2 = new import_manage(page);
            await app2.SearchEtl('std_commodity');
            await app2.editetlbtn.click();

            const app3 = new utils(page);
            //await app3.UploadFile('INT01_C12_std_commodity.csv');
            await app2.addbtn.click();
            await expect(app2.availablegrid).toContainText('INT01_C12_std_commodity.csv');
            await app2.importbtn.click();
            await app2.validateClassNameContainsGreen(app2.importandfilechkiconbtn);
            await app2.cleanandenrichtabiconbtn.click();
            page.once('dialog', dialog => {
                console.log(`Dialog message: ${dialog.message()}`);
                dialog.accept().catch(() => {});
              });
            await app2.submitallvalidlinesbtn.click({ force: true });
            await page.waitForTimeout(10000);
         
           page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => {});
          });
         
            await app2.validateClassNameContainsGreen(app2.cleanandenrichtabiconbtn);
            await app2.cancelbtb.click();
            await page.keyboard.press('Enter');
            await app1.ValidateUrlContainsbrowse();

        
   

            

        })
    })