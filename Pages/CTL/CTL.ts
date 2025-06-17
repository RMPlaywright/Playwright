import { Page, expect } from '@playwright/test';
import { Workbook } from 'exceljs';

/**
 * Class representing CTL operations.
 */
export class CTL {
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

/**
   * Selecting the DCC grid
   */
  //*[@id="body_x_dcc_grid_phcgrid_content"]/div[1]
async select_dcc_grid(): Promise<void> {
  await this.page.locator('div').filter({ hasText: /^gridEdit grid$/ }).first().click();
  //await this.page.locator('div').filter({ hasText: /^grid$/ }).first().click();
  await expect(this.page.getByText('General', { exact: true })).toBeVisible();
  await expect(this.page.locator('#designPanel_designProperties_x_tabDesignProperties_pages')).toBeVisible();
}

/**
   * Enabling the Detailed view in DCC
   */
async DCC_Enable_the_detailed_view_Allow_global_Expand_Collapse_detailed_view(){
await this.page.getByRole('tab', { name: 'Advanced' }).click();

await this.page.getByRole('combobox', { name: 'Enable the detailed view' }).click();
await this.page.getByRole('option', { name: 'Yes' }).click();
await expect(this.page.getByRole('button', { name: 'Delete the value.' })).toBeVisible();

await this.page.getByRole('combobox', { name: 'Allow global Expand/Collapse' }).click();
await this.page.getByRole('option', { name: 'Yes' }).click();
await expect(this.page.getByLabel('Allow global Expand/Collapse detailed view', { exact: true }).getByRole('button', { name: 'Delete the value.' })).toBeVisible();
}

/**
   * De-activates the design mode on the homepage.
   */
async deactivate_design_mode(): Promise<void> {
  await this.page.getByRole('button', { name: 'D : Switch to design mode' }).click();
  await this.page.waitForLoadState('domcontentloaded');
}

/**
   * Change the page size to n.
   */
async change_grid_page_size(Size1: string): Promise<void> {
await this.page.getByRole('button', { name: 'Change settings for the table:' }).click();
await this.page.getByRole('textbox', { name: 'Page size' }).click();
await this.page.getByRole('textbox', { name: 'Page size' }).fill(Size1);
await this.page.getByRole('button', { name: 'Update table' }).click();
}

/**
   * Enabling the Detailed view in DCC
   */
async DCC_Keep_record_selection(){
  await this.page.getByRole('tab', { name: 'Advanced' }).click();
  
  await this.page.getByRole('combobox', { name: 'Keep records selection' }).click();
  await this.page.getByRole('combobox', { name: 'Keep records selection' }).fill('No');
  await this.page.getByLabel('Keep records selection', { exact: true }).getByText('No').click();

  await this.page.locator('#designPanel_designProperties_x_tabDesignProperties_tpAdvanced_KeepSelectedRecordsOnSearch_label i').nth(2).hover();

  await expect(this.page.locator('xpath=//*[@id="designPanel_designProperties_x_tabDesignProperties_tpAdvanced_KeepSelectedRecordsOnSearch_label"]/span[2]'))
  .toContainText(`This property allows to define whether the selected records must be kept (Yes) or reset (No) on filter change.
  Default: Yes.`);
}



}

export default CTL;