import { Page, expect } from '@playwright/test';
import { Workbook } from 'exceljs';

/**
 * Class representing CTL operations.
 */
export class DCC {
  private page: Page;

  /**
   * Create an instance of CTL.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Resets the DCC from the standard configuration.
   */
  async dcc_reset_from_standard(): Promise<void> {
    await this.page.locator('#btnScreenCapture').click();
    this.page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept().catch(() => {});
    });
    await this.page.getByRole('button', { name: 'Reset from Standard' }).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Activates the design mode on the homepage.
   */
  async activate_design_mode(): Promise<void> {
    await this.page.getByRole('button', { name: 'D : Switch to design mode' }).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  


  async validate_selctedLines(No:string)
  {  
    await expect(this.page.getByLabel('Selected', { exact: true })).toHaveValue(No);
  
  }
async activate_context_menu(): Promise<void> {
  if(!await this.page.locator('//*[@id="gridMenu"]').isVisible())
    {
      await this.page.getByRole('button', { name: 'Change settings for the table:' }).click();
    }
    expect(await this.page.locator('//*[@id="gridMenu"]').isVisible());
  }


  async deactivate_context_menu(): Promise<void> {
    if(await this.page.locator('//*[@id="gridMenu"]').isVisible())
      {
        await this.page.getByRole('button', { name: 'Change settings for the table:' }).click();
      }
      expect(!await this.page.locator('//*[@id="gridMenu"]').isVisible());
  }
  
    // Function to select a given number of checkboxes
    async selectCheckboxes(count: number) {
      for (let i = 1; i <= count; i++) {
      await this.page.locator(`(//*[@aria-label="Selecting column" and @type="checkbox"])[${i}]`).check();
      }
      this.validate_selctedLines(count.toString());
    }

  
    // Function to uncheck a given number of checkboxes
    async DeselectCheckboxes(count: number) {
      for (let i = 1; i <= count; i++) {
      await this.page.locator(`(//*[@aria-label="Selecting column" and @type="checkbox"])[${i}]`).uncheck();
      }
      this.validate_selctedLines(count.toString());
    }
    // Function to uncheck a given number of checkboxes
    async uncheck_any_checkbox(index: number) {
     
      await this.page.locator(`(//*[@aria-label="Selecting column" and @type="checkbox"])[${index}]`).uncheck();
     
    }

  /**
   * Starts adding controls in design mode.
   */
  async dcc_start_adding_controls(): Promise<void> {
    await this.page.locator('//*[@id="designCentralButton"]/button[1]/i').hover();
    await this.page.locator('//*[@id="designCentralButton"]/button[1]/i').click();
  }

  /**
   * Adds one existing control.
   */
  async dcc_add_1_existing_control(): Promise<void> {
    await this.page.locator('div').filter({ hasText: /^revised_id$/ }).first().click();
    await this.page.getByRole('cell', { name: 'Code ' }).getByRole('button').nth(4).click();
    await this.page.getByRole('row', { name: 'basket_id ID' }).getByRole('checkbox').check();
    await this.page.getByRole('button', { name: 'Add Selected field(s)' }).click();
    // Validate the new control added
    await expect(this.page.getByRole('cell', { name: 'ID' }).locator('div').first()).toBeVisible();
  }
}

export default DCC;