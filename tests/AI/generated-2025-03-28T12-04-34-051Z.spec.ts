
    
//     import { test } from '@playwright/test';
//     import { Homepage } from '../../Pages/homepage';
//     import utils from '../../Pages/UTILS/utils';
//     import path from 'path';
//     import dotenv from 'dotenv';
//     dotenv.config({ path: path.resolve(__dirname, 'ENV.env') });
//     //Keep Label as draft when test is not ready to run
//     test.describe('draft', () => {
//     test('Enter Test case name', async ({ page }) => {
//       test.info().annotations.push({ type: 'tag', description: 'AI' }); // labels to specify the test case
      
//       // Setup & Test Data
//       const app = new Homepage(page);
//             const utilspage = new utils(page);
//             const username = 'testim_admin';
//             const password ='T4stim2019!$';
//             const appUrl = process.env.baseURL;
//             await app.login(username, password);
  
//  await page.goto(appUrl + '/bpm/process_browse'); // Navigate to bpm/process_browse 
//     await page.locator('text=/create project/i').click(); // Click on the Create Project button
//     await page.locator('text=/Strategic/i').click(); // Click on the Simple
//     // Unhandled step: Fill mandatory data based on the page
//   });
// });
