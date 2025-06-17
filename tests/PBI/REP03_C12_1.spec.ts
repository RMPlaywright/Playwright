import { test } from '@playwright/test';
import { Homepage } from '../../Pages/homepage';
import { utils } from '../../Pages/UTILS/utils';
import { PBI_View } from '../../Pages/PBI/pbi_view';
import { Manage_Chart_Properties } from '../../Pages/PBI/chart_manage';
import { Browse_Stored_Exports } from '../../Pages/PBI/analysis_archive_browse';
import { Schedule_Reports } from '../../Pages/PBI/analysis_schedule_browse';
import { Thread_Manage } from '../../Pages/JOB/thread_manage';
import { Thread_Browse } from '../../Pages/JOB/thread_browse';
import { Browse_Analysis } from '../../Pages/PBI/analysis_browse';
import { Manage_analysis } from '../../Pages/PBI/analysis_manage';

//Keep Label as draft when test is not ready to run
test.describe('draft', () => {
    test('Store Analysis', async ({ page }) => {
        test.info().annotations.push({ type: 'tag', description: 'REP' }); // labels to specify the test case

        // Setup & Test Data
        const username = 'testim_admin';
        const password = 'T4stim2019!$';
        const app = new Homepage(page);
        const util = new utils(page);
        const pView = new PBI_View(page);
        const manage_chart = new Manage_Chart_Properties(page);
        const store_export = new Browse_Stored_Exports(page);
        const reports = new Schedule_Reports(page);
        const quque = new Thread_Manage(page);
        const thread = new Thread_Browse(page);
        const analysis = new Browse_Analysis(page);
        const analysis_manage = new Manage_analysis(page);

        // Login
        await app.login(username, password);

        // Select new configuration
        await app.create_configuration_context('000', 'REP03_C12_1');

        // Navigate to Browse Analytics Report
        await app.navigateTo('pbi/pbi_view');

        // Validate PBI View Page
        await pView.validatePBIViewPage();

        // Add Vertical Chart in the analysis
        await pView.add_Vertical_Chart_in_the_Analysis();
        await manage_chart.create_Vertical_Chart(undefined, undefined, 'Invoice Amount', 'Year');

        // Save Analysis
        const analysisTitle: string = `REP03_C12_1_${util.generateRandom(4)}`;
        await pView.click_on_SaveAs_Analysis_button();
        await analysis_manage.Save_Analysis(analysisTitle, undefined, undefined, false);

        // Store the analysis

        await pView.storeAnalysis('pdf');
        await pView.click_on_Stored_Exports();
        await store_export.browse_store_exports_and_validate(1);

        // Store export as PDF and Validate
        await store_export.download_and_Validate_PDF_From_Stored_Export();

        // Store export as Word and Validate
        await pView.storeAnalysis('word');
        await pView.click_on_Stored_Exports();
        await store_export.browse_store_exports_and_validate(2);
        await store_export.download_and_Validate_Word_From_Stored_Export();

        // Store export as Excel and Validate
        await pView.storeAnalysis('excel');
        await pView.click_on_Stored_Exports();
        await store_export.browse_store_exports_and_validate(3);
        await store_export.download_and_Validate_Excel_From_Stored_Export();

        // Store Analysis Subscription
        await pView.click_on_Export_Subscribe();
        await reports.add_new_schedule_subscription('REP03_C12_Subscription', 'PDF', 'Store as');
        await app.navigateTo('job/thread_browse');

        // Search Job and edit
        await thread.search_and_edit_thread('PBI - Analysis Schedule Queue');

        // Run PBI Schedule Queue Job
        await quque.run_PBI_analysis_Schedule_Queue();

        // Navigate to Analysis Browse
        await app.navigateTo('pbi/analysis_browse');

        // Search analysis and edit
        await analysis.search_and_edit_analysis(analysisTitle);

        // Store analysis subscrption
        await pView.click_on_Stored_Exports();
        await store_export.browse_store_exports_and_validate(4);
        await store_export.download_and_Validate_PDF_From_Stored_Export();
    });
});