import { Locator, Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export class profil_auth
{
    private page: Page;
    public profile_authorizations : Locator;

    /**
   * Create an instance of Homepage.
   * @param {Page} page - The Playwright page object.
   */
    constructor(page: Page)
    {
        this.page=page;
        this.profile_authorizations = this.page.getByText('Profile / Authorizations Association', { exact: true });
    }

    async SelectUser(user:string)
    {
        await this.page.getByRole('combobox', { name: 'Profile', exact: true }).click();
        await this.page.getByRole('combobox', { name: 'Profile', exact: true }).fill(user);
        await this.page.getByRole('option', { name: user }).click();
        await this.page.waitForTimeout(1500);
    }

    async ValidateChecked(chkbox : Locator)
    {
        await chkbox.check();
        await expect(chkbox).toBeChecked();
    }

}

export default profil_auth;