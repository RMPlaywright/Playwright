import { test ,expect} from '@playwright/test';
import { Homepage } from '../../Pages/homepage';
import { param_browse } from '../../Pages/BAS/param_browse';

// Keep Label as draft when test is not ready to run
test.describe('ready', () => {
  test('CTL05-TC31 - Check for Integer type maximum value', async ({ page }) => {
    test.info().annotations.push({ type: 'tag', description: 'CTL' }); // labels to specify the test case
    
    // Setup & Test Data
    const app = new Homepage(page);
    const bas = new param_browse(page);
    const username = 'testim_admin';
    const password = 'T4stim2019!$';
    const value = '2147483647'; 
    const value2 = '2147483648'; 

    // Test case 
    if (!process.env.GLOBAL_SETUP_DONE) {
      console.log('Global setup is present...');
      await app.login(username, password);
    }
    await app.create_configuration_context('000', test.info().title);
    await bas.navigateToGlobalparameters();
    await bas.search_paramerter('bas_autosuggest_list_size');
    await bas.updateParameterValue(value);
    await bas.updateParameterValue(value2);
    
    // Verify the error message
    await bas.checkErrorMessage_valuemustbeInteger();
    await app.close();
  });
});