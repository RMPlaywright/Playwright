import { test, expect } from '@playwright/test';

import INV from '../../Pages/INV/invoice_manage';
import Homepage from '../../Pages/homepage';
import utils from '../../Pages/UTILS/utils';
import Expense_Browse from '../../Pages/EXP/expense_browse';
import Expense_Manage from '../../Pages/EXP/expense_manage';
import { log } from 'console';


// let login_page = 'https://envqa.ivalua.app/buyer/demo/functtestauto46/snhfx/page.aspx/en/usr/login';
// let create_invoice_page = 'https://envqa.ivalua.app/buyer/demo/functtestauto46/snhfx/page.aspx/en/ord/invoice_manage?invoiceType=INV'; 

let buyer_username = 'EPROC02_Buyer'//'testim_buyer_allperim';
let admin_username = 'testim_admin';
let password = 'T4stim2019!$';

let expenseLabel1 = "EXP01_C01_From_Browse_";
let expenseLabel2 = "EXP01_C01_From_Menu_";
let expenseDate = "4/1/2025";
let expOrga = "QA_EPROC02_Organisation (Cosmetic)";
let Currency = "EUR";

test('EXP01_C01', async ({ page }) => 
    {
        const inv = new INV(page);
        const app = new Homepage(page);
        const util = new utils(page);
        const expenseBrowse = new Expense_Browse(page);
        const expenseManage = new Expense_Manage(page);

        let rV = util.generateRandom(5);
        
        await app.login(buyer_username, password);

        app.navigateTo("exp/expense_browse");
        
        await expenseBrowse.createAnExpenseReportBtn.click();
        await expenseManage.create_expenseReport({
            Expense_Label : expenseLabel1+rV,
            Expense_Date : expenseDate,
            Expense_Organization : expOrga,
            Expense_Currency : Currency,
        })
        let firstExpenseReport = page.url();

        app.navigateTo("exp/expense_manage");
        await expenseManage.create_expenseReport({
            Expense_Label : expenseLabel2+rV,
            Expense_Date : expenseDate,
            Expense_Organization : expOrga,
            Expense_Currency : Currency,
        })
        // let SecondExpenseReport = page.url();

        app.navigateTo("exp/expense_browse");
        await util.searchKeyword(expenseLabel1+rV);
        await expect(page.getByRole('cell', { name: expenseLabel1+rV })).toHaveText(expenseLabel1+rV);
        await page.getByRole('button', { name: 'Reset' }).click();
        await util.searchKeyword(expenseLabel2+rV);
        await expect(page.getByRole('cell', { name: expenseLabel2+rV })).toHaveText(expenseLabel2+rV);
        
        await page.goto(firstExpenseReport);

        //01 - Car Rental
        await expenseManage.addALine({
            Expense_Category: "Car Rental",
            lineDate : "4/2/2025",
            expense_Amount : "40",
            expense_Currency : "EUR",
            allocExpense_Account: "602220 - Components - Clarity Cosmetic",
            allocCost_Center: "1013 - IT",
        })

        //02 - Dinner
        await expenseManage.addALine({
            Expense_Category: "Dinner",
            lineDate : "4/2/2025",
            expense_Amount : "40",
            expense_Currency : "EUR",
            allocExpense_Account: "602220 - Components - Clarity Cosmetic",
            allocCost_Center: "1013 - IT",
        })

        //03 - Flight
        await expenseManage.addALine({
            Expense_Category: "Flight",
            lineDate : "4/2/2025",
            expense_Amount : "40",
            expense_Currency : "EUR",
            allocExpense_Account: "602220 - Components - Clarity Cosmetic",
            allocCost_Center: "1013 - IT",
        })

        //04 - Fuel
        await expenseManage.addALine({
            Expense_Category: "Fuel",
            lineDate : "4/2/2025",
            expense_Amount : "40",
            expense_Currency : "EUR",
            allocExpense_Account: "602220 - Components - Clarity Cosmetic",
            allocCost_Center: "1013 - IT",
        })

        //05 - Hotel
        await expenseManage.addALine({
            Expense_Category: "Hotel",
            lineDate : "4/2/2025",
            expense_Amount : "40",
            expense_Currency : "EUR",
            allocExpense_Account: "602220 - Components - Clarity Cosmetic",
            allocCost_Center: "1013 - IT",
        })

        //06 - Kilometer charge - NOT SURE
        // await expenseManage.addALine({
        //     Expense_Category: "Kilometer charge",
        //     lineDate : "4/2/2025",
        //     expense_Kilometers : "40"
        // })

        //07 - Lunch
        await expenseManage.addALine({
            Expense_Category: "Lunch",
            lineDate : "4/2/2025",
            expense_Amount : "40",
            expense_Currency : "EUR",
            allocExpense_Account: "602220 - Components - Clarity Cosmetic",
            allocCost_Center: "1013 - IT",
        })

        //08 - Miscellaneous 
        await expenseManage.addALine({
            Expense_Category: "Miscellaneous",
            lineDate : "4/2/2025",
            expense_Amount : "40",
            expense_Currency : "EUR",
            expense_Misc_Notes : "EXP01_C01_"+rV,
            allocExpense_Account: "602220 - Components - Clarity Cosmetic",
            allocCost_Center: "1013 - IT",
        })
        
        //09 - Parking
        await expenseManage.addALine({
            Expense_Category: "Parking",
            lineDate : "4/2/2025",
            expense_Amount : "40",
            expense_Currency : "EUR",
            allocExpense_Account: "602220 - Components - Clarity Cosmetic",
            allocCost_Center: "1013 - IT",
        })

        //10 - Phone  - NOT SURE
        // await expenseManage.addALine({
        //     Expense_Category: "Phone",
        //     phone_period : "4/2/2025",
        //     expense_Amount : "40",
        //     expense_Currency : "EUR",
        // })

        //11 - Public Transportation - NOT SURE
        // await expenseManage.addALine({
        //     Expense_Category: "Public Transportation",
        //     lineDate : "4/2/2025",
        //     expense_Amount : "40",
        //     expense_Currency : "EUR",
        // })

        //12 - Taxi - NOT SURE
        // await expenseManage.addALine({
        //     Expense_Category: "Taxi",
        //     lineDate : "4/2/2025",
        //     expense_Amount : "40",
        //     expense_Currency : "EUR",
        // })

        //13 - Toll - NOT SURE
        // await expenseManage.addALine({
        //     Expense_Category: "Toll",
        //     lineDate : "4/2/2025",
        //     expense_Amount : "40",
        //     expense_Currency : "EUR",
        // })

        //14 - Train - NOT SURE
        // await expenseManage.addALine({
        //     Expense_Category: "Train",
        //     lineDate : "4/2/2025",
        //     expense_Amount : "40",
        //     expense_Currency : "EUR",
        // })

        await expenseManage.submitToApprovalBtn.click();
        expect(page.locator('//*[@id="body_x_tpc_tabExp_proxyExt_x_lblStatus"]')).toHaveText("In progress");

        await util.clearSessionData();
        await app.login(admin_username, password);

        await page.goto(firstExpenseReport);

        //Click on Approve Button
        await expenseManage.submitToApprovalBtn.click();
        // Validate Status of Expense Report (In Progress)
        await expect(page.locator('//*[@id="body_x_tpc_tabExp_proxyExt_x_lblStatus"]')).toHaveText("In progress");

        
        //Click on Approve Button
        await expenseManage.submitToApprovalBtn.click();
        // Validate Status of Expense Report (In Progress)
        await expect(page.locator('//*[@id="body_x_tpc_tabExp_proxyExt_x_lblStatus"]')).toHaveText("In progress");
        console.log(firstExpenseReport);
        
        //Click on Approve Button
        await expenseManage.submitToApprovalBtn.click();
        // Validate Status of Expense Report (In Progress)
        await expect(page.locator('//*[@id="body_x_tpc_tabExp_proxyExt_x_lblStatus"]')).toHaveText("In progress");

        //Click on Approve Button
        await expenseManage.submitToApprovalBtn.click();
        // Validate Status of Expense Report (In Progress)
        await expect(page.locator('//*[@id="body_x_tpc_tabExp_proxyExt_x_lblStatus"]')).toHaveText("Taken into account");

        //Click on Approve Button
        await expenseManage.submitToApprovalBtn.click();
        // Validate Status of Expense Report (In Progress)
        await expect(page.locator('//*[@id="body_x_tpc_tabExp_proxyExt_x_lblStatus"]')).toHaveText("Settled");
        await page.pause();

    }
);
