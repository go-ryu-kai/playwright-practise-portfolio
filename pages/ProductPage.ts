import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

//https://automationexercise.com/products

export class ProductPage extends BasePage {
    private productSearchInput: Locator;
    private productSearchButton: Locator;
    private productSearchHeader: Locator;
    private productCards: Locator;
    private productCategoryAccordion: Locator;
    private brandsAccordion: Locator;

    constructor(page: Page) {
        super(page);
        
        this.productSearchInput = page.getByPlaceholder("Search Product");
        this.productSearchButton = page.locator("#submit_search");
        this.productSearchHeader = page.getByRole("heading", {name:"Searched Products"});
        this.productCards = page.locator(".single-products");
        this.productCategoryAccordion = page.locator(".category-products");
        this.brandsAccordion = page.locator(".brands-name");

    }

    async searchProduct(product: string) {
        await this.productSearchInput.fill(product);
        await this.productSearchButton.click();
    }

    async selectCategoryAndSubcategory(cat: string, subcat: string) {
        const targetPanel = this.productCategoryAccordion.locator(".panel").filter({ hasText: cat });
        await targetPanel.getByRole("link", { name: cat, exact: false }).click();
        await targetPanel.getByRole("link", { name: subcat, exact: false }).click();
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

    async getHoverElementAndAddToCart() {
        const targetCard = await this.getFirstSearchResult();
        
        // Since the ads are blocked, we can safely rely on Playwright's 
        // native actionability checks again
        await targetCard.hover();
        await targetCard.locator(".product-overlay").getByText("Add to cart").click();
    }

    async getExpectedBrandCount(brandName: string) {
        const brandLocator = this.brandsAccordion.getByRole("link", { name: brandName });
        const fullString = await brandLocator.innerText();
        console.log(fullString);
        return parseInt(fullString.replace(/\D/g, ""), 10);
    }

    async clickBrand(brandName: string) {
        await this.brandsAccordion.getByRole("link", { name: brandName }).click();
    }
}