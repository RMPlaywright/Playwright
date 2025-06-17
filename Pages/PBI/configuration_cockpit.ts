import { Locator, Page, expect } from '@playwright/test';



export class PBI_Configuration_Center {

    readonly page: Page;

    // Define locators as properties

    public dimensionTab: Locator;
    public createDimensionButton: Locator;
    public keywordField: Locator;
    public searchButton: Locator;
    public resultLabel: Locator;
    public trashIcon: Locator;
    constructor(page: Page) {
        this.page = page;
        this.dimensionTab = this.page.locator('//*[@id="body_x_tabConfigCockpit_prxOverview_prxprxOverview_x_tabCubeConfig_containerTab_partprxprxDimensions"]');
        this.createDimensionButton = this.page.locator('//*[@id="body_x_tabConfigCockpit_prxOverview_prxprxOverview_x_tabCubeConfig_prxDimensions_prxprxDimensions_x_gridDimensions_btnCreateDimension"]');
        this.keywordField = this.page.getByRole('textbox', { name: 'Keywords' });
        this.searchButton = this.page.getByRole('button', { name: 'Search' });
        this.resultLabel = this.page.locator("//table[@id='body_x_tabConfigCockpit_prxOverview_prxprxOverview_x_tabCubeConfig_prxDimensions_prxprxDimensions_x_gridDimensions_grd']/tbody/tr[1]/td[4]");
        this.trashIcon = this.page.getByLabel('Dimensions').getByRole('cell').filter({ hasText: /^$/ }).nth(1);
    }

    // Create Dimension
    async click_On_Create_Dimension_Button() {
        await this.dimensionTab.click();
        await this.createDimensionButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    // Delete the bucketing Dimension
    async Delete_the_bucketing_dimension(code: string) {
        await this.keywordField.fill(code);
        await this.searchButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(1000);

        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => { });
        });

        await this.trashIcon.click();
        await this.page.waitForLoadState('domcontentloaded');

        await expect(this.page.getByLabel('Dimensions').getByText('Record(s)')).toContainText('0 Record(s)');
    }
}

export default PBI_Configuration_Center;