import { test ,expect, Locator} from '@playwright/test';
import { Homepage } from '../../Pages/homepage';


// Keep Label as draft when test is not ready to run
test.describe('ready', () => {
  test('CTL09-TC05 - Verify that saving a screen take care of the checkbox status', async ({ page }) => {
    test.info().annotations.push({ type: 'tag', description: 'CTL' }); // labels to specify the test case
    
    // Setup & Test Data
    const app = new Homepage(page);
    const username = 'testim_admin';
    const password = 'T4stim2019!$';
  
    // Test case 
    await app.login(username, password);
    await app.navigateTo('bpm/process_browse');
    
    await page.getByRole('checkbox', { name: 'Limit to my scope Only' }).check();
    await page.getByRole('button', { name: 'Search' }).click();
  //  expect(await page.getByRole('checkbox', { name: 'Limit to my scope Only' }).isChecked()).toBeTruthy();

    await page.getByRole('checkbox', { name: 'Limit to my scope Only' }).uncheck(); 
    await page.getByRole('button', { name: 'Search' }).click();
   // expect(await page.getByRole('checkbox', { name: 'Limit to my scope Only' }).isChecked()).toBeFalsy();

   });
});