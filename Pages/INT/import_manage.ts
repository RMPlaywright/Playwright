import { Locator, Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import {utils} from '../../Pages/UTILS/utils';
import { url } from 'inspector';
import { Url } from 'url';
dotenv.config();

export class import_manage
{
    private page: Page;
    public keywordsTextbox: Locator;
    public searchButton: Locator;
    public editetlbtn: Locator;
    public addbtn: Locator;
    public availablegrid: Locator;
    public importbtn:Locator;
    public importandfilechkiconbtn:Locator;
    public cleanandenrichtabiconbtn: Locator;
    public submitallvalidlinesbtn:Locator;
    public cancelbtb: Locator;
    

    constructor(page:Page)
    {
        this.page=page;
        this.keywordsTextbox = this.page.getByLabel('Keywords');
        this.searchButton = this.page.getByRole('button', { name: 'Search', exact: true });
        this.editetlbtn = this.page.getByRole('link', { name: /Edit / });
        this.addbtn=this.page.getByRole('button', { name: 'Add' });
        this.availablegrid=this.page.locator('//table[@id="body_x_tab_tpcchk_prxprxStepchk_x_available_files_grd"]//tr//a');
        this.importbtn=this.page.getByRole('button', { name: 'Import', exact: true });
        this.importandfilechkiconbtn=this.page.getByRole('tab', { name: 'Import & File check' }).locator('i');
        this.cleanandenrichtabiconbtn= this.page.getByRole('tab', { name: 'Clean & Enrich' }).locator('i');
        this.submitallvalidlinesbtn=this.page.locator('//*[@id="proxyActionBar_x_btnValidAll"]/i');
        this.cancelbtb=this.page.getByRole('button', { name: 'Cancel Import' });
       
        
    }

    async SearchEtl(etlname:string)
    {
      await this.keywordsTextbox.fill(etlname);
      await this.searchButton.click();
    }

    async validateClassNameContainsGreen(selector:Locator) {
      try {
        
    
        // Get the class attribute of the element
        const className = await selector.getAttribute('class');
        
        // Check if the className matches the regular expression /green/
        if (className && /green/.test(className)) {
          console.log(`Class name contains 'green': ${className}`);
          return true;
        } else {
          console.error(`Class name does not contain 'green'. Found: ${className}`);
          return false;
        }
      } catch (error) {
        console.error("Error validating class name:", error);
        return false;
      }
    }

    
    

}

export default import_manage;