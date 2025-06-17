import { Locator, Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export class login_manage
{
    private page:Page;
    public login_name:Locator;
    public password_btn:Locator;
    public first_name:Locator;
    public last_name:Locator;
    public email_btn:Locator;
    public admin_chkbox:Locator;


    constructor(page:Page)
    {
        this.page=page;
        this.login_name=page.getByRole('textbox', { name: 'Login *' });
        this.password_btn=page.getByRole('textbox', { name: 'Password <img src="/buyer/' });
        this.first_name=page.getByRole('textbox', { name: 'First Name *' });
        this.last_name=page.getByRole('textbox', { name: 'Last Name *' });
        this.email_btn=page.getByRole('textbox', { name: 'Email *' });
        this.admin_chkbox=page.getByRole('checkbox', { name: 'Administrator ' });
    }

    async CreateUser(LoginID:string,FirstName:string,LastName:string,Email:string)
    {
        await this.last_name.fill(LoginID);
        await this.password_btn.fill('T4stim2019!$');
        await this.first_name.fill(FirstName);
        await this.last_name.fill(LastName);
        await this.email_btn.fill(Email);
        await this.admin_chkbox.check();
    }


    

}