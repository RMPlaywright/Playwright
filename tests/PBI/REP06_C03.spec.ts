import { test } from '@playwright/test';
import { Homepage } from '../../Pages/homepage';
import { Webpart_Selection_Modal } from '../../Pages/BAS/web_part_browse';
import {utils} from '../../Pages/UTILS/utils';



//Keep Label as draft when test is not ready to run
test.describe('ready', () => {
    test('Webpart', async ({ page }) => {
        test.info().annotations.push({ type: 'tag', description: 'REP' }); // labels to specify the test case

        // Setup & Test Data
        const username = 'testim_admin';
        const password = 'T4stim2019!$';
        const app = new Homepage(page);
        const webpart = new Webpart_Selection_Modal(page);
        const util = new utils(page);

        // Login
        await app.login(username, password);

        // Adding Webpart
        await app.navigateTo('buy/homepage/adm');
        await app.create_configuration_context('000','REP06_C03');
        await app.adding_a_webpart();
        await webpart.selectWebpart('PBI', 'Analysis');
        await app.select_analysis_on_webpart('PBI_Analysis', 'Vertical Plot Chart 1');
        await app.exit_customize_dashboard();
        await app.validate_analysis_added();


        // Excel Webpart Export
        await util.download_and_validate_excel_file('analysis',1,'Validated','PBI_Analysis','Invoice Amount',2,'A',10,'B');

        // Word Webpart Export
        await util.download_and_validate_word_file('analysis');

        // Reset the homepage to default Settings
        await app.click_on_Customize_Dashboard_Button();
        await app.click_on_Reset_default_button();
        await app.exit_customize_dashboard();
    });
});