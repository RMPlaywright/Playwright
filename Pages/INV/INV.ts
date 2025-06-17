import { Page, expect } from '@playwright/test';
import { Workbook } from 'exceljs';

/**
 * Class representing invoice operations.
 */
export class INV {
  private page: Page;

  /**
   * Create an instance of INV.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Create an invoice.
   * @param {string} Invoice_Number - The invoice number.
   * @param {string} Due_Date - The due date in M/d/yyyy format.
   * @param {string} Invoice_Date - The invoice date in M/d/yyyy format.
   * @param {string} Supplier_Name - The supplier name.
   * @param {string} Organization_Name - The organization name.
   */
  async create_invoice(Invoice_Number: string, Due_Date: string, Invoice_Date: string, Supplier_Name: string, Organization_Name: string): Promise<void> {
    try {
      await this.page.getByRole('textbox', { name: 'Supplier Invoice Number *' }).fill(Invoice_Number);
      await this.page.getByRole('textbox', { name: 'Due Date (M/d/yyyy)' }).fill(Due_Date);
      await this.page.getByRole('textbox', { name: 'Invoice Date (M/d/yyyy) *' }).fill(Invoice_Date);

      await this.page.getByRole('combobox', { name: 'Supplier Please select a' }).fill(Supplier_Name);
      await this.page.getByRole('option', { name: 'Dell US C001494 1 Dell Way' }).click();

      await this.page.waitForTimeout(1500);
      await this.page.waitForLoadState('domcontentloaded');
      const organizationCombobox = await this.page.getByRole('combobox', { name: 'Organization No Tax ID *' });
      await organizationCombobox.waitFor({ state: 'visible', timeout: 15000 });
      await organizationCombobox.click();

      await this.page.waitForTimeout(1500);
      await this.page.waitForLoadState('domcontentloaded');
      const organizationOption = await this.page.getByRole('option', { name: Organization_Name });
      await organizationOption.waitFor({ state: 'visible', timeout: 15000 });
      await organizationOption.click();
      await this.page.waitForTimeout(1500);
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.getByRole('button', { name: 'Save' }).click();
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  }

  /**
   * Adds a non-PO line item to the invoice.
   *
   * @param {string} item_Type - The type of the item.
   * @param {string} item_Label - The label of the item.
   * @param {string} item_Quantity - The quantity of the item.
   * @param {string} item_Up - The unit price excluding tax.
   * @param {string} tax_Rate - The tax rate for the item.
   * @returns {Promise<void>} - A promise that resolves when the non-PO line item is added.
   * @throws {Error} - Throws an error if there is an issue adding the non-PO line item.
   */
  async addNonPoLine(item_Type: string, item_Label: string, item_Quantity: string, item_Up: string, tax_Rate: string): Promise<void> {
    try {
      await this.page.getByRole('button', { name: 'Add Lines' }).click();
      await this.page.getByRole('button', { name: 'Add Non-PO Line' }).click();

      const combobox = this.page.getByRole('combobox', { name: 'Type', exact: true });
      const nextDiv = combobox.locator("xpath=following-sibling::div[1]");

      await combobox.click();
      await combobox.fill(item_Type);
      await this.page.getByRole('option', { name: item_Type, exact: true }).click();
      await expect(nextDiv).toHaveText(item_Type);

      await this.page.getByRole('textbox', { name: 'Quantity' }).fill(item_Quantity);

      await this.page.getByRole('textbox', { name: 'UP Excl. Tax' }).fill(item_Up);

      await this.page.getByRole('textbox', { name: 'Item Label' }).fill(item_Label);
      await expect(this.page.getByRole('textbox', { name: 'Item Label' })).toHaveValue(item_Label);

      await this.page.getByRole('cell', { name: 'Tax Rates' }).locator('div').nth(3).click();
      await this.page.getByRole('combobox', { name: 'Tax Rates' }).fill(tax_Rate);
      await this.page.getByRole('option', { name: tax_Rate, exact: true }).click();

      await this.page.waitForTimeout(1500);

      await this.page.getByRole('button', { name: 'Save' }).click();

      await this.page.waitForTimeout(1500);

      let ct = this.page.locator('#body_x_tabc_prxInvoice_INV_prxprxInvoice_INV_x_prxProductService_x_prxItem_x_grdInvoiceItem_phcgrdInvoiceItem_content').getByText('Record(s)');
      await ct.waitFor({ state: 'visible', timeout: 15000 });
      await expect(ct).toHaveText("1 Record(s)");
    } catch (error) {
      console.error('Error filling invoice details:', error);
    }
  }

  /**
   * Generate a random string.
   * @param {number} length - The length of the random string.
   * @returns {string} The generated random string.
   */
  generateRandom(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

export default INV;