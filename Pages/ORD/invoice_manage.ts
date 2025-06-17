import { expect, Locator, Page } from '@playwright/test';
import utils from '../UTILS/utils';

export class Invoice_Manage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async createInvoice(invoiceNumber: string) {
        await expect(this.page.locator('#header_x_prxHeaderTitle_x')).toContainText('Invoice');
        await this.page.getByRole('textbox', { name: 'Supplier Invoice Number *' }).click();
        await this.page.getByRole('textbox', { name: 'Supplier Invoice Number *' }).fill(invoiceNumber);

        await this.page.getByRole('textbox', { name: 'Invoice Date (M/d/yyyy) *' }).click();
        await this.page.getByRole('button', { name: 'T', exact: true }).click();

        await this.page.getByText('Go back to the previous page Open the navigation history My Favorites Invoice').click();
        await this.page.getByRole('textbox', { name: 'Due Date (M/d/yyyy) *' }).click();
        await this.page.getByRole('button', { name: '+1M' }).click();

        await this.page.getByText('Go back to the previous page Open the navigation history My Favorites Invoice').click();
        await this.page.getByRole('textbox', { name: 'Date of Supply (M/d/yyyy) *' }).click();
        await this.page.getByRole('button', { name: 'T', exact: true }).click();
        
        await this.page.getByText('Go back to the previous page Open the navigation history My Favorites Invoice').click();
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page.locator('#content')).toContainText('Close messagesSuccessData has been saved');
    }
}
export default Invoice_Manage;