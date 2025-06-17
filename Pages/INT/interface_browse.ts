import { Locator, Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

export class interface_browse
{
    private page:Page;
    public editeai: Locator;
    public CreateEaiFromTemplate:Locator;
    public Templatelocator:Locator;
    public Codelocator:Locator;
    public Labellocator:Locator;


    constructor(page:Page)
    {
        this.page=page;
        this.editeai=page.locator('#body_x_grid_grd_tr_RMQA_EAI_QueryDataset_img___colManagegrid i.fa-pencil-alt');
        this.CreateEaiFromTemplate=page.getByRole('button', { name: 'Create EAI from Template' });
        this.Templatelocator=page.locator('iframe[name="f74c44728-VIEW"]').contentFrame().getByRole('combobox', { name: 'Template *' });
        this.Codelocator=page.locator('iframe[name="f74c44728-VIEW"]').contentFrame().getByRole('textbox', { name: 'Code *' });
        this.Labellocator=page.locator('iframe[name="f74c44728-VIEW"]').contentFrame().getByRole('textbox', { name: 'Label - English' });
    }

    async createEaiFromTemplate(EaiCode:string,Template:string,EaiLabel:string)
    {
        await this.Templatelocator.fill(Template);
        await this.page.locator('iframe[name="f74c44728-VIEW"]').contentFrame().getByText('RMQA_EAI_QueryDataset').click();
        await this.Codelocator.fill(EaiCode);
        await this.Labellocator.fill(EaiLabel);
        await this.page.locator('iframe[name="f74c44728-VIEW"]').contentFrame().getByRole('button', { name: 'Create EAI' }).click();
        await this.page.waitForTimeout(1000);
    }
}