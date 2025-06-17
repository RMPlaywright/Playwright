import { Page, expect, Locator } from '@playwright/test';
import utils from '../UTILS/utils';
import { Workbook } from 'exceljs';
import { log } from 'node:console';

/**
 * Class representing invoice operations.
 */
export class Invoice_Capture_Manage {
    private page: Page;
    private baseURL: string | undefined;

    public submitToApprovalBtn : Locator;
    public saveButton : Locator;

    public invoice_Ref_Number_locator : Locator;
    public generation_IRN_Locator : Locator;
    public otherActions_locator : Locator;
    public otherActions_display_QR_info : Locator;
    public organization_ID_Locator : Locator;
    public currency_locator : Locator;
    public Total_taxes_amount_locator : Locator;

    /**
     * @param {Page} page - The Playwright page object.
     */
        
    constructor(page: Page) {
        this.page = page;
        this.baseURL = process.env.baseURL;
        
        this.saveButton = this.page.locator('//*[@id="proxyActionBar_x__cmdSave"]');
        this.submitToApprovalBtn = this.page.locator('button[id*="proxyActionBar_x_valstd_inv"]');

        this.organization_ID_Locator = this.page.getByRole('combobox', { name: 'Organization ID' });
        this.currency_locator = this.page.getByRole('combobox', { name: 'Currency' });
        this.Total_taxes_amount_locator = this.page.getByRole('textbox', { name: 'Total Taxes Amount' });

        this.invoice_Ref_Number_locator = this.page.getByRole('textbox', { name: 'Invoice Reference Number' });
        this.generation_IRN_Locator = this.page.getByRole('textbox', { name: 'Date of Generation of IRN (M/' });

        this.otherActions_locator = this.page.getByRole('button', { name: 'Other Actions' });
        this.otherActions_display_QR_info = this.page.getByRole('button', { name: 'Display QR Code Information' });
    };
}

export default Invoice_Capture_Manage;