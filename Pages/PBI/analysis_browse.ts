import { Page, expect } from '@playwright/test';
import { utils } from '../UTILS/utils';

export class Browse_Analysis {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async search_and_edit_analysis(keyword: string) {
        const util = new utils(this.page);
        util.Search_On_Main_Page(keyword);
        await expect(this.page.getByLabel('Record(s)').locator('span')).toContainText('1 Record(s)');
        await this.page.getByRole('cell').filter({ hasText: /^$/ }).first().click();
        await this.page.locator('//table/tbody/tr[1]/td[5]/a').click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}
export default Browse_Analysis;