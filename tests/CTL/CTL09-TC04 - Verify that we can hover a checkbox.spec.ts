import { expect, Locator, test } from '@playwright/test';
import { param_browse } from '../../Pages/BAS/param_browse';
import { Homepage } from '../../Pages/homepage';
import utils from '../../Pages/UTILS/utils';

// Keep Label as draft when test is not ready to run
test.describe('ready', () => {
  test('CTL09-TC04 - Verify that we can hover a checkbox', async ({ page }) => {
    test.info().annotations.push({ type: 'tag', description: 'CTL' }); // labels to specify the test case
    
    // Setup & Test Data
    const app = new Homepage(page);
    const bas = new param_browse(page);
    const utilsPage = new utils(page);
    const username = 'testim_admin';
    const password = 'T4stim2019!$';
    const chk:Locator=page.getByRole('button', { name: 'Search' });
    // Test case 
    await app.login(username, password);


    await app.navigateTo('bpm/process_browse');
    await page.locator('label').filter({ hasText: 'Limit to my scopeOnly display' }).locator('i').hover();
  
    console.log('Computed Styles-', await utilsPage.getSpecificStyle(chk,'background-color'));

    expect(await utilsPage.getSpecificStyle(chk,'background-color')).toBe('rgb(7, 89, 266)');
    app.close();



 
    
   });
});