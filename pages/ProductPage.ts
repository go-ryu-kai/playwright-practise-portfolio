import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

//https://automationexercise.com/products

export class ProductPage extends BasePage {
    private productSearchInput: Locator;
    private productSearchButton: Locator;

    constructor(page: Page) {
        super(page);
        
        this.productSearchInput = page.getByPlaceholder("Search Product");
        this.productSearchButton = page.locator('#submit');

    }

    async searchProduct(product: string) {
        await this.productSearchInput.fill(product);
        await this.productSearchButton.click();

    }
}