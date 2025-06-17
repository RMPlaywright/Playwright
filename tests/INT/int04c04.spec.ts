import {expect, test, request} from '@playwright/test';
import homepage from '../../Pages/homepage';
import { api_browse } from '../../Pages/INT/api_browse';
import { api_manage } from '../../Pages/INT/api_manage';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('api testing ',()=>{
    test('API Security, Authentication type API key in query string',async({page})=>{

                            const app = new homepage(page);
                            const username = 'testim_admin_INT04_1';
                            const buyer = 'ESO01_Buyer';
                            const password = 'T4stim2019!$';
                            const app2 = new api_browse(page);
                            const app3= new api_manage(page);
                            const baseUrl1 = 'https://envqa.ivalua.app/buyer/demo/functtestauto37/bgky2/page.aspx/en';

                            await app.login(username,password);
                            await app.navigateTo('api/api_browse');
                            await app.create_configuration_context('134','int04-04')
                            await app2.SetHttpMethodPOST();
                            
                            await app.SearchKeywords('std_account');
                            await app2.editapibtn.click();
                            await page.waitForTimeout(1900);
                            await app3.security_tab_btn.click();
                            await page.waitForTimeout(1900);
                            await app3.SetAuthenticationApiKey();
                            await app.SaveBtn();

                            await app3.SetUser();
                            const apiKey=app3.api_key_locator.textContent();
                            const apiUrl=app3.api_url_locator.textContent();
                            console.log(apiKey);
                            console.log(apiUrl);
                            
                       
                            console.log(baseUrl1);
                            console.log("Split   " + baseUrl1.split("page.aspx")[0]);
                            const newURL = baseUrl1.split("page.aspx")[0] + "async.aspx/en/eai/api/std_account?apikey=" + apiKey;

                            const headers = {
                                'Content-Type': 'application/xml',
                              };

                              const body = `
                                            <std_account_updates>
                                                <std_account_update>
                                                <LCOMP_CODE>TOLC</LCOMP_CODE>
                                                <ACC_CODE>300</ACC_CODE>
                                                <ACC_LABEL_FR>INT04_C4</ACC_LABEL_FR>
                                                <ACCTYPE_CODE></ACCTYPE_CODE>
                                                <ACA_CODE></ACA_CODE>
                                                <TVA_CODE_DEFAULT></TVA_CODE_DEFAULT>
                                                <ACC_CODE_TVA_DEFAULT></ACC_CODE_TVA_DEFAULT>
                                                </std_account_update>
                                            </std_account_updates>`;

                                            const apiContext = await request.newContext();
                                            const response = await apiContext.post(newURL, {
                                                headers: headers,
                                                data: body,
                                              });

                                              expect(response.status()).toBe(200);
                                              const responseBody = await response.text();
                                              console.log(responseBody);


/*      INVALID API NEED TO CHECK
                                              const wrongUrl = baseUrl1.split("page.aspx")[0] + "async.aspx/en/eai/api/std_account?apikey=" + 'AAA'+apiKey;    
                                              const response2 = await apiContext.post(wrongUrl, {
                                                headers: headers,
                                                data: body,
                                              });

                                              expect(response2.status()).toBe(401);
                                              const responseBody1 = await response2.text();
                                              console.log(responseBody1);
*/


    })
})