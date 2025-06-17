import { expect, Locator, Page } from '@playwright/test';
import utils from '../UTILS/utils';

export class Create_Product {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Create an Item
    async create(productName: string, commodity: string, supplierName: string, retailPrice: string, currency: string) {
        await expect(this.page.locator('#header_x_prxHeaderTitle_x')).toContainText('Create');
        await this.page.getByRole('textbox', { name: 'Product *' }).fill(productName);

        await this.page.locator('div').filter({ hasText: /^Commodity\*See AllDelete the value\.$/ }).locator('i').first().click();
        await this.page.getByRole('combobox', { name: 'Commodity *' }).fill(commodity);
        await this.page.getByRole('combobox', { name: 'Commodity *' }).press(' ');
        await this.page.getByRole('option').first().click();

        await this.page.locator('div').filter({ hasText: /^Supplier\*See AllDelete the value\.$/ }).locator('i').first().click();
        await this.page.getByRole('combobox', { name: 'Supplier *' }).fill(supplierName);
        await this.page.getByRole('combobox', { name: 'Supplier *' }).press(' ');
        await this.page.getByRole('option').first().click();

        await this.page.getByRole('textbox', { name: 'Retail price (Excl. Tax)' }).fill(retailPrice);
        await this.page.locator('div').getByRole('combobox', { name: 'Currency' }).click();
        await this.page.getByRole('combobox', { name: 'Currency *' }).fill(currency);
        await this.page.getByRole('option').first().click();
        await this.page.getByRole('textbox', { name: 'Label *' }).click();
        await this.page.getByRole('textbox', { name: 'Label *' }).fill(productName);

        await this.page.getByRole('button', { name: 'Save', exact: true }).click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page.getByRole('status')).toContainText('Data has been saved');
    }

    async edit_item_Line() {
        await this.page.locator('//table[@id="body_x_item_browse_x_grdItems_grd"]/tbody/tr/td[1]').click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}

export default Create_Product;