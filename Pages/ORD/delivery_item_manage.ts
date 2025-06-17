import { expect, Locator, Page } from '@playwright/test';
import utils from '../UTILS/utils';

export class Delivery_Item_Manage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async check_item_line_in_receipt(qty:string, price: string, currency :string) {
        await expect(this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'Quantity Received Edit' })).toHaveValue(qty);
        await expect(this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'Price' })).toHaveValue(price);
        await expect(this.page.locator('iframe').contentFrame().locator('//table/tbody/tr[6]/td//div[@class="text"]')).toContainText('EUR');
        await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Close', exact: true }).click();
    }
}
export default Delivery_Item_Manage;