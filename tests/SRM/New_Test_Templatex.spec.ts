import { test,expect } from '@playwright/test';
import { Homepage } from '../../Pages/homepage';
import * as path from 'path';
import utils from '../../Pages/UTILS/utils';

// Keep Label as draft when test is not ready to run
test.describe('draft', () => {
  test('Enter Test case name', async ({ page }) => {
    test.info().annotations.push({ type: 'tag', description: 'DCC' }); // labels to specify the test case
    
    // Setup & Test Data
    const app = new Homepage(page);
    const username = 'testim_admin';
    const password = 'T4stim2019!$';
    const utilspage = new utils(page);
    await app.login(username, password);
    
    app.navigateTo('etl/import_manage/std_commodity');
    
    await utilspage.import_manage_uploadFile('Playwright Project Structure.docx');

  // async function uploadFile(fileName: string) {
  //   const filePath = path.resolve(__dirname, '../../downloads', fileName);
  //   const fs = require('fs');

  //   if (!fs.existsSync(filePath)) {
  //     throw new Error(`File not found: ${filePath}`);
  //   }

  //   const [fileChooser] = await Promise.all([
  //     page.waitForEvent('filechooser'),
  //     page.locator('#body_x_tab_tpcchk_prxprxStepchk_x_txtUploadFiles').click()
  //   ]);

  //   await fileChooser.setFiles([filePath]);
  // }

  

    // if (fs.existsSync(filePath)) {
    //   await page.getByRole('button', { name: 'Click or Drag to add a file' }).setInputFiles(filePath);
    // } else {
    //   console.error(`File not found: ${filePath}`);
    // }
  });
});
