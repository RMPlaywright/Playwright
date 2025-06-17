import { Locator, Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

export class api_browse
{
    private page:Page;
    public http_method_locator:Locator;
    public editapibtn:Locator;


    constructor(page:Page)
    {
        this.page=page;
        this.http_method_locator=page.getByRole('combobox', { name: 'HTTP Method' });
        this.editapibtn=page.locator('i.fa-pencil-alt').first();

    }

    async SetHttpMethodPOST()
    {
        await this.http_method_locator.fill('POST');
        await this.page.getByRole('option', { name: 'POST' }).locator('span').click();
        
    }


}
