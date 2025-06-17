import { Page, expect, Locator } from '@playwright/test';
import utils from '../UTILS/utils';
import { Workbook } from 'exceljs';
import { log } from 'node:console';

/**
 * Class representing invoice operations.
 */
export class Expense_Manage {
  private page: Page;
  private baseURL: string | undefined;

    //Initialize Locator After page is defined
  public submitToApprovalBtn : Locator;

  /**
   * Create an instance of INV.
   * @param {Page} page - The Playwright page object.
   */
    
  constructor(page: Page) {
    this.page = page;
    this.baseURL = process.env.baseURL;
    this.submitToApprovalBtn = this.page.locator('button[id*="proxyActionBar_x_valstd_exp_rep"]');
    // const submitToApprovalBtn = page.locator('button[type="submit"].positive', {hasText: /approval/i});
  };
  
  /**
   * Create Expence Report.
   * @param {string} Expense_Label - The invoice number.
   * @param {string} Expense_Date - The due date in M/d/yyyy format.
   * @param {string} Expense_Organization - The invoice date in M/d/yyyy format.
   * @param {string} Currency - The supplier name.
   * @param {string} Requestor - The organization name.
   */

  async create_expenseReport({
    Expense_Label,
    Expense_Date,
    Expense_Organization,
    Expense_Currency,
    Requestor
  }: {
    Expense_Label: string;
    Expense_Date: string;
    Expense_Organization: string;
    Expense_Currency?: string;
    Requestor?: string; //Optional
  }): Promise<void> 
  {
    try {

        let expLabelLocator = this.page.locator('//*[@id="body_x_tpc_tabExp_proxyExt_x_txtExpLabel"]');
        expLabelLocator.click();
        expLabelLocator.fill(Expense_Label);
        this.page.pause();

        let expOrgaLocator = this.page.getByRole('combobox', { name: 'Organization *' }); 
        await expOrgaLocator.locator('xpath=./following-sibling::*[3]').click();
        await expOrgaLocator.click();
        await expOrgaLocator.fill(Expense_Organization);
        // await this.page.waitForTimeout(1500);
        await this.page.keyboard.press("Enter");
        await this.page.getByRole('option', { name: Expense_Organization }).click();
        
        if (Requestor) {
            let expRequestorLocator = this.page.getByRole('combobox', { name: 'Requestor *' });
            await expRequestorLocator.click();
            await expRequestorLocator.fill(Requestor);
            await this.page.getByRole('option', { name: Requestor }).click();    
        } 

        if(Expense_Currency){
            let expCurrLocator = this.page.getByRole('combobox', { name: 'Currency *' });
            await expCurrLocator.locator('xpath=./following-sibling::*[3]').click();
            await expCurrLocator.click();
            await expCurrLocator.fill(Expense_Currency);
            await this.page.waitForTimeout(1500);
            await this.page.keyboard.press("Enter");
            //await this.page.getByRole('option', { name: Expense_Currency}).click();
        }

        let expDate =  this.page.getByRole('textbox', { name: 'Date (M/d/yyyy) *' }); 
        await expDate.click()
        await expDate.fill(Expense_Date);

        await this.page.locator('//*[@id="proxyActionBar_x__cmdSave"]').click();
        await this.page.waitForLoadState('domcontentloaded');

    } catch (error) {
      console.error('Error creating Expense Report:', error);
    }
    
  } 

  async addALine({
    Expense_Category,
    lineDate,
    expense_Amount,
    expense_Currency,
    expense_Kilometers,
    expense_Misc_Notes,
    phone_period,
    allocExpense_Account,
    allocCost_Center,
}: {
    Expense_Category: string;
    lineDate? : string;
    expense_Amount? : string;
    expense_Currency? : string;
    expense_Kilometers? : string;
    expense_Misc_Notes? : string;
    phone_period? :string;
    allocExpense_Account? : string;
    allocCost_Center? :string;
}) : Promise<void> 
  {
    try {
        const util = new utils(this.page);
        await this.page.getByRole('button', { name: 'Add a Line' }).click();
        let modalLocator = await util.getModalId();
        
        if (modalLocator) 
            {
            
                let expenseCat_Locator = modalLocator.getByRole('combobox', { name: 'Expense Category *' });
                await expenseCat_Locator.click();
                await expenseCat_Locator.fill(Expense_Category);
                // await this.page.keyboard.press('Enter');
                await modalLocator.getByRole('option', { name: Expense_Category }).click();

                if (lineDate) {
                    await modalLocator.getByRole('textbox', { name: 'Date (M/d/yyyy) *' }).fill(lineDate);
                }

                if (expense_Amount) {
                    await modalLocator.getByRole('textbox', { name: 'Amount tax. incl. *' }).fill(expense_Amount);
                }
                
                if (expense_Currency) {
                    let lineCurrency_Locator = modalLocator.getByRole('combobox', { name: 'Currency *' });
                    await lineCurrency_Locator.locator('xpath=./following-sibling::*[3]').click();
                    await lineCurrency_Locator.fill(expense_Currency);
                    await this.page.waitForTimeout(1500);
                    // await this.page.keyboard.press('Enter');
                    await modalLocator.getByRole('option', { name: expense_Currency });
                }

                if (expense_Kilometers) {
                    await modalLocator.locator('//*[@id="body_x_txtQuantity"]').fill(expense_Kilometers); 
                }

                if (expense_Misc_Notes) {
                    await modalLocator.locator('//*[@id="body_x_txtItemDesc"]').fill(expense_Misc_Notes);
                }

                if (phone_period) {
                    let phone_period_locator =  modalLocator.getByRole('combobox', { name: 'Period *' });
                    await phone_period_locator.locator('xpath=./following-sibling::*[3]').click();
                    await phone_period_locator.click();
                    await phone_period_locator.fill(phone_period);
                    await this.page.keyboard.press("Enter");
                }

                await modalLocator.locator('//*[@id="proxyActionBar_x__cmdSave"]').click();
                
                let allocation_placeholder = modalLocator.getByRole('button', { name: ' Show / Hide : Allocations' })
                let allocation_placeholder_className =await allocation_placeholder.getAttribute('class'); 
                if(allocation_placeholder && allocation_placeholder_className && allocation_placeholder_className.includes("right"))
                    allocation_placeholder.click();

                if (allocExpense_Account) {
                    let allocExpense_Account_locator = modalLocator.getByRole('combobox', { name: 'Ledger Account' });
                    await allocExpense_Account_locator.click();
                    await allocExpense_Account_locator.fill(allocExpense_Account);
                    await this.page.keyboard.press("Enter");
                    this.page.waitForLoadState('domcontentloaded');
                }

                if (allocCost_Center) {
                    let allocCost_Center_locator = modalLocator.getByRole('combobox', { name: 'Cost center' });
                    await allocCost_Center_locator.click();
                    await allocCost_Center_locator.fill(allocCost_Center);
                    await this.page.keyboard.press("Enter");
                    this.page.waitForLoadState('domcontentloaded');
                }

                await modalLocator.locator('//*[@id="proxyActionBar_x__cmdAction"]').click();
                await modalLocator.locator('//*[@id="proxyActionBar_x__cmdAction"]/li[1]/button').click();

        } else {
            console.log("Modal not Found");
            
        }
    }catch(error){

    }}
  
}

export default Expense_Manage;