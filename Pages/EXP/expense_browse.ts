import { Page, expect, Locator } from '@playwright/test';
import { Workbook } from 'exceljs';
import { log } from 'node:console';

/**
 * Class representing invoice operations.
 */
export class Expense_Browse {
  private page: Page;
  private baseURL: string | undefined;

  //Initialize Locator After page is defined
  public createAnExpenseReportBtn : Locator;

  /**
   * Create an instance of INV.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;
    this.baseURL = process.env.baseURL;
    this.createAnExpenseReportBtn = this.page.getByRole('link', { name: 'Create an Expense Report' });
  };

  //Create an Expense Report Button Locator
}

export default Expense_Browse;