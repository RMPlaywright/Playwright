import { expect, Locator, Page } from '@playwright/test';

export class Manage_Chart_Properties {

    readonly page: Page;
    public modalTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modalTitle = this.page.locator('iframe').contentFrame().locator('#modalTitle');
    }

    async create_Vertical_Chart(title: string = '', description: string = '', indicators: string, axis: string) {
        await expect(this.modalTitle).toContainText('Manage Chart Properties');

        if(title!='' || title!=undefined){
            await this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'Title - English' }).fill(title);
        }

        if (description!='' || description!=undefined){
            await this.page.locator('iframe').contentFrame().locator('#body_x_tabc_tabInfo_prxMainInfos_x_phcMainInfos_content div').filter({ hasText: 'DescriptionenFill in the' }).getByRole('textbox').fill(description);
            await this.modalTitle.click();
        }

        await this.page.locator('iframe').contentFrame().getByText('Add Indicator').click();
        await this.page.locator('iframe').contentFrame().getByRole('combobox', { name: 'Indicators' }).fill(indicators);
        await this.page.locator('iframe').contentFrame().getByRole('combobox', { name: 'Indicators' }).press(' ');
        await this.page.locator('iframe').contentFrame().getByRole('option', { name: indicators, exact: true }).click();

        await this.page.locator('iframe').contentFrame().getByRole('combobox', { name: 'Axis: *' }).click();
        await this.page.locator('iframe').contentFrame().getByRole('combobox', { name: 'Axis: *' }).fill(axis);
        await this.page.locator('iframe').contentFrame().getByRole('combobox', { name: 'Axis: *' }).press(' ');
        await this.page.locator('iframe').contentFrame().getByRole('option', { name: axis }).click();
        
        await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Apply and Close' }).click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}
export default Manage_Chart_Properties;