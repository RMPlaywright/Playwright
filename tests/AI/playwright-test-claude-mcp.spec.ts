// import { test, expect } from '@playwright/test';
// import axios from 'axios';
// import { Homepage } from '../../Pages/homepage';
//     import utils from '../../Pages/UTILS/utils';
//     import path from 'path';
//     import dotenv from 'dotenv';
//     dotenv.config({ path: path.resolve(__dirname, 'ENV.env') });
// // Configuration - Update these values with your actual Claude MCP server details
// const CLAUDE_MCP_URL = 'https://your-claude-mcp-server.example.com/api/generate';
// const API_KEY = 'your-api-key'; // If required

// test.describe('Claude MCP Test Generation', () => {
//   test('should generate test code from user prompt', async ({ page }) => {
//     // 1. Set up test page with a prompt input form
//     // Setup & Test Data
//          const app = new Homepage(page);
//                const utilspage = new utils(page);
//                const username = 'testim_admin';
//                const password ='T4stim2019!$';
//                const appUrl = process.env.baseURL;
//                await app.login(username, password);
    
//     // 2. User submits a prompt
//     const userPrompt = 'Create a test that verifies a login form accepts valid credentials';
//     await page.fill('#prompt-input', userPrompt);
//     await page.click('#submit-prompt');
    
//     // 3. Call Claude MCP server API to generate test code
//     const response = await callClaudeMCP(userPrompt);
    
//     // 4. Verify we got a valid response with test code
//     expect(response.status).toBe(200);
//     expect(response.data).toBeDefined();
//     expect(response.data.generated_code).toBeDefined();
    
//     // 5. Optional: Display the generated test code to the user
//     await page.evaluate((code) => {
//       document.querySelector('#result-container').textContent = code;
//     }, response.data.generated_code);
    
//     // 6. Optional: Verify the code is shown on the page
//     const displayedCode = await page.textContent('#result-container');
//     expect(displayedCode).toContain('test(');
    
//     // 7. Optional: Execute the generated test code
//     // This would require dynamically evaluating the code, which might need
//     // a more advanced implementation depending on your requirements
//   });
// });
// // **
// //  * Helper function to call the Claude MCP server
// //  * @param prompt The user prompt to send to Claude
// //  * @returns The API response
// //  */
// async function callClaudeMCP(prompt: string) {
//   try {
//     const response = await axios.post(
//       CLAUDE_MCP_URL,
//       {
//         prompt: prompt,
//         max_tokens: 2000,
//         model: 'claude-3-opus-20240229', // Update with the appropriate model
//         // Add any other parameters required by your Claude MCP server
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${API_KEY}`,
//         },
//       }
//     );
    
//     return response;
//   } catch (error) {
//     console.error('Error calling Claude MCP server:', error);
//     throw error;
//   }
// }