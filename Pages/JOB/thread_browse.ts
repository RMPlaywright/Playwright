import {Page, expect} from '@playwright/test';
import {utils} from '../UTILS/utils';

export class Thread_Browse{
    readonly page : Page;

    constructor(page:Page){
        this.page = page;

    }

    async search_and_edit_thread(keyword: string){
        const util  = new utils(this.page);
        util.Search_On_Main_Page(keyword);
        await expect(this.page.getByLabel('Record(s)').locator('span')).toContainText('1 Record(s)');
        await this.page.getByRole('cell').filter({ hasText: /^$/ }).first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }

}
export default Thread_Browse;