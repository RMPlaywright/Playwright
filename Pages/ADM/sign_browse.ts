import { Locator, Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export class sign_browse
{
    private page:Page;
    public create_signature_transaction_btn:Locator;
    
    constructor(page:Page)
    {
        this.page=page;
        this.create_signature_transaction_btn=page.getByRole('link', { name: 'Create Signature Transaction' });
    }
}