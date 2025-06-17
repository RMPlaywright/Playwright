import { expect, Locator, Page } from '@playwright/test';

export class std_quick
{
    private page: Page;

    public Sourcing_Project_Types_Options: Locator;
    public Visible1: Locator;
    public Visible2: Locator;
    public Visible3: Locator;
    public Visible4: Locator;
    public Visible5: Locator;
    public Visible6: Locator;
    public Visible7: Locator;
  
    
     /**
   * Create an instance of Homepage.
   * @param {Page} page - The Playwright page object.
   */
    constructor(page: Page) {
    
        this.page = page;
        this.Sourcing_Project_Types_Options = this.page.getByText('Sourcing Project Types /');
        this.Visible1 = this.page.locator('#body_x_tabc_prxOption_prxprxOption_x_grdOption_grd_option_auto_ends div').filter({ hasText: /^Visible$/ });
        this.Visible2 = this.page.locator('#body_x_tabc_prxOption_prxprxOption_x_grdOption_grd_option_buyer_can_bid div').filter({ hasText: /^Visible$/ });
        this.Visible3 = this.page.locator('#body_x_tabc_prxOption_prxprxOption_x_grdOption_grd_option_rfp_auto_open div').filter({ hasText: /^Visible$/ });
        this.Visible4 = this.page.locator('#body_x_tabc_prxOption_prxprxOption_x_grdOption_grd_option_buyer_can_change_due_date div').filter({ hasText: /^Visible$/ });
        this.Visible5 = this.page.locator('#body_x_tabc_prxOption_prxprxOption_x_grdOption_grd_option_buyer_can_fill_questionnaire div').filter({ hasText: /^Visible$/ });
        this.Visible6 = this.page.locator('#body_x_tabc_prxOption_prxprxOption_x_grdOption_grd_option_buyer_see_all_bids div').filter({ hasText: /^Visible$/ });
        this.Visible7 = this.page.locator('#body_x_tabc_prxOption_prxprxOption_x_grdOption_grd_option_supplier_must_acknowledge div').filter({ hasText: /^Visible$/ });
       

        }


        async uncheckBoxandValidate(chkbox: Locator)
        {
          await chkbox.uncheck();
          await expect(chkbox).not.toBeChecked();
         
        }

        async validateVisible(locator: Locator)
        {
          expect(locator).toBeVisible();
        }
    //*[@id="body_x_tabc_prxOption_prxprxOption_x_grdOption_grd_option_auto_ends_chkActive_checkbox"]
   
}

export default std_quick;