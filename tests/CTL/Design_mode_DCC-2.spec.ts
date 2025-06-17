import { test, expect } from '@playwright/test';
import { Homepage } from '../../Pages/homepage';
import { DCC } from '../../Pages/CTL/DCC';

test.describe('CTL', () => {
  test('DCC- Add and remove control', async ({ page }) => {
    // Setup & Test Data
    test.info().annotations.push({ type: 'tag', description: 'DCC' });
    const app = new Homepage(page);
    const ctl = new DCC(page);
    const username = 'testim_admin';
    const password = 'T4stim2019!$';

    // Test case for dynamic element and grid validation
    await app.login(username, password);

    // Start test cases from here
   // await app.navigateToBrowseRequisitions();

    // DCC POC
    await app.create_configuration_context('000', 'Demo-DCC-POC');

    // Activate design mode
    await ctl.activate_design_mode();

    // Add new control
    await ctl.dcc_start_adding_controls();

    // Add new control next to the existing control
    await page.locator('div').filter({ hasText: /^revised_id$/ }).first().click();
    await page.getByRole('cell', { name: 'Code ' }).getByRole('button').nth(4).click();
    await page.getByRole('row', { name: 'basket_id ID' }).getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Add Selected field(s)' }).click();

    // Validate the new control added
    await expect(page.getByRole('cell', { name: 'ID' }).locator('div').first()).toBeVisible();

    // Delete the new control
    await page.getByRole('cell', { name: 'ID' }).locator('div').first().click();
    await page.getByTitle('Other actions').locator('i').click();
    await page.getByText('Delete the field').click();
    await expect(page.getByRole('button', { name: ' Delete' })).toBeVisible();
    await page.getByRole('button', { name: ' Delete' }).click();

    // Validate the new control deleted
    await expect(page.getByRole('cell', { name: 'ID' }).locator('div').first()).toBeHidden();

    // Reset from standard
    await ctl.dcc_reset_from_standard();

    // Close the browser
    await app.close();
  });
});