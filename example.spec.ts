import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  // ...existing code...
  
  await test.step('Step 1: Navigate to homepage', async () => {
    await page.goto('https://example.com');
  });

  // Comment out Step 1 if you want to start from Step 2
  // await test.step('Step 1: Navigate to homepage', async () => {
  //   await page.goto('https://example.com');
  // });

  await test.step('Step 2: Perform login', async () => {
    await page.fill('#username', 'user');
    await page.fill('#password', 'password');
    await page.click('#login');
  });

  await test.step('Step 3: Verify dashboard', async () => {
    await expect(page).toHaveURL('https://example.com/dashboard');
  });

  // ...existing code...
});
