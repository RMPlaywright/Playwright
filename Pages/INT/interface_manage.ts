import { Locator, Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

export class interface_manage
{
    private page:Page;
    public deletetemplatebtnyes: Locator;
    public templatebtn:Locator;
    public TestTabbtn:Locator;
    public StartBtn:Locator;
    public deletetemplatebtnno

    constructor(page:Page)
    {
        this.page=page;
        this.deletetemplatebtnyes=page.locator('div').filter({ hasText: /^TemplateYesYesNoDelete the value\.$/ }).getByRole('button');
        this.deletetemplatebtnno=page.locator('div').filter({ hasText: /^TemplateNoYesNoDelete the value\.$/ }).getByRole('button');
        this.templatebtn=page.getByRole('combobox', { name: 'Template' });
        this.TestTabbtn=page.getByLabel('Left panel').getByText('Test');
        this.StartBtn=page.locator('//*[@id="body_x_tcInterfaceManage_prxIntTest_prxprxIntTest_x_prxIntExec_x_btnStartInterface"]/i');

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
      async validateClassNameContainsOrange(selector:Locator) {
        try {
          
      
          // Get the class attribute of the element
          const className = await selector.getAttribute('class');
          
          // Check if the className matches the regular expression /orange/
          if (className && /orange/.test(className)) {
            console.log(`Class name contains 'oreange': ${className}`);
            return true;
          } else {
            console.error(`Class name does not contain 'orange'. Found: ${className}`);
            return false;
          }
        } catch (error) {
          console.error("Error validating class name:", error);
          return false;
        }
      }
      async validateClassNameContainsRed(selector:Locator) {
        try {
          
      
          // Get the class attribute of the element
          const className = await selector.getAttribute('class');
          
          // Check if the className matches the regular expression /red/
          if (className && /red/.test(className)) {
            console.log(`Class name contains 'red': ${className}`);
            return true;
          } else {
            console.error(`Class name does not contain 'red'. Found: ${className}`);
            return false;
          }
        } catch (error) {
          console.error("Error validating class name:", error);
          return false;
        }
      }
}