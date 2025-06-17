import { expect, Locator, Page } from '@playwright/test';
import utils from '../UTILS/utils';

export class Review_Manage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async validate_review_modal() {
        await expect(this.page.locator('iframe').contentFrame().locator('#modalTitle')).toContainText('Your experience is important, share it!');
        await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Close', exact: true }).click();
    }
}
export default Review_Manage;