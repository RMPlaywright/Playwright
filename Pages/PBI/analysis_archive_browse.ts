import { expect, Locator, Page } from '@playwright/test';
import { utils } from '../UTILS/utils';
export class Browse_Stored_Exports {

    readonly page: Page;
    public btnFile: Locator;
    public btnFileClass: Locator;
    public closeBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.btnFile = this.page.locator('iframe').contentFrame().locator('//table[@id="body_x_gridArchive_grd"]/tbody/tr[1]/td[2]/button');
        this.btnFileClass = this.page.locator('iframe').contentFrame().locator('//table[@id="body_x_gridArchive_grd"]/tbody/tr[1]/td[2]/button/i');
        this.closeBtn = this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Close', exact: true });
    }

    async browse_store_exports_and_validate(expectedRecords: number) {
        await expect(this.page.locator('iframe').contentFrame().locator('#modalTitle')).toContainText('Browse Stored Exports');
        await expect(this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Refresh', exact: true })).toBeVisible();
        await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Refresh', exact: true }).click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page.locator('iframe').contentFrame().getByLabel('Record(s)').locator('span')).toContainText(`${expectedRecords} Record(s)`);

        for (let i = 1; i <= expectedRecords; i++) {
            await expect(this.page.locator('iframe').contentFrame().locator(`//table[@id="body_x_gridArchive_grd"]/tbody/tr[${i}]/td[6]`)).toHaveText('Completed');

        }
    }

    async download_and_Validate_PDF_From_Stored_Export() {

        await expect(this.btnFileClass).toHaveClass('menu-item export-pdf icon');
        const util = new utils(this.page);
        await util.downloadFile(this.btnFile);
        await this.closeBtn.click();
    }

    async download_and_Validate_Word_From_Stored_Export() {
        await expect(this.btnFileClass).toHaveClass('menu-item export-word icon');
        const util = new utils(this.page);
        util.downloadFile(this.btnFile);
        await this.closeBtn.click();
    }

    async download_and_Validate_Excel_From_Stored_Export() {
        await expect(this.btnFileClass).toHaveClass('menu-item export-excel icon');
        const util = new utils(this.page);
        util.downloadFile(this.btnFile);
        await this.closeBtn.click();
    }

}
export default Browse_Stored_Exports;