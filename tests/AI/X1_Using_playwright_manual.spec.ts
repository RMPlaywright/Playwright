// import { test } from '@playwright/test';
// import * as path from 'path';
// import * as fs from 'fs';
// import * as XLSX from 'xlsx';
// import dotenv from 'dotenv';

// dotenv.config();

// test.describe('draft', () => {
//   test('Generate Test Case from Excel', async () => {
//     async function generateTestFile() {
//       const filePath = path.resolve('./TestSteps.xlsx'); // Path to your Excel file
//       const workbook = XLSX.readFile(filePath);
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const steps = XLSX.utils.sheet_to_json(worksheet);

//       // Generate a unique filename for each run
//       const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
//       const outputFilePath = path.join(__dirname, `../AI/generated-${timestamp}.spec.ts`);

//       // Generate test content
//       const testContent = `
    
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
  
//  ${steps
//       .map((step: any) => {
//         const stepDescription = step['Step Description'].toLowerCase();

//         if (stepDescription.includes('navigate')) {
//           // Handle navigation steps
//           const urlPart = stepDescription.split('navigate to ')[1]?.trim() || '';
//           return `await page.goto(appUrl + '/${urlPart}'); // ${step['Step Description']}`;
//         } else if (stepDescription.includes('click')) {
//           // Handle click steps (exclude "button" from the locator and ignore case sensitivity)
//           const buttonName = stepDescription
//             .replace('click on the ', '')
//             .replace('button', '')
//             .trim()
//             .toLowerCase();
//           return `await page.locator('text=/${buttonName}/i').click(); // ${step['Step Description']}`;
//         } else if (stepDescription.includes('select')) {
//           // Handle selection steps, fallback to click if no select option is found
//           const option = stepDescription.split('select ')[1]?.trim() || '';
//           return `
//       const selectLocator = await page.locator('select');
//       if (await selectLocator.count() > 0) {
//         await selectLocator.selectOption({ label: '${option}' }); // ${step['Step Description']}
//       } else {
//         await page.locator('text=/${option}/i').click(); // Fallback to click if select is not found
//       }`;
//         } else {
//           return `// Unhandled step: ${step['Step Description']}`;
//         }
//       })
//       .join('\n    ')}
//   });
// });
// `;

//       // Write the generated test content to a file
//       fs.writeFileSync(outputFilePath, testContent);
//       console.log(`Test file generated at: ${outputFilePath}`);
//     }

//     await generateTestFile();
//   });
// });
