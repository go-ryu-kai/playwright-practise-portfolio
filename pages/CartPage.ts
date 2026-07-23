import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

//https://automationexercise.com/view_cart

export class CartPage extends BasePage {
    private cartInfoTable: Locator;
    private checkoutButton: Locator;
   

    constructor(page: Page) {
        super(page);
        this.cartInfoTable = page.locator("#cart_info_table");
        this.checkoutButton = page.getByText("Proceed To Checkout");
        //the checkout button isnt even a button at all, but is actually an anchor tag without an href attribute
        

    }

    getCheckoutButton(): Locator {
        return this.checkoutButton;
    }

    getCartInfoTable(): Locator {
        return this.cartInfoTable;
    }

    getCartItemRowByIndex(index: number): Locator {
        return this.cartInfoTable.locator("tbody tr").nth(index);
    }

    getCartItemRowByProductName(productName: string): Locator {
        return this.cartInfoTable.locator("tbody tr").filter({ hasText: productName });
    }

    getFirstCartItemRow(): Locator {
        return this.cartInfoTable.locator("tbody tr").first();
    }

    getFirstCartItemDescription(): Locator {
        return this.getFirstCartItemRow().locator(".cart_description");
    }

    getFirstCartItemPrice(): Locator {
        return this.getFirstCartItemRow().locator(".cart_price");
    }

    getFirstCartItemQuantity(): Locator {
        return this.getFirstCartItemRow().locator(".cart_quantity");
    }   

}