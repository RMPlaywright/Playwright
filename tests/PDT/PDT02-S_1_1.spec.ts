import { test } from '@playwright/test';
import { Homepage } from '../../Pages/homepage';
import { Create_Product } from '../../Pages/PDT/product_manage_Create';
import { Catalog_Browse } from '../../Pages/PDT/item_browse';
import { Basket_Light_Manage } from '../../Pages/PDT/basket_light_manage';
import { Item_Manage } from '../../Pages/PDT/item_manage';
import { Order_Manage } from '../../Pages/ORD/order_manage';
import { utils } from '../../Pages/UTILS/utils';
import { Delivery_Manage } from '../../Pages/ORD/delivery_manage';
import { Delivery_Item_Manage } from '../../Pages/ORD/delivery_item_manage';
import { Review_Manage } from '../../Pages/QST/review_manage';
import { Invoice_Manage } from '../../Pages/ORD/invoice_manage';

//Keep Label as draft when test is not ready to run
test.describe('draft', () => {
  test('Execute the procure to  receipt workflow when having  items containing a sold-by', async ({ page }) => {
    test.info().annotations.push({ type: 'tag', description: 'PDT' }); // labels to specify the test case

    // Setup & Test Data
    const app = new Homepage(page);
    const pdt = new Create_Product(page);
    const catalog = new Catalog_Browse(page);
    const basket = new Basket_Light_Manage(page);
    const item = new Item_Manage(page);
    const order = new Order_Manage(page);
    const util = new utils(page);
    const delivery = new Delivery_Manage(page);
    const delivery_item = new Delivery_Item_Manage(page);
    const review = new Review_Manage(page);
    const inv = new Invoice_Manage(page);

    const username = 'testim_admin';
    const password = 'T4stim2019!$';

    // Login
    await app.login(username, password);

    // Create an item
    await app.navigateTo('pdt/product_manage?Create');
    const itemname = `Item_testim_soldBy_${util.generateRandom(4)}`;
    await pdt.create(itemname, '1-1-1-1', 'Testim_sup_Site', '100', 'EUR');

    // Add "sold by" value
    await pdt.edit_item_Line();
    await item.add_Sold_by_Value('10');

    // Check "sold by" value
    await app.navigateTo('en/pdt/item_browse');
    await util.Search_On_Main_Page(itemname);

    // create PO from basket light
    await catalog.check_Sold_by_value();
    await catalog.click_on_add_to_cart_and_checkout();
    await basket.fill_Req_details('Testim_Orga_Site_1_en');
    await basket.click_on_Submit_Requisition();
    await order.validate_Order_Status();
    await order.validate_order_line('10.00', '100.00', '1,000.00', 'EUR');

    // create a receipt
    await order.click_on_create_receipt_button();
    await util.click_on_Save_Button();
    await delivery.validate_delivery_line('10.00', '100.00', '1,000.00', 'EUR');

    // check items in a receipt
    await delivery.edit_delivery_line();
    await delivery_item.check_item_line_in_receipt('10.00', '100.00', 'EUR');

    // Validate Receipt
    await review.validate_review_modal();
    await delivery.validate_receipt_status();

    // Create Invoice
    await delivery.click_on_create_invoice_button();
    await inv.createInvoice(`PDT02_S1_1_1__${util.generateRandom(4)}`);
  });
});
