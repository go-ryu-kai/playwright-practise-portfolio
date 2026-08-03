import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({page}) => {
    // Playwright Best Practice: Network Interception
    // Block Google Ads scripts from loading, keeping our DOM clean and clickable
    await page.route('**/*googlesyndication.com/**', route => route.abort());
    await page.route('**/*doubleclick.net/**', route => route.abort());

    await page.goto("https://automationexercise.com/products");
});

test("Test 1: Validated Product Search", async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.searchProduct("Blue Top");

    const searchHeaderText = await productPage.getSearchHeaderText();
    expect(searchHeaderText.toUpperCase()).toContain("SEARCHED PRODUCTS")

    const searchResultsCount = await productPage.getProductResultsCount();
    expect(searchResultsCount).toBeGreaterThan(0);

    const firstSearchResult = productPage.getFirstSearchResult();
    await expect(firstSearchResult).toContainText("Blue Top");
});

test("Test 2: Cart Addition via Hover Overlay", async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.searchProduct("Blue Top");

    const searchResultsCount = await productPage.getProductResultsCount();
    expect(searchResultsCount).toBeGreaterThan(0);

    await productPage.getHoverElementAndAddToCart();

    await expect(productPage.getConfirmationMessage()).toBeVisible();
    await expect(productPage.getConfirmationMessage()).toContainText("Your product has been added to cart.")
});

test("Test 18: View Category Products", async ({ page }) => {
    const productPage = new ProductPage(page);
    const categoryString = "Women";
    const subcategoryString = "Dress";

    await productPage.selectCategoryAndSubcategory(categoryString, subcategoryString);

    await expect(page).toHaveURL(/.*\/category_products\/1.*/);

    const searchResultsCount = await productPage.getProductResultsCount();
    expect(searchResultsCount).toBeGreaterThan(0);
    const firstSearchResult = productPage.getFirstSearchResult();
    await expect(firstSearchResult).toContainText("Sleeveless Dress");
    await expect(page.locator(".features_items")).toContainText("Women - Dress Products");
});

test("Test 4: Brand Product Count Audit", async ({ page }) => {
    const productPage = new ProductPage(page);
    const brandName = "Polo"
    let extractedNumber = 0;

    extractedNumber = await productPage.getExpectedBrandCount(brandName);
    await productPage.clickBrand(brandName);
    const searchResultsCount = await productPage.getProductResultsCount();
    expect(searchResultsCount).toEqual(extractedNumber);

    // The Golden Rule of POM: 
    // Test scripts (.spec.ts) should never contain 
    // raw CSS selectors, XPaths, or UI locators.
    
});

test("Test Case 21: Add review to product", async ({ page }) => {
    const productPage = new ProductPage(page);
    const productDetailPage = new ProductDetailPage(page);

    await productPage.getFirstDetailsAndClick();
    await expect(page).toHaveURL(/\/product_details\/\d+/);
    await expect(productDetailPage.getProductInformationSection()).toBeVisible();

    await productDetailPage.enterReview("Sarah J", "automationexercise@gmail.com", faker.lorem.sentences(3));
    await productDetailPage.getReviewSubmitButton().click();
    await expect(productDetailPage.getReviewSuccessAlert()).toBeVisible();

});