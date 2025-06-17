import { expect, Locator, Page } from '@playwright/test';
import path from 'path';
import utils from './UTILS/utils';

/**
 * Class representing homepage operations.
 */
export class Homepage {
  private page: Page;
  private baseURL: string | undefined = process.env.baseURL;

  // Define locators as properties
  public datasavedmsg: Locator;
  public loginButton: Locator;
  public usernameField: Locator;
  public passwordField: Locator;
  public browseRequisitionsButton: Locator;
  public createInvoiceButton: Locator;
  public browseSupplierButton: Locator;
  public keywordsTextbox: Locator;
  public searchButton: Locator;
  public saveAndCloseButton: Locator;
  public headerTitle: Locator;
  public ivChatMinus: Locator;
  public pageButton: Locator;
  public savebutton: Locator;
  public dashboardBtn: Locator;
  public resetDefaultBtn: Locator;
  public excelBtn: Locator;
  public wordBtn: Locator;
  /**
   * Create an instance of Homepage.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;

    // Initialize locators after page is assigned
    this.datasavedmsg = this.page.locator('#datasavedmsg');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.usernameField = this.page.getByLabel('Login*');
    this.passwordField = this.page.getByLabel('Password*');
    this.browseRequisitionsButton = this.page.getByRole('button', { name: 'Browse Requisitions' });
    this.createInvoiceButton = this.page.getByRole('button', { name: 'Create Invoice' });
    this.browseSupplierButton = this.page.getByRole('button', { name: 'Browse Suppliers' });
    this.keywordsTextbox = this.page.getByLabel('Keywords');
    this.searchButton = this.page.getByRole('button', { name: 'Search' });
    this.saveAndCloseButton = this.page.getByRole('button', { name: 'Save & Close' });
    this.headerTitle = this.page.locator('#header_x_prxHeaderTitle_x');
    this.ivChatMinus = this.page.locator('.iv-chat-minus');
    this.pageButton = this.page.getByRole('button', { name: '[Page]' });
    this.savebutton = this.page.getByRole('button', { name: 'Save', exact: true });  
    this.dashboardBtn = this.page.getByRole('link', { name: 'Customize dashboard' });
    this.resetDefaultBtn = this.page.getByRole('button', { name: 'Reset to default settings' });
    this.excelBtn = this.page.getByRole('button', { name: 'btnExportExcel' });
    this.wordBtn = this.page.getByRole('button', { name: 'btnExportWord' });
  }
  /**
   * Log in to the application.
   * Clears cookies before login and handles invalid cookies.
   * @param {string} username - The username for login.
   * @param {string} password - The password for login.
   */
  async login(username: string, password: string) {
    try {
      // Clear cookies before login
      console.log('Clearing cookies...');
      await this.page.context().clearCookies();

      // Navigate to login page
      if (!this.baseURL) {
        throw new Error('Base URL is not defined. Please set the baseURL environment variable.');
      }
      await this.page.goto(`${this.baseURL}/usr/login?sso=0&`);
      await this.page.waitForLoadState('domcontentloaded');

      // Check for invalid cookies
      const cookies = await this.page.context().cookies();
      const invalidCookies = cookies.filter(cookie => cookie.name === 'auth_token' && !cookie.value);
      if (invalidCookies.length > 0) {
        console.warn('Invalid cookies detected. Clearing cookies...');
        await this.page.context().clearCookies();
      }

      // Fill in login credentials and submit

      await this.usernameField.click();
      await this.usernameField.fill(username);
      await this.passwordField.fill(password);
      await this.loginButton.click();
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForLoadState('load');

    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  /**
   * Sets the viewport size for the page based on the screen dimensions.
   * If the screen width is less than or equal to 1920 and the height is less than or equal to 966,
   * it sets the viewport size to 1920x966. Otherwise, it uses the actual screen dimensions.
   * 
   * @async
   * @function set_viewport
   * @returns {Promise<void>} A promise that resolves when the viewport size is set.
   */
  async set_viewport() {
    const { width, height } = await this.page.evaluate(() => {
      const width = window.screen.width;
      const height = window.screen.height;
      if (width <= 1920 && height <= 966) {
        console.log('Viewport size is less than 1920x966, setting STANDARD viewport size to 1920x966');
        console.log('setting-', width, height);
        return { width: 1920, height: 966 };
      } else {
        console.log('setting-', width, height);
        return { width, height };
      }
    });

    // Set viewport size for consistent rendering- 1920x966 is the default viewport size for the application locally
    await this.page.setViewportSize({ width: width, height: height });
  }

  /**
   * Creates a new configuration context in the application.
   * @param {string} ReQ_ID - The request ID to be filled in the 'Request #' textbox.
   * @param {string} Description - The description to be filled in the 'Description *' textbox.
   */
  async create_configuration_context(ReQ_ID: string, Description: string) {
    const frame = await this.page.locator('iframe[name="f20cb20fa-VIEW"]').contentFrame();
    await this.page.getByRole('button', { name: '[No configuration context' }).click();
    await frame?.getByRole('combobox', { name: 'Select an existing context or' }).click();
    await frame?.getByRole('option', { name: '< New context >' }).click();
    await frame?.getByRole('textbox', { name: 'Request # If you copy the row' }).click();
    await frame?.getByRole('textbox', { name: 'Request # If you copy the row' }).fill(ReQ_ID);
    await frame?.getByRole('textbox', { name: 'Description *' }).click();
    await frame?.getByRole('textbox', { name: 'Description *' }).fill(Description);
    await frame?.getByRole('button', { name: 'Start context' }).click();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page.locator('#footer_x_foot_x_btnDesignContext')).toContainText(Description);
  }

  /**
   * Close the page.
   */
  async close() {
    try {
      await this.page.close();
    } catch (error) {
      console.error('Error closing the page:', error);
    }
  }


  /**
   * Navig  * @param {string} url - The URL to navigate to.
  */
 async navigateTo(url: string) {
   try {
     await this.page.goto(`${this.baseURL}/${url}/`);
     this.page.waitForLoadState('domcontentloaded');
     this.page.waitForLoadState('networkidle');
     this.page.waitForLoadState('load');
     
     expect(this.page.url()).toContain(url);


   } catch (error) {
     console.log(`Error navigating to ${url}:`, error);
   }
  }

  /**
   * Take a screenshot of the current page.
   */
  async takeScreenshot() {
    await this.page.screenshot({ path: "./Buyer/screenshots/1.jpeg" });
  }


  /**
   * Save and close the current page.
   */
  async Saveandclose() {
    await this.saveAndCloseButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
  async SaveBtn()
  {
    await this.savebutton.click();
    await this.page.waitForLoadState('domcontentloaded');

  }
/**
 * Select the checkboxes in the Grid
 */
async select_grid_lines(iteration : number){
  for (let i = 1; i <= iteration; i++){
    await this.page.locator(`//table[@id='body_x_dcc_grid_grid']/tbody/tr[${i}]/td[1]`).click();
  }
  const inputValue = (await this.page.locator('#body_x_dcc_grid_selectingCounter').inputValue()).trim();
console.log(`Expected: ${iteration}, Found: ${inputValue}`);

if (inputValue !== iteration.toString()) {
  throw new Error(`Validation Failed: Expected ${iteration}, but found ${inputValue}`);
}

  }
  

  /**
   * Move IVA by dragging and dropping. *obsolete method* as new IVA is moved on top of the page.
   */
  async MoveIVA() {
    const source = this.ivChatMinus;
    const target = this.pageButton;
    if (await source.isVisible()) {
      await source.dragTo(target);
    }
  }


  async SearchKeywords(Keywords:string)
  {
    await this.keywordsTextbox.fill(Keywords);
    await this.searchButton.click();
  }

  async click_on_Customize_Dashboard_Button() {
    await this.dashboardBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.resetDefaultBtn).toBeVisible();
    await expect(this.resetDefaultBtn).toContainText('Reset to default settings');
  }

  async click_on_Reset_default_button() {
    await expect(this.resetDefaultBtn).toBeVisible();
    await expect(this.resetDefaultBtn).toContainText('Reset to default settings');
    this.page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept().catch(() => { });
    });
    await this.resetDefaultBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async adding_a_webpart() {
    await this.click_on_Customize_Dashboard_Button();
    await this.page.locator('//*[@id="body_x_webPartContainer_x_webpartGrid"]/div[185]').hover();
    await this.page.locator('div:nth-child(185) > .webpart_add_button').click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async extractAndReplaceAriaDescribedBy(selector: Locator): Promise<string | null> {
    try {
      const ariaDescribedByValue = await selector.getAttribute('aria-describedby');
      if (ariaDescribedByValue) {
        return ariaDescribedByValue.replace('editor', 'p');
      }
      return null;
    } catch (error) {
      console.error(`Error extracting aria-describedby: ${error}`);
      return null;
    }
  }

  async select_analysis_on_webpart(analysis: string, analysisTile: string) {
    await this.page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page.locator('#ui-id-1')).toContainText('Analysis');
    await this.page.waitForTimeout(1000);

    const selector = this.page.getByRole('dialog'); // More specific selector
    const modifiedAriaDescribedBy = await this.extractAndReplaceAriaDescribedBy(selector);
    await this.page.waitForTimeout(1000);
    await this.page.locator(`#body_x_webPartContainer_x_${modifiedAriaDescribedBy}_x_proxyFilterControlWebpart_x_AnalysisSelector_search`).fill(analysis);
    await this.page.locator(`#body_x_webPartContainer_x_${modifiedAriaDescribedBy}_x_proxyFilterControlWebpart_x_AnalysisSelector_search`).press(' ');
    await this.page.waitForTimeout(1000);

    await this.page.getByRole('option', { name: analysis }).click();
    await this.page.getByRole('dialog', { name: 'Analysis' }).locator('i').nth(2).click();
    await this.page.getByRole('option', { name: analysisTile }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000);
  }

  async exit_customize_dashboard() {
    await this.dashboardBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.resetDefaultBtn).toBeHidden();
  }

  async validate_analysis_added() {
    await expect(this.page.locator('.highcharts-background')).toBeVisible();
    await expect(this.excelBtn).toBeVisible();
    await expect(this.wordBtn).toBeVisible();
  }
}

export default Homepage;
