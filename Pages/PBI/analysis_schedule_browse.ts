import { expect, Locator, Page } from '@playwright/test';

export class Schedule_Reports {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async add_new_schedule_subscription(reportName: string, fileFormat: string, distribution: string) {
        await expect(this.page.locator('iframe').contentFrame().locator('#modalTitle')).toContainText('Scheduled Reports');
        await expect(this.page.locator('iframe').contentFrame().locator('#body_x_gridSchedule_grid_add_line')).toContainText('Add a new Schedule');

        await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Add a new Schedule' }).click();

        await this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'Scheduled Report Label' }).fill(reportName);
        await this.page.locator('iframe').contentFrame().getByRole('cell', { name: 'File Format' }).locator('i').first().click();

        await this.page.locator('iframe').contentFrame().getByRole('combobox', { name: 'File Format' }).fill(fileFormat);
        await this.page.locator('iframe').contentFrame().getByRole('combobox', { name: 'File Format' }).press(' ');
        await this.page.locator('iframe').contentFrame().getByRole('option', { name: fileFormat }).click();

        await this.page.locator('iframe').contentFrame().getByRole('cell', { name: 'Distribution' }).locator('i').first().click();
        await this.page.locator('iframe[name="f40eb0427-VIEW"]').contentFrame().getByRole('combobox', { name: 'Distribution' }).fill(distribution);
        await this.page.locator('iframe[name="f40eb0427-VIEW"]').contentFrame().getByRole('combobox', { name: 'Distribution' }).press(' ');
        await this.page.locator('iframe').contentFrame().getByRole('option', { name: distribution }).click();

        await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'btnSaveRow' }).click();
        await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Close', exact: true }).click();
    }
}
export default Schedule_Reports;