import { Page, expect } from '@playwright/test';

export class Manage_analysis {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async Save_Analysis(analysisTitle: string, description: string='', analysisCategory: string='', privateAnalysis: boolean) {
        await expect(this.page.locator('iframe').contentFrame().locator('#modalTitle')).toContainText('Manage Analysis');
        await this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'Analysis - English' }).fill(analysisTitle);
        
        if(description!='' || description!=undefined)
        {
            await this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'Description - English' }).fill(description);
        }

        if(analysisCategory!='' || analysisCategory!=undefined )
        {
            await this.page.locator('iframe').contentFrame().getByText('See AllDelete the value.').first().click();
            await this.page.locator('iframe').contentFrame().getByRole('combobox', { name: 'Analysis Category' }).fill(analysisCategory);
            await this.page.locator('iframe').contentFrame().getByRole('combobox', { name: 'Analysis Category' }).press(' ');
            await this.page.locator('iframe').contentFrame().getByRole('option', { name: analysisCategory }).first().click();
        }
        
        if (privateAnalysis != true) {
            await this.page.locator('iframe').contentFrame().getByRole('checkbox', { name: 'Private analysis If checked,' }).uncheck();
        }
        
        await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Save & Close' }).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

}
export default Manage_analysis;