
import { Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();
export class sup_browse {
    private page: Page;
    /** Create an instance of INV.
   * @param {Page} page - The Playwright page object.
   */

    // Constructor for the class
    constructor(page: Page) {
        this.page = page;
    }
    
    async browse_suppliers()
    {
        const baseUrl = process.env.baseURL;
        const navUrl = `${baseUrl}/sup/supplier_browse`;
        await this.page.goto(navUrl);
    }

    async search_sup_and_validate(SupplierName:string)
    {
        await this.page.getByRole('textbox', { name: 'Keywords' }).fill(SupplierName);
        const searchButton = this.page.locator('#body_x_prxFilterBar_x_cmdSearchBtn');
        await searchButton.waitFor({ state: 'visible', timeout: 15000 });
        await searchButton.click();
        await this.page.waitForTimeout(1500);
        const sname = this.page.getByRole('cell', { name: SupplierName, exact: true })
        await expect(sname).toHaveText(SupplierName);

    }
}
