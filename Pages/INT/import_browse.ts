import { Locator, Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import {utils} from '../../Pages/UTILS/utils';
dotenv.config();

export class import_browse
{
    private page: Page;
    public CreateImportBtn : Locator;
    public currentUrl:string;

    constructor(page:Page)
    {
        this.page=page;
        this.CreateImportBtn = this.page.getByRole('button', { name: 'Create Import' });
        this.currentUrl=this.page.url();
    }

    async ValidateUrlContainsbrowse()
    {
        await expect(this.page.url()).toMatch(/import_browse/);
    }

}

export default import_browse;