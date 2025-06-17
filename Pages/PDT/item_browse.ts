import { expect, Locator, Page } from '@playwright/test';
import utils from '../UTILS/utils';

export class Catalog_Browse {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async check_Sold_by_value() {
        await expect(this.page.getByRole('combobox', { name: 'Qty' })).toHaveValue('10');
        await this.page.getByRole('listbox', { name: 'Qty' }).locator('i').first().click();
        const qtyListbox = this.page.getByRole('listbox', { name: 'Qty' });
        const options = await qtyListbox.locator('div').allTextContents();

        // Generate the expected range of values
        const expectedValues: string[] = [];
        for (let i = 20; i <= 990; i += 10) {
            expectedValues.push(i.toString());
        }

        // Assert that the actual options match the expected values
        expect(options).toEqual(expectedValues);

        // Optional: More detailed validation if needed
        expect(options.length).toBe(expectedValues.length); // Check if the number of options matches

        for (let i = 0; i < expectedValues.length; i++) {
            const optionLocator = qtyListbox.locator('div').nth(i);
            await expect(optionLocator).toHaveText(expectedValues[i]);
        }
    }

    async click_on_add_to_cart_and_checkout(){
        await this.page.locator('//table[@id="body_x_grid_grd"]/tbody/tr/td[4]//button').filter({hasText : "Add to Cart"}).click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.getByRole('button', { name: 'Checkout' }).click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}
export default Catalog_Browse;