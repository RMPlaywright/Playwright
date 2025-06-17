import { test ,expect} from '@playwright/test';
import { Homepage } from '../Pages/homepage';

//Keep Label as draft when test is not ready to run
test.describe('draft', () => {
test('Enter Test case name', async ({ page }) => {
  test.info().annotations.push({ type: 'tag', description: 'DCC' }); // labels to specify the test case
  
  // Setup & Test Data
  const app = new Homepage(page);
  const username = 'testim_admin';
  const password = 'T4stim2019!$';

  await app.login(username, password);

  // Start test cases from here
  await page.getByRole('button', { name: 'Suppliers' }).hover();
  await page.getByRole('button', { name: 'Suppliers' }).click();
  await page.locator('#body_x_prxFilterBar_x_cmdSearchBtn').click({
    button: 'right'
  });
  await page.getByRole('textbox', { name: 'Keywords' }).click();
  await page.locator('//table[@id="body_x_prxFilterBar_x_tbxKeywords"]');
  await page.getByRole('link', { name: 'Create Supplier' }).click();
  await page.goto('https://envqa.ivalua.app/buyer/demo/functtestauto46/snhfx/page.aspx/en/sup/supplier_manage');
  await page.getByRole('button', { name: 'Save & Close' }).click();
  await expect(page.getByRole('button', { name: 'Save & Close' })).toBeVisible();
  await expect(page.locator('#errmsg_body_x_tabc_identity_prxidentity_x_txtName')).toContainText('Supplier must have a value');

});
});
