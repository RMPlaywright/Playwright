
import { Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export class loginbrowse
{
    private page: Page ;
     /** Create an instance of INV.
   * @param {Page} page - The Playwright page object.
   */

    constructor(page: Page)
    {
        this.page = page;
    }

    async browse_users()
    {
        const baseUrl = process.env.baseURL;
        const navUrl = `${baseUrl}/usr/login_browse`;
        await this.page.goto(navUrl);
    }

    async search_user_and_validate(Username:string)
    {
        await this.page.getByRole('textbox', { name: 'Keywords' }).fill(Username);
        const searchButton = this.page.locator('#body_x_prxFilterBar_x_cmdSearchBtn');
        await searchButton.waitFor({ state: 'visible', timeout: 15000 });
        await searchButton.click();
        await this.page.waitForTimeout(1500);
        const uname = this.page.getByRole('cell', { name: Username }).nth(3)
        await expect(uname).toHaveText(Username);
    }

}