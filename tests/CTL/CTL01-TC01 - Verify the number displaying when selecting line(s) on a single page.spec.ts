import { test, expect } from '@playwright/test';
import homepage from '../../Pages/homepage';
import DCC from '../../Pages/CTL/DCC';
// adding a label to the test case
// --grep  npx playwright test --grep "CTL01 ready suite"
test.describe('CTL', () => {
  test('CTL01-TC01 - Verify the number displaying when selecting line(s) on a single page', async ({ page }) => {
    // Setup & Test Data
    test.info().annotations.push({ type: 'tag', description: 'Ready' });
    
    const app = new homepage(page);
    const cc= new DCC(page);
    const username = 'testim_admin';
    const password = 'T4stim2019!$';

    // Test case for dynamic element and grid validation
    await app.login(username, password);

    // Start test cases from here
    await app.navigateTo('sup/supplier_browse');

    // Check Number of selected lines  
    await cc.validate_selctedLines('0');
    // Select 4 lines (no checkAll)
    await cc.selectCheckboxes(1);
    await cc.validate_selctedLines('1');
    await cc.selectCheckboxes(2);
    await cc.validate_selctedLines('2');
    await cc.selectCheckboxes(3);
    await cc.validate_selctedLines('3');
    await cc.selectCheckboxes(4);;
    await cc.validate_selctedLines('4');
    
    
    // Unselect some lines (no checkAll)
    await cc.uncheck_any_checkbox(3);
    await cc.validate_selctedLines('3');
    await cc.uncheck_any_checkbox(2);
    await cc.validate_selctedLines('2');
    
    // Refresh Or select the [Reset] button 
    await page.reload();
    await expect(page.locator('#body_x_dcc_grid_phcgridHeader')).toContainText('Selected');
    await cc.validate_selctedLines('0');

    // Select all lines (15) without selecting checkAll
    await cc.selectCheckboxes(15);
    // Check the check-all checkbox is checked
    expect(await page.getByRole('checkbox', { name: 'Selecting column ' }).isChecked()).toBe(true);
    await cc.validate_selctedLines('15');

    // Unselect one line
    await cc.uncheck_any_checkbox(14); 
    await cc.validate_selctedLines('14');
    
    // Unselect all lines (checkAll)
    await page.locator('#body_x_dcc_grid_grid__ctl0_colSelect_item_cb_colSelect_checkbox').check();
    await page.getByRole('checkbox', { name: 'Selecting column ' }).uncheck();
    await cc.validate_selctedLines('0');

    await cc.selectCheckboxes(4);
  
    // Unselect some lines (no checkAll)
    await cc.uncheck_any_checkbox(3);
    await cc.validate_selctedLines('3');
    await cc.validate_selctedLines('2');
    await cc.uncheck_any_checkbox(2);
    await cc.validate_selctedLines('2');  
    // Refresh Or select the [Reset] button 
    await page.reload();
    await expect(page.locator('#body_x_dcc_grid_phcgridHeader')).toContainText('Selected');
      await cc.validate_selctedLines('0');

    // Select all lines (15) without selecting checkAll
    await cc.selectCheckboxes(15);
    // Check the check-all checkbox is checked
    expect(await page.getByRole('checkbox', { name: 'Selecting column ' }).isChecked()).toBe(true);
      await cc.validate_selctedLines('15');
    
      // Unselect one line 
      await cc.uncheck_any_checkbox(1);
      await cc.validate_selctedLines('14'); 
    
      // Unselect all lines (checkAll)
    await page.locator('#body_x_dcc_grid_grid__ctl0_colSelect_item_cb_colSelect_checkbox').check();
    await page.getByRole('checkbox', { name: 'Selecting column ' }).uncheck();
    await cc.validate_selctedLines('0');
    await app.close();
  });
});
