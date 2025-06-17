import { test } from '@playwright/test';
import homepage from '../../Pages/homepage';
import INV from '../../Pages/INV/INV';
import utils from '../../Pages/UTILS/utils';

test.describe('draft', () => {
test('Demo-screenshot-highlight', async ({ page }) => {
  test.info().annotations.push({ type: 'tag', description: 'DCC' });
 // Setup & Test Data
 const app = new homepage(page);
 const Invoice=new INV(page); 
 const utilspage = new utils(page);
 
 const username = 'testim_admin';
 const password = 'T4stim2019!$';
    
 await app.login(username, password);

 // Start test cases from here
 await app.navigateTo('ord/invoice_browse');


//utilspage.selectCustomDropdownSafe(page.locator('//*[@id="body_x_filter_content"]/table/tbody/tr[1]/td[2]/div/div/div/i'), 'Paid', page.locator('//*[@id="body_x_selStatus_end"]'));
//utilspage.selectDropdownOptionSafely(page.locator('//*[@id="body_x_filter_content"]/table/tbody/tr[1]/td[2]/div/div/div/i'), 'Sending Failure', '#body_x_selStatus_snd_fail');

await utilspage.custom_dropdown(
  page,
  page.locator('//*[@id="body_x_filter_content"]/table/tbody/tr[1]/td[2]/div/div/div/i'),
  'Sending Failure',
  '#body_x_selStatus_snd_fail'
);

});
});
