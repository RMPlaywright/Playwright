import { Page, expect, Locator } from '@playwright/test';
import homepage from '../homepage';

/**
 * Class representing operations related to param_browse Page.
 */
export class param_browse {
  private page: Page;
  private baseURL: string | undefined;
  private homepage: homepage;
  
  // Define locators as properties
  public keywordsTextbox: Locator;
  public searchButton: Locator;
  public valueTextbox: Locator;
  public recordsLabel: Locator;
  public paramGrid: Locator;
  public saveButton: Locator;
 public value_mustbeIntegererror: Locator;
  /**
   * Create an instance of param_browse.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;
    this.baseURL = process.env.baseURL;
    this.homepage = new homepage(this.page);



    // Initialize locators
    this.keywordsTextbox = this.page.getByRole('textbox', { name: 'Keywords' });
    this.searchButton = this.page.getByRole('button', { name: 'Search' });
    this.valueTextbox = this.page.getByRole('textbox', { name: 'Value' });
    this.recordsLabel = this.page.getByLabel('Record(s)').locator('span');
    this.paramGrid = this.page.locator('#body_x_dccparamGrid_paramGrid');
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
    this.value_mustbeIntegererror=this.page.getByRole('button', { name: 'Value must be an integer' })


 
  }

  /**
   * Navigate to the Browse Requisitions page.
   */
  async navigateToGlobalparameters() {
    try {
      await this.page.goto(`${this.baseURL}/bas/param_browse/0/`);
    } catch (error) {
      console.error('Error navigating to Browse Requisitions:', error);
    }
  }

  /**
   * Search for the parameter.
   * @param {string} parameter - The parameter to search for.
   */
  async search_paramerter(parameter: string) {
    await this.keywordsTextbox.click();
    await this.keywordsTextbox.fill(parameter);
    await this.searchButton.click();
    await this.page.waitForLoadState('load');
    await expect(this.valueTextbox).toBeVisible();
    await expect(this.recordsLabel).toContainText('1 Record(s)');
    await expect(this.paramGrid).toContainText(parameter);
    await expect(this.valueTextbox).toBeVisible();
  }

  /**
   * Update the value of the parameter.
   * @param {string} value - The value to set.
   */
  async updateParameterValue(value: string) {
    await this.valueTextbox.click();
    await this.valueTextbox.fill(value);
    await this.saveButton.click();
    await this.page.waitForLoadState('load');
   
    expect(this.homepage.datasavedmsg.isVisible());
  }

  async checkErrorMessage_valuemustbeInteger() {
    try {
      await expect(this.value_mustbeIntegererror).toBeVisible();
      await expect(this.page.getByText('Close messagesValue must be')).toBeVisible();
    } catch (error) {
      console.error('Error checking error message for value must be integer:', error);
    }
  }
  



































































































}

export default param_browse;