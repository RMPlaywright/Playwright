import { expect, Locator, Page } from '@playwright/test';
import { utils } from '../UTILS/utils';

export class PBI_View {

    readonly page : Page;
    public floppyDiscIcon : Locator;
    public exportButton : Locator;
    public threeDots : Locator;
    public storedExportBtn  : Locator;
    public header : Locator;

    constructor(page: Page){
        this.page = page;
        this.floppyDiscIcon = this.page.getByRole('button', { name: 'Save/Save as' });
        this.exportButton = this.page.getByRole('button', { name: 'Export' });
        this.threeDots = this.page.getByRole('button', { name: 'btnAdditionnalOptions' });
        this.storedExportBtn = this.page.getByRole('button', { name: 'Stored Exports' });
        this.header = this.page.locator('#header_x_prxHeaderTitle_x');
    }
    
async validatePBIViewPage(){
    await expect(this.header).toContainText('PBI Analysis : <New analysis>');
    await expect(this.page.locator('//table[@id="body_x_pbiActionBar"]/tbody/tr/td[1]')).toHaveClass('iv-phc-cell top aligned');
    await expect(this.page.getByRole('button', { name: 'Undo all' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Undo', exact: true })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Do', exact: true })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Refresh data' })).toBeVisible();
    await expect(this.floppyDiscIcon).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'New Analysis' })).toBeVisible();
    await expect(this.exportButton).toBeVisible();
    await expect(this.page.getByRole('checkbox', { name: 'Auto Refresh' })).toBeVisible();

    await expect(this.page.getByRole('tab', { name: 'Browse Analyses' })).toBeVisible();
    await this.page.getByRole('tab', { name: 'Browse Analyses' }).click();
    await expect(this.page.getByText('Change analysisSee AllDelete')).toBeVisible();
}

async add_Vertical_Chart_in_the_Analysis(){
    await this.page.locator('.new-tile-zone').first().click();
    await expect(this.page.locator('#body_x_prxTileContainer_x_tileGrid_context')).toContainText('Create New Tile');
    await this.page.getByRole('button', { name: 'Vertical Plot Chart' }).click();
    await this.page.waitForLoadState('domcontentloaded');
}

async click_on_SaveAs_Analysis_button(){
    await this.floppyDiscIcon.click();
    await this.page.waitForLoadState('domcontentloaded');
}

async storeAnalysis(type: string){
    await this.header.click();
    await this.exportButton.click();
    await this.page.getByRole('button', { name: 'Store' }).hover();
    try{
        if(type=='PDF'||type=='pdf'){
            await this.page.locator('#archivePdf').click();
        }
        else if(type=='Excel'||type=='excel'){
            await this.page.locator('#archiveExcel').click();
        }
        else if(type=='Word'||type=='word'){
            await this.page.locator('#archiveWord').click();
        }
    }
    catch(error){
        console.error('File Type is invalid!');
    }
    await expect(this.page.getByText('Close messagesThe Analysis')).toBeVisible();
}

async click_on_Stored_Exports(){
    await this.threeDots.click();
    await this.storedExportBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
}

async click_on_Export_Subscribe(){
    await this.header.click();
    await this.exportButton.click();
    await this.page.getByRole('button', { name: 'Subscribe' }).click();
    await this.page.waitForLoadState('domcontentloaded');
}
  
}
export default PBI_View;