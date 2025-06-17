import {expect, test} from '@playwright/test';
import homepage from '../../Pages/homepage';
import { interface_browse } from '../../Pages/INT/interface_browse';
import { interface_manage } from '../../Pages/INT/interface_manage';
import import_manage from '../../Pages/INT/import_manage';
import { utils } from "../../Pages/UTILS/utils";

test.describe('EAI test case',()=>{
    test(' Create EAI from Template',async({page})=>{
                    
        
                    const app = new homepage(page);
                    const username = 'testim_admin_INT04_1';
                    const buyer = 'ESO01_Buyer';
                    const password = 'T4stim2019!$';
                    const app1 = new interface_browse(page);
                    const uapp = new utils(page);
                    const random = uapp.generateRandom(8);
                    const app2=new interface_manage(page);

                    await app.login(username, password);

                    await app.navigateTo('eai/interface_browse');
                    await app.SearchKeywords('RMQA_EAI_QueryDataset');
                                      await app1.editeai.click();
                    
                    
                    await app2.deletetemplatebtnyes.click();
                    await app2.templatebtn.fill('Yes');
                    await page.getByRole('option', { name: 'Yes' }).locator('span').click();
                    await app.SaveBtn();
                    await app2.TestTabbtn.click();
                    page.once('dialog', dialog => {
                        console.log(`Dialog message: ${dialog.message()}`);
                        dialog.accept().catch(() => {});
                      });
                    await app2.StartBtn.click();
                    

                    await page.waitForTimeout(25000);
                    await app2.validateClassNameContainsGreen(page.getByRole('button', { name: 'QDSG' }));
                    await app2.validateClassNameContainsRed(page.getByRole('button', { name: 'QDSKONODATA' }));
                    await app2.validateClassNameContainsOrange(page.getByRole('button', { name: 'QDSWARNNORES' }));

                    await app.navigateTo('eai/interface_browse');
                    await app.create_configuration_context('134','int03-04');
                    await app1.CreateEaiFromTemplate.click();

                    await app1.createEaiFromTemplate('RMQA_EAI_QueryDataset'+random,'RMQA_EAI_QueryDataset','RMQA_EAI_QueryDataset'+random);
                    await page.waitForTimeout(1900);
                    await app2.deletetemplatebtnno.click();
                    await app2.templatebtn.fill('No');
                    await page.getByRole('option', { name: 'No' }).locator('span').click();  
                    await app.SaveBtn();
                    await app2.TestTabbtn.click();
                    page.once('dialog', dialog => {
                        console.log(`Dialog message: ${dialog.message()}`);
                        dialog.accept().catch(() => {});
                      });
                    await app2.StartBtn.click();
                    await page.waitForTimeout(25000);
                    await app2.validateClassNameContainsGreen(page.getByRole('button', { name: 'QDSG' }));
                    await app2.validateClassNameContainsRed(page.getByRole('button', { name: 'QDSKONODATA' }));
                    await app2.validateClassNameContainsOrange(page.getByRole('button', { name: 'QDSWARNNORES' }));






    })
})