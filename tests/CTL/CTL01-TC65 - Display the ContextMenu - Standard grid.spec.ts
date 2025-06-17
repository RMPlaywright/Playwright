import { test, expect, Locator } from '@playwright/test';
import { Homepage } from '../../Pages/homepage';
import utils from '../../Pages/UTILS/utils';
import DCC from '../../Pages/CTL/DCC';

// Keep Label as draft when test is not ready to run
test.describe('ready', () => {
  test('CTL01-TC65 - Display the ContextMenu - Standard grid', async ({ page }) => {
    test.info().annotations.push({ type: 'tag', description: 'CTL' }); // labels to specify the test case
    
    // Setup & Test Data
    const app = new Homepage(page);
    const cc = new DCC(page);
    const username = 'testim_admin';
    const password = 'T4stim2019!$';
    
    // Test case 
    await app.login(username, password);
    await app.navigateTo('sup/supplier_browse');

    await cc.activate_context_menu();
    await cc.deactivate_context_menu();
    await page.getByRole('button', { name: 'Next page' }).focus();
    
    await page.waitForLoadState('domcontentloaded');
    
    // Press Tab until the control is on the specified locator
    const targetLocator = page.getByRole('button', { name: 'Change settings for the table:' });
    while (true) {
      await page.press('body', 'Tab');
      const isFocused = await targetLocator.evaluate((el) => el === document.activeElement);
      if (isFocused) {
        page.getByRole('button', { name: 'Change settings for the table:' }).press('Enter');
        expect(await page.locator('//*[@id="gridMenu"]').isVisible());
        break;
      }
    }


  });
});