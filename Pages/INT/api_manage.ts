import { Locator, Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

export class api_manage
{
    private page:Page;
    public security_tab_btn:Locator;
    public editapibtn:Locator;
    public delte_authentication_type_none_btn:Locator;
    public authentication_type_btn:Locator;
    public user_input_btn:Locator;
    public api_key_locator:Locator;
    public api_url_locator:Locator;


    constructor(page:Page)
    {
        this.page=page;
        this.security_tab_btn=page.getByLabel('Left panel').getByText('Security');
        this.editapibtn=page.locator('i.fa-pencil-alt').first();
        this.delte_authentication_type_none_btn=page.locator('#body_x_tcApiManage_prxApiSecurity_prxprxApiSecurity_x_phcSecurity_content div').filter({ hasText: 'Authentication Type*' }).getByRole('button');
        this.authentication_type_btn=page.getByRole('combobox', { name: 'Authentication Type *' });
        this.user_input_btn=page.getByRole('combobox', { name: 'User This selector displays' });
        this.api_key_locator=page.locator('#body_x_tcApiManage_prxApiSecurity_prxprxApiSecurity_x_lblTokenGenerated');
        this.api_url_locator= page.locator('#body_x_tcApiManage_prxApiSecurity_prxprxApiSecurity_x_lblURL');
    }

    async SetAuthenticationApiKey()
    {
        await this.delte_authentication_type_none_btn.click();
        await this.authentication_type_btn.fill('API key (querystring)');
        await this.page.getByText('API key (querystring)', { exact: true }).click();
        await this.page.waitForTimeout(1600);
    }

    async SetUser()
    {
        await this.user_input_btn.fill('testim_admin_INT04_1');
        await this.page.getByText('ADMIN INT04_1 Testim', { exact: true }).click();
        await this.page.waitForTimeout(1000);

    }
    


}
