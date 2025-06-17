import {test,expect} from '@playwright/test';
import homepage from '../../Pages/homepage';
import { describe } from 'node:test';
import { sup_browse } from '../../Pages/SUP/sup_browse';
import { loginbrowse } from '../../Pages/USR/loginbrowse';
import {std_quick} from '../../Pages/RFP/rfptype_manage/std_quick';
 
test.describe('Happy Path',()=>{
    test('eso happy path case 1 ', async({page})=>{

            const app = new homepage(page);
            const username = 'testim_admin';
            const password = 'T4stim2019!$';

            await app.login(username, password);

            // const app1 = new sup_browse(page);
            // await app1.browse_suppliers();
            // await app1.search_sup_and_validate('QA_ESO05_Fournisseur1');
            // await app1.search_sup_and_validate('QA_ESO05_Fournisseur2');
            // await app1.search_sup_and_validate('QA_ESO05_Fournisseur3');

            // const app2 = new loginbrowse(page);
            // await app2.browse_users();
            // await app2.search_user_and_validate('QA_ESO05_F1@mail.com');
            // await app2.search_user_and_validate('QA_ESO05_F2@mail.com');
            // await app2.search_user_and_validate('QA_ESO05_F3@mail.com');

            // app.navigateTo('/rfp/rfptype_manage/std_quick');
            // const app3 = new std_quick(page);
            // await app3.Sourcing_Project_Types_Options.click();
await expect(page.locator('#body_x_tabc_prxOption_prxprxOption_x_grdOption_grd_option_buyer_can_change_due_date')).toContainText('Visible');
await expect(page.locator('#body_x_tabc_prxOption_prxprxOption_x_grdOption_grd_option_buyer_can_fill_questionnaire')).toContainText('Visible');

await expect(page.locator('#body_x_tabc_prxOption_prxprxOption_x_grdOption_grd_option_buyer_see_all_bids')).toContainText('Visible');







            await page.getByRole('button', { name: 'Sourcing' }).click();
            await page.getByRole('link', { name: 'Sourcing Projects' }).click();
            await page.getByRole('link', { name: 'Create Project' }).click();
            await page.goto('https://envqa.ivalua.app/buyer/demo/functtestauto12/y6ns5/page.aspx/en/bpm/process_manage');
            await expect(page.locator('div').filter({ hasText: /^In progress$/ })).toContainText('In progress');

           ////
           await page.getByRole('combobox', { name: 'Profile', exact: true }).click();
           await page.getByRole('combobox', { name: 'Profile', exact: true }).fill('buyer');
           await page.getByRole('option', { name: 'Buyer' }).click();


           ////
           await page.getByRole('textbox', { name: 'Label *' }).click();
           await page.getByRole('textbox', { name: 'Label *' }).fill('test');
           await page.getByRole('combobox', { name: 'Project Type *' }).click();
           await page.getByRole('combobox', { name: 'Project Type *' }).fill('simple');
           await page.getByText('Simple').click();
           await page.locator('div').filter({ hasText: /^Main Organization\*Shop Paris \(Cosmetic\)See AllDelete the value\.$/ }).getByRole('button').click();
           await page.getByRole('combobox', { name: 'Main Organization *' }).fill('testim');
           await page.getByText('Testim_Orga_Compagny_en').click();
           await page.locator('div').filter({ hasText: /^Main Commodity\*2 - DirectSee AllDelete the value\.$/ }).getByRole('button').click();
           await page.getByRole('combobox', { name: 'Main Commodity *' }).fill('testim');
           await page.getByText('3 - Testim_Commodity_level_1', { exact: true }).click();
           await page.getByRole('button', { name: 'Save', exact: true }).click();

           ////////////////
           await page.getByLabel('Secondary menu').getByText('Currencies').click();
           await page.locator('div').filter({ hasText: /^Allowed Bid Currencies\*See all selected values\.See AllDelete all values\.$/ }).locator('i').nth(2).click();
           await page.getByRole('button', { name: 'See All: Allowed Bid' }).click();
           await page.locator('iframe[name="f1eae230-VIEW"]').contentFrame().getByLabel('', { exact: true }).check();
           await page.locator('iframe[name="f1eae230-VIEW"]').contentFrame().locator('#proxyActionBar_x__cmdClose').click();
           await page.getByRole('button', { name: 'Save', exact: true }).click();

           ////////////////////////////
           await expect(page.locator('#body_x_prxEtap_x_placeholder_process_140312120406')).toContainText('AED');
           await page.locator('#body_x_prxEtap_x_placeholder_process_140312120406').getByRole('list').getByText('AUD', { exact: true }).click();

           await expect(page.locator('#body_x_prxEtap_x_gridExchangeRate_grd_tr_19525_x124_AED')).toContainText('AED');
           await expect(page.locator('#body_x_prxEtap_x_gridExchangeRate_grd_tr_19526_x124_AUD')).toContainText('AUD');
           await expect(page.locator('#body_x_prxEtap_x_gridExchangeRate_grd_tr_19526_x124_CAD')).toContainText('CAD');
           await expect(page.locator('#body_x_prxEtap_x_gridExchangeRate_grd_tr_19526_x124_CNY')).toContainText('CNY');
           await expect(page.locator('#body_x_prxEtap_x_gridExchangeRate_grd_tr_19526_x124_EUR')).toContainText('EUR');
           await expect(page.locator('#body_x_prxEtap_x_gridExchangeRate_grd_tr_19526_x124_GBP')).toContainText('GBP');
           await expect(page.locator('#body_x_prxEtap_x_gridExchangeRate_grd_tr_19526_x124_INR')).toContainText('INR');
           await expect(page.locator('#body_x_prxEtap_x_gridExchangeRate_grd_tr_19526_x124_kdollars')).toContainText('kdollars');
           await expect(page.locator('#body_x_prxEtap_x_gridExchangeRate_grd_tr_19526_x124_keuro')).toContainText('keuro');
           await expect(page.locator('#body_x_prxEtap_x_gridExchangeRate_grd_tr_19526_x124_SGD')).toContainText('SGD');


           /////
           await page.getByLabel('Secondary menu').getByText('Suppliers').click();
          
           
           await page.locator('iframe[name="f5bba0f6e-VIEW"]').contentFrame().getByRole('button', { name: 'Delete Testim_Commodity_level_1 - Testim_Commodity_level_1' }).click();
           await page.locator('iframe[name="f5bba0f6e-VIEW"]').contentFrame().getByRole('button', { name: 'Delete Supplier Group' }).click();
           await page.locator('iframe[name="f5bba0f6e-VIEW"]').contentFrame().getByRole('button', { name: 'Delete Supplier Head-office' }).click();
           await page.locator('iframe[name="f5bba0f6e-VIEW"]').contentFrame().getByRole('button', { name: 'Delete Supplier Site' }).click();
           await page.locator('iframe[name="f5bba0f6e-VIEW"]').contentFrame().getByRole('textbox', { name: 'Keywords' }).click();
           await page.locator('iframe[name="f5bba0f6e-VIEW"]').contentFrame().getByRole('textbox', { name: 'Keywords' }).click();
           await page.locator('iframe[name="f5bba0f6e-VIEW"]').contentFrame().getByRole('textbox', { name: 'Keywords' }).fill('QA_ESO05_Fournisseur1');
           await page.locator('iframe[name="f5bba0f6e-VIEW"]').contentFrame().getByRole('button', { name: 'Search' }).click();
           await page.locator('iframe[name="f5bba0f6e-VIEW"]').contentFrame().getByRole('checkbox', { name: 'Select QA_ESO05_Fournisseur1' }).check();
           await page.locator('iframe[name="f5bba0f6e-VIEW"]').contentFrame().locator('#proxyActionBar_x__cmdClose').click();


           await expect(page.locator('#body_x_prxEtap_x_vselSupplier_grd_tr_13097')).toContainText('QA_ESO05_FOURNISSEUR1 QA_ESO05_Fournisseur1 (QA_ESO05_F1@mail.com)');



           await page.getByRole('button', { name: 'Create Document' }).click();


           /////////////////////////

           await page.getByRole('combobox', { name: 'RFx Type *' }).click();
           
           await page.getByRole('combobox', { name: 'RFx Type *' }).fill('Request for Proposal');
           await page.getByRole('option', { name: 'Request for Proposal' }).click();
           await page.getByRole('textbox', { name: 'End (M/d/yyyy) *' }).click();
           await page.getByRole('button', { name: '+1M' }).click();

           ////////////////////////\
           await page.locator('iframe[name="f482a2f15-VIEW"]').contentFrame().locator('#body_x_txtImport').click();
          

    })
})