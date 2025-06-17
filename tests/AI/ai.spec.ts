// import { test, expect } from '@playwright/test';
// import * as XLSX from 'xlsx';
// import * as path from 'path';
// import dotenv from 'dotenv';

// dotenv.config();

// const appUrl = process.env.APP_URL + '/usr/login?sso=0&';

// // Function to read test steps from Excel
// function readTestStepsFromExcel(filePath: string): any[] {
//   const workbook = XLSX.readFile(filePath);
//   const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//   return XLSX.utils.sheet_to_json(worksheet);
// }

// test.describe('Generated Test Cases', () => {
//   const testStepsFilePath = path.join(__dirname, '../../TestSteps.xlsx');
//   const testSteps = readTestStepsFromExcel(testStepsFilePath);

//   testSteps.forEach((testCase, index) => {
//     test(`Automated Test Case ${index + 1}`, async ({ page }) => {
//       if (!appUrl) {
//         throw new Error('APP_URL is not defined in the environment variables.');
//       }

//       // Navigate to application
//       await page.goto(appUrl);

//       // Login steps (assuming these are common)
//       await page.getByLabel('Login*').fill(process.env.USERNAME || '');
//       await page.getByLabel('Password*').fill(process.env.PASSWORD || '');
//       await page.getByRole('button', { name: 'Login' }).click();

//       // Execute test steps based on Excel data
//       for (const step of Object.entries(testCase)) {
//         const [action, value] = step;
        
//         switch(action.toLowerCase()) {
//           case 'click':
//             await page.click(value as string);
//             break;
//           case 'fill':
//             await page.fill((value as { selector: string; text: string }).selector, (value as { selector: string; text: string }).text);
//             break;
//           case 'select':
//             await page.selectOption((value as { selector: string; option: string }).selector, (value as { selector: string; option: string }).option);
//             break;
//           case 'assert':
//             await expect(page.locator((value as { selector: string; expectedText: string }).selector)).toHaveText((value as { selector: string; expectedText: string }).expectedText);
//             break;
//           case 'wait':
//             await page.waitForSelector(value as string);
//             break;
//           default:
//             console.log(`Unknown action: ${action}`);
//         }
        
//         // Add wait between steps for stability
//         await page.waitForTimeout(1000);
//       }
//     });
//   });
// });