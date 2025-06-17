import { expect, Locator, Page } from '@playwright/test';

export class Thread_Manage {

    readonly page : Page;

    constructor(page: Page){
        this.page = page;
    }

    async run_PBI_analysis_Schedule_Queue(){
        await expect(this.page.locator('#header_x_prxHeaderTitle_x')).toContainText('Task: PBI - Analysis Schedule Queue - /pbi/analysis_schedule_queue/queue_reports');
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => { });
        });
        await this.page.getByRole('link', { name: 'Execute this job' }).click();
        await this.page.getByText('Succeeded (val)').waitFor();
        await this.page.waitForTimeout(30000);
    }
}
export default Thread_Manage;