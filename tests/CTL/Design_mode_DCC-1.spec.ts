import { test, expect } from '@playwright/test';
import homepage from '../../Pages/homepage';
import CTL, { DCC } from '../../Pages/CTL/DCC';


test.describe('CTL', () => {
test('DCC- Design mode end to end test POC', async ({ page }) => {
  test.info().annotations.push({ type: 'tag', description: 'DCC' });
  
  // Setup & Test Data specefied in the test 
  const app = new homepage(page);
  const ctl=new DCC(page);
  const username = 'testim_admin';
  const password = 'T4stim2019!$';

  // Test case for dynamic element and grid validation
  await app.login(username, password);

  // Start test cases from here
  await app.navigateTo('ord/basket_browse');

  // Create configuration
  await app.create_configuration_context('000', test.info().title);

  // Activate design mode
  await ctl.activate_design_mode();

  // Add new control
  await ctl.dcc_start_adding_controls();
  
  //add new control next to the existing control
  await ctl.dcc_add_1_existing_control();

  // Reset from standard
  await ctl.dcc_reset_from_standard();
 
  // Close the browser
  await app.close();
});
});