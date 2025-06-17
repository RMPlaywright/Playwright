import { Page, expect, Locator } from '@playwright/test';

/**
 * Class representing all utility abd common fuctions.
 */
export class contract_manage {
  private page: Page;

  private DOCUMENTS_TAB: Locator;
  private ADD_BUTTON: Locator;
  private MAIN_CONTRACT_BUTTON: Locator
  private DOCUMENT_NAME_TEXTBOX: Locator;
  private SAVE_BUTTON: Locator
  // Define locators as properties
  public contract_name: Locator;
  public contract_type: Locator;
  public supplier_name: Locator;
  public contract_language: Locator;
  public contract_entity: Locator;
  public orga: Locator;
  public renewaltype: Locator;
  public renewalperiod: Locator;
  public renegotiationdate: Locator;
  public renegotiationperiod: Locator;
  public notificationdate: Locator;
  public notificationperiod: Locator;
  public enddate: Locator;
  public actualenddate: Locator;
  public terminationdate: Locator;
  public terminationcomment: Locator;
  /**
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;
    this.contract_name = this.page.getByRole('textbox', { name: 'Contract Name - English' });
    this.contract_type = this.page.getByRole('combobox', { name: 'Contract Type *' });
    this.supplier_name = this.page.getByRole('combobox', { name: 'Assigned suppliers *' });
    this.contract_language = this.page.getByRole('combobox', { name: 'Contract Language' });
    this.contract_entity = this.page.getByRole('combobox', { name: 'Contracting Entity *' });
    this.orga = this.page.getByRole('combobox', { name: 'Organizations' });
    this.renewaltype = this.page.getByRole('combobox', { name: 'Renewal Type' });
    this.renewalperiod = this.page.getByRole('textbox', { name: 'Renewal Period (months)' });
    this.renegotiationdate = this.page.getByRole('textbox', { name: 'Renegotiation Date (M/d/yyyy' });
    this.renegotiationperiod = this.page.getByRole('textbox', { name: 'Renegotiation Period (months' });
    this.notificationdate = this.page.getByRole('textbox', { name: 'Notification Date (M/d/yyyy)' });
    this.notificationperiod = this.page.getByRole('textbox', { name: 'Notification Period (months)' });
    this.enddate = this.page.getByRole('textbox', { name: 'End Date (M/d/yyyy) Original' });
    this.actualenddate = this.page.getByRole('textbox', { name: 'Actual End Date (M/d/yyyy)' });
    this.terminationdate = this.page.getByRole('textbox', { name: 'Termination Date (M/d/yyyy)' });
    this.terminationcomment = this.page.getByRole('textbox', { name: 'Termination Comments - English' });

    this.DOCUMENTS_TAB = this.page.getByText('Documents', { exact: true });
    this.ADD_BUTTON = this.page.getByRole('button', { name: 'Add' });
    this.MAIN_CONTRACT_BUTTON = this.page.getByRole('button', { name: 'Main Contract' });
    this.DOCUMENT_NAME_TEXTBOX = this.page.getByRole('textbox', { name: 'Document Name *' });
    this.SAVE_BUTTON = this.page.getByRole('button', { name: 'Save' });
  }





  // Write all the functions and locators here for contract_manage Page
  async addDocumentAndSave(documentName: string): Promise<void> {
    // Step 1: Navigate to the Documents tab
    await this.DOCUMENTS_TAB.click();

    // Step 2: Click the 'Add' button
    await this.ADD_BUTTON.click();

    // Step 3: Click the 'Main Contract' button
    await this.MAIN_CONTRACT_BUTTON.click();

    // Step 4: Enter the document name
    await this.DOCUMENT_NAME_TEXTBOX.click();
    await this.DOCUMENT_NAME_TEXTBOX.fill(documentName);

    // Step 5: Click the 'Save' button
    await this.SAVE_BUTTON.click();
  }

  async delDocumet() {
    await this.DOCUMENTS_TAB.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('load');
   const elements = this.page.locator("//div[contains(@class, 'icon') and contains(@class, 'fa-trash-alt') and contains(@class, 'regular')][1]");
    await elements.click();
    await this.page.getByRole('button', { name: 'Yes' }).click();
      await this.page.waitForTimeout(500);
      // Click the 'Yes' button after the tooltip
      
    }
    // Write all the functions and locators here for contract_manage Page
   /**
   * Log in to the application.
   * @param {string} contractname - The Contract Name 
   * @param {string} contracttype - The Contract Type
   * @param {string} suppliername - The Supplier Name
   * @param {string} contractlanguage - The Contract Language
   * @param {string} contractentity - The Contract Entity
   * @param {string} organization - The Contract Organization
   * @param {string} Renewal_type - The Renewal Type
   * @param {string} Renewal_period  - Renewal period (Months)
   * @param {string} Renegotiation_date - Renegotiation Date
   * @param {string} Renegotiation_period - Renegotiation Period (Months)
   * @param {string} Notification_date - Notification Date 
   * @param {string} Notification_period - Notification Period
   * @param {string} Signature_date - Signature Date
   * @param {string} Effective_date - Effective Date
   * @param {string} End_date - End Date
   * @param {string} Actual_end_date - Actual End Date
   * @param {string} Termination_date - Termination Date
   * @param {string} Termination_comment - Termination comment

   */
   

  async create_contract(
    contractname: string, 
    contracttype: string, 
    suppliername: string, 
    contractlanguage: string, 
    contractentity: string, 
    organization: string, 
    Renewal_type: string, 
    Renewal_period: string, 
    Renegotiation_date: string, 
    Renegotiation_period: string, 
    Notification_date: string, 
    Notification_period: string, 
    End_date: string, 
    Actual_end_date: string, 
    Termination_date: string, 
    Termination_comment: string 
  ) {
  
    if (contractname) {
      await this.contract_name.click();
      await this.contract_name.fill(contractname);
    }
  
    if (contracttype) {
      await this.contract_type.click();
      await this.contract_type.fill(contracttype);
      await this.page.getByText(contracttype).click();
    }
  
    if (suppliername) {
      await this.supplier_name.click();
      await this.supplier_name.fill(suppliername);
      await this.page.waitForTimeout(2000);
      await this.supplier_name.press('Enter');
      //await this.page.getByText(suppliername).click();
      await this.page.getByText(suppliername).first().click();

    }
  
    if (contractlanguage) {
      await this.contract_language.click();
      await this.contract_language.fill(contractlanguage);
      await this.page.getByText(contractlanguage).click();
    }
  
    if (contractentity) {
      await this.contract_entity.click();
      await this.contract_entity.fill(contractentity);
      await this.page.getByText(contractentity).click();
    }
  
    if (organization) {
      await this.orga.click();
      await this.orga.fill(organization);
      await this.page.waitForTimeout(2000);
      await this.orga.press('Enter');
      await this.page.getByRole('option', { name: organization }).locator('span').click();
     // await this.page.getByText(organization).first().click();
    }
  
    if (Renewal_type) {
      await this.renewaltype.click();
      await this.renewaltype.fill(Renewal_type);
      await this.page.getByText(Renewal_type).click();
    }
  
    if (Renewal_period) {
      await this.renewalperiod.click();
      await this.renewalperiod.fill(Renewal_period);
    }
  
    if (Renegotiation_date) {
      await this.renegotiationdate.click();
      await this.renegotiationdate.fill(Renegotiation_date);
    }
  
    if (Renegotiation_period) {
      await this.renegotiationperiod.click();
      await this.renegotiationperiod.fill(Renegotiation_period);
    }
  
    if (Notification_date) {
      await this.notificationdate.click();
      await this.notificationdate.fill(Notification_date);
    }
  
    if (Notification_period) {
      await this.notificationperiod.click();
      await this.notificationperiod.fill(Notification_period);
    }
  
    if (End_date) {
      await this.enddate.click();
      await this.enddate.fill(End_date);
    }
  
    if (Actual_end_date) {
      await this.actualenddate.click();
      await this.actualenddate.fill(Actual_end_date);
    }
  
    if (Termination_date) {
      await this.terminationdate.click();
      await this.terminationdate.fill(Termination_date);
    }
  
    // Assuming this is always necessary, hence no conditional check here
    await this.page.locator('#body_x_tabc_containerTab').click();
  
    if (Termination_comment) {
      await this.terminationcomment.click();
      await this.terminationcomment.fill(Termination_comment);
    }
  
  }
  
    
  }

export default contract_manage;