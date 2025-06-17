import { test, expect, Page } from '@playwright/test';

export class Webpart_Selection_Modal{
    private page : Page;

    constructor(page:Page){
        this.page = page;
    }

    async selectWebpart(module:string, keyword :string){
        await expect(this.page.locator('iframe').contentFrame().locator('#modalTitle')).toContainText('List of content available');
        await this.page.locator('iframe').contentFrame().getByRole('combobox', { name: 'Module' }).fill(module);
        await this.page.locator('iframe').contentFrame().getByRole('option', { name: 'PBI - Platform BI' }).click();
        await this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'Keywords' }).fill(keyword);
        await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Search' }).click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.locator('iframe').contentFrame().locator('//*[@id="body_x_grid_grd_tr__x47_pbi_x47_pbi_view_webpart_chkWebPart_checkbox"]').check();
        await this.page.waitForLoadState('domcontentloaded');
    }
}
export default Webpart_Selection_Modal;
