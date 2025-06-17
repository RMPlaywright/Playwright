import { Page, expect, Locator } from '@playwright/test';
import { Workbook } from 'exceljs';
import { log } from 'node:console';

/**
 * Class representing invoice operations.
 */
export class invoice_manage {
  private page: Page;
  private baseURL: string | undefined;
  public save_Button_Locator : Locator;
  public approval_Status_Locator : Locator;
  public approval_Status_Summary_Locator : Locator;
  public submitToApprovalBtn : Locator;
  public payee_Locator : Locator;
  public paymentType_Locator : Locator;
  public otherAction_Button_Locator : Locator;
  public otherAction_Unlock_Button_Locator : Locator;

  /**
   * Create an instance of INV.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;
    this.baseURL = process.env.baseURL;
    this.save_Button_Locator = this.page.locator('//*[@id="proxyActionBar_x__cmdSave"]');
    this.submitToApprovalBtn = this.page.locator('button[@id="proxyActionBar_x_cmdVal"]');
    this.approval_Status_Locator = this.page.locator('//*[@id="body_x_tabc_containerTab_partprxprxWfl"]');
    this.approval_Status_Summary_Locator = this.page.locator('//*[@id="body_x_tabc_prxWfl_prxprxWfl_x_tabc_containerTab_parttabSummary"]');
    this.payee_Locator = this.page.getByRole('combobox', { name: 'Payee' });
    this.paymentType_Locator = this.page.getByRole('combobox', { name: 'Payment Type *' });
    this.otherAction_Button_Locator = this.page.getByRole('button', { name: 'Other Actions' });
    this.otherAction_Unlock_Button_Locator = this.page.getByRole('button', { name: 'Unlock' });

  }

  
  //Navigate to Create Invoice Page
  async navigateToCreateInvoice() {
    try {
      await this.page.goto(`${this.baseURL}/ord/invoice_manage?invoiceType=INV`);
      await this.page.waitForLoadState('domcontentloaded');
      await expect(this.page.getByRole('heading', { name: 'Browse Requisitions' }));
    } catch (error) {
      console.error('Error navigating to Create Invoice:');
    }
  }

  /**
   * Create an invoice.
   * @param {string} Invoice_Number - The invoice number.
   * @param {string} Due_Date - The due date in M/d/yyyy format.
   * @param {string} Invoice_Date - The invoice date in M/d/yyyy format.
   * @param {string} Supplier_Name - The supplier name.
   * @param {string} Organization_Name - The organization name.
   */
  async create_invoice({
    Invoice_Number,
    Due_Date,
    Invoice_Date,
    Supplier_Name,
    invoicing_Supplier,
    Organization_Name
  }: {
    Invoice_Number: string;
    Due_Date: string;
    Invoice_Date: string;
    Supplier_Name: string;
    invoicing_Supplier?: string;  // Optional
    Organization_Name: string;
  }): Promise<void> {
    try {
      await this.page.getByRole('textbox', { name: 'Supplier Invoice Number *' }).fill(Invoice_Number);
      
      let Supp = this.page.getByRole('combobox', { name: 'Supplier Please select a' });
      await Supp.fill(Supplier_Name);
      await this.page.getByRole('option', { name: new RegExp(Supplier_Name, 'i') }).click()
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForLoadState('load');
      await this.page.waitForTimeout(1500);

      if(invoicing_Supplier)
        {
          await this.page.waitForLoadState('domcontentloaded');
          let invSupp = this.page.getByRole('combobox', { name: 'Invoicing Supplier *' });
          await invSupp.click();
          await invSupp.waitFor({ state: 'visible', timeout: 15000 });
          await invSupp.fill(invoicing_Supplier);
          await this.page.keyboard.press('Enter');
                await this.page.waitForTimeout(1500);
          await this.page.getByRole('option', { name: new RegExp(invoicing_Supplier, 'i') }).click();
        }else{
          console.log("Invoicing Supplier not passed");
        }
        await this.page.waitForTimeout(1500);
        await this.page.waitForLoadState('domcontentloaded');
       
        await this.page.getByRole('textbox', { name: 'Due Date (M/d/yyyy)' }).fill(Due_Date);
        await this.page.getByRole('textbox', { name: 'Invoice Date (M/d/yyyy) *' }).fill(Invoice_Date);
        
      let   organizationCombobox = await this.page.getByRole('combobox', { name: 'Organization No Tax ID *' });
      await organizationCombobox.waitFor({ state: 'visible', timeout: 15000 });
      await organizationCombobox.click();
      await organizationCombobox.fill(Organization_Name);
      await this.page.keyboard.press('Enter');

      let   organizationOption = await this.page.getByRole('option', { name: Organization_Name });
      await organizationOption.waitFor({ state: 'visible', timeout: 15000 });
      
      await organizationOption.click();
      await this.page.waitForTimeout(1500);
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.getByRole('button', { name: 'Save' }).click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForLoadState('domcontentloaded');
    
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  }

  

  /**
   * Adds a non-PO line item to the invoice.
   *
   * @param {string} item_Type - The type of the item.
   * @param {string} item_Label - The label of the item.
   * @param {string} item_Quantity - The quantity of the item.
   * @param {string} item_Up - The unit price excluding tax.
   * @param {string} tax_Rate - The tax rate for the item.
   * @returns {Promise<void>} - A promise that resolves when the non-PO line item is added.
   * @throws {Error} - Throws an error if there is an issue adding the non-PO line item.
   */
  async addNonPoLine(item_Type: string, item_Label: string, item_Quantity: string, item_Up: string, tax_Rate: string): Promise<void> {
    try {
      const addLinesButton = this.page.getByRole('button', { name: 'Add Lines' });
      await addLinesButton.waitFor({ state: 'visible', timeout: 15000 });
      await addLinesButton.click();

      const addNonPoLineButton = this.page.getByRole('button', { name: 'Add Non-PO Line' });
      await addNonPoLineButton.waitFor({ state: 'visible', timeout: 15000 });
      await addNonPoLineButton.click();

      const combobox = this.page.getByRole('combobox', { name: 'Type', exact: true });
      await combobox.waitFor({ state: 'visible', timeout: 15000 });
      const nextDiv = combobox.locator("xpath=following-sibling::div[1]");

      await combobox.click();
      await combobox.fill(item_Type);
      const typeOption = this.page.getByRole('option', { name: item_Type, exact: true });
      await typeOption.waitFor({ state: 'visible', timeout: 15000 });
      await typeOption.click();
      await expect(nextDiv).toHaveText(item_Type);

      const quantityTextbox = this.page.getByRole('textbox', { name: 'Quantity' });
      await quantityTextbox.waitFor({ state: 'visible', timeout: 15000 });
      await quantityTextbox.fill(item_Quantity);

      const upTextbox = this.page.getByRole('textbox', { name: 'UP Excl. Tax' });
      await upTextbox.waitFor({ state: 'visible', timeout: 15000 });
      await upTextbox.fill(item_Up);

      const itemLabelTextbox = this.page.getByRole('textbox', { name: 'Item Label' });
      await itemLabelTextbox.waitFor({ state: 'visible', timeout: 15000 });
      await itemLabelTextbox.fill(item_Label);
      await expect(itemLabelTextbox).toHaveValue(item_Label);

      const taxRatesCell = this.page.getByRole('cell', { name: 'Tax Rates' }).locator('div').nth(3);
      await taxRatesCell.waitFor({ state: 'visible', timeout: 15000 });
      await taxRatesCell.click();

      const taxRatesCombobox = this.page.getByRole('combobox', { name: 'Tax Rates' });
      await taxRatesCombobox.waitFor({ state: 'visible', timeout: 15000 });
      await taxRatesCombobox.fill(tax_Rate);
      const taxRateOption = this.page.getByRole('option', { name: tax_Rate, exact: true });
      await taxRateOption.waitFor({ state: 'visible', timeout: 15000 });
      await taxRateOption.click();

      await this.page.waitForTimeout(1500);

      const saveButton = this.page.getByRole('button', { name: 'Save' });
      await saveButton.waitFor({ state: 'visible', timeout: 15000 });
      await saveButton.click();

      await this.page.waitForTimeout(1500);
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForLoadState('domcontentloaded');

      const recordText = this.page
        .locator('#body_x_tabc_prxInvoice_INV_prxprxInvoice_INV_x_prxProductService_x_prxItem_x_grdInvoiceItem_phcgrdInvoiceItem_content')
        .getByText('Record(s)');
      await recordText.waitFor({ state: 'visible', timeout: 15000 });
    } catch (error) {
      console.error('Error filling invoice details:', error);
    }
  }

  async add_Allocation({
    allocCost_Center,
    allocExpense_Account,
  }: {
    allocCost_Center? : string,
    allocExpense_Account? : string;
  }): Promise <void>{
    let allocation_placeholder = this.page.getByRole('button', { name: ' Show / Hide : Allocations' })
    await allocation_placeholder.scrollIntoViewIfNeeded();
    let allocation_placeholder_className =await allocation_placeholder.getAttribute('class'); 
    if(allocation_placeholder && allocation_placeholder_className && allocation_placeholder_className.includes("right"))
        await allocation_placeholder.click();

    if (allocExpense_Account) {
      let allocExpense_Account_locator = this.page.getByRole('combobox', { name: 'Ledger Account' });
      await allocExpense_Account_locator.click();
      await allocExpense_Account_locator.fill(allocExpense_Account);
      await this.page.keyboard.press("Enter");
      await this.page.waitForLoadState('domcontentloaded');
  }

  if (allocCost_Center) {
      let allocCost_Center_locator = this.page.getByRole('combobox', { name: 'Cost center' });
      await allocCost_Center_locator.click();
      await allocCost_Center_locator.fill(allocCost_Center);
      await this.page.keyboard.press("Enter");
      await this.page.waitForLoadState('domcontentloaded');
  }

  }
}

export default invoice_manage;