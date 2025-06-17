import { expect, Locator, Page } from '@playwright/test';
import utils from '../UTILS/utils';

export class Basket_Light_Manage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fill_Req_details(orga : string) {
        await this.page.locator('div').filter({ hasText: /^Organization\*See AllDelete the value\.Data has been savedData not saved$/ }).locator('i').first().click();
        await this.page.getByRole('combobox', { name: 'Organization *' }).fill(orga);
        await this.page.getByRole('option').first().click();
        await this.page.waitForTimeout(2000);
    }

    async click_on_Submit_Requisition(){
        await this.page.getByRole('button', { name: 'Submit Requisition' }).click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}
export default Basket_Light_Manage;