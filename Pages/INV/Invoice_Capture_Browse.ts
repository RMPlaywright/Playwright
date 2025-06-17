import { Page, expect, Locator } from '@playwright/test';
import utils from '../UTILS/utils';
import { Workbook } from 'exceljs';
import { log } from 'node:console';

/**
 * Class representing invoice operations.
 */
export class Invoice_Capture_Browse {
    private page: Page;
    private baseURL: string | undefined;

    public click_or_Drag_to_add_Files_locator : Locator;

    /**
     * @param {Page} page - The Playwright page object.
     */
        
    constructor(page: Page) {
        this.page = page;
        this.baseURL = process.env.baseURL;
        this.click_or_Drag_to_add_Files_locator = this.page.getByRole('button', { name: 'Click or Drag to add files' });
    };
}

export default Invoice_Capture_Browse;