import { expect, Locator, Page } from '@playwright/test';
import utils from '../UTILS/utils';

export class Item_Manage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async add_Sold_by_Value(soldBy: string) {
        await expect(this.page.locator('iframe').contentFrame().locator('#modalTitle')).toContainText('Create/ Modify price');
        await this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'Sold by Quantity' }).fill(soldBy);
        await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Save', exact: true }).click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page.locator('iframe').contentFrame().getByRole('status')).toContainText('Data has been saved');
        await expect(this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'Sold by Quantity' })).toHaveValue(`${soldBy}.00`);
        await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Close', exact: true }).click();
    }
}
export default Item_Manage;