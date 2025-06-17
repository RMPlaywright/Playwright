import { Page, expect, Locator } from '@playwright/test';
import homepage from '../homepage';
import utils from '../../Pages/UTILS/utils';

/**
 * Class representing all utility abd common fuctions.
 */
export class document_manage {
  private page: Page;
  private homLocators: homepage;
  private uploadFile: Locator;
  private util;
  public clauseControlLocator1;
  public clauseControlLocator2;

  constructor(page: Page) {
    this.page = page;
    this.homLocators = new homepage(page);
    this.uploadFile = this.page.locator('input[type="file"]');
    this.util = new utils(page);
    this.clauseControlLocator1 = this.page.locator('//*[@id="body_x_tabc_tabDocumentManage_prxAuthoringNew_x_divPanelRight"]/div[2]/div/div[2]/div[2]/div[1]/div/div[2]');
    this.clauseControlLocator2 = this.page.locator('//*[@id="body_x_tabc_tabDocumentManage_prxAuthoringNew_x_divPanelRight"]/div[2]/div/div[2]/div[4]/div[1]/div/div[2]');

  }



  async importDocument(fileName: string) {
    //  await this.uploadFile.click();
    await this.util.import_document(fileName,'//*[@id="body_x_tabc_tabDocumentManage_prxAuthoringNew_x_fileImport_x_UploadButtonControl"][1]') ;
    const topMostModal1 = await this.util.getModalId();

    if (topMostModal1) {
      // If the frame is valid (not null), proceed with the actions

      const validateButton = topMostModal1.getByRole('button', { name: 'Validate' });
      await validateButton.waitFor({ state: 'visible', timeout: 10000 });
      await validateButton.click();
    } else {
      console.log("No modal found or frame is null.");
    }

    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('load');

    await this.page.waitForTimeout(30000);
    await this.page.waitForSelector('div > #body > .ui', { state: 'hidden' });

    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');

  }


  async ChangeClassification(){
    const topMostModal2 = await this.util.getModalId();

    if (topMostModal2) {
      // If the frame is valid (not null), proceed with the actions

      const validateButton = topMostModal2.getByRole('button', { name: 'Validate' });
     // const valModalHeading = topMostModal2.getByText('Clause Comparison')
      const crossButton = topMostModal2.getByRole('button', { name: 'Delete the value.' });
      const ClauseTypeBox = topMostModal2.getByRole('combobox', { name: 'Clause Type' });
      const CloseButton = topMostModal2.getByRole('button', { name: 'btnClose' });
      await crossButton.click();
      await ClauseTypeBox.fill('Acceptance');
      await topMostModal2.getByText('Acceptance').click();
      await validateButton.click();
      await CloseButton.click();
    } else {
      console.log("No modal found or frame is null.");
    }

  }


  async RemoveClasisfaiction(){
    const topMostModal3 = await this.util.getModalId();

    if (topMostModal3) {
      // If the frame is valid (not null), proceed with the actions

      const validateButton = topMostModal3.getByRole('button', { name: 'Validate' });
      const crossButton = topMostModal3.getByRole('button', { name: 'Delete the value.' });
      const CloseButton = topMostModal3.getByRole('button', { name: 'btnClose' });

      await crossButton.click();
      await validateButton.click();
      await CloseButton.click();
    } else {
      console.log("No modal found or frame is null.");
    }
  }




}

export default document_manage;