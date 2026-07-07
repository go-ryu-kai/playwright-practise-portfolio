import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

//https://automationexercise.com/products

export class ProductPage extends BasePage {
    private productSearchInput: Locator;
    private productSearchButton: Locator;
    private productSearchHeader: Locator;
    private productCards: Locator;

    constructor(page: Page) {
        super(page);
        
        this.productSearchInput = page.getByPlaceholder("Search Product");
        this.productSearchButton = page.locator("#submit_search");
        this.productSearchHeader = page.getByRole("heading", {name:"Searched Products"});
        this.productCards = page.locator(".single-products");

    }

    async searchProduct(product: string) {
        await this.productSearchInput.fill(product);
        await this.productSearchButton.click();

    }

    async getSearchHeaderText() {
        return await this.productSearchHeader.textContent() || "";
    }

    async getProductResultsCount() {
        return await this.productCards.count();
    }

    async getFirstSearchResult() {
    return this.productCards.first();
}

    async getHoverElementAndAddToCart(): Promise<void> {
    const targetCard = await this.getFirstSearchResult();
    await targetCard.hover();
    await targetCard.locator(".product-overlay").getByText("Add to cart").click();
}
}