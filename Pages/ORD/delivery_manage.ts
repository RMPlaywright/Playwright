import { expect, Locator, Page } from '@playwright/test';
import utils from '../UTILS/utils';

export class Delivery_Manage {

    readonly page: Page;
    public quantity: Locator;
    public price: Locator;
    public total: Locator;
    public currency: Locator;

    constructor(page: Page) {
        this.page = page;
        this.quantity = this.page.locator('//table[@id="body_x_tabc_prxDelivery_prxprxDelivery_x_prxItem_x_gridDeliveryItems_grd"]/tbody/tr/td[6]');
        this.price = this.page.locator('//table[@id="body_x_tabc_prxDelivery_prxprxDelivery_x_prxItem_x_gridDeliveryItems_grd"]/tbody/tr/td[8]');
        this.total = this.page.locator('//table[@id="body_x_tabc_prxDelivery_prxprxDelivery_x_prxItem_x_gridDeliveryItems_grd"]/tbody/tr/td[9]');
        this.currency = this.page.locator('//table[@id="body_x_tabc_prxDelivery_prxprxDelivery_x_prxItem_x_gridDeliveryItems_grd"]/tbody/tr/td[10]');

    }

    async validate_delivery_line(qty: string, price: string, total: string, currency: string) {
        await expect(this.quantity).toContainText(qty);
        await expect(this.price).toContainText(price);
        await expect(this.total).toContainText(total);
        await expect(this.currency).toContainText(currency);
    }

    async edit_delivery_line() {
        await this.page.locator('//table[@id="body_x_tabc_prxDelivery_prxprxDelivery_x_prxItem_x_gridDeliveryItems_grd"]/tbody/tr/td[2]').click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async click_on_submit_receipt_button(){
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async validate_receipt_status(){
        await expect(this.page.getByRole('status')).toContainText('The activity Receipt Approved has been automatically validated');
    }

    async click_on_create_invoice_button(){
        await this.page.getByRole('link', { name: 'Create Invoice' }).click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}

export default Delivery_Manage;