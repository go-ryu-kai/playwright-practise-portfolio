import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

//https://automationexercise.com/checkout


export class CheckoutPage extends BasePage {

    private deliveryAddressLocator: Locator;
    private billingAddressLocator: Locator;
    private orderSummaryLocator: Locator;
    private orderCommentInput: Locator;
    private placeOrderButton: Locator;

    constructor(page: Page) {
        super(page);
        this.deliveryAddressLocator = page.locator("#address_delivery");
        this.billingAddressLocator = page.locator("#address_invoice");
        this.orderSummaryLocator = page.locator("#cart_info");
        this.orderCommentInput = page.locator("textarea[name='message']");
        this.placeOrderButton = page.getByText("Place Order");
        //the place order button isnt even a button at all, but is actually an anchor tag without an href attribute

    }

    getDeliveryAddressLocator(): Locator {
        return this.deliveryAddressLocator;
    }

    getBillingAddressLocator(): Locator {
        return this.billingAddressLocator;
    }

    getOrderSummaryLocator(): Locator {
        return this.orderSummaryLocator;
    }

    getOrderCommentInput(): Locator {

        return this.orderCommentInput;
    }

    getPlaceOrderButton(): Locator {
        return this.placeOrderButton;
    }

    
}