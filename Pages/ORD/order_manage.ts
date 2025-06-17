import { expect, Locator, Page } from '@playwright/test';
import utils from '../UTILS/utils';

export class Order_Manage {

    readonly page: Page;
    public quantity : Locator;
    public price: Locator;
    public total : Locator;
    public currency : Locator;

    constructor(page: Page) {
        this.page = page;
        this.quantity = this.page.locator('//table[@id="body_x_tabc_info_prxinfo_x_proxyItems_x_grdItems_grd"]/tbody/tr/td[10]');
        this.price = this.page.locator('//table[@id="body_x_tabc_info_prxinfo_x_proxyItems_x_grdItems_grd"]/tbody/tr/td[12]');
        this.total = this.page.locator('//table[@id="body_x_tabc_info_prxinfo_x_proxyItems_x_grdItems_grd"]/tbody/tr/td[15]');
        this.currency = this.page.locator('//table[@id="body_x_tabc_info_prxinfo_x_proxyItems_x_grdItems_grd"]/tbody/tr/td[16]');
        
    }

    async validate_Order_Status() {
        await expect(this.page.getByRole('status')).toContainText('InfoValidated successfully');
        await expect(this.page.locator('//table[@role="presentation"]/tbody/tr[5]/td[2]/div/div')).toContainText('Ordered');
    }

    async validate_order_line(qty: string, price: string, total: string, currency: string) {
        await expect(this.quantity).toContainText(qty);
        await expect(this.price).toContainText(price);
        await expect(this.total).toContainText(total);
        await expect(this.currency).toContainText(currency);
    }

    async click_on_create_receipt_button(){
        await this.page.getByRole('link', { name: 'Create Receipt' }).click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}
export default Order_Manage;