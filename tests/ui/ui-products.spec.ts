import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';

test.beforeEach(async ({page}) => {
    await page.goto("https://automationexercise.com/products");
});

test("Test 1: Validated Product Search", async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.searchProduct("Blue Top");

    const searchHeaderText = await productPage.getSearchHeaderText();
    expect(searchHeaderText.toUpperCase()).toContain("SEARCHED PRODUCTS")

    const searchResultsCount = await productPage.getProductResultsCount();
    expect(searchResultsCount).toBeGreaterThan(0);

    const firstSearchResult = await productPage.getFirstSearchResult();
    await expect(firstSearchResult).toContainText("Blue Top");
});

test("Test 2: Cart Addition via Hover Overlay", async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.searchProduct("Blue Top");

    const searchResultsCount = await productPage.getProductResultsCount();
    expect(searchResultsCount).toBeGreaterThan(0);

    await productPage.getHoverElementAndAddToCart();

    await expect(page.locator(".modal-confirm")).toBeVisible();
    await expect(page.locator(".modal-confirm")).toContainText("Your product has been added to cart.")
});

test("Test 3: Category & Subcategory Drill-Down", async ({ page }) => {
    const productPage = new ProductPage(page);
    const categoryString = "Women";
    const subcategoryString = "Dress";

    await productPage.selectCategoryAndSubcategory(categoryString, subcategoryString);

    await expect(page).toHaveURL(/.*\/category_products\/1.*/);

    const searchResultsCount = await productPage.getProductResultsCount();
    expect(searchResultsCount).toBeGreaterThan(0);
    const firstSearchResult = await productPage.getFirstSearchResult();
    await expect(firstSearchResult).toContainText("Sleeveless Dress");
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