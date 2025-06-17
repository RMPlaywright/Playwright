// filepath: c:\Users\mpk\Documents\POC\Playwright\global-teardown.ts
import { FullConfig, chromium } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

async function globalTeardown(config: FullConfig) {
  console.log('Global teardown: Starting cleanup process...');

  // Launch a browser instance
  const browser = await chromium.launch();
  try {
    // Get all contexts and clean them up
    const contexts = browser.contexts();
    if (contexts.length === 0) {
      console.log('No browser contexts found to clean up.');
    } else {
      for (const context of contexts) {
        const pageUrls = context.pages().map(page => page.url());
        console.log(`Closing context with pages: ${pageUrls.length > 0 ? pageUrls.join(', ') : 'No open pages'}`);
        
        // Clear cookies and cache
        await context.clearCookies();
        await context.clearPermissions();
        console.log('Cookies and permissions cleared for context.');

        // Clear localStorage and sessionStorage for all pages
        for (const page of context.pages()) {
          await page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
          });
          console.log(`LocalStorage and SessionStorage cleared for page: ${page.url()}`);
        }

        // Close the context
        await context.close();
      }
      console.log('All browser contexts closed and cleaned up.');
    }

    // Clear temporary files and cache directory
    const tempDir = path.join(__dirname, 'temp');
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
      console.log(`Temporary files and cache cleared from: ${tempDir}`);
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Error clearing temporary files: ${err.message}`);
      } else {
        console.error('Error clearing temporary files:', err);
      }
    }
  } catch (error) {
    console.error('Error during global teardown:', error);
  } finally {
    // Ensure the browser is closed
    await browser.close();
    console.log('Browser instance closed.');
  }
}

export default globalTeardown;