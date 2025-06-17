import { test, expect, Locator } from '@playwright/test';
import homepage from '../../Pages/homepage';
import utils from '../../Pages/UTILS/utils';
import { contract_browse } from '../../Pages/CTR/contract_browse';
import { contract_manage } from '../../Pages/CTR/contract_manage';
import { document_manage } from '../../Pages/CTR/document_manage';
import * as path from 'path';


test.describe('draft', () => {
  test('Check clause classification for Imported documents', async ({ page }) => {

    // Setup & Test Data
    const app = new homepage(page);
    const util = new utils(page);
    const ctrMange = new contract_manage(page);
    const ctrbrowse = new contract_browse(page);
    const docMange = new document_manage(page);
    const username = 'Testim_Lawyer_CTR08';
    const password = 'T4stim2019!$';

    await app.login(username, password);
    const docName = await util.generateRandom(6);

    await app.navigateTo('ctr/contract_browse');
    await ctrbrowse.searchAndEditContract("CTR08_Classification_2");

    await ctrMange.addDocumentAndSave("CTR08_DOC_SC02_" + docName);
    await page.waitForLoadState('domcontentloaded');

    await docMange.importDocument("Keyterms_CTR08.docx");

    await docMange.clauseControlLocator1.hover();
    await expect(page.getByRole('tooltip')).toContainText('Preamble clause, guessed by AI with 87% confidence Click to change the clause type 0 clause(s) with the same type available');

    await docMange.clauseControlLocator2.hover();
    await expect(page.getByRole('tooltip')).toContainText('Miscellaneous clause, guessed by AI with 89% confidence Click to change the clause type 4 clause(s) with the same type available');

    await page.waitForSelector('text=Version', { timeout: 30000 });
    await page.getByText('Version', { exact: true }).click();
    await docMange.clauseControlLocator1.click();

    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');

    await docMange.ChangeClassification();

    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('load');

    await docMange.clauseControlLocator1.hover();
    //await expect(page.getByRole('tooltip')).toContainText('Acceptance clause, set by end-user Click to change the clause type 0 clause(s) with the same type available');


    await util.custom_click(page.locator('.clause-controls > div:nth-child(2)').first());
    await page.waitForSelector('div > #body > .ui', { state: 'hidden' });
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');

    await docMange.RemoveClasisfaiction();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('load');

    await docMange.clauseControlLocator1.hover();
    await expect(page.getByRole('tooltip')).toContainText('Unknown clause Click to change the clause type');

  })

});
