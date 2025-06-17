import { Page, expect,Locator } from '@playwright/test';
import homepage from '../homepage';

export class contract_browse {
  private page: Page;
  private homLocators: homepage;

  constructor(page: Page) {
    this.page = page;
    this.homLocators = new homepage(page);
  }

  // Define locators


  // Define function to search and edit a contract
  async searchAndEditContract(keyword: string): Promise<void> {
    // Step 1: Search for contract
    await this.homLocators.keywordsTextbox.click();
    await this.homLocators.keywordsTextbox.fill(keyword);
    await this.homLocators.searchButton.click();
    await this.page.locator('#body_x_grid_grd_tr_736_img___colManagegrid').click();
  }
  
}

export default contract_browse;