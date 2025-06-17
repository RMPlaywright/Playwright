import { test, expect, Locator } from '@playwright/test';
import { Homepage } from '../../Pages/homepage';
import { param_browse } from '../../Pages/BAS/param_browse';
import Utils from '../../Pages/UTILS/utils';

// Keep Label as draft when test is not ready to run
test.describe('ready', () => {
  test('CTL05-TC32 - Vertical-horizontal resizing', async ({ page }) => {
    test.info().annotations.push({ type: 'tag', description: 'CTL' }); // labels to specify the test case
    
    // Setup & Test Data
    const app = new Homepage(page);
    const bas = new param_browse(page);
    const utilsPage = new Utils(page);
    const username = 'testim_admin';
    const password = 'T4stim2019!$';
    const textboxComment: Locator = page.locator('//*[@id="body_x_tabc_identity_prxidentity_x_txtComment"]');

    // Test case 
    await app.login(username, password);
    await app.navigateTo('sup/supplier_manage');

    // Validate the Textbox Present
    await expect(page.getByRole('textbox', { name: 'Comment' })).toBeVisible();
   
    // Get the computed style properties of the locator
    const computedStyles = await utilsPage.getSizeof(textboxComment);

    // Validate the default width and height
    console.log('Computed Styles:', computedStyles);
      expect(computedStyles.width).toBe(computedStyles.width); 
      expect(computedStyles.height).toBe(computedStyles.height); 
    
    // Resizing the textbox
    await textboxComment.evaluate((element) => {
      element.style.width = '500px';
      element.style.height = '500px';
    });
     page.waitForLoadState('domcontentloaded');

    // Validate the new width and height
    const newComputedStyles = await utilsPage.getSizeof(textboxComment);
    console.log('New Computed Styles:', newComputedStyles);
    expect(newComputedStyles.width).toBe('500px');
  });
});