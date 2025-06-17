import { test, expect } from '@playwright/test';
import homepage from '../../Pages/homepage';
import CTL from '../../Pages/CTL/DCC';
import UTILS from '../../Pages/UTILS/utils';

test.describe('draft', () => {
test('CTL02-TC02-002_View creation', async ({ page }) => {
  test.info().annotations.push({ type: 'tag', description: 'DCC' });
  
  // Setup & Test Data specefied in the test 
  const app = new homepage(page);
  const ctl = new CTL(page);
  const utils = new UTILS(page);
  const username = 'testim_admin';
  const password = 'T4stim2019!$';
  const name='Test_'+utils.generateRandom(5);
  // Test case for dynamic element and grid validation
  await app.login(username, password);
  console.warn('Global setup is present...');


  // Start test cases from here
  await app.navigateTo('sup/supplier_browse/CTL02_TC02_002');

  // Create configuration
  await app.create_configuration_context('000', 'Demo-DCC-POC');

  //reset from standard
  await ctl.activate_design_mode();
  await ctl.dcc_reset_from_standard();
  
  
  // await ctl.activate_design_mode();

  // Add new control
  await ctl.dcc_start_adding_controls();

  //select grid
  await test.step('Step: Select grid control', async () => {
    await page.locator('div').filter({ hasText: /^grid$/ }).first().click();
  });
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByRole('tab', { name: 'General' })).toBeVisible();
  await expect(page.getByTitle('Other actions').locator('i')).toBeVisible();


  
  await page.getByTitle('Views management').locator('i').first().click();
  await expect(page.locator('div').filter({ hasText: /^gridEditDelete$/ }).locator('span')).toBeVisible();
  await utils.getSpecificStyle(page.locator('div').filter({ hasText: /^gridEditDelete$/ }).locator('span'),'font-weight');

  await expect(page.getByText('Add new view')).toBeVisible();


// Add new view
await page.getByText('Add new view').click();

//validate window
await expect(page.locator('div').filter({ hasText: /^Choose a view to add\.\.\.$/ })).toBeVisible();
await expect(page.getByText('View representation')).toBeVisible();
await expect(page.getByRole('button', { name: 'Table' })).toBeVisible();
await expect(page.getByText('View name')).toContainText('View name');
//await expect(page.getByText('View icon')).toContainText('View icon');

//validate button disabled
try{
  await expect(page.getByRole('button', { name: 'Add Selected View' })).toBeDisabled();}
  catch (error) {
    console.error('Error:', error);
  }



await page.getByRole('textbox', { name: 'Name of the new view' }).click();
await page.getByRole('textbox', { name: 'Name of the new view' }).fill(name);
await page.locator('#view_icon').click();
await page.locator('#view_icon').fill('"fa fa-book"');


await expect(page.getByRole('button', { name: 'Add Selected View' })).toBeEnabled();
await page.getByRole('button', { name: 'Table' }).click();
//add
await page.getByRole('button', { name: 'Add Selected View' }).click();
await page.waitForLoadState('domcontentloaded');

await expect(page.getByRole('textbox', { name: 'Custom local label' })).toHaveValue(name);
await page.getByRole('tab', { name: 'Advanced' }).click();
await expect(page.getByRole('textbox', { name: 'View icon' })).toHaveValue('"fa fa-book"');

await ctl.deactivate_context_menu();


await page.getByRole('button', { name: 'D : Switch to design mode' }).click();
await expect(page.locator('#body_x_dcc_grid_dcc_grid_ddlView_label')).toContainText('View:');
await expect(page.getByRole('combobox', { name: 'View:' })).toBeEmpty();


await ctl.activate_design_mode();


});
});