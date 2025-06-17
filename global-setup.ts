import { chromium, FullConfig } from '@playwright/test';
import Homepage from './Pages/homepage';

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const app = new Homepage(page);

  console.log('Global setup: Starting browser and logging in...');

  // Navigate to the login page
  await page.goto(`${baseURL}/usr/login?sso=0&`);
  await page.waitForLoadState('domcontentloaded');

  // Perform login
  await app.login('testim_admin', 'T4stim2019!$');

  // Wait for SSO session to be established
  await page.waitForLoadState('networkidle'); // Wait for all network requests to finish
  await page.waitForTimeout(2000); // Add a small delay to ensure session is fully established

  // Save authentication state for reuse in tests
  console.log('Global setup: Saving auth state...');
  await context.storageState({ path: 'auth.json' });

  await browser.close();
}

export default globalSetup;
