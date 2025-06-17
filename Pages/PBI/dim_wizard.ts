import { Locator, Page, expect, selectors } from '@playwright/test';

export class Create_Dimension {

    readonly page: Page;

    // Define locators
    public header: Locator;
    public container1: Locator;
    public container2: Locator;
    public saveButton: Locator;
    public nextButton: Locator;
    public codeField: Locator;
    public LabelField: Locator;
    public descField: Locator;
    public typeButton: Locator;
    public addBucketButton: Locator;
    public container3: Locator;
    public bucketGrid: Locator;
    public orderCol: Locator;
    public bucketCodeCol: Locator;
    public bucketLabelCol: Locator;
    public bucketCodeField: Locator;
    public bucketLabelField: Locator;
    public confirmButton: Locator;
    public sucessMsg: Locator;
    public container4: Locator;
    public selectorSec: Locator;
    public optionsSec: Locator;
    public validateButton: Locator;
    public status: Locator;
    public crossIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = this.page.locator('iframe').contentFrame().locator('//*[@id="modalTitle"]/span');
        this.container1 = this.page.locator('iframe').contentFrame().locator('//*[@id="body_x_tabDimWizard_prxProperties_prxprxProperties_x_phcDimPropertiesContainer"]/div[1]/div/h2');
        this.container2 = this.page.locator('iframe').contentFrame().locator('//*[@id="body_x_tabDimWizard_prxProperties_prxprxProperties_x_phcDimTypeContainer"]/div[1]/div/h2');
        this.saveButton = this.page.locator('iframe').contentFrame().locator('//*[@id="proxyActionBar_x__cmdSave"]');
        this.nextButton = this.page.locator('iframe').contentFrame().locator('//*[@id="proxyActionBar_x_btnNext"]');
        this.codeField = this.page.locator('iframe').contentFrame().locator('//*[@id="body_x_tabDimWizard_prxProperties_prxprxProperties_x_txtDimCode"]');
        this.LabelField = this.page.locator('iframe').contentFrame().locator('//*[@id="body_x_tabDimWizard_prxProperties_prxprxProperties_x_txtDimLabelen"]');
        this.descField = this.page.locator('iframe').contentFrame().locator('//*[@id="body_x_tabDimWizard_prxProperties_prxprxProperties_x_txtDimDescen"]');
        this.typeButton = this.page.locator('iframe').contentFrame().locator('//*[@id="body_x_tabDimWizard_prxProperties_prxprxProperties_x_selDimType3"]');

        this.addBucketButton = this.page.locator('iframe').contentFrame().locator('//*[@id="body_x_tabDimWizard_prxBuckets_prxprxBuckets_x_grdBuckets_grdBuckets_grid_add_line"]');
        this.container3 = this.page.locator('iframe').contentFrame().locator('//*[@id="body_x_tabDimWizard_prxBuckets_prxprxBuckets_x_phcDimBuckets"]/div[1]/div/h2');
        this.bucketGrid = this.page.locator('iframe').contentFrame().locator('//*[@id="body_x_tabDimWizard_prxBuckets_prxprxBuckets_x_grdBuckets_grd"]');
        this.orderCol = this.page.locator('iframe').contentFrame().locator('//*[@id="body_x_tabDimWizard_prxBuckets_prxprxBuckets_x_grdBuckets_grd__ctl0___colReordergrdBuckets"]/span');
        this.bucketCodeCol = this.page.locator('iframe').contentFrame().locator('//*[@id="body_x_tabDimWizard_prxBuckets_prxprxBuckets_x_grdBuckets_grd__ctl0_colBucketsCode"]/span');
        this.bucketLabelCol = this.page.locator('iframe').contentFrame().locator('//*[@id="body_x_tabDimWizard_prxBuckets_prxprxBuckets_x_grdBuckets_grd__ctl0_colBucketsLabel"]/span');
        this.bucketCodeField = this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'Bucket code' });
        this.bucketLabelField = this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'Bucket label' });
        this.confirmButton = this.page.locator('iframe').contentFrame().getByRole('button', { name: 'btnSaveRow' });
        this.sucessMsg = this.page.locator('iframe').contentFrame().locator('//*[@id="bodyTag"]/div[10]/div/span[2]');
        this.container4 = this.page.locator('iframe').contentFrame().locator('//*[@id="body_x_tabDimWizard_prxReview_prxprxReview_x_phcDimReview"]/div[1]/div/h2');
        this.selectorSec = this.page.locator('iframe').contentFrame().locator('//*[@id="body_x_tabDimWizard_prxReview_prxprxReview_x_phcDimReviewContainer_content"]/table/tbody/tr[3]/td/div');
        this.optionsSec = this.page.locator('iframe').contentFrame().locator('//*[@id="body_x_tabDimWizard_prxReview_prxprxReview_x_phcDimOptionsInfos"]');
        this.validateButton = this.page.locator('iframe').contentFrame().locator('//*[@id="proxyActionBar_x_btnValidate"]');
        this.status = this.page.locator('iframe').contentFrame().locator('//*[@id="body_x_tabDimWizard_prxReview_prxprxReview_x_rawStatus"]/span');
        this.crossIcon = this.page.locator('iframe').contentFrame().getByRole('button', { name: 'btnClose' });
        this.crossIcon = this.page.locator('iframe[name="f5a108d64-VIEW"]').contentFrame().getByRole('button', { name: 'btnClose' });

    }

    async createNewDimension(code: string, label: string, description: string, type: string) {
        await expect(this.header).toHaveText('Dimension - Create New');
        await expect(this.container1).toHaveText('Properties');
        await expect(this.container2).toHaveText('Type');

        await expect(this.saveButton).toBeVisible();
        await expect(this.nextButton).toBeVisible();

        await this.codeField.fill(code);
        await this.LabelField.fill(label);

        try {
            if (description != null || description != undefined || description !== '') {
                await this.descField.fill(description);
            }

        } catch (error) {
            console.log('Description is not defined...');
        }

        if (type === 'Bucketing' || type === 'bucketing') {
            await this.typeButton.check();
        }

        await this.nextButton.click();
        await this.page.waitForLoadState('domcontentloaded');

        await expect(this.container3).toHaveText('Bucketing');
        await expect(this.addBucketButton).toBeVisible();
        await expect(this.bucketGrid).toBeVisible();
        await expect(this.orderCol).toContainText('Order');
        await expect(this.bucketCodeCol).toContainText('Bucket code');
        await expect(this.bucketLabelCol).toContainText('Bucket label');

    }
    // Add Bucket
    async addBucket(bucketCode: string, bucketLabel: string) {

        await this.addBucketButton.click();
        await this.bucketCodeField.fill(bucketCode);
        await this.bucketLabelField.fill(bucketLabel);
        await this.confirmButton.click();
        await expect(this.sucessMsg).toContainText('Data has been saved');
        await this.nextButton.click();
        await this.page.waitForLoadState('domcontentloaded');

        await expect(this.container4).toHaveText('Review Summary');
        await expect(this.selectorSec).toBeVisible();
        await expect(this.optionsSec).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.validateButton.click();
        await this.page.waitForLoadState('domcontentloaded');

        await expect(this.status).toContainText('Validated');
        await this.crossIcon.click();

    }
}

export default Create_Dimension;