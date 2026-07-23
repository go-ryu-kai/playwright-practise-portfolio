import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

//https://automationexercise.com/product_details/1

//Class must be implemented in the test suite for Test Case 13: Verify Product Quantity in Cart
//Class must expose quantity input field, Add to Cart button, Review Product Input form and button
//Class must expose Product Information section (div with class="product-information") for validation in the test suite


export class ProductDetailPage extends BasePage {
    private quantityInput: Locator;
    private addToCartButton: Locator;
    private reviewInput: Locator;
    private reviewSubmitButton: Locator;
    private productInformationSection: Locator;


    constructor(page: Page) {
        super(page);
        
        this.quantityInput = page.locator("#quantity");
        this.addToCartButton = page.getByRole("button", {name: "Add to cart"});
        this.reviewInput = page.locator("#review");
        this.reviewSubmitButton = page.getByRole("button", {name: "Submit"});
        this.productInformationSection = page.locator(".product-information");

    }

    getQuantityInput(): Locator {
        return this.quantityInput;
    }
    
    getAddToCartButton(): Locator {
        return this.addToCartButton;
    }

    getReviewInput(): Locator {
        return this.reviewInput;
    }

    getReviewSubmitButton(): Locator {
        return this.reviewSubmitButton;
    }

    getProductInformationSection(): Locator {
        return this.productInformationSection;
    }

    
}