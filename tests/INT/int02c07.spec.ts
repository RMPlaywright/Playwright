import {expect, test} from '@playwright/test';
import homepage from '../../Pages/homepage';
import { sign_browse } from '../../Pages/ADM/sign_browse';
import { sign_manage } from '../../Pages/ADM/sign_manage';
import { login_manage } from '../../Pages/ADM/login_manage';
import utils from '../../Pages/UTILS/utils';
import axios from 'axios';


test.describe('docusign',()=>{
    test(' Cancel Signature launch (Browse)',async({page})=>{

        
                    const app = new homepage(page);
                    const app1 = new sign_browse(page);
                    const app2 = new sign_manage(page);
                    const pre = new login_manage(page);
                    const util = new utils(page);
                    
                    const username = 'testim_docusign_test_admin_1';
                    const buyer = 'ESO01_Buyer';
                    const password = 'T4stim2019!$';
                    await app.login(username, password);
                    const tempmail=app2.createTempEmail();
                    console.log(tempmail);
                    

                    //prereq

                  /*  app.navigateTo('login_manage/new');
                    const randm= util.generateRandom(5);
                    




                    await app.navigateTo('fil/sign_browse');
                    await app1.create_signature_transaction_btn.click();
                    await page.waitForTimeout(12000);
                    await app2.add_documents.click();
                    await app2.import_document('Dell FR_touchless_Invoice.pdf');
                    await app2.add_signator.click();
                    await app2.contact_selector_btn.fill('')*/
                    
    })
})