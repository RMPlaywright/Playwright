import { test } from '@playwright/test';
import { PBI_Configuration_Center } from '../../Pages/PBI/configuration_cockpit';
import { Homepage } from '../../Pages/homepage';
import { utils } from '../../Pages/UTILS/utils';

import { Create_Dimension } from '../../Pages/PBI/dim_wizard';

test.describe('ready', () => {
    test('Create Dimension with bucketing', async ({ page }) => {
        test.info().annotations.push({ type: 'tag', description: 'REP' });
        
        const username: string = "testim_admin";
        const password: string = "T4stim2019!$";

        const app = new Homepage(page);
        const util = new utils(page);
        const pbi = new PBI_Configuration_Center(page);
        const modal = new Create_Dimension(page);

        const rand = util.generateRandom(5);

        // Login
        await app.login(username, password);

        // Navigate to Analytics -> Cube Settings
        await app.navigateTo('pbi/configuration_cockpit');

        // Create new Configuration
        await app.create_configuration_context('000', 'REP08_C11');

        // Create Dimension
        await pbi.click_On_Create_Dimension_Button();
        await modal.createNewDimension(`d_ctn_${rand}`, 'Test bucket 1', '', 'Bucketing');

        // Add Bucket
        await modal.addBucket(`B_${rand}`, `Bucket_${rand}`);

        // Delete the bucketing Dimension
        await pbi.Delete_the_bucketing_dimension(`d_ctn_${rand}`);
    })
});