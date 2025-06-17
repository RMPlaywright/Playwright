import { Page, expect } from '@playwright/test';
import { Workbook } from 'exceljs';

/**
 * Class representing invoice operations.
 */
export class payment_request_browse {
  private page: Page;
  private baseURL: string | undefined;

  /**
   * Create an instance of INV.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;
    this.baseURL = process.env.baseURL;
  }

  //Navigate to Browse Payment Request Page
  async navigateToCreateInvoice() {
    try {
      await this.page.goto(`${this.baseURL}/ord/invoice_manage?invoiceType=INV`);
      await this.page.waitForLoadState('domcontentloaded');
      await expect(this.page.getByRole('heading', { name: 'Browse Requisitions' }));
    } catch (error) {
      console.error('Error navigating to Create Invoice:');
    }
  }
}

export default payment_request_browse;