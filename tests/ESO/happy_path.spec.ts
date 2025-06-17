import {expect, test} from '@playwright/test';
import homepage from '../../Pages/homepage';
import { describe } from 'node:test';
import { sup_browse } from '../../Pages/SUP/sup_browse';
import { loginbrowse } from '../../Pages/USR/loginbrowse';
import {std_quick} from '../../Pages/RFP/rfptype_manage/std_quick';
import {profil_auth} from '../../Pages/USR/profil_auth';
import {process_manage_create} from '../../Pages/ESO/process_manage_Create';
import {utils} from '../../Pages/UTILS/utils';
 
test.describe('Happy Path',()=>{
    test('eso happy path case 1 ', async({page})=>{

            const app = new homepage(page);
            const username = 'testim_admin';
            const buyer = 'ESO01_Buyer';
            const password = 'T4stim2019!$';
/*
            await app.login(username, password);

            const app1 = new sup_browse(page);
            await app1.browse_suppliers();
            await app1.search_sup_and_validate('QA_ESO05_Fournisseur1');
            await app1.search_sup_and_validate('QA_ESO05_Fournisseur2');
            await app1.search_sup_and_validate('QA_ESO05_Fournisseur3');

            const app2 = new loginbrowse(page);
            await app2.browse_users();
            await app2.search_user_and_validate('QA_ESO05_F1@mail.com');
            await app2.search_user_and_validate('QA_ESO05_F2@mail.com');
            await app2.search_user_and_validate('QA_ESO05_F3@mail.com');

        //    app.create_configuration_context('19','harish');

            app.navigateTo('/rfp/rfptype_manage/std_quick');
            const app3 = new std_quick(page);
            await app3.Sourcing_Project_Types_Options.click();
            await app3.validateVisible(app3.Visible1);
            await app3.validateVisible(app3.Visible2);
            await app3.validateVisible(app3.Visible3);
            await app3.validateVisible(app3.Visible4);
            await app3.validateVisible(app3.Visible5);
            await app3.validateVisible(app3.Visible6);
            await app3.validateVisible(app3.Visible7);
           

            await app3.uncheckBoxandValidate(page.locator('#body_x_tabc_prxOption_prxprxOption_x_grdOption_grd_option_nda_enabled_chkActive_checkbox'));

            app.navigateTo('usr/profil_auth');

            const app4 = new profil_auth(page);
            app4.profile_authorizations.click();
            await app4.SelectUser('Buyer');
            await app4.ValidateChecked(page.getByRole('checkbox', { name: 'USR - WORKFLOW - Commodity' }));

            */

            await app.login(buyer, password);
            
            const app5 = new process_manage_create(page);
            await app.navigateTo('bpm/process_manage?Create');
            await app5.Create_Sourcin_Project('Test1','Strategic','Testim_Orga_Branch_en','3 - Testim_Commodity_level_1');
            await app5.SelectAllCurrencies();
            await app5.ValidateAllCurrencies();
            await app5.NavToSuppliersTab();
            await app5.SelectSupplierInSourcingProject('QA_ESO05_Fournisseur1');
            await app5.SelectSupplierInSourcingProject('QA_ESO05_Fournisseur2');
            await app5.SelectSupplierInSourcingProject('QA_ESO05_Fournisseur3');
            await app.SaveBtn();
            await app5.NavToDocumentTabs();
            await app5.CreateDocumentInSourcingProject('Test1');
            await app5.NavToPrepareRfxTab();
            await app5.PrepareRfxBasic('Request for Proposal');
            await app.SaveBtn();
            await app5.ValidateChecked(page.getByRole('checkbox', { name: 'Buyers can change bid due' }));
            await app5.ValidateChecked(page.getByRole('checkbox', { name: 'Buyers can bid on behalf of suppliers ' }));
            await app5.ValidateChecked(page.getByRole('checkbox', { name: 'Buyers can fill questionnaire on behalf of suppliers ' }));
            await app5.ValidateChecked(page.getByRole('checkbox', { name: 'Require suppliers to respond' }));
            await app5.ValidateChecked(page.getByRole('checkbox', { name: 'Suppliers must sign a Non' }));
            await app5.ValidateChecked(page.getByRole('checkbox', { name: 'Allow multiple total columns' }));
            await app5.ValidateChecked(page.getByRole('checkbox', { name: 'Check the presence of a total' }));
            await app5.ValidateChecked(page.getByRole('checkbox', { name: 'Suppliers can partially bid' }));
            await app.SaveBtn();
            await app5.ItemTab.click();
            await app5.ImportGridFromExcel.click();
            await app5.import_document('Grille 20 items.xlsx');
            await expect(app5.ItemsCount).toContainText(/20/);
            await app5.SendRFx();



    })
})