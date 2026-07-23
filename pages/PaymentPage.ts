import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';


//https://automationexercise.com/payment

export class PaymentPage extends BasePage {

    private nameOnCardInput: Locator;
    private cardNumberInput: Locator;
    private cvcInput: Locator;
    private expiryMonthInput: Locator;
    private expiryYearInput: Locator;
    private payAndConfirmOrderButton: Locator;

    constructor(page: Page) {
        super(page);
        this.nameOnCardInput = page.locator("input[name='name_on_card']");
        this.cardNumberInput = page.locator("input[name='card_number']");
        this.cvcInput = page.getByPlaceholder("ex. 311");
        this.expiryMonthInput = page.getByPlaceholder("MM");
        this.expiryYearInput = page.getByPlaceholder("YYYY");
        this.payAndConfirmOrderButton = page.getByRole("button", {name: "Pay and Confirm Order"});
    }

    getNameOnCardInput(): Locator {
        return this.nameOnCardInput;
    }

    getCardNumberInput(): Locator {
        return this.cardNumberInput;

    }

    getCvcInput(): Locator {
        return this.cvcInput;
    }

    getExpiryMonthInput(): Locator {
        return this.expiryMonthInput;
    }

    getExpiryYearInput(): Locator {
        return this.expiryYearInput;


    }

    getPayAndConfirmOrderButton(): Locator {
        return this.payAndConfirmOrderButton;
    }

    async fillPaymentForm(nameOnCard: string, cardNumber: string, cvc: string, expiryMonth: string, expiryYear: string) {
        await this.nameOnCardInput.fill(nameOnCard);
        await this.cardNumberInput.fill(cardNumber);
        await this.cvcInput.fill(cvc);
        await this.expiryMonthInput.fill(expiryMonth);
        await this.expiryYearInput.fill(expiryYear);
    }

}